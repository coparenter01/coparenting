# Support (SUP)


14.1 Functional requirements and acceptance criteria

SUP-01 Support targets, case numbers and a searchable help center

US-SUP-01-01. As a parent, I want to ask for help, get a case number and know when I will get a reply, so that I am not left waiting without an answer.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-SUP-01-01      The system shall let a signed-in user open a support request from the Help screen.

  FR-SUP-01-02      The system shall let a person who cannot sign in open a request from the sign-in page with an email address and no account.

  FR-SUP-01-03      The system shall accept a request sent by email to the support address and create a case from it.

  FR-SUP-01-04      The request form shall have the fields category, subject (1 to 120 characters), description (1 to 5,000 characters), the question whether the issue is about a court date, and optional files. Category, subject and description are required.

  FR-SUP-01-05      The form shall offer the categories Account and sign-in, Messages and calls, Calendar and expenses, Records and exports, Child support link, Safety, and Something else.

  FR-SUP-01-06      The form should accept up to 3 files, 10 MB in all, as JPG, PNG, PDF or DOCX. It should scan every file for malware and refuse a file that fails or has another type.

  FR-SUP-01-07      The system shall give every request a case number at once. The number is SC- followed by 8 digits, is never reused, and shows on the screen, in the confirmation and in every reply.

  FR-SUP-01-08      After a request is saved, the system shall show a confirmation with the case number, the reply target and, when support is closed, the next opening time (MSGT-02). It shall also send the confirmation by email, except for a user in Safety Mode.

  FR-SUP-01-09      The system shall let a signed-in user see their own cases in My requests, each with its status and the full thread.

  FR-SUP-01-10      The system shall give a case one of the statuses New, In progress, Waiting for you, Resolved or Closed.

  FR-SUP-01-11      The system shall let the user reply to a case in the app or by replying to the email. A reply joins the same case.

  FR-SUP-01-12      The system should let a user reopen a Resolved or Closed case by replying within 30 days. After 30 days a reply should open a new case that is linked to the earlier one.

  FR-SUP-01-13      The system should move a Resolved case to Closed after 7 days with no reply, and should tell the user (MSGT-09).

  FR-SUP-01-14      The system shall show the support hours, Monday to Friday 8 am to 8 pm Eastern, on the Help screen, on the form and in the confirmation. Support is closed on US federal holidays.

  FR-SUP-01-15      The system shall set the target for the first reply of a normal case to 1 business day, and the target for each later reply to 1 business day after the reply of the user. The clock runs only in support hours, and 1 business day is 12 support hours.

  FR-SUP-01-16      The system shall mark a case Priority and set the target for the first reply to 4 working hours when the category is Safety, or when the user says the issue is about a court date and enters a date within the next 14 days.

  FR-SUP-01-17      If the court date that the user enters is in the past, the system shall not accept it and shall show ERR-07.

  FR-SUP-01-18      The system shall let any person search the help center by keyword and browse it by topic. A result shows the title and a short extract.

  FR-SUP-01-19      The help center shall be open without sign-in, so that a person who cannot sign in can read it.

  FR-SUP-01-20      Each article should show the date it was last updated, ask Was this article helpful with the answers Yes and No, and have a link to contact support.

  FR-SUP-01-21      While a user types the subject of a request, the form should suggest up to 3 matching articles.

  FR-SUP-01-22      When no article matches a search, the system shall show MSGT-04 and a link to contact support.

  FR-SUP-01-23      The system should show a service notice on the Help screen and in the help center while the notice is active.

  FR-SUP-01-24      For a user in Safety Mode, the system shall put the replies in the app and shall send email alerts with no case details and no app name.

  FR-SUP-01-25      The form shall warn the user not to write passwords, full Social Security numbers or card numbers (MSGT-01).

  FR-SUP-01-26      For the category Safety, the form shall show the emergency notice and the help links (MSGT-05). The text and the links are approved with advocates.

  FR-SUP-01-28      When a case is Resolved, the system should ask the user Did we solve your problem with the answers Yes and No (MSGT-07).

  FR-SUP-01-29      The system should let one user or one email address open up to 10 requests a day and should show ERR-05 for the 11th.

  FR-SUP-01-30      If a request or a reply cannot be saved, the system shall show ERR-01 or ERR-08 and shall save nothing. If a required field is missing or too long, it shall show ERR-02.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                           **When**                                                                                                     **Then**                                                                                                                                       **Covers**
  -------------- ----------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------ ---------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-SUP-01-01   A signed-in user                                                                    They open the Help screen and choose to contact support                                                      The request form opens                                                                                                                         FR-SUP-01-01

  AC-SUP-01-02   A person on the sign-in page who cannot sign in                                     They enter an email address and the form fields                                                              A case is created with no account linked                                                                                                       FR-SUP-01-02

  AC-SUP-01-03   A person who writes to the support address                                          The email arrives                                                                                            A case is created from it with a case number                                                                                                   FR-SUP-01-03

  AC-SUP-01-04   A user on the form                                                                  They leave out the subject, or write a subject of 121 characters, or a description of 5,001 characters       The request is not saved and ERR-02 shows                                                                                                      FR-SUP-01-04, FR-SUP-01-30

  AC-SUP-01-05   A user on the form                                                                  They open the category list                                                                                  It shows the 8 categories of FR-SUP-01-05                                                                                                      FR-SUP-01-05

  AC-SUP-01-06   A user on the form                                                                  They attach 3 files of 3 MB, then a 4th file, then a file of another type, then a file that fails the scan   The 3 files are saved, and the next three attempts are refused with ERR-04, ERR-03 and ERR-06                                                  FR-SUP-01-06

  AC-SUP-01-07   A saved request                                                                     A tester looks at the case number                                                                            It is SC- and 8 digits, shows on the screen, and was not used before                                                                           FR-SUP-01-07

  AC-SUP-01-08   A request that is saved at 9:00 on a weekday, and one saved at 21:00 on a weekday   Each is saved                                                                                                Each gets the confirmation with the case number and the target (MSGT-02), the second shows the next opening time, and both are sent by email   FR-SUP-01-08

  AC-SUP-01-09   A signed-in user with two cases                                                     They open My requests                                                                                        Both cases show with their status and the full thread                                                                                          FR-SUP-01-09

  AC-SUP-01-10   A case                                                                              A tester looks at its status over its life                                                                   The status is always one of New, In progress, Waiting for you, Resolved or Closed                                                              FR-SUP-01-10

  AC-SUP-01-11   A case with a reply from support                                                    The user replies in the app, and later replies to the email                                                  Both replies are in the same case                                                                                                              FR-SUP-01-11

  AC-SUP-01-12   A case that was Resolved 10 days ago, and one that was Closed 31 days ago           The user replies to each                                                                                     The first case reopens and the second reply opens a new case linked to the earlier one                                                         FR-SUP-01-12

  AC-SUP-01-13   A Resolved case with no reply for 7 days                                            The 7 days pass                                                                                              The case is Closed and the user is told (MSGT-09)                                                                                              FR-SUP-01-13

  AC-SUP-01-14   The Help screen, the form and a confirmation                                        A user opens each                                                                                            Each shows Monday to Friday, 8 am to 8 pm Eastern, and the Help screen shows MSGT-10 when support is closed                                    FR-SUP-01-14

  AC-SUP-01-15   A normal case sent on Friday at 19:00 Eastern                                       The target is set                                                                                            The target for the first reply is Monday at 19:00 Eastern, which is 1 business day inside support hours                                        FR-SUP-01-15

  AC-SUP-01-16   A case in the category Safety, and a case about a court date in 10 days             Each is saved                                                                                                Both are marked Priority and the target for the first reply is 4 working hours                                                                 FR-SUP-01-16

  AC-SUP-01-17   A case about a court date in 30 days                                                It is saved                                                                                                  It is not marked Priority and the target is 1 business day                                                                                     FR-SUP-01-16

  AC-SUP-01-18   A user on the form                                                                  They enter a court date of yesterday                                                                         The request is not saved and ERR-07 shows                                                                                                      FR-SUP-01-17

  AC-SUP-01-19   A help center with articles                                                         A person searches for the word calendar and browses the topic Calendar and expenses                          Matching articles show with a title and a short extract in both ways                                                                           FR-SUP-01-18

  AC-SUP-01-20   A person who is not signed in                                                       They open the help center                                                                                    The articles show without sign-in                                                                                                              FR-SUP-01-19

  AC-SUP-01-21   An article                                                                          A person opens it and answers No to Was this article helpful                                                 The article shows its last updated date and a contact support link, and the answer is saved                                                    FR-SUP-01-20

  AC-SUP-01-22   A user on the form                                                                  They type a subject that matches articles                                                                    Up to 3 articles are suggested                                                                                                                 FR-SUP-01-21

  AC-SUP-01-23   A search with no match                                                              A person searches                                                                                            MSGT-04 shows with a link to contact support                                                                                                   FR-SUP-01-22

  AC-SUP-01-24   An active service notice                                                            A user opens the Help screen                                                                                 The notice shows (MSGT-08)                                                                                                                     FR-SUP-01-23

  AC-SUP-01-25   A user in Safety Mode with a case                                                   Support replies                                                                                              The reply shows in the app, and the email alert has no case details and no app name                                                            FR-SUP-01-24

  AC-SUP-01-26   A user on the form                                                                  They open it                                                                                                 The warning about passwords, Social Security numbers and card numbers shows (MSGT-01)                                                          FR-SUP-01-25

  AC-SUP-01-27   A user on the form                                                                  They choose the category Safety                                                                              The emergency notice and the help links show (MSGT-05)                                                                                         FR-SUP-01-26

  AC-SUP-01-29   A case that was just set to Resolved                                                The user opens it                                                                                            The question Did we solve your problem shows with Yes and No (MSGT-07)                                                                         FR-SUP-01-28

  AC-SUP-01-30   A user who opened 10 requests today                                                 They open an 11th                                                                                            The 11th is refused and ERR-05 shows                                                                                                           FR-SUP-01-29

  AC-SUP-01-31   A request that cannot be saved, and a reply that cannot be saved                    The user sends each                                                                                          Nothing is saved and ERR-01 and ERR-08 show                                                                                                    FR-SUP-01-30
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SUP-02 Staff support workspace (proposed)

