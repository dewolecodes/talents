"use client";

import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer(): JSX.Element {
  return (
    <>
      {/* Cookie choices - fixed so it remains visible even when footer is off-screen */}
      <div style={{ position: "fixed", left: 18, bottom: 18, zIndex: 60 }}>
        <div className="inline-block bg-[var(--color2)] text-[var(--color5)] px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-full shadow-md">
          <a href="#">Cookie choices</a>
        </div>
      </div>

      <footer className="w-full bg-[var(--color1)] text-[var(--color2)] py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-6">
          
            <div className="flex flex-col">
              <div className="flex items-center gap-4 text-[var(--color3)] text-2xl -mt-1">
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" aria-label="YouTube"><FaYoutube /></a>
              </div>

              <nav className="mt-2 sm:mt-3" aria-label="Footer links">
                <ul className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-[var(--color2)] text-sm">
                  <li><a href="#">Privacy policy</a></li>
                  <li><a href="#">Terms and condition</a></li>
                </ul>
              </nav>
            </div>

            <div className="text-[var(--color2)] text-sm mt-0 sm:mt-0 w-full sm:w-auto sm:text-right">© 2025 Talents Global Holdings</div>
          </div>
        </div>
      </footer>
    </>
  );
}
