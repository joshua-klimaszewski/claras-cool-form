import { useState } from 'react'
import { PROGRAM_OPTIONS, YEAR_OPTIONS } from '../data/traits'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function IntakeStep({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', program: '', year: '' })
  const [touched, setTouched] = useState(false)

  const isValid = form.name.trim() && EMAIL_RE.test(form.email) && form.program && form.year

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (isValid) onSubmit(form)
  }

  return (
    <form className="step intake-step" onSubmit={handleSubmit}>
      <h1>Self-Assessment</h1>
      <p>Tell us a bit about yourself to begin. We'll send you a copy of your results at the end.</p>

      <label>
        Name
        <input type="text" value={form.name} onChange={update('name')} autoFocus />
      </label>

      <label>
        Email
        <input type="email" placeholder="you@school.edu" value={form.email} onChange={update('email')} />
      </label>

      <label>
        Program
        <select value={form.program} onChange={update('program')}>
          <option value="" disabled>Select a program</option>
          {PROGRAM_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </label>

      <label>
        Year
        <select value={form.year} onChange={update('year')}>
          <option value="" disabled>Select a year</option>
          {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </label>

      {touched && !isValid && <p className="error">Please fill in all fields with a valid email.</p>}
      <button type="submit">Start</button>
    </form>
  )
}
