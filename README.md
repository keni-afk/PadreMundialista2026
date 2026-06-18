# ⚽ Feliz Día del Padre Mundialista 2026

Aplicación web interactiva con 3 juegos de fútbol/mundial para actividades corporativas.  
Construida con **React + Vite + TailwindCSS** — 100% estática, sin backend.

---

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en modo desarrollo
npm run dev
# → Abre http://localhost:5173

# 3. Compilar para producción
npm run build
# → Genera la carpeta dist/
```

---

## 🎮 Juegos incluidos

| # | Juego | Descripción |
|---|-------|-------------|
| 1 | **Ruleta Mundialista** | Gira la ruleta, ve la camiseta del jugador misterioso y elige entre 4 opciones |
| 2 | **Banderas del Mundial** | Identifica el único país que NO participa entre 5 banderas |
| 3 | **Quiz Mundialista** | 35 preguntas sobre fútbol y mundiales estilo Kahoot |

---

## 🌐 Despliegue en GitHub Pages

```bash
# En vite.config.js, cambia base al nombre de tu repositorio:
# base: '/nombre-de-tu-repo/'

# Luego ejecuta:
npm run build

# Sube el contenido de dist/ a la rama gh-pages
# O usa GitHub Actions con la acción JamesIves/github-pages-deploy-action
```

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── RouletteWheel.jsx   ← Ruleta canvas con animación
│   ├── PlayerCard.jsx      ← Tarjeta visual del jugador misterioso
│   ├── Modal.jsx           ← Modal de resultado (ganó / perdió)
│   └── BackButton.jsx      ← Botón volver al menú
├── pages/
│   ├── Home.jsx            ← Pantalla principal con 3 tarjetas
│   ├── Roulette.jsx        ← Juego ruleta
│   ├── Flags.jsx           ← Juego banderas
│   └── Quiz.jsx            ← Juego quiz
├── data/
│   ├── players.json        ← 20 jugadores con colores de camiseta
│   ├── countries.json      ← Países participantes y no participantes
│   └── questions.json      ← 35 preguntas de fútbol
└── utils/
    └── shuffle.js          ← Fisher-Yates shuffle
```

---

## 📝 Notas

- Las tarjetas de jugadores usan **colores de camiseta** (sin fotos reales) para evitar problemas de derechos de autor.
- Las banderas se cargan desde **flagcdn.com** — requiere conexión a internet.
- Compatible con pantallas **Full HD (1920×1080)** y proyectores.
