"use client";

import React from "react";
import { Music, Globe2 } from "lucide-react";
export default function AboutPage() {

  return (
    <>
      <section
        className="pt-0 pb-20"
        style={{ fontFamily: "'Space Grotesk', sans-serif", background: "var(--color1)" }}
      >
        <div className="container">
          <div className="about-title mb-20">
            <h1 className="about-title-h1">Talent World</h1>
            <p className="about-sub">Talent World is an African leading entertainment company.</p>
          </div>

          <div className="about-grid">
            <div className="relative collage" aria-hidden={true}>
              <div className="collage-inner">
                <div className="large-wrapper">
                  <div className="group collage-large">
                    <div className="collage-img-wrap">
                      <img
                        src="/images/about1.jpg"
                        alt="about1"
                        className="collage-img"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="group collage-top">
                    <div className="collage-img-wrap">
                      <img
                        src="/images/about2.jpg"
                        alt="about2"
                        className="collage-img"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="group collage-bottom">
                    <div className="collage-img-wrap">
                      <img
                        src="/images/about3.jpg"
                        alt="about3"
                        className="collage-img"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 md:pt-0 relative right-column">
              <div className="flex flex-row gap-3 items-center">
                <div className="pill">
                  <span className="pill-text">City People Entertainment</span>
                </div>

                <div className="pill">
                  <span className="pill-text">Awards 2014</span>
                </div>
              </div>

              <h2 className="headline">Best Record Label of the Year</h2>

              <p className="mt-3 text-sm md:text-base desc">
                The label won the aforementioned category at the 2014 City People Entertainment Awards.
              </p>

              <div className="mt-6 flex gap-8 items-start stats">
                <div>
                  <div className="stat-num">+06</div>
                  <div className="stat-label">Artistes</div>
                </div>

                <div>
                  <div className="stat-num">+09</div>
                  <div className="stat-label">Albums</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="pt-0 pb-20 about2-section"
        style={{ fontFamily: "'Space Grotesk', sans-serif", background: "var(--color1)" }}
      >
        <div className="container">
          <div className="about2-grid">
         <div className="pt-2 md:pt-0 relative left-column2">
              <h2 className="headline2">Delivering Music Worldwide</h2>
              <p className="mt-3 text-sm md:text-base desc2">
                Talent's taste for delivering the utmost value, has inspired the company’s expansion into innovative services such as 
                partnerships, content production, publishing and marketing.
              </p>

              <div className="mt-6 flex gap-6 items-center stats2" role="list">
                <div className="stat-icon2" aria-hidden={true} title="Music" role="listitem">
                  <Music size={40} style={{ color: "var(--color3)" }} />
                  <span className="visually-hidden">Music</span>
                </div>

                <div className="stat-icon2" aria-hidden={true} title="Global" role="listitem">
                  <Globe2 size={40} style={{ color: "var(--color3)" }} />
                  <span className="visually-hidden">Global</span>
                </div>
              </div>
            </div>

            <div className="relative collage2" aria-hidden={true}>
              <div className="collage2-inner">
                <div className="large-wrapper2">
                  <div className="group collage2-large">
                    <div className="collage2-img-wrap">
                      <img
                        src="/images/about4.jpg"
                        alt="about4"
                        className="collage2-img"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="group collage2-top">
                    <div className="collage2-img-wrap">
                      <img
                        src="/images/about5.jpg"
                        alt="about5"
                        className="collage2-img"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="group collage2-bottom">
                    <div className="collage2-img-wrap">
                      <img
                        src="/images/about6.jpg"
                        alt="about6"
                        className="collage2-img"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        /* Section 1 base */
        .about-title {
          margin-left: 18%;
          max-width: 55%;
          margin-top: -0.75rem;
        }
        .about-title-h1 {
          font-size: 56px;
          font-weight: 600;
          color: var(--color3);
          margin: 0;
        }
        .about-sub {
          margin-top: 0.25rem;
          color: var(--color2);
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 55% 45%;
          gap: 0;
          align-items: start;
        }
        .collage-inner {
          position: relative;
          height: 420px;
          max-width: 760px;
        }
        .large-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .collage-large {
          position: absolute;
          left: 100px;
          top: 12px;
          z-index: 20;
          width: 360px;
          height: 380px;
        }
        .collage-top {
          position: absolute;
          left: 450px;
          top: -6px;
          z-index: 30;
          width: 180px;
          height: 140px;
        }
        .collage-bottom {
          position: absolute;
          left: 350px;
          top: 360px;
          z-index: 15;
          width: 280px;
          height: 170px;
        }
        .collage-img-wrap {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transition: transform 0.2s ease;
        }
        .collage-img-wrap:hover {
          transform: translateY(-8px);
        }
        .collage-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: floatY 3s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes floatY {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .collage-img {
            animation: none;
          }
        }

        .pill {
          background: var(--color8);
          padding: 6px 10px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
        }
        .pill-text {
          color: var(--color3);
          font-weight: 700;
          font-size: 13px;
        }

        .headline {
          margin-top: 1rem;
          color: var(--color5);
          font-size: 44px;
          line-height: 1.02;
          font-weight: 800;
        }
        .desc {
          color: var(--color2);
          max-width: 560px;
        }
        .stat-num {
          color: var(--color3);
          font-size: 72px;
          font-weight: 900;
        }
        .stat-label {
          color: var(--color5);
          font-size: 18px;
          margin-top: 8px;
        }

        .about2-section {
          margin-top: 9rem; 
        }

        .about2-grid {
          display: grid;
          grid-template-columns: 45% 55%;
          gap: 0;
          align-items: start;
        }

        .left-column2 {
          margin-left: 6rem; 
        }

        .collage2-inner {
          position: relative;
          height: 420px;
          max-width: 760px;
        }
        .large-wrapper2 {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .collage2-large {
          position: absolute;
          right: 100px;
          top: 12px;
          z-index: 20;
          width: 360px;
          height: 380px;
        }
        .collage2-top {
          position: absolute;
          right: 450px;
          top: -6px;
          z-index: 30;
          width: 180px;
          height: 140px;
        }
        .collage2-bottom {
          position: absolute;
          right: 350px;
          top: 360px;
          z-index: 15;
          width: 280px;
          height: 170px;
        }
        .collage2-img-wrap {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transition: transform 0.2s ease;
        }
        .collage2-img-wrap:hover {
          transform: translateY(-8px);
        }
        .collage2-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: floatY2 3s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes floatY2 {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .collage2-img {
            animation: none;
          }
        }

        .headline2 {
          margin-top: 1rem;
          color: var(--color5);
          font-size: 44px;
          line-height: 1.02;
          font-weight: 800;
        }
        .desc2 {
          color: var(--color2);
          max-width: 560px;
        }
        .stat-num2 {
          color: var(--color3);
          font-size: 72px;
          font-weight: 900;
        }
        .stat-label2 {
          color: var(--color5);
          font-size: 18px;
          margin-top: 8px;
        }

        /* Stats2 icon styles (section 2) */
        .stats2 {
          align-items: center;
        }

        .visually-hidden {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        .stat-icon2 {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--color3); 
          width: 56px;
          height: 56px;
          flex-shrink: 0;
        }

        .stat-icon2 svg {
          width: 40px;
          height: 40px;
          display: block;
        }

        /* Responsive rules */
        @media (max-width: 1280px) {
          .about-grid {
            grid-template-columns: 48% 48%;
            gap: 3rem;
          }
          .about-title {
            margin-left: 15%;
            max-width: 60%;
          }
          .about-title-h1 {
            font-size: 48px;
          }
          .collage-inner {
            height: 380px;
            max-width: 680px;
          }
          .collage-large {
            left: 40px;
            width: 345px;
            height: 320px;
          }
          .collage-top {
            left: 370px;
            width: 145px;
            height: 110px;
          }
          .collage-bottom {
            left: 300px;
            width: 200px;
            height: 140px;
            top: 300px;
          }
          .headline {
            font-size: 40px;
          }
          .stat-num {
            font-size: 60px;
          }

          .right-column {
            padding-left: 1.5rem;
          }

          .left-column2 {
            margin-left: 3rem;
            padding-right: 1.5rem;
          }

          .collage2-large {
            right: 40px;
            width: 345px;
            height: 320px;
          }
          .collage2-top {
            right: 370px;
            width: 145px;
            height: 110px;
          }
          .collage2-bottom {
            right: 300px;
            width: 200px;
            height: 140px;
            top: 300px;
          }
          .headline2 {
            font-size: 40px;
          }
          .stat-num2 {
            font-size: 60px;
          }
        }

        @media (max-width: 1023px) {
          .about-grid {
            grid-template-columns: 46% 46%;
            gap: 2.5rem;
          }
          .about-title {
            margin-left: 8%;
            max-width: 80%;
            text-align: left;
            margin-top: -0.5rem;
          }
          .about-title-h1 {
            font-size: 36px;
          }
          .collage-inner {
            height: 320px;
            max-width: 520px;
          }

          .collage-large {
            position: absolute;
            left: 10px;
            top: 10px;
            width: 260px;
            height: 260px;
          }
          .collage-top {
            position: absolute;
            left: 240px;
            top: -6px;
            width: 110px;
            height: 90px;
          }
          .collage-bottom {
            position: absolute;
            left: 200px;
            top: 260px;
            width: 160px;
            height: 110px;
          }

          .headline {
            font-size: 32px;
            text-align: left;
          }
          .stat-num {
            font-size: 52px;
          }

          .right-column {
            padding: 0 1.25rem;
          }

          .left-column2 {
            margin-left: 0;
            padding: 0 1.25rem;
          }

          .collage2-large {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 260px;
            height: 260px;
          }
          .collage2-top {
            position: absolute;
            right: 240px;
            top: -6px;
            width: 110px;
            height: 90px;
          }
          .collage2-bottom {
            position: absolute;
            right: 200px;
            top: 260px;
            width: 160px;
            height: 110px;
          }

          .headline2 {
            font-size: 32px;
            text-align: left;
          }
          .stat-num2 {
            font-size: 52px;
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          .about-title {
            margin-left: 4%;
            max-width: 94%;
            text-align: left;
          }
          .about-title-h1 {
            font-size: 28px;
          }

          .collage-inner {
            height: 360px;
            max-width: 360px;
            margin: 0 auto;
            position: relative;
          }

          .collage-large {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            top: 40px;
            width: 260px;
            height: 240px;
            z-index: 20;
          }

          .collage-top {
            position: absolute;
            left: 50%;
            transform: translate(-50%, -75%);
            width: 100px;
            height: 100px;
            z-index: 30;
            top: 40px;
          }

          .collage-bottom {
            position: absolute;
            left: 50%;
            transform: translate(-50%, -25%);
            width: 100px;
            height: 100px;
            z-index: 25;
            top: calc(40px + 240px);
          }

          .headline {
            font-size: 24px;
          }
          .stat-num {
            font-size: 40px;
          }

          .left-column2 {
            margin-left: 0;
            padding: 0 1.25rem;
          }


           .about2-grid {
            display: flex;
            flex-direction: column;
          }

           .collage2 {
            order: -1;
            margin: 0 auto;
            display: block;
           margin-bottom: 2rem; /* add space below collage on mobile so text doesn't touch images */
          }

          .collage2-inner {
            margin: 0 auto;
            height: 260px; /* reduced to bring text closer */
            max-width: 360px;
          }

            .collage2-large {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            top: 4px; /* smaller top offset */
            width: 260px;
            height: 220px; /* slightly reduced height */
            z-index: 20;
          }
          .collage2-top {
            position: absolute;
            left: 50%;
            transform: translate(-50%, -75%);
            width: 100px;
            height: 100px;
            z-index: 30;
            top: 4px;
          }

          .collage2-bottom {
            position: absolute;
            left: 50%;
            transform: translate(-50%, -25%);
            width: 100px;
            height: 100px;
            z-index: 25;
            top: calc(4px + 220px); /* match reduced top/height */
          }

          .about2-section {
            margin-top: 2rem; 
          }

          .headline2 {
            font-size: 24px;
          }
          .stat-num2 {
            font-size: 40px;
          }
        }

        @media (max-width: 479px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          .about-title {
            margin-left: 2%;
            max-width: 96%;
            text-align: left;
          }
          .about-title-h1 {
            font-size: 20px;
          }
          .about-sub {
            font-size: 0.85rem;
          }

          .collage-inner {
            height: 300px;
            max-width: 300px;
            margin: 0 auto;
            position: relative;
          }
          .collage-large {
            width: 200px;
            height: 160px;
            left: 50%;
            transform: translateX(-50%);
            position: relative;
            top: 30px;
          }

          .collage-top {
            width: 80px;
            height: 80px;
            top: 30px;
            transform: translate(-50%, -75%);
          }
          .collage-bottom {
            width: 80px;
            height: 80px;
            top: calc(30px + 160px);
            transform: translate(-50%, -25%);
          }

          .headline {
            font-size: 18px;
          }
          .stat-num {
            font-size: 32px;
          }

          .left-column2 {
            margin-left: 0;
            padding: 0 1.25rem;
          }

           .about2-grid {
            display: flex;
            flex-direction: column;
          }

          .collage2 {
            order: -1;
           margin-bottom: 1.5rem; 
          }

          .collage2-large {
            width: 200px;
            height: 160px;
            left: 50%;
            transform: translateX(-50%);
            position: relative;
            top: 12px; 
          }
          .collage2-top {
            width: 80px;
            height: 80px;
            top: 12px;
            transform: translate(-50%, -75%);
          }
          .collage2-bottom {
            width: 80px;
            height: 80px;
            top: calc(12px + 160px);
            transform: translate(-50%, -25%);
          }

          .headline2 {
            font-size: 18px;
          }
          .stat-num2 {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  );
}
