<script setup>
import { computed } from 'vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
const displayName = computed(() => {
  const u = userStore.user
  if (!u) return 'Friend'
  const base = u.username || u.name || 'Friend'
  // Capitalize if underscore pattern present
  if (base.includes('_')) {
    const parts = base.split('_')
    const tail = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : parts[0]
    return `${(u.accountType === 'devotee' ? 'Devotee' : 'Mentor')} ${tail}`
  }
  return `${(u.accountType === 'devotee' ? 'Devotee' : 'Mentor')} ${base}`
})

// Dashboard subline varies by account type
const subline = computed(() => {
  const u = userStore.user
  // Default to devotee copy when user is not loaded yet
  if (!u) return "Your Queen watches over today's purpose."
  return u.accountType === 'devotee'
    ? "Your Queen watches over today's purpose."
    : "Guide with grace over today's purpose."
})
</script>

<template>
  <div class="greeting">
    <div class="avatar">
      <div class="halo"></div>
      <span class="crown">👑</span>
    </div>
    <div class="meta">
      <div class="hello h1">Good morning, {{ displayName }}</div>
      <div class="sub">{{ subline }}</div>
    </div>
  </div>
</template>

<style scoped>
.greeting {
  display: flex;
  align-items: center;
  gap: 14px;
}
.avatar {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 6px 18px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
}
.crown { font-size: 24px; }
.halo {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, rgba(255,215,128,0.25), rgba(255,215,128,0.0) 60%);
  filter: blur(6px);
  pointer-events: none;
}
.meta .hello { line-height: 1.2; }
.meta .sub { opacity: 0.8; font-size: 13px; }

@media (min-width: 900px) {
  .greeting { gap: 18px; }
  .avatar { width: 64px; height: 64px; }
  .crown { font-size: 28px; }
}
</style>
