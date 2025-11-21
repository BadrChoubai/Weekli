import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeekliStore = defineStore('weekli', () => {
  const weeks = ref(new Map())
  const activeWeekId = ref(null)

  // Format date as local YYYY-MM-DD
  const formatLocalDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Get Monday of the week for a given date
  const getMondayOfWeek = (date = new Date()) => {
    const d = new Date(date)
    const day = d.getDay()
    const daysToMonday = day === 0 ? 6 : day - 1
    d.setDate(d.getDate() - daysToMonday)
    return d
  }

  // Get day name from date
  const getDayName = (date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    return days[date.getDay()]
  }

  // Initialize a single week
  const initializeWeek = (weekId) => {
    const [year, month, day] = weekId.split('-')
    const startDate = new Date(year, month - 1, day)

    const weekData = {
      id: weekId,
      goal: {},
      createdAt: new Date().toISOString(),
      days: [],
    }

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startDate)
      dayDate.setDate(dayDate.getDate() + i)

      weekData.days.push({
        id: `${weekId}-day-${i}`,
        date: formatLocalDate(dayDate),
        dayOfWeek: getDayName(dayDate),
        goal: null,
        tasks: [],
        completed: false,
      })
    }

    weeks.value.set(weekId, weekData)
  }

  // Initialize all 52 weeks of the year
  const initializeYear = () => {
    const today = new Date()
    const year = today.getFullYear()

    // Start from January 1st and generate Mondays for each week
    let currentDate = new Date(year, 0, 1)
    const firstMonday = getMondayOfWeek(currentDate)

    for (let i = 0; i < 52; i++) {
      const weekMonday = new Date(firstMonday)
      weekMonday.setDate(weekMonday.getDate() + i * 7)

      const weekId = formatLocalDate(weekMonday)
      initializeWeek(weekId)
    }
  }

  // Get current week or initialize if needed
  const getCurrentWeek = () => {
    const monday = getMondayOfWeek()
    const weekId = formatLocalDate(monday)
    activeWeekId.value = weekId
    return weeks.value.get(weekId)
  }

  // Set weekly goal
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

  // Toggle task completion
  const toggleTask = (weekId, dayIndex, taskId) => {
    const week = weeks.value.get(weekId)
    if (week && week.days[dayIndex]) {
      const task = week.days[dayIndex].tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
      }
    }
  }

  // Initialize on first load
  initializeYear()

  return {
    weeks,
    activeWeekId,
    getCurrentWeek,
    setWeeklyGoal,
    addTask,
    toggleTask,
  }
})
