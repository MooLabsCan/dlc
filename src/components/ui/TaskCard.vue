<script setup>
const props = defineProps({ task: { type: Object, required: true } })
const emit = defineEmits(['toggle'])
</script>

<template>
  <div class="card task-card fade-in">
    <div class="icon">
      <span>★</span>
    </div>
    <div style="flex:1">
      <div class="title">{{ task.title }}</div>
      <div class="meta">{{ task.description }}</div>
    </div>
    <div>
      <button class="btn" :class="task.completed ? 'btn-ghost' : 'btn-gold'" @click="emit('toggle', task.id)">
        {{ task.completed ? 'Undo' : 'Complete' }}
      </button>
    </div>
  </div>
</template>
