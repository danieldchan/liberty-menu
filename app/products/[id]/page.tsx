"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bookmark, ChevronDown, ChevronUp, Wine, GlassWater } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"

// Mock product data
const product = {
  id: "1",
  name: "Domaine Aime Blouzard Bourgogne Rouge 2022",
  description:
    "A refined and expressive Bordeaux layered with dark berries, cedar, and a hint of vanilla. This wine embodies the finesse of Margaux, offering a complex bouquet, silky tannins, and a lingering finish. Its harmonious blend of fruit and oak makes it ideal for both aging and immediate enjoyment.",
  winery: "Domaine Aimé Blouzard",
  vintage: "2022",
  format: "750ml",
  alcohol: "13.0%",
  country: "France",
  region: "Bordeaux",
  appellation: "Margaux AOC",
  grapeVarietals: ["Cabernet Sauvignon", "Merlot"],
  prices: {
    glass: 12.0,
    bottle: 64.0,
  },
}

export default function ProductPage() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedOption, setSelectedOption] = useState<"glass" | "bottle">("bottle")
  const [isLoaded, setIsLoaded] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-84jd3ucYE1UpR9L7sGyNmNrvtZgthU.png"
        alt="Background gradient"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 min-h-screen">
            {/* Left Column - Product Image */}
            <div className="relative flex items-center justify-center p-8 md:p-16">
              <div
                className={`relative w-full max-w-[300px] aspect-[3/4] mx-auto transition-opacity duration-1000 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
              >
                <Image
                  src="/mock-bottles/mock-bottle-001.png"
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Column - Product Information */}
            <div className="flex flex-col p-8 md:p-16 md:pl-0">
              {/* Navigation */}
              <div
                className={`grid grid-cols-2 border border-[#2A0A0A]/20 mb-8 transition-all duration-500 ease-in-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 p-4 hover:bg-[#2A0A0A]/5 transition-colors font-sans font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button className="flex items-center justify-end gap-2 p-4 hover:bg-[#2A0A0A]/5 transition-colors font-sans font-medium">
                  <Bookmark className="h-4 w-4" />
                  <span>Shortlist</span>
                </button>
              </div>

              {/* Product Details */}
              <div className="flex flex-col border border-[#2A0A0A]/20">
                {/* Product Name and Description */}
                <div
                  className={`border-b border-[#2A0A0A]/20 p-4 transition-all duration-500 ease-in-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: "100ms" }}
                >
                  <h1 className="text-2xl font-sans font-bold mb-4 text-[#2A0A0A]">{product.name}</h1>
                  <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                    <div className="relative">
                      <p className={`text-[#2A0A0A]/70 font-sans font-normal ${!isExpanded ? "line-clamp-3" : ""}`}>
                        {product.description}
                      </p>
                      <CollapsibleTrigger className="flex items-center gap-1 text-sm text-[#2A0A0A]/60 mt-2 font-sans font-medium">
                        {isExpanded ? (
                          <>
                            Less
                            <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            More
                            <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </CollapsibleTrigger>
                    </div>
                  </Collapsible>
                </div>

                {/* Winery */}
                <div
                  className={`border-b border-[#2A0A0A]/20 p-4 transition-all duration-500 ease-in-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <div className="text-sm text-[#2A0A0A]/60 mb-1 font-serif italic">Winery</div>
                  <div className="font-sans font-normal">{product.winery}</div>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-3 border-b border-[#2A0A0A]/20">
                  {[
                    { label: "Vintage", value: product.vintage },
                    { label: "Format", value: product.format },
                    { label: "Alcohol", value: product.alcohol },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className={`${index < 2 ? "border-r" : ""} border-[#2A0A0A]/20 p-4 transition-all duration-500 ease-in-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      <div className="text-sm text-[#2A0A0A]/60 mb-1 font-serif italic">{item.label}</div>
                      <div className="font-sans font-normal">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Origin Grid */}
                <div className="grid grid-cols-2 border-b border-[#2A0A0A]/20">
                  {[
                    { label: "Country", value: product.country },
                    { label: "Region", value: product.region },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className={`${index === 0 ? "border-r" : ""} border-[#2A0A0A]/20 p-4 transition-all duration-500 ease-in-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      style={{ transitionDelay: `${600 + index * 100}ms` }}
                    >
                      <div className="text-sm text-[#2A0A0A]/60 mb-1 font-serif italic">{item.label}</div>
                      <div className="font-sans font-normal">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Appellation */}
                <div
                  className={`border-b border-[#2A0A0A]/20 p-4 transition-all duration-500 ease-in-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: "800ms" }}
                >
                  <div className="text-sm text-[#2A0A0A]/60 mb-1 font-serif italic">Appellation</div>
                  <div className="font-sans font-normal">{product.appellation}</div>
                </div>

                {/* Grape Varietals */}
                <div
                  className={`p-4 transition-all duration-500 ease-in-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: "900ms" }}
                >
                  <div className="text-sm text-[#2A0A0A]/60 mb-1 font-serif italic">Grape Varietals</div>
                  <div className="font-sans font-normal">{product.grapeVarietals.join(", ")}</div>
                </div>
              </div>

              {/* Price Options */}
              <div
                className={`grid grid-cols-2 mt-8 border border-[#2A0A0A]/20 transition-all duration-500 ease-in-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "1000ms" }}
              >
                <Button
                  variant="ghost"
                  className={`flex items-center justify-center gap-2 p-6 rounded-none hover:bg-[#2A0A0A]/5 font-sans font-medium
                  ${selectedOption === "glass" ? "bg-[#2A0A0A]/5" : ""}`}
                  onClick={() => setSelectedOption("glass")}
                >
                  <GlassWater className="h-4 w-4" />
                  <span>Glass</span>
                  <span className="ml-1 text-lg">${product.prices.glass.toFixed(2)}</span>
                </Button>
                <Button
                  variant="ghost"
                  className={`flex items-center justify-center gap-2 p-6 rounded-none hover:bg-[#2A0A0A]/5 font-sans font-medium
                  ${selectedOption === "bottle" ? "bg-[#2A0A0A]/5" : ""}`}
                  onClick={() => setSelectedOption("bottle")}
                >
                  <Wine className="h-4 w-4" />
                  <span>Bottle</span>
                  <span className="ml-1 text-lg">${product.prices.bottle.toFixed(2)}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

