**ParentPath**

Co-Parenting Application

**Requirement User Manual**

Co-parenting web application --- modules, screens, actions, rules and flows

Contents

1\. Introduction

1.1 About ParentPath

ParentPath is a co-parenting web application for parents who live apart. It gives both parents one place to message each other, plan parenting time, share and settle child costs, keep information about their children, and build a record that a court can review.

Every feature is available to every user at no charge. The application is in English.

What makes ParentPath different

-   Child support link: facts from the state child support agency (what is owed, what is paid, the next hearing) sit beside the parent\'s own records.

-   Solo Mode: a parent gets full value even if the other parent never joins.

-   Safety Mode: protections for a parent at risk, designed with domestic-violence advocates --- hidden location and contact details, discreet alerts and a quick Exit now.

-   Court-ready records: certified exports carry a Record ID that anyone can check on a public verification page.

1.2 Modules

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Chapter**   **Module**                    **What it does**
  ------------- ----------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  3             Accounts and Onboarding       Sign-up, sign-in and second check, app lock, inviting the co-parent, Solo Mode, contact with a co-parent who is not on the app, Home page, Settings, and system messages.

  4             Notifications                 Alerts by push, text and email; delivery and read status; reminders; the delivery log.

  5             Messaging                     Message threads with tone check and incoming-message shield, drafts, reports, search, folders and AI help.

  6             Calling                       Audio and video calls between parents, recording with consent, call log and transcripts.

  7             Calendar and Parenting Time   Events, parenting time, schedule changes with approval, schedule templates, holidays, sync, exchanges and check-ins.

  8             Expenses and Payments         Shared expenses with receipts, reimbursement requests, split rules, balance, disputes, payments and child support payment records.

  9             Child Support Sync            Linking a state child support case: agency balance, payments, due dates, hearings, proof to the agency and a case timeline.

  10            Records and Court             Journal notes, certified PDF, PDF and CSV exports, public verification, affidavits, court notes, deletion requests and legal holds.

  11            Children and Documents        Children, medical, school and contact information, documents with versions, photos, wish lists, tasks, share links and emergency contacts.

  12            Professionals and Access      Read-only access for lawyers, mediators and other professionals that a parent invites, with an access log.

  13            Safety and Privacy            Safety Mode, Exit now, safety resources, alert and image privacy, and AI controls.

  14            Support                       Help articles, support requests and replies, and the support staff workspace.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.3 Users and roles

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**                       **Who they are**                                              **What they can do**
  ------------------------------ ------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------
  Parent                         The account holder; either parent of the child.               Uses every module, links their own child support case, and chooses what to share with the co-parent, professionals and third parties.

  Co-parent                      The other parent, once linked to the household.               Uses the shared modules. Cannot see the other parent\'s private items, journal or child support link unless they are shared.

  Child                          A child with a limited account, where the parents allow it.   Views messages and the calendar as the parents set.

  Third party                    A grandparent, caregiver or other approved adult.             Views parts of the calendar and receives messages, as the parents set.

  Professional                   A lawyer, mediator or therapist invited by a parent.          Read-only access to what the parent shares; cannot post or change anything.

  Emergency contact              A person a parent names for emergencies.                      Receives only the emergency alerts the parent sends.

  Public visitor                 Anyone, without signing in.                                   Verifies a certified record, reads safety resources and public court information, and asks for help.

  Support agent / Support lead   ParentPath support staff.                                     Answer support requests. Cannot read parents\' messages, recordings or agency data. Leads manage notices, articles and reply templates.

  Operations staff               ParentPath staff for records and the agency link.             Review affidavit requests, watch agency data loads and support measures. Access is logged.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.4 Glossary

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Term**                  **Meaning**
  ------------------------- ------------------------------------------------------------------------------------------------------------------------------------------
  API                       A way for two systems to exchange data directly, on request. The app asks the agency system a question and gets an answer.

  Agency                    The government office that runs the child support system.

  Arrears                   Child support that is owed and has not been paid.

  Batch process             A scheduled job that sends or receives a group of records together, such as a daily file, instead of one record at a time.

  Co-parent                 The other parent of the child.

  Connector                 The part of the integration layer that handles one state\'s API and batch format and turns the data into the common format the app uses.

  Court-ready record        A record in a form a court can review, such as a certified export.

  Household                 The unit that holds the parents of a child and their shared records; its mode is Linked or Solo.

  Incoming message shield   Holds back a hostile incoming message, shows the reason and lets the user open the original, which stays in the record (MSG-06, BR-10).

  Legal hold                A rule that keeps a record from being deleted because it is tied to a case.

  Linked                    The co-parent accepted the invite and joined the household of the parent.

  Record ID                 The identifier carried by every certified export, checkable on the public verification page (BR-20).

  Safety Mode               A set of protections for a parent at risk, such as hidden location and masked contact details.

  Solo Mode                 Use of the app by one parent when the co-parent has not joined.

  Sync                      Keeping the app and the agency system in step. Read-only means the app can see agency data but not change it.

  Tone check                Private feedback to the sender on how a message may sound, before it is sent.

  Verification page         A public page where anyone can check a certified export by its record ID.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------

