"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Search, ArrowRight, ExternalLink, Loader2, Newspaper, MessageCircle, AlertTriangle, RotateCcw, Sparkles, TrendingUp, Shield } from "lucide-react";

const STOCKS_RAW = [
  ["삼성전자","005930","KOSPI"],["SK하이닉스","000660","KOSPI"],["LG에너지솔루션","373220","KOSPI"],
  ["삼성바이오로직스","207940","KOSPI"],["현대차","005380","KOSPI"],["기아","000270","KOSPI"],
  ["셀트리온","068270","KOSPI"],["NAVER","035420","KOSPI"],["네이버","035420","KOSPI"],
  ["카카오","035720","KOSPI"],["POSCO홀딩스","005490","KOSPI"],["포스코홀딩스","005490","KOSPI"],
  ["LG화학","051910","KOSPI"],["삼성SDI","006400","KOSPI"],["현대모비스","012330","KOSPI"],
  ["KB금융","105560","KOSPI"],["신한지주","055550","KOSPI"],["하나금융지주","086790","KOSPI"],
  ["우리금융지주","316140","KOSPI"],["메리츠금융지주","138040","KOSPI"],["삼성생명","032830","KOSPI"],
  ["삼성화재","000810","KOSPI"],["한국전력","015760","KOSPI"],["KT&G","033780","KOSPI"],
  ["SK텔레콤","017670","KOSPI"],["KT","030200","KOSPI"],["LG전자","066570","KOSPI"],
  ["LG디스플레이","034220","KOSPI"],["SK이노베이션","096770","KOSPI"],["S-Oil","010950","KOSPI"],
  ["에쓰오일","010950","KOSPI"],["GS","078930","KOSPI"],["한화솔루션","009830","KOSPI"],
  ["한화에어로스페이스","012450","KOSPI"],["두산에너빌리티","034020","KOSPI"],["두산밥캣","241560","KOSPI"],
  ["HD현대중공업","329180","KOSPI"],["HD한국조선해양","009540","KOSPI"],["삼성중공업","010140","KOSPI"],
  ["한국항공우주","047810","KOSPI"],["대한항공","003490","KOSPI"],["아모레퍼시픽","090430","KOSPI"],
  ["LG생활건강","051900","KOSPI"],["CJ제일제당","097950","KOSPI"],["오리온","271560","KOSPI"],
  ["농심","004370","KOSPI"],["롯데쇼핑","023530","KOSPI"],["이마트","139480","KOSPI"],
  ["BGF리테일","282330","KOSPI"],["GS리테일","007070","KOSPI"],["호텔신라","008770","KOSPI"],
  ["신세계","004170","KOSPI"],["강원랜드","035250","KOSPI"],["하이브","352820","KOSPI"],
  ["HYBE","352820","KOSPI"],["크래프톤","259960","KOSPI"],["엔씨소프트","036570","KOSPI"],
  ["넷마블","251270","KOSPI"],["카카오게임즈","293490","KOSDAQ"],["펄어비스","263750","KOSDAQ"],
  ["두산","000150","KOSPI"],["LG","003550","KOSPI"],["SK","034730","KOSPI"],
  ["삼성물산","028260","KOSPI"],["삼성전기","009150","KOSPI"],["LG이노텍","011070","KOSPI"],
  ["SK스퀘어","402340","KOSPI"],["카카오뱅크","323410","KOSPI"],["카카오페이","377300","KOSPI"],
  ["한미반도체","042700","KOSPI"],["DB하이텍","000990","KOSPI"],["리노공업","058470","KOSDAQ"],
  ["포스코퓨처엠","003670","KOSPI"],["에코프로","086520","KOSDAQ"],["에코프로비엠","247540","KOSDAQ"],
  ["엘앤에프","066970","KOSDAQ"],["알테오젠","196170","KOSDAQ"],["HLB","028300","KOSDAQ"],
  ["셀트리온헬스케어","091990","KOSDAQ"],["유한양행","000100","KOSPI"],["한미약품","128940","KOSPI"],
  ["녹십자","006280","KOSPI"],["종근당","185750","KOSPI"],["SK바이오팜","326030","KOSPI"],
  ["SK바이오사이언스","302440","KOSPI"],["메디톡스","086900","KOSDAQ"],["휴젤","145020","KOSDAQ"],
  ["클래시스","214150","KOSDAQ"],["파마리서치","214450","KOSDAQ"],["JYP Ent.","035900","KOSDAQ"],
  ["JYP","035900","KOSDAQ"],["에스엠","041510","KOSDAQ"],["SM","041510","KOSDAQ"],
  ["와이지엔터테인먼트","122870","KOSDAQ"],["YG","122870","KOSDAQ"],["CJ ENM","035760","KOSDAQ"],
  ["스튜디오드래곤","253450","KOSDAQ"],["위메이드","112040","KOSDAQ"],["넥슨게임즈","225570","KOSDAQ"],
  ["컴투스","078340","KOSDAQ"],["이오테크닉스","039030","KOSDAQ"],["솔브레인","357780","KOSDAQ"],
  ["동진쎄미켐","005290","KOSDAQ"],["원익IPS","240810","KOSDAQ"],["테크윙","089030","KOSDAQ"],
  ["하나마이크론","067310","KOSDAQ"],["고영","098460","KOSDAQ"],["파크시스템스","140860","KOSDAQ"],
  ["레인보우로보틱스","277810","KOSDAQ"],["두산로보틱스","454910","KOSPI"],["현대로템","064350","KOSPI"],
  ["두산퓨얼셀","336260","KOSPI"],["한온시스템","018880","KOSPI"],["HL만도","204320","KOSPI"],
  ["현대글로비스","086280","KOSPI"],["HMM","011200","KOSPI"],["팬오션","028670","KOSPI"],
  ["고려아연","010130","KOSPI"],["풍산","103140","KOSPI"],["현대제철","004020","KOSPI"],
  ["코스맥스","192820","KOSPI"],["한국콜마","161890","KOSPI"],["실리콘투","257720","KOSDAQ"],
  ["이수페타시스","007660","KOSPI"],["심텍","222800","KOSDAQ"],["대덕전자","353200","KOSPI"],
  ["비에이치","090460","KOSDAQ"],["삼성E&A","028050","KOSPI"],["GS건설","006360","KOSPI"],
  ["DL이앤씨","375500","KOSPI"],["현대건설","000720","KOSPI"],["대우건설","047040","KOSPI"],
  ["HDC현대산업개발","294870","KOSPI"],["한화시스템","272210","KOSPI"],["LIG넥스원","079550","KOSPI"],
];

