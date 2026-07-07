<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="panel-box">
    <div class="panel-title">
      <span>{{ title }}</span>
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </section>
</template>
