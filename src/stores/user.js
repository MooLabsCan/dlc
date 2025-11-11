import { defineStore } from 'pinia'
import { fetchTasks, saveTasks, fetchInbox } from '../services/tasksService'

function todayKey(){
  const d = new Date()
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const dd = String(d.getDate()).padStart(2,'0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    booting: false,
    _recordLoaded: false,
    tasksByUser: {}, // { [une]: { [dateISO]: Task[] } }
    inboxByUser: {} // { [une]: InboxItem[] }
  }),
  getters: {
    accountType: (s) => s.user?.accountType || null,
    isMentor: (s) => s.user?.accountType === 'mentor' || s.user?.accountType === 'life_coach',
    mentorUne: (s) => s.user?.mentorUne || null,
    aboutMe: (s) => s.user?.aboutMe || '',
    todayKey: () => todayKey(),
    myUne: (s) => s.user?.username || s.user?.name || null,
    myTodayTasks(s){
      const une = this.myUne
      const key = this.todayKey
      return (s.tasksByUser[une]?.[key]) || []
    }
  },
  actions: {
    setBooting(v) { this.booting = !!v },
    setUser(u) { this.user = u },
    setAccountType(t) {
      this.user = { ...(this.user || {}), accountType: t }
    },
    setMentorUne(m) { this.user = { ...(this.user || {}), mentorUne: m } },
    setAboutMe(text) { this.user = { ...(this.user || {}), aboutMe: text } },
    markRecordLoaded() { this._recordLoaded = true },
    reset() {
      this.user = null
      this.booting = false
      this._recordLoaded = false
      this.tasksByUser = {}
      this.inboxByUser = {}
    },
    ensureUserDate(une, date){
      if (!this.tasksByUser[une]) this.tasksByUser[une] = {}
      if (!this.tasksByUser[une][date]) this.tasksByUser[une][date] = []
    },
    async loadTasksFor(une, date){
      try {
        const items = await fetchTasks(une, date)
        this.ensureUserDate(une, date)
        this.tasksByUser[une][date] = items
      } catch (e) {
        this.ensureUserDate(une, date)
      }
    },
    async saveTasksFor(une, date){
      const items = (this.tasksByUser[une]?.[date]) || []
      await saveTasks(une, date, items)
    },
    toggleTask(une, date, id){
      this.ensureUserDate(une, date)
      const t = this.tasksByUser[une][date].find(x => x.id === id)
      if (t) t.completed = !t.completed
    },
    addTaskFor(une, date, task){
      this.ensureUserDate(une, date)
      const arr = this.tasksByUser[une][date]
      const maxId = arr.reduce((m, t) => Math.max(m, t.id || 0), 0)
      arr.unshift({
        id: maxId + 1,
        title: String(task.title||'').trim(),
        description: String(task.description||'').trim(),
        frequency: task.frequency || 'daily',
        category: task.category || 'custom',
        difficulty: task.difficulty || 1,
        completed: !!task.completed
      })
    },
    async refreshMyInbox(){
      const une = this.myUne
      if (!une) return []
      try {
        const items = await fetchInbox(une)
        this.inboxByUser[une] = items
        return items
      } catch (e) { return [] }
    }
  }
})
