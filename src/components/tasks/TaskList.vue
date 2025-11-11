<script setup>
import TaskCard from '../ui/TaskCard.vue'
import { useTasksStore } from '../../store'
const { state, toggleComplete } = useTasksStore()
</script>

<template>
  <div class="tasks-grid">
    <TaskCard v-for="t in state.tasks" :key="t.id" :task="t" @toggle="toggleComplete" />
  </div>
</template>

<style scoped>
.tasks-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 720px) {
  .tasks-grid {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
}
</style>
