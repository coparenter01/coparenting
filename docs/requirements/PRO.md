# Professionals and Access (PRO)


12.1 Functional requirements and acceptance criteria

PRO-01 Access for attorneys, mediators and therapists

US-PRO-01-01. As a parent, I want to give my lawyer read-only access to the records I choose, so that I never have to share my password or print everything.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Requirement**
  --------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-PRO-01-02    The system should let a parent invite a professional by email with a professional type (Attorney, Mediator or Therapist), an organization name of up to 100 characters (optional) and a note of up to 500 characters (optional). It should show ERR-02 for an email that is not valid, ERR-03 for a missing field and ERR-08 for a text that is too long.

  FR-PRO-01-03    The system should send the invite by email through the Notifications module (MSGT-02). The invite works for 7 days. Its status is Sent, Opened, Accepted, Expired or Cancelled. The parent can cancel an invite that is Sent or Opened. The system should allow one open invite for the same email and should show ERR-05 for a second one. A person who opens an invite that is Expired or Cancelled should see ERR-07.

  FR-PRO-01-04    The system should allow up to 5 professionals at one time for each parent, counting the status Invited and Active, and should show ERR-04 for a sixth.

  FR-PRO-01-05    A person who accepts an invite should create an account with the role Professional, or sign in to an account that has it. The person verifies the email, signs in with two-factor sign-in and accepts the professional terms (MSGT-11) before seeing anything.

  FR-PRO-01-06    One professional account should be able to connect to many parents. The system should show the professional a list of clients, each with the name of the parent.

  FR-PRO-01-07    Access should belong to the parent who invited the professional. The professionals of one parent should not see what the other parent shared with another professional.

  FR-PRO-01-08    When a parent invites a professional, the parent should choose the categories to share from Messages, Calendar, Expenses, Child information, Documents and Contact attempts. For Messages, Calendar and Expenses, the parent can add a start date and an end date. A category covers only the Shared items that the parent can see. The system should show ERR-10 if the start date is after the end date.

  FR-PRO-01-09    The system should let a parent share one item with a professional whose access is Active, after a confirm step (MSGT-05). The item can be a certified export, a document, a child information entry, a message thread, a journal note, a recorded child support payment, or an agency data item that Child Support Sync allows to be shared. A Private item is shared only this way. If the professional is not Active, the system should show ERR-11.

  FR-PRO-01-10    The system should show a professional only what the parent can see on screen, with the same hiding rules. The professional does not see the Private items of the other parent, and does not see what Safety Mode hides.

  FR-PRO-01-11    The system should not let a professional add, edit, delete, post or invite. If a professional tries, the system should refuse and show ERR-06. A mediator who is added to a mediation thread under MSG-12 can answer in that thread.

  FR-PRO-01-12    The system should let a professional download only the files that a parent shared (certified exports, documents and the files of shared items). The views of the categories are on screen only.

  FR-PRO-01-13    The system should show the professional the line MSGT-10 on every screen of a client, with the name of the parent.

  FR-PRO-01-14    The system should let the parent set an end date that is today or later, and should show ERR-09 for a date in the past. Access ends at the end of that day in UTC. The parent can change the categories or the end date, or end the access, at any time. A change takes effect at once. Ending needs a confirm step (MSGT-07), and the professional is told (MSGT-08). Files already downloaded stay with the professional.

  FR-PRO-01-15    The system should show the status of an access as Invited, Active or Ended.

  FR-PRO-01-17    The system should give the parent an access log. Each line shows the professional, the category or the item opened, and the time. The log does not copy any content.

  FR-PRO-01-18    The system should not show the co-parent the professionals of a parent, their access or their access log. This rule is open for legal review.

  FR-PRO-01-19    The system should alert the parent through the Notifications module when an invite is accepted (MSGT-03). For a user in Safety Mode, the alert should carry no names and no details.

  FR-PRO-01-20    The system should write an audit log entry for every invite, acceptance, change of access, item shared, pause, end and every time a professional opens a category or an item, with actor, time and result.

  FR-PRO-01-21    If a professional with an access that has Ended opens a client, the system should show ERR-13 and show nothing of the household.

  FR-PRO-01-22    If an invite, a change or an item share cannot be saved, the system should show ERR-12 and should not change anything.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                                                                    **When**                                                                                                                 **Then**                                                                                                                                                                                                                         **Covers**
  -------------- -------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------
  AC-PRO-01-01   A household                                                                                                                                  A parent invites pro@example.com as an Attorney                                                                          An invite with the status Invited is made, MSGT-01 shows and the email goes out (MSGT-02).                                                                                                                                       FR-PRO-01-01, FR-PRO-01-02, FR-PRO-01-03

  AC-PRO-01-02   A parent inviting a professional                                                                                                             They enter the email name@, leave the type empty, enter an organization of 101 characters and a note of 501 characters   The invites are refused with ERR-02, ERR-03, ERR-08 and ERR-08                                                                                                                                                                   FR-PRO-01-02

  AC-PRO-01-03   An invite sent at 2027-01-01 10:00 UTC and not accepted, a cancelled invite, and a second invite to the same email while the first is Sent   The time reaches 2027-01-08 10:00 UTC and a person opens each link                                                       The first invite is Expired, and the first two links show ERR-07. The second invite is refused with ERR-05.                                                                                                                      FR-PRO-01-03

  AC-PRO-01-04   A parent with 5 professionals                                                                                                                They invite a sixth                                                                                                      The invite is refused and ERR-04 shows                                                                                                                                                                                           FR-PRO-01-04

  AC-PRO-01-05   A professional who opens a valid invite                                                                                                      They create an account, verify the email, accept the professional terms and sign in with two-factor sign-in              The account has the role Professional, the access is Active, nothing opens before the second check, and the parent is alerted (MSGT-03)                                                                                          FR-PRO-01-05, FR-PRO-01-19

  AC-PRO-01-06   A professional invited by two parents                                                                                                        The professional opens the client list                                                                                   Both clients show, and each client view shows only what that parent shared                                                                                                                                                       FR-PRO-01-06

  AC-PRO-01-07   Parent A and Parent B who each invited an attorney                                                                                           The attorney of Parent A opens the household                                                                             The attorney of Parent A sees nothing that Parent B shared with another attorney, and nothing of the Private items of Parent B                                                                                                   FR-PRO-01-07

  AC-PRO-01-08   A parent who shares Messages and Calendar from 2027-01-01 to 2027-03-31                                                                      The professional opens each category, and the parent sets a start date after the end date                                The professional sees only the Shared messages and events in that range, sees no expense and no Private item, and the bad range is refused with ERR-10                                                                           FR-PRO-01-08

  AC-PRO-01-09   A Private journal note, and a professional who is not Active                                                                                 The parent shares the note after the confirm step, and then tries to share it with the other professional                The first professional reads the note and MSGT-06 shows. The second share is refused with ERR-11.                                                                                                                                FR-PRO-01-09

  AC-PRO-01-10   A co-parent in Safety Mode whose address is hidden, and a Private expense of the co-parent                                                   The attorney of the other parent opens the household                                                                     The address is hidden and the Private expense is not shown                                                                                                                                                                       FR-PRO-01-10

  AC-PRO-01-11   A professional                                                                                                                               They try to post a message, edit an event, delete an expense and invite a person                                         Each is refused with ERR-06                                                                                                                                                                                                      FR-PRO-01-11

  AC-PRO-01-12   A certified export that a parent shared, and a category view                                                                                 The professional downloads the export and looks for a way to export the category view                                    The download works and no export of the category view is offered                                                                                                                                                                 FR-PRO-01-12

  AC-PRO-01-13   A professional who opens a client                                                                                                            The client view opens                                                                                                    MSGT-10 shows with the name of the parent                                                                                                                                                                                        FR-PRO-01-13

  AC-PRO-01-14   Today is 2027-01-15                                                                                                                          A parent sets the end date 2027-01-14, then 2027-02-01, then changes a category, then ends the access                    The first date is refused with ERR-09. The access ends at the end of 2027-02-01 in UTC. The change takes effect at once (MSGT-04). Ending shows MSGT-07, then the access ends at once, and the professional is told (MSGT-08).   FR-PRO-01-14

  AC-PRO-01-15   A professional access                                                                                                                        It is invited, accepted and ended                                                                                        The status is Invited, then Active, then Ended                                                                                                                                                                                   FR-PRO-01-15

  AC-PRO-01-17   A professional who opened the category Messages and a certified export                                                                       The parent opens the access log                                                                                          The log shows the professional, the category and the item, and the time of each, and no content                                                                                                                                  FR-PRO-01-17

  AC-PRO-01-18   A professional invited by Parent A                                                                                                           Parent B opens the settings                                                                                              Parent B sees no professional, no access and no log                                                                                                                                                                              FR-PRO-01-18

  AC-PRO-01-19   An invite that is accepted by a professional, and a user in Safety Mode                                                                      The invite is accepted                                                                                                   The parent is alerted (MSGT-03). For the user in Safety Mode the alert has no names and no details.                                                                                                                              FR-PRO-01-19

  AC-PRO-01-20   An invite, an acceptance, a change, an item share, a pause, an end and an opening                                                            Each happens                                                                                                             One audit log entry exists for each, with the actor, the time in UTC and the result                                                                                                                                              FR-PRO-01-20

  AC-PRO-01-21   A professional whose access has Ended                                                                                                        They open the client                                                                                                     ERR-13 shows and nothing of the household shows                                                                                                                                                                                  FR-PRO-01-21

  AC-PRO-01-22   A save error                                                                                                                                 A parent sends an invite, changes an access or shares an item                                                            Nothing changes and ERR-12 shows                                                                                                                                                                                                 FR-PRO-01-22
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