const seen = new Set();
const STOCK_DB = STOCKS_RAW.map(([n,c,m]) => ({n,c,m})).filter(s => {
  const k = s.n + s.c;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});
const CODE_TO_STOCK = {};
STOCK_DB.forEach(s => { if (!CODE_TO_STOCK[s.c]) CODE_TO_STOCK[s.c] = s; });

const POPULAR = ["삼성전자","SK하이닉스","LG에너지솔루션","카카오","네이버","현대차","셀트리온"];

// Color tokens — 보라색 메인 포인트
const C = {
  primary: "#7C3AED",      // 메인 보라
  primaryDark: "#6D28D9",
  primaryLight: "#F5F3FF", // 연한 배경
  primarySoft: "#EDE9FE",
  ink: "#111827",
  ink2: "#374151",
  muted: "#6B7280",
  muted2: "#9CA3AF",
  bg: "#FFFFFF",
  bgSoft: "#F9FAFB",
  border: "#E5E7EB",
  borderSoft: "#F3F4F6",
};

function findMatches(q) {
  if (!q) return [];
  const ql = q.toLowerCase();
  const exact = [], startsName = [], startsCode = [], includesName = [];
  STOCK_DB.forEach(s => {
    const nl = s.n.toLowerCase();
    if (s.c === q || nl === ql) exact.push(s);
    else if (nl.startsWith(ql)) startsName.push(s);
    else if (s.c.startsWith(q)) startsCode.push(s);
    else if (nl.includes(ql)) includesName.push(s);
  });
  return [...exact, ...startsName, ...startsCode, ...includesName];
}

