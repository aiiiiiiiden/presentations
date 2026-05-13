#!/usr/bin/env tsx
/**
 * KIS credentials smoke test.
 *
 * Calls KIS Open API directly (bypassing Claude/MCP) to verify .env keys work.
 *
 * Usage:
 *   npm run kis:smoke                  # default: SKT 017670 price
 *   npm run kis:smoke -- 030200        # KT
 *   npm run kis:smoke -- 017670 fin    # SKT financials
 *   npm run kis:smoke -- 017670 chart  # SKT 30-day OHLCV
 */

import "dotenv/config";
import {
  fetchChart,
  fetchFinancials,
  fetchPrice,
  kisEnv,
} from "../src/kis-mcp/kis-client.js";

const ticker = process.argv[2] ?? "017670";
const kind = (process.argv[3] ?? "price").toLowerCase();

async function main(): Promise<void> {
  console.log(`[kis-smoke] env=${kisEnv()} ticker=${ticker} kind=${kind}`);
  if (kind === "price") {
    const data = await fetchPrice(ticker);
    console.log(JSON.stringify(data, null, 2));
  } else if (kind === "fin" || kind === "financials") {
    const data = await fetchFinancials(ticker);
    console.log(JSON.stringify(data, null, 2));
  } else if (kind === "chart") {
    const data = await fetchChart(ticker, 30);
    console.log(JSON.stringify(data.slice(0, 10), null, 2));
  } else {
    console.error(
      `Unknown kind: ${kind}. Use 'price', 'fin', or 'chart'.`,
    );
    process.exit(2);
  }
}

await main().catch((err) => {
  console.error(`[kis-smoke] error: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
});
