import StaticPage from "../StaticPage";

export const metadata = { title: "개인정보처리방침 · 1분점검" };

const sectionStyle = { fontFamily: '"Instrument Serif", serif', fontSize: 22, fontWeight: 500, marginTop: 32, marginBottom: 12, letterSpacing: "-0.01em" };
const pStyle = { marginBottom: 14 };

export default function Privacy() {
  return (
    <StaticPage eyebrow="Privacy Policy" title="개인정보처리방침">
      <p style={pStyle}>
        <strong>1분점검</strong>(이하 &ldquo;서비스&rdquo;)은 이용자의 개인정보를 중요시하며,
        「개인정보 보호법」 등 관련 법령을 준수하기 위해 노력하고 있습니다.
        본 개인정보처리방침은 서비스가 어떤 정보를 어떻게 수집·이용·관리하는지 안내합니다.
      </p>

      <h2 style={sectionStyle}>1. 수집하는 개인정보</h2>
      <p style={pStyle}>
        서비스는 회원가입 절차 없이 이용 가능하며, 별도의 개인정보를 직접 수집하지 않습니다.
        다만 다음과 같은 정보가 자동으로 수집될 수 있습니다.
      </p>
      <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
        <li style={{ marginBottom: 6 }}>접속 IP 주소, 접속 일시, 브라우저 종류 및 OS</li>
        <li style={{ marginBottom: 6 }}>서비스 이용 기록(검색한 종목명·코드 등)</li>
        <li style={{ marginBottom: 6 }}>광고 식별자(광고 네트워크가 수집)</li>
      </ul>

      <h2 style={sectionStyle}>2. 개인정보의 이용 목적</h2>
      <p style={pStyle}>
        수집된 정보는 서비스 제공·개선, 통계 분석, 부정 이용 방지, 법령상 의무 이행 목적으로만 이용됩니다.
        이용자의 동의 없이 목적 외의 용도로 사용하지 않습니다.
      </p>

      <h2 style={sectionStyle}>3. 쿠키 및 광고</h2>
      <p style={pStyle}>
        본 서비스는 광고 게재를 위해 카카오 애드핏(Kakao AdFit) 등 제3자 광고 네트워크를 사용할 수 있습니다.
        이러한 광고 네트워크는 쿠키 또는 유사 기술을 사용하여 이용자의 관심사 기반 광고를 제공할 수 있습니다.
      </p>
      <p style={pStyle}>
        이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
        광고 개인화에 대한 자세한 내용은 각 광고 네트워크의 정책을 참고해 주세요.
      </p>

      <h2 style={sectionStyle}>4. 개인정보의 보유 및 파기</h2>
      <p style={pStyle}>
        자동 수집된 접속 로그는 통계 및 보안 목적으로 최대 1년간 보관되며, 이후 지체 없이 파기됩니다.
        법령에 따른 보관 의무가 있는 경우 해당 기간 동안 보관됩니다.
      </p>

      <h2 style={sectionStyle}>5. 개인정보의 제3자 제공</h2>
      <p style={pStyle}>
        서비스는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
        다만, 법령에 의해 요구되거나 수사기관이 적법한 절차에 따라 요청하는 경우에는 예외로 합니다.
      </p>

      <h2 style={sectionStyle}>6. 이용자의 권리</h2>
      <p style={pStyle}>
        이용자는 언제든지 본인의 개인정보 열람·정정·삭제·처리정지를 요구할 수 있습니다.
        문의는 아래 연락처로 보내주시기 바랍니다.
      </p>

      <h2 style={sectionStyle}>7. 개인정보 보호책임자</h2>
      <p style={pStyle}>
        개인정보 보호책임자: 운영자<br/>
        문의: <a href="mailto:contact@example.com" style={{ color: "#FF4D14" }}>77rrr11@gmail.com</a>
      </p>

      <h2 style={sectionStyle}>8. 시행일 및 변경 고지</h2>
      <p style={pStyle}>
        본 방침은 2026년 4월 26일부터 시행됩니다. 내용 변경 시 서비스 내 공지를 통해 안내합니다.
      </p>
    </StaticPage>
  );
}
