<script setup>
import { computed } from 'vue'
import { useWeekliStore } from '@/stores/weekli'
import WeekliCalendarCard from './WeekliCalendarCard.vue'

const weekliStore = useWeekliStore()

const currentWeek = computed(() => {
  return weekliStore.getCurrentWeek()
})
</script>

<template>
  <section>
    <header class="calendar-header">
      <div>
        <h2>Week of: {{ currentWeek.id }}</h2>
      </div>
    </header>
    <div class="grid" v-if="currentWeek">
      <WeekliCalendarCard v-for="day in currentWeek.days" :key="day.id" :day="day" />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  overflow-x: scroll;
  grid-template-columns: repeat(7, 400px);
  gap: var(--app-spacing);
  background-color: var(--app-surface-color);
  padding: 2rem;
  grid-template-areas: 'mon tue wed thur fri sat sun';
}

.mon {
  grid-area: mon;
}
.tue {
  grid-area: tue;
}
.wed {
  grid-area: wed;
}
.thur {
  grid-area: thur;
}
.fri {
  grid-area: fri;
}
.sat {
  grid-area: sat;
}
.sun {
  grid-area: sun;
}
</style>
