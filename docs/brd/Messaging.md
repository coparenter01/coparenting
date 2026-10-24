# Module BRD: Messaging (MSG)

ParentPath \| Module BRD \| v1.0

This BRD follows the Common BRD. Shared roles, data entities, shared rules, non-functional requirements and standards are not repeated here. This document points to them by ID. This version has no open question. It is approved when the approver signs it off. Priority uses Must for Must-have features and Should for Good-to-have features. This module has no Unique features. Requirements use shall for Must and should for Should. Question numbers (Q) and change request numbers (CR) are local to this BRD. SCR, ERR, MSGT and INT numbers also start at 01 in each module BRD. A reference from another BRD names the module, for example Messaging ERR-01 (decision Q-25).

## 1. Document control

| Field            | Detail                                                                                                                                                                                                                                                                                                                                                                                                                           |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Project          | ParentPath                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Document         | Module BRD: Messaging                                                                                                                                                                                                                                                                                                                                                                                                            |
| Module prefix    | MSG                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Version          | v1.0                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Status           | Final. Decisions of October 12, 2026 recorded as BA recommendations. Manager confirmation and approver sign-off pending.                                                                                                                                                                                                                                                                                                         |
| Author           | \[Name, role\]                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Reviewers        | \[Names\]                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Approver         | \[Name\]                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Date             | October 12, 2026                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Source documents | Common BRD (Sample v1.0), Scope and Modules Document v1.0 (Draft), Pain Point workbook (data as of September 30, 2026), Feature Comparison workbook (Updated), Accounts and Onboarding BRD v0.3, Billing and Plans BRD v1.0, Notifications BRD v1.0, Calendar and Parenting Time BRD v1.0, and the public help pages and store listings of OurFamilyWizard, TalkingParents, BestInterest and AppClose (read on October 12, 2026) |

**Change log**

| Version | Date             | Author   | What changed                                                                               | Reason |
|---------|------------------|----------|--------------------------------------------------------------------------------------------|--------|
| v1.0    | October 12, 2026 | \[Name\] | First version. Recorded the decisions for Q-01 to Q-25. Added the proposed feature MSG-14. | New    |

## 2. Purpose and scope

**2.1 Purpose.** This module is the main daily channel between parents. It has to be calm, easy to use and reliable as a record.

**2.2 Objectives this module supports.** Objective IDs come from Common BRD section 2.3.

| ID     | How this module supports it                                                                                                        |
|--------|------------------------------------------------------------------------------------------------------------------------------------|
| OBJ-01 | Messages that cannot be changed, with sent and first-read times, are the base of the court-ready record (MSG-02, MSG-03).          |
| OBJ-03 | Fixes the High-rated pain points P12 and P16, and with Billing P13, in the first release (MSG-02, MSG-04, MSG-06).                 |
| OBJ-05 | AI is opt-in and is explained in plain words, and the shield and the report tool protect parents at risk (MSG-04, MSG-06, MSG-14). |

**2.3 In scope.** The thirteen features MSG-01 to MSG-13 listed in section 5, and the proposed feature MSG-14. MSG-14 is the report tool that the Billing BRD asks this BRD to define (CR-01 in section 15).

**2.4 Out of scope for this BRD.** These items belong to another module or to a later decision.

| Item                                                                                    | Where it belongs                                                                           |
|-----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Alerts for new messages, the unread steps to SMS and email, and the status of a message | Notifications (NTF-01, NTF-02). This module shows the status on the message.               |
| Sending a text or an email to a co-parent who is not on the app                         | Accounts and Onboarding (ACC-04) and Notifications (NTF-06). This module shows the thread. |
| The AI privacy screen, the preview and sensitive-image controls, and Safety Mode        | Safety and Privacy (SAF-01, SAF-02, SAF-03).                                               |
| The export format of messages                                                           | Records and Court (REC).                                                                   |
| Read-only access for professionals                                                      | Professionals and Access (PRO-01, Phase 2).                                                |
| Voice and video calls                                                                   | Calling (CLL).                                                                             |
| Accounts of a Third party or a Child                                                    | Accounts and Onboarding (ACC-07, Phase 2).                                                 |
| Plan rules for paid extras                                                              | Billing and Plans (Billing BRD, decision Q-01).                                            |
| Rewriting an incoming message in a neutral voice                                        | Not in this BRD. The shield holds a message and labels it. It does not rewrite it.         |
| Legal advice                                                                            | Out of scope (Scope document 4.2).                                                         |

**2.5 Release phases of this module.** MVP (web): MSG-01, MSG-02, MSG-03, MSG-04, MSG-06 and MSG-14. Phase 2 (web): MSG-05, MSG-07, MSG-08 and MSG-09. Phase 3 (later): MSG-10, MSG-11, MSG-12 and MSG-13. The phase of each feature is a proposal (Scope document 4.4).

## 3. Users and roles

Roles are defined in Common BRD 7.1 and the shared permission matrix is in Common BRD 7.2. The table shows what each role does in this module.

| Role                            | What they do in this module                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Parent                          | Writes and reads messages, uses the tone check and the shield, reports a message and keeps drafts.                   |
| Co-parent                       | The same as the Parent, once linked.                                                                                 |
| Co-parent who is not on the app | Gets texts and emails and answers by text or email (ACC-04). Has no account.                                         |
| Third party                     | Reads and answers in the threads the parents add them to (Phase 3, ACC-07).                                          |
| Child                           | Gets only the threads the parents set (Phase 3, ACC-07).                                                             |
| Professional                    | Reads the threads a parent shares (PRO-01, Phase 2). In Phase 3 a mediator can answer in a mediation thread (CR-03). |
| Support staff                   | Cannot read parent messages (Common BRD 7.1).                                                                        |
| Platform admin                  | Runs the system. Cannot edit or delete a message.                                                                    |

Permissions for module data: Common BRD 7.2 gives the Parent and the Co-parent CR on messages, the Third party R (as set) and the Professional R (shared only). It gives nobody the right to update or delete, which matches BR-08. A Third party who answers in a thread needs CR instead of R, so the matrix changes for that case (CR-03).

## 4. Business requirements

| ID      | Business requirement                                                                            | Features | Source                                         | Priority | Phase           |
|---------|-------------------------------------------------------------------------------------------------|----------|------------------------------------------------|----------|-----------------|
| BREQ-01 | Parents message each other inside the app, and all talk about the children is in one place.     | MSG-01   | Scope document 7.4                             | Must     | MVP (web)       |
| BREQ-02 | A sent message cannot be edited or deleted.                                                     | MSG-02   | BR-08; P16                                     | Must     | MVP (web)       |
| BREQ-03 | Every message has a sent time and a first-read time.                                            | MSG-03   | Scope document 7.4; BR-07                      | Must     | MVP (web)       |
| BREQ-04 | A sender gets private feedback on the tone of a message before it is sent.                      | MSG-04   | BR-09; P12                                     | Must     | MVP (web)       |
| BREQ-05 | A sender can get an AI suggestion for a calmer message, if the sender chooses it.               | MSG-05   | BR-11; P15                                     | Should   | Phase 2 (web)   |
| BREQ-06 | A hostile incoming message is held back, the reason is shown and the original opens in one tap. | MSG-06   | BR-10; P12                                     | Must     | MVP (web)       |
| BREQ-07 | A parent can search messages by keyword or date.                                                | MSG-07   | Scope document 7.4                             | Should   | Phase 2 (web)   |
| BREQ-08 | A parent can sort messages into folders and topics.                                             | MSG-08   | Scope document 7.4                             | Should   | Phase 2 (web)   |
| BREQ-09 | A parent can attach files and pictures to a message.                                            | MSG-09   | Scope document 7.4                             | Should   | Phase 2 (web)   |
| BREQ-10 | A parent can message a Third party or a Child, and can start a group thread.                    | MSG-10   | Scope document 7.4                             | Should   | Phase 3 (later) |
| BREQ-11 | A parent can ask an AI coach for help with co-parenting questions.                              | MSG-11   | Scope document 7.4                             | Should   | Phase 3 (later) |
| BREQ-12 | A parent can ask for mediation by a licensed mediator inside the app.                           | MSG-12   | Scope document 7.4; Scope document decision 27 | Should   | Phase 3 (later) |
| BREQ-13 | An urgent message is marked, and the recipient is alerted at once.                              | MSG-13   | Scope document 7.4; Scope document decision 22 | Should   | Phase 3 (later) |
| BREQ-14 | A parent can report a harassing or threatening message, on every plan.                          | MSG-14   | BR-05; Scope document 12                       | Must     | MVP (web)       |

## 5. Feature summary

Type rules (tests 1 to 3) are in Scope document 1.3. App counts are out of the 10 co-parenting apps in the Feature Comparison workbook (Cozi is not counted).

| ID     | Feature                                               | Type         | Priority | Phase           | Pain point  | Why this type                                                                                                                                |
|--------|-------------------------------------------------------|--------------|----------|-----------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| MSG-01 | Secure in-app messaging                               | Must-have    | Must     | MVP (web)       | P11         | 10 of 10 apps list it (test 1).                                                                                                              |
| MSG-02 | Messages cannot be edited or deleted                  | Must-have    | Must     | MVP (web)       | P16         | Core fix for High pain point P16 (test 2). No comparison row.                                                                                |
| MSG-03 | Time-stamped messages                                 | Must-have    | Must     | MVP (web)       | P16         | 5 of 10 apps list it (OurFamilyWizard, TalkingParents, AppClose, coParenter, BestInterest) (test 1). Custody X Change lists it in part.      |
| MSG-04 | Tone checks on outgoing messages                      | Must-have    | Must     | MVP (web)       | P12, P13    | 6 of 10 apps list it (OurFamilyWizard, TalkingParents, AppClose, coParenter, BestInterest, Custody X Change) (test 1).                       |
| MSG-05 | AI rewrite suggestions for outgoing messages (opt-in) | Good-to-have | Should   | Phase 2 (web)   | P15         | 4 of 10 apps list it (OurFamilyWizard, TalkingParents, AppClose, BestInterest), one short of test 1.                                         |
| MSG-06 | Incoming message shield with view-original            | Must-have    | Must     | MVP (web)       | P12, P13    | Core fix for High pain point P12 (test 2). 2 of 10 apps list it (coParenter, BestInterest).                                                  |
| MSG-07 | Search messages by keyword or date                    | Good-to-have | Should   | Phase 2 (web)   | None linked | 3 of 10 apps list it (OurFamilyWizard, AppClose, BestInterest). TalkingParents and coParenter list it in part.                               |
| MSG-08 | Message folders or topics                             | Good-to-have | Should   | Phase 2 (web)   | None linked | 4 of 10 apps list it (OurFamilyWizard, TalkingParents, coParenter, BestInterest).                                                            |
| MSG-09 | Attachments and files in messages                     | Good-to-have | Should   | Phase 2 (web)   | None linked | 4 of 10 apps list it (OurFamilyWizard, TalkingParents, AppClose, SupportPay with WeParent). BestInterest lists it in part.                   |
| MSG-10 | Group chat and messages to third parties              | Good-to-have | Should   | Phase 3 (later) | None linked | 3 of 10 apps list it (OurFamilyWizard, AppClose, SupportPay with WeParent).                                                                  |
| MSG-11 | AI co-parenting coach                                 | Good-to-have | Should   | Phase 3 (later) | P15         | 2 of 10 apps list it (BestInterest, Kidtime).                                                                                                |
| MSG-12 | Human mediation or counseling in the app              | Good-to-have | Should   | Phase 3 (later) | None linked | 1 of 10 apps lists it (coParenter).                                                                                                          |
| MSG-13 | Urgent-message detection                              | Good-to-have | Should   | Phase 3 (later) | None linked | 1 of 10 apps lists it (BestInterest). BestInterest says its AI can misclassify a message.                                                    |
| MSG-14 | Report a message (proposed)                           | Proposed     | Must     | MVP (web)       | None linked | Proposed addition (CR-01). BR-05 and Scope document 12 put report tools in every plan, and the Billing BRD asks this BRD to define the tool. |

## 6. Functional requirements, user stories and acceptance criteria

