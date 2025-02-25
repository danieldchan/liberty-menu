"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import {
  Search,
  X,
  Wine,
  ScrollText,
  MoveDown,
  Calendar,
  Building2,
  Globe2,
  MapPin,
  Grape,
  DollarSign,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import debounce from "lodash/debounce"
import { Input } from "@/components/ui/input"
import SuggestedPicks from "@/components/SuggestedPicks"
import InConversation from "@/components/zine/InConversation"
import Charts from "@/components/zine/Charts"
import PourAndPlay from "@/components/zine/PourAndPlay"
import GoodReads from "@/components/zine/GoodReads"
import Wine101 from "@/components/zine/Wine101"
import UpcomingEvents from "@/components/zine/UpcomingEvents"
import { MainNav } from "@/components/nav/MainNav"

// Mock wine data for demonstration
const wineData = [
  {
    id: 1,
    name: "Château Margaux 2015",
    type: "Red",
    region: "Bordeaux",
    country: "France",
    price: 1200,
    grapeVariety: "Cabernet Sauvignon",
    image: "/mock-bottles/mock-bottle-001.png",
  },
  {
    id: 2,
    name: "Domaine de la Romanée-Conti 2018",
    type: "Red",
    region: "Burgundy",
    country: "France",
    price: 20000,
    grapeVariety: "Pinot Noir",
    image: "/mock-bottles/mock-bottle-002.png",
  },
  {
    id: 3,
    name: "Screaming Eagle Cabernet Sauvignon 2019",
    type: "Red",
    region: "Napa Valley",
    country: "United States",
    price: 3500,
    grapeVariety: "Cabernet Sauvignon",
    image: "/mock-bottles/mock-bottle-003.png",
  },
  {
    id: 4,
    name: "Krug Clos d'Ambonnay 2002",
    type: "Champagne",
    region: "Champagne",
    country: "France",
    price: 2500,
    grapeVariety: "Chardonnay",
    image: "/mock-bottles/mock-bottle-004.png",
  },
  {
    id: 5,
    name: "Penfolds Grange 2016",
    type: "Red",
    region: "South Australia",
    country: "Australia",
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

const filterFadeIn = {
  "0%": {
    opacity: 0,
    transform: "translateY(4px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
}

const SearchOverlay: React.FC<{
  isOpen: boolean
  onClose: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: any[]
  isLoading: boolean
  loadingPhrase: string
}> = ({ isOpen, onClose, searchQuery, setSearchQuery, searchResults, isLoading, loadingPhrase }) => {
  const filters = [
    { icon: <Wine className="h-4 w-4" />, label: "Wine Type" },
    { icon: <Calendar className="h-4 w-4" />, label: "Vintage" },
    { icon: <Building2 className="h-4 w-4" />, label: "Producer" },
    { icon: <Globe2 className="h-4 w-4" />, label: "Country" },
    { icon: <MapPin className="h-4 w-4" />, label: "Region" },
    { icon: <Grape className="h-4 w-4" />, label: "Grape Variety" },
    { icon: <DollarSign className="h-4 w-4" />, label: "Price Range" },
  ]

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-84jd3ucYE1UpR9L7sGyNmNrvtZgthU.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="text-[#2A0A0A]/60 transition-all duration-300 hover:text-[#2A0A0A] font-inter"
          >
            <span className="mr-2 text-sm font-light tracking-wider font-inter">Close</span>
            <X className="inline-block h-4 w-4" />
            <span className="sr-only">Exit search</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="relative mb-8">
              <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#2A0A0A]/60" />
              <Input
                type="search"
                placeholder="Search our collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-none border border-[#2A0A0A]/20 bg-transparent pl-8 pr-2 text-[#2A0A0A] outline-none 
                  placeholder:text-[#2A0A0A]/60 hover:border-[#2A0A0A]/40 focus:border-[#2A0A0A] focus:ring-0 focus-visible:ring-0 
                  focus-visible:ring-offset-0 text-lg"
              />
            </div>

            <div className="space-y-px">
              {filters.map((filter, index) => (
                <button
                  key={filter.label}
                  className="w-full flex items-center justify-between p-4 border border-[#2A0A0A]/20 text-[#2A0A0A]/60 
                    hover:text-[#2A0A0A] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {filter.icon}
                    <span className="font-serif italic">{filter.label}</span>
                  </div>
                  <span className="text-lg group-hover:rotate-45 transition-transform duration-200">+</span>
                </button>
              ))}
            </div>

            {searchResults.length > 0 && (
              <div className="mt-8 space-y-4">
                {searchResults.map((wine) => (
                  <div key={wine.id} className="border border-[#2A0A0A]/20 p-4">
                    <h3 className="font-semibold">{wine.name}</h3>
                    <p className="text-sm text-[#2A0A0A]/70">
                      {wine.type} | {wine.region}
                    </p>
                    <p className="text-sm font-light">${wine.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="mt-8 text-[#2A0A0A] text-xl font-light font-serif italic">{loadingPhrase}</div>
            )}

            {searchQuery && !isLoading && searchResults.length === 0 && (
              <div className="mt-8 text-[#2A0A0A] text-xl font-light font-serif italic">
                No matches, but there's always more in the cellar!
              </div>
            )}
          </div>

          <div>
            <SuggestedPicks wines={wineData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingPhrase, setLoadingPhrase] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isNavVisible, setIsNavVisible] = useState(false)

  const zineRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback(() => {
    setIsSearchMode(false)
    setSearchQuery("")
    setSearchResults([])
  }, [])

  const handleSearchClick = () => {
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

  const scrollToZine = () => {
    zineRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (zineRef.current && homeRef.current) {
        const zineTop = zineRef.current.getBoundingClientRect().top
        const homeBottom = homeRef.current.getBoundingClientRect().bottom
        setIsNavVisible(zineTop <= 0 && homeBottom < 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleHomeClick = () => {
    homeRef.current?.scrollIntoView({ behavior: "smooth" })
    setIsNavVisible(false)
  }

  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden snap-y snap-mandatory"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <MainNav onSearchClick={handleSearchClick} isVisible={isNavVisible} />

      <SearchOverlay
        isOpen={isSearchMode}
        onClose={handleEscape}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        isLoading={isLoading}
        loadingPhrase={loadingPhrase}
      />

      {/* Fixed Background */}
      <div className="fixed inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-84jd3ucYE1UpR9L7sGyNmNrvtZgthU.png"
          alt="Background gradient"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Full Screen Glow Effect */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-700 ease-in-out opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(42, 10, 10, 0.05) 0%, transparent 70%)`,
        }}
      />

      {/* Hero Section */}
      <section ref={homeRef} id="home" className="relative z-10 min-h-screen snap-start">
        <div className="relative min-h-screen md:grid md:grid-cols-2">
          {/* Left Column - Home Image */}
          <div className="hidden md:block relative overflow-hidden">
            {/* Home Image */}
            <div className="absolute inset-0">
              <div
                className="relative w-full h-full transition-transform duration-300 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
              >
                <Image
                  src="https://cdn.midjourney.com/97c96361-e426-4657-9a07-f0a6515878df/0_1.png"
                  alt="Wine bottles"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="relative flex min-h-screen items-end justify-center px-16">
            {/* Logo and Content */}
            <div className="w-full max-w-2xl transition-all duration-700 ease-out pb-16 opacity-100 visible">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-heading-lg font-sans text-[#2A0A0A] leading-none">Monument</h1>
                <h2 className="font-serif italic text-subheading text-[#2A0A0A]/80 mt-2">Social Wine Club</h2>
              </div>

              {/* Content Grid */}
              <div className="grid gap-px border border-[#2A0A0A]/20">
                {/* Body Copy */}
                <div className="backdrop-blur-sm p-8">
                  <p className="font-sans text-body text-[#2A0A0A]/70">
                    You now have over 3,000 wines at your fingertips, each selected for their exceptionality. Browse if
                    you're open to possibility, or search if you have some idea of what you're thirsting for.
                  </p>
                </div>

                {/* Search and Explore Row */}
                <div className="grid grid-cols-2 border-t border-[#2A0A0A]/20">
                  {/* Search Section */}
                  <button
                    onClick={handleSearchClick}
                    className="backdrop-blur-sm p-8 text-left transition-all duration-300 hover:bg-[#2A0A0A]/5 border-r border-[#2A0A0A]/20"
                  >
                    <Search className="h-12 w-12 mb-4 text-[#2A0A0A]" />
                    <p className="font-serif italic text-lg text-[#2A0A0A]/80 mb-2">Looking for something?</p>
                    <p className="font-sans font-bold text-[#2A0A0A]">Search our inventory</p>
                  </button>

                  {/* Explore Section */}
                  <Link
                    href="/explore"
                    className="backdrop-blur-sm p-8 text-left transition-all duration-300 hover:bg-[#2A0A0A]/5"
                  >
                    <Wine className="h-12 w-12 mb-4 text-[#2A0A0A]" />
                    <p className="font-serif italic text-lg text-[#2A0A0A]/80 mb-2">Open to possibility?</p>
                    <p className="font-sans font-bold text-[#2A0A0A]">Explore our collection</p>
                  </Link>
                </div>

                {/* Content Section */}
                <div className="backdrop-blur-sm p-8 border-t border-[#2A0A0A]/20">
                  <ScrollText className="h-12 w-12 mb-4 text-[#2A0A0A]" />
                  <p className="font-serif italic text-lg text-[#2A0A0A]/80 mb-2">Or just killing time?</p>
                  <button
                    onClick={scrollToZine}
                    className="flex items-center gap-2 font-sans font-bold text-[#2A0A0A] hover:text-[#2A0A0A]/60 transition-colors"
                  >
                    <MoveDown className="h-5 w-5" />
                    <span>Scroll on down</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zine Section */}
      <section
        ref={zineRef}
        id="zine"
        className="relative z-10 min-h-screen snap-start px-8 md:px-12 lg:px-16 py-16 space-y-8"
      >
        <InConversation />
        <Charts />
        <PourAndPlay />
        <GoodReads />
        <Wine101 />
        <UpcomingEvents />
      </section>
    </main>
  )
}

