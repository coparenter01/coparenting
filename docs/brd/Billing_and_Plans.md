# Module BRD: Billing and Plans (BIL)

ParentPath \| Module BRD \| v1.0

This BRD follows the Common BRD. Shared roles, data entities, shared rules, non-functional requirements and standards are not repeated here. This document points to them by ID. This version has no open question. It is approved when the approver signs it off. Priority uses Must for Must-have features and Should for Good-to-have features. This module has no Unique features. Requirements use shall for Must and should for Should. Question numbers (Q) and change request numbers (CR) are local to this BRD. SCR, ERR, MSGT and INT numbers also start at 01 in each module BRD. A reference from another BRD names the module, for example Billing ERR-01 (decision Q-15).

## 1. Document control

| Field            | Detail                                                                                                                                                                                                                  |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Project          | ParentPath                                                                                                                                                                                                              |
| Document         | Module BRD: Billing and Plans                                                                                                                                                                                           |
| Module prefix    | BIL                                                                                                                                                                                                                     |
| Version          | v1.0                                                                                                                                                                                                                    |
| Status           | Final. Decisions of October 10, 2026 recorded. Manager confirmation and approver sign-off pending.                                                                                                                      |
| Author           | \[Name, role\]                                                                                                                                                                                                          |
| Reviewers        | \[Names\]                                                                                                                                                                                                               |
| Approver         | \[Name\]                                                                                                                                                                                                                |
| Date             | October 10, 2026                                                                                                                                                                                                        |
| Source documents | Common BRD (Sample v1.0), Scope and Modules Document v1.0 (Draft), Pain Point workbook (data as of September 30, 2026), Feature Comparison workbook (Updated), Accounts and Onboarding BRD v0.3, Notifications BRD v1.0 |

**Change log**

| Version | Date             | Author   | What changed                                                                                                                                                                                                                                                                                                                                                   | Reason                                           |
|---------|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| v0.1    | October 10, 2026 | \[Name\] | First draft                                                                                                                                                                                                                                                                                                                                                    | New                                              |
| v1.0    | October 10, 2026 | \[Name\] | Recorded the decisions for Q-01 to Q-15. Moved BIL-08 to the MVP and made it Must-have. Added FR-BIL-01-08 to FR-BIL-01-11, FR-BIL-04-04 to FR-BIL-04-06, new requirements for BIL-05, BIL-06, BIL-08 and BIL-09, and their acceptance criteria. Updated data, screens, errors, messages, interfaces, risks, traceability and readiness. Closed all questions. | Recommended answers recorded on October 10, 2026 |

## 2. Purpose and scope

**2.1 Purpose.** This module decides who pays, for what, and when. Cost came up as a major complaint about existing apps (P01 and P02 are both rated High), so the module is built around one household plan and a free core plan.

**2.2 Objectives this module supports.** Objective IDs come from Common BRD section 2.3.

| ID     | How this module supports it                                                                |
|--------|--------------------------------------------------------------------------------------------|
| OBJ-03 | Fixes the High-rated pain points P01, P02 and P13 in the first release (BIL-01 to BIL-04). |
| OBJ-04 | Keeps the cost low with a free core plan and one household plan (BIL-01, BIL-02, BIL-07).  |
| OBJ-05 | Gives survivors of abuse free access (BIL-05, with Safety and Privacy).                    |

**2.3 In scope.** The nine features BIL-01 to BIL-09 listed in section 5.

**2.4 Out of scope for this BRD.** These items belong to another module or to a later decision.

| Item                                                                                | Where it belongs                                                                                                       |
|-------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| Moving money between parents, bill pay and credit card payments                     | Expenses and Payments (EXP), Phase 3. A payment provider for money transfer is not chosen (Scope document decision 8). |
| Child support payments through the agency                                           | Child Support Sync (CSS) and Expenses and Payments (EXP-07).                                                           |
| The tone check, the incoming message shield, Safety Mode and data export themselves | Messaging (MSG), Safety and Privacy (SAF) and Records and Court (REC). This module only says they are in every plan.   |
| Handling of waiver and refund requests by staff, response targets and support hours | Support (SUP-01), Phase 2 (Scope document decision 26). This module defines the requests.                              |
| Storage limits                                                                      | Children and Documents (Scope document decision 24).                                                                   |
| Sign-in, invites and the household mode                                             | Accounts and Onboarding (ACC).                                                                                         |
| Sending alerts                                                                      | Notifications (NTF).                                                                                                   |
| Purchases made inside iOS or Android apps                                           | Mobile phase. See risk RSK-04.                                                                                         |
| Agency staff as users                                                               | Out of scope for now (Scope document 4.2, decision 13).                                                                |

**2.5 Release phases of this module.** MVP (web): BIL-01 to BIL-04, BIL-07 and BIL-08. Phase 2 (web): BIL-05 and BIL-06. Phase 3 (later): BIL-09. BIL-08 moves from Phase 2 to the MVP (decision Q-02, CR-01). The phase of each other feature is a proposal (Scope document 4.4).

## 3. Users and roles

Roles are defined in Common BRD 7.1 and the shared permission matrix is in Common BRD 7.2. The table shows what each role does in this module.

| Role                                | What they do in this module                                                                                                                                                                           |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Parent                              | Pays for the Household plan as the payer, sees the plans and the full price, applies for a fee waiver, asks for a refund and starts a free trial. In Phase 3 applies for the military family program. |
| Co-parent                           | Gets the paid extras when the household has the Household plan. Can be the payer. Does not pay a second time.                                                                                         |
| Support staff                       | Reviews fee-waiver and refund requests and sets their status. Cannot read parent messages (Common BRD 7.1).                                                                                           |
| Platform admin                      | No feature in this module.                                                                                                                                                                            |
| Court or child support office       | Can refer a parent for a fee waiver. They are not users of the app (Scope document 4.2, decision 13).                                                                                                 |
| Third party, Child and Professional | No feature in this module.                                                                                                                                                                            |

Permissions for module data: Common BRD 7.2 gives the Parent and the Co-parent the right R (own) and Support staff the rights CRU on waivers and refunds. With read access only, a parent cannot create a request, so the matrix changes to CR (own) for the Parent and the Co-parent (decision Q-12, CR-02).

## 4. Business requirements

| ID      | Business requirement                                                                                                                 | Features | Source                                 | Priority | Phase           |
|---------|--------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------|----------|-----------------|
| BREQ-01 | One household plan covers both parents, and either parent can pay for it.                                                            | BIL-01   | Scope document 7.2; P01                | Must     | MVP (web)       |
| BREQ-02 | A free core plan with no end date stays free for both parents.                                                                       | BIL-02   | BR-04; P02                             | Must     | MVP (web)       |
| BREQ-03 | A household is not billed until the co-parent is linked or the parent chooses Solo Mode.                                             | BIL-03   | BR-03; P01                             | Must     | MVP (web)       |
| BREQ-04 | Tone, safety and reporting tools are in every plan, including the free plan.                                                         | BIL-04   | BR-05; P13                             | Must     | MVP (web)       |
| BREQ-05 | A parent can see one plan with clear limits and the full price before buying.                                                        | BIL-07   | Scope document 7.2; P24                | Should   | MVP (web)       |
| BREQ-06 | A parent can apply for a fee waiver, with a referral from a court or a child support office, and survivors of abuse get free access. | BIL-05   | Scope document 7.2; P04                | Should   | Phase 2 (web)   |
| BREQ-07 | A parent can try the paid extras for free before buying.                                                                             | BIL-06   | Scope document 7.2                     | Should   | Phase 2 (web)   |
| BREQ-08 | A payer can buy on the web, sees the refund window and can ask for a refund inside it.                                               | BIL-08   | Scope document 7.2; P03; decision Q-02 | Must     | MVP (web)       |
| BREQ-09 | A military family can use a military family program.                                                                                 | BIL-09   | Scope document 7.2                     | Should   | Phase 3 (later) |

## 5. Feature summary

Type rules (tests 1 to 3) are in Scope document 1.3. App counts are out of the 10 co-parenting apps in the Feature Comparison workbook (Cozi is not counted).

