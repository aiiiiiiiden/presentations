<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
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

<div class="text-4xl text-zinc-400 mt-16 tracking-wide">
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
layout: section
class: text-2xl
transition: fade
---

<div class="text-8xl font-bold mb-10">소개</div>

**플러터 서울** 오거나이저

**(현) 스타트업** 개발팀장

**(전) 카카오** 플랫폼·뱅킹·게임 서비스 개발

**조선해양공학 중퇴** 후 뒤늦게 개발 시작

<!--
먼저 제 소개를 하겠습니다.

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
class: text-xl
---

# Garry Tan

<!--
본론으로 들어가기 전에 한 가지 흥미로운 이야기를 먼저 드리고 싶습니다.
Y Combinator의 현재 CEO인 Garry Tan의, 자기 모순에 대한 이야기입니다.
-->

---
transition: slide-left
---

<div class="grid grid-cols-2 gap-16 h-full place-content-center">

<div>
<div class="text-zinc-500 text-xl tracking-widest uppercase mb-4">2010</div>
<div class="text-5xl font-bold leading-snug">
"Don't boil<br/>the ocean."
</div>
<div class="text-zinc-500 mt-6 text-xl">— Garry Tan</div>
</div>

<div>
<div class="text-zinc-500 text-xl tracking-widest uppercase mb-4">2026</div>
<div class="text-5xl font-bold leading-snug text-red-400">
"Boil<br/>the ocean."
</div>
<div class="text-zinc-500 mt-6 text-xl">— Garry Tan</div>
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

<div class="text-zinc-300 mt-10 text-5xl">
왜 정반대를 말했을까요?
</div>

<!--
16년 전과 지금. Garry Tan은 왜 정반대의 말을 하고 있을까요?
그 사이에 Garry Tan의 가치관이 바뀐 걸까요?
아니면 다른게 바뀌었을까요?
-->

---
layout: center
transition: slide-left
class: text-5xl
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

<div class="border-l-2 border-red-500 pl-4">
<div class="text-zinc-500 text-lg tracking-widest uppercase">2022</div>
<div class="text-lg font-bold mt-2">ChatGPT</div>
<div class="text-sm text-zinc-400 mt-2">대중과의 첫 만남</div>
</div>

<div class="border-l-2 border-red-500 pl-4">
<div class="text-zinc-500 text-lg tracking-widest uppercase">2023</div>
<div class="text-lg font-bold mt-2">GPT-4</div>
<div class="text-sm text-zinc-400 mt-2">RAG/LangChain/VectorDB</div>
</div>

<div class="border-l-2 border-red-500 pl-4">
<div class="text-zinc-500 text-lg tracking-widest uppercase">2024</div>
<div class="text-lg font-bold mt-2">GPU 전쟁과 Cursor</div>
<div class="text-sm text-zinc-400 mt-2">구독 모델 · 1.5x 생산성</div>
</div>

<div class="border-l-2 border-red-500 pl-4">
<div class="text-zinc-500 text-lg tracking-widest uppercase">2025</div>
<div class="text-lg font-bold mt-2">Claude Code · Codex</div>
<div class="text-sm text-zinc-400 mt-2">에이전트로의 진화</div>
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
class: text-center
---

# Garry Tan이 바뀐 게 아님
# **바뀐 건 세상**

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
class: text-center
---

# AI를 이해하기 위한
# **7개의 개념**

<!--
한 사람이 바다를 끓일 수 있게 만든 도구인 AI와 관련된 7가지 개념을 정리하고 넘어가겠습니다.

외우실 필요는 없습니다
데모에서 각 각의 개념들을 단계적으로 적용하며 결과를 개선해 나가겠습니다.
-->

---
layout: center
transition: slide-left
class: text-center text-2xl
---

## **SK하이닉스**의 주가를
## 예측해서 알려줘
<!--
가장 흔한 시나리오 하나를 가져왔습니다.
요즘 어딜 가나 주식 이야기, 특히 반도체 이야기가 들려옵니다.

짧은 기간에 급등한 대표적인 반도체 종목인 SK하이닉스를 보유하고 있다면
하락이 걱정되 ChatGPT, Gemini 등의 AI도구에게 이런 질문을 해보였을 것입니다.

