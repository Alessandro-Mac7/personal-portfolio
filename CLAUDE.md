# CLAUDE.md — Portfolio 8-Bit di Alessandro Macri

## Project Overview
Personal portfolio in retro 8-bit/pixel-art style for Alessandro Macri, Solution Architect & Team Leader. Pure HTML/CSS/JS, zero dependencies, deployed on GitHub Pages.

## Tech Stack
- **HTML5** — Semantic single-page application
- **CSS3** — Custom properties, keyframe animations, Grid/Flexbox, CRT effects, responsive
- **JavaScript** — Vanilla ES6+, Intersection Observer, Canvas API, Web Audio API
- **Font** — "Press Start 2P" (Google Fonts)
- **Deploy** — GitHub Pages (static, no build step)

## File Structure
```
personal-portfolio/
├── index.html          # Single-page app (~780 lines)
├── css/style.css       # All styles, animations, responsive (~1700 lines)
├── js/main.js          # Interactions, Snake game, easter eggs (~800 lines)
├── assets/
│   └── resume.pdf      # [PLACEHOLDER] — Add real resume PDF here
├── CLAUDE.md           # This file
└── README.md           # Deploy instructions
```

## Design System
- **Background**: `#0f0f23` (deep blue)
- **Primary**: `#00ff41` (terminal green)
- **Accent**: `#ff6b35` (retro orange)
- **Secondary**: `#00d4ff` (cyan)
- **Gold**: `#f4c542` (XP/stats)
- **Text**: `#e0e0e0`
- All borders are pixel-sharp (no border-radius), using box-shadow for depth

## Sections (in order)
1. **Hero** — Boot sequence, typing animation, availability status, START GAME + RESUME CTAs
2. **About Me** — Pixel avatar, typewriter bio, RPG stat bars (Leadership, Architecture, Creativity, Problem Solving, Curiosity)
3. **Stats Counters** — Years of experience (dynamic since 2019), projects completed (+46), worldwide clients (+20)
4. **Quest Log (Experience)** — Timeline: Software Developer → Senior Engineer → Solution Architect & Team Leader
5. **Achievements (Projects)** — Wyn-AI, Opus, Code-Troubleshooter with flip cards and GitHub/Demo links
6. **Inventory (Tech Stack)** — Languages, Frameworks, Databases, Cloud & Messaging, Architectural Patterns, Practices
7. **Side Quests (Hobbies)** — Pizza Artisan, Gin Distiller
8. **Party Members (Testimonials)** — 3 testimonial cards with RPG framing
9. **Save Point (Contact)** — Contact links (GitHub, Email, LinkedIn) + contact form
10. **Bonus Stage (Snake Game)** — Playable Snake with keyboard, touch, D-pad controls, 8-bit SFX, high score in localStorage
11. **Footer** — Copyright + Konami code hint

## Key Features
- CRT scanline overlay with subtle flicker
- Star field parallax (Canvas)
- Scroll progress bar
- Section reveal via Intersection Observer
- Boot sequence with progress bar animation
- Glitch text effect on name
- Animated stat bars with pixel sparkles
- Timeline with draw animation + XP counter
- Achievement unlock banners + card flip
- Pixel confetti on project click
- Inventory tooltips
- Save point spinning icon
- Pixel wave animation
- Playable Snake game with Web Audio SFX
- Konami code → rainbow mode + Matrix rain
- Rapid click → secret message
- `prefers-reduced-motion` fully respected

## Profile: Alessandro Macri
- **Role**: Solution Architect & Team Leader
- **Working since**: 2019
- **Backend**: Java (Spring Boot, Quarkus, Micronaut), Python, Node.js
- **Frontend**: React, Vue.js
- **Databases**: PostgreSQL, MySQL, MSSQL Server, Oracle DB, MongoDB, DynamoDB, CosmosDB
- **Cloud**: AWS, Azure
- **Messaging**: Kafka, SQS, ActiveMQ
- **Patterns**: Microservices, DDD, Event-Driven, CQRS, Event Sourcing, Saga, Hexagonal, Clean Architecture, Circuit Breaker, API Gateway
- **Practices**: SOLID, TDD, 12-Factor App, REST/Reactive, CI/CD, GitOps
- **Tools**: Docker, Kubernetes, K9s, Git
- **Hobbies**: Artisan pizza (all dough styles, high-hydration experiments), gin distillation (small-batch, local botanicals)

## Conventions
- All text content in English
- RPG/gaming metaphors throughout (Quest Log, Inventory, Achievements, Side Quests, Party Members, Save Point, Bonus Stage, XP)
- No company names — portfolio style, not CV
- Animations use transform/opacity for GPU acceleration
- Intersection Observer for scroll-triggered animations (no continuous scroll listeners)
