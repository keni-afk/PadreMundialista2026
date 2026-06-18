/**
 * PlayerCard — real player photo with a red circle covering the face.
 * `faceTop` (%) controls where the circle center sits vertically.
 * When `revealed=true`, the circle animates away.
 * Falls back to SVG jersey if photo fails.
 */
import { useState, useEffect } from 'react'

const PlayerCard = ({ player, showName = false, revealed = false }) => {
  const [photoReady, setPhotoReady] = useState(false)
  const [photoError, setPhotoError] = useState(false)

  // Reset photo state whenever the player changes
  useEffect(() => {
    setPhotoReady(false)
    setPhotoError(false)
  }, [player?.id])

  /* ── Empty state ─────────────────────────────── */
  if (!player) {
    return (
      <div
        className="flex items-center justify-center rounded-2xl border-2 border-white/20 bg-white/5"
        style={{ width: 300, height: 420 }}
      >
        <div className="text-center text-white/40">
          <div className="text-6xl mb-4">⚽</div>
          <p className="text-lg font-semibold">Gira la ruleta<br />para revelar<br />un jugador</p>
        </div>
      </div>
    )
  }

  const {
    primaryColor, secondaryColor, accentColor,
    jerseyNumber, countryIso, country, name,
    photo, faceTop = 10
  } = player

  const showPhoto = photo && !photoError

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
      style={{
        width: 300,
        height: 420,
        background: `linear-gradient(145deg, ${primaryColor} 0%, ${secondaryColor}44 60%, ${primaryColor}cc 100%)`,
        border: `3px solid ${accentColor}`,
        boxShadow: `0 0 40px ${primaryColor}88, 0 8px 32px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Top label */}
      <div className="relative z-10 text-center pt-4 pb-1">
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ background: `${accentColor}cc`, color: '#000' }}
        >
          JUGADOR MISTERIOSO
        </span>
      </div>

      {/* ── Photo / SVG area ─────────────────────── */}
      <div className="relative flex justify-center items-end overflow-hidden" style={{ height: 308 }}>

        {showPhoto ? (
          <>
            {/* Loading spinner until image is ready */}
            {!photoReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl animate-bounce-slow">⚽</div>
              </div>
            )}

            {/* Real photo */}
            <img
              key={player.id}
              src={photo}
              alt={name}
              onLoad={() => setPhotoReady(true)}
              onError={() => setPhotoError(true)}
              className="h-full w-full object-contain object-bottom"
              style={{ opacity: photoReady ? 1 : 0, transition: 'opacity 0.35s ease' }}
            />

            {/* Red circle — center at faceTop% */}
            <div
              style={{
                position: 'absolute',
                top: `${faceTop}%`,
                left: '50%',
                width: 118,
                height: 118,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #ff4d4d 0%, #cc0000 55%, #7a0000 100%)',
                boxShadow: revealed ? 'none' : '0 0 32px rgba(255,0,0,0.8), 0 4px 18px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: revealed
                  ? 'translate(-50%, -50%) scale(0)'
                  : 'translate(-50%, -50%) scale(1)',
                opacity: revealed ? 0 : 1,
                transition: 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.45s ease',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            >
              {!revealed && <span style={{ fontSize: 40, lineHeight: 1 }}>❓</span>}
            </div>
          </>
        ) : (
          /* ── SVG jersey fallback ──────────────── */
          <div className="relative flex justify-center items-center w-full h-full">
            <div
              className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
              style={{
                fontSize: 200, fontWeight: 900,
                fontFamily: 'Orbitron, sans-serif',
                color: 'rgba(0,0,0,0.12)', lineHeight: 1,
              }}
            >
              {jerseyNumber}
            </div>
            <svg width="180" height="240" viewBox="0 0 180 240" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M60,80 L20,100 L34,130 L54,118 L54,215 L126,215 L126,118 L146,130 L160,100 L120,80 Q90,64 60,80 Z"
                fill={primaryColor} stroke={accentColor} strokeWidth="3"
              />
              <path d="M74,82 Q90,92 106,82" fill="none" stroke={secondaryColor} strokeWidth="4" />
              <rect x="54" y="118" width="72" height="18" fill={secondaryColor} opacity="0.4" rx="2" />
              <text x="90" y="178" textAnchor="middle" dominantBaseline="middle"
                fontSize="32" fontWeight="900" fontFamily="Orbitron, sans-serif"
                fill={accentColor} stroke="rgba(0,0,0,0.3)" strokeWidth="1">
                {jerseyNumber}
              </text>
              <rect x="62" y="215" width="56" height="28" rx="4" fill={secondaryColor} opacity="0.8" />
              <circle cx="90" cy="52" r="36" fill="white" stroke={accentColor} strokeWidth="3" opacity="0.95" />
              <text x="90" y="60" textAnchor="middle" fontSize="36" fill="#555">❓</text>
            </svg>
          </div>
        )}
      </div>

      {/* ── Bottom: flag + label ─────────────────── */}
      <div className="relative z-10 flex flex-col items-center pb-3 gap-1">
        <img
          src={`https://flagcdn.com/w40/${countryIso}.png`}
          alt={country}
          className="h-6 rounded shadow"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        {showName ? (
          <p
            className="text-white font-bold text-center mt-1 px-2 leading-tight"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
            }}
          >
            {name}
          </p>
        ) : (
          <p className="text-white/60 text-sm font-semibold uppercase tracking-wider">
            {country}
          </p>
        )}
      </div>
    </div>
  )
}

export default PlayerCard
