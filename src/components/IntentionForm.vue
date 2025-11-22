<template>
  <section>
    <form v-if="!hasGoal" @submit.prevent="handleSubmit" class="intention-form-wrapper">
      <input
        id="intention-form-input"
        v-model="intention"
        type="text"
        placeholder="What needs to be done this week?"
        class="intention-form-input"
      />
      <button type="submit" class="btn" :disabled="!intention.trim()">Set Intention</button>
    </form>
    <form v-else @submit.prevent="handleReset" class="intention-form-wrapper">
      <input
        type="text"
        :placeholder="currentWeek.goal.text"
        class="intention-form-input intention-form-display"
        disabled
      />
      <button type="submit" class="btn btn-danger">Unset</button>
    </form>
  </section>
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
.intention-form-wrapper {
  width: 100%;
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
}

.intention-form-input {
  background-color: transparent;
  color: var(--app-color);
  padding: var(--app-spacing);
  border: var(--app-border-width) transparent solid;
  flex: 1;
}

.intention-form-input:focus {
  outline: none;
  field-sizing: content;
  border-bottom-color: var(--app-accent-color);
}

.intention-form-display {
  cursor: default;
}

.btn-danger {
  background-color: var(--danger);
}
</style>
