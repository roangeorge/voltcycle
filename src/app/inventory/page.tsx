'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo, useCallback, Suspense } from 'react'
import { bikes } from '@/data/bikes'
import BikeCard from '@/components/BikeCard'
import FilterBar from '@/components/FilterBar'

function InventoryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const filters = useMemo(() => ({
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    selectedBrands: searchParams.get('brand')?.split(',').filter(Boolean) || [],
    sort: searchParams.get('sort') || 'newest',
  }), [searchParams])

  const setFilters = useCallback((f: typeof filters) => {
    const params = new URLSearchParams()
    if (f.minPrice) params.set('minPrice', f.minPrice)
    if (f.maxPrice) params.set('maxPrice', f.maxPrice)
    if (f.selectedBrands.length) params.set('brand', f.selectedBrands.join(','))
    if (f.sort && f.sort !== 'newest') params.set('sort', f.sort)
    const qs = params.toString()
    router.replace(`/inventory${qs ? `?${qs}` : ''}`, { scroll: false })
  }, [router])

  const filtered = useMemo(() => {
    let list = [...bikes]

    if (filters.minPrice) {
      list = list.filter(b => b.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      list = list.filter(b => b.price <= Number(filters.maxPrice))
    }
    if (filters.selectedBrands.length) {
      list = list.filter(b => filters.selectedBrands.includes(b.brand))
    }

    switch (filters.sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      default: // newest
        list.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    }

    return list
  }, [filters])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>

      <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-txt-secondary">No bikes match your filters.</p>
          <button
            onClick={() => setFilters({ minPrice: '', maxPrice: '', selectedBrands: [], sort: 'newest' })}
            className="mt-3 text-sm text-teal font-medium hover:text-teal-light"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function InventoryPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-6">Inventory</h1>
        <div className="animate-pulse bg-gray-200 rounded-lg h-20 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-80" />
          ))}
        </div>
      </div>
    }>
      <InventoryContent />
    </Suspense>
  )
}
