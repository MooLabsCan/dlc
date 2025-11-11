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

// Redirect the user to the centralized login hub instead of simulating a local join.
export function joinRoyalPath(){
  const env = import.meta.env || {}
  const isProd = !!env.PROD
  const base = isProd ? env.VITE_AUTH_LOGIN_BASE_PROD : env.VITE_AUTH_LOGIN_BASE_LOCAL
  // Fallbacks if env vars are not defined
  const fallback = isProd ? 'https://liap.ca/login.php' : 'http://localhost/mapmoo/login.php'
  const target = base || fallback
  try {
    const u = new URL(target)
    u.searchParams.set('site', 'dlc')
    window.location.href = u.toString()
  } catch (e) {
    const sep = target.includes('?') ? '&' : '?'
    window.location.href = `${target}${sep}site=dlc`
  }
}

// Namespaced light-weight stores for the new tracker sub-app
export { useUserStore } from './useUserStore'
export { useTasksStore } from './useTasksStore'
export { useRewardsStore } from './useRewardsStore'
