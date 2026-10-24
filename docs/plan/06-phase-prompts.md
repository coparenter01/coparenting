# 06 · Prompts to copy and paste

These are the messages the owner sends to the AI. Copy the text inside each box exactly, change only the parts in [square brackets].

---

## A. First message ever (Phase 0 kickoff)

```
You are the developer for this project. Read AGENTS.md completely, then everything in docs/plan/.
Skim docs/manual/00-INTRO.md and open a few wireframes in docs/wireframes/screens/ to understand the look.

Then:
1. Tell me in plain English, in under 15 lines, what ParentPath is and how you will build it.
2. Check what is installed on this computer (node, npm, git, Angular CLI, Supabase CLI) and tell me exactly what I still need to install, with click-by-click steps for Windows.
3. Write the plan for Phase 0 into docs/plan/PROGRESS.md and wait for me to say "go".
```

## B. Start any later session

```
Read AGENTS.md and docs/plan/PROGRESS.md. Tell me in 3–5 lines where we are, what is next, and anything you need from me. Then continue with the next step unless you need my input.
```

## C. Start a new phase

```
Phase [N] – [phase name] from docs/plan/05-build-phases.md.
Read the module files it needs in docs/requirements/ and docs/manual/, the screens for this phase in docs/plan/07-screen-map.md and their wireframes.
Write a short plan into PROGRESS.md: steps, screens, tables, functions, tests, and anything I must do outside the code. Then wait for my "go".
```

After the plan looks sensible:

```
go – build step 1. After each step: run npm run verify and the step's e2e and accessibility checks, check 375/768/1280 widths, run both reviewer agents and fix their findings until they approve, then commit, open the PR, merge when CI is green, update PROGRESS.md, and tell me how to see the result.
```

## C2. Ask for an independent review at any time

```
Run @agent-code-reviewer and @agent-security-reviewer on everything changed since main. Show me the findings in plain English, fix every blocker, major, critical and high finding, re-run both reviews until they APPROVE, then summarise what was fixed.
```

## C3. Quality audit of the whole codebase (end of each phase)

```
Audit the whole codebase against docs/plan/08-engineering-standards.md: layers and boundaries, folder structure, Angular and TypeScript rules, SQL and Edge Function rules, tests and coverage, accessibility, security. Use both reviewer agents. Give me a short report with a score per area and fix everything below the bar before we start the next phase.
```

## D. Accept a phase

```
Walk me through the done checks for Phase [N], one at a time, telling me exactly what to click. Before that, run all tests and the RLS tests and tell me the results in plain English.
```

## E. Something looks wrong

```
On the [screen name] screen, when I [what you did], I see [what happened]. I expected [what you expected].
[Attach a screenshot if you can.]
Find the cause, fix it, add a test so it cannot come back, and tell me how to check it.
```

## F. Error message on screen or in the terminal

```
I got this error. Fix it and explain in one sentence what went wrong:
[paste the full error text]
```

## G. Change request

```
I want to change [what]. First tell me which requirements (FR/AC IDs) and screens this affects and whether it conflicts with the documents. Do not change anything until I say yes.
```

## H. Deploy to the live site

```
Prepare a release to production: run every test, list the migrations that will be applied to parentpath-prod, and tell me what I need to do. Apply nothing to production until I say "release".
```

## I. End of a working session

```
We are stopping for today. Make sure everything is committed and pushed, the app builds, and PROGRESS.md says exactly where to pick up next time.
```

## J. Using Gemini instead of Claude (when Claude usage runs out)

Open the same folder in Gemini CLI and send prompt **B**. Gemini reads `GEMINI.md`, which points to the same instructions. Ask it to keep updating `PROGRESS.md` so Claude can continue later.
