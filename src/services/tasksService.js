import { useUserStore } from '../stores/user'

function backendUrl(path) {
  const origin = window.location.origin
  if (/^http:\/\/localhost:5173$/i.test(origin)) {
    return `http://localhost/dlc/back/${path}`
  }
  // In prod, backend is same origin under /back
  return `/back/${path}`
}

export async function fetchTasks(une, dateISO){
  const url = backendUrl(`tasks/get_tasks.php?une=${encodeURIComponent(une)}&date=${encodeURIComponent(dateISO)}`)
  const res = await fetch(url)
  const data = await res.json().catch(() => null)
  return data?.items || []
}

export async function saveTasks(une, dateISO, tasks){
  const url = backendUrl('tasks/save_tasks.php')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ une, date: dateISO, tasks })
  })
  const data = await res.json().catch(() => null)
  return data?.status === 'ok'
}

export async function assignTask(toUne, task){
  const user = useUserStore().user
  const fromUne = user?.username || user?.name
  const url = backendUrl('tasks/assign_task.php')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to_une: toUne, from_une: fromUne, title: task.title, description: task.description || '' })
  })
  const data = await res.json().catch(() => null)
  return data?.status === 'ok'
}

export async function fetchInbox(une){
  const url = backendUrl(`tasks/inbox_list.php?une=${encodeURIComponent(une)}`)
  const res = await fetch(url)
  const data = await res.json().catch(() => null)
  return data?.items || []
}

export async function ackInbox(une, id, accept){
  const url = backendUrl('tasks/inbox_ack.php')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ une, id, accept: !!accept })
  })
  const data = await res.json().catch(() => null)
  return data?.status === 'ok'
}
