# 🏰 MineVault - Minecraft Schematics & 4K Cinematics Showcase

A modern, fast, zero-dependency website designed for Minecraft builders and content creators to showcase builds, stream 4K cinematic showcases, and provide direct **WorldEdit (`.schem`)** and **Litematica (`.litematic`)** downloads.

---

## 🌟 Key Features

- **Cinematic Spotlight & Video Embeds:** Embedded 4K video player showcasing build fly-throughs, cinematic camera paths, and lighting trailers.
- **Direct Multi-Format Downloads:** Download buttons for `.schem` (WorldEdit) and `.litematic` (Litematica) files with file size tags and real-time download counters.
- **Build Dimension & Stats Strip:** Displays exact $X \times Y \times Z$ block bounds, block count, difficulty tier, and Minecraft versions (e.g. 1.20+, 1.21).
- **Interactive Materials Checklist:** Searchable survival block checklist with automatic 64-stack conversion calculations.
- **Search & Category Filtering:** Instant search bar and quick-filters for *Castles, Sci-Fi, Oriental, Redstone, Survival Bases, Megabuilds*.
- **Community Add Build Generator:** Interactive form modal that generates structured JSON to easily add your own schematics to the vault.
- **How to Import Guide:** Built-in tutorial with exact console commands (`//schem load`, `//paste -a`) and Litematica mod instructions.
- **GitHub Pages Ready:** Zero build step needed, automated GitHub Actions workflow included.

---

## 🚀 How to Preview Locally

You don't need any complex installation. You can test it right now on your computer:

### Option 1: Double-click
Simply double-click `index.html` in file explorer to open it in Chrome, Edge, or Firefox.

### Option 2: Local HTTP Server (Node.js)
In this folder, open PowerShell or terminal and run:
```bash
npx serve .
# or
python -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## 🌐 How to Host Online with GitHub Pages (Step-by-Step)

### Method A: Direct Web Upload (No Git Installation Needed)

1. **Create a GitHub Account & New Repo:**
   - Go to [github.com](https://github.com) and log in.
   - Click the green **"New"** button to create a new repository.
   - Name it (e.g., `minecraft-schematics` or `minevault`).
   - Keep it **Public** and leave "Add a README file" unchecked.
   - Click **Create repository**.

2. **Upload Your Files:**
   - On the next screen, click the link: **"uploading an existing file"**.
   - Drag and drop the contents of this folder (`index.html`, `styles.css`, `app.js`, `data/`, `downloads/`, `assets/`, `.github/`) into the browser.
   - Click **Commit changes**.

3. **Turn On GitHub Pages:**
   - In your repository, click **Settings** (top tab).
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment > Source**, select:
     - **GitHub Actions** (recommended — it uses our included `.github/workflows/deploy.yml` workflow automatically!)
     - OR select **Deploy from a branch** -> branch `main` / `root` -> **Save**.
   - Within 1–2 minutes, your website will be live at:
     ```
     https://<your-username>.github.io/<repo-name>/
     ```

---

### Method B: Using Git Command Line

If you have Git installed:

```bash
git init
git add .
git commit -m "Initial commit: MineVault Minecraft schematics site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then enable Pages in **Settings > Pages > GitHub Actions**.

---

## 📁 Project Structure

```text
├── index.html                   # Main single-page application markup
├── styles.css                   # Custom Minecraft dark theme styling
├── app.js                       # Search, filtering, modal & download handler
├── data/
│   └── schematics.json          # Master list of all schematics & metadata
├── downloads/                   # Downloadable .schem & .litematic files
│   ├── aethelgard_fortress.schem
│   ├── aethelgard_fortress.litematic
│   ├── neo_tokyo_skyscraper.schem
│   ├── japanese_pagoda.schem
│   ├── piston_vault_door.schem
│   └── ...
├── assets/
│   └── images/                  # Build screenshots, SVGs & banners
└── .github/
    └── workflows/
        └── deploy.yml           # Automated GitHub Pages deployment
```

---

## ➕ How to Add Your Own Schematics & Cinematics

1. **Place your schematic file** into the `downloads/` folder:
   - e.g. `downloads/my_awesome_castle.schem` or `.litematic`
2. **Add a screenshot/image** into the `assets/images/` folder:
   - e.g. `assets/images/my_castle.png`
3. **Open `data/schematics.json`** and add a new entry:

```json
{
  "id": "my-awesome-castle",
  "title": "My Awesome Castle",
  "subtitle": "Epic mountain fortress with full interior",
  "category": "Castles",
  "version": "1.21+",
  "author": "YourName",
  "dateAdded": "2026-11-08",
  "downloadsCount": 0,
  "likesCount": 0,
  "featured": false,
  "dimensions": { "width": 60, "height": 45, "length": 60 },
  "blockCount": 12500,
  "difficulty": "Intermediate",
  "description": "Describe your build here...",
  "videoUrl": "https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID",
  "videoTitle": "My Castle Cinematic",
  "image": "assets/images/my_castle.png",
  "gallery": ["assets/images/my_castle.png"],
  "formats": [
    {
      "type": "WorldEdit (.schem)",
      "file": "downloads/my_awesome_castle.schem",
      "size": "2.1 MB"
    }
  ],
  "materials": [
    { "name": "Stone Bricks", "count": 4200 },
    { "name": "Deepslate", "count": 2500 }
  ],
  "tags": ["Castle", "Medieval", "WorldEdit"]
}
```

*Tip: You can also click **"Add Your Build"** inside the website itself to use the visual generator tool!*

---

## 📜 License & Disclaimers

Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft. Minecraft is a trademark of Mojang Synergies AB.

