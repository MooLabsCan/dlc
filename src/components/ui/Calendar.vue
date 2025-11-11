<script setup>
import { computed } from 'vue'

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() // 0-based

const monthStart = new Date(year, month, 1)
const monthEnd = new Date(year, month + 1, 0)
const daysInMonth = monthEnd.getDate()
const startWeekday = monthStart.getDay() // 0=Sun

const monthName = now.toLocaleString(undefined, { month: 'long' })

const cells = computed(() => {
  const blanks = Array.from({ length: startWeekday }, () => null)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const all = blanks.concat(days)
  // pad to full weeks (multiples of 7)
  const pad = (7 - (all.length % 7)) % 7
  for (let i = 0; i < pad; i++) all.push(null)
  return all
})

function isToday(d){
  if (!d) return false
  return d === now.getDate()
}
</script>

<template>
  <div class="calendar card section-card">
    <div class="cal-header">
      <div class="month">{{ monthName }} {{ year }}</div>
      <div class="legend"><span class="dot today"></span> Today</div>
    </div>
    <div class="cal-grid cal-dow">
      <div v-for="w in ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" :key="w" class="dow">{{ w }}</div>
    </div>
    <div class="cal-grid">
      <div v-for="(d,i) in cells" :key="i" class="cell" :class="{ muted: d===null, today: isToday(d) }">
        <span v-if="d">{{ d }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar{ }
.cal-header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.month{ font-weight:700; letter-spacing:0.3px; }
.legend{ font-size:12px; opacity:0.8; display:flex; align-items:center; gap:6px; }
.dot{ width:8px; height:8px; border-radius:50%; display:inline-block; }
.dot.today{ background:#f6c255; }
.cal-grid{ display:grid; grid-template-columns: repeat(7, 1fr); gap:6px; }
.cal-dow{ margin-bottom:6px; }
.dow{ text-align:center; font-size:12px; opacity:0.8; }
.cell{ aspect-ratio: 1 / 1; border:1px solid rgba(255,255,255,0.08); border-radius:10px; display:flex; align-items:center; justify-content:center; background: rgba(255,255,255,0.03); }
.cell.today{ outline: 2px solid #f6c255; }
.cell.muted{ opacity:0.4; }
</style>
