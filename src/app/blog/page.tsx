import { Navigation } from "@/components/navigation"
import { BlogPostCard } from "@/components/blog-post-card"
import { RainEffect } from "@/components/rain-effect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { BlogPost } from "@/lib/supabase"
import Link from "next/link"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get search parameters
  const search = searchParams.search as string || ""
  const category = searchParams.category as string || ""
  
  // Build Supabase query
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })

  // Apply filters
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,summary.ilike.%${search}%`)
  }
  
  if (category) {
    query = query.eq("category", category)
  }
  
  // Execute query
  const { data: posts, error } = await query

  // Get unique categories
  const { data: allPosts } = await supabase
    .from("blog_posts")
    .select("category")
    .eq("published", true)

  const categories = Array.from(new Set(allPosts?.map(post => post.category).filter(Boolean)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />
      <RainEffect />

      {/* Page Header */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Blog automobile
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Découvrez nos articles, conseils et actualités sur l'automobile
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Rechercher
              </h2>
              
              {/* Search */}
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Rechercher un article..."
                  className="w-full"
                />
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Catégories
                </h3>
                <div className="space-y-2">
                  <Link href="/blog" className="block">
                    <Badge variant="outline" className="w-full justify-start">
                      Tous les articles
                    </Badge>
                  </Link>
                  {categories?.map((cat) => (
                    <Link key={cat} href={`/blog?category=${cat}`}>
                      <Badge variant="outline" className="w-full justify-start">
                        {cat}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Popular Tags */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Tags populaires
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Voitures d'occasion</Badge>
                  <Badge variant="secondary">Entretien</Badge>
                  <Badge variant="secondary">Achat</Badge>
                  <Badge variant="secondary">Sécurité</Badge>
                  <Badge variant="secondary">Technologie</Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blog Posts */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            {posts && posts.length > 0 && (
              <div className="mb-12 bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/3">
                    <div className="h-64 md:h-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">Article vedette</span>
                    </div>
                  </div>
                  <div className="md:w-1/3 p-8">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="mr-4">{formatDate(posts[0].published_at || posts[0].created_at)}</span>
                      <span>8 min de lecture</span>
                    </div>
                    <Badge className="mb-3 bg-blue-500">Actualités</Badge>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {posts[0].title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {posts[0].summary}
                    </p>
                    <Link href={`/blog/${posts[0].slug}`}>
                      <Button size="sm">Lire l'article</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Posts Grid */}
            <div className="space-y-8">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="bg-white rounded-lg p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Aucun article trouvé
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Essayez de modifier vos critères de recherche
                  </p>
                  <Button variant="outline">
                    Réinitialiser la recherche
                  </Button>
                </div>
              )}
            </div>
            
            {/* Newsletter */}
            {posts && posts.length > 0 && (
              <div className="mt-16 bg-orange-50 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Abonnez-vous à notre newsletter
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Recevez les dernières actualités automobile et nos conseils exclusifs directement dans votre boîte mail
                </p>
                <div className="max-w-md mx-auto flex gap-2">
                  <Input placeholder="Votre adresse email" className="flex-1" />
                  <Button>S'abonner</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}