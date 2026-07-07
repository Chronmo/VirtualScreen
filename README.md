# VirtualScreen（虚拟大屏）

VirtualScreen，中文名“虚拟大屏”，是一个公开开源的教学型数据大屏项目。项目主要帮助学生和初学者从 0 到 1 学习如何自己动手制作一个完整、漂亮、可维护的数据可视化大屏。

当前版本示例为：**如意智能教学数据中心**。页面采用“国风科技蓝”视觉基线，并将中心主视觉升级为不依赖地图数据的“数据中枢”态势图。

## 技术栈

- Vue 3
- Vite
- TypeScript
- ECharts
- 原生 CSS
- 本地 mock 数据

## 当前示例

如意智能教学数据中心包含：

- 顶部标题、实时时钟与流光装饰线
- 1920x1080 大屏适配容器
- 教学核心指标卡片
- 近 7 日学习访问趋势
- 业务告警排行
- 中心“数据中枢”拓扑态势图
- 资源类型占比环形图
- 业务处理效率柱状图
- 实时事件日志
- 底部系统状态栏

## 中心图说明

中心区域不使用地图数据，不引入 GeoJSON，也不使用 ECharts 的 map/geo 能力。当前实现使用 ECharts `cartesian2d + lines + effectScatter + scatter`：

- 中心节点为“如意数据中枢”
- 周围环绕课程学习、项目实战、资料下载、问答互动、教师端、学员端、数据服务、告警中心等业务节点
- 节点大小由 `value` 决定
- 节点颜色由 `status` 决定
- 动态流线表示数据链路
- Tooltip 展示节点名称、活跃度、状态说明

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

常用验证命令：

```bash
npm run lint
npm run test
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
│  │  ├─ HubOverviewChart.vue
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
5. 打造中心主视觉：用抽象坐标、动态流线和业务节点替代地图依赖。
6. 优化视觉主题：沉淀国风科技蓝配色、面板、卡片和动效规范。
7. 部署上线：后续补充静态部署、接口切换和线上访问说明。

## 开源协议

本项目使用 MIT License 开源，详情见 [LICENSE](LICENSE)。