| ID     | Feature                                                                       | Type                                         | Priority | Phase           | Pain point  | Why this type                                                                                                                                                  |
|--------|-------------------------------------------------------------------------------|----------------------------------------------|----------|-----------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BIL-01 | One household plan; one parent can pay for both                               | Must-have                                    | Must     | MVP (web)       | P01         | Core fix for High pain point P01 (test 2). No comparison row.                                                                                                  |
| BIL-02 | Permanent free core plan (messaging, calendar, records)                       | Must-have                                    | Must     | MVP (web)       | P02         | Core fix for High pain point P02 (test 2). 1 of 10 apps lists a free plan with no expiry (BestInterest). SupportPay with WeParent and Kidtime list it in part. |
| BIL-03 | No billing until the co-parent is linked or Solo Mode is chosen               | Must-have                                    | Must     | MVP (web)       | P01         | Core fix for P01 (test 2). No comparison row.                                                                                                                  |
| BIL-04 | Tone, safety and reporting tools included in every plan, including free       | Must-have                                    | Must     | MVP (web)       | P13         | Core fix for High pain point P13 (test 2). No comparison row.                                                                                                  |
| BIL-05 | Fee-waiver flow with fast approval and court or child support office referral | Good-to-have                                 | Should   | Phase 2 (web)   | P04         | Meets none of the three tests. The updated comparison workbook has no fee-waiver row (see RSK-05).                                                             |
| BIL-06 | Free trial of premium extras                                                  | Good-to-have                                 | Should   | Phase 2 (web)   | None linked | Judgement call. The updated comparison workbook has no free-trial row (see RSK-05).                                                                            |
| BIL-07 | Transparent pricing: one plan, clear limits, full price up front              | Good-to-have                                 | Should   | MVP (web)       | P24         | Meets none of the three tests. Related row Payment limits or fees by plan: OurFamilyWizard and TalkingParents list limits or fees.                             |
| BIL-08 | Web-first checkout with a clear refund window                                 | Must-have (changed from Good-to-have, CR-01) | Must     | MVP (web)       | P03         | Changed by decision Q-02. BIL-01 and BIL-03 cannot be used or tested without a checkout, and P03 needs the refund terms before payment.                        |
| BIL-09 | Military family program                                                       | Good-to-have                                 | Should   | Phase 3 (later) | None linked | 2 of 10 apps list it (OurFamilyWizard, AppClose).                                                                                                              |

## 6. Functional requirements, user stories and acceptance criteria

Field rules for the Household and Audit log entities are in Common BRD 8.2 and 8.5. Error and message IDs are in section 10.

### 6.1 BIL-01 One household plan; one parent can pay for both

**US-BIL-01-01.** As a parent, I want one plan that covers both of us and lets either of us pay, so that my co-parent does not need a second subscription.

| ID           | Requirement                                                                                                                                                                                                                                                       | Priority | Source                                 |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------|
| FR-BIL-01-01 | The system shall offer one paid plan, the Household plan, that covers both parents of a household.                                                                                                                                                                | Must     | BIL-01; Common BRD 8.2                 |
| FR-BIL-01-02 | The system shall let either parent of a household pay for the Household plan.                                                                                                                                                                                     | Must     | BIL-01; P01                            |
| FR-BIL-01-03 | The system shall save the paying parent as the payer of the household (payer_user_id). A household has one payer. The field is empty on the Free core plan.                                                                                                       | Must     | Common BRD 8.2                         |
| FR-BIL-01-04 | While the household plan is Household, the system shall give both parents the paid extras with one payment. The paid extras are calls with recording, AI rewrite, calendar sync, parenting-time reports, professional access, more storage and notarized records. | Must     | Scope document 7.2; P01; decision Q-01 |
| FR-BIL-01-05 | The system shall show both parents the plan (Free core or Household), the status of the plan and the name of the payer. It shall show the amount, the receipts and the payment method only to the payer.                                                          | Must     | Common BRD 8.2; decision Q-07          |
| FR-BIL-01-06 | If the payment for the Household plan cannot be completed, the system shall keep the household on its current plan and show ERR-03.                                                                                                                               | Must     | Common BRD 5 (unhappy path)            |
| FR-BIL-01-07 | The system shall write an audit log entry for every change of plan or payer, with actor, time and result.                                                                                                                                                         | Must     | NFR-04; Common BRD 8.5                 |
| FR-BIL-01-08 | The system shall let the payer cancel the Household plan. The plan stays Household until the end of the period that is paid for, and then becomes Free core.                                                                                                      | Must     | Decision Q-06                          |
| FR-BIL-01-09 | If a renewal payment fails, the system shall keep the Household plan for 7 days and tell the payer through the Notifications module. If the payment is still not made after 7 days, the system shall set the plan to Free core.                                   | Must     | Decision Q-06                          |
| FR-BIL-01-10 | When the payer cancels, the system shall let the other parent buy the Household plan before the paid period ends, so that the household has no gap in access.                                                                                                     | Must     | Decision Q-06                          |
| FR-BIL-01-11 | The system shall take card details only through the payment provider and shall not store card numbers.                                                                                                                                                            | Must     | Decision Q-03; NFR-06                  |

Decisions Q-01, Q-02, Q-03, Q-06 and Q-07 are in section 15. A parent buys the plan on the web in the MVP (BIL-08). The 7 days in FR-BIL-01-09 are a BA recommendation.

| ID           | Given                                                                                   | When                                                        | Then                                                                                                                                       | Covers                                                 |
|--------------|-----------------------------------------------------------------------------------------|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| AC-BIL-01-01 | A linked household on the Free core plan                                                | Parent A buys the Household plan                            | The household plan is Household, the payer is Parent A, Parent B gets the paid extras without paying, and MSGT-01 shows                    | FR-BIL-01-01, FR-BIL-01-02, FR-BIL-01-03, FR-BIL-01-04 |
| AC-BIL-01-02 | A linked household on the Free core plan                                                | Parent B buys the Household plan                            | The household plan is Household and the payer is Parent B                                                                                  | FR-BIL-01-02, FR-BIL-01-03                             |
| AC-BIL-01-03 | A household with the plan Household and Parent A as payer                               | Parent B opens the plan screen                              | The screen shows the plan Household, its status and the name of Parent A, and does not show the amount, the receipts or the payment method | FR-BIL-01-05                                           |
| AC-BIL-01-04 | The same household                                                                      | Parent A opens the plan screen                              | The screen shows the plan, its status, the amount, the receipts and the payment method                                                     | FR-BIL-01-05                                           |
| AC-BIL-01-05 | A household on the Free core plan and a payment that is not completed                   | A parent tries to buy the Household plan                    | The household stays on Free core and ERR-03 shows                                                                                          | FR-BIL-01-06                                           |
| AC-BIL-01-06 | A household that changes from Free core to Household                                    | The change is saved                                         | One audit log entry exists with the actor, the time in UTC and the result                                                                  | FR-BIL-01-07                                           |
| AC-BIL-01-07 | A household on the Household plan and a payer who cancels in the middle of a paid month | The payer confirms the cancellation                         | MSGT-12 shows, the plan stays Household until the end of the paid month, and then it becomes Free core and MSGT-10 shows                   | FR-BIL-01-08                                           |
| AC-BIL-01-08 | A household whose renewal payment fails                                                 | 7 days pass without a payment                               | The plan was Household during the 7 days, the payer was told (MSGT-11), and now the plan is Free core                                      | FR-BIL-01-09                                           |
| AC-BIL-01-09 | A household where Parent A cancelled                                                    | Parent B buys the Household plan before the paid month ends | The household has no gap in access and Parent B is the payer                                                                               | FR-BIL-01-10                                           |
| AC-BIL-01-10 | A payer who enters card details                                                         | The purchase is made                                        | The provider holds the card details and the app holds no card number                                                                       | FR-BIL-01-11                                           |

### 6.2 BIL-02 Permanent free core plan

**US-BIL-02-01.** As a parent, I want a free plan that never ends and covers my core needs, so that I can keep my records without paying.

