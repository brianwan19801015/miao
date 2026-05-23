---
name: ppt-to-shopify
description: "从产品介绍PPT中提取草本配伍、赠品信息等内容，并准确同步到Shopify主题的Liquid section文件中。适用于苗本芳养发皂等草本产品的内容同步。"
---

# PPT to Shopify 内容同步 Skill

## 使用场景

产品介绍PPT中有关键的产品信息页，需要将这些信息准确同步到Shopify Theme的对应section文件中。

## PPT页码与Section对应关系

| PPT页码 | 内容 | Shopify section |
|:-------:|------|----------------|
| 第1页 | 封面/Hero | hero.liquid |
| 第2页 | 痛点 | pain-points.liquid |
| 第3页 | 产品定位/品牌故事 | product-intro.liquid + brand-story.liquid |
| **第4页** | **18味草本配伍** | **ingredients.liquid** |
| 第5页 | 45天古法冷制 | technology.liquid |
| 第6页 | 5大0添加 | zero-add.liquid |
| 第7-8页 | 核心优势 | core-advantages.liquid |
| 第9页 | 功效 | effects.liquid |
| **第10页** | **赠品** | **gifts.liquid** |
| 第11页 | 产品线 | product-line.liquid |
| 第12页 | 使用教程 | how-to-use.liquid + massage-tips.liquid |

## 18味草本配伍规范（PPT第4页）

4栏并列布局，每栏：圆形图片 + 标题 + 草本标签。

| 栏目 | 图片 | 草本 | 味数 |
|------|------|------|:---:|
| 🌱 养发根基 | slide4_img11_14.png | 何首乌、桑葚、墨旱莲 | 3味 |
| 💧 控油净澈 | slide4_img12_15.png | 皂角、无患子、侧柏叶、茶枯 | 4味 |
| 🌿 舒缓清洁 | slide4_img13_16.png | 艾叶、苦参、蛇床子、地肤子、薄荷 | 5味 |
| 🔄 活络疏通 | slide4_img14_17.png | 丹参、川芎、透骨草、骨碎补、桑叶、榆皮 | 6味 |

**重要约束：**
- 养发根基只有3味，不包含侧柏叶
- 侧柏叶属于控油净澈（4味）
- 四栏样式统一（全部使用 herb-tags 标签样式）

## 赠品规范（PPT第10页）

3栏并列布局，每栏：圆形图片 + 赠品名 + 条件 + 描述。

| 赠品 | 条件 | 图片文件 |
|------|------|---------|
| 起泡网 | 每盒 | slide10_gift_bubble_net.png |
| 沥水皂盒 | 购买两盒赠送 | slide10_gift_drain_box.png |
| 气垫按摩梳 | 购买三盒赠送价值 | slide10_gift_air_cushion_comb.png |

**注意：** 图片文件名不要使用中文。

## PPT内容提取方法

```python
from pptx import Presentation

prs = Presentation("产品介绍.pptx")
slide = prs.slides[索引]  # 第4页 = slides[3]

for shape in slide.shapes:
    if shape.has_text_frame:
        for para in shape.text_frame.paragraphs:
            print(para.text.strip())
    if shape.has_table:
        table = shape.table
        for row in table.rows:
            for cell in row.cells:
                print(cell.text.strip())
```

## 关键注意事项

### 标题居中
所有section标题必须加 `center` 类：
```liquid
<h2 class="section-title center">标题</h2>
<p class="section-desc center">描述</p>
```

### 图片文件名
**不要使用中文字符**，Shopify的asset_url可能解析失败：
```liquid
<!-- ❌ 错误 -->
<img src="{{ 'slide10_gift_起泡网.png' | asset_url }}">
<!-- ✅ 正确 -->
<img src="{{ 'slide10_gift_bubble_net.png' | asset_url }}">
```

### 内联style
不要在section文件中写内联 `<style>` 块，所有样式统一放在 `assets/style.css`。

检查命令：
```bash
for f in sections/*.liquid; do
  has=$(grep -c "<style>" "$f" 2>/dev/null)
  if [ "$has" -gt 0 ]; then echo "含内联style: $f"; fi
done
```

## 图片提取方法

```python
from pptx import Presentation
from lxml import etree

prs = Presentation("产品介绍.pptx")
slide = prs.slides[索引]

# 提取Group内的图片
for shape in slide.shapes:
    if shape.name.startswith('group'):
        group_elem = shape._element
        ns = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
              'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
        blips = group_elem.findall('.//a:blip', ns)
        for blip in blips:
            embed = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
            if embed:
                rel = slide.part.rels[embed]
                img_data = rel.target_part.blob
                # 保存图片
                with open(f"assets/slide{页码}_{描述}.png", "wb") as f:
                    f.write(img_data)
```
