# Module BRD: Notifications (NTF)

ParentPath \| Module BRD \| v1.0

This BRD follows the Common BRD. Shared roles, data entities, shared rules, non-functional requirements and standards are not repeated here. This document points to them by ID. This version has no open question. It is approved when the approver signs it off. Priority uses Must for Must-have features and Should for Good-to-have features. This module has no Unique features. Requirements use shall for Must and should for Should. Question numbers (Q) and change request numbers (CR) are local to this BRD. SCR, ERR, MSGT and INT numbers also start at 01 in each module BRD. A reference from another BRD names the module, for example Notifications ERR-01 (decision Q-14).

## 1. Document control

| Field            | Detail                                                                                                                                                                                                                      |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Project          | ParentPath                                                                                                                                                                                                                  |
| Document         | Module BRD: Notifications                                                                                                                                                                                                   |
| Module prefix    | NTF                                                                                                                                                                                                                         |
| Version          | v1.0                                                                                                                                                                                                                        |
| Status           | Final. Decisions of October 10, 2026 recorded. Approver sign-off pending.                                                                                                                                                   |
| Author           | \[Name, role\]                                                                                                                                                                                                              |
| Reviewers        | \[Names\]                                                                                                                                                                                                                   |
| Approver         | \[Name\]                                                                                                                                                                                                                    |
| Date             | October 10, 2026                                                                                                                                                                                                            |
| Source documents | Common BRD (Sample v1.0), Scope and Modules Document v1.0 (Draft), Pain Point workbook (data as of September 30, 2026), Feature Comparison workbook (Updated), Accounts and Onboarding BRD v0.3, Billing and Plans BRD v0.1 |

**Change log**

| Version | Date             | Author   | What changed                                                                                                                                                                                                          | Reason                                         |
|---------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| v0.1    | October 10, 2026 | \[Name\] | First draft                                                                                                                                                                                                           | New                                            |
| v1.0    | October 10, 2026 | \[Name\] | Recorded the decisions for Q-01 to Q-14. Added FR-NTF-01-11, FR-NTF-02-09, FR-NTF-02-10, FR-NTF-04-11, FR-NTF-04-12 and FR-NTF-06-07 with acceptance criteria. Made NTF-06 a Must-have feature. Closed all questions. | Answers from the requester on October 10, 2026 |

## 2. Purpose and scope

**2.1 Purpose.** This module makes sure a parent actually sees what matters. Missed alerts were a repeated complaint about existing apps, and a missed message can have real consequences.

**2.2 Objectives this module supports.** Objective IDs come from Common BRD section 2.3.

| ID     | How this module supports it                                                                                             |
|--------|-------------------------------------------------------------------------------------------------------------------------|
| OBJ-01 | The delivery log is part of the court-ready record (NTF-02).                                                            |
| OBJ-02 | Reminders for hearings and due dates from the agency record (NTF-04). Sync phase 1 needs NTF-04 from the first release. |
| OBJ-03 | Fixes the High-rated pain points P05 and P22 in the first release (NTF-01, NTF-02, NTF-04).                             |
| OBJ-05 | Alerts for a user in Safety Mode carry no preview text (BR-22).                                                         |

**2.3 In scope.** The six features NTF-01 to NTF-06 listed in section 5. NTF-06 is a send service that other modules need. It was added by decision Q-05 (CR-01 in section 15).

**2.4 Out of scope for this BRD.** These items belong to another module or to a later decision.

| Item                                                                   | Where it belongs                                                                                 |
|------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| Message content, the tone check and the incoming message shield        | Messaging (MSG).                                                                                 |
| Calendar events and swap requests                                      | Calendar and Parenting Time (CAL). This module only sends the reminders.                         |
| The case link and agency data                                          | Child Support Sync (CSS). This module sends the reminders for hearings, deadlines and due dates. |
| The design of Safety Mode and the preview and sensitive-image controls | Safety and Privacy (SAF-01, SAF-02). This module follows the Safety Mode flag.                   |
| Urgent-message detection                                               | MSG-13, Phase 3.                                                                                 |
| Alerts to third parties and group chat                                 | MSG-10, Phase 3.                                                                                 |
| The export format of the delivery log                                  | Records and Court (REC).                                                                         |
| Push alerts in iOS and Android apps                                    | Mobile phase.                                                                                    |
| Agency staff as users                                                  | Out of scope for now (Scope document 4.2, decision 13).                                          |

**2.5 Release phases of this module.** MVP (web): NTF-01, NTF-02, NTF-04 and NTF-06. Phase 2 (web): NTF-03. Phase 3 (later): NTF-05. The phase of each feature is a proposal (Scope document 4.4).

## 3. Users and roles

Roles are defined in Common BRD 7.1 and the shared permission matrix is in Common BRD 7.2. The table shows what each role does in this module.

| Role                                               | What they do in this module                                                                                                                                    |
|----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Parent                                             | Gets alerts and reminders, sees the status of messages, sets the SMS and email wait times and runs the health check. In Phase 3 sets quiet windows and limits. |
| Co-parent                                          | The same as the Parent, once linked.                                                                                                                           |
| Co-parent who is not on the app                    | Gets texts and emails through the send service (NTF-06). Has no account.                                                                                       |
| Platform admin                                     | Runs the system. Access is logged (Common BRD 7.1).                                                                                                            |
| Support staff, Third party, Child and Professional | No feature in this module.                                                                                                                                     |

Permissions for module data: the sender of a message sees its status. The delivery log is part of the record and follows the sharing rules of Records and Court (Common BRD 7.2, row Records and exports). Common BRD 7.2 has no separate row for the delivery log.

## 4. Business requirements

| ID      | Business requirement                                                                                             | Features | Source                                      | Priority | Phase           |
|---------|------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------------|----------|-----------------|
| BREQ-01 | A parent is alerted by push, then by SMS and email if a message stays unread.                                    | NTF-01   | Scope document 7.3; P05                     | Must     | MVP (web)       |
| BREQ-02 | A parent sees the sent, delivered and read status of every message, and the status is saved in the record.       | NTF-02   | Scope document 7.3; P05; BR-07              | Must     | MVP (web)       |
| BREQ-03 | A parent can check whether alerts can reach them.                                                                | NTF-03   | Scope document 7.3; P05                     | Should   | Phase 2 (web)   |
| BREQ-04 | Parents are reminded of events, hearings and due dates.                                                          | NTF-04   | Scope document 7.3; P22                     | Must     | MVP (web)       |
| BREQ-05 | A parent can set quiet windows and limits on the number of alerts.                                               | NTF-05   | Scope document 7.3                          | Should   | Phase 3 (later) |
| BREQ-06 | Codes, links, invites and messages sent by text or email reach people, and the sending module learns the result. | NTF-06   | Accounts BRD (INT-01); Billing BRD (INT-03) | Must     | MVP (web)       |

