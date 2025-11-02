<script setup>
import { useUserStore } from '../../store'
const { state, displayName } = useUserStore()
</script>

<template>
  <div class="greeting">
    <div class="avatar">
      <div class="halo"></div>
      <span style="font-size:28px">👑</span>
    </div>
    <div class="meta">
      <div class="hello h1">Good morning, {{ displayName }}</div>
      <div class="sub">Your Queen watches over today's purpose.</div>
    </div>
  </div>
</template>