| ID           | Requirement                                                                                                                                                                                                                                                                                                              | Priority | Source                                   |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------|
| FR-BIL-02-01 | The system shall give every household the Free core plan with no end date.                                                                                                                                                                                                                                               | Must     | BIL-02; Common BRD 8.2                   |
| FR-BIL-02-02 | The system shall keep the Free core plan free for both parents.                                                                                                                                                                                                                                                          | Must     | BR-04                                    |
| FR-BIL-02-03 | The system shall include messaging, calendar, swap requests, expenses, receipts, journal, records, exports, tone and safety tools, Solo Mode and Safety Mode in the Free core plan.                                                                                                                                      | Must     | BIL-02; decision Q-01 (Scope decision 9) |
| FR-BIL-02-04 | The system shall not ask for payment before a parent uses a Free core feature.                                                                                                                                                                                                                                           | Must     | BR-04; P02                               |
| FR-BIL-02-05 | The system shall keep data export in PDF and CSV in the Free core plan.                                                                                                                                                                                                                                                  | Must     | BR-05; P02                               |
| FR-BIL-02-06 | When the Household plan ends, the system shall set the household plan to Free core and keep all records. Records, files and call recordings stay viewable and exportable. If the household is over the Free storage limit of 2 GB, the system shall block new uploads until it is under the limit and shall show ERR-06. | Must     | BIL-02; BR-05; decisions Q-06 and Q-13   |

| ID           | Given                                                              | When                                                                                              | Then                                                                                         | Covers                                   |
|--------------|--------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|------------------------------------------|
| AC-BIL-02-01 | A new household                                                    | The household is created                                                                          | The plan is Free core and the household has no end date for the plan                         | FR-BIL-02-01                             |
| AC-BIL-02-02 | A household on the Free core plan                                  | Either parent uses messaging, calendar, swap requests, expenses, receipts, the journal or records | The feature works and no payment is asked                                                    | FR-BIL-02-02, FR-BIL-02-03, FR-BIL-02-04 |
| AC-BIL-02-03 | A household on the Free core plan                                  | A parent exports records in PDF and in CSV                                                        | Both exports are available and no payment is asked                                           | FR-BIL-02-05                             |
| AC-BIL-02-04 | A household with the plan Household                                | The plan ends                                                                                     | The plan is Free core, all records can still be viewed and exported, and MSGT-10 shows       | FR-BIL-02-06                             |
| AC-BIL-02-05 | A household that was on the Household plan and holds 3 GB of files | A parent tries to upload a new file                                                               | The upload is blocked, ERR-06 shows, and the existing files can still be viewed and exported | FR-BIL-02-06                             |

### 6.3 BIL-03 No billing until the co-parent is linked or Solo Mode is chosen

**US-BIL-03-01.** As a parent, I want no charge until my co-parent has joined or I have chosen to use the app alone, so that I never pay for an app my co-parent will not use.

| ID           | Requirement                                                                                                                                                           | Priority | Source                                                                                      |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------------------------|
| FR-BIL-03-01 | The system shall not start a charge for a household that is not Linked and is not in Solo Mode.                                                                       | Must     | BR-03; P01                                                                                  |
| FR-BIL-03-02 | The system shall read the household mode (Linked or Solo) from Accounts and Onboarding.                                                                               | Must     | Common BRD 8.2; Accounts BRD FR-ACC-03-05                                                   |
| FR-BIL-03-03 | The system shall start a charge only after the payer has seen the full price and has confirmed the purchase.                                                          | Must     | P01 (charge only for premium extras); Scope document 7.2 (full price shown before purchase) |
| FR-BIL-03-04 | If a parent tries to buy the Household plan while the household is not Linked and is not in Solo Mode, the system shall not start the purchase and shall show ERR-01. | Must     | BR-03                                                                                       |
| FR-BIL-03-05 | If the system cannot read the household mode, it shall not start a charge and shall show ERR-02.                                                                      | Must     | BR-03; Common BRD 5 (unhappy path)                                                          |

The household mode comes from Accounts and Onboarding. Linked means the co-parent accepted the invite and joined the household (Accounts BRD FR-ACC-02-08). Solo is the mode a parent chooses under ACC-03.

| ID           | Given                                                        | When                                                                             | Then                                                            | Covers                                   |
|--------------|--------------------------------------------------------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------|------------------------------------------|
| AC-BIL-03-01 | A household with no linked co-parent and no Solo Mode choice | A parent tries to buy the Household plan                                         | The purchase does not start, no charge is made and ERR-01 shows | FR-BIL-03-01, FR-BIL-03-04               |
| AC-BIL-03-02 | A household in Solo Mode                                     | A parent sees the full price and confirms the purchase                           | The purchase starts                                             | FR-BIL-03-01, FR-BIL-03-02, FR-BIL-03-03 |
| AC-BIL-03-03 | A linked household                                           | A parent sees the full price and confirms the purchase                           | The purchase starts                                             | FR-BIL-03-01, FR-BIL-03-02, FR-BIL-03-03 |
| AC-BIL-03-04 | A household where the mode cannot be read                    | A parent tries to buy the Household plan                                         | No charge is made and ERR-02 shows                              | FR-BIL-03-05                             |
| AC-BIL-03-05 | A linked household                                           | A parent opens the purchase screen, sees the price and leaves without confirming | No charge is made                                               | FR-BIL-03-03                             |

### 6.4 BIL-04 Tone, safety and reporting tools in every plan

**US-BIL-04-01.** As a parent, I want tone, safety and reporting tools on every plan, so that I am protected whether or not I pay.

| ID           | Requirement                                                                                                                                                                                   | Priority | Source                                                               |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------|
| FR-BIL-04-01 | The system shall make the tone check (MSG-04) available on every plan, including Free core.                                                                                                   | Must     | BR-05; P13                                                           |
| FR-BIL-04-02 | The system shall make the incoming message shield (MSG-06) available on every plan, including Free core.                                                                                      | Must     | BR-05; P13                                                           |
| FR-BIL-04-03 | The system shall make Safety Mode (SAF-01) available on every plan, including Free core.                                                                                                      | Must     | BR-05; Scope document decision 9                                     |
| FR-BIL-04-04 | The system shall make the notification preview and sensitive-image controls (SAF-02) and the AI privacy controls (SAF-03) available on every plan, including Free core.                       | Must     | BR-05; decision Q-05                                                 |
| FR-BIL-04-05 | The system shall make the reporting tool available on every plan, including Free core. The tool lets a parent report a harassing message or behavior. The Messaging BRD names and defines it. | Must     | BR-05; Scope document 12 (report tools in every plan); decision Q-05 |
| FR-BIL-04-06 | When a household changes between Free core and Household, the system shall keep the tools in FR-BIL-04-01 to FR-BIL-04-05 available.                                                          | Must     | BR-05                                                                |

| ID           | Given                                                      | When                                                                                             | Then                        | Covers       |
|--------------|------------------------------------------------------------|--------------------------------------------------------------------------------------------------|-----------------------------|--------------|
| AC-BIL-04-01 | A household on the Free core plan                          | A parent writes a message                                                                        | The tone check is available | FR-BIL-04-01 |
| AC-BIL-04-02 | A household on the Free core plan                          | A parent turns on the incoming message shield                                                    | The shield is available     | FR-BIL-04-02 |
| AC-BIL-04-03 | A household on the Free core plan                          | A parent turns on Safety Mode                                                                    | Safety Mode is available    | FR-BIL-04-03 |
| AC-BIL-04-04 | A household on the Free core plan                          | A parent opens the notification preview and sensitive-image controls and the AI privacy controls | Both are available          | FR-BIL-04-04 |
| AC-BIL-04-05 | A household on the Free core plan                          | A parent opens the reporting tool                                                                | The tool is available       | FR-BIL-04-05 |
| AC-BIL-04-06 | A household whose plan changes from Household to Free core | A parent uses the tone check, the shield, Safety Mode, the controls and the reporting tool       | All are still available     | FR-BIL-04-06 |

### 6.5 BIL-05 Fee-waiver flow with fast approval (Phase 2)

**US-BIL-05-01.** As a parent who cannot pay, I want to ask for a fee waiver and get a fast answer, so that I can use the paid extras.

