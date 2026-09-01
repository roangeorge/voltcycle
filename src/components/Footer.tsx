import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              Volt<span className="text-amber">Cycle</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Portland&apos;s trusted source for certified pre-owned e-bikes.
              Every bike inspected, tested, and backed by our 90-day warranty.
            </p>
          </div>

          {/* links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/inventory" className="hover:text-white transition-colors">Browse Inventory</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services & Repairs</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin</Link></li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>2847 SE Hawthorne Blvd</li>
              <li>Portland, OR 97214</li>
              <li>(503) 555-0172</li>
              <li>hello@voltcycle.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <span>VoltCycle &mdash; a fictional demo project</span>
          <span>
            Design inspired by{' '}
            <a href="https://html5up.net" className="text-gray-300 hover:text-white underline" target="_blank" rel="noopener noreferrer">
              HTML5 UP
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
