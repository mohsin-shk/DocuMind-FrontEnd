import { useState, useEffect, useRef, type FC } from "react";
import { Link } from "react-router-dom";
// ─── Types ───────────────────────────────────────────────────────────────────
interface Node {
  label: string;
  x: number;
  color: string;
}

interface Particle {
  fromX: number;
  toX: number;
  y: number;
  t: number;
  speed: number;
  color: string;
  r: number;
}

interface FeatCardProps {
  icon: string;
  title: string;
  desc: string;
}

interface StepProps {
  num: string;
  title: string;
  desc: string;
  last: boolean;
}

interface TypeWriterProps {
  texts: string[];
  speed?: number;
}

// ─── Animated Pipeline Canvas ────────────────────────────────────────────────
const PipelineCanvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const particles = useRef<Particle[]>([]);

  const NODES: Node[] = [
    { label: "Upload",   x: 0.07,  color: "#22c55e" },
    { label: "Extract",  x: 0.245, color: "#4ade80" },
    { label: "Chunk",    x: 0.42,  color: "#86efac" },
    { label: "Embed",    x: 0.595, color: "#4ade80" },
    { label: "Pinecone", x: 0.77,  color: "#22c55e" },
    { label: "Answer",   x: 0.935, color: "#16a34a" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const mkParticle = (a: Node, b: Node): Particle => ({
      fromX: a.x, toX: b.x, y: 0.5,
      t: Math.random(),
      speed: 0.0028 + Math.random() * 0.0025,
      color: a.color,
      r: 2 + Math.random() * 1.8,
    });

    for (let i = 0; i < NODES.length - 1; i++)
      for (let j = 0; j < 5; j++)
        particles.current.push(mkParticle(NODES[i], NODES[i + 1]));

    let lastSpawn = 0;

    const draw = (ts: number) => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // edges
      for (let i = 0; i < NODES.length - 1; i++) {
        const ax = NODES[i].x * W, bx = NODES[i + 1].x * W, my = H * 0.5;
        const g = ctx.createLinearGradient(ax, my, bx, my);
        g.addColorStop(0, NODES[i].color + "40");
        g.addColorStop(1, NODES[i + 1].color + "40");
        ctx.beginPath();
        ctx.moveTo(ax, my); ctx.lineTo(bx, my);
        ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
      }

      // nodes
      NODES.forEach(n => {
        const nx = n.x * W, ny = H * 0.5;
        const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, 32);
        glow.addColorStop(0, n.color + "28"); glow.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(nx, ny, 32, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
        ctx.beginPath(); ctx.arc(nx, ny, 16, 0, Math.PI * 2);
        ctx.strokeStyle = n.color + "99"; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(nx, ny, 6, 0, Math.PI * 2);
        ctx.fillStyle = n.color; ctx.fill();
      });

      // particles
      particles.current.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const px = (p.fromX + (p.toX - p.fromX) * p.t) * W;
        const py = p.y * H;
        ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "CC"; ctx.fill();
      });

      // spawn
      if (ts - lastSpawn > 500) {
        const idx = Math.floor(Math.random() * (NODES.length - 1));
        particles.current.push(mkParticle(NODES[idx], NODES[idx + 1]));
        if (particles.current.length > 90) particles.current.shift();
        lastSpawn = ts;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: 128 }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "0 4%" }}>
        {NODES.map(n => (
          <span key={n.label} style={{ fontSize: "0.62rem", fontWeight: 600, color: "var(--dm-muted)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>
            {n.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Typewriter ──────────────────────────────────────────────────────────────
const TypeWriter: FC<TypeWriterProps> = ({ texts, speed = 58 }) => {
  const [display, setDisplay] = useState<string>("");
  const [idx, setIdx]         = useState<number>(0);
  const [ch, setCh]           = useState<number>(0);
  const [del, setDel]         = useState<boolean>(false);

  useEffect(() => {
    const cur = texts[idx % texts.length];
    const t = setTimeout(() => {
      if (!del) {
        setDisplay(cur.slice(0, ch + 1));
        if (ch + 1 === cur.length) {
          setTimeout(() => setDel(true), 1800);
        } else {
          setCh(c => c + 1);
        }
      } else {
        setDisplay(cur.slice(0, ch - 1));
        if (ch - 1 === 0) {
          setDel(false);
          setIdx(i => (i + 1) % texts.length);
          setCh(0);
        } else {
          setCh(c => c - 1);
        }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [ch, del, idx, texts, speed]);

  return (
    <span style={{ color: "var(--dm-primary)", fontWeight: 600 }}>
      {display}
      <span style={{ animation: "dm-blink 1s step-end infinite", color: "var(--dm-primary)" }}>|</span>
    </span>
  );
};

// ─── Feature Card ────────────────────────────────────────────────────────────
const FeatCard: FC<FeatCardProps> = ({ icon, title, desc }) => {
  const [hov, setHov] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--dm-card)",
        border: `1px solid ${hov ? "var(--dm-primary-dim)" : "var(--dm-border)"}`,
        borderRadius: 14, padding: "26px 24px",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? "0 0 24px var(--dm-primary-glow)" : "none",
        cursor: "default", position: "relative", overflow: "hidden",
      }}
    >
      {hov && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, var(--dm-primary), transparent)" }} />
      )}
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: "var(--dm-primary-subtle)",
        display: "grid", placeItems: "center",
        fontSize: "1.2rem", marginBottom: 14,
      }}>{icon}</div>
      <div style={{ fontWeight: 600, marginBottom: 7, fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}>{title}</div>
      <div style={{ fontSize: "0.855rem", color: "var(--dm-muted)", lineHeight: 1.65 }}>{desc}</div>
    </div>
  );
};

// ─── Step ────────────────────────────────────────────────────────────────────
const Step: FC<StepProps> = ({ num, title, desc, last }) => (
  <div style={{ display: "flex", gap: 18, paddingBottom: last ? 0 : 8 }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <div style={{
        width: 34, height: 34, borderRadius: "50%",
        background: "var(--dm-primary-subtle)",
        border: "1.5px solid var(--dm-primary-dim)",
        display: "grid", placeItems: "center",
        fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700,
        color: "var(--dm-primary)",
      }}>{num}</div>
      {!last && <div style={{ width: 1, flex: 1, minHeight: 28, background: "var(--dm-border)", margin: "5px 0" }} />}
    </div>
    <div style={{ paddingTop: 5, paddingBottom: last ? 0 : 28 }}>
      <div style={{ fontWeight: 600, marginBottom: 5, fontFamily: "var(--font-sans)", fontSize: "0.9rem" }}>{title}</div>
      <div style={{ fontSize: "0.845rem", color: "var(--dm-muted)", lineHeight: 1.65 }}>{desc}</div>
    </div>
  </div>
);

// ─── Main ────────────────────────────────────────────────────────────────────
const LandingPage: FC = () => {
  
  
  const [scrolled, setScrolled] = useState<boolean>(false);
  const isDark = () => document.documentElement.classList.contains("dark");
  const [dark, setDark] = useState<boolean>(isDark);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const steps: Array<{ num: string; title: string; desc: string }> = [
    { num: "01", title: "Upload your document",  desc: "Drop a PDF. DocuMind extracts raw text while preserving structure, layout, and paragraph boundaries." },
    { num: "02", title: "Semantic chunking",      desc: "Text is split into overlapping ~512-token chunks — large enough for context, small enough for precision." },
    { num: "03", title: "Generate embeddings",    desc: "Each chunk is encoded into a 1536-dimensional vector using OpenAI's embedding model." },
    { num: "04", title: "Store in Pinecone",      desc: "Vectors are upserted into your personal Pinecone namespace for instant, private retrieval." },
    { num: "05", title: "Query & retrieve",       desc: "Your question is embedded and the top-k most semantically relevant chunks are fetched in milliseconds." },
    { num: "06", title: "GPT-4o mini answers",    desc: "Retrieved context + your question → a grounded, sourced answer with the exact document reference." },
  ];

  const features: FeatCardProps[] = [
    { icon: "🔍", title: "Grounded answers",    desc: "Every response is sourced directly from your document's vector chunks. No hallucinations, no guessing." },
    { icon: "💬", title: "Persistent chat",     desc: "Full conversation history with context-aware follow-ups across sessions — just like talking to a colleague." },
    { icon: "📊", title: "Document comparison", desc: "Upload two PDFs and DocuMind highlights differences, contradictions, and overlapping clauses automatically." },
    { icon: "⚡", title: "Semantic chunking",   desc: "Paragraph-aware overlapping chunks preserve meaning and maximise retrieval precision on complex documents." },
    { icon: "🌲", title: "Pinecone storage",    desc: "High-dimensional embeddings stored in Pinecone for sub-100ms nearest-neighbour retrieval at scale." },
    { icon: "🔒", title: "Private by design",   desc: "Documents are processed and namespaced per user. Nothing crosses account boundaries." },
  ];

  interface CompareRow { a: React.ReactNode; b: React.ReactNode; }
  const compareRows: CompareRow[] = [
    { a: <><b>Liability cap:</b> $500,000 aggregate</>,  b: <><b>Liability cap:</b> $1,200,000 aggregate <span className="dm-diff">↑ CHANGED</span></> },
    { a: <><b>Termination notice:</b> 30 days</>,        b: <><b>Termination notice:</b> 60 days <span className="dm-diff">↑ CHANGED</span></> },
    { a: <><b>Governing law:</b> California</>,          b: <><b>Governing law:</b> California</> },
    { a: <><b>Auto-renewal:</b> Not present</>,          b: <><b>Auto-renewal:</b> Annual, 90-day opt-out <span className="dm-diff">NEW</span></> },
  ];

  return (
    <>
      <style>{`
        .dm-root {
          --dm-bg:             ${dark ? "oklch(0.13 0.01 250)" : "oklch(0.98 0 0)"};
          --dm-card:           ${dark ? "oklch(0.17 0.01 250)" : "oklch(0.96 0 0)"};
          --dm-card2:          ${dark ? "oklch(0.19 0.01 250)" : "oklch(0.93 0 0)"};
          --dm-border:         ${dark ? "oklch(1 0 0 / 8%)"    : "oklch(0.88 0 0)"};
          --dm-fg:             ${dark ? "oklch(0.93 0 0)"      : "oklch(0.15 0 0)"};
          --dm-muted:          ${dark ? "oklch(0.58 0.01 250)" : "oklch(0.5 0 0)"};
          --dm-primary:        ${dark ? "oklch(0.65 0.2 162)"  : "oklch(0.45 0.18 162)"};
          --dm-primary-fg:     ${dark ? "oklch(0.13 0.01 250)" : "oklch(0.98 0 0)"};
          --dm-primary-dim:    ${dark ? "oklch(0.65 0.2 162 / 35%)" : "oklch(0.55 0.18 162 / 30%)"};
          --dm-primary-subtle: ${dark ? "oklch(0.25 0.05 162)" : "oklch(0.92 0.03 162)"};
          --dm-primary-glow:   ${dark ? "oklch(0.65 0.2 162 / 12%)" : "oklch(0.55 0.18 162 / 10%)"};
          --font-sans: 'Geist Variable', sans-serif;
          background: var(--dm-bg);
          color: var(--dm-fg);
          font-family: var(--font-sans);
          min-height: 100vh;
        }
        @keyframes dm-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes dm-fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dm-pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }

        /* NAV */
        .dm-nav {
          position:fixed; top:0; left:0; right:0; z-index:100;
          display:flex; align-items:center; justify-content:space-between;
          padding:0 48px; height:56px;
          transition:background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
          border-bottom:1px solid transparent;
        }
        .dm-nav.scrolled {
          background:${dark ? "rgba(17,19,30,0.88)" : "rgba(250,250,250,0.88)"};
          backdrop-filter:blur(16px);
          border-color:var(--dm-border);
        }
        .dm-logo { font-size:1.15rem; font-weight:700; letter-spacing:-0.03em; color:var(--dm-primary); font-family:var(--font-sans); display:flex; flex-direction:column; line-height:1.1; }
        .dm-logo span { font-size:0.62rem; font-weight:400; color:var(--dm-muted); letter-spacing:0; }
        .dm-navlinks { display:flex; gap:28px; }
        .dm-navlinks a { font-size:0.85rem; font-weight:500; color:var(--dm-muted); text-decoration:none; transition:color 0.2s; }
        .dm-navlinks a:hover { color:var(--dm-fg); }
        .dm-nav-cta {
          background:var(--dm-primary); color:var(--dm-primary-fg);
          border:none; padding:8px 20px; border-radius:0.625rem;
          font-size:0.83rem; font-weight:600; cursor:pointer;
          font-family:var(--font-sans); transition:opacity 0.2s, transform 0.15s;
        }
        .dm-nav-cta:hover { opacity:0.87; transform:translateY(-1px); }

        /* HERO */
        .dm-hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:110px 48px 80px; position:relative; overflow:hidden; }
        .dm-hero-bg { position:absolute; inset:0; pointer-events:none; background: radial-gradient(ellipse 70% 55% at 50% 0%, ${dark ? "oklch(0.65 0.2 162 / 9%)" : "oklch(0.55 0.18 162 / 6%)"} 0%, transparent 70%), radial-gradient(ellipse 50% 45% at 85% 85%, ${dark ? "oklch(0.65 0.2 162 / 5%)" : "oklch(0.55 0.18 162 / 4%)"} 0%, transparent 60%); }
        .dm-hero-grid { position:absolute; inset:0; pointer-events:none; background-image: linear-gradient(${dark ? "oklch(1 0 0 / 4%)" : "oklch(0 0 0 / 4%)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "oklch(1 0 0 / 4%)" : "oklch(0 0 0 / 4%)"} 1px, transparent 1px); background-size:56px 56px; mask-image:radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%); }
        .dm-badge { display:inline-flex; align-items:center; gap:8px; background:var(--dm-primary-subtle); border:1px solid var(--dm-primary-dim); border-radius:100px; padding:5px 15px; font-size:0.75rem; font-weight:600; color:var(--dm-primary); margin-bottom:26px; position:relative; z-index:1; animation:dm-fadeUp 0.55s ease both; }
        .dm-badge-dot { width:6px; height:6px; border-radius:50%; background:var(--dm-primary); animation:dm-pulse 2s infinite; }
        .dm-title { font-size:clamp(2.5rem,6vw,4.6rem); font-weight:700; line-height:1.06; letter-spacing:-0.04em; position:relative; z-index:1; max-width:860px; animation:dm-fadeUp 0.55s 0.08s ease both; font-family:var(--font-sans); }
        .dm-title-green { color:var(--dm-primary); }
        .dm-sub { margin-top:18px; font-size:clamp(0.95rem,2vw,1.1rem); color:var(--dm-muted); max-width:520px; line-height:1.7; position:relative; z-index:1; animation:dm-fadeUp 0.55s 0.16s ease both; }
        .dm-tw-row { position:relative; z-index:1; margin-top:18px; font-size:0.92rem; color:var(--dm-muted); animation:dm-fadeUp 0.55s 0.3s ease both; }
        .dm-actions { display:flex; gap:12px; margin-top:34px; flex-wrap:wrap; justify-content:center; position:relative; z-index:1; animation:dm-fadeUp 0.55s 0.24s ease both; }
        .dm-btn-primary { background:var(--dm-primary); color:var(--dm-primary-fg); border:none; padding:12px 28px; border-radius:0.625rem; font-size:0.9rem; font-weight:600; cursor:pointer; font-family:var(--font-sans); transition:opacity 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow:0 0 20px var(--dm-primary-glow); }
        .dm-btn-primary:hover { opacity:0.88; transform:translateY(-2px); box-shadow:0 0 32px var(--dm-primary-dim); }
        .dm-btn-ghost { background:transparent; color:var(--dm-fg); border:1px solid var(--dm-border); padding:12px 28px; border-radius:0.625rem; font-size:0.9rem; font-weight:500; cursor:pointer; font-family:var(--font-sans); transition:border-color 0.2s, background 0.2s; }
        .dm-btn-ghost:hover { border-color:var(--dm-primary-dim); background:var(--dm-primary-subtle); }

        /* PIPELINE */
        .dm-pipe-section { margin-top:60px; width:100%; max-width:860px; position:relative; z-index:1; animation:dm-fadeUp 0.55s 0.36s ease both; }
        .dm-pipe-eyebrow { font-size:0.68rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--dm-muted); margin-bottom:18px; }
        .dm-pipe-card { background:var(--dm-card); border:1px solid var(--dm-border); border-radius:14px; padding:8px 10px 2px; box-shadow:0 0 48px var(--dm-primary-glow); }

        /* SECTIONS */
        .dm-section { padding:88px 48px; max-width:1080px; margin:0 auto; }
        .dm-eyebrow { font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--dm-primary); margin-bottom:10px; }
        .dm-section-title { font-size:clamp(1.8rem,3.5vw,2.6rem); font-weight:700; letter-spacing:-0.03em; line-height:1.15; margin-bottom:14px; font-family:var(--font-sans); }
        .dm-section-sub { color:var(--dm-muted); font-size:1rem; max-width:500px; line-height:1.7; }
        .dm-divider { height:1px; margin:0 48px; background:linear-gradient(90deg,transparent,var(--dm-border),transparent); }

        /* FEAT GRID */
        .dm-feat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(232px,1fr)); gap:14px; margin-top:48px; }

        /* HOW */
        .dm-how-inner { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; }

        /* CHAT */
        .dm-chat { background:var(--dm-card); border:1px solid var(--dm-border); border-radius:12px; overflow:hidden; box-shadow:0 0 40px var(--dm-primary-glow); }
        .dm-chat-bar { background:var(--dm-card2); border-bottom:1px solid var(--dm-border); padding:12px 16px; display:flex; align-items:center; gap:10px; }
        .dm-dot { width:9px; height:9px; border-radius:50%; display:inline-block; }
        .dm-chat-name { font-size:0.78rem; font-weight:500; color:var(--dm-muted); margin-left:4px; }
        .dm-chat-body { padding:18px; display:flex; flex-direction:column; gap:14px; }
        .dm-msg { display:flex; gap:9px; align-items:flex-start; }
        .dm-msg.user { flex-direction:row-reverse; }
        .dm-av { width:27px; height:27px; border-radius:50%; display:grid; place-items:center; font-size:0.65rem; font-weight:700; flex-shrink:0; }
        .dm-av-user { background:var(--dm-primary); color:var(--dm-primary-fg); }
        .dm-av-ai   { background:var(--dm-primary-subtle); color:var(--dm-primary); border:1px solid var(--dm-primary-dim); }
        .dm-bubble { background:var(--dm-card2); border:1px solid var(--dm-border); border-radius:10px; padding:10px 13px; font-size:0.81rem; line-height:1.6; max-width:84%; color:var(--dm-fg); }
        .dm-msg.user .dm-bubble { background:var(--dm-primary-subtle); border-color:var(--dm-primary-dim); }
        .dm-source-chip { display:inline-flex; align-items:center; gap:5px; background:var(--dm-primary-subtle); border:1px solid var(--dm-primary-dim); border-radius:5px; padding:2px 8px; font-size:0.68rem; color:var(--dm-primary); margin-top:7px; }

        /* COMPARE */
        .dm-compare { margin-top:48px; background:var(--dm-card); border:1px solid var(--dm-border); border-radius:13px; overflow:hidden; }
        .dm-compare-head { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid var(--dm-border); }
        .dm-compare-doc { padding:15px 22px; display:flex; align-items:center; gap:9px; font-size:0.8rem; font-weight:600; }
        .dm-compare-doc:first-child { border-right:1px solid var(--dm-border); }
        .dm-doc-icon { width:28px; height:28px; border-radius:7px; background:var(--dm-primary-subtle); display:grid; place-items:center; font-size:0.85rem; }
        .dm-compare-row { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid var(--dm-border); }
        .dm-compare-row:last-child { border-bottom:none; }
        .dm-cell { padding:14px 22px; font-size:0.8rem; color:var(--dm-muted); line-height:1.6; }
        .dm-cell:first-child { border-right:1px solid var(--dm-border); }
        .dm-cell b { color:var(--dm-fg); font-weight:600; }
        .dm-diff { display:inline-block; background:var(--dm-primary-subtle); border:1px solid var(--dm-primary-dim); color:var(--dm-primary); border-radius:4px; padding:0 6px; font-size:0.66rem; font-weight:700; margin-left:6px; vertical-align:middle; }

        /* CTA */
        .dm-cta { padding:96px 48px; text-align:center; position:relative; overflow:hidden; }
        .dm-cta-bg { position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse 55% 70% at 50% 50%, var(--dm-primary-glow), transparent 70%); }
        .dm-cta-title { font-size:clamp(1.9rem,4vw,3rem); font-weight:700; letter-spacing:-0.03em; line-height:1.15; max-width:640px; margin:0 auto 14px; position:relative; z-index:1; font-family:var(--font-sans); }
        .dm-cta-sub { color:var(--dm-muted); font-size:1rem; margin-bottom:32px; position:relative; z-index:1; }
        .dm-cta-actions { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; }

        /* FOOTER */
        .dm-footer { border-top:1px solid var(--dm-border); padding:26px 48px; display:flex; align-items:center; justify-content:space-between; font-size:0.77rem; color:var(--dm-muted); }
        .dm-footer-logo { font-weight:700; color:var(--dm-primary); font-family:var(--font-sans); font-size:0.95rem; letter-spacing:-0.02em; }

        /* RESPONSIVE */
        @media (max-width:768px) {
          .dm-nav { padding:0 18px; }
          .dm-navlinks { display:none; }
          .dm-hero { padding:96px 20px 64px; }
          .dm-section { padding:64px 20px; }
          .dm-how-inner { grid-template-columns:1fr; gap:44px; }
          .dm-compare-head,.dm-compare-row { grid-template-columns:1fr; }
          .dm-cell:first-child,.dm-compare-doc:first-child { border-right:none; border-bottom:1px solid var(--dm-border); }
          .dm-footer { flex-direction:column; gap:10px; text-align:center; }
          .dm-divider { margin:0 20px; }
          .dm-cta { padding:64px 20px; }
        }
      `}</style>

      <div className="dm-root">
        {/* NAV */}
        <nav className={`dm-nav${scrolled ? " scrolled" : ""}`}>
          <div className="dm-logo">
            DocuMind
            <span>AI Document Intelligence</span>
          </div>
          <div className="dm-navlinks">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#compare">Compare</a>
          </div>
           <Link to="/register" className="dm-nav-cta" style={{ textDecoration: "none" }}>Get started</Link>
        </nav>

        {/* HERO */}
        <section className="dm-hero">
          <div className="dm-hero-bg" />
          <div className="dm-hero-grid" />
          <div className="dm-badge">
            <span className="dm-badge-dot" />
            RAG-powered · GPT-4o mini · Pinecone
          </div>
          <h1 className="dm-title">
            Your documents,<br />
            <span className="dm-title-green">finally answerable.</span>
          </h1>
          <p className="dm-sub">
            Upload a PDF. Ask anything. Get grounded answers with cited sources —
            powered by a full vector retrieval pipeline.
          </p>
          <p className="dm-tw-row">
            Ask it: "<TypeWriter texts={[
              "What are the key risks in this contract?",
              "Summarise the methodology section.",
              "Compare the two reports side by side.",
              "What changed between version 1 and 2?",
              "List all action items from the meeting notes.",
            ]} />"
          </p>
          <div className="dm-actions">
             <Link to="/register" className="dm-btn-primary" style={{ textDecoration: "none" }}>Upload your first document →</Link>
              <a href="https://github.com/mohsin-shk/DocuMind-BackEnd" target="_blank" rel="noopener noreferrer" className="dm-btn-ghost" style={{ textDecoration: "none" }}>View on GitHub</a>
          </div>
          <div className="dm-pipe-section">
            <p className="dm-pipe-eyebrow">Live RAG pipeline · document → answer</p>
            <div className="dm-pipe-card">
              <PipelineCanvas />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <div className="dm-divider" />
        <section className="dm-section" id="features">
          <p className="dm-eyebrow">Capabilities</p>
          <h2 className="dm-section-title">Everything a document<br />workflow needs</h2>
          <p className="dm-section-sub">From semantic chunking to multi-document comparison — production-grade vector pipeline, no config required.</p>
          <div className="dm-feat-grid">
            {features.map(f => <FeatCard key={f.title} {...f} />)}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <div className="dm-divider" />
        <section className="dm-section" id="how">
          <div className="dm-how-inner">
            <div>
              <p className="dm-eyebrow">How it works</p>
              <h2 className="dm-section-title">Six steps from<br />PDF to insight</h2>
              <p className="dm-section-sub" style={{ marginBottom: 44 }}>
                A fully automated retrieval-augmented pipeline under the hood — you just ask questions.
              </p>
              {steps.map((s, i) => (
                <Step key={s.num} {...s} last={i === steps.length - 1} />
              ))}
            </div>
            <div className="dm-chat">
              <div className="dm-chat-bar">
                <span className="dm-dot" style={{ background: "#ff5f57" }} />
                <span className="dm-dot" style={{ background: "#febc2e" }} />
                <span className="dm-dot" style={{ background: "#28c840" }} />
                <span style={{ fontSize: "0.7rem", marginLeft: 6 }}>📄</span>
                <span className="dm-chat-name">annual_report_2024.pdf</span>
              </div>
              <div className="dm-chat-body">
                <div className="dm-msg user">
                  <div className="dm-av dm-av-user">JD</div>
                  <div className="dm-bubble">What were the three main revenue drivers in Q3?</div>
                </div>
                <div className="dm-msg">
                  <div className="dm-av dm-av-ai">AI</div>
                  <div className="dm-bubble">
                    Based on the Q3 section, the three main revenue drivers were:<br /><br />
                    <b>1. SaaS subscriptions</b> — up 34% YoY, driven by enterprise tier expansion.<br />
                    <b>2. Professional services</b> — onboarding projects grew by $2.1M.<br />
                    <b>3. API consumption</b> — usage-based billing scaled with customer workloads.
                    <br /><br />
                    <span className="dm-source-chip">📄 annual_report_2024 · Page 12</span>
                  </div>
                </div>
                <div className="dm-msg user">
                  <div className="dm-av dm-av-user">JD</div>
                  <div className="dm-bubble">Any risks flagged for Q4?</div>
                </div>
                <div className="dm-msg">
                  <div className="dm-av dm-av-ai">AI</div>
                  <div className="dm-bubble">
                    The report flags two Q4 risks: macroeconomic headwinds affecting enterprise deal velocity, and supply-chain delays on hardware SKUs.
                    <br /><br />
                    <span className="dm-source-chip">📄 annual_report_2024 · Page 18</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARE */}
        <div className="dm-divider" />
        <section className="dm-section" id="compare">
          <p className="dm-eyebrow">Multi-document</p>
          <h2 className="dm-section-title">Compare two documents<br />side by side</h2>
          <p className="dm-section-sub">Upload any two PDFs and DocuMind surfaces agreements, contradictions, and deltas — automatically.</p>
          <div className="dm-compare">
            <div className="dm-compare-head">
              <div className="dm-compare-doc"><div className="dm-doc-icon">📘</div> contract_v1.pdf</div>
              <div className="dm-compare-doc"><div className="dm-doc-icon">📙</div> contract_v2.pdf</div>
            </div>
            {compareRows.map((r, i) => (
              <div className="dm-compare-row" key={i}>
                <div className="dm-cell">{r.a}</div>
                <div className="dm-cell">{r.b}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="dm-cta">
          <div className="dm-cta-bg" />
          <h2 className="dm-cta-title">Stop reading documents.<br />Start asking them questions.</h2>
          <p className="dm-cta-sub">Free to try. No credit card needed.</p>
          <div className="dm-cta-actions">
             <Link to="/register" className="dm-btn-primary" style={{ textDecoration: "none" }}>Upload your first document →</Link>
             <a href="https://github.com/mohsin-shk/DocuMind-BackEnd" target="_blank" rel="noopener noreferrer" className="dm-btn-ghost" style={{ textDecoration: "none" }}>View on GitHub</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="dm-footer">
          <span className="dm-footer-logo">DocuMind</span>
          <span>Built with React · Pinecone · GPT-4o mini</span>
          <span>© 2026 DocuMind</span>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;