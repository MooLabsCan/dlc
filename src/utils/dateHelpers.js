export function todayYMD(d = new Date()) {
  return d.toISOString().slice(0,10)
}

export function isSameDay(a, b) {
  return a && b && a.slice(0,10) === b.slice(0,10)
}

export function startOfWeek(d = new Date()) {
  const date = new Date(d)
  const day = date.getDay() // 0 Sun .. 6 Sat
  const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Monday as start
  return new Date(date.setDate(diff))
}

export function isSameWeek(aStr, b = new Date()) {
  if (!aStr) return false
  const a = new Date(aStr)
  const s1 = startOfWeek(a)
  const s2 = startOfWeek(b)
  return s1.toDateString() === s2.toDateString()
}
