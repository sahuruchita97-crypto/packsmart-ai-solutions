# PackSmart AI

# MASTER SYSTEM PROMPT: PackSmart AI (SIH 2026 - MoFPI)

## Project Overview & Mission

Build a high-end, responsive web application named "PackSmart AI" for Smart India Hackathon 2026 (Problem Statement 26236, Ministry of Food Processing Industries - MoFPI). 

The platform is an AI-powered intelligent food packaging material recommendation system that evaluates food chemistry, storage conditions, and diffusion kinetics to recommend optimal multi-layer laminated film structures, barrier specifications (OTR/WVTR), sustainable eco-swaps, and B2B costs in Indian Rupees (₹).

---

## 1. Design System & Visual Style Guide (Strict Adherence)

- **Primary Accent / Dark Green:** `#203d29`

- **Secondary Sage Accent:** `#618366`

- **Soft Light Green (Badges/Pills):** `#e9f0e8`

- **Background Color:** `#f7f8f4` (Off-white / Warm Cream)

- **Card Background:** Pure `#FFFFFF` with subtle border `#e6e9e3` and rounded corners (`20px`)

- **Typography:**

  - Headings: `Playfair Display` (Serif, elegant, italic accents)

  - Body & Data UI: `DM Sans` (Clean, modern sans-serif)

- **Hero Badges:** Pill-shaped text badges with symbol prefix (e.g., `✦ AI-POWERED PACKAGING INTELLIGENCE`)

- **Vibe:** Clean, premium, spacious, editorial, and eco-friendly (NOT dense, technical, or ugly debug tool style).

---

## 2. User Flow & Screen Architecture

### Screen 1: Animated Hero & Landing Page

- Sticky Glassmorphism Navbar (`PackSmart AI` logo, Nav links: Analyzer, How it Works, Batches, and a dark green "Login / Portal →" button).

- Hero Section: Big serif typography: "The right package for every product."

- Floating Glassmorphism Cards: "Packaging Match: 94% compatibility" and "Shelf Life: +32% estimated".

- Action Buttons: "Start Analysis →" (Opens Analyzer) and "Access Portal / Login" (Opens Modal).

### Screen 2: Multi-Tenant Login Portal Modal

A sleek overlay modal with 3 login modes:

1. **Enterprise Mode:** Email + Password login for R&D labs with persistent cloud project saving.

2. **Farmer / FPO Mode:** Fast Mobile Phone OTP login with "Offline IndexedDB Sync Mode" toggle for deep rural areas.

3. **Guest Mode:** Single-click instant access ("Continue as Guest").

### Screen 3: Main Navigation Dashboard

Header menu allowing users to switch between 4 views:

- **Tab A: Product Analyzer (Core Workflow)**

- **Tab B: Active Batches Ledger** (Track active food shipments, shelf-life countdowns, and dynamic Packaging QR Passports)

- **Tab C: Supplier Directory** (Connect with verified Indian packaging manufacturers with pricing in ₹)

- **Tab D: Explainable AI (XAI) Hub** (Inspect SHAP feature weights explaining food chemistry logic)

### Screen 4: The Product Analyzer (3-Tier Input Engine)

Clean, spacious step-by-step form with 3 input options:

1. **ICMR-NIN Food Search (Default):** Auto-lookup food commodities (e.g., Alphonso Mangoes, Roasted Makhana, Chilli Pickle) to automatically pull water activity (aw), fat/lipid %, pH, and respiration rate.

2. **Farmer Qualitative Wizard:** 3 simple non-technical questions (Product state, Oil content, Crispness) for rural users who don't know chemical formulas.

3. **Lab OCR Upload:** Drag-and-drop area to upload lab test PDFs/images.

- Storage Parameters: Storage Temperature slider (10–45°C), Humidity slider (30–90%), Transit distance radio buttons (Local, Regional, Long Distance).

### Screen 5: AI Recommendation Blueprint & Results

Displayed in spacious, high-contrast cards:

1. **Header:** Overall Compatibility Score (e.g., `94%` inside a circular green ring).

2. **Recommended Film Structure:** Dark green card displaying multi-layer laminated gauge (e.g., `12µ PET / 9µ Al Foil / 50µ LDPE`) with tag badges (`High O2 Barrier`, `Light Barrier`, `Heat Sealable`).

3. **Barrier Specs Grid:** Clean 2x2 grid displaying target OTR (<1 cc/m²/day), WVTR (<1 g/m²/day), Film Thickness (70–100 µm), and Sealability.

4. **Interactive Green-Swap Toggle:** Active switch that replaces synthetic layers with bio-based alternatives (e.g., PLA / Cellulose film), updating carbon savings, shelf-life variance, and unit cost in ₹ live.

5. **B2B Cost Estimator:** Real manufacturing cost estimate in Indian Rupees (e.g., `₹1,850 per 1,000 units`).

6. **Explainable AI (SHAP) Chart:** Visual bar breakdown showing algorithmic feature weights (e.g., `45% Lipid Oxidation Risk`, `32% Moisture Sensitivity`, `23% Temperature Delta`).

7. **Actions:** "← Analyze Another", "Generate Dynamic QR Passport", and "Export Compliance PDF".

---

## 3. Technical Implementation Details

- Build using React / Next.js with Tailwind CSS OR single-file HTML/CSS/JS.

- Ensure smooth CSS transitions between screens (`opacity`, `transform`, `smooth-scroll`).

- Make the app fully responsive for mobile, tablet, and desktop viewing.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/29517705-1a08-5ddc-ae5c-a6bf12ea8004).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
