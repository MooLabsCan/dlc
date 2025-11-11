// Auth service to handle token-based session validation after redirect from login hub
import { useUserStore } from '../stores/user'

function getApiEndpoint() {
  // Determine backend API base depending on where the frontend is running
  const origin = window.location.origin
  // If running on Vite dev server (usually :5173), call XAMPP backend under /dlc/back/api
  if (/^http:\/\/localhost:5173$/i.test(origin)) {
    return 'http://localhost/dlc/back/api/check_session.php'
  }
  // If served from a site domain (e.g., https://liap.ca/dlc), try relative path to back/api
  // In many shared-host setups, /dlc/back/api is reachable from the same origin
  // Use absolute path from origin if site root hosts the project under /dlc
  // Attempt same-origin relative path first; fallback to absolute with /dlc prefix
  try {
    // Prefer relative to avoid cross-origin when deployed together
    return new URL('/dlc/back/api/check_session.php', origin).toString()
  } catch (e) {
    return origin + '/dlc/back/api/check_session.php'
  }
}

export async function validateToken(token) {
  const url = getApiEndpoint()
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
    const data = await res.json().catch(() => ({}))
    return data
  } catch (err) {
    console.error('Auth validation failed:', err)
    return { status: 'error', error: String(err) }
  }
}

function mapUser(apiUser, currentUser) {
  if (!apiUser) return null
  // Map backend user fields to our app's expected structure
  return {
    name: apiUser.username || apiUser.name || 'User',
    username: apiUser.username || apiUser.name || 'User',
    email: apiUser.email || '',
    lang: apiUser.lang || 'EN',
    // Preserve existing points if already present; default to 0
    points: currentUser?.points ?? 0,
    accountType: apiUser.accountType || null
  }
}

function cleanAuthParamsFromUrl() {
  const url = new URL(window.location.href)
  url.searchParams.delete('au')
  url.searchParams.delete('og')
  // Optionally navigate to /dashboard path for nicer URL if on root
  // Preserve hash if any
  const dest = url.toString()
  window.history.replaceState({}, '', dest)
}

export async function handleAuthRedirect() {
  const userStore = useUserStore()
  try {
    const url = new URL(window.location.href)
    const token = url.searchParams.get('au')
    const og = url.searchParams.get('og')

    if (!token) return // nothing to do

    // Enter booting state while we validate
    userStore.setBooting(true)

    // If og === 'false', this indicates a redirect from login
    // But even if og is absent, we can still try to validate if token is present
    const shouldValidate = og === 'false' || og === '0' || og === 'False' || og === 'FALSE' || og === null
    if (!shouldValidate) { userStore.setBooting(false); return }

    const result = await validateToken(token)
    if (result && result.status === 'authenticated' && result.user) {
      const mapped = mapUser(result.user, userStore.user)
      userStore.setUser(mapped)
      cleanAuthParamsFromUrl()
      // Do not navigate here; App.vue will decide the destination after account record check
    } else {
      // Clean params but stay on Home if auth failed
      cleanAuthParamsFromUrl()
      console.warn('Authentication failed or invalid token', result)
    }
  } catch (e) {
    console.error('Error handling auth redirect:', e)
  } finally {
    // Leave booting mode; UI can transition based on user presence
    userStore.setBooting(false)
  }
}
