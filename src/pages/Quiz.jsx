import { useState, useCallback, useMemo } from 'react'
import Modal from '../components/Modal'
import BackButton from '../components/BackButton'
import { shuffle } from '../utils/shuffle'
import questionsData from '../data/questions.json'

const OPTION_STYLES = [
  { bg: '#E74C3C', shadow: 'rgba(231,76,60,0.5)', label: 'A' },
  { bg: '#3498DB', shadow: 'rgba(52,152,219,0.5)', label: 'B' },
  { bg: '#2ECC71', shadow: 'rgba(46,204,113,0.5)', label: 'C' },
  { bg: '#F39C12', shadow: 'rgba(243,156,18,0.5)', label: 'D' },
]

const QUICK_OPTIONS = [5, 10, 15, 20]

function buildShuffledQuestion(q) {
  const indexed = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }))
  const shuffledIndexed = shuffle(indexed)
  const newCorrect = shuffledIndexed.findIndex((x) => x.isCorrect)
  return { ...q, options: shuffledIndexed.map((x) => x.opt), correct: newCorrect }
}

/* ─── Setup screen ──────────────────────────────────────────────────────── */
function QuizSetup({ onStart, onBack }) {
  const [customValue, setCustomValue] = useState('')
  const [inputError, setInputError] = useState('')
  const max = questionsData.length

  const handleQuick = (n) => onStart(n)

  const handleCustomStart = () => {
    const n = parseInt(customValue, 10)
    if (!n || n < 1) {
      setInputError('Ingresa un número mayor a 0')
      return
    }
    if (n > max) {
      setInputError(`Máximo ${max} preguntas disponibles`)
      return
    }
    onStart(n)
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(180,30,30,0.18) 0%, rgba(15,20,35,0.95) 30%, rgba(15,20,35,0.95) 70%, rgba(245,158,11,0.18) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        className="flex items-center justify-between px-6 py-3"
      >
        <BackButton onClick={onBack} />
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <h2
            className="font-black uppercase tracking-wider text-white"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif', fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)' }}
          >
            Quiz Mundialista
          </h2>
        </div>
        <div className="w-24" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 gap-5 max-w-2xl mx-auto w-full">

        {/* Header */}
        <div className="text-center animate-slide-up">
          <div className="text-5xl mb-2 float select-none">🏆</div>
          <h1
            className="font-black uppercase"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 12px rgba(255,184,0,0.4))',
            }}
          >
            ¿Cuántas preguntas?
          </h1>
          <p className="text-white/45 text-base mt-2">
            Elige la cantidad o escribe la que quieras
          </p>
        </div>

        {/* Quick pick buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full animate-fade-in">
          {QUICK_OPTIONS.map((n, i) => {
            const bgs = [
              'linear-gradient(145deg,#3b0764,#7c3aed)',
              'linear-gradient(145deg,#0c1a5e,#1d4ed8)',
              'linear-gradient(145deg,#14532d,#16a34a)',
              'linear-gradient(145deg,#450a0a,#dc2626)',
            ]
            const glows = [
              'rgba(124,58,237,0.45)',
              'rgba(29,78,216,0.45)',
              'rgba(22,163,74,0.45)',
              'rgba(220,38,38,0.45)',
            ]
            return (
              <button
                key={n}
                onClick={() => handleQuick(n)}
                className="flex flex-col items-center gap-2 rounded-2xl py-4 font-black text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: bgs[i],
                  border: '2px solid rgba(255,255,255,0.12)',
                  boxShadow: `0 6px 24px ${glows[i]}`,
                }}
              >
                <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}>
                  {n}
                </span>
                <span className="text-white/60 text-xs uppercase tracking-wider">
                  {n === 1 ? 'pregunta' : 'preguntas'}
                </span>
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-sm uppercase tracking-widest">o escribe un número</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Custom input */}
        <div className="flex flex-col items-center gap-3 w-full animate-fade-in">
          <div className="flex gap-3 w-full max-w-sm">
            <input
              type="number"
              min={1}
              max={max}
              value={customValue}
              onChange={(e) => { setCustomValue(e.target.value); setInputError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomStart()}
              placeholder={`1 – ${max}`}
              className="flex-1 rounded-2xl px-5 py-4 text-2xl font-bold text-white text-center bg-white/10 border-2 border-white/20 focus:outline-none focus:border-yellow-400 transition-all"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif' }}
            />
            <button
              onClick={handleCustomStart}
              className="px-6 py-4 rounded-2xl font-black text-black text-xl uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
                background: 'linear-gradient(135deg, #FFD700, #FF9500)',
                boxShadow: '0 4px 24px rgba(255,215,0,0.5)',
              }}
            >
              ¡Jugar!
            </button>
          </div>
          {inputError && (
            <p className="text-red-400 text-sm font-semibold animate-fade-in">{inputError}</p>
          )}
          <p className="text-white/25 text-sm">
            Banco de {max} preguntas disponibles
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Completed screen ──────────────────────────────────────────────────── */
function QuizCompleted({ score, total, onRestart, onBack }) {
  const pct = Math.round((score / total) * 100)
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 gap-5 animate-fade-in overflow-hidden">
      {/* Glow orb behind trophy */}
      <div
        style={{
          position: 'absolute',
          width: 320, height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,184,0,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div className="relative text-center">
        <div className="text-6xl mb-3 float select-none">🏆</div>
        <h1
          className="font-black uppercase mb-3"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            background: 'linear-gradient(135deg, #FFB800, #FFEA70, #FF8C00)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 2.5s linear infinite',
          }}
        >
          ¡Quiz Completado!
        </h1>
        <p className="text-white/50 text-xl mb-2">Puntuación final:</p>
        <p
          className="font-black"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
            fontSize: 'clamp(3.5rem, 9vw, 5.5rem)',
            background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {score} / {total}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.30)', fontSize: '1.1rem', marginTop: 4 }}>{pct}% correcto</p>
        <p className="text-white/55 text-xl mt-4">
          {pct >= 80 ? '🌟 ¡Eres un experto mundialista!' : pct >= 50 ? '⭐ ¡Buen trabajo! Sigue practicando.' : '💪 ¡Sigue intentándolo!'}
        </p>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={onRestart}
          className="px-10 py-4 rounded-2xl font-black text-black text-xl uppercase tracking-wider hover:scale-105 active:scale-95 transition-all"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', boxShadow: '0 4px 28px rgba(255,184,0,0.50)', border: 'none' }}
        >
          Jugar de nuevo
        </button>
        <button
          onClick={onBack}
          className="px-10 py-4 rounded-2xl font-bold text-white text-xl uppercase tracking-wider hover:bg-white/10 transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.18)' }}
        >
          Menú principal
        </button>
      </div>
    </div>
  )
}

