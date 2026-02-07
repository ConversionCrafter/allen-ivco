<!--
  Sync Impact Report
  ==================
  Version change: 1.0.0 → 1.1.0 (MINOR: materially expanded Principle VI)
  Modified principles:
    - VI. Agent-Safe Security — added Supply Chain Defense + Semantic Threat
      Awareness subsections (ref: JVO/VirusTotal ClawHub audit 2026-02)
  Added sections: none
  Removed sections: none
  Templates requiring updates:
    - .specify/templates/plan-template.md — Constitution Check references ✅ generic
    - .specify/templates/spec-template.md — no constitution-specific refs ✅ ok
    - .specify/templates/tasks-template.md — no constitution-specific refs ✅ ok
    - .specify/templates/checklist-template.md — no constitution-specific refs ✅ ok
    - .specify/templates/agent-file-template.md — no constitution-specific refs ✅ ok
  Propagated to:
    - ~/.claude/CLAUDE.md — AI Agent Security DNA section added ✅
    - IVC CLAUDE.md — Chi security responsibilities added ✅
  Deferred TODOs: none
-->

# IVC Calculator Constitution

## Core Principles

### I. CLI-First DNA

Every capability MUST be exposed as an atomic CLI tool (`ivc-*` namespace)
before being wrapped in UI, API, or agent orchestration.

- Each CLI tool MUST have a single responsibility.
- `--help` MUST be self-documenting (no external docs required to invoke).
- Output MUST be JSON to stdout; errors MUST go to stderr.
- Tools MUST be composable via Unix pipes.
- Tools MUST be idempotent — safe to re-run without side effects.
- Agents invoke CLI tools; agents MUST NOT contain inline business logic.

**Rationale**: Openclaw philosophy — CLI scales across humans, agents,
and CI/CD. MCP and UI wrappers come second.

### II. Atomic, Decoupled, Rollback-able

All changes — code, data, infrastructure — MUST follow the ADR triad:

- **Atomic**: One change per commit, one concern per PR. If a step fails,
  only minutes of work are lost.
- **Decoupled**: Modifying module A MUST NOT break module B. Collections,
  CLI tools, and services are independent rooms.
- **Rollback-able**: Every change MUST be reversible. Git history, database
  migrations, and Docker volumes MUST support rollback within one command.

**Rationale**: Allen's core development principle — derived from
@Tz_2022's "Vibe Coding Three Talismans."

### III. Verification Loop

Code is not done until it is verified. The verification step is part of
the workflow, not an afterthought.

- Backend logic changes → run tests.
- Type/dependency changes → run build.
- Frontend UI changes → open page and visually confirm.
- JSON/config changes → `python3 -m json.tool` or equivalent.
- Infrastructure changes → `docker compose up` and confirm health.
- Every CLI tool MUST have at least one smoke test.

**Rationale**: "Let AI participate in verification, not just generation"
— @sitinme. Write → Verify → Fail → Analyze → Fix → Re-verify → Pass.

### IV. Confidence Intervals Over Point Estimates

All valuation outputs MUST be expressed as ranges, never single numbers.

- Intrinsic Value MUST output `iv_per_share_low` and `iv_per_share_high`.
- Confidence Coefficient MUST be a range (e.g., 1.2x–1.4x).
- Any IV calculation without a current market price comparison is invalid.
- Per-share conversion is mandatory — total market cap alone is
  insufficient for investment decisions.

**Rationale**: Buffett's "roughly right over precisely wrong." The IVC
Framework rejects false precision.

### V. Container-Native Development

The development environment MUST be fully reproducible via
`docker compose up -d` with zero local dependency installation beyond
Docker itself.

- All services (db, app, n8n, future additions) MUST be defined in
  `docker-compose.yml`.
- Environment variables MUST be separated: `.env.docker` for containers,
  `cms/.env` for local dev fallback.
- Secrets MUST NOT be committed — `.gitignore` MUST exclude all `.env.*`
  files except `.env.example`.
- Database data MUST persist via named Docker volumes.

**Rationale**: One-command dev stack eliminates "works on my machine"
drift and enables CI/CD parity.

### VI. Agent-Safe Security

When AI agents (Openclaw, Claude Code, n8n) execute actions, security
boundaries MUST be explicit and enforced.

**Execution Controls**:
- Openclaw exec policy MUST be `ask: always` with `security: allowlist`.
- Gateway MUST bind to loopback only — no external network exposure.
- CLI tools invoked by agents MUST declare read-only vs write capability.
- Database credentials MUST use least-privilege accounts per environment.
- No agent may force-push, delete branches, or modify production data
  without explicit human approval.

