"use client"

import { Tv } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function PourAndPlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="space-y-px"
    >
      <div className="p-8 backdrop-blur-sm border border-[#2A0A0A]/20">
        <div className="flex items-center gap-2 text-[#2A0A0A]/80">
          <Tv className="h-5 w-5" />
          <span className="font-serif italic">Pour & Play</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px">
        {[
          {
            title: "Pop It Like a Pro: Mastering the Art of Champagne Opening",
            description:
              "Sabering or a classic pop? Learn the safest (and most stylish) ways to open a bottle of bubbly and impress at your next celebration.",
            image: "/placeholder.svg?height=600&width=800",
            type: "How-To Guide",
          },
          {
            title: "A Walk Through Tuscany: Virtual Vineyard Tour",
            description:
              "Wander through the rolling hills of Tuscany from the comfort of your screen. Experience the harvest, meet the winemakers, and explore the cellars where magic happens.",
            image: "/placeholder.svg?height=600&width=800",
            type: "Virtual Experience",
          },
        ].map((video) => (
          <div key={video.title} className="backdrop-blur-sm border border-[#2A0A0A]/20">
            <div className="relative aspect-video">
              <Image src={video.image || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#2A0A0A] border-b-8 border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <div className="font-serif italic text-sm text-[#2A0A0A]/80">{video.type}</div>
              <h3 className="text-xl font-sans font-bold text-[#2A0A0A]">{video.title}</h3>
              <p className="text-sm font-sans text-[#2A0A0A]/70">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

