import StaticPage from "../StaticPage";

export const metadata = { title: "소개 · 1분점검" };

const sectionStyle = { fontFamily: '"Instrument Serif", serif', fontSize: 22, fontWeight: 500, marginTop: 32, marginBottom: 12, letterSpacing: "-0.01em" };
const pStyle = { marginBottom: 14 };

export default function About() {
  return (
    <StaticPage eyebrow="About" title="서비스 소개">
      <p style={{ ...pStyle, fontSize: 18, fontFamily: '"Instrument Serif", serif', fontStyle: "italic", color: "#1F1F1B", lineHeight: 1.5 }}>
        매수 버튼을 누르기 전, 딱 60초만 보세요.
      </p>

      <h2 style={sectionStyle}>왜 만들었나요</h2>
      <p style={pStyle}>
        개인투자자가 한 종목을 사기로 마음먹기까지, 보아야 할 정보는 너무 많습니다.
        뉴스를 검색하고, 토론방을 들여다보고, 공시를 확인하다 보면 정작 가장 중요한 신호를 놓치기 쉽습니다.
        <strong>1분점검</strong>은 그 과정을 단 세 줄로 압축합니다 — 최신 뉴스, 토론방 분위기, 위험 신호.
      </p>

      <h2 style={sectionStyle}>어떻게 작동하나요</h2>
      <p style={pStyle}>
        종목명 또는 6자리 종목코드를 입력하면, AI가 실시간으로 웹을 검색하여 다음 세 가지를 한 줄씩 요약합니다.
      </p>
      <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
        <li style={{ marginBottom: 8 }}><strong>최신 뉴스</strong> — 최근 일주일 내 가장 중요한 뉴스 한 문장</li>
        <li style={{ marginBottom: 8 }}><strong>토론방 분위기</strong> — 개인투자자들이 무엇에 흥분하고 두려워하는지</li>
        <li style={{ marginBottom: 8 }}><strong>위험 신호</strong> — 관리종목, 거래정지, 상장폐지 사유 등</li>
      </ul>

      <h2 style={sectionStyle}>중요한 안내</h2>
      <p style={pStyle}>
        본 서비스는 <strong>투자 자문이 아닙니다</strong>. 어떠한 매수·매도 권유도 하지 않으며,
        제공되는 정보의 정확성을 보장하지 않습니다. 모든 투자 판단과 그 결과는 이용자 본인의 책임입니다.
        실제 의사결정은 반드시 공식 출처(금융감독원 전자공시 등)를 직접 확인하신 후 내려주세요.
      </p>

      <h2 style={sectionStyle}>문의</h2>
      <p style={pStyle}>
        서비스 개선 제안, 오류 신고 등은 아래 이메일로 보내주세요.<br/>
        <a href="mailto:contact@example.com" style={{ color: "#FF4D14" }}>77rrr11@gmail.com</a>
      </p>
    </StaticPage>
  );
}
