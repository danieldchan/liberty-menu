"use client"

import { useState } from "react"
import { Search, Wine } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Gradient Background */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-84jd3ucYE1UpR9L7sGyNmNrvtZgthU.png"
        alt="Background gradient"
        fill
        className="object-cover"
        priority
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Logo */}
        <h1 className="mb-16 font-serif text-5xl font-light tracking-wider text-white">Liberty</h1>

        {/* Search Bar */}
        <div className={`mb-6 transform transition-all duration-500 ${isSearchFocused ? "scale-105" : "scale-100"}`}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transform text-white/60" />
            <Input
              type="search"
              placeholder="Search our collection..."
              className="h-11 min-w-[280px] bg-white/10 px-10 text-white backdrop-blur-md placeholder:text-white/60 hover:bg-white/20"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Explore Button */}
        <Button
          variant="ghost"
          size="lg"
          className="group relative min-w-[280px] overflow-hidden border border-white/20 text-white hover:border-white/40 hover:bg-white/10"
          asChild
        >
          <Link href="/explore">
            <Wine className="mr-2 h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
            Explore Our Collection
          </Link>
        </Button>
      </div>
    </main>
  )
}

