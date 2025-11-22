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
  <footer class="container">
    <span> &copy; 2025 &mdash; Weekli</span>
  </footer>
</template>

<style scoped>
header,
footer {
  margin-block: var(--app-block-spacing-horizontal) var(--app-block-spacing-vertical);
}
</style>
