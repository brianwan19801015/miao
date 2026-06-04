---
name: blog-publishing
description: 苗本芳 Shopify 博客文章发布全流程。包括文章撰写、AI配图生成、图片上传主题assets、发布文章、设置封面图、插入场景图。
---

# Blog Publishing - 苗本芳博客发布流程

## 店铺信息

| 项目 | 值 |
|:----|:----|
| Shopify 店铺 | `herbalcare-9346.myshopify.com` |
| 博客首页 | `https://herbalcare-9346.myshopify.com/blogs/news` |
| 博客 ID | `105794437364` |
| 主题 ID | `162122793204` (Horizon, live) |
| Token 环境变量 | `SHOPIFY_CLI_THEME_TOKEN` |

> ⚠️ Token 从 memory 获取或由用户提供，不硬编码在 skill 文件中。

## 文章目录

博客文章 markdown 源文件存放在：
```
/tmp/miao_repo/docs/blog-articles/
```

文件命名规范：`NN-topic-slug.md`，例如：
- `01-cold-process-soap-vs-shampoo.md`
- `02-how-to-use-herbal-soap.md`
- `03-18-herbal-ingredients-guide.md`
- `04-45-day-cold-process-explained.md`
- `05-oily-scalp-dandruff-solution.md`
- `06-herbal-hair-soap-faq.md`

## 📋 发布全流程（6步）

### 第1步：准备文章 Markdown 文件

文章格式要求：
```yaml
---
title: "文章标题"
author: "苗本芳草本护理团队"
published: "2026-06-01"
excerpt: "文章摘要..."
tags: ["标签1", "标签2"]
image: "cover-image-filename.png"
---

文章内容（Markdown格式）...
```

### 第2步：发布文章到 Shopify

用 REST API 发布文章：

```python
import json, urllib.request, re

TOKEN = os.environ["SHOPIFY_CLI_THEME_TOKEN"]
STORE = "herbalcare-9346"

def publish_article(title, body_html, blog_id="105794437364"):
    url = f"https://{STORE}.myshopify.com/admin/api/2024-07/articles.json"
    handle = re.sub(r'[^\w\s-]', '', title).strip().lower().replace(' ', '-')[:240]
    payload = {
        "article": {
            "title": title,
            "body_html": body_html,
            "blog_id": int(blog_id),
            "published": True,
            "published_at": "2026-06-01T12:00:00-04:00",
            "handle": handle,
            "author": "苗本芳草本护理团队"
        }
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST",
        headers={"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json; charset=utf-8"})
    resp = urllib.request.urlopen(req)
    result = json.loads(resp.read())
    return result["article"]["id"]
```

### 第3步：生成 AI 配图

使用 Zenmux AI (GPT-Image-2) 生成图片，每篇文章需要 2 张图：
- **封面图** (`NN-topic-cover.png`) - 文章特色图片
- **场景图** (`NN-topic-scene.png`) - 插入文章正文

API 配置：
- API Key: `ZENMUX_API_KEY` (环境变量)
- 端点: `https://dashboard.zenmux.com/api/chat/completions`
- 模型: `gpt-image-2`
- 尺寸: `1024x1024`

Python 代码示例：
```python
from google import genai
from google.genai import types

client = genai.Client(
    vertexai=False,
    api_key=os.environ["ZENMUX_API_KEY"],
    http_options={"base_url": "https://dashboard.zenmux.com/api"}
)

response = client.models.generate_images(
    model="gpt-image-2",
    prompt="你的图片描述提示词",
    config=types.GenerateImagesConfig(
        number_of_images=1,
        aspect_ratio="1:1",
        output_mime_type="image/png"
    )
)
response.generated_images[0].image.save(image_bytes)
```

图片保存在：`/root/.openclaw/blog-images/`

### 第4步：上传图片到主题 assets

```bash
# 复制到本地仓库
cp /root/.openclaw/blog-images/*.png /tmp/miao_repo/assets/

# 推送到 Shopify 主题
cd /tmp/miao_repo
SHOPIFY_CLI_THEME_TOKEN="$TOKEN" \
  shopify theme push --path=. --store=herbalcare-9346 --theme=162122793204 --allow-live
```

> ⚠️ 图片文件名不能包含中文字符，否则 Shopify 会报错 `contains illegal characters`。
> ⚠️ 如果仓库中有中文文件名图片，需先移走再推送（如 `mv assets/slide10_gift_*.png /tmp/`）。

### 第5步：设置文章封面图

通过 REST API 设置文章封面图片，使用主题 assets 的 public_url：

```python
# 1. 获取 asset 的 public_url
asset_url = f"https://{STORE}.myshopify.com/admin/api/2024-07/themes/{THEME_ID}/assets.json?asset%5Bkey%5D=assets/{filename}"
req = urllib.request.Request(asset_url, headers={"X-Shopify-Access-Token": TOKEN})
resp = urllib.request.urlopen(req)
public_url = json.loads(resp.read())["asset"]["public_url"]

# 2. 更新文章图片
payload = {"article": {"id": int(article_id), "image": {"src": public_url}}}
url = f"https://{STORE}.myshopify.com/admin/api/2024-07/articles/{article_id}.json"
data = json.dumps(payload).encode("utf-8")
req = urllib.request.Request(url, data=data, method="PUT",
    headers={"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"})
resp = urllib.request.urlopen(req)
```