PRO-02 Private channel to a professional

US-PRO-02-01. As a parent, I want to send one message to my lawyer or therapist, so that they see exactly what I mean without reading the whole thread.

The channel is one way. The professional reads the message and answers outside the app, because a professional cannot post.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-PRO-02-01     The system should offer the private channel only to a household with an Active professional access (PRO-01), and only after the legal review of the terms for forwarding a message is recorded as done.

  FR-PRO-02-02     The system should let a parent choose one message that the parent can see and send it to a professional whose access is Active, with an optional note of up to 500 characters. The system should ask the parent to confirm first (MSGT-12). It should show ERR-08 for a note that is too long and ERR-11 if the professional is not Active.

  FR-PRO-02-03     The professional should get a copy of that one message, with the sender, the sent time, the text, the attachments and the note. The copy cannot be edited and the original does not change. The professional does not get the thread.

  FR-PRO-02-04     The copy should show no first-read time and no delivery status.

  FR-PRO-02-05     If the message is held by the shield (MSG-06), the system should not send it until the parent has opened the original, and should show ERR-14 if the parent tries.

  FR-PRO-02-06     The professional should read the copy in a list From \[parent name\]. The professional cannot reply in the app, and the system should show MSGT-15 instead.

  FR-PRO-02-07     The system should show a marker on the original message, only to the parent who sent it to the professional (MSGT-16). The co-parent is not told. The marker is not part of an export.

  FR-PRO-02-08     The system should alert the professional by email through the Notifications module (MSGT-14). The email carries no message content.

  FR-PRO-02-09     The system should show the parent whether the professional opened the copy, with the time (MSGT-17).

  FR-PRO-02-10     While an access is Ended, the professional should not be able to open any copy. The copies show again if the access becomes Active again.

  FR-PRO-02-11     The system should offer the private channel in Solo Mode, for messages with a co-parent who is not on the app.

  FR-PRO-02-12     The system should write an audit log entry for every message sent to a professional and every time it is opened, with actor, time and result. If a message cannot be sent, the system should show ERR-12 and send nothing.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                            **When**                                                                                                                                                                     **Then**                                                                                                                                 **Covers**
  -------------- ---------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-PRO-02-01   A release built before the legal review is recorded as done, and a household with no Active access   A parent opens a message                                                                                                                                                     The option to send it to a professional is not offered                                                                                   FR-PRO-02-01

  AC-PRO-02-02   A household with an Active attorney                                                                  A parent chooses one message, adds a note of 500 characters, sees MSGT-12 and confirms, and later tries a note of 501 characters and a professional whose access has Ended   The message is sent (MSGT-13). The long note is refused with ERR-08 and the professional whose access has Ended with ERR-11.             FR-PRO-02-02

  AC-PRO-02-03   A message in a thread of 5 messages with an attachment                                               The parent sends it to the attorney                                                                                                                                          The attorney gets that message with its sender, sent time, text, attachment and note, and no other message. The original is unchanged.   FR-PRO-02-03

  AC-PRO-02-04   A message that was read by the recipient                                                             The parent sends it to the attorney                                                                                                                                          The copy shows no first-read time and no delivery status                                                                                 FR-PRO-02-04

  AC-PRO-02-05   A held message that the parent has not opened                                                        The parent tries to send it                                                                                                                                                  It is not sent and ERR-14 shows. After the parent opens the original, it can be sent.                                                    FR-PRO-02-05

  AC-PRO-02-06   A copy in the list From the parent                                                                   The attorney looks for a way to reply                                                                                                                                        No reply option is offered and MSGT-15 shows                                                                                             FR-PRO-02-06

  AC-PRO-02-07   A message sent to the attorney                                                                       Parent A and Parent B open the thread, and Parent A exports                                                                                                                  Parent A sees the marker (MSGT-16). Parent B sees no marker and was not told. The export has no marker.                                  FR-PRO-02-07

  AC-PRO-02-08   A message sent to the attorney                                                                       The send is saved                                                                                                                                                            The attorney gets an email (MSGT-14) with no message content                                                                             FR-PRO-02-08

  AC-PRO-02-09   A copy that the attorney has not opened, and one that the attorney opened                            The parent opens the message                                                                                                                                                 The parent sees Not opened yet (MSGT-18) for the first and the time opened (MSGT-17) for the second                                      FR-PRO-02-09

  AC-PRO-02-11   A household in Solo Mode with a message to a co-parent who is not on the app                         The parent sends it to the attorney                                                                                                                                          The message is sent                                                                                                                      FR-PRO-02-11

  AC-PRO-02-12   A message sent and opened, and a save error                                                          Each happens                                                                                                                                                                 One audit log entry exists for the send and one for each opening. On the save error, ERR-12 shows and nothing is sent.                   FR-PRO-02-12
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Linking, Solo Mode, dispute and access rules**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-PRO-01-23       When a parent gives a professional access, the system shall alert the co-parent with the professional\'s name. The co-parent\'s approval is not needed.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

