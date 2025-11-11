<script setup>
import { ref, onMounted, watch } from 'vue'
import Modal from '../ui/Modal.vue'
import { fetchTasks } from '../../services/tasksService'
import { assignTask } from '../../services/tasksService'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  devotee: { type: Object, default: null }
})
const emit = defineEmits(['update:modelValue'])

const loading = ref(false)
const error = ref('')
const tasks = ref([])
const newTitle = ref('')
const newDesc = ref('')

function close(){ emit('update:modelValue', false) }

function todayISO(){
  const d = new Date()
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const dd = String(d.getDate()).padStart(2,'0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

async function load(){
  if (!props.devotee?.une) { tasks.value = []; return }
  loading.value = true
  error.value = ''
  try {
    tasks.value = await fetchTasks(props.devotee.une, todayISO())
  } catch(e){ error.value = String(e) }
  finally { loading.value = false }
}

async function assign(){
  const title = String(newTitle.value||'').trim()
  if (!title || !props.devotee?.une) return
  const ok = await assignTask(props.devotee.une, { title, description: newDesc.value })
  if (!ok){ error.value = 'Failed to assign task.'; return }
  newTitle.value = ''
  newDesc.value = ''
  await load()
}

watch(() => props.modelValue, (v) => { if (v) load() })
watch(() => props.devotee, () => { if (props.modelValue) load() })
</script>

<template>
  <Modal :model-value="modelValue" @update:modelValue="val => emit('update:modelValue', val)" :title="devotee?.une ? ('Tasks for ' + devotee.une) : 'Devotee Tasks'">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="sub">Today's tasks and completion:</div>
      <ul class="tlist">
        <li v-for="t in tasks" :key="t.id">
          <span class="t-title">{{ t.title }}</span>
          <span class="t-meta">{{ t.completed ? 'Completed' : 'Pending' }}</span>
        </li>
      </ul>

      <div class="h3" style="margin-top:10px">Assign a new task</div>
      <div class="row">
        <input v-model="newTitle" class="input" placeholder="Task title" />
        <button class="btn btn-gold" :disabled="!newTitle" @click="assign">Assign</button>
      </div>
      <input v-model="newDesc" class="input input-secondary" placeholder="Optional description" />

      <div v-if="error" class="error">{{ error }}</div>

      <div style="text-align:right; margin-top:10px">
        <button class="btn" @click="close">Close</button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.sub{ opacity:0.85; margin-bottom:6px }
.tlist{ list-style:none; padding:0; margin:0; display:grid; gap:6px }
.t-title{ font-weight:600; margin-right:8px }
.t-meta{ opacity:0.85; font-size:13px }
.row{ display:flex; gap:8px; margin-top:8px }
.input{ flex:1; padding:8px 10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.06); color: #fff; }
.input-secondary{ width:100%; margin-top:6px }
.error{ color:#b00020; margin-top:6px }
</style>
