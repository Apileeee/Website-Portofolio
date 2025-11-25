# 🚀 Azure App Service Deployment Guide

Panduan lengkap deploy portfolio Node.js ke Azure App Service.

---

## 📋 Prerequisites

Sebelum mulai, pastikan Anda memiliki:

1. ✅ **Azure Account** - Daftar gratis di https://azure.microsoft.com/free/
2. ✅ **Git** - Download dari https://git-scm.com/
3. ✅ **GitHub Account** - Daftar di https://github.com/ (untuk CI/CD)
4. ✅ **Azure CLI** (Optional) - Download dari https://learn.microsoft.com/en-us/cli/azure/install-azure-cli

---

## 🔧 Step 1: Prepare Project untuk Azure

### 1.1 Update `.gitignore` (Jangan push `.env`)

File `.gitignore` sudah ada, pastikan berisi:
```
node_modules/
.env
.env.local
*.log
```

### 1.2 Buat `.env.production` (Optional)

Untuk production, buat file `.env.production`:
```env
PORT=8080
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=your-email@gmail.com
```

### 1.3 Update `package.json` (Sudah OK)

Pastikan `package.json` punya:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "20.x"
  }
}
```

---

## 📤 Step 2: Push Project ke GitHub

### 2.1 Create Repository di GitHub

1. Buka https://github.com/new
2. Name: `portfolio-website` (atau nama lain)
3. Description: `My Portfolio - Node.js + Express`
4. **Public** atau **Private** (sesuai preferensi)
5. Klik **Create Repository**

### 2.2 Push Code ke GitHub

Di terminal:
```bash
cd "E:\J O K I\Portofolio"

# Initialize git (jika belum)
git init

# Add remote
git remote add origin https://github.com/YOUR-USERNAME/portfolio-website.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Push
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Create Azure App Service

### 3.1 Login ke Azure Portal

1. Buka https://portal.azure.com
2. Login dengan akun Azure Anda

### 3.2 Create Resource Group

1. Klik **Create a resource**
2. Search: **Resource Group**
3. Klik **Create**
4. Isi:
   - **Name**: `portfolio-rg`
   - **Region**: `Southeast Asia` (atau region terdekat Anda)
5. Klik **Review + Create** → **Create**

### 3.3 Create App Service

1. Klik **Create a resource**
2. Search: **App Service**
3. Klik **Create**
4. Isi form:
   - **Resource Group**: `portfolio-rg`
   - **Name**: `arafil-portfolio` (harus unik)
   - **Publish**: **Code**
   - **Runtime stack**: **Node 20 LTS**
   - **Operating System**: **Linux**
   - **Region**: **Southeast Asia**
5. Klik **Next: App Service Plan**
6. **Pricing tier**: **Free F1** (untuk testing)
7. Klik **Review + Create** → **Create**

⏳ Tunggu ~2-3 menit sampai App Service selesai dibuat.

---

## 🔗 Step 4: Setup Deployment

### Option A: GitHub Actions (Recommended)

#### A1. Generate Publish Profile

1. Di App Service yang baru dibuat, klik **Download publish profile**
2. Simpan file `.PublishSettings`

#### A2. Add GitHub Secret

1. Buka repository GitHub Anda
2. Settings → Secrets and variables → Actions
3. Klik **New repository secret**
4. **Name**: `AZURE_PUBLISH_PROFILE`
5. **Value**: Copy isi file `.PublishSettings`
6. Klik **Add secret**

#### A3. Create GitHub Actions Workflow

1. Di repository GitHub, buat folder: `.github/workflows/`
2. Buat file: `azure-deploy.yml`
3. Copy kode ini:

```yaml
name: Deploy to Azure App Service

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20.x'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build --if-present
    
    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'arafil-portfolio'
        publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
        package: .
```

4. Push file ini:
```bash
git add .github/
git commit -m "Add Azure deployment workflow"
git push
```

GitHub Actions akan otomatis deploy setiap ada push ke `main` branch!

---

### Option B: Direct Deployment via Azure CLI

```bash
# Login ke Azure
az login

# Deploy
az webapp deployment source config-zip \
  --resource-group portfolio-rg \
  --name arafil-portfolio \
  --src portfolio.zip
```

---

## ⚙️ Step 5: Configure Environment Variables

### Di Azure Portal:

1. Buka App Service Anda
2. Settings → **Configuration**
3. **Application settings** → **New application setting**
4. Tambahkan:
   - **Name**: `EMAIL_USER` | **Value**: `your-email@gmail.com`
   - **Name**: `EMAIL_PASSWORD` | **Value**: `your-app-password`
   - **Name**: `EMAIL_TO` | **Value**: `your-email@gmail.com`
   - **Name**: `NODE_ENV` | **Value**: `production`
5. Klik **Save** → **Continue**

---

## 🌍 Step 6: Access Your Portfolio

Setelah deployment selesai:

1. Buka Azure Portal
2. Buka App Service Anda
3. Klik **Default domain** atau copy **URL**
4. Contoh: `https://arafil-portfolio.azurewebsites.net`

Portfolio Anda sekarang live di internet! 🎉

---

## 🔍 Troubleshooting

### Build Failed
- Cek **Deployment Center** → **Logs**
- Pastikan `package.json` ada di root directory
- Pastikan `node_modules` ada di `.gitignore`

### Port Error
- Azure menggunakan port **8080** bukan 3000
- Update di `.env`: `PORT=8080`
- Atau Azure otomatis set `PORT` environment variable

### Email Not Sending
- Cek **Configuration** → **Application settings**
- Pastikan `EMAIL_USER` dan `EMAIL_PASSWORD` benar
- Restart App Service

### Custom Domain (Optional)

1. Beli domain di GoDaddy, Namecheap, dll
2. Di App Service → **Custom domains**
3. Ikuti petunjuk untuk setup DNS
4. Gratis SSL certificate dari Azure!

---

## 💰 Pricing

| Plan | Price | Includes |
|------|-------|----------|
| **Free F1** | $0/bulan | Good untuk testing |
| **Basic B1** | ~$54/bulan | Production-ready |
| **Standard S1** | ~$80/bulan | Better performance |

💡 **Tip**: Gunakan Free tier untuk testing, upgrade ke Basic jika traffic tinggi.

---

## 📊 Monitoring

### View Logs

1. App Service → **Log stream**
2. Lihat real-time logs dari aplikasi

### Performance Metrics

1. App Service → **Metrics**
2. Monitor CPU, memory, requests

---

## 🔄 Continuous Deployment

Setelah GitHub Actions setup:

1. Edit file di repository
2. Commit & push ke `main` branch
3. GitHub Actions otomatis deploy ke Azure
4. Portfolio update dalam 1-2 menit!

---

## 🚀 Next Steps

Setelah deployment:

1. ✅ Test contact form (pastikan email working)
2. ✅ Test semua features (animasi, download CV, dll)
3. ✅ Setup custom domain (optional)
4. ✅ Monitor performance di Azure Portal
5. ✅ Setup backup (optional)

---

## 📚 Useful Links

- Azure Portal: https://portal.azure.com
- Azure Docs: https://learn.microsoft.com/en-us/azure/app-service/
- Node.js on Azure: https://learn.microsoft.com/en-us/azure/app-service/quickstart-nodejs

---

**Happy Deploying!** 🚀

*Last Updated: November 2025*
