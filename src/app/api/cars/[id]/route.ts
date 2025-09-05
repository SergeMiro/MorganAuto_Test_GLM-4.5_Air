import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Fetch car by ID
    let data: any
    const { data: carData, error } = await supabase
      .from("cars")
      .select("*")

    // Handle mock client response
    if (error || !carData) {
      // Return mock car data for development
      data = {
        id,
        brand: "Mock Brand",
        model: "Mock Model",
        year: 2023,
        mileage: 10000,
        price: 30000,
        fuel_type: "essence" as const,
        description: "This is a mock car for development purposes",
        image_url: "/placeholder-car.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    } else {
      // Filter for the specific ID in mock data
      data = carData.find((car: any) => car.id === id)
      if (!data) {
        data = {
          id,
          brand: "Mock Brand",
          model: "Mock Model",
          year: 2023,
          mileage: 10000,
          price: 30000,
          fuel_type: "essence" as const,
          description: "This is a mock car for development purposes",
          image_url: "/placeholder-car.jpg",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error("Error fetching car:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()

    // Update car
    // const { data, error } = await supabase
    //   .from("cars")
    //   .update(body)
    //   .eq("id", id)
    //   .select()
    //   .single()

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 500 })
    // }

    // if (!data) {
    //   return NextResponse.json({ error: "Car not found" }, { status: 404 })
    // }

    // Mock data for development
    const data = { ...body, id, updated_at: new Date().toISOString() }
    return NextResponse.json(data)
  } catch (err) {
    console.error("Error updating car:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Soft delete car by setting available to false
    // const { error } = await supabase
    //   .from("cars")
    //   .update({ available: false })
    //   .eq("id", id)

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 500 })
    // }

    // Mock data for development
    return NextResponse.json({ message: "Car deleted successfully" })
  } catch (err) {
    console.error("Error deleting car:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}