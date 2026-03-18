import { Plus, Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'
import { SearchInput } from '@/components/shared/search-input'
import { EnquiryCard } from '@/components/enquiries/enquiry-card'
import { Enquiry } from '@/types'

const PLACEHOLDER_ENQUIRIES: Enquiry[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Boiler replacement needed urgently',
    description: 'Current boiler is 15 years old and breaking down. Need full replacement including flushing of system.',
    source: 'WEBSITE',
    status: 'NEW',
    contactName: 'Emma Wilson',
    contactEmail: 'emma.wilson@email.com',
    contactPhone: '07700 900123',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Kitchen and bathroom plumbing works',
    description: 'New kitchen extension — need all plumbing roughed in before plastering.',
    source: 'REFERRAL',
    status: 'CONTACTED',
    contactName: 'Robert Clarke',
    contactEmail: 'rob.clarke@email.com',
    contactPhone: '07700 900456',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
  },
  {
    id: '3',
    userId: 'user1',
    title: 'Leak repair under kitchen sink',
    description: 'Dripping badly for 2 weeks. Need someone ASAP.',
    source: 'PHONE',
    status: 'QUOTED',
    contactName: 'Patricia Moore',
    contactPhone: '07700 900789',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 30),
  },
  {
    id: '4',
    userId: 'user1',
    title: 'Annual boiler service',
    description: 'Just moved into new property, want it serviced.',
    source: 'EMAIL',
    status: 'CLOSED',
    contactName: 'David Thompson',
    contactEmail: 'david.t@email.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 60),
  },
]

export default function EnquiriesPage() {
  const enquiries = PLACEHOLDER_ENQUIRIES

  return (
    <div className="space-y-6 animate-slideUp">
      <PageHeader
        title="Enquiries"
        subtitle={`${enquiries.length} total enquiries`}
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Enquiry
        </Button>
      </PageHeader>

      {/* Search & filter */}
      <div className="flex items-center gap-3">
        <SearchInput placeholder="Search enquiries..." className="max-w-xs" />
      </div>

      {/* Enquiry list */}
      {enquiries.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No enquiries yet"
          description="When customers reach out, their enquiries will appear here. Start by adding your first enquiry."
          actionLabel="Add Enquiry"
          actionHref="/enquiries/new"
        />
      ) : (
        <div className="grid gap-3">
          {enquiries.map((enquiry) => (
            <EnquiryCard key={enquiry.id} enquiry={enquiry} />
          ))}
        </div>
      )}
    </div>
  )
}