### 第6步：插入场景图到文章正文

获取场景图的 CDN URL，然后插入到文章 body_html 中：

```python
# 获取场景图 public_url
scene_url = get_asset_public_url("NN-topic-scene.png")

# 插入到正文第一段之后
img_tag = f'<p><img src="{scene_url}" alt="图片描述" style="max-width:100%;height:auto;border-radius:8px;margin:20px 0;" /></p>'
first_p_end = body.find("</p>")
if first_p_end > 0:
    new_body = body[:first_p_end+4] + "\n" + img_tag + "\n" + body[first_p_end+4:]

# 更新文章
payload = {"article": {"id": int(article_id), "body_html": new_body}}
```

## 🔧 常用操作

### 查看已发布文章
```python
url = f"https://{STORE}.myshopify.com/admin/api/2024-07/articles.json?blog_id=105794437364&limit=50"
req = urllib.request.Request(url, headers={"X-Shopify-Access-Token": TOKEN})
resp = urllib.request.urlopen(req)
articles = json.loads(resp.read())["articles"]
for a in articles:
    print(f"{a['id']}: {a['title']}")
```

### 更新文章内容
```python
payload = {"article": {"id": int(article_id), "body_html": new_html}}
url = f"https://{STORE}.myshopify.com/admin/api/2024-07/articles/{article_id}.json"
```

### 验证主题 assets 中的图片
```python
url = f"https://{STORE}.myshopify.com/admin/api/2024-07/themes/{THEME_ID}/assets.json"
resp = urllib.request.urlopen(urllib.request.Request(url, headers={"X-Shopify-Access-Token": TOKEN}))
assets = json.loads(resp.read())["assets"]
blog_imgs = [a for a in assets if "comparison" in a["key"] or "usage" in a["key"] or "herbs" in a["key"]]
```

## 📎 外部链接格式

```
https://herbalcare-9346.myshopify.com/blogs/news/{文章handle}
```

文章 handle 自动由标题生成（去标点、转小写、空格替换为连字符）。

## ⚠️ 踩坑记录

1. **中文文件名**：Shopify 不接受中文字符的文件名，会报 `contains illegal characters`。推主题前需移走中文文件。
2. **CDN 缓存**：刚上传的图片可能几分钟后才能通过 CDN URL 访问。
3. **base64 上传图片到文章**：PUT /articles/{id}.json 可以直接传 base64 编码的图片数据，但 SIGTERM 可能中断。建议循环单个上传。
4. **406 错误**：REST API 的 `/files.json` 端点可能返回 406，改用 theme assets 方式上传。
5. **GraphQL 字段名变更**：`stagedUploadsCreate` 返回的是 `stagedTargets` 而非 `stagedUploads`（2024-07 API）。
6. **关闭密码保护**：Shopify API 不支持通过 API 关闭密码保护，需管理员在后台手动操作：Settings → Online Store → Password protection → 取消勾选。
7. **Cloudflare**：Shopify 后台有 Cloudflare 保护，浏览器自动化可能被拦截。

## 竞品情报参考

### 抖音护发/洗发皂赛道竞品（2026-06-01）

| 品牌 | 关键卖点 | 对苗本芳的启示 |
|:----|:---------|:--------------|
| **故事树** | 买3退2（用过也退），激进售后 | 可考虑"无忧试用"话术 |
| **七绿** | 三角形皂体，形状差异化 | 可做圆形皂饼/古法手作风 |
| **墨见** | 销量最高，市场头部 | 验证品类需求，值得研究 |
| **苗家欢喜** | 苗方草本路线 | 直接竞品，需强化差异化 |
| **瑶乡阿彤** | 瑶族民族草本 | 民族草本赛道竞争加剧 |
| **上山村** | 天然山野草本 | 天然草本是大趋势 |

### 网站优化方向（基于竞品分析）
1. ✅ 突出 **18味草本配方** 的独特性（竞品都没有）
2. ✅ 强调 **45天低温冷制工艺** 的技术壁垒
3. ✅ 强化 **5大0添加** 的安全信任
4. ✅ 可考虑上线"**用完不满意包退**"售后承诺
5. ✅ 产品图片突出**草本质感**（中药、植物环绕视觉）
6. ✅ 增加**检测认证**展示（信任背书）

### Viori 对标分析参考

网站: https://viori.com/
定位: 国际洗发皂头部品牌，面向欧美中高端市场

**对标要点：**
- 品牌故事：红瑶族龙胜大米水蛋白 → 苗本芳对标苗方18味草本
- 价格：单块约$11，套装$22-32 → 苗本芳可定$9.9-11.9
- 风格：极简北欧风 → 苗本芳建议走古法草本风（草本绿+大地棕）
- Quiz推荐系统：Find Your Viori → 强烈建议苗本芳开发
- Subscribe & Save 20% → 建议引入订阅制
