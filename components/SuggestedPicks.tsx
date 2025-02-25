"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Wine {
  id: number
  name: string
  type: string
  region: string
  country: string
  price: number
  grapeVariety: string
  image: string
}

interface SuggestedPicksProps {
  wines: Wine[]
}

const SuggestedPicks: React.FC<SuggestedPicksProps> = ({ wines }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isEntering, setIsEntering] = useState(true)
  const router = useRouter()

  const currentWine = wines[currentIndex]

  const handlePrev = () => {
    setIsAnimating(true)
    setIsEntering(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : wines.length - 1))
      setIsEntering(true)
    }, 400)
  }

  const handleNext = () => {
    setIsAnimating(true)
    setIsEntering(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex < wines.length - 1 ? prevIndex + 1 : 0))
      setIsEntering(true)
    }, 400)
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  return (
    <div className="relative h-full w-full flex flex-col justify-between">
      <h2 className="font-serif italic text-2xl text-[#2A0A0A] mb-8">Suggested wines</h2>

      <div className="flex items-center">
        <button
          onClick={handlePrev}
          className="absolute left-0 text-[#2A0A0A]/60 hover:text-[#2A0A0A] transition-colors z-10"
          aria-label="Previous wine"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <div className="flex-1 flex flex-col items-center">
          <div
            className={`relative w-[220px] h-[350px] mb-8 transition-all duration-800 ease-in-out 
            ${isAnimating ? (isEntering ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8") : "opacity-100 translate-x-0"}`}
          >
            <Image
              src={currentWine.image || "/placeholder.svg"}
              alt={currentWine.name}
              fill
              className="object-contain"
            />
          </div>

          <div className="w-full space-y-6">
            <div
              className={`transition-all duration-500 ease-in-out
                ${isAnimating ? (isEntering ? "opacity-0 translate-x-4" : "opacity-0 -translate-x-4") : "opacity-100 translate-x-0"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <h3 className="text-xl font-semibold text-[#2A0A0A] mb-4">{currentWine.name}</h3>

              <div className="grid grid-cols-3 border border-[#2A0A0A]/20">
                <div className="p-4 border-r border-[#2A0A0A]/20">
                  <div className="font-serif italic text-sm text-[#2A0A0A]/60 mb-1">Country</div>
                  <div className="font-sans text-[#2A0A0A]">{currentWine.country}</div>
                </div>
                <div className="p-4 border-r border-[#2A0A0A]/20">
                  <div className="font-serif italic text-sm text-[#2A0A0A]/60 mb-1">Region</div>
                  <div className="font-sans text-[#2A0A0A]">{currentWine.region}</div>
                </div>
                <div className="p-4">
                  <div className="font-serif italic text-sm text-[#2A0A0A]/60 mb-1">Price</div>
                  <div className="font-sans text-[#2A0A0A]">${currentWine.price.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div
              className={`grid grid-cols-2 border border-[#2A0A0A]/20 transition-all duration-500 ease-in-out
                ${isAnimating ? (isEntering ? "opacity-0 translate-y-2" : "opacity-0 -translate-y-2") : "opacity-100 translate-y-0"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <Button
                onClick={() => router.push(`/products/${currentWine.id}`)}
                className="p-4 rounded-none bg-transparent text-[#2A0A0A] hover:bg-[#2A0A0A]/5 transition-colors font-sans font-medium border-r border-[#2A0A0A]/20"
              >
                View Details
              </Button>
              <Button
                onClick={() => {
                  // Implement "See Similar" functionality
                  console.log("See similar wines to:", currentWine.name)
                }}
                className="p-4 rounded-none bg-transparent text-[#2A0A0A] hover:bg-[#2A0A0A]/5 transition-colors font-sans font-medium"
              >
                See Similar
              </Button>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 text-[#2A0A0A]/60 hover:text-[#2A0A0A] transition-colors z-10"
          aria-label="Next wine"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  )
}

export default SuggestedPicks

