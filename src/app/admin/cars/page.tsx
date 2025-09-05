import { Navigation } from "@/components/navigation"
import { RainEffect } from "@/components/rain-effect"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default async function AdminCarsPage() {
  // Fetch all cars
  let cars: any[] = []
  const { data: carsData, error } = await supabase
    .from("cars")
    .select("*")

  // Handle mock client response
  if (error || !carsData) {
    // Return mock cars data for development
    cars = [
      {
        id: "1",
        brand: "Toyota",
        model: "Camry",
        year: 2020,
        mileage: 30000,
        price: 25000,
        fuel_type: "essence" as const,
        description: "Excellent état, faible kilométrage",
        image_url: "/placeholder-car.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        available: true,
        transmission: "Automatique",
        color: "Noir"
      },
      {
        id: "2",
        brand: "Honda",
        model: "Civic",
        year: 2019,
        mileage: 45000,
        price: 22000,
        fuel_type: "essence" as const,
        description: "Entretien à jour, très bon état",
        image_url: "/placeholder-car.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        available: false,
        transmission: "Manuelle",
        color: "Blanc"
      }
    ]
    // Sort mock cars by created_at date
    cars.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } else {
    cars = carsData
  }

  if (error) {
    console.error("Error fetching cars:", error)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />
      <RainEffect />

      {/* Admin Header */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Gestion des véhicules
              </h1>
              <p className="text-gray-600">
                Ajoutez, modifiez et gérez votre inventaire de véhicules
              </p>
            </div>
            <Link href="/admin/cars/new">
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter un véhicule
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total des véhicules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cars?.length || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {cars?.filter(car => car.available).length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Non disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {cars?.filter(car => !car.available).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recherche et filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input placeholder="Rechercher par marque, modèle..." />
              <Input placeholder="Année" type="number" />
              <Input placeholder="Prix maximum" type="number" />
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Tous les statuts</option>
                <option>Disponible</option>
                <option>Non disponible</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <Button>Appliquer les filtres</Button>
              <Button variant="outline">Réinitialiser</Button>
            </div>
          </CardContent>
        </Card>

        {/* Cars List */}
        <Card>
          <CardHeader>
            <CardTitle>Véhicules</CardTitle>
            <CardDescription>
              Liste complète de votre inventaire
            </CardDescription>
          </CardHeader>
          <CardContent>
            {cars && cars.length > 0 ? (
              <div className="space-y-4">
                {cars.map((car) => (
                  <div key={car.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {car.year} {car.make} {car.model}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {car.mileage.toLocaleString()} km • {car.fuel_type} • {car.transmission}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={car.available ? "default" : "secondary"}>
                            {car.available ? "Disponible" : "Non disponible"}
                          </Badge>
                          <Badge variant="outline">{car.color}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-orange-600">
                        {car.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                      </span>
                      <div className="flex gap-2">
                        <Link href={`/admin/cars/${car.id}/edit`}>
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Button>
                        <Button variant="outline" size="sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun véhicule trouvé
                </h3>
                <p className="text-gray-500 mb-6">
                  Commencez par ajouter votre premier véhicule à l'inventaire
                </p>
                <Link href="/admin/cars/new">
                  <Button>Ajouter un véhicule</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}