'use client'

import { useState } from 'react'
import Image from 'next/image'
import { bikes } from '@/data/bikes'

type Tab = 'list' | 'form'

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('list')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* demo banner */}
      <div className="bg-amber/10 border border-amber/30 rounded-lg px-4 py-3 mb-6">
        <p className="text-sm font-medium text-amber-dark">
          Admin Dashboard &mdash; Demo Mode. Controls are styled but non-functional.
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-6">Admin</h1>

      {/* tabs */}
      <div className="flex gap-1 border-b mb-6">
        <button
          onClick={() => setTab('list')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            tab === 'list'
              ? 'border-teal text-teal'
              : 'border-transparent text-txt-secondary hover:text-txt'
          }`}
        >
          Inventory List
        </button>
        <button
          onClick={() => setTab('form')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            tab === 'form'
              ? 'border-teal text-teal'
              : 'border-transparent text-txt-secondary hover:text-txt'
          }`}
        >
          Add / Edit Bike
        </button>
      </div>

      {tab === 'list' ? <InventoryList /> : <BikeForm />}
    </div>
  )
}

function InventoryList() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="border-b text-left text-txt-secondary">
            <th className="pb-3 font-medium">Photo</th>
            <th className="pb-3 font-medium">Bike</th>
            <th className="pb-3 font-medium">Price</th>
            <th className="pb-3 font-medium">Condition</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {bikes.map(bike => (
            <tr key={bike.id} className="hover:bg-gray-50">
              <td className="py-3 pr-3">
                <div className="relative w-12 h-10 rounded overflow-hidden">
                  <Image src={bike.images[0]} alt={bike.model} fill sizes="48px" className="object-cover" />
                </div>
              </td>
              <td className="py-3">
                <p className="font-medium">{bike.brand} {bike.model}</p>
                <p className="text-xs text-txt-secondary">{bike.year}</p>
              </td>
              <td className="py-3">${bike.price.toLocaleString()}</td>
              <td className="py-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                  bike.condition === 'Excellent' ? 'bg-green-100 text-green-800' :
                  bike.condition === 'Good' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {bike.condition}
                </span>
              </td>
              <td className="py-3">
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="py-3 text-right whitespace-nowrap space-x-2">
                <button className="text-xs font-medium text-teal hover:text-teal-light">Edit</button>
                <button className="text-xs font-medium text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BikeForm() {
  return (
    <form onSubmit={e => e.preventDefault()} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Brand" placeholder="e.g. Specialized" />
        <Field label="Model" placeholder="e.g. Turbo Vado 5.0" />
        <Field label="Year" type="number" placeholder="2023" />
        <Field label="Price ($)" type="number" placeholder="2499" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select className="w-full rounded border border-gray-200 px-3 py-2 text-sm bg-white">
            <option>City</option>
            <option>Mountain</option>
            <option>Cargo</option>
            <option>Folding</option>
            <option>Road</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Frame Size</label>
          <select className="w-full rounded border border-gray-200 px-3 py-2 text-sm bg-white">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>X-Large</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Condition</label>
          <select className="w-full rounded border border-gray-200 px-3 py-2 text-sm bg-white">
            <option>Excellent</option>
            <option>Good</option>
            <option>Fair</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Battery (Wh)" type="number" placeholder="500" />
        <Field label="Battery Health (%)" type="number" placeholder="90" />
        <Field label="Range (miles)" type="number" placeholder="45" />
      </div>

      <Field label="Mileage" type="number" placeholder="1200" />

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          rows={3}
          placeholder="Describe the bike..."
          className="w-full rounded border border-gray-200 px-3 py-2 text-sm resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Condition Notes</label>
        <textarea
          rows={2}
          placeholder="Any wear, damage, or recent repairs..."
          className="w-full rounded border border-gray-200 px-3 py-2 text-sm resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Photos</label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-sm text-txt-secondary">
          Drag and drop images here, or click to browse
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2.5 bg-teal text-white font-medium rounded hover:bg-teal-light transition-colors text-sm"
        >
          Save Bike
        </button>
        <button
          type="button"
          className="px-6 py-2.5 border border-gray-200 text-txt-secondary font-medium rounded hover:bg-gray-50 transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function Field({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded border border-gray-200 px-3 py-2 text-sm"
      />
    </div>
  )
}
