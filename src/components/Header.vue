<script setup>
import { ref } from 'vue'
import logoUrl from '../assets/divineLCLogo.webp'

const open = ref(false)
</script>

<template>
  <header class="header-bar">
    <div class="inner">
      <a href="#home" class="brand">
        <img :src="logoUrl" alt="Divine Lifecoaches" class="logo" />
        <span class="name">Divine Lifecoaches</span>
      </a>
      <nav class="nav desktop">
        <a href="#home" class="link">Home</a>
        <a href="#dashboard" class="link">Dashboard</a>
        <a href="#assignments" class="link">Assignments</a>
        <a href="#rituals" class="link">Rituals</a>
        <a href="#history" class="link">History</a>
        <a href="#community" class="link">Community</a>
        <a href="#profile" class="link">Profile</a>
      </nav>
      <button class="menu-toggle" @click="open = !open" aria-label="Toggle Menu">☰</button>
    </div>
    <nav v-if="open" class="nav mobile">
      <a href="#home" class="link">Home</a>
      <a href="#dashboard" class="link">Dashboard</a>
      <a href="#assignments" class="link">Assignments</a>
      <a href="#rituals" class="link">Rituals</a>
      <a href="#history" class="link">History</a>
      <a href="#community" class="link">Community</a>
      <a href="#profile" class="link">Profile</a>
    </nav>
  </header>
</template>

<style scoped>
.header-bar {
  width: 100%;
  background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.82));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}
.inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: inherit; }
.logo {
  width: 32px; height: 32px; object-fit: cover; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}
.name { font-weight: 800; letter-spacing: 0.3px; font-size: 18px; }

.nav.desktop { display: none; align-items: center; gap: 14px; }
.menu-toggle {
  appearance: none; border: 1px solid rgba(0,0,0,0.12); background: rgba(255,255,255,0.6);
  padding: 8px 10px; border-radius: 10px; cursor: pointer; line-height: 1; font-size: 16px;
}
.menu-toggle:hover { background: rgba(0,0,0,0.04); }

.nav.mobile {
  display: grid; gap: 8px; padding: 8px 16px 14px; border-top: 1px solid rgba(0,0,0,0.06);
  background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.86));
}
.link { color: #111827; opacity: 0.9; text-decoration: none; padding: 8px 10px; border-radius: 8px; }
.link:hover { background: rgba(0,0,0,0.05); }

@media (min-width: 900px) {
  .nav.desktop { display: inline-flex; }
  .menu-toggle { display: none; }
}
</style>
