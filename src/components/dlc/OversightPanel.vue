<script setup>
import { useTasksStore, useUserStore } from '../../store'
const { state: tasks } = useTasksStore()
const { state: user } = useUserStore()
const devotees = [
  { id:1, name:'Matt', streak:5, completed: tasks.tasks.filter(t=>t.completed).length },
  { id:2, name:'Ava', streak:3, completed: 2 },
]
</script>

<template>
  <div class="card">
    <div class="h2">DLC Oversight</div>
    <div class="lead">Coach view of devotees and summaries</div>
    <div>
      <div v-for="d in devotees" :key="d.id" class="card" style="margin:8px 0">
        <div class="title">{{ d.name }}</div>
        <div class="meta">Streak: {{ d.streak }} days • Today Completed: {{ d.completed }}</div>
      </div>
    </div>
  </div>
</template>
