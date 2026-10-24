# Screen map by build phase

Generated from the User Manual screen inventories (section x.5 of each module) and the BRD release phases. Every screen has a wireframe at `docs/wireframes/screens/<Screen>.html`. All 168 screens are in scope for the first release. Phases are build order only. Shared screens (Home, Settings, system pages) belong to the phase that first needs them. Phase 12 (hardening and launch) adds no new screens.

## Phase 0 · Foundation and app shell  (4 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| ACC-SCR-21 | Error page | — | (shared) |
| ACC-SCR-22 | Page not found or not allowed | — | (shared) |
| ACC-SCR-23 | Maintenance page | — | (shared) |
| ACC-SCR-24 | Offline banner | — | (shared) |

## Phase 1 · Accounts and household  (22 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| ACC-SCR-01 | Create account | ACC-01 | MVP (web) |
| ACC-SCR-02 | Sign in | ACC-01 | MVP (web) |
| ACC-SCR-03 | Second check | ACC-01 | MVP (web) |
| ACC-SCR-04 | App lock settings | ACC-01 | MVP (web) |
| ACC-SCR-05 | Invite co-parent | ACC-02 | MVP (web) |
| ACC-SCR-06 | Invite list and status | ACC-02 | MVP (web) |
| ACC-SCR-07 | Accept invite | ACC-02 | MVP (web) |
| ACC-SCR-08 | Choose Solo Mode | ACC-03 | MVP (web) |
| ACC-SCR-09 | Contact co-parent who is not on the app | ACC-04 | MVP (web) |
| ACC-SCR-10 | Contact-attempt log | ACC-05 | MVP (web) |
| ACC-SCR-11 | Session and draft settings | ACC-06 | Phase 2 (web) |
| ACC-SCR-12 | Household members and roles | ACC-07 | Phase 2 (web) |
| ACC-SCR-14 | Verify email | ACC-09 | MVP (web) |
| ACC-SCR-15 | Reset password | ACC-10 | MVP (web) |
| ACC-SCR-16 | Profile | ACC-11 | MVP (web) |
| ACC-SCR-17 | Enter passcode | ACC-01 | MVP (web) |
| ACC-SCR-18 | Close account | ACC-12 | Phase 2 (web) |
| ACC-SCR-B01 | Household Overview | — | (shared) |
| NTF-SCR-B04 | System Send Status | — | (shared) |
| ACC-SCR-19 | Home | — | (shared) |
| ACC-SCR-20 | Settings | — | (shared) |
| ACC-SCR-25 | Session timeout warning | — | (shared) |

## Phase 2 · Safety and privacy  (12 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| SAF-SCR-01 | Safety Mode settings | SAF-01 | MVP (web) |
| SAF-SCR-02 | Safety notice and confirm to turn on | SAF-01 | MVP (web) |
| SAF-SCR-03 | Enter the code to turn off | SAF-01 | MVP (web) |
| SAF-SCR-04 | Exit now button on every screen, and the neutral page | SAF-01 | MVP (web) |
| SAF-SCR-05 | Public safety resources page | SAF-01 | MVP (web) |
| SAF-SCR-06 | Offer of Safety Mode from a family violence flag | SAF-01 | MVP (web) |
| SAF-SCR-07 | Alerts and images settings | SAF-02 | MVP (web) |
| SAF-SCR-08 | Warning and confirm for the level Name and text | SAF-02 | MVP (web) |
| SAF-SCR-09 | Hidden image placeholder | SAF-02 | MVP (web) |
| SAF-SCR-10 | AI and your data | SAF-03 | MVP (web) |
| SAF-SCR-11 | AI use log | SAF-03 | MVP (web) |
| SAF-SCR-12 | Exit now confirmation | — | (shared) |