**Supply Chain Defense** (ref: JVO/VirusTotal ClawHub audit 2026-02):
- Before installing any Skill/Plugin, MUST verify publisher reputation.
  Download counts can be faked — do not trust numbers alone.
- MUST read the full SKILL.md before installation. Any instruction to
  download and execute external binaries is a red flag.
- MUST NOT execute Base64-encoded shell commands from untrusted sources.
- MUST NOT open password-protected ZIPs from Skills without inspection.
- AI-generated security configs MUST be validated against the tool's
  actual schema (`openclaw doctor`, `--help`). LLMs hallucinate keys
  that create a false sense of security.

**Semantic Threat Awareness**:
- Skills and Markdown instructions ARE potential malware vectors.
  Traditional antivirus is blind to natural language threats.
- Periodically audit installed Skills and MCP Servers for anomalies.
- Multi-layer defense is mandatory — no single control is sufficient.

**Rationale**: AI agents amplify both productivity and blast radius.
Security defaults MUST be restrictive; relaxation requires justification.
AI Skills are "natural language malware" when abused — the entire
30-year traditional security toolchain is blind to this threat class.

### VII. Simplicity (YAGNI)

Do not build for hypothetical future requirements.

- Three similar lines of code are better than a premature abstraction.
- Add error handling only at system boundaries (user input, external APIs).
- No feature flags or backward-compatibility shims when direct change
  suffices.
- If a tool/service is not actively used, remove it rather than maintain it.

**Rationale**: Complexity is the enemy of reliability. The right amount
of complexity is the minimum needed for the current task.

## Technology Constraints

| Layer | Technology | Version / Note |
|-------|-----------|----------------|
| CMS | Payload CMS | 3.75.x + Next.js 15 (App Router) |
| Database (dev) | PostgreSQL | 15-alpine via Docker |
| Database (prod) | Supabase | PostgreSQL — Tokyo (ap-northeast-1), Supavisor Session Pooler IPv4 |
| Automation | n8n | Docker container |
| CLI Tools | TypeScript / Python | Node 22 LTS, Python 3.11+ |
| Vector Search | Qdrant | Planned (Phase 5) |
| Container Runtime | Docker Compose | Multi-service orchestration |
| Agent Framework | Openclaw | Security-hardened, loopback only |
| AI Integration | Claude Code + MCP | Chrome DevTools, Knowledge Graph |

**Mandatory patterns**:

- TypeScript strict mode for all CMS and frontend code.
- Python follows PEP 8 for CLI tools and data pipelines.
- All API endpoints MUST have error handling.
- File/folder naming: English kebab-case, no spaces, no emoji, no CJK.

## Development Workflow

### Commit Discipline

- Conventional Commits: `fix:`, `feat:`, `refactor:`, `docs:`,
  `test:`, `chore:`.
- Each commit addresses exactly one concern (Atomic principle).
- Commit after each verified task or logical group.

### Branch Strategy

- `main` is the stable branch.
- Feature work on `feat/<name>` branches.
- PRs require verification loop completion before merge.

### Phase-Gated Delivery

Features are delivered in phases. Each phase MUST pass its verification
checkpoint before the next phase begins:

1. **Setup** — project structure, dependencies.
2. **Foundation** — shared infrastructure (DB, auth, routing).
3. **User Stories** — independently testable, priority-ordered (P1→P2→P3).
4. **Polish** — cross-cutting concerns, docs, security hardening.

### Plan Mode

When complexity is unclear or an approach fails:

1. Stop execution.
2. Enter plan mode — clarify goals, constraints, steps, risks.
3. Confirm plan with Allen.
4. Resume execution.

Do not push through ambiguity with brute force.

## Governance

- This constitution supersedes all ad-hoc practices. When a spec,
  plan, or task conflicts with a principle here, the constitution wins.
- **Amendments** require: (1) documented rationale, (2) Allen's approval,
  (3) version bump per semantic versioning, (4) propagation check across
  `.specify/templates/` and `CLAUDE.md`.
- **Compliance**: Every PR and code review MUST verify alignment with
  these principles. Constitution Check in `plan-template.md` gates
  implementation start.
- **Runtime guidance**: See `CLAUDE.md` at project root for role
  definitions (Allen, Jane, Chi) and IVC Framework details.

**Version**: 1.1.1 | **Ratified**: 2026-02-07 | **Last Amended**: 2026-02-07
