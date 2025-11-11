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

<style scoped>
.ack-feed { display: grid; gap: 10px; }
.ack-item {
  padding: 10px 12px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 6px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04);
}
.type {
  font-size: 11px;
  letter-spacing: 1px;
  opacity: 0.7;
  margin-bottom: 4px;
}
</style>
