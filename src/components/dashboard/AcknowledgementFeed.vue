<script setup>
import { useTasksStore } from '../../store'
const { state } = useTasksStore()
</script>

<template>
  <div class="ack-feed">
    <div v-for="a in state.acknowledgements" :key="a.id" class="ack-item fade-in">
      <div class="type">{{ a.type.toUpperCase() }}</div>
      <div>{{ a.message }}</div>
    </div>
  </div>
</template>
