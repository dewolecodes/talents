"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FiClock,
  FiCheck,
  FiShare2,
  FiPlay,
  FiPause,
  FiMaximize2,
} from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";

type VideoItem = {
  id: string;
  cover: string;
  avatar: string;
  artist: string;
  title: string;
  src: string;
};

const ITEMS: VideoItem[] = [
  { id: "1", cover: "/images/cover1.jpg", avatar: "/images/cover1.jpg", artist: "Tarik", title: "Pain (Live performance)", src: "/videos/video1.mp4" },
  { id: "2", cover: "/images/cover2.jpg", avatar: "/images/cover2.jpg", artist: "Brymo", title: "I.T.T (Live performance)", src: "/videos/video2.mp4" },
  { id: "3", cover: "/images/cover3.jpg", avatar: "/images/cover3.jpg", artist: "Brymo", title: "Joro", src: "/videos/video2.mp4" },
  { id: "4", cover: "/images/cover4.jpg", avatar: "/images/cover4.jpg", artist: "Major AJ", title: "Must Have Been", src: "/videos/video1.mp4" },
  { id: "5", cover: "/images/cover5.jpg", avatar: "/images/cover5.jpg", artist: "Tariq", title: "Streetlights", src: "/videos/video1.mp4" },
  { id: "6", cover: "/images/cover6.jpg", avatar: "/images/cover6.jpg", artist: "Neon Dave", title: "Believe", src: "/videos/video1.mp4" },
];

const YOUTUBE_URL = "https://www.youtube.com";

function formatTime(s: number) {
  if (!isFinite(s)) return "0:00";
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = Math.floor(s % 60);
  if (hrs > 0) return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export default function Page() {
  return (
    <main className="min-h-screen pt-6 sm:pt-4 md:pt-6 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1
          className="text-4xl sm:text-5xl font-extrabold text-center mt-0 sm:-mt-9 mb-6 sm:mb-16"
          style={{ color: "var(--color3)" }}
        >
          Recent Videos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ITEMS.map((it) => (
            <VideoCard key={it.id} item={it} />
          ))}
        </div>

        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-2 rounded-full font-semibold transition-colors duration-150"
            style={{ background: "var(--color3)", color: "var(--color2)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color8)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color3)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color2)";
            }}
          >
            More Videos
          </a>
        </div>
      </div>
    </main>
  );
}

