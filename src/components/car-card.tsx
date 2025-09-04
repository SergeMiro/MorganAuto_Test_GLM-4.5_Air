"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 bg-gradient-to-r from-orange-500 to-orange-600">
        {car.image_url ? (
          <Image
            src={car.image_url}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-white text-lg font-bold">
              {car.brand.charAt(0)}
            </span>
          </div>
        )}
        <Badge className="absolute top-2 right-2 bg-white/90 text-orange-600">
          {car.fuel_type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-gray-500">
              {car.year} • {car.mileage.toLocaleString()} km
            </p>
          </div>
          <p className="text-lg font-bold text-orange-600">
            {formatPrice(car.price)}
          </p>
        </div>
        <Link href={`/voitures/${car.id}`} className="block">
          <button className="w-full mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-300">
            Voir les détails
          </button>
        </Link>
      </CardContent>
    </Card>
  )
}