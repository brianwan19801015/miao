---
name: shopify-theme-ui-optimization
description: "Shopify主题UI优化技能合集。涵盖从PPT产品内容同步、现代UI设计系统搭建、字体排版系统统一、交互动效实现到CI/CD部署的全流程。适用于苗本芳养发皂等Shopify主题网站的视觉升级。"
---

# Shopify 主题 UI 优化 Skill

## 概述

本 skill 包含将产品介绍PPT内容同步到Shopify网站、重构UI设计系统、统一字体排版、添加交互动效、以及通过GitHub Actions自动部署的完整流程。

## 目录

1. [PPT内容同步](#1-ppt内容同步)
2. [现代UI设计系统](#2-现代ui设计系统)
3. [字体排版系统](#3-字体排版系统)
4. [交互动效](#4-交互动效)
5. [关键Section模板](#5-关键section模板)
6. [部署流程](#6-部署流程)
7. [常见排版问题与修复](#7-常见排版问题与修复)

---

## 1. PPT内容同步

### PPT页码与Shopify Section对应关系

| PPT页码 | 内容 | Shopify section 文件 |
|:-------:|------|---------------------|
| 第1页 | 封面/Hero | `hero.liquid` |
| 第2页 | 痛点 | `pain-points.liquid` |
| 第3页 | 产品定位/品牌故事/苗家智慧传承 | `product-intro.liquid` + `brand-story.liquid` |
| 第4页 | 18味草本配伍 | `ingredients.liquid` |
| 第5页 | 45天古法冷制锁活 | `technology.liquid`（上半部分） |
| 第6页 | 5大0添加 | `technology.liquid`（下半部分） |
| 第7-8页 | 三大核心优势 | `core-advantages.liquid` |
| 第9页 | 四大功效+权威认证 | `effects.liquid` |
| 第10页 | 赠品 | `product-line.liquid` |
| 第11页 | 产品线 | `product-line.liquid` |
| 第12页 | 使用教程 | `how-to-use.liquid` + `massage-tips.liquid` |

详细内容规范见 `ppt-to-shopify` skill。

---

## 2. 现代UI设计系统

### CSS变量体系

```css
:root {
  /* 品牌色系 - 草本自然风 */
  --brand: #2f855a;
  --brand-light: #48bb78;
  --brand-dark: #22543d;
  --brand-subtle: #f0fff4;
  --accent: #d69e2e;
  --accent-light: #fefcbf;

  /* 中性色 */
  --bg: #fafaf9;
  --bg-warm: #f5f0eb;
  --card: #ffffff;
  --text: #1a1a2e;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --line: #e5e7eb;
  --line-light: #f3f4f6;

  /* 圆角 */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 9999px;

  /* 阴影 */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);

  /* 过渡 */
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 按钮系统

```html
<!-- 主按钮 - 渐变色 -->
<a href="#" class="btn btn-primary">探索产品</a>
<!-- 大号主按钮 -->
<a href="#" class="btn btn-primary btn-lg">了解详情</a>
<!-- 描边按钮 -->
<a href="#" class="btn btn-outline">咨询购买</a>
<!-- 白色半透明按钮（适合深色背景） -->
<a href="#" class="btn btn-white">咨询购买</a>
```

### SEO文章页面模板

新增 `page.seo-article` 模板用于发布SEO博客文章：

```
templates/page.seo-article.liquid  →  仅引用 sections/seo-article.liquid
```

页面在 Shopify 中通过 `https://店铺/pages/seo-article` 访问。

SEO文章页在layout中做了特殊处理：
- 动态title/description：`{{ page.title }}` / `{{ page.meta_description }}`
- 隐藏全局的 testimonials 和 faq（文章内自带Q&A）

---

## 3. 字体排版系统

### CSS变量定义

```css
:root {
  /* 标题层级 */
  --h1-size: clamp(32px, 4vw, 46px);
  --h2-size: clamp(24px, 3vw, 34px);
  --h3-size: 20px;
  --h4-size: 17px;

  /* 正文 */
  --body-size: 15px;
  --body-small: 14px;
  --body-xs: 13px;
  --caption-size: 12px;

  /* 行高 */
  --lh-tight: 1.2;
  --lh-normal: 1.6;
  --lh-loose: 1.8;

  /* 字重 */
  --fw-bold: 700;
  --fw-semibold: 600;
  --fw-medium: 500;
  --fw-normal: 400;
}
```

### Section通用样式

```css
.section-title {
  font-size: var(--h2-size);
  font-weight: 800;
  line-height: var(--lh-tight);
  color: var(--brand-dark);
}
.section-title.center { text-align: center; }

.section-desc {
  font-size: var(--body-size);
  color: var(--text-secondary);
  max-width: 640px;
  line-height: var(--lh-normal);
}
.section-desc.center { text-align: center; }
```

### 元素层级规范

| 元素 | CSS变量 | 适用场景 |
|------|---------|---------|
| 页面标题 (h1) | `--h1-size` | Hero标题 |
| Section标题 (h2) | `--h2-size` | 各section主标题 |
| 卡片标题 (h3) | `--h3-size` | 功效卡片、草本分类 |
| 子标题/小卡片标题 (h4) | `--h4-size` | 零添加单项、底部列表标题 |
| 正文 | `--body-size` | 主要段落文字 |
| 辅助正文 | `--body-small` | 卡片描述、FAQ回答 |
| 标注文字 | `--body-xs` | 统计标签、认证徽章 |
| 极小文字 | `--caption-size` | 报告编号、badge标签 |

### 颜色映射

| 用途 | CSS变量 | 硬编码对照 |
|------|---------|-----------|
| 深绿色标题/品牌色 | `var(--brand-dark)` | `#22543d` / `#2d4a2a` |
| 绿色强调/品牌色 | `var(--brand)` | `#4a7c3f` / `#2f855a` |
| 正文/标题 | `var(--text)` | `#1a1a2e` / `#333` |
| 辅助文字 | `var(--text-secondary)` | `#6b7280` / `#555` / `#666` |
| 弱化文字 | `var(--text-muted)` | `#9ca3af` / `#888` |

### 例外情况（保留硬编码）

以下场景不使用CSS变量（设计特征）：
- 统计数字（如 `<40℃`、`0`、`45天`）→ 28px 大号
- VS对比标识 → 24px 
- 星级评分 → 18px
- emoji/图标 → 36-48px

---

## 4. 交互动效

### 滚动入场动画

在需要动画的元素上添加 `animate-on-scroll` 类：

```html
<div class="herb-category animate-on-scroll">...</div>
```

### 卡片悬停效果

```css
.card {
  transition: all var(--transition-slow);
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}
```

### FAQ手风琴

```html
<div class="faq-item">
  <div class="faq-question">
    <span>问题标题</span>
    <i class="fas fa-chevron-down"></i>
  </div>
  <div class="faq-answer">
    <p>回答内容...</p>
  </div>
</div>
```

```javascript
document.querySelectorAll('.faq-question').forEach(function(q) {
  q.addEventListener('click', function() {
    this.parentElement.classList.toggle('active');
  });
});
```

---

## 5. 关键Section模板

（详见 ppt-to-shopify skill）

---

## 6. 部署流程

### GitHub Secrets 配置

| Secret 变量 | 值 | 获取方式 |
|------------|-----|---------|
| `SHOPIFY_CLI_THEME_TOKEN` | Theme Access 密码 (shptka_...) | Shopify后台 → Theme Access 应用 |
| `SHOPIFY_STORE` | 商店域名 (xxx.myshopify.com) | Shopify后台 → 设置 |
| `SHOPIFY_THEME_ID` | 主题ID (数字) | 首次部署后获取 |

### 提交与推送

```bash
git add -A
git commit -m "type: description"
git push origin master
```

GitHub Actions 自动执行 `deploy-shopify.yml` 部署到 Shopify。

### 图片命名规范

- 不使用中文字符，统一使用英文
- 格式：`slide{页码}_{描述}.png`
- 示例：`slide10_gift_bubble_net.png`

---

## 7. 常见排版问题与修复

### 问题1：FAQ/testimonials 重复显示

**症状：** FAQ或用户评价在页面上出现两次。

**原因：** layout中全局`{% section 'faq' %}` + 页面模板中也引用了同一section。

**修复：** 移除layout中的全局渲染，由各页面模板自行控制。

```liquid
<!-- layout/theme.liquid -->
{{ content_for_layout }}
<!-- 移除以下两行 -->
{% section 'testimonials' %}
{% section 'faq' %}
```

### 问题2：内联style覆盖全局样式

**症状：** section内的样式与全局style.css冲突。

**修复：** 不移除内联style（Shopify section自带），但要确保全局style.css优先级通过 `!important` 或更具体的选择器控制。

### 问题3：标题缺少 center 类

**症状：** section标题没有居中显示。

**修复：** 在需要居中的标题上加 `center` 类。

```liquid
<h2 class="section-title center">标题</h2>
<p class="section-desc center">描述</p>
```

### 问题4：图片文件名为中文

**症状：** 图片不显示。

**修复：** 全部使用英文文件名。

### 问题5：字体排版不一致

**症状：** 各section标题大小、颜色、行高不统一。

**修复：** 使用排版系统CSS变量（见第3节），确保所有section引用同一套变量。

检查命令：
```bash
# 检查是否还有硬编码的font-size
grep -rn "font-size:" sections/ | grep -v "var(--" | grep -v "@media"

# 检查是否还有硬编码的颜色
grep -rn "#555\|#666\|#333" sections/ | grep -v "background\|border"
```

---

## 文件结构参考

```
miao/
├── assets/
│   ├── style.css              # 主样式表（含排版变量）
│   ├── main.js                # 主JS（动画、交互）
│   └── slide*.png/jpg         # 图片资源
├── sections/
│   ├── hero.liquid
│   ├── pain-points.liquid
│   ├── product-intro.liquid   # 含底部传承区域
│   ├── brand-story.liquid
│   ├── ingredients.liquid     # 18味草本
│   ├── technology.liquid      # 45天冷制 + 5大0添加
│   ├── core-advantages.liquid
│   ├── effects.liquid         # 四大功效 + 权威认证
│   ├── how-to-use.liquid
│   ├── massage-tips.liquid
│   ├── product-line.liquid
│   ├── testimonials.liquid
│   ├── faq.liquid
│   ├── seo-article.liquid     # SEO博客文章
│   ├── why-us.liquid
│   ├── contact.liquid
│   ├── trust-bar.liquid
│   ├── header.liquid
│   └── footer.liquid
├── layout/
│   └── theme.liquid
├── templates/
│   ├── index.json
│   └── page.seo-article.liquid
├── config/
│   └── settings_schema.json
├── skills/
│   ├── ppt-to-shopify/        # PPT同步skill
│   ├── shopify-theme-cicd/    # CI/CD部署skill
│   └── shopify-theme-ui-optimization/
├── docs/
│   └── Shopify主题自动部署系统-客户准备工作清单.docx
└── .github/
    └── workflows/
        └── deploy-shopify.yml
```

---

> 本 skill 基于苗本芳养发皂项目实践总结，适用于Shopify主题网站的UI优化与自动化部署。
