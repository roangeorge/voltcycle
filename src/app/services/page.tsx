import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services & Repairs — VoltCycle',
  description: 'E-bike repair, battery diagnostics, motor service, and trade-in appraisals at VoltCycle Portland.',
}

const services = [
  {
    title: 'Battery Diagnostics & Replacement',
    price: 'From $149',
    desc: 'Full capacity and health testing with certified diagnostic equipment. If replacement is needed, we source OEM or quality-matched cells and handle the swap.',
  },
  {
    title: 'Motor Service & Tune-Up',
    price: 'From $89',
    desc: 'Diagnostic scan, bearing check, firmware update, and calibration. Covers hub motors and mid-drives from all major manufacturers.',
  },
  {
    title: 'Full Inspection & Certification',
    price: 'From $199',
    desc: 'Our 50-point inspection covers brakes, drivetrain, electrical system, frame integrity, and battery health. Includes a written report and certification sticker.',
  },
  {
    title: 'Brake & Drivetrain Service',
    price: 'From $59',
    desc: 'Pad replacement, rotor truing, cable adjustment, chain and cassette wear check. We work with both mechanical and hydraulic disc systems.',
  },
  {
    title: 'Custom Builds & Upgrades',
    price: 'From $249',
    desc: 'Want to convert your acoustic bike or upgrade components on your current e-bike? We consult on the best options and handle the build.',
  },
  {
    title: 'Trade-In Appraisal',
    price: 'Free',
    desc: 'Bring your current e-bike in for a no-obligation valuation. We inspect the bike, check market comps, and give you a fair offer on the spot.',
  },
]

const hours = [
  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 5:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

export default function ServicesPage() {
  return (
    <>
      {/* hero */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Services & Repairs</h1>
          <p className="mt-3 text-gray-400 max-w-xl text-lg">
            We know e-bikes inside and out. From routine maintenance to complex motor work,
            our Portland shop handles it all.
          </p>
        </div>
      </section>

      {/* about */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold">About VoltCycle</h2>
          <p className="mt-4 text-txt-secondary leading-relaxed">
            VoltCycle started in 2021 when two cycling mechanics noticed a gap: plenty of shops could fix
            a chain, but almost none could diagnose a Bosch error code or test a degraded battery pack.
            We built VoltCycle around that need — a shop that speaks both bike and electronics.
          </p>
          <p className="mt-3 text-txt-secondary leading-relaxed">
            Based on SE Hawthorne in Portland, we buy, certify, and sell pre-owned e-bikes while running
            a full-service repair shop. Every bike on our floor has passed the same inspection we offer
            as a standalone service.
          </p>
        </div>
      </section>

      {/* services grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(svc => (
              <div key={svc.title} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-lg leading-tight">{svc.title}</h3>
                  <span className="text-sm font-bold text-teal whitespace-nowrap">{svc.price}</span>
                </div>
                <p className="mt-3 text-sm text-txt-secondary leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-txt-secondary uppercase tracking-wider mb-3">Address</h3>
            <p className="text-sm leading-relaxed">
              2847 SE Hawthorne Blvd<br />
              Portland, OR 97214
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-txt-secondary uppercase tracking-wider mb-3">Contact</h3>
            <p className="text-sm leading-relaxed">
              (503) 555-0172<br />
              hello@voltcycle.com
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-txt-secondary uppercase tracking-wider mb-3">Hours</h3>
            <dl className="text-sm space-y-1">
              {hours.map(h => (
                <div key={h.day} className="flex justify-between">
                  <dt className="text-txt-secondary">{h.day}</dt>
                  <dd className="font-medium">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
