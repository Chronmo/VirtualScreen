<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { HubNode } from '@/data/mock'

const props = defineProps<{
  nodes: HubNode[]
}>()

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | undefined
let resizeObserver: ResizeObserver | undefined

const statusColor: Record<HubNode['status'], string> = {
  good: '#45ead0',
  warning: '#f6d27a',
  danger: '#ff7d8b',
}

const statusText: Record<HubNode['status'], string> = {
  good: '运行良好',
  warning: '重点关注',
  danger: '风险告警',
}

const centerCoord: [number, number] = [50, 50]

const option = computed<EChartsOption>(() => {
  const links = props.nodes.map((node) => ({
    coords: [centerCoord, node.coord],
    lineStyle: {
      color: statusColor[node.status],
      opacity: node.status === 'danger' ? 0.56 : 0.34,
    },
  }))

  return {
    animationDuration: 1200,
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(7, 24, 42, 0.94)',
      borderColor: 'rgba(89, 226, 255, 0.45)',
      textStyle: { color: '#dffbff' },
      formatter: (params) => {
        const item = Array.isArray(params) ? params[0] : params
        const data = item.data as { raw?: HubNode; name?: string; value?: number[] }
        if (data.raw) {
          return [
            `<strong>${data.raw.name}</strong>`,
            `活跃度：${data.raw.value}`,
            `状态：${statusText[data.raw.status]}`,
            data.raw.description,
          ].join('<br/>')
        }
        return '<strong>数据中枢</strong><br/>汇聚教学、实战、资料与告警链路'
      },
    },
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: { type: 'value', min: 0, max: 100, show: false },
    yAxis: { type: 'value', min: 0, max: 100, show: false },
    series: [
      {
        name: '环形星轨',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        silent: true,
        z: 1,
        polyline: true,
        data: [
          { coords: createCircle(50, 50, 33, 96) },
          { coords: createEllipse(50, 50, 40, 23, 96) },
          { coords: createEllipse(50, 50, 27, 42, 96) },
        ],
        lineStyle: {
          color: 'rgba(118, 236, 255, 0.18)',
          width: 1,
          type: 'dashed',
        },
      },
      {
        name: '水波纹',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        silent: true,
        z: 1,
        polyline: true,
        data: [
          { coords: createWave(10, 24, 80, 4, 50) },
          { coords: createWave(12, 78, 76, 3, 46) },
        ],
        lineStyle: {
          color: 'rgba(89, 199, 255, 0.13)',
          width: 1,
        },
      },
      {
        name: '数据链路',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 3,
        data: links,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.34,
          symbol: 'arrow',
          symbolSize: 8,
          color: '#d6fbff',
        },
        lineStyle: {
          width: 2,
          curveness: 0.18,
        },
      },
      {
        name: '业务节点',
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        z: 5,
        rippleEffect: {
          scale: 3.6,
          brushType: 'stroke',
        },
        label: {
          show: true,
          formatter: '{b}',
          position: 'bottom',
          color: '#dffbff',
          fontSize: 13,
          textShadowColor: 'rgba(0, 0, 0, 0.7)',
          textShadowBlur: 8,
        },
        symbolSize: (value) => 18 + Number(value[2]) / 8,
        itemStyle: {
          color: (params) => {
            const node = (params.data as { raw: HubNode }).raw
            return statusColor[node.status]
          },
          shadowBlur: 22,
          shadowColor: 'rgba(89, 226, 255, 0.65)',
        },
        data: props.nodes.map((node) => ({
          name: node.name,
          value: [...node.coord, node.value],
          raw: node,
        })),
      },
      {
        name: '数据中枢',
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        z: 8,
        symbol: 'circle',
        symbolSize: 112,
        label: {
          show: true,
          formatter: '数据\n中枢',
          color: '#f5fdff',
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 26,
        },
        itemStyle: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.72,
            colorStops: [
              { offset: 0, color: '#f7ffff' },
              { offset: 0.32, color: '#55efff' },
              { offset: 0.72, color: '#1676aa' },
              { offset: 1, color: '#0a1d34' },
            ],
          },
          borderColor: '#d6f7ff',
          borderWidth: 2,
          shadowBlur: 46,
          shadowColor: 'rgba(93, 232, 255, 0.95)',
        },
        data: [{ name: '数据中枢', value: [...centerCoord, 100] }],
      },
    ],
  }
})

function createCircle(cx: number, cy: number, r: number, count: number) {
  return Array.from({ length: count + 1 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / count
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]
  })
}

function createEllipse(cx: number, cy: number, rx: number, ry: number, count: number) {
  return Array.from({ length: count + 1 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / count
    return [cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry]
  })
}

function createWave(startX: number, baseY: number, width: number, amplitude: number, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const progress = index / (count - 1)
    return [startX + width * progress, baseY + Math.sin(progress * Math.PI * 4) * amplitude]
  })
}

const renderChart = () => {
  if (!chartRef.value) return
  if (!chart) chart = echarts.init(chartRef.value)
  chart.setOption(option.value, true)
}

const resizeChart = () => {
  chart?.resize()
}

onMounted(() => {
  renderChart()
  resizeObserver = new ResizeObserver(resizeChart)
  if (chartRef.value) resizeObserver.observe(chartRef.value)
  window.addEventListener('resize', resizeChart)
})

watch(option, renderChart, { deep: true })

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  resizeObserver?.disconnect()
  chart?.dispose()
})
</script>

<template>
  <div class="hub-chart-wrap">
    <div class="hub-charm cloud-left"></div>
    <div class="hub-charm cloud-right"></div>
    <div ref="chartRef" class="hub-chart"></div>
    <div class="hub-legend">
      <span><i class="good"></i>运行良好</span>
      <span><i class="warning"></i>重点关注</span>
      <span><i class="danger"></i>风险告警</span>
    </div>
  </div>
</template>