## 5. Feature summary

Type rules (tests 1 to 3) are in Scope document 1.3. App counts are out of the 10 co-parenting apps in the Feature Comparison workbook (Cozi is not counted).

| ID     | Feature                                                                  | Type         | Priority | Phase           | Pain point  | Why this type                                                                                                                                                                                               |
|--------|--------------------------------------------------------------------------|--------------|----------|-----------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| NTF-01 | Multi-channel alerts: push, then SMS and email if a message stays unread | Must-have    | Must     | MVP (web)       | P05         | Core fix for High pain point P05 (test 2). No comparison row.                                                                                                                                               |
| NTF-02 | Delivery and read status on every message, logged in the record          | Must-have    | Must     | MVP (web)       | P05         | Core fix for P05 (test 2). Related row Read receipts or viewed time: 4 of 10 apps list it (OurFamilyWizard, TalkingParents, AppClose, Custody X Change). SupportPay with WeParent lists it in part.         |
| NTF-03 | Notification health check in settings                                    | Good-to-have | Should   | Phase 2 (web)   | P05         | Meets none of the three tests. No comparison row.                                                                                                                                                           |
| NTF-04 | Event and deadline reminders                                             | Must-have    | Must     | MVP (web)       | P22         | Core fix for High pain point P22 (test 2), and Sync phase 1 needs it (test 3). Test 1 is not met: 3 of 10 apps list event reminders (TalkingParents, AppClose, Custody X Change). 2houses lists it in part. |
| NTF-05 | Notification quiet windows or limits                                     | Good-to-have | Should   | Phase 3 (later) | None linked | Meets none of the three tests. 1 of 10 apps lists it (BestInterest, Smart Silence).                                                                                                                         |
| NTF-06 | Send service for account, invite and payment messages                    | Must-have    | Must     | MVP (web)       | None linked | Added by decision Q-05 as a Must-have feature (CR-01 updates the Scope document). Accounts and Billing need it (Accounts BRD INT-01, Billing BRD INT-03).                                                   |

## 6. Functional requirements, user stories and acceptance criteria

Field rules for the User and Household entities are in Common BRD 8.1 and 8.2. Error and message IDs are in section 10.

### 6.1 NTF-01 Multi-channel alerts: push, then SMS and email

**US-NTF-01-01.** As a parent, I want to be alerted by push, and then by text and email if I have not read a message, so that I do not miss it.

| ID           | Requirement                                                                                                                                                                                                                         | Priority | Source                                         |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------|
| FR-NTF-01-01 | The system shall send a browser push alert to the recipient when a message arrives, if the recipient has allowed push. If push is not allowed, the system shall skip it, and the SMS and email steps still follow their wait times. | Must     | NTF-01; Scope document 7.3                     |
| FR-NTF-01-02 | The system shall treat a message as unread until the recipient opens it in the app.                                                                                                                                                 | Must     | BR-06; NTF-02                                  |
| FR-NTF-01-03 | If a message is still unread after the SMS wait time, the system shall send an SMS alert. The default wait time is 15 minutes.                                                                                                      | Must     | BR-06; P05                                     |
| FR-NTF-01-04 | If a message is still unread after the email wait time, the system shall send an email alert. The default wait time is 1 hour.                                                                                                      | Must     | BR-06; P05                                     |
| FR-NTF-01-05 | When the recipient reads the message, the system shall stop the later alerts for that message.                                                                                                                                      | Must     | BR-06                                          |
| FR-NTF-01-06 | If the recipient has no verified mobile number, the system shall skip the SMS alert.                                                                                                                                                | Must     | Common BRD 8.1 (the mobile number is optional) |
| FR-NTF-01-07 | For a user in Safety Mode, the system shall send every alert with no sender name and no message text, and the user cannot turn previews on.                                                                                         | Must     | BR-22; Common BRD 11.3                         |
| FR-NTF-01-08 | The system should let a user change the SMS wait time and the email wait time to any value from 15 minutes to 24 hours. It shall show ERR-04 for a value outside this range.                                                        | Should   | Decision Q-01 (Scope decision 25)              |
| FR-NTF-01-09 | The system shall record every alert in the delivery log, with the channel, the time and the result.                                                                                                                                 | Must     | BR-07; P05                                     |
| FR-NTF-01-10 | If an alert cannot be sent on a channel, the system shall retry that channel 3 times over 15 minutes and then log the failure. The later channels still follow their wait times.                                                    | Must     | P05; Common BRD 5 (unhappy path)               |
| FR-NTF-01-11 | The system shall show only the name of the sender in an alert for a message and shall show no message text, unless the user has turned on previews. The preview setting is SAF-02 in Safety and Privacy.                            | Must     | Decision Q-02; SAF-02                          |

An alert shows the name of the sender and no message text. A user can turn on previews in settings (SAF-02). Alerts for a user in Safety Mode never show a preview. There is no urgent flag in the MVP, because urgent-message detection is MSG-13 in Phase 3 (decisions Q-01 and Q-02).

| ID           | Given                                                                                                                         | When                                     | Then                                                                                                                                                          | Covers                     |
|--------------|-------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| AC-NTF-01-01 | A recipient who is not in Safety Mode                                                                                         | A message arrives for them               | A push alert with the name of the sender and no message text is sent (MSGT-01) and a delivery log entry exists                                                | FR-NTF-01-01, FR-NTF-01-09 |
| AC-NTF-01-02 | A message that is still unread after the SMS wait time (15 minutes by default), and a recipient with a verified mobile number | The SMS wait time ends                   | An SMS alert is sent (MSGT-03)                                                                                                                                | FR-NTF-01-02, FR-NTF-01-03 |
| AC-NTF-01-03 | A message that is still unread after the email wait time (1 hour by default)                                                  | The email wait time ends                 | An email alert is sent (MSGT-04)                                                                                                                              | FR-NTF-01-04               |
| AC-NTF-01-04 | A message that the recipient reads after the push alert and before the SMS wait time ends                                     | The SMS wait time ends                   | No SMS and no email is sent                                                                                                                                   | FR-NTF-01-02, FR-NTF-01-05 |
| AC-NTF-01-05 | A recipient with no verified mobile number and an unread message                                                              | The SMS wait time ends                   | No SMS is sent and the email step still follows                                                                                                               | FR-NTF-01-06               |
| AC-NTF-01-06 | A recipient who is in Safety Mode                                                                                             | A message arrives for them               | The alert has no preview text (MSGT-02)                                                                                                                       | FR-NTF-01-07               |
| AC-NTF-01-07 | A signed-in user                                                                                                              | They save an SMS wait time of 30 minutes | The new value is saved and is used for later messages                                                                                                         | FR-NTF-01-08               |
| AC-NTF-01-08 | A push alert that cannot be sent                                                                                              | The failure is returned                  | The system tries the push channel 3 times over 15 minutes, then the failure is in the delivery log, and the SMS and email steps still run at their wait times | FR-NTF-01-10               |
| AC-NTF-01-09 | A signed-in user                                                                                                              | They save an SMS wait time of 5 minutes  | The value is not saved and ERR-04 shows                                                                                                                       | FR-NTF-01-08               |
| AC-NTF-01-10 | A recipient who is not in Safety Mode and who turned on previews (SAF-02)                                                     | A message arrives for them               | The alert shows the name of the sender and the preview set in SAF-02                                                                                          | FR-NTF-01-11               |
| AC-NTF-01-11 | A recipient who has not allowed push                                                                                          | A message arrives for them               | No push alert is sent and the SMS and email steps still follow their wait times                                                                               | FR-NTF-01-01               |