2\. Application Flow

2.1 Main navigation

Every signed-in screen shows the same main menu on the left and the same top bar. The menu items are:

  -----------------------------------------------------------------------
  **Menu item**           **Opens**                       **Chapter**
  ----------------------- ------------------------------- ---------------
  Home                    ACC-SCR-19                      3

  Messages                MSG-SCR-01                      5

  Calls                   CLL-SCR-06                      6

  Calendar                CAL-SCR-01                      7

  Expenses                EXP-SCR-01                      8

  Child support           CSS-SCR-03                      9

  Children                DOC-SCR-01                      11

  Documents               DOC-SCR-05                      11

  Records                 REC-SCR-B01                     10

  Professionals           PRO-SCR-01                      12

  Settings                ACC-SCR-20                      3

  Help                    SUP-SCR-01                      14
  -----------------------------------------------------------------------

The top bar shows the household name and mode (Linked or Solo), the time zone, the user menu (Profile, Settings, Sign out) and, when Safety Mode is on, the Exit now button.

Public screens (sign-up, sign-in, public verification, safety resources, public court information and shared links) show a simple header with links to Safety resources, Help and Sign in.

Support and operations staff use a separate workspace with its own menu. Professionals use a professional workspace that lists their clients.

2.2 Rules for every screen

-   Every screen has four states: empty, loading, error and success.

-   Lists show the newest item first, 25 rows per page with Load more. Filters reset when the user leaves the screen. Search matches titles and text. An empty list shows a short message and the main action.

-   One-time codes have 6 digits, are valid for 10 minutes and can be used once. Resend code is available after 60 seconds, at most 5 codes per hour.

-   Dates and times are stored in UTC and shown in the user\'s time zone.

-   Every destructive or approval action asks the user to confirm in one standard dialog.

-   Shared items can never be deleted, only archived; every change keeps the earlier version.

-   When something goes wrong, the system messages in section 3.6 (error, page not found, maintenance, offline, session timeout) are shown.

2.3 How the modules connect

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Module**                    **Uses**                                                                              **Is used by**
  ----------------------------- ------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------
  Accounts and Onboarding       Notifications (codes, invites, texts to a co-parent not on the app)                   Every module (signed-in user, household and mode)

  Notifications                 Accounts (contact details), Safety (alert preview level)                              Messaging, Calling, Calendar, Expenses, Child Support Sync, Records, Documents, Support

  Messaging                     Accounts, Notifications, Safety (shield, hidden images, contact masking)              Calling (call from a thread), Records (exports), Professionals (shared messages)

  Calling                       Messaging (start from a thread), Notifications                                        Records (call log and recordings in exports)

  Calendar and Parenting Time   Children (child list), Notifications (reminders), Child Support Sync (agency items)   Records (exports), Home (next 7 days), Professionals

  Expenses and Payments         Children (child list), Documents (receipts), Notifications                            Records (exports), Child Support Sync (payments side by side), Home

  Child Support Sync            Expenses (payments the parent recorded), Calendar (hearings), Notifications, Safety   Records (agency data in exports), Home

  Records and Court             Messaging, Calendar, Expenses, Calling, Accounts (contact log), Child Support Sync    Public verification, Professionals (affidavits), Support

  Children and Documents        Accounts (household), Notifications, Safety (hidden contact details)                  Calendar, Expenses, Records, Professionals

  Professionals and Access      Every shared item (read-only), Notifications                                          Records (access log)

  Safety and Privacy            Accounts (codes), Notifications                                                       Messaging, Calendar, Documents, Notifications, Calling, Support

  Support                       Accounts (requester), Notifications                                                   Help on every screen; sign-in help
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.4 End-to-end journeys

The journeys below connect every screen of the application. Each step names the screen; the screen sections in Chapters 3 to 14 give the detail and the full list of ways in and out.

