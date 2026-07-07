import { RATING_SCALE } from '../data/traits'

export default function TraitStep({ trait, index, total, value, onAnswer, onBack }) {
  return (
    <div className="step trait-step">
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
            title={label}
          >
            <span className="scale-num">{n}</span>
            <span className="scale-label">{label}</span>
          </button>
        ))}
      </div>
      {index > 0 && (
        <button type="button" className="back-btn" onClick={onBack}>Back</button>
      )}
    </div>
  )
}
