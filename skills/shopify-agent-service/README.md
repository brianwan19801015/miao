# Shopify Agent — AI 智能部署系统

## 整体架构

```
用户 → shopifyagent.html (填表: 域名/Token/主题ID/模板选择)
                ↓
        云函数/后端API (接收表单数据)
                ↓
        OpenClaw Agent (子会话触发)
                ↓
     ┌──────────┼──────────┐
     ↓          ↓          ↓
  模板A     模板B      模板C
  (品牌型)  (爆品型)   (多品型)
     ↓          ↓          ↓
  生成主题代码 → Git Push → GitHub Actions → Shopify 部署
                ↓
        通知用户部署完成
```

## 系统组件

### 1. 前端页面 `shopifyagent.html`
- 模板选择（3-5种风格预览）
- 表单填写（域名、Token、主题ID、联系方式）
- 已有页面结构，需要扩展模板选择 UI

### 2. 后端 API / 云函数
- 接收表单提交 → 保存到数据库
- 触发 OpenClaw Agent 子会话
- Agent 根据 template 参数执行对应逻辑

### 3. OpenClaw Agent Skills
- **shopify-agent-service/** → 主调度 skill（本文件）
- **shopify-template-brand/** → 品牌展示型模板生成
- **shopify-template-product/** → 电商爆品型模板生成
- **shopify-template-multi/** → 多品类型模板生成
- （复用）**shopify-theme-cicd/** → CI/CD 部署
- （复用）**shopify-theme-ui-optimization/** → UI 优化

### 4. GitHub 仓库与 CI/CD
- 每个客户一个仓库（或统一仓库 + 分支）
- GitHub Actions 自动部署到对应 Shopify 商店

## 模板列表

| 模板ID | 名称 | 适用场景 | 设计风格 | 核心 Section |
|--------|------|---------|---------|-------------|
| brand | 品牌展示型 | 品牌故事 + 产品介绍 | 莫奈风格/极简 | about, product-intro, story, contact |
| product | 电商爆品型 | 单品打爆（如苗本芳） | 现代营销风 | hero, why-us, ingredients, gifts, faq, reviews |
| multi | 多品类型 | 多SKU店铺 | 简洁购物风 | collection-grid, search, filters, product-card |
| b2b | B2B批发型 | 批发/定制业务 | 专业商务风 | inquiry-form, catalog, bulk-order, about-company |

## 技术栈
- **前端**: Tailwind CSS + Font Awesome
- **后端**: 云函数 (Tencent SCF) + FlexDB
- **Agent**: OpenClaw Agent (子会话)
- **部署**: GitHub Actions → Shopify Theme CLI
- **通知**: 邮件 (nodemailer) + 企业微信
