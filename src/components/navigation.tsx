"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[43px] border-b-primary transform transition-transform duration-600"></div>
            <div className="absolute top-0 -left-[25px] w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[43px] border-b-[#333] transform translate-z-[-10px]"></div>
            <div className="absolute top-0 -left-[25px] w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[43px] border-b-[#0d0d0d] transform rotate-x-90 translate-z-[21.5px]"></div>
          </div>
          <span className="text-xl font-bold text-primary tracking-wide">AutoRex</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/catalogue"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Catalogue
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/a-propos"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            À propos
          </Link>
          <Link
            href="/contacts"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Contacts
          </Link>
          <Link href="/admin">
            <Button variant="outline" size="sm">
              Admin
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/catalogue"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Catalogue
            </Link>
            <Link
              href="/blog"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/a-propos"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>
            <Link
              href="/contacts"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contacts
            </Link>
            <Link
              href="/admin"
              className="block py-2"
              onClick={() => setIsOpen(false)}
            >
              <Button variant="outline" size="sm" className="w-full">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}