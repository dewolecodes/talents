"use client";

import React, { useState } from "react";

export default function Page(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [btnHover, setBtnHover] = useState(false);
  const [btnActive, setBtnActive] = useState(false);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(): boolean {
    const e: { name?: string; email?: string } = {};

    if (!name.trim()) e.name = "The field is required.";
    if (!email.trim()) e.email = "The field is required.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "Please enter a valid email address.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev?: React.FormEvent) {
    if (ev) ev.preventDefault();
    setSubmitted(false);

    if (!validate()) return;

    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 900));

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    }, 1400);
  }

  function handleEmailBlur() {
    setErrors((prev) => {
      const next = { ...prev };
      if (!email.trim()) next.email = "The field is required.";
      else if (!EMAIL_RE.test(email.trim())) next.email = "Please enter a valid email address.";
      else delete next.email;
      return next;
    });
  }

  return (
    <main className="min-h-screen pt-0 sm:pt-1 md:pt-2 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl mx-auto w-full mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start w-full">
        
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: "var(--color3)" }}>
                Talent World
              </h2>
              <p className="text-[var(--color2)] mb-5">
                We look forward to connecting with you! Please do not hesitate to reach out to us.
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 text-[var(--color3)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M21 15.46V19a2 2 0 01-2 2 19 19 0 01-8.63-2.53A19 19 0 014.53 7.63 19 19 0 012 1.63 2 2 0 014 0h3.54a2 2 0 012 1.72c.12 1.02.37 2.02.73 2.96a2 2 0 01-.45 2L8.8 8.8a16.01 16.01 0 006.4 6.4l1.12-1.12a2 2 0 012-.45c.94.36 1.94.61 2.96.73A2 2 0 0124 16.46z" />
                  </svg>
                  <div>
                    <div className="text-[var(--color2)] font-semibold">+234 901 047 5575</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 text-[var(--color3)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M3 6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v11A2.5 2.5 0 0118.5 20h-13A2.5 2.5 0 013 17.5v-11zM4 6.75l8 5 8-5" />
                  </svg>
                  <div>
                    <div className="text-[var(--color2)] font-semibold">abdulrahmonakinbola@gmail.com</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 flex-shrink-0 text-[var(--color3)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 21s-6.5-5.2-6.5-10A6.5 6.5 0 0112 4.5 6.5 6.5 0 0118.5 11c0 4.8-6.5 10-6.5 10z" />
                  </svg>
                  <div>
                    <div className="text-[var(--color2)] font-semibold">Lagos, Nigeria.</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="w-full">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: "var(--color3)" }}>
                Opening Hours
              </h3>

              <div className="space-y-3 text-[var(--color2)] w-full">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Monday:</span>
                  <span className="font-semibold">9:00am – 05:00pm</span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Tuesday:</span>
                  <span className="font-semibold">9:00am – 05:00pm</span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Wednesday:</span>
                  <span className="font-semibold">9:00am – 05:00pm</span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Thursday:</span>
                  <span className="font-semibold">9:00am – 05:00pm</span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Friday:</span>
                  <span className="font-semibold">9:00am – 05:00pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24 md:mt-32 bg-transparent">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6" style={{ color: "var(--color3)" }}>
            Send message
          </h2>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
              <div className="w-full">
                <input
                  aria-label="Your name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={[
                    "w-full rounded-full px-6 py-3 outline-none transition-all duration-150",
                    "bg-[var(--color2)] text-[var(--color5)]",
                    errors.name ? "ring-2 ring-[var(--color8)]" : "ring-0",
                  ].join(" ")}
                />

                {errors.name && (
                  <div className="mt-2 text-center text-[var(--color2)] text-sm">{errors.name}</div>
                )}
              </div>

              <div className="w-full">
                <input
                  aria-label="Your email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  onBlur={handleEmailBlur}
                  className={[
                    "w-full rounded-full px-6 py-3 outline-none transition-all duration-150",
                    "bg-[var(--color2)] text-[var(--color5)]",
                    errors.email ? "ring-2 ring-[var(--color8)]" : "ring-0",
                  ].join(" ")}
                />

                {errors.email && (
                  <div className="mt-2 text-center text-[var(--color2)] text-sm">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <textarea
                aria-label="Message"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[140px] rounded-lg px-6 py-4 resize-y outline-none transition-all duration-150 bg-[var(--color2)] text-[var(--color5)]"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                disabled={isSubmitting}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => {
                  setBtnHover(false);
                  setBtnActive(false);
                }}
                onMouseDown={() => setBtnActive(true)}
                onMouseUp={() => setBtnActive(false)}
                className="inline-flex items-center justify-center px-8 py-2 rounded-full font-semibold shadow-[0_6px_0_rgba(0,0,0,0.25)] select-none transition-colors duration-150"
                style={{
                  background: btnActive ? "var(--color2)" : btnHover ? "var(--color8)" : submitted ? "var(--color2)" : "var(--color3)",
                  color: btnActive ? "var(--color1)" : btnHover ? "var(--color3)" : submitted ? "var(--color1)" : "var(--color2)",
                }}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
