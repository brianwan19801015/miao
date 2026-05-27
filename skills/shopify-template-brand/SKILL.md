---
name: shopify-template-brand
description: "品牌展示型模板 — 适合品牌故事+产品介绍的 Shopify 主题。莫奈风格/极简风，暖色调。"
---

# 品牌展示型模板 (Brand)

## 适用场景
- 高端品牌官网
- 品牌故事+产品介绍展示
- 注重设计感和品牌调性

## 设计风格
- **配色**: 暖色调 #F5F0E8, #D97757, #3D2C2E
- **字体**: Instrument Serif（标题）+ Inter/系统字体（正文）
- **风格**: 莫奈印象派风格，柔和、艺术感

## 生成的文件结构

```
config/
  settings_schema.json
layout/
  theme.liquid
templates/
  index.json
sections/
  header.liquid            # 导航栏（Logo + 菜单链接）
  hero.liquid              # 首屏大图 + 品牌标语
  brand-story.liquid       # 品牌故事（左图右文）
  product-intro.liquid     # 核心产品介绍
  features.liquid          # 产品特色/卖点（2-3栏）
  testimonials.liquid      # 客户评价/口碑
  gallery.liquid           # 品牌画册/图片展示
  contact.liquid           # 联系/询盘表单
  footer.liquid            # 页脚（版权+社交链接）
assets/
  style.css                # 全局样式（Tailwind + 自定义CSS变量）
  theme.js                 # 交互（导航、滚动动画）
```

## 生成步骤

### 1. config/settings_schema.json
```json
[{
  "name": "theme_info",
  "theme_name": "Brand Theme",
  "theme_version": "1.0.0",
  "theme_author": "Vibe Lingan"
}]
```

### 2. layout/theme.liquid
- HTML5 骨架 + `{{ content_for_header }}` + `{{ content_for_layout }}`
- 引入 Google Fonts (Instrument Serif)
- 引入 style.css 和 theme.js
- SEO meta tags (og:title, og:description, og:image, twitter:card)

### 3. sections/
每个 section 使用 Shopify 2.0 Schema：
- `{% schema %}` 定义 block 类型
- 支持 `settings` 自定义（标题、文案、图片）
- 响应式（4列→2列→1列）用 Tailwind 类

### 4. assets/style.css
CSS 变量体系：
```css
:root {
  --color-bg: #F5F0E8;
  --color-primary: #D97757;
  --color-text: #3D2C2E;
  --font-heading: 'Instrument Serif', serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

### 5. SEO 优化
- JSON-LD 结构化数据（Organization + Product）
- og:type / og:title / og:description / og:image / og:url
- Twitter Card
- canonical URL
- meta keywords

## 设计特点
- 大幅留白，突出品牌视觉
- 淡入滚动动画（Intersection Observer）
- 柔和渐变按钮 + hover 效果
- 页脚简洁（仅Logo + 版权 + 备案号）
