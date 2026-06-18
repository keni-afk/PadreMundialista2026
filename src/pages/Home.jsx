/* ─── Floating background particles ─────────────────── */
const PARTICLES = [
  { e: '⚽', x:  4, delay:  0, size: 22, dur: 16 },
  { e: '⭐', x: 12, delay:  4, size: 15, dur: 20 },
  { e: '🏆', x: 22, delay:  8, size: 20, dur: 14 },
  { e: '⚽', x: 33, delay:  2, size: 17, dur: 22 },
  { e: '✨', x: 45, delay:  6, size: 13, dur: 18 },
  { e: '⚽', x: 56, delay: 11, size: 24, dur: 15 },
  { e: '🌟', x: 67, delay:  1, size: 16, dur: 19 },
  { e: '⭐', x: 76, delay:  9, size: 14, dur: 17 },
  { e: '⚽', x: 86, delay:  5, size: 21, dur: 21 },
  { e: '🎯', x: 94, delay:  3, size: 18, dur: 13 },
  { e: '🏅', x: 50, delay:  7, size: 12, dur: 24 },
  { e: '⚽', x: 30, delay: 13, size: 19, dur: 16 },
]

function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: '-60px',
            fontSize: p.size,
            lineHeight: 1,
            animation: `float-up ${p.dur}s linear ${p.delay}s infinite`,
            opacity: 0,
            userSelect: 'none',
          }}
        >
          {p.e}
        </span>
      ))}
    </div>
  )
}

/* ─── Game card data ─────────────────────────────────── */
const GAMES = [
  {
    id: 'roulette',
    title: 'Ruleta Mundialista',
    emoji: '🎡',
    description: 'Gira la ruleta y adivina quién es el jugador misterioso por su camiseta',
    gradient: 'linear-gradient(145deg, #3b0764 0%, #7c3aed 45%, #db2777 100%)',
    glow: 'rgba(168, 85, 247, 0.55)',
    btnBg: 'rgba(255,255,255,0.18)',
    badge: 'JUEGO 1',
    badgeColor: '#e879f9',
    lines: ['rgba(232,121,249,0.15)', 'rgba(168,85,247,0.10)'],
  },
  {
    id: 'flags',
    title: 'Banderas del Mundial',
    emoji: '🚩',
    description: 'Detecta cuál de los 5 países NO participa en la Copa del Mundo',
    gradient: 'linear-gradient(145deg, #0c1a5e 0%, #1d4ed8 45%, #0ea5e9 100%)',
    glow: 'rgba(14, 165, 233, 0.55)',
    btnBg: 'rgba(255,255,255,0.18)',
    badge: 'JUEGO 2',
    badgeColor: '#38bdf8',
    lines: ['rgba(56,189,248,0.15)', 'rgba(29,78,216,0.10)'],
  },
  {
    id: 'quiz',
    title: 'Quiz Mundialista',
    emoji: '🧠',
    description: 'Responde preguntas de fútbol y demuestra que eres un experto mundialista',
    gradient: 'linear-gradient(145deg, #450a0a 0%, #dc2626 45%, #f59e0b 100%)',
    glow: 'rgba(245, 158, 11, 0.55)',
    btnBg: 'rgba(255,255,255,0.18)',
    badge: 'JUEGO 3',
    badgeColor: '#fbbf24',
    lines: ['rgba(251,191,36,0.15)', 'rgba(220,38,38,0.10)'],
  },
]

/* ─── Home page ──────────────────────────────────────── */
export default function Home({ onNavigate }) {
  return (
    <div className="relative h-screen flex flex-col items-center justify-between py-5 px-4 overflow-hidden">

      {/* Particles */}
      <Particles />

      {/* Field center-circle decoration */}
      <div className="field-circle-deco" />

      {/* ── Header ───────────────────────────────────── */}
      <header className="relative z-10 text-center animate-slide-up flex flex-col items-center gap-2">

        {/* Floating ball */}
        <div className="float text-5xl select-none" style={{ lineHeight: 1 }}>⚽</div>

        {/* Title */}
        <h1
          className="shimmer-text font-black uppercase"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Feliz Día del Padre
        </h1>

        {/* Sub-title */}
        <div className="flex items-center gap-3">
          <span className="text-white/25 text-xl">⚽</span>
          <h2
            className="font-black uppercase text-white tracking-widest"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
              textShadow: '0 0 40px rgba(255,184,0,0.45)',
            }}
          >
            Mundialista 2026
          </h2>
          <span className="text-white/25 text-xl">⚽</span>
        </div>

        {/* Divider */}
        <div
          className="h-0.5 rounded-full"
          style={{
            width: 'clamp(180px, 36vw, 420px)',
            background: 'linear-gradient(90deg, transparent, #FFB800, rgba(255,184,0,0.4), transparent)',
          }}
        />

        <p className="text-white/40 text-sm tracking-widest uppercase">
          Selecciona un juego y ¡a jugar!
        </p>
      </header>

      {/* ── Game cards ───────────────────────────────── */}
      <main className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
        {GAMES.map((game, idx) => (
          <button
            key={game.id}
            onClick={() => onNavigate(game.id)}
            className="game-card rounded-3xl overflow-hidden text-left cursor-pointer"
            style={{
              background: game.gradient,
              boxShadow: `0 10px 40px ${game.glow}, 0 2px 8px rgba(0,0,0,0.5)`,
              border: 'none',
              animationDelay: `${idx * 80}ms`,
            }}
          >
            {/* Inner highlight (top sheen) */}
            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 50%)',
                padding: '2px',
                borderRadius: 'inherit',
              }}
            >
              {/* Decorative diagonal lines */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                style={{
                  background: `repeating-linear-gradient(
                    135deg,
                    ${game.lines[0]} 0px,
                    ${game.lines[0]} 1px,
                    transparent 1px,
                    transparent 32px
                  )`,
                }}
              />

              <div className="relative p-5 flex flex-col items-center text-center gap-3">
                {/* Badge */}
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full self-start"
                  style={{
                    background: 'rgba(0,0,0,0.30)',
                    color: game.badgeColor,
                    border: `1px solid ${game.badgeColor}55`,
                    letterSpacing: '0.15em',
                  }}
                >
                  {game.badge}
                </span>

                {/* Emoji */}
                <div
                  className="text-5xl select-none"
                  style={{
                    lineHeight: 1,
                    filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))',
                  }}
                >
                  {game.emoji}
                </div>

                {/* Title */}
                <h3
                  className="font-black text-white leading-tight"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
                    fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)',
                    textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                  }}
                >
                  {game.title}
                </h3>

                {/* Description */}
                <p
                  className="leading-snug"
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)',
                  }}
                >
                  {game.description}
                </p>

                {/* CTA button */}
                <div
                  className="w-full py-3 rounded-2xl font-black text-white uppercase tracking-widest text-center"
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    border: '1.5px solid rgba(255,255,255,0.30)',
                    backdropFilter: 'blur(8px)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
                    fontSize: 'clamp(0.82rem, 1.3vw, 0.98rem)',
                    textShadow: '0 1px 6px rgba(0,0,0,0.4)',
                  }}
                >
                  ¡Jugar ahora!
                </div>
              </div>
            </div>
          </button>
        ))}
      </main>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="relative z-10 text-center">
        <div className="flex items-center gap-2 text-white/20">
          <span>⚽</span>
          <span className="uppercase tracking-widest text-xs">Actividad Corporativa · Día del Padre 2026</span>
          <span>⚽</span>
        </div>
      </footer>
    </div>
  )
}
