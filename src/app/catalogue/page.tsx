import { Navigation } from "@/components/navigation"
import { CarCard } from "@/components/car-card"
import { RainEffect } from "@/components/rain-effect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Car } from "@/lib/supabase"

// Mock data for cars
const mockCars: Car[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 30000,
    price: 25000,
    fuel_type: "essence",
    description: "Excellent état, faible kilométrage",
    image_url: "/placeholder-car.jpg",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z"
  },
  {
    id: "2",
    brand: "Honda",
    model: "Civic",
    year: 2019,
    mileage: 45000,
    price: 22000,
    fuel_type: "essence",
    description: "Entretien à jour, très bon état",
    image_url: "/placeholder-car.jpg",
    created_at: "2023-01-02T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z"
  },
  {
    id: "3",
    brand: "BMW",
    model: "Série 3",
    year: 2021,
    mileage: 15000,
    price: 45000,
    fuel_type: "essence",
    description: "Haut de gamme, options premium",
    image_url: "/placeholder-car.jpg",
    created_at: "2023-01-03T00:00:00Z",
    updated_at: "2023-01-03T00:00:00Z"
  }
]

// Mock data for brands and years
const mockBrands = ["Toyota", "Honda", "BMW", "Mercedes", "Audi", "Ford", "Volkswagen"]
const mockYears = [2023, 2022, 2021, 2020, 2019, 2018, 2017]

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Get search parameters
  const search = (await searchParams).search as string || ""
  const brand = (await searchParams).brand as string || ""
  const model = (await searchParams).model as string || ""
  const year = (await searchParams).year as string || ""
  const priceRange = (await searchParams).price as string || ""
  
  // Filter mock cars based on search parameters
  let filteredCars = [...mockCars]
  
  if (search) {
    filteredCars = filteredCars.filter(car =>
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase()) ||
      car.description?.toLowerCase().includes(search.toLowerCase())
    )
  }
  
  if (brand) {
    filteredCars = filteredCars.filter(car =>
      car.brand.toLowerCase().includes(brand.toLowerCase())
    )
  }
  
  if (model) {
    filteredCars = filteredCars.filter(car =>
      car.model.toLowerCase().includes(model.toLowerCase())
    )
  }
  
  if (year) {
    filteredCars = filteredCars.filter(car =>
      car.year === parseInt(year)
    )
  }
  
  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number)
    if (min && max) {
      filteredCars = filteredCars.filter(car =>
        car.price >= min && car.price <= max
      )
    } else if (min) {
      filteredCars = filteredCars.filter(car =>
        car.price >= min
      )
    }
  }

  // Use filtered cars or all cars if no filters applied
  const cars = filteredCars.length > 0 ? filteredCars : mockCars
  
  // Use mock data for brands and years
  const brands = mockBrands
  const years = mockYears

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />
      <RainEffect />

      {/* Page Header */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Notre catalogue
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Découvrez notre vaste sélection de véhicules d'occasion de qualité
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Filtres
              </h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recherche
                </label>
                <Input
                  type="text"
                  placeholder="Marque, modèle, description..."
                  className="w-full"
                />
              </div>
              
              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marque
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Toutes les marques</option>
                  {brands?.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              {/* Year Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Année
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Toutes les années</option>
                  {years?.map((year: number) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plage de prix
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="">Tous les prix</option>
                  <option value="0-10000">0 - 10 000 €</option>
                  <option value="10000-20000">10 000 - 20 000 €</option>
                  <option value="20000-30000">20 000 - 30 000 €</option>
                  <option value="30000-50000">30 000 - 50 000 €</option>
                  <option value="50000-999999">50 000+ €</option>
                </select>
              </div>
              
              {/* Reset Filters */}
              <Button variant="outline" className="w-full">
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
          
          {/* Cars Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {cars && cars.length > 0 
                  ? `Trouvé ${cars.length} véhicule${cars.length > 1 ? 's' : ''}`
                  : "Aucun véhicule trouvé"
                }
              </p>
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Trier par:</span>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Plus récents</option>
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                  <option>Année (plus récents)</option>
                </select>
              </div>
            </div>
            
            {/* Cars Grid */}
            {cars && cars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0012 15c-2.34 0-4.29-1.009-5.291-2.291M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Aucun véhicule trouvé
                </h3>
                <p className="text-gray-500 mb-6">
                  Essayez de modifier vos filtres pour trouver ce que vous cherchez
                </p>
                <Button variant="outline">
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {cars && cars.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <span className="px-2">...</span>
                  <Button variant="outline" size="sm">10</Button>
                  <Button size="sm">Suivant</Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}