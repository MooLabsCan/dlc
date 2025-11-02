<script setup>
const props = defineProps({ variant: { type: String, default: 'gold' } })
</script>

<template>
  <button class="btn" :class="variant==='gold' ? 'btn-gold' : 'btn-ghost'">
    <slot />
  </button>
</template>