Field rules for the User and Household entities are in Common BRD 8.1 and 8.2. Error and message IDs are in section 10. The decisions that shaped these requirements, and the pages they come from, are in section 15.

### 6.1 MSG-01 Secure in-app messaging

**US-MSG-01-01.** As a parent, I want to message my co-parent inside the app, so that all our talk about the children is in one place.

| ID           | Requirement                                                                                                                                   | Priority | Source                                                                           |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------|
| FR-MSG-01-01 | The system shall let a parent in a linked household start a thread with the co-parent by entering a subject and a message.                    | Must     | MSG-01; OurFamilyWizard (subject and message); decision Q-01                     |
| FR-MSG-01-02 | The system shall let either parent reply in a thread. A reply keeps the subject of the thread.                                                | Must     | Decision Q-01                                                                    |
| FR-MSG-01-03 | The system shall save a message as plain text of up to 10,000 characters and shall show ERR-01 for a longer one.                              | Must     | Decision Q-22                                                                    |
| FR-MSG-01-04 | The system shall let a parent save a draft, and edit or delete the draft before it is sent.                                                   | Must     | OurFamilyWizard (drafts can be edited and deleted); decision Q-02                |
| FR-MSG-01-05 | The system shall send a message only after the parent chooses Send.                                                                           | Must     | MSG-01                                                                           |
| FR-MSG-01-06 | The system shall list the threads with the latest message first, and show the messages of a thread from the oldest to the newest.             | Must     | Decision Q-01                                                                    |
| FR-MSG-01-07 | The system shall alert the recipient of each new message through the Notifications module.                                                    | Must     | Scope document 7.4 (dependency on Notifications); Notifications BRD FR-NTF-01-01 |
| FR-MSG-01-08 | The system shall not offer a way to block the co-parent. A parent who wants less contact uses the incoming message shield (MSG-06).           | Must     | Decision Q-21                                                                    |
| FR-MSG-01-09 | In Solo Mode, the system shall show in the thread the messages that the parent sends to a co-parent who is not on the app.                    | Must     | Accounts BRD FR-ACC-04-01; decision Q-15                                         |
| FR-MSG-01-10 | The system shall add a reply that arrives by text or email from a co-parent who is not on the app to the same thread, with its date and time. | Must     | Notifications BRD FR-NTF-06-04; Accounts BRD FR-ACC-04-04; decision Q-15         |
| FR-MSG-01-11 | The system shall show a thread only to the people in it. Support staff and Platform admin cannot read it.                                     | Must     | Common BRD 7.1; Common BRD 7.2                                                   |
| FR-MSG-01-12 | If a message cannot be sent, the system shall keep it as a draft and show ERR-02.                                                             | Must     | Common BRD 5 (unhappy path)                                                      |
| FR-MSG-01-13 | The system shall not send a message without a subject and shall show ERR-03.                                                                  | Must     | Decision Q-01                                                                    |

| ID           | Given                                                          | When                                                           | Then                                                                                             | Covers                                   |
|--------------|----------------------------------------------------------------|----------------------------------------------------------------|--------------------------------------------------------------------------------------------------|------------------------------------------|
| AC-MSG-01-01 | A linked household                                             | A parent enters a subject and a message and chooses Send       | A thread with the message is saved and the co-parent is alerted                                  | FR-MSG-01-01, FR-MSG-01-05, FR-MSG-01-07 |
| AC-MSG-01-02 | A thread                                                       | The co-parent replies                                          | The reply shows in the same thread with the same subject                                         | FR-MSG-01-02                             |
| AC-MSG-01-03 | A parent writing a message                                     | They enter 10,000 characters, and then 10,001 characters       | The first message is accepted and the second is not sent and ERR-01 shows                        | FR-MSG-01-03                             |
| AC-MSG-01-04 | A parent writing a message                                     | They save a draft, edit it and delete it                       | The draft is saved (MSGT-01), changed and removed, and nothing was sent                          | FR-MSG-01-04                             |
| AC-MSG-01-05 | A message that a parent has written                            | The parent has not chosen Send                                 | The co-parent receives nothing                                                                   | FR-MSG-01-05                             |
| AC-MSG-01-06 | Two threads with messages at different times                   | A parent opens the thread list and then a thread               | The thread with the latest message is first, and the messages show from the oldest to the newest | FR-MSG-01-06                             |
| AC-MSG-01-07 | A parent                                                       | They open the settings and the co-parent contact options       | No block option is offered                                                                       | FR-MSG-01-08                             |
| AC-MSG-01-08 | A household in Solo Mode                                       | The parent sends a text to a co-parent who is not on the app   | The message shows in the thread                                                                  | FR-MSG-01-09                             |
| AC-MSG-01-09 | A thread with a text sent to a co-parent who is not on the app | That person replies by text                                    | The reply shows in the same thread with its date and time                                        | FR-MSG-01-10                             |
| AC-MSG-01-10 | A thread between two parents                                   | A member of support staff or a Platform admin tries to open it | The thread does not open                                                                         | FR-MSG-01-11                             |
| AC-MSG-01-11 | A parent and a send error                                      | They choose Send                                               | The message is saved as a draft and ERR-02 shows                                                 | FR-MSG-01-12                             |
| AC-MSG-01-12 | A parent who leaves the subject empty                          | They choose Send                                               | The message is not sent and ERR-03 shows                                                         | FR-MSG-01-13                             |

### 6.2 MSG-02 Messages cannot be edited or deleted

**US-MSG-02-01.** As a parent, I want a sent message to stay exactly as it was sent, so that the record can be trusted.

| ID           | Requirement                                                                                                              | Priority | Source                                                                                               |
|--------------|--------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------------|
| FR-MSG-02-01 | The system shall not let anyone edit a sent message.                                                                     | Must     | BR-08; P16; OurFamilyWizard and TalkingParents                                                       |
| FR-MSG-02-02 | The system shall not let anyone delete or un-send a sent message, even one that the recipient has not read.              | Must     | BR-08; OurFamilyWizard                                                                               |
| FR-MSG-02-03 | The system shall let a parent send a new message to correct an earlier one. The earlier message stays.                   | Must     | Decision Q-02                                                                                        |
| FR-MSG-02-04 | The system shall not let support staff or a Platform admin edit or delete a sent message.                                | Must     | NFR-05; Common BRD 7.2                                                                               |
| FR-MSG-02-05 | When a parent closes an account, the system shall keep the sent messages of that parent in the thread for the co-parent. | Must     | TalkingParents (an account cannot be deleted once matched, so no one clears messages); decision Q-02 |
| FR-MSG-02-06 | If anyone tries to edit, delete or un-send a sent message, the system shall refuse and show ERR-04.                      | Must     | Common BRD 5 (unhappy path)                                                                          |

| ID           | Given                                          | When                                                             | Then                                                           | Covers       |
|--------------|------------------------------------------------|------------------------------------------------------------------|----------------------------------------------------------------|--------------|
| AC-MSG-02-01 | A sent message                                 | A parent looks for a way to edit it                              | No edit option is offered                                      | FR-MSG-02-01 |
| AC-MSG-02-02 | A sent message that the recipient has not read | The sender looks for a way to delete or un-send it               | No delete or un-send option is offered                         | FR-MSG-02-02 |
| AC-MSG-02-03 | A sent message with a mistake                  | The parent sends a new message that corrects it                  | Both messages show in the thread                               | FR-MSG-02-03 |
| AC-MSG-02-04 | A sent message                                 | A member of support staff or a Platform admin tries to change it | The change is not possible                                     | FR-MSG-02-04 |
| AC-MSG-02-05 | A thread with messages from Parent A           | Parent A closes the account                                      | The messages of Parent A still show in the thread for Parent B | FR-MSG-02-05 |
| AC-MSG-02-06 | A sent message                                 | A direct request tries to edit or delete it                      | The request is refused and ERR-04 shows                        | FR-MSG-02-06 |

### 6.3 MSG-03 Time-stamped messages

**US-MSG-03-01.** As a parent, I want every message to show when it was sent and when it was first read, so that I can show what was said and when.

| ID           | Requirement                                                                                                                                                             | Priority | Source                                                              |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------|
| FR-MSG-03-01 | The system shall save the sent time of every message in UTC and show it in the local time of the user.                                                                  | Must     | MSG-03; Common BRD 11.5                                             |
| FR-MSG-03-02 | The system shall save, for each recipient, the time the recipient first opened the message (the first-read time).                                                       | Must     | OurFamilyWizard and TalkingParents; decision Q-03                   |
| FR-MSG-03-03 | The system shall show both parents the sent time and the first-read time of a message.                                                                                  | Must     | OurFamilyWizard (first-viewed time); decision Q-03                  |
| FR-MSG-03-04 | The system shall not let anyone change a time stamp.                                                                                                                    | Must     | NFR-05                                                              |
| FR-MSG-03-05 | The system shall include the sent time and the first-read time of every message in each export.                                                                         | Must     | OurFamilyWizard (first-viewed times show in the PDF); decision Q-03 |
| FR-MSG-03-06 | The system shall set the first-read time when the recipient opens the message. For a held message (MSG-06) it shall set the time when the recipient opens the original. | Must     | Decision Q-03                                                       |
| FR-MSG-03-07 | When the recipient is in Safety Mode, the system shall not show the first-read time to the sender.                                                                      | Must     | Notifications BRD FR-NTF-02-09                                      |

| ID           | Given                                                      | When                               | Then                                                      | Covers                     |
|--------------|------------------------------------------------------------|------------------------------------|-----------------------------------------------------------|----------------------------|
| AC-MSG-03-01 | A message sent at 2027-01-15 18:00 UTC                     | A user in US Eastern time views it | The sent time shows as 13:00 on January 15, 2027          | FR-MSG-03-01               |
| AC-MSG-03-02 | A sent message                                             | The recipient opens it             | The first-read time is saved for that recipient           | FR-MSG-03-02, FR-MSG-03-06 |
| AC-MSG-03-03 | A message that the recipient opened                        | Both parents view it               | Both see the sent time and the first-read time            | FR-MSG-03-03               |
| AC-MSG-03-04 | A saved time stamp                                         | Anyone tries to change it          | The change is not possible                                | FR-MSG-03-04               |
| AC-MSG-03-05 | A thread with messages                                     | A parent exports it                | Every message shows its sent time and its first-read time | FR-MSG-03-05               |
| AC-MSG-03-06 | A held message                                             | The recipient opens the original   | The first-read time is set at that moment and not before  | FR-MSG-03-06               |
| AC-MSG-03-07 | A recipient who is in Safety Mode and who opened a message | The sender views the message       | The sent time shows and the first-read time does not      | FR-MSG-03-07               |

### 6.4 MSG-04 Tone checks on outgoing messages

**US-MSG-04-01.** As a parent, I want private feedback on the tone of my message before I send it, so that I do not send something I regret.

| ID           | Requirement                                                                                                                                                                            | Priority | Source                                                                           |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------|
| FR-MSG-04-01 | The system shall let a user turn the tone check on or off. The tone check is off until the user turns it on.                                                                           | Must     | BR-11; Scope document decision 22; decisions Q-04 and Q-23                       |
| FR-MSG-04-02 | While the tone check is on, the system shall review a draft when the sender chooses Send.                                                                                              | Must     | BestInterest (reviews a message before it is sent); decision Q-04                |
| FR-MSG-04-03 | If the review finds a concern, the system shall highlight the phrases, show a short reason, and offer Edit or Send anyway.                                                             | Must     | OurFamilyWizard (ToneMeter flags emotionally charged phrases); decision Q-04     |
| FR-MSG-04-04 | The system shall never stop a message from being sent because of the tone check.                                                                                                       | Must     | Decision Q-04                                                                    |
| FR-MSG-04-05 | The system shall show the tone feedback only to the sender. It is not saved in the record and the recipient cannot see it.                                                             | Must     | BR-09                                                                            |
| FR-MSG-04-06 | The system shall review only the drafts of the user and never a received message.                                                                                                      | Must     | TalkingParents (a user cannot scan the messages of the co-parent); decision Q-04 |
| FR-MSG-04-07 | Before the user turns the tone check on, the system shall say plainly what the AI sees. It sees the draft text only when the draft is reviewed, and the text is not used for training. | Must     | BR-11; P15; SAF-03; decision Q-18                                                |
| FR-MSG-04-08 | The tone check shall work for English text in the MVP.                                                                                                                                 | Must     | Accounts BRD decision Q-01; Scope document decision 10; decision Q-19            |
| FR-MSG-04-09 | If the AI service is not available, the system shall let the sender send the message and shall show MSGT-03.                                                                           | Must     | Common BRD 5 (unhappy path)                                                      |

