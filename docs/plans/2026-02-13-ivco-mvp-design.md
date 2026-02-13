# IVCO MVP Design — TSMC End-to-End

> Brainstorming 成果。Allen 2026-02-13 批准。
> 參與：Allen（決策）+ Jane（設計）+ Claude Desktop（策略選項）

---

## 決策摘要

| 問題 | Allen 決定 | 備選項 |
|------|-----------|--------|
| MVP 範圍 | **Option A — TSMC 單公司端到端** | B: 30 家寬幅 / C: Pure CLI |
| 開發路線 | **Schema 先行 → Blog → CLI → Dashboard** | CLI-First / Dashboard-First |
| 部落格定位 | **IVCO Fisher 對外公開** | 內部筆記 / 兩者兼具 |
| 計算引擎語言 | **Python CLI（Openclaw 風格）** | TypeScript / 雙語言 |
| CLI 前綴 | **`ivco`**（非 `ivc`） | — |

---

## 整體架構

```
Phase 1                Phase 2                 Phase 3
─────────              ─────────               ─────────
Payload CMS            Python CLI              Payload Dashboard
(Blog)                 (計算引擎)               (薄 UI)
   │                      │                       │
   └── ivco.io ──────────►│◄──────────────────────┘
       最樸素部落格         │   Dashboard 呼叫 CLI
                     ivco calc-oe              7 參數可調
                     ivco calc-cagr            IV Range 顯示
                     ivco calc-iv              TSMC 即時結果
                          │
                    JSON 輸出（可 pipe）
```

**核心原則**：
- **Schema 先行**：Phase 1 就設計好所有 Collections（含 Phase 2/3 欄位），blog 只用其中一小部分
- **CLI 是引擎**：所有計算邏輯在 Python，Payload 永遠只是 UI 殼
- **Openclaw 風格**：每個 `ivco` 指令獨立運作、獨立測試、JSON 輸出、可組合

---

## Schema 設計（Phase 1 即完整定義）

| Collection | Phase 1 使用 | Phase 2+ 使用 | 說明 |
|-----------|:-----------:|:------------:|------|
| **posts** | ✅ | ✅ | IVCO Fisher 部落格文章（title, slug, content, publishedAt, category, tags） |
| **companies** | ⬜ | ✅ | 公司基本資料（ticker, name, market, sector, shares_outstanding） |
| **financials** | ⬜ | ✅ | 年度財報（year, net_income, depreciation, capex, working_capital_change, total_debt） |
| **analyses** | ⬜ | ✅ | DNA 七層 Schema（BASE → CAGR → FORWARD → OUTPUT → PRESSURE → TRACKING → NOTES） |
| **parameters** | ⬜ | ✅ | 7 個公司專屬參數（maintenance_capex_ratio, reality_coefficient, cc_low, cc_high, stage2_cagr, stage3_cagr, discount_rate） |
| **categories** | ✅ | ✅ | 文章分類 |
| **media** | ✅ | ✅ | 圖片/檔案 |

Phase 1 只啟用 `posts` + `categories` + `media`，其餘 Collection 定義好但不啟用 UI。

---

## Phase 1 — IVCO Fisher 部落格

**範圍**：最樸素的部落格網站，部署到 ivco.io

| 項目 | 內容 |
|------|------|
| **CMS** | Payload CMS（Admin Panel 寫文章） |
| **前端** | Next.js 靜態生成（最簡 blog template） |
| **部署** | Vercel（Payload + Next.js 同 monorepo） |
| **DB** | Supabase Tokyo（blog 內容 + 未來所有 IVCO 資料） |
| **域名** | ivco.io |
| **功能** | 文章列表、文章詳頁、分類篩選、SEO meta |
| **不做** | 登入系統、評論、搜尋、Newsletter、暗色模式 |

**成功標準**：Allen 能在 Payload Admin 寫文章 → ivco.io 自動上線。

---

## Phase 2 — Python CLI 計算引擎（Openclaw 風格）

### CLI 工具鏈

```bash
# 原子化工具鏈 — 每個指令獨立運作
ivco calc-oe   --ticker TSMC --year 2022      # → JSON: owner_earnings
ivco calc-cagr --ticker TSMC --years 9         # → JSON: cagr, method
ivco calc-iv   --ticker TSMC \
               --cc-low 1.2 --cc-high 1.5 \
               --stage2-cagr 0.15 \
               --stage3-cagr 0.05 \
               --discount-rate 0.08 \
               --debt 1673432925               # → JSON: iv_low, iv_high

# 組合使用（Unix pipe）
ivco calc-oe --ticker TSMC | ivco calc-cagr | ivco calc-iv --cc-low 1.2 --cc-high 1.5

# 驗證模式（Allen 手算表對照）
ivco verify --ticker TSMC --expected-low 4565 --expected-high 5639
```

### 工具清單（V0）

| 指令 | 功能 | 輸入 | 輸出 |
|------|------|------|------|
| `ivco calc-oe` | 計算業主盈餘 | 財報數據 / ticker+year | OE JSON |
| `ivco calc-cagr` | 計算 CAGR（含真實係數校正） | OE 序列 | CAGR JSON |
| `ivco calc-iv` | 三段式 DCF 完整計算 | CAGR + 7 參數 | IV Range JSON |
| `ivco verify` | 與 Allen 手算表交叉驗證 | 預期值 | PASS/FAIL + diff |
| `ivco show` | 顯示公司完整分析結果 | ticker | 格式化表格 |

