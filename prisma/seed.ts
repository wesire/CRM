import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@quoteflow.co.uk" },
    update: {},
    create: {
      name: "James Mitchell",
      email: "demo@quoteflow.co.uk",
      businessName: "Mitchell Plumbing & Heating",
      phone: "07700 900000",
    },
  })

  console.log("Created user:", user.id)

  // Create user settings
  await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      businessName: "Mitchell Plumbing & Heating",
      businessEmail: "james@mitchellplumbing.co.uk",
      businessPhone: "07700 900000",
      businessAddress: "Bristol, UK",
      accentColor: "#6366f1",
      quotePrefix: "QF",
      quoteNextNumber: 1025,
      currency: "GBP",
      taxRate: 20.0,
      taxLabel: "VAT",
    },
  })

  // Create demo customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        userId: user.id,
        name: "Sarah Thompson",
        email: "sarah.thompson@email.com",
        phone: "07700 900001",
        address: "22 Park Lane, Bristol",
        postcode: "BS1 5RL",
      },
    }),
    prisma.customer.create({
      data: {
        userId: user.id,
        name: "Mark Davis",
        email: "mark.davis@email.com",
        phone: "07700 900002",
        address: "14 Clifton Road, Bristol",
        postcode: "BS8 1AA",
      },
    }),
  ])

  console.log("Created customers:", customers.length)
  console.log("Seeding complete!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
