---
name: ppt-to-shopify
description: "从产品介绍PPT中提取草本配伍、卖点等信息，并对应更新Shopify theme的Liquid section文件。适用于苗本芳养发皂等草本产品的内容同步。"
---

# PPT to Shopify 内容同步 Skill

## 场景

产品介绍PPT（如苗本芳养发皂产品介绍）中有关键的产品信息页（如第4页 18味草本配伍），需要将这些信息准确同步到Shopify Theme的对应section文件中。

## 流程

### 1. PPT内容提取

使用 python-pptx 读取PPT内容：

```python
from pptx import Presentation

prs = Presentation("产品介绍.pptx")
slide = prs.slides[索引]  # 第4页 = slides[3]

for shape in slide.shapes:
    if shape.has_text_frame:
        for para in shape.text_frame.paragraphs:
            text = para.text.strip()
            if text:
                print(text)
    if shape.has_table:
        table = shape.table
        for row in table.rows:
            for cell in row.cells:
                print(cell.text.strip())
```

### 2. 18味草本配伍排版规范（PPT第4页）

PPT第4页为4栏并列布局，每栏包含：图片 + 矩形背景 + 草本文字。

| 栏目 | 图片主题 | 草本内容 | 味数 |
|------|---------|---------|:---:|
| 养发根基 | 叶子+树根 | 何首乌、桑葚、墨旱莲 | 3味 |
| 控油净澈 | 水滴/清洁 | 皂角、无患子、侧柏叶、茶枯 | 4味 |
| 舒缓清洁 | 叶子/草药 | 艾叶、苦参、蛇床子、地肤子、薄荷 | 5味 |
| 活络疏通 | 脉络/疏通 | 丹参、川芎、透骨草、骨碎补、桑叶、榆皮 | 6味 |

**关键约束：**
- 每个草本只能出现在一个栏目中，不可重复/错位
- 养发根基只有3味（何首乌、桑葚、墨旱莲），**不包含侧柏叶**
- 侧柏叶属于控油净澈（4味）
- 总计 3+4+5+6 = **18味**

### 3. Shopify Liquid Section 对应

miao 项目的section与PPT页面对应关系：

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
| 第10页 | 使用方法 | `how-to-use.liquid` + `massage-tips.liquid` |
| 第11页 | 产品线 | `product-line.liquid` |
| 第12页 | 赠品/FAQ等 | `gifts.liquid` + `faq.liquid` |

### 4. ingredients.liquid 标准模板

ingredients section 的标准结构（与PPT第4页完全对齐）：

```liquid
<section class="ingredients" id="ingredients">
  <div class="container">
    <h2 class="section-title">18味草本配伍，回归温和净养</h2>
    <p class="section-desc">源自《苗族医药学》18味苗家古方 · 科学配伍</p>
    <p class="section-subdesc">精选草本协同调理，兼顾清洁力与头皮舒适度。</p>
    
    <div class="herb-categories">
      ...4个herb-category...
    </div>
  </div>
</section>
```

每个 `herb-category` 使用 `herb-tags` 标签样式统一展示：

```html
<div class="herb-category">
  <h3 class="category-title">🌱 养发根基</h3>
  <div class="herb-tags">
    <span class="herb-tag">何首乌</span>
    <span class="herb-tag">桑葚</span>
    <span class="herb-tag">墨旱莲</span>
  </div>
</div>
```

**注意：** 所有四个栏目必须使用**相同样式**（统一为 herb-tags 标签样式），不能有的用图片式、有的用标签式。

### 5. 提交与部署

```bash
cd /root/miao
git add -A
git commit -m "fix: 修正ingredients section - 18味草本配伍与PPT第4页完全对齐"
git push origin master
```

CICD 自动部署到 Shopify。