| ID           | Given                                                                 | When                                          | Then                                                                                                         | Covers                     |
|--------------|-----------------------------------------------------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------|----------------------------|
| AC-MSG-04-01 | A new user                                                            | They open the settings                        | The tone check is off                                                                                        | FR-MSG-04-01               |
| AC-MSG-04-02 | A user who turns the tone check on                                    | They confirm the switch                       | The notice about what the AI sees shows first (MSGT-09), and the tone check is on only after the user agrees | FR-MSG-04-01, FR-MSG-04-07 |
| AC-MSG-04-03 | A user with the tone check on and a hostile draft                     | They choose Send                              | The phrases are highlighted, a short reason shows, and Edit and Send anyway are offered (MSGT-02)            | FR-MSG-04-02, FR-MSG-04-03 |
| AC-MSG-04-04 | A tone concern on a draft                                             | The sender chooses Send anyway                | The message is sent                                                                                          | FR-MSG-04-04               |
| AC-MSG-04-05 | A message that had tone feedback                                      | The recipient views the thread and the record | No tone feedback shows to the recipient and none is in the record                                            | FR-MSG-04-05               |
| AC-MSG-04-06 | A received message                                                    | The user looks for a tone check on it         | No tone check is offered                                                                                     | FR-MSG-04-06               |
| AC-MSG-04-07 | A user with the tone check on and a draft in English                  | They choose Send                              | The review runs                                                                                              | FR-MSG-04-08               |
| AC-MSG-04-08 | A user with the tone check on and an AI service that is not available | They choose Send                              | The message is sent and MSGT-03 shows                                                                        | FR-MSG-04-09               |

### 6.5 MSG-05 AI rewrite suggestions for outgoing messages (Phase 2)

**US-MSG-05-01.** As a parent, I want a calmer version of my draft when I ask for one, so that I can send a message that does not start a fight.

| ID           | Requirement                                                                                                                                                                 | Priority | Source                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------|
| FR-MSG-05-01 | The system should offer an AI rewrite of a draft when the tone check finds a concern, and when the user asks for one.                                                       | Should   | MSG-05; OurFamilyWizard (Writing Assistant) and TalkingParents (Writing Assist); decision Q-05 |
| FR-MSG-05-02 | The system should offer the rewrite only to a user who turned on AI rewrite. AI rewrite is off until the user turns it on, and it is a separate switch from the tone check. | Should   | BR-11; decision Q-23                                                                           |
| FR-MSG-05-03 | The system should show the suggested text and let the user edit it, use it or ignore it.                                                                                    | Should   | OurFamilyWizard (a suggestion can be edited); decision Q-05                                    |
| FR-MSG-05-04 | The system should never send a suggestion unless the user chooses Send.                                                                                                     | Should   | Decision Q-05                                                                                  |
| FR-MSG-05-05 | The system should save only the message that is sent. The suggestion and the original draft stay out of the record.                                                         | Should   | BR-11                                                                                          |
| FR-MSG-05-06 | Before the user turns AI rewrite on, the system should say plainly what the AI sees.                                                                                        | Should   | BR-11; P15; SAF-03                                                                             |
| FR-MSG-05-07 | The system should make AI rewrite available on the Household plan.                                                                                                          | Should   | Billing BRD, decision Q-01 (AI rewrite is a paid extra)                                        |
| FR-MSG-05-08 | If the AI service is not available, the system should keep the draft as it is and show MSGT-10.                                                                             | Should   | Common BRD 5 (unhappy path)                                                                    |

| ID           | Given                                                                 | When                                                                              | Then                                                                              | Covers       |
|--------------|-----------------------------------------------------------------------|-----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------|
| AC-MSG-05-01 | A user with AI rewrite on and a draft with a tone concern             | The tone check shows the concern                                                  | A suggested rewrite is offered                                                    | FR-MSG-05-01 |
| AC-MSG-05-02 | A user who did not turn AI rewrite on                                 | They write a draft                                                                | No rewrite is offered                                                             | FR-MSG-05-02 |
| AC-MSG-05-03 | A suggested rewrite                                                   | The user edits it, and later uses another one as it is, and later ignores a third | Each choice works and the draft changes only as the user chose                    | FR-MSG-05-03 |
| AC-MSG-05-04 | A suggested rewrite                                                   | The user does not choose Send                                                     | Nothing is sent                                                                   | FR-MSG-05-04 |
| AC-MSG-05-05 | A message that was sent after a rewrite                               | A parent opens the record                                                         | Only the message that was sent is there, with no suggestion and no original draft | FR-MSG-05-05 |
| AC-MSG-05-06 | A user who turns AI rewrite on                                        | They confirm the switch                                                           | The notice about what the AI sees shows first (MSGT-09)                           | FR-MSG-05-06 |
| AC-MSG-05-07 | A household on the Free core plan                                     | A parent opens AI rewrite                                                         | The plan screen is offered instead                                                | FR-MSG-05-07 |
| AC-MSG-05-08 | A user who asks for a rewrite and an AI service that is not available | They ask                                                                          | The draft stays as it is and MSGT-10 shows                                        | FR-MSG-05-08 |

### 6.6 MSG-06 Incoming message shield with view-original

**US-MSG-06-01.** As a parent, I want hostile messages held back, so that I can read them when I am ready and can still see the original.

| ID           | Requirement                                                                                                                                                                                                         | Priority | Source                                                                         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|--------------------------------------------------------------------------------|
| FR-MSG-06-01 | The system shall let a user turn the incoming message shield on or off. The shield is off until the user turns it on.                                                                                               | Must     | BR-11; Scope document decision 22; decision Q-06                               |
| FR-MSG-06-02 | The system shall let the user set the level of the shield as Low, Medium or High. Medium is the level when the user turns the shield on.                                                                            | Must     | P12; decision Q-06                                                             |
| FR-MSG-06-03 | At the level Low the shield shall hold messages with threats or abusive language. At Medium it shall also hold insults and personal attacks. At High it shall also hold blame, sarcasm and pressure.                | Must     | Decision Q-06 (BA proposal)                                                    |
| FR-MSG-06-04 | While the shield is on, the system shall hold an incoming message that crosses the level. A held message shows the name of the sender, the time, the notice Message held and the reason. It does not show the text. | Must     | P12; BR-10; BestInterest (Message Shield); decision Q-06                       |
| FR-MSG-06-05 | The system shall show the original of a held message with one tap.                                                                                                                                                  | Must     | BR-10; Scope document decision 22                                              |
| FR-MSG-06-06 | The system shall never delete, block or change a message. The shield only holds and labels it.                                                                                                                      | Must     | Scope document decision 22                                                     |
| FR-MSG-06-07 | The system shall save the original message and its times in the record exactly as for any other message. The hold is not part of the record.                                                                        | Must     | BR-10; decision Q-06                                                           |
| FR-MSG-06-08 | The system shall not tell the sender that a message was held.                                                                                                                                                       | Must     | Decision Q-06                                                                  |
| FR-MSG-06-09 | The shield shall apply to messages from the co-parent, including replies by text or email from a co-parent who is not on the app.                                                                                   | Must     | BestInterest (works when the co-parent does not join); decision Q-06           |
| FR-MSG-06-10 | The shield shall work for English text in the MVP.                                                                                                                                                                  | Must     | Accounts BRD decision Q-01; Scope document decision 10; decision Q-19          |
| FR-MSG-06-11 | The system shall let a user report that a hold was wrong. A report shares that one message with the review team only when the user agrees, and the reports are used to track the error rate.                        | Must     | Scope document decision 22 (tracked error rate); Common BRD 7.1; decision Q-06 |
| FR-MSG-06-12 | If the AI service is not available, the system shall show messages as they are and show MSGT-05.                                                                                                                    | Must     | Common BRD 5 (unhappy path)                                                    |
| FR-MSG-06-13 | Before the user turns the shield on, the system shall say plainly what the AI sees. It sees the text of an incoming message when it arrives, and the text is not used for training.                                 | Must     | BR-11; P15; SAF-03; decision Q-18                                              |

| ID           | Given                                                                                              | When                                                    | Then                                                                                                                                            | Covers                     |
|--------------|----------------------------------------------------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| AC-MSG-06-01 | A new user                                                                                         | They open the settings                                  | The shield is off                                                                                                                               | FR-MSG-06-01               |
| AC-MSG-06-02 | A user who turns the shield on                                                                     | They confirm the switch                                 | The notice about what the AI sees shows first (MSGT-09), and the level is Medium after the user agrees                                          | FR-MSG-06-02, FR-MSG-06-13 |
| AC-MSG-06-03 | A user with the shield on                                                                          | They set the level to High                              | The level High is saved                                                                                                                         | FR-MSG-06-02               |
| AC-MSG-06-04 | A user with the shield at Medium                                                                   | A message with an insult arrives                        | The message is held. It shows the name of the sender, the time, the notice Message held and the reason, and it does not show the text (MSGT-04) | FR-MSG-06-03, FR-MSG-06-04 |
| AC-MSG-06-05 | A user with the shield at Low                                                                      | A message with an insult but no threat arrives          | The message is not held                                                                                                                         | FR-MSG-06-03               |
| AC-MSG-06-06 | A held message                                                                                     | The user taps it                                        | The original shows                                                                                                                              | FR-MSG-06-05               |
| AC-MSG-06-07 | A held message                                                                                     | The user looks at the thread and at an export           | The original is in the thread and in the export, and it is unchanged                                                                            | FR-MSG-06-06, FR-MSG-06-07 |
| AC-MSG-06-08 | A held message                                                                                     | The sender looks at the message                         | Nothing shows that it was held                                                                                                                  | FR-MSG-06-08               |
| AC-MSG-06-09 | A user with the shield on and a reply by text with a threat from a co-parent who is not on the app | The reply arrives                                       | The reply is held                                                                                                                               | FR-MSG-06-09               |
| AC-MSG-06-10 | A user with the shield on                                                                          | A message in English arrives                            | The shield checks it                                                                                                                            | FR-MSG-06-10               |
| AC-MSG-06-11 | A held message that the user thinks was wrong                                                      | The user reports it, once with consent and once without | The message goes to the review team only when the user agreed, and both reports count in the error rate                                         | FR-MSG-06-11               |
| AC-MSG-06-12 | A user with the shield on and an AI service that is not available                                  | A message arrives                                       | The message shows as it is and MSGT-05 shows                                                                                                    | FR-MSG-06-12               |

### 6.7 MSG-07 Search messages by keyword or date (Phase 2)

**US-MSG-07-01.** As a parent, I want to search our messages, so that I can find what was said without scrolling.

| ID           | Requirement                                                                                                          | Priority | Source                                                                              |
|--------------|----------------------------------------------------------------------------------------------------------------------|----------|-------------------------------------------------------------------------------------|
| FR-MSG-07-01 | The system should let a parent search messages by keyword.                                                           | Should   | MSG-07; OurFamilyWizard (filter by keyword or folder); AppClose (search by keyword) |
| FR-MSG-07-02 | The system should let a parent narrow a search by date range and by sender.                                          | Should   | AppClose (search by date); decision Q-08                                            |
| FR-MSG-07-03 | The system should show each result with the sender, the time, the subject of the thread and a short extract.         | Should   | Decision Q-08                                                                       |
| FR-MSG-07-04 | The system should search only the messages the user is allowed to see.                                               | Should   | Common BRD 7.2                                                                      |
| FR-MSG-07-05 | For a held message, the system should show the notice Message held and no extract until the user opens the original. | Should   | BR-10; decision Q-08                                                                |
| FR-MSG-07-06 | The system should open the thread at the message when the user selects a result.                                     | Should   | Decision Q-08                                                                       |
| FR-MSG-07-07 | If nothing matches, the system should show MSGT-08. If the search fails, the system should show ERR-05.              | Should   | Common BRD 5 (unhappy path)                                                         |

