// Inner Development Goals (IDG) framework: 5 dimensions of 5 traits each.
export const DIMENSIONS = [
  { name: 'Being', subtitle: 'Relationship to Self', color: '#DBB787' },
  { name: 'Thinking', subtitle: 'Cognitive Skills', color: '#F37EA1' },
  { name: 'Relating', subtitle: 'Caring for Others and the World', color: '#F14036' },
  { name: 'Collaborating', subtitle: 'Social Skills', color: '#FF7400' },
  { name: 'Acting', subtitle: 'Enabling Change', color: '#6E1030' },
]

export const traits = [
  ['Inner Compass', 'A deeply felt commitment to live and act in accordance with values and purposes that serve the good of the whole.'],
  ['Integrity and Authenticity', 'A sincere commitment to honesty and firmly grounded values, expressed and embodied in action.'],
  ['Openness and Learning Mindset', 'A curious, adaptive attitude expressed through willingness to exchange perspectives, be vulnerable, welcome change, and grow.'],
  ['Self-Awareness', 'Ability to be in reflective contact with thoughts, emotions, desires, and actions; to maintain a realistic self-image and to regulate oneself.'],
  ['Presence', 'Capacity to be fully present in the here and now, to accept reality as it unfolds, and to respond in meaningful ways.'],
  ['Critical Thinking', 'Ability to reflect on the validity of ideas, evidence, assumptions and plans.'],
  ['Perspective Skills', 'Ability to learn from diverse perspectives and integrate insights into reflective sense-making and action.'],
  ['Systems Thinking', 'Ability to understand complexity and work with the interconnections and properties of systems.'],
  ['Long-Term Orientation and Visioning', 'Imagining long-term goals and staying committed to them in ways that support broader societal and ecological well-being.'],
  ['Creativity', 'Ability to think outside conventional patterns, imagine new possibilities, and shape them into transformative ideas.'],
  ['Appreciation', 'Relating to people and planet Earth with a deep sense of gratitude, positive regard, and joy.'],
  ['Connectedness', 'Feeling a sense of belonging to a larger whole, such as humanity, the planet’s web of life, and the spiritual dimensions of existence.'],
  ['Humility', 'Being able to respond to the needs of the situation without concern for one’s own importance.'],
  ['Empathy and Compassion', 'Connecting to others, oneself, and nature with kindness, care, and love, guided by the intention to reduce suffering.'],
  ['Forgiveness', 'Willingness to transcend hostility, work through trauma, and create space for healing.'],
  ['Relationship-Building Skills', 'Nurturing relationships with emotional intelligence grounded in trust, respect, mutual understanding, and a spirit of collaboration.'],
  ['Inclusive Mindset and Intercultural Competence', 'Willingness and competence to embrace diversity and include people and communities with different perspectives and backgrounds.'],
  ['Co-Creation Skills', 'Facilitating collaborative processes with diverse stakeholders, fostering teamwork and psychological safety, and being aware of power dynamics.'],
  ['Communication Skills', 'Ability to listen deeply, foster genuine dialogue, advocate one’s views skillfully, manage conflicts constructively and adapt communication to diverse groups.'],
  ['Mobilization Skills', 'Inspiring and enabling others to engage in shared purposes and collective action.'],
  ['Courage', 'Standing up for fundamental values, making decisions, taking action, and, when needed, questioning and disrupting established structures and views.'],
  ['Hope and Optimism', 'Building and sustaining a shared belief in our capacity to create a more just, inclusive, and sustainable future.'],
  ['Conscious Use of Resources', 'Acting with awareness of the planet’s limited natural resources, prioritizing conservation, regeneration, and frugality to avoid harmful consumption.'],
  ['Proactivity', 'Practicing future-oriented, accountable stewardship in the face of urgent challenges, grounded in solidarity and care for human dignity and the living Earth.'],
  ['Resilience', 'Navigating adversity with agility, staying engaged, and persevering even when progress is slow or uncertain.'],
].map(([label, definition], i) => ({
  id: `trait-${i + 1}`,
  label,
  definition,
  dimension: DIMENSIONS[Math.floor(i / 5)],
}))

export const RATING_SCALE = [
  { value: 1, label: 'I don’t know how to do this' },
  { value: 2, label: 'I’m a beginner' },
  { value: 3, label: 'I’m average at this' },
  { value: 4, label: 'I’m good at this' },
  { value: 5, label: 'I’ve mastered this' },
]

export const PROGRAM_OPTIONS = [
  'Intern',
  'Cultural Organizing',
  'Planet Blue Student Leader',
  'Student Sustainability Coalition',
  'UM Sustainable Food Program',
]

export const YEAR_OPTIONS = [
  'First year',
  'Second year',
  'Junior',
  'Senior+',
  'Grad Y1',
  'Grad Y2',
  'Grad Y3+',
]
