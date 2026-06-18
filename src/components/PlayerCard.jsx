/**
 * PlayerCard — visual football jersey card for the Roulette game.
 * Shows team colors and jersey number. The "face" is always hidden
 * behind a white circle with a ❓ to maintain the mystery.
 */
const PlayerCard = ({ player, showName = false }) => {
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

  const { primaryColor, secondaryColor, accentColor, jerseyNumber, countryIso, country, name } = player

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
      {/* Watermark number */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{
          fontSize: 220,
          fontWeight: 900,
          fontFamily: 'Orbitron, sans-serif',
          color: 'rgba(0,0,0,0.12)',
          lineHeight: 1,
        }}
      >
        {jerseyNumber}
      </div>

      {/* Top label */}
      <div className="relative z-10 text-center pt-4 pb-2">
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ background: `${accentColor}cc`, color: '#000' }}
        >
          JUGADOR MISTERIOSO
        </span>
      </div>

      {/* Jersey + silhouette SVG */}
      <div className="relative z-10 flex justify-center mt-2">
        <svg width="180" height="230" viewBox="0 0 180 230" xmlns="http://www.w3.org/2000/svg">
          {/* Jersey / shirt shape */}
          <path
            d="M60,80 L20,100 L34,130 L54,118 L54,210 L126,210 L126,118 L146,130 L160,100 L120,80 Q90,64 60,80 Z"
            fill={primaryColor}
            stroke={accentColor}
            strokeWidth="3"
          />
          {/* Collar */}
          <path
            d="M74,82 Q90,92 106,82"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="4"
          />
          {/* Stripe across chest */}
          <rect x="54" y="118" width="72" height="18" fill={secondaryColor} opacity="0.4" rx="2"/>

          {/* Jersey number on shirt */}
          <text
            x="90"
            y="175"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="32"
            fontWeight="900"
            fontFamily="Orbitron, sans-serif"
            fill={accentColor}
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="1"
          >
            {jerseyNumber}
          </text>

          {/* Shorts */}
          <rect x="62" y="210" width="56" height="30" rx="4"
                fill={secondaryColor} opacity="0.8"/>

          {/* Head area — white circle covers the face */}
          <circle cx="90" cy="52" r="36"
                  fill="white"
                  stroke={accentColor}
                  strokeWidth="3"
                  opacity="0.95"/>
          {/* Question mark */}
          <text x="90" y="60" textAnchor="middle" fontSize="36" fill="#555">❓</text>
        </svg>
      </div>

      {/* Bottom: flag + country / name if revealed */}
      <div className="relative z-10 flex flex-col items-center pb-4 gap-1 -mt-2">
        <img
          src={`https://flagcdn.com/w40/${countryIso}.png`}
          alt={country}
          className="h-6 rounded shadow"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        {showName ? (
          <p className="text-white font-bold text-xl text-center mt-1 px-2"
             style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)', fontFamily: 'Orbitron, sans-serif' }}>
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
