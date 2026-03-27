# Real Estate AI SaaS - 项目规范

## 产品定位
**面向北美/澳洲房地产经纪人的 AI-lead-generation 助手**

## 解决的问题
手动从 Facebook Groups 和 Reddit 挖掘潜在客户，耗时且效率低。

## 核心功能
1. 自动监控目标房产市场（按邮编/社区）
2. 从 Facebook Groups 和 Reddit 自动抓取买卖房源线索
3. AI 生成个性化初次接触信息
4. 自动 CRM 录入和跟进提醒
5. 每周线索报告推送

## 定价

| 套餐 | 价格 | 客户类型 |
|------|------|---------|
| Starter | $197/月 | 单人经纪人 |
| Professional | $397/月 | 小型经纪团队（2-5人）|
| Enterprise | $797/月 | 大型经纪公司 |

## 技术架构

### 核心引擎
- OpenClaw（自动化任务编排）

### 前端
- Next.js + React
- Vercel Hosting
- Tailwind CSS

### 后端
- Next.js API Routes
- PostgreSQL（Supabase 或 Vercel Postgres）
- Stripe（订阅支付）

### 数据抓取
- Puppeteer/Playwright（网页抓取）
- Reddit API（合法方式）
- Facebook Groups（视平台政策）

### AI
- OpenClaw 内置 AI 能力
- 个性化消息生成

## 达到 $10K MRR 的数学路径

| 月份 | 目标客户数 | 平均收入 | MRR |
|------|-----------|---------|-----|
| Month 1 | 5 | $197 | $985 |
| Month 2 | 15 | $300 | $4,500 |
| Month 3 | 26 | $397 | $10,322 |

## 开发阶段

### Phase 1: MVP（Week 1-2）
- [ ] OpenClaw 核心环境搭建
- [ ] Facebook/Reddit 抓取 Skill
- [ ] Web 仪表盘基础版
- [ ] Stripe 集成
- [ ] 5个早期用户

### Phase 2: 产品化（Week 3-4）
- [ ] 完整注册/订阅流程
- [ ] 线索仪表盘
- [ ] 自动化报告推送
- [ ] 10个付费客户

### Phase 3: 规模化（Month 2）
- [ ] Zillow/Realtor.com 数据源
- [ ] AI 消息优化
- [ ] 内容营销
- [ ] 25个付费客户

### Phase 4: $10K MRR（Month 3）
- [ ] 推荐计划
- [ ] 案例研究
- [ ] 自动化客户成功
- [ ] 26+个付费客户 → $10K MRR

## 预算

| 项目 | 月费 |
|------|------|
| Vercel | $20 |
| 数据库（Supabase） | $0-$25 |
| AI API | $50-$100 |
| 域名 | $12 |
| **合计** | $82-$157/月 |

## 风险与缓解

| 风险 | 缓解 |
|------|------|
| Facebook API 限制 | 使用官方 Graph API，遵守平台政策 |
| Reddit API 变更 | 监控 API 变化，保持灵活性 |
| OpenClaw 稳定性 | 构建独立数据层，不过度依赖 |
| 客户获取 | 内容营销 + 直接销售 |
