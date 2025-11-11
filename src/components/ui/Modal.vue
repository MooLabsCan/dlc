<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  width: { type: String, default: '520px' }
})
const emit = defineEmits(['update:modelValue'])
function close(){ emit('update:modelValue', false) }
</script>

<template>
  <div v-if="modelValue" class="overlay" @click.self="close">
    <div class="modal" :style="{ width: width }">
      <div class="header">
        <div class="title">{{ title }}</div>
        <button class="x" @click="close">✕</button>
      </div>
      <div class="body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay{ position: fixed; inset:0; background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index: 1000; }
.modal{ background: #0b0f14; border:1px solid rgba(255,255,255,0.1); border-radius: 12px; box-shadow: 0 10px 28px rgba(0,0,0,0.4); max-width: 92vw; }
.header{ display:flex; justify-content:space-between; align-items:center; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.title{ font-weight: 700; }
.body{ padding: 14px; }
.x{ background: transparent; border:none; color:#fff; font-size:18px; cursor: pointer; }
</style>
