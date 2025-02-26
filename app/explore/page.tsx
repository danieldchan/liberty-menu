"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Wine, SlidersHorizontal, Bookmark } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { MainNav } from "@/components/nav/MainNav"
import { Button } from "@/components/ui/button"

// Mock collection items
const mockCollection = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name:
    i % 2 === 0
      ? "Domaine Aime Blouzard Bourgogne Rouge 2022"
      : ["Château Margaux 2015", "Opus One 2018", "Sassicaia 2017", "Penfolds Grange 2016"][i % 4],
  country: ["France", "United States", "Italy", "Australia"][i % 4],
  region: ["Bordeaux", "Napa Valley", "Tuscany", "South Australia"][i % 4],
  price: [64.0, 1200.0, 350.0, 700.0][i % 4],
  image: `/mock-bottles/mock-bottle-00${(i % 5) + 1}.png`,
}))

const ITEMS_PER_PAGE = 8

export default function ExplorePage() {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()
  const loadMoreRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleItems < mockCollection.length) {
          setVisibleItems((prevItems) => Math.min(prevItems + ITEMS_PER_PAGE, mockCollection.length))
        }
      },
      { threshold: 1.0 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [visibleItems])

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
            <Wine className="h-6 w-6 text-[#2A0A0A]" />
            <h1 className="font-serif italic text-3xl text-[#2A0A0A]">Our Collection</h1>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-[#2A0A0A]/60 hover:text-[#2A0A0A] transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </motion.div>

          {/* Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-px gap-y-10 border border-[#2A0A0A]/20"
          >
            <AnimatePresence>
              {mockCollection.slice(0, visibleItems).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="backdrop-blur-sm border border-[#2A0A0A]/20 -m-px grid grid-rows-[1fr_auto_auto_auto]"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square p-6 border-b border-[#2A0A0A]/20">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                  </div>

                  {/* Product Name */}
                  <h3 className="px-4 pt-4 pb-3 font-sans font-bold text-base text-[#2A0A0A] border-b border-[#2A0A0A]/20 line-clamp-2 h-[4.5rem]">
                    {item.name}
                  </h3>

                  {/* Details */}
                  <div className="grid grid-cols-3 px-4 py-3 border-b border-[#2A0A0A]/20 text-xs h-[3rem]">
                    <div className="font-sans text-[#2A0A0A] border-r border-[#2A0A0A]/20 pr-2 flex items-center">
                      {item.country}
                    </div>
                    <div className="font-sans text-[#2A0A0A] border-r border-[#2A0A0A]/20 px-2 flex items-center">
                      {item.region}
                    </div>
                    <div className="font-sans text-[#2A0A0A] pl-2 flex items-center">${item.price.toFixed(2)}</div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 border-t border-[#2A0A0A]/20">
                    <Button
                      variant="ghost"
                      className="p-3 rounded-none hover:bg-[#2A0A0A]/5 transition-colors font-sans font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Bookmark className="h-4 w-4" />
                      Shortlist
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => router.push(`/products/${item.id}`)}
                      className="p-3 rounded-none hover:bg-[#2A0A0A]/5 transition-colors font-sans font-medium text-sm border-l border-[#2A0A0A]/20"
                    >
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Trigger */}
          {visibleItems < mockCollection.length && <div ref={loadMoreRef} className="h-20" />}
        </motion.div>
      </div>
    </main>
  )
}

