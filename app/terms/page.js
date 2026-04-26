import StaticPage from "../StaticPage";

export const metadata = { title: "이용약관 · 1분점검" };

const sectionStyle = { fontFamily: '"Instrument Serif", serif', fontSize: 22, fontWeight: 500, marginTop: 32, marginBottom: 12, letterSpacing: "-0.01em" };
const pStyle = { marginBottom: 14 };

export default function Terms() {
  return (
    <StaticPage eyebrow="Terms of Service" title="이용약관">
      <h2 style={sectionStyle}>제1조 (목적)</h2>
      <p style={pStyle}>
        본 약관은 <strong>1분점검</strong>(이하 &ldquo;서비스&rdquo;)이 제공하는 한국 주식 종목 정보 요약 서비스의 이용 조건과
        이용자의 권리·의무를 규정함을 목적으로 합니다.
      </p>

      <h2 style={sectionStyle}>제2조 (서비스의 내용)</h2>
      <p style={pStyle}>
        본 서비스는 이용자가 입력한 종목명 또는 종목코드에 대해 공개된 뉴스, 종목 토론방, 공시 등의 정보를
        AI 기반으로 요약하여 제공합니다. 제공되는 정보는 정보 전달 목적으로만 활용되어야 합니다.
      </p>

      <h2 style={sectionStyle}>제3조 (투자 자문 아님)</h2>
      <p style={pStyle}>
        <strong>본 서비스는 투자자문업, 유사투자자문업 등 어떠한 자문 서비스도 아닙니다.</strong>
        제공되는 정보는 매수·매도 권유가 아니며, 투자 판단의 참고자료로만 사용되어야 합니다.
        이용자는 본 서비스에서 제공하는 정보에 의존하여 투자 결정을 내려서는 안 됩니다.
      </p>

      <h2 style={sectionStyle}>제4조 (정보의 정확성)</h2>
      <p style={pStyle}>
        서비스는 제공되는 정보의 정확성·완전성·시의성을 보장하지 않습니다.
        AI가 자동으로 수집·요약한 정보이므로 오류가 포함될 수 있으며, 이용자는 항상 공식 출처(금융감독원 전자공시 등)를
        직접 확인할 책임이 있습니다.
      </p>

      <h2 style={sectionStyle}>제5조 (이용자의 책임)</h2>
      <p style={pStyle}>
        이용자가 본 서비스를 이용하여 행한 모든 투자 행위와 그로 인한 손익은 전적으로 이용자 본인에게 귀속됩니다.
        과거의 시세나 정보가 미래의 투자 수익을 보장하지 않습니다.
      </p>

      <h2 style={sectionStyle}>제6조 (서비스 운영자의 면책)</h2>
      <p style={pStyle}>
        서비스 운영자는 다음 사항에 대해 책임을 지지 않습니다.
      </p>
      <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
        <li style={{ marginBottom: 6 }}>제공된 정보를 이용한 투자 결과로 발생한 손실</li>
        <li style={{ marginBottom: 6 }}>정보의 오류·누락·지연으로 인한 손해</li>
        <li style={{ marginBottom: 6 }}>천재지변, 시스템 장애 등 불가항력으로 인한 서비스 중단</li>
        <li style={{ marginBottom: 6 }}>제3자가 운영하는 외부 링크의 내용 및 가용성</li>
      </ul>

      <h2 style={sectionStyle}>제7조 (금지 행위)</h2>
      <p style={pStyle}>
        이용자는 다음 행위를 해서는 안 됩니다.
      </p>
      <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
        <li style={{ marginBottom: 6 }}>서비스에 부당한 부하를 일으키는 자동화된 접근</li>
        <li style={{ marginBottom: 6 }}>서비스 화면을 무단으로 복제·재배포하는 행위</li>
        <li style={{ marginBottom: 6 }}>서비스를 이용한 시세조작, 허위정보 유포 등 불법 행위</li>
      </ul>

      <h2 style={sectionStyle}>제8조 (지적재산권)</h2>
      <p style={pStyle}>
        서비스의 디자인, UI, 코드 등 모든 콘텐츠에 대한 권리는 운영자에게 귀속됩니다.
        다만 요약된 정보의 원 출처에 대한 권리는 각 출처 보유자에게 있습니다.
      </p>

      <h2 style={sectionStyle}>제9조 (약관의 변경)</h2>
      <p style={pStyle}>
        운영자는 필요 시 본 약관을 변경할 수 있으며, 변경 사항은 서비스 내 공지를 통해 알립니다.
        변경된 약관은 공지된 시점부터 효력이 발생합니다.
      </p>

      <h2 style={sectionStyle}>부칙</h2>
      <p style={pStyle}>본 약관은 2026년 4월 26일부터 시행됩니다.</p>
    </StaticPage>
  );
}
