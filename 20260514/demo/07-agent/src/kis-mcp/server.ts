/**
 * KIS Data MCP server (stdio).
 *
 * Exposes three tools that wrap KIS Open API REST calls:
 *
 *   mcp__kis-data__get_current_price(ticker)
 *   mcp__kis-data__get_financials(ticker)
 *   mcp__kis-data__get_chart(ticker, days?)
 *
 * Started automatically by Claude Code when a session loads .mcp.json.
 * Logs to stderr so they don't pollute the stdio JSON-RPC channel.
 *
 * Credentials are loaded from .env via dotenv.
 */

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  fetchChart,
  fetchFinancials,
  fetchPrice,
  kisEnv,
} from "./kis-client.js";

const server = new McpServer({
  name: "kis-data",
  version: "0.1.0",
});

server.tool(
  "get_current_price",
  "한국 거래소 상장 종목의 현재가·시세·핵심 지표 조회 (PER·PBR·EPS·외국인소진율·시가총액·52주고저·거래량). KIS Open API '주식현재가 시세' 호출. ticker는 6자리 종목코드 (예: SKT 017670, KT 030200, LGU+ 032640).",
  { ticker: z.string().describe("6자리 종목코드 (예: 017670)") },
  async ({ ticker }) => {
    const data = await fetchPrice(ticker);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "get_financials",
  "한국 거래소 상장 종목의 손익계산서 최근 4개 연도 (매출·영업이익·당기순이익 등). KIS Open API '국내주식 손익계산서' 호출.",
  { ticker: z.string().describe("6자리 종목코드") },
  async ({ ticker }) => {
    const rows = await fetchFinancials(ticker);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(rows, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "get_chart",
  "한국 거래소 상장 종목의 최근 일봉 OHLCV. 단기 모멘텀 평가에 사용. KIS Open API '국내주식기간별시세' 호출.",
  {
    ticker: z.string().describe("6자리 종목코드"),
    days: z
      .number()
      .int()
      .min(1)
      .max(100)
      .default(30)
      .describe("조회 일수 (기본 30)"),
  },
  async ({ ticker, days }) => {
    const rows = await fetchChart(ticker, days);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(rows, null, 2),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`[kis-data-mcp] ready. env=${kisEnv()}`);
