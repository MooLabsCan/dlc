<script setup>
</script>

<template>
  <footer class="dlc-footer w-full border-t border-gray-200 mt-12">
    <div class="max-w-6xl mx-auto py-8 px-4 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        © {{ new Date().getFullYear() }} Divine Lifecoaches · All Rights Reserved
      </div>
      <div class="flex items-center gap-4">
        <a href="#privacy" class="hover:underline">Privacy</a>
        <a href="#terms" class="hover:underline">Terms</a>
        <a href="#contact" class="hover:underline">Contact</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.dlc-footer { background: #fafafa; }
</style>
