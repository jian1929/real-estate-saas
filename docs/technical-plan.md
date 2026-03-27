# Real Estate AI SaaS - Technical Implementation Plan

## Project Structure

```
real-estate-saas/
├── real-estate-saas-app/          # Next.js Application
│   ├── app/
│   │   ├── page.tsx               # Landing page
│   │   ├── dashboard/page.tsx      # Client dashboard
│   │   ├── pricing/page.tsx        # Pricing page
│   │   ├── api/
│   │   │   ├── leads/route.ts     # Leads CRUD
│   │   │   ├── stripe/route.ts    # Stripe subscription
│   │   │   ├── webhooks/route.ts  # Stripe webhooks
│   │   │   └── auth/route.ts      # Auth endpoints
│   │   └── layout.tsx
│   ├── components/
│   │   ├── LandingHero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   ├── LeadTable.tsx
│   │   ├── Stats.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client
│   │   ├── stripe.ts              # Stripe client
│   │   └── scrapers/              # Scraper modules
│   ├── scripts/
│   │   ├── scrape-all.ts          # Main scraping orchestrator
│   │   └── send-reports.ts        # Weekly report sender
│   ├── prisma/
│   │   └── schema.prisma
│   └── skills/                    # OpenClaw Skills
│       ├── au-domain-scraper/
│       ├── au-reddit-scraper/
│       ├── jp-suumo-scraper/
│       ├── vn-batdongsan-scraper/
│       └── ai-personalizer/
├── docs/
│   ├── README.md
│   ├── architecture.md
│   ├── scraping-guide.md
│   └── deployment.md
└── deployment/
    ├── vercel.json
    └── docker-compose.yml
```

## Database Schema (Prisma)

model User {
  id                 String   @id @default(cuid())
  email              String   @unique
  name               String?
  stripeCustomerId  String?  @unique
  plan               Plan     @default(STARTER)
  market             String   @default("australia")
  locations          String[]
  createdAt          DateTime @default(now())
  leads              Lead[]
  subscriptions      Subscription[]
}

model Subscription {
  id                   String   @id @default(cuid())
  userId               String
  user                 User     @relation(fields: [userId], references: [id])
  stripeSubscriptionId String   @unique
  stripePriceId        String
  status               SubscriptionStatus
  currentPeriodStart   DateTime
  currentPeriodEnd     DateTime
  createdAt            DateTime @default(now())
}

model Lead {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  source      String
  sourceUrl   String?
  title       String
  description String?
  price       String?
  location    String?
  contactInfo String?
  agentName   String?
  agentPhone  String?
  score       Int      @default(0)
  status      LeadStatus @default(NEW)
  scrapedAt   DateTime @default(now())
  createdAt   DateTime @default(now())
}

enum Plan { STARTER PROFESSIONAL ENTERPRISE }
enum SubscriptionStatus { ACTIVE CANCELLED PAST_DUE INCOMPLETE }
enum LeadStatus { NEW CONTACTED QUALIFIED CONVERTED JUNK }

## API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user

### Leads
- GET /api/leads - List user's leads
- GET /api/leads/:id - Get single lead
- PATCH /api/leads/:id - Update lead status

### Subscriptions
- POST /api/stripe/create-subscription - Create Stripe subscription
- POST /api/stripe/cancel-subscription - Cancel subscription

### Webhooks
- POST /api/webhooks/stripe - Handle Stripe webhooks

## Environment Variables

DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_USER_AGENT=
NEXT_PUBLIC_APP_URL=
