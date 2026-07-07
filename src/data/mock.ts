export interface MetricItem {
  label: string
  value: number
  unit: string
  trend: string
}

export interface RankItem {
  name: string
  value: number
  level: 'high' | 'medium' | 'low'
}

export interface EventItem {
  time: string
  area: string
  content: string
  status: '处理中' | '已恢复' | '已派单'
}

export const coreMetrics: MetricItem[] = [
  { label: '在线设备数', value: 12864, unit: '台', trend: '较昨日 +3.8%' },
  { label: '今日告警', value: 246, unit: '条', trend: '高优先级 18 条' },
  { label: '数据吞吐量', value: 936, unit: 'GB', trend: '峰值 72GB/h' },
  { label: '运行健康度', value: 98.6, unit: '%', trend: '稳定运行中' },
  { label: '巡检完成率', value: 91.7, unit: '%', trend: '计划内推进' },
]

export const cityCards: MetricItem[] = [
  { label: '接入系统', value: 36, unit: '个', trend: '新增 2 个' },
  { label: '覆盖区域', value: 18, unit: '区', trend: '全域在线' },
  { label: '今日工单', value: 428, unit: '件', trend: '闭环率 87%' },
  { label: '重点点位', value: 126, unit: '处', trend: '重点巡检' },
]

export const trendSeries = [560, 620, 742, 690, 868, 910, 1036]
export const trendDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

export const warningRanks: RankItem[] = [
  { name: '东湖新区', value: 86, level: 'high' },
  { name: '中央商务区', value: 73, level: 'high' },
  { name: '临港片区', value: 61, level: 'medium' },
  { name: '大学城', value: 48, level: 'medium' },
  { name: '西站枢纽', value: 32, level: 'low' },
]

export const devicePie = [
  { name: '视频感知', value: 38 },
  { name: '交通物联', value: 26 },
  { name: '环境监测', value: 18 },
  { name: '能源设施', value: 12 },
  { name: '应急终端', value: 6 },
]

export const efficiencyBars = [
  { name: '东区', value: 92 },
  { name: '南区', value: 88 },
  { name: '西区', value: 81 },
  { name: '北区', value: 94 },
  { name: '中心', value: 97 },
]

export const realtimeEvents: EventItem[] = [
  { time: '10:24:18', area: '中央商务区', content: '路口车流量异常升高，已触发协同调度', status: '处理中' },
  { time: '10:22:41', area: '东湖新区', content: '重点设备离线 1 台，巡检人员已接单', status: '已派单' },
  { time: '10:20:05', area: '西站枢纽', content: '客流热力恢复至常态阈值', status: '已恢复' },
  { time: '10:18:33', area: '大学城', content: '环境传感器数据波动，系统自动复核', status: '处理中' },
  { time: '10:15:27', area: '临港片区', content: '能源站负载预警解除', status: '已恢复' },
]
