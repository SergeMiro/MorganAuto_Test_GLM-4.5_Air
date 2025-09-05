import { Navigation } from "@/components/navigation"
import { CarCard } from "@/components/car-card"
import { BlogPostCard } from "@/components/blog-post-card"
import { RainEffect } from "@/components/rain-effect"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Car, BlogPost } from "@/lib/supabase"
import Link from "next/link"

export default async function HomePage() {
  // Fetch featured cars
  let cars: Car[] = []
  const { data: carsData, error: carsError } = await supabase
    .from("cars")
    .select("*")

  // Handle mock client response
  if (carsError || !carsData) {
    // Return mock cars data for development
    cars = [
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  } else {
    cars = carsData.slice(0, 3)
  }

  // Fetch latest blog posts
  let posts: BlogPost[] = []
  const { data: postsData, error: postsError } = await supabase
    .from("blog_posts")
    .select("*")

  // Handle mock client response
  if (postsError || !postsData) {
    // Return mock blog posts data for development
    posts = [
      {
        id: "1",
        title: "Conseils pour l'achat d'une voiture d'occasion",
        slug: "conseils-achat-voiture-occasion",
        content: "<p>Voici quelques conseils utiles pour l'achat d'une voiture d'occasion...</p>",
        excerpt: "Découvrez nos meilleurs conseils pour faire le bon choix lors de l'achat d'un véhicule d'occasion.",
        category: "conseils",
        image_url: "/placeholder-blog.jpg",
        published: true,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "2",
        title: "Les tendances automobiles 2024",
        slug: "tendances-automobiles-2024",
        content: "<p>Retrouvez les dernières tendances du marché automobile...</p>",
        excerpt: "Un aperçu des dernières innovations et tendances dans l'industrie automobile.",
        category: "actualites",
        image_url: "/placeholder-blog.jpg",
        published: true,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "3",
        title: "Entretien hivernal : préparez votre véhicule",
        slug: "entretien-hivernal-vehicule",
        content: "<p>Comment bien préparer votre voiture pour l'hiver...</p>",
        excerpt: "Nos conseils pour assurer un bon entretien de votre véhicule pendant la saison hivernale.",
        category: "entretien",
        image_url: "/placeholder-blog.jpg",
        published: true,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  } else {
    // Filter published posts and sort by date
    posts = postsData
      .filter((post: BlogPost) => post.published)
      .sort((a: BlogPost, b: BlogPost) =>
        new Date(b.published_at || b.created_at).getTime() -
        new Date(a.published_at || a.created_at).getTime()
      )
      .slice(0, 3)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden">
        {/* 3D Rain Effect */}
        <RainEffect />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Véhicules fiables aux prix imbattables
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Trouvez la voiture parfaite adaptée à vos besoins
            </p>
            <Link href="/catalogue">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Voir le catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos véhicules stars
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de voitures d'occasion soigneusement choisies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars && cars.length > 0 ? (
              cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              // Placeholder cards if no data
              <>
                <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Voiture 1</span>
                </div>
                <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Voiture 2</span>
                </div>
                <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Voiture 3</span>
                </div>
              </>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/catalogue">
              <Button variant="outline" size="lg">
                Voir tous les véhicules
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              L'excellence au service de votre satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Garantie qualité
              </h3>
              <p className="text-gray-600">
                Chaque véhicule subit une vérification approfondie
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Prix compétitifs
              </h3>
              <p className="text-gray-600">
                Approvisionnement direct sans intermédiaires
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Support 24/7
              </h3>
              <p className="text-gray-600">
                Assistance à toutes les étapes de l'achat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blog automobile
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Toutes les actualités et conseils pour les passionnés d'automobile
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))
            ) : (
              // Placeholder cards if no data
              <>
                <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Article 1</span>
                </div>
                <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Article 2</span>
                </div>
                <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Article 3</span>
                </div>
              </>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                Voir tous les articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à trouver votre voiture ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-orange-100">
            Parcourez notre catalogue et trouvez le véhicule parfait pour vous
          </p>
          <Link href="/catalogue">
            <Button size="lg" variant="secondary">
              Commencer la recherche
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">AutoRex</h3>
              <p className="text-gray-400">
                Votre partenaire de confiance dans le monde automobile
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacts</h4>
              <p className="text-gray-400 mb-2">Téléphone: +33 1 23 45 67 89</p>
              <p className="text-gray-400 mb-2">Email: info@autorex.fr</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Adresse</h4>
              <p className="text-gray-400">
                75 Paris Cedex 16, France
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; 2024 AutoRex. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}