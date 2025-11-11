<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/user'
import { fetchMentors, applyToMentor } from '../../services/mentorshipService'

const userStore = useUserStore()
const mentors = ref([])
const loading = ref(true)
const applying = ref('')
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    mentors.value = await fetchMentors()
  } catch (e) {
    error.value = String(e)
  } finally {
    loading.value = false
  }
}

async function choose(une) {
  applying.value = une
  error.value = ''
  const ok = await applyToMentor(une)
  applying.value = ''
  if (!ok) {
    error.value = 'Failed to apply. Please try again.'
  } else {
    // No immediate mentorUne until accepted; show a toastish state via error label
    error.value = 'Application sent. Awaiting mentor approval.'
  }
}

onMounted(load)
</script>

<template>
  <div class="picker">
    <div class="h2">Choose a Mentor</div>
    <p class="sub">Browse available mentors and send an application. You will be assigned once accepted.</p>
    <div v-if="loading">Loading mentors...</div>
    <div v-else>
      <div v-if="!mentors.length" class="empty">No mentors are available yet. Please check back later.</div>
      <div class="list">
        <div v-for="m in mentors" :key="m.une" class="item card">
          <div class="top">
            <div class="name">{{ m.une }}</div>
            <div class="count">Guiding {{ m.devotee_count || 0 }} devotees</div>
          </div>
          <div class="about">{{ m.about_me || 'No bio yet.' }}</div>
          <button class="apply" :disabled="applying===m.une" @click="choose(m.une)">
            {{ applying===m.une ? 'Sending...' : 'Apply' }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
.picker { padding: 12px; }
.list { display: grid; gap: 12px; }
.item { padding: 12px; }
.top { display:flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
.name { font-weight: 700; }
.count { opacity: 0.7; font-size: 12px; }
.about { opacity: 0.85; font-size: 14px; margin: 8px 0 10px; white-space: pre-wrap; }
.apply { background: #111827; color:#fff; border:1px solid rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 8px; cursor:pointer }
.empty { opacity: 0.8; }
.error { color: #b00020; margin-top: 8px; }
</style>