US-SUP-02-01. As a support agent, I want one queue with the urgent cases first and the facts I need, so that I reply on time without seeing what I must not see.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-SUP-02-01     The system shall open the staff workspace only after the support staff member has passed two-factor sign-in.

  FR-SUP-02-02     The system shall show a queue of all open cases. Priority cases come first, then the oldest case first. Each case shows the time left to its target.

  FR-SUP-02-03     The case view shall show the name, the email, the account status, the household mode (Linked or Solo), whether a child support case is linked, and the thread. It shall never show messages, call recordings or agency values.

  FR-SUP-02-04     An Agent shall be able to assign a case to themselves. A Lead shall be able to assign any case to any Agent.

  FR-SUP-02-05     A staff member shall be able to reply to the parent from the case. The system shall alert the parent (MSGT-03). The staff member shall be able to add internal notes that only staff can see.

  FR-SUP-02-06     The system should let a Lead keep reply templates. A template can be used only when legal approval of its wording is recorded. An Agent can insert a template and edit the text. No template gives legal advice.

  FR-SUP-02-07     A staff member shall be able to change the status and the category of a case. The system shall log every change.

  FR-SUP-02-08     A staff member should be able to lower a Priority case to normal only with a note. The system should tell the parent (MSGT-06) and should count the target from the time of the request.

  FR-SUP-02-09     The system shall alert the Leads when a case is within 1 working hour of missing its target, and again when it misses it.

  FR-SUP-02-10     The system shall never show a staff member a password or a one-time code. A staff member shall not be able to change the email or the mobile number of a user. Recovery sends a link only to the email or the mobile number on file.

  FR-SUP-02-11     A staff member shall not be able to change any setting of a user, including Safety Mode. The case view shall not show whether Safety Mode is on.

  FR-SUP-02-12     A staff member shall never contact the co-parent about the case of a parent, and shall never confirm to the co-parent that a case exists.

  FR-SUP-02-13     A message that a parent shared with consent for a review of a wrong hold or a wrong label shall be visible to Leads only. The Lead sees that one message and the record of the consent, and nothing else of the thread of messages.

  FR-SUP-02-15     The system should let a Lead post a service notice with a text of up to 500 characters and a start and an end time. If the text is longer or the end is not after the start, the system should show ERR-11.

  FR-SUP-02-16     The system shall let a Lead create, edit, publish and unpublish help articles, and shall keep the earlier versions. If the title or the text is missing, the system shall show ERR-10 and shall not publish.

  FR-SUP-02-17     The system shall show an alert about a failed or late batch load in the queue as an internal item, with no case values.

  FR-SUP-02-18     The system shall write an audit log entry for every view and every change of a case, with the staff member, the time and the case number.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                             **When**                                                                                                                                     **Then**                                                                                                                                                                               **Covers**
  -------------- ------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-SUP-02-01   A staff member who has not passed the second check                                    They open the workspace                                                                                                                      It does not open                                                                                                                                                                       FR-SUP-02-01

  AC-SUP-02-02   A normal case 5 hours old, a Priority case 1 hour old and a normal case 2 hours old   The queue opens                                                                                                                              The Priority case shows first, then the 5-hour case, then the 2-hour case, each with the time left                                                                                     FR-SUP-02-02

  AC-SUP-02-03   A case                                                                                An Agent opens it                                                                                                                            The case view shows the name, the email, the account status, the household mode, whether a child support case is linked and the thread, and no messages, recordings or agency values   FR-SUP-02-03

  AC-SUP-02-04   An unassigned case and a Lead                                                         An Agent assigns the case to themselves, the Agent tries to assign another case to a second Agent, and the Lead assigns a case to an Agent   The first and the third assignments are saved and the second is not possible                                                                                                           FR-SUP-02-04

  AC-SUP-02-05   A case                                                                                A staff member replies and adds an internal note                                                                                             The parent sees the reply and is alerted (MSGT-03), and the note shows to staff only                                                                                                   FR-SUP-02-05

  AC-SUP-02-06   A template with a recorded legal approval, and one without                            An Agent looks for templates                                                                                                                 Only the approved template is offered, and the Agent can edit its text                                                                                                                 FR-SUP-02-06

  AC-SUP-02-07   A case                                                                                A staff member changes the status and the category                                                                                           Both changes are saved and logged                                                                                                                                                      FR-SUP-02-07

  AC-SUP-02-08   A Priority case                                                                       A staff member lowers it without a note, and then with a note                                                                                The first try is refused with ERR-09, and the second is saved and the parent is told (MSGT-06)                                                                                         FR-SUP-02-08

  AC-SUP-02-09   A case with 1 working hour left, and a case that missed its target                    Each happens                                                                                                                                 The Leads get one alert for the first and one for the second                                                                                                                           FR-SUP-02-09

  AC-SUP-02-10   A staff member                                                                        They look for a password, a code, or a way to change an email or a mobile number                                                             None is offered, and recovery sends a link to the email on file                                                                                                                        FR-SUP-02-10

  AC-SUP-02-11   An account in Safety Mode                                                             A staff member opens the case                                                                                                                The case view does not show whether Safety Mode is on and offers no way to change a setting                                                                                            FR-SUP-02-11

  AC-SUP-02-12   A case of a parent                                                                    A staff member looks for a way to contact the co-parent                                                                                      None is offered, and nothing about the case shows to the co-parent                                                                                                                     FR-SUP-02-12

  AC-SUP-02-13   A message shared with consent in a case                                               An Agent and a Lead open the case                                                                                                            The Agent cannot see the message, and the Lead sees that one message and the record of the consent                                                                                     FR-SUP-02-13

  AC-SUP-02-15   A Lead                                                                                They post a notice of 500 characters, one of 501 characters, and one whose end is before its start                                           The first is saved, and the other two are refused with ERR-11                                                                                                                          FR-SUP-02-15

  AC-SUP-02-16   A Lead                                                                                They create a draft, try to publish it without a title, publish it with a title, edit it and unpublish it                                    The first publish is refused with ERR-10, the draft is hidden from the public, the published article shows, and the earlier version is kept                                            FR-SUP-02-16

  AC-SUP-02-17   A failed batch load                                                                   The alert arrives                                                                                                                            It shows in the queue as an internal item with no case values                                                                                                                          FR-SUP-02-17

  AC-SUP-02-18   A staff member who views a case and changes it                                        Each is done                                                                                                                                 The audit log has an entry for each with the staff member, the time and the case number                                                                                                FR-SUP-02-18
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SUP-03 Support measures report (proposed)

