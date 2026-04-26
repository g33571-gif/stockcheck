import "./globals.css";

export const metadata = {
  title: "1분점검 · 투자 전 60초 체크리스트",
  description: "한국 주식 종목의 최신 뉴스, 토론방 분위기, 위험 신호를 한 줄로 요약해주는 투자 전 점검 도구",
  keywords: "주식, 투자, 종목 점검, 한국 주식, KOSPI, KOSDAQ, 투자 전 체크",
  openGraph: {
    title: "1분점검 · 투자 전 60초 체크리스트",
    description: "매수 전, 딱 한 번만 보세요. 뉴스·토론방·위험 신호를 한 줄로.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Pretendard:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
