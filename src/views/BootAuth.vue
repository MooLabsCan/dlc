<script setup>
</script>

<template>
  <div class="boot-wrap">
    <div class="loader" aria-label="Loading" role="status"></div>
    <div class="msg">Authenticating your session…</div>
  </div>
</template>

<style scoped>
.boot-wrap {
  min-height: 60vh;
  display: grid;
  place-items: center;
  gap: 14px;
  padding: 40px 16px;
}
.loader {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(0,0,0,0.15);
  border-top-color: #111827;
  animation: spin 0.9s linear infinite;
}
.msg { color: #111827; opacity: 0.8; font-size: 14px; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