US-SUP-03-01. As the manager of support, I want to see how fast we reply and whether we meet the targets, so that I can add staff or hours when the data shows a need.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-SUP-03-01         The system should let a Lead open a report for a week or a month.

  FR-SUP-03-02         The report should show the cases opened and closed, the time to the first reply (the median and the 90th percentile), the share of first replies inside the target, the share of Priority cases answered inside 4 working hours, the reopen rate and the backlog by age.

  FR-SUP-03-03         ---

  FR-SUP-03-04         The report should show the 20 most used help searches, the searches with no result, and the Yes and No answers for each article.

  FR-SUP-03-05         The report should show the share of Yes answers to the question Did we solve your problem.

  FR-SUP-03-06         The report shall hold no case text and no personal data.

  FR-SUP-03-07         The system should let a Lead export the report as a CSV file.

  FR-SUP-03-08         The report should show the target of 95 percent next to each share.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                 **When**                                             **Then**                                                                                                                                                                                                               **Covers**
  -------------- ----------------------------------------- ---------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-SUP-03-01   A Lead                                    They choose the last week, and then the last month   A report shows for each period                                                                                                                                                                                         FR-SUP-03-01

  AC-SUP-03-02   A week with 40 cases                      The Lead opens the report                            It shows the cases opened and closed, the median and the 90th percentile of the first reply, the share inside the target, the share of Priority cases inside 4 working hours, the reopen rate and the backlog by age   FR-SUP-03-02

  AC-SUP-03-04   A help center with searches and answers   The Lead opens the report                            It shows the 20 most used searches, the searches with no result and the Yes and No answers for each article                                                                                                            FR-SUP-03-04

  AC-SUP-03-05   10 cases with 8 answers Yes               The Lead opens the report                            The share of Yes answers shows as 80 percent                                                                                                                                                                           FR-SUP-03-05

  AC-SUP-03-06   A report                                  A tester looks at it                                 It has no case text and no names, emails or phone numbers                                                                                                                                                              FR-SUP-03-06

  AC-SUP-03-07   A report on the screen                    The Lead exports it                                  A CSV file with the same figures is created                                                                                                                                                                            FR-SUP-03-07

  AC-SUP-03-08   A report on the screen                    The Lead looks at a share                            The target of 95 percent shows next to it                                                                                                                                                                              FR-SUP-03-08
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

