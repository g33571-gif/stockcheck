import Link from "next/link";

export default function StaticPage({ title, eyebrow, children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: '"Pretendard", -apple-system, sans-serif', color: "#0A0A0A", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", borderBottom: "1px solid rgba(10,10,10,0.10)" }}>
<Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#0A0A0A" }}>
          <svg width="32" height="32" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="34" height="34" rx="9" fill="#7C3AED"/>
            <rect x="7"  y="20" width="4" height="7"  rx="1" fill="#FFFFFF" opacity="0.55"/>
            <rect x="13" y="15" width="4" height="12" rx="1" fill="#FFFFFF" opacity="0.75"/>
            <rect x="19" y="11" width="4" height="16" rx="1" fill="#FFFFFF" opacity="0.9"/>
            <circle cx="25" cy="9" r="2.5" fill="#FFFFFF"/>
          </svg>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.03em" }}>
            <span>1분</span><span style={{ color: "#7C3AED" }}>주식</span><span>점검</span>
          </span>
        </Link>
        <Link href="/" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#6B6B66", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
          ← 홈으로
        </Link>
      </header>

      <main style={{ flex: 1, maxWidth: 720, width: "100%", margin: "0 auto", padding: "48px 24px 64px" }}>
        <div style={{ marginBottom: 32, paddingBottom: 16, borderBottom: "2px solid #0A0A0A" }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#FF4D14", marginBottom: 8 }}>
            {eyebrow}
          </div>
          <h1 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>
            {title}
          </h1>
        </div>
        <article style={{ fontSize: 15, lineHeight: 1.8, color: "#1F1F1B" }}>
          {children}
        </article>
      </main>

      <footer style={{ padding: "24px 28px", borderTop: "1px solid rgba(10,10,10,0.10)", fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.08em", color: "#6B6B66", textTransform: "uppercase" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, maxWidth: 1080, margin: "0 auto" }}>
          <span>실시간 분석 · 한국 주식</span>
          <div style={{ display: "flex", gap: 18 }}>
            <Link href="/privacy" style={{ color: "#6B6B66", textDecoration: "none" }}>개인정보처리방침</Link>
            <Link href="/terms" style={{ color: "#6B6B66", textDecoration: "none" }}>이용약관</Link>
            <Link href="/about" style={{ color: "#6B6B66", textDecoration: "none" }}>소개</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
