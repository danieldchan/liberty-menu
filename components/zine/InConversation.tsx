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
        <Image src="/placeholder.svg?height=600&width=800" alt="Roberto Duran" fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[#2A0A0A]/80">
          <MessageSquare className="h-5 w-5" />
          <span className="font-serif italic">In Conversation</span>
        </div>
        <h2 className="text-4xl font-sans font-bold text-[#2A0A0A]">
          Roberto Duran:
          <br />
          Sommelier Extraordinaire
        </h2>
        <p className="text-sans text-[#2A0A0A]/70">
          With over two decades of experience, Roberto Duran has elevated the art of wine curation to new heights. Known
          for his impeccable palate and passion for storytelling through wine, Roberto has become a guiding light for
          connoisseurs and casual drinkers alike. In this exclusive interview, he shares his journey from vineyard
          visits to five-star dining rooms, his thoughts on emerging wine regions, and the bottles that never leave his
          personal cellar.
        </p>
        <button className="group flex items-center gap-2 text-[#2A0A0A]/60 hover:text-[#2A0A0A] transition-colors">
          <span className="font-serif italic">Read on</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </motion.div>
  )
}