14.2 Data reference

  -----------------------------------------------------------------------
  **Entity**                   **Fields used**
  ---------------------------- ------------------------------------------
  User                         user_id, email, role, status

  Household                    mode (Linked, Solo)

  Audit log entry              actor, action, object, result, time
  -----------------------------------------------------------------------

8.3 New entities (proposed). The sources name none of these fields. They are a BA proposal.

Support case

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**             **Type**               **Required**   **Notes**
  --------------------- ---------------------- -------------- ---------------------------------------------------------------------------------------------------------------------------------
  case_id               Unique ID              Yes            System generated

  case_number           Text                   Yes            SC- and 8 digits. Never reused.

  user_id               Link to User           No             Empty for a person who cannot sign in or for an unknown email

  requester_email       Text                   Yes            ---

  source                Choice                 Yes            App form, Sign-in page, Email request

  category              Choice                 Yes            Account and sign-in, Messages and calls, Calendar and expenses, Records and exports, Child support link, Safety, Something else

  subject               Text                   Yes            1 to 120 characters

  status                Choice                 Yes            New, In progress, Waiting for you, Resolved, Closed

  priority              Choice                 Yes            Normal, Priority

  priority_reason       Choice                 No             Court date, Safety

  court_date            Date                   No             Not in the past when saved

  assigned_to_user_id   Link to User           No             A support staff member

  related_case_id       Link to Support case   No             Set when a reply after 30 days opens a new case

  created_at            Date and time          Yes            UTC

  target_at             Date and time          Yes            UTC. The time by which the next reply is due.

  first_reply_at        Date and time          No             UTC

  resolved_at           Date and time          No             UTC

  closed_at             Date and time          No             UTC

  solved                Choice                 No             Yes, No, no answer
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Case message

  --------------------------------------------------------------------------------------------
  **Field**         **Type**               **Required**   **Notes**
  ----------------- ---------------------- -------------- ------------------------------------
  message_id        Unique ID              Yes            System generated

  case_id           Link to Support case   Yes            ---

  author_type       Choice                 Yes            Parent, Staff, System

  author_user_id    Link to User           No             ---

  body              Text                   Yes            Up to 5,000 characters

  internal          Yes or No              Yes            Yes for a note that only staff see

  created_at        Date and time          Yes            UTC. Cannot be changed.
  --------------------------------------------------------------------------------------------

