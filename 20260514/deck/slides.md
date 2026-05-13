<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!--
  ┌─────────────────────────────────────────────────────────────────┐
  │ ⚠️  Slidev 슬라이드 - 절대 자동 포매팅 금지                       │
  │                                                                 │
  │ 슬라이드별 frontmatter (---\nlayout: ...\n---) 패턴이           │
  │ Prettier 등 마크다운 포매터에 의해 setext 헤딩으로 잘못          │
  │ 인식되어 망가지는 문제가 있음.                                   │
  │                                                                 │
  │ 안전망 4중 적용:                                                 │
  │ 1. .vscode/settings.json (workspace + deck)                     │
  │ 2. .prettierignore (root + deck)                                │
  │ 3. .editorconfig                                                │
  │ 4. 이 파일 상단의 prettier-ignore-start 디렉티브 (현재 라인)    │
  └─────────────────────────────────────────────────────────────────┘
-->
---
theme: default
title: Boil the Ocean, Together
info: |
  41분 발표 — Aiden, Flutter Seoul 2026-05-14
fonts:
  sans: "Pretendard"
  mono: "JetBrains Mono"
  local: "Pretendard,JetBrains Mono"
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

<!--
안녕하세요. 플러터 서울 커뮤니티 오거나이저로 활동하고 있는 에이든입니다.

"AI-First로 지식의 경계 확장하기"라는 주제로 발표를 준비해왔습니다.

AI 도구에 대한 이해를 바탕으로, 우리의 일하는 방식을 어떻게 다시 정의하고 있는가에 대한 이야기를 하려 합니다.

자, 시작하겠습니다.
-->

---
layout: center
transition: fade
---

# Boil the Ocean, **Together.**

<!--
오늘 발표의 부제는 "Boil the Ocean, Together" 입니다.

"Boil the ocean"
직역하면 바다를 끓이라는 이야기인데, 이게 AI와 어떻게 관련있는지 살펴보겠습니다.
-->

---
layout: center
transition: slide-left
---

# 소개

<!--
먼저 제 소개를 하겠습니다.
-->

---
layout: center
class: text-2xl text-center
transition: fade
---

**플러터 서울** 오거나이저

**(현) 스타트업** 개발팀장

**(전) 카카오** 플랫폼·뱅킹·게임 서비스 개발

**조선해양공학 중퇴** 후 뒤늦게 개발 시작

<!--
플러터 서울 커뮤니티 오거나이저로 활동하고 있고,
스타트업을 공동창업자로 합류해 개발팀장으로 개발업무를 하고 있습니다.
이전에는 카카오에서 플랫폼·뱅킹·게임 쪽 서비스를 만들었습니다.

조선해양공학을 공부하다 중퇴 후 뒤늦게 개발을 시작했습니다.
다양한 프로젝트에 참여했다보니 항상 새로운 기술을 공부해야 했습니다. 이러한 경험이 오늘 전할 "AI-First 지식의 경계를 확장하기"라는 발표 주제와 맞닿아 있다 생각되네요.

오늘은 전할 이야기하는 저희 스타트업의 이야기가 아닙니다.
제가 최근 몇 달간 직접 부딪치고 깨달은 개인적인 경험과 생각을 나누려고 합니다.
-->

---
layout: center
transition: slide-left
---

# Garry Tan의 자기 모순

<!--
본론으로 들어가기 전에 한 가지 흥미로운 이야기를 먼저 드리고 싶습니다.
Y Combinator의 현재 CEO인 Garry Tan의, 자기 모순에 대한 이야기입니다.
-->

---
transition: slide-left
---

<div class="grid grid-cols-2 gap-16 h-full place-content-center">

<div>
<div class="text-zinc-500 text-sm tracking-widest uppercase mb-4">2010</div>
<div class="text-5xl font-bold leading-snug">
"Don't boil<br/>the ocean."
</div>
<div class="text-zinc-500 mt-6">— Garry Tan</div>
</div>

<div>
<div class="text-zinc-500 text-sm tracking-widest uppercase mb-4">2026.02</div>
<div class="text-5xl font-bold leading-snug text-red-400">
"Boil<br/>the ocean."
</div>
<div class="text-zinc-500 mt-6">— Garry Tan</div>
</div>

</div>

<!--
"Don't boil the ocean" 
2010년, 스타트업 컨퍼런스에서 Garry Tan이 한 이야기입니다.
바다를 끓이지 마라. 작게 시작해라, MVP부터 만들어라.
스타트업의 정설이었습니다. 모든 창업자가 이 말을 중요하게 여겼습니다.

"Boil the ocean."
2026년 2월, 불과 몇 달 전 Garry Tan은 정반대의 말을 합니다.

16년 사이 Garry Tan은 정확히 반대되는 두 메시지를 보냅니다.
-->

---
layout: center
class: text-center
transition: slide-left
---

# **16년**

<div class="text-zinc-400 mt-12 text-4xl">
왜 정반대를 말했을까요?
</div>

<!--
16년이 지나 왜 정반대의 말을 했을까요?
그 사이에 Garry Tan의 가치관이 바뀐 걸까요?
아니면 다른게 바뀌었을까요?
-->

---
layout: center
transition: slide-left
---

# AI

<!--
16년 사이에 말이 바뀐 이유는 바로 AI의 등장 때문입니다.
단순한 등장이 아닌 등장 후 3 반 사이 빠르게 발전한 일 때문입니다.
그러면 잠깐 그 흐름을 짚고 넘어가겠습니다.
-->

---
layout: center
transition: slide-left
---

# 3년 반의 이야기

<div class="grid grid-cols-4 gap-6 mt-20">

<div class="border-l-2 border-zinc-700 pl-4">
<div class="text-zinc-500 text-lg tracking-widest uppercase">2022</div>
<div class="text-lg font-bold mt-2">ChatGPT</div>
<div class="text-sm text-zinc-400 mt-2">대중과의 첫 만남</div>
</div>

