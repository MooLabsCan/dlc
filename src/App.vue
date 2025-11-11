<script setup>
import { onMounted, watch, computed } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import MentorDashboard from './views/MentorDashboard.vue'
import AccountSetup from './views/AccountSetup.vue'
import BootAuth from './views/BootAuth.vue'
import { useUserStore } from './stores/user'
import { handleAuthRedirect } from './services/authService'
import { fetchOrCreateUserRecord } from './services/accountService'

const userStore = useUserStore()

onMounted(() => {
  // If coming back from login hub with token, show boot loader immediately
  try {
    const url = new URL(window.location.href)
    const token = url.searchParams.get('au')
    if (token) userStore.setBooting(true)
  } catch (e) {}
  // Handle redirect from login hub and validate token if present
  handleAuthRedirect()
})

// When user becomes available, fetch or create their account record
watch(() => userStore.user, async (u) => {
  if (!u || userStore._recordLoaded) return
  const une = u.username || u.name
  const email = u.email || ''
  await fetchOrCreateUserRecord({ une, email })

  // Adjust URL for clarity
  const origin = window.location.origin
  if (!userStore.user?.accountType) {
    const dest = new URL('/account-setup', origin)
    window.history.pushState({}, '', dest.toString())
  } else if (userStore.user?.accountType === 'mentor' || userStore.user?.accountType === 'life_coach') {
    const dest = new URL('/mentor', origin)
    window.history.pushState({}, '', dest.toString())
  } else {
    const dest = new URL('/dashboard', origin)
    window.history.pushState({}, '', dest.toString())
  }
}, { immediate: false })

// React when the accountType gets set later from AccountSetup
watch(() => userStore.user && userStore.user.accountType, (t) => {
  if (!userStore.user) return
  const origin = window.location.origin
  if (!t) {
    const dest = new URL('/account-setup', origin)
    window.history.pushState({}, '', dest.toString())
  } else if (t === 'mentor' || t === 'life_coach') {
    const dest = new URL('/mentor', origin)
    window.history.pushState({}, '', dest.toString())
  } else {
    const dest = new URL('/dashboard', origin)
    window.history.pushState({}, '', dest.toString())
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <BootAuth v-if="userStore.booting" />
      <Home v-else-if="!userStore.user" />
      <section v-else style="margin-top:40px">
        <AccountSetup v-if="!userStore.user?.accountType" />
        <MentorDashboard v-else-if="userStore.user?.accountType === 'mentor' || userStore.user?.accountType === 'life_coach'" />
        <Dashboard v-else />
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
