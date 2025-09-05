import { Navigation } from "@/components/navigation"
import { RainEffect } from "@/components/rain-effect"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"

interface CarDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params
  
  // Fetch car by ID
  let car: any
  const { data: carData, error: carError } = await supabase
    .from("cars")
    .select("*")

  // Handle mock client response
  if (!carData || carError) {
    // Return mock car data for development
    car = {
      id,
      brand: "Mock Brand",
      model: "Mock Model",
      year: 2023,
      mileage: 10000,
      price: 30000,
      fuel_type: "essence" as const,
      description: "This is a mock car for development purposes.",
      image_url: "/placeholder-car.jpg",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Add additional fields used in the component
      transmission: "Automatique",
      color: "Noir",
      power: 150,
      fuel_consumption: 6.5,
      air_pollution_rating: "Crit'Air 2",
      crit_air_label: "2",
      ct_status: "OK",
      equipment: ["Climatisation", "GPS", "Bluetooth"],
      price_status: "Prix affiché",
      eco_malus: 0
    }
  } else {
    // Filter for the specific ID in mock data
    car = carData.find((c: any) => c.id === id)
    if (!car) {
      car = {
        id,
        brand: "Mock Brand",
        model: "Mock Model",
        year: 2023,
        mileage: 10000,
        price: 30000,
        fuel_type: "essence" as const,
        description: "This is a mock car for development purposes.",
        image_url: "/placeholder-car.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // Add additional fields used in the component
        transmission: "Automatique",
        color: "Noir",
        power: 150,
        fuel_consumption: 6.5,
        air_pollution_rating: "Crit'Air 2",
        crit_air_label: "2",
        ct_status: "OK",
        equipment: ["Climatisation", "GPS", "Bluetooth"],
        price_status: "Prix affiché",
        eco_malus: 0
      }
    }
  }

  // Fetch similar cars
  let similarCars: any[] = []
  const { data: similarCarsData } = await supabase
    .from("cars")
    .select("*")

  // Handle mock client response for similar cars
  if (!similarCarsData) {
    // Return mock similar cars data for development
    similarCars = [
      {
        id: "similar-1",
        brand: "Mock Brand",
        model: "Similar Model 1",
        year: 2022,
        mileage: 15000,
        price: 28000,
        fuel_type: "essence" as const,
        image_url: "/placeholder-car.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "similar-2",
        brand: "Mock Brand",
        model: "Similar Model 2",
        year: 2023,
        mileage: 8000,
        price: 32000,
        fuel_type: "diesel" as const,
        image_url: "/placeholder-car.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  } else {
    // Filter similar cars in mock data
    similarCars = similarCarsData.filter((c: any) =>
      c.available &&
      c.id !== car.id &&
      c.brand === car.brand
    ).slice(0, 3)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />
      <RainEffect />

      {/* Page Header */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/catalogue" className="hover:text-orange-600 transition-colors">
              Catalogue
            </Link>
            <span>/</span>
            <span>{car.make}</span>
            <span>/</span>
            <span>{car.model}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {car.year} {car.make} {car.model}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="outline">{car.fuel_type}</Badge>
            <Badge variant="outline">{car.transmission}</Badge>
            <Badge variant="outline">{car.mileage.toLocaleString()} km</Badge>
            <Badge variant="outline">{car.color}</Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Car Images Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="aspect-video bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">Images du véhicule</span>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-r from-gray-200 to-gray-300 rounded cursor-pointer hover:opacity-80 transition-opacity"></div>
                ))}
              </div>
            </div>
            
            {/* Car Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails du véhicule</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Informations générales</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Année</span>
                      <span className="font-medium">{car.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kilométrage</span>
                      <span className="font-medium">{car.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carburant</span>
                      <span className="font-medium">{car.fuel_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Boîte de vitesse</span>
                      <span className="font-medium">{car.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Couleur</span>
                      <span className="font-medium">{car.color}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Caractéristiques</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Puissance</span>
                      <span className="font-medium">{car.power} ch</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consommation</span>
                      <span className="font-medium">{car.fuel_consumption} L/100km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Crit'Air</span>
                      <span className="font-medium">{car.air_pollution_rating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vignette Crit'Air</span>
                      <span className="font-medium">{car.crit_air_label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contrôle Technique</span>
                      <span className="font-medium">{car.ct_status}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {car.description}
                </p>
              </div>
              
              {/* Equipment */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Équipements</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.equipment?.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Contactez-nous</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Intéressé par ce véhicule ? Contactez-nous pour plus d'informations ou pour organiser une visite.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Appelez-nous
                  </Button>
                  <Button variant="outline">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Envoyer un message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-sm p-6 text-white mb-6 sticky top-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xl font-light">Prix</span>
                <Badge variant="secondary" className="bg-white text-orange-600">
                  {car.price_status}
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-4">
                {car.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Prix TTC</span>
                  <span>{car.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de dossier</span>
                  <span>150 €</span>
                </div>
                <div className="flex justify-between">
                  <span>Éco-malus</span>
                  <span>{car.eco_malus > 0 ? car.eco_malus.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '0 €'}</span>
                </div>
                <div className="pt-3 border-t border-orange-400">
                  <div className="flex justify-between font-medium">
                    <span>Prix final</span>
                    <span>{(car.price + 150 + car.eco_malus).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Button size="lg" className="w-full bg-white text-orange-600 hover:bg-gray-100">
                  Demander un essai
                </Button>
                <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white hover:text-orange-600">
                  Financer ce véhicule
                </Button>
              </div>
            </div>
            
            {/* Contact Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Adresse</h4>
                      <p className="text-gray-600 text-sm">75 Paris Cedex 16, France</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Téléphone</h4>
                      <p className="text-gray-600 text-sm">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <p className="text-gray-600 text-sm">contact@autorex.fr</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Similar Cars */}
            {similarCars && similarCars.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Véhicules similaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {similarCars.map((similarCar) => (
                      <Link key={similarCar.id} href={`/cars/${similarCar.id}`}>
                        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {similarCar.year} {similarCar.make} {similarCar.model}
                            </h4>
                            <p className="text-sm text-gray-500 mb-1">
                              {similarCar.mileage.toLocaleString()} km
                            </p>
                            <p className="text-orange-600 font-medium">
                              {similarCar.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}