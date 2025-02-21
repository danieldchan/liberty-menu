"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Wine {
  id: number
  name: string
  type: string
  region: string
  price: number
  grapeVariety: string
  image: string
}

interface SuggestedPicksProps {
  wines: Wine[]
  onSeeMoreLikeThis: (wine: Wine) => void
}

const SuggestedPicks: React.FC<SuggestedPicksProps> = ({ wines, onSeeMoreLikeThis }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isEntering, setIsEntering] = useState(true)

  const currentWine = wines[currentIndex]

  const handlePrev = () => {
    setIsAnimating(true)
    setIsEntering(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : wines.length - 1))
      setIsEntering(true)
    }, 400) // Increased delay for smoother transition
  }

  const handleNext = () => {
    setIsAnimating(true)
    setIsEntering(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex < wines.length - 1 ? prevIndex + 1 : 0))
      setIsEntering(true)
    }, 400) // Increased delay for smoother transition
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 800) // Increased duration for smoother animation
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  return (
    <div className="relative h-full w-full flex flex-col justify-between py-8 px-8">
      <button
        onClick={handlePrev}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 text-[#2A0A0A]/60 hover:text-[#2A0A0A] transition-colors z-10"
        aria-label="Previous wine"
      >
        <ChevronUp className="h-8 w-8" />
      </button>

      <div className="flex flex-col items-center justify-center flex-grow py-12">
        <div
          className={`relative w-[220px] h-[350px] mb-6 transition-all duration-800 ease-in-out 
          ${isAnimating ? (isEntering ? "opacity-0 scale-110" : "opacity-0 scale-90") : "opacity-100 scale-100"}`}
        >
          <Image src={currentWine.image || "/placeholder.svg"} alt={currentWine.name} fill className="object-contain" />
        </div>

        <div className="text-center space-y-2 mb-6">
          {["name", "details", "price", "button"].map((item, index) => {
            const delay = 100 + index * 100
            const content = (() => {
              switch (item) {
                case "name":
                  return <h3 className="text-xl font-semibold text-[#2A0A0A]">{currentWine.name}</h3>
                case "details":
                  return (
                    <p className="text-sm text-[#2A0A0A]/80">
                      {currentWine.grapeVariety} | {currentWine.region}
                    </p>
                  )
                case "price":
                  return <p className="text-lg font-light text-[#2A0A0A]">${currentWine.price.toLocaleString()}</p>
                case "button":
                  return (
                    <Button
                      onClick={() => onSeeMoreLikeThis(currentWine)}
                      className="bg-[#2A0A0A]/10 text-[#2A0A0A] hover:bg-[#2A0A0A]/20 mt-4"
                    >
                      See More Like This
                    </Button>
                  )
              }
            })()

            return (
              <div
                key={item}
                className={`transition-all duration-500 ease-in-out
                  ${
                    isAnimating
                      ? isEntering
                        ? "opacity-0 translate-y-2"
                        : "opacity-0 scale-98"
                      : "opacity-100 translate-y-0 scale-100"
                  }`}
                style={{
                  transitionDelay: `${isEntering ? delay : 400 - delay}ms`,
                  transform: isAnimating && !isEntering ? `scale(${0.98 + index * 0.005})` : "scale(1)",
                }}
              >
                {content}
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#2A0A0A]/60 hover:text-[#2A0A0A] transition-colors z-10"
        aria-label="Next wine"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </div>
  )
}

export default SuggestedPicks

