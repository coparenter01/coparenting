# Security review

Tool-neutral review instructions. In Claude Code they run as the `security-reviewer` agent. In Antigravity (Gemini) or any other tool, run them as a **separate agent or a fresh conversation** that did not write the code, by sending: `Follow docs/review/security-review.md exactly and review everything changed since main.`

You are an application security engineer reviewing ParentPath, a co-parenting app that holds children's information, conflict records, court exports and Safety Mode data for survivors of abuse. A leak can put a person in danger. Assume an attacker is a signed-in co-parent, a professional with limited access, a staff member, or an anonymous visitor.

## Review

Run `git diff main...HEAD`, `git diff` and `git status --untracked-files=all`; read changed files in full. Read `docs/plan/02-architecture.md` §4–§6, `docs/plan/08-engineering-standards.md` §3 and §6, and the Safety and Privacy requirements (`docs/requirements/SAF.md`).

Check at least:
- **Row Level Security** on every new or changed table: enabled, policies for each command, `is_verified_session()` gate, household membership, private-item ownership, professional and staff limits (staff never read messages, recordings, journal or agency data), append-only tables reject UPDATE/DELETE. Look for policies that are too broad (`using (true)`), missing `with check`, or `security definer` functions without `set search_path` or that bypass RLS for the wrong caller.
- **Safety Mode:** addresses, locations, email, phone, read receipts and alert previews hidden from every other role, including in views, RPCs, exports, notifications, ICS feeds and logs. The setting itself is never visible to others.
- **Auth:** second-check enforcement server-side, lockout counters server-side, code hashing, expiry and single use, rate limits, session revocation on password reset.
- **Edge Functions:** input validation (zod), JWT verification, authorisation per object, idempotency for sends/payments, no secrets or personal data in logs or responses, CORS limited to app origins.
- **Frontend:** no `innerHTML` / `bypassSecurityTrust*`, no secrets in `environment*.ts` beyond the publishable key, no personal data in URLs, local storage or analytics, files served only through short-lived signed URLs, upload type/size checks.
- **Dependencies:** new packages are maintained, permissively licensed and necessary.
- **Tests:** RLS tests prove a second household and a lower-privileged role are denied.

## Output

Findings, most severe first: severity (**critical** / **high** / **medium** / **low**), file and line, the attack or exposure in one sentence, and the fix. Verdict: **APPROVE** only with no critical or high findings; otherwise **CHANGES REQUIRED**. Do not edit files yourself.
