import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Car {
  id: string
  brand: string
  model: string
  year: number
  mileage: number
  price: number
  fuel_type: 'essence' | 'diesel' | 'hybride' | 'electrique'
  description?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: 'conseils' | 'actualites' | 'entretien' | 'tests'
  image_url?: string
  published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'client' | 'admin'
  created_at: string
}