// Mock API service: in-memory data structures matching model.json

const db = {
  users: [
    {
      id: 'u1',
      name: 'Traveler',
      avatar: '',
      rank: 'initiate',
      points: 0,
      streak: 0,
      lastActivityDate: null,
      assignmentsCompleted: [],
      ritualsCompleted: []
    }
  ],
  assignments: [
    { id: 'a1', title: 'Meditate 10 minutes', description: 'Sit quietly and focus on your breath for 10 minutes.', points: 25, frequency: 'daily', completedBy: [] },
    { id: 'a2', title: 'Journal a reflection', description: 'Write one paragraph reflecting on your purpose.', points: 30, frequency: 'daily', completedBy: [] },
    { id: 'a3', title: 'Read a page of history', description: 'Read about Pharaohs, Tsars, or Knights for 5 minutes.', points: 20, frequency: 'weekly', completedBy: [] }
  ],
  rituals: [
    { id: 'r1', title: 'Morning Gratitude', description: 'List three things you’re grateful for.', points: 10, frequency: 'daily', completedBy: [] },
    { id: 'r2', title: 'Evening Reflection', description: 'Note one action that aligned you with your chosen path.', points: 10, frequency: 'daily', completedBy: [] }
  ],
  badges: [
    { id: 'b1', title: 'First Step', description: 'Completed your first assignment.', image: '', criteria: { assignments: 1, streak: 0, rank: '' } }
  ]
}

export function fetchUser(id = 'u1') {
  return Promise.resolve(structuredClone(db.users.find(u => u.id === id)))
}

export function fetchAssignments() {
  return Promise.resolve(structuredClone(db.assignments))
}

export function fetchRituals() {
  return Promise.resolve(structuredClone(db.rituals))
}

export function markAssignmentComplete(userId, assignmentId) {
  const user = db.users.find(u => u.id === userId)
  const a = db.assignments.find(x => x.id === assignmentId)
  if (!user || !a) return Promise.reject(new Error('Not found'))
  if (!a.completedBy.includes(userId)) a.completedBy.push(userId)
  if (!user.assignmentsCompleted.includes(assignmentId)) user.assignmentsCompleted.push(assignmentId)
  return Promise.resolve({ user: structuredClone(user), assignment: structuredClone(a) })
}

export function markRitualComplete(userId, ritualId) {
  const user = db.users.find(u => u.id === userId)
  const r = db.rituals.find(x => x.id === ritualId)
  if (!user || !r) return Promise.reject(new Error('Not found'))
  if (!r.completedBy.includes(userId)) r.completedBy.push(userId)
  if (!user.ritualsCompleted.includes(ritualId)) user.ritualsCompleted.push(ritualId)
  return Promise.resolve({ user: structuredClone(user), ritual: structuredClone(r) })
}