### 6.2 NTF-02 Delivery and read status on every message, logged in the record

**US-NTF-02-01.** As a parent, I want to see when my message was sent, delivered and read, so that I can show it was received.

| ID           | Requirement                                                                                                                                                                                                                                   | Priority | Source                                                                             |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------|
| FR-NTF-02-01 | The system shall show the status of every message as Sent, Delivered, Read or Failed.                                                                                                                                                         | Must     | NTF-02; Scope document 7.3; Accounts BRD FR-ACC-04-06 (Failed)                     |
| FR-NTF-02-02 | The system shall set Sent when it has accepted the message for delivery, Delivered when the message has reached the account of the recipient or the text or email channel confirms delivery, and Read when the recipient opens it in the app. | Must     | Decision Q-09                                                                      |
| FR-NTF-02-03 | The system shall save every status change in the record with the date and time in UTC.                                                                                                                                                        | Must     | BR-07; Common BRD 11.5                                                             |
| FR-NTF-02-04 | The system shall add each status change as a new entry and shall not edit or delete an earlier entry.                                                                                                                                         | Must     | NFR-05                                                                             |
| FR-NTF-02-05 | If every channel has failed after the retries in FR-NTF-01-10, the system shall set the status Failed and show ERR-01 to the sender.                                                                                                          | Must     | Common BRD 5 (unhappy path)                                                        |
| FR-NTF-02-06 | The system shall show the sender the status of the message and the time of each status.                                                                                                                                                       | Must     | P05 (show delivery status on every message)                                        |
| FR-NTF-02-07 | The system shall make the delivery log available to Records and Court.                                                                                                                                                                        | Must     | Scope document 7.9 (Records and Court depends on delivery logs from Notifications) |
| FR-NTF-02-08 | For a message to a co-parent who is not on the app, the system shall show Sent, Delivered or Failed as the channel reports. The status Read is not shown.                                                                                     | Must     | Accounts BRD FR-ACC-04-06; decision Q-09                                           |
| FR-NTF-02-09 | When the recipient of a message is in Safety Mode, the system shall not show the status Read to the sender. The sender still sees Sent and Delivered.                                                                                         | Must     | Decision Q-09; BR-22                                                               |
| FR-NTF-02-10 | The system shall keep delivery log entries that are tied to a case under legal hold. It shall delete other entries on request after the user is offered an export. Counsel sets the retention period in the retention policy.                 | Must     | BR-21; decision Q-13                                                               |

The sender sees every status. The delivery log is part of the record and follows the sharing rules of Records and Court. A recipient in Safety Mode hides the status Read from the sender (decision Q-09, confirmed with advocates in the Safety Mode review). The status Read is never shown for a co-parent who is not on the app. The retention period is set by counsel (decision Q-13).

| ID           | Given                                                                                    | When                               | Then                                                                                                           | Covers                                   |
|--------------|------------------------------------------------------------------------------------------|------------------------------------|----------------------------------------------------------------------------------------------------------------|------------------------------------------|
| AC-NTF-02-01 | A parent who sends a message in the app                                                  | The system accepts the message     | The status is Sent and it is saved with the date and time in UTC                                               | FR-NTF-02-01, FR-NTF-02-02, FR-NTF-02-03 |
| AC-NTF-02-02 | A sent message                                                                           | It reaches the recipient           | The status Delivered is saved with the date and time                                                           | FR-NTF-02-02, FR-NTF-02-03               |
| AC-NTF-02-03 | A delivered message                                                                      | The recipient opens it             | The status Read is saved with the date and time, and the sender sees Read and the time                         | FR-NTF-02-02, FR-NTF-02-03, FR-NTF-02-06 |
| AC-NTF-02-04 | A message for which every channel failed after 3 retries over 15 minutes                 | The failure is returned            | The status is Failed and ERR-01 shows to the sender                                                            | FR-NTF-02-05                             |
| AC-NTF-02-05 | A status entry                                                                           | Anyone tries to edit or delete it  | The change is not possible                                                                                     | FR-NTF-02-04                             |
| AC-NTF-02-06 | A message with the statuses Sent, Delivered and Read                                     | The sender opens the message       | All three statuses show with their times                                                                       | FR-NTF-02-06                             |
| AC-NTF-02-07 | A delivery log entry                                                                     | Records and Court asks for the log | The log is available. The export format is owned by Records and Court.                                         | FR-NTF-02-07                             |
| AC-NTF-02-08 | A text to a co-parent who is not on the app that the phone network delivers              | The channel reports the delivery   | The status Delivered shows and the status Read does not show                                                   | FR-NTF-02-08                             |
| AC-NTF-02-09 | A message to a recipient who is in Safety Mode, which the recipient reads                | The sender opens the message       | The sender sees Sent and Delivered and does not see Read                                                       | FR-NTF-02-09                             |
| AC-NTF-02-10 | Delivery log entries tied to a case, other entries, and a deletion request from the user | The request is processed           | The user was offered an export first, the entries tied to the case are kept, and the other entries are deleted | FR-NTF-02-10                             |

### 6.3 NTF-03 Notification health check in settings (Phase 2)

**US-NTF-03-01.** As a parent, I want to check that alerts can reach me, so that I do not miss messages.

| ID           | Requirement                                                                                                                                                                                                                | Priority | Source                      |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------------------|
| FR-NTF-03-01 | The system should give every user a notification health check in settings.                                                                                                                                                 | Should   | NTF-03; P05                 |
| FR-NTF-03-02 | The health check should show, for push, SMS and email, whether the app can use the channel for this user.                                                                                                                  | Should   | P05                         |
| FR-NTF-03-03 | When a channel cannot be used, the health check should say why and what the user can do. The check tests the verified email, the verified mobile number, the push permission and the last failed delivery on each channel. | Should   | P05; decision Q-10          |
| FR-NTF-03-04 | The health check should let the user send one test alert on each channel.                                                                                                                                                  | Should   | Decision Q-10               |
| FR-NTF-03-05 | If a test alert cannot be sent, the health check should show ERR-02.                                                                                                                                                       | Should   | Common BRD 5 (unhappy path) |

