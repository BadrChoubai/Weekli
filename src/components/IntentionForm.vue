<template>
  <form v-if="!hasGoal" @submit.prevent="handleSubmit" class="intention-form">
    <div class="form-group">
      <input
        id="intention-input"
        v-model="intention"
        type="text"
        placeholder="What needs to be done this week?"
        class="intention-form-input"
      />
    </div>
    <button type="submit" class="submit-btn" :disabled="!intention.trim()">Set</button>
  </form>
  <form v-else @submit.prevent="handleReset" class="intention-form">
    <div class="form-group">
      <input
        type="text"
        :placeholder="currentWeek.goal.text"
        class="intention-form-input intention-form-display"
        disabled
      />
    </div>
    <button style="background-color: var(--danger)" type="submit" class="submit-btn">Unset</button>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useWeekliStore } from '@/stores/weekli'

const weekliStore = useWeekliStore()
const intention = ref('')

const currentWeek = computed(() => {
  return weekliStore.getCurrentWeek()
})

const hasGoal = computed(() => {
  return !!currentWeek.value?.goal?.text
})

const handleSubmit = () => {
  if (intention.value.trim()) {
    weekliStore.setWeeklyGoal(weekliStore.activeWeekId, intention.value)
    intention.value = ''
  }
}

const handleReset = () => {
  weekliStore.setWeeklyGoal(weekliStore.activeWeekId, '')
}

// Reset form when goal changes
watch(hasGoal, (newHasGoal) => {
  if (!newHasGoal) {
    intention.value = ''
  }
})
</script>

<style scoped>
.intention-form {
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  gap: var(--app-spacing);
  align-items: center;
}

.form-group {
  flex: 1;
  min-width: 0;
}

.intention-form-input {
  display: block;
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  border-bottom: 2px solid var(--app-color);
  background: transparent;
  color: var(--app-color);
  font-family: inherit;
  font-size: 1.75rem;
  font-weight: 300;
  transition: border-color var(--app-transition);
}

.intention-form-input::placeholder {
  color: var(--app-color);
}

.intention-form-input:focus {
  outline: none;
  border-bottom-color: var(--app-accent-color);
}

.intention-form-display {
  cursor: default;
  opacity: 0.7;
}

.submit-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--app-color);
  border: 2px solid var(--app-color);
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--app-transition);
  white-space: nowrap;
}

.submit-btn:hover:not(:disabled) {
  background: var(--app-color);
  color: var(--app-surface-color);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