| ID           | Given                                           | When                                | Then                                                           | Covers       |
|--------------|-------------------------------------------------|-------------------------------------|----------------------------------------------------------------|--------------|
| AC-MSG-07-01 | A household with messages                       | A parent searches for the word swap | Every message with that word shows as a result                 | FR-MSG-07-01 |
| AC-MSG-07-02 | A search with a date range and a sender         | The parent runs it                  | Only messages in the range and from that sender show           | FR-MSG-07-02 |
| AC-MSG-07-03 | A search result                                 | The parent looks at it              | It shows the sender, the time, the subject and a short extract | FR-MSG-07-03 |
| AC-MSG-07-04 | A thread that the user is not in                | The user searches                   | No message of that thread shows                                | FR-MSG-07-04 |
| AC-MSG-07-05 | A held message that matches                     | The user searches                   | The result shows Message held and no extract                   | FR-MSG-07-05 |
| AC-MSG-07-06 | A search result                                 | The parent selects it               | The thread opens at that message                               | FR-MSG-07-06 |
| AC-MSG-07-07 | A search with no match, and a search that fails | The parent runs each                | MSGT-08 shows for the first and ERR-05 shows for the second    | FR-MSG-07-07 |

### 6.8 MSG-08 Message folders or topics (Phase 2)

**US-MSG-08-01.** As a parent, I want to sort threads into folders and topics, so that I can find them later.

| ID           | Requirement                                                                                                                       | Priority | Source                                                                   |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------|----------|--------------------------------------------------------------------------|
| FR-MSG-08-01 | The system should let a user create personal folders with a name of 1 to 60 characters, and should show ERR-11 for a longer name. | Should   | MSG-08; OurFamilyWizard (custom folders); decision Q-09                  |
| FR-MSG-08-02 | The system should let a user move a thread into a folder. A thread is in one folder for each user.                                | Should   | Decision Q-09                                                            |
| FR-MSG-08-03 | Folders are personal. The other parent does not see them, and they do not change the record.                                      | Should   | OurFamilyWizard (each user customizes folders); decision Q-09            |
| FR-MSG-08-04 | The system should let the sender give a thread a topic: Schedule, Health, School, Expenses or Other. Both parents see the topic.  | Should   | TalkingParents (organize by topic); BestInterest (topics); decision Q-09 |
| FR-MSG-08-05 | The system should let a user filter the thread list by folder or by topic.                                                        | Should   | Decision Q-09                                                            |
| FR-MSG-08-06 | When a user deletes a folder, the system should move its threads back to the main list. No message is deleted.                    | Should   | BR-08; decision Q-09                                                     |
| FR-MSG-08-07 | If a folder or a topic cannot be saved, the system should show ERR-06 and keep the earlier setting.                               | Should   | Common BRD 5 (unhappy path)                                              |

| ID           | Given                                  | When                                                         | Then                                                             | Covers       |
|--------------|----------------------------------------|--------------------------------------------------------------|------------------------------------------------------------------|--------------|
| AC-MSG-08-01 | A signed-in user                       | They create a folder named School and one with 61 characters | The first folder is saved and the second is not and ERR-11 shows | FR-MSG-08-01 |
| AC-MSG-08-02 | A thread and a folder                  | The user moves the thread into the folder                    | The thread shows in that folder only for that user               | FR-MSG-08-02 |
| AC-MSG-08-03 | A thread that Parent A put in a folder | Parent B opens the thread list                               | Parent B does not see the folder of Parent A                     | FR-MSG-08-03 |
| AC-MSG-08-04 | A thread                               | The sender gives it the topic Health                         | Both parents see the topic Health                                | FR-MSG-08-04 |
| AC-MSG-08-05 | Threads in folders and with topics     | The user filters by a folder and by a topic                  | Only the matching threads show each time                         | FR-MSG-08-05 |
| AC-MSG-08-06 | A folder with 3 threads                | The user deletes the folder                                  | The 3 threads are in the main list and no message is deleted     | FR-MSG-08-06 |
| AC-MSG-08-07 | A save error                           | The user saves a topic                                       | The earlier setting stays and ERR-06 shows                       | FR-MSG-08-07 |

### 6.9 MSG-09 Attachments and files in messages (Phase 2)

**US-MSG-09-01.** As a parent, I want to attach files and pictures to a message, so that I can share documents in the thread.

| ID           | Requirement                                                                                                                                           | Priority | Source                                                                                             |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------|
| FR-MSG-09-01 | The system should let a parent attach up to 5 files to a message, with a total size of up to 25 MB.                                                   | Should   | MSG-09; OurFamilyWizard, TalkingParents and AppClose; decision Q-10 (the limits are a BA proposal) |
| FR-MSG-09-02 | The system should accept JPG, PNG, PDF and DOCX files and refuse other types with ERR-08.                                                             | Should   | Decision Q-10 (BA proposal)                                                                        |
| FR-MSG-09-03 | The system should scan every file for malware before it is delivered. A file that fails the scan is not delivered, and the system should show ERR-09. | Should   | Decision Q-10 (BA proposal)                                                                        |
| FR-MSG-09-04 | The system should not let anyone remove an attachment from a sent message.                                                                            | Should   | OurFamilyWizard (attachments cannot be removed); BR-08                                             |
| FR-MSG-09-05 | The system should save each attachment of a sent message in the household files (DOC-02).                                                             | Should   | OurFamilyWizard (attachments are added to MyFiles); decision Q-10                                  |
| FR-MSG-09-06 | The system should count attachments toward the storage limit of the plan. Over the limit, it should block new attachments and show ERR-10.            | Should   | Billing BRD FR-BIL-02-06; decision Q-10                                                            |
| FR-MSG-09-07 | For a recipient who turned on the sensitive-image control (SAF-02), the system should hide an image behind MSGT-14 until the recipient taps it.       | Should   | SAF-02; decision Q-10                                                                              |
| FR-MSG-09-08 | The system should include attachments in exports.                                                                                                     | Should   | Records and Court (REC); OurFamilyWizard (download and print)                                      |
| FR-MSG-09-09 | If a message has more than 5 files or more than 25 MB, the system should not send it and should show ERR-07.                                          | Should   | Common BRD 5 (unhappy path)                                                                        |

| ID           | Given                                                 | When                                                | Then                                                      | Covers       |
|--------------|-------------------------------------------------------|-----------------------------------------------------|-----------------------------------------------------------|--------------|
| AC-MSG-09-01 | A parent writing a message                            | They attach 5 files of 4 MB each                    | The message is sent with the 5 files                      | FR-MSG-09-01 |
| AC-MSG-09-02 | A parent writing a message                            | They attach a file of another type                  | The file is refused and ERR-08 shows                      | FR-MSG-09-02 |
| AC-MSG-09-03 | A file that fails the malware scan                    | A parent sends it                                   | The file is not delivered and ERR-09 shows                | FR-MSG-09-03 |
| AC-MSG-09-04 | A sent message with an attachment                     | A parent looks for a way to remove the attachment   | No removal option is offered                              | FR-MSG-09-04 |
| AC-MSG-09-05 | A sent message with an attachment                     | A parent opens the household files                  | The attachment is there                                   | FR-MSG-09-05 |
| AC-MSG-09-06 | A household that is over the storage limit            | A parent attaches a file                            | The file is blocked and ERR-10 shows                      | FR-MSG-09-06 |
| AC-MSG-09-07 | A recipient who turned on the sensitive-image control | A message with an image arrives                     | The image is hidden (MSGT-14) until the recipient taps it | FR-MSG-09-07 |
| AC-MSG-09-08 | A thread with attachments                             | A parent exports it                                 | The attachments are in the export                         | FR-MSG-09-08 |
| AC-MSG-09-09 | A parent writing a message                            | They attach 6 files, and later 26 MB in one message | The message is not sent and ERR-07 shows each time        | FR-MSG-09-09 |

### 6.10 MSG-10 Group chat and messages to third parties (Phase 3)

**US-MSG-10-01.** As a parent, I want to message a grandparent or a caregiver, and to talk in a group, so that everyone who helps with the child is in the loop.

| ID           | Requirement                                                                                                                                      | Priority | Source                                                                              |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------|----------|-------------------------------------------------------------------------------------|
| FR-MSG-10-01 | The system should let a parent send a message to a Third party or a Child account that the parents added (ACC-07).                               | Should   | MSG-10; OurFamilyWizard (messages to child and third-party accounts); decision Q-11 |
| FR-MSG-10-02 | The system should let a parent start a group thread with the co-parent and chosen Third parties.                                                 | Should   | AppClose (group chats); decision Q-11                                               |
| FR-MSG-10-03 | The system should let a Third party read and answer only in the threads they are added to.                                                       | Should   | Common BRD 7.1; CR-03; decision Q-11                                                |
| FR-MSG-10-04 | The system should give a Child account only the threads the parents set.                                                                         | Should   | Common BRD 7.1; decision Q-11                                                       |
| FR-MSG-10-05 | A thread with a Child account should include both parents.                                                                                       | Should   | Decision Q-11 (BA proposal)                                                         |
| FR-MSG-10-06 | A person who is added to a thread later should see only the messages sent after they were added. The thread should show who added them and when. | Should   | Decision Q-11 (BA proposal)                                                         |
| FR-MSG-10-07 | The tone check should work for every sender. The shield should work on messages from the co-parent only.                                         | Should   | Decision Q-11                                                                       |
| FR-MSG-10-08 | The same record rules should apply to every thread: no edit, no delete, a sent time and a first-read time.                                       | Should   | BR-08; MSG-03                                                                       |
| FR-MSG-10-09 | If a person cannot be added to a thread, the system should show ERR-06 and should not change the thread.                                         | Should   | Common BRD 5 (unhappy path)                                                         |

| ID           | Given                                             | When                                                                  | Then                                                                                                                           | Covers       |
|--------------|---------------------------------------------------|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|--------------|
| AC-MSG-10-01 | A Third party that the parents added              | A parent sends them a message                                         | The Third party gets it                                                                                                        | FR-MSG-10-01 |
| AC-MSG-10-02 | A parent                                          | They start a group thread with the co-parent and a Third party        | All three see the thread                                                                                                       | FR-MSG-10-02 |
| AC-MSG-10-03 | A Third party who is in one group thread          | They open the app                                                     | They see and answer in that thread and in no other                                                                             | FR-MSG-10-03 |
| AC-MSG-10-04 | A Child account                                   | The child opens the app                                               | The child sees only the threads the parents set                                                                                | FR-MSG-10-04 |
| AC-MSG-10-05 | A parent who starts a thread with a Child account | The thread is created                                                 | Both parents are in the thread                                                                                                 | FR-MSG-10-05 |
| AC-MSG-10-06 | A group thread with 3 messages                    | A parent adds a Third party                                           | The Third party sees only later messages and the thread shows who added them and when                                          | FR-MSG-10-06 |
| AC-MSG-10-07 | A user with the tone check and the shield on      | They write in a group thread and a message from the co-parent arrives | The tone check reviews the draft and the shield checks the message of the co-parent. A message from a Third party is not held. | FR-MSG-10-07 |
| AC-MSG-10-08 | A group thread                                    | Anyone tries to edit or delete a message                              | The change is not possible and the message has a sent time and a first-read time                                               | FR-MSG-10-08 |
| AC-MSG-10-09 | A person who cannot be added                      | A parent adds them                                                    | The thread is unchanged and ERR-06 shows                                                                                       | FR-MSG-10-09 |

### 6.11 MSG-11 AI co-parenting coach (Phase 3)

**US-MSG-11-01.** As a parent, I want to ask an AI coach about a co-parenting problem in private, so that I can think before I write.

