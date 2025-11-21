<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="['plus-icon', { interactive }]"
  >
    <path
      class="vertical"
      d="M2.75 7H11.25"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
    <path
      class="horizontal"
      d="M7 2.75L7 11.25"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 14,
  },
  strokeWidth: {
    type: [Number, String],
    default: 'var(--icon-stroke-width)',
  },
  interactive: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.plus-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.plus-icon.interactive {
  transition: color var(--app-transition);
  cursor: pointer;
}

.plus-icon.interactive:hover {
  color: var(--app-accent-color);
}
</style>
