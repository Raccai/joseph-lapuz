import { useScroll, useSpring, useTransform, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'

export const SmoothScroll = ({children}) => {
  const contentRef= useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const styles = {
    scroll: {
      width: "100vw",
      position: "fixed",
      top: "0",
      display: "flex",
      flexDirection: "column",
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }

      setWindowHeight(window.innerHeight);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [contentRef])

  // Intercept normal scroll behavior
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 10,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, (value) => {
    return value * -(contentHeight - windowHeight);
  })

  return (
    <>
      <div style={{ height: contentHeight }} />
      <motion.div style={{...styles.scroll, y: y}} ref={contentRef}>
        {children}
      </motion.div>
    </>
  )
}
