import React from "react";
import Link from "next/link";

type ReleaseType = "SINGLE" | "ALBUM" | "EP";
type Release = { id: number; artist: string; track: string; fileName: string; type: ReleaseType };

const releases: Release[] = [
  { id: 1, artist: "Neon Dave", track: "Trenches", fileName: "/images/lilVonTrenches.jpg", type: "SINGLE" },
  { id: 2, artist: "Brymo", track: " The Panda In Me", fileName: "/images/brymoThePandaInMe.jpg", type: "SINGLE" },
  { id: 3, artist: "Major AJ", track: "Dreams", fileName: "/images/mikeSkyeeDreams.jpg", type: "SINGLE" },
  { id: 4, artist: "Beyonce", track: "Sun", fileName: "/images/beyonceSun.jpg", type: "SINGLE" },
  { id: 5, artist: "Bob Kay", track: "Invisible Wings", fileName: "/images/teniInvisibleWings.jpg", type: "SINGLE" },
  { id: 6, artist: "Beyonce", track: "Mama Tears", fileName: "/images/veraMamaTears.jpg", type: "SINGLE" },
  { id: 7, artist: "Beyonce", track: "Clarity Of Mind", fileName: "/images/veeClarity.jpg", type: "ALBUM" },
  { id: 8, artist: "Neon Dave", track: "Black Arrest", fileName: "/images/blackarrest.jpg", type: "EP" },
  { id: 9, artist: "Tarik", track: "Chicago", fileName: "/images/r2DChicago.jpg", type: "EP" },
  
]

function typeColor(type: ReleaseType) {
  if (type === "SINGLE") return "var(--color6)"; // yellow
  if (type === "ALBUM") return "var(--color3)"; // red
  return "var(--color7, #4AA3FF)"; // EP blue (fallback)
}

export default function Page() {
  return (
    <section className="pb-24 pt-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="pl-4 md:pl-[17.3vw]">
        <div className="container mt-4">
          <h2
            className="uppercase text-[40px] sm:text-[48px] md:text-[60px]"
            style={{
              lineHeight: 0.5,
              letterSpacing: "0.02em",
              color: "var(--color2)",
            }}
          >
            LATEST RELEASES
          </h2>

          <div className="mt-6 mb-8">
            <div style={{ height: 1, background: "var(--color5)", width: "100%" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {releases.map((r) => (
              <article key={r.id} className="">
                {/* clickable image - goes to homepage "/" for now */}
                <div className="w-full overflow-hidden rounded-sm flex justify-center">
                  <Link href="/" aria-label={`${r.artist} - ${r.track}`}>
                    <div
                      className="relative w-[95%] h-[380px] cursor-pointer"
                      aria-hidden={false}
                    >
                      <img
                        src={r.fileName}
                        alt={`${r.artist} - ${r.track}`}
                        className="w-full h-full object-cover block"
                        draggable={false}
                      />
                    </div>
                  </Link>
                </div>

                {/* meta row */}
                <div className="mt-4 flex items-center gap-3">
                  <span
                    className="inline-block"
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 9999,
                      background: typeColor(r.type),
                    }}
                  />

                  <span
                    className="font-semibold uppercase"
                    style={{ color: typeColor(r.type), fontSize: 13 }}
                  >
                    {r.type}
                  </span>

                  <span className="ml-1" style={{ color: "var(--color2)", fontSize: 16 }}>
                    {r.artist} - {r.track}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
