# Eula Properties

## What This Is
Marketing/investment website for Eula Properties LLC (Houston, TX). Showcases the Pembrook compound ($1.1M real estate investment), AI training facility, and investment opportunities.

## Repo & Deployment
- **GitHub:** github.com/dbutler-a11y/eulaproperties-test-current
- **Hosting:** Vercel
- **Contact:** dbutler@eulaproperties.com

## Tech Stack
- Next.js 16, React 19, TypeScript 5
- Tailwind CSS 4
- Lucide React (icons)
- Static site — no backend, no database, no auth

## Running
```bash
npm run dev      # localhost:3000
npm run build
npm run lint
```

## Pages
- `/` — Home (hero, metrics, portfolio cards, AI institute, mission, contact)
- `/pembrook` — Property detail (client component: capital stack, construction timeline, gallery, document vault, video tour)

## Key Files
```
src/app/
├── page.tsx                    # Home page
├── pembrook/page.tsx           # Pembrook property detail (client component)
├── layout.tsx                  # Root layout + metadata
└── globals.css                 # Tailwind styles
public/pembrook/
├── documents/                  # PDFs (appraisals, construction plans)
│   ├── appraisal-9132.pdf
│   ├── appraisal-9134.pdf
│   ├── appraisal-9136.pdf
│   └── approved-plans.pdf
└── images/                     # 27 construction/render images
```

## Property: Pembrook Compound
- Address: 9132-9136 Pembrook St, Houston, TX 77016
- 3 residential units, ~$1.095M total capital
- Senior Debt: $550K (Center Street Lending)
- Mezzanine: $500K (Private Investors)
- Construction: ~70% complete (Q1 2025 target for CO)

## Design
- Glassmorphism aesthetic (backdrop-blur, white/opacity borders)
- Gradients: slate, emerald, blue, purple
- Primary brand: emerald #10b981

## No env vars needed — fully static site
