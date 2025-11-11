import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    booting: false,
    _recordLoaded: false,
  }),
  getters: {
    accountType: (s) => s.user?.accountType || null,
    isMentor: (s) => s.user?.accountType === 'mentor' || s.user?.accountType === 'life_coach',
    mentorUne: (s) => s.user?.mentorUne || null,
    aboutMe: (s) => s.user?.aboutMe || ''
  },
  actions: {
    setBooting(v) { this.booting = !!v },
    setUser(u) { this.user = u },
    setAccountType(t) {
      this.user = { ...(this.user || {}), accountType: t }
    },
    setMentorUne(m) { this.user = { ...(this.user || {}), mentorUne: m } },
    setAboutMe(text) { this.user = { ...(this.user || {}), aboutMe: text } },
    markRecordLoaded() { this._recordLoaded = true },
    reset() {
      this.user = null
      this.booting = false
      this._recordLoaded = false
    }
  }
})