<div class="border-l-2 border-zinc-700 pl-4">
<div class="text-zinc-500 text-lg tracking-widest uppercase">2023</div>
<div class="text-lg font-bold mt-2">GPT-4</div>
<div class="text-sm text-zinc-400 mt-2">RAG/LangChain/VectorDB</div>
</div>

<div class="border-l-2 border-red-500 pl-4">
<div class="text-zinc-500 text-lg tracking-widest uppercase">2024</div>
<div class="text-lg font-bold mt-2">GPU 전쟁과 Cursor</div>
<div class="text-sm text-zinc-400 mt-2">구독 모델 · 1.5x 생산성</div>
</div>

<div class="border-l-2 border-red-400 pl-4">
<div class="text-zinc-500 text-lg tracking-widest uppercase">2025</div>
<div class="text-lg font-bold mt-2">Claude Code · Codex</div>
<div class="text-sm text-zinc-400 mt-2">에이전트의 발전</div>
</div>

</div>

<!--
2022년 11월, ChatGPT가 처음 공개됐습니다. AI가 일반인의 대화 상대가 된 첫 사건이죠.

2023년에는 GPT-4가 나오면서, 우리 개발자들이
RAG, LangChain, 벡터 DB 같은 도구로 AI를 서비스에 적용하기 시작했습니다.
주로 챗봇이나 검색 보조 정도였습니다.

2024년에는 분위기가 바뀝니다. GPU 확보가 국가의 주요 사안이 되었고,
Cursor 같은 AI 코딩 에디터가 대중화됩니다. 구독 모델로 월 20달러쯤 내면
누구나 쓸 수 있게 됐습니다. 개인적으로는 Cursor를 사용할 때 개인 생산성이 1.5배 정도 올랐다는 느낌을 받았습니다.

그리고 2025년 — 작년이죠. 게임이 바뀝니다.
Claude Code가 나오면서, AI가 단순한 코딩 보조가 아니라
Command, MCP, Skill, Sub-Agent라는 4단계 진화를 시작합니다.
이게 오늘 데모로 동작 원리를 이해하기 위해 준비한 부분입니다.
-->

---
layout: center
transition: fade
---

## Garry의 가치관이 바뀐 게 아닙니다.

## **세상이, 기술이 바뀌었습니다.**

<!--
AI 등장 후 빠르게 발전한 과정에서 알 수 있듯이
Garry Tan의 가치관이 바뀐 게 아닙니다.
Garry Tan은 여전히 리소스를 효율적으로 분배하는게 중요하다 생각하고, 여전히 작은 팀이 큰 일을 해내는 걸 사랑합니다.
바뀐 건 — 세상입니다. 기술입니다.

2010년에는 한 사람이, 한 팀이 바다를 끓이는건 불가능했습니다.
그래서 작게 시작하라는 거였습니다.

그런데 2026년에는 — 한 사람이 바다를 끓일 수 있는 도구가 손에 쥐어졌습니다.
이게 16년 사이 Garry Tan이 정반대의 이야기를 한 이유입니다.
-->

---
layout: center
transition: slide-left
---

# 7개 표준 개념

<!--
한 사람이 바다를 끓일 수 있게 만든 도구인 AI와 관련된 7가지 개념을 정리하고 넘어가겠습니다.

외우실 필요는 없습니다
데모에서 각 각의 개념들을 단계적으로 적용하며 결과를 개선해 나가겠습니다.
-->

---
layout: center
transition: slide-left
---

<div class="text-5xl text-zinc-300">
"<span class="text-white">SK하이닉스의 주가를 예측해서 알려줘</span>"
</div>
<!--
가장 흔한 시나리오 하나를 가져왔습니다.
요즘 어딜 가나 주식 이야기, 특히 반도체 이야기가 들려옵니다.

짧은 기간에 급등한 대표적인 반도체 종목인 SK하이닉스를 보유하고 있다면
하락이 걱정되 ChatGPT, Gemini 등의 AI도구에게 이런 질문을 해보였을 것입니다.

\"SK하이닉스의 주가를 예측해서 알려줘."

이 한 줄을 7개 개념으로 단계적으로 감싸며 주가 예측의 퀄리티, 특히 신뢰도를 높여나가겠습니다.
-->

---
class: mt-30 text-2xl
transition: slide-left
---

| 개념        | 정의                                    |
| ---------- | -------------------------------------  |
| **Model**  | 사전 학습된 추론 시스템 — AI의 두뇌           |
| **LLM**    | 자연어 입출력 모델 — 글로 답하는 모델          |
| **Prompt** | 모델에 1회 전달되는 입력 지시문                |
<!--
처음 살펴 볼 3가지 개념은 Model, LLM, Prompt입니다.

Model은 사전 학습된 추론 시스템이에요. GPT-5, Claude Opus 같은 게 다 Model이죠.
AI의 두뇌라고 생각하시면 됩니다.

LLM은 Large Language Model. 글을 입력받고 글로 답하는 종류의 모델입니다.
글과 함께 이미지나 사운드 입력을 받거나 생성한다면 Multi Modal LLM 이라 하게 됩니다.

Prompt는 우리가 모델에 입력하는 지시문입니다.
"SK하이닉스의 주가를 예측해서 알려줘." 라는 지시문이 프롬프트가 됩니다.
-->

---
class: mt-40 text-2xl
transition: slide-left
---

| 개념      | 정의                                     |
| --------- | -------------------------------------------- |
| **Skill** | 영구 저장된 절차 명세 — 반복 적용되는 매뉴얼 |
| **Agent** | 목표를 받아 자율 작동하는 상위 모드          |

<!--
다음은 Skill과 Agent에 대해서 간단히 알아보겠습니다.

Skill은 — 일종의 매뉴얼입니다. 지시문을 반복적으로 사용해야될 경우
파일로 만들어 지시문을 손쉽게 재사용 가능하게 만들어줍니다.

