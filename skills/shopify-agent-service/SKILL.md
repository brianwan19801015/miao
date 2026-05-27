---
name: shopify-agent-service
description: "主调度 skill — 接收 shopifyagent.html 表单提交，根据客户选择的 template 类型，分发到对应子 skill 生成 Shopify 主题代码并自动部署。"
---

# Shopify Agent Service - 主调度 Skill

## 工作流程

### 步骤 1: 接收客户配置

从表单/API 接收以下参数：

```json
{
  "customer": {
    "name": "客户名称",
    "email": "contact@example.com",
    "phone": "138xxxxxxxx"
  },
  "shopify": {
    "store_domain": "store.myshopify.com",
    "theme_token": "shptka_xxxxxxxxxxxx",
    "theme_id": "123456789"
  },
  "template": "brand | product | multi | b2b",
  "github": {
    "repo_owner": "brianwan19801015",
    "repo_name": "client-shopify-theme"
  }
}
```

### 步骤 2: 创建客户仓库

1. 根据 template 类型，选择一个 base 仓库或模板分支
2. 在 GitHub 上 fork/clone 模板仓库到客户专属仓库
3. 设置 GitHub Secrets (SHOPIFY_CLI_THEME_TOKEN, SHOPIFY_FLAG_STORE, SHOPIFY_THEME_ID)

### 步骤 3: 调用模板子 Skill

根据 `template` 参数调用对应 skill：

| template 值 | 调用 skill |
|-------------|-----------|
| `brand` | shopify-template-brand |
| `product` | shopify-template-product |
| `multi` | shopify-template-multi |
| `b2b` | shopify-template-b2b |

### 步骤 4: 生成主题代码

每个子 skill 会：
1. 生成 config/settings_schema.json
2. 生成 layout/theme.liquid
3. 生成 templates/index.json
4. 生成对应 sections（根据模板）
5. 生成 assets（CSS、JS、图片占位）
6. 可选：SEO 优化（JSON-LD、og:tags）

### 步骤 5: CI/CD 部署

复用 `shopify-theme-cicd` skill：
1. 创建 `.github/workflows/deploy-shopify.yml`
2. 设置 GitHub Secrets
3. 首次部署使用 `--unpublished` 创建新主题
4. 获取新主题 ID 并更新 Secrets
5. 推送代码触发自动部署

### 步骤 6: 通知客户

1. 邮件通知：部署完成 + 预览链接
2. 可选：企业微信通知运营团队

## 完整执行示例

### 用户选择"电商爆品型" (template=product)

```
1. 接收表单 → 客户: 张三, store: zhangsan.myshopify.com
2. 创建仓库 → github.com/brianwan19801015/zhangsan-shopify
3. 设置 Secrets → SHOPIFY_CLI_THEME_TOKEN, SHOPIFY_STORE
4. 调用 shopify-template-product skill
   - 生成 sections: hero.liquid, why-us.liquid, ingredients.liquid, 
                     gifts.liquid, faq.liquid, reviews.liquid, 
                     certification.liquid, footer.liquid
   - 生成 assets: style.css, theme.js, 占位图片
5. 推送代码 → GitHub Actions 自动部署
6. 通知客户 → "您的店铺已部署完成！预览链接：..."
```

## 技能依赖

- shopify-theme-cicd — 用于 GitHub Secrets 设置和 CI/CD 部署
- shopify-theme-ui-optimization — 用于部署后的 UI 优化
- shopify-template-brand — 品牌展示型模板
- shopify-template-product — 电商爆品型模板
- shopify-template-multi — 多品类型模板
- shopify-template-b2b — B2B批发型模板
