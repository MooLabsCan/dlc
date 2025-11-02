import { reactive, computed } from 'vue'

const state = reactive({
  points: 150,
  streakBonusAvailable: true,
})

export function useRewardsStore(){
  function add(points){ state.points += points }
  const rank = computed(() => {
    const p = state.points
    if (p < 200) return 'Initiate'
    if (p < 400) return 'Servant'
    if (p < 700) return 'Keeper'
    if (p < 1000) return 'Knight'
    if (p < 1400) return 'Hand'
    if (p < 1900) return 'Herald'
    return 'Regent'
  })
  return { state, add, rank }
}
