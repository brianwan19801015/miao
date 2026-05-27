---
name: shopify-template-multi
description: "多品类型模板 — 适合多SKU店铺的 Shopify 主题。简洁购物风，强调商品浏览和筛选。"
---

# 多品类型模板 (Multi)

## 适用场景
- 多SKU/多品类店铺
- 服装、家居、食品、配件等
- 需要分类导航、商品筛选、搜索功能

## 设计风格
- **配色**: 干净简约（白色背景 + 品牌色点缀）
- **风格**: 类似 Shopify Dawn 主题风格，强调商品展示

## 生成的文件结构

```
config/
  settings_schema.json
layout/
  theme.liquid
templates/
  index.json               # 首页
  collection.json           # 分类页
  product.json              # 商品详情页
  search.json               # 搜索结果页
sections/
  header.liquid            # 导航（分类下拉 + 搜索框 + 购物车）
  hero-slider.liquid       # 首页轮播Banner
  collection-grid.liquid   # 分类/商品网格
  product-card.liquid      # 商品卡片（图+名+价+快速加购）
  product-detail.liquid    # 商品详情（大图+描述+规格+加购）
  filters.liquid           # 筛选栏（价格/颜色/尺寸/标签）
  search-bar.liquid        # 搜索功能
  featured-collection.liquid  # 精选推荐
  newsletter.liquid        # 邮件订阅
  footer.liquid            # 页脚（链接+社交+支付方式）
assets/
  style.css
  theme.js
```

## 关键功能

### 分类导航
- 多级下拉菜单
- 移动端汉堡菜单
- 显示商品数量

### 商品网格
```
响应式布局：4列(桌面) → 3列(平板) → 2列(手机)
每张商品卡片：
  - 商品图片（hover切换/缩放）
  - 商品名称
  - 价格（原价+折扣价）
  - 快速加购按钮
  - 标签（新品/热销/折扣）
```

### 筛选与搜索
- 按分类/价格/颜色/尺寸筛选
- 关键词实时搜索
- 排序（价格/销量/上新）

### 商品详情页
- 商品大图 + 缩略图切换
- 规格选择（颜色/尺寸/数量）
- 加购按钮 + 收藏
- 商品描述 + 详情图

## SEO 优化
- JSON-LD: Product + Collection + BreadcrumbList
- 每个商品独立 og:image
- sitemap.xml 自动生成
- 分类页面独立 meta 描述
