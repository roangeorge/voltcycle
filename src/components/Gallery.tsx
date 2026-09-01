'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative w-20 h-16 rounded overflow-hidden border-2 transition-colors ${
                i === active ? 'border-teal' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image src={img} alt={`${alt} view ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