Agent는 — 목표만 주면 자율적으로 Model과 함께 다양한 도구를 사용해가며 결과를 생성해내는 오늘 발표의 주인공입니다.
-->

---
class: mt-40 text-2xl
transition: fade
---

| 개념        | 정의                                   |
| ----------- | ------------------------------------------ |
| **MCP**     | 외부 데이터·도구 연결의 표준 프로토콜      |
| **Harness** | Agent 실행 환경의 총체 — 권한·훅·설정의 합 |

<!--
마지막은 MCP와 Harness 입니다.

MCP는 Model Context Protocol. 외부 데이터나 도구를 AI가 사용할 수 있도록 만든 규약입니다.
Anthropic이 만들었지만 이제는 표준이 됐습니다. 데모에서 MCP의 유용함에 대해 자세히 다루겠습니다.

Harness는 — 조금 추상적인데, Agent 동작에 사용되는 Model을 제외한 모든것입니다.
권한이 어떻게 설정돼 있는지, 어떤 훅이 걸려 있는지, settings.json에 뭐가 들어가는지 —
Skill이나 MCP 등 이 모든 게 Harness입니다.
-->

---
layout: center
transition: slide-left
---

# 아주 개인적인 이야기

<!--
좋습니다. 이론은 여기까지. 본격적으로 데모로 들어가기 전 
아주 개인적인 제 이야기를 들려드리겠습니다. 이 발표와 데모는 아주 개인적인 제 이야기에서 시작됐기 때문입니다.
-->

---
layout: center
class: text-4xl
transition: slide-left
---

- 5년간 강제 장투
- **2.5억** 손절 후 남은 **5천만원**
- 남은 5천만원을 AI에게 맞겨보자

<!--
저는 한 종목을 5년간 장투했습니다.
2만원에 산 주식이 75%가 빠졌습니다.

언젠가 회복할거란 믿음으로 5년을 들고 있었던 주식을 최근에야 손절했습니다.
2.5억을 손해보고 남은건 5천만원 이었습니다.
(이건 데모를 위한 가상의 이야기가 아니라 진짜 제 이야기입니다.)

손절 후 한 가지 결심을 했습니다.
앞으로는 감으로 주식을 하지 말자.
업무에도 많이 사용하고 있는 AI를 활용해보자.

SK하이닉스 종목을 분석해줘
3월의 어느 주말에 이 한 줄을 던져봤습니다.
그게 오늘 보여드릴 데모의 시작이었습니다.
-->

---
layout: center
class: text-3xl
transition: fade
---

## Let's boil the ocean.

<!--
AI를 활용해 주식 투자를 하다보니
Garry Tan이 "Boil the ocean"이라고 말했는지 이해하게 됐습니다.

퇴근 후, 주말 약간의 시간이라면 저마다 가진 다양한 문제를 해결하기 위해
바다를 끓일 수 있었습니다.

회사도 필요 없고,
학위도 필요 없고,
제품 개발은 약간의 시간이면 충분했고,
경험이나 기술력도 필요 없습니다.
AI 도구면 충분했습니다.

이제 그걸 어떻게 했는지, 7단계로 직접 보여드리겠습니다.
-->

---
layout: section
transition: slide-left
---

<div class="text-7xl">라이브 데모</div>
<div class="mt-16 text-2xl tracking-widest text-zinc-500">
Prompt | Context | Persona | Skill | Meta-Skill | MCP | Agent
</div>

<!--
이제 데모를 통해 단계적으로 AI를 주식 투자에 활용하기 위한 신뢰도를 높여 나가보겠습니다.

총 7단계로 구성했고, 각 단계마다 AI의 개념들을 하나씩 더해가겠습니다.
아주 간단한 프롬프트를 시작으로
문서를 컨텍스트로 주입고,
전문가 페르소나를 입힌 스킬도 만들어 보겠습니다.
스킬을 만드는 메타 스킬도 만들어보고,
최신 데이터를 활용해 신뢰할 수 있는 종목 분석을 위해 MCP도 활용해보고,
터미널에서 사용하는것에서 그치지 않고 스케쥴링과 봇을 활용해 지금과 같은 결과물을 만드는 과정을 살펴보겠습니다.

각 단계는 이전 단계 위에 누적된다는 게 핵심입니다.
AI를 응답 퀄리티를 높이기 위한 개념들이 하나씩 쌓이면 결과물이 어떻게 달라지는 살펴보겠습니다.
개발적인 부분은 최소화해서 설명하고, 발표 스크립트를 포함한 발표 자료와 데모 프로젝트를 공유드릴 예정이니 편하게 보시면 됩니다.
-->

---


<div class="text-4xl">1. Prompt</div>
<div class="text-2xl mt-20">.claude/settings.json</div>
<div class="text-xl text-zinc-400 mt-5">빈 디렉토리를 만들고, .claude/settings.json 파일을 아래와 같이 작성</div>
```json
{
  "permissions": {
    "allow": [],
    "deny": ["Bash", "Read", "Write", "Edit", "Skill", "WebFetch", "Task"]
  }
}
```

<!--
클로드 코드 CLI는 기본적으로 다양한 도구들이 활성화됩니다.
아무런 도구를 사용하지 않고 Claude Code의 기본적인 모델에 단순한 주가 분석 요청에 대해 어떤 응답이 오는지 확인하기 위해
디렉토리를 만들고 .claude/settings.json 설정 파일을 위와 같이 작성합니다.

allow 리스트가 비어 있고요, deny 리스트에는 — Bash, Read, Write, Edit, Skill,
WebFetch, Task — 모든 도구가 들어가 있습니다. 즉 전부 차단입니다.

-->

---

<div class="text-4xl">1. Prompt</div>
<div class="text-2xl mt-20">터미널</div>
<div class="text-xl text-zinc-400 mt-5">터미널에서 해당 디렉토리로 이동 후 헤드리스 모드로 실행</div>

