import { useUserStore } from '../stores/user'

function backendUrl(path) {
  const origin = window.location.origin
  if (/^http:\/\/localhost:5173$/i.test(origin)) {
    return `http://localhost/dlc/back/${path}`
  }
  try {
    return new URL(`/back/${path}`, origin).toString()
  } catch (e) {
    return origin + `/back/${path}`
  }
}

export async function fetchOrCreateUserRecord({ une, email }) {
  const userStore = useUserStore()
  const url = backendUrl('users/read.php')
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ une, email })
    })
    const data = await res.json().catch(() => null)
    if (data && !data.message) {
      // Expected shape from PHP: { une, email, accountType, ... }
      userStore.setUser({
        ...(userStore.user || {}),
        username: data.une || une,
        name: data.une || une,
        email: data.email || email,
        accountType: data.accountType || null,
        aboutMe: data.about_me || null,
        mentorUne: data.mentor_une || null
      })
      userStore.markRecordLoaded()
      return data
    }
    return null
  } catch (e) {
    console.error('Failed to fetch/create user record', e)
    return null
  }
}

export async function updateAccountType(accountType) {
  const userStore = useUserStore()
  const url = backendUrl('users/update_account_type.php')
  const une = userStore.user?.username || userStore.user?.name
  if (!une) throw new Error('Missing username for account update')
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ une, accountType })
    })
    const data = await res.json().catch(() => null)
    if (data && data.status === 'ok' && data.record) {
      userStore.setUser({ ...(userStore.user || {}), username: data.record.une, name: data.record.une, email: data.record.email, accountType: data.record.accountType })
      return true
    }
    return false
  } catch (e) {
    console.error('Failed to update account type', e)
    return false
  }
}