12.2 Data reference

  ------------------------------------------------------------------------------------
  **Entity**               **Fields used**
  ------------------------ -----------------------------------------------------------
  User                     user_id, email, display_name, role (Professional), status

  Household                household_id, mode

  Invite                   invite_id, from_user_id, channel (Email), status, sent_at

  Audit log entry          actor, action, object, result, device_type, time
  ------------------------------------------------------------------------------------

8.2 New entities (proposed). The sources name none of these fields. They are a BA proposal.

Professional access

  --------------------------------------------------------------------------------------------------------------------------------------
  **Field**               **Type**         **Required**   **Notes**
  ----------------------- ---------------- -------------- ------------------------------------------------------------------------------
  access_id               Unique ID        Yes            System generated

  parent_user_id          Link to User     Yes            The parent who invited the professional. Cannot be changed.

  professional_user_id    Link to User     No             Set when the invite is accepted

  invite_id               Link to Invite   Yes            ---

  professional_type       Choice           Yes            Attorney, Mediator, Therapist

  organization            Text             No             Up to 100 characters

  note                    Text             No             Up to 500 characters

  categories              List             No             Messages, Calendar, Expenses, Child information, Documents, Contact attempts

  date_from and date_to   Date             No             For Messages, Calendar and Expenses. Start not after end.

  ends_on                 Date             No             Today or later when set. Access ends at the end of that day in UTC.

  status                  Choice           Yes            Invited, Active, Ended

  created_at              Date and time    Yes            UTC
  --------------------------------------------------------------------------------------------------------------------------------------

Each change of an access is saved as a version with who changed it and when. A version cannot be changed.

Item share

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**           **Type**                      **Required**   **Notes**
  ------------------- ----------------------------- -------------- -------------------------------------------------------------------------------------------------------------------------------------
  share_id            Unique ID                     Yes            System generated

  access_id           Link to Professional access   Yes            ---

  item_type           Choice                        Yes            Certified export, Document, Child information entry, Message thread, Journal note, Recorded child support payment, Agency data item

  item_id             Unique ID                     Yes            The item that is shared

  shared_by_user_id   Link to User                  Yes            ---

  shared_at           Date and time                 Yes            UTC. Cannot be changed.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Access log entry

  ------------------------------------------------------------------------------------------------------------
  **Field**       **Type**                      **Required**   **Notes**
  --------------- ----------------------------- -------------- -----------------------------------------------
  log_id          Unique ID                     Yes            System generated

  access_id       Link to Professional access   Yes            ---

  opened          Text                          Yes            The category or the item that was opened

  opened_at       Date and time                 Yes            UTC. Cannot be changed. No content is copied.
  ------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**       **Type**                      **Required**   **Notes**
  --------------- ----------------------------- -------------- ---------------------------------------------------------------------------------------
  forward_id      Unique ID                     Yes            System generated

  access_id       Link to Professional access   Yes            ---

  message_id      Link to Message               Yes            The original message. It does not change.

  copy            Text                          Yes            A copy of the sender, the sent time, the text and the attachments. Cannot be changed.

  note            Text                          No             Up to 500 characters

  sent_at         Date and time                 Yes            UTC

  opened_at       Date and time                 No             UTC. Set when the professional first opens it.
  ----------------------------------------------------------------------------------------------------------------------------------------------------