| ID           | Requirement                                                                                                                                                                                                                                        | Priority | Source                                                     |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------------------|
| FR-BIL-05-01 | The system should let a parent apply for a fee waiver inside the app.                                                                                                                                                                              | Should   | BIL-05; P04                                                |
| FR-BIL-05-02 | The system should accept a referral from a court or a child support office as a basis for a waiver. The parent enters the referral reference or uploads the referral letter, and support staff check it.                                           | Should   | BIL-05; P04; decision Q-09                                 |
| FR-BIL-05-03 | The system should give survivors of abuse free access on request. The parent gives a short statement and no proof is asked.                                                                                                                        | Should   | P04; Scope document decision 9; decision Q-09              |
| FR-BIL-05-04 | The system should show the status of a waiver request as Submitted, In review, Approved or Declined.                                                                                                                                               | Should   | BA proposal                                                |
| FR-BIL-05-05 | The system should let support staff review a waiver request and set its status.                                                                                                                                                                    | Should   | Scope document 7.2; Common BRD 7.2                         |
| FR-BIL-05-06 | The system should tell the parent the decision through the Notifications module (NTF-06).                                                                                                                                                          | Should   | BA proposal                                                |
| FR-BIL-05-07 | The system should save the time of the request and the time of the decision, so that the approval time can be measured.                                                                                                                            | Should   | Scope document 3.3 (success measures); P04 (fast approval) |
| FR-BIL-05-08 | When a waiver is approved, the system should give the household the paid extras of the Household plan for 12 months. A parent can ask again when the 12 months end.                                                                                | Should   | Decision Q-09                                              |
| FR-BIL-05-09 | The system should start free access for a safety request as soon as the request is submitted. Support staff review the request afterwards.                                                                                                         | Should   | Decision Q-09                                              |
| FR-BIL-05-10 | The system should save the basis of a request as Court referral, Child support office referral or Safety access. The basis Safety access shows only to support staff and to the parent who asked. The co-parent never sees a request or its basis. | Should   | Decision Q-09; Common BRD 7.2                              |
| FR-BIL-05-11 | The system should not let support staff read parent messages while they handle a request.                                                                                                                                                          | Should   | Common BRD 7.1                                             |
| FR-BIL-05-12 | The system should flag a request to support staff when it has no decision after 3 business days.                                                                                                                                                   | Should   | Scope document 3.3; decision Q-09                          |
| FR-BIL-05-13 | If a request cannot be submitted, the system should show ERR-05 and should not create the request.                                                                                                                                                 | Should   | Common BRD 5 (unhappy path)                                |
| FR-BIL-05-14 | The system should write an audit log entry for every change of the status of a waiver request.                                                                                                                                                     | Should   | NFR-04                                                     |

Decision Q-09 is in section 15. The 12 months and the 3 business days are BA recommendations. Support hours and the first reply time are in Scope document decision 26.

| ID           | Given                                                    | When                                                     | Then                                                                                                                                         | Covers                                                 |
|--------------|----------------------------------------------------------|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| AC-BIL-05-01 | A signed-in parent                                       | They submit a fee-waiver request                         | The request has the status Submitted, the time of the request is saved, and MSGT-02 shows                                                    | FR-BIL-05-01, FR-BIL-05-04, FR-BIL-05-07               |
| AC-BIL-05-02 | A request with the status Submitted                      | Support staff sets the status to In review               | The status is In review                                                                                                                      | FR-BIL-05-04, FR-BIL-05-05                             |
| AC-BIL-05-03 | A request with the status In review                      | Support staff approves it                                | The status is Approved, the time of the decision is saved, the household has the paid extras for 12 months, and the parent is told (MSGT-03) | FR-BIL-05-05, FR-BIL-05-06, FR-BIL-05-07, FR-BIL-05-08 |
| AC-BIL-05-04 | A request with the status In review                      | Support staff declines it                                | The status is Declined and the parent is told (MSGT-04)                                                                                      | FR-BIL-05-05, FR-BIL-05-06                             |
| AC-BIL-05-05 | A parent who has a referral from a court                 | They enter the referral reference and submit the request | The request shows the basis Court referral                                                                                                   | FR-BIL-05-02, FR-BIL-05-10                             |
| AC-BIL-05-06 | A survivor of abuse                                      | They submit a request with a short statement             | Free access starts at once, the request shows the basis Safety access to support staff, and support staff review it afterwards               | FR-BIL-05-03, FR-BIL-05-09, FR-BIL-05-10               |
| AC-BIL-05-07 | A household where Parent A submitted a request           | Parent B opens the plan screen                           | Nothing about the request or its basis shows                                                                                                 | FR-BIL-05-10                                           |
| AC-BIL-05-08 | A member of support staff who handles a request          | They open the request                                    | No parent messages show                                                                                                                      | FR-BIL-05-11                                           |
| AC-BIL-05-09 | A request submitted 3 business days ago with no decision | The third business day ends                              | Support staff see the request flagged                                                                                                        | FR-BIL-05-12                                           |
| AC-BIL-05-10 | A signed-in parent and a submit error                    | They submit a request                                    | No request is created and ERR-05 shows                                                                                                       | FR-BIL-05-13                                           |
| AC-BIL-05-11 | A request                                                | Its status changes                                       | One audit log entry exists with the actor, the time in UTC and the result                                                                    | FR-BIL-05-14                                           |

### 6.6 BIL-06 Free trial of premium extras (Phase 2)

**US-BIL-06-01.** As a parent, I want to try the paid extras for free for a while, so that I can decide whether to buy.

| ID           | Requirement                                                                                                                  | Priority | Source                                                |
|--------------|------------------------------------------------------------------------------------------------------------------------------|----------|-------------------------------------------------------|
| FR-BIL-06-01 | The system should offer a free trial of the paid extras to a household on the Free core plan.                                | Should   | BIL-06; Scope document 7.2                            |
| FR-BIL-06-02 | The trial should last 14 days. The system should show the trial length and the end date before the trial starts.             | Should   | Decision Q-10; P24 (clear terms)                      |
| FR-BIL-06-03 | The system should allow one trial for each household. If a household asks for a second trial, the system should show ERR-07. | Should   | Decision Q-10                                         |
| FR-BIL-06-04 | When a trial ends, the system should set the household plan to Free core unless the payer has bought the Household plan.     | Should   | BIL-02 (the free plan has no end date); decision Q-10 |
| FR-BIL-06-05 | The system should not charge at the end of a trial unless the payer confirmed the purchase.                                  | Should   | Decision Q-10                                         |
| FR-BIL-06-06 | The system should write an audit log entry when a trial starts and when it ends.                                             | Should   | NFR-04                                                |

Decision Q-10 is in section 15. The 14 days are a BA recommendation.

| ID           | Given                                                                     | When                             | Then                                                                                                 | Covers                     |
|--------------|---------------------------------------------------------------------------|----------------------------------|------------------------------------------------------------------------------------------------------|----------------------------|
| AC-BIL-06-01 | A household on the Free core plan                                         | A parent opens the trial screen  | The screen shows the trial length of 14 days and the end date before the trial starts                | FR-BIL-06-01, FR-BIL-06-02 |
| AC-BIL-06-02 | A household on the Free core plan                                         | A parent starts the trial        | The household has the paid extras until the end date, MSGT-05 shows, and an audit log entry is saved | FR-BIL-06-01, FR-BIL-06-06 |
| AC-BIL-06-03 | A trial for which nobody bought the Household plan                        | The end date passes              | The plan is Free core, all records stay, MSGT-06 shows, and an audit log entry is saved              | FR-BIL-06-04, FR-BIL-06-06 |
| AC-BIL-06-04 | A trial for which the payer bought the Household plan before the end date | The end date passes              | The household plan is Household                                                                      | FR-BIL-06-04               |
| AC-BIL-06-05 | A trial for which the payer did not confirm a purchase                    | The end date passes              | No charge is made                                                                                    | FR-BIL-06-05               |
| AC-BIL-06-06 | A household that already used its trial                                   | A parent asks for a second trial | No trial starts and ERR-07 shows                                                                     | FR-BIL-06-03               |

### 6.7 BIL-07 Transparent pricing: one plan, clear limits, full price up front

**US-BIL-07-01.** As a parent, I want to see the plans with their limits and the full price in one place, so that I know what I will pay before I buy.

