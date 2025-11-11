import { reactive, computed } from 'vue'
import { useUserStore } from '../stores/user'

const state = reactive({
  tasks: [],
  acknowledgements: [
    { id: 1, type: 'praise', message: 'The Queen acknowledges your diligence.' },
    { id: 2, type: 'guidance', message: "Reflect more deeply on yesterday\'s work." },
    { id: 3, type: 'blessing', message: 'Your devotion strengthens the realm.' },
  ]
})

export function useTasksStore(){
  const userStore = useUserStore()
  // Sync today's tasks from user store
  function sync(){
    const arr = userStore.myTodayTasks || []
    state.tasks.splice(0, state.tasks.length, ...arr)
  }
  sync()

  function toggleComplete(id){
    const une = userStore.myUne
    const date = userStore.todayKey
    userStore.toggleTask(une, date, id)
    sync()
    userStore.saveTasksFor(une, date)
  }
  function addTask(title, description=''){
    const une = userStore.myUne
    const date = userStore.todayKey
    const trimmed = String(title || '').trim()
    if (!trimmed) return
    userStore.addTaskFor(une, date, { title: trimmed, description })
    sync()
    userStore.saveTasksFor(une, date)
  }
  const progress = computed(() => {
    const total = state.tasks.length
    const done = state.tasks.filter(t => t.completed).length
    return total ? Math.round((done/total)*100) : 0
  })
  return { state, toggleComplete, addTask, progress }
}