| ID           | Given                                                                   | When                                | Then                                                                 | Covers                     |
|--------------|-------------------------------------------------------------------------|-------------------------------------|----------------------------------------------------------------------|----------------------------|
| AC-NTF-03-01 | A signed-in user                                                        | They open the notification settings | The health check shows                                               | FR-NTF-03-01               |
| AC-NTF-03-02 | A user with a verified email, a verified mobile number and push allowed | They open the health check          | All three channels show as usable (MSGT-09)                          | FR-NTF-03-02               |
| AC-NTF-03-03 | A user with no verified mobile number                                   | They open the health check          | SMS shows as not usable, with the reason and the next step (MSGT-08) | FR-NTF-03-02, FR-NTF-03-03 |
| AC-NTF-03-04 | A user with a usable email channel                                      | They send a test alert on email     | The test alert arrives by email                                      | FR-NTF-03-04               |
| AC-NTF-03-05 | A test alert that cannot be sent                                        | The user sends it                   | ERR-02 shows                                                         | FR-NTF-03-05               |

### 6.4 NTF-04 Event and deadline reminders

**US-NTF-04-01.** As a parent, I want reminders for events, hearings and due dates, so that I do not miss them.

| ID           | Requirement                                                                                                                                                                                                               | Priority | Source                                                               |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------|
| FR-NTF-04-01 | The system shall send a reminder before each calendar event.                                                                                                                                                              | Must     | NTF-04; Scope document 7.3                                           |
| FR-NTF-04-02 | The system shall send a reminder before each hearing and each deadline that Child Support Sync puts in the calendar.                                                                                                      | Must     | NTF-04; CSS-05; P22                                                  |
| FR-NTF-04-03 | The system shall send a reminder before each due date from the agency record.                                                                                                                                             | Must     | NTF-04; CSS-04                                                       |
| FR-NTF-04-04 | The system shall send event reminders to both parents of a linked household, and to the parent in Solo Mode.                                                                                                              | Must     | Scope document 7.3 (sent to both parents); Accounts BRD FR-ACC-03-01 |
| FR-NTF-04-05 | The system shall send a reminder about an agency item (a hearing, a deadline or a due date) only to the parent who linked the case. It shall send it to the other parent only when the linked parent has shared the item. | Must     | Common BRD 7.2; decision Q-08 (Scope decision 11)                    |
| FR-NTF-04-06 | The system shall send a court-date reminder by push and by SMS at the same time, without waiting for the unread time.                                                                                                     | Must     | Decision Q-01 (Scope decision 25)                                    |
| FR-NTF-04-07 | For a user in Safety Mode, the system shall send every reminder with no event title and no other details.                                                                                                                 | Must     | BR-22; Common BRD 11.3                                               |
| FR-NTF-04-08 | The system shall record every reminder in the delivery log, with the channel, the time and the result.                                                                                                                    | Must     | NFR-04; BR-07                                                        |
| FR-NTF-04-09 | If a reminder cannot be sent on a channel, the system shall retry that channel 3 times over 15 minutes and then log the failure.                                                                                          | Must     | Common BRD 5 (unhappy path)                                          |
| FR-NTF-04-10 | If the time of an event changes, the system shall send the reminder for the new time and not for the old time.                                                                                                            | Must     | CAL-10 (audit trail of changes); BA proposal                         |
| FR-NTF-04-11 | The system shall send reminders at these default times: 1 day and 1 hour before an event, 7 days and 1 day before a hearing or a deadline, and 3 days before a due date.                                                  | Must     | Decision Q-07                                                        |
| FR-NTF-04-12 | The system shall let a user change the reminder times.                                                                                                                                                                    | Must     | Decision Q-07                                                        |

The default reminder times are in FR-NTF-04-11 (decision Q-07). A court hearing is a court date, so its reminders go by push and SMS at the same time (decision Q-01).

| ID           | Given                                                                           | When                                                                    | Then                                                                                     | Covers                                                 |
|--------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------------------------------------|--------------------------------------------------------|
| AC-NTF-04-01 | A linked household with a calendar event                                        | It is 1 day before the event                                            | Both parents get the reminder (MSGT-05) by push and a delivery log entry exists for each | FR-NTF-04-01, FR-NTF-04-04, FR-NTF-04-08, FR-NTF-04-11 |
| AC-NTF-04-02 | A household in Solo Mode with a calendar event                                  | It is 1 day before the event                                            | Only the parent gets the reminder                                                        | FR-NTF-04-04                                           |
| AC-NTF-04-03 | A hearing that Child Support Sync put in the calendar from the case of Parent A | It is 7 days before the hearing                                         | Parent A gets the reminder (MSGT-07) and the other parent does not                       | FR-NTF-04-02, FR-NTF-04-05                             |
| AC-NTF-04-04 | The same hearing, which Parent A has shared with the other parent               | It is 7 days before the hearing                                         | Both parents get the reminder                                                            | FR-NTF-04-05                                           |
| AC-NTF-04-05 | A due date from the agency record of Parent A                                   | It is 3 days before the due date                                        | Parent A gets the reminder                                                               | FR-NTF-04-03, FR-NTF-04-11                             |
| AC-NTF-04-06 | A court hearing                                                                 | It is 7 days before the hearing                                         | The reminder goes by push and by SMS at the same time                                    | FR-NTF-04-06                                           |
| AC-NTF-04-07 | A user in Safety Mode                                                           | A reminder is sent                                                      | The reminder has no event title and no other details (MSGT-06)                           | FR-NTF-04-07                                           |
| AC-NTF-04-08 | An event whose time changes after a reminder was set                            | The new reminder time arrives                                           | The reminder is sent for the new time and none is sent for the old time                  | FR-NTF-04-10                                           |
| AC-NTF-04-09 | A reminder that cannot be sent on a channel                                     | The system tries the channel 3 times over 15 minutes and all tries fail | The failure is in the delivery log                                                       | FR-NTF-04-09                                           |
| AC-NTF-04-10 | A calendar event that starts in 2 days                                          | The default reminder times of the event arrive                          | A reminder is sent 1 day before and another 1 hour before the event                      | FR-NTF-04-11                                           |
| AC-NTF-04-11 | A user who changes the event reminder time to 2 hours before                    | It is 2 hours before the event                                          | The reminder is sent then, and no reminder is sent 1 day before                          | FR-NTF-04-12                                           |

### 6.5 NTF-05 Notification quiet windows or limits (Phase 3)

**US-NTF-05-01.** As a parent, I want to set quiet times and limit how many alerts I get, so that I am not disturbed.

