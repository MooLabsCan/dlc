<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { updateAccountType } from '../services/accountService'
import { saveAboutMe } from '../services/mentorshipService'

const userStore = useUserStore()
const choice = ref('devotee')
const saving = ref(false)
const error = ref('')
const aboutMe = ref(userStore.user?.aboutMe || '')
const savingAbout = ref(false)

async function saveChoice(){
  error.value = ''
  saving.value = true
  try {
    const ok = await updateAccountType(choice.value)
    if (!ok) {
      error.value = 'Failed to save your choice. Please try again.'
    }
  } catch (e) {
    error.value = String(e)
  } finally {
    saving.value = false
  }
}

async function saveAbout(){
  error.value = ''
  savingAbout.value = true
  try {
    const ok = await saveAboutMe(aboutMe.value)
    if (!ok) error.value = 'Failed to save profile.'
  } catch (e) {
    error.value = String(e)
  } finally {
    savingAbout.value = false
  }
}
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="h1 title">Create your account</div>
      <p>Welcome, {{ userStore.user?.username || userStore.user?.name || 'friend' }}. Choose the type of account you want to create.</p>

      <div class="options">
        <label class="option">
          <input type="radio" name="acct" value="devotee" v-model="choice" />
          <div>
            <div class="h2">Devotee</div>
            <div class="sub">I am here to grow through daily tasks and guidance.</div>
          </div>
        </label>
        <label class="option">
          <input type="radio" name="acct" value="mentor" v-model="choice" />
          <div>
            <div class="h2">Mentor / Life Coach</div>
            <div class="sub">I guide devotees and provide mentorship.</div>
          </div>
        </label>
      </div>

      <div class="section">
        <div class="h2">About Me</div>
        <p class="sub">Write a short introduction that others can see. This helps mentors/devotees understand you.</p>
        <textarea v-model="aboutMe" rows="4" class="textarea" placeholder="A few words about you..."></textarea>
        <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
          <button class="secondary" :disabled="savingAbout" @click="saveAbout">{{ savingAbout ? 'Saving...' : 'Save Profile' }}</button>
          <span v-if="userStore.user?.aboutMe" class="saved-note">Saved.</span>
        </div>
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <button class="primary" :disabled="saving" @click="saveChoice">
        {{ saving ? 'Saving...' : 'Continue' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Root container: give a deeper, polished canvas while keeping readability */
.container {
  padding: 48px 16px;
  background: linear-gradient(180deg, #0f172a 0%, #111827 40%, #0b1220 100%);
  color: #e5e7eb;
}

/* Card: glassy surface with subtle depth */
.card {
  max-width: 720px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  padding: 28px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
  backdrop-filter: blur(8px);
}

/* Headings and text */
.h1 { font-size: 26px; font-weight: 800; letter-spacing: -0.01em; }
.title { margin-bottom: 8px; }
.card p { color: #4b5563; margin: 4px 0 8px; }
.h2 { font-size: 18px; font-weight: 700; color: #0f172a; }
.sub { color: #6b7280; font-size: 14px; }

/* Options */
.options { display: grid; gap: 14px; margin: 18px 0 22px; }
.option {
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: start;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fafafa;
  transition: border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease, background-color 120ms ease;
}
.option:hover { border-color: #c7d2fe; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.08); transform: translateY(-1px); }
.option:active { transform: translateY(0); }

/* Radio appearance and selected state accent */
.option input[type="radio"] { accent-color: #4f46e5; margin-top: 3px; }
.option input[type="radio"]:focus-visible { outline: none; box-shadow: 0 0 0 2px #eef2ff; }

/* When checked, elevate the option and tint heading */
.option input[type="radio"]:checked + div .h2 { color: #1f2937; }
.option input[type="radio"]:checked + div .sub { color: #374151; }
.option input[type="radio"]:checked ~ * { }
.option:has(input[type="radio"]:checked) { border-color: #a5b4fc; background: #f8fafc; box-shadow: 0 6px 18px rgba(79,70,229,0.10); }

/* Error */
.error { color: #b00020; margin-bottom: 12px; font-weight: 600; }

.textarea { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #e5e7eb; background: #fff; color: #111827; }
.secondary { background: #f3f4f6; color: #111827; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; cursor: pointer; }
.saved-note { color: #059669; font-weight: 600; }

/* Primary button: refined with subtle gradient and states */
.primary {
  background: linear-gradient(180deg, #111827 0%, #0b1220 100%);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 11px 18px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.18);
  transition: transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
}
.primary:hover { transform: translateY(-1px); box-shadow: 0 12px 24px rgba(0,0,0,0.22); }
.primary:active { transform: translateY(0); }
.primary:disabled { opacity: 0.65; cursor: not-allowed; box-shadow: none; }

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .card { background: rgba(17, 24, 39, 0.66); color: #e5e7eb; border-color: rgba(255,255,255,0.08); }
  .card p { color: #cbd5e1; }
  .h2 { color: #e5e7eb; }
  .sub { color: #cbd5e1; }
  .option { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); }
  .option:hover { border-color: rgba(165, 180, 252, 0.6); box-shadow: 0 4px 14px rgba(79, 70, 229, 0.22); }
  .option:has(input[type="radio"]:checked) { border-color: rgba(165, 180, 252, 0.9); background: rgba(255,255,255,0.06); }
}
</style>
