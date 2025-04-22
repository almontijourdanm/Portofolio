"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  duration?: number
  delay?: number
  yOffset?: number
  xOffset?: number
  className?: string
}

export default function FloatingElement({
  children,
  duration = 4,
  delay = 0,
  yOffset = 10,
  xOffset = 0,
  className = "",
}: FloatingElementProps) {
  return (
    <motion.div
      initial={{ y: 0, x: 0 }}
      animate={{
        y: [0, -yOffset, 0],
        x: [0, xOffset, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