12.3 Interfaces

All interfaces are with other modules of the app.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **With**                      **What passes**                                                                                                                                                          **Features**
  ---------- ----------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ----------------
  INT-01     Accounts and Onboarding       The sign-in rules, the account of a person and the role Professional come in. The household mode comes in.                                                               PRO-01, PRO-02

  INT-02     Notifications                 The invite email, the alert when an invite is accepted, the notice when an access ends, and the email for a message sent to a professional go out.                       PRO-01, PRO-02

  INT-04     Records and Court             Certified exports and journal notes that a parent shares are read by the professional. The records follow the visibility rules of Records.                               PRO-01

  INT-05     Messaging                     Message threads and reports that a parent shares go out as read-only. A message that a parent selects goes out as a copy. A mediator can answer in a mediation thread.   PRO-01, PRO-02

  INT-06     Calendar and Parenting Time   Entries that a parent shares go out as read-only.                                                                                                                        PRO-01

  INT-07     Expenses and Payments         Expenses, the balance and recorded child support payments that a parent shares go out as read-only.                                                                      PRO-01

  INT-08     Children and Documents        Child information entries and documents that a parent shares go out as read-only.                                                                                        PRO-01

  INT-09     Child Support Sync            An agency data item that a parent shares goes out as read-only.                                                                                                          PRO-01

  INT-10     Safety and Privacy            The Safety Mode flag comes in, so that hidden details stay hidden from a professional and alerts carry no details.                                                       PRO-01
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

12.4 Non-functional requirements

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **Requirement**                                                                        **Where it applies here**
  ----------- -------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  NFR-01      Two-factor sign-in for every account (100 percent of accounts)                         A professional account signs in with two-factor sign-in before seeing anything (FR-PRO-01-05)

  NFR-02      Encryption in transit and at rest                                                      Access settings, item shares, the access log and forwarded messages

  NFR-03      Role-based access on every request                                                     The professional can only read. Every request is checked against the categories, the date range, the item shares and the status of the access (FR-PRO-01-08 to FR-PRO-01-11). Checked in tests for every role.

  NFR-04      Sign-ins, views of sensitive data and changes are logged with actor, time and result   FR-PRO-01-17, FR-PRO-01-20, FR-PRO-02-12

  NFR-05      Records cannot be edited. A change is a new entry.                                     The versions of an access, the item shares, the access log and the forwarded copy (FR-PRO-01-14, FR-PRO-02-03)

  NFR-06      Collect only the data that is needed                                                   The account of a professional keeps only the name, the email, the professional type and the organization (FR-PRO-01-02)

  NFR-09      Plain language on every screen. The standard is to be chosen.2 level AA.               All screens

  NFR-11      English only.                                                                          All screens and messages

  NFR-13      99 percent of alerts are sent within 1 minute                                          The invite email and the alerts in FR-PRO-01-03, FR-PRO-01-19 and FR-PRO-02-08
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
