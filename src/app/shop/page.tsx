"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { FiShoppingCart, FiHeart, FiTag, FiMusic } from "react-icons/fi";
import { FaSpotify, FaApple } from "react-icons/fa";

type Product = {
  id: string;
  title: string;
  artist?: string;
  price: string;
  type: "merch" | "music" | "bundle" | "ticket";
  image?: string;
  badge?: string;
};

const ACCENT = "var(--color3)";

const PRODUCTS: Product[] = [
 
  { id: "p1", title: "Pain (Live performance)", artist: "Bob Kay", price: "₦1,200", type: "music", badge: "Vinyl", image: "/images/artist1.jpg" },
  { id: "p2", title: "London (Live performance)", artist: "Tarik", price: "₦1,500", type: "music", image: "/images/cover1.jpg" },
  { id: "p3", title: "Joro", artist: "Brymo", price: "₦1,000", type: "music", image: "/images/cover3.jpg" },
  { id: "p4", title: "Must Have Been", artist: "Major AJ", price: "₦1,100", type: "music", image: "/images/artist6.jpg" },
  { id: "p5", title: "Streetlights", artist: "Tariq", price: "₦900", type: "music", image: "/images/artist5.jpg" },
  { id: "p6", title: "Believe", artist: "Brymo", price: "₦1,300", type: "music", image: "/images/cover2.jpg" },
  { id: "p7", title: "Mama Tears (Limited)", artist: "Beyonce", price: "₦2,000", type: "music", image: "/images/artist2.jpg" },
  { id: "p8", title: "Go Crazy", artist: "Bob Kay", price: "₦6,500", type: "merch", image: "/images/blog-8.jpg" },
  { id: "p9", title: "Sinner (Signed)", artist: "Brymo", price: "₦5,000", type: "merch", image: "/images/blog-9.jpg" },
  { id: "p10",title: "Live Show Ticket — Lagos", price: "₦15,500", type: "ticket", image: "/images/constanceGoodOldDays.jpg" },

];

const CATEGORIES = [
  { id: "all", name: "All", icon: FiTag },
  { id: "music", name: "Music", icon: FaSpotify },
  { id: "merch", name: "Merch", icon: FiMusic },
  { id: "bundle", name: "Bundles", icon: FiHeart },
  { id: "ticket", name: "Tickets", icon: FaApple },
];

