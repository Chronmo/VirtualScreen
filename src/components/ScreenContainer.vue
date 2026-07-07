<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

const scale = ref(1)

const updateScale = () => {
  const widthScale = window.innerWidth / DESIGN_WIDTH
  const heightScale = window.innerHeight / DESIGN_HEIGHT
  scale.value = Math.min(widthScale, heightScale)
}

const screenStyle = computed(() => ({
  width: `${DESIGN_WIDTH}px`,
  height: `${DESIGN_HEIGHT}px`,
  transform: `translate(-50%, -50%) scale(${scale.value})`,
}))

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<template>
  <main class="screen-shell">
    <section class="screen-canvas" :style="screenStyle">
      <slot />
    </section>
  </main>
</template>
