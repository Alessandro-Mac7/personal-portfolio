/* ============================================
   PORTFOLIO 8-BIT — MAIN.JS
   Alessandro Macrì
   ============================================ */

(function () {
  'use strict';

  // ---------- Check reduced motion ----------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // STAR FIELD (Parallax Background)
  // ============================================
  const starCanvas = document.getElementById('starfield');
  const starCtx = starCanvas.getContext('2d');
  let stars = [];

  function initStarfield() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    stars = [];
    const count = Math.floor((starCanvas.width * starCanvas.height) / 4000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.3 + 0.05,
        brightness: Math.random()
      });
    }
  }

  function drawStarfield() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (const star of stars) {
      star.y += star.speed;
      if (star.y > starCanvas.height) {
        star.y = 0;
        star.x = Math.random() * starCanvas.width;
      }
      star.brightness += 0.01;
      const alpha = (Math.sin(star.brightness) + 1) / 2 * 0.8 + 0.2;
      starCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      starCtx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
    }
    if (!prefersReducedMotion) {
      requestAnimationFrame(drawStarfield);
    }
  }

  initStarfield();
  if (!prefersReducedMotion) {
    drawStarfield();
  } else {
    // Draw once for reduced motion
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (const star of stars) {
      starCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      starCtx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
    }
  }

  window.addEventListener('resize', () => {
    initStarfield();
    if (prefersReducedMotion) {
      starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
      for (const star of stars) {
        starCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        starCtx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
      }
    }
  });

  // ============================================
  // BOOT SEQUENCE (Hero)
  // ============================================
  const bootLines = document.querySelectorAll('.boot-line');
  const progressBar = document.getElementById('progressBar');
  const heroCta = document.getElementById('heroCta');

  function runBootSequence() {
    bootLines.forEach((line, i) => {
      const delay = parseInt(line.dataset.delay, 10) || i * 800;
      setTimeout(() => {
        line.classList.add('visible');
        // Trigger progress bar fill on 2nd line
        if (i === 1 && progressBar) {
          setTimeout(() => progressBar.classList.add('filled'), 100);
        }
      }, delay);
    });

    // Show CTA after boot
    const lastDelay = parseInt(bootLines[bootLines.length - 1]?.dataset.delay, 10) || 4000;
    setTimeout(() => {
      if (heroCta) heroCta.classList.add('visible');
    }, lastDelay + 1000);
  }

  runBootSequence();

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = progress + '%';
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ============================================
  // NAVBAR — Active section & mobile toggle
  // ============================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section, .hero, .stats-counters');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Active section highlight
  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = '';
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        current = sec.id;
      }
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-section') === current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ============================================
  // INTERSECTION OBSERVER — Reveal sections
  // ============================================
  const revealElements = document.querySelectorAll('.reveal-section');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // XP counter for experience items
        const xp = entry.target.dataset.xp;
        if (xp) {
          animateXP(parseInt(xp, 10));
          triggerLevelUpFlash();
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // STATS COUNTERS (Animated increment)
  // ============================================
  const counterNumbers = document.querySelectorAll('.counter-number');

  // Calculate dynamic years since 2019
  const yearsSince2019 = new Date().getFullYear() - 2019;
  const dynamicCounter = document.getElementById('counterYears');
  if (dynamicCounter) {
    dynamicCounter.dataset.target = String(yearsSince2019);
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (!target) return;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterNumbers.forEach(el => counterObserver.observe(el));

  // ============================================
  // STATS BAR FILL ANIMATION
  // ============================================
  const statBars = document.querySelectorAll('.stat-bar');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = bar.dataset.value;
        bar.style.setProperty('--fill', value + '%');
        bar.classList.add('filled');
        // Sparkle effect
        setTimeout(() => spawnSparkles(bar), 1600);
        statsObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  statBars.forEach(bar => statsObserver.observe(bar));

  // Pixel sparkle
  function spawnSparkles(bar) {
    if (prefersReducedMotion) return;
    const rect = bar.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'pixel-sparkle';
      sparkle.style.left = (rect.right - 10 + Math.random() * 10) + 'px';
      sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
      sparkle.style.background = ['#f4c542', '#00ff41', '#00d4ff', '#ff6b35'][Math.floor(Math.random() * 4)];
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 600);
    }
  }

  // ============================================
  // TYPEWRITER — Dialog text
  // ============================================
  const dialogText = document.getElementById('dialogText');

  if (dialogText) {
    const fullText = dialogText.textContent.trim();
    dialogText.textContent = '';
    dialogText.classList.add('typewriter');

    const dialogObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typewriterEffect(dialogText, fullText);
          dialogObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    dialogObserver.observe(dialogText);
  }

  function typewriterEffect(element, text) {
    let i = 0;
    const speed = 25;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        element.classList.add('typewriter-done');
      }
    }
    type();
  }

  // ============================================
  // TIMELINE DRAW
  // ============================================
  const timelineLine = document.getElementById('timelineLine');

  if (timelineLine) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineLine.classList.add('drawn');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    timelineObserver.observe(timelineLine);
  }

  // ============================================
  // XP COUNTER ANIMATION
  // ============================================
  let totalXP = 0;
  const xpCountEl = document.getElementById('xpCount');

  function animateXP(amount) {
    const target = totalXP + amount;
    const start = totalXP;
    const duration = 1000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (target - start) * progress);
      if (xpCountEl) xpCountEl.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
    totalXP = target;
  }

  // ============================================
  // LEVEL UP FLASH
  // ============================================
  function triggerLevelUpFlash() {
    if (prefersReducedMotion) return;
    const flash = document.createElement('div');
    flash.className = 'level-up-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
  }

  // ============================================
  // SAVE POINT ANIMATION
  // ============================================
  const saveAnimation = document.getElementById('saveAnimation');

  if (saveAnimation) {
    const saveObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          saveAnimation.classList.add('active');
          saveObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    saveObserver.observe(saveAnimation);
  }

  // ============================================
  // CONTACT FORM HANDLING
  // ============================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          contactForm.reset();
          contactForm.style.display = 'none';
          if (formSuccess) formSuccess.classList.add('visible');
        }
      }).catch(() => {
        // Fallback: show success anyway for demo (placeholder endpoint)
        contactForm.reset();
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('visible');
      });
    });
  }

  // ============================================
  // PIXEL WAVE
  // ============================================
  const pixelWave = document.getElementById('pixelWave');

  if (pixelWave) {
    const colors = ['#00ff41', '#00d4ff', '#ff6b35', '#f4c542'];
    // Create 80 pixels (duplicated for seamless loop)
    for (let i = 0; i < 80; i++) {
      const px = document.createElement('span');
      px.style.display = 'inline-block';
      px.style.width = '8px';
      px.style.height = (6 + Math.sin(i * 0.3) * 10) + 'px';
      px.style.background = colors[i % colors.length];
      px.style.flexShrink = '0';
      pixelWave.appendChild(px);
    }
  }

  // ============================================
  // PIXEL CONFETTI
  // ============================================
  function spawnConfetti(x, y) {
    if (prefersReducedMotion) return;
    const container = document.getElementById('pixelConfetti');
    const colors = ['#00ff41', '#ff6b35', '#00d4ff', '#f4c542', '#ff4444'];
    for (let i = 0; i < 20; i++) {
      const px = document.createElement('div');
      px.className = 'confetti-pixel';
      px.style.left = (x + (Math.random() - 0.5) * 100) + 'px';
      px.style.top = y + 'px';
      px.style.background = colors[Math.floor(Math.random() * colors.length)];
      px.style.animationDuration = (1 + Math.random()) + 's';
      container.appendChild(px);
      setTimeout(() => px.remove(), 2000);
    }
  }

  // Confetti on project card click
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      spawnConfetti(e.clientX, e.clientY);
    });
  });

  // ============================================
  // SNAKE GAME
  // ============================================
  const snakeCanvas = document.getElementById('snakeCanvas');
  const snakeCtx = snakeCanvas.getContext('2d');
  const snakeOverlay = document.getElementById('snakeOverlay');
  const snakeStartBtn = document.getElementById('snakeStart');
  const snakeScoreEl = document.getElementById('snakeScore');
  const snakeHighScoreEl = document.getElementById('snakeHighScore');
  const soundToggle = document.getElementById('soundToggle');

  const GRID_SIZE = 20;
  const CELL_SIZE = snakeCanvas.width / GRID_SIZE; // 20px

  let snake = [];
  let food = {};
  let direction = 'right';
  let nextDirection = 'right';
  let gameRunning = false;
  let gameLoop = null;
  let snakeScore = 0;
  let snakeSpeed = 150;
  let soundEnabled = true;
  let highScore = parseInt(localStorage.getItem('snakeHighScore'), 10) || 0;

  if (snakeHighScoreEl) snakeHighScoreEl.textContent = highScore;

  // Audio context (lazy init)
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playBeep(freq, duration, type) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type || 'square';
      osc.frequency.value = freq;
      gain.gain.value = 0.08;
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (_) { /* silent fail */ }
  }

  function playEatSound() { playBeep(600, 0.1, 'square'); setTimeout(() => playBeep(800, 0.1, 'square'), 50); }
  function playGameOverSound() { playBeep(200, 0.3, 'sawtooth'); setTimeout(() => playBeep(150, 0.4, 'sawtooth'), 200); }

  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.classList.toggle('muted', !soundEnabled);
    soundToggle.textContent = soundEnabled ? '🔊 SFX' : '🔇 SFX';
  });

  function resetSnake() {
    snake = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 }
    ];
    direction = 'right';
    nextDirection = 'right';
    snakeScore = 0;
    snakeSpeed = 150;
    if (snakeScoreEl) snakeScoreEl.textContent = '0';
    placeFood();
  }

  function placeFood() {
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;
  }

  function drawSnake() {
    snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    // Draw grid
    snakeCtx.strokeStyle = 'rgba(255,255,255,0.03)';
    snakeCtx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      snakeCtx.beginPath();
      snakeCtx.moveTo(i * CELL_SIZE, 0);
      snakeCtx.lineTo(i * CELL_SIZE, snakeCanvas.height);
      snakeCtx.stroke();
      snakeCtx.beginPath();
      snakeCtx.moveTo(0, i * CELL_SIZE);
      snakeCtx.lineTo(snakeCanvas.width, i * CELL_SIZE);
      snakeCtx.stroke();
    }

    // Draw food
    snakeCtx.fillStyle = '#ff6b35';
    snakeCtx.shadowColor = '#ff6b35';
    snakeCtx.shadowBlur = 6;
    snakeCtx.fillRect(food.x * CELL_SIZE + 2, food.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    snakeCtx.shadowBlur = 0;

    // Draw snake
    snake.forEach((seg, i) => {
      snakeCtx.fillStyle = i === 0 ? '#00ff41' : '#00cc33';
      snakeCtx.shadowColor = '#00ff41';
      snakeCtx.shadowBlur = i === 0 ? 8 : 3;
      snakeCtx.fillRect(seg.x * CELL_SIZE + 1, seg.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });
    snakeCtx.shadowBlur = 0;
  }

  function updateSnake() {
    direction = nextDirection;
    const head = { ...snake[0] };

    switch (direction) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      gameOver();
      return;
    }

    // Self collision
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      gameOver();
      return;
    }

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
      snakeScore += 10;
      if (snakeScoreEl) snakeScoreEl.textContent = snakeScore;
      playEatSound();
      placeFood();
      // Speed up
      if (snakeSpeed > 60) {
        snakeSpeed -= 5;
        clearInterval(gameLoop);
        gameLoop = setInterval(gameTick, snakeSpeed);
      }
    } else {
      snake.pop();
    }
  }

  function gameTick() {
    updateSnake();
    drawSnake();
  }

  function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    playGameOverSound();

    if (snakeScore > highScore) {
      highScore = snakeScore;
      localStorage.setItem('snakeHighScore', highScore);
      if (snakeHighScoreEl) snakeHighScoreEl.textContent = highScore;
    }

    // Show overlay with game over text
    snakeOverlay.classList.remove('hidden');
    snakeOverlay.querySelector('.snake-start-text').textContent = 'GAME OVER';
    snakeOverlay.querySelector('.snake-start-text').insertAdjacentHTML('afterend',
      `<div class="game-over-score" style="font-size:0.5rem;color:#f4c542;margin-bottom:12px;">SCORE: ${snakeScore}</div>`
    );
    snakeStartBtn.textContent = 'INSERT COIN';
  }

  function startGame() {
    initAudio();
    // Clean up game over elements
    const oldScore = snakeOverlay.querySelector('.game-over-score');
    if (oldScore) oldScore.remove();

    resetSnake();
    snakeOverlay.classList.add('hidden');
    gameRunning = true;
    snakeStartBtn.textContent = 'PRESS START';
    snakeOverlay.querySelector('.snake-start-text').textContent = '🎮 SNAKE';
    drawSnake();
    gameLoop = setInterval(gameTick, snakeSpeed);
  }

  snakeStartBtn.addEventListener('click', startGame);

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    const key = e.key;
    if (key === 'ArrowUp' && direction !== 'down') { nextDirection = 'up'; e.preventDefault(); }
    else if (key === 'ArrowDown' && direction !== 'up') { nextDirection = 'down'; e.preventDefault(); }
    else if (key === 'ArrowLeft' && direction !== 'right') { nextDirection = 'left'; e.preventDefault(); }
    else if (key === 'ArrowRight' && direction !== 'left') { nextDirection = 'right'; e.preventDefault(); }
  });

  // D-Pad controls
  document.querySelectorAll('.dpad-btn[data-dir]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!gameRunning) return;
      const dir = btn.dataset.dir;
      if (dir === 'up' && direction !== 'down') nextDirection = 'up';
      else if (dir === 'down' && direction !== 'up') nextDirection = 'down';
      else if (dir === 'left' && direction !== 'right') nextDirection = 'left';
      else if (dir === 'right' && direction !== 'left') nextDirection = 'right';
    });
  });

  // Touch swipe controls
  let touchStartX = 0;
  let touchStartY = 0;

  snakeCanvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  snakeCanvas.addEventListener('touchend', (e) => {
    if (!gameRunning) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20 && direction !== 'left') nextDirection = 'right';
      else if (dx < -20 && direction !== 'right') nextDirection = 'left';
    } else {
      if (dy > 20 && direction !== 'up') nextDirection = 'down';
      else if (dy < -20 && direction !== 'down') nextDirection = 'up';
    }
  }, { passive: true });

  // Initial draw
  resetSnake();
  drawSnake();

  // ============================================
  // EASTER EGGS
  // ============================================

  // --- Konami Code ---
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiSequence[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        activateKonamiCode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateKonamiCode() {
    document.body.classList.toggle('rainbow-mode');
    triggerMatrixRain();
  }

  // --- Matrix Rain ---
  function triggerMatrixRain() {
    const matrixRainEl = document.getElementById('matrixRain');
    const matrixCanvasEl = document.getElementById('matrixCanvas');
    if (!matrixRainEl || !matrixCanvasEl) return;

    matrixRainEl.classList.add('active');
    matrixCanvasEl.width = window.innerWidth;
    matrixCanvasEl.height = window.innerHeight;

    const ctx = matrixCanvasEl.getContext('2d');
    const fontSize = 14;
    const columns = Math.floor(matrixCanvasEl.width / fontSize);
    const drops = new Array(columns).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコ';

    let frameCount = 0;

    function drawMatrix() {
      ctx.fillStyle = 'rgba(15, 15, 35, 0.05)';
      ctx.fillRect(0, 0, matrixCanvasEl.width, matrixCanvasEl.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvasEl.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frameCount++;
      if (frameCount < 300) { // ~5 seconds at 60fps
        requestAnimationFrame(drawMatrix);
      } else {
        matrixRainEl.classList.remove('active');
        ctx.clearRect(0, 0, matrixCanvasEl.width, matrixCanvasEl.height);
      }
    }

    drawMatrix();
  }

  // --- Click Counter (Secret Message) ---
  let rapidClicks = 0;
  let clickTimer = null;

  document.addEventListener('click', () => {
    rapidClicks++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { rapidClicks = 0; }, 1500);

    if (rapidClicks >= 10) {
      rapidClicks = 0;
      const secretMsg = document.getElementById('secretMessage');
      if (secretMsg) {
        secretMsg.classList.add('active');
        setTimeout(() => secretMsg.classList.remove('active'), 3000);
      }
    }
  });

  // ============================================
  // SMOOTH SCROLL for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
