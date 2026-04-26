// 서버사이드 라우트 - Anthropic API 키를 브라우저에 노출하지 않음
// Vercel 환경변수 ANTHROPIC_API_KEY 에 키를 설정하면 됨

export const runtime = "edge";
export const maxDuration = 60;

export async function POST(req) {
  try {
    const { stockName, stockCode } = await req.json();
    const label = stockName + (stockCode ? ` (${stockCode})` : "");

    const userPrompt =
      `다음 한국 주식 종목에 대해 투자 전 점검을 해줘. 웹 검색으로 최신 정보를 확인하고 반드시 아래 JSON 형식으로만 답해줘 (다른 텍스트 없이 JSON만):\n\n` +
      `종목: ${label}\n\n` +
      `{\n` +
      `  "news": "최근 일주일 내 가장 중요한 뉴스 한 문장 (날짜 포함)",\n` +
      `  "sentiment": "네이버 종목토론방·커뮤니티 분위기와 화제 이슈 한 문장",\n` +
      `  "risk": "관리종목 지정/투자주의·경고·위험/거래정지/감사의견 거절/상장폐지 사유 등 위험 신호 한 문장 (없으면 '현재 특이 위험 신호 없음')",\n` +
      `  "riskLevel": "정상 또는 주의 또는 경고 또는 위기 중 하나",\n` +
      `  "sources": ["출처 URL 1", "출처 URL 2"]\n` +
      `}`;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API 키가 설정되지 않았습니다" }), {
        status: 500, headers: { "Content-Type": "application/json" }
      });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1500,
        messages: [{ role: "user", content: userPrompt }],
        tools: [{ type: "web_search_20250305", name: "web_search" }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: `API ${res.status}: ${errText}` }), {
        status: 500, headers: { "Content-Type": "application/json" }
      });
    }

    const data = await res.json();
    const text = data.content
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n")
      .trim();
    const cleaned = text.replace(/```json|```/g, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return new Response(JSON.stringify({ error: "응답 형식 오류", raw: text }), {
        status: 500, headers: { "Content-Type": "application/json" }
      });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return new Response(JSON.stringify(parsed), {
      status: 200, headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message || "서버 오류" }), {
      status: 500, headers: { "Content-Type": "application/json" }
    });
  }
}
