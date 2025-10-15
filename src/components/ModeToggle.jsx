"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        data-focusable
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-12 h-12 rounded-full 
        backdrop-blur-lg border border-white/20 
        bg-gradient-to-r from-[#7332a8] to-[#b266ff] 
        dark:from-gray-800 dark:to-gray-700 
        text-white shadow-lg hover:scale-110 transition-all duration-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "light" ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Moon size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.3 }}
            >
              <Sun size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