/* ─── Main Quiz component ───────────────────────────────────────────────── */
export default function Quiz({ onBack }) {
  const [totalCount, setTotalCount] = useState(null) // null = setup screen
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  // Build shuffled question set when totalCount is chosen
  const questions = useMemo(() => {
    if (!totalCount) return []
    const pool = shuffle(questionsData)
    const picked = pool.slice(0, Math.min(totalCount, questionsData.length))
    return picked.map(buildShuffledQuestion)
  }, [totalCount])

  const question = questions[currentIdx]
  const isCorrect = selected !== null && question && selected === question.correct

  const handleStart = (n) => {
    setTotalCount(n)
    setCurrentIdx(0)
    setSelected(null)
    setScore(0)
    setCompleted(false)
  }

  const handleAnswer = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === question.correct) setScore((s) => s + 1)
    setTimeout(() => setModalOpen(true), 500)
  }

  const handleModalClose = useCallback(() => {
    setModalOpen(false)
    setSelected(null)
    if (currentIdx + 1 >= questions.length) {
      setCompleted(true)
    } else {
      setCurrentIdx((i) => i + 1)
    }
  }, [currentIdx, questions.length])

  const handleRestart = () => {
    setTotalCount(null) // back to setup
    setCurrentIdx(0)
    setSelected(null)
    setScore(0)
    setCompleted(false)
  }

  // ── Render setup screen
  if (!totalCount) {
    return <QuizSetup onStart={handleStart} onBack={onBack} />
  }

  // ── Render completed screen
  if (completed) {
    return <QuizCompleted score={score} total={questions.length} onRestart={handleRestart} onBack={onBack} />
  }

  // ── Render quiz
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(180,30,30,0.18) 0%, rgba(15,20,35,0.95) 30%, rgba(15,20,35,0.95) 70%, rgba(245,158,11,0.18) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        className="flex items-center justify-between px-6 py-3"
      >
        <BackButton onClick={onBack} />
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <h2
            className="font-black uppercase tracking-wider text-white"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif', fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)' }}
          >
            Quiz Mundialista
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/45 text-xs uppercase tracking-wider">Pregunta</span>
          <span
            className="font-black text-white px-3 py-1 rounded-lg"
            style={{ background: 'rgba(255,184,0,0.18)', border: '1px solid rgba(255,184,0,0.35)', fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif', fontSize: '0.95rem' }}
          >
            {currentIdx + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${(currentIdx / questions.length) * 100}%`,
            background: 'linear-gradient(90deg, #FF4560, #FFB800, #FF8C00)',
          }}
        />
      </div>

      {/* Score */}
      <div className="flex justify-end px-6 py-2">
        <span style={{ color: 'rgba(255,184,0,0.6)', fontSize: '0.85rem' }}>⭐ {score} pts</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 gap-4 max-w-3xl mx-auto w-full">

        {/* Question card */}
        <div
          className="w-full rounded-3xl p-5 text-center animate-slide-up"
          style={{
            background: 'linear-gradient(160deg, rgba(255,184,0,0.08) 0%, rgba(255,255,255,0.04) 100%)',
            border: '2px solid rgba(255,184,0,0.25)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="text-3xl mb-2">⚽</div>
          <p
            className="font-black text-white leading-tight"
            style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
          >
            {question.question}
          </p>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full animate-fade-in">
          {question.options.map((opt, idx) => {
            const style = OPTION_STYLES[idx]
            let bg = `linear-gradient(135deg, ${style.bg}cc, ${style.bg})`
            let border = style.bg
            let extra = null

            if (selected !== null) {
              if (idx === question.correct) {
                bg = 'linear-gradient(135deg, #145a14, #2ECC71)'
                border = '#2ECC71'
                extra = '✅'
              } else if (idx === selected && selected !== question.correct) {
                bg = 'linear-gradient(135deg, #5a1414, #E74C3C)'
                border = '#E74C3C'
                extra = '❌'
              } else {
                bg = `${style.bg}44`
                border = `${style.bg}66`
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
                className="answer-btn rounded-2xl p-4 text-left font-bold text-white text-lg flex items-center gap-3"
                style={{
                  background: bg,
                  border: `2px solid ${border}`,
                  boxShadow: selected === null ? `0 4px 16px ${style.shadow}` : 'none',
                  opacity: selected !== null && idx !== question.correct && idx !== selected ? 0.5 : 1,
                }}
              >
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg"
                  style={{ background: 'rgba(0,0,0,0.25)', fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif' }}
                >
                  {style.label}
                </span>
                <span className="flex-1">{opt}</span>
                {extra && <span className="flex-shrink-0 text-2xl">{extra}</span>}
              </button>
            )
          })}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        isWin={isCorrect}
        playerName={null}
        onClose={handleModalClose}
      />
    </div>
  )
}
