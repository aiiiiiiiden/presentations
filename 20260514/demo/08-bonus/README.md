# 보너스 데모 / 08-bonus

발표 본편(6-1 ~ 6-7) 이후 시연 시간이 남거나 Q&A에서 "실제로는 어떻게 쓰고 있나요?" 가 나올 때를 위한 *실사용 결과물* 모음. 본편 데모가 "원리 한 발씩"이라면 이 폴더는 **저자가 평소 개인 용도로 운용 중인 MCP·Skill 세트를 그대로 돌려서 만든 실제 리포트**의 스냅샷이다.

---

## 1. 이 폴더는 무엇인가

- **개인 운용 자산**: 본편 6-4 ~ 6-6에서 배운 *스킬·메타스킬·MCP* 패턴을 **저자가 본인의 투자 리서치 워크플로에 맞춰 확장**한 결과물. 발표용으로 새로 만든 게 아니라, 일상적으로 돌리고 있는 시스템에서 뽑아 온 산출물.
- **두 가지 형태가 한 자리에**:
  1. *스킬 정의*(`SKILL.md`) — AI에게 도메인 분석 절차를 가르치는 매뉴얼
  2. *스킬 실행 결과*(`*_섹터분석_리포트.md` / `.pdf`) — 그 매뉴얼대로 돌렸을 때 실제로 만들어지는 리포트
- 같은 패턴이 **반도체**(전통 섹터)와 **스테이블코인**(2026 신생 섹터) 두 가지에 어떻게 일관되게 적용되는지를 비교하기 위해 2종을 같이 둠.

---

## 2. 구성 파일

```
08-bonus/
├── README.md                                    ← (이 문서)
│
├── bridge-sector-semiconductor/                 ← 개인 운용 스킬 (반도체 섹터)
│   └── SKILL.md
├── 20260514_반도체_섹터분석_리포트.md             ← 위 스킬이 만든 결과물
├── 20260514_반도체_섹터분석_리포트.pdf
│
├── bridge-sector-stablecoin/                    ← 개인 운용 스킬 (스테이블코인 섹터)
│   └── SKILL.md
├── 20260514_스테이블코인_섹터분석_리포트.md        ← 위 스킬이 만든 결과물
└── 20260514_스테이블코인_섹터분석_리포트.pdf
```

| 파일 | 분량 | 무엇인가 |
|---|---|---|
| `bridge-sector-semiconductor/SKILL.md` | 약 30KB | 반도체 섹터(메모리/HBM/파운드리/장비/소재/팹리스/패키징) 22개 대표 종목에 대한 *서브섹터 분류·핵심 지표·밸류에이션 밴드·정책 변수·실행 단계* 를 AI에게 가르치는 매뉴얼. 6-4의 `semiconductor-analyst/SKILL.md` 를 *실전 운용용*으로 확장한 형태. |
| `bridge-sector-stablecoin/SKILL.md` | 약 25KB | 글로벌 4대 규제(GENIUS Act / MiCA / 일본 PSA / 홍콩 Stablecoin Ordinance) + 한국 디지털자산기본법을 매크로로 두고, KRX 상장 종목 중 PG·핀테크·은행지주·거래소우회·STO·블록체인IT 6개 티어를 분석하는 매뉴얼. **2026년 5월 시점 기준**. |
| `20260514_반도체_섹터분석_리포트.md` / `.pdf` | 약 33KB | 위 반도체 스킬을 `2026-05-14` 시점 시장 데이터로 돌려 만든 실제 산출물. SK하이닉스 중심, 5종목 상세. |
| `20260514_스테이블코인_섹터분석_리포트.md` / `.pdf` | 약 32KB | 위 스테이블코인 스킬을 같은 날짜 데이터로 돌려 만든 실제 산출물. 6개 티어 + 핵심 5종목 상세. |

---

## 3. 어떻게 만들어졌나 — 개인 MCP / Skill 세트

이 결과물의 핵심은 **저자가 본인의 리서치용으로 따로 운용 중인 도구 세트**다. 발표 본편에서 보여 준 *공식 MCP/스킬* 위에 얹어 쓰는 사적 도구 계층이라고 보면 된다.

### 3.1 개인 MCP — `bridgestock`