| ID           | Requirement                                                                                                                                       | Priority | Source                                                                                        |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------|
| FR-MSG-11-01 | The system should offer a private chat with an AI coach about co-parenting questions. The coach is off until the user turns it on.                | Should   | MSG-11; BR-11; BestInterest (Coparent Coach) and Kidtime (AI wizard); decisions Q-12 and Q-23 |
| FR-MSG-11-02 | The chat should be private to the user. It is not shown to the co-parent, not saved in the record and not in exports.                             | Should   | BR-11; decision Q-12                                                                          |
| FR-MSG-11-03 | The coach should see only what the user types or shares in the chat. It should not read the threads of the user unless the user shares a message. | Should   | P15; decision Q-12                                                                            |
| FR-MSG-11-04 | The coach should show MSGT-11: it is not a lawyer or a therapist and it does not give legal advice.                                               | Should   | Scope document 4.2                                                                            |
| FR-MSG-11-05 | Before the user turns the coach on, the system should say plainly what the AI sees.                                                               | Should   | BR-11; P15; SAF-03                                                                            |
| FR-MSG-11-06 | The system should make the coach available on the Household plan.                                                                                 | Should   | Decision Q-12; CR-02                                                                          |
| FR-MSG-11-07 | The coach should work in English first.                                                                                                           | Should   | Accounts BRD decision Q-01; Scope document decision 10                                        |
| FR-MSG-11-08 | If the AI service is not available, the system should show MSGT-15.                                                                               | Should   | Common BRD 5 (unhappy path)                                                                   |

| ID           | Given                                           | When                                                         | Then                                                                               | Covers       |
|--------------|-------------------------------------------------|--------------------------------------------------------------|------------------------------------------------------------------------------------|--------------|
| AC-MSG-11-01 | A new user                                      | They open the settings                                       | The coach is off                                                                   | FR-MSG-11-01 |
| AC-MSG-11-02 | A user who chats with the coach                 | The co-parent opens the app, and a parent exports the record | The chat does not show to the co-parent, and it is not in the record or the export | FR-MSG-11-02 |
| AC-MSG-11-03 | A user who chats with the coach                 | The user has not shared a message                            | The coach has not read any thread                                                  | FR-MSG-11-03 |
| AC-MSG-11-04 | A user who opens the coach                      | The chat opens                                               | MSGT-11 shows                                                                      | FR-MSG-11-04 |
| AC-MSG-11-05 | A user who turns the coach on                   | They confirm the switch                                      | The notice about what the AI sees shows first (MSGT-09)                            | FR-MSG-11-05 |
| AC-MSG-11-06 | A household on the Free core plan               | A parent opens the coach                                     | The plan screen is offered instead                                                 | FR-MSG-11-06 |
| AC-MSG-11-07 | A user who asks the coach a question in English | They send it                                                 | The coach answers                                                                  | FR-MSG-11-07 |
| AC-MSG-11-08 | An AI service that is not available             | A user opens the coach                                       | MSGT-15 shows                                                                      | FR-MSG-11-08 |

### 6.12 MSG-12 Human mediation or counseling in the app (Phase 3)

**US-MSG-12-01.** As a parent, I want to ask for a licensed mediator, so that we can settle a dispute without going to court.

| ID           | Requirement                                                                                                                           | Priority | Source                                                        |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------|
| FR-MSG-12-01 | The system should let a parent ask for mediation by a licensed mediator from a partner of ParentPath.                                 | Should   | MSG-12; Scope document decision 27; coParenter; decision Q-13 |
| FR-MSG-12-02 | Mediation should start only after both parents agree.                                                                                 | Should   | Decision Q-13                                                 |
| FR-MSG-12-03 | The mediator should get access only to the threads that both parents choose to share, and should answer only in the mediation thread. | Should   | Common BRD 7.1; CR-03; decision Q-13                          |
| FR-MSG-12-04 | The mediation thread should follow the same record rules as any thread.                                                               | Should   | BR-08; MSG-03                                                 |
| FR-MSG-12-05 | Booking and payment should go through the partner, by referral or paid booking. The app never holds funds.                            | Should   | Scope document decision 27; Scope document decision 8         |
| FR-MSG-12-06 | Either parent should be able to end the mediation, and the access of the mediator ends at once.                                       | Should   | Decision Q-13                                                 |
| FR-MSG-12-07 | The system shall not offer mediation to a user in Safety Mode.                                                                        | Must     | BR-22; decision Q-13                                          |
| FR-MSG-12-08 | The system should offer mediation only after legal review of the mediation terms is recorded as done.                                 | Should   | Scope document decisions 7 and 27; decision Q-24              |
| FR-MSG-12-09 | If a mediation request cannot be saved, the system should show ERR-06 and should not start it.                                        | Should   | Common BRD 5 (unhappy path)                                   |

| ID           | Given                                                       | When                                     | Then                                                                                    | Covers       |
|--------------|-------------------------------------------------------------|------------------------------------------|-----------------------------------------------------------------------------------------|--------------|
| AC-MSG-12-01 | A parent                                                    | They ask for mediation                   | A request goes to the partner mediators                                                 | FR-MSG-12-01 |
| AC-MSG-12-02 | A mediation request                                         | Only one parent agrees                   | Mediation does not start (MSGT-13)                                                      | FR-MSG-12-02 |
| AC-MSG-12-03 | A mediation that both parents agreed to                     | The parents share one thread             | The mediator sees that thread and no other, and can answer only in the mediation thread | FR-MSG-12-03 |
| AC-MSG-12-04 | A mediation thread                                          | Anyone tries to edit or delete a message | The change is not possible                                                              | FR-MSG-12-04 |
| AC-MSG-12-05 | A mediation that needs payment                              | A parent books it                        | The booking and the payment go through the partner and the app holds no funds           | FR-MSG-12-05 |
| AC-MSG-12-06 | A running mediation                                         | A parent ends it                         | The access of the mediator ends at once                                                 | FR-MSG-12-06 |
| AC-MSG-12-07 | A user in Safety Mode                                       | They open the messaging screen           | Mediation is not offered                                                                | FR-MSG-12-07 |
| AC-MSG-12-08 | A release built before the legal review is recorded as done | A parent looks for mediation             | Mediation is not offered                                                                | FR-MSG-12-08 |
| AC-MSG-12-09 | A save error                                                | A parent asks for mediation              | Mediation does not start and ERR-06 shows                                               | FR-MSG-12-09 |

### 6.13 MSG-13 Urgent-message detection (Phase 3)

**US-MSG-13-01.** As a parent, I want urgent messages marked, so that I see them first.

| ID           | Requirement                                                                                                                                                                           | Priority | Source                                                                                         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------|
| FR-MSG-13-01 | The system should let a sender mark a message as Urgent.                                                                                                                              | Should   | MSG-13; decision Q-14                                                                          |
| FR-MSG-13-02 | The system should detect a message that may be urgent with AI, only for a recipient who turned on urgent detection. Urgent detection is off until the user turns it on.               | Should   | BR-11; Scope document decision 22; BestInterest (Emergency Detection); decisions Q-14 and Q-23 |
| FR-MSG-13-03 | The system should show the label Marked urgent or May be urgent on the message (MSGT-12).                                                                                             | Should   | Decision Q-14                                                                                  |
| FR-MSG-13-04 | The system should never hide, delay or block a message because of the label.                                                                                                          | Should   | Scope document decision 22                                                                     |
| FR-MSG-13-05 | The system should alert the recipient of an urgent message by push and by SMS at once.                                                                                                | Should   | Notifications BRD decision Q-01 (urgent items go straight to SMS); CR-05                       |
| FR-MSG-13-06 | The system should let the recipient say that a label was wrong. With the consent of the recipient, it should share that message with the review team and should track the error rate. | Should   | Scope document decision 22; decision Q-14                                                      |
| FR-MSG-13-07 | The system should offer urgent detection only after the Manager accepts the error rate of a test.                                                                                     | Should   | Scope document decision 22; decision Q-14                                                      |
| FR-MSG-13-08 | Urgent detection should work in English first.                                                                                                                                        | Should   | Accounts BRD decision Q-01; Scope document decision 10                                         |
| FR-MSG-13-09 | Before the user turns urgent detection on, the system should say plainly what the AI sees.                                                                                            | Should   | BR-11; P15; SAF-03                                                                             |
| FR-MSG-13-10 | If the AI service is not available, the system should show messages as they are.                                                                                                      | Should   | Common BRD 5 (unhappy path)                                                                    |

| ID           | Given                                                                   | When                                               | Then                                                                                            | Covers                     |
|--------------|-------------------------------------------------------------------------|----------------------------------------------------|-------------------------------------------------------------------------------------------------|----------------------------|
| AC-MSG-13-01 | A sender                                                                | They mark a message as Urgent and send it          | The message shows the label Marked urgent (MSGT-12)                                             | FR-MSG-13-01, FR-MSG-13-03 |
| AC-MSG-13-02 | A recipient with urgent detection on and a message that may be urgent   | The message arrives                                | The message shows the label May be urgent                                                       | FR-MSG-13-02, FR-MSG-13-03 |
| AC-MSG-13-03 | A new user                                                              | They open the settings                             | Urgent detection is off                                                                         | FR-MSG-13-02               |
| AC-MSG-13-04 | A message with the label                                                | The recipient looks for it                         | The message is not hidden, delayed or blocked                                                   | FR-MSG-13-04               |
| AC-MSG-13-05 | An urgent message                                                       | It arrives                                         | The recipient is alerted by push and by SMS at the same time                                    | FR-MSG-13-05               |
| AC-MSG-13-06 | A label that the recipient thinks was wrong                             | The recipient reports it, with consent and without | The message goes to the review team only with consent, and both reports count in the error rate | FR-MSG-13-06               |
| AC-MSG-13-07 | A release built before the Manager accepts the error rate               | A user looks for urgent detection                  | Urgent detection is not offered                                                                 | FR-MSG-13-07               |
| AC-MSG-13-08 | A user with urgent detection on                                         | A message in English arrives                       | The detection runs                                                                              | FR-MSG-13-08               |
| AC-MSG-13-09 | A user who turns urgent detection on                                    | They confirm the switch                            | The notice about what the AI sees shows first (MSGT-09)                                         | FR-MSG-13-09               |
| AC-MSG-13-10 | A user with urgent detection on and an AI service that is not available | A message arrives                                  | The message shows as it is                                                                      | FR-MSG-13-10               |

### 6.14 MSG-14 Report a message (proposed, MVP)

**US-MSG-14-01.** As a parent, I want to report a threatening or harassing message, so that it is marked in my own record.

| ID           | Requirement                                                                                                                                                                              | Priority | Source                                                               |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------|
| FR-MSG-14-01 | The system shall let a parent report a message from the co-parent as Threat, Harassment or Other, with an optional note of up to 500 characters. It shall show ERR-11 for a longer note. | Must     | BR-05; Scope document 12 (report tools in every plan); decision Q-07 |
| FR-MSG-14-02 | The system shall save the report as a marker linked to the message, with the date, the time and the parent. The message is not changed.                                                  | Must     | BR-08; decision Q-07                                                 |
| FR-MSG-14-03 | The system shall show a report only to the parent who made it. The other parent is not told.                                                                                             | Must     | Decision Q-07                                                        |
| FR-MSG-14-04 | The system shall include the reports of a parent in the exports of that parent and in what that parent shares with a professional.                                                       | Must     | Records and Court (REC); PRO-01; decision Q-07                       |
| FR-MSG-14-05 | The system shall not send a reported message to the staff of ParentPath. Support staff cannot read parent messages.                                                                      | Must     | Common BRD 7.1; decision Q-07                                        |
| FR-MSG-14-06 | For the category Threat, the system shall show a safety notice (MSGT-07) with how to get help. The text and the links are approved with advocates.                                       | Must     | Scope document decision 6; decision Q-07                             |
| FR-MSG-14-07 | The system shall make the report tool available on every plan.                                                                                                                           | Must     | BR-05; Billing BRD FR-BIL-04-05                                      |
| FR-MSG-14-08 | The system shall not let anyone change or delete a report.                                                                                                                               | Must     | NFR-05; decision Q-07                                                |
| FR-MSG-14-09 | If a report cannot be saved, the system shall show ERR-06 and shall not create it.                                                                                                       | Must     | Common BRD 5 (unhappy path)                                          |