function highlightText(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: C.primary, fontWeight: 700 }}>{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

function AdSlot({ id, label = "Sponsored", height = 90, variant = "default" }) {
  const isSquare = variant === "square";
  const isSponsored = variant === "sponsored";
  return (
    <div data-ad-slot={id} style={{ width: "100%", margin: isSponsored ? "24px 0" : "16px 0" }}>
      <div style={{
        fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
        color: C.muted2, marginBottom: 8, fontWeight: 500,
        textAlign: isSquare ? "center" : "left",
      }}>{label}</div>
      <div id={`ad-${id}`} style={{
        width: "100%", minHeight: isSquare ? 250 : height,
        background: C.bgSoft, border: `1px dashed ${C.border}`, borderRadius: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: C.muted2, fontSize: 12, fontWeight: 500,
        letterSpacing: "0.02em", overflow: "hidden",
      }}>
        AD SLOT · {id} · {isSquare ? "300×250" : `${height}px`}
      </div>
    </div>
  );
}

export default function StockCheck() {
  const [query, setQuery] = useState("");
  const [showSugg, setShowSugg] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [resolvedStock, setResolvedStock] = useState(null);
  const inputRef = useRef(null);
  const blurTimer = useRef(null);

  const matches = findMatches(query.trim());

  const resolveStock = (q) => {
    if (/^\d{6}$/.test(q)) return CODE_TO_STOCK[q] || { n: "", c: q, m: "?" };
    return (
      STOCK_DB.find(s => s.n === q) ||
      STOCK_DB.find(s => s.n.toLowerCase() === q.toLowerCase()) ||
      findMatches(q)[0] ||
      { n: q, c: "", m: "?" }
    );
  };

  const runCheck = async (stock) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setResolvedStock(stock);
    setShowSugg(false);

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stockName: stock.n, stockCode: stock.c }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "점검 실패");
      setResult(data);
    } catch (e) {
      setError(e.message || "점검 중 오류가 발생했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const triggerCheck = () => {
    const q = query.trim();
    if (!q) { inputRef.current?.focus(); return; }
    runCheck(resolveStock(q));
  };

  const selectMatch = (s) => {
    setQuery(s.n);
    setShowSugg(false);
    setActiveIdx(-1);
    runCheck(s);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (matches.length) setActiveIdx(i => (i + 1) % Math.min(matches.length, 8));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (matches.length) setActiveIdx(i => (i - 1 + Math.min(matches.length, 8)) % Math.min(matches.length, 8));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && matches[activeIdx]) selectMatch(matches[activeIdx]);
      else triggerCheck();
    } else if (e.key === "Escape") {
      setShowSugg(false);
      setActiveIdx(-1);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setResolvedStock(null);
    setQuery("");
    inputRef.current?.focus();
  };

  const riskColor = {
    "정상": { bg: "#ECFDF5", text: "#065F46", border: "#10B981", dot: "#10B981" },
    "주의": { bg: "#FEFCE8", text: "#854D0E", border: "#EAB308", dot: "#EAB308" },
    "경고": { bg: "#FFF7ED", text: "#9A3412", border: "#F97316", dot: "#F97316" },
    "위기": { bg: "#FEF2F2", text: "#991B1B", border: "#EF4444", dot: "#EF4444" },
  };
  const rl = result?.riskLevel && riskColor[result.riskLevel];
  const showResult = result && !loading;

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      fontFamily: '"Pretendard", -apple-system, "Apple SD Gothic Neo", sans-serif',
      color: C.ink,
      display: "flex", flexDirection: "column",
    }}>
      {/* HEADER — minimal */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 24px", borderBottom: `1px solid ${C.borderSoft}`,
        background: C.bg,
        position: "sticky", top: 0, zIndex: 30,
      }}>
<Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: C.ink }}>
          {/* 차트 막대 로고 */}
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <rect width="34" height="34" rx="9" fill={C.primary}/>
            <rect x="7"  y="20" width="4" height="7"  rx="1" fill="#FFFFFF" opacity="0.55"/>
            <rect x="13" y="15" width="4" height="12" rx="1" fill="#FFFFFF" opacity="0.75"/>
            <rect x="19" y="11" width="4" height="16" rx="1" fill="#FFFFFF" opacity="0.9"/>
            <circle cx="25" cy="9" r="2.5" fill="#FFFFFF"/>
          </svg>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.03em", lineHeight: 1 }}>
            <span>1분</span>
            <span style={{ color: C.primary }}>주식</span>
            <span>점검</span>
          </span>
        </Link>
