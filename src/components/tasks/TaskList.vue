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
