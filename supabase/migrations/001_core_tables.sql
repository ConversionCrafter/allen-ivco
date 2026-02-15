-- IVCO Core Tables — Phase 0.5a Foundation
-- These tables are written by Python CLI tools, not Payload CMS.
-- Payload CMS uses its own PostgreSQL tables via Drizzle ORM.

-- 1. Historical Owner Earnings (Python CLI: ivco calc-oe → ivco-store)
CREATE TABLE IF NOT EXISTS historical_owner_earnings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company_ticker TEXT NOT NULL,
  year INTEGER NOT NULL,
  net_income BIGINT NOT NULL,
  depreciation BIGINT NOT NULL,
  amortization BIGINT NOT NULL,
  capex BIGINT NOT NULL,
  maintenance_ratio NUMERIC(4,2) NOT NULL,
  owner_earnings BIGINT NOT NULL,
  reality_coefficient NUMERIC(4,2) DEFAULT 1.00,
  oe_calibrated BIGINT,
  cagr_from_base NUMERIC(6,4),
  currency TEXT DEFAULT 'NTD',
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (company_ticker, year)
);

-- 2. Company Financial Snapshots (Finance API periodic fetch)
CREATE TABLE IF NOT EXISTS company_financials (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ticker TEXT NOT NULL,
  period TEXT NOT NULL,         -- e.g. '2024-Q4', '2024-FY'
  period_type TEXT NOT NULL,    -- 'quarterly' or 'annual'
  revenue BIGINT,
  net_income BIGINT,
  total_assets BIGINT,
  total_debt BIGINT,
  fcf BIGINT,
  shares_outstanding BIGINT,
  pe_ratio NUMERIC(8,2),
  market_cap BIGINT,
  gross_margin NUMERIC(6,4),
  operating_margin NUMERIC(6,4),
  dso NUMERIC(6,2),
  dio NUMERIC(6,2),
  currency TEXT DEFAULT 'USD',
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  source_api TEXT NOT NULL,     -- 'fmp', 'yahoo', 'manual'
  UNIQUE (ticker, period, source_api)
);

-- 3. Watchlist Signals (X Intel + News + Events)
CREATE TABLE IF NOT EXISTS watchlist_signals (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ticker TEXT,                  -- nullable for macro signals
  signal_type TEXT NOT NULL,    -- 'x_intel', 'news', 'earnings', 'filing', 'capex', 'management'
  headline TEXT NOT NULL,
  content TEXT,
  source TEXT,
  source_url TEXT,
  relevance_score NUMERIC(3,2),
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. IV Calculations (Research engine output)
CREATE TABLE IF NOT EXISTS iv_calculations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ticker TEXT NOT NULL,
  calculated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Allen Framework 7 parameters
  maintenance_ratio NUMERIC(4,2) NOT NULL,
  reality_coefficient NUMERIC(4,2) DEFAULT 1.00,
  historical_cagr NUMERIC(6,4) NOT NULL,
  cc_low NUMERIC(4,2) NOT NULL,
  cc_high NUMERIC(4,2) NOT NULL,
  stage1_cagr_low NUMERIC(6,4),
  stage1_cagr_high NUMERIC(6,4),
  stage2_cagr NUMERIC(6,4) NOT NULL,
  stage3_growth NUMERIC(6,4) NOT NULL,
  discount_rate NUMERIC(6,4) NOT NULL,
  long_term_debt BIGINT DEFAULT 0,
  shares_outstanding BIGINT NOT NULL,
  -- Output
  iv_per_share_low NUMERIC(12,2) NOT NULL,
  iv_per_share_high NUMERIC(12,2) NOT NULL,
  current_price NUMERIC(12,2),
  margin_of_safety_low NUMERIC(6,4),
  margin_of_safety_high NUMERIC(6,4),
  -- Metadata
  currency TEXT DEFAULT 'NTD',
  parameters_json JSONB,
  source_research_id TEXT,
  notes TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_hoe_ticker_year ON historical_owner_earnings (company_ticker, year);
CREATE INDEX IF NOT EXISTS idx_cf_ticker_period ON company_financials (ticker, period);
CREATE INDEX IF NOT EXISTS idx_ws_ticker_created ON watchlist_signals (ticker, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_iv_ticker_date ON iv_calculations (ticker, calculated_at DESC);
