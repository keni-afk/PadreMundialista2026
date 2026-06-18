import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle, useState } from 'react'

const SEGMENTS = [
  { color: '#E74C3C', text: '👕' },
  { color: '#3498DB', text: '👕' },
  { color: '#2ECC71', text: '👕' },
  { color: '#F39C12', text: '👕' },
  { color: '#9B59B6', text: '👕' },
  { color: '#1ABC9C', text: '👕' },
  { color: '#E91E63', text: '👕' },
  { color: '#FF5722', text: '👕' },
  { color: '#607D8B', text: '👕' },
  { color: '#009688', text: '👕' },
  { color: '#673AB7', text: '👕' },
  { color: '#FF9800', text: '👕' },
]

const RouletteWheel = forwardRef(function RouletteWheel({ onSpinComplete, disabled }, ref) {
  const canvasRef = useRef(null)
  const rotationRef = useRef(0)
  const animRef = useRef(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const drawWheel = useCallback((angle) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const radius = Math.min(cx, cy) - 16
    const segAngle = (2 * Math.PI) / SEGMENTS.length

    ctx.clearRect(0, 0, W, H)

    // Outer glow ring
    const gradient = ctx.createRadialGradient(cx, cy, radius - 4, cx, cy, radius + 16)
    gradient.addColorStop(0, 'rgba(255,215,0,0.8)')
    gradient.addColorStop(1, 'rgba(255,215,0,0)')
    ctx.beginPath()
    ctx.arc(cx, cy, radius + 12, 0, 2 * Math.PI)
    ctx.fillStyle = gradient
    ctx.fill()

    // Gold border ring
    ctx.beginPath()
    ctx.arc(cx, cy, radius + 8, 0, 2 * Math.PI)
    ctx.lineWidth = 10
    ctx.strokeStyle = '#FFD700'
    ctx.stroke()

    // Draw segments
    SEGMENTS.forEach((seg, i) => {
      const start = angle + i * segAngle
      const end = start + segAngle

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, radius, start, end)
      ctx.closePath()
      ctx.fillStyle = seg.color
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Emoji label
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(start + segAngle / 2)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${radius * 0.12}px Arial`
      ctx.fillText(seg.text, radius * 0.72, 0)
      ctx.restore()
    })

    // Inner separator lines (thin white)
    SEGMENTS.forEach((_, i) => {
      const lineAngle = angle + i * segAngle
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + radius * Math.cos(lineAngle), cy + radius * Math.sin(lineAngle))
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Center circle
    const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 38)
    centerGrad.addColorStop(0, '#FFFFFF')
    centerGrad.addColorStop(0.6, '#FFD700')
    centerGrad.addColorStop(1, '#E6A800')
    ctx.beginPath()
    ctx.arc(cx, cy, 38, 0, 2 * Math.PI)
    ctx.fillStyle = centerGrad
    ctx.fill()
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 3
    ctx.stroke()

    // Football emoji center
    ctx.font = '28px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('⚽', cx, cy)
  }, [])

  useEffect(() => {
    drawWheel(rotationRef.current)
  }, [drawWheel])

  const spin = useCallback(() => {
    if (isSpinning || disabled) return
    setIsSpinning(true)

    const startTime = performance.now()
    const duration = 5000 + Math.random() * 2500
    const startAngle = rotationRef.current
    // 5–8 full rotations + random offset
    const extraRotations = (5 + Math.random() * 3) * 2 * Math.PI
    const randomOffset = Math.random() * 2 * Math.PI
    const totalRotation = extraRotations + randomOffset

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out quintic
      const eased = 1 - Math.pow(1 - progress, 5)

      rotationRef.current = startAngle + totalRotation * eased
      drawWheel(rotationRef.current)

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        setIsSpinning(false)
        if (onSpinComplete) onSpinComplete()
      }
    }

    animRef.current = requestAnimationFrame(animate)
  }, [isSpinning, disabled, drawWheel, onSpinComplete])

  useImperativeHandle(ref, () => ({ spin }))

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div className="relative inline-block">
      {/* Fixed pointer arrow at top */}
      <div
        className="absolute left-1/2 -top-2 z-10"
        style={{
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '18px solid transparent',
          borderRight: '18px solid transparent',
          borderTop: '40px solid #FFD700',
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.8))',
        }}
      />
      <canvas
        ref={canvasRef}
        width={380}
        height={380}
        className="block"
        style={{ filter: isSpinning ? 'drop-shadow(0 0 24px #FFD700)' : 'drop-shadow(0 4px 16px rgba(0,0,0,0.6))' }}
      />
    </div>
  )
})

export default RouletteWheel
