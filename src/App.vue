<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import { state } from './store'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <Home v-if="!state.user" />
      <section v-else style="margin-top:40px">
        <Dashboard />
      </section>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.min-h-screen { min-height: 100vh; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-1 { flex: 1 1 auto; }
</style>
