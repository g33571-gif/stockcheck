"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Search, ArrowRight, ExternalLink, Loader2, Newspaper, MessageCircle, AlertTriangle, RotateCcw } from "lucide-react";

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
      <span style={{ color: "#FF4D14", fontWeight: 700 }}>{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

function AdSlot({ id, label = "광고", height = 90, variant = "default" }) {
  const isSquare = variant === "square";
  const isSponsored = variant === "sponsored";
  return (
    <div data-ad-slot={id} style={{ width: "100%", margin: isSponsored ? "20px 0" : "16px 0" }}>
      <div style={{
        fontFamily: "JetBrains Mono, monospace", fontSize: 9, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "#9B9B95", marginBottom: 6,
        textAlign: isSquare ? "center" : "left",
      }}>{label}</div>
      <div id={`ad-${id}`} style={{
        width: "100%", minHeight: isSquare ? 250 : height,
        background: "#FFFFFF", border: "1px dashed rgba(10,10,10,0.15)", borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#B5B5B0", fontSize: 12, fontFamily: "JetBrains Mono, monospace",
        letterSpacing: "0.05em", overflow: "hidden",
      }}>
        AD SLOT · {id} · {isSquare ? "300×250" : `${height}px banner`}
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

  const today = (() => {
    const d = new Date();
    const wd = ["SUN","MON","TUE","WED","THU","FRI","SAT"][d.getDay()];
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    return `${wd} · ${d.getFullYear()}.${mo}.${da}`;
  })();

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
    "정상": { bg: "#E8F5EE", text: "#15803D", border: "#22C55E" },
    "주의": { bg: "#FEF9C3", text: "#A16207", border: "#EAB308" },
    "경고": { bg: "#FFEDD5", text: "#C2410C", border: "#F97316" },
    "위기": { bg: "#FEE2E2", text: "#991B1B", border: "#DC2626" },
  };
  const rl = result?.riskLevel && riskColor[result.riskLevel];
  const showResult = result && !loading;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: '"Pretendard", -apple-system, sans-serif', color: "#0A0A0A", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", borderBottom: "1px solid rgba(10,10,10,0.10)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 8, textDecoration: "none", color: "inherit" }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#FF4D14", letterSpacing: "0.05em" }}>01</span>
          <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, letterSpacing: "-0.02em" }}>
            <em style={{ fontStyle: "italic", color: "#FF4D14" }}>1분</em>점검
          </span>
        </Link>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#6B6B66", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {today}
        </div>
      </header>

      <div style={{ padding: "12px 20px 0", maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        <AdSlot id="top-banner" label="Sponsored" height={90}/>
      </div>

      <div className="main-grid" style={{
        flex: 1, display: "grid", gridTemplateColumns: "minmax(0, 1fr)",
        maxWidth: 1080, width: "100%", margin: "0 auto",
        padding: "20px 20px 40px", gap: 24,
      }}>
        <main style={{ minWidth: 0 }}>
          <div style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>

            {!result && !loading && !error && (
              <div style={{ textAlign: "center", marginBottom: 28, paddingTop: 20 }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#FF4D14", marginBottom: 18, display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 22, height: 1, background: "#FF4D14" }}/>
                  투자 전 60초 체크리스트
                  <span style={{ width: 22, height: 1, background: "#FF4D14" }}/>
                </div>
                <h1 style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, fontSize: "clamp(40px, 6vw, 68px)", lineHeight: 1, letterSpacing: "-0.035em", marginBottom: 16 }}>
                  매수 전,<br/>
                  <span style={{ position: "relative", fontStyle: "italic", color: "#FF4D14" }}>
                    딱 한 번만
                    <span style={{ position: "absolute", left: 0, right: 0, bottom: 6, height: 6, background: "#FFF1EB", zIndex: -1 }}/>
                  </span>{" "}
                  보세요
                </h1>
                <p style={{ fontSize: 15, color: "#6B6B66", lineHeight: 1.6, marginBottom: 28 }}>
                  종목명만 입력하면 — 최신 뉴스, 토론방 분위기, 위험 신호를<br/>
                  각각 <strong style={{ color: "#0A0A0A", fontWeight: 600 }}>한 줄</strong>로 정리해드립니다.
                </p>
              </div>
            )}

            <div style={{ position: "relative", marginBottom: 14 }}>
              <div style={{
                display: "flex", alignItems: "center", background: "#FFFFFF",
                border: showSugg ? "1.5px solid #FF4D14" : "1.5px solid #0A0A0A",
                borderRadius: 14, padding: "5px 5px 5px 22px",
                boxShadow: showSugg ? "0 4px 0 #FF4D14" : "0 2px 0 #0A0A0A",
                transition: "all .2s ease",
                transform: showSugg ? "translateY(-2px)" : "none",
              }}>
                <Search size={18} style={{ color: "#6B6B66", flexShrink: 0 }}/>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setActiveIdx(-1); setShowSugg(true); }}
                  onFocus={() => { if (blurTimer.current) clearTimeout(blurTimer.current); setShowSugg(true); }}
                  onBlur={() => { blurTimer.current = setTimeout(() => setShowSugg(false), 150); }}
                  onKeyDown={handleKeyDown}
                  placeholder="종목명 또는 6자리 코드 (예: 삼성전자, 005930)"
                  style={{ flex: 1, padding: "16px 14px", fontSize: 17, fontWeight: 500, background: "transparent", color: "#0A0A0A", border: "none", outline: "none", minWidth: 0, fontFamily: "inherit" }}
                  disabled={loading}
                />
                <button
                  onClick={triggerCheck}
                  disabled={loading}
                  style={{
                    background: loading ? "#6B6B66" : "#0A0A0A", color: "#FFF",
                    padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 8, border: "none",
                    cursor: loading ? "not-allowed" : "pointer", flexShrink: 0,
                    fontFamily: "inherit", transition: "background .15s",
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#FF4D14"; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#0A0A0A"; }}
                >
                  {loading ? <Loader2 size={16} className="spin"/> : <ArrowRight size={16}/>}
                  <span>점검</span>
                </button>
              </div>

              {showSugg && matches.length > 0 && !loading && (
                <div style={{
                  position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                  background: "#FFF", border: "1px solid rgba(10,10,10,0.18)", borderRadius: 12,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.08)", maxHeight: 300, overflowY: "auto", zIndex: 50,
                }}>
                  {matches.slice(0, 8).map((s, i) => (
                    <div
                      key={s.n + s.c}
                      onMouseDown={e => { e.preventDefault(); selectMatch(s); }}
                      onMouseEnter={() => setActiveIdx(i)}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "13px 18px", cursor: "pointer",
                        borderBottom: i < Math.min(matches.length, 8) - 1 ? "1px solid rgba(10,10,10,0.10)" : "none",
                        background: i === activeIdx ? "#FFF1EB" : "transparent", transition: "background .12s",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: 15, fontWeight: 600 }}>{highlightText(s.n, query.trim())}</span>
                        <span style={{
                          fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.1em",
                          padding: "2px 6px", borderRadius: 4, marginLeft: 10,
                          background: s.m === "KOSDAQ" ? "#FFF1EB" : "#F0F0EC",
                          color: s.m === "KOSDAQ" ? "#FF4D14" : "#6B6B66",
                        }}>{s.m}</span>
                      </div>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "#6B6B66" }}>{s.c}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!result && !loading && !error && (
              <p style={{ fontSize: 12, color: "#6B6B66", textAlign: "center", marginBottom: 28 }}>
                <kbd style={kbdStyle}>↑</kbd> <kbd style={kbdStyle}>↓</kbd> 선택, <kbd style={kbdStyle}>Enter</kbd> 점검
              </p>
            )}

            {!result && !loading && !error && (
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 32 }}>
                <div style={{ width: "100%", textAlign: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B6B66", marginBottom: 6 }}>
                  자주 찾는 종목
                </div>
                {POPULAR.map(name => (
                  <button
                    key={name}
                    onClick={() => { setQuery(name); runCheck(resolveStock(name)); }}
                    style={{
                      padding: "7px 14px", background: "#FFF",
                      border: "1px solid rgba(10,10,10,0.18)", borderRadius: 999,
                      fontSize: 13, fontWeight: 500, color: "#0A0A0A", cursor: "pointer",
                      transition: "all .15s", fontFamily: "inherit",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#0A0A0A"; e.currentTarget.style.color = "#FFF"; e.currentTarget.style.borderColor = "#0A0A0A"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#FFF"; e.currentTarget.style.color = "#0A0A0A"; e.currentTarget.style.borderColor = "rgba(10,10,10,0.18)"; e.currentTarget.style.transform = "none"; }}
                  >{name}</button>
                ))}
              </div>
            )}

            {loading && (
              <div style={{ marginTop: 20, padding: "40px 24px", background: "#FFF", border: "1px solid rgba(10,10,10,0.10)", borderRadius: 14, textAlign: "center" }}>
                <Loader2 size={28} style={{ color: "#FF4D14", margin: "0 auto 14px" }} className="spin"/>
                <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, marginBottom: 6 }}>
                  <em style={{ fontStyle: "italic", color: "#FF4D14" }}>{resolvedStock?.n || query}</em> 점검 중
                </div>
                <p style={{ fontSize: 13, color: "#6B6B66" }}>최신 뉴스 · 토론방 · 공시를 확인하고 있어요</p>
              </div>
            )}

            {error && !loading && (
              <div style={{ marginTop: 20, padding: "24px", background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 14, textAlign: "center" }}>
                <AlertTriangle size={22} style={{ color: "#991B1B", margin: "0 auto 10px" }}/>
                <div style={{ fontWeight: 600, color: "#991B1B", marginBottom: 4 }}>점검에 실패했어요</div>
                <p style={{ fontSize: 13, color: "#7F1D1D", marginBottom: 14 }}>{error}</p>
                <button onClick={() => resolvedStock && runCheck(resolvedStock)}
                  style={{ padding: "8px 16px", background: "#991B1B", color: "#FFF", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
                >다시 시도</button>
              </div>
            )}

            {showResult && (
              <div style={{ marginTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, paddingBottom: 14, borderBottom: "2px solid #0A0A0A", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B6B66", marginBottom: 6 }}>
                      점검 결과 · {resolvedStock?.m !== "?" ? resolvedStock?.m : "-"}
                    </div>
                    <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 32, lineHeight: 1, letterSpacing: "-0.02em" }}>
                      {resolvedStock?.n || query} <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "#6B6B66" }}>{resolvedStock?.c}</span>
                    </div>
                  </div>
                  <button onClick={reset}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "transparent", border: "1px solid rgba(10,10,10,0.18)", borderRadius: 8, fontSize: 12, fontWeight: 500, color: "#0A0A0A", cursor: "pointer", fontFamily: "inherit" }}
                  ><RotateCcw size={13}/> 새로 점검</button>
                </div>

                <ResultCard icon={<Newspaper size={16}/>} num="01" tag="NEWS" tagBg="#0A0A0A" title="최신 뉴스" body={result.news}/>
                <ResultCard icon={<MessageCircle size={16}/>} num="02" tag="SENTIMENT" tagBg="#0A0A0A" title="토론방 분위기" body={result.sentiment}/>
                <ResultCard icon={<AlertTriangle size={16}/>} num="03" tag={result.riskLevel || "RISK"} tagBg={rl?.border || "#DC2626"} title="위험 신호" body={result.risk} accent={rl}/>

                <AdSlot id="in-article" label="Sponsored" variant="sponsored" height={120}/>

                <div style={{ marginTop: 16, padding: "16px 18px", background: "#F0F0EC", borderRadius: 12 }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B6B66", marginBottom: 10 }}>
                    공식 출처 바로가기
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
                    <ExtLink href={resolvedStock?.c ? `https://finance.naver.com/item/main.naver?code=${resolvedStock.c}` : "https://finance.naver.com"} label="네이버 시세"/>
                    <ExtLink href={resolvedStock?.c ? `https://finance.naver.com/item/board.naver?code=${resolvedStock.c}` : "https://finance.naver.com"} label="토론방"/>
                    <ExtLink href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(resolvedStock?.n || query)}`} label="관련 뉴스"/>
                    <ExtLink href={`https://dart.fss.or.kr/dsab007/main.do?textCrpNm=${encodeURIComponent(resolvedStock?.n || query)}`} label="DART 공시"/>
                  </div>
                  {result.sources && result.sources.length > 0 && (
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(10,10,10,0.10)" }}>
                      <div style={{ fontSize: 11, color: "#6B6B66", marginBottom: 6 }}>참고 출처</div>
                      {result.sources.slice(0, 5).map((src, i) => (
                        <a key={i} href={src} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: 11, color: "#FF4D14", textDecoration: "none", marginBottom: 3, wordBreak: "break-all" }}>
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

        <aside className="ad-sidebar" style={{ display: "none" }}>
          <div style={{ position: "sticky", top: 20 }}>
            <AdSlot id="sidebar-top" label="Sponsored" variant="square"/>
            <div style={{ height: 16 }}/>
            <AdSlot id="sidebar-bottom" label="Sponsored" variant="square"/>
          </div>
        </aside>
      </div>

      <div style={{ padding: "0 20px 20px", maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        <AdSlot id="bottom-banner" label="Sponsored" height={90}/>
      </div>

      <footer style={{ padding: "24px 28px", borderTop: "1px solid rgba(10,10,10,0.10)", fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.08em", color: "#6B6B66", textTransform: "uppercase" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, maxWidth: 1080, margin: "0 auto" }}>
          <span>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#22C55E", marginRight: 6 }} className="pulse"/>
            실시간 분석 · 한국 주식
          </span>
          <div style={{ display: "flex", gap: 18 }}>
            <Link href="/privacy" style={{ color: "#6B6B66", textDecoration: "none" }}>개인정보처리방침</Link>
            <Link href="/terms" style={{ color: "#6B6B66", textDecoration: "none" }}>이용약관</Link>
            <Link href="/about" style={{ color: "#6B6B66", textDecoration: "none" }}>소개</Link>
          </div>
        </div>
        <div style={{ maxWidth: 1080, margin: "16px auto 0", paddingTop: 12, borderTop: "1px solid rgba(10,10,10,0.06)", fontSize: 10, color: "#9B9B95", textTransform: "none", letterSpacing: 0, lineHeight: 1.6 }}>
          본 서비스는 정보 제공 목적으로만 운영되며, 어떠한 종류의 투자 자문이나 매매 권유도 아닙니다. 모든 투자 판단과 그에 따른 손익은 전적으로 투자자 본인에게 귀속됩니다.
        </div>
      </footer>

      <style>{`
        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        @keyframes pulse-anim { 0%,100% { opacity: 1; } 50% { opacity: .3; } }
        .pulse { animation: pulse-anim 1.6s infinite; }
        @media (min-width: 980px) {
          .main-grid { grid-template-columns: minmax(0, 1fr) 300px !important; }
          .ad-sidebar { display: block !important; }
        }
      `}</style>
    </div>
  );
}

const kbdStyle = {
  fontFamily: "JetBrains Mono, monospace", fontSize: 10,
  background: "#FFF", border: "1px solid rgba(10,10,10,0.18)",
  borderRadius: 4, padding: "1px 5px", margin: "0 1px",
};

function ResultCard({ icon, num, tag, tagBg, title, body, accent }) {
  const isRisk = !!accent;
  return (
    <div style={{
      background: isRisk ? accent.bg : "#FFFFFF",
      border: isRisk ? `1px solid ${accent.border}` : "1px solid rgba(10,10,10,0.10)",
      borderLeft: isRisk ? `4px solid ${accent.border}` : "4px solid #0A0A0A",
      borderRadius: 12, padding: "18px 20px", marginBottom: 10,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontSize: 22, color: "#FF4D14", lineHeight: 1 }}>{num}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: isRisk ? accent.text : "#0A0A0A" }}>
            {icon}
            <span style={{ fontSize: 14, fontWeight: 600 }}>{title}</span>
          </span>
        </div>
        <span style={{
          fontFamily: "JetBrains Mono, monospace", fontSize: 9, letterSpacing: "0.16em",
          padding: "3px 8px", borderRadius: 4, background: tagBg, color: "#FFF", fontWeight: 600,
        }}>{tag}</span>
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.65, color: isRisk ? accent.text : "#0A0A0A", margin: 0 }}>{body}</p>
    </div>
  );
}

function ExtLink({ href, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 12px", background: "#FFF", borderRadius: 8,
        textDecoration: "none", color: "#0A0A0A", fontSize: 12, fontWeight: 500,
        border: "1px solid rgba(10,10,10,0.10)", transition: "all .15s",
      }}
    >
      <span>{label}</span>
      <ExternalLink size={12}/>
    </a>
  );
}
