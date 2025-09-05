import { NextRequest, NextResponse } from "next/server"
// import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const make = searchParams.get("make") || ""
    const model = searchParams.get("model") || ""
    const year = searchParams.get("year") || ""
    const minPrice = searchParams.get("minPrice") || ""
    const maxPrice = searchParams.get("maxPrice") || ""
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const offset = (page - 1) * limit

    // Build query
    // let query = supabase
    //   .from("cars")
    //   .select("*")
    //   .eq("available", true)
    //   .order("created_at", { ascending: false })
    //   .range(offset, offset + limit - 1)

    // Apply filters
    // if (search) {
    //   query = query.or(`make.ilike.%${search}%,model.ilike.%${search}%,description.ilike.%${search}%`)
    // }
    
    // if (make) {
    //   query = query.ilike("make", `%${make}%`)
    // }
    
    // if (model) {
    //   query = query.ilike("model", `%${model}%`)
    // }
    
    // if (year) {
    //   query = query.eq("year", parseInt(year))
    // }
    
    // if (minPrice) {
    //   query = query.gte("price", parseInt(minPrice))
    // }
    
    // if (maxPrice) {
    //   query = query.lte("price", parseInt(maxPrice))
    // }

    // Execute query
    // const { data, error, count } = await query

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 500 })
    // }

    // Mock data for development
    const data: any[] = []
    const count = 0

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    })
  } catch (err) {
    console.error("Error fetching cars:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = [
      "make", "model", "year", "price", "mileage", 
      "fuel_type", "transmission", "color", "description"
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Insert new car
    // const { data, error } = await supabase
    //   .from("cars")
    //   .insert([body])
    //   .select()
    //   .single()

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 500 })
    // }

    // Mock data for development
    const data = { ...body, id: Date.now().toString(), created_at: new Date().toISOString() }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error("Error creating car:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}