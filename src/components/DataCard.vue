<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  unit?: string
  trend?: string
  accent?: 'cyan' | 'blue' | 'green' | 'gold' | 'red'
}>()
</script>

<template>
  <article class="data-card" :class="`accent-${accent ?? 'cyan'}`">
    <span class="card-label">{{ label }}</span>
    <strong>
      {{ value }}
      <em v-if="unit">{{ unit }}</em>
    </strong>
    <small v-if="trend">{{ trend }}</small>
  </article>
</template>
