export interface MetricItem {
  label: string
  value: number
  unit: string
  trend: string
}

export interface HubNode {
  id: string
  name: string
  value: number
  coord: [number, number]
  status: 'good' | 'warning' | 'danger'
  description: string
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
  { label: '学习活跃度', value: 12864, unit: '次', trend: '较昨日 +3.8%' },
  { label: '今日告警', value: 246, unit: '条', trend: '高优先级 18 条' },
  { label: '数据吞吐量', value: 936, unit: 'GB', trend: '峰值 72GB/h' },
  { label: '中枢健康度', value: 98.6, unit: '%', trend: '稳定运行中' },
  { label: '实战完成率', value: 91.7, unit: '%', trend: '计划内推进' },
]

export const cityCards: MetricItem[] = [
  { label: '接入模块', value: 36, unit: '个', trend: '新增 2 个' },
  { label: '课程专题', value: 18, unit: '类', trend: '全量在线' },
  { label: '今日任务', value: 428, unit: '件', trend: '闭环率 87%' },
  { label: '重点案例', value: 126, unit: '套', trend: '持续维护' },
]

export const trendSeries = [560, 620, 742, 690, 868, 910, 1036]
export const trendDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

export const warningRanks: RankItem[] = [
  { name: '课程学习', value: 86, level: 'high' },
  { name: '项目实战', value: 73, level: 'high' },
  { name: '问答互动', value: 61, level: 'medium' },
  { name: '数据服务', value: 48, level: 'medium' },
  { name: '告警中心', value: 32, level: 'low' },
]

export const devicePie = [
  { name: '教学组件', value: 38 },
  { name: '图表资产', value: 26 },
  { name: '数据接口', value: 18 },
  { name: '工程模板', value: 12 },
  { name: '告警规则', value: 6 },
]

export const efficiencyBars = [
  { name: '课程', value: 92 },
  { name: '实战', value: 88 },
  { name: '资料', value: 81 },
  { name: '问答', value: 94 },
  { name: '中枢', value: 97 },
]

export const hubNodes: HubNode[] = [
  {
    id: 'course',
    name: '课程学习',
    value: 92,
    coord: [50, 17],
    status: 'good',
    description: '课程访问与学习进度保持高活跃',
  },
  {
    id: 'project',
    name: '项目实战',
    value: 86,
    coord: [76, 28],
    status: 'good',
    description: '实战任务提交量稳定增长',
  },
  {
    id: 'download',
    name: '资料下载',
    value: 72,
    coord: [84, 52],
    status: 'good',
    description: '模板、素材与示例数据下载稳定',
  },
  {
    id: 'qa',
    name: '问答互动',
    value: 68,
    coord: [72, 76],
    status: 'warning',
    description: '高峰期互动量上升，建议增加答疑资源',
  },
  {
    id: 'teacher',
    name: '教师端',
    value: 78,
    coord: [50, 84],
    status: 'good',
    description: '课程发布、作业批阅和数据看板运行正常',
  },
  {
    id: 'student',
    name: '学员端',
    value: 89,
    coord: [28, 76],
    status: 'good',
    description: '学习路径、项目记录与反馈数据持续同步',
  },
  {
    id: 'service',
    name: '数据服务',
    value: 81,
    coord: [16, 52],
    status: 'good',
    description: 'Mock 数据、接口适配与统计服务稳定',
  },
  {
    id: 'alarm',
    name: '告警中心',
    value: 54,
    coord: [24, 28],
    status: 'danger',
    description: '部分规则触发频率偏高，需要持续观察',
  },
]

export const realtimeEvents: EventItem[] = [
  { time: '10:24:18', area: '课程学习', content: '学习访问量升高，数据中枢已完成负载调度', status: '处理中' },
  { time: '10:22:41', area: '项目实战', content: '新增实战任务提交 24 份，等待教师端复核', status: '已派单' },
  { time: '10:20:05', area: '资料下载', content: '热门模板下载恢复至常态阈值', status: '已恢复' },
  { time: '10:18:33', area: '问答互动', content: '答疑请求出现短时峰值，系统自动标记优先级', status: '处理中' },
  { time: '10:15:27', area: '告警中心', content: '数据刷新延迟预警解除', status: '已恢复' },
]
