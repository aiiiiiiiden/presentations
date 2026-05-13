---
theme: default
title: Boil the Ocean, Together
info: |
  41분 발표 — Aiden, Flutter Seoul 2026-05-14
fonts:
  sans: 'Pretendard'
  mono: 'JetBrains Mono'
  local: 'Pretendard,JetBrains Mono'
  provider: none
colorSchema: dark
highlighter: shiki
download: true
exportFilename: boil-the-ocean-together
defaults:
  layout: default
transition: fade
---

<div class="absolute inset-0 grid place-content-center text-center">

# AI-First로 지식의 경계 확장하기

<div class="text-3xl text-zinc-500 mt-16 tracking-wide">
  Aiden · Flutter Seoul
</div>

</div>

<style>
.slidev-layout { background: radial-gradient(ellipse at center, rgba(234,0,44,0.14), transparent 80%), #0a0a0f; }
</style>

---
layout: center
---

# Boil the Ocean,
# **Together.**

<div class="text-lg text-zinc-500 mt-12">
  빈 칸을 채우는 한 단어가, 오늘의 정답입니다.
</div>

---
layout: section
---

# 1. 인트로

<div class="text-zinc-500 mt-4 text-lg">0:00 – 3:00 · 3분</div>

---

# 저는 누구냐면

<v-clicks>

- **플러터 서울** 오거나이저
- 19년차 소프트웨어 엔지니어, *조선해양공학 중퇴 → 호기심 따라*
- (전) 카카오 — 플랫폼·뱅킹·게임 서비스
- (현) 스타트업 공동창업자

</v-clicks>

<div class="mt-12 text-zinc-500 text-sm">
회사 이야기는 아닙니다. <span class="text-zinc-300">개인적 경험·생각</span>으로 함께 합니다.
</div>

---
layout: section
---

# 2. Garry Tan의 자기 모순

<div class="text-zinc-500 mt-4 text-lg">3:00 – 5:30 · 2.5분</div>

---
title: Don't ↔ Boil
---

<div class="grid grid-cols-2 gap-16 h-full place-content-center">

<div>
<div class="text-zinc-500 text-sm tracking-widest uppercase mb-4">2010</div>
<div class="text-2xl font-bold leading-snug">
"Don't boil<br/>the ocean."
</div>
<div class="text-zinc-500 mt-6">— Garry Tan</div>
</div>

<div>
<div class="text-zinc-500 text-sm tracking-widest uppercase mb-4">2026.02</div>
<div class="text-2xl font-bold leading-snug text-red-300">
"Boil<br/>the ocean."
</div>
<div class="text-zinc-500 mt-6">— Garry Tan</div>
</div>

</div>

---
layout: center
---

## 같은 사람.
## 같은 매체.
## **16년.**

<div class="text-zinc-500 mt-12 text-lg">
왜 정반대를 말했을까요? — 그 답을 <em>함께</em> 찾아보겠습니다.
</div>

---
layout: section
---

# 3. AI의 등장

<div class="text-zinc-500 mt-4 text-lg">5:30 – 10:30 · 5분</div>

---

# 3년 반의 이야기

<div class="grid grid-cols-4 gap-6 mt-8">

<div class="border-l-2 border-zinc-700 pl-4">
<div class="text-zinc-500 text-xs tracking-widest uppercase">2022.11</div>
<div class="text-lg font-bold mt-2">ChatGPT</div>
<div class="text-sm text-zinc-400 mt-2">대중과의 첫 만남</div>
</div>

<div class="border-l-2 border-zinc-700 pl-4">
<div class="text-zinc-500 text-xs tracking-widest uppercase">2023</div>
<div class="text-lg font-bold mt-2">GPT-4 · Claude</div>
<div class="text-sm text-zinc-400 mt-2">RAG / LangChain / VectorDB</div>
</div>

<div class="border-l-2 border-red-500 pl-4">
<div class="text-zinc-500 text-xs tracking-widest uppercase">2024</div>
<div class="text-lg font-bold mt-2">GPU · Cursor</div>
<div class="text-sm text-zinc-400 mt-2">구독 모델 · 1.5x 생산성</div>
</div>

<div class="border-l-2 border-red-400 pl-4">
<div class="text-zinc-500 text-xs tracking-widest uppercase">2025</div>
<div class="text-lg font-bold mt-2">Claude Code · Agent</div>
<div class="text-sm text-zinc-400 mt-2">Command → MCP → Skill → Sub-Agent</div>
</div>

</div>

---
layout: center
---

## Garry의 가치관이 바뀐 게 아닙니다.

## **세상이, 기술이 바뀌었습니다.**

---
layout: section
---

# 4. 7개 표준 개념

<div class="text-zinc-500 mt-4 text-lg">10:30 – 16:30 · 6분 · 누적 학습</div>

---

# 한 사람의 시나리오

<div class="text-2xl mt-12 text-zinc-300">
"<span class="text-white">SK하이닉스의 주가를 예측해서 알려줘</span>"
</div>

<div class="mt-12 text-zinc-500">
이 한 줄의 명령이, 7개 개념을 차례로 호출합니다.
</div>

---

# Block 1 — 두뇌

| 개념 | 1줄 정의 |
|---|---|
| **Model** | 사전 학습된 추론 시스템 — AI의 두뇌 |
| **LLM** | 자연어 입출력 모델 — 글로 답하는 모델 |
| **Prompt** | 모델에 1회 전달되는 입력 지시문 |

---

# Block 2 — 절차와 자율

| 개념 | 1줄 정의 |
|---|---|
| **Skill** | 영구 저장된 절차 명세 — 반복 적용되는 매뉴얼 |
| **Agent** | 목표를 받아 자율 작동하는 상위 모드 |

---

# Block 3 — 통로와 환경

| 개념 | 1줄 정의 |
|---|---|
| **MCP** | 외부 데이터·도구 연결의 표준 프로토콜 |
| **Harness** | Agent 실행 환경의 총체 — 권한·훅·설정의 합 |

---
layout: center
---

## Skill만으론 — **외부 데이터에 닿는 손**이 없습니다.

<div class="text-zinc-500 mt-12">
6-6 MCP 데모의 복선. <span class="text-red-300">Harness는 7장에서 다시 회수</span>합니다.
</div>

---
layout: section
---

# 5. Boil — 개인 문제 도입

<div class="text-zinc-500 mt-4 text-lg">16:30 – 18:30 · 2분</div>

---

# 제 이야기를 잠시

<v-clicks>

- 5년간 한 종목을 고집했습니다
- **-2.5억** 손절
- 잔여 5천만원
- *"이걸 AI에게 시켜보면 어떨까?"*

</v-clicks>

---
layout: center
---

## "Boil the ocean"이 옳아진 이유는 —

## 이제 **한 사람이 *나부터*** 끓일 수 있기 때문입니다.

---
layout: section
---

# 6. 데모 7단계

<div class="text-zinc-500 mt-4 text-lg">18:30 – 38:00 · 19.5분 · 라이브</div>

<div class="mt-16 grid grid-cols-7 gap-2 text-xs">
<div class="text-zinc-500 text-center">맨몸</div>
<div class="text-zinc-500 text-center">문서</div>
<div class="text-zinc-500 text-center">페르소나</div>
<div class="text-zinc-500 text-center">Skill</div>
<div class="text-zinc-500 text-center">Meta</div>
<div class="text-zinc-500 text-center">MCP</div>
<div class="text-zinc-500 text-center">Agent</div>
</div>

---
layout: section
class: bg-zinc-950
---

# 6-1. 맨몸 프롬프트
### 차단된 디렉토리에서 한 줄

<div class="text-zinc-500 mt-4 text-lg">18:30 – 22:30 · 4분</div>

---

## settings.json

```json {all|3}
{
  "permissions": {
    "allow": [],
    "deny": ["Bash", "Read", "Write", "Edit", "Skill", "WebFetch", "Task"]
  }
}
```

<div class="mt-6 text-zinc-500">
모든 도구 차단. <span class="text-zinc-300">LLM만 남깁니다.</span>
</div>

---
layout: center
class: demo-break
---

<div class="text-zinc-500 text-xs tracking-[0.3em] uppercase mb-6">자, 터미널로</div>

```bash {all}
cd ~/presentations/20260514/demo/01-no-context
claude -p --setting-sources project \
  "SK하이닉스의 내일 주가를
   상승·하락·횡보 확률로 예측해줘"
```

---

## 결과 — 일반론 백화점

<v-clicks>

- ❌ 어떤 종목인지 *모릅니다*
- ❌ 오늘 시장이 *어떤지* 모릅니다
- ❌ 어떤 분석 프레임도 없습니다
- ✅ *그래서* 면책 문구만 늘어놓습니다

</v-clicks>

<div class="mt-10 text-zinc-500">
"투자 결정은 본인의 판단과 책임..."
</div>

---
layout: section
class: bg-zinc-950
---

# 6-2. 문서 한 장
### PDF가 답을 *해석*으로 바꿉니다

<div class="text-zinc-500 mt-4 text-lg">22:30 – 25:30 · 3분</div>

---

## 차이는 한 줄

```json {3}
{
  "permissions": {
    "allow": ["Read"],
    "deny": ["Bash", "Write", "Edit", "Skill", "WebFetch"]
  }
}
```

```bash
$ ls
20260511_[반도체] SK하이닉스 (000660_매수).pdf
```

---
layout: center
class: demo-break
---

<div class="text-zinc-500 text-xs tracking-[0.3em] uppercase mb-6">데모 진입</div>

```bash
cd ~/presentations/20260514/demo/02-context
claude -p --setting-sources project \
  "..PDF 파일을 참고해서 SK하이닉스의
   주가를 상승·하락·횡보 확률로 예측해줘"
```

---

## 어조가 바뀝니다

<v-clicks>

- ✅ **목표주가 2,700,000원** (리포트 인용)
- ✅ **PER / PBR / ROE** 직접 호출
- ✅ 매수의견 유지, 상승여력 60%
- ❌ 분석 *프레임*은 여전히 즉흥적

</v-clicks>

<div class="mt-8 text-zinc-500">
<em>일반론</em> → <span class="text-red-300"><em>리포트 해석</em></span>
</div>

---
layout: section
class: bg-zinc-950
---

# 6-3. 페르소나 한 줄
### "너는 ___ 전문가야"

<div class="text-zinc-500 mt-4 text-lg">25:30 – 27:30 · 2분</div>

---

## 프롬프트 한 줄이 늘었습니다

<div class="text-lg mt-12 leading-relaxed">

"<span class="text-red-300">너는 반도체섹터 전문가야.</span>
SK하이닉스의 종목 리포트인
**20260511_[반도체] SK하이닉스.pdf** 파일을 참고해서
주가를 상승·하락·횡보 확률로 예측해줘"

</div>

---

## 톤이 *전문가화* 됩니다

<v-clicks>

- ✅ 메모리 사이클 — DRAM ASP·B/G·HBM 양산 캐파
- ✅ 빅테크 AI 캐펙스 — 코어위브·구글클라우드·AWS 수주잔고
- ✅ ROE 사이클 위치 평가
- ❌ *매번 새로 써야* 합니다

</v-clicks>

---
layout: section
class: bg-zinc-950
---

# 6-4. Skill — 매뉴얼로 저장
### `.claude/skills/semiconductor-analyst/SKILL.md`

<div class="text-zinc-500 mt-4 text-lg">27:30 – 29:30 · 2분</div>

---

## 페르소나가 매뉴얼이 됩니다

```markdown {all|1-3|5-9|11-15}
---
name: semiconductor-analyst
description: 한국 반도체 섹터 종목 분석...
---

# 반도체 섹터 전문가

당신은 한국 반도체 산업의 베테랑 애널리스트입니다.

## 분석 원칙

1. 메모리 사이클 — DRAM·NAND ASP·B/G, HBM
2. 재무 정합성 — P/B, ROE, 영업이익률, FCF
3. 공급 측 — 로드맵, 후공정, LTA 비중
...
```

---
layout: center
---

## *코드가 아닙니다.*

## **한국어 매뉴얼입니다.**

---

## 짧은 명령으로 같은 품질

```bash
claude -p --setting-sources project \
  "SK하이닉스 PDF를 참고해서
   주가를 상승·하락·횡보 확률로 예측해줘"
```

<div class="mt-10 text-zinc-500">
페르소나 한 줄은 <em>사라졌습니다</em>. <span class="text-red-300">Skill이 자동으로 가져옵니다.</span>
</div>

---
layout: section
class: bg-zinc-950
---

# 6-5. Meta-skill
### 매뉴얼을 *만드는* 매뉴얼

<div class="text-zinc-500 mt-4 text-lg">29:30 – 33:00 · 3분 30초</div>

---

## 명령 한 줄

```bash
claude -p --setting-sources project --dangerously-skip-permissions \
  "통신사 관련 종목의 주식 섹터 전문가 스킬을 생성하자"
```

<v-clicks>

- ① 입력 파싱 — "통신사" → `telecom-analyst`
- ② **WebFetch** — 위키 · 협회 · 리서치 페이지 자동 조사
- ③ **Write** — `.claude/skills/telecom-analyst/SKILL.md` 생성
- ④ 보고 — 경로·요약·트리거 키워드

</v-clicks>

---
layout: center
---

## 제가 한 줄도 안 썼는데,
## **매뉴얼이 한 장 만들어졌습니다.**

---
layout: center
class: gradient-hero
---

## 한 발 떨어져 봅시다.

<div class="text-2xl mt-8 leading-relaxed text-zinc-300">

요즘 <em>AI를 만드는 AI</em>라는 말 들어보셨죠.
AI가 AI를 학습시키고, 코드 짜는 AI가 또 다른 AI를 짜내고.

</div>

---
layout: center
---

## *AI가 AI를 만드는 시대인데,*

## **매뉴얼이 매뉴얼을 만드는 게 어려울 리 없죠.**

---
layout: center
---

## 지식의 경계를 넓히고
## 생산성을 가속하려면,

## **메타 도구를 안 쓸 이유가 없습니다.**

<div class="mt-12 text-red-300 text-2xl font-bold">필수입니다.</div>

---
layout: section
class: bg-zinc-950
---

# 6-6. MCP — 외부 통로
### 환경 한 줄이 답의 깊이를 바꿉니다

<div class="text-zinc-500 mt-4 text-lg">33:00 – 35:00 · 2분</div>

---

## 한국투자증권이 만든 도서관 카드

```json {all|3-12}
{
  "mcpServers": {
    "kis-code-assistant-mcp": {
      "command": "uv",
      "args": [
        "--directory",
        "./vendor/.../KIS Code Assistant MCP",
        "run", "server.py", "--stdio"
      ]
    }
  }
}
```

<div class="mt-6 text-zinc-500">
사람이 한 일은 <span class="text-zinc-300">이 한 단락이 전부</span>입니다.
</div>

---
layout: center
---

## **스킬은 6-5에서 만든 그대로.**

```bash {all}
$ diff 05-meta-skill/.claude/skills/telecom-analyst/SKILL.md \
       06-mcp/.claude/skills/telecom-analyst/SKILL.md
```

<div class="text-zinc-500 mt-6 text-sm">
(출력 없음 — 한 글자도 안 바뀌었습니다)
</div>

---
layout: center
class: demo-break
---

<div class="text-zinc-500 text-xs tracking-[0.3em] uppercase mb-6">데모 진입</div>

```bash
cd ~/presentations/20260514/demo/06-mcp
claude -p --setting-sources project \
  "SKT 종목 리포트 생성에 필요한
   KIS API를 알려줘"
```

---

## AI가 *자발적으로* 한투 자료실을 뒤집니다

```
[tool] mcp__kis-code-assistant-mcp__search_domestic_stock_api("현재가")
[tool] mcp__kis-code-assistant-mcp__search_domestic_stock_api("손익계산서")
[tool] mcp__kis-code-assistant-mcp__fetch_api_code(...)
```

<div class="mt-8 text-zinc-500">
수백 개 매뉴얼 중에서 <span class="text-red-300">SKT 분석에 필요한 것만</span> 골라옵니다.
</div>

---
layout: center
---

## 매뉴얼은 그대로.
## 환경에 통로 한 줄.

## **답의 깊이가 한 발 더 들어갑니다.**

---
layout: section
class: bg-zinc-950
---

# 6-7. Agent — 자율 실행
### 메시지·시간·상태가 트리거

<div class="text-zinc-500 mt-4 text-lg">35:00 – 38:00 · 3분 · 라이브</div>

---

## 한계 — *제가 트리거하지 않으면*

| 무엇이 좋아졌나 | 무엇이 부족한가 |
|---|---|
| 분석 깊이 | *내가 매번 명령*해야 시작 |
| 매뉴얼 자동 생성 | *내가 터미널 앞*에 있어야 |
| 외부 지식 통로 | *밤·주말·휴가 중*엔 멈춤 |

---
layout: center
---

## 4장의 Agent 정의를 다시:

## 목표를 받아 — *스스로 도구를 골라,*
## *스스로 실행 시점을 정해,*
## **스스로 결과를 평가**해 다음 행동을 결정.

---

# 트리거 3종

<div class="grid grid-cols-3 gap-6 mt-8">

<div class="border border-zinc-800 p-6 rounded-lg">
<div class="text-red-400 text-sm tracking-widest uppercase">메시지</div>
<div class="text-2xl font-bold mt-3">Telegram</div>
<div class="text-sm text-zinc-500 mt-4">즉시 분석 · <em>예약 알람</em></div>
</div>

<div class="border border-zinc-800 p-6 rounded-lg">
<div class="text-red-400 text-sm tracking-widest uppercase">시간</div>
<div class="text-2xl font-bold mt-3">Scheduler</div>
<div class="text-sm text-zinc-500 mt-4">매일 7시 자동 리포트</div>
</div>

<div class="border border-zinc-800 p-6 rounded-lg">
<div class="text-red-400 text-sm tracking-widest uppercase">상태</div>
<div class="text-2xl font-bold mt-3">Monitor</div>
<div class="text-sm text-zinc-500 mt-4">KOSPI 조건 만족 시</div>
</div>

</div>

---
layout: center
class: demo-break
---

<div class="text-zinc-500 text-xs tracking-[0.3em] uppercase mb-6">휴대폰으로</div>

<div class="text-2xl text-red-400 font-mono">
@your_bot_name
</div>

<div class="mt-6 text-zinc-500">
"SKT 종목 분석 리포트 작성해줘" → 휴대폰에 결과
</div>

<div class="mt-6 text-zinc-500">
"30초 뒤 SKT 단신 정리해줘" → 알람 등록 → 30초 후 자동 발사
</div>

---
layout: center
---

## Agent는 *사람이 트리거*하는 도구가 아닙니다.

## **메시지·시간·상태가 트리거**하는 도구입니다.

---
layout: center
class: gradient-hero
---

## 압도적 생산성 = *내가 일을 100배 하는 게 아니라,*

## **나 없이도 일이 진행되는 구조.**

---
layout: center
---

## ... 이걸 *도구*라고 부를 수 있을까요?

<div class="mt-12 text-zinc-500 text-sm">
(3초 침묵)
</div>

---
layout: section
---

# 7. 결론

<div class="text-zinc-500 mt-4 text-lg">38:00 – 41:00 · 3분</div>

---

# 우리가 함께 온 길

<div class="ladder space-y-3 mt-8 text-base">

<v-clicks>

- **6-1** 맨몸 프롬프트 → 똑같은 일반론
- **6-2** 문서 한 장 → 리포트 해석
- **6-3** 페르소나 한 줄 → 전문가 톤
- **6-4** 매뉴얼 (Skill) → 짧은 명령으로 재현
- **6-5** 매뉴얼을 만드는 매뉴얼 → *AI가 AI를 만든다*
- **6-6** 외부 통로 (MCP) → 지식의 경계 확장
- **6-7** 자율 실행 (Agent) → 일의 경계가 무너진다

</v-clicks>

</div>

---
layout: center
class: gradient-hero
---

## 오늘 발표장을 떠나기 전에,

## **한 가지만** 정하고 나가세요.

<div class="mt-12 text-zinc-500 text-base leading-relaxed">

매주 반복하는 일 한 가지 → Skill 한 장, 알람 하나, 스케줄 하나 → 내일 아침 한 번 돌려보기

</div>

---
layout: center
---

## 그리고 — 만든 다음에,

## **어떻게 만들었는지를 나눠주세요.**

<div class="grid grid-cols-2 gap-12 mt-12 text-left">

<div class="border border-zinc-800 p-6 rounded">
<div class="text-zinc-500 text-sm">결과만 자랑</div>
<div class="text-zinc-400 mt-2">"AI로 이런 거 만들었어요"</div>
<div class="text-zinc-600 text-sm mt-3">→ 혼자 끝남</div>
</div>

<div class="border border-red-700 bg-red-950/20 p-6 rounded">
<div class="text-red-300 text-sm">과정 공유</div>
<div class="text-zinc-300 mt-2">"이 Skill을 이렇게 짰고<br/>이 MCP를 이렇게 연결했어요"</div>
<div class="text-red-400 text-sm mt-3">→ 옆 사람도 1000x</div>
</div>

</div>

---
layout: center
class: gradient-hero
---

## 혼자서는 — *1000x도 한 사람의 하루*.

## 같은 속도로 일하는 동료들이 모이면 —

## **바다는 끓는다.**

---
layout: center
class: gradient-hero
---

# 내일 한 가지를 시작하시고,
# 어떻게 했는지를 나눠주세요.

## **그러면 — 같이 바다를 끓일 수 있습니다.**

<div class="mt-16 text-zinc-500">감사합니다.</div>

---
layout: center
---

# Q & A

<div class="text-zinc-500 mt-12">
github.com/aiiiiiiiden/presentations
</div>
