"use client"

import { Calendar } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const events = [
  {
    category: "Beats & Bottles",
    title: "Sunset Sessions with DJ Maverick",
    date: "Friday, April 26, 2025",
    time: "7:00 PM - Midnight",
    image: "https://cdn.midjourney.com/ae8e1070-cce6-4d08-a812-ba3aa8897ecd/0_1.png",
    colSpan: "col-span-1",
  },
  {
    category: "Wine Workshop",
    title: "Decoding Natural Wines: From Vineyard to Glass",
    date: "April 24, 2025",
    time: "6:00 PM - 8:30 PM",
    image: "https://cdn.midjourney.com/edeec1e2-ab31-4f00-9800-944e483e0f1f/0_0.png",
    colSpan: "col-span-1",
  },
  {
    category: "Wine Tasting",
    title: "An Evening of Bordeaux Classics",
    date: "Thursday, March 28, 2025",
    time: "7:00 PM - 9:30 PM",
    image: "https://cdn.midjourney.com/a6011235-7074-4f8b-b5fb-a0f7dbe5a82b/0_2.png",
    colSpan: "col-span-1",
  },
  {
    category: "Masterclass",
    title: "Paint & Pour: Wine Meets Art",
    date: "Saturday, April 6, 2025",
    time: "6:30 PM - 10:00 PM",
    image: "https://cdn.midjourney.com/25cc80eb-76f2-4d07-bbbb-91133566ae07/0_3.png",
    colSpan: "col-span-1",
  },
  {
    category: "Wine & Dine Pairing",
    title: "A 5-Course Tasting with Loire Valley Wines",
    date: "Friday, April 19, 2025",
    time: "7:00 PM - 9:00 PM",
    image: "https://cdn.midjourney.com/c3a8afc2-69a8-45ae-af52-e12f9801e1bd/0_2.png",
    colSpan: "col-span-1",
  },
]

export default function UpcomingEvents() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
      className="space-y-px"
    >
      <div className="p-8 backdrop-blur-sm border border-[#2A0A0A]/20">
        <div className="flex items-center gap-2 text-[#2A0A0A]/80">
          <Calendar className="h-5 w-5" />
          <span className="font-serif italic">Upcoming Events</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px">
        {events.slice(0, 2).map((event, index) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            className="backdrop-blur-sm border border-[#2A0A0A]/20 group cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-8 space-y-4">
              <div className="font-serif italic text-sm text-[#2A0A0A]/80">{event.category}</div>
              <h3 className="text-xl font-sans font-bold text-[#2A0A0A] group-hover:text-[#2A0A0A]/60 transition-colors">
                {event.title}
              </h3>
              <div className="space-y-1">
                <p className="text-sm font-sans font-medium text-[#2A0A0A]">{event.date}</p>
                <p className="text-sm font-sans text-[#2A0A0A]/70">{event.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-px">
        {events.slice(2).map((event, index) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
            className="backdrop-blur-sm border border-[#2A0A0A]/20 group cursor-pointer"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-8 space-y-4">
              <div className="font-serif italic text-sm text-[#2A0A0A]/80">{event.category}</div>
              <h3 className="text-xl font-sans font-bold text-[#2A0A0A] group-hover:text-[#2A0A0A]/60 transition-colors">
                {event.title}
              </h3>
              <div className="space-y-1">
                <p className="text-sm font-sans font-medium text-[#2A0A0A]">{event.date}</p>
                <p className="text-sm font-sans text-[#2A0A0A]/70">{event.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

