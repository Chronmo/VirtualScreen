# VirtualScreen（虚拟数据屏）

VirtualScreen，中文名“虚拟数据屏”，是一个公开开源的数据可视化大屏教学项目。项目目标是帮助初学者从 0 到 1 学会如何自己动手制作一个完整、漂亮、可维护的数据可视化大屏。

当前版本完成了第一阶段示例：**城市运行态势数据大屏**。

## 技术栈

- Vue 3
- Vite
- TypeScript
- ECharts
- 原生 CSS
- 本地 mock 数据

## 当前示例

城市运行态势数据大屏包含：

- 顶部标题与实时时钟
- 1920x1080 大屏适配容器
- 城市核心指标卡片
- 近 7 日趋势折线图
- 区域告警排行
- 中央城市运行主视觉
- 设备类型占比环形图
- 区域处理效率柱状图
- 实时事件日志
- 底部系统状态栏

## 本地运行

```bash
npm install
npm run dev
```

启动后访问终端输出的本地地址，通常是：

```text
http://127.0.0.1:5173/
```

构建生产版本：

```bash
npm run build
```

## 目录结构

```text
VirtualScreen/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ ScreenContainer.vue
│  │  ├─ ScreenHeader.vue
│  │  ├─ DataCard.vue
│  │  ├─ PanelBox.vue
│  │  ├─ ChartBox.vue
│  │  └─ RealtimeList.vue
│  ├─ data/
│  │  └─ mock.ts
│  ├─ styles/
│  │  ├─ reset.css
│  │  └─ screen.css
│  ├─ views/
│  │  └─ CityOperationScreen.vue
│  ├─ App.vue
│  └─ main.ts
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ README.md
└─ LICENSE
```

## 学习路线

1. 搭建项目：理解 Vue 3、Vite、TypeScript 的基础工程结构。
2. 实现大屏布局：学习 1920x1080 设计比例、等比缩放和三栏布局。
3. 接入 mock 数据：用本地数据模拟真实业务接口。
4. 封装图表组件：统一管理 ECharts 初始化、更新、resize 和销毁。
5. 优化动画与适配：补充时间刷新、指标变化、日志滚动和窗口适配。
6. 部署上线：后续补充静态部署、接口切换和线上访问说明。

## 开源协议

本项目使用 MIT License 开源，详情见 [LICENSE](LICENSE)。
