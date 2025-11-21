<script setup>
import WeekliCalendar from '@/components/WeekliCalendar.vue'
import IntentionForm from '@/components/IntentionForm.vue'
</script>

<template>
  <header class="container">
    <hgroup>
      <h1>Weekli</h1>
      <p>Don't end the week with nothing.</p>
    </hgroup>
  </header>
  <main class="container grid">
    <IntentionForm />
    <WeekliCalendar />
  </main>
</template>

<style scoped>
header {
  padding: 1rem 0;
}
</style>
