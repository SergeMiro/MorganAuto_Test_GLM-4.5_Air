"use client"

import { useEffect, useRef } from "react"

export function RainEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create triangles
    const createTriangle = () => {
      const triangle = document.createElement("div")
      triangle.className = "triangle"
      
      // Random position
      const left = Math.random() * 100
      triangle.style.left = `${left}%`
      
      // Random size
      const size = Math.random() * 15 + 5
      triangle.style.borderLeftWidth = `${size}px`
      triangle.style.borderRightWidth = `${size}px`
      triangle.style.borderBottomWidth = `${size * 2}px`
      
      // Random opacity
      const opacity = Math.random() * 0.3 + 0.1
      triangle.style.borderBottomColor = `rgba(255, 255, 255, ${opacity})`
      
      // Random animation duration
      const duration = Math.random() * 3 + 2
      triangle.style.animationDuration = `${duration}s`
      
      // Random delay
      const delay = Math.random() * 2
      triangle.style.animationDelay = `${delay}s`
      
      container.appendChild(triangle)
      
      // Remove triangle after animation
      setTimeout(() => {
        triangle.remove()
      }, (duration + delay) * 1000)
    }

    // Create initial triangles
    for (let i = 0; i < 20; i++) {
      setTimeout(createTriangle, i * 200)
    }

    // Continuously create new triangles
    const interval = setInterval(createTriangle, 500)

    // Clean up
    return () => {
      clearInterval(interval)
      container.innerHTML = ""
    }
  }, [])

  return <div ref={containerRef} className="rain-container" />
}