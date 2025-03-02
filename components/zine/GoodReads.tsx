"use client"

import { BookOpen } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const articles = [
  {
    category: "Winemaker's Spotlight",
    title: "The Heart of Burgundy: A Chat with Lucie Martin",
    description:
      "Go behind the scenes with renowned winemaker Lucie Martin as she shares insights on crafting Burgundy's finest Pinot Noir.",
    image: "https://cdn.midjourney.com/6c4da926-8774-4949-b660-956c2398b0b9/0_0.png",
  },
  {
    category: "Wine of the Month",
    title: "Tenuta San Guido Sassicaia 2020",
    description:
      "A refined Super Tuscan blending Cabernet Sauvignon and Cabernet Franc. Elegant notes of blackcurrant, herbs, and subtle oak.",
    image: "https://cdn.midjourney.com/86932551-ace4-4cae-9ce3-734175f5af8b/0_2.png",
  },
  {
    category: "Wine is Life",
    title: "Personality Quiz: What's Your Perfect Pour?",
    description:
      "Ever wondered which wine matches your vibe? Take our light-hearted quiz to discover if you're a bold Cabernet, a bubbly Prosecco, or a smooth Pinot Noir. Perfect for your next pour—or just a bit of fun with friends.",
    image: "https://cdn.midjourney.com/a54bd6a2-fbbf-4fa9-9d1b-e2d9dfb90f6d/0_1.png",
  },
  {
    category: "Sommelier Suggestions",
    title: "Pairing Sparkling Wines Beyond Appetizers",
    description:
      "Explore how Champagne and other sparkling wines can elevate your entire meal, from starters to dessert.",
    image: "https://cdn.midjourney.com/13e3d241-eb7f-4779-9995-bf4b9e21581f/0_0.png",
  },
]

export default function GoodReads() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      className="space-y-px"
    >
      <div className="p-8 backdrop-blur-sm border border-[#2A0A0A]/20">
        <div className="flex items-center gap-2 text-[#2A0A0A]/80">
          <BookOpen className="h-5 w-5" />
          <span className="font-serif font-normal italic">Good Reads</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px">
        {articles.map((article, index) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            className="backdrop-blur-sm border border-[#2A0A0A]/20 group cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-8 space-y-4">
              <div className="font-serif font-normal italic text-sm text-[#2A0A0A]/80">{article.category}</div>
              <h3 className="text-xl font-sans font-bold text-[#2A0A0A] group-hover:text-[#2A0A0A]/60 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm font-sans font-medium text-[#2A0A0A]/70">{article.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

