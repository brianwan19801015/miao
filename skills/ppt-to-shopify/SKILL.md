---
name: ppt-to-shopify
description: "从产品介绍PPT中提取草本配伍、赠品信息、功效认证等内容，并准确同步到Shopify主题的Liquid section文件中。适用于苗本芳养发皂等草本产品的内容同步。"
---

# PPT to Shopify 内容同步 Skill

## 使用场景

产品介绍PPT中有关键的产品信息页，需要将这些信息准确同步到Shopify Theme的对应section文件中。

## PPT页码与Section对应关系

| PPT页码 | 内容 | Shopify section |
|:-------:|------|----------------|
| 第1页 | 封面/Hero | hero.liquid |
| 第2页 | 痛点 | pain-points.liquid |
| 第3页 | 产品定位/品牌故事/苗家智慧传承 | product-intro.liquid + brand-story.liquid |
| **第4页** | **18味草本配伍** | **ingredients.liquid** |
| 第5页 | 45天古法冷制锁活 | technology.liquid（上半部分） |
| 第6页 | 5大0添加 | technology.liquid（下半部分） |
| 第7-8页 | 三大核心优势 | core-advantages.liquid |
| 第9页 | 四大功效 | effects.liquid |
| 第10页 | 赠品 | product-line.liquid |
| 第11页 | 产品线 | product-line.liquid |
| 第12页 | 使用教程 | how-to-use.liquid + massage-tips.liquid |

## 关键Section规范

### Product Intro (PPT第3页)

**结构：** 左图右文 + 底部传承区域

顶部图文部分：
```
┌──────┐  BRAND STORY
│ 图片  │  苗本芳养发皂—来自苗家的头皮养护智慧
│      │  源于古老的苗族护发古方...
│      │
│      │  PRODUCT POSITIONING
│      │  产品定位·POSITIONING
│      │  这不是一块普通的香皂...
│      │
│      │  ✅ 18味草本复配
│      │  ✅ 45天低温冷制
│      │  ✅ 温和净养，敏感头皮可用
│      │  ✅ 一块皂覆盖四大头皮诉求
│      │  [咨询购买]
└──────┘
```

底部传承区域（新增内容）：
```
┌──── 苗家智慧传承 ────────────────────────────┐
│  🌿                                         │
│  苗家古方，现代科技赋能                      │
│  苗本芳养发皂融合苗族千年护发智慧...          │
│                                              │
│  🏷️ 18味苗家草本·君臣佐使科学配伍             │
│  🏷️ 45天低温冷制·锁住活性成分                │
│  🏷️ 5大0添加·温和安全不刺激                  │
└──────────────────────────────────────────────┘
```

- 传承区使用渐变背景 + 圆角卡片
- 标签用白色底 + 圆角满圆（border-radius: 999px）

### Technology (PPT第5-6页)

从PPT第5-6页提取，合并为一个section，分为两部分：

**第一部分：传统热制工艺 vs 45天古法冷制锁活（PPT第5页）**

```
┌───────────────┐       ┌───────────────────┐
│ 🔥 传统热制    │  VS   │ ❄️ 45天古法冷制锁活 │
│ 高温破坏       │       │ 活性成分0流失      │
│ 活性成分流失    │       │                   │
│               │       │  <40℃  │ 0  │ 45天 │
│               │       │ 低温   │破坏│ 皂化  │
└───────────────┘       └───────────────────┘
```

左侧红色系（#fff5f5背景），右侧绿色系（#f0f5eb背景），中间VS标识。

统计数字格式：
```css
.tech-stat-value {
  font-size: 28px;
  font-weight: 800;
  color: var(--brand);
}
```

**第二部分：5大0添加（PPT第6页）**

```
CORE TECHNOLOGY 02
核心卖点三：5大0添加，给头皮最纯净的呵护
摒弃化学添加，回归草本本真，敏感肌也能安心用

┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ 🚫      │ 🚫      │ 🚫      │ 🚫      │ 🚫      │
│ 0硅油    │ 0月桂醇  │ 0防腐剂  │ 0硫酸盐  │ 0人工    │
│         │         │         │         │ 香精     │
│ 告别假滑 │ 不破坏   │ 降低致敏 │ 温和亲肤 │ 只留草本 │
│ 毛囊自由 │ 皮脂膜   │ 使用安心 │ 敏感肌   │ 自然清香 │
│ 呼吸     │ 保护屏障 │         │ 放心用   │         │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

- 5张卡片网格布局，每项：emoji + 标题 + 描述
- 浅绿背景（#f8faf5）+ 绿色边框
- 白色圆角大卡片包裹

### Effects & Certification (PPT第9页 + 认证信息)

认证信息合并到功效卡片中，统一为一个section：

```
🏷️ 权威检测认证
广东欣研检测 · 2026年04月07日 · 四维功效验证

      四大核心功效一步到位

┌──────────┬──────────┬──────────┬──────────┐
│ 🧴去屑   │ 💧控油   │ 🌿滋养   │ 🛡️防断发 │
│  功效    │  功效    │  功效    │  功效    │
│ [图片]   │ [图片]   │ [图片]   │ [图片]   │
│ 净屑清爽 │ 平衡控油 │ 舒缓止痒 │ 强韧固发 │
│ 报告编号 │ 报告编号 │ 报告编号 │ 报告编号 │
└──────────┴──────────┴──────────┴──────────┘
```

认证徽章在顶部（绿色满圆标签），每张卡片底部显示对应报告编号。

## 18味草本配伍规范（PPT第4页）

4栏并列布局，每栏：圆形图片 + 标题 + 草本标签。

| 栏目 | 图片 | 草本 | 味数 |
|------|------|------|:---:|
| 🌱 养发根基 | slide4_img11_14.png | 何首乌、桑葚、墨旱莲 | 3味 |
| 💧 控油净澈 | slide4_img12_15.png | 皂角、无患子、侧柏叶、茶枯 | 4味 |
| 🌿 舒缓清洁 | slide4_img13_16.png | 艾叶、苦参、蛇床子、地肤子、薄荷 | 5味 |
| 🔄 活络疏通 | slide4_img14_17.png | 丹参、川芎、透骨草、骨碎补、桑叶、榆皮 | 6味 |

**重要约束：**
- 养发根基只有3味，**不包含侧柏叶**
- 侧柏叶属于控油净澈（4味）
- 四栏样式统一（全部使用 herb-tags 标签样式）

## 赠品规范（PPT第10页）

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