\"SK하이닉스의 주가를 예측해서 알려줘."

이 한 줄을 7개 개념으로 단계적으로 감싸며 주가 예측의 퀄리티, 특히 신뢰도를 높여나가겠습니다.
-->

---
class: mt-20 text-2xl
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
class: mt-30 text-2xl
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
class: mt-30 text-2xl
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
class: text-2xl text-center
transition: slide-left
---

## 5년간 강제 장투

## **2.5억** 손절 후 남은 **5천만원**

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

<div class="text-8xl font-bold">라이브 데모</div>
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
transition: slide-left
---


<div class="text-5xl font-bold">1. Prompt</div>
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
transition: slide-left
---

<div class="text-5xl font-bold">1. Prompt</div>
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
transition: slide-left
---

<div class="text-5xl font-bold">1. Prompt</div>
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
transition: slide-left
---

<div class="text-5xl font-bold">2. Context</div>
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
transition: slide-left
---

<div class="text-5xl font-bold">2. Context</div>
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
transition: slide-left
---

<div class="text-5xl font-bold">3. Persona</div>
<div class="text-2xl mt-20">"너는 OOO 전문가야..."</div>
<div class="text-xl text-zinc-400 mt-5">프롬프트 엔지니어링에서 흔히 사용되는 페르소나를 지침에 적용해봅시다</div>

```bash
cd ~/presentations/20260514/demo/02-context
claude -p --setting-sources project \
  "너는 한국 증시의 반도체 섹터 전문가야..PDF 파일을 참고해서 SK하이닉스의 주가를 상승·하락·횡보 확률로 예측해줘"
```

<!--
세 번째 단계 — 페르소나입니다.
프롬프트 엔지니어링에서 가장 흔히 쓰는 기법이에요.
무엇무엇의 전문가다라는 정체성을 심는 한 줄이 응답 퀄리티를 높인다는건 이제 많이들 알고 있습니다.

"너는 한국 증시의 반도체섹터 전문가야."
AI에게 역할을 부여하는 거예요.

이 한 줄이 어떤 결과를 보여줄까요?
-->

---
transition: slide-left
---

<div class="text-5xl font-bold">3. Persona</div>
<div class="text-2xl mt-20">결과</div>

- ✅ 메모리 사이클 — DRAM ASP·B/G·HBM 양산 캐파
- ✅ 빅테크 AI 캐펙스 — 코어위브·구글클라우드·AWS 수주잔고
- ✅ ROE 사이클 위치 평가
- ❌ 요청할 때 마다 프롬프트를 반복 작성해야됨

<!--
반도체 섹터 전문가라는 역할을 부여한 것만으로 도메인 용어가 포함되며 전문성이 올라갔습니다.

메모리 사이클, DRAM ASP, B/G 비율, HBM 양산 캐파.
빅테크 AI 캐펙스, 코어위브, 구글클라우드, AWS 수주잔고.
ROE 사이클 위치 평가.

전부 반도체 애널리스트가 쓰는 표현입니다.

그런데 여기에는 함정이 있습니다.
매 요청마다 작성해야할 프롬프트가 늘어났고, 반도체 섹터 전문가로써 주가 예측을 어떤 과정을 통했는지 알 수 없습니다.
-->

---
transition: slide-left
---

<div class="text-5xl font-bold">4. Skill</div>
<div class="text-2xl mt-20">.claude/skills/semiconductor-analyst/SKILL.md</div>
<div class="text-xl text-zinc-400 mt-5">.claude/skills 디렉토리에 반도체 종목 분석 스킬 추가</div>

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

<!--
이제 Skill을 알아 봅시다.
반도체 섹터의 종목을 분석하는 매뉴얼을 .claude/skills 디렉토리에 파일로 저장합니다.

매번 입력하기 귀찮은 페르소나와 함께 반도체 섹터 분석을 위한 상세한 메뉴얼을 작성해두는거죠.
이 스킬은 필요에 스킬 상단의 frontmatter의 descripion에 의해 자동으로 불러와집니다.
이게 스킬의 장점입니다.

