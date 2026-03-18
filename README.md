# Quote Flow

A beautifully simple quote-tracking and follow-up platform for small UK trades and service businesses. Built for plumbers, electricians, builders, cleaners, gardeners, decorators, and other local trades.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **Prisma** ORM
- **PostgreSQL** database
- **NextAuth.js** for authentication (prepared)

## Getting Started

```bash
# 1. Clone & install
git clone <repo>
cd quote-flow
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your DATABASE_URL and NEXTAUTH_SECRET

# 3. Generate Prisma client
npm run db:generate

# 4. Push schema to database
npm run db:push

# 5. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
src/
├── app/
│   ├── (dashboard)/          # Auth-protected dashboard routes
│   │   ├── page.tsx          # Dashboard home
│   │   ├── enquiries/        # Enquiries list
│   │   ├── quotes/           # Quotes list + detail
│   │   ├── customers/        # Customers list + detail
│   │   └── settings/         # Settings
│   └── quote/[token]/        # Public customer-facing quote page
├── components/
│   ├── ui/                   # shadcn/ui base components
│   ├── layout/               # Sidebar, topbar, mobile nav
│   ├── dashboard/            # Dashboard-specific components
│   ├── quotes/               # Quote components
│   ├── customers/            # Customer components
│   ├── enquiries/            # Enquiry components
│   └── shared/               # Shared/reusable components
├── lib/                      # Utilities, Prisma client, constants
└── types/                    # TypeScript types
```

## Stage Roadmap

| Stage | Name | Description |
|-------|------|-------------|
| **1** | Product Foundation | Architecture, design system, data model, skeleton pages ✅ |
| **2** | Core Quote Flow MVP | Full CRUD: enquiries → quotes → follow-up → won/lost |
| **3** | Interactive Quote Pages | Branded customer-facing quote pages with accept/reject |
| **4** | Integrations & Automation | Gmail/Outlook sync, auto follow-up reminders |
| **5** | AI Assist & SaaS Polish | AI quote drafting, onboarding, billing, production readiness |

## License

MIT
