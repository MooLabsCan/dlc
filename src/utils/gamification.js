// Rank logic, points, streaks
// Ranks: Initiate → Knight → Countess → Divine Royalty

export const RANKS = [
  { key: 'initiate', title: 'Initiate', minPoints: 0 },
  { key: 'knight', title: 'Knight', minPoints: 200 },
  { key: 'countess', title: 'Countess', minPoints: 600 },
  { key: 'divine', title: 'Divine Royalty', minPoints: 1500 }
]

export function getRank(points = 0) {
  let current = RANKS[0]
  for (const r of RANKS) {
    if (points >= r.minPoints) current = r
  }
  const idx = RANKS.findIndex(r => r.key === current.key)
  const next = RANKS[idx + 1] || null
  const progressToNext = next ? Math.min(1, (points - current.minPoints) / (next.minPoints - current.minPoints)) : 1
  return { current, next, progressToNext }
}

export function addPoints(basePoints, streak = 0) {
  // simple streak multiplier: +10% per 5-day streak, capped at +50%
  const bonus = Math.min(0.5, Math.floor(streak / 5) * 0.1)
  return Math.round(basePoints * (1 + bonus))
}

export function advanceStreak(lastCompletedDateStr, today = new Date()) {
  // returns { newStreak, lastDateStr }
  const last = lastCompletedDateStr ? new Date(lastCompletedDateStr) : null
  const ymd = (d) => d.toISOString().slice(0,10)
  if (!last) return { newStreak: 1, lastDateStr: ymd(today) }
  const diffDays = Math.floor((today - last) / (1000*60*60*24))
  if (diffDays === 0) return { newStreak: null, lastDateStr: ymd(today) } // already counted today
  if (diffDays === 1) return { newStreak: 'increment', lastDateStr: ymd(today) }
  return { newStreak: 1, lastDateStr: ymd(today) }
}