발표 본편의 `kis-code-assistant-mcp`(한투 매뉴얼 검색) / `kis-data`(KIS API 호출 래퍼) 가 **공식·범용 도구**라면, `bridgestock` 은 저자가 *시장 분석 워크플로에 맞춰 직접 만든* MCP 서버다. 대표적으로 다음 도구들을 제공한다.

| 카테고리 | 도구 예시 |
|---|---|
| 시장 국면·매크로 | `get-market-condition`, `get-financial-conditions`, `get-risk-indicators`, `get-yield-curve`, `get-us-treasury-yields`, `get-move-index`, `get-credit-spreads`, `get-term-premium`, `get-fed-rate-path`, `get-cpi-yoy`, `get-fx-snapshot`, `get-commodities-snapshot` |
| 섹터·테마 | `get-sector-list`, `get-sector-performance`, `get-sector-stocks`, `get-theme-list`, `get-theme-stocks`, `recommend-by-sector` |
| 수급·이벤트 | `get-investor-flow`, `get-program-trading`, `get-etf-changes`, `get-index-changes`, `get-event-calendar`, `regenerate-event-calendar`, `get-investor-trading-share` |
| 종목 단건 | `get-company-profile`, `get-financials`, `get-technical-indicators`, `get-news-sentiment`, `get-analyst-consensus`, `get-earnings-forecast`, `get-quiet-accumulation-signal` |
| 시그널 스캐너 | `scan-market`, `scan-quiet-accumulation`, `scan-accumulation-acceleration`, `get-quiet-accumulation-signal` |
| 실시간/체결 | `kis-get-current-price`, `monitor-position`, `analyze-stock`, `batch-execute`, `check-crawler-health` |
| 리포트 | `generate-strategy-report` |

→ 위 두 리포트는 **이 도구들을 수십 개 단위로 병렬 호출** 해서 만들어졌다. 예를 들어 반도체 리포트의 경우 22개 대표 종목 × 종목당 9개 분석 도구 ≈ **180여 회의 MCP 호출**이 하나의 리포트 한 편을 만든다.

> *주의*: `bridgestock` MCP 자체는 본 레포지토리에 포함되지 않는다. 발표장에서 이 데모를 *라이브 재실행* 하는 것은 불가능하며, 이 폴더는 **결과물 열람·구조 학습용** 이다.

### 3.2 개인 Skill 세트 — `bridge-sector-*`

저자는 한국 시장의 전 섹터를 커버하기 위해 `bridge-sector-*` 네이밍의 섹터별 스킬을 운용하고 있다. 이 폴더에는 그중 2개를 발췌해 두었다.

운용 중인 다른 스킬 예시(전체 30+종): `bridge-sector-auto`, `bridge-sector-battery`, `bridge-sector-bio`, `bridge-sector-chemical`, `bridge-sector-defense`, `bridge-sector-display`, `bridge-sector-energy`, `bridge-sector-entertainment`, `bridge-sector-finance`, `bridge-sector-food`, `bridge-sector-healthcare-devices`, `bridge-sector-it`, `bridge-sector-kpop`, `bridge-sector-construction`, `bridge-sector-cosmetics`, `bridge-sector-emerging-markets`, `bridge-sector-power-equipment`, `bridge-sector-precious-metals`, `bridge-sector-securities`, …

각 스킬은 동일한 골격을 공유한다:

1. **서브섹터 분류 매트릭스** (해당 섹터를 6~8개 트랙으로 분해)
2. **핵심 분석 지표** (사이클 위치·규제 변수·밸류체인 단계별 시그널)
3. **밸류에이션 밴드** (서브섹터별 PER/PBR/PSR 범위)
4. **대표 종목 풀** (KRX 상장 20~30종목)
5. **실행 단계** (헬스체크 → 시장 현황 → 섹터/테마 → 종목 후보 → 종목 심층 → 리포트 작성)
6. **다른 섹터 스킬과의 경계** (중복 분석 방지)

> **본편 6-5(메타스킬)와의 관계**: 발표에서 보여 준 *통신사 분석가 자동 생성*이 "스킬 1개 만드는 방법"이었다면, 이 폴더의 스킬 세트는 **그 패턴을 30+개 섹터로 확장한 실제 운용 결과**다. 메타스킬이 일회성 트릭이 아니라 *실전 운용 가능한 자산 생성기*라는 증거.

