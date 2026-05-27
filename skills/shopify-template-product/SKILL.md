---
name: shopify-template-product
description: "电商爆品型模板 — 适合单品打爆的 Shopify 主题。现代营销风，强转化设计。参考苗本芳养发皂项目。"
---

# 电商爆品型模板 (Product)

## 适用场景
- 单一爆品打爆（如苗本芳养发皂）
- 强转化导向
- 需要展示卖点、成分、资质、赠品、FAQ

## 设计风格
- **配色**: 现代商业风（根据品牌定制或默认清新绿/蓝）
- **风格**: 营销落地页结构，信息密度高，CTA 明确

## 生成的文件结构

```
config/
  settings_schema.json
layout/
  theme.liquid
templates/
  index.json
sections/
  header.liquid            # 导航（Logo + 购物车 + 菜单）
  hero.liquid              # 首屏（产品主图 + 标题 + CTA按钮 + 子标题）
  why-us.liquid            # 三大核心卖点（3栏图标+标题+描述）
  ingredients.liquid       # 成分展示（如18味草本，4栏配图）
  product-detail.liquid    # 产品详情（左图右文，或PPT风格）
  gifts.liquid             # 赠品展示（如起泡网/皂盒/按摩梳）
  certification.liquid     # 检测报告/资质认证
  reviews.liquid           # 客户评价/晒单
  faq.liquid               # 常见问题（手风琴展开）
  cta.liquid               # 底部行动号召（购买按钮）
  footer.liquid            # 页脚
assets/
  style.css                # 全局样式（Tailwind + 自定义）
  theme.js                 # 交互（FAQ展开、动画、购物车）
```

## 关键功能

### 核心卖点 (why-us.liquid)
```
3栏布局：图标 + 标题 + 描述
示例：
  18味苗方·根源调理  |  45天冷制·锁住活性  |  5大0添加·安全温和
```

### 成分展示 (ingredients.liquid)
```
4栏布局（响应式：4→2→1），每栏含：
  - 圆形图片
  - 成分名称
  - 功效描述
支持"君臣佐使"科学配伍说明
```

### 赠品展示 (gifts.liquid)
```
3栏布局：
  起泡网(每盒)  |  沥水皂盒(买2盒送)  |  气垫按摩梳(买3盒送)
```

### 检测报告 (certification.liquid)
```
检测机构 + 报告编号 + 日期
支持多份报告并列展示
```

### FAQ (faq.liquid)
```
手风琴展开效果
纯JS实现（避免CSS max-height冲突）
onclick 切换显示/隐藏
```

## 生成细节注意事项
1. **图片文件名不要用中文** — Shopify asset_url 解析失败
2. 图片用 `{{ 'filename.png' | asset_url }}` 引用
3. GIF/动画图片用 `loading="eager"`，普通内容图用 `loading="lazy"`
4. 标题居中加 `class="section-title center"`
5. 注意不要残留内联 `<style>` — 统一放到 style.css

## SEO 优化
- JSON-LD: Product + BreadcrumbList
- og:title / og:description / og:image
- Twitter Card
- sitemap.xml 模板