| ID           | Given                             | When                                                                                                     | Then                                                                                 | Covers       |
|--------------|-----------------------------------|----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|--------------|
| AC-MSG-14-01 | A message from the co-parent      | A parent reports it as Harassment with a note of 500 characters, and later with a note of 501 characters | The first report is saved and the second is not and ERR-11 shows                     | FR-MSG-14-01 |
| AC-MSG-14-02 | A reported message                | A parent opens the thread                                                                                | The message is unchanged and a marker shows with the category, the date and the time | FR-MSG-14-02 |
| AC-MSG-14-03 | A report by Parent A              | Parent B opens the thread                                                                                | Parent B sees no report and was not told. MSGT-06 shows only to Parent A             | FR-MSG-14-03 |
| AC-MSG-14-04 | A report by Parent A              | Parent A exports the record and shares a thread with a professional                                      | The report is in the export and in the shared thread                                 | FR-MSG-14-04 |
| AC-MSG-14-05 | A reported message                | A member of support staff looks for it                                                                   | They cannot open the message and no copy went to the staff                           | FR-MSG-14-05 |
| AC-MSG-14-06 | A report in the category Threat   | The parent saves it                                                                                      | The safety notice shows (MSGT-07)                                                    | FR-MSG-14-06 |
| AC-MSG-14-07 | A household on the Free core plan | A parent reports a message                                                                               | The report is saved                                                                  | FR-MSG-14-07 |
| AC-MSG-14-08 | A saved report                    | Anyone tries to change or delete it                                                                      | The change is not possible                                                           | FR-MSG-14-08 |
| AC-MSG-14-09 | A save error                      | A parent reports a message                                                                               | No report is created and ERR-06 shows                                                | FR-MSG-14-09 |

## 7. Business rules

| ID    | Rule                                                                                                                              | Features | Source | Status   |
|-------|-----------------------------------------------------------------------------------------------------------------------------------|----------|--------|----------|
| BR-09 | Tone feedback is shown only to the sender.                                                                                        | MSG-04   | P12    | Proposed |
| BR-10 | A held-back incoming message can be opened by the user. The reason it was flagged is shown, and the original stays in the record. | MSG-06   | P12    | Proposed |

BR-09 and BR-10 are module-only rules. Five shared rules from Common BRD section 9 are applied and not copied: BR-05 (tone, safety and reporting tools are in every plan) in FR-MSG-14-07, BR-07 (the status of a message is saved in the record) in FR-MSG-03-02, BR-08 (a sent message cannot be edited or deleted) in FR-MSG-02-01, FR-MSG-02-02, FR-MSG-09-04 and FR-MSG-14-02, BR-11 (AI is opt-in, is not trained on messages, and its suggestions stay out of the record) in FR-MSG-04-01, FR-MSG-05-02, FR-MSG-06-01, FR-MSG-11-01 and FR-MSG-13-02, and BR-22 (Safety Mode) in FR-MSG-12-07.

## 8. Data

**8.1 Shared entities used.** These are defined in Common BRD section 8 and are not copied here.

| Entity          | Fields used                         | Common BRD |
|-----------------|-------------------------------------|------------|
| User            | user_id, role, language             | 8.1        |
| Household       | household_id, mode (Linked, Solo)   | 8.2        |
| Audit log entry | actor, action, object, result, time | 8.5        |

**8.2 New entities (proposed).** The sources name none of these fields. They are a BA proposal.

**Thread**

| Field              | Type              | Required | Notes                                               |
|--------------------|-------------------|----------|-----------------------------------------------------|
| thread_id          | Unique ID         | Yes      | System generated                                    |
| household_id       | Link to Household | Yes      |                                                     |
| subject            | Text              | Yes      | Set by the sender who starts the thread             |
| topic              | Choice            | No       | Schedule, Health, School, Expenses, Other (Phase 2) |
| created_by_user_id | Link to User      | Yes      |                                                     |
| created_at         | Date and time     | Yes      | UTC                                                 |

**Message**

| Field          | Type           | Required | Notes                                                           |
|----------------|----------------|----------|-----------------------------------------------------------------|
| message_id     | Unique ID      | Yes      | System generated                                                |
| thread_id      | Link to Thread | Yes      |                                                                 |
| sender_user_id | Link to User   | No       | Empty for a co-parent who is not on the app                     |
| sender_address | Text           | No       | The mobile number or email of a co-parent who is not on the app |
| body           | Text           | Yes      | Plain text, up to 10,000 characters. Cannot be changed.         |
| sent_at        | Date and time  | Yes      | UTC. Cannot be changed.                                         |
| source         | Choice         | Yes      | App, Text reply, Email reply                                    |
| urgent_label   | Choice         | No       | None, Marked urgent, May be urgent (Phase 3)                    |

The status of a message (Sent, Delivered, Read, Failed) is kept in the delivery log of the Notifications module.

**Read record**

| Field             | Type            | Required | Notes                   |
|-------------------|-----------------|----------|-------------------------|
| read_id           | Unique ID       | Yes      | System generated        |
| message_id        | Link to Message | Yes      |                         |
| recipient_user_id | Link to User    | Yes      |                         |
| first_read_at     | Date and time   | Yes      | UTC. Cannot be changed. |

**Draft**

| Field     | Type           | Required | Notes                                              |
|-----------|----------------|----------|----------------------------------------------------|
| draft_id  | Unique ID      | Yes      | System generated                                   |
| user_id   | Link to User   | Yes      |                                                    |
| thread_id | Link to Thread | No       | Set for a reply                                    |
| subject   | Text           | No       |                                                    |
| body      | Text           | No       | A draft can be edited and deleted until it is sent |
| saved_at  | Date and time  | Yes      | UTC                                                |

**Report**

| Field               | Type            | Required | Notes                     |
|---------------------|-----------------|----------|---------------------------|
| report_id           | Unique ID       | Yes      | System generated          |
| message_id          | Link to Message | Yes      |                           |
| reported_by_user_id | Link to User    | Yes      |                           |
| category            | Choice          | Yes      | Threat, Harassment, Other |
| note                | Text            | No       | Up to 500 characters      |
| reported_at         | Date and time   | Yes      | UTC. Cannot be changed.   |

**AI settings**

| Field               | Type         | Required | Notes                                                   |
|---------------------|--------------|----------|---------------------------------------------------------|
| user_id             | Link to User | Yes      |                                                         |
| tone_check_on       | Yes or No    | Yes      | Default No                                              |
| shield_on           | Yes or No    | Yes      | Default No                                              |
| shield_level        | Choice       | Yes      | Low, Medium, High. Medium when the shield is turned on. |
| rewrite_on          | Yes or No    | Yes      | Default No (Phase 2)                                    |
| coach_on            | Yes or No    | Yes      | Default No (Phase 3)                                    |
| urgent_detection_on | Yes or No    | Yes      | Default No (Phase 3)                                    |

**Hold label (display only, not part of the record)**

| Field             | Type            | Required | Notes                                                |
|-------------------|-----------------|----------|------------------------------------------------------|
| message_id        | Link to Message | Yes      |                                                      |
| recipient_user_id | Link to User    | Yes      |                                                      |
| reason            | Choice          | Yes      | Threat or abuse, Insult or attack, Blame or pressure |
| held_at           | Date and time   | Yes      | UTC                                                  |
| reported_wrong    | Yes or No       | Yes      | Default No                                           |

**Entities of later phases (field names only).** Folder: folder_id, user_id, name. Folder assignment: thread_id, folder_id, user_id. Attachment: attachment_id, message_id, file_name, file_type, size_bytes, file_id. Group member: thread_id, user_id, added_by_user_id, added_at. Coach chat: chat_id, user_id, started_at (private, not in the record). Mediation: mediation_id, household_id, partner_id, status, started_at, ended_at.

Records and Court and Notifications use the thread, the message, the read record and the report, so raise change request CR-04 to add them to Common BRD section 8 (Common BRD section 13).

## 9. Screens

Each screen needs the four designed states: empty, loading, error and success (Common BRD 11.1). Wireframe links and button labels are added when the wireframes are agreed.

| ID     | Screen                                                   | Feature                | Phase           | Wireframe |
|--------|----------------------------------------------------------|------------------------|-----------------|-----------|
| SCR-01 | Thread list                                              | MSG-01                 | MVP (web)       | \[link\]  |
| SCR-02 | Thread and message view, with the status of each message | MSG-01, MSG-02, MSG-03 | MVP (web)       | \[link\]  |
| SCR-03 | New message and reply                                    | MSG-01, MSG-04         | MVP (web)       | \[link\]  |
| SCR-04 | Drafts                                                   | MSG-01                 | MVP (web)       | \[link\]  |
| SCR-05 | AI settings (tone check, shield and level)               | MSG-04, MSG-06         | MVP (web)       | \[link\]  |
| SCR-06 | Held message                                             | MSG-06                 | MVP (web)       | \[link\]  |
| SCR-07 | Report a message                                         | MSG-14                 | MVP (web)       | \[link\]  |
| SCR-08 | Search                                                   | MSG-07                 | Phase 2 (web)   | \[link\]  |
| SCR-09 | Folders and topics                                       | MSG-08                 | Phase 2 (web)   | \[link\]  |
| SCR-10 | Attachments in the message form                          | MSG-09                 | Phase 2 (web)   | \[link\]  |
| SCR-11 | Group thread members                                     | MSG-10                 | Phase 3 (later) | \[link\]  |
| SCR-12 | AI coach                                                 | MSG-11                 | Phase 3 (later) | \[link\]  |
| SCR-13 | Mediation request                                        | MSG-12                 | Phase 3 (later) | \[link\]  |

## 10. Messages and errors

Wording is a draft. It is written for English first, and final wording is approved before build (Common BRD 11.2). Spanish text is added when the language feature is built. Alerts about messages are owned by the Notifications BRD and show the name of the sender and no message text.

**Errors**

| ID     | When it shows                                                                 | Text                                                                                   | Used by                                                |
|--------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|--------------------------------------------------------|
| ERR-01 | A message is longer than 10,000 characters                                    | Your message is too long. Keep it under 10,000 characters.                             | FR-MSG-01-03                                           |
| ERR-02 | A message cannot be sent                                                      | We could not send your message. It is saved as a draft. Please try again.              | FR-MSG-01-12                                           |
| ERR-03 | A message has no subject                                                      | Enter a subject for this message.                                                      | FR-MSG-01-13                                           |
| ERR-04 | Someone tries to edit, delete or un-send a sent message                       | A sent message cannot be changed or deleted.                                           | FR-MSG-02-06                                           |
| ERR-05 | A search fails                                                                | We could not run your search. Please try again.                                        | FR-MSG-07-07                                           |
| ERR-06 | A setting, a topic, a report, a member or a mediation request cannot be saved | We could not save your change. Nothing was changed. Please try again.                  | FR-MSG-08-07, FR-MSG-10-09, FR-MSG-12-09, FR-MSG-14-09 |
| ERR-07 | A message has more than 5 files or more than 25 MB                            | Send up to 5 files, 25 MB in all.                                                      | FR-MSG-09-09                                           |
| ERR-08 | A file has a type that is not allowed                                         | This file type is not allowed. Use JPG, PNG, PDF or DOCX.                              | FR-MSG-09-02                                           |
| ERR-09 | A file fails the malware scan                                                 | We could not send this file because it did not pass our safety check.                  | FR-MSG-09-03                                           |
| ERR-10 | A household is over the storage limit                                         | You are over the storage limit of your plan. You can still read and export your files. | FR-MSG-09-06                                           |
| ERR-11 | A folder name or a report note is too long                                    | That is too long. Use up to the number of characters shown.                            | FR-MSG-08-01, FR-MSG-14-01                             |

**Messages**

