"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const categoryColors = {
    conseils: "bg-blue-100 text-blue-800",
    actualites: "bg-purple-100 text-purple-800",
    entretien: "bg-green-100 text-green-800",
    tests: "bg-yellow-100 text-yellow-800",
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 bg-gradient-to-r from-orange-500 to-orange-600">
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-white text-3xl font-bold">Blog</span>
          </div>
        )}
        <Badge className={`absolute top-2 right-2 ${categoryColors[post.category]}`}>
          {post.category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="mr-4">{formatDate(post.published_at || post.created_at)}</span>
          <span>5 min de lecture</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link href={`/blog/${post.slug}`} className="block">
          <button className="text-orange-600 font-medium hover:underline flex items-center">
            Lire la suite →
          </button>
        </Link>
      </CardContent>
    </Card>
  )
}