Journey 1. Joining ParentPath and setting up the household

A parent creates an account, invites the co-parent, or chooses to use the app alone.

1.  The parent opens the ParentPath web address and chooses Sign up: ACC-SCR-01 Create account.

2.  A 6-digit code is sent; the parent enters it on ACC-SCR-14 Verify email. The send is tracked on NTF-SCR-B04 System send status.

3.  The parent lands on ACC-SCR-19 Home and invites the co-parent on ACC-SCR-05 Invite co-parent; ACC-SCR-06 Invite list and status shows sent, opened and accepted.

4.  The co-parent opens the invite link: ACC-SCR-07 Accept invite, then creates an account (ACC-SCR-01, ACC-SCR-14). The household becomes Linked and both parents see it on ACC-SCR-B01 Household overview.

5.  If the co-parent does not join, the parent chooses ACC-SCR-08 Choose Solo Mode, and can still reach the co-parent by text or email on ACC-SCR-09 Contact co-parent not on the app. Every attempt is listed on ACC-SCR-10 Contact-attempt log.

6.  Other household members (third parties, child accounts) are added on ACC-SCR-12 Household members and roles.

7.  If both parents already use the app on their own, the invited parent accepts on ACC-SCR-07 Accept invite. Both join one household, each keeps their earlier records private until shared, and the accepting parent matches children that appear in both lists.

8.  While the household is in Solo Mode, features that need the co-parent show \'Invite your co-parent to use this\', which opens ACC-SCR-05 Invite co-parent.

Journey 2. Signing in and staying secure

Every visit starts at sign-in and ends at sign-out or session end.

1.  ACC-SCR-02 Sign in, followed by the 6-digit second check on ACC-SCR-03 Second check.

2.  If App lock is on, ACC-SCR-17 Enter passcode opens when the app is reopened or idle. App lock is set on ACC-SCR-04 App lock settings.

3.  A forgotten password is reset on ACC-SCR-15 Reset password. A person who cannot get in asks for help on SUP-SCR-08 Request form on sign-in page.

4.  Two minutes before the session ends, ACC-SCR-25 Session timeout warning appears; the timeout is set on ACC-SCR-11 Session and draft settings.

5.  Profile details are changed on ACC-SCR-16 Profile, reached from ACC-SCR-20 Settings.

Journey 3. Children and their information

Parents keep the children\'s details and documents in one shared place.

1.  Main menu \> Children: DOC-SCR-01 Children list and child form. A parent adds or edits a child (up to 10).

2.  View information opens DOC-SCR-02 Child information (Medical, School, Contacts). Add information opens DOC-SCR-03 Child information entry form; the saved entry opens on DOC-SCR-04 Entry detail and history.

3.  From the child or Main menu \> Documents: DOC-SCR-05 Documents list, DOC-SCR-06 Upload a document, DOC-SCR-07 Document detail and versions. Deleted private documents can be restored on DOC-SCR-08 Recently deleted for 30 days.

4.  Photos are kept on DOC-SCR-09 Photo albums; wishes on DOC-SCR-10 Wish list; shared to-dos on DOC-SCR-11 Task lists; pets on CAL-SCR-14 Pets.

5.  A document can be shared outside the app on DOC-SCR-12 Share links; the receiver opens DOC-SCR-13 Public share link page.

6.  Emergency contacts are added on DOC-SCR-14 Emergency contacts; each contact agrees on DOC-SCR-15 Emergency contact consent page.

Journey 4. Planning parenting time

Parents keep one calendar and agree changes in writing.

1.  Main menu \> Calendar: CAL-SCR-01 Calendar. A parent adds an event on CAL-SCR-02 Event form or parenting time on CAL-SCR-03 Parenting time form.

2.  A regular schedule is set up on CAL-SCR-07 Schedule templates and builder; holidays on CAL-SCR-08 Holidays; another calendar is connected on CAL-SCR-09 Calendar sync settings.

3.  To change agreed time, the parent sends CAL-SCR-04 Schedule change request. The co-parent receives an alert (NTF-SCR-B01 Message alert) and answers on CAL-SCR-05 Request detail, answer and undo.

4.  Every change and answer is listed on CAL-SCR-06 Entry and request history. Reminders arrive as NTF-SCR-B02 Reminder alert.

5.  Hand-overs are recorded on CAL-SCR-10 Exchange record, with CAL-SCR-13 Check-in at the exchange time. CAL-SCR-11 Compliance view compares scheduled and actual time; CAL-SCR-12 Parenting plan builder writes the plan.

