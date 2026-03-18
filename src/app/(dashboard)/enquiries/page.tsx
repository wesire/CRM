import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/page-header'
import { SearchInput } from '@/components/shared/search-input'
import { EnquiryCard } from '@/components/enquiries/enquiry-card'
import type { Enquiry } from '@/types'

const MOCK_ENQUIRIES: Enquiry[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Boiler replacement needed urgently',
    source: 'WEBSITE',
    status: 'NEW',
    contactName: 'David Clarke',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(),
    description: 'My boiler has completely stopped working. Need an urgent replacement quote.',
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Kitchen and bathroom plumbing works',
    source: 'REFERRAL',
    status: 'CONTACTED',
    contactName: 'Sue Harper',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(),
    description: 'Full kitchen and bathroom plumbing for a new build extension.',
  },
  {
    id: '3',
    userId: 'user1',
    title: 'Leak repair under kitchen sink',
    source: 'PHONE',
    status: 'QUOTED',
    contactName: 'Paul Newman',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    updatedAt: new Date(),
    description: 'Persistent leak under kitchen sink. Needs investigation and repair.',
  },
  {
    id: '4',
    userId: 'user1',
    title: 'Annual boiler service',
    source: 'EMAIL',
    status: 'CLOSED',
    contactName: 'Linda Scott',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    updatedAt: new Date(),
    description: 'Annual boiler service and safety check.',
  },
  {
    id: '5',
    userId: 'user1',
    title: 'New radiator installation',
    source: 'SOCIAL_MEDIA',
    status: 'NEW',
    contactName: 'Chris Brown',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(),
    description: 'Need two new radiators added to a bedroom extension.',
  },
]

export default function EnquiriesPage() {
  return (
    <div className="space-y-6 animate-slideUp">
      <PageHeader
        title="Enquiries"
        subtitle="Manage and convert incoming job enquiries"
      >
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          New Enquiry
        </Button>
      </PageHeader>

      <SearchInput placeholder="Search enquiries..." />

      <div className="space-y-3">
        {MOCK_ENQUIRIES.map((enquiry) => (
          <EnquiryCard key={enquiry.id} enquiry={enquiry} />
        ))}
      </div>
    </div>
  )
}
