import { Navigation } from "@/components/navigation"
import { RainEffect } from "@/components/rain-effect"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params
  
  // Fetch blog post by slug
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!post || error) {
    notFound()
  }

  // Fetch related posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .neq("id", post.id)
    .eq("category", post.category)
    .limit(3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />
      <RainEffect />

      {/* Page Header */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/blog" className="hover:text-orange-600 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span>{post.category}</span>
            <span>/</span>
            <span>{post.title}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{formatDate(post.published_at || post.created_at)}</span>
            <span>•</span>
            <span>{Math.ceil(post.content.length / 200)} min de lecture</span>
            <span>•</span>
            <Badge>{post.category}</Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Content */}
            <article className="bg-white rounded-lg shadow-sm p-8 mb-8">
              {/* Featured Image */}
              <div className="h-64 md:h-96 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg mb-8 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">Image de l'article</span>
              </div>
              
              {/* Article Text */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
              
              {/* Tags */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Voitures d'occasion</Badge>
                  <Badge variant="secondary">Entretien</Badge>
                  <Badge variant="secondary">Achat</Badge>
                </div>
              </div>
              
              {/* Share Buttons */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Partager cet article</h3>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    Copier le lien
                  </Button>
                </div>
              </div>
            </article>
            
            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle>Commentaires (3)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Comment 1 */}
                  <div className="border-b pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">JD</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Jean Dupont</span>
                          <span className="text-sm text-gray-500">2 jours ago</span>
                        </div>
                        <p className="text-gray-700">
                          Article très intéressant et bien documenté ! Merci pour ces conseils précieux.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Comment 2 */}
                  <div className="border-b pb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">SM</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Sophie Martin</span>
                          <span className="text-sm text-gray-500">1 semaine ago</span>
                        </div>
                        <p className="text-gray-700">
                          J'ai suivi votre guide pour l'achat de ma voiture et je suis très satisfait du résultat. Recommandé !
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Comment 3 */}
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">PC</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Pierre Caron</span>
                          <span className="text-sm text-gray-500">2 semaines ago</span>
                        </div>
                        <p className="text-gray-700">
                          Très bon article sur l'entretien des véhicules. J'aimerais en savoir plus sur la maintenance préventive.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Add Comment Form */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-gray-900 mb-3">Ajouter un commentaire</h4>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Votre nom" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <textarea 
                      placeholder="Votre commentaire" 
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    ></textarea>
                    <Button>Publier le commentaire</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* About Author */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                À propos de l'auteur
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">AM</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Alex Martin</h4>
                  <p className="text-sm text-gray-500">Expert automobile</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Passionné d'automobile depuis plus de 15 ans, Alex partage son expertise et ses conseils pour aider les acheteurs à faire les meilleurs choix.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Voir tous les articles
              </Button>
            </div>
            
            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Articles similaires
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <div className="flex gap-3">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(relatedPost.published_at || relatedPost.created_at)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Newsletter */}
            <div className="bg-orange-50 p-6 rounded-lg shadow-sm mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Newsletter
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Recevez nos articles exclusifs directement dans votre boîte mail
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Button size="sm" className="w-full">
                  S'abonner
                </Button>
              </div>
            </div>
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