| ID           | Requirement                                                                                                                                                                                                | Priority | Source                      |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------------------|
| FR-NTF-05-01 | The system should let a user set quiet windows. Alerts due in a window are held and sent when the window ends. Court-date reminders are not held.                                                          | Should   | NTF-05; Scope document 7.3  |
| FR-NTF-05-02 | The system should let a user set a limit on the number of non-urgent alerts per day. Court-date reminders do not count toward the limit. Alerts over the limit are held and sent when the next day starts. | Should   | NTF-05; Scope document 7.3  |
| FR-NTF-05-03 | The system should write an audit log entry when a user changes a quiet window or a limit.                                                                                                                  | Should   | NFR-04                      |
| FR-NTF-05-04 | If a setting cannot be saved, the system should keep the earlier setting and show ERR-03.                                                                                                                  | Should   | Common BRD 5 (unhappy path) |

Decision Q-11 is in section 15. How alerts over a limit are handled is a BA reading of that decision.

| ID           | Given                                                                      | When                                | Then                                                | Covers                     |
|--------------|----------------------------------------------------------------------------|-------------------------------------|-----------------------------------------------------|----------------------------|
| AC-NTF-05-01 | A signed-in user                                                           | They set a quiet window and save    | The window is saved and an audit log entry is saved | FR-NTF-05-01, FR-NTF-05-03 |
| AC-NTF-05-02 | A user with a quiet window                                                 | An alert is due inside the window   | The alert is held and sent when the window ends     | FR-NTF-05-01               |
| AC-NTF-05-03 | A signed-in user                                                           | They set a limit on alerts and save | The limit is saved and an audit log entry is saved  | FR-NTF-05-02, FR-NTF-05-03 |
| AC-NTF-05-04 | A signed-in user and a save error                                          | They save a setting                 | The earlier setting stays and ERR-03 shows          | FR-NTF-05-04               |
| AC-NTF-05-05 | A user with a quiet window and a court-date reminder due inside the window | The reminder time arrives           | The reminder is sent at its time and is not held    | FR-NTF-05-01               |
| AC-NTF-05-06 | A user with a limit of 5 non-urgent alerts per day who already got 5 today | A sixth non-urgent alert is due     | The alert is held and sent when the next day starts | FR-NTF-05-02               |

### 6.6 NTF-06 Send service for account, invite and payment messages (MVP)

**US-NTF-06-01.** As a parent, I want codes, links, invites and messages to reach me by text or email, so that I can sign in, join and use the app.

| ID           | Requirement                                                                                                                                                                                                                                                                                                         | Priority | Source                                                                    |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| FR-NTF-06-01 | The system shall send an email or a text when another module asks for it, using the channel the module names.                                                                                                                                                                                                       | Must     | Accounts BRD FR-ACC-01-05, FR-ACC-02-05, FR-ACC-04-02; Billing BRD INT-03 |
| FR-NTF-06-02 | The system shall return the result of each send, Sent or Failed, to the module that asked.                                                                                                                                                                                                                          | Must     | Accounts BRD FR-ACC-02-14                                                 |
| FR-NTF-06-03 | The system shall report Delivered to the module when the channel confirms delivery.                                                                                                                                                                                                                                 | Must     | Accounts BRD FR-ACC-04-06                                                 |
| FR-NTF-06-04 | The system shall send texts from a ParentPath number and emails from a ParentPath email address, and shall receive replies there. It shall pass each reply to the module that sent the original message. Messaging adds the reply to the same exchange.                                                             | Must     | Accounts BRD FR-ACC-04-04                                                 |
| FR-NTF-06-05 | The system shall record every send in the delivery log.                                                                                                                                                                                                                                                             | Must     | BR-07; NFR-04                                                             |
| FR-NTF-06-06 | If a channel does not accept a message, the system shall retry 3 times over 15 minutes and then return Failed to the module and log the failure. The system shall stop retrying when the module says the message has expired, for example a one-time code that is valid for 10 minutes (Accounts BRD FR-ACC-01-05). | Must     | Common BRD 5 (unhappy path)                                               |
| FR-NTF-06-07 | The system shall use sending services that report delivery to the system and can receive replies.                                                                                                                                                                                                                   | Must     | Decision Q-04                                                             |

NTF-06 was added to the feature list by decision Q-05. The modules that use it so far are Accounts and Onboarding (codes, links, invites, and messages to a co-parent who is not on the app) and Billing and Plans (decision and trial messages).

| ID           | Given                                               | When                              | Then                                                                        | Covers                     |
|--------------|-----------------------------------------------------|-----------------------------------|-----------------------------------------------------------------------------|----------------------------|
| AC-NTF-06-01 | A module that asks for an email to be sent          | The system sends it               | The email is sent and the module gets the result Sent                       | FR-NTF-06-01, FR-NTF-06-02 |
| AC-NTF-06-02 | A module that asks for a text to be sent            | The system sends it               | The text is sent                                                            | FR-NTF-06-01               |
| AC-NTF-06-03 | A sent text that the phone network delivers         | The channel confirms the delivery | The module gets the result Delivered                                        | FR-NTF-06-03               |
| AC-NTF-06-04 | A reply that arrives for a message sent by a module | The reply arrives                 | The reply is passed to that module                                          | FR-NTF-06-04               |
| AC-NTF-06-05 | A channel that does not accept a message            | The system tries to send it       | The module gets the result Failed and the failure is in the delivery log    | FR-NTF-06-06               |
| AC-NTF-06-06 | Any send                                            | The send is done                  | A delivery log entry exists with the channel, the time and the result       | FR-NTF-06-05               |
| AC-NTF-06-07 | A sending service chosen by IT                      | It is connected for a test        | A test text shows the status Delivered and a reply to it reaches the system | FR-NTF-06-07               |

## 7. Business rules

| ID    | Rule                                                                                                                                                  | Features | Source | Status   |
|-------|-------------------------------------------------------------------------------------------------------------------------------------------------------|----------|--------|----------|
| BR-06 | A message that stays unread moves from push to SMS and email. The waiting time is 15 minutes for SMS and 1 hour for email by default (decision Q-01). | NTF-01   | P05    | Proposed |

BR-06 is a module-only rule. Two shared rules from Common BRD section 9 are applied and not copied: BR-07 (sent, delivered and read status is saved in the record) in FR-NTF-01-09, FR-NTF-02-03, FR-NTF-04-08 and FR-NTF-06-05, and BR-22 (Safety Mode makes notifications discreet) in FR-NTF-01-07 and FR-NTF-04-07.

## 8. Data

**8.1 Shared entities used.** These are defined in Common BRD section 8 and are not copied here.

| Entity          | Fields used                         | Common BRD |
|-----------------|-------------------------------------|------------|
| User            | email, mobile_number, language      | 8.1        |
| Household       | mode (Linked, Solo)                 | 8.2        |
| Audit log entry | actor, action, object, result, time | 8.5        |

**8.2 New entities (proposed).** The sources name none of these fields. They are a BA proposal.

**Delivery log entry**

| Field             | Type          | Required | Notes                                                           |
|-------------------|---------------|----------|-----------------------------------------------------------------|
| entry_id          | Unique ID     | Yes      | System generated                                                |
| item_type         | Choice        | Yes      | Message, Reminder, Account message                              |
| item_id           | Unique ID     | Yes      | The message, reminder or send that this entry is about          |
| recipient_user_id | Link to User  | No       | Empty for a co-parent who is not on the app                     |
| recipient_address | Text          | No       | The mobile number or email of a co-parent who is not on the app |
| channel           | Choice        | Yes      | In-app, Push, SMS, Email                                        |
| status            | Choice        | Yes      | Sent, Delivered, Read, Failed                                   |
| recorded_at       | Date and time | Yes      | UTC. Cannot be changed.                                         |

**Notification settings**

| Field                           | Type                                         | Required | Notes                         |
|---------------------------------|----------------------------------------------|----------|-------------------------------|
| user_id                         | Link to User                                 | Yes      |                               |
| sms_wait_minutes                | Number                                       | Yes      | Default 15. Range 15 to 1440. |
| email_wait_minutes              | Number                                       | Yes      | Default 60. Range 15 to 1440. |
| event_reminder_times            | List of times before the event               | Yes      | Default 1 day and 1 hour      |
| hearing_deadline_reminder_times | List of times before the hearing or deadline | Yes      | Default 7 days and 1 day      |
| due_date_reminder_times         | List of times before the due date            | Yes      | Default 3 days                |

**Reminder**

| Field             | Type          | Required | Notes                                             |
|-------------------|---------------|----------|---------------------------------------------------|
| reminder_id       | Unique ID     | Yes      | System generated                                  |
| source_type       | Choice        | Yes      | Calendar event, Hearing, Deadline, Due date       |
| source_id         | Unique ID     | Yes      | The event, hearing, deadline or due date          |
| recipient_user_id | Link to User  | Yes      |                                                   |
| send_at           | Date and time | Yes      | UTC. Set from the reminder times in FR-NTF-04-11. |
| status            | Choice        | Yes      | Scheduled, Sent, Failed                           |

No field of a delivery log entry can be edited after save (NFR-05). Records and Court uses the delivery log, so raise change request CR-02 to add it to Common BRD section 8 (Common BRD section 13).

## 9. Screens

Each screen needs the four designed states: empty, loading, error and success (Common BRD 11.1). Wireframe links and button labels are added when the wireframes are agreed.

| ID     | Screen                                                           | Feature | Phase           | Wireframe |
|--------|------------------------------------------------------------------|---------|-----------------|-----------|
| SCR-01 | Notification settings (wait times and reminder times)            | NTF-01  | MVP (web)       | \[link\]  |
| SCR-02 | Notification health check                                        | NTF-03  | Phase 2 (web)   | \[link\]  |
| SCR-03 | Message status display, shown on the message screen in Messaging | NTF-02  | MVP (web)       | \[link\]  |
| SCR-04 | Quiet windows and limits                                         | NTF-05  | Phase 3 (later) | \[link\]  |

## 10. Messages and errors

Wording is a draft. It is written for English first, and final wording is approved before build (Common BRD 11.2). Spanish text is added when the language feature is built. Alerts show the name of the sender and no message text, unless the user turns on previews (decision Q-02).

**Errors**

| ID     | When it shows                    | Text                                                                                        | Used by      |
|--------|----------------------------------|---------------------------------------------------------------------------------------------|--------------|
| ERR-01 | A message cannot be delivered    | We could not deliver your message to \[name\]. It is saved in your record as not delivered. | FR-NTF-02-05 |
| ERR-02 | A test alert cannot be sent      | We could not send the test alert. Check the settings shown for this channel.                | FR-NTF-03-05 |
| ERR-03 | A setting cannot be saved        | We could not save your change. Nothing was changed. Please try again.                       | FR-NTF-05-04 |
| ERR-04 | A wait time is outside the range | Choose a time from 15 minutes to 24 hours.                                                  | FR-NTF-01-08 |

**Messages**

| ID      | When it shows                                              | Text                                                                                                                           | Feature |
|---------|------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|---------|
| MSGT-01 | A message arrives for a user who is not in Safety Mode     | You have a new message from \[name\].                                                                                          | NTF-01  |
| MSGT-02 | A message arrives for a user in Safety Mode                | You have a new notification.                                                                                                   | NTF-01  |
| MSGT-03 | A message is still unread after the SMS wait time          | You have an unread message from \[name\] in ParentPath. Open the app to read it.                                               | NTF-01  |
| MSGT-04 | A message is still unread after the email wait time        | Subject: You have an unread message in ParentPath. Body: You have an unread message from \[name\]. Open ParentPath to read it. | NTF-01  |
| MSGT-05 | A calendar event reminder is sent                          | Reminder: \[event title\] on \[date and time\].                                                                                | NTF-04  |
| MSGT-06 | A reminder is sent to a user in Safety Mode                | You have a reminder.                                                                                                           | NTF-04  |
| MSGT-07 | A hearing, deadline or due-date reminder is sent           | Reminder: you have a child support date on \[date and time\].                                                                  | NTF-04  |
| MSGT-08 | The health check finds that SMS cannot be used             | SMS is not set up. Add and verify a mobile number to get text alerts.                                                          | NTF-03  |
| MSGT-09 | The health check finds that all three channels can be used | Alerts can reach you on push, SMS and email.                                                                                   | NTF-03  |

## 11. Interfaces

All interfaces except INT-08 are with other modules of the app.

| ID     | With                         | What passes                                                                                                                                                      | Features               | Phase                    | Source                              |
|--------|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|--------------------------|-------------------------------------|
| INT-01 | Messaging                    | Message events come in. Alerts go out. Status changes (Sent, Delivered, Read, Failed) go back to the message screen.                                             | NTF-01, NTF-02         | MVP (web)                | Scope document 7.3                  |
| INT-02 | Calendar and Parenting Time  | Event times come in. Reminders go out.                                                                                                                           | NTF-04                 | MVP (web)                | Scope document 7.3                  |
| INT-03 | Child Support Sync           | Hearings, deadlines and due dates come in. Reminders go out.                                                                                                     | NTF-04                 | Sync phase 1 (read-only) | Scope document 7.3, 4.3             |
| INT-04 | Safety and Privacy           | The Safety Mode flag comes in, so that alerts carry no preview text.                                                                                             | NTF-01, NTF-04         | MVP (web)                | Scope document 7.3                  |
| INT-05 | Accounts and Onboarding      | Codes, links, invites and messages to a co-parent who is not on the app come in through the send service. The verified email and mobile number come in.          | NTF-06, NTF-01         | MVP (web)                | Accounts BRD INT-01; Common BRD 8.1 |
| INT-06 | Billing and Plans            | Decision and trial messages come in through the send service.                                                                                                    | NTF-06                 | Phase 2 (web)            | Billing BRD INT-03                  |
| INT-07 | Records and Court            | The delivery log goes out.                                                                                                                                       | NTF-02                 | MVP (web)                | Scope document 7.9                  |
| INT-08 | Push, SMS and email services | Alerts and fallback delivery. IT chooses the providers before the build (decision Q-04). Each provider must report delivery and must be able to receive replies. | NTF-01, NTF-04, NTF-06 | First release            | Scope document 11                   |

