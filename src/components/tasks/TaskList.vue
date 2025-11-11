<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TaskCard from '../ui/TaskCard.vue'
import Modal from '../ui/Modal.vue'
import { useTasksStore } from '../../store'
import { useUserStore } from '../../stores/user'
import { fetchInbox, ackInbox } from '../../services/tasksService'

const { state, toggleComplete, addTask } = useTasksStore()
const userStore = useUserStore()

const newTitle = ref('')
const newDesc = ref('')

const showVow = ref(false)
const inboxItem = ref(null)

function todayISO(){
  const d = new Date()
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const dd = String(d.getDate()).padStart(2,'0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

async function checkInbox(){
  const une = userStore.myUne
  if (!une) return
  const items = await fetchInbox(une)
  if (items && items.length){
    inboxItem.value = items[0]
    showVow.value = true
  }
}

async function acceptTask(){
  const une = userStore.myUne
  if (!une || !inboxItem.value) { showVow.value=false; return }
  await ackInbox(une, inboxItem.value.id, true)
  // Reload today's tasks from backend to include accepted task
  await userStore.loadTasksFor(une, todayISO())
  showVow.value = false
}
async function declineTask(){
  const une = userStore.myUne
  if (!une || !inboxItem.value) { showVow.value=false; return }
  await ackInbox(une, inboxItem.value.id, false)
  showVow.value = false
}

function submitTask(){
  addTask(newTitle.value, newDesc.value)
  newTitle.value = ''
  newDesc.value = ''
}

onMounted(async () => {
  // Load today's tasks initially
  const une = userStore.myUne
  if (une) { await userStore.loadTasksFor(une, todayISO()) }
  // Check for newly assigned tasks
  await checkInbox()
})
</script>

<template>
  <div>
    <div v-if="userStore.accountType==='devotee'" class="card add-task-card">
      <div class="h3">Add a custom daily task</div>
      <div class="form-row">
        <input v-model="newTitle" type="text" placeholder="Task title" class="input" />
        <button class="btn btn-gold" :disabled="!newTitle" @click="submitTask">Add</button>
      </div>
      <input v-model="newDesc" type="text" placeholder="Optional description" class="input input-secondary" />
    </div>

    <div class="tasks-grid">
      <TaskCard v-for="t in state.tasks" :key="t.id" :task="t" @toggle="toggleComplete" />
    </div>

    <Modal v-model="showVow" title="A new task has arrived">
      <div v-if="inboxItem">
        <div class="h3">{{ inboxItem.title }}</div>
        <div style="opacity:0.85; margin-bottom:10px">{{ inboxItem.description }}</div>
        <div style="font-size:14px; opacity:0.9; margin-bottom:10px">Do you vow to accept and complete this task?</div>
        <div style="display:flex; gap:8px; justify-content:flex-end">
          <button class="btn" @click="declineTask">Decline</button>
          <button class="btn btn-gold" @click="acceptTask">I Vow to Accept</button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.h3{ font-size: 16px; font-weight:700; margin-bottom:8px; }
.add-task-card{ margin-bottom:12px; padding:12px; border-radius:12px; }
.form-row{ display:flex; gap:8px; margin-bottom:8px; }
.input{ flex:1; padding:8px 10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.06); color: #fff; }
.input-secondary{ width:100%; }
.tasks-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 720px) {
  .tasks-grid {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
}
</style>
