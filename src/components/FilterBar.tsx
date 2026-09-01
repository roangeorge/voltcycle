'use client'

import { useState } from 'react'
import { brands } from '@/data/bikes'

interface FilterState {
  minPrice: string
  maxPrice: string
  selectedBrands: string[]
  sort: string
}

interface Props {
  filters: FilterState
  onChange: (f: FilterState) => void
  resultCount: number
}

const priceOptions = [
  { value: '', label: 'Any' },
  { value: '500', label: '$500' },
  { value: '1000', label: '$1,000' },
  { value: '1500', label: '$1,500' },
  { value: '2000', label: '$2,000' },
  { value: '2500', label: '$2,500' },
  { value: '3000', label: '$3,000' },
  { value: '3500', label: '$3,500' },
  { value: '4000', label: '$4,000' },
]

export default function FilterBar({ filters, onChange, resultCount }: Props) {
  const [open, setOpen] = useState(false)

  const activeCount =
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    filters.selectedBrands.length

  function updateFilter(partial: Partial<FilterState>) {
    onChange({ ...filters, ...partial })
  }

  function toggleBrand(brand: string) {
    const next = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter(b => b !== brand)
      : [...filters.selectedBrands, brand]
    updateFilter({ selectedBrands: next })
  }

  function clearAll() {
    onChange({ minPrice: '', maxPrice: '', selectedBrands: [], sort: 'newest' })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      {/* mobile toggle */}
      <div className="flex items-center justify-between md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="text-sm font-medium text-txt flex items-center gap-2"
        >
          Filters
          {activeCount > 0 && (
            <span className="bg-teal text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
          <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <span className="text-sm text-txt-secondary">{resultCount} bike{resultCount !== 1 ? 's' : ''}</span>
      </div>

      {/* filter controls — always visible on desktop, toggleable on mobile */}
      <div className={`${open ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          {/* price range */}
          <div className="flex gap-2 items-end">
            <div>
              <label className="block text-xs text-txt-secondary mb-1">Min Price</label>
              <select
                value={filters.minPrice}
                onChange={e => updateFilter({ minPrice: e.target.value })}
                className="block w-full rounded border border-gray-200 px-3 py-2 text-sm bg-white"
              >
                {priceOptions.map(o => (
                  <option key={`min-${o.value}`} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <span className="text-txt-secondary text-sm pb-2">to</span>
            <div>
              <label className="block text-xs text-txt-secondary mb-1">Max Price</label>
              <select
                value={filters.maxPrice}
                onChange={e => updateFilter({ maxPrice: e.target.value })}
                className="block w-full rounded border border-gray-200 px-3 py-2 text-sm bg-white"
              >
                {priceOptions.map(o => (
                  <option key={`max-${o.value}`} value={o.value}>{o.label}</option>
                ))}
                <option value="99999">$4,000+</option>
              </select>
            </div>
          </div>

          {/* brand checkboxes */}
          <div>
            <label className="block text-xs text-txt-secondary mb-1">Brand</label>
            <div className="flex flex-wrap gap-2">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                    filters.selectedBrands.includes(brand)
                      ? 'bg-teal text-white border-teal'
                      : 'bg-white text-txt-secondary border-gray-200 hover:border-teal'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* sort */}
          <div className="md:ml-auto">
            <label className="block text-xs text-txt-secondary mb-1">Sort</label>
            <select
              value={filters.sort}
              onChange={e => updateFilter({ sort: e.target.value })}
              className="block w-full rounded border border-gray-200 px-3 py-2 text-sm bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* active filters + clear */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-sm text-txt-secondary hidden md:inline">{resultCount} bike{resultCount !== 1 ? 's' : ''}</span>
          {activeCount > 0 && (
            <button onClick={clearAll} className="text-xs text-teal hover:text-teal-light font-medium">
              Clear all filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
