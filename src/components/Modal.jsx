import { useEffect } from 'react'

/* Confetti burst — purely decorative colored dots that burst outward */
const CONFETTI = [
  '#FFB800','#FF4560','#00C896','#0094FF','#A855F7',
  '#FF8C00','#EC4899','#06B6D4','#84CC16','#F43F5E',
]

const Modal = ({ isOpen, isWin, playerName, onClose }) => {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: 'rgba(0,0,0,0.75)' }}
        onClick={onClose}
      />

      {/* Card */}
      <div
        className="relative z-10 animate-scale-in text-center rounded-3xl overflow-hidden max-w-lg w-full"
        style={{
          background: isWin
            ? 'linear-gradient(160deg, #071a07 0%, #0d3b0d 50%, #071a07 100%)'
            : 'linear-gradient(160deg, #1a0707 0%, #3b0d0d 50%, #1a0707 100%)',
          border: `2px solid ${isWin ? 'rgba(0,200,150,0.5)' : 'rgba(255,69,96,0.5)'}`,
          boxShadow: isWin
            ? '0 0 0 1px rgba(0,200,150,0.2), 0 0 80px rgba(0,200,150,0.3), 0 24px 64px rgba(0,0,0,0.8)'
            : '0 0 0 1px rgba(255,69,96,0.2), 0 0 80px rgba(255,69,96,0.3), 0 24px 64px rgba(0,0,0,0.8)',
        }}
      >
        {/* Top rainbow stripe (win) or red stripe (lose) */}
        <div
          className="h-1.5 w-full"
          style={{
            background: isWin
              ? 'linear-gradient(90deg, #00C896, #FFB800, #FF4560, #A855F7, #0094FF, #00C896)'
              : 'linear-gradient(90deg, #FF4560, #FF8C00, #FF4560)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s linear infinite',
          }}
        />

        {/* Confetti dots (win only) */}
        {isWin && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {CONFETTI.map((color, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: i % 3 === 0 ? 8 : 5,
                  height: i % 3 === 0 ? 8 : 5,
                  borderRadius: i % 2 === 0 ? '50%' : '2px',
                  background: color,
                  left: `${8 + i * 8.5}%`,
                  top: `${10 + (i % 4) * 22}%`,
                  opacity: 0.35,
                  animation: `float ${2.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite alternate`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative p-10 flex flex-col items-center gap-5">
          {/* Big icon */}
          <div
            className="animate-bounce-slow select-none"
            style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', lineHeight: 1 }}
          >
            {isWin ? '🏆' : '😔'}
          </div>

          {/* Heading */}
          <div>
            <h2
              className="font-black uppercase"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                background: isWin
                  ? 'linear-gradient(135deg, #FFB800, #FFEA70, #FF8C00)'
                  : 'linear-gradient(135deg, #FF4560, #FF8C00)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 2.5s linear infinite',
                letterSpacing: '-0.01em',
              }}
            >
              {isWin ? '¡HAS GANADO UN PREMIO!' : 'NO ACERTASTE'}
            </h2>
          </div>

          {/* Sub-message */}
          <p
            className="text-xl"
            style={{ color: 'rgba(255,255,255,0.70)', maxWidth: 320 }}
          >
            {isWin
              ? '🎉 ¡Felicitaciones! Pasa a reclamar tu premio.'
              : playerName
                ? `Era ${playerName}. ¡Sigue intentando!`
                : '¡Mejor suerte la próxima vez!'}
          </p>

          {/* Stars row (win) */}
          {isWin && (
            <div className="flex gap-3 text-3xl">
              {['⭐','🌟','⭐'].map((s, i) => (
                <span
                  key={i}
                  className="animate-bounce"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Action button */}
          <button
            onClick={onClose}
            className="mt-2 px-12 py-4 rounded-2xl font-black text-xl uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
              background: isWin
                ? 'linear-gradient(135deg, #FFB800, #FF8C00)'
                : 'linear-gradient(135deg, #FF4560, #CC2233)',
              color: isWin ? '#000' : '#fff',
              boxShadow: isWin
                ? '0 4px 28px rgba(255,184,0,0.55)'
                : '0 4px 28px rgba(255,69,96,0.55)',
              border: 'none',
            }}
          >
            {isWin ? 'Volver a jugar' : 'Intentar nuevamente'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