Journey 5. Messaging the co-parent

All communication between parents is kept as a record.

1.  Main menu \> Messages: MSG-SCR-01 Thread list, with MSG-SCR-08 Search, MSG-SCR-09 Folders and topics and MSG-SCR-10 Attachments.

2.  New message opens MSG-SCR-03 New message and reply. Tone check may suggest a calmer wording; MSG-SCR-B01 AI rewrite and MSG-SCR-12 AI coach help further. Unsent text is kept on MSG-SCR-04 Drafts.

3.  The co-parent receives NTF-SCR-B01 Message alert and opens MSG-SCR-02 Thread and message view. A hostile incoming message is held on MSG-SCR-06 Held message; hidden images show as SAF-SCR-09 Hidden image placeholder.

4.  The sender sees delivery and read status on NTF-SCR-03 Message status and NTF-SCR-B03 Delivery log.

5.  A message can be reported on MSG-SCR-07 Report a message. Thread members are listed on MSG-SCR-11 Group thread members; mediation is asked for on MSG-SCR-13 Mediation request.

6.  AI tools are set on MSG-SCR-05 AI settings and SAF-SCR-10 AI and your data.

Journey 6. Calling the co-parent

Calls are started from a thread and kept in the call log.

1.  From MSG-SCR-02 Thread and message view, Call opens CLL-SCR-02 Place a call.

2.  The co-parent sees CLL-SCR-03 Incoming call and answers; both are on CLL-SCR-04 Call screen.

3.  If a parent asks to record, the other parent answers on CLL-SCR-05 Recording request.

4.  Main menu \> Calls: CLL-SCR-06 Call log, recordings and transcripts; consent answers are on CLL-SCR-07 Consent log. Devices and recording choices are set on CLL-SCR-01 Calling settings.

Journey 7. Sharing child costs

Parents record costs, ask to be paid back and keep a running balance.

1.  Main menu \> Expenses: EXP-SCR-01 Expense log. Add expense opens EXP-SCR-02 Add or edit expense (or EXP-SCR-14 AI-assisted entry from a receipt photo).

2.  The expense opens on EXP-SCR-03 Expense detail. Ask to be paid back opens EXP-SCR-04 Reimbursement request form.

3.  The co-parent sees the request on EXP-SCR-06 Request list and history and answers on EXP-SCR-05 Request detail; it can be paid on EXP-SCR-12 Pay a request or disputed on EXP-SCR-11 Dispute.

4.  EXP-SCR-09 Running balance shows who owes what, using the split rules on EXP-SCR-10 Split rules.

5.  Regular payments are on EXP-SCR-13 Scheduled payments (with EXP-SCR-16 Credit building); bills on EXP-SCR-15 Bills; older costs are brought in on EXP-SCR-17 Import past expenses.

6.  A parent records child support they paid on EXP-SCR-07 Record a child support payment; the private list is on EXP-SCR-08 Child support payments.

7.  A disputed expense shows the label Disputed and stays in the balance. Both parents can add notes, and the parent who opened the dispute closes it.

Journey 8. Linking the child support case

A parent links their state child support case to see agency facts beside their own records.

1.  Main menu \> Child support: CSS-SCR-01 Link a case, then CSS-SCR-02 Consent.

2.  CSS-SCR-03 Child support overview shows status, order, arrears and next hearing.

3.  CSS-SCR-04 Payments side by side compares agency payments with EXP-SCR-08 Child support payments. Due dates and reminders are on CSS-SCR-05 Due dates and reminders; hearings and appointments appear in the calendar (CSS-SCR-06 Agency items in the calendar).

4.  Agency items are shared with the co-parent on CSS-SCR-07 Share an item and received on CSS-SCR-08 Shared with you.

5.  Proof of payment is sent on CSS-SCR-10 Send proof to the agency and CSS-SCR-11 Proof package. CSS-SCR-14 Timeline lists case events; CSS-SCR-15 Hearing packet builds a packet for a hearing; CSS-SCR-13 Invite through agency notice invites the co-parent.

6.  If the agency marks a family violence flag, Safety Mode is offered (CSS-SCR-12 Offer of Safety Mode, SAF-SCR-06 Offer from family violence flag).

7.  The link is ended on CSS-SCR-09 Unlink and export. Operations staff watch agency loads on CSS-SCR-16 Load log for operations.