## 12. Dependencies and assumptions

**12.1 This module needs** (Scope document 7.3): Messaging, Calendar and Parenting Time, Child Support Sync (hearing and due-date reminders), and Safety and Privacy (discreet notifications).

**12.2 Modules that need this module** (Common BRD section 4).

| Module                      | What it needs from Notifications                           |
|-----------------------------|------------------------------------------------------------|
| Accounts and Onboarding     | The SMS and email channels                                 |
| Messaging                   | Alerts and delivery status                                 |
| Calendar and Parenting Time | Reminders                                                  |
| Child Support Sync          | Reminders (NTF-04)                                         |
| Records and Court           | Delivery logs                                              |
| Safety and Privacy          | Discreet alerts                                            |
| Billing and Plans           | Decision and trial messages (Billing BRD INT-03, proposed) |

The Common BRD build order places Notifications right after Platform and Accounts.

**12.3 Assumptions**

- The first release is a web app. Mobile follows (Scope document 4.4).

- Module names are working names (Scope document 4.4).

- The phase for each feature is a proposal, not a commitment (Scope document 4.4).

- Access levels for roles are proposals (Scope document 5).

- Screens and messages are in English in the MVP (Accounts BRD, decision Q-01).

## 13. Non-functional requirements

These are shared requirements from Common BRD section 10, plus one target from Scope document section 10.

| ID           | Requirement                                                                                                         | Where it applies here                                  | Status                       |
|--------------|---------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|------------------------------|
| NFR-02       | Encryption in transit and at rest                                                                                   | The delivery log, mobile numbers and email addresses   | Proposed                     |
| NFR-03       | Role-based access on every request                                                                                  | Access to the delivery log                             | Proposed                     |
| NFR-04       | Sign-ins, changes and sync actions are logged with actor, time and result                                           | FR-NTF-01-09, FR-NTF-04-08, FR-NTF-05-03, FR-NTF-06-05 | Proposed                     |
| NFR-05       | Records cannot be edited. A change is a new entry.                                                                  | FR-NTF-02-04                                           | Proposed                     |
| NFR-06       | Collect only the data that is needed                                                                                | The address kept for a co-parent who is not on the app | Proposed                     |
| NFR-09       | Plain language on every screen. The standard is to be chosen. Scope document section 10 proposes WCAG 2.2 level AA. | All screens and alert texts                            | Open                         |
| NFR-11       | English only in the MVP. Spanish in Phase 2 (Accounts BRD, decision Q-01).                                          | All screens and alert texts                            | Proposed                     |
| NFR-13 (new) | 99 percent of alerts are sent within 1 minute. The point where the minute starts is to be agreed with IT.           | NTF-01, NTF-04, NTF-06                                 | Proposed (Scope document 10) |

If other modules use NFR-13, raise change request CR-03 to add it to Common BRD section 10.

## 14. Risks

| ID     | Risk                                                 | Why it matters                                                                                                                                               | Response                                                                                                                                                             | Source                                 |
|--------|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| RSK-01 | Missed notifications                                 | This was a repeated complaint about other apps. One reviewer says missed messages led to police and lawyer involvement (a user report that is not verified). | Escalate to SMS and email. Keep a delivery log. Add a health check.                                                                                                  | Scope document 12; P05                 |
| RSK-02 | Alerts or the Read status put a parent at risk       | A preview on a locked screen, or a Read status, could show the activity of a survivor to the other parent.                                                   | No preview text in Safety Mode (BR-22). The Read status is hidden from the sender when the recipient is in Safety Mode (decision Q-09). Advocates confirm this rule. | BR-22; Common BRD 11.3                 |
| RSK-03 | Push is weak in a web-first MVP                      | The MVP is a web app and browser push needs the permission of the user. Mobile push comes with the Mobile phase.                                             | Browser push is used when the user allows it (decision Q-03). The SMS and email steps still reach a user who does not allow push.                                    | Scope document 4.4                     |
| RSK-04 | Agency reminders reach the wrong parent              | P22 says to remind both parents. Common BRD 7.2 keeps the child support link private to the parent who linked it.                                            | FR-NTF-04-05 follows the private rule (decision Q-08).                                                                                                               | P22; Common BRD 7.2                    |
| RSK-05 | P22 is not proven                                    | P22 is BA analysis and needs interviews (Scope document 12). NTF-04 rests partly on it.                                                                      | Interview parents and child support staff before relying on it.                                                                                                      | Scope document 12; Pain Point workbook |
| RSK-06 | Texts and emails to people who have not joined       | The Accounts BRD asks Legal to add this point to the pre-launch legal review.                                                                                | Legal reviews it before launch.                                                                                                                                      | Accounts BRD                           |
| RSK-07 | The providers for push, SMS and email are not chosen | The Scope document names the services and no provider.                                                                                                       | IT chooses the providers before the build (decision Q-04).                                                                                                           | Scope document 11                      |

## 15. Decisions and open questions

**15.1 Decisions recorded on October 10, 2026.** The requester accepted every recommended answer to Q-01 to Q-14. The table shows each decision and how it was decided. No question is open in this BRD. A decision marked BA proposal is a recommendation from the BA and not from the sources. The Manager, Security or IT confirm it.

