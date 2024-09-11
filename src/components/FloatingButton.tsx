import React from 'react'
import { motion } from 'framer-motion'

interface FloatingButtonProps {
  onClick: () => void
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      className="floating-button"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      +
    </motion.button>
  )
}

export default FloatingButton