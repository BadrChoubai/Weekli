import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref({
    firstDayOfWeek: 'monday',
    daysInWeek: 7,
  })

  const updateSettings = (newSettings) => {
    settings.value = { ...settings.value, ...newSettings }
  }

  return {
    settings,
    updateSettings,
  }
})
