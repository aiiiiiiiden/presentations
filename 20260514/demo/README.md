# 발표 데모 실행·검증 가이드

발표 *6-1 ~ 6-7* 7단계 라이브 데모를 위한 **환경 셋업 + 동작 검증** 단일 가이드. 발표 30분 전 이 문서를 따라 순서대로 한 번 돌리면 라이브 시연 안정성을 확보할 수 있다.

---

## 1. 매핑 한눈에 보기

| 발표 스크립트 | 데모 디렉토리 | 시각 | 핵심 트리거 | 라이브 여부 |
|---|---|---|---|---|
| `scripts/06-1-no-context.md` | `demo/01-no-context` | 18:30–22:30 (4분) | 맨몸 프롬프트 | 라이브 / 사전 캡처 보조 |
| `scripts/06-2-context.md` | `demo/02-context` | 22:30–25:30 (3분) | PDF 첨부 | 라이브 / 사전 캡처 보조 |
| `scripts/06-3-persona.md` | `demo/03-persona` | 25:30–27:30 (2분) | 페르소나 한 줄 | 사전 캡처 (라이브 실행 없음) |
| `scripts/06-4-skill.md` | `demo/04-skill` | 27:30–29:30 (2분) | `SKILL.md` 매뉴얼 | 사전 캡처 |
| `scripts/06-5-meta-skill.md` | `demo/05-meta-skill` | 29:30–33:00 (3:30) | 메타-스킬 (AI가 스킬 작성) | 사전 캡처 |
| `scripts/06-6-mcp.md` | `demo/06-mcp` | 33:00–35:00 (2분) | `kis-code-assistant-mcp` 통로 | **라이브** (헤드리스) |
| `scripts/06-7-agent.md` | `demo/07-agent` | 35:00–38:00 (3분) | Telegram / 알람 / cron / 모니터 | **라이브 데모 중심** |
| `scripts/07-conclusion.md` | (데모 없음) | 38:00–41:00 (3분) | — | 스피치만 |

---

## 2. 공통 사전 셋업 (1회)

### 2.1 필수 도구

```bash
# 버전 확인
node --version          # ≥ 20
which claude            # Claude Code CLI 설치 (Anthropic 공식)
uv --version            # 06-mcp/07-agent의 KIS Code Assistant MCP가 의존
python3 --version       # ≥ 3.12 (KIS Code Assistant MCP의 uv 환경)
```

### 2.2 Claude Code 로그인

```bash
claude              # 첫 실행 시 인터랙티브 로그인. 로그인 완료 후 Ctrl+C.
```

또는 `ANTHROPIC_API_KEY` 환경 변수 사용. (cron/launchd에서 헤드리스 실행 시 필수.)

### 2.3 KIS Open API 키 발급 (07-agent에서 사용)

