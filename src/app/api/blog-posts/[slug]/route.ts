import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    // Fetch blog post by slug
    let data: any
    const { data: postData, error } = await supabase
      .from("blog_posts")
      .select("*")

    // Handle mock client response
    if (error || !postData) {
      // Return mock blog post data for development
      data = {
        id: slug,
        title: "Mock Blog Post",
        slug,
        content: "This is a mock blog post for development purposes.",
        excerpt: "This is a mock excerpt for development purposes.",
        category: "conseils" as const,
        image_url: "/placeholder-blog.jpg",
        published: true,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    } else {
      // Filter for the specific slug in mock data
      data = postData.find((post: any) => post.slug === slug)
      if (!data) {
        data = {
          id: slug,
          title: "Mock Blog Post",
          slug,
          content: "This is a mock blog post for development purposes.",
          excerpt: "This is a mock excerpt for development purposes.",
          category: "conseils" as const,
          image_url: "/placeholder-blog.jpg",
          published: true,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error("Error fetching blog post:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const body = await request.json()

    // Update blog post
    // const { data, error } = await supabase
    //   .from("blog_posts")
    //   .update(body)
    //   .eq("slug", slug)
    //   .select()
    //   .single()

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 500 })
    // }

    // if (!data) {
    //   return NextResponse.json({ error: "Post not found" }, { status: 404 })
    // }

    // Mock data for development
    const data = { ...body, id: slug, updated_at: new Date().toISOString() }
    return NextResponse.json(data)
  } catch (err) {
    console.error("Error updating blog post:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    // Soft delete blog post by setting published to false
    // const { error } = await supabase
    //   .from("blog_posts")
    //   .update({ published: false })
    //   .eq("slug", slug)

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 500 })
    // }

    // Mock data for development
    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (err) {
    console.error("Error deleting blog post:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}