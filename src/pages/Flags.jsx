import { useState, useCallback } from 'react'
import Modal from '../components/Modal'
import BackButton from '../components/BackButton'
import { shuffle, pickRandom } from '../utils/shuffle'
import countries from '../data/countries.json'

const participants    = countries.filter((c) => c.participates)
const nonParticipants = countries.filter((c) => !c.participates)

function generateRound() {
  const nonP = nonParticipants[Math.floor(Math.random() * nonParticipants.length)]
  const part = pickRandom(participants, 4)
  const options = shuffle([...part, nonP])
  const correctIdx = options.findIndex((c) => c.country === nonP.country)
  return { options, correctIdx }
}

export default function Flags({ onBack }) {
  const [round, setRound] = useState(() => generateRound())
  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const isCorrect = selected !== null && selected === round.correctIdx

  const handleSelect = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    setTimeout(() => setModalOpen(true), 600)
  }

  const handleModalClose = useCallback(() => {
    setModalOpen(false)
    setRound(generateRound())
    setSelected(null)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Header ─────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(14,100,200,0.18) 0%, rgba(15,20,35,0.95) 30%, rgba(15,20,35,0.95) 70%, rgba(6,182,212,0.18) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        className="flex items-center justify-between px-6 py-3"
      >
        <BackButton onClick={onBack} />
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚩</span>
          <h2
            className="font-black uppercase tracking-wider text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)' }}
          >
            Banderas del Mundial
          </h2>
        </div>
        <div className="w-24" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">

        {/* Question */}
        <div className="text-center animate-fade-in">
          <p
            className="font-black text-white"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.2rem, 2.6vw, 1.8rem)' }}
          >
            Selecciona el país que
          </p>
          <p
            className="font-black mt-1"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.2rem, 2.6vw, 1.8rem)',
              background: 'linear-gradient(135deg, #FF4560, #FB8C00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 10px rgba(255,69,96,0.45))',
            }}
          >
            NO participa en el Mundial ❌
          </p>
          <p className="text-white/35 mt-2 text-sm tracking-wider uppercase">
            4 países participan · 1 no participa
          </p>
        </div>

        {/* Flags grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 w-full max-w-4xl animate-slide-up">
          {round.options.map((country, idx) => {
            let bg     = 'rgba(255,255,255,0.05)'
            let border = 'rgba(255,255,255,0.12)'
            let glow   = 'none'

            if (selected !== null) {
              if (idx === round.correctIdx) {
                bg     = 'rgba(0,200,150,0.15)'
                border = '#00C896'
                glow   = '0 0 28px rgba(0,200,150,0.45)'
              } else if (idx === selected) {
                bg     = 'rgba(255,69,96,0.15)'
                border = '#FF4560'
                glow   = '0 0 28px rgba(255,69,96,0.45)'
              } else {
                bg     = 'rgba(255,255,255,0.02)'
                border = 'rgba(255,255,255,0.06)'
              }
            }

            return (
              <button
                key={country.iso}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl font-semibold text-white transition-all duration-200 hover:scale-105 disabled:cursor-default"
                style={{ background: bg, border: `2px solid ${border}`, boxShadow: glow }}
              >
                <img
                  src={`https://flagcdn.com/w160/${country.iso}.png`}
                  alt={country.country}
                  className="w-full rounded-lg shadow-md"
                  style={{ maxHeight: 90, objectFit: 'cover' }}
                  onError={(e) => { e.target.src = `https://flagcdn.com/w80/${country.iso}.png` }}
                />
                <span
                  className="text-sm text-center leading-tight"
                  style={{ color: selected !== null && idx === round.correctIdx ? '#00C896' : 'rgba(255,255,255,0.80)' }}
                >
                  {country.country}
                </span>
                {selected !== null && idx === round.correctIdx && (
                  <span className="text-emerald-400 font-bold text-sm">✓ Correcto</span>
                )}
                {selected !== null && idx === selected && selected !== round.correctIdx && (
                  <span className="text-red-400 font-bold text-sm">✗ Incorrecto</span>
                )}
              </button>
            )
          })}
        </div>

        {selected === null && (
          <p className="text-white/25 text-sm animate-pulse-slow tracking-wider uppercase">
            Toca una bandera para responder
          </p>
        )}
      </div>

      <Modal isOpen={modalOpen} isWin={isCorrect} playerName={null} onClose={handleModalClose} />
    </div>
  )
}