function VideoCard({ item }: { item: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [time, setTime] = useState(0);

  const [watchLater, setWatchLater] = useState<boolean>(() => {
    try {
      if (typeof window === "undefined") return false;
      return localStorage.getItem(`wl_${item.id}`) === "1";
    } catch {
      return false;
    }
  });

  const [isDragging, setIsDragging] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // flash icon state and timer refs for animated fade
  const [flashIcon, setFlashIcon] = useState<"play" | "pause" | null>(null);
  const [flashVisible, setFlashVisible] = useState(false);
  const flashTimeoutRef = useRef<number | null>(null);
  const flashRemoveRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current != null) window.clearTimeout(flashTimeoutRef.current);
      if (flashRemoveRef.current != null) window.clearTimeout(flashRemoveRef.current);
    };
  }, []);

  function flash(icon: "play" | "pause", ms = 420) {
    if (flashTimeoutRef.current != null) window.clearTimeout(flashTimeoutRef.current);
    if (flashRemoveRef.current != null) window.clearTimeout(flashRemoveRef.current);
    setFlashIcon(icon);
    requestAnimationFrame(() => setFlashVisible(true));

    flashTimeoutRef.current = window.setTimeout(() => {
      setFlashVisible(false);
      flashRemoveRef.current = window.setTimeout(() => {
        setFlashIcon(null);
        flashRemoveRef.current = null;
      }, 240) as unknown as number;
      flashTimeoutRef.current = null;
    }, ms) as unknown as number;
  }

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    function onLoaded() {
      if (!v) return;
      setDuration(v.duration || 0);
    }
    function onTime() {
      if (!v) return;
      setTime(v.currentTime);
    }
    function onEnded() {
      setIsPlaying(false);
      setIsActive(false);
      try {
        if (v) v.currentTime = 0;
      } catch {}
    }
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(`wl_${item.id}`, watchLater ? "1" : "0");
      }
    } catch {}
  }, [watchLater, item.id]);

  // Listen for global play events and pause this video if another one starts
  useEffect(() => {
    function onGlobalPlay(e: Event) {
      try {
        const detail: any = (e as CustomEvent).detail;
        if (!detail || detail.id === item.id) return;
        const v = videoRef.current;
        if (v && !v.paused) {
          v.pause();
          setIsPlaying(false);
        }
      } catch {}
    }
    window.addEventListener("globalVideoPlay", onGlobalPlay as EventListener);
    return () => window.removeEventListener("globalVideoPlay", onGlobalPlay as EventListener);
  }, [item.id]);

  function showTempToast(msg: string) {
    const el = document.createElement("div");
    el.textContent = msg;
    Object.assign(el.style, {
      position: "fixed",
      right: "18px",
      bottom: "18px",
      background: "rgba(0,0,0,0.8)",
      color: "white",
      padding: "8px 12px",
      borderRadius: "8px",
      zIndex: 99999,
      fontSize: "13px",
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }

  function openNewWindow(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
    setShowShareModal(false);
  }

  async function copyToClipboard(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      showTempToast("Link copied to clipboard");
      setShowShareModal(false);
    } catch {
      showTempToast("Could not copy link");
    }
  }

  function handleShareTarget(target: string) {
    const url = (typeof window !== "undefined" ? window.location.origin : "") + item.src;
    const title = `${item.artist} — ${item.title}`;
    const text = `${title} ${url}`;

    switch (target) {
      case "copy":
        copyToClipboard(url);
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text)}`;
        setShowShareModal(false);
        break;
      case "whatsapp":
        openNewWindow(`https://wa.me/?text=${encodeURIComponent(text)}`);
        break;
      case "telegram":
        openNewWindow(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case "twitter":
        openNewWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case "facebook":
        openNewWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case "linkedin":
        openNewWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case "sms":
        window.location.href = `sms:?&body=${encodeURIComponent(text)}`;
        setShowShareModal(false);
        break;
      default:
        setShowShareModal(false);
        break;
    }
  }

  const handleShare = async () => {
    const url = (typeof window !== "undefined" ? window.location.origin : "") + item.src;
    const title = `${item.artist} — ${item.title}`;
    const nav: any = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav && typeof nav.share === "function") {
      try {
        await nav.share({ title, url, text: title });
        return;
      } catch {
        // fallback to modal
      }
    }
    setShowShareModal(true);
  };

  function openSource() {
    try {
      const v = videoRef.current;
      if (v && !v.paused) {
        v.pause();
        setIsPlaying(false);
      }
    } catch {}
    window.open(item.src, "_blank");
  }

  function seekToClientX(clientX: number) {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const v = videoRef.current;
    if (!v || !isFinite(v.duration)) return;
    v.currentTime = ratio * v.duration;
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!isDragging) return;
      seekToClientX(e.clientX);
    }
    function onUp() {
      setIsDragging(false);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging]);

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  const progressPct = duration ? Math.min(100, (time / duration) * 100) : 0;

  async function startPlay() {
    const v = videoRef.current;
    if (!v) return;

    // notify other videos to pause before we start
    try {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("globalVideoPlay", { detail: { id: item.id } }));
      }
    } catch {}

    try {
      await v.play();
      setIsPlaying(true);
      setIsActive(true);
      // flash only when video is active
      flash("play");
    } catch {
      setIsPlaying(false);
    }
  }
  function pause() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setIsPlaying(false);
    setIsActive(true);
    flash("pause");
  }
  function togglePlay() {
    if (!isPlaying) startPlay();
    else pause();
  }

  function toggleWatchLater() {
    setWatchLater((s) => !s);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative rounded-md overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.22)]">
 
  <div className="absolute top-3 left-3 flex items-center gap-3 z-40 pointer-events-none">
          <img src={item.avatar} alt={item.artist} className="w-10 h-10 rounded-full object-cover border-2 border-white/60" />
          <div className="pointer-events-auto">
            <div className="text-sm font-semibold" style={{ color: "var(--color2)" }}>{item.artist}</div>
            <div className="text-xs" style={{ color: "var(--color2)" }}>{item.title}</div>
          </div>
        </div>

  <div className="absolute top-3 right-3 flex items-center gap-2 z-40 pointer-events-auto">
          <div className="relative">
            <button
              onClick={() => setWatchLater((s) => !s)}
              title="Watch Later"
              aria-label="Watch later"
              className="p-1.5 rounded-full z-40"
              style={{ background: "rgba(0,0,0,0.28)", color: "var(--color2)" }}
            >
              {watchLater ? <FiCheck size={16} /> : <FiClock size={16} />}
            </button>
          </div>

          <div className="relative">
            <button
              onClick={handleShare}
              title="Share"
              aria-label="Share"
              className="p-1.5 rounded-full z-40"
              style={{ background: "rgba(0,0,0,0.28)", color: "var(--color2)" }}
            >
              <FiShare2 size={16} />
            </button>
          </div>
        </div>

        {!isActive && (
          <div className="relative w-full h-[320px]">
            <img
              src={item.cover}
              alt={item.title}
              className="w-full h-[320px] object-cover cursor-pointer"
              onClick={() => {
                setIsActive(true);
                setTimeout(() => startPlay(), 60);
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <FiPlay size={20} color="white" />
              </div>
            </div>

            <button
              onClick={() => openNewWindow(YOUTUBE_URL)}
              title="Watch on YouTube"
              className="absolute left-3 bottom-3 px-3 py-1 rounded-md flex items-center gap-2 pointer-events-auto"
              style={{ background: "rgba(0,0,0,0.6)", color: "var(--color2)" }}
            >
              <FaYoutube size={18} />
              <span className="text-sm">Watch on YouTube</span>
            </button>
          </div>
        )}

        <video
          ref={videoRef}
          src={item.src}
          className={`w-full h-[320px] object-cover ${isActive ? "block" : "hidden"}`}
          playsInline
          onClick={() => {
            // clicking the video toggles play/pause and flashes icon
            togglePlay();
          }}
        />

        {/* FLASH ICON: appears briefly on play/pause with fade animation but only while video is active */}
        {isActive && flashIcon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
            <div
              aria-hidden={true}
              style={{
                width: 80,
                height: 80,
                borderRadius: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.6)",
                transition: "opacity 240ms ease, transform 240ms ease",
                opacity: flashVisible ? 1 : 0,
                transform: flashVisible ? "scale(1)" : "scale(0.88)",
              }}
            >
              {flashIcon === "play" ? <FiPlay size={28} color="white" /> : <FiPause size={28} color="white" />}
            </div>
          </div>
        )}

        {/* overlay controls shown ONLY when video is active */}
        {isActive && (
          <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
            <div className="p-3 pointer-events-auto">
              <div className="flex items-center justify-between">
                {/* LEFT: Play/Pause small control (for video) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-black/60"
                    style={{ color: "var(--color2)" }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
                  </button>
                </div>

                {/* CENTER: Clickable/draggable progress bar (for video) */}
                <div className="flex-1 px-4">
                  <div
                    ref={progressBarRef}
                    className="h-2 bg-white/20 rounded-md relative cursor-pointer"
                    onClick={(e) => {
                      const ev = e as React.MouseEvent;
                      seekToClientX(ev.clientX);
                    }}
                    onMouseDown={(e) => {
                      setIsDragging(true);
                      seekToClientX((e as React.MouseEvent).clientX);
                    }}
                  >
                    <div className="absolute left-0 top-0 h-2 bg-[var(--color3)] rounded-md" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>

                {/* RIGHT: YouTube + fullscreen (for video) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openNewWindow(YOUTUBE_URL)}
                    title="Watch on YouTube"
                    className="px-3 py-1 rounded-md bg-black/60 flex items-center gap-2"
                    style={{ color: "var(--color2)" }}
                  >
                    <FaYoutube size={14} />
                    <span className="text-sm">YouTube</span>
                  </button>

                  <button
                    onClick={openSource}
                    title="Watch full screen"
                    className="p-2 rounded-full bg-black/60"
                    aria-label="Open original video"
                    style={{ color: "var(--color2)" }}
                  >
                    <FiMaximize2 size={14} />
                  </button>
                </div>
              </div>

              {/* time display */}
              <div className="mt-2 text-xs text-[var(--color2)] text-right">
                {formatTime(time)} / {formatTime(duration || 0)}
              </div>
            </div>
          </div>
        )}

      </div>

      {showShareModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-60 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowShareModal(false)} aria-hidden="true" />
          <div className="relative w-full max-w-md mx-4 mb-6 md:mb-0 rounded-lg bg-white shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Share</div>
                <button onClick={() => setShowShareModal(false)} className="text-sm px-2" aria-label="Close share options">Close</button>
              </div>
              <div className="text-xs text-gray-600 mt-1">Share the video link with apps or copy it.</div>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3">
              <button onClick={() => handleShareTarget("copy")} className="p-3 rounded bg-gray-50 text-left">Copy Link</button>
              <button onClick={() => handleShareTarget("email")} className="p-3 rounded bg-gray-50 text-left">Email</button>
              <button onClick={() => handleShareTarget("whatsapp")} className="p-3 rounded bg-gray-50 text-left">WhatsApp</button>
              <button onClick={() => handleShareTarget("telegram")} className="p-3 rounded bg-gray-50 text-left">Telegram</button>
              <button onClick={() => handleShareTarget("twitter")} className="p-3 rounded bg-gray-50 text-left">Twitter</button>
              <button onClick={() => handleShareTarget("facebook")} className="p-3 rounded bg-gray-50 text-left">Facebook</button>
              <button onClick={() => handleShareTarget("linkedin")} className="p-3 rounded bg-gray-50 text-left">LinkedIn</button>
              <button onClick={() => handleShareTarget("sms")} className="p-3 rounded bg-gray-50 text-left">SMS</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
