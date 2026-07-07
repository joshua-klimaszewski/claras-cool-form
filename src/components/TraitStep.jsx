import { RATING_SCALE, DIMENSIONS, traits } from '../data/traits'

export default function TraitStep({ trait, index, total, value, onAnswer, onBack }) {
  return (
    <div className="step trait-step">
      <div className="dimension-track">
        {DIMENSIONS.map((d) => {
          const dimTraits = traits.filter((t) => t.dimension.name === d.name)
          const firstIdx = traits.indexOf(dimTraits[0])
          const lastIdx = traits.indexOf(dimTraits[dimTraits.length - 1])
          const isActive = index >= firstIdx && index <= lastIdx
          const isDone = index > lastIdx
          return (
            <div
              key={d.name}
              className={`dimension-segment${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
              style={{ '--dim-color': d.color }}
              title={d.name}
            />
          )
        })}
      </div>

      <div className="dimension-badge" style={{ '--dim-color': trait.dimension.color }}>
        {trait.dimension.name}
      </div>
      <p className="progress">{index + 1} / {total}</p>
      <h2>{trait.label}</h2>
      <p className="definition">{trait.definition}</p>
      <div className="scale">
        {RATING_SCALE.map(({ value: n, label }) => (
          <button
            key={n}
            type="button"
            className={value === n ? 'scale-btn selected' : 'scale-btn'}
            onClick={() => onAnswer(n)}
            style={{ '--dim-color': trait.dimension.color }}
            title={label}
          >
            <span className="scale-num">{n}</span>
            <span className="scale-label">{label}</span>
          </button>
        ))}
      </div>
      {index > 0 && (
        <button type="button" className="back-btn" onClick={onBack}>← Back</button>
      )}
    </div>
  )
}
