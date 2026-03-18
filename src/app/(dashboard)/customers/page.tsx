import { Plus, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'
import { SearchInput } from '@/components/shared/search-input'
import { CustomerCard } from '@/components/customers/customer-card'
import { Customer } from '@/types'

const PLACEHOLDER_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    userId: 'user1',
    name: 'Sarah Thompson',
    email: 'sarah.thompson@email.com',
    phone: '07700 900001',
    company: undefined,
    address: '22 Park Lane, Bristol',
    postcode: 'BS1 5RL',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    updatedAt: new Date(),
    _count: { quotes: 4, enquiries: 2 },
  },
  {
    id: 'c2',
    userId: 'user1',
    name: 'Mark Davis',
    email: 'mark.davis@email.com',
    phone: '07700 900002',
    address: '14 Clifton Road, Bristol',
    postcode: 'BS8 1AA',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    updatedAt: new Date(),
    _count: { quotes: 2, enquiries: 1 },
  },
  {
    id: 'c3',
    userId: 'user1',
    name: 'Robert Clarke',
    email: 'rob.clarke@email.com',
    phone: '07700 900003',
    company: 'Clarke & Sons Ltd',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    updatedAt: new Date(),
    _count: { quotes: 6, enquiries: 3 },
  },
  {
    id: 'c4',
    userId: 'user1',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '07700 900004',
    address: '5 High Street, Bath',
    postcode: 'BA1 1AA',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    updatedAt: new Date(),
    _count: { quotes: 1, enquiries: 1 },
  },
  {
    id: 'c5',
    userId: 'user1',
    name: 'Patricia Moore',
    phone: '07700 900005',
    address: '8 Victoria Street, Bristol',
    postcode: 'BS1 6AY',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    updatedAt: new Date(),
    _count: { quotes: 3, enquiries: 2 },
  },
]

export default function CustomersPage() {
  const customers = PLACEHOLDER_CUSTOMERS

  return (
    <div className="space-y-6 animate-slideUp">
      <PageHeader
        title="Customers"
        subtitle={`${customers.length} customers`}
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </PageHeader>

      {/* Search */}
      <SearchInput placeholder="Search customers..." className="max-w-xs" />

      {/* Customer list */}
      {customers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No customers yet"
          description="Add your first customer to get started. Customers are created automatically when you create a quote."
          actionLabel="Add Customer"
          actionHref="/customers/new"
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      )}
    </div>
  )
}
