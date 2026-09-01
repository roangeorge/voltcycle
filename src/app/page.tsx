import Image from 'next/image'
import Link from 'next/link'
import BikeCard from '@/components/BikeCard'
import { getFeaturedBikes } from '@/data/bikes'

const highlights = [
  { stat: '200+', label: 'Bikes Sold' },
  { stat: '90-Day', label: 'Warranty' },
  { stat: '50-Point', label: 'Inspection' },
]

const serviceTeasers = [
  {
    title: 'Certified Pre-Owned',
    blurb: 'Every bike passes a 50-point inspection before it hits our floor. Battery tested, motor verified, frame checked.',
  },
  {
    title: 'Expert Repairs',
    blurb: 'From battery diagnostics to full motor rebuilds, our techs handle e-bike-specific work that general shops can\'t.',
  },
  {
    title: 'Trade-In Program',
    blurb: 'Upgrading? Bring your current e-bike in for a fair appraisal and put the value toward your next ride.',
  },
]

export default function Home() {
  const featured = getFeaturedBikes()

  return (
    <>
      {/* hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center">
        <Image
          src="/bikes/hero.jpg"
          alt="Electric bike on a city street"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-2xl leading-tight">
            Pre-Owned E-Bikes, Certified &amp; Ready to Ride
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl">
            Quality electric bikes at fair prices. Every bike inspected, tested, and backed by our warranty.
          </p>
          <Link
            href="/inventory"
            className="inline-block mt-8 px-8 py-3 bg-amber text-navy font-semibold rounded hover:bg-amber-dark transition-colors"
          >
            Browse Inventory
          </Link>
        </div>
      </section>

      {/* trust strip */}
      <section className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            {highlights.map(h => (
              <div key={h.label}>
                <p className="text-2xl sm:text-3xl font-bold text-amber">{h.stat}</p>
                <p className="text-sm text-gray-400 mt-1">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* featured bikes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Bikes</h2>
            <p className="mt-1 text-txt-secondary">Hand-picked from our current inventory</p>
          </div>
          <Link href="/inventory" className="text-sm font-medium text-teal hover:text-teal-light transition-colors hidden sm:block">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href="/inventory" className="text-sm font-medium text-teal">View All Inventory &rarr;</Link>
        </div>
      </section>

      {/* services teaser */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center">More Than a Bike Shop</h2>
          <p className="mt-2 text-txt-secondary text-center max-w-xl mx-auto">
            We service what we sell — and everything else with a battery and two wheels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {serviceTeasers.map(s => (
              <div key={s.title} className="text-center">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-txt-secondary leading-relaxed">{s.blurb}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block px-6 py-2.5 border-2 border-teal text-teal font-medium rounded hover:bg-teal hover:text-white transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
