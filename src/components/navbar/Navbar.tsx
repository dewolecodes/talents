"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { title: "HOME", href: "/" },
  { title: "ABOUT", href: "/about" },
  { title: "ARTISTS", href: "/artists" },
  { title: "VIDEOS", href: "/videos" },
  { title: "BLOG", href: "/blog" },
  { title: "SHOP", href: "/shop" },
  { title: "CONTACT", href: "/contact" },
];

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Simple navigation only, no overlay or spinner
  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (href === pathname) return;
    e.preventDefault();
  // notify PreLoader to show immediately; PreLoader will watch pathname
  // changes and run its exit animation when navigation finishes.
  window.dispatchEvent(new Event("nav:start"));
  router.push(href);
  };

  return (
    /* header is fixed so it stays on top while scrolling */
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{ fontFamily: "'Space Grotesk', sans-serif", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="relative w-full h-28">
        <div className="container h-full flex items-center relative">
          {/* show logo on left for all pages except the homepage (page.tsx at '/') */}
          {pathname !== "/" && (
            <Link href="/" aria-label="Home" className="mr-4 flex items-center -mt-2 md:mt-7">
              <img
                src="/logo.png"
                alt="logo"
                draggable={false}
                className="h-14 md:h-16 lg:h-20 w-auto"
              />
            </Link>
          )}
          <div className="flex-1" />
          {/* DESKTOP NAV */}
          <nav className="hidden md:flex absolute top-9 md:top-9 lg:top-11 right-0 items-center gap-7 z-50">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative inline-block font-[Space_Grotesk] uppercase tracking-wide transition-colors duration-200 ${
                    isActive ? "text-[var(--color3)]" : "text-[var(--color2)] hover:text-[var(--color4)]"
                  } text-[14px] md:text-[17px]`}
                      onClick={handleNavClick(link.href)}
                >
                  <span className="relative inline-block pb-9">
                    {link.title}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 h-[3px] w-[190%] transition-colors duration-200 ${
                        isActive
                          ? "bg-[var(--color3)]"
                          : "bg-transparent group-hover:bg-[var(--color4)]"
                      }`}
                      style={{ bottom: "0" }}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

  {/* HAMBURGER (mobile) */}
  <div className="absolute right-4 top-6 md:top-4 md:hidden z-50">
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 focus:outline-none"
          >
            <motion.svg
              viewBox="0 0 24 24"
              width={36}
              height={36}
              style={{ originX: "100%", originY: "50%" }}
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <motion.line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={
                  menuOpen
                    ? { y1: 12, y2: 12, rotate: 45, x1: 3, x2: 21 }
                    : { y1: 6, y2: 6, rotate: 0 }
                }
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <motion.line
                x1="3"
                y1="12"
                x2="21"
                y2="12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.18 }}
              />
              <motion.line
                x1="3"
                y1="18"
                x2="21"
                y2="18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={
                  menuOpen
                    ? { y1: 12, y2: 12, rotate: -45, x1: 3, x2: 21 }
                    : { y1: 18, y2: 18, rotate: 0 }
                }
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
            className="md:hidden w-full overflow-hidden"
            style={{ background: "var(--color1)" }}
          >
            <div className="px-6 pb-6 pt-4">
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      onClick={() => {
                        setMenuOpen(false);
                        // same navigation signaling for mobile; PreLoader will
                        // detect completion via pathname change.
                        window.dispatchEvent(new Event("nav:start"));
                        router.push(link.href);
                      }}
                      className={`block px-3 py-3 rounded-md text-base font-semibold uppercase ${
                        isActive ? "text-[var(--color3)]" : "text-[var(--color2)]"
                      } hover:text-[var(--color4)]`}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