게다가 중요한 건 복잡한 코드도 아니고 상단의 frontmatter 규격만 맞추면 하단의 메뉴얼은 한국어로 자유롭게 작성할 수 있다는 점입니다.
프로그래밍을 모르시는 분도 읽고 수정할 수 있습니다.
만약 주식투자 전문가라면 메뉴얼을 더 잘 쓸 수 있게되는거죠.
-->

---
transition: slide-left
---

<div class="text-5xl font-bold">4. Skill</div>
<div class="text-2xl mt-20">실행</div>

```bash
claude -p --setting-sources project \
  "SK하이닉스 PDF를 참고해서 주가를 상승·하락·횡보 확률로 예측해줘"
```

<div class="text-2xl mt-5">결과</div>

- ✅ 메모리 사이클 — DRAM ASP·B/G·HBM 양산 캐파
- ✅ 빅테크 AI 캐펙스 — 코어위브·구글클라우드·AWS 수주잔고
- ✅ ROE 사이클 위치 평가
- ✅ 요청할 때 마다 프롬프트를 반복 작성할 필요 없음
- ❌ 도메인 전문 지식 필요 


<!--
이제 명령을 다시 봅시다.
"SK하이닉스 PDF를 참고해서 주가를 예측해줘."

반도체 섹터 전문가라는 역할 관련 지침을 전달하지 않아도 사용자의 요청에 의해 스킬이 로드되어 요청을 처리합니다.
Claude가 SK하이닉스라는 단어를 보고 자동으로 매칭해서 Skill을 불러옵니다.
사람은 짧게 말해도 되는 거죠.

사용 편의도 올라갔지만 중요한건
반도체 섹터의 종목 분석 과정에 우리의 의도를 적용할 수 있게 되었습니다.
하지만 도메인 전문 지식이 없다면 스킬을 제대로 활용하긴 어려울 것입니다.
-->

---
transition: slide-left
---

<div class="text-5xl font-bold">5. Meta-Skill</div>
<div class="text-2xl mt-20">메뉴얼을 만드는 메뉴얼</div>
<div class="text-xl text-zinc-400 mt-5">--dangerously-skip-permissions 옵션과 함께 통신사 관련 종목을 분석하는 전문가 스킬 생성하기
</div>

```bash
claude -p --setting-sources project --dangerously-skip-permissions \
  "통신사 관련 종목의 주식 섹터 전문가 스킬을 생성하자"
```

<!--
다섯 번째 단계 — 여기가 오늘 발표에서 가장 임팩트 큰 데모 중 하나입니다.
"Meta-skill" — 매뉴얼을 만드는 매뉴얼이에요.

지금까지는 사람이 매뉴얼을 직접 썼다면 이걸 AI를 통해 메뉴얼을 만드는 메뉴얼을 만들 차례입니다.

claude code를 통해 제어권이 쉽게 넘어가 보안 문제를 일으킬 수 있어
헤드리스 모드에서는 dangerously-skip-permissions 옵션과 함께 요청해야 합니다.

이 요청을 던지면 실행할 때 마다 확률적으로 달라지겠지만 아래와 같은 과정을 거쳐 telecom 섹터의 주식 종목을 분석하는 스킬이 만들어집니다.

"통신사" 라는 단어를 보고 — 이걸 어떤 이름으로 부를지 결정하고
Claude Code 내장 도구인 WebFetch 도구로 위키, 리서치 등의 페이지를 알아서 조사합니다.
Write 권한으로 새로운 Skill 파일을 직접 생성한 뒤 리서치한 내용을 바탕으로 스킬을 구성합니다.

(스킬을 보여주며)
통신사 도메인 전문가 아니자만 훌륭한 스킬이 생성됐습니다.
도메인 전문가가 아니면 작성하기 힘든 메뉴얼을 AI가 알아서 만들게 됩니다.

이게 무슨 의미인지, 한 발 떨어져서 생각해 봅시다.
-->

---
transition: slide-left
---

<div class="text-5xl font-bold">5. Meta-Skill</div>

<div class="text-2xl mt-8 leading-relaxed text-zinc-300">
<em>AI를 만드는 AI로</em> 지식의 경계 확장하기
</div>

