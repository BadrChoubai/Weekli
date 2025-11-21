<script setup>
import PlusIcon from './PlusIcon.vue'

defineProps({
  day: Object,
})

const dayClasses = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun']

const getDayClass = (index) => {
  return dayClasses[index] || ''
}

const emit = defineEmits(['add-task'])

const navigateToAddTask = (dayIndex) => {
  emit('add-task', dayIndex)
}
</script>

<template>
  <div class="day" :class="getDayClass(index)">
    <header>
      <h2>{{ day.dayOfWeek }}</h2>
    </header>
    <div class="tasks">
      <div v-for="task in day.tasks" :key="task.id" class="task">
        <input type="checkbox" :checked="task.completed" />
        <span :class="{ completed: task.completed }">{{ task.text }}</span>
      </div>
      <button class="add-task-btn" @click="navigateToAddTask(index)" aria-label="Add task">
        <PlusIcon size="24" />
      </button>
    </div>
  </div>
</template>

<style>
.day {
  color: var(--app-color);
  background: var(--app-surface-color--opaque);
  box-shadow: var(--app-box-shadow);
  transition:
    translate var(--app-transition),
    box-shadow var(--app-transition);
  cursor: pointer;
  padding: var(--app-spacing);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
}

.day:hover {
  background: var(--app-surface-color--opaque);
  color: white;
  transform: translateY(-1px);
  box-shadow: var(--app-box-shadow--hover);
}

header {
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--app-border-color);
  padding-bottom: 1rem;
}

header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--app-color);
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--app-task-background);
  border-radius: 6px;
  transition: background var(--app-transition);
}

.task:hover {
  background: var(--app-task-background--hover);
}

.task input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--app-accent-color);
}

.task span {
  font-size: 0.95rem;
  color: var(--app-color);
  flex: 1;
}

.task span.completed {
  text-decoration: line-through;
  color: var(--app-text-muted);
}

.add-task-btn {
  background: none;
  border: none;
  padding: 0.75rem;
  cursor: pointer;
  color: var(--app-color);
  transition: color var(--app-transition);
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.75rem;
}

.add-task-btn:hover {
  color: var(--app-accent-color);
}
</style>