| ID      | When it shows                            | Text                                                                                                                      | Feature                                |
|---------|------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| MSGT-01 | A draft is saved                         | Your draft was saved.                                                                                                     | MSG-01                                 |
| MSGT-02 | The tone check finds a concern           | This message may sound hostile. You can edit it or send it as it is.                                                      | MSG-04                                 |
| MSGT-03 | The tone check is not available          | The tone check is not available now. You can still send your message.                                                     | MSG-04                                 |
| MSGT-04 | A message is held                        | Message held from \[name\] at \[time\]. Reason: \[reason\]. Tap to read it.                                               | MSG-06                                 |
| MSGT-05 | The shield is not available              | The message shield is not available now. Messages show as they are.                                                       | MSG-06                                 |
| MSGT-06 | A report is saved                        | Your report was saved. The other parent is not told.                                                                      | MSG-14                                 |
| MSGT-07 | A report in the category Threat is saved | If you are in danger, call 911. \[Help and support links approved by advocates.\]                                         | MSG-14                                 |
| MSGT-08 | A search has no result                   | No messages match your search.                                                                                            | MSG-07                                 |
| MSGT-09 | A user turns on an AI feature            | The AI reads \[what it reads\]. It does not use your messages for training. What it suggests is not saved in your record. | MSG-04, MSG-05, MSG-06, MSG-11, MSG-13 |
| MSGT-10 | AI rewrite is not available              | The AI rewrite is not available now. Your draft is unchanged.                                                             | MSG-05                                 |
| MSGT-11 | The coach opens                          | The AI coach is not a lawyer or a therapist and does not give legal advice.                                               | MSG-11                                 |
| MSGT-12 | An urgent label shows                    | Marked urgent. May be urgent.                                                                                             | MSG-13                                 |
| MSGT-13 | Only one parent agrees to mediation      | Both parents must agree before mediation starts.                                                                          | MSG-12                                 |
| MSGT-14 | A sensitive image is hidden              | Image hidden. Tap to view.                                                                                                | MSG-09                                 |
| MSGT-15 | The coach is not available               | The AI coach is not available now. Please try again later.                                                                | MSG-11                                 |

## 11. Interfaces

All interfaces except INT-08 and INT-09 are with other modules of the app.

| ID     | With                     | What passes                                                                                                                                  | Features                               | Phase                                       | Source                                |
|--------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|---------------------------------------------|---------------------------------------|
| INT-01 | Notifications            | Message events go out. Alerts go to the users. The status of each message (Sent, Delivered, Read, Failed) comes in and shows on the message. | MSG-01, MSG-03                         | MVP (web)                                   | Scope document 7.4; Notifications BRD |
| INT-02 | Safety and Privacy       | The Safety Mode flag, the AI privacy controls (SAF-03), and the preview and sensitive-image controls (SAF-02) come in.                       | MSG-03, MSG-04, MSG-06, MSG-09, MSG-12 | MVP (web)                                   | Scope document 7.4                    |
| INT-03 | Records and Court        | Threads, messages, read times, attachments and reports go out.                                                                               | MSG-01, MSG-02, MSG-03, MSG-09, MSG-14 | MVP (web)                                   | Scope document 7.4                    |
| INT-04 | Accounts and Onboarding  | The household mode, a co-parent who is not on the app (ACC-04) and the roles come in. Third party and Child access comes with ACC-07.        | MSG-01, MSG-10                         | MVP (web). ACC-07 in Phase 2.               | Accounts BRD                          |
| INT-05 | Billing and Plans        | The plan of the household comes in for AI rewrite, the AI coach and the storage limit.                                                       | MSG-05, MSG-09, MSG-11                 | Phase 2 (web)                               | Billing BRD, decision Q-01            |
| INT-06 | Children and Documents   | Attachments go to the household files (DOC-02).                                                                                              | MSG-09                                 | Phase 2 (web)                               | Scope document 7.10                   |
| INT-07 | Professionals and Access | Threads and reports that a parent shares go out as read-only.                                                                                | MSG-02, MSG-14                         | Phase 2 (web)                               | Scope document 7.11 (PRO-01)          |
| INT-08 | AI service               | Drafts, incoming messages, questions and urgent checks go to it, and the results come back. All AI use is opt-in.                            | MSG-04, MSG-05, MSG-06, MSG-11, MSG-13 | MVP (web) for the tone check and the shield | Scope document 11; BR-11              |
| INT-09 | Mediation partner        | Mediation requests go to the partner mediators.                                                                                              | MSG-12                                 | Phase 3 (later)                             | Scope document decision 27            |

## 12. Dependencies and assumptions

**12.1 This module needs** (Scope document 7.4): Notifications, Safety and Privacy (AI controls), Records and Court (exports), and Accounts and Onboarding (non-user messaging).

**12.2 Modules that need this module** (Common BRD section 4).

| Module                      | What it needs from Messaging                                                              |
|-----------------------------|-------------------------------------------------------------------------------------------|
| Notifications               | Message events for alerts and status                                                      |
| Records and Court           | Messages for the court-ready record                                                       |
| Safety and Privacy          | The AI features and the messages that Safety Mode controls                                |
| Billing and Plans           | The definition of the tone check, the shield and the report tool that every plan includes |
| Calendar and Parenting Time | Messages to talk about a schedule change request (no data passes)                         |

The Common BRD build order places Messaging after Notifications.

**12.3 Assumptions**

- The first release is a web app. Mobile follows (Scope document 4.4).

- Module names are working names (Scope document 4.4).

- The phase for each feature is a proposal, not a commitment (Scope document 4.4).

- Access levels for roles are proposals (Scope document 5).

- Screens, messages and AI features are in English in the MVP (Accounts BRD, decision Q-01).

- The vendor pages named in section 15 describe the apps on October 12, 2026 and can change.

## 13. Non-functional requirements

These are shared requirements from Common BRD section 10. No module-only requirement is proposed.

| ID     | Requirement                                                                                                         | Where it applies here                                       | Status   |
|--------|---------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|----------|
| NFR-02 | Encryption in transit and at rest                                                                                   | Messages, attachments, drafts, reports and AI settings      | Proposed |
| NFR-03 | Role-based access on every request                                                                                  | FR-MSG-01-11, FR-MSG-02-04, FR-MSG-14-03                    | Proposed |
| NFR-05 | Records cannot be edited. A change is a new entry.                                                                  | FR-MSG-02-01, FR-MSG-03-04, FR-MSG-14-08                    | Proposed |
| NFR-06 | Collect only the data that is needed                                                                                | FR-MSG-04-07, FR-MSG-11-03 (the AI sees only what it needs) | Proposed |
| NFR-09 | Plain language on every screen. The standard is to be chosen. Scope document section 10 proposes WCAG 2.2 level AA. | All screens                                                 | Open     |
| NFR-11 | English only in the MVP. Spanish in Phase 2 (Accounts BRD, decision Q-01).                                          | All screens, messages and AI features                       | Proposed |

## 14. Risks

| ID     | Risk                                               | Why it matters                                                                                                                | Response                                                                                                                                                                                                     | Source                                     |
|--------|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| RSK-01 | Court acceptance is not guaranteed                 | Apps state that their records are court-ready, and BestInterest says admissibility depends on the facts and the jurisdiction. | Say court-ready records and never court approved. Get a legal review before launch.                                                                                                                          | P16; Scope document decision 7             |
| RSK-02 | The AI misjudges a message                         | BestInterest says its AI can misclassify a message. A message that is held by mistake could matter.                           | The shield only holds and labels. One tap shows the original, which stays in the record. The user sets the level. Reports of wrong holds track the error rate. If the AI is down, messages show as they are. | Scope document decision 22; P12            |
| RSK-03 | A held message hides a fact about the child        | A held message may carry a pick-up change or a medical note.                                                                  | The alert still names the sender, the unread steps to SMS and email continue, and the original opens with one tap. Urgent labels come in Phase 3.                                                            | Notifications BRD; BA note                 |
| RSK-04 | Parents worry that AI reads their messages         | This is a stated pain point.                                                                                                  | AI is off by default, each AI feature has its own switch, a notice says what the AI sees, there is no training on messages, and suggestions stay out of the record.                                          | P15; BR-11                                 |
| RSK-05 | Messages are used to harass or pressure a parent   | A hostile parent can send abuse. Blocking would break the record.                                                             | The shield, the report tool on every plan, and Safety Mode. The system does not offer blocking.                                                                                                              | Scope document 12; BR-05; decision Q-21    |
| RSK-06 | The safety notice or its links are wrong           | A wrong link could harm a parent in danger.                                                                                   | Advocates approve the text and the links before release.                                                                                                                                                     | Scope document decision 6                  |
| RSK-07 | The review team sees private messages              | A report of a wrong hold or a wrong label shares one message.                                                                 | Only with the consent of the user and only that one message. Otherwise support staff cannot read messages.                                                                                                   | Common BRD 7.1; Scope document decision 22 |
| RSK-08 | The values recommended by the BA are not confirmed | The limits for text and files, the shield levels and the topic list come from the BA, not from the sources.                   | The Manager confirms them before launch (section 15).                                                                                                                                                        | Decisions Q-06, Q-09, Q-10, Q-22           |
| RSK-09 | Messages stay after an account closes              | BR-21 lets other data be deleted on request, and decision Q-02 keeps messages for the co-parent.                              | Legal confirms the rule. The Accounts BRD still has the question open (CR-06).                                                                                                                               | BR-21; Accounts BRD                        |
| RSK-10 | The comparison evidence for MSG-02 is missing      | The Feature Comparison workbook has no row for messages that cannot be edited or deleted.                                     | The type rests on P16 and the vendor pages in section 15.                                                                                                                                                    | Feature Comparison workbook; P16           |

## 15. Decisions and open questions

**15.1 Decisions recorded on October 12, 2026.** Every question in this BRD has an answer, so no question is open. The BA looked at how OurFamilyWizard, TalkingParents, BestInterest and AppClose solve each point, and recommends the best fit. The table names the app or the page behind each decision. Values marked BA proposal come from the BA and not from another app. The Manager confirms the recommendations.