```bash {all}
cd ~/presentations/20260514/demo/01-no-context
claude -p --setting-sources project \
  "SK하이닉스의 내일 주가를 상승·하락·횡보 확률로 예측해줘"
```

<!--
디렉토리로 이동하고요, claude 명령에 -p 옵션과 --setting-sources project 옵션을 적용합니다.
--setting-source project는 이 디렉토리에 settings.json 설정 파일만 사용하겠다는 뜻입니다.

첫 프롬프트인 "SK하이닉스의 내일 주가를 상승/하락/횡보 확률로 예측해줘" 라 요청합니다.

한 번 예상해 봅시다.
어떤 답이 나올 것 같으세요?
생각하신 것과 데모 결과를 비교해봅시다.
-->

---

<div class="text-4xl">1. Prompt</div>
<div class="text-2xl mt-20">결과</div>

- ❌ 오늘 주식 시장이 _어떤지_ 모릅니다
- ❌ 전문적인 분석이 아닌 일반적인 이야기 뿐입니다
- ✅ 투자 권유에 따른 법적 책임을 피하기 위해 면책 문구가 포함되어 있습니다.

<div class="mt-10 text-zinc-500">
"투자 결정은 본인의 판단과 책임..."
</div>

<!--
결과를 정리하면 이렇습니다.

첫째, 오늘 주식 시장이 어떤지 모르고.
둘째, 전문적인 분석이 아닌 일반적인 이야기 뿐이며
셋째, 투자 권유에 따른 법적 책임을 피하기 위한 면책 문구가 포함되어 있습니다.

도움이 되는 내용일까요?
단순한 LLM은 이게 정상입니다.
우리가 너무 많이 기대한 거죠.
-->

---

<div class="text-4xl">2. Context</div>
<div class="text-2xl mt-20">.clause/settings.json</div>
<div class="text-xl text-zinc-400 mt-5">PDF를 읽기 위한 권한 추가하기</div>
```json {3}
{
  "permissions": {
    "allow": ["Read"],
    "deny": ["Bash", "Write", "Edit", "Skill", "WebFetch"]
  }
}
```
<div class="text-2xl mt-5">터미널</div>
<div class="text-xl text-zinc-400 mt-5">PDF 참고해 주가 예측하도록 요청하기</div>
```bash
cd ~/presentations/20260514/demo/02-context
claude -p --setting-sources project \
  "..PDF 파일을 참고해서 SK하이닉스의 주가를 상승·하락·횡보 확률로 예측해줘"
```

<!--
미래에셋투자증권에 올라온 SK하이닉스의 리포트입니다.
데모 디렉토리에 pdf 파일을 포함시키고, Claude Code가 파일을 읽을 수 있도록 설정에 Read 권한을 허가로 지정합니다.

이제, PDF 리포트를 바탕으로 주가를 예측하도록 요청해 봅시다.

한 번 예상해 봅시다.
이번에는 어떤 답이 나올 것 같으세요?

-->

---

<div class="text-4xl">2. Context</div>
<div class="text-2xl mt-20">결과</div>

- ✅ 리포트 인용한 **목표주가 2,700,000원**
- ✅ 리포트 인용한 **PER / PBR / ROE**
- ✅ 매수의견 유지, 상승여력 60%
- ❌ 리포트에 의한 편향

<!--
리포트에 의해 응답의 어조가 전문적으로 바뀌었습니다.

리포트의 목표주가와 PER/PBR/ROE 등을 인용했습니다.
리포트 의견에 따라 매수 의견 유지됐으며, 리포트 속 목표 주가에 의해 상승여력이 60%로 증가했습니다.

PDF로 전달한 Context가 답을 바꾸긴 했지만 사실 이건 리포트를 해석 결과입니다.

"이 리포트에 뭐가 있으니까, 그걸 그대로 받아 적는다" — 그 수준입니다.
전문가처럼 자기 프레임으로 해석하지는 못해요.
-->

---

# 6-3. 페르소나 한 줄

### "너는 \_\_\_ 전문가야"

<div class="text-zinc-500 mt-4 text-lg">25:30 – 27:30 · 2분</div>

<!--
세 번째 단계 — 페르소나입니다.
프롬프트 엔지니어링에서 가장 흔히 쓰는 기법이에요.
"너는 누구야"를 한 줄 박아주는 거죠. 2분 안에 빠르게 갑니다.
-->

---

## 프롬프트 한 줄이 늘었습니다

<div class="text-lg mt-12 leading-relaxed">

"<span class="text-red-300">너는 반도체섹터 전문가야.</span>
SK하이닉스의 종목 리포트인
**20260511\_[반도체] SK하이닉스.pdf** 파일을 참고해서
주가를 상승·하락·횡보 확률로 예측해줘"

</div>

<!--
프롬프트 맨 앞에 한 줄이 늘었습니다. 빨갛게 강조된 줄이요.

"너는 반도체섹터 전문가야."

이게 페르소나입니다. AI에게 역할을 부여하는 거예요.
나머지는 동일합니다. PDF 파일 참고해서 확률로 예측해달라.

이 한 줄이 들어가면 — 답이 또 한 단계 깊어집니다.
-->

---

## 톤이 _전문가화_ 됩니다

<v-clicks>

- ✅ 메모리 사이클 — DRAM ASP·B/G·HBM 양산 캐파
- ✅ 빅테크 AI 캐펙스 — 코어위브·구글클라우드·AWS 수주잔고
- ✅ ROE 사이클 위치 평가
- ❌ _매번 새로 써야_ 합니다

</v-clicks>

<!--
보세요, 답에 도메인 용어가 막 튀어나옵니다.

메모리 사이클, DRAM ASP, B/G 비율, HBM 양산 캐파.
빅테크 AI 캐펙스, 코어위브, 구글클라우드, AWS 수주잔고.
ROE 사이클 위치 평가.

