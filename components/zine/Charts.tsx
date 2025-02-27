"use client"

import { Trophy } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const wines = [
  {
    id: 1,
    rank: 1,
    name: "Château Lafite Rothschild 2016",
    region: "Bordeaux, France",
  },
  {
    id: 2,
    rank: 2,
    name: "Gaja Barbaresco 2018",
    region: "Piedmont, Italy",
  },
  {
    id: 3,
    rank: 3,
    name: "Penfolds Grange 2017",
    region: "Barossa Valley, Australia",
  },
  {
    id: 4,
    rank: 4,
    name: "Dominus Estate 2019",
    region: "California, United States",
  },
  {
    id: 5,
    rank: 5,
    name: "Vega Sicilia Unico 2013",
    region: "Castilla y León, Spain",
  },
]

export default function Charts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="grid grid-cols-[1fr_1px_auto] backdrop-blur-sm border border-[#2A0A0A]/20"
    >
      {/* Left Section - Header */}
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#2A0A0A]/80">
          <Trophy className="h-5 w-5" />
          <span className="font-serif font-normal italic">Charts</span>
        </div>
        <h2 className="text-5xl font-sans font-bold text-[#2A0A0A] leading-[1.1]">
          Monument's
          <br />
          Favourite Reds
        </h2>
        <button className="group flex items-center gap-2 text-[#2A0A0A]/60 hover:text-[#2A0A0A] transition-colors">
          <span className="font-serif font-normal italic">See the full list</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* Center Divider */}
      <div className="bg-[#2A0A0A]/20" />

      {/* Right Section - Wine List */}
      <div className="w-[600px] divide-y divide-[#2A0A0A]/20">
        {wines.map((wine) => (
          <Link
            key={wine.rank}
            href={`/products/${wine.id}`}
            className="grid grid-cols-[80px_1fr] items-center group transition-colors hover:bg-[#2A0A0A]/5"
          >
            <div className="p-6 text-4xl font-serif text-[#2A0A0A] text-center">{wine.rank}</div>
            <div className="py-6 pr-8 space-y-1">
              <div className="font-sans font-medium text-[#2A0A0A] group-hover:text-[#2A0A0A]/60 transition-colors">
                {wine.name}
              </div>
              <div className="font-serif font-normal italic text-sm text-[#2A0A0A]/60">{wine.region}</div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

