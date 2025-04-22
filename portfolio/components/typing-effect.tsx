"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
  className?: string
}

export default function TypingEffect({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
  className = "",
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (displayText === texts[currentIndex]) {
        // Finished typing current text, wait before deleting
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, delayBetweenTexts)
      } else {
        // Still typing
        timeout = setTimeout(() => {
          setDisplayText(texts[currentIndex].substring(0, displayText.length + 1))
        }, typingSpeed)
      }
    } else {
      if (displayText === "") {
        // Finished deleting, move to next text
        setIsTyping(true)
        setCurrentIndex((currentIndex + 1) % texts.length)
      } else {
        // Still deleting
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        }, deletingSpeed)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isTyping, texts, typingSpeed, deletingSpeed, delayBetweenTexts])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  )
}
