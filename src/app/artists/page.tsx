import React from "react";

type Artist = {
  name: string;
  src: string;
  href: string;
};

const artists: Artist[] = [
  { name: "Bob Kay", src: "/images/artist1.jpg", href: "#" },
  { name: "Beyonce", src: "/images/artist2.jpg", href: "#" },
  { name: "Brymo", src: "/images/artist3.jpg", href: "#" },
  { name: "Major AJ", src: "/images/artist4.jpg", href: "#" },
  { name: "Tariq", src: "/images/artist5.jpg", href: "#" },
  { name: "Neon Dave", src: "/images/artist6.jpg", href: "#" },
];

function InlineArtistCard({ name, src, href }: Artist) {
  return (
    <a href={href} aria-label={`View ${name}`} className="block w-full">
      <div className="rounded-lg overflow-hidden shadow-lg bg-transparent hover:scale-105 transition-transform duration-200">
        <img src={src} alt={name} className="w-full h-56 object-cover" draggable={false} />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-color4">{name}</h3>
        </div>
      </div>
    </a>
  );
}

export default function ArtistsPage() {
  return (
    <div className="container pt-0 pb-12">
      <header className="mb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-color4">Our Artists</h1>
        <p className="text-color2 max-w-2xl mx-auto">Meet the talented roster on our record label.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((a) => (
          <InlineArtistCard key={a.name} {...a} />
        ))}
      </section>
    </div>
  );
}