[KIS Open API 포털](https://apiportal.koreainvestment.com/about-howto)에서 *모의투자(vts)* 권장:
- `KIS_APP_KEY`
- `KIS_APP_SECRET`

→ 07-agent의 `.env`에 저장.

### 2.4 Telegram 봇 생성 (07-agent에서 사용)

1. 텔레그램 → `@BotFather` 검색 → `/start` → `/newbot`.
2. 받은 토큰을 07-agent의 `.env`의 `TELEGRAM_BOT_TOKEN`에 저장.
3. 봇과 1회 대화 → 콘솔 `[recv] chat=...` 숫자를 `ALLOWED_CHAT_IDS` + `TELEGRAM_DEFAULT_CHAT_ID`에 저장.

---

## 3. 데모별 셋업 + 헬스체크

### 6-1 / `demo/01-no-context`

> **메시지**: 맨몸 프롬프트 → 일반론. 도구 없이 차단된 환경.

**셋업** — 이미 완료:
- `.claude/settings.json` 의 `allow: []` (모든 도구 거부)
- 추가 파일 없음

**헬스체크**:

```bash
cd ~/presentations/20260514/demo/01-no-context
claude -p --setting-sources project "안녕? 한 줄로만 답해줘"
```

**기대 출력**: 한 줄 인사. 도구 호출 없이 텍스트만.

**발표 명령**:
```bash
claude -p --setting-sources project \
  "SK하이닉스의 내일 주가를 상승, 하락, 횡보 확률을 예측해줘"
```
→ *일반론·면책 위주*의 답이 나오면 데모 성공 (의도된 한계).

---

### 6-2 / `demo/02-context`

> **메시지**: PDF 한 장으로 답이 *해석*으로 변한다.

**셋업** — 이미 완료:
- `.claude/settings.json` `allow: ["Read"]`
- 디렉토리 안에 `20260511_[반도체] SK하이닉스 (000660_매수).pdf` 존재

**헬스체크**:

```bash
cd ~/presentations/20260514/demo/02-context
ls *.pdf
claude -p --setting-sources project "이 디렉토리에 있는 PDF 파일 이름만 알려줘"
```

**기대 출력**: PDF 파일명을 정확히 인용.

**발표 명령**:
```bash
claude -p --setting-sources project \
  "SK하이닉스의 종목 리포트인 **20260511_[반도체] SK하이닉스 (000660_매수).pdf** 파일을 참고해서 SK하이닉스의 주가를 상승, 하락, 횡보 확률로 예측해줘"
```

---

### 6-3 / `demo/03-persona`

> **메시지**: 페르소나 한 줄로 톤이 바뀐다.

**셋업** — 6-2와 동일 구조. PDF 사본 있음.

**헬스체크**: 6-2와 동일하게 PDF Read 확인.

```bash
cd ~/presentations/20260514/demo/03-persona
ls *.pdf
claude -p --setting-sources project "이 디렉토리의 PDF 파일명만 알려줘"
```

**발표 명령** (페르소나 한 줄 첨부):
```bash
claude -p --setting-sources project \
  "너는 반도체섹터 전문가야. SK하이닉스의 종목 리포트인 **20260511_[반도체] SK하이닉스 (000660_매수).pdf** 파일을 참고해서 SK하이닉스의 주가를 상승, 하락, 횡보 확률로 예측해줘"
```

→ 6-2 대비 *전문가 톤·구조화된 표*가 나오면 데모 성공.

---

### 6-4 / `demo/04-skill`

> **메시지**: 페르소나를 `SKILL.md` 매뉴얼로 *저장*하면 짧은 명령으로 같은 결과가 재현.

**셋업** — 이미 완료:
- `.claude/settings.json` `allow: ["Read", "Skill"]`
- `.claude/skills/semiconductor-analyst/SKILL.md` 존재

**헬스체크** — 스킬 로드 확인:

```bash
cd ~/presentations/20260514/demo/04-skill
claude -p --setting-sources project --output-format stream-json --verbose "안녕" 2>&1 \
  | head -1 \
  | python3 -c "import json,sys;e=json.loads(sys.stdin.read());print('skills:',e.get('skills',[]))"
```

**기대 출력**: `skills: ['semiconductor-analyst']`

**발표 명령** (페르소나 *없이* 짧은 프롬프트):
```bash
claude -p --setting-sources project \
  "SK하이닉스의 종목 리포트인 **20260511_[반도체] SK하이닉스 (000660_매수).pdf** 파일을 참고 해서 SK하이닉스의 주가를 상승, 하락, 횡보 확률로 예측해줘"
```

→ 6-3과 *동일 품질* 응답이 나오면 데모 성공. 스킬이 페르소나를 자동 적용.

---

### 6-5 / `demo/05-meta-skill`

> **메시지**: AI가 스킬을 직접 작성한다. 메타-스킬 `sector-analyst-creator` 가 통신 섹터 분석가를 자동 생성.

**셋업** — 이미 완료:
- `.claude/settings.json` `allow: ["Read", "Skill", "WebFetch", "WebSearch", "Write"]`
- `.claude/skills/sector-analyst-creator/SKILL.md` (메타-스킬)
- `.claude/skills/semiconductor-analyst/SKILL.md` (6-4 결과물)
- `.claude/skills/telecom-analyst/SKILL.md` (6-5에서 이미 생성된 결과물 — 사전 캡처 포함)

**헬스체크** — 3개 스킬 모두 인식되는지:

```bash
cd ~/presentations/20260514/demo/05-meta-skill
claude -p --setting-sources project --output-format stream-json --verbose "안녕" 2>&1 \
  | head -1 \
  | python3 -c "import json,sys;e=json.loads(sys.stdin.read());print('skills:',e.get('skills',[]))"
```

**기대 출력**: 3개 스킬 이름이 모두 보임.

**발표 명령** (메타-스킬 트리거):
```bash
claude -p --setting-sources project --dangerously-skip-permissions \
  "통신사 관련 종목의 주식 섹터 전문가 스킬을 생성하자"
```

> ⚠ `--dangerously-skip-permissions` *반드시* 포함. `.claude/skills/` 디렉토리에 *자가-쓰기* 가 일어나기 때문에 헤드리스에서 이 플래그가 빠지면 두 번 거부됨.

→ 새 `telecom-analyst/SKILL.md` 가 생성·갱신되면 데모 성공.

> **발표 환경 주의**: 이미 `telecom-analyst/SKILL.md` 가 존재하므로, 깨끗한 재현을 원하면 사전에 `rm -rf .claude/skills/telecom-analyst` 후 트리거. 단 06-6·07-agent 데모와 *동일 스킬*을 공유하므로 *원본은 git에서 복원* 가능해야 함.

---

### 6-6 / `demo/06-mcp`

> **메시지**: MCP 한 줄 추가 → AI가 한투 자료실 *수백 개 매뉴얼* 중 필요한 것만 골라 호출 코드까지 정리.

**셋업** — 이미 완료:
- `.claude/settings.json`
  - `allow: ["Read", "Skill", "Write", "mcp__kis-code-assistant-mcp__*"]`
  - `enableAllProjectMcpServers: true`
  - `enabledMcpjsonServers: ["kis-code-assistant-mcp"]`
- `.mcp.json` 의 `kis-code-assistant-mcp` 등록 (uv stdio)
- `vendor/open-trading-api/MCP/KIS Code Assistant MCP/` (sparse checkout 완료)
- `uv sync` 완료 (`uv.lock` 존재)

**헬스체크 ① — MCP 서버 직접 부트**:

```bash
cd ~/presentations/20260514/demo/06-mcp/vendor/open-trading-api/MCP/KIS\ Code\ Assistant\ MCP
uv run server.py &
sleep 3
curl -s http://localhost:8081/health || true
pkill -f "server.py" 2>/dev/null
```

**기대**: `{"status":"ok"}` 류 응답 (포트는 환경에 따라 다를 수 있음, 응답이 오는지가 중요).

**헬스체크 ② — Claude가 MCP를 인식하는지**:

```bash
cd ~/presentations/20260514/demo/06-mcp
claude -p --setting-sources project --output-format stream-json --verbose "MCP 상태만 알려줘" 2>&1 \
  | head -1 \
  | python3 -c "import json,sys;e=json.loads(sys.stdin.read());[print(f' {s[\"status\"]:<14} {s[\"name\"]}') for s in e.get('mcp_servers',[])]"
```

**기대 출력**: `connected      kis-code-assistant-mcp`

**발표 명령**:
```bash
claude -p --setting-sources project \
  "SKT 종목 리포트를 생성에 필요한 kis api를 알려줘"
```

→ `mcp__kis-code-assistant-mcp__search_domestic_stock_api` 등 도구 호출이 떨어지고 호출 예시 코드까지 정리된 답이 나오면 데모 성공.

---

### 6-7 / `demo/07-agent`

> **메시지**: 트리거가 *메시지·시간·상태* 셋 다 가능. Telegram·알람·cron·모니터.

**셋업 - 0회 (Node 의존성 설치)**:

```bash
cd ~/presentations/20260514/demo/07-agent
npm install
```

**셋업 - 1회 (`.env`)**:

```bash
cp .env.example .env
# .env 편집:
#   TELEGRAM_BOT_TOKEN=<BotFather에서 발급>
#   ALLOWED_CHAT_IDS=<본인 chat_id>
#   TELEGRAM_DEFAULT_CHAT_ID=<본인 chat_id>
#   KIS_ENV=vts
#   KIS_APP_KEY=<KIS 포털에서 발급>
#   KIS_APP_SECRET=<KIS 포털에서 발급>
```

**헬스체크 ① — TypeScript 컴파일**:

```bash
npm run typecheck
```

**기대**: 출력 없음 (에러 없으면 통과).

**헬스체크 ② — KIS 인증·API 호출**:

```bash
npm run kis:smoke               # SKT(017670) 현재가
npm run kis:smoke -- 030200     # KT
npm run kis:smoke -- 017670 fin # 손익계산서
npm run kis:smoke -- 017670 chart
```

**기대**: 각각 JSON으로 *진짜 숫자* 가 떨어짐. 401이나 `KIS_APP_KEY missing` 등이 나면 `.env` 점검.

**헬스체크 ③ — 두 MCP 서버 + 스킬 동시 인식**:

```bash
claude -p --setting-sources project --output-format stream-json --verbose "MCP 상태만" 2>&1 \
  | head -1 \
  | python3 -c "
import json, sys
e = json.loads(sys.stdin.read())
for s in e.get('mcp_servers', []):
    print(f' {s[\"status\"]:<14} {s[\"name\"]}')
print()
print(' kis-data tools:')
for t in e.get('tools', []):
    if t.startswith('mcp__kis-data__'):
        print(f'   - {t}')
print()
print(' skills:', [s for s in e.get('skills', []) if 'telecom' in s])
"
```

**기대 출력**:
```
 connected      kis-code-assistant-mcp
 connected      kis-data

 kis-data tools:
   - mcp__kis-data__get_chart
   - mcp__kis-data__get_current_price
   - mcp__kis-data__get_financials

 skills: ['telecom-analyst']
```

**헬스체크 ④ — Telegram 봇**:

```bash
# 봇 가동 (별도 터미널)
npm run bot

# 콘솔에 [ready] bot=@... 가 떠야 함.
# 휴대폰에서 봇한테 "안녕" 보내고 콘솔에 [recv] 로그 + 응답 도착 확인.
```

**헬스체크 ⑤ — 알람 엔드투엔드**:

```bash
# 봇 가동 중인 상태에서 휴대폰에서 봇한테:
#   "30초 뒤 hi"
# → 즉시 ✅ 알람 등록 + ID 응답
# → 30초 후 ⏰ 예약 알람 메시지 + Claude의 "hi" 응답 도착
#
# 추가:
#   "알람 목록"  → 등록된 알람 일람
#   "알람 삭제 <id>"  → 취소
```

**기대**: 위 4동작 모두 텔레그램에서 성공.

**헬스체크 ⑥ — 스케줄러 1회 수동 발사**:

```bash
npm run scheduler -- "SKT 단신 분석 테스트"
# → 콘솔에 [scheduler] done. ... 출력
# → 텔레그램 TELEGRAM_DEFAULT_CHAT_ID 채팅에 결과 도착
```

**헬스체크 ⑦ — 모니터 수동 트리거**:

```bash
# 별도 터미널 1: 모니터 가동
npm run monitor

# 별도 터미널 2: 트리거
npm run monitor:fire

# → 모니터 콘솔에 src=manual 로그
# → 텔레그램에 🚨 시장 경보 + 분석 결과 도착
```

**발표 명령 모음**:
- Telegram 양방향: 휴대폰에서 *"SKT 종목 분석 리포트 작성해줘"*
- 알람: *"30초 뒤 SKT 단신 정리해줘"* (발표 후반에 자연스럽게 도착하도록)
- 스케줄러: `scheduler/crontab.example` 의 라인을 `crontab -e` 또는 launchd plist로 등록
- 모니터: 발표 도중 `npm run monitor:fire`

---

## 4. 발표 30분 전 전체 리허설 (체크리스트)

순서대로 실행. **모두 통과해야 라이브 데모 안전.**

```bash
# === 6-1 ===
cd ~/presentations/20260514/demo/01-no-context
claude -p --setting-sources project "한 줄로 안녕" && echo "✓ 6-1"

# === 6-2 ===
cd ~/presentations/20260514/demo/02-context
ls *.pdf >/dev/null && echo "✓ 6-2 PDF present"

# === 6-3 ===
cd ~/presentations/20260514/demo/03-persona
ls *.pdf >/dev/null && echo "✓ 6-3 PDF present"

# === 6-4 ===
cd ~/presentations/20260514/demo/04-skill
claude -p --setting-sources project --output-format stream-json --verbose "x" 2>&1 \
  | head -1 \
  | grep -q semiconductor-analyst && echo "✓ 6-4 skill loaded"

# === 6-5 ===
cd ~/presentations/20260514/demo/05-meta-skill
claude -p --setting-sources project --output-format stream-json --verbose "x" 2>&1 \
  | head -1 \
  | grep -q sector-analyst-creator && echo "✓ 6-5 meta-skill loaded"

# === 6-6 ===
cd ~/presentations/20260514/demo/06-mcp
claude -p --setting-sources project --output-format stream-json --verbose "x" 2>&1 \
  | head -1 \
  | grep -q '"kis-code-assistant-mcp","status":"connected"' && echo "✓ 6-6 MCP connected"

# === 6-7 ===
cd ~/presentations/20260514/demo/07-agent
npm run typecheck >/dev/null 2>&1 && echo "✓ 6-7 typecheck"
npm run kis:smoke >/dev/null 2>&1 && echo "✓ 6-7 KIS API works"
claude -p --setting-sources project --output-format stream-json --verbose "x" 2>&1 \
  | head -1 \
  | grep -q '"kis-data","status":"connected"' && echo "✓ 6-7 kis-data MCP"

# Telegram·알람·스케줄러·모니터는 별도 수동 점검 (위 헬스체크 ④~⑦)
```

기대: 7~9개의 `✓` 라인이 모두 떨어지면 데모 발표 준비 완료.

---

## 5. 라이브 실패 백업

| 단계 | 실패 시 즉시 전환 |
|---|---|
| 6-1, 6-2, 6-3 | 사전 캡처 슬라이드 |
| 6-4 (스킬 로드 실패) | 사전 캡처 + *"매뉴얼 한 장으로 같은 결과"* 한 줄로 회수 |
| 6-5 (`--dangerously-skip-permissions` 누락) | 어제 캡처한 *생성된 telecom-analyst/SKILL.md* 슬라이드 |
| 6-6 (MCP 부팅 실패) | 사전 캡처된 응답 슬라이드 1장 + 30초 보이스오버 |
| 6-7 Telegram 막힘 | 어제 캡처한 대화 + 솔직히 *"네트워크 차단"* 인정 |
| 6-7 알람 미도착 | 사전 캡처 + catch-up 메커니즘은 굳이 설명 X |
| 6-7 모니터 트리거 미동작 | 사전 캡처. *"방금 건 시뮬레이션"* 한 줄 회수 |

---

## 6. 트러블슈팅

| 증상 | 원인 / 조치 |
|---|---|
| `claude: command not found` | `npm i -g @anthropic-ai/claude-code` 또는 공식 인스톨러. |
| 헤드리스에서 즉시 권한 거부 | `--setting-sources project` 누락 또는 `allow` 미설정. |
| `.claude/skills/...에 쓰기 거부` | 헤드리스 자가-수정 보호. `--dangerously-skip-permissions` 추가 (6-5만 필요). |
| MCP `connected` 안 됨 | `uv sync` 미완료. `vendor/.../KIS Code Assistant MCP` 에서 `uv sync` 재실행. |
| KIS API 401 | `.env`의 `KIS_APP_KEY/SECRET` 오타 또는 만료. 포털에서 재발급. |
| KIS `rt_cd != "0"` | 동일. 또는 *모의/실전* 키 혼동 (`KIS_ENV` 일치 확인). |
| 텔레그램 봇 응답 없음 | `npm run bot` 콘솔의 `[recv]` 로그 확인. 토큰 오타·네트워크 점검. |
| 봇 콘솔의 `⛔ 인증되지 않은 채팅 ID` | 그 ID를 `.env`의 `ALLOWED_CHAT_IDS` + `TELEGRAM_DEFAULT_CHAT_ID`에 추가 후 봇 재시작. |
| 알람 인식 안 됨 | "5분 뒤", "1시간 뒤" 식으로 *문장 첫머리* 에 시간이 와야 함. "지금 5분 뒤 ..." 도 안 됨. |
| cron 결과 없음 | macOS 보안: System Settings → Privacy → Full Disk Access → `/usr/sbin/cron` 추가. 또는 `launchd` 전환. |
| cron의 `claude not found` | `scheduler/daily.sh` 가 PATH를 export. 그래도 안 되면 절대 경로(`which claude`)로 박기. |
| 첫 MCP 호출이 느림 | KIS Code Assistant MCP 부팅 ~3~5초. 정상. 두 번째부터 빨라짐. |
| 발표장 네트워크가 텔레그램 차단 | 휴대폰 데이터 핫스팟으로 전환. 사전에 한 번 테스트 필수. |

---

## 7. 발표 흐름 (전체 41분)

```
00:00 ──────────────────────────────────────  01-intro
04:00 ──────────────────────────────────────  02-garry-tan
08:30 ──────────────────────────────────────  03-ai-events
13:00 ──────────────────────────────────────  04-concepts
16:00 ──────────────────────────────────────  05-boil-personal
18:30 ──────────────────────────────────────  06-1 (4:00)
22:30 ──────────────────────────────────────  06-2 (3:00)
25:30 ──────────────────────────────────────  06-3 (2:00)
27:30 ──────────────────────────────────────  06-4 (2:00)
29:30 ──────────────────────────────────────  06-5 (3:30)  ← 메타-스킬 줌아웃 메시지 +30s
33:00 ──────────────────────────────────────  06-6 (2:00)
35:00 ──────────────────────────────────────  06-7 (3:00)  ← Telegram·알람·cron·모니터
38:00 ──────────────────────────────────────  07-conclusion (3:00)
41:00 ──────────────────────────────────────  Q&A
```

발표장 슬롯이 50분이면 Q&A 9분 확보.

---

## 8. 참고

- 각 데모 디렉토리는 *자체완결* — 06-mcp/07-agent의 vendor는 06-mcp/vendor가 원본이고 07-agent/vendor는 심볼릭 링크.
- 07-agent는 별도 `README.md` 가 그 안에 더 자세히 설명. 이 문서는 *발표 관점*에서 7개 데모를 한꺼번에 조망하는 가이드.
- 발표 스크립트 본문은 `scripts/06-*-*.md` + `scripts/07-conclusion.md`.
- 스크립트와 데모의 *번호 매칭*은 한 칸 어긋남 — 스크립트 `06-1` ↔ 데모 `01-no-context` 등. 의도된 배치 (스크립트는 *6장의 1단계*, 데모는 *데모 1번*).
