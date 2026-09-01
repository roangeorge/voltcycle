import Link from 'next/link'
import Image from 'next/image'
import { Bike } from '@/lib/types'
import BoltIcon from './icons/BoltIcon'

export default function BikeCard({ bike }: { bike: Bike }) {
  return (
    <Link
      href={`/inventory/${bike.id}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={bike.images[0]}
          alt={`${bike.brand} ${bike.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {bike.condition === 'Excellent' && (
          <span className="absolute top-3 left-3 bg-teal text-white text-xs font-medium px-2 py-1 rounded">
            Excellent
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-2xl font-bold text-txt">
          ${bike.price.toLocaleString()}
        </p>
        <p className="text-lg font-semibold text-txt mt-0.5">
          {bike.brand} {bike.model}
        </p>

        <div className="flex items-center gap-1.5 mt-2 text-sm text-teal">
          <BoltIcon className="w-4 h-4 shrink-0" />
          <span>{bike.batteryHealthPct}% battery</span>
          <span className="text-txt-secondary">&middot;</span>
          <span>{bike.rangeMiles}mi range</span>
        </div>

        <p className="mt-2 text-xs text-txt-secondary">
          {bike.year} &middot; {bike.condition} &middot; {bike.frameSize}
        </p>

        <span className="inline-block mt-3 text-sm font-medium text-teal group-hover:text-teal-light transition-colors">
          View Details &rarr;
        </span>
      </div>
    </Link>
  )
}