## Phase 3 · Children and documents  (15 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| DOC-SCR-01 | Children list and child form | DOC-01 | MVP (web) |
| DOC-SCR-02 | Child information by child and section, with filters | DOC-01 | MVP (web) |
| DOC-SCR-03 | Child information entry form | DOC-01 | MVP (web) |
| DOC-SCR-04 | Entry detail and version history | DOC-01 | MVP (web) |
| DOC-SCR-05 | Documents list, with storage used and filters | DOC-02 | MVP (web) |
| DOC-SCR-06 | Upload a document | DOC-02 | MVP (web) |
| DOC-SCR-07 | Document detail, versions and history | DOC-02 | MVP (web) |
| DOC-SCR-08 | Recently deleted | DOC-02, DOC-03 | MVP (web); Phase 3 (later) |
| DOC-SCR-09 | Photo albums | DOC-03 | Phase 3 (later) |
| DOC-SCR-10 | Wish list | DOC-04 | Phase 3 (later) |
| DOC-SCR-11 | Task lists | DOC-05 | Phase 3 (later) |
| DOC-SCR-12 | Share links: create and list | DOC-06 | Phase 3 (later) |
| DOC-SCR-13 | Public share link page | DOC-06 | Phase 3 (later) |
| DOC-SCR-14 | Emergency contacts | DOC-07 | Phase 3 (later) |
| DOC-SCR-15 | Public page where an emergency contact agrees or stops | DOC-07 | Phase 3 (later) |

## Phase 4 · Notifications and messaging  (21 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| MSG-SCR-01 | Thread list | MSG-01 | MVP (web) |
| MSG-SCR-02 | Thread and message view, with the status of each message | MSG-01, MSG-02, MSG-03 | MVP (web) |
| MSG-SCR-03 | New message and reply | MSG-01, MSG-04 | MVP (web) |
| MSG-SCR-04 | Drafts | MSG-01 | MVP (web) |
| MSG-SCR-05 | AI settings (tone check, shield and level) | MSG-04, MSG-06 | MVP (web) |
| MSG-SCR-06 | Held message | MSG-06 | MVP (web) |
| MSG-SCR-07 | Report a message | MSG-14 | MVP (web) |
| MSG-SCR-08 | Search | MSG-07 | Phase 2 (web) |
| MSG-SCR-09 | Folders and topics | MSG-08 | Phase 2 (web) |
| MSG-SCR-10 | Attachments in the message form | MSG-09 | Phase 2 (web) |
| MSG-SCR-11 | Group thread members | MSG-10 | Phase 3 (later) |
| MSG-SCR-12 | AI coach | MSG-11 | Phase 3 (later) |
| MSG-SCR-13 | Mediation request | MSG-12 | Phase 3 (later) |
| MSG-SCR-B01 | AI rewrite | — | (shared) |
| NTF-SCR-01 | Notification settings (wait times and reminder times) | NTF-01 | MVP (web) |
| NTF-SCR-02 | Notification health check | NTF-03 | Phase 2 (web) |
| NTF-SCR-03 | Message status display, shown on the message screen in Messaging | NTF-02 | MVP (web) |
| NTF-SCR-04 | Quiet windows and limits | NTF-05 | Phase 3 (later) |
| NTF-SCR-B01 | Message Alert (system output) | — | (shared) |
| NTF-SCR-B02 | Reminder Alert (system output) | — | (shared) |
| NTF-SCR-B03 | Delivery Log | — | (shared) |

## Phase 5 · Calling  (7 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| CLL-SCR-01 | Calling settings (audio, video, recording, transcripts) | CLL-01, CLL-02 | Phase 2 (web) |
| CLL-SCR-02 | Place a call, started from the thread | CLL-01 | Phase 2 (web) |
| CLL-SCR-03 | Incoming call | CLL-01 | Phase 2 (web) |
| CLL-SCR-04 | Call screen with the controls and the Recording label | CLL-01, CLL-02 | Phase 2 (web) |
| CLL-SCR-05 | Recording request | CLL-02 | Phase 2 (web) |
| CLL-SCR-06 | Call log, recordings and transcripts | CLL-01, CLL-02 | Phase 2 (web) |
| CLL-SCR-07 | Consent log | CLL-01 | Phase 2 (web) |

## Phase 6 · Calendar and parenting time  (14 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| CAL-SCR-01 | Calendar (day, week and month views) | CAL-01 | MVP (web) |
| CAL-SCR-02 | Event form | CAL-01 | MVP (web) |
| CAL-SCR-03 | Parenting time form | CAL-01 | MVP (web) |
| CAL-SCR-04 | Schedule change request form | CAL-02 | MVP (web) |
| CAL-SCR-05 | Request detail, answer and undo | CAL-02 | MVP (web) |
| CAL-SCR-06 | Entry history and request history | CAL-02, CAL-10 | MVP (web) |
| CAL-SCR-07 | Schedule templates and builder | CAL-03 | Phase 2 (web) |
| CAL-SCR-08 | Holidays | CAL-04 | Phase 2 (web) |
| CAL-SCR-09 | Calendar sync settings | CAL-05 | Phase 2 (web) |
| CAL-SCR-10 | Exchange record | CAL-06 | Phase 2 (web) |
| CAL-SCR-11 | Compliance view | CAL-07 | Phase 3 (later) |
| CAL-SCR-12 | Parenting plan builder | CAL-08 | Phase 3 (later) |
| CAL-SCR-13 | Check-in | CAL-09 | Phase 3 (later) |
| CAL-SCR-14 | Pets | CAL-11 | Phase 3 (later) |

