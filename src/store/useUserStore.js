import { reactive, computed } from 'vue'

const state = reactive({
  id: 1,
  username: 'disciple_matt',
  role: 'devotee',
  email: 'matt@example.com',
  streak: 5,
})

export function useUserStore(){
  const displayName = computed(() => `Devotee ${state.username.split('_')[1]?.[0]?.toUpperCase()+state.username.split('_')[1]?.slice(1) || 'User'}`)
  return { state, displayName }
}
