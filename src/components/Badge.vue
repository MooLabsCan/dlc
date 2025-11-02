<script setup>
const props = defineProps({
  title: String,
  description: String,
  image: String
})
</script>

<template>
  <div class="badge flex items-center gap-3 border rounded-lg p-3 bg-white">
    <img v-if="image" :src="image" alt="badge" class="w-10 h-10 object-cover rounded" />
    <div>
      <div class="font-semibold">{{ title }}</div>
      <div class="text-xs text-gray-600">{{ description }}</div>
    </div>
  </div>
</template>

<style scoped>
.badge { box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
</style>