## Phase 7 · Expenses and payments  (17 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| EXP-SCR-01 | Expense log, with filters and total | EXP-01, EXP-06 | MVP (web) |
| EXP-SCR-02 | Add or edit expense, with files and share | EXP-01, EXP-02, EXP-06 | MVP (web) |
| EXP-SCR-03 | Expense detail, with files and version history | EXP-01, EXP-02 | MVP (web) |
| EXP-SCR-04 | Reimbursement request form | EXP-03 | MVP (web) |
| EXP-SCR-05 | Request detail: answer, confirm and mark as paid | EXP-03 | MVP (web) |
| EXP-SCR-06 | Request list and history | EXP-03 | MVP (web) |
| EXP-SCR-07 | Record a child support payment | EXP-07 | MVP (web) |
| EXP-SCR-08 | Child support payment list and detail | EXP-07 | MVP (web) |
| EXP-SCR-09 | Running balance | EXP-04 | Phase 2 (web) |
| EXP-SCR-10 | Split rules | EXP-05 | Phase 2 (web) |
| EXP-SCR-11 | Dispute | EXP-09 | Phase 2 (web) |
| EXP-SCR-12 | Pay a request: confirm and payment status | EXP-08, EXP-13 | Phase 3 (later) |
| EXP-SCR-13 | Scheduled and repeating payments | EXP-10 | Phase 3 (later) |
| EXP-SCR-14 | AI-assisted expense entry | EXP-11 | Phase 3 (later) |
| EXP-SCR-15 | Bills | EXP-12 | Phase 3 (later) |
| EXP-SCR-16 | Credit building setting | EXP-14 | Phase 3 (later) |
| EXP-SCR-17 | Import past expenses | EXP-15 | Phase 3 (later) |

## Phase 8 · Child support sync  (16 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| CSS-SCR-01 | Link a case (state, details, one-time code) | CSS-01 | Sync phase 1 |
| CSS-SCR-02 | Consent | CSS-01 | Sync phase 1 |
| CSS-SCR-03 | Child support overview (status, order, arrears, balance, next hearing, labels) | CSS-02, CSS-04, CSS-07 | Sync phase 1 |
| CSS-SCR-04 | Payments side by side, with flags | CSS-03 | Sync phase 1 |
| CSS-SCR-05 | Due dates and reminder times | CSS-04 | Sync phase 1 |
| CSS-SCR-06 | Agency items in the calendar, with the required documents | CSS-05 | Sync phase 1 |
| CSS-SCR-07 | Share an item | CSS-13 | Sync phase 1 |
| CSS-SCR-08 | Shared with you | CSS-13 | Sync phase 1 |
| CSS-SCR-09 | Unlink and export | CSS-01 | Sync phase 1 |
| CSS-SCR-10 | Send proof to the agency | CSS-06 | Sync phase 2 |
| CSS-SCR-11 | Proof package | CSS-06 | Sync phase 2 |
| CSS-SCR-12 | Offer of Safety Mode | CSS-08 | Sync phase 2 |
| CSS-SCR-13 | Invite through agency notice | CSS-09 | Sync phase 2 |
| CSS-SCR-14 | Timeline | CSS-10 | Sync phase 2 |
| CSS-SCR-15 | Hearing packet | CSS-11 | Phase 3 (later) |
| CSS-SCR-16 | Load log for operations (no case values) | CSS-12 | Sync phase 1 |