| ID           | Requirement                                                                                                                                                        | Priority | Source                                 |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------|
| FR-BIL-07-01 | The system should show the Free core plan and the Household plan on one screen, with what each plan includes.                                                      | Should   | BIL-07; P24                            |
| FR-BIL-07-02 | The system should show every limit of each plan next to the plan: storage of 2 GB per household on Free core and 50 GB on Household, with a warning at 80 percent. | Should   | P24; decision Q-13 (Scope decision 24) |
| FR-BIL-07-03 | The system should show the full price of the Household plan, one monthly price in US dollars with any fees and taxes, before the payer confirms the purchase.      | Should   | Scope document 7.2; P24; decision Q-04 |
| FR-BIL-07-04 | The system should not set a cap on calls or payments in the Household plan.                                                                                        | Should   | P24; decision Q-13                     |

The amount of the price is a business setting. The Manager sets it before the MVP launch (decision Q-04).

| ID           | Given                             | When                             | Then                                                                                      | Covers       |
|--------------|-----------------------------------|----------------------------------|-------------------------------------------------------------------------------------------|--------------|
| AC-BIL-07-01 | A signed-in parent                | They open the plans screen       | The Free core plan and the Household plan show on one screen with what each includes      | FR-BIL-07-01 |
| AC-BIL-07-02 | A signed-in parent                | They open the plans screen       | The limit of 2 GB shows next to Free core and the limit of 50 GB shows next to Household  | FR-BIL-07-02 |
| AC-BIL-07-03 | A payer who starts a purchase     | The confirm screen opens         | The monthly price in US dollars, with any fees and taxes, shows before the confirm button | FR-BIL-07-03 |
| AC-BIL-07-04 | A household on the Household plan | A parent makes calls or payments | No cap blocks the use                                                                     | FR-BIL-07-04 |

### 6.8 BIL-08 Web-first checkout with a clear refund window (MVP)

**US-BIL-08-01.** As a payer, I want to buy on the web and know when I can get a refund, so that a co-parent who refuses to join does not cost me money.

| ID           | Requirement                                                                                                                                                                                              | Priority | Source                            |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------------------------|
| FR-BIL-08-01 | The system shall let the payer buy the Household plan on the web.                                                                                                                                        | Must     | BIL-08; P03; decision Q-02        |
| FR-BIL-08-02 | The system shall show the full price and the refund terms before the payer confirms the purchase.                                                                                                        | Must     | P03; Scope document 7.2           |
| FR-BIL-08-03 | The system shall start the refund window on the purchase date and end it 14 days later.                                                                                                                  | Must     | P03; decision Q-08                |
| FR-BIL-08-04 | The system shall show the payer the end date of the refund window.                                                                                                                                       | Must     | BIL-08 (a clear refund window)    |
| FR-BIL-08-05 | The system shall let the payer ask for a refund inside the refund window.                                                                                                                                | Must     | BIL-08                            |
| FR-BIL-08-06 | The system shall let support staff approve or decline a refund request. An approved refund goes back through the payment provider to the original payment method.                                        | Must     | Scope document 7.2; decision Q-08 |
| FR-BIL-08-07 | The system shall show the status of a refund request as Requested, Approved or Declined.                                                                                                                 | Must     | BA proposal                       |
| FR-BIL-08-08 | If the payer asks for a refund after the window has ended, the system shall not create the request and shall show ERR-04. Support staff may approve a refund after the window and shall save the reason. | Must     | BIL-08; decision Q-08             |
| FR-BIL-08-09 | The system shall write an audit log entry for every purchase and every refund decision.                                                                                                                  | Must     | NFR-04                            |
| FR-BIL-08-10 | If a refund request cannot be submitted, the system shall show ERR-05 and shall not create the request.                                                                                                  | Must     | Common BRD 5 (unhappy path)       |
| FR-BIL-08-11 | The system shall renew the Household plan once a month, on the day of the month of the purchase, until the payer cancels.                                                                                | Must     | Decision Q-04                     |

Purchases made inside iOS or Android apps are not covered (RSK-04). Decisions Q-02, Q-03, Q-04 and Q-08 are in section 15. The refund window of 14 days and the monthly period are BA recommendations. The window starts at the purchase date, because BR-03 allows a purchase only after the household is Linked or in Solo Mode.

| ID           | Given                                                                       | When                            | Then                                                                                                        | Covers                     |
|--------------|-----------------------------------------------------------------------------|---------------------------------|-------------------------------------------------------------------------------------------------------------|----------------------------|
| AC-BIL-08-01 | A payer on the web                                                          | They open the purchase screen   | The full price and the refund terms show before the confirm button                                          | FR-BIL-08-01, FR-BIL-08-02 |
| AC-BIL-08-02 | A payer who bought the Household plan on January 10                         | The purchase is saved           | The refund window starts on January 10 and its end date of January 24 shows to the payer                    | FR-BIL-08-03, FR-BIL-08-04 |
| AC-BIL-08-03 | A payer inside the refund window                                            | They ask for a refund           | A request with the status Requested is created and MSGT-07 shows                                            | FR-BIL-08-05, FR-BIL-08-07 |
| AC-BIL-08-04 | A refund request with the status Requested                                  | Support staff approves it       | The status is Approved, the money goes back to the original payment method, and the payer is told (MSGT-08) | FR-BIL-08-06, FR-BIL-08-07 |
| AC-BIL-08-05 | A refund request with the status Requested                                  | Support staff declines it       | The status is Declined and the payer is told (MSGT-09)                                                      | FR-BIL-08-06, FR-BIL-08-07 |
| AC-BIL-08-06 | A payer after the end of the refund window                                  | They ask for a refund           | No request is created and ERR-04 shows                                                                      | FR-BIL-08-08               |
| AC-BIL-08-07 | A payer who contacted support after the end of the refund window            | Support staff approves a refund | The refund is made and the reason is saved                                                                  | FR-BIL-08-08               |
| AC-BIL-08-08 | A purchase or a refund decision                                             | It is made                      | One audit log entry exists with the actor, the time in UTC and the result                                   | FR-BIL-08-09               |
| AC-BIL-08-09 | A payer and a submit error                                                  | They ask for a refund           | No request is created and ERR-05 shows                                                                      | FR-BIL-08-10               |
| AC-BIL-08-10 | A household that bought the Household plan on January 15 and did not cancel | It is February 15               | The payer is charged the monthly price again                                                                | FR-BIL-08-11               |

### 6.9 BIL-09 Military family program (Phase 3)

**US-BIL-09-01.** As a member of a military family, I want to use the military family program, so that I get the benefit it offers.

| ID           | Requirement                                                                                                                                                                        | Priority | Source                      |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------------------|
| FR-BIL-09-01 | The system should let an active-duty member or a veteran apply for the military family program. The parent uploads a document that shows the service, and support staff review it. | Should   | BIL-09; decision Q-11       |
| FR-BIL-09-02 | The system should show the status of an application as Submitted, In review, Approved or Declined.                                                                                 | Should   | BA proposal                 |
| FR-BIL-09-03 | When an application is approved, the system should give the household a discount on the Household plan. The Manager sets the size of the discount before Phase 3.                  | Should   | BIL-09; decision Q-11       |
| FR-BIL-09-04 | If an application cannot be submitted, the system should show ERR-05 and should not save it.                                                                                       | Should   | Common BRD 5 (unhappy path) |
| FR-BIL-09-05 | The system should write an audit log entry for every decision on an application.                                                                                                   | Should   | NFR-04                      |

Decision Q-11 is in section 15. OurFamilyWizard and AppClose list a military discount or program. AppClose lists discounts for active military and veterans.

| ID           | Given                                    | When                                       | Then                                                                                              | Covers                     |
|--------------|------------------------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------|----------------------------|
| AC-BIL-09-01 | A signed-in parent who is a veteran      | They submit an application with a document | The application has the status Submitted and MSGT-02 shows                                        | FR-BIL-09-01, FR-BIL-09-02 |
| AC-BIL-09-02 | An application with the status In review | Support staff approves it                  | The status is Approved, the household has the discount set by the Manager, and the parent is told | FR-BIL-09-02, FR-BIL-09-03 |
| AC-BIL-09-03 | An application with the status In review | Support staff declines it                  | The status is Declined                                                                            | FR-BIL-09-02               |
| AC-BIL-09-04 | A signed-in parent and a submit error    | They submit an application                 | Nothing is saved and ERR-05 shows                                                                 | FR-BIL-09-04               |
| AC-BIL-09-05 | An application                           | A decision is made                         | One audit log entry exists with the actor, the time in UTC and the result                         | FR-BIL-09-05               |

## 7. Business rules

