<script setup>
import { computed } from 'vue'
const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  color: { type: String, default: '#c9a227' }
})
const pct = computed(() => Math.min(100, Math.max(0, (props.value / props.max) * 100)))
</script>

<template>
  <div class="progress-bar w-full bg-gray-100 rounded h-3 overflow-hidden">
    <div class="h-full" :style="{ width: pct + '%', background: color }"></div>
  </div>
</template>

<style scoped>
.progress-bar { box-shadow: inset 0 1px 3px rgba(0,0,0,0.06); }
</style>
