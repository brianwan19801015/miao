# shopifyagent.html 页面改造方案

## 当前页面
https://www.vibelingan.com/shopifyagent.html
- 只有表单填写（域名/Token/主题ID/联系方式）
- 没有模板选择

## 改造目标

### 新增内容

#### 1. 模板选择区（在表单上方）
```
┌──────────────────────────────────────────┐
│  选择您的模板风格                          │
│                                          │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐ │
│  │ 🏛️  │  │ 🚀  │  │ 🛍️  │  │ 🤝  │ │
│  │品牌型│  │爆品型│  │多品型│  │ B2B │ │
│  │展示型│  │打爆型│  │店铺型│  │批发型│ │
│  └──────┘  └──────┘  └──────┘  └──────┘ │
│                                          │
│  已选: 爆品型  ✓                          │
└──────────────────────────────────────────┘
```

#### 2. 模板特色预览（点击展示）
点击每个模板卡片，下方显示：
- 适用场景
- 包含的页面/section
- 风格预览图
- 部署案例（如苗本芳）

#### 3. 表单新增字段
```
模板选择: [hidden, 从卡片选择自动填充]
预算范围: [下拉: 基础套餐 / 标准套餐 / 高级套餐]
```

### UI 设计

延续 vibeb2b.html 的莫奈风格：
- 暖色调 #F5F0E8, #D97757
- Instrument Serif 字体
- 圆角卡片 + 柔和阴影
- hover 放大效果

### 技术实现

```html
<!-- 模板卡片选择 -->
<div class="template-grid">
  <div class="template-card" data-template="brand" onclick="selectTemplate('brand')">
    <div class="template-icon">🏛️</div>
    <h3>品牌展示型</h3>
    <p>适合品牌故事+产品介绍</p>
    <div class="template-tags">
      <span>品牌官网</span>
      <span>产品展示</span>
    </div>
  </div>
  <!-- ... 其他模板卡片 ... -->
</div>

<!-- 隐藏表单字段 -->
<input type="hidden" name="template" id="template-input" value="">
```

```javascript
function selectTemplate(templateId) {
  // 移除所有选中状态
  document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
  // 选中当前
  document.querySelector(`[data-template="${templateId}"]`).classList.add('selected');
  // 填充隐藏字段
  document.getElementById('template-input').value = templateId;
  // 显示预览信息
  showTemplatePreview(templateId);
}
```

### 后端云函数改造

当前 b2bContact 云函数需要扩展：

```javascript
// shopifyAgentSubmit 云函数
exports.main = async (event) => {
  const { store_domain, theme_token, theme_id, template, name, email, phone } = event;
  
  // 1. 保存到数据库 (shopify_orders 集合)
  await db.collection('shopify_orders').add({
    store_domain,
    // theme_token 加密存储
    theme_token_encrypted: encrypt(theme_token),
    theme_id,
    template,
    customer: { name, email, phone },
    status: 'pending',
    createdAt: Date.now()
  });
  
  // 2. 触发 OpenClaw Agent 子会话
  // 通过 API 调起 Agent，传入参数
  
  // 3. 邮件通知运营团队
  await sendMail({
    to: 'support@vibelingan.com',
    subject: `新的 Shopify 部署请求 - ${name}`,
    template: 'shopify-agent-notification',
    data: { name, email, template, store_domain }
  });
  
  return { code: 0, message: '提交成功，我们将尽快为您部署！' };
};
```