### 七個公司專屬參數

| 參數 | TSMC 值 | 說明 |
|------|---------|------|
| `maintenance_capex_ratio` | 0.20 | 維護 CapEx 佔總 CapEx 比率 |
| `reality_coefficient` | per-year, default 1.0 | 真實係數（校正歷史 OE 失真） |
| `cc_low` | 1.2 | 信心係數下限 |
| `cc_high` | 1.5 | 信心係數上限 |
| `stage2_cagr` | 0.15 | Stage 2（6-10 年）趨緩成長率 |
| `stage3_cagr` | 0.05 | Stage 3（永續）低成長率 |
| `discount_rate` | 0.08 | 折現率（美國十年期公債 + ~3%） |

**另需輸入**：`long_term_debt`（長期負債，從財報直接填入）

### 成功標準

```
ivco calc-iv --ticker TSMC → IV Range = NT$4,565 ~ NT$5,639
```

與 Allen 手算表（`allen-framework-tsmc-owners-earning.md`）100% 一致。

---

## Phase 3 — Payload Dashboard

- Payload Admin 新增「IVCO Dashboard」頁面
- 7 參數全部可調（滑桿/輸入框）
- 調參數 → 即時觸發 `ivco calc-iv` → 更新 IV Range 顯示
- TSMC 一家完整展示，驗證後橫向擴展

---

## 里程碑

| 里程碑 | 內容 | 交付物 | 成功標準 |
|--------|------|--------|---------|
| **M0** | Schema 完整設計 | Payload Collections 定義（全部，含未來） | Collection schema 通過 review |
| **M1** | IVCO Fisher 部落格上線 | ivco.io 可發文、可訪問 | Allen 發一篇測試文章成功上線 |
| **M2** | CLI calc-oe + calc-cagr | 兩個指令 + 單元測試 + TSMC 數據 | TSMC OE/CAGR 與手算一致 |
| **M3** | CLI calc-iv（三段式 DCF） | 完整三段式 + IV Range + verify | IV Range = NT$4,565 ~ NT$5,639 |
| **M4** | Jane 驗證 | 系統 IV vs Allen 手算 100% 一致 | `ivco verify --ticker TSMC` PASS |
| **M5** | Payload Dashboard | 7 參數可調 + 即時計算 | Allen 在 UI 調參數，IV 即時更新 |
| **M6** | 橫向擴展 | POWL + NVMI 兩家驗證 | 跨市場適用性確認 |

---

## Tech Stack

| 層級 | 技術 | 用途 |
|------|------|------|
| **CMS** | Payload CMS 3.x | Blog + 未來 Dashboard UI |
| **前端** | Next.js 15 | Blog SSG + Dashboard |
| **DB** | Supabase (Tokyo, PostgreSQL) | 所有數據（blog + 財報 + 分析） |
| **計算引擎** | Python 3.12+ | CLI 工具鏈（ivco calc-*） |
| **部署** | Vercel | Payload + Next.js |
| **域名** | ivco.io | 主站 |

---

## 命名規範

- **系統/品牌名**：IVCO
- **CLI 前綴**：`ivco`（非 `ivc`）
- **目錄**：`allen-ivco/`
- **方法論**：IVC Framework（可在文章中使用）
- **對外人設**：IVCO Fisher

---

## 開發分工

| 工作 | 負責人 | 說明 |
|------|--------|------|
| Schema 設計 | Chi + Jane review | Jane 確保與 DNA 七層 Schema 一致 |
| Blog 前端 | Chi | Next.js 最簡 template |
| Payload 設定 | Chi | Collections + Admin UI |
| Python CLI | Chi | 核心計算邏輯 |
| 單元測試 | Chi + Jane verify | Jane 用 TSMC 手算表交叉驗證 |
| Dashboard UI | Chi | Phase 3 |
| 部署 | Chi | Vercel + Supabase |
| 品質把關 | Jane | 每個 milestone 做 Devil's Advocate review |

---

## 風險與緩解

| 風險 | 緩解 |
|------|------|
| TSMC 單公司不足以驗證跨市場適用性 | M6 加入 POWL（美股）+ NVMI（以色列），三市場交叉驗證 |
| 手動錄入 10 年數據後 API 串接時 schema 不合 | Schema 設計階段就對齊 EODHD API 欄位名 |
| Stage 3 永續年金對折現率極度敏感 | V1 加入敏感度分析（折現率 ±1% 的 IV 變動） |
| Payload CMS 不適合做計算 UI | 計算在 Python，Payload 只做薄 UI 殼。不合就改 Next.js custom page |
| V0 不含管理層誠信 Gate | TSMC 管理層誠信無疑，V0 不需 Gate。V1 擴展時加入 |

---

## 參考文件

- **Allen Framework 計算表**：`allen-ivco/allen-framework-tsmc-owners-earning.md`
- **IVCO DNA v1.1**：`allen-ivco/docs/ivco-dna.md`
- **Claude Desktop Brainstorming**：`shared-state/contributions/claude-desktop/2026-02-13.json`
- **DNA 七層 Schema**：`ivco-dna.md` §3 L396-430