No module-only business rule is proposed. This module applies three shared rules from Common BRD section 9. They are not copied here.

| Rule  | What it covers in this module                                                                 | Applied in                                 |
|-------|-----------------------------------------------------------------------------------------------|--------------------------------------------|
| BR-03 | No billing until the co-parent is linked or Solo Mode is chosen                               | FR-BIL-03-01, FR-BIL-03-04                 |
| BR-04 | One parent can pay for the household, and the free core plan stays free for both parents      | FR-BIL-01-02, FR-BIL-02-02                 |
| BR-05 | Data export is never behind a paywall, and tone, safety and reporting tools are in every plan | FR-BIL-02-05, FR-BIL-04-01 to FR-BIL-04-05 |

## 8. Data

**8.1 Shared entities used.** These are defined in Common BRD section 8 and are not copied here.

| Entity          | Fields used                                                     | Common BRD |
|-----------------|-----------------------------------------------------------------|------------|
| Household       | plan (Free core, Household), payer_user_id, mode (Linked, Solo) | 8.2        |
| User            | user_id, role                                                   | 8.1        |
| Audit log entry | actor, action, object, result, time                             | 8.5        |

**8.2 New entities (proposed).** The sources name none of these fields. They are a BA proposal.

**Purchase**

| Field                 | Type              | Required | Notes                                                                            |
|-----------------------|-------------------|----------|----------------------------------------------------------------------------------|
| purchase_id           | Unique ID         | Yes      | System generated                                                                 |
| household_id          | Link to Household | Yes      |                                                                                  |
| payer_user_id         | Link to User      | Yes      | The parent who paid                                                              |
| plan                  | Choice            | Yes      | Household                                                                        |
| amount_shown          | Amount            | Yes      | The full price the payer saw, in US dollars, with fees and taxes (decision Q-04) |
| purchased_at          | Date and time     | Yes      | UTC                                                                              |
| paid_until            | Date and time     | Yes      | UTC. The end of the paid month.                                                  |
| cancel_requested_at   | Date and time     | No       | UTC. Set when the payer cancels.                                                 |
| grace_ends_at         | Date and time     | No       | UTC. Set when a renewal fails, 7 days later.                                     |
| refund_window_ends_at | Date and time     | Yes      | UTC. 14 days after purchased_at.                                                 |
| status                | Choice            | Yes      | Active, Ended, Refunded                                                          |

**Trial**

| Field        | Type              | Required | Notes                                          |
|--------------|-------------------|----------|------------------------------------------------|
| trial_id     | Unique ID         | Yes      | System generated                               |
| household_id | Link to Household | Yes      |                                                |
| started_at   | Date and time     | Yes      | UTC                                            |
| ends_at      | Date and time     | Yes      | UTC. 14 days after started_at (decision Q-10). |

**Fee-waiver request**

| Field                | Type              | Required | Notes                                                        |
|----------------------|-------------------|----------|--------------------------------------------------------------|
| waiver_id            | Unique ID         | Yes      | System generated                                             |
| household_id         | Link to Household | Yes      |                                                              |
| requested_by_user_id | Link to User      | Yes      | The parent who applied                                       |
| basis                | Choice            | Yes      | Court referral, Child support office referral, Safety access |
| referral_reference   | Text              | No       | The reference given for a referral                           |
| status               | Choice            | Yes      | Submitted, In review, Approved, Declined                     |
| submitted_at         | Date and time     | Yes      | UTC                                                          |
| decided_at           | Date and time     | No       | UTC                                                          |
| decided_by_user_id   | Link to User      | No       | The support staff member who decided                         |
| access_until         | Date and time     | No       | UTC. 12 months after the access starts.                      |

**Refund request**

| Field                | Type             | Required | Notes                                                             |
|----------------------|------------------|----------|-------------------------------------------------------------------|
| refund_id            | Unique ID        | Yes      | System generated                                                  |
| purchase_id          | Link to Purchase | Yes      |                                                                   |
| requested_by_user_id | Link to User     | Yes      | The payer                                                         |
| status               | Choice           | Yes      | Requested, Approved, Declined                                     |
| requested_at         | Date and time    | Yes      | UTC                                                               |
| decided_at           | Date and time    | No       | UTC                                                               |
| decided_by_user_id   | Link to User     | No       | The support staff member who decided                              |
| reason               | Text             | No       | Saved when support staff approve a refund after the refund window |

These entities are used in this module and by support staff who handle requests. If another module uses them, raise a change request to add them to Common BRD section 8 (Common BRD section 13).

## 9. Screens

Each screen needs the four designed states: empty, loading, error and success (Common BRD 11.1). Wireframe links and button labels are added when the wireframes are agreed.

| ID     | Screen                                       | Feature                | Phase                                            | Wireframe |
|--------|----------------------------------------------|------------------------|--------------------------------------------------|-----------|
| SCR-01 | Plans and prices                             | BIL-01, BIL-02, BIL-07 | MVP (web)                                        | \[link\]  |
| SCR-02 | Buy the Household plan                       | BIL-01, BIL-03, BIL-08 | MVP (web)                                        | \[link\]  |
| SCR-03 | Plan and payer status                        | BIL-01                 | MVP (web)                                        | \[link\]  |
| SCR-04 | Fee-waiver request                           | BIL-05                 | Phase 2 (web)                                    | \[link\]  |
| SCR-05 | Fee-waiver status                            | BIL-05                 | Phase 2 (web)                                    | \[link\]  |
| SCR-06 | Free trial                                   | BIL-06                 | Phase 2 (web)                                    | \[link\]  |
| SCR-07 | Refund request and refund window             | BIL-08                 | MVP (web)                                        | \[link\]  |
| SCR-08 | Military family program application          | BIL-09                 | Phase 3 (later)                                  | \[link\]  |
| SCR-09 | Support review of waiver and refund requests | BIL-05, BIL-08         | MVP (web) for refunds, Phase 2 (web) for waivers | \[link\]  |
| SCR-10 | Cancel plan                                  | BIL-01                 | MVP (web)                                        | \[link\]  |

## 10. Messages and errors

Wording is a draft. It is written for English first, and final wording is approved before build (Common BRD 11.2). Spanish text is added when the language feature is built.

**Errors**

| ID     | When it shows                                                          | Text                                                                                         | Used by                                  |
|--------|------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|------------------------------------------|
| ERR-01 | A parent tries to buy before the household is Linked or in Solo Mode   | You can buy the Household plan after your co-parent joins, or after you choose Solo Mode.    | FR-BIL-03-04                             |
| ERR-02 | The household mode cannot be read                                      | We could not check your household. You were not charged. Please try again.                   | FR-BIL-03-05                             |
| ERR-03 | A payment is not completed                                             | Your payment did not go through. Your plan did not change. Please try again.                 | FR-BIL-01-06                             |
| ERR-04 | A refund is asked for after the refund window                          | The refund window for this purchase ended on \[date\]. Contact support if you need help.     | FR-BIL-08-08                             |
| ERR-05 | A request cannot be submitted                                          | We could not send your request. Please try again.                                            | FR-BIL-05-10, FR-BIL-08-10, FR-BIL-09-03 |
| ERR-06 | A household is over the Free storage limit and a parent uploads a file | You are over the 2 GB limit of the Free core plan. You can still view and export your files. | FR-BIL-02-06                             |
| ERR-07 | A household asks for a second free trial                               | Your household already used its free trial.                                                  | FR-BIL-06-03                             |

**Messages**

| ID      | When it shows                                          | Text                                                                                                                  | Feature        |
|---------|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|----------------|
| MSGT-01 | A purchase is completed                                | You now have the Household plan.                                                                                      | BIL-01         |
| MSGT-02 | A waiver request or a program application is submitted | We received your request. We will tell you when there is a decision.                                                  | BIL-05, BIL-09 |
| MSGT-03 | A waiver is approved                                   | Your fee waiver was approved.                                                                                         | BIL-05         |
| MSGT-04 | A waiver is declined                                   | Your fee waiver was not approved.                                                                                     | BIL-05         |
| MSGT-05 | A trial starts                                         | Your free trial started. It ends on \[date\].                                                                         | BIL-06         |
| MSGT-06 | A trial ends without a purchase                        | Your free trial ended. Your household is on the Free core plan.                                                       | BIL-06         |
| MSGT-07 | A refund is requested                                  | We received your refund request.                                                                                      | BIL-08         |
| MSGT-08 | A refund is approved                                   | Your refund was approved.                                                                                             | BIL-08         |
| MSGT-09 | A refund is declined                                   | Your refund was not approved.                                                                                         | BIL-08         |
| MSGT-10 | The Household plan ends                                | Your Household plan ended. Your records are still here and you can export them.                                       | BIL-02         |
| MSGT-11 | A renewal payment fails                                | Your renewal payment did not go through. Your Household plan stays active until \[date\]. Please update your payment. | BIL-01         |
| MSGT-12 | A payer cancels the Household plan                     | Your Household plan will end on \[date\].                                                                             | BIL-01         |

