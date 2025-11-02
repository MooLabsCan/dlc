import { reactive, computed } from 'vue'

const state = reactive({
  tasks: [
    { id: 12, user_id: 1, title: 'Morning Reflection', description: '10 min journaling on purpose', frequency: 'daily', category: 'spiritual', difficulty: 1, completed: false },
    { id: 13, user_id: 1, title: 'Do a Kind Deed', description: 'Offer help to someone today', frequency: 'daily', category: 'service', difficulty: 1, completed: false },
    { id: 14, user_id: 1, title: 'Read 10 pages', description: 'Grow in wisdom', frequency: 'daily', category: 'mental', difficulty: 1, completed: true },
    { id: 15, user_id: 1, title: 'Draw or Write', description: 'Express divine inspiration', frequency: 'daily', category: 'creative', difficulty: 1, completed: false },
  ],
  acknowledgements: [
    { id: 1, type: 'praise', message: 'The Queen acknowledges your diligence.' },
    { id: 2, type: 'guidance', message: "Reflect more deeply on yesterday\'s work." },
    { id: 3, type: 'blessing', message: 'Your devotion strengthens the realm.' },
  ]
})

export function useTasksStore(){
  function toggleComplete(id){
    const t = state.tasks.find(x => x.id === id)
    if (t){ t.completed = !t.completed }
  }
  const progress = computed(() => {
    const total = state.tasks.length
    const done = state.tasks.filter(t => t.completed).length
    return total ? Math.round((done/total)*100) : 0
  })
  return { state, toggleComplete, progress }
}
