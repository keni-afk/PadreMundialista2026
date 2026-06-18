const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
    style={{
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.14)',
      color: 'rgba(255,255,255,0.70)',
      fontSize: '0.8rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(255,184,0,0.12)'
      e.currentTarget.style.borderColor = 'rgba(255,184,0,0.40)'
      e.currentTarget.style.color = '#FFB800'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
      e.currentTarget.style.color = 'rgba(255,255,255,0.70)'
    }}
  >
    <span style={{ fontSize: '1.1rem' }}>←</span>
    <span>Menú</span>
  </button>
)

export default BackButton