## 11. Interfaces

All interfaces except INT-05 are with other modules of the app.

| ID     | With                               | What passes                                                                                                                                                                                                            | Features                       | Phase                                            | Source                                                                            |
|--------|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------|--------------------------------------------------|-----------------------------------------------------------------------------------|
| INT-01 | Accounts and Onboarding            | The household mode (Linked or Solo) and the link status come in.                                                                                                                                                       | BIL-03                         | MVP (web)                                        | Scope document 7.2; Accounts BRD FR-ACC-03-05                                     |
| INT-02 | Support                            | Waiver and refund requests go to support staff and their decisions come back.                                                                                                                                          | BIL-05, BIL-08                 | MVP (web) for refunds, Phase 2 (web) for waivers | Scope document 7.2                                                                |
| INT-03 | Notifications                      | Decision, renewal, cancellation and trial messages go out through the send service (Notifications NTF-06).                                                                                                             | BIL-01, BIL-05, BIL-06, BIL-08 | MVP (web)                                        | Notifications BRD NTF-06                                                          |
| INT-04 | Safety and Privacy                 | Free access for survivors of abuse.                                                                                                                                                                                    | BIL-05                         | Phase 2 (web)                                    | Scope document 7.2                                                                |
| INT-05 | Payment provider for plan payments | Payments, renewals and refunds go through it. Finance, legal and IT choose the provider before the build (decision Q-03). The provider holds card data, takes card payments, makes refunds and reports payment status. | BIL-01, BIL-08                 | MVP (web)                                        | Scope document 11 lists a payment provider for money transfer only; decision Q-03 |

## 12. Dependencies and assumptions

**12.1 This module needs** (Scope document 7.2): Accounts and Onboarding (link status), Support (waiver and refund handling), and Safety and Privacy (free access for survivors).

**12.2 Modules that need this module** (Common BRD section 4).

| Module                  | What it needs from Billing and Plans |
|-------------------------|--------------------------------------|
| Accounts and Onboarding | No charge until linked               |
| Safety and Privacy      | Free access for survivors            |
| Support                 | Waivers and refunds                  |

The Common BRD build order places Billing after Notifications and Messaging and before Safety.

**12.3 Assumptions**

- The first release is a web app. Mobile follows (Scope document 4.4).

- Module names are working names (Scope document 4.4).

- The phase for each feature is a proposal, not a commitment (Scope document 4.4).

- Access levels for roles are proposals (Scope document 5).

- Screens and messages are in English in the MVP (Accounts BRD, decision Q-01).

## 13. Non-functional requirements

These are shared requirements from Common BRD section 10. No module-only requirement is proposed. The payment provider holds card details and the app does not (FR-BIL-01-11, decision Q-03).

| ID     | Requirement                                                                                                         | Where it applies here                                                | Status   |
|--------|---------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|----------|
| NFR-01 | Two-factor sign-in for every account (100 percent of accounts)                                                      | A payer signs in with two-factor sign-in before any purchase         | Proposed |
| NFR-02 | Encryption in transit and at rest                                                                                   | Plan, purchase, waiver and refund data                               | Proposed |
| NFR-03 | Role-based access on every request                                                                                  | FR-BIL-05-05, FR-BIL-05-09, FR-BIL-08-06                             | Proposed |
| NFR-04 | Changes are logged with actor, time and result                                                                      | FR-BIL-01-07, FR-BIL-05-11, FR-BIL-06-05, FR-BIL-08-09, FR-BIL-09-04 | Proposed |
| NFR-06 | Collect only the data that is needed                                                                                | Fee-waiver requests and program applications                         | Proposed |
| NFR-09 | Plain language on every screen. The standard is to be chosen. Scope document section 10 proposes WCAG 2.2 level AA. | All screens                                                          | Open     |
| NFR-11 | English only in the MVP. Spanish in Phase 2 (Accounts BRD, decision Q-01).                                          | All screens and messages                                             | Proposed |

## 14. Risks

| ID     | Risk                                                     | Why it matters                                                                                                                                                                                     | Response                                                                                                                                    | Source                                               |
|--------|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| RSK-01 | The free core plan is hard to fund                       | Free plans have been ending in other apps (P02).                                                                                                                                                   | The paid extras are set in decision Q-01. The Manager confirms them before launch.                                                          | Scope document 12                                    |
| RSK-02 | Sensitive data is exposed                                | Plan, payment and waiver data sit next to family data. A waiver request can hold sensitive facts, for example a survivor's request.                                                                | Two-factor sign-in, encryption, access logs and a security review. Support staff cannot read parent messages.                               | Scope document 12; Common BRD 7.1                    |
| RSK-03 | The Household plan has few paid extras at the MVP launch | At the MVP only more storage is a paid extra. Calls, AI rewrite, calendar sync, parenting-time reports and professional access ship in Phase 2 or later. A parent may not see enough value to pay. | BIL-08 moves to the MVP, so the checkout ships with the Household plan (decision Q-02). Test the launch price with parents (decision Q-04). | BA review of the feature list                        |
| RSK-04 | Store purchases can block refunds                        | One OurFamilyWizard reviewer could not get a refund on a Google Play purchase (a user report that is not verified).                                                                                | Sell on the web first. Decide the rules for store purchases before the Mobile phase.                                                        | Pain Point workbook, P03                             |
| RSK-05 | The comparison evidence for BIL-05 and BIL-06 is missing | The updated Feature Comparison workbook has 70 features and no fee-waiver row and no free-trial row. P04 cites a fee-waiver row, and the Scope document counts 72 features.                        | Re-check the type of BIL-05 and BIL-06 when the rows are restored or the Scope document is corrected.                                       | Feature Comparison workbook; P04; Scope document 1.2 |
| RSK-06 | Refund, trial and billing terms are a legal matter       | Terms of use are in the scope of the legal review (Scope document decision 7).                                                                                                                     | Legal reviews these terms before launch (decision Q-14, CR-03).                                                                             | Scope document, decision 7                           |
| RSK-07 | The values recommended by the BA are not confirmed       | The refund window, the trial length, the grace period, the waiver length and the decision time come from the BA, not from the sources. The comparison workbook has no rows for them.               | The Manager confirms them before launch (section 15).                                                                                       | Decisions Q-06 to Q-10                               |

## 15. Decisions and open questions

**15.1 Decisions recorded on October 10, 2026.** Every question in this BRD has an answer. Where the Scope document gave a recommended answer (decisions 9 and 24), it is used. For the other questions the BA recommends an answer and the Manager confirms it. No question is open. The readiness check lists the answers that still need the confirmation of the Manager.