전부 반도체 애널리스트가 쓰는 표현이에요. 어조가 전문가가 된 거죠.

근데 — 이게 함정이 있습니다. 매번 이 한 줄을 새로 쳐야 해요.
"너는 반도체섹터 전문가야" 를 매 명령마다 입력해야 하는 거죠.
다른 종목을 분석하고 싶으면? 또 새로 칩니다. 사람이 지쳐요.
-->

---
layout: section
class: bg-zinc-950
---

# 6-4. Skill — 매뉴얼로 저장

### `.claude/skills/semiconductor-analyst/SKILL.md`

<div class="text-zinc-500 mt-4 text-lg">27:30 – 29:30 · 2분</div>

<!--
네 번째 단계 — Skill입니다. 매뉴얼로 저장하는 거예요.

매번 입력하기 귀찮은 페르소나를, 한 번 파일로 만들어두면
영구히 저장되고 자동으로 불러와집니다. 이게 Skill의 핵심입니다.
-->

---

## 페르소나가 매뉴얼이 됩니다

````markdown {all|1-3|5-9|11-15}
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
````

<!--
파일 하나를 보여드릴게요. .claude/skills/semiconductor-analyst 디렉토리 안에
SKILL.md 라는 파일이 있습니다.

맨 위 — 메타 데이터예요. name과 description이 들어가요.
Claude가 이 description을 보고, "아, 사용자가 반도체 분석을 요청하면
이 Skill을 자동으로 불러와야겠다" 를 판단합니다.

가운데 — 도입부예요. "당신은 한국 반도체 산업의 베테랑 애널리스트입니다."
페르소나 자체가 들어가 있죠.

아래 — 분석 원칙입니다. 메모리 사이클을 보고, 재무 정합성을 체크하고,
공급 측면을 분석하라. 매뉴얼이에요.
-->

---
layout: center
---

## _코드가 아닙니다._

## **한국어 매뉴얼입니다.**

<!--
중요한 건 — 이게 코드가 아니라는 점이에요.

전부 한국어로 쓰여 있어요. 사람이 읽을 수 있는 매뉴얼입니다.
프로그래밍을 모르시는 분도 — 이런 매뉴얼은 쓸 수 있어요.
사실 도메인 전문가일수록 더 잘 씁니다.

이게 우리가 알고 있던 "AI 설정"의 모습과 완전히 다른 지점이에요.
JSON도 아니고, YAML도 아니고, 그냥 한국어 문서.
-->

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

<!--
이제 명령을 다시 봅시다.
"SK하이닉스 PDF를 참고해서 주가를 예측해줘."

페르소나 한 줄이 — 사라졌어요. "너는 반도체 전문가야" 가 없습니다.
근데 답은 6-3의 전문가 톤 그대로 나옵니다.

왜냐하면 — Skill의 description에 "한국 반도체 섹터" 가 들어가 있으니까,
Claude가 SK하이닉스라는 단어를 보고 자동으로 매칭해서
Skill을 불러오는 거예요. 사람은 짧게 말해도 되는 거죠.

이게 Skill의 진짜 가치입니다. 한 번 만들면 — 영원히 짧게 명령할 수 있어요.
-->

---
layout: section
class: bg-zinc-950
---

# 6-5. Meta-skill

### 매뉴얼을 _만드는_ 매뉴얼

<div class="text-zinc-500 mt-4 text-lg">29:30 – 33:00 · 3분 30초</div>

<!--
다섯 번째 단계 — 여기가 오늘 발표에서 가장 임팩트 큰 데모 중 하나입니다.
"Meta-skill" — 매뉴얼을 만드는 매뉴얼이에요.

지금까지는 사람이 매뉴얼을 직접 썼어요. 그런데 — 이걸 AI가 쓰면 어떨까요?
-->

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

<!--
명령 한 줄입니다. "통신사 관련 종목의 주식 섹터 전문가 스킬을 생성하자."

--dangerously-skip-permissions 옵션은 — 데모를 위해서 권한 확인 단계를 건너뛰는 옵션이에요.
실제로는 추천하지 않습니다만, 데모 시간이 한정돼 있어서 켰습니다.

이걸 던지면 AI가 4단계로 자동 작동합니다.
첫째, "통신사" 라는 단어를 보고 — 이걸 어떤 이름으로 부를지 결정합니다. telecom-analyst.
둘째, WebFetch로 위키, 통신협회, 리서치 페이지를 — 자기가 알아서 조사합니다.
셋째, Write 권한으로 — 새로운 Skill 파일을 직접 생성해요.
넷째, 경로, 요약, 트리거 키워드를 — 저한테 보고합니다.

저는 한 줄도 안 썼어요. 매뉴얼 내용을 한 글자도 안 쳤습니다.
-->

---
layout: center
---

## 제가 한 줄도 안 썼는데,

## **매뉴얼이 한 장 만들어졌습니다.**

<!--
보세요. 제가 한 줄도 안 썼습니다.

방금까지는 "한국어로 매뉴얼을 쓰면 된다" 였잖아요? 그것도 쉽지는 않죠.
근데 — 이제는 매뉴얼조차 안 써도 됩니다. AI가 알아서 만들어요.

이게 무슨 의미인지, 한 발 떨어져서 생각해 봅시다.
-->

---
layout: center
class: gradient-hero
---

## 한 발 떨어져 봅시다.

<div class="text-2xl mt-8 leading-relaxed text-zinc-300">

요즘 <em>AI를 만드는 AI</em>라는 말 들어보셨죠.
AI가 AI를 학습시키고, 코드 짜는 AI가 또 다른 AI를 짜내고.

</div>

<!--
요즘 뉴스에서 "AI를 만드는 AI" 라는 말 자주 들어보셨을 거예요.

