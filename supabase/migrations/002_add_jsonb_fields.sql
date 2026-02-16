-- 002_add_jsonb_fields.sql
-- Add JSONB columns for AI analysis flexibility
-- iv_calculations already has parameters_json JSONB, skip it

-- Company financials: store AI analysis output (sentiment, risk scores, etc.)
ALTER TABLE company_financials ADD COLUMN IF NOT EXISTS analysis_output JSONB;

-- Watchlist signals: store AI analysis output (relevance scoring, entity extraction, etc.)
ALTER TABLE watchlist_signals ADD COLUMN IF NOT EXISTS analysis_output JSONB;

-- Historical OE: store per-year adjustments as structured JSON
ALTER TABLE historical_owner_earnings ADD COLUMN IF NOT EXISTS adjustments_json JSONB;

-- GIN indexes for efficient JSONB queries
CREATE INDEX IF NOT EXISTS idx_cf_analysis ON company_financials USING gin(analysis_output);
CREATE INDEX IF NOT EXISTS idx_ws_analysis ON watchlist_signals USING gin(analysis_output);