## Phase 9 · Records and court  (16 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| REC-SCR-01 | Export records: record types, date range and format | REC-01, REC-05 | MVP (web) |
| REC-SCR-02 | Export history | REC-01, REC-05 | MVP (web) |
| REC-SCR-03 | Public verification page | REC-01 | MVP (web) |
| REC-SCR-04 | Journal list, with filters | REC-07 | MVP (web) |
| REC-SCR-05 | Journal entry form, with files | REC-07 | MVP (web) |
| REC-SCR-06 | Journal entry detail and version history | REC-07 | MVP (web) |
| REC-SCR-07 | Affidavit request form | REC-02 | Phase 2 (web) |
| REC-SCR-08 | Affidavit request status | REC-02 | Phase 2 (web) |
| REC-SCR-09 | Support review of affidavit requests | REC-02 | Phase 2 (web) |
| REC-SCR-10 | Public records request page for attorneys and courts | REC-02 | Phase 2 (web) |
| REC-SCR-11 | Public court notes by state | REC-03 | Phase 2 (web) |
| REC-SCR-12 | Public model order language | REC-04 | Phase 2 (web) |
| REC-SCR-13 | Public retention policy | REC-06 | Phase 2 (web) |
| REC-SCR-14 | Deletion request | REC-06 | Phase 2 (web) |
| REC-SCR-15 | Legal hold request and release | REC-06 | Phase 2 (web) |
| REC-SCR-B01 | Records home | — | (shared) |

## Phase 10 · Professionals  (10 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| PRO-SCR-01 | My professionals: list with status | PRO-01 | Phase 2 (web) |
| PRO-SCR-02 | Invite a professional: type, categories, date range and end date | PRO-01 | Phase 2 (web) |
| PRO-SCR-03 | Access settings of one professional, with end access | PRO-01 | Phase 2 (web) |
| PRO-SCR-04 | Share an item with a professional, with confirm step | PRO-01 | Phase 2 (web) |
| PRO-SCR-05 | Access log | PRO-01 | Phase 2 (web) |
| PRO-SCR-06 | Accept an invite and create a professional account | PRO-01 | Phase 2 (web) |
| PRO-SCR-07 | Professional home: list of clients | PRO-01 | Phase 2 (web) |
| PRO-SCR-08 | Professional client view, read only | PRO-01 | Phase 2 (web) |
| PRO-SCR-09 | Send one message to a professional | PRO-02 | Phase 3 (later) |
| PRO-SCR-10 | Professional list of messages From a parent | PRO-02 | Phase 3 (later) |

## Phase 11 · Help and support  (14 screens)

| Screen | Name | Features | Original BRD phase (reference only — everything is built now) |
|---|---|---|---|
| SUP-SCR-01 | Help screen (search, topics, My requests, contact, hours, service notice) | SUP-01 | MVP (web) |
| SUP-SCR-02 | Help center search results | SUP-01 | MVP (web) |
| SUP-SCR-03 | Article | SUP-01 | MVP (web) |
| SUP-SCR-04 | New request form | SUP-01 | MVP (web) |
| SUP-SCR-05 | Request confirmation | SUP-01 | MVP (web) |
| SUP-SCR-06 | My requests | SUP-01 | MVP (web) |
| SUP-SCR-07 | Request thread | SUP-01 | MVP (web) |
| SUP-SCR-08 | Request form on the sign-in page | SUP-01 | MVP (web) |
| SUP-SCR-09 | Staff queue | SUP-02 | MVP (web) |
| SUP-SCR-10 | Staff case view | SUP-02 | MVP (web) |
| SUP-SCR-11 | Service notices | SUP-02 | MVP (web) |
| SUP-SCR-12 | Help article editor | SUP-02 | MVP (web) |
| SUP-SCR-13 | Reply templates | SUP-02 | MVP (web) |
| SUP-SCR-14 | Support measures report | SUP-03 | Phase 2 (web) |

Total screens: 168

Features assigned to build phases:

- **Phase 1 · Accounts and household**: ACC-01 Sign-in with two-factor authentication and biometric or passcode lock, ACC-02 Invite the co-parent by text, email or link, with invite status, ACC-03 Solo Mode: keep records without the co-parent joining, ACC-04 Reach a co-parent who is not on the app, by text or email, with a full record, ACC-05 Contact-attempt log, ACC-06 User-set session timeout and draft auto-save, ACC-07 Household roles: parent, child and third party, ACC-09 Email verification at sign-up (proposed), ACC-10 Password reset (proposed), ACC-11 Profile management (proposed), ACC-12 Account closure (proposed), NTF-06 Send service for account, invite and payment messages
- **Phase 2 · Safety and privacy**: SAF-01 Safety Mode for survivors of abuse, SAF-02 Notification preview and sensitive-image controls, SAF-03 AI privacy controls
- **Phase 3 · Children and documents**: DOC-01 Child information storage (medical, school, contacts), DOC-02 Secure document and file storage, DOC-03 Photo album and shared memories, DOC-04 Wish list for the child's needs, DOC-05 Shared tasks and to-do lists, DOC-06 Expiring share links for files, DOC-07 Emergency contact assignment
- **Phase 4 · Notifications and messaging**: MSG-01 Secure in-app messaging, MSG-02 Messages cannot be edited or deleted, MSG-03 Time-stamped messages, MSG-04 Tone checks on outgoing messages, MSG-05 AI rewrite suggestions for outgoing messages (opt-in), MSG-06 Incoming message shield with view-original, MSG-07 Search messages by keyword or date, MSG-08 Message folders or topics, MSG-09 Attachments and files in messages, MSG-10 Group chat and messages to third parties, MSG-11 AI co-parenting coach, MSG-12 Human mediation or counseling in the app, MSG-13 Urgent-message detection, MSG-14 Report a message (proposed), NTF-01 Multi-channel alerts: push, then SMS and email if a message stays unread, NTF-02 Delivery and read status on every message, logged in the record, NTF-03 Notification health check in settings, NTF-04 Event and deadline reminders, NTF-05 Notification quiet windows or limits
- **Phase 5 · Calling**: CLL-01 In-app audio and video calls, CLL-02 Call recording and transcription (with consent), CLL-03 Personal phone number hidden during calls
- **Phase 6 · Calendar and parenting time**: CAL-01 Shared calendar, CAL-02 Schedule change and swap requests with confirm step, undo window and approval log, CAL-03 Custody schedule templates and schedule builder, CAL-04 Holiday scheduling and overrides, CAL-05 Two-way sync with Google, Apple and Outlook calendars, CAL-06 Parenting-time tracking, CAL-07 Parenting-time analytics and compliance view, CAL-08 Parenting plan builder, CAL-09 Check-ins at exchanges (location), CAL-10 Calendar audit trail (edit and delete history), CAL-11 Pet schedules and pet expenses
- **Phase 7 · Expenses and payments**: EXP-01 Shared expense log, EXP-02 Receipt attachment and scanning, EXP-03 Reimbursement requests with deadlines and required proof, EXP-04 Running balance of who owes what, EXP-05 Split rules from the court order, applied to every shared expense, EXP-06 Expense categories and per-child tracking, EXP-07 Record child support payments, EXP-08 In-app money transfer with payment status from start to end, EXP-09 Expense disputes, EXP-10 Scheduled and recurring payments, EXP-11 AI-assisted expense entry, EXP-12 Bill pay direct to merchant, EXP-13 Pay expenses by credit card, EXP-14 Payments reported for credit building (opt-in), EXP-15 Import past expenses
- **Phase 8 · Child support sync**: CSS-01 Link a child support case with identity check and consent, CSS-02 Read-only pull of case status, order amount, payment history, arrears and next hearing, CSS-03 Agency payments and app-recorded payments side by side, with mismatch flags, CSS-04 Arrears, balance and due dates with reminders, CSS-05 Hearings, deadlines and required documents in the calendar, CSS-06 Send proof of direct payments and expense proofs to the agency, CSS-07 Source and last-synced label on every agency value, CSS-08 Family-violence flag linked to Safety Mode, CSS-09 Child support notice as an extra invite channel, CSS-10 Unified child support timeline, CSS-11 Hearing packet export, CSS-12 Sync engine: one integration layer, one connector for each state, API calls, batch loads and monitoring (proposed), CSS-13 Share one agency item with the co-parent or a professional (proposed)
- **Phase 9 · Records and court**: REC-01 Certified court-ready record exports with record ID and public verification page, REC-02 Business records affidavit and subpoena support, REC-03 Court-order guidance by jurisdiction, REC-04 Model order language that accepts any compliant app, REC-05 Data export (PDF, CSV), never behind a paywall, REC-06 Data retention policy, deletion of non-record data and legal hold, REC-07 Journal and incident notes
- **Phase 10 · Professionals**: PRO-01 Access for attorneys, mediators and therapists, PRO-02 Private channel to a professional
- **Phase 11 · Help and support**: SUP-01 Support targets, case numbers and a searchable help center, SUP-02 Staff support workspace (proposed), SUP-03 Support measures report (proposed)
