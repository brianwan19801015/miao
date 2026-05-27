---
name: shopify-template-b2b
description: "B2B批发型模板 — 适合批发/定制业务的 Shopify 主题。专业商务风，强调询盘和批量沟通。"
---

# B2B批发型模板 (B2B)

## 适用场景
- 外贸批发/OEM/ODM
- 企业采购/批量定制
- 需要询盘表单 + 目录 + 企业资质展示

## 设计风格
- **配色**: 专业商务色（深蓝/灰/白为主）
- **风格**: 简洁专业，信息层次清晰，突出企业实力

## 生成的文件结构

```
config/
  settings_schema.json
layout/
  theme.liquid
templates/
  index.json               # 首页
  catalog.json              # 产品目录页
  product.json              # 产品详情（含询盘按钮）
  about.json                # 关于我们
  contact.json              # 联系/询盘页
sections/
  header.liquid            # 导航（含多语言切换占位）
  hero-b2b.liquid          # 首屏（企业标语 + 数据统计）
  service-cards.liquid     # 核心服务/产品分类
  catalog-list.liquid      # 产品目录列表
  product-card-b2b.liquid  # 产品卡片（型号+规格+询盘按钮）
  strength.liquid          # 企业优势（产能/交期/认证/团队）
  case-studies.liquid      # 案例展示
  inquiry-form.liquid      # 询盘表单（产品名+数量+规格+备注）
  about-company.liquid     # 企业介绍
  contact-info.liquid      # 联系方式
  footer.liquid            # 页脚
assets/
  style.css
  theme.js
```

## 关键功能

### 首屏数据统计
```
4栏数字展示（如：500+产品 / 100+客户 / 50+国家 / 10年经验）
用 CSS counter 动画递增效果
```

### 产品目录
- 分类导航（左侧或顶部）
- 产品列表模式（非网格，更适合B2B）
- 每个产品显示：型号、规格、最小起订量、询盘按钮

### 询盘表单 (inquiry-form.liquid)
```
字段：
  - 产品名称/编号（自动填充）
  - 数量
  - 规格要求
  - 公司名称
  - 联系人
  - 邮箱
  - 电话
  - 备注
提交后：
  - 发送到后台云函数
  - 邮件通知 support@vibelingan.com
  - 保存到数据库
```

### 企业优势展示
- 产能展示（月产量/年产量）
- 交期（打样/大货周期）
- 认证（ISO/CE/FDA等）
- 团队/工厂实拍

## B2B 特殊功能
- **最小起订量**(MOQ) 显示
- **批发价格**（不显示零售价或显示阶梯价）
- **多语言支持**（预留切换位，中英文）
- **企业微信/WhatsApp** 即时沟通按钮
- **PDF目录下载** 功能

## SEO 优化
- JSON-LD: Organization + Product + FAQPage
- 企业资质关键词布局
- 多语言 hreflang 标签（预留）
