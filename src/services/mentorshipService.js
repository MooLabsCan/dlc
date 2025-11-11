import { useUserStore } from '../stores/user'

function backendUrl(path) {
  const origin = window.location.origin
  if (/^http:\/\/localhost:5173$/i.test(origin)) {
    return `http://localhost/dlc/back/${path}`
  }
  try {
    return new URL(`/dlc/back/${path}`, origin).toString()
  } catch (e) {
    return origin + `/dlc/back/${path}`
  }
}

export async function saveAboutMe(aboutMe) {
  const userStore = useUserStore()
  const une = userStore.user?.username || userStore.user?.name
  if (!une) throw new Error('Missing username')
  const url = backendUrl('users/profiles_save.php')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ une, about_me: aboutMe })
  })
  const data = await res.json().catch(() => null)
  if (data && data.status === 'ok' && data.record) {
    userStore.setUser({ ...(userStore.user || {}), aboutMe: data.record.about_me ?? aboutMe })
    return true
  }
  return false
}

export async function fetchMentors() {
  const url = backendUrl('mentorship/mentors_list.php')
  const res = await fetch(url)
  const data = await res.json().catch(() => null)
  return data?.items || []
}

export async function applyToMentor(mentorUne) {
  const userStore = useUserStore()
  const devoteeUne = userStore.user?.username || userStore.user?.name
  const url = backendUrl('mentorship/apply.php')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ devotee_une: devoteeUne, mentor_une: mentorUne })
  })
  const data = await res.json().catch(() => null)
  return data?.status === 'ok'
}

export async function fetchApplicants() {
  const userStore = useUserStore()
  const mentorUne = userStore.user?.username || userStore.user?.name
  const url = backendUrl('mentorship/applicants_list.php')
  const res = await fetch(url + `?mentor_une=${encodeURIComponent(mentorUne)}`)
  const data = await res.json().catch(() => null)
  return data?.items || []
}

export async function decideApplicant(id, decision) {
  const userStore = useUserStore()
  const mentorUne = userStore.user?.username || userStore.user?.name
  const url = backendUrl('mentorship/decide.php')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, decision, mentor_une: mentorUne })
  })
  const data = await res.json().catch(() => null)
  return data?.status === 'ok'
}

export async function fetchDevotees() {
  const userStore = useUserStore()
  const mentorUne = userStore.user?.username || userStore.user?.name
  const url = backendUrl('mentorship/devotees_list.php')
  const res = await fetch(url + `?mentor_une=${encodeURIComponent(mentorUne)}`)
  const data = await res.json().catch(() => null)
  return data?.items || []
}
