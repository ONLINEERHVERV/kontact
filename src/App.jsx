import { useState, useEffect, useRef } from "react";

// ─── FONTS ─────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Instrument+Serif:ital@0;1&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const BLUE = "#1a3fff";
const DARK = "#06091a";
const MUTED = "#64748b";
const SANS = "'Poppins', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";
const CALENDLY = "https://calendly.com/onlineerhverv/uforpligtende-samtale";
const MAPS_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.231394862944!2d12.573269213320954!3d55.73710839308657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652444b60193baf%3A0x6508ed3ee46e7354!2sOnline%20Erhverv%20ApS!5e0!3m2!1sen!2sdk!4v1771241611733!5m2!1sen!2sdk";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

const icons = {
  mail: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
  phone: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
  pin: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
  clock: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  calendar: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>,
  support: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>,
  arrow: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
};

const Tag = ({ children }) => (
  <span style={{
    display: "inline-block", fontFamily: SANS, fontSize: 12, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase",
    padding: "6px 16px", borderRadius: 100,
    background: `${BLUE}0d`, color: BLUE,
  }}>{children}</span>
);

// ─── HERO ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      padding: "80px 32px 60px",
      background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${BLUE}10 0%, transparent 70%), #fff`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: `linear-gradient(${DARK} 1px, transparent 1px), linear-gradient(90deg, ${DARK} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal><Tag>Kontakt</Tag></Reveal>
        <Reveal delay={0.1}>
          <h1 style={{ fontFamily: SANS, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, color: DARK, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "28px 0 20px" }}>
            Lad os{" "}<span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE, fontWeight: 400 }}>høre fra dig</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontFamily: SANS, fontSize: 19, color: MUTED, lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
            Uanset om du har spørgsmål om et kursus, vil høre mere om vores ydelser eller er nysgerrig på AI-implementering — vi svarer inden for 24 timer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ───────────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleSubmit = () => { setSubmitted(true); setTimeout(() => setSubmitted(false), 4000); };

  const inputStyle = {
    fontFamily: SANS, fontSize: 15, padding: "14px 18px",
    borderRadius: 12, border: "1px solid #e2e8f0", outline: "none",
    width: "100%", background: "#fff", color: DARK, transition: "border-color 0.2s ease",
  };
  const labelStyle = { fontFamily: SANS, fontSize: 14, fontWeight: 600, color: DARK, marginBottom: 8, display: "block" };

  return (
    <section style={{ padding: "20px 32px 100px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 64, alignItems: "start" }}>

          {/* Left — contact info */}
          <Reveal>
            <div style={{ position: "sticky", top: 40 }}>
              <div style={{ background: DARK, borderRadius: 24, padding: "40px 32px", color: "#fff" }}>
                <h3 style={{ fontFamily: SANS, fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Kontaktinformation</h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: "#94a3b8", lineHeight: 1.5, margin: "0 0 32px" }}>Skriv, ring eller book et møde — vi er her for at hjælpe.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { icon: icons.mail, label: "E-mail", value: "hej@onlineerhverv.dk", href: "mailto:hej@onlineerhverv.dk" },
                    { icon: icons.phone, label: "Telefon", value: "+45 93 94 12 06", href: "tel:+4593941206" },
                    { icon: icons.pin, label: "Adresse", value: "Strandvejen 126, Hellerup" },
                    { icon: icons.clock, label: "Support", value: "Hverdage 10-17, lør 12-14" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.08)", color: "#93b4ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: "#7a8ba8", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                        {item.href ? (
                          <a href={item.href} style={{ fontFamily: SANS, fontSize: 15, color: "#fff", textDecoration: "none", fontWeight: 500 }}>{item.value}</a>
                        ) : (
                          <span style={{ fontFamily: SANS, fontSize: 15, color: "#fff", fontWeight: 500 }}>{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "32px 0" }} />

                {/* Booking CTA */}
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", gap: 14, alignItems: "center",
                  padding: "16px 18px", borderRadius: 14,
                  background: BLUE, textDecoration: "none",
                  transition: "all 0.25s ease",
                }} onMouseEnter={e => e.currentTarget.style.background = "#0026e0"} onMouseLeave={e => e.currentTarget.style.background = BLUE}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.15)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icons.calendar}</div>
                  <div>
                    <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: "#fff" }}>Book et uforpligtende møde</div>
                    <div style={{ fontFamily: SANS, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>15 min · gratis · ingen forpligtelser</div>
                  </div>
                </a>

                <a href="#" style={{
                  display: "flex", gap: 14, alignItems: "center",
                  padding: "14px 18px", borderRadius: 14, marginTop: 10,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none", transition: "all 0.25s ease",
                }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}>
                  <div style={{ color: "#93b4ff", flexShrink: 0 }}>{icons.support}</div>
                  <div>
                    <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: "#fff" }}>Brug for hjælp med kurset?</div>
                    <div style={{ fontFamily: SANS, fontSize: 12, color: "#7a8ba8" }}>support@onlineerhverv.dk</div>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.15}>
            <div style={{ background: "#f8fafc", borderRadius: 24, padding: "44px 40px", border: "1px solid #e8ecf4" }}>
              <h3 style={{ fontFamily: SANS, fontSize: 24, fontWeight: 700, color: DARK, margin: "0 0 6px" }}>Skriv til os</h3>
              <p style={{ fontFamily: SANS, fontSize: 15, color: MUTED, margin: "0 0 32px", lineHeight: 1.5 }}>Udfyld formularen, så vender vi tilbage inden for 24 timer.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Navn</label>
                  <input type="text" placeholder="Dit navn" value={formData.name} onChange={e => handleChange("name", e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>
                <div>
                  <label style={labelStyle}>E-mail</label>
                  <input type="email" placeholder="din@email.dk" value={formData.email} onChange={e => handleChange("email", e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Telefon</label>
                  <input type="tel" placeholder="+45 12 34 56 78" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                </div>
                <div>
                  <label style={labelStyle}>Emne</label>
                  <select value={formData.subject} onChange={e => handleChange("subject", e.target.value)} style={{
                    ...inputStyle, appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: 44,
                    color: formData.subject ? DARK : MUTED,
                  }} onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = "#e2e8f0"}>
                    <option value="" disabled>Vælg emne</option>
                    <option value="kurser">Spørgsmål om kurser</option>
                    <option value="ydelser">Spørgsmål om ydelser</option>
                    <option value="ai">AI-implementering</option>
                    <option value="samarbejde">Samarbejde / partnerskab</option>
                    <option value="andet">Andet</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Besked</label>
                <textarea placeholder="Fortæl os hvad du har brug for..." value={formData.message} onChange={e => handleChange("message", e.target.value)} rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: 130 }} onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
              </div>

              <button onClick={handleSubmit} style={{
                fontFamily: SANS, fontSize: 16, fontWeight: 600, padding: "16px 36px", borderRadius: 12,
                border: "none", cursor: "pointer", background: submitted ? "#16a34a" : BLUE,
                color: "#fff", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "all 0.3s ease",
              }}>
                {submitted ? (
                  <><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.75l6 6 9-13.5" /></svg>Tak! Vi vender tilbage</>
                ) : (
                  <>Få svar inden for 24 timer {icons.arrow}</>
                )}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── MAP + KONTOR ──────────────────────────────────────────────────────
function MapSection() {
  return (
    <section style={{ padding: "80px 32px 100px", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Tag>Vores kontor</Tag>
            <h2 style={{ fontFamily: SANS, fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: DARK, margin: "20px 0 12px", letterSpacing: "-0.03em" }}>
              Vores kontor i{" "}<span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE, fontWeight: 400 }}>Hellerup</span>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 17, color: MUTED, maxWidth: 460, margin: "0 auto", lineHeight: 1.6 }}>Vi sidder i Hellerup, men hjælper dig uanset hvor du er i Danmark.</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "start" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #e8ecf4" }}>
              <iframe src={MAPS_SRC} width="100%" height="380" style={{ border: 0, display: "block" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Online Erhverv kontor" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Adresse", value: "Strandvejen 126, 2900 Hellerup" },
                { label: "E-mail", value: "hej@onlineerhverv.dk" },
                { label: "Telefon", value: "+45 93 94 12 06" },
                { label: "Support", value: "Hverdage 10-17, lør 12-14" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "20px 22px", border: "1px solid #e8ecf4" }}>
                  <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontFamily: SANS, fontSize: 15, color: DARK, fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: BLUE, color: "#fff", fontFamily: SANS, fontSize: 15, fontWeight: 600,
                padding: "16px 24px", borderRadius: 14, textDecoration: "none", transition: "all 0.25s ease",
              }} onMouseEnter={e => e.currentTarget.style.background = "#0026e0"} onMouseLeave={e => e.currentTarget.style.background = BLUE}>
                {icons.arrow} Book et uforpligtende møde — 15 min
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight; // Get full content height
      window.parent.postMessage({ type: "setHeight", height }, "*");
    };

    sendHeight(); // initial height

    // Update on resize
    window.addEventListener("resize", sendHeight);

    // Optional: observe dynamic content changes (like FAQ toggles)
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", sendHeight);
      observer.disconnect();
    };
  }, []);
  return (
    <div style={{ overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        input, select, textarea { font-family: 'Poppins', system-ui, sans-serif; }
        input::placeholder, textarea::placeholder { color: #94a3b8; }
        input:focus, select:focus, textarea:focus { outline: none; }
        @media (max-width: 900px) {
          section > div > div[style*="grid-template-columns: 380px"],
          section > div > div[style*="grid-template-columns: 1.4fr"] {
            grid-template-columns: 1fr !important; gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          section > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Hero />
      <ContactSection />
      <MapSection />
    </div>
  );
}
