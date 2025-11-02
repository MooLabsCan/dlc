<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <header class="dlc-header w-full border-b border-gray-200">
    <div class="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
      <div class="flex items-center gap-2">
        <span class="text-2xl">👑</span>
        <span class="font-bold text-lg">Divine Lifecoaches</span>
      </div>
      <nav class="hidden md:flex items-center gap-4 text-sm">
        <a href="#home" class="hover:underline">Home</a>
        <a href="#dashboard" class="hover:underline">Dashboard</a>
        <a href="#assignments" class="hover:underline">Assignments</a>
        <a href="#rituals" class="hover:underline">Rituals</a>
        <a href="#history" class="hover:underline">History</a>
        <a href="#community" class="hover:underline">Community</a>
        <a href="#profile" class="hover:underline">Profile</a>
      </nav>
      <button class="md:hidden" @click="open = !open" aria-label="Toggle Menu">☰</button>
    </div>
    <div v-if="open" class="md:hidden border-t border-gray-200 px-4 pb-4 space-y-2">
      <a href="#home" class="block">Home</a>
      <a href="#dashboard" class="block">Dashboard</a>
      <a href="#assignments" class="block">Assignments</a>
      <a href="#rituals" class="block">Rituals</a>
      <a href="#history" class="block">History</a>
      <a href="#community" class="block">Community</a>
      <a href="#profile" class="block">Profile</a>
    </div>
  </header>
</template>

<style scoped>
.dlc-header { background: #fff; }
</style>