AI가 AI를 학습시키고, 코드 짜는 AI가 또 다른 AI를 짜내고.
강화학습이니, 자기 개선이니, 이런 단어들이 마구 나오죠.

뭔가 거창하고, 한편으로는 무섭게 들리는 이야기입니다.
-->

---
layout: center
---

## _AI가 AI를 만드는 시대인데,_

## **매뉴얼이 매뉴얼을 만드는 게 어려울 리 없죠.**

<!--
근데 한 발 떨어져서 보면 — 이건 자명한 결론입니다.

AI가 AI를 만드는 시대인데 —
매뉴얼이 매뉴얼을 만드는 게 — 어려울 리 없잖아요.

오히려 훨씬 쉽죠. 그냥 한국어 문서 한 장 만드는 일이니까요.
-->

---
layout: center
---

## 지식의 경계를 넓히고

## 생산성을 가속하려면,

## **메타 도구를 안 쓸 이유가 없습니다.**

<div class="mt-12 text-red-300 text-2xl font-bold">필수입니다.</div>

<!--
그래서 결론은 — 지식의 경계를 넓히고 싶다면,
생산성을 가속하고 싶다면,

메타 도구를 안 쓸 이유가 없습니다.
선택이 아니에요 — 필수입니다.

매뉴얼을 만드는 매뉴얼, 그걸 자동화하는 도구. 이게 안 쓰는 게 손해예요.
-->

---
layout: section
class: bg-zinc-950
---

# 6-6. MCP — 외부 통로

### 환경 한 줄이 답의 깊이를 바꿉니다

<div class="text-zinc-500 mt-4 text-lg">33:00 – 35:00 · 2분</div>

<!--
여섯 번째 단계 — MCP입니다.

