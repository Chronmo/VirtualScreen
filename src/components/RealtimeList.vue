<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import type { EventItem } from '@/data/mock'

const props = defineProps<{
  events: EventItem[]
}>()

const activeEvents = ref<EventItem[]>([])
let timer: number | undefined

const createTime = () => {
  const date = new Date()
  return date.toLocaleTimeString('zh-CN', { hour12: false })
}

const pickEvent = () => props.events[Math.floor(Math.random() * props.events.length)]

onMounted(() => {
  activeEvents.value = props.events.slice(0, 5)
  timer = window.setInterval(() => {
    const event = pickEvent()
    activeEvents.value = [
      { ...event, time: createTime() },
      ...activeEvents.value.slice(0, 4),
    ]
  }, 3600)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <ul class="realtime-list">
    <li v-for="event in activeEvents" :key="`${event.time}-${event.area}-${event.content}`">
      <span class="event-time">{{ event.time }}</span>
      <div>
        <strong>{{ event.area }}</strong>
        <p>{{ event.content }}</p>
      </div>
      <em>{{ event.status }}</em>
    </li>
  </ul>
</template>