<!--
"AI를 만드는 AI" 라는 말 자주 들어보셨을 거예요.

AI가 AI를 학습시키고, 코드 짜는 AI가 또 다른 AI를 짜내고.
강화학습이니, 자기 개선 등으로 인해 모델의 업데이트 주기가 빨라지고 있습니다.

뭔가 거창하고, 한편으로는 무섭게 들리는 이야기이지만,
Claude Code에는 스킬을 생성하는 스킬이 기본 탑재되어 있어 도메인 지식이 없어도 누구나 만들 수 있는거죠.

지식의 경계를 넓히고 싶다면,
생산성을 가속하고 싶다면,
메타 도구는 필수입니다.
-->

---
transition: slide-left
---

<div class="text-5xl font-bold">6. MCP</div>
<div class="text-2xl mt-20">외부 데이터 가져오기</div>
<div class="text-xl text-zinc-400 mt-5">
한국투자증권이 제공하는 KIS Code Assistant MCP
</div>

```json
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

<!--
여섯 번째 단계 — MCP입니다.

Skill은 잘 만든 메뉴얼이지만, 최신 데이터를 활용해야 한다면 메뉴얼 만으로는 부족합니다.
최신 데이터나 외부 데이터가 필요할 때 사용할 수 있는게 MCP입니다.

한국투자증권이 제공하는 KIS Code Assitant MCP는 Claude Code와 같은 에이전트들이
KIS가 제공하는 기능의 종류와 예제를 제공함으로써 손쉽게 연동할 수 있게 해줍니다.
저도 그렇지먼 메뉴얼 잘 안보고 급한 한국인에게는 너무 귀한 기능입니다.

KIS Code Assistant MCP 코드를 다운로드 받고, 클로드 코드로 KIS Trading의 Open API를 연동할 프로젝트에 MCP를 설정합니다.
.mcp 파일을 만들고 디렉토리와 인자를 설정하면 됩니다.
사실 KIS Code Assistant MCP의 가이드 문서 URL을 전달하면 알아서 모든 설정을 해줍니다.
-->

---
transition: slide-left
---

<div class="text-5xl font-bold">6. MCP</div>
<div class="text-2xl mt-20">KIS Code Assistant MCP</div>
<div class="text-xl text-zinc-400 mt-5">
SKT 종목 분석에 필요한 KIS API가 어떤게 있는지 알려줘
</div>

```bash
cd ~/presentations/20260514/demo/06-mcp
claude -p --setting-sources project \
  "SKT 종목 리포트 생성에 필요한 KIS API를 알려줘"
