import { useState, useRef, useCallback } from 'react'
import RouletteWheel from '../components/RouletteWheel'
import PlayerCard from '../components/PlayerCard'
import Modal from '../components/Modal'
import BackButton from '../components/BackButton'
import { shuffle, pickRandom } from '../utils/shuffle'
import players from '../data/players.json'

const ANSWER_COLORS = [
  { bg: 'linear-gradient(135deg,#c2185b,#e91e63)', border: '#e91e63', shadow: 'rgba(233,30,99,0.45)' },
  { bg: 'linear-gradient(135deg,#1565c0,#1e88e5)', border: '#1e88e5', shadow: 'rgba(30,136,229,0.45)' },
  { bg: 'linear-gradient(135deg,#2e7d32,#43a047)', border: '#43a047', shadow: 'rgba(67,160,71,0.45)' },
  { bg: 'linear-gradient(135deg,#e65100,#fb8c00)', border: '#fb8c00', shadow: 'rgba(251,140,0,0.45)' },
]

const PHASES = { IDLE: 'idle', SPINNING: 'spinning', GUESSING: 'guessing', RESULT: 'result' }

export default function Roulette({ onBack }) {
  const wheelRef = useRef(null)
  const usedIdsRef = useRef([])

  const [phase, setPhase] = useState(PHASES.IDLE)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [options, setOptions] = useState([])
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const pickPlayer = useCallback(() => {
    const available = players.filter((p) => !usedIdsRef.current.includes(p.id))
    const pool = available.length > 0 ? available : players
    const player = pool[Math.floor(Math.random() * pool.length)]
    usedIdsRef.current = [...usedIdsRef.current, player.id].slice(-players.length + 1)
    const others = players.filter((p) => p.id !== player.id)
    const wrong = pickRandom(others, 3)
    const allOptions = shuffle([player, ...wrong])
    return { player, options: allOptions }
  }, [])

  const handleSpin = () => {
    if (phase === PHASES.SPINNING) return
    setPhase(PHASES.SPINNING)
    setCurrentPlayer(null)
    setSelectedIdx(null)
    setIsCorrect(null)
    if (wheelRef.current) wheelRef.current.spin()
  }

  const handleSpinComplete = useCallback(() => {
    const { player, options: opts } = pickPlayer()
    setCurrentPlayer(player)
    setOptions(opts)
    setPhase(PHASES.GUESSING)
  }, [pickPlayer])

  const handleAnswer = (idx) => {
    if (phase !== PHASES.GUESSING) return
    const correct = options[idx].id === currentPlayer.id
    setSelectedIdx(idx)
    setIsCorrect(correct)
    setPhase(PHASES.RESULT)
    setTimeout(() => setModalOpen(true), 600)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setPhase(PHASES.IDLE)
    setCurrentPlayer(null)
    setSelectedIdx(null)
    setIsCorrect(null)
    setOptions([])
  }

  const isGuessing = phase === PHASES.GUESSING || phase === PHASES.RESULT

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Header ─────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(124,58,237,0.18) 0%, rgba(15,20,35,0.95) 30%, rgba(15,20,35,0.95) 70%, rgba(219,39,119,0.18) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        className="flex items-center justify-between px-6 py-3"
      >
        <BackButton onClick={onBack} />
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎡</span>
          <h2
            className="font-black uppercase tracking-wider text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)' }}
          >
            Ruleta Mundialista
          </h2>
        </div>
        <div className="w-24" />
      </div>

      {/* ── Two-column layout ───────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-8">

        {/* LEFT: wheel */}
        <div className="flex flex-col items-center gap-5">
          <h1
            className="text-center font-black uppercase"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(0.95rem, 2vw, 1.35rem)',
              background: 'linear-gradient(90deg, #FFB800, #FF8C00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 8px rgba(255,184,0,0.4))',
            }}
          >
            ⚽ Feliz Día del Padre Mundialista ⚽
          </h1>

          <RouletteWheel
            ref={wheelRef}
            onSpinComplete={handleSpinComplete}
            disabled={phase === PHASES.SPINNING}
          />

          <button
            onClick={handleSpin}
            disabled={phase === PHASES.SPINNING}
            className="px-14 py-4 rounded-2xl font-black text-xl uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: phase === PHASES.SPINNING
                ? 'rgba(255,184,0,0.2)'
                : 'linear-gradient(135deg, #FFB800, #FF8C00)',
              color: '#000',
              boxShadow: phase === PHASES.SPINNING ? 'none' : '0 4px 28px rgba(255,184,0,0.50)',
              border: 'none',
            }}
          >
            {phase === PHASES.SPINNING ? '⏳ Girando...' : '🎡 Girar Ruleta'}
          </button>
        </div>

        {/* RIGHT: player + answers */}
        <div className="flex flex-col items-center gap-5 flex-1 max-w-lg w-full">

          <PlayerCard
            player={currentPlayer}
            showName={phase === PHASES.RESULT}
            revealed={phase === PHASES.RESULT && isCorrect === true}
          />

          {isGuessing && (
            <h3
              className="font-black text-white text-center text-2xl animate-fade-in"
              style={{ textShadow: '0 0 24px rgba(255,184,0,0.5)', fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.1rem,2.2vw,1.6rem)' }}
            >
              ¿Qué jugador es este?
            </h3>
          )}

          {isGuessing && options.length > 0 && (
            <div className="grid grid-cols-2 gap-3 w-full animate-slide-up">
              {options.map((opt, idx) => {
                const col = ANSWER_COLORS[idx]
                let bg = col.bg
                let border = col.border
                if (phase === PHASES.RESULT) {
                  if (opt.id === currentPlayer.id) {
                    bg = 'linear-gradient(135deg, #145a14, #43a047)'
                    border = '#43a047'
                  } else if (idx === selectedIdx) {
                    bg = 'linear-gradient(135deg, #7a0000, #e53935)'
                    border = '#e53935'
                  } else {
                    bg = 'rgba(255,255,255,0.05)'
                    border = 'rgba(255,255,255,0.10)'
                  }
                }
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(idx)}
                    disabled={phase === PHASES.RESULT}
                    className="answer-btn rounded-2xl p-4 text-left font-bold text-white text-lg leading-snug"
                    style={{
                      background: bg,
                      border: `2px solid ${border}`,
                      boxShadow: phase !== PHASES.RESULT ? `0 4px 16px ${col.shadow}` : 'none',
                      opacity: phase === PHASES.RESULT && opt.id !== currentPlayer.id && idx !== selectedIdx ? 0.45 : 1,
                    }}
                  >
                    <span className="text-xs text-white/50 block mb-0.5">{String.fromCharCode(65 + idx)})</span>
                    {opt.name}
                    {phase === PHASES.RESULT && opt.id === currentPlayer.id && <span className="ml-1.5">✅</span>}
                    {phase === PHASES.RESULT && idx === selectedIdx && opt.id !== currentPlayer.id && <span className="ml-1.5">❌</span>}
                  </button>
                )
              })}
            </div>
          )}

          {phase === PHASES.IDLE && (
            <p className="text-white/30 text-center text-lg animate-pulse-slow">
              🎡 Gira la ruleta para comenzar
            </p>
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} isWin={isCorrect} playerName={currentPlayer?.name} onClose={handleModalClose} />
    </div>
  )
}
