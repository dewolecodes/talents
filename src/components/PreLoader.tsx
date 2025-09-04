"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PreLoader() {
  const [pageReady, setPageReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [exitStarted, setExitStarted] = useState(false);
  // coverVisible is the overlay that appears on top of the loaded page,
  // then animates down off-screen to reveal the page fully.
  const [coverVisible, setCoverVisible] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setPageReady(true);
      return;
    }
    const handleLoad = () => setPageReady(true);
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    if (pageReady) {
      // start the preloader exit animation shortly after page is ready
      // and mount the page-cover immediately so the page isn't visible
      // between the preloader unmount and the cover mount.
      const timer = setTimeout(() => {
        setExitStarted(true);
        setCoverVisible(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pageReady]);

  // Keep rendering until both preloader and cover have finished
  if (!showPreloader && !coverVisible) return null;

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            key="preloader-overlay"
            initial={{ opacity: 1 }}
              animate={exitStarted ? { opacity: 0, scale: 0.98 } : { opacity: 1 }}
              // slightly slower fade so the user perceives the transition
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="fixed inset-0 z-[10000] flex items-center justify-center"
            style={{ background: 'var(--color1)' }}
            onAnimationComplete={() => {
              if (exitStarted) {
                // hide the preloader element; cover is already visible
                setShowPreloader(false);
              }
            }}
          >
            <motion.div
              // always rotate continuously so the logo never stands still
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-24 h-24 flex items-center justify-center"
            >
              <Image
                src="/logo2.png"
                alt="Loading..."
                width={96}
                height={96}
                priority
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {coverVisible && (
          <motion.div
            key="page-cover"
            initial={{ y: 0 }}
            // slower slide-down and small pause so reveal doesn't feel rushed
            animate={{ y: '100%' }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            onAnimationComplete={() => setCoverVisible(false)}
            className="fixed inset-0 z-[9999]"
            style={{ background: 'var(--color1)' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
