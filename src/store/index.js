// Minimal reactive store to satisfy current Home.vue imports
import { reactive } from 'vue'

export const state = reactive({
  ready: false,
  // No user is signed in by default. Home should show until user joins/signs in.
  user: null,
  joined: false
})

export function init(){
  state.ready = true
}

// Temporary "join" action to simulate account creation/sign-in.
// Until real auth exists, we treat join as creating a basic user and
// moving to Dashboard via App.vue's conditional rendering.
export function joinRoyalPath(){
  state.user = {
    id: 1,
    name: 'New Devotee',
    role: 'devotee',
    points: 0
  }
  state.joined = true
}

// Namespaced light-weight stores for the new tracker sub-app
export { useUserStore } from './useUserStore'
export { useTasksStore } from './useTasksStore'
export { useRewardsStore } from './useRewardsStore'
