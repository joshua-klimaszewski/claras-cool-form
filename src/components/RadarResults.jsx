import { forwardRef } from 'react'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

const RadarResults = forwardRef(function RadarResults({ traits, answers }, ref) {
  const data = traits.map((t) => ({ trait: t.label, score: answers[t.id] ?? 0 }))

  return (
    <div className="radar-results" ref={ref}>
      <h2>Your Results</h2>
      <ResponsiveContainer width="100%" height={500}>
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid />
          <PolarAngleAxis dataKey="trait" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
          <Radar name="Self-assessment" dataKey="score" stroke="#5b8def" fill="#5b8def" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
})

export default RadarResults
