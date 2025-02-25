"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Bookmark, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { MainNav } from "@/components/nav/MainNav"
import { Button } from "@/components/ui/button"

// Mock shortlisted items
const mockShortlist = [
  {
    id: 1,
    name: "Domaine Aime Blouzard Bourgogne Rouge 2022",
    country: "France",
    region: "Bordeaux",
    price: 64.0,
    image: "/mock-bottles/mock-bottle-001.png",
  },
  {
    id: 2,
    name: "Domaine Aime Blouzard Bourgogne Rouge 2022",
    country: "France",
    region: "Bordeaux",
    price: 64.0,
    image: "/mock-bottles/mock-bottle-002.png",
  },
  {
    id: 3,
    name: "Domaine Aime Blouzard Bourgogne Rouge 2022",
    country: "France",
    region: "Bordeaux",
    price: 64.0,
    image: "/mock-bottles/mock-bottle-003.png",
  },
  {
    id: 4,
    name: "Domaine Aime Blouzard Bourgogne Rouge 2022",
    country: "France",
    region: "Bordeaux",
    price: 64.0,
    image: "/mock-bottles/mock-bottle-004.png",
  },
  {
    id: 5,
    name: "Domaine Aime Blouzard Bourgogne Rouge 2022",
    country: "France",
    region: "Bordeaux",
    price: 64.0,
    image: "/mock-bottles/mock-bottle-005.png",
  },
  {
    id: 6,
    name: "Domaine Aime Blouzard Bourgogne Rouge 2022",
    country: "France",
    region: "Bordeaux",
    price: 64.0,
    image: "/mock-bottles/mock-bottle-001.png",
  },
  {
    id: 7,
    name: "Château Margaux 2015",
    country: "France",
    region: "Bordeaux",
    price: 1200.0,
    image: "/mock-bottles/mock-bottle-002.png",
  },
  {
    id: 8,
    name: "Opus One 2018",
    country: "United States",
    region: "Napa Valley",
    price: 350.0,
    image: "/mock-bottles/mock-bottle-003.png",
  },
  {
    id: 9,
    name: "Sassicaia 2017",
    country: "Italy",
    region: "Tuscany",
    price: 250.0,
    image: "/mock-bottles/mock-bottle-004.png",
  },
  {
    id: 10,
    name: "Penfolds Grange 2016",
    country: "Australia",
    region: "South Australia",
    price: 700.0,
    image: "/mock-bottles/mock-bottle-005.png",
  },
  {
    id: 11,
    name: "Vega Sicilia Unico 2011",
    country: "Spain",
    region: "Ribera del Duero",
    price: 450.0,
    image: "/mock-bottles/mock-bottle-001.png",
  },
]

const ITEMS_PER_PAGE = 6

export default function ShortlistPage() {
  const [shortlist, setShortlist] = useState(mockShortlist)
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()
  const loadMoreRef = useRef(null)

  const handleRemove = (id: number) => {
    setShortlist(shortlist.filter((item) => item.id !== id))
  }

  const handleClearAll = () => {
    setShortlist([])
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleItems < shortlist.length) {
          setVisibleItems((prevItems) => Math.min(prevItems + ITEMS_PER_PAGE, shortlist.length))
        }
      },
      { threshold: 1.0 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [visibleItems, shortlist.length])

  return (
    <main className="min-h-screen w-full">
      <div className="fixed inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-84jd3ucYE1UpR9L7sGyNmNrvtZgthU.png"
          alt="Background gradient"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative min-h-screen">
        <MainNav onSearchClick={() => setIsSearchOpen(true)} isVisible={true} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 pt-32"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border border-[#2A0A0A]/20 p-6 mb-8"
          >
            <Bookmark className="h-6 w-6 text-[#2A0A0A]" />
            <h1 className="font-serif italic text-3xl text-[#2A0A0A]">Your Shortlist</h1>
            {shortlist.length > 0 && (
              <Button
                variant="ghost"
                onClick={handleClearAll}
                className="flex items-center gap-2 text-[#2A0A0A]/60 hover:text-[#2A0A0A] transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Clear all</span>
              </Button>
            )}
          </motion.div>

          {/* Grid */}
          {shortlist.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-px border border-[#2A0A0A]/20"
            >
              <AnimatePresence>
                {shortlist.slice(0, visibleItems).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="backdrop-blur-sm border border-[#2A0A0A]/20 -m-px grid grid-rows-[1fr_auto_auto_auto]"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square p-8 border-b border-[#2A0A0A]/20">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                    </div>

                    {/* Product Name */}
                    <h3 className="px-6 pt-6 pb-4 font-sans font-medium text-lg text-[#2A0A0A] border-b border-[#2A0A0A]/20">
                      {item.name}
                    </h3>

                    {/* Details */}
                    <div className="grid grid-cols-3 px-6 py-4 border-b border-[#2A0A0A]/20">
                      <div className="font-sans text-[#2A0A0A] border-r border-[#2A0A0A]/20 pr-4">{item.country}</div>
                      <div className="font-sans text-[#2A0A0A] border-r border-[#2A0A0A]/20 px-4">{item.region}</div>
                      <div className="font-sans text-[#2A0A0A] text-right pl-4">${item.price.toFixed(2)}</div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 border-t border-[#2A0A0A]/20">
                      <Button
                        variant="ghost"
                        onClick={() => handleRemove(item.id)}
                        className="p-4 rounded-none hover:bg-[#2A0A0A]/5 transition-colors font-sans font-medium flex items-center justify-center gap-2"
                      >
                        <Bookmark className="h-4 w-4" />
                        Remove
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => router.push(`/products/${item.id}`)}
                        className="p-4 rounded-none hover:bg-[#2A0A0A]/5 transition-colors font-sans font-medium border-l border-[#2A0A0A]/20"
                      >
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center py-16"
            >
              <p className="text-[#2A0A0A]/60 font-serif italic text-lg">Your shortlist is empty</p>
            </motion.div>
          )}

          {/* Load More Trigger */}
          {visibleItems < shortlist.length && <div ref={loadMoreRef} className="h-20" />}
        </motion.div>
      </div>
    </main>
  )
}

