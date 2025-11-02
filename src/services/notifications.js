// Basic notifications stub
export function notify(message) {
  if (typeof window !== 'undefined') {
    // Simple fallback
    // eslint-disable-next-line no-alert
    console.log('[Notification]', message)
  }
}