export default function ShopPage(): React.ReactElement {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [cartCount, setCartCount] = useState(0);
  const { addItem, items } = useCart();
  const [selected, setSelected] = useState<Product | null>(null);

  // newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "subscribed">("idle");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const filtered = PRODUCTS.filter((p) => {
    if (category !== "all" && p.type !== category) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (p.title || "").toLowerCase().includes(q) || (p.artist || "").toLowerCase().includes(q);
  });

  function addToCart(p: Product) {
    setCartCount((c) => c + 1);
    addItem({ id: p.id, title: p.title, price: p.price, image: p.image });
  }

  function handleSubscribe() {
    setNewsletterError(null);

    if (!newsletterEmail || !EMAIL_RE.test(newsletterEmail.trim())) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    setSubscribeStatus("loading");

    setTimeout(() => {
      setSubscribeStatus("subscribed");

      setTimeout(() => {
        setSubscribeStatus("idle");
        setNewsletterEmail("");
      }, 1400);
    }, 900);
  }

  return (
  <main className="min-h-screen pt-8 md:pt-2 pb-16" style={{ background: "var(--color1, #000)" }}>
      <div className="max-w-7xl mx-auto px-6">
      
        <section className="relative rounded-lg overflow-hidden mb-10 shadow-lg bg-gradient-to-tr from-[#0b0b0b] to-[#121212]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-8 md:p-12">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: "var(--color2)" }}>
                Official Shop — Talent World
              </h1>
              <p className="text-sm md:text-base text-white/70 max-w-xl mb-6">
                Official vinyls, merch, bundles and tickets from our roster. Limited drops and signed items — shop safely and support the artists.
              </p>

              <div className="flex gap-3 flex-wrap">
                <a href="#products" className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold" style={{ background: ACCENT, color: "var(--color2)" }}>
                  Shop Now
                </a>
                <a href="#featured" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 text-white">Latest Drops</a>
              </div>

              <div className="mt-6 flex gap-4 text-white/70">
                <div className="inline-flex items-center gap-2 text-sm">
                  <FaSpotify /> <span>Stream</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm">
                  <FaApple /> <span>Buy</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm">
                  <FiMusic /> <span>Vinyls</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">

              <div className="w-full md:w-72 h-56 md:h-72 rounded-xl overflow-hidden shadow-xl relative">
                <img src="/images/cover1.jpg" alt="Featured cover" className="w-full h-full object-cover block" />
                <div className="absolute inset-0 flex items-end justify-start p-4">
                  <div className="text-left text-white p-3 bg-black/30 backdrop-blur-sm rounded-md max-w-xs">
                    <div className="text-xs uppercase opacity-60">Featured</div>
                    <div className="text-2xl font-bold mt-2">I.T.T</div>
                    <div className="text-sm mt-1">Brymo — Limited Vinyl</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category filters + search + cart */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3 overflow-auto pb-1 hide-scrollbar">
            {CATEGORIES.map((c) => {
              const Icon = c.icon as any;
              const active = category === (c.id === "all" ? "all" : c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    active ? "bg-[var(--color3)] text-[var(--color2)]" : "bg-white/6 text-white"
                  }`}
                >
                  <Icon />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search albums, merch, artists..."
                className="rounded-full px-4 py-2 bg-white/6 placeholder:text-white/60 outline-none w-48 md:w-60" style={{ color: "var(--color5)" }}
              />
            </div>

            <Link href="/cart" className="relative inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/6 text-white" aria-label="Cart">
              <FiShoppingCart />
              <span>Cart</span>
              {cartCount > 0 && <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color3)] text-[var(--color2)] text-xs">{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* Featured / Latest Drops */}
        <section id="featured" className="mb-8">
          <h2 className="text-2xl font-extrabold text-white mb-4">Latest Drops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 3).map((p) => (
              <div key={p.id} className="rounded-xl overflow-hidden bg-white/5 p-4">
                <div className="h-44 rounded-md mb-3 overflow-hidden relative">
                  {p.image ? (
                    <>
                      <img src={p.image} alt={`${p.title} artwork`} className="w-full h-full object-cover block" />
                      <div className="absolute inset-0 flex items-end p-4">
                        <div className="w-full bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 rounded-md text-white">
                          <div className="text-sm opacity-70">{p.artist}</div>
                          <div className="text-lg font-semibold">{p.title}</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="h-full rounded-md bg-gradient-to-tr from-[#0b0b0b] to-[#121212] flex items-center justify-center text-white">
                      <div>
                        <div className="text-sm opacity-70">{p.artist}</div>
                        <div className="text-lg font-semibold">{p.title}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/80">{p.price}</div>
                    {p.badge && <div className="text-xs text-[var(--color3)]">{p.badge}</div>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelected(p)} className="px-3 py-1 rounded-md bg-white/6">Details</button>
                    <button onClick={() => {}} className="px-3 py-1 rounded-md bg-[var(--color3)] text-[var(--color2)]">Buy</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section id="products">
          <h2 className="text-2xl font-extrabold text-white mb-4">Shop</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <article key={p.id} className="rounded-lg overflow-hidden bg-white/5 p-4 flex flex-col">
                <div className="h-48 rounded-md mb-4 overflow-hidden relative">
                  {p.image ? (
                    <>
                      <img src={p.image} alt={`${p.title} artwork`} className="w-full h-full object-cover block" />
                      <div className="absolute inset-0 flex items-end p-4">
                        <div className="w-full bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 rounded-md text-white">
                          <div className="text-xs opacity-80">{p.type.toUpperCase()}</div>
                          <div className="font-bold mt-1">{p.title}</div>
                          {p.artist && <div className="text-sm opacity-80 mt-1">{p.artist}</div>}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="h-full rounded-md bg-gradient-to-tr from-[#0b0b0b] to-[#121212] mb-4 flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-xs opacity-60">{p.type.toUpperCase()}</div>
                        <div className="font-bold mt-1">{p.title}</div>
                        {p.artist && <div className="text-sm opacity-80 mt-1">{p.artist}</div>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <div>
                    <div className="text-white font-semibold">{p.price}</div>
                    {p.badge && <div className="text-xs text-[var(--color3)]">{p.badge}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelected(p)} className="px-3 py-2 rounded-md bg-white/6">Details</button>
                    <button onClick={() => {}} className="px-3 py-2 rounded-md bg-[var(--color3)] text-[var(--color2)] inline-flex items-center gap-2">
                      <FiShoppingCart /> Buy
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && <div className="mt-6 text-white/60">No products found for your search.</div>}
        </section>

        {/* Newsletter / Footer CTA */}
        <section className="mt-12 bg-white/6 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Join the Fam</h3>
            <p className="text-sm text-white/80">Sign up for drops, exclusive merch & presales.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto items-center">
            <div className="relative">
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email"
                className="rounded-full px-4 py-2 bg-white/8 w-full md:w-64 outline-none"
                aria-label="newsletter-email"
                style={{ color: "var(--color5)" }}
              />
              {newsletterError && <div className="text-xs text-[var(--color3)] mt-1">{newsletterError}</div>}
            </div>

            <button
              onClick={handleSubscribe}
              className="px-4 py-2 rounded-full"
              style={{ background: subscribeStatus === "subscribed" ? "var(--color2)" : ACCENT, color: subscribeStatus === "subscribed" ? "var(--color1)" : "var(--color2)" }}
              disabled={subscribeStatus === "loading"}
            >
              {subscribeStatus === "loading" ? "Subscribing..." : subscribeStatus === "subscribed" ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </section>
      </div>

      {/* Product modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative max-w-lg w-full mx-4 bg-[#0b0b0b] rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">{selected.title}</h3>
            {selected.artist && <div className="text-sm mb-4 text-white/70">{selected.artist}</div>}
            <div className="h-40 rounded-md mb-4 overflow-hidden">
              {selected.image ? (
                <img src={selected.image} alt={`${selected.title} artwork`} className="w-full h-full object-cover" />
              ) : (
                <div className="h-full rounded-md bg-gradient-to-tr from-[#0b0b0b] to-[#121212] mb-4 flex items-center justify-center text-white">Product image</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{selected.price}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (!items.some((it) => it.id === selected.id)) {
                        addToCart(selected);
                      }
                    }}
                    disabled={items.some((it) => it.id === selected.id)}
                    className={`${items.some((it) => it.id === selected.id) ? "px-4 py-2 rounded-md bg-white/6 text-white opacity-70 cursor-not-allowed" : "px-4 py-2 rounded-md bg-[var(--color3)] text-[var(--color2)]"}`}
                  >
                    {items.some((it) => it.id === selected.id) ? "Added to cart" : "Add to cart"}
                  </button>
                  <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-md bg-white/6">Close</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
