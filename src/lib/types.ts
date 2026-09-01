export interface Bike {
  id: string
  brand: string
  model: string
  year: number
  price: number
  category: 'City' | 'Mountain' | 'Cargo' | 'Folding' | 'Road'
  batteryCapacityWh: number
  batteryHealthPct: number
  rangeMiles: number
  mileage: number
  frameSize: 'Small' | 'Medium' | 'Large' | 'X-Large'
  condition: 'Excellent' | 'Good' | 'Fair'
  conditionNotes: string
  description: string
  images: string[]
  featured: boolean
  addedDate: string
}
