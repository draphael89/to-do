import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'

interface SnakeProps {
  show: boolean
}

const Snake: React.FC<SnakeProps> = ({ show }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const snakeControls = useAnimation()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    if (show) {
      snakeControls.start("visible")
    } else {
      snakeControls.start("hidden")
    }
  }, [show, snakeControls])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const snakeSegments = 20
  const segmentLength = 20

  return (
    <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
      {Array.from({ length: snakeSegments }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: segmentLength,
            height: segmentLength,
            borderRadius: '50%',
            background: `hsl(${i * 10}, 100%, 50%)`,
            filter: 'blur(5px)',
          }}
          initial="hidden"
          animate={snakeControls}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
          }}
          custom={i}
        >
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.3)',
            }}
            animate={{
              x: mouseX,
              y: mouseY,
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 200,
              restDelta: 0.001,
              delay: i * 0.02,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default Snake