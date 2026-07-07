import { forwardRef, useEffect, useState } from 'react'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { DIMENSIONS } from '../data/traits'

function useIsNarrow() {
  const [isNarrow, setIsNarrow] = useState(() => window.innerWidth < 640)
  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isNarrow
}

// 25 axes packed into a wheel collide if labels stay horizontal, so each
// label is rotated to point radially outward along its own spoke instead —
// the standard fix for dense radar/spider charts.
function RadialTick({ x, y, cx, cy, payload, traits, fontSize }) {
  const trait = traits.find((t) => t.label === payload.value)
  const color = trait?.dimension.color ?? '#333'

  const dx = x - cx
  const dy = y - cy
  const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI
  const pointsLeft = angleDeg > 90 || angleDeg < -90
  const rotation = pointsLeft ? angleDeg + 180 : angleDeg
  const anchor = pointsLeft ? 'end' : 'start'
  const offset = 6

  return (
    <text
      x={x + (dx / (Math.hypot(dx, dy) || 1)) * offset}
      y={y + (dy / (Math.hypot(dx, dy) || 1)) * offset}
      textAnchor={anchor}
      fontSize={fontSize}
      fill={color}
      fontWeight={600}
      transform={`rotate(${rotation}, ${x}, ${y})`}
    >
      {trait?.label}
    </text>
  )
}

const RadarResults = forwardRef(function RadarResults({ traits, answers }, ref) {
  const isNarrow = useIsNarrow()
  const data = traits.map((t) => ({ trait: t.label, score: answers[t.id] ?? 0 }))

  return (
    <div className="radar-results" ref={ref}>
      <h2>Your Results</h2>
      <ResponsiveContainer width="100%" height={isNarrow ? 520 : 640}>
        <RadarChart data={data} outerRadius={isNarrow ? '38%' : '52%'}>
          <PolarGrid stroke="#ddd" />
          <PolarAngleAxis
            dataKey="trait"
            tick={(props) => <RadialTick {...props} traits={traits} fontSize={isNarrow ? 7 : 8.5} />}
          />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
          <Radar name="Self-assessment" dataKey="score" stroke="#F14036" fill="#F14036" fillOpacity={0.45} />
        </RadarChart>
      </ResponsiveContainer>

      <div className="score-legend">
        {DIMENSIONS.map((dim) => (
          <div key={dim.name} className="score-legend-group">
            <div className="score-legend-heading" style={{ '--dim-color': dim.color }}>
              {dim.name}
            </div>
            {traits.filter((t) => t.dimension.name === dim.name).map((t) => (
              <div key={t.id} className="score-legend-row">
                <span>{t.label}</span>
                <span className="score-legend-value" style={{ '--dim-color': dim.color }}>
                  {answers[t.id] ?? '—'}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
})

export default RadarResults
