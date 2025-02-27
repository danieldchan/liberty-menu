import type React from "react"
import "@/styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/pej5svo.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}