A case message cannot be edited or deleted. A change is a new message. Files of a case are kept with the message (name, type, size and file ID).

Help article

  ------------------------------------------------------------------------------------------------------
  **Field**        **Type**         **Required**   **Notes**
  ---------------- ---------------- -------------- -----------------------------------------------------
  article_id       Unique ID        Yes            System generated

  title            Text             Yes            ---

  body             Text             Yes            ---

  topic            Choice           Yes            The same list as the categories of the request form

  language         Choice           Yes            English.

  status           Choice           Yes            Draft, Published, Unpublished

  updated_at       Date and time    Yes            UTC. Shown to readers.

  version          Number           Yes            Earlier versions are kept
  ------------------------------------------------------------------------------------------------------

Other entities. Reply template: template_id, title, body, legal_approved_on (a date). Service notice: notice_id, text (up to 500 characters), starts_at, ends_at, posted_by_user_id. Article feedback: article_id, helpful (Yes or No), created_at, and no user. Search log entry: term, result_count, created_at, and no user. Consent record for a message shared for review: message reference, user_id, consented_at (written by Messaging, read by Support Leads).

14.3 Interfaces

All interfaces except INT-07 are with other modules of the app or with services that the app already uses.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **With**                  **What passes**                                                                                                                  **Features**
  ----------- ------------------------- -------------------------------------------------------------------------------------------------------------------------------- ----------------
  INT-01      Notifications             The case confirmation, the reply alert and the alert to the Leads go out.                                                        SUP-01, SUP-02

  INT-03      Accounts and Onboarding   The name, the email, the status and the household mode come in. Two-factor sign-in for staff.                                    SUP-01, SUP-02

  INT-04      Safety and Privacy        The Safety Mode flag of a user comes in, read-only.                                                                              SUP-01, SUP-02

  INT-05      Messaging                 A message that a parent shared with consent goes to the Leads.                                                                   SUP-02

  INT-06      Child Support Sync        Alerts about failed or late batch loads come in.                                                                                 SUP-02

  INT-07      Support email service     Email to the support address comes in and creates a case or a reply. Confirmations and replies go out. IT chooses the service.   SUP-01

  INT-08      Help center search        The search runs over the published articles.                                                                                     SUP-01

  INT-09      Malware scan              Files of a request are scanned before they are saved.                                                                            SUP-01
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

14.4 Non-functional requirements

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Requirement**                                                                                                                      **Where it applies here**
  -------------- ------------------------------------------------------------------------------------------------------------------------------------ ------------------------------------------
  NFR-01         Two-factor sign-in for every account                                                                                                 FR-SUP-02-01 (staff)

  NFR-02         Encryption in transit and at rest                                                                                                    Cases, files and internal notes

  NFR-03         Role-based access on every request                                                                                                   FR-SUP-02-03, FR-SUP-02-04, FR-SUP-02-13

  NFR-04         Changes and views are logged with actor, time and result                                                                             FR-SUP-02-07, FR-SUP-02-18

  NFR-05         Records cannot be edited. A change is a new entry.                                                                                   Case messages (section 8.3)

  NFR-06         Collect only the data that is needed                                                                                                 FR-SUP-01-25, FR-SUP-03-06

  NFR-09         Plain language on every screen. The standard is to be chosen.2 level AA.                                                             The help center and the request form

  NFR-11         English                                                                                                                              Articles, the form and replies

  NFR-18 (new)   95 percent of first replies are sent inside the target, and 95 percent of Priority cases get a first reply inside 4 working hours.   FR-SUP-01-15, FR-SUP-01-16, FR-SUP-03-08
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