```

<div class="text-xl text-zinc-400 mt-5">
AI가 _자발적으로_ 한투 자료실을 뒤집니다
</div>

```
[tool] mcp__kis-code-assistant-mcp__search_domestic_stock_api("현재가")
[tool] mcp__kis-code-assistant-mcp__search_domestic_stock_api("손익계산서")
[tool] mcp__kis-code-assistant-mcp__fetch_api_code(...)
```

<!--
KIS Code Assistant MCP가 잘 설정됐다면 다음과 같이 요청해 봅시다.
"SKT 종목 리포트 생성에 필요한 KIS API를 알려줘."

저는 한국투자증권 API에 대해 아무것도 모르지만, KIS Code Assistant MCP는 종목 분석에 필요한 API를 예제외 함께
알려줍니다.

AI가 자율적으로 한투가 제공하는 메뉴얼을 살펴본 뒤 수백 개 매뉴얼 중에서 SKT 분석에 필요한 것만 골라옵니다.

"현재가" API를 검색하고, "손익계산서" API를 검색하고, 필요한 코드를 가져옵니다.
저는 한국투자증권의 KIS가 제공하는 API를 모르는데, AI가 알아서 찾아주는 거죠.

자, 이제 마지막 단계로 갑니다.
-->

---
transition: slide-left
---

<div class="text-5xl font-bold mb-20">7. Agent</div>
<div class="text-2xl font-bold mb-5">주식 투자 에이전트의 목표</div>

- 메신저를 통해 에이전트와 인터랙션
- 스케쥴러 기반의 액션
- 사용할 스킬이나 MCP를 자율적으로 선택
- 액션의 결과를 평가해 다음 행동을 결정

<!--
마지막 일곱 번째 단계 — Agent입니다.

이게 오늘 데모의 피날레입니다.
지금까지 사용한 도구를 보다 쓸모있게 만드는 단계입니다.

이번 데모의 에이전트는 아래와 같이 동작하게 구현했습니다.
메신저를 통해 에이전트와 인터랙션하게 함으로써 에이전트에 대한 접근성 증대
스케쥴러 기반의 액션을 통해 자동화
사용할 스킬이나 MCP를 자율적으로 선택하고
액션의 결과를 평가해 다음 행동을 자율적으로 결정하게 하는걸 목표로 했습니다.
-->

---
transition: slide-left
---

<div class="text-5xl font-bold">7. Agent</div>
<div class="text-2xl mt-20">액션 트리거 3종</div>

<div class="grid grid-cols-3 gap-6 mt-8">

<div class="border border-zinc-800 p-6 rounded-lg">
<div class="text-red-400 text-sm tracking-widest uppercase">메시지</div>
<div class="text-2xl font-bold mt-3">Telegram</div>
<div class="text-sm text-zinc-500 mt-4">즉시 실행 또는 예약 실행</div>
</div>

<div class="border border-zinc-800 p-6 rounded-lg">
<div class="text-red-400 text-sm tracking-widest uppercase">시간</div>
<div class="text-2xl font-bold mt-3">Scheduler</div>
<div class="text-sm text-zinc-500 mt-4">매일 10시 반복 실행</div>
</div>

<div class="border border-zinc-800 p-6 rounded-lg">
<div class="text-red-400 text-sm tracking-widest uppercase">상태</div>
<div class="text-2xl font-bold mt-3">Monitor</div>
<div class="text-sm text-zinc-500 mt-4">조건 만족 시</div>
</div>

</div>

<!--
주식 투자 에이전트를 유용하게 사용하려면 
세 가지 트리거 방식이 필요합니다.

첫째, 메시지 트리거. Telegram이나 카카오톡 메시지가 오면 작동합니다.
즉시 분석할 수도 있고, "30초 뒤에 분석해줘" 같은 예약 실행도 가능해야 합니다.

둘째, 시간 트리거. Scheduler예요. 매일 아침 10시에 자동으로 리포트를 작성합니다.
제가 매번 요청하지 있어도 알아서 동작해야 합니다.

셋째, 상태 트리거. Monitor입니다. 사용자에게 감시 조건을 받고 만족할 때 작동해야 합니다.
예를 들어 "코스피가 3% 빠지면 — 자동으로 종목 분석 실행" 같은 거죠.

오늘 데모는 첫째와 둘째 방식만 구현했습니다.
셋째 방식은 KIS Code Assistant MCP를 통해 웹소켓을 사용해 손쉽게 구현이 가능합니다.
-->

---
transition: fade
class: text-2xl
---

<div class="text-5xl font-bold mb-20">7. Agent</div>

- 30초 뒤 내게 메세지 보내줘
- 1분 뒤 SKT 종목 분석을 시작한 뒤 메세지를 보내줘
- KOSPI를 모니터링하다 시초가 대비 장중 2% 하락하면 내게 메세지 보내줘

<!--
자, 텔레그램을 실행합니다. 같이 보시죠.

Telegram 봇 하나를 만들고, Node/TypeScript 그리고 Claude Code 헤드리스 모드로 연동한 데모를 미리 구현해왔습니다.

에이전트를 실행해두고 "30초 뒤 내게 메세지 보내줘"라는 메세지를 보냅니다.
"1분 뒤 SKT 종목 분석을 시작한 뒤 메세지를 보내줘"
"KOSPI를 모니터링하다 시초가 대비 장중 2% 하락하면 내게 메세지 보내줘"

제 노트북에서 실행되고 있는 Agent가 메시지를 받아서, LLM을 통해 자연어를 분석한 뒤 자율적으로 동작을 결정합니다.

저는 잠을 자도 됩니다. 휴가를 가도 됩니다.
제 Agent는 — 메시지가 오면 일을 하고, 7시가 되면 리포트를 쓰고,
시장 조건이 충족되면 — 알아서 시작합니다.

이 데모는 바이브코딩으로 순식간에 구현했으며, 큰 인기를 끌고 있는 OpenClaw의 동작과 개념적으로 동일합니다.
-->

---
layout: center
class: gradient-hero text-center text-2xl
transition: fade
---

## 지식의 경계 확장하면
## **생산성 10x**

<!--
데모를 통해 지식의 경계를 확장하는건 zero to one.
할 수 없던 일을 할 수 있게 만들어준다는걸 알았습니다.

하지만 zero to one으로는 바다를 끓이기 어려울 것 입니다.
-->

---
layout: center
class: gradient-hero text-center text-2xl
transition: fade
---

## 자율형 에이전트로 활용하면
## **생산성 100x 이상**

<!--
바다를 끓이기 위해서는 AI를 자율적인 에이전트로 활용할 때 가능하다 생각합니다.
드넓은 바다를 끓이기 위해서는 zero to one이 아닌
내가 일을 하지 않아도 일이 진행되는 압도적인 생산성이 필요합니다.
1000x 10000x 생산성은 에이전트가 핵심인거죠.
-->

---
layout: center
transition: fade
class: text-2xl
---

## AI를 **도구**라 부를 수 있을까요?

<!--
그런데 잠시. 한 가지 생각해 봅시다.

내가 없어도 일이 진행되는 — 이걸 우리가 여전히 "도구" 라고 부를 수 있을까요?
망치는 내가 들어야 작동합니다. 컴퓨터도 내가 키보드를 쳐야 움직여요.
근데 — 메시지가 와도, 시간이 돼도, 상태가 바뀌어도 — 알아서 작동하는 이것.

도구라기보다는 — 동료에 가깝지 않을까요?
같이 일하는, 늘 옆에 있는, 24시간 깨어 있는 동료요.
-->

---
layout: center
class: text-2xl 
transition: slide-left
---

# 정리하기

<!--
발표를 정리하겠습니다.
-->

---
layout: center
---

<div class="space-y-1 mt-8 text-2xl text-zinc-300">

- Y Combinator의 CEO, Garry Tan
- AI Event Timeline
- Model, LLM, Prompt, Skill, MCP, Agent, Harness
- Agent Live Demo

</div>

<!--
같이 걸어온 길을 한 번 되짚어 봅시다.
Y Combinator의 CEO Garry Tan의 Don't boil the ocean과 Boil the ocean에 담긴 메시지를 AI 타임라인 기반으로 살펴봤습니다.
AI를 동작 시키는 7가지 개념을 살펴봤고, 데모앱에 단계적으로 적용하며 응답을 퀄리티를 높여갔습니다.
최종 데모는 라이브 데모를 통해 지식의 경계 확장과 자율적인 에이전트의 중요성에 대해서 살펴봤습니다.
-->

---
layout: center
class: gradient-hero text-2xl
---

## 결과보다 **과정**

<!--
오늘 발표는 결과보다 과정을 보여드리고 싶었습니다.
이렇게 만든 에이전트의 주식 수익률이 궁금하실겁니다.
대략 20번의 매매로 30%의 수익율을 올렸지만, 삼성전자와 하이닉스는 더 많이 올랐으니 주식투자만 놓고 보면 실패입니다.

하지만 에이전트 개발 경험을 이 곳에서 나누었고,
전파함으써 주식 투자 수익율로는 바꿀 수 없는 그 이상을 얻었다 생각됩니다.
-->

---
layout: center
class: text-center text-xl gradient-hero
---

## **과정**을 나누며
## **함께** 바다를 끓이는 도전

<!--
Boil the ocean, together
AI로 시도한 각자의 경험 나누며
함께 도전한 할 때 바다를 끓이는 불가능한 일이 가능해질거라 믿습니다.
-->

---
layout: center
transtion: fade
class: text-center text-2xl
---

## **감사합니다.**

<div class="text-zinc-200 mt-12 text-2xl">
github.com/aiiiiiiiden/presentations/20260514
</div>

<!--
긴 시간 들어주셔서 감사합니다
-->
<!-- prettier-ignore-end -->