| Q    | Decision                                                                                                                                                                                                       | How it was decided                                                                                                               | Values and detail                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Confirm with              |
|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| Q-01 | Free core plan and paid extras.                                                                                                                                                                                | Scope decision 9 (the recommended answer is used).                                                                               | Free for both parents: messaging, calendar, swap requests, expenses, receipts, journal, records, exports, tone and safety tools, Solo Mode and Safety Mode. The Household plan pays for calls with recording, AI rewrite, calendar sync, parenting-time reports, professional access, more storage and notarized records. Fee waivers for survivors and for court or agency referrals. The agency view stays free in the pilot, and its place is decided once running costs are known. | Manager, business         |
| Q-02 | BIL-08 moves to the MVP and becomes Must-have, so a parent can buy the Household plan at launch.                                                                                                               | BA recommendation. BIL-01 and BIL-03 cannot be used or tested without a checkout, and P03 needs the refund terms before payment. | CR-01. At the MVP the main paid extra is more storage.                                                                                                                                                                                                                                                                                                                                                                                                                                 | Manager                   |
| Q-03 | Finance, legal and IT choose the payment provider before the build.                                                                                                                                            | BA recommendation.                                                                                                               | The provider holds card data, takes card payments, makes refunds to the original payment method and reports payment status. The app never stores card numbers.                                                                                                                                                                                                                                                                                                                         | Manager, finance, legal   |
| Q-04 | One plan, one monthly price in US dollars. The amount is a business setting.                                                                                                                                   | Scope decision 9 (test the price with parents). Market examples run from about 7 to 20 dollars a month.                          | The Manager sets the launch price before the MVP launch. Fees and taxes show before the confirm button.                                                                                                                                                                                                                                                                                                                                                                                | Manager, business         |
| Q-05 | The tools in every plan: tone check (MSG-04), incoming message shield (MSG-06), Safety Mode (SAF-01), notification and sensitive-image controls (SAF-02), AI privacy controls (SAF-03) and the reporting tool. | BA recommendation from BR-05 and Scope document 12.                                                                              | The reporting tool lets a parent report a harassing message or behavior. The Messaging BRD names it.                                                                                                                                                                                                                                                                                                                                                                                   | Manager                   |
| Q-06 | Plan end and failed payment.                                                                                                                                                                                   | BA recommendation.                                                                                                               | A cancelled plan runs to the end of the paid month. A failed renewal keeps the plan for 7 days, then the household moves to Free core. The other parent can buy before the paid period ends. Over the Free storage limit, files stay viewable and exportable and new uploads stop (Scope decision 24).                                                                                                                                                                                 | Manager, legal            |
| Q-07 | Both parents see the plan, its status and the name of the payer. Only the payer sees the amount, the receipts and the payment method.                                                                          | BA recommendation.                                                                                                               | None                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Manager, legal            |
| Q-08 | Refund window.                                                                                                                                                                                                 | BA recommendation.                                                                                                               | 14 days from the purchase date. Support staff decide. The money returns to the original payment method. Support may approve a refund after the window and saves the reason. The window starts at purchase, because BR-03 allows a purchase only after the household is Linked or in Solo Mode. Store purchases are decided before the Mobile phase.                                                                                                                                    | Manager, legal            |
| Q-09 | Fee waiver.                                                                                                                                                                                                    | BA recommendation.                                                                                                               | Two bases: a court or child support office referral (the parent gives the reference or the letter and support checks it), and a safety request (a short statement, no proof, access starts at once and support reviews later). An approved waiver gives the Household extras for 12 months and the parent can ask again. Support decides within 3 business days. The basis Safety access shows only to support staff and the parent.                                                   | Manager, legal, advocates |
| Q-10 | Free trial.                                                                                                                                                                                                    | BA recommendation.                                                                                                               | 14 days, one trial for each household, and no charge at the end unless the payer confirmed a purchase.                                                                                                                                                                                                                                                                                                                                                                                 | Manager, business         |
| Q-11 | Military family program (Phase 3).                                                                                                                                                                             | BA recommendation. AppClose lists discounts for active military and veterans.                                                    | Open to active-duty members and veterans. Proof is a document that support staff review. The benefit is a discount on the Household plan. The Manager sets the size before Phase 3.                                                                                                                                                                                                                                                                                                    | Manager, business         |
| Q-12 | Parents and co-parents may create their own waiver, refund and program requests.                                                                                                                               | BA recommendation.                                                                                                               | CR-02 changes Common BRD 7.2.                                                                                                                                                                                                                                                                                                                                                                                                                                                          | BA lead                   |
| Q-13 | Plan limits.                                                                                                                                                                                                   | Scope decision 24 (the recommended answer is used).                                                                              | Free: 2 GB per household. Household: 50 GB. A warning at 80 percent. Over the limit, a parent can still view and export. Calls and payments have no cap in the Household plan. A fair-use limit can be added by change request if misuse appears.                                                                                                                                                                                                                                      | Manager, business         |
| Q-14 | Legal reviews the billing, refund, trial and fee-waiver terms before launch.                                                                                                                                   | BA recommendation. Terms of use are already in the legal review (Scope decision 7).                                              | CR-03                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Legal                     |
| Q-15 | Each module BRD starts its SCR, ERR, MSGT and INT numbers at 01. A reference from another BRD names the module.                                                                                                | The same rule as in the Notifications BRD (decision Q-14 there).                                                                 | The Accounts BRD (Q-18) still shows this question as open.                                                                                                                                                                                                                                                                                                                                                                                                                             | BA lead                   |

**15.2 Change requests to other documents.** Common BRD section 13 asks for the item, the change and the reason. If CR-01 is approved, the feature count and the phase counts in the Scope document change.

| ID    | Document and item                        | Change                                                                                     | Reason        |
|-------|------------------------------------------|--------------------------------------------------------------------------------------------|---------------|
| CR-01 | Scope and Modules Document, feature list | Move BIL-08 from Phase 2 to the MVP and change its type to Must-have.                      | Decision Q-02 |
| CR-02 | Common BRD 7.2, row Waivers and refunds  | Change the rights of the Parent and the Co-parent to CR (own).                             | Decision Q-12 |
| CR-03 | Scope and Modules Document, decision 7   | Add the billing terms, refund terms, trial terms and fee-waiver rules to the legal review. | Decision Q-14 |

## 16. Traceability

Test cases are written by QA from the acceptance criteria, using the format TC-BIL-01-01.

| Feature | Pain point  | Business requirement | User story   | Functional requirements | Acceptance criteria |
|---------|-------------|----------------------|--------------|-------------------------|---------------------|
| BIL-01  | P01         | BREQ-01              | US-BIL-01-01 | FR-BIL-01-01 to 11      | AC-BIL-01-01 to 10  |
| BIL-02  | P02         | BREQ-02              | US-BIL-02-01 | FR-BIL-02-01 to 06      | AC-BIL-02-01 to 05  |
| BIL-03  | P01         | BREQ-03              | US-BIL-03-01 | FR-BIL-03-01 to 05      | AC-BIL-03-01 to 05  |
| BIL-04  | P13         | BREQ-04              | US-BIL-04-01 | FR-BIL-04-01 to 06      | AC-BIL-04-01 to 06  |
| BIL-05  | P04         | BREQ-06              | US-BIL-05-01 | FR-BIL-05-01 to 14      | AC-BIL-05-01 to 11  |
| BIL-06  | None linked | BREQ-07              | US-BIL-06-01 | FR-BIL-06-01 to 06      | AC-BIL-06-01 to 06  |
| BIL-07  | P24         | BREQ-05              | US-BIL-07-01 | FR-BIL-07-01 to 04      | AC-BIL-07-01 to 04  |
| BIL-08  | P03         | BREQ-08              | US-BIL-08-01 | FR-BIL-08-01 to 11      | AC-BIL-08-01 to 10  |
| BIL-09  | None linked | BREQ-09              | US-BIL-09-01 | FR-BIL-09-01 to 05      | AC-BIL-09-01 to 05  |

## 17. Readiness check

Checks come from the definition of ready in Common BRD section 12.

| Check                                                                                                 | Status                                                                                                         |
|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| The module BRD is approved                                                                            | No. Version v1.0 is final text and waits for the confirmation of the Manager and the sign-off of the approver. |
| Every requirement has an ID, a source, a priority and acceptance criteria                             | Yes. Confirm in peer BA and QA review.                                                                         |
| No TBC remains in a Must requirement                                                                  | Yes. No question is open. The launch price is a business setting (Q-04).                                       |
| The answers that are BA recommendations are confirmed by the Manager (Q-02, Q-03, Q-05 to Q-12, Q-14) | No.                                                                                                            |
| Advocates review the safety request in the fee-waiver flow                                            | No. It is part of the Safety Mode review.                                                                      |
| Fields, statuses, messages and errors are written out                                                 | Yes. The entity fields in section 8.2 are a BA proposal.                                                       |
| The wireframe is linked and agreed                                                                    | No. Links in section 9 are placeholders.                                                                       |
| Change requests CR-01 to CR-03 are approved                                                           | No.                                                                                                            |

Review steps (Common BRD 13): author self-check, peer BA review, QA review for testability, developer or technical review, approver sign-off.
