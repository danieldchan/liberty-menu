"use client"

import { Lightbulb } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const articles = [
  {
    title: "Understanding Appellations",
    description:
      'Ever wonder what "Bordeaux AOC" or "Chianti DOCG" means on a wine label? Appellations are more than just geography — they\'re a mark of origin, quality standards, and traditional winemaking methods.',
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "How to Read a Wine Label",
    description:
      "Vintage, varietal, producer — decoding a wine label can feel like cracking a secret code. This guide breaks down what each element means so you can shop with confidence.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Tasting Notes Decoded",
    description:
      "Hints of blackberry with earthy undertones\" — what does that even mean? We'll help you understand common tasting terms and how to use them to better appreciate your wine.",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function Wine101() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
      className="space-y-px"
    >
      <div className="p-8 backdrop-blur-sm border border-[#2A0A0A]/20">
        <div className="flex items-center gap-2 text-[#2A0A0A]/80">
          <Lightbulb className="h-5 w-5" />
          <span className="font-serif italic">Wine 101</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-px">
        {articles.map((article, index) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            className="backdrop-blur-sm border border-[#2A0A0A]/20 group cursor-pointer"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-8 space-y-4">
              <h3 className="text-xl font-sans font-bold text-[#2A0A0A] group-hover:text-[#2A0A0A]/60 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm font-sans text-[#2A0A0A]/70">{article.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

