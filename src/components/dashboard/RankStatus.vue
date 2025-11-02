<script setup>
import { useRewardsStore } from '../../store'
const { state, rank } = useRewardsStore()
</script>

<template>
  <div class="card rewards">
    <div style="min-width:120px">
      <div class="h2">Rewards</div>
      <div class="lead">Rank: {{ rank }}</div>
    </div>
    <div class="xp-bar">
      <div class="fill" :style="{ width: Math.min(100, state.points/2) + '%' }"></div>
    </div>
    <div class="crown">👑</div>
    <div style="margin-left:8px">{{ state.points }}</div>
  </div>
</template>
