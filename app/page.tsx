"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Search, X, Wine, Calendar, Building2, Globe2, MapPin, Grape, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import debounce from "lodash/debounce"
import { Input } from "@/components/ui/input"
import SuggestedPicks from "@/components/SuggestedPicks"

const filterFadeIn = {
  "0%": { opacity: 0, transform: "translateY(20px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
}

// Mock wine data for demonstration
const wineData = [
  {
    id: 1,
    name: "Château Margaux 2015",
    type: "Red",
    region: "Bordeaux",
    price: 1200,
    grapeVariety: "Cabernet Sauvignon",
    image: "/mock-bottles/mock-bottle-001.png",
  },
  {
    id: 2,
    name: "Domaine de la Romanée-Conti 2018",
    type: "Red",
    region: "Burgundy",
    price: 20000,
    grapeVariety: "Pinot Noir",
    image: "/mock-bottles/mock-bottle-002.png",
  },
  {
    id: 3,
    name: "Screaming Eagle Cabernet Sauvignon 2019",
    type: "Red",
    region: "Napa Valley",
    price: 3500,
    grapeVariety: "Cabernet Sauvignon",
    image: "/mock-bottles/mock-bottle-003.png",
  },
  {
    id: 4,
    name: "Krug Clos d'Ambonnay 2002",
    type: "Champagne",
    region: "Champagne",
    price: 2500,
    grapeVariety: "Chardonnay",
    image: "/mock-bottles/mock-bottle-004.png",
  },
  {
    id: 5,
    name: "Penfolds Grange 2016",
    type: "Red",
    region: "South Australia",
    price: 800,
    grapeVariety: "Shiraz",
    image: "/mock-bottles/mock-bottle-005.png",
  },
]

const loadingPhrases = [
  "Uncorking bottles...",
  "Laying out glassware...",
  "Picking grapes...",
  "Dusting off vintage labels...",
  "Polishing decanters...",
]

export default function Page() {
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingPhrase, setLoadingPhrase] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  const filters = [
    { icon: <Wine className="h-4 w-4" />, label: "Wine Type" },
    { icon: <Calendar className="h-4 w-4" />, label: "Vintage" },
    { icon: <Building2 className="h-4 w-4" />, label: "Winery" },
    { icon: <Globe2 className="h-4 w-4" />, label: "Country" },
    { icon: <MapPin className="h-4 w-4" />, label: "Region" },
    { icon: <Grape className="h-4 w-4" />, label: "Grape Variety" },
    { icon: <DollarSign className="h-4 w-4" />, label: "Price Range" },
  ]

  const handleEscape = useCallback(() => {
    setIsSearchMode(false)
    setSearchQuery("")
    setSearchResults([])
  }, [])

  const handleSearchClick = () => {
    setIsAnimating(true)
    setIsSearchMode(true)
  }

  // Simulated search function
  const performSearch = (query) => {
    setIsLoading(true)
    setLoadingPhrase(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)])

    // Simulate API call
    setTimeout(() => {
      const results = wineData.filter(
        (wine) =>
          wine.name.toLowerCase().includes(query.toLowerCase()) ||
          wine.type.toLowerCase().includes(query.toLowerCase()) ||
          wine.region.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
      setIsLoading(false)
    }, 500) // Simulated delay
  }

  const debouncedSearch = useCallback(
    debounce((query) => performSearch(query), 300),
    [],
  )

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, debouncedSearch])

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 1800)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleEscape()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleEscape])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight

    setMousePosition({ x, y })
  }, [])

  const handleMouseLeave = () => {
    setMousePosition({ x: 0.5, y: 0.5 })
  }

  // Calculate rotation and glow based on mouse position
  const rotateX = mousePosition.y * 10 - 5 // -5 to 5 degrees
  const rotateY = mousePosition.x * 10 - 5 // -5 to 5 degrees
  const glowX = mousePosition.x * 100 + "%"
  const glowY = mousePosition.y * 100 + "%"

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient Background */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-84jd3ucYE1UpR9L7sGyNmNrvtZgthU.png"
        alt="Background gradient"
        fill
        className="object-cover"
        priority
      />

      {/* Full Screen Glow Effect */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out ${
          isSearchMode ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(42, 10, 10, 0.05) 0%, transparent 70%)`,
        }}
      />

      {/* Escape Button */}
      <button
        onClick={handleEscape}
        className={`fixed right-8 top-8 z-20 text-[#2A0A0A]/60 transition-all duration-700 ease-out hover:text-[#2A0A0A] font-inter
          ${isSearchMode ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
        `}
      >
        <span className="mr-2 text-sm font-light tracking-wider font-inter">CLOSE</span>
        <X className="inline-block h-4 w-4" />
        <span className="sr-only">Exit search</span>
      </button>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen md:grid md:grid-cols-[35%_65%]">
        {/* Left Column - Home Image / Suggested Picks / Search Results */}
        <div className="hidden md:flex flex-col items-center justify-center relative overflow-hidden md:pl-[15%]">
          {/* Home Image */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out 
              ${isSearchMode ? "opacity-0 pointer-events-none" : "opacity-100"}
            `}
          >
            <div
              className="relative w-[300px] h-[600px] transition-transform duration-300 ease-out mx-auto"
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mock-bottle-001-S5pop8LiRvhN88QAqwZH1tOKrtB8p4.png"
                alt="Wine bottle"
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Suggested Picks and Search Results */}
          <div
            className={`w-full h-full flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
              isSearchMode ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-full max-w-md">
              <SuggestedPicks wines={wineData} />
            </div>

            {/* Search Results */}
            <div className="w-full max-w-md mt-8 px-8 overflow-auto">
              {isLoading ? (
                <div className="text-[#2A0A0A] text-xl font-light font-inter">{loadingPhrase}</div>
              ) : searchResults.length > 0 ? (
                <div className="w-full space-y-4">
                  {searchResults.map((wine) => (
                    <div key={wine.id} className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-[#2A0A0A]">
                      <h3 className="font-semibold">{wine.name}</h3>
                      <p className="text-sm">
                        {wine.type} | {wine.region}
                      </p>
                      <p className="text-sm font-light">${wine.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                searchQuery && (
                  <div className="text-[#2A0A0A] text-xl font-light font-inter">
                    No matches, but there's always more in the cellar!
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="relative flex min-h-screen items-center justify-center px-8 md:pl-12 md:pr-[11.375%] lg:pl-16">
          {/* Logo and Content */}
          <div
            className={`transition-all duration-700 ease-out
              ${isSearchMode ? "opacity-0 invisible absolute" : "opacity-100 visible"}
            `}
          >
            <h1 className="text-heading-lg font-sans text-[#2A0A0A] leading-none">Liberty</h1>
            <h2 className="font-serif italic text-subheading text-[#2A0A0A]/80 mt-2">Social Wine Club</h2>
            <p className="mt-6 font-sans text-body text-[#2A0A0A]/70 max-w-[400px]">
              You now have over 3,000 wines at your fingertips, each selected for their exceptionality. Browse if you're
              open to possibility, or search if you have some idea of what you're thirsting for.
            </p>

            {/* Horizontal Line */}
            <div className="mt-8 h-px w-full bg-[#2A0A0A]/20" />

            {/* Two-Column Button Layout */}
            <div className="mt-8 grid grid-cols-2">
              {/* Explore Column */}
              <Link
                href="/explore"
                className="group flex flex-col items-start text-left transition-all duration-300 hover:opacity-80 border-r border-[#2A0A0A]/20 pr-8"
              >
                <Wine className="h-12 w-12 mb-4 text-[#2A0A0A]" />
                <p className="font-serif italic text-lg text-[#2A0A0A]/80 mb-2">Open to possibility?</p>
                <p className="font-sans font-bold text-[#2A0A0A]">Explore our collection</p>
              </Link>

              {/* Search Column */}
              <button
                onClick={handleSearchClick}
                className="group flex flex-col items-start text-left transition-all duration-300 hover:opacity-80 pl-8"
              >
                <Search className="h-12 w-12 mb-4 text-[#2A0A0A]" />
                <p className="font-serif italic text-lg text-[#2A0A0A]/80 mb-2">Looking for something?</p>
                <p className="font-sans font-bold text-[#2A0A0A]">Search our inventory</p>
              </button>
            </div>
          </div>

          {/* Search Bar and Filters Container */}
          <div
            className={`max-w-md transition-all duration-700 ease-out
              ${isSearchMode ? "opacity-100 visible" : "opacity-0 invisible absolute"}
            `}
          >
            {/* Search Header */}
            <h1
              className={`text-heading font-sans text-[#2A0A0A] leading-none mb-8 transition-all duration-700 ease-out
                ${isSearchMode ? "opacity-100 visible font-inter" : "opacity-0 invisible h-0 mb-0"}
              `}
            >
              Search
            </h1>

            {/* Search Input (visible only in search mode) */}
            {isSearchMode && (
              <div className="relative mb-8">
                <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#2A0A0A]/60" />
                <Input
                  type="search"
                  placeholder="Search our collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-none border-t-0 border-x-0 border-b border-[#2A0A0A]/20 bg-transparent pl-8 pr-2 text-[#2A0A0A] outline-none 
                    placeholder:text-[#2A0A0A]/60 hover:border-[#2A0A0A]/40 focus:border-[#2A0A0A] focus:ring-0 focus-visible:ring-0 
                    focus-visible:ring-offset-0 text-lg font-inter"
                />
              </div>
            )}

            {/* Filters */}
            <div className={`space-y-4 ${isSearchMode ? "mt-8" : "mt-0"} transition-all duration-700 font-inter`}>
              {filters.map((filter, index) => (
                <div
                  key={filter.label}
                  className={`transition-all duration-500 ease-out ${
                    isSearchMode ? "animate-[filter-fade-in_0.5s_ease-out_forwards]" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    animationDelay: `${700 + index * 100}ms`,
                    animationKeyframes: filterFadeIn,
                  }}
                >
                  <button className="group flex w-full items-center gap-3 py-2 text-[#2A0A0A]/60 transition-colors hover:text-[#2A0A0A]">
                    {filter.icon}
                    <span className="text-sm font-light font-inter">{filter.label}</span>
                  </button>
                  {index < filters.length - 1 && <div className="mt-4 h-px w-full bg-[#2A0A0A]/10" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