<div style={{
          fontSize: 12, color: C.muted, fontWeight: 600,
          padding: "6px 12px", background: C.primaryLight, color: C.primary,
          borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: C.primary,
            animation: "live-pulse 1.6s infinite",
          }}/>
          AI 실시간 주식분석
        </div>
      </header>

      {/* TOP BANNER AD */}
      <div style={{ padding: "12px 20px 0", maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        <AdSlot id="top-banner" label="Sponsored" height={90}/>
      </div>

      {/* MAIN with sidebar */}
      <div className="main-grid" style={{
        flex: 1, display: "grid", gridTemplateColumns: "minmax(0, 1fr)",
        maxWidth: 1080, width: "100%", margin: "0 auto",
        padding: "16px 20px 40px", gap: 24,
      }}>
        <main style={{ minWidth: 0 }}>
          <div style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>

            {!result && !loading && !error && (
              <div style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 999,
                  background: C.primaryLight, color: C.primary,
                  fontSize: 12, fontWeight: 600, letterSpacing: "-0.01em",
                  marginBottom: 24,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.primary }}/>
                  투자 전 60초 체크리스트
                </div>
<h1 className="hero-title" style={{
                  fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.04em",
                  marginBottom: 16, color: C.ink, wordBreak: "keep-all",
                  padding: "0 12px",
                }}>
                  매수 버튼을 누르기 전,<br/>
                  <span style={{ color: C.primary }}>딱 한 번만</span> 보세요
                </h1>

                <p style={{
                  fontSize: 16, color: C.muted, lineHeight: 1.6,
                  marginBottom: 32, maxWidth: 520, marginLeft: "auto", marginRight: "auto",
                }}>
                  AI가 최신 뉴스, 토론방 분위기, 위험 신호를<br className="br-mobile-hide"/>
                  <strong style={{ color: C.ink, fontWeight: 700 }}> 한 줄</strong>로 정리해드립니다
                </p>
              </div>
            )}

            {/* SEARCH BOX */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <div style={{
                display: "flex", alignItems: "center", background: C.bg,
                border: `2px solid ${showSugg ? C.primary : C.border}`,
                borderRadius: 999,
                padding: "5px 5px 5px 22px",
                boxShadow: showSugg
                  ? `0 0 0 4px ${C.primarySoft}, 0 4px 16px rgba(124,58,237,0.12)`
                  : `0 1px 3px rgba(0,0,0,0.04)`,
                transition: "all .2s ease",
              }}>
                <Search size={20} strokeWidth={2.5} style={{ color: showSugg ? C.primary : C.muted, flexShrink: 0 }}/>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setActiveIdx(-1); setShowSugg(true); }}
                  onFocus={() => { if (blurTimer.current) clearTimeout(blurTimer.current); setShowSugg(true); }}
                  onBlur={() => { blurTimer.current = setTimeout(() => setShowSugg(false), 150); }}
                  onKeyDown={handleKeyDown}
                  placeholder="종목명 또는 종목코드"
                  style={{
                    flex: 1, padding: "16px 14px", fontSize: 16, fontWeight: 500,
                    background: "transparent", color: C.ink, border: "none", outline: "none",
                    minWidth: 0, fontFamily: "inherit",
                  }}
                  disabled={loading}
                />
                <button
                  onClick={triggerCheck}
                  disabled={loading}
                  style={{
                    background: loading ? C.muted : C.ink,
                    color: "#FFF", padding: "12px 22px", borderRadius: 999,
                    fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em",
                    display: "flex", alignItems: "center", gap: 6, border: "none",
                    cursor: loading ? "not-allowed" : "pointer", flexShrink: 0,
                    fontFamily: "inherit", transition: "all .15s",
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = C.primary; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = C.ink; }}
                >
                  {loading ? <Loader2 size={16} className="spin"/> : <ArrowRight size={16} strokeWidth={2.5}/>}
                  <span>점검</span>
                </button>
              </div>

              {showSugg && matches.length > 0 && !loading && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
                  background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)", maxHeight: 320, overflowY: "auto",
                  zIndex: 50, padding: 6,
                }}>
                  {matches.slice(0, 8).map((s, i) => (
                    <div
                      key={s.n + s.c}
                      onMouseDown={e => { e.preventDefault(); selectMatch(s); }}
                      onMouseEnter={() => setActiveIdx(i)}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "12px 14px", cursor: "pointer", borderRadius: 12,
                        background: i === activeIdx ? C.primaryLight : "transparent",
                        transition: "background .12s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 15, fontWeight: 600 }}>{highlightText(s.n, query.trim())}</span>
                        <span style={{
                          fontSize: 10, letterSpacing: "0.04em", fontWeight: 600,
                          padding: "3px 8px", borderRadius: 6,
                          background: s.m === "KOSDAQ" ? "#FEF3C7" : "#DBEAFE",
                          color: s.m === "KOSDAQ" ? "#92400E" : "#1E40AF",
                        }}>{s.m}</span>
                      </div>
                      <span style={{ fontSize: 13, color: C.muted2, fontFamily: "ui-monospace, monospace" }}>{s.c}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* HINT */}
            {!result && !loading && !error && (
              <p style={{ fontSize: 12, color: C.muted2, textAlign: "center", marginBottom: 32 }}>
                <kbd style={kbdStyle}>↑</kbd> <kbd style={kbdStyle}>↓</kbd> 선택, <kbd style={kbdStyle}>Enter</kbd> 점검
              </p>
            )}

            {/* POPULAR CHIPS */}
            {!result && !loading && !error && (
              <div style={{ marginBottom: 40 }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
                  color: C.muted, marginBottom: 12, textAlign: "center",
                }}>자주 찾는 종목</div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                  {POPULAR.map(name => (
                    <button
                      key={name}
                      onClick={() => { setQuery(name); runCheck(resolveStock(name)); }}
                      style={{
                        padding: "8px 16px", background: C.bg,
                        border: `1px solid ${C.border}`, borderRadius: 999,
                        fontSize: 13, fontWeight: 600, color: C.ink2, cursor: "pointer",
                        transition: "all .15s", fontFamily: "inherit",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = C.primaryLight;
                        e.currentTarget.style.borderColor = C.primary;
                        e.currentTarget.style.color = C.primary;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = C.bg;
                        e.currentTarget.style.borderColor = C.border;
                        e.currentTarget.style.color = C.ink2;
                      }}
                    >{name}</button>
                  ))}
                </div>
              </div>
            )}

            {/* FEATURE CARDS — only on idle */}
            {!result && !loading && !error && (
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 12, marginBottom: 32,
              }}>
                <FeatureCard icon={<Newspaper size={18} strokeWidth={2.2}/>} title="최신 뉴스" desc="일주일 내 핵심 뉴스 한 줄"/>
                <FeatureCard icon={<MessageCircle size={18} strokeWidth={2.2}/>} title="토론방 분위기" desc="개인투자자 의견 한 줄"/>
                <FeatureCard icon={<Shield size={18} strokeWidth={2.2}/>} title="위험 신호" desc="관리종목·상폐 등 점검"/>
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div style={{
                marginTop: 24, padding: "48px 24px",
                background: C.bgSoft, borderRadius: 20, textAlign: "center",
                border: `1px solid ${C.borderSoft}`,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: C.primaryLight, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <Loader2 size={26} style={{ color: C.primary }} className="spin"/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.02em" }}>
                  <span style={{ color: C.primary }}>{resolvedStock?.n || query}</span> 점검 중
                </div>
                <p style={{ fontSize: 13, color: C.muted }}>최신 뉴스 · 토론방 · 공시를 확인하고 있어요</p>
              </div>
            )}

            {/* ERROR */}
            {error && !loading && (
              <div style={{
                marginTop: 24, padding: "24px",
                background: "#FEF2F2", border: `1px solid #FECACA`, borderRadius: 16,
                textAlign: "center",
              }}>
                <AlertTriangle size={24} style={{ color: "#DC2626", margin: "0 auto 10px" }}/>
                <div style={{ fontWeight: 700, color: "#991B1B", marginBottom: 4 }}>점검에 실패했어요</div>
                <p style={{ fontSize: 13, color: "#7F1D1D", marginBottom: 16 }}>{error}</p>
                <button onClick={() => resolvedStock && runCheck(resolvedStock)}
                  style={{
                    padding: "10px 18px", background: "#991B1B", color: "#FFF",
                    border: "none", borderRadius: 999, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >다시 시도</button>
              </div>
            )}

            {/* RESULT */}
            {showResult && (
              <div style={{ marginTop: 8 }}>
                {/* Result header */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.border}`,
                  flexWrap: "wrap", gap: 12,
                }}>
                  <div>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
                      color: C.primary, marginBottom: 6,
                      padding: "3px 10px", background: C.primaryLight, borderRadius: 999,
                    }}>
                      <Sparkles size={11} strokeWidth={2.5}/> 점검 완료
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em" }}>
                      {resolvedStock?.n || query}
                      <span style={{ fontSize: 14, color: C.muted2, fontWeight: 500, marginLeft: 10, fontFamily: "ui-monospace, monospace" }}>
                        {resolvedStock?.c} {resolvedStock?.m && resolvedStock.m !== "?" && `· ${resolvedStock.m}`}
                      </span>
                    </div>
                  </div>
                  <button onClick={reset}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "8px 14px", background: C.bgSoft,
                      border: `1px solid ${C.border}`, borderRadius: 999,
                      fontSize: 12, fontWeight: 600, color: C.ink2,
                      cursor: "pointer", fontFamily: "inherit",
                    }}
                  ><RotateCcw size={13}/> 새로 점검</button>
                </div>

                <ResultCard icon={<Newspaper size={18} strokeWidth={2.2}/>} num="01" title="최신 뉴스" body={result.news} color={C.primary}/>
                <ResultCard icon={<MessageCircle size={18} strokeWidth={2.2}/>} num="02" title="토론방 분위기" body={result.sentiment} color={C.primary}/>
                <ResultCard icon={<Shield size={18} strokeWidth={2.2}/>} num="03" title="위험 신호" body={result.risk} color={C.primary} accent={rl} riskLevel={result.riskLevel}/>

                {/* In-article ad */}
                <AdSlot id="in-article" label="Sponsored" variant="sponsored" height={120}/>

                {/* External links */}
                <div style={{
                  marginTop: 20, padding: "20px 22px",
                  background: C.bgSoft, borderRadius: 16,
                  border: `1px solid ${C.borderSoft}`,
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
                    color: C.muted, marginBottom: 14, textTransform: "uppercase",
                  }}>
                    공식 출처 바로가기
                  </div>
                  <div style={{
                    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 8,
                  }}>
                    <ExtLink href={resolvedStock?.c ? `https://finance.naver.com/item/main.naver?code=${resolvedStock.c}` : "https://finance.naver.com"} label="네이버 시세"/>
                    <ExtLink href={resolvedStock?.c ? `https://finance.naver.com/item/board.naver?code=${resolvedStock.c}` : "https://finance.naver.com"} label="토론방"/>
                    <ExtLink href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(resolvedStock?.n || query)}`} label="관련 뉴스"/>
                    <ExtLink href={`https://dart.fss.or.kr/dsab007/main.do?textCrpNm=${encodeURIComponent(resolvedStock?.n || query)}`} label="DART 공시"/>
                  </div>
                  {result.sources && result.sources.length > 0 && (
                    <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 6, fontWeight: 600 }}>참고 출처</div>
                      {result.sources.slice(0, 5).map((src, i) => (
                        <a key={i} href={src} target="_blank" rel="noopener noreferrer"
                          style={{
                            display: "block", fontSize: 11, color: C.primary,
                            textDecoration: "none", marginBottom: 3, wordBreak: "break-all",
                          }}>
                          ↗ {src}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar Ads — desktop only */}
        <aside className="ad-sidebar" style={{ display: "none" }}>
          <div style={{ position: "sticky", top: 80 }}>
            <AdSlot id="sidebar-top" label="Sponsored" variant="square"/>
            <div style={{ height: 16 }}/>
            <AdSlot id="sidebar-bottom" label="Sponsored" variant="square"/>
          </div>
        </aside>
      </div>

      {/* Bottom banner */}
      <div style={{ padding: "0 20px 20px", maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        <AdSlot id="bottom-banner" label="Sponsored" height={90}/>
      </div>

      {/* FOOTER */}
      <footer style={{
        padding: "32px 24px", borderTop: `1px solid ${C.borderSoft}`,
        background: C.bgSoft,
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 16, marginBottom: 16,
          }}>
<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="34" height="34" rx="9" fill={C.primary}/>
                <rect x="7"  y="20" width="4" height="7"  rx="1" fill="#FFFFFF" opacity="0.55"/>
                <rect x="13" y="15" width="4" height="12" rx="1" fill="#FFFFFF" opacity="0.75"/>
                <rect x="19" y="11" width="4" height="16" rx="1" fill="#FFFFFF" opacity="0.9"/>
                <circle cx="25" cy="9" r="2.5" fill="#FFFFFF"/>
              </svg>
              <span style={{ fontWeight: 700, fontSize: 14, color: C.ink }}>
                <span>1분</span><span style={{ color: C.primary }}>주식</span><span>점검</span>
              </span>
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: C.muted, fontWeight: 500 }}>
              <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>개인정보처리방침</Link>
              <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }}>이용약관</Link>
              <Link href="/about" style={{ color: "inherit", textDecoration: "none" }}>소개</Link>
            </div>
          </div>
          <div style={{
            paddingTop: 16, borderTop: `1px solid ${C.border}`,
            fontSize: 11, color: C.muted2, lineHeight: 1.7,
          }}>
            본 서비스는 정보 제공 목적으로만 운영되며, 어떠한 종류의 투자 자문이나 매매 권유도 아닙니다.
            모든 투자 판단과 그에 따른 손익은 전적으로 투자자 본인에게 귀속됩니다.
          </div>
        </div>
      </footer>

<style>{`
        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .hero-title {
          font-size: 44px;
        }
        @media (max-width: 640px) {
          .hero-title {
            font-size: 32px;
          }
          .br-mobile-hide {
            display: none;
          }
        }
        @media (min-width: 641px) and (max-width: 980px) {
          .hero-title {
            font-size: 38px;
          }
        }

        @media (min-width: 980px) {
          .main-grid { grid-template-columns: minmax(0, 1fr) 300px !important; }
          .ad-sidebar { display: block !important; }
          .hero-title { font-size: 52px; }
        }
      `}</style>
    </div>
  );
}

const kbdStyle = {
  fontSize: 10, fontWeight: 600,
  background: "#FFF", border: `1px solid ${C.border}`,
  borderRadius: 4, padding: "1px 6px", margin: "0 1px",
  color: C.ink2, fontFamily: "ui-monospace, monospace",
};

function FeatureCard({ icon, title, desc }) {
  return (
    <div style={{
      padding: "16px 18px", background: C.bg,
      border: `1px solid ${C.borderSoft}`, borderRadius: 16,
      transition: "all .15s",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: C.primaryLight, color: C.primary,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 10,
      }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.01em" }}>{title}</div>
      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}

function ResultCard({ icon, num, title, body, color, accent, riskLevel }) {
  const isRisk = !!accent;
  return (
    <div style={{
      background: isRisk ? accent.bg : C.bg,
      border: `1px solid ${isRisk ? accent.border + "40" : C.borderSoft}`,
      borderRadius: 16, padding: "20px 22px", marginBottom: 12,
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            background: isRisk ? "#FFF" : C.primaryLight,
            color: isRisk ? accent.text : color,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: isRisk ? `1px solid ${accent.border}40` : "none",
          }}>{icon}</div>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
              color: isRisk ? accent.text : C.muted2, marginBottom: 2,
            }}>{num}</div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em", color: isRisk ? accent.text : C.ink }}>
              {title}
            </div>
          </div>
        </div>
        {isRisk && riskLevel && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 999,
            background: "#FFF", border: `1px solid ${accent.border}40`,
            fontSize: 12, fontWeight: 700, color: accent.text,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent.dot }}/>
            {riskLevel}
          </span>
        )}
      </div>
      <p style={{
        fontSize: 15, lineHeight: 1.7,
        color: isRisk ? accent.text : C.ink2, margin: 0, fontWeight: 500,
      }}>{body}</p>
    </div>
  );
}

function ExtLink({ href, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "11px 14px", background: C.bg, borderRadius: 10,
        textDecoration: "none", color: C.ink2, fontSize: 13, fontWeight: 600,
        border: `1px solid ${C.border}`, transition: "all .15s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = C.primary;
        e.currentTarget.style.color = C.primary;
        e.currentTarget.style.background = C.primaryLight;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.color = C.ink2;
        e.currentTarget.style.background = C.bg;
      }}
    >
      <span>{label}</span>
      <ExternalLink size={13} strokeWidth={2.2}/>
    </a>
  );
}