### 3.3 결합 방식

```
[유저 한 줄 프롬프트]
       │
       ▼
[bridge-sector-{X} 스킬 로드]   ← 도메인 절차·지표·종목 풀 주입
       │
       ▼
[bridgestock MCP 병렬 호출]     ← 시장·섹터·종목 데이터 수집 (수십~수백 콜)
       │
       ▼
[Claude가 도메인 프레임으로 해석]
       │
       ▼
[/Users/cody/stocks/reports/{날짜}_{섹터}_섹터분석_리포트.md 생성]
```

스킬은 *"어떻게 분석할지"* 를, MCP는 *"무엇으로 분석할지"* 를 담당한다. 두 결과물 모두 이 파이프라인을 한 번 돌린 산출물이다.

---

## 4. 발표에서의 활용

### 사용 권장 시점

- **Q&A에서 "스킬·MCP를 실전에서는 어떻게 쓰시나요?" 가 나올 때** — 이 폴더를 열고 한 페이지만 스크롤해서 "본편 데모는 *원리 한 발씩*, 실제 운용은 이런 모양" 으로 보여준다.
- **본편 6-5(메타스킬) 직후 시간이 남을 때** — 메타스킬로 1개 생성한 결과가 *실전에선 30+개의 섹터별 자산*으로 확장된다는 줌아웃 메시지의 근거로 사용.
- **본편 6-7(에이전트) 보강** — 스케줄러로 매일 자동 생성되는 리포트의 모양이 어떤지 묻는 청중에게.

### 시연하지 않는 이유

- **데이터 의존성**: `bridgestock` MCP가 실시간 시장 데이터·외부 크롤러에 의존하므로 발표장 네트워크/시점에서 *동일 출력 재현 불가*.
- **시간**: 한 편당 180여 회 MCP 호출 → 5~10분 소요. 발표 슬롯 한계.
- **개인 운용 환경**: KIS 실전 키·내부 크롤러 인프라가 묶여 있어 *발표용 환경*에 그대로 옮길 수 없음.

→ 따라서 본 폴더는 **"이미 만들어진 결과물을 펼쳐 보이는 슬라이드 보조자료"** 의 역할로만 쓴다.

---

## 5. 빠른 열람 가이드

발표 중 펼칠 때 어디부터 봐야 하는지:

| 의도 | 펼칠 파일 | 보여줄 부분 |
|---|---|---|
| "스킬 하나가 얼마나 두꺼운지" | `bridge-sector-semiconductor/SKILL.md` | 첫 100줄(서브섹터·지표·밸류에이션 밴드) |
| "MCP를 얼마나 많이 부르는지" | 같은 파일 | "실행 단계 → 2단계·3.5단계·5단계" 의 병렬 호출 블록 |
| "결과 리포트가 얼마나 깊은지" | `20260514_반도체_섹터분석_리포트.pdf` | 1~3쪽(시장 환경·이벤트·매크로) 또는 *티어 분석* 섹션 |
| "2026 신생 섹터에도 그대로 되는지" | `bridge-sector-stablecoin/SKILL.md` + 동일 리포트 | 글로벌 규제 4종 + 한국 컨소시엄 매핑 |
| "두 섹터 결과물의 구조가 같은지" | 두 리포트 목차 | 동일 6~7 섹션 골격(시장 → 이벤트 → 매크로 → 섹터/테마 → 티어 → 종목 랭킹 → 종목 상세) |

---

## 6. 정리

- 본편 6-1~6-7이 *"왜 이게 되는지"* 의 증명이었다면, 08-bonus는 *"그래서 매일 이렇게 쓰고 있다"* 의 증거다.
- 본 폴더의 두 스킬·두 리포트는 모두 **저자 개인 용도로 운용 중인 `bridgestock` MCP + `bridge-sector-*` 스킬 세트**의 산출물이며, 본 발표 레포지토리에는 *결과물*만 포함된다(인프라 자체는 비공개).
- 발표 시에는 *라이브 재실행 없이*, "본편에서 보여드린 패턴을 30+개 섹터로 확장하면 매일 이런 리포트가 자동 산출됩니다" 의 근거 슬라이드로 활용한다.
