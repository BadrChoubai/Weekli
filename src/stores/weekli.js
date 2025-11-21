import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeekliStore = defineStore('weekli', () => {
  // Weeks storage: Map of week IDs to week data
  const weeks = ref(new Map())

  // Currently active week ID
  const activeWeekId = ref(null)

  // Generate a week ID based on date (ISO week format)
  const generateWeekId = (date = new Date()) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust to Monday
    const monday = new Date(d.setDate(diff))
    return monday.toISOString().split('T')[0]
  }

  // Initialize or get current week
  const getCurrentWeek = () => {
    const weekId = generateWeekId()
    if (!weeks.value.has(weekId)) {
      initializeWeek(weekId)
    }
    activeWeekId.value = weekId
    return weeks.value.get(weekId)
  }

  // Initialize a new week with empty days
  const initializeWeek = (weekId) => {
    const weekData = {
      id: weekId,
      goal: {},
      createdAt: new Date().toISOString(),
      days: [],
    }

    // Create day entries for the week
    // Always create 7 days (Mon-Sun) but config determines which ones are visible
    const startDate = new Date(weekId)
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startDate)
      dayDate.setDate(dayDate.getDate() + i)

      weekData.days.push({
        id: `${weekId}-day-${i}`,
        date: dayDate.toISOString().split('T')[0],
        dayOfWeek: getDayName(dayDate),
        goal: null,
        tasks: [],
        completed: false,
      })
    }

    weeks.value.set(weekId, weekData)
  }

  // Get day name from date
  const getDayName = (date) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return days[date.getDay()]
  }

  // Set weekly goal on first day
  const setWeeklyGoal = (weekId, goalText) => {
    const week = weeks.value.get(weekId)
    if (week) {
      if (goalText.trim()) {
        week.goal = {
          text: goalText,
          createdAt: new Date().toISOString(),
        }
      } else {
        week.goal = {}
      }
    }
  }

  // Add task to a specific day
  const addTask = (weekId, dayIndex, taskText) => {
    const week = weeks.value.get(weekId)
    if (week && week.days[dayIndex]) {
      const task = {
        id: `task-${Date.now()}-${Math.random()}`,
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString(),
      }
      week.days[dayIndex].tasks.push(task)
      return task
    }
  }

  return {
    // State
    weeks,
    activeWeekId,

    // Actions
    getCurrentWeek,
    initializeWeek,
    setWeeklyGoal,
    addTask,
  }
})
