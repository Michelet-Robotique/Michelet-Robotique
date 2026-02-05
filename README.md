# Omega DDevelopments - Portfolio Immersif 3D

Un portfolio immersif en 3D avec navigation par scroll, conçu avec Next.js, Three.js (R3F), et GSAP.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🛠 Technologies

- **Framework**: Next.js 14 avec App Router
- **3D/WebGL**: Three.js avec @react-three/fiber et @react-three/drei
- **Animations**: GSAP avec ScrollTrigger
- **Smooth Scroll**: Lenis
- **Styling**: styled-components
- **Post-processing**: @react-three/postprocessing

## 📁 Structure

```
src/
├── app/                   # Pages Next.js
├── components/
│   ├── Scene/            # Composants 3D (World, Starfield, CameraRig)
│   ├── Projects/         # Monolithes projets
│   └── UI/               # Header, Footer
├── context/              # ScrollContext
├── data/                 # Données projets
├── shaders/              # Shaders GLSL personnalisés
└── styles/               # Styles globaux
```

## ✨ Fonctionnalités

- Navigation 3D pilotée par scroll
- Système de particules (starfield) avec dérive
- Shader de glitch personnalisé (distorsion RGB, tranches)
- Post-processing (Bloom, Noise, Vignette)
- UI fixe responsive

## 🚀 Déploiement GitHub Pages

1. **Créer un repo GitHub** nommé `Michelet_Robotique`

2. **Configurer GitHub Pages** :
   - Aller dans Settings → Pages
   - Source: "GitHub Actions"

3. **Push le projet** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/Michelet_Robotique.git
   git push -u origin main
   ```

4. Le déploiement se fait automatiquement via GitHub Actions.

5. **URL finale** : `https://VOTRE_USERNAME.github.io/Michelet_Robotique/`

---

Developed by **Omega DDevelopments**
