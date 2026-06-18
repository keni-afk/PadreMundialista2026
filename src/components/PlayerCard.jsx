/**
 * PlayerCard — fetches real player photo from thesportsdb at runtime.
 * Red circle covers the face; animates away when `revealed=true`.
 * Falls back to SVG jersey if no photo found.
 */
import { useState, useEffect } from 'react'

const SEARCH_NAMES = {
  'Vinicius Jr':      'Vinicius Junior',
  'Kylian Mbappé':    'Kylian Mbappe',
  'Luka Modrić':      'Luka Modric',
  'Julián Álvarez':   'Julian Alvarez',
  'Lautaro Martínez': 'Lautaro Martinez',
}

export default function PlayerCard({ player, showName = false, revealed = false }) {
  const [photoUrl, setPhotoUrl]   = useState(null)
  const [photoReady, setPhotoReady] = useState(false)

  useEffect(() => {
    if (!player) { setPhotoUrl(null); setPhotoReady(false); return }

    // Reset for new player
    setPhotoUrl(null)
    setPhotoReady(false)

    const query = SEARCH_NAMES[player.name] || player.name
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(d => {
        const p = d?.player?.[0]
        const url = p?.strThumb || p?.strCutout || null
        setPhotoUrl(url)
      })
      .catch(() => setPhotoUrl(null))
  }, [player?.id])

  /* ── empty state ─────────────────────────────── */
  if (!player) {
    return (
      <div className="flex items-center justify-center rounded-2xl border-2 border-white/20 bg-white/5"
           style={{ width: 300, height: 420 }}>
        <div className="text-center text-white/40">
          <div className="text-6xl mb-4">⚽</div>
          <p className="text-lg font-semibold">Gira la ruleta<br/>para revelar<br/>un jugador</p>
        </div>
      </div>
    )
  }

  const { primaryColor, secondaryColor, accentColor, jerseyNumber, countryIso, country, name, faceTop = 10 } = player

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
         style={{
           width: 300, height: 420,
           background: `linear-gradient(145deg, ${primaryColor} 0%, ${secondaryColor}44 60%, ${primaryColor}cc 100%)`,
           border: `3px solid ${accentColor}`,
           boxShadow: `0 0 40px ${primaryColor}88, 0 8px 32px rgba(0,0,0,0.6)`,
         }}>

      {/* top label */}
      <div className="relative z-10 text-center pt-4 pb-1">
        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: `${accentColor}cc`, color: '#000' }}>
          JUGADOR MISTERIOSO
        </span>
      </div>

      {/* ── photo / SVG area ─────────────────────── */}
      <div className="relative flex justify-center items-end overflow-hidden" style={{ height: 308 }}>

        {photoUrl ? (
          <>
            {!photoReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl animate-bounce-slow">⚽</div>
              </div>
            )}

            <img
              key={player.id}
              src={photoUrl}
              alt={name}
              onLoad={() => setPhotoReady(true)}
              onError={() => { setPhotoUrl(null); setPhotoReady(false) }}
              className="h-full w-full object-contain object-bottom"
              style={{
                opacity: photoReady ? 1 : 0,
                filter: revealed ? 'blur(0px)' : 'blur(4px)',
                transition: 'opacity 0.35s ease, filter 0.6s ease',
              }}
            />
          </>
        ) : (
          /* ── SVG jersey fallback ──────────────── */
          <div className="relative flex justify-center items-center w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                 style={{ fontSize: 200, fontWeight: 900, fontFamily: '-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif', color: 'rgba(0,0,0,0.12)', lineHeight: 1 }}>
              {jerseyNumber}
            </div>
            <svg width="180" height="240" viewBox="0 0 180 240" xmlns="http://www.w3.org/2000/svg">
              <path d="M60,80 L20,100 L34,130 L54,118 L54,215 L126,215 L126,118 L146,130 L160,100 L120,80 Q90,64 60,80 Z"
                    fill={primaryColor} stroke={accentColor} strokeWidth="3"/>
              <path d="M74,82 Q90,92 106,82" fill="none" stroke={secondaryColor} strokeWidth="4"/>
              <rect x="54" y="118" width="72" height="18" fill={secondaryColor} opacity="0.4" rx="2"/>
              <text x="90" y="178" textAnchor="middle" dominantBaseline="middle"
                    fontSize="32" fontWeight="900" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
                    fill={accentColor} stroke="rgba(0,0,0,0.3)" strokeWidth="1">{jerseyNumber}</text>
              <rect x="62" y="215" width="56" height="28" rx="4" fill={secondaryColor} opacity="0.8"/>
              <circle cx="90" cy="52" r="36" fill="white" stroke={accentColor} strokeWidth="3" opacity="0.95"/>
              <text x="90" y="60" textAnchor="middle" fontSize="36" fill="#555">❓</text>
            </svg>
          </div>
        )}
      </div>

      {/* bottom: flag + label */}
      <div className="relative z-10 flex flex-col items-center pb-3 gap-1">
        <img src={`https://flagcdn.com/w40/${countryIso}.png`} alt={country}
             className="h-6 rounded shadow" onError={e => { e.target.style.display='none' }}/>
        {showName
          ? <p className="text-white font-bold text-center mt-1 px-2 leading-tight"
               style={{ textShadow:'0 2px 8px rgba(0,0,0,0.8)', fontFamily:'-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif', fontSize:'clamp(0.85rem,1.5vw,1.05rem)' }}>
              {name}
            </p>
          : <p className="text-white/60 text-sm font-semibold uppercase tracking-wider">{country}</p>
        }
      </div>
    </div>
  )
}
