import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { toPng } from 'html-to-image'
import { traits } from './data/traits'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, ADMIN_EMAIL } from './emailConfig'
import IntakeStep from './components/IntakeStep'
import TraitStep from './components/TraitStep'
import RadarResults from './components/RadarResults'
import './App.css'

const STORAGE_KEY = 'claras-cool-form-progress'

function loadProgress() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function App() {
  const saved = loadProgress()
  const [student, setStudent] = useState(saved?.student ?? null)
  const [stepIndex, setStepIndex] = useState(saved?.stepIndex ?? 0)
  const [answers, setAnswers] = useState(saved?.answers ?? {})
  const [sendStatus, setSendStatus] = useState('idle') // idle | sending | sent | error
  const chartRef = useRef(null)
  const hasSent = useRef(false)

  const isComplete = student && stepIndex >= traits.length

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ student, stepIndex, answers }))
  }, [student, stepIndex, answers])

  useEffect(() => {
    if (isComplete) sessionStorage.removeItem(STORAGE_KEY)
  }, [isComplete])

  useEffect(() => {
    if (!isComplete || hasSent.current) return
    hasSent.current = true
    sendResultsEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete])

  async function sendResultsEmail() {
    setSendStatus('sending')
    try {
      const chartImage = await toPng(chartRef.current)
      const summary = traits.map((t) => `${t.label}: ${answers[t.id]}`).join('\n')

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: student.email,
        admin_email: ADMIN_EMAIL,
        student_name: student.name,
        program: student.program,
        year: student.year,
        chart_image: chartImage,
        summary,
      }, EMAILJS_PUBLIC_KEY)

      setSendStatus('sent')
    } catch (err) {
      console.error('Failed to send results email', err)
      setSendStatus('error')
    }
  }

  function handleAnswer(value) {
    const trait = traits[stepIndex]
    setAnswers((prev) => ({ ...prev, [trait.id]: value }))
    setStepIndex((i) => i + 1)
  }

  function handleBack() {
    setStepIndex((i) => Math.max(0, i - 1))
  }

  if (!student) {
    return <IntakeStep onSubmit={setStudent} />
  }

  if (!isComplete) {
    const trait = traits[stepIndex]
    return (
      <TraitStep
        trait={trait}
        index={stepIndex}
        total={traits.length}
        value={answers[trait.id]}
        onAnswer={handleAnswer}
        onBack={handleBack}
      />
    )
  }

  return (
    <div className="results-page">
      <RadarResults ref={chartRef} traits={traits} answers={answers} />
      {sendStatus === 'sending' && <p>Sending your results to {student.email}...</p>}
      {sendStatus === 'sent' && <p>Results sent to {student.email}.</p>}
      {sendStatus === 'error' && <p className="error">Couldn't send the email automatically. Please contact your teacher.</p>}
    </div>
  )
}

export default App
