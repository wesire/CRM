import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'james@mitchellplumbing.co.uk' },
    update: {},
    create: {
      email: 'james@mitchellplumbing.co.uk',
      name: 'James Mitchell',
      businessName: 'Mitchell Plumbing & Heating',
      phone: '07700 900000',
      settings: {
        create: {
          businessName: 'Mitchell Plumbing & Heating',
          businessEmail: 'james@mitchellplumbing.co.uk',
          businessPhone: '07700 900000',
          businessAddress: 'Bristol, BS1 1AA',
          accentColor: '#6366f1',
          quotePrefix: 'QF',
          quoteNextNumber: 1025,
          currency: 'GBP',
          taxRate: 20,
          taxLabel: 'VAT',
          followUpDays: 3,
          quoteExpiryDays: 30,
          autoFollowUp: true,
          followUpNoReplyDays: 2,
          followUpUnopenedDays: 5,
        },
      },
    },
  })

  console.log('Created user:', user.email)

  // Create customers
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { id: 'seed-c1' },
      update: {},
      create: {
        id: 'seed-c1',
        userId: user.id,
        name: 'Sarah Thompson',
        email: 'sarah.thompson@email.com',
        phone: '07700 900001',
        address: '22 Park Lane, Bristol',
        postcode: 'BS1 5RL',
      },
    }),
    prisma.customer.upsert({
      where: { id: 'seed-c2' },
      update: {},
      create: {
        id: 'seed-c2',
        userId: user.id,
        name: 'Mark Davis',
        email: 'mark.davis@email.com',
        phone: '07700 900002',
        address: '14 Clifton Road, Bristol',
        postcode: 'BS8 1AA',
        notes: 'Has a large Victorian house with older pipework.',
      },
    }),
    prisma.customer.upsert({
      where: { id: 'seed-c3' },
      update: {},
      create: {
        id: 'seed-c3',
        userId: user.id,
        name: 'Robert Clarke',
        email: 'rob.clarke@email.com',
        phone: '07700 900003',
        company: 'Clarke & Sons Ltd',
      },
    }),
  ])

  console.log('Created customers:', customers.map((c) => c.name).join(', '))

  // Create quotes
  const quote1 = await prisma.quote.create({
    data: {
      userId: user.id,
      customerId: customers[0].id,
      quoteNumber: 'QF-1024',
      title: 'Bathroom renovation — full plumbing',
      status: 'ACCEPTED',
      subtotal: 2875,
      taxRate: 20,
      taxAmount: 575,
      total: 3450,
      acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      lineItems: {
        create: [
          { description: 'Labour — 8 hours', quantity: 8, unitPrice: 65, total: 520, optional: false, selected: true, sortOrder: 0 },
          { description: 'New bath and taps', quantity: 1, unitPrice: 850, total: 850, optional: false, selected: true, sortOrder: 1 },
          { description: 'Pipework and fittings', quantity: 1, unitPrice: 380, total: 380, optional: false, selected: true, sortOrder: 2 },
          { description: 'Waste system', quantity: 1, unitPrice: 290, total: 290, optional: false, selected: true, sortOrder: 3 },
          { description: 'Shower upgrade (optional)', quantity: 1, unitPrice: 835, total: 835, optional: true, selected: false, sortOrder: 4 },
        ],
      },
    },
  })

  const quote2 = await prisma.quote.create({
    data: {
      userId: user.id,
      customerId: customers[1].id,
      quoteNumber: 'QF-1023',
      title: 'Kitchen plumbing repairs',
      status: 'OPENED',
      subtotal: 566.67,
      taxRate: 20,
      taxAmount: 113.33,
      total: 680,
      sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      openedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      lineItems: {
        create: [
          { description: 'Labour — 4 hours @ £65/hr', quantity: 4, unitPrice: 65, total: 260, optional: false, selected: true, sortOrder: 0 },
          { description: 'Replacement stop tap (15mm)', quantity: 1, unitPrice: 28, total: 28, optional: false, selected: true, sortOrder: 1 },
          { description: 'Water filter upgrade (optional)', quantity: 1, unitPrice: 221, total: 221, optional: true, selected: false, sortOrder: 2 },
        ],
      },
    },
  })

  console.log('Created quotes')

  // Create activities
  await prisma.activity.createMany({
    data: [
      {
        userId: user.id,
        customerId: customers[0].id,
        quoteId: quote1.id,
        type: 'QUOTE_ACCEPTED',
        title: 'Quote accepted by Sarah Thompson',
        description: 'QF-1024 — Bathroom renovation · £3,450',
        createdAt: new Date(Date.now() - 1000 * 60 * 20),
      },
      {
        userId: user.id,
        customerId: customers[1].id,
        quoteId: quote2.id,
        type: 'QUOTE_OPENED',
        title: 'Quote opened by Mark Davis',
        description: 'QF-1023 — Kitchen plumbing repairs',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
  })

  console.log('Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
