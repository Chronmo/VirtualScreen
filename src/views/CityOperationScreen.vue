<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { EChartsOption } from 'echarts'

import ChartBox from '@/components/ChartBox.vue'
import DataCard from '@/components/DataCard.vue'
import HubOverviewChart from '@/components/HubOverviewChart.vue'
import PanelBox from '@/components/PanelBox.vue'
import RealtimeList from '@/components/RealtimeList.vue'
import ScreenContainer from '@/components/ScreenContainer.vue'
import ScreenHeader from '@/components/ScreenHeader.vue'
import {
  cityCards,
  coreMetrics,
  devicePie,
  efficiencyBars,
  hubNodes,
  realtimeEvents,
  trendDays,
  trendSeries,
  warningRanks,
} from '@/data/mock'

const animatedOffset = ref(0)
let metricTimer: number | undefined
const metricAccents = ['cyan', 'red', 'blue', 'green', 'gold'] as const

const displayMetrics = computed(() =>
  coreMetrics.map((metric, index) => ({
    ...metric,
    value: Number((metric.value + Math.sin(animatedOffset.value + index) * (index < 2 ? 8 : 0.6)).toFixed(1)),
  })),
)

const trendOption = computed<EChartsOption>(() => ({
  grid: { left: 32, right: 18, top: 26, bottom: 28 },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(7, 24, 42, 0.94)',
    borderColor: 'rgba(85, 230, 255, 0.45)',
    textStyle: { color: '#dffbff' },
  },
  xAxis: {
    type: 'category',
    data: trendDays,
    axisLine: { lineStyle: { color: '#2b6381' } },
    axisLabel: { color: '#8fb9cf' },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(85, 230, 255, 0.12)' } },
    axisLabel: { color: '#8fb9cf' },
  },
  series: [
    {
      data: trendSeries,
      type: 'line',
      smooth: true,
      symbolSize: 8,
      lineStyle: { width: 3, color: '#55e6ff' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(85, 230, 255, 0.36)' },
            { offset: 1, color: 'rgba(69, 234, 208, 0.03)' },
          ],
        },
      },
      itemStyle: { color: '#f6d27a' },
    },
  ],
}))

const pieOption: EChartsOption = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(7, 24, 42, 0.94)',
    borderColor: 'rgba(85, 230, 255, 0.45)',
    textStyle: { color: '#dffbff' },
  },
  legend: { bottom: 0, textStyle: { color: '#9dc8dd' } },
  series: [
    {
      type: 'pie',
      radius: ['48%', '70%'],
      center: ['50%', '42%'],
      data: devicePie,
      label: { color: '#d6f7ff' },
      itemStyle: { borderColor: '#071522', borderWidth: 2 },
    },
  ],
  color: ['#55e6ff', '#2f9bff', '#45ead0', '#f6d27a', '#a8a6d9'],
}

const barOption: EChartsOption = {
  grid: { left: 36, right: 18, top: 20, bottom: 30 },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(7, 24, 42, 0.94)',
    borderColor: 'rgba(85, 230, 255, 0.45)',
    textStyle: { color: '#dffbff' },
  },
  xAxis: {
    type: 'category',
    data: efficiencyBars.map((item) => item.name),
    axisLine: { lineStyle: { color: '#2b6381' } },
    axisLabel: { color: '#8fb9cf' },
  },
  yAxis: {
    type: 'value',
    max: 100,
    splitLine: { lineStyle: { color: 'rgba(85, 230, 255, 0.12)' } },
    axisLabel: { color: '#8fb9cf' },
  },
  series: [
    {
      type: 'bar',
      data: efficiencyBars.map((item) => item.value),
      barWidth: 22,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#f6d27a' },
            { offset: 0.45, color: '#55e6ff' },
            { offset: 1, color: '#1a6ed1' },
          ],
        },
      },
    },
  ],
}

onMounted(() => {
  metricTimer = window.setInterval(() => {
    animatedOffset.value += 0.18
  }, 1200)
})

onBeforeUnmount(() => {
  if (metricTimer) window.clearInterval(metricTimer)
})
</script>

<template>
  <ScreenContainer>
    <div class="operation-screen">
      <ScreenHeader />

      <section class="screen-grid">
        <aside class="side-column">
          <PanelBox title="教学核心指标">
            <div class="card-grid two">
              <DataCard
                v-for="(card, index) in cityCards"
                :key="card.label"
                :label="card.label"
                :value="card.value"
                :unit="card.unit"
                :trend="card.trend"
                :accent="index % 2 === 0 ? 'cyan' : 'green'"
              />
            </div>
          </PanelBox>

          <PanelBox title="近 7 日学习访问趋势">
            <ChartBox :option="trendOption" />
          </PanelBox>

          <PanelBox title="业务告警排行">
            <ol class="rank-list">
              <li v-for="(item, index) in warningRanks" :key="item.name" :class="item.level">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <strong>{{ item.name }}</strong>
                <div class="rank-bar">
                  <i :style="{ width: `${item.value}%` }"></i>
                </div>
                <em>{{ item.value }}</em>
              </li>
            </ol>
          </PanelBox>
        </aside>

        <section class="center-stage">
          <PanelBox class="hub-panel" title="数据中枢">
            <HubOverviewChart :nodes="hubNodes" />
          </PanelBox>

          <div class="metric-ribbon">
            <DataCard
              v-for="(metric, index) in displayMetrics"
              :key="metric.label"
              :label="metric.label"
              :value="metric.value"
              :unit="metric.unit"
              :trend="metric.trend"
              :accent="metricAccents[index]"
            />
          </div>
        </section>

        <aside class="side-column">
          <PanelBox title="资源类型占比">
            <ChartBox :option="pieOption" />
          </PanelBox>

          <PanelBox title="业务处理效率">
            <ChartBox :option="barOption" />
          </PanelBox>

          <PanelBox title="实时事件日志">
            <RealtimeList :events="realtimeEvents" />
          </PanelBox>
        </aside>
      </section>

      <footer class="status-footer">
        <span><i></i>系统状态：稳定运行</span>
        <span><i></i>接口状态：Mock 数据接入</span>
        <span><i></i>图表引擎：ECharts</span>
        <span><i></i>更新时间：实时刷新</span>
      </footer>
    </div>
  </ScreenContainer>
</template>