4장에서 "Skill만으론 외부 데이터에 닿는 손이 없다" 고 말씀드렸죠.
그 손이 — 바로 MCP입니다. 외부 통로예요.
-->

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
        "run",
        "server.py",
        "--stdio"
      ]
    }
  }
}
```

<div class="mt-6 text-zinc-500">
사람이 한 일은 <span class="text-zinc-300">이 한 단락이 전부</span>입니다.
</div>

<!--
이게 한국투자증권이 공식으로 제공하는 MCP 서버 설정입니다.

JSON 한 단락이에요. mcpServers 아래에 kis-code-assistant-mcp 라는 서버를 등록하고,
uv 라는 파이썬 패키지 매니저로 server.py 를 실행하라는 — 한 줄짜리 명세입니다.

비유하자면 — 도서관 카드를 발급받는 일이에요.
저는 그냥 한국투자증권 도서관의 카드를 등록해 둔 거예요.
그 안에 무슨 책이 있는지, 어떻게 검색하는지는 — AI가 알아서 합니다.

사람이 한 일은 — 이 한 단락이 전부입니다.
-->

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

<!--
중요한 포인트 — Skill 파일은 6-5에서 AI가 만든 그대로입니다.

이걸 증명하기 위해 — diff 명령을 돌려봤어요.
6-5의 SKILL.md 와 6-6의 SKILL.md 를 비교한 거죠.

출력이 — 없습니다. 한 글자도 안 바뀌었어요. 정확히 같은 파일입니다.

그러니까 변한 건 — Skill이 아니라 환경이에요. MCP 서버 한 줄을 등록한 것뿐.
그런데 답이 어떻게 달라지는지 봅시다.
-->

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

<!--
이번엔 종목을 SKT로 바꿔봅니다. 통신사니까요. 6-5에서 만든 telecom-analyst skill이 트리거됩니다.

명령은 — "SKT 종목 리포트 생성에 필요한 KIS API를 알려줘."
KIS는 한국투자증권 약자예요.

저는 한국투자증권 API에 대해 — 아무것도 알려주지 않았습니다.
어떤 API가 있는지, 뭐가 필요한지, 한 글자도 안 적었어요.
근데 AI가 어떻게 답하는지 보세요.
-->

---

## AI가 _자발적으로_ 한투 자료실을 뒤집니다

```
[tool] mcp__kis-code-assistant-mcp__search_domestic_stock_api("현재가")
[tool] mcp__kis-code-assistant-mcp__search_domestic_stock_api("손익계산서")
[tool] mcp__kis-code-assistant-mcp__fetch_api_code(...)
```

<div class="mt-8 text-zinc-500">
수백 개 매뉴얼 중에서 <span class="text-red-300">SKT 분석에 필요한 것만</span> 골라옵니다.
</div>

<!--
AI가 자발적으로 — 한투 자료실을 뒤집니다.

보세요, tool call 로그입니다.
"현재가" API를 검색하고, "손익계산서" API를 검색하고,
필요한 코드를 fetch 해옵니다.

한국투자증권에는 수백 개의 API가 있어요. 그 중에서 —
"SKT 분석에 필요한 것" 만 — AI가 직접 골라옵니다.

저는 한투 API를 한 글자도 모르는데, AI가 알아서 찾아주는 거죠.
사람이 도서관 카드만 발급해주면, 책은 자기가 찾아서 읽습니다.
-->

---
layout: center
---

## 매뉴얼은 그대로.

## 환경에 통로 한 줄.

## **답의 깊이가 한 발 더 들어갑니다.**

<!--
6-6의 결론을 정리하면 —

매뉴얼은 그대로. 환경에 통로 한 줄을 더했을 뿐.
그런데 답의 깊이가 한 발 더 들어갑니다.

이게 MCP의 위력이에요. 그리고 4장에서 깔아뒀던 복선 — "외부 데이터에 닿는 손" —
이게 회수됐습니다.

자, 이제 마지막 단계로 갑니다.
-->

---
layout: section
class: bg-zinc-950
---

# 6-7. Agent — 자율 실행

### 메시지·시간·상태가 트리거

<div class="text-zinc-500 mt-4 text-lg">35:00 – 38:00 · 3분 · 라이브</div>

<!--
마지막 일곱 번째 단계 — Agent입니다.

이게 오늘 데모 중에서 가장 큰 임팩트일 거예요.
지금까지 만든 모든 도구를 — "자율 실행" 모드로 전환합니다.
-->

---

## 한계 — _제가 트리거하지 않으면_

| 무엇이 좋아졌나  | 무엇이 부족한가           |
| ---------------- | ------------------------- |
| 분석 깊이        | *내가 매번 명령*해야 시작 |
| 매뉴얼 자동 생성 | *내가 터미널 앞*에 있어야 |
| 외부 지식 통로   | *밤·주말·휴가 중*엔 멈춤  |

<!--
잠깐 — 지금까지의 한계를 한 번 짚고 갈게요.

6-1부터 6-6까지 — 분석 깊이는 좋아졌어요. 매뉴얼도 자동으로 만들어졌고.
외부 지식까지 닿을 수 있게 됐어요. 다 좋습니다.

근데 공통된 한계가 하나 있어요. 전부 — 제가 트리거해야 작동합니다.

매번 명령을 직접 쳐야 시작돼요.
내가 터미널 앞에 있어야 결과가 나옵니다.
밤이나 주말, 휴가 중에는 — 다 멈춰 있어요.

이걸 풀어야 진짜 1000x 생산성이 됩니다. 그게 Agent의 역할이에요.
-->

---
layout: center
---

## 4장의 Agent 정의를 다시:

## 목표를 받아 — _스스로 도구를 골라,_

## _스스로 실행 시점을 정해,_

## **스스로 결과를 평가**해 다음 행동을 결정.

<!--
4장에서 Agent를 정의했었죠. 다시 한번 보겠습니다.

목표를 받아 — 스스로 도구를 고르고,
스스로 실행 시점을 정하고,
스스로 결과를 평가해서 — 다음 행동을 결정한다.

"스스로" 라는 단어가 세 번 나옵니다. 이게 자율의 핵심이에요.

그러면 — 스스로 실행되는 시점을 어떻게 정할까요? 트리거 3종을 보여드릴게요.
-->

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

<!--
세 가지 트리거 방식이 있어요.

첫째, 메시지 트리거. Telegram이나 카카오톡 메시지가 오면 작동합니다.
즉시 분석할 수도 있고, "30초 뒤에 분석해줘" 같은 예약 알람도 가능해요.

둘째, 시간 트리거. Scheduler예요. 매일 아침 7시에 자동으로 리포트를 작성합니다.
제가 자고 있어도 알아서 돌아가요.

셋째, 상태 트리거. Monitor입니다. KOSPI가 어떤 조건을 만족하면 작동해요.
예를 들어 "코스피가 3% 빠지면 — 자동으로 종목 분석 실행" 같은 거죠.

오늘은 시간상 — 메시지 트리거 하나만 라이브로 보여드리겠습니다.
-->

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

<!--
자, 휴대폰을 꺼냅니다. 화면을 같이 보시죠.

Telegram 봇 하나를 만들어 뒀어요. 여기에 메시지를 던지면 작동합니다.

먼저 — "SKT 종목 분석 리포트 작성해줘." 보내봅니다.
지금 — 제 노트북에 있는 Agent가 메시지를 받아서, 분석을 시작했습니다.
잠시 후에 결과가 — 다시 휴대폰으로 옵니다.

그리고 두 번째 — "30초 뒤에 SKT 단신 정리해줘."
이건 예약 알람이에요. Agent가 — "아, 30초 뒤 트리거 등록해두자" 하고
알람을 거는 거예요. 그 동안 다른 슬라이드 설명을 이어가다 보면,
30초 뒤에 알아서 결과가 옵니다. 제가 아무것도 안 했는데도요.
-->

---
layout: center
---

## Agent는 *사람이 트리거*하는 도구가 아닙니다.

## **메시지·시간·상태가 트리거**하는 도구입니다.

<!--
이게 Agent의 진짜 정의예요.

Agent는 — 사람이 트리거하는 도구가 아닙니다.
메시지가, 시간이, 상태가 — 트리거하는 도구입니다.

저는 잠을 자도 됩니다. 휴가를 가도 됩니다.
제 Agent는 — 메시지가 오면 일을 하고, 7시가 되면 리포트를 쓰고,
시장 조건이 충족되면 — 알아서 시작합니다.

이게 도구의 정의 자체를 바꾸는 지점이에요.
-->

---
layout: center
class: gradient-hero
---

## 압도적 생산성 = _내가 일을 100배 하는 게 아니라,_

## **나 없이도 일이 진행되는 구조.**

<!--
저는 이렇게 정리하고 싶습니다.

압도적인 생산성, 1000x productivity 라는 말이 자주 쓰이는데 —
이건 제가 일을 100배, 1000배 더 빨리 한다는 게 아니에요.

진짜 의미는 — 내가 없어도 일이 진행되는 구조를 만든다는 거죠.

내가 자는 시간에도, 휴가 가 있는 시간에도,
다른 일을 하는 시간에도 — 일은 계속 굴러갑니다.

그게 한 사람이 바다를 끓일 수 있는 진짜 이유예요.
-->

---
layout: center
---

## ... 이걸 *도구*라고 부를 수 있을까요?

<div class="mt-12 text-zinc-500 text-sm">
(3초 침묵)
</div>

<!--
... 그런데 잠시. 한 가지 생각해 봅시다.

내가 없어도 일이 진행되는 — 이걸 우리가 여전히 "도구" 라고 부를 수 있을까요?
망치는 내가 들어야 작동합니다. 컴퓨터도 내가 키보드를 쳐야 움직여요.
근데 — 메시지가 와도, 시간이 돼도, 상태가 바뀌어도 — 알아서 작동하는 이것.

도구라기보다는 — 동료에 가깝지 않을까요?
같이 일하는, 늘 옆에 있는, 24시간 깨어 있는 동료요.

이게 — 오늘 발표의 마지막 질문입니다. 답은 여러분 마음속에 남겨두시고요.
이제 결론으로 갑니다.
-->

---
layout: section
---

# 7. 결론

<div class="text-zinc-500 mt-4 text-lg">38:00 – 41:00 · 3분</div>

<!--
마지막 3분입니다. 빠르게 정리하고 — 행동 요청으로 마무리할게요.
-->

---

# 우리가 함께 온 길

<div class="ladder space-y-3 mt-8 text-base">

<v-clicks>

- **6-1** 맨몸 프롬프트 → 똑같은 일반론
- **6-2** 문서 한 장 → 리포트 해석
- **6-3** 페르소나 한 줄 → 전문가 톤
- **6-4** 매뉴얼 (Skill) → 짧은 명령으로 재현
- **6-5** 매뉴얼을 만드는 매뉴얼 → _AI가 AI를 만든다_
- **6-6** 외부 통로 (MCP) → 지식의 경계 확장
- **6-7** 자율 실행 (Agent) → 일의 경계가 무너진다

</v-clicks>

</div>

<!--
같이 걸어온 길을 한 번 되짚어 봅시다.

6-1 — 맨몸 프롬프트. 일반론만 나왔어요.
6-2 — PDF 한 장 줬더니. 리포트 해석으로 바뀌었습니다.
6-3 — 페르소나 한 줄. 전문가 톤이 됐어요.
6-4 — Skill, 매뉴얼로 저장. 짧은 명령으로 같은 품질이 재현됐습니다.
6-5 — Meta-skill. AI가 매뉴얼을 만들어줬어요.
6-6 — MCP, 외부 통로. 지식의 경계가 한 발 더 넓어졌습니다.
6-7 — Agent, 자율 실행. 일의 경계 자체가 무너졌어요.

7단계의 누적입니다. 처음과 끝을 비교하면 — 완전히 다른 세계예요.
-->

---
layout: center
class: gradient-hero
---

## 오늘 발표장을 떠나기 전에,

## **한 가지만** 정하고 나가세요.

<div class="mt-12 text-zinc-500 text-base leading-relaxed">

매주 반복하는 일 한 가지 → Skill 한 장, 알람 하나, 스케줄 하나 → 내일 아침 한 번 돌려보기

</div>

<!--
오늘 이 발표장을 떠나기 전에 — 딱 한 가지만 정하고 나가시면 좋겠습니다.

너무 거창한 거 말고요. 매주 반복하는 일 한 가지면 됩니다.
그걸 — Skill 한 장으로 만들거나, 알람 하나로 트리거하거나, 스케줄 하나로 자동화.
딱 그 정도면 시작입니다.

그리고 — 내일 아침에, 한 번만 돌려보세요. 그게 첫걸음입니다.
완벽할 필요 없어요. 그냥 한 번. 그게 1000x의 출발점이에요.
-->

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

<!--
그리고 — 한 가지를 만든 다음에, 꼭 부탁드리고 싶은 게 있어요.

어떻게 만들었는지를 — 다른 사람과 나눠주세요.

왼쪽처럼 — "AI로 이런 거 만들었어요" 결과만 자랑하면, 거기서 끝납니다.
보는 사람이 부럽긴 한데, 따라할 수가 없어요. 혼자 끝나요.

오른쪽처럼 — "이 Skill을 이렇게 짰고, 이 MCP를 이렇게 연결했어요" —
과정을 공유하면, 옆 사람도 따라 할 수 있어요. 옆 사람도 1000x가 됩니다.

이게 오늘 부제 "Together"의 진짜 의미입니다.
-->

---
layout: center
class: gradient-hero
---

## 혼자서는 — _1000x도 한 사람의 하루_.

## 같은 속도로 일하는 동료들이 모이면 —

## **바다는 끓는다.**

<!--
혼자서는 — 1000x라고 해도 한 사람의 하루입니다.
24시간 곱하기 1000을 한들, 결국 한 사람이 만들어낼 수 있는 양은 정해져 있어요.

근데 — 같은 속도로 일하는 동료들이 모이면 —

바다는 끓습니다.

이게 Garry Tan이 16년 만에 "Don't"를 빼고 "Boil"이라고 말한 진짜 이유예요.
한 사람의 시대가 됐고, 그 한 사람이 모이면 — 진짜로 바다를 끓일 수 있는 시대가 됐기 때문입니다.
-->

---
layout: center
class: gradient-hero
---

# 내일 한 가지를 시작하시고,

# 어떻게 했는지를 나눠주세요.

## **그러면 — 같이 바다를 끓일 수 있습니다.**

<div class="mt-16 text-zinc-500">감사합니다.</div>

<!--
정리하면 두 가지 약속입니다.

내일 — 한 가지를 시작하세요.
그리고 — 어떻게 했는지를 나눠주세요.

그러면, 우리는 — 같이 바다를 끓일 수 있습니다.

오늘 부제의 빈 칸 — 기억하시죠? "Boil the Ocean, ___"
그 빈 칸의 답이 바로 "Together" 입니다. 같이.

긴 시간 들어주셔서 — 감사합니다.
-->

---
layout: center
---

# Q & A

<div class="text-zinc-500 mt-12">
github.com/aiiiiiiiden/presentations
</div>

<!--
질문 받겠습니다. 한 분씩, 짧게 부탁드릴게요.

그리고 — 슬라이드와 데모 코드 전체는 GitHub에 공개해 두었습니다.
github.com/aiiiiiiiden/presentations 에서 받으실 수 있어요.

오늘 보신 7단계 데모를, 그대로 손에 가져가실 수 있게 만들어 뒀습니다.
내일 한 가지를 시작하실 때 — 참고하시면 좋겠습니다.

그럼 — 질문 받겠습니다.
-->
<!-- prettier-ignore-end -->
