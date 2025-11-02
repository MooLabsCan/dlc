<script setup>
import { computed } from 'vue'
const props = defineProps({ value: { type: Number, default: 0 } })
const radius = 90
const circumference = 2 * Math.PI * radius
const dashOffset = computed(() => (1 - (props.value/100)) * circumference)
</script>

<template>
  <div class="progress-ring pulse">
    <svg :width="220" :height="220" viewBox="0 0 220 220">
      <g transform="translate(110,110)">
        <circle :r="radius" cx="0" cy="0" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="14" />
        <circle class="glow-stroke" :r="radius" cx="0" cy="0" fill="none" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" stroke="url(#grad)" stroke-width="14" transform="rotate(-90)" />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" :stop-color="'#f4c059'" />
            <stop offset="100%" :stop-color="'#7b61ff'" />
          </linearGradient>
        </defs>
      </g>
    </svg>
    <div class="value">{{ value }}%</div>
    <div class="label">Progress</div>
  </div>
</template>
