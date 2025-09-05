import { createClient } from '@supabase/supabase-js'

// Check if Supabase environment variables are valid
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a mock client if environment variables are invalid
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'disabled' && supabaseAnonKey !== 'disabled')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Mock Supabase client methods
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        eq: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
        ilike: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
        or: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
        order: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
        gte: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
        lte: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null })
      }),
      auth: {
        signUp: () => Promise.resolve({ data: null, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        getUser: () => Promise.resolve({ data: null, error: null })
      }
    }

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