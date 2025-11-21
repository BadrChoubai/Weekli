<script setup>
import WeekliCalendar from '@/components/WeekliCalendar.vue'
import IntentionForm from '@/components/IntentionForm.vue'
</script>

<template>
  <header class="container">
    <hgroup class="group">
      <h1>Weekli</h1>
      <p>Don't end the week with nothing.</p>
    </hgroup>

    <IntentionForm />
  </header>
  <main class="container">
    <WeekliCalendar />
  </main>
</template>

<style scoped>
header {
  grid-template-columns: repeat(2, 1fr);
  padding: var(--app-spacing) 0;

  align-items: center;
}
</style>
