<script setup>
import { ref, onMounted } from 'vue'
import { fetchApplicants, decideApplicant, fetchDevotees } from '../../services/mentorshipService'

const loading = ref(true)
const applicants = ref([])
const devotees = ref([])
const deciding = ref(0)
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    const [apps, devs] = await Promise.all([
      fetchApplicants(),
      fetchDevotees()
    ])
    applicants.value = apps
    devotees.value = devs
  } catch (e) {
    error.value = String(e)
  } finally {
    loading.value = false
  }
}

async function decide(id, decision) {
  deciding.value = id
  const ok = await decideApplicant(id, decision)
  deciding.value = 0
  if (!ok) {
    error.value = 'Action failed. Please try again.'
  } else {
    await load()
  }
}

onMounted(load)
</script>

<template>
  <div class="mentor-panel card" style="margin-top:12px">
    <div class="h2">Applicants</div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="!applicants.length" class="sub">No pending applications.</div>
      <div class="list">
        <div class="row" v-for="a in applicants" :key="a.id">
          <div class="left">
            <div class="name">{{ a.devotee_une }}</div>
            <div class="about">{{ a.about_me || 'No bio provided.' }}</div>
          </div>
          <div class="actions">
            <button class="accept" :disabled="deciding===a.id" @click="decide(a.id, 'accept')">Accept</button>
            <button class="reject" :disabled="deciding===a.id" @click="decide(a.id, 'reject')">Reject</button>
          </div>
        </div>
      </div>
    </div>

    <div class="h2" style="margin-top:16px">Your Devotees</div>
    <div v-if="!devotees.length" class="sub">You have no devotees yet.</div>
    <ul class="devlist">
      <li v-for="d in devotees" :key="d.une">
        <div class="dev-name">{{ d.une }}</div>
        <div class="dev-about">{{ d.about_me || '' }}</div>
      </li>
    </ul>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
.list { display: grid; gap: 10px; }
.row { display:flex; gap: 12px; justify-content: space-between; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px; }
.left { flex: 1; }
.name { font-weight: 700; }
.about { opacity: 0.85; font-size: 14px; white-space: pre-wrap; }
actions { display:flex; gap: 8px; }
.accept { background: #065f46; color:#fff; border: none; padding: 8px 10px; border-radius: 8px; cursor: pointer; }
.reject { background: #7f1d1d; color:#fff; border: none; padding: 8px 10px; border-radius: 8px; cursor: pointer; }
.devlist { list-style: none; padding: 0; display: grid; gap: 8px; }
.dev-name { font-weight: 600; }
.dev-about { opacity: 0.8; font-size: 13px; }
.error { color: #b00020; margin-top: 8px; }
</style>
