---
name: shopify-theme-cicd
description: "Skill for managing CI/CD deployment of Shopify themes using GitHub Actions. Use when working with Shopify theme repositories that need automated deployment via `shopify theme push`. Covers Theme Access password authentication, GitHub secrets setup, workflow configuration, and troubleshooting 401/auth errors."
---

# Shopify Theme CI/CD Skill

This skill provides workflows for deploying Shopify themes from GitHub using GitHub Actions + Shopify CLI.

## Architecture

```
GitHub push → Actions workflow → shopify cli → Theme Access password → Shopify store
```

**Key components:**
- Shopify CLI (`@shopify/cli` + `@shopify/theme`) for theme operations
- Theme Access app (from Shopify App Store) for store-level authentication
- GitHub Secrets for credentials
- `SHOPIFY_CLI_THEME_TOKEN` env var for Theme Access password
- `SHOPIFY_FLAG_STORE` env var for store myshopify.com domain

## Core Workflow

### 1. Initial Setup

#### Prerequisites:
1. Shopify store exists with a myshopify.com domain
2. Theme Access app installed on the store (https://apps.shopify.com/theme-access)
3. GitHub repository set up

#### Required GitHub Secrets:

| Secret | Value | How to get |
|--------|-------|-----------|
| `SHOPIFY_CLI_THEME_TOKEN` | Theme Access password (`shptka_...`) | Store admin → Online Store → Themes → Manage theme access |
| `SHOPIFY_FLAG_STORE` | Store domain (`xxx.myshopify.com`) | Store admin URL |
| `SHOPIFY_THEME_ID` | Target theme ID | After first deployment or from theme editor URL |

> **Note:** `SHOPIFY_APP_AUTOMATION_TOKEN` (`atkn_...`) only works for `shopify app deploy`, NOT for `shopify theme push`. Do not use this for theme deployment.

### 2. Workflow File

Standard workflow at `.github/workflows/deploy-shopify.yml`:

```yaml
name: Deploy Theme to Shopify
on: [push]
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install Shopify CLI
        run: npm install -g @shopify/cli @shopify/theme
      - name: Upload theme
        env:
          SHOPIFY_CLI_THEME_TOKEN: ${{ secrets.SHOPIFY_CLI_THEME_TOKEN }}
          SHOPIFY_FLAG_STORE: ${{ secrets.SHOPIFY_STORE }}
          SHOPIFY_FLAG_FORCE: '1'
        run: shopify theme push --path=. --theme=${{ secrets.SHOPIFY_THEME_ID }} --allow-live
```

### 3. First Deployment (Creating a Theme)

For the very first deployment, the store has no theme to push to. Use:

```yaml
run: shopify theme push --path=. --unpublished --theme="theme-name"
```

This creates a new unpublished theme. After it succeeds:
1. Get the theme ID from the deployment output
2. Set it as `SHOPIFY_THEME_ID` secret
3. Switch workflow to use `--theme=${{ secrets.SHOPIFY_THEME_ID }} --allow-live`

### 4. Theme Files Required

A minimal Shopify theme must have:

```
config/
  settings_schema.json   # Theme metadata (required - CLI checks this)
layout/
  theme.liquid           # Main layout
templates/
  index.json             # Homepage section order
sections/                # Section files
assets/                  # CSS, JS, images
```

The `config/settings_schema.json` must exist (even with minimal content) for CLI to recognize the directory as a theme:

```json
[{
  "name": "theme_info",
  "theme_name": "Theme Name",
  "theme_version": "1.0.0",
  "theme_author": "Author"
}]
```

### 5. Setting Secrets via CLI

```powershell
gh secret set SHOPIFY_CLI_THEME_TOKEN --body "shptka_..." --repo "owner/repo"
gh secret set SHOPIFY_FLAG_STORE --body "store.myshopify.com" --repo "owner/repo"
gh secret set SHOPIFY_THEME_ID --body "155389821083" --repo "owner/repo"
```

### 6. Post-Deployment

- **Preview**: `https://store.myshopify.com/?preview_theme_id=<THEME_ID>`
- **Publish**: Shopify Admin → Online Store → Themes → Publish
- **Unpublish**: Publish a different theme (Horizon auto-unpublishes)
- **Store access**: If password-protected → Preferences → Password protection → Disable

## Troubleshooting

### 401: Invalid API key or access token
- Wrong `SHOPIFY_CLI_THEME_TOKEN` format → use `shptka_...` from Theme Access app
- Wrong store domain → verify `SHOPIFY_FLAG_STORE` matches the store

### "Authorization is required" with `atkn_` token
- `SHOPIFY_APP_AUTOMATION_TOKEN` only works for `shopify app deploy`
- For themes, use `SHOPIFY_CLI_THEME_TOKEN` with Theme Access password

### "Select a theme to push to" prompt
- Missing `--theme` flag → Add `--theme=$THEME_ID`
- First deployment → Use `--unpublished` to create new theme

### "No themes match the ID or name"
- Theme doesn't exist yet → Use `--unpublished` for first creation
- Wrong theme ID → Get correct ID from theme editor URL (`.../themes/<ID>/editor`)

### "Name of the new theme" prompt in CI
- `--unpublished` is interactive in CI → Pipe name: `printf 'name\n' | shopify theme push --unpublished`
- Or use `--unpublished --theme="name"` combined

### "It doesn't seem like you're running this in a theme directory"
- Missing `config/settings_schema.json` → Create it

### Connection reset when pushing
- Set git proxy: `git config http.proxy http://127.0.0.1:PORT`

## Quick Reference

```bash
# Set up secrets
gh secret set SHOPIFY_CLI_THEME_TOKEN --body "shptka_..." --repo "owner/repo"
gh secret set SHOPIFY_FLAG_STORE --body "store.myshopify.com" --repo "owner/repo"
gh secret set SHOPIFY_THEME_ID --body "155389821083" --repo "owner/repo"

# Deploy (in workflow)
shopify theme push --path=. --theme=$SHOPIFY_THEME_ID --allow-live

# Preview
open https://store.myshopify.com/?preview_theme_id=<ID>

# Proxy fix for Windows
git config http.proxy http://127.0.0.1:8890
```
