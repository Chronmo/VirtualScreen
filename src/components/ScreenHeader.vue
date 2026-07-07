<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const currentTime = ref('')

const formatDate = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

let timer: number | undefined

onMounted(() => {
  currentTime.value = formatDate(new Date())
  timer = window.setInterval(() => {
    currentTime.value = formatDate(new Date())
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <header class="screen-header">
    <div class="header-line left-line"></div>
    <div class="title-block">
      <p class="title-kicker">VirtualScreen · 虚拟大屏</p>
      <h1>如意智能教学数据中心</h1>
      <span>{{ currentTime }}</span>
    </div>
    <div class="header-line right-line"></div>
  </header>
</template>
