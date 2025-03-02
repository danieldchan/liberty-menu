"use client"

import { MessageSquare } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function InConversation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid grid-cols-2 gap-8 p-8 backdrop-blur-sm border border-[#2A0A0A]/20"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src="https://cdn.midjourney.com/5a105c81-d5c4-4c45-9521-307d8e2f1e8a/0_3.png"
          alt="Roberto Duran examining a wine glass in a cellar"
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[#2A0A0A]/80">
          <MessageSquare className="h-5 w-5" />
          <span className="font-serif font-normal italic">In Conversation</span>
        </div>
        <h2 className="text-4xl font-sans font-bold text-[#2A0A0A]">
          Roberto Duran:
          <br />
          Sommelier Extraordinaire
        </h2>
        <p className="font-sans font-medium text-[#2A0A0A]/70">
          With over two decades of experience, Roberto Duran has elevated the art of wine curation to new heights. Known
          for his impeccable palate and passion for storytelling through wine, Roberto has become a guiding light for
          connoisseurs and casual drinkers alike. In this exclusive interview, he shares his journey from vineyard
          visits to five-star dining rooms, his thoughts on emerging wine regions, and the bottles that never leave his
          personal cellar.
        </p>
        <button className="group flex items-center gap-2 text-[#2A0A0A]/60 hover:text-[#2A0A0A] transition-colors">
          <span className="font-serif font-normal italic">Read on</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </motion.div>
  )
}