| Q    | Decision                                                                                                                                                                                                                                                                                                   | How it was decided                                                                                                                                                                                                                                                                                   | Values and detail                                                                                                                                     | Confirm with       |
|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| Q-01 | A message starts a thread with a required subject. Replies keep the subject. The thread list shows the latest message first, and a thread shows messages from the oldest to the newest.                                                                                                                    | OurFamilyWizard help pages (a message has a subject, recipients and a text, and a clear subject makes it easier to find) and the BestInterest store listing (messages in order from the oldest to the newest). Requiring a subject is a BA proposal.                                                 | None                                                                                                                                                  | Manager            |
| Q-02 | A sent message cannot be edited, deleted or un-sent, even if it is unread. A draft can be edited and deleted. A correction is a new message. When an account closes, its messages stay for the co-parent.                                                                                                  | OurFamilyWizard (sent messages cannot be edited, deleted or un-sent, and drafts can be changed) and TalkingParents (messages cannot be edited or deleted, and an account cannot be deleted once matched).                                                                                            | The Accounts BRD still has its question Q-21 open. This decision answers it for messages (CR-06).                                                     | Manager, legal     |
| Q-03 | Every message has a sent time and a first-read time for each recipient. Both parents see both times, and exports include them.                                                                                                                                                                             | OurFamilyWizard (a date and time when sent and when first read, also in the PDF) and TalkingParents (messages and read receipts are time-stamped).                                                                                                                                                   | In Safety Mode the first-read time is hidden from the sender (Notifications BRD).                                                                     | Manager            |
| Q-04 | The tone check is advice only. It reviews a draft when the sender chooses Send, highlights phrases with a short reason, and offers Edit or Send anyway. It is private, not saved, and never blocks. It is off until the user turns it on.                                                                  | OurFamilyWizard (ToneMeter flags charged phrases and offers optional suggestions), TalkingParents (a scan before sending, and a user cannot scan the messages of the co-parent) and BestInterest (reviews a message before it is sent).                                                              | None                                                                                                                                                  | Manager            |
| Q-05 | AI rewrite is optional, has its own switch that is off by default, and the user edits or ignores the suggestion. The suggestion is not saved. It is on the Household plan.                                                                                                                                 | OurFamilyWizard (Writing Assistant, and a suggestion can be edited) and TalkingParents (Writing Assist). Billing BRD decision Q-01 makes AI rewrite a paid extra.                                                                                                                                    | None                                                                                                                                                  | Manager            |
| Q-06 | The shield is off until the user turns it on. It holds a message that crosses the chosen level and shows the sender, the time, Message held and the reason. One tap shows the original. It never deletes or blocks. The sender is not told. It also covers replies from a co-parent who is not on the app. | BestInterest (Message Shield screens incoming messages before the user sees them, the user can read the original later, and it works when the co-parent does not join), coParenter (AI filters) and Scope decision 22. BestInterest also rewrites a message in a neutral voice. ParentPath does not. | Three levels (BA proposal): Low holds threats and abuse. Medium (the default) adds insults and attacks. High adds blame, sarcasm and pressure.        | Manager, advocates |
| Q-07 | The report tool lets a parent report a message from the co-parent as Threat, Harassment or Other with a note. The report is a private marker in the record of that parent. It goes to nobody. For Threat a safety notice shows.                                                                            | BR-05 and Scope document 12 put report tools in every plan. The compared apps do not describe a report tool, so this is a BA proposal.                                                                                                                                                               | Note up to 500 characters. The safety text and links are approved with advocates.                                                                     | Manager, advocates |
| Q-08 | Search works by keyword, date range and sender. A held message shows no extract until it is opened.                                                                                                                                                                                                        | OurFamilyWizard (filter by keyword or folder) and AppClose (search by date or keyword).                                                                                                                                                                                                              | None                                                                                                                                                  | Manager            |
| Q-09 | A user has personal folders that the other parent does not see. A thread can also have a shared topic.                                                                                                                                                                                                     | OurFamilyWizard (each user customizes folders) and TalkingParents (organize by topic).                                                                                                                                                                                                               | Topics (BA proposal): Schedule, Health, School, Expenses, Other. Folder names up to 60 characters.                                                    | Manager            |
| Q-10 | Attachments.                                                                                                                                                                                                                                                                                               | OurFamilyWizard (pictures, documents and files, which cannot be removed once attached and are added to the files of the family), TalkingParents (attachments) and AppClose (documents).                                                                                                              | Up to 5 files and 25 MB in all. JPG, PNG, PDF and DOCX. A malware scan. All are BA proposals. Attachments count toward the storage limit of the plan. | Manager, IT        |
| Q-11 | A parent can message a Third party or a Child account and can start a group thread. A Third party answers only in the threads they are added to. A thread with a Child account includes both parents.                                                                                                      | OurFamilyWizard (messages to child and third-party accounts) and AppClose (group chats within a Circle).                                                                                                                                                                                             | The rules for a child thread and for a person added later are BA proposals.                                                                           | Manager            |
| Q-12 | The AI coach is a private chat, off until the user turns it on, not in the record, and a paid extra.                                                                                                                                                                                                       | BestInterest (AI Co-Parenting Coach) and Kidtime (an AI co-parenting wizard that is a paid feature).                                                                                                                                                                                                 | CR-02 adds the coach to the paid extras of the Billing BRD.                                                                                           | Manager            |
| Q-13 | Mediation is by licensed mediators of a partner. Both parents must agree. The mediator sees only the threads the parents share. It is not offered in Safety Mode.                                                                                                                                          | coParenter (on-demand mediation and counseling) and Scope decision 27 (partner with licensed mediators, decide after the MVP).                                                                                                                                                                       | CR-03 lets a mediator answer in the mediation thread.                                                                                                 | Manager, legal     |
| Q-14 | A sender can mark a message Urgent. AI detection is optional and only labels. It never hides or blocks. It is released after the Manager accepts the error rate of a test.                                                                                                                                 | BestInterest (Emergency Detection, and its AI can misclassify) and Scope decision 22.                                                                                                                                                                                                                | Urgent messages alert by push and SMS at once (CR-05).                                                                                                | Manager            |
| Q-15 | A co-parent who is not on the app gets texts and emails, and the replies join the same thread. The shield and the tone check apply.                                                                                                                                                                        | AppClose (Solo sends to people who are not on the app) and BestInterest (works when the co-parent does not join).                                                                                                                                                                                    | None                                                                                                                                                  | Manager            |
| Q-16 | The status of a message follows the Notifications BRD: Sent, Delivered, Read, Failed.                                                                                                                                                                                                                      | Notifications BRD decisions Q-09 and Q-12.                                                                                                                                                                                                                                                           | None                                                                                                                                                  | Manager            |
| Q-17 | The record has every message with its sent and first-read time and its attachments, and the reports of the parent who exports. It does not have tone feedback, AI suggestions, coach chats or holds. Exports are free.                                                                                     | OurFamilyWizard (messages download or print with first-viewed times) and TalkingParents (a PDF record with a digital signature and a code). BR-05 keeps exports free.                                                                                                                                | The export format is owned by Records and Court.                                                                                                      | Manager, legal     |
| Q-18 | Before each AI feature turns on, a plain notice says what the AI sees. There is no training on messages, and AI results stay out of the record.                                                                                                                                                            | BR-11 and P15. AppClose says its AI runs on a private model and BestInterest says it does not sell data.                                                                                                                                                                                             | SAF-03 owns the privacy screen.                                                                                                                       | Manager, Security  |
| Q-19 | The tone check, the shield and the other AI features work in English first. Spanish comes after native speakers test it.                                                                                                                                                                                   | Accounts BRD decision Q-01 and Scope decision 10.                                                                                                                                                                                                                                                    | None                                                                                                                                                  | Manager            |
| Q-20 | In Safety Mode the first-read time is hidden from the sender, alerts have no details, mediation is not offered, and the report tool stays.                                                                                                                                                                 | BR-22; Notifications BRD decision Q-09.                                                                                                                                                                                                                                                              | Advocates confirm.                                                                                                                                    | Manager, advocates |
| Q-21 | The system does not offer blocking. The shield and the report tool help instead.                                                                                                                                                                                                                           | OurFamilyWizard and TalkingParents offer no block, and a block would hide part of the record. This is a BA recommendation.                                                                                                                                                                           | None                                                                                                                                                  | Manager, legal     |
| Q-22 | A message is plain text of up to 10,000 characters.                                                                                                                                                                                                                                                        | BA proposal.                                                                                                                                                                                                                                                                                         | None                                                                                                                                                  | Manager            |
| Q-23 | Each AI feature has its own switch and it is off by default.                                                                                                                                                                                                                                               | BR-11 and Scope decision 22.                                                                                                                                                                                                                                                                         | None                                                                                                                                                  | Manager            |
| Q-24 | Legal reviews the export wording, the AI terms, the mediation terms and the safety notice before each goes live.                                                                                                                                                                                           | BA recommendation. Scope decision 7.                                                                                                                                                                                                                                                                 | None                                                                                                                                                  | Legal              |
| Q-25 | Each module BRD starts its SCR, ERR, MSGT and INT numbers at 01. A reference from another BRD names the module.                                                                                                                                                                                            | The same rule as in the Notifications BRD (decision Q-14 there).                                                                                                                                                                                                                                     | The Accounts BRD (Q-18) still shows this question as open.                                                                                            | BA lead            |

**15.2 Change requests to other documents.** Common BRD section 13 asks for the item, the change and the reason.

| ID    | Document and item                        | Change                                                                                                 | Reason                                         |
|-------|------------------------------------------|--------------------------------------------------------------------------------------------------------|------------------------------------------------|
| CR-01 | Scope and Modules Document, feature list | Add MSG-14 Report a message as a Must-have feature in the MVP.                                         | The Billing BRD needs the report tool defined. |
| CR-02 | Billing BRD, FR-BIL-01-04                | Add the AI coach to the paid extras.                                                                   | Decision Q-12                                  |
| CR-03 | Common BRD 7.1 and 7.2                   | Let a Third party answer in a thread (CR on messages) and let a mediator answer in a mediation thread. | Decisions Q-11 and Q-13                        |
| CR-04 | Common BRD section 8                     | Add the entities Thread, Message, Read record and Report.                                              | Records and Court and Notifications use them.  |
| CR-05 | Notifications BRD                        | When MSG-13 ships, an urgent message alerts by push and SMS at once.                                   | Decision Q-14                                  |
| CR-06 | Accounts BRD, Q-21                       | Record that sent messages stay for the co-parent when an account closes.                               | Decision Q-02                                  |

## 16. Traceability

Test cases are written by QA from the acceptance criteria, using the format TC-MSG-01-01. The pain point column shows P11 for MSG-01 because the Pain Point workbook names Messaging as a module for P11, and shows a related pain point for MSG-03 and MSG-04.

| Feature           | Pain point         | Business requirement | User story   | Functional requirements | Acceptance criteria |
|-------------------|--------------------|----------------------|--------------|-------------------------|---------------------|
| MSG-01            | P11                | BREQ-01              | US-MSG-01-01 | FR-MSG-01-01 to 13      | AC-MSG-01-01 to 12  |
| MSG-02            | P16                | BREQ-02              | US-MSG-02-01 | FR-MSG-02-01 to 06      | AC-MSG-02-01 to 06  |
| MSG-03            | P16 (related)      | BREQ-03              | US-MSG-03-01 | FR-MSG-03-01 to 07      | AC-MSG-03-01 to 07  |
| MSG-04            | P12, P13 (related) | BREQ-04              | US-MSG-04-01 | FR-MSG-04-01 to 09      | AC-MSG-04-01 to 08  |
| MSG-05            | P15                | BREQ-05              | US-MSG-05-01 | FR-MSG-05-01 to 08      | AC-MSG-05-01 to 08  |
| MSG-06            | P12, P13           | BREQ-06              | US-MSG-06-01 | FR-MSG-06-01 to 13      | AC-MSG-06-01 to 12  |
| MSG-07            | None linked        | BREQ-07              | US-MSG-07-01 | FR-MSG-07-01 to 07      | AC-MSG-07-01 to 07  |
| MSG-08            | None linked        | BREQ-08              | US-MSG-08-01 | FR-MSG-08-01 to 07      | AC-MSG-08-01 to 07  |
| MSG-09            | None linked        | BREQ-09              | US-MSG-09-01 | FR-MSG-09-01 to 09      | AC-MSG-09-01 to 09  |
| MSG-10            | None linked        | BREQ-10              | US-MSG-10-01 | FR-MSG-10-01 to 09      | AC-MSG-10-01 to 09  |
| MSG-11            | P15                | BREQ-11              | US-MSG-11-01 | FR-MSG-11-01 to 08      | AC-MSG-11-01 to 08  |
| MSG-12            | None linked        | BREQ-12              | US-MSG-12-01 | FR-MSG-12-01 to 09      | AC-MSG-12-01 to 09  |
| MSG-13            | None linked        | BREQ-13              | US-MSG-13-01 | FR-MSG-13-01 to 10      | AC-MSG-13-01 to 10  |
| MSG-14 (proposed) | None linked        | BREQ-14              | US-MSG-14-01 | FR-MSG-14-01 to 09      | AC-MSG-14-01 to 09  |

## 17. Readiness check

Checks come from the definition of ready in Common BRD section 12.

| Check                                                                                                                                                      | Status                                                                                                         |
|------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| The module BRD is approved                                                                                                                                 | No. Version v1.0 is final text and waits for the confirmation of the Manager and the sign-off of the approver. |
| Every requirement has an ID, a source, a priority and acceptance criteria                                                                                  | Yes. Confirm in peer BA and QA review.                                                                         |
| No TBC remains in a Must requirement                                                                                                                       | Yes. No question is open.                                                                                      |
| The recommendations of the BA are confirmed by the Manager (Q-01, Q-06, Q-07, Q-09 to Q-14, Q-17, Q-21, Q-22)                                              | No.                                                                                                            |
| Advocates review the shield levels and reasons, the Threat notice, the Read-status rule and the rule for mediation in Safety Mode (Q-06, Q-07, Q-13, Q-20) | No. They are part of the Safety Mode review.                                                                   |
| Legal reviews the export wording, the AI terms, the mediation terms and the safety notice (Q-24)                                                           | No.                                                                                                            |
| Fields, statuses, messages and errors are written out                                                                                                      | Yes. The entity fields in section 8.2 are a BA proposal.                                                       |
| The wireframe is linked and agreed                                                                                                                         | No. Links in section 9 are placeholders.                                                                       |
| Change requests CR-01 to CR-06 are approved                                                                                                                | No.                                                                                                            |

Review steps (Common BRD 13): author self-check, peer BA review, QA review for testability, developer or technical review, approver sign-off.