Journey 9. Keeping a court-ready record

Parents keep notes and export certified records that anyone can verify.

1.  Main menu \> Records: REC-SCR-B01 Records home.

2.  Private notes: REC-SCR-04 Journal list, REC-SCR-05 Journal entry form, REC-SCR-06 Journal entry detail.

3.  Export: REC-SCR-01 Export records (certified PDF, PDF or CSV), then REC-SCR-02 Export history to download and copy the Record ID.

4.  A court or lawyer checks the Record ID on REC-SCR-03 Public verification page.

5.  A notarized affidavit is asked for on REC-SCR-07 Affidavit request and followed on REC-SCR-08 Affidavit request status; staff decide on REC-SCR-09 Staff review of affidavits.

6.  Public information: REC-SCR-10 Public records request page, REC-SCR-11 Public court notes by state, REC-SCR-12 Public model order language, REC-SCR-13 Public retention policy.

7.  A parent asks to delete non-record data on REC-SCR-14 Deletion request; REC-SCR-15 Legal hold shows when deletion is blocked.

Journey 10. Giving a professional access

A parent lets a lawyer or mediator see chosen records, read-only.

1.  Main menu \> Professionals: PRO-SCR-01 My professionals, then PRO-SCR-02 Invite a professional.

2.  The professional opens the invite link (PRO-SCR-06 Accept invite) and works on PRO-SCR-07 Professional home and PRO-SCR-08 Client view.

3.  The parent changes or ends access on PRO-SCR-03 Access settings, shares single items on PRO-SCR-04 Share an item with a professional, and sees what was opened on PRO-SCR-05 Access log.

4.  A parent sends one message to a professional on PRO-SCR-09 Send one message to a professional; the professional reads it on PRO-SCR-10 Messages from a parent.

5.  When access is given, the co-parent is alerted with the professional\'s name.

Journey 11. Staying safe

A parent at risk turns on Safety Mode and can leave quickly at any time.

1.  ACC-SCR-20 Settings \> Safety Mode: SAF-SCR-01 Safety Mode settings, then SAF-SCR-02 Safety notice and confirm.

2.  With Safety Mode on, Exit now (or Escape twice) opens SAF-SCR-12 Exit now confirmation, then SAF-SCR-04 Exit now and neutral page.

3.  Safety Mode is turned off with a code on SAF-SCR-03 Enter code to turn off. Help without signing in is on SAF-SCR-05 Public safety resources.

4.  Alert previews and image hiding are set on SAF-SCR-07 Alerts and images settings; choosing message text in alerts shows SAF-SCR-08 Warning for Name and text.

5.  AI use is reviewed on SAF-SCR-11 AI use log.

Journey 12. Settings and notifications

All personal settings are reached from one Settings page.

1.  Main menu \> Settings: ACC-SCR-20 Settings.

2.  Notification channels and reminder times are set on NTF-SCR-01 Notification settings; NTF-SCR-02 Notification health check sends a test; NTF-SCR-04 Quiet windows and limits sets quiet hours.

3.  Closing the account starts on ACC-SCR-18 Close account, which offers REC-SCR-01 Export records and REC-SCR-14 Deletion request first.

Journey 13. Getting help

Users find answers or contact support; staff handle the requests.

1.  Main menu \> Help: SUP-SCR-01 Help. Search shows SUP-SCR-02 Help center search results; an answer opens on SUP-SCR-03 Article.

2.  Contact support opens SUP-SCR-04 New request form, then SUP-SCR-05 Request confirmation. The user follows the case on SUP-SCR-06 My requests and SUP-SCR-07 Request thread.

3.  Support staff work the case from SUP-SCR-09 Staff queue on SUP-SCR-10 Staff case view, using SUP-SCR-13 Reply templates.

4.  Support leads publish SUP-SCR-11 Service notices and SUP-SCR-12 Help article editor content; operations staff review SUP-SCR-14 Support measures report.

Journey 14. When something goes wrong

System messages can appear on any screen.

1.  An unexpected problem shows ACC-SCR-21 Error page, with Contact support and Try again.

2.  A wrong link or a page the user may not open shows ACC-SCR-22 Page not found or not allowed.

3.  During planned maintenance every page shows ACC-SCR-23 Maintenance page.

4.  When the connection drops, ACC-SCR-24 Offline banner appears and typed text is kept.

5.  Before the session ends, ACC-SCR-25 Session timeout warning appears; Sign out returns to ACC-SCR-02 Sign in.