| Q    | Decision                                                                                                                                                                                                                                                                                                                                            | How it was decided                                                                      | Values and detail                                                                                                                                                                                                                 | Confirm with       |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| Q-01 | Unread timing.                                                                                                                                                                                                                                                                                                                                      | Requester accepted the recommendation in Scope decision 25.                             | Push first. SMS after 15 minutes unread. Email after 1 hour. The user can change both from 15 minutes to 24 hours. Court-date reminders go by push and SMS at once. There is no urgent flag in the MVP because MSG-13 is Phase 3. | Manager            |
| Q-02 | An alert shows the name of the sender and never the message text. The user can turn previews on in settings (SAF-02). In Safety Mode there is never a preview.                                                                                                                                                                                      | Requester accepted the recommendation. BA proposal.                                     | Previews are off by default.                                                                                                                                                                                                      | Manager, Security  |
| Q-03 | Browser push is used when the user allows it. If not, SMS and email still follow the wait times. The health check shows whether push works.                                                                                                                                                                                                         | Requester accepted the recommendation.                                                  | Push in the iOS and Android apps comes in the Mobile phase.                                                                                                                                                                       | Manager, IT        |
| Q-04 | IT chooses the providers for push, SMS and email before the build.                                                                                                                                                                                                                                                                                  | Requester accepted the recommendation.                                                  | Each provider must report delivery and be able to receive replies (FR-NTF-06-07).                                                                                                                                                 | IT                 |
| Q-05 | NTF-06 is a Must-have feature in the MVP.                                                                                                                                                                                                                                                                                                           | Requester accepted the recommendation.                                                  | CR-01 updates the Scope document.                                                                                                                                                                                                 | Manager, BA lead   |
| Q-06 | Texts and emails go out from a ParentPath number and email address. Replies come back to them. Messaging adds each reply to the same exchange.                                                                                                                                                                                                      | Requester accepted the recommendation.                                                  | None                                                                                                                                                                                                                              | Manager, IT        |
| Q-07 | Default reminder times. The user can change them.                                                                                                                                                                                                                                                                                                   | Requester accepted the recommendation. BA proposal.                                     | 1 day and 1 hour before an event. 7 days and 1 day before a hearing or a deadline. 3 days before a due date.                                                                                                                      | Manager            |
| Q-08 | Reminders about agency items go only to the parent who linked the case. The other parent gets them only when the linked parent shares the item.                                                                                                                                                                                                     | Requester accepted the recommendation. It follows Common BRD 7.2 and Scope decision 11. | None                                                                                                                                                                                                                              | Manager, legal     |
| Q-09 | Sent means the system accepted the message. Delivered means it reached the account of the recipient or the channel confirms delivery. Read means the recipient opened it in the app. The sender sees every status. When the recipient is in Safety Mode, Read is hidden from the sender. Read is never shown for a co-parent who is not on the app. | Requester accepted the recommendation.                                                  | Advocates confirm the Safety Mode rule in the Safety Mode review.                                                                                                                                                                 | Manager, advocates |
| Q-10 | The health check tests the verified email, the verified mobile number, the push permission and the last failed delivery on each channel. The user can send one test alert on each channel.                                                                                                                                                          | Requester accepted the recommendation. BA proposal.                                     | None                                                                                                                                                                                                                              | Manager            |
| Q-11 | Court-date reminders pass through quiet windows. Alerts held in a window are sent when the window ends. A limit counts non-urgent alerts per day and the user sets it.                                                                                                                                                                              | Requester accepted the recommendation. BA proposal.                                     | Alerts over a limit are held and sent when the next day starts (a BA reading of the decision).                                                                                                                                    | Manager            |
| Q-12 | Each channel is tried 3 times over 15 minutes. Then the message is marked Failed, the sender is told and the failure is logged.                                                                                                                                                                                                                     | Requester accepted the recommendation. BA proposal.                                     | The send service stops retrying when the module says the message has expired, for example a one-time code that is valid for 10 minutes (Accounts BRD FR-ACC-01-05).                                                               | Manager, IT        |
| Q-13 | Counsel sets the retention period. Delivery logs tied to a case stay under legal hold (BR-21). Other logs can be deleted on request after an export is offered.                                                                                                                                                                                     | Requester accepted the recommendation.                                                  | None                                                                                                                                                                                                                              | Legal              |
| Q-14 | Each module BRD starts its SCR, ERR, MSGT and INT numbers at 01. A reference from another BRD names the module, for example Notifications ERR-01.                                                                                                                                                                                                   | Requester accepted the recommendation.                                                  | The Accounts BRD (Q-18) and the Billing BRD (Q-15) still show this question as open.                                                                                                                                              | BA lead            |

**Change requests to other documents.** Common BRD section 13 asks for the item, the change and the reason.

| ID    | Document and item                        | Change                                                            | Reason                                                                |
|-------|------------------------------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------|
| CR-01 | Scope and Modules Document, feature list | Add NTF-06 Send service for account, invite and payment messages. | Q-05. Accounts and Billing need it.                                   |
| CR-02 | Common BRD section 8                     | Add the entity Delivery log entry (section 8.2 of this BRD).      | Records and Court uses it.                                            |
| CR-03 | Common BRD section 10                    | Add NFR-13: 99 percent of alerts are sent within 1 minute.        | The target is in Scope document section 10 and not in the Common BRD. |

## 16. Traceability

Test cases are written by QA from the acceptance criteria, using the format TC-NTF-01-01.

| Feature | Pain point  | Business requirement | User story   | Functional requirements | Acceptance criteria |
|---------|-------------|----------------------|--------------|-------------------------|---------------------|
| NTF-01  | P05         | BREQ-01              | US-NTF-01-01 | FR-NTF-01-01 to 11      | AC-NTF-01-01 to 11  |
| NTF-02  | P05         | BREQ-02              | US-NTF-02-01 | FR-NTF-02-01 to 10      | AC-NTF-02-01 to 10  |
| NTF-03  | P05         | BREQ-03              | US-NTF-03-01 | FR-NTF-03-01 to 05      | AC-NTF-03-01 to 05  |
| NTF-04  | P22         | BREQ-04              | US-NTF-04-01 | FR-NTF-04-01 to 12      | AC-NTF-04-01 to 11  |
| NTF-05  | None linked | BREQ-05              | US-NTF-05-01 | FR-NTF-05-01 to 04      | AC-NTF-05-01 to 06  |
| NTF-06  | None linked | BREQ-06              | US-NTF-06-01 | FR-NTF-06-01 to 07      | AC-NTF-06-01 to 07  |

## 17. Readiness check

Checks come from the definition of ready in Common BRD section 12.

| Check                                                                      | Status                                                          |
|----------------------------------------------------------------------------|-----------------------------------------------------------------|
| The module BRD is approved                                                 | No. Version v1.0 is final text and waits for approver sign-off. |
| Every requirement has an ID, a source, a priority and acceptance criteria  | Yes. Confirm in peer BA and QA review.                          |
| No TBC remains in a Must requirement                                       | Yes. No question is open.                                       |
| The values proposed by the BA are confirmed (Q-02, Q-07, Q-10, Q-11, Q-12) | No. The Manager, Security and IT confirm them.                  |
| The Read-status rule for Safety Mode is reviewed by advocates              | No. It is part of the Safety Mode review.                       |
| Fields, statuses, messages and errors are written out                      | Yes. The entity fields in section 8.2 are a BA proposal.        |
| The wireframe is linked and agreed                                         | No. Links in section 9 are placeholders.                        |
| Change requests CR-01 to CR-03 are approved                                | No.                                                             |

Review steps (Common BRD 13): author self-check, peer BA review, QA review for testability, developer or technical review, approver sign-off.
