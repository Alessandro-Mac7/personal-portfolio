# Portfolio 8-Bit — Alessandro Macri

Personal portfolio in retro 8-bit/pixel-art style. Pure HTML/CSS/JS, zero dependencies.

## Local Preview

Open `index.html` in your browser.

## Deploy on GitHub Pages

1. Create a new repository on GitHub
2. Push this code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/personal-portfolio.git
   git push -u origin main
   ```
3. Go to **Settings > Pages** in your repo
4. Under "Source", select **Deploy from a branch** > **main** > **/ (root)**
5. Your site will be live at `https://YOUR_USERNAME.github.io/personal-portfolio/`

## Features

- Boot sequence animation with typing effects
- CRT scanline overlay & screen flicker
- Parallax star field (Canvas)
- RPG-style stats bars with fill animation
- Quest log timeline with XP counter
- Achievement unlock cards with flip animation
- Inventory-style tech stack grid with tooltips
- Playable Snake game (keyboard + touch controls, 8-bit SFX)
- Konami code easter egg (rainbow mode + Matrix rain)
- Rapid click secret message
- Pixel confetti on project cards
- Fully responsive (mobile hamburger menu, D-pad for Snake)
- Respects `prefers-reduced-motion`

## Customization

- **Contact links**: Edit the `#contact` section in `index.html`
- **Experience**: Edit the `#experience` section timeline cards
- **Projects**: Edit the `#projects` section achievement cards
- **Tech stack**: Edit the `#techstack` section inventory items
- **Colors**: Modify CSS custom properties in `css/style.css` (`:root` block)
