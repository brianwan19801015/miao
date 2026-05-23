---
name: shopify-theme-ui-optimization
description: "Shopify主题UI优化技能合集。涵盖从PPT产品内容同步、现代UI设计系统搭建、交互动效实现到CI/CD部署的全流程。适用于苗本芳养发皂等Shopify主题网站的视觉升级。"
---

# Shopify 主题 UI 优化 Skill

## 概述

本 skill 包含将产品介绍PPT内容同步到Shopify网站、重构UI设计系统、添加交互动效、以及通过GitHub Actions自动部署的完整流程。

## 目录

1. [PPT内容同步](#1-ppt内容同步)
2. [现代UI设计系统](#2-现代ui设计系统)
3. [交互动效](#3-交互动效)
4. [关键Section模板](#4-关键section模板)
5. [部署流程](#5-部署流程)
6. [客户准备工作清单](#6-客户准备工作清单)

---

## 1. PPT内容同步

### PPT页码与Shopify Section对应关系

| PPT页码 | 内容 | Shopify section 文件 |
|:-------:|------|---------------------|
| 第1页 | 封面/Hero | `hero.liquid` |
| 第2页 | 痛点 | `pain-points.liquid` |
| 第3页 | 产品定位/品牌故事 | `product-intro.liquid` + `brand-story.liquid` |
| **第4页** | **18味草本配伍** | **`ingredients.liquid`** |
| 第5页 | 45天古法冷制 | `technology.liquid` |
| 第6页 | 5大0添加 | `zero-add.liquid` |
| 第7-8页 | 核心优势 | `core-advantages.liquid` |
| 第9页 | 功效 | `effects.liquid` |
| **第10页** | **赠品** | **`gifts.liquid`** |
| 第11页 | 产品线 | `product-line.liquid` |
| 第12页 | 使用教程 | `how-to-use.liquid` + `massage-tips.liquid` |

### 18味草本配伍排版规范（PPT第4页）

4栏并列布局，每栏：圆形图片 + 标题 + 草本标签。

| 栏目 | 图片主题 | 草本内容 | 味数 |
|------|---------|---------|:---:|
| 🌱 养发根基 | 叶子+树根 | 何首乌、桑葚、墨旱莲 | 3味 |
| 💧 控油净澈 | 水滴/清洁 | 皂角、无患子、侧柏叶、茶枯 | 4味 |
| 🌿 舒缓清洁 | 叶子/草药 | 艾叶、苦参、蛇床子、地肤子、薄荷 | 5味 |
| 🔄 活络疏通 | 脉络/疏通 | 丹参、川芎、透骨草、骨碎补、桑叶、榆皮 | 6味 |

**约束：**
- 养发根基只有3味（何首乌、桑葚、墨旱莲），**不包含侧柏叶**
- 侧柏叶属于控油净澈
- 总计 3+4+5+6 = **18味**
- 四栏样式必须统一（统一使用 herb-tags 标签样式）

### 赠品排版规范（PPT第10页）

3栏并列布局，每栏：圆形图片 + 赠品名称 + 赠送条件 + 描述。

| 赠品 | 条件 | 图片文件 |
|------|------|---------|
| 起泡网 | 每盒 | `slide10_gift_bubble_net.png` |
| 沥水皂盒 | 购买两盒赠送 | `slide10_gift_drain_box.png` |
| 气垫按摩梳 | 购买三盒赠送价值 | `slide10_gift_air_cushion_comb.png` |

**注意：** 图片文件名不要使用中文，否则 Shopify asset_url 可能解析失败。

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
  
  /* 中性色 */
  --bg: #fafaf9;
  --bg-warm: #f5f0eb;
  --card: #ffffff;
  --text: #1a1a2e;
  --text-secondary: #6b7280;
  
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

### 响应式断点

| 断点 | 适用 | 列数变化 |
|------|------|---------|
| >1024px | 桌面 | 4列 → 4列 |
| 768-1024px | 小平板 | 4列 → 2列 |
| 480-768px | 手机横屏 | 2列 → 1列 |
| <480px | 手机竖屏 | 保持1列 |

---

## 3. 交互动效

### 滚动入场动画

在需要动画的元素上添加 `animate-on-scroll` 类：

```html
<div class="herb-category animate-on-scroll">...</div>
```

CSS实现：

```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

JS实现（Intersection Observer）：

```javascript
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
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

### 数字计数动画

HTML：
```html
<div class="hero-stat-number" data-target="18">0</div>
```

JS：
```javascript
function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-target'), 10);
  var current = 0;
  var step = Math.ceil(target / 60);
  var timer = setInterval(function() {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current;
  }, 20);
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

```css
.faq-item.active .faq-question i { transform: rotate(180deg); }
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition);
}
.faq-item.active .faq-answer {
  max-height: 300px;
  padding: 0 24px 20px;
}
```

---

## 4. 关键Section模板

### Hero Section

```liquid
<section class="hero" id="hero">
  <div class="hero-slide" style="background-image: url('{{ 'slide1_img0_0.png' | asset_url }}');">
    <div class="container hero-content">
      <span class="hero-badge">🌿 源自苗家古方 · 科学配伍</span>
      <h1>品牌名<span>产品名</span></h1>
      <p>卖点文案...</p>
      <div class="hero-btns">
        <a href="#ingredients" class="btn btn-primary btn-lg">主按钮</a>
        <a href="#contact" class="btn btn-white btn-lg">次按钮</a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-number" data-target="18">0</div>
          <div class="hero-stat-label">统计项</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Ingredients Section（18味草本）

```liquid
<section class="ingredients" id="ingredients">
  <div class="container">
    <h2 class="section-title center">18味草本配伍，回归温和净养</h2>
    <p class="section-desc center">源自《苗族医药学》18味苗家古方 · 科学配伍</p>
    
    <div class="herb-categories">
      <!-- 4个 herb-category，每个带 animate-on-scroll -->
      <div class="herb-category animate-on-scroll">
        <div class="herb-img">
          <img src="{{ 'slide4_imgXX.png' | asset_url }}" alt="分类名">
        </div>
        <h3 class="category-title">🌱 分类名</h3>
        <div class="herb-tags">
          <span class="herb-tag">草本1</span>
          <span class="herb-tag">草本2</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Gifts Section（赠品）

```liquid
<section class="gifts" id="gifts">
  <div class="container">
    <h2 class="section-title">买就送，赠品价值超百元！</h2>
    
    <div class="gift-grid">
      <div class="gift-card animate-on-scroll">
        <div class="gift-img">
          <img src="{{ 'slide10_gift_xxx.png' | asset_url }}" alt="赠品名">
        </div>
        <h3 class="gift-name">赠品名 <span class="gift-condition">（条件）</span></h3>
        <p class="gift-desc">描述文案...</p>
      </div>
    </div>
  </div>
</section>
```

---

## 5. 部署流程

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

### 图片命名规范

- 不使用中文字符，统一使用英文
- 格式：`slide{页码}_{描述}.png`
- 示例：`slide10_gift_bubble_net.png`

---

## 6. 客户准备工作清单

客户需提供以下资料才能部署此系统：

1. **GitHub 账号** — 注册 github.com
2. **GitHub 仓库** — 创建仓库存放主题代码
3. **Shopify 商店域名** — 形如 yourstore.myshopify.com
4. **Theme Access 密码** — 从 Shopify Theme Access 应用生成（shptka_...）
5. **Shopify 主题 ID** — 首次部署后获取
6. **产品资料（可选）** — PPT、图片、文案等

详细清单见 `docs/Shopify主题自动部署系统-客户准备工作清单.docx`

---

## 文件结构参考

```
miao/
├── assets/
│   ├── style.css              # 主样式表
│   ├── main.js                # 主JS（动画、交互）
│   ├── slide1_img0_0.png      # Hero背景
│   ├── slide4_img11_14.png    # 养发根基图标
│   ├── slide4_img12_15.png    # 控油净澈图标
│   ├── slide4_img13_16.png    # 舒缓清洁图标
│   ├── slide4_img14_17.png    # 活络疏通图标
│   ├── slide10_gift_bubble_net.png       # 起泡网
│   ├── slide10_gift_drain_box.png        # 沥水皂盒
│   └── slide10_gift_air_cushion_comb.png # 气垫按摩梳
├── sections/
│   ├── hero.liquid
│   ├── pain-points.liquid
│   ├── ingredients.liquid     # 18味草本
│   ├── gifts.liquid           # 赠品
│   └── ...
├── layout/
│   └── theme.liquid
├── templates/
│   └── index.json
├── config/
│   └── settings_schema.json
├── skills/
│   ├── shopify-theme-cicd/    # CI/CD部署skill
│   └── ppt-to-shopify/        # PPT同步skill
├── docs/
│   └── Shopify主题自动部署系统-客户准备工作清单.docx
└── .github/
    └── workflows/
        └── deploy-shopify.yml
```

---

> 本 skill 基于苗本芳养发皂项目实践总结，适用于Shopify主题网站的UI优化与自动化部署。
