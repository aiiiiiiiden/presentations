/**
 * KIS Open API client (TypeScript).
 *
 * Handles OAuth token cache + REST calls for the subset of endpoints we need
 * for the telecom-analyst report:
 *
 *   - 주식현재가 시세           /uapi/domestic-stock/v1/quotations/inquire-price
 *   - 손익계산서                /uapi/domestic-stock/v1/finance/income-statement
 *   - 국내주식기간별시세(일봉)   /uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice
 *
 * Credentials come from .env (KIS_APP_KEY, KIS_APP_SECRET, KIS_ENV).
 *   KIS_ENV=vts  → 모의투자 (default, safe for demo)
 *   KIS_ENV=real → 실전투자 (real account credentials needed)
 *
 * Token is cached in-memory for the lifetime of the MCP server process; KIS
 * tokens are valid for 24h.
 */

const BASE_REAL = "https://openapi.koreainvestment.com:9443";
const BASE_VTS = "https://openapivts.koreainvestment.com:29443";

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

function env(key: string): string | undefined {
  const v = process.env[key];
  return v && v.trim() ? v.trim() : undefined;
}

function isReal(): boolean {
  return (env("KIS_ENV") ?? "vts").toLowerCase() === "real";
}

function baseUrl(): string {
  return isReal() ? BASE_REAL : BASE_VTS;
}

function requireCredentials(): { appkey: string; appsecret: string } {
  const appkey = env("KIS_APP_KEY");
  const appsecret = env("KIS_APP_SECRET");
  if (!appkey || !appsecret) {
    throw new Error(
      "KIS_APP_KEY / KIS_APP_SECRET missing. Add to .env (see .env.example).",
    );
  }
  return { appkey, appsecret };
}

async function getToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.token;
  }
  const { appkey, appsecret } = requireCredentials();
  const resp = await fetch(`${baseUrl()}/oauth2/tokenP`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      appkey,
      appsecret,
    }),
  });
  if (!resp.ok) {
    throw new Error(
      `KIS token request failed: ${resp.status} ${(await resp.text()).slice(0, 300)}`,
    );
  }
  const data = (await resp.json()) as {
    access_token: string;
    expires_in?: number;
  };
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 86_400) * 1000,
  };
  return data.access_token;
}

async function kisGet(
  path: string,
  query: Record<string, string>,
  tr_id: string,
): Promise<{ output?: unknown; output1?: unknown; output2?: unknown; rt_cd?: string; msg1?: string }> {
  const token = await getToken();
  const { appkey, appsecret } = requireCredentials();
  const url = `${baseUrl()}${path}?${new URLSearchParams(query).toString()}`;
  const resp = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
      appkey,
      appsecret,
      tr_id,
      "content-type": "application/json; charset=utf-8",
    },
  });
  if (!resp.ok) {
    throw new Error(
      `KIS GET ${path} failed: ${resp.status} ${(await resp.text()).slice(0, 300)}`,
    );
  }
  const data = (await resp.json()) as {
    rt_cd?: string;
    msg1?: string;
    [k: string]: unknown;
  };
  if (data.rt_cd && data.rt_cd !== "0") {
    throw new Error(`KIS API error: rt_cd=${data.rt_cd} msg=${data.msg1}`);
  }
  return data;
}

function fmtDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${dd}`;
}

// --------- High-level helpers (called by MCP tools) ---------

export interface PriceSnapshot {
  ticker: string;
  현재가: string | undefined;
  전일대비: string | undefined;
  전일대비율: string | undefined;
  시가: string | undefined;
  고가: string | undefined;
  저가: string | undefined;
  누적거래량: string | undefined;
  시가총액_억원: string | undefined;
  PER: string | undefined;
  PBR: string | undefined;
  EPS: string | undefined;
  "52주최고가": string | undefined;
  "52주최저가": string | undefined;
  외국인소진율: string | undefined;
}

export async function fetchPrice(ticker: string): Promise<PriceSnapshot> {
  const data = await kisGet(
    "/uapi/domestic-stock/v1/quotations/inquire-price",
    { FID_COND_MRKT_DIV_CODE: "J", FID_INPUT_ISCD: ticker },
    "FHKST01010100",
  );
  const o = (data.output as Record<string, string> | undefined) ?? {};
  return {
    ticker,
    현재가: o.stck_prpr,
    전일대비: o.prdy_vrss,
    전일대비율: o.prdy_ctrt,
    시가: o.stck_oprc,
    고가: o.stck_hgpr,
    저가: o.stck_lwpr,
    누적거래량: o.acml_vol,
    시가총액_억원: o.hts_avls,
    PER: o.per,
    PBR: o.pbr,
    EPS: o.eps,
    "52주최고가": o.w52_hgpr,
    "52주최저가": o.w52_lwpr,
    외국인소진율: o.hts_frgn_ehrt,
  };
}

export interface FinancialRow {
  결산년월: string | undefined;
  매출액: string | undefined;
  매출원가: string | undefined;
  매출총이익: string | undefined;
  영업이익: string | undefined;
  당기순이익: string | undefined;
}

export async function fetchFinancials(ticker: string): Promise<FinancialRow[]> {
  // 손익계산서 (연간)
  const data = await kisGet(
    "/uapi/domestic-stock/v1/finance/income-statement",
    {
      FID_DIV_CLS_CODE: "1",
      FID_COND_MRKT_DIV_CODE: "J",
      FID_INPUT_ISCD: ticker,
    },
    "FHKST66430200",
  );
  const rows = (data.output as Array<Record<string, string>> | undefined) ?? [];
  return rows.slice(0, 4).map((r) => ({
    결산년월: r.stac_yymm,
    매출액: r.sale_account,
    매출원가: r.sale_cost,
    매출총이익: r.sale_totl_prfi,
    영업이익: r.bsop_prti,
    당기순이익: r.thtr_ntin,
  }));
}

export interface ChartRow {
  일자: string | undefined;
  시가: string | undefined;
  고가: string | undefined;
  저가: string | undefined;
  종가: string | undefined;
  거래량: string | undefined;
}

export async function fetchChart(
  ticker: string,
  days = 30,
): Promise<ChartRow[]> {
  const today = new Date();
  const start = new Date(today.getTime() - days * 24 * 3600 * 1000);
  const data = await kisGet(
    "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice",
    {
      FID_COND_MRKT_DIV_CODE: "J",
      FID_INPUT_ISCD: ticker,
      FID_INPUT_DATE_1: fmtDate(start),
      FID_INPUT_DATE_2: fmtDate(today),
      FID_PERIOD_DIV_CODE: "D",
      FID_ORG_ADJ_PRC: "0",
    },
    "FHKST03010100",
  );
  const rows = (data.output2 as Array<Record<string, string>> | undefined) ?? [];
  return rows.slice(0, days).map((r) => ({
    일자: r.stck_bsop_date,
    시가: r.stck_oprc,
    고가: r.stck_hgpr,
    저가: r.stck_lwpr,
    종가: r.stck_clpr,
    거래량: r.acml_vol,
  }));
}

export function kisEnv(): "real" | "vts" {
  return isReal() ? "real" : "vts";
}
