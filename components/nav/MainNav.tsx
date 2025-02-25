"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Compass, ScrollText, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"

interface MainNavProps {
  onSearchClick: () => void
  isVisible: boolean
}

export function MainNav({ onSearchClick, isVisible }: MainNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      label: "Search",
      icon: Search,
      onClick: onSearchClick,
    },
    {
      label: "Explore",
      icon: Compass,
      href: "/explore",
    },
    {
      label: "Zine",
      icon: ScrollText,
      href: "/#zine",
    },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "pt-3 pb-3 bg-white/5 backdrop-blur-md" : "pt-8",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 flex items-center justify-between">
        <div className="flex">
          {navItems.map((item) => {
            const isActive =
              item.href &&
              item.href !== "/" &&
              ((item.href === "/#zine" && pathname === "/#zine") ||
                (item.href !== "/#zine" && pathname.startsWith(item.href)))

            const ButtonComponent = item.onClick ? "button" : Link

            return (
              <ButtonComponent
                key={item.label}
                href={item.href as string}
                onClick={item.onClick}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 border border-[#2A0A0A]/20 -ml-px first:ml-0 font-inter transition-all duration-300",
                  isActive ? "bg-[#2A0A0A] text-white hover:bg-[#2A0A0A]/90" : "text-[#2A0A0A] hover:bg-[#2A0A0A]/5",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </ButtonComponent>
            )
          })}
        </div>

        <Link
          href="/shortlist"
          className={cn(
            "flex items-center gap-2 px-4 py-2 border border-[#2A0A0A]/20 font-inter transition-all duration-300",
            pathname === "/shortlist"
              ? "bg-[#2A0A0A] text-white hover:bg-[#2A0A0A]/90"
              : "text-[#2A0A0A] hover:bg-[#2A0A0A]/5",
          )}
        >
          <Bookmark className="h-4 w-4" />
          <span className="text-sm font-medium">Shortlist</span>
        </Link>
      </div>
    </div>
  )
}

