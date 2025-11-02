<script setup>
const props = defineProps({
  title: String,
  description: String,
  points: { type: Number, default: 0 },
  frequency: { type: String, default: 'one-time' },
  completed: { type: Boolean, default: false }
})
const emit = defineEmits(['complete'])
</script>

<template>
  <div class="assignment-card border rounded-lg p-4 shadow-sm bg-white">
    <div class="flex items-start justify-between mb-2">
      <h3 class="font-semibold text-lg">{{ title }}</h3>
      <span class="text-xs px-2 py-1 rounded-full bg-gray-100">{{ frequency }}</span>
    </div>
    <p class="text-sm text-gray-700 mb-3">{{ description }}</p>
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium">+{{ points }} pts</span>
      <button :disabled="completed" @click="emit('complete')" class="px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-50">
        {{ completed ? 'Completed' : 'Complete' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.assignment-card { transition: box-shadow 0.2s ease; }
.assignment-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.06) }
</style>
