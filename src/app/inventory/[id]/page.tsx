import Link from 'next/link'
import { notFound } from 'next/navigation'
import { bikes, getBikeById } from '@/data/bikes'
import Gallery from '@/components/Gallery'
import BoltIcon from '@/components/icons/BoltIcon'

export function generateStaticParams() {
  return bikes.map(b => ({ id: b.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const bike = getBikeById(id)
  if (!bike) return { title: 'Bike Not Found' }
  return {
    title: `${bike.brand} ${bike.model} — VoltCycle`,
    description: bike.description,
  }
}

export default async function BikeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const bike = getBikeById(id)
  if (!bike) notFound()

  const listedDate = new Date(bike.addedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/inventory" className="text-sm text-teal hover:text-teal-light font-medium mb-6 inline-block">
        &larr; Back to Inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* images — takes 3 of 5 cols on desktop */}
        <div className="lg:col-span-3">
          <Gallery images={bike.images} alt={`${bike.brand} ${bike.model}`} />
        </div>

        {/* specs */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <p className="text-3xl font-bold">${bike.price.toLocaleString()}</p>
            <h1 className="text-2xl font-semibold mt-1">{bike.brand} {bike.model}</h1>
            <p className="text-sm text-txt-secondary mt-1">{bike.year} &middot; {bike.category}</p>
          </div>

          {/* battery highlight */}
          <div className="bg-teal/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-teal font-semibold">
              <BoltIcon className="w-5 h-5" />
              Battery Health: {bike.batteryHealthPct}%
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <div>
                <span className="text-txt-secondary">Capacity</span>
                <p className="font-medium">{bike.batteryCapacityWh} Wh</p>
              </div>
              <div>
                <span className="text-txt-secondary">Est. Range</span>
                <p className="font-medium">{bike.rangeMiles} miles</p>
              </div>
            </div>
          </div>

          {/* specs table */}
          <div className="border rounded-lg divide-y">
            {[
              ['Mileage', `${bike.mileage.toLocaleString()} mi`],
              ['Frame Size', bike.frameSize],
              ['Condition', bike.condition],
              ['Listed', listedDate],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between px-4 py-3 text-sm">
                <span className="text-txt-secondary">{label}</span>
                <span className="font-medium">{val}</span>
              </div>
            ))}
          </div>

          {/* condition notes */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Condition Notes</h3>
            <p className="text-sm text-txt-secondary leading-relaxed">{bike.conditionNotes}</p>
          </div>

          {/* description */}
          <div>
            <h3 className="text-sm font-semibold mb-2">About This Bike</h3>
            <p className="text-sm text-txt-secondary leading-relaxed">{bike.description}</p>
          </div>

          {/* contact CTA */}
          <div className="bg-navy rounded-lg p-5 text-white">
            <h3 className="font-semibold text-lg">Interested in this bike?</h3>
            <p className="text-gray-400 text-sm mt-1">
              Give us a call or send an email to schedule a test ride.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p>(503) 555-0172</p>
              <p>hello@voltcycle.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
