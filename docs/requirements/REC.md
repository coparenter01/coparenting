# Records and Court (REC)


10.1 Functional requirements and acceptance criteria

REC-01 Certified court-ready record exports with record ID and public verification page

US-REC-01-01. As a parent, I want a certified export of our messages, calendar and expenses with an ID that a court can check, so that I can show the record is genuine.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Requirement**
  --------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-REC-01-01    The system shall let a parent make a certified export by choosing the record types (Messages, Calendar, Expenses, Child support payments I recorded, Contact attempts, Journal notes and Agency data) and a date range.

  FR-REC-01-02    The system shall require a start date that is not after the end date and an end date that is not in the future, and shall show ERR-01 if not. It shall show ERR-02 if no record type is chosen.

  FR-REC-01-03    The system shall put in an export only what the exporting user can see on screen at the time. A Private item shows only to the parent who created it, and the Safety Mode hiding rules apply.

  FR-REC-01-04    For Messages, the system shall include every message in the range with its sent time and first-read time, its attachments, the delivery status with the time of each status, and the reports of the exporting parent. A held message shows its original. The export shall not include tone feedback, AI suggestions, coach chats or hold labels.

  FR-REC-01-05    When the recipient of a message is in Safety Mode, the system shall not show the first-read time or the status Read to the sender in the export.

  FR-REC-01-06    For Calendar, the system shall include the entries with their versions, the schedule change requests with their history, the exchange records and the check-ins that the exporting user can see.

  FR-REC-01-07    For Expenses, the system shall include the expenses with their versions and files, the reimbursement requests with their history, and, when they exist, the split rules, the disputes and the balance.

  FR-REC-01-08    The system shall include child support payments the parent recorded, the contact-attempt log and invite list, journal notes and agency data only when the parent selects them.

  FR-REC-01-09    If no item matches the chosen record types and date range, the system shall not make an export and shall show MSGT-03.

  FR-REC-01-10    The system shall make a certified export as a PDF with a cover page that shows the name of the exporting user, the date and time it was made (in UTC and in local time), the date range, the record types, the Record ID, the number of pages and the certification statement. Every page shall show the Record ID and the page number as Page x of y.

  FR-REC-01-11    The certification statement (MSGT-09) shall say that the record was created by ParentPath from the data in the account, that it is court-ready, and that a court decides what it accepts. Counsel approves the wording.

  FR-REC-01-12    The system shall give each certified export a Record ID of 16 uppercase letters and digits in 4 groups of 4 separated by hyphens. The ID is unique, never changes and is never used again.

  FR-REC-01-13    The system shall sign the PDF digitally and save a digital fingerprint of the file, so that any change after it was made can be found.

  FR-REC-01-14    The system shall keep every certified file and its fingerprint for the retention period set by counsel, and shall let the parent who made it download it again from the export history.

  FR-REC-01-15    The system shall give a public verification page. Anyone can enter a Record ID without signing in. For a valid ID, the page shows MSGT-05 with the date and time made, the number of pages and the record types. It shows no name and no content. For an unknown ID it shows MSGT-06.

  FR-REC-01-16    The system shall let a visitor of the verification page upload a PDF of up to 25 MB. The page then says whether the file is the same as the record (MSGT-07 or MSGT-08). The system shall not keep the uploaded file. A file that is not a PDF or is too large shows ERR-05.

  FR-REC-01-17    After 10 failed lookups from one device within 10 minutes, the system shall refuse further lookups from it for 15 minutes and show ERR-04.

  FR-REC-01-18    The system shall log every lookup with the text entered, the result and the time. It shall not save personal data of the visitor.

  FR-REC-01-19    The system shall make certified exports available to every user, and shall not limit the number of exports.

  FR-REC-01-20    The system shall show an export as Preparing, Ready or Failed. It shall show MSGT-01 when the export starts, and alert the parent through the Notifications module when it is Ready (MSGT-02).

  FR-REC-01-21    The system shall never change the source data when it makes an export. A change made after an export is not in that export. A new export gets a new Record ID.

  FR-REC-01-22    The system shall let the Parent and the Co-parent make exports. A professional can read a certified export only when the parent shares it (PRO-01). No other role can read it.

  FR-REC-01-23    The system shall write an audit log entry for every export made, with the record types, the date range, the Record ID, the actor, the time and the result.

  FR-REC-01-24    If an export cannot be made, the system shall set it to Failed, show ERR-03 and not issue a Record ID.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                          **When**                                                                                             **Then**                                                                                                                                                                                                        **Covers**
  -------------- -------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-REC-01-01   A signed-in parent                                                                                 They choose Messages and Calendar, the range 2027-01-01 to 2027-01-31 and the format Certified PDF   The export starts as Preparing and MSGT-01 shows                                                                                                                                                                FR-REC-01-01, FR-REC-01-20

  AC-REC-01-02   Today is 2027-01-15                                                                                A parent chooses the start 2027-02-01 and the end 2027-01-31, and then the end 2027-01-16            Both are refused and ERR-01 shows                                                                                                                                                                               FR-REC-01-02

  AC-REC-01-03   A parent on the export screen                                                                      They choose no record type                                                                           The export is refused and ERR-02 shows                                                                                                                                                                          FR-REC-01-02

  AC-REC-01-04   A Private expense that Parent A created                                                            Parent B exports Expenses                                                                            The Private expense is not in the export                                                                                                                                                                        FR-REC-01-03

  AC-REC-01-05   A thread with 2 messages, one held, one with an attachment, and a report by the exporting parent   The parent exports Messages                                                                          Both messages show with their sent time, first-read time and delivery status. The held message shows its original. The attachment and the report are included. No tone feedback or hold label is included.      FR-REC-01-04

  AC-REC-01-06   A message to a recipient in Safety Mode that the recipient has read                                The sender exports Messages                                                                          The export shows no first-read time and no status Read for that message                                                                                                                                         FR-REC-01-05

  AC-REC-01-07   An event with 2 versions, a schedule change request with history and an exchange record            A parent exports Calendar                                                                            The entries with their versions, the request with its history and the exchange record are in the export                                                                                                         FR-REC-01-06

  AC-REC-01-08   An expense with 2 versions and a file, and a request on it                                         A parent exports Expenses                                                                            The versions, the file and the request with its history are in the export                                                                                                                                       FR-REC-01-07

  AC-REC-01-09   A recorded child support payment, a contact-attempt log, a journal note and agency data            A parent exports without selecting them, and then with them selected                                 The first export has none of them and the second has all four                                                                                                                                                   FR-REC-01-08

  AC-REC-01-10   No message in the range 2027-03-01 to 2027-03-31                                                   A parent exports Messages for that range                                                             No export is made and MSGT-03 shows                                                                                                                                                                             FR-REC-01-09

  AC-REC-01-11   A certified PDF                                                                                    A parent opens it                                                                                    The cover shows the name, the date and time made in UTC and in local time, the range, the record types, the Record ID, the number of pages and the statement. Every page shows the Record ID and Page x of y.   FR-REC-01-10

  AC-REC-01-12   The certification statement                                                                        Counsel reviews it                                                                                   It says the record is court-ready and that a court decides what it accepts, and it does not use the words court approved                                                                                        FR-REC-01-11

  AC-REC-01-13   Two certified exports                                                                              A parent makes them                                                                                  Each has a different Record ID of 16 uppercase letters and digits in 4 groups of 4, and no ID is ever used again                                                                                                FR-REC-01-12

  AC-REC-01-14   A certified PDF that someone changes after it was made                                             The signature is checked                                                                             The check fails, and the saved fingerprint does not match the changed file                                                                                                                                      FR-REC-01-13

  AC-REC-01-15   A certified export made last month                                                                 The parent opens the export history and downloads it again                                           The downloaded file is the same as the first one                                                                                                                                                                FR-REC-01-14

  AC-REC-01-16   A visitor who is not signed in                                                                     They enter a valid Record ID                                                                         MSGT-05 shows the date and time made, the number of pages and the record types, and no name or content shows                                                                                                    FR-REC-01-15

  AC-REC-01-17   A visitor                                                                                          They enter an unknown Record ID                                                                      MSGT-06 shows                                                                                                                                                                                                   FR-REC-01-15

  AC-REC-01-18   A visitor on the verification page                                                                 They upload the same PDF, then a changed PDF, then a DOCX file, then a PDF of 26 MB                  The first shows MSGT-07, the second shows MSGT-08, and the last two show ERR-05. No uploaded file is kept.                                                                                                      FR-REC-01-16

  AC-REC-01-19   A device that made 10 failed lookups in 10 minutes                                                 It makes an 11th lookup, with a valid ID                                                             The lookup is refused and ERR-04 shows, and lookups work again after 15 minutes                                                                                                                                 FR-REC-01-17

  AC-REC-01-20   A lookup                                                                                           It is made                                                                                           A log entry exists with the text entered, the result and the time, and no personal data of the visitor                                                                                                          FR-REC-01-18

  AC-REC-01-21   A household                                                                                        A parent makes 3 certified exports in one day                                                        All 3 are made and no payment is asked                                                                                                                                                                          FR-REC-01-19

  AC-REC-01-22   A large export                                                                                     The export runs                                                                                      It shows Preparing and then Ready, and the parent is alerted (MSGT-02)                                                                                                                                          FR-REC-01-20

  AC-REC-01-23   An export made on 2027-01-15, and a message sent on 2027-01-16                                     The parent exports the same range again on 2027-01-17                                                The first export is unchanged. The second export includes the message and has a new Record ID.                                                                                                                  FR-REC-01-21

  AC-REC-01-24   A certified export that a parent has not shared, and a member of support staff                     A professional and the staff member try to open it                                                   Neither can open it. The professional can read it after the parent shares it.                                                                                                                                   FR-REC-01-22

  AC-REC-01-25   An export                                                                                          It is made                                                                                           One audit log entry exists with the record types, the range, the Record ID, the actor, the time in UTC and the result                                                                                           FR-REC-01-23

  AC-REC-01-26   An export that fails                                                                               The failure is returned                                                                              The export is Failed, ERR-03 shows, and no Record ID is issued                                                                                                                                                  FR-REC-01-24
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

REC-02 Business records affidavit and subpoena support

US-REC-02-01. As a parent, I want a notarized affidavit for my certified export, so that a court can accept it as a business record.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-REC-02-01     The system shall let a parent ask for a business records affidavit for a certified export that the parent made, by choosing the Record ID in the export history.

  FR-REC-02-02     The request has the certified export, how to receive the affidavit (Electronic or Mailed copy), a mailing address of up to 200 characters for a mailed copy, an optional court date, and an optional note of up to 500 characters. The system shall show ERR-07 for a missing field and ERR-19 for a text that is too long.

  FR-REC-02-03     The system shall let only the parent who made the export send the request. The co-parent shall not see the request. If the Record ID is not in the account of the parent, the system shall show ERR-17.

  FR-REC-02-04     The system shall allow one open request for each Record ID. A request is open while its status is Submitted or In review. If a parent tries to send a second one, the system shall show ERR-18.

  FR-REC-02-05     The system shall give every request a case number and show MSGT-12 when it is sent. Support handles a request with a court date first.

  FR-REC-02-06     The system shall show the status of a request as Submitted, In review, Ready, Declined or Delivered, and alert the parent through the Notifications module when it changes (MSGT-13).

  FR-REC-02-07     The system shall let support staff review a request by hand with the affidavit template approved by counsel, and set its status.

  FR-REC-02-08     The system shall show support staff only the request details, the Record ID, the number of pages, the record types and the date range. Support staff cannot read parent messages or open the content of the export.

  FR-REC-02-09     The affidavit shall name the Record ID and say what it certifies, so that a court can check the record on the public verification page.

  FR-REC-02-10     A notary shall notarize the affidavit before the status is Ready.

  FR-REC-02-11     For an Electronic request, the system shall give the parent the notarized PDF to download from the request, and set the status Delivered when the parent first downloads it. For a Mailed request, support prints and mails it and sets the status Delivered.

  FR-REC-02-12     When support staff decline a request, they shall give a reason of up to 500 characters, and the system shall show it to the parent (MSGT-14).

  FR-REC-02-13     The system should flag a request to support staff when it has no update after 5 business days.

  FR-REC-02-14     The system should show the fee for a mailed copy before the parent sends the request (MSGT-15). The Electronic copy is free. The Manager sets the fee for a mailed copy before.

  FR-REC-02-15     The system should give a public records request page for attorneys and courts. It says how to serve a subpoena, that the subpoena must name the email of the account, where to send it, what ParentPath produces (MSGT-25) and any fees, and that ParentPath is not a party to the case. Counsel approves the text.

  FR-REC-02-16     On a valid subpoena, the system should produce only the records of the account named in it, limited to what that account holder can see.

  FR-REC-02-17     Counsel runs the subpoena process by hand. The system should not produce records on a subpoena by itself in, and should log every access to records for a subpoena. Who produces the records is open.

  FR-REC-02-18     The system shall keep every request and its status history, never delete them, and write an audit log entry for every request, status change and delivery.

  FR-REC-02-19     If a request cannot be saved, the system shall show ERR-06 and shall not create it.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                    **When**                                                                                        **Then**                                                                                                                                                               **Covers**
  -------------- ---------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-REC-02-01   A household, and a certified export with the Record ID ABCD-2345-EFGH-6789   The parent chooses that Record ID and asks for an affidavit                                     The request is saved as Submitted and MSGT-12 shows                                                                                                                    FR-REC-02-01, FR-REC-02-05

  AC-REC-02-03   A parent sending a request                                                   They choose Mailed copy and leave the address empty, and later enter a note of 501 characters   The first is refused with ERR-07 and the second with ERR-19                                                                                                            FR-REC-02-02

  AC-REC-02-04   An export made by Parent A                                                   Parent B opens the request list, and a parent enters a Record ID from another account           Parent B sees no request, and the other Record ID is refused with ERR-17                                                                                               FR-REC-02-03

  AC-REC-02-05   A request that is Submitted                                                  The parent sends a second request for the same Record ID                                        The second request is refused and ERR-18 shows                                                                                                                         FR-REC-02-04

  AC-REC-02-06   A request with a court date                                                  It is sent                                                                                      It has a case number, and support sees it before requests with no court date                                                                                           FR-REC-02-05

  AC-REC-02-07   A request                                                                    Support staff set it to In review, then Ready, then Delivered                                   Each status shows to the parent and each change alerts the parent (MSGT-13)                                                                                            FR-REC-02-06

  AC-REC-02-08   A request in review                                                          Support staff use the template approved by counsel and set the status                           The status is saved                                                                                                                                                    FR-REC-02-07

  AC-REC-02-09   A request that support staff open                                            They look at the request                                                                        They see the details, the Record ID, the pages, the record types and the date range, and they cannot open any message or the content of the export                     FR-REC-02-08

  AC-REC-02-10   An affidavit                                                                 A court reads it                                                                                It names the Record ID and what it certifies                                                                                                                           FR-REC-02-09

  AC-REC-02-11   An affidavit that is not yet notarized                                       Support staff try to set the status Ready                                                       The status cannot be set until a notary has notarized it                                                                                                               FR-REC-02-10

  AC-REC-02-12   An Electronic request that is Ready, and a Mailed request that is mailed     The parent downloads the first, and support mails the second                                    The first becomes Delivered at the first download and the second becomes Delivered when mailed                                                                         FR-REC-02-11

  AC-REC-02-13   A request                                                                    Support staff decline it with a reason of 500 characters                                        The status is Declined and the parent sees the reason (MSGT-14)                                                                                                        FR-REC-02-12

  AC-REC-02-14   A request sent on 2027-01-04 with no update                                  5 business days pass                                                                            Support staff see the request flagged                                                                                                                                  FR-REC-02-13

  AC-REC-02-15   A parent choosing Mailed copy                                                They open the request form                                                                      The fee shows (MSGT-15) before the request is sent, and the Electronic copy shows as included                                                                          FR-REC-02-14

  AC-REC-02-16   A visitor who is not signed in                                               They open the records request page                                                              The page shows how to serve a subpoena, that it must name the account email, where to send it, what ParentPath produces, any fees and that ParentPath is not a party   FR-REC-02-15

  AC-REC-02-17   A valid subpoena that names the account of Parent A                          Counsel produces the records                                                                    Only records that Parent A can see are produced, and no private item of the co-parent is produced                                                                      FR-REC-02-16

  AC-REC-02-18   A subpoena                                                                   It is received                                                                                  No records are produced by the system by itself, counsel handles it by hand, and every access to records for it is logged                                              FR-REC-02-17

  AC-REC-02-19   A request with status changes                                                A request is sent, changed and delivered                                                        Every request and status change is kept, none is deleted, and one audit log entry exists for each                                                                      FR-REC-02-18

  AC-REC-02-20   A save error                                                                 A parent sends a request                                                                        No request is created and ERR-06 shows                                                                                                                                 FR-REC-02-19
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

REC-03 Court-order guidance by jurisdiction

US-REC-03-01. As a parent or a lawyer, I want a short note for our state about how courts treat app records, so that I know what to expect.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-REC-03-01         The system should give a public page of court notes where a visitor chooses a US state and reads the note for it.

  FR-REC-03-02         Each note should show the state, the text and the line Last reviewed on \[date\].

  FR-REC-03-03         The system should publish a note only after counsel approves it.

  FR-REC-03-04         Each note should explain how to show a certified record (the Record ID and the verification page), that an affidavit can be asked for (REC-02), and how to send a subpoena.

  FR-REC-03-05         The system should show the general note (MSGT-16) on every page of notes. It says that ParentPath records are court-ready, that a court decides what it accepts, and that this is not legal advice.

  FR-REC-03-06         For a state with no note, the system should show MSGT-17 and the general note.

  FR-REC-03-07         When a note was last reviewed more than 12 months ago, the system should show MSGT-18 with it.

  FR-REC-03-08         The system should link the court notes from the export screen and from the verification page.

  FR-REC-03-09         The system should keep every earlier version of a note with its date.

  FR-REC-03-10         If a page cannot be loaded, the system should show ERR-23.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                     **When**                                                   **Then**                                                                                               **Covers**
  -------------- ------------------------------------------------------------- ---------------------------------------------------------- ------------------------------------------------------------------------------------------------------ --------------
  AC-REC-03-01   A visitor who is not signed in                                They open the court notes and choose a state with a note   The note for that state shows                                                                          FR-REC-03-01

  AC-REC-03-02   A note                                                        A visitor reads it                                         It shows the state, the text and Last reviewed on \[date\]                                             FR-REC-03-02

  AC-REC-03-03   A note that counsel has not approved                          A visitor looks for it                                     The note is not published                                                                              FR-REC-03-03

  AC-REC-03-04   A note                                                        A visitor reads it                                         It explains the Record ID and the verification page, the affidavit option and how to send a subpoena   FR-REC-03-04

  AC-REC-03-05   Any page of notes                                             A visitor opens it                                         MSGT-16 shows                                                                                          FR-REC-03-05

  AC-REC-03-06   A state with no note                                          A visitor chooses it                                       MSGT-17 and the general note show                                                                      FR-REC-03-06

  AC-REC-03-07   A note last reviewed on 2025-09-01, and today is 2026-10-13   A visitor opens it                                         MSGT-18 shows with the note                                                                            FR-REC-03-07

  AC-REC-03-08   The export screen and the verification page                   A user opens each                                          Each has a link to the court notes                                                                     FR-REC-03-08

  AC-REC-03-09   A note that counsel updates                                   The new version is published                               The earlier version is kept with its date                                                              FR-REC-03-09

  AC-REC-03-10   A page that cannot be loaded                                  A visitor opens it                                         ERR-23 shows                                                                                           FR-REC-03-10
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

REC-04 Model order language that accepts any compliant app

US-REC-04-01. As a parent or a lawyer, I want order language that does not force one app, so that neither parent has to use an app the other chose.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-REC-04-01       The system should give a public page of model order language that does not name one app as the only choice.

  FR-REC-04-02       The language should say that the parties may use any parenting app that meets the standard in FR-REC-04-03. It may name ParentPath as one example.

  FR-REC-04-03       The standard should have these five points. Sent messages cannot be edited or deleted and have time stamps. Records can be exported in PDF and CSV by every user. Each certified record has an ID that anyone can check. The app can support a business records affidavit. Calendar and expense entries keep their history.

  FR-REC-04-04       The language should include an optional clause about how the court may receive the records. Counsel writes the clause.

  FR-REC-04-05       The page should let a visitor copy the text and download it as a Word file and as a PDF.

  FR-REC-04-06       The page should show the version number and date of the language and MSGT-19. Counsel approves each version.

  FR-REC-04-07       The system should keep every earlier version with its date.

  FR-REC-04-08       The system should publish the page only after the legal review of the language is recorded as done.

  FR-REC-04-09       If the page cannot be loaded, the system should show ERR-23.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                     **When**                                                                          **Then**                                                                                                 **Covers**
  -------------- ------------------------------------------------------------- --------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------- --------------
  AC-REC-04-01   A visitor who is not signed in                                They open the model order language                                                The page shows language that does not name one app as the only choice                                    FR-REC-04-01

  AC-REC-04-02   The language                                                  A lawyer reads it                                                                 It says the parties may use any app that meets the standard, and ParentPath appears only as an example   FR-REC-04-02

  AC-REC-04-03   The standard                                                  A lawyer reads it                                                                 It lists the five points in FR-REC-04-03                                                                 FR-REC-04-03

  AC-REC-04-04   The language                                                  A lawyer reads it                                                                 An optional clause about how the court may receive the records is there                                  FR-REC-04-04

  AC-REC-04-05   The page                                                      A visitor copies the text, then downloads the Word file, then downloads the PDF   Each works                                                                                               FR-REC-04-05

  AC-REC-04-06   The page                                                      A visitor opens it                                                                The version number, the date and MSGT-19 show                                                            FR-REC-04-06

  AC-REC-04-07   A new version of the language                                 It is published                                                                   The earlier version is kept with its date                                                                FR-REC-04-07

  AC-REC-04-08   A release built before the legal review is recorded as done   A visitor looks for the page                                                      The page is not published                                                                                FR-REC-04-08

  AC-REC-04-09   A page that cannot be loaded                                  A visitor opens it                                                                ERR-23 shows                                                                                             FR-REC-04-09
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

REC-05 Data export (PDF, CSV)

US-REC-05-01. As a user, I want to take my own data with me in PDF and CSV for free, so that I am never locked in.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-REC-05-01      The system shall offer three formats on the export screen: Certified PDF (REC-01), PDF and CSV.

  FR-REC-05-02      The system shall make every format available to every user to every user,. It shall not ask for payment and shall not limit the number of exports.

  FR-REC-05-03      The system shall apply to every format the same record types, date range rules and visibility rules as in FR-REC-01-01 to FR-REC-01-09.

  FR-REC-05-04      The system shall show MSGT-04 on the cover of a PDF that is not certified, and shall give it no Record ID.

  FR-REC-05-05      For CSV, the system shall make one file for each record type, all in one ZIP file. Each file is UTF-8 text with the column names in the first row and every date and time in UTC. The columns are the fields shown in the PDF for that record type.

  FR-REC-05-06      The PDF shall show attached images on its pages and list other attached files by name. The ZIP file for CSV shall hold the attached files in a folder.

  FR-REC-05-07      The system shall save text that starts with the character =, +, - or @ in a CSV file with a leading apostrophe, so that a spreadsheet does not run it as a formula.

  FR-REC-05-08      The system shall keep a PDF that is not certified and a CSV ZIP file ready to download for 24 hours and shall then delete the file. A certified export is kept (FR-REC-01-14).

  FR-REC-05-09      The system shall list every export of the user in an export history with the format, the record types, the date range, the time made, the status and, for a certified export, the Record ID.

  FR-REC-05-10      The system shall offer an export before an account is closed (ACC-12), before a case link is removed and before a deletion request is carried out (REC-06).

  FR-REC-05-11      The system shall write an audit log entry for every export in every format, with the record types, the date range, the actor, the time and the result.

  FR-REC-05-12      If an export cannot be made, the system shall set it to Failed and show ERR-03.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                    **When**                                                                   **Then**                                                                                                                        **Covers**
  -------------- ---------------------------------------------------------------------------- -------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-REC-05-01   A signed-in parent                                                           They open the export screen                                                The formats Certified PDF, PDF and CSV are offered                                                                              FR-REC-05-01

  AC-REC-05-02   A household that is over its storage limit                                   A parent makes a PDF, a CSV and a Certified PDF, 4 times each in a month   All 12 exports are made and no payment is asked                                                                                 FR-REC-05-02

  AC-REC-05-03   A Private expense and a Shared expense                                       A parent makes a CSV export of Expenses                                    The CSV follows the same visibility rules as the certified export                                                               FR-REC-05-03

  AC-REC-05-04   A PDF that is not certified                                                  A parent opens it                                                          MSGT-04 shows on the cover and there is no Record ID                                                                            FR-REC-05-04

  AC-REC-05-05   A CSV export of Messages and Expenses                                        The parent downloads it                                                    One ZIP file holds one UTF-8 file for Messages and one for Expenses, each with column names in the first row and times in UTC   FR-REC-05-05

  AC-REC-05-06   A message with an image and a PDF attached                                   The parent makes a PDF and a CSV export                                    The PDF shows the image and lists the PDF by name, and the ZIP file holds both files in a folder                                FR-REC-05-06

  AC-REC-05-07   A note that starts with =SUM(1+1)                                            The parent makes a CSV export                                              The cell is saved with a leading apostrophe                                                                                     FR-REC-05-07

  AC-REC-05-08   A CSV ZIP file made 25 hours ago                                             A parent tries to download it                                              The file is gone and the parent can make a new export                                                                           FR-REC-05-08

  AC-REC-05-09   Exports of three formats                                                     A parent opens the export history                                          Each shows its format, record types, date range, time, status and, for a certified export, the Record ID                        FR-REC-05-09

  AC-REC-05-10   A parent who starts to close an account, remove a case link or delete data   The parent starts the action                                               An export is offered first                                                                                                      FR-REC-05-10

  AC-REC-05-11   An export in any format                                                      It is made                                                                 One audit log entry exists with the record types, the range, the actor, the time in UTC and the result                          FR-REC-05-11

  AC-REC-05-12   An export that fails                                                         The failure is returned                                                    The export is Failed and ERR-03 shows                                                                                           FR-REC-05-12
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

REC-06 Data retention policy, deletion of non-record data and legal hold

US-REC-06-01. As a parent, I want to know how long my data is kept and to delete data that is not a record, so that I stay in control while records stay safe.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Requirement**
  --------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-REC-06-01    The system should give a public retention policy page. It says what a record is, the retention period, how deletion works, how a legal hold works, what happens when an account is closed or a case link is removed, and that raw agency files are deleted after they are loaded.

  FR-REC-06-02    The page should show the retention period that counsel sets, the version of the policy and its date.

  FR-REC-06-03    The policy should treat these as records: sent messages, shared calendar entries and their versions, shared expenses and payment records and their versions, requests, disputes, the contact-attempt log, the delivery log, certified exports and the audit log. It should treat as non-record data: drafts, items that were never shared, profile data, settings and journal notes.

  FR-REC-06-04    The system should let a parent ask for deletion of non-record data. It should show what will be deleted and what will be kept and why, offer an export first (FR-REC-05-10), and ask the parent to confirm (MSGT-20).

  FR-REC-06-05    The system should finish a deletion request within 30 days. A request is Requested, Completed or Blocked. It should alert the parent through the Notifications module when the status changes (MSGT-22) and show MSGT-21 when it is Completed.

  FR-REC-06-06    If a legal hold is on, the system should set the request to Blocked and show ERR-20. If the parent already has an open request, the system should show ERR-21.

  FR-REC-06-07    The system should not recover data that was deleted. Records stay.

  FR-REC-06-08    The system should keep records for the retention period. After it, the system should delete a record only when every account in the household is Closed and no legal hold is on.

  FR-REC-06-09    The system should let a parent ask for a legal hold on the records of the household by saying that a case exists, with an optional case number of up to 50 characters. Counsel can also place a hold on a valid legal request. If a hold is already on, the system should show ERR-22.

  FR-REC-06-10    While a hold is on, the system should delete no data of the household, neither on request nor by the retention period. Exports still work. The system should show MSGT-23 to the parent who asked. The other parent is not told.

  FR-REC-06-11    A hold that a parent asked for can be released by that parent (MSGT-24). A hold that counsel placed can be released only by counsel.

  FR-REC-06-12    Support staff and counsel should see only the details of deletion and hold requests, and should not read parent messages or open the content of records.

  FR-REC-06-13    The system should keep every deletion request, hold and release with who made it and when, never delete them, and write an audit log entry for each.

  FR-REC-06-14    If a request or a hold cannot be saved, the system should show ERR-06 and should not change anything. If the policy page cannot be loaded, the system should show ERR-23.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                                                             **When**                                                                    **Then**                                                                                                                                                                                                                                  **Covers**
  -------------- ------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-REC-06-01   A visitor who is not signed in                                                                                                        They open the retention policy                                              The page shows what a record is, the retention period, deletion, legal hold, account closure, case link removal and raw agency files                                                                                                      FR-REC-06-01

  AC-REC-06-02   The retention policy                                                                                                                  A visitor reads it                                                          It shows the retention period set by counsel, the version and the date                                                                                                                                                                    FR-REC-06-02

  AC-REC-06-03   The policy                                                                                                                            A visitor reads it                                                          Sent messages, shared calendar and expense items, requests, disputes, logs, certified exports and the audit log are named as records, and drafts, unshared items, profile data, settings and journal notes are named as non-record data   FR-REC-06-03

  AC-REC-06-04   A signed-in parent                                                                                                                    They ask for deletion                                                       The screen lists what will be deleted and what will be kept and why, offers an export, and asks to confirm (MSGT-20)                                                                                                                      FR-REC-06-04

  AC-REC-06-05   A confirmed deletion request made on 2027-01-10                                                                                       The data is deleted                                                         The request is Completed by 2027-02-09, the parent was alerted and MSGT-21 shows                                                                                                                                                          FR-REC-06-05

  AC-REC-06-06   A household with a legal hold, and a parent with an open deletion request                                                             A parent asks for deletion                                                  The first request is Blocked and ERR-20 shows. A second request from the other shows ERR-21.                                                                                                                                              FR-REC-06-06

  AC-REC-06-07   Data that was deleted                                                                                                                 A parent looks for it                                                       It cannot be recovered and the records are still there                                                                                                                                                                                    FR-REC-06-07

  AC-REC-06-08   A record whose retention period has ended, in a household with one Active account, and another with all accounts Closed and no hold   The retention check runs                                                    The first record is kept. The second is deleted.                                                                                                                                                                                          FR-REC-06-08

  AC-REC-06-09   A parent                                                                                                                              They ask for a hold with the case number FA-2027-0412, and then ask again   The hold is on, and the second request shows ERR-22                                                                                                                                                                                       FR-REC-06-09

  AC-REC-06-10   A household with a hold                                                                                                               A deletion or a retention check would delete data                           No data is deleted, exports still work, MSGT-23 showed to the parent who asked, and the other parent was not told                                                                                                                         FR-REC-06-10

  AC-REC-06-11   A hold that a parent asked for, and a hold that counsel placed                                                                        The parent tries to release each                                            The first is released (MSGT-24) and the second cannot be released by the parent                                                                                                                                                           FR-REC-06-11

  AC-REC-06-12   A member of support staff or counsel who handles a request                                                                            They open it                                                                They see the details and cannot read any message or open the content of any record                                                                                                                                                        FR-REC-06-12

  AC-REC-06-13   A deletion request, a hold and a release                                                                                              Each is made                                                                Each is kept with who and when, none is deleted, and one audit log entry exists for each                                                                                                                                                  FR-REC-06-13

  AC-REC-06-14   A save error, and a page that cannot be loaded                                                                                        A parent saves a request, and a visitor opens the policy                    ERR-06 shows for the first and nothing changes. ERR-23 shows for the second.                                                                                                                                                              FR-REC-06-14
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

REC-07 Journal and incident notes

US-REC-07-01. As a parent, I want a private journal where I note incidents with their date and time, so that I have my own record of what happened.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-REC-07-01     The system shall let a parent add a journal entry with a type (Incident or Note), a title, the date and time it happened, details, the children (optional) and files (optional).

  FR-REC-07-02     The system shall require a title of 1 to 100 characters, details of 1 to 5,000 characters, and a date and time that is not in the future. It shall show ERR-07 for a missing field, ERR-08 for a title that is too long, ERR-09 for details that are too long and ERR-10 for a date and time in the future.

  FR-REC-07-03     The system shall save the time the entry was written in UTC and show it next to the date and time it happened, in the local time of the user.

  FR-REC-07-04     The system shall show an entry only to the parent who wrote it. The co-parent, a Third party, support staff and operations staff cannot see it. A professional can read it only when the parent shares it.

  FR-REC-07-05     The system shall let the parent attach up to 5 files with a total size of up to 25 MB, in JPG, PNG or PDF, scan each for malware, and let the parent take a photo with the camera in a phone browser. It shall show ERR-11 for a file type that is not allowed, ERR-12 for too many files or too much data, and ERR-13 for a file that fails the scan.

  FR-REC-07-06     The system shall count the files toward the storage limit. If the household is over the limit, the system shall block new files and show ERR-14. The parent can still view and export the existing files.

  FR-REC-07-07     The system shall not let anyone remove a file once it is attached.

  FR-REC-07-08     The system shall let the parent edit an entry. Each edit saves a new version with the original details and the time. The parent can void an entry instead of deleting it. A voided entry stays in the history, and a parent who tries to edit it shall see ERR-15.

  FR-REC-07-09     The system shall show the version history of an entry to the parent who wrote it. The system shall never overwrite or delete a version.

  FR-REC-07-10     The system shall list entries with the newest date it happened first, and let the parent filter by type, by a date range and by child.

  FR-REC-07-11     The system shall include journal notes in an export only when the parent selects them.

  FR-REC-07-12     The system shall offer the journal in a Linked household and in Solo Mode.

  FR-REC-07-13     The system shall offer the children saved in the household, and shall let the parent save an entry with no child.

  FR-REC-07-14     The system shall work in the same way for a user in Safety Mode and shall send no alert for a journal entry.

  FR-REC-07-15     The system shall let a parent delete journal notes only through a deletion request (FR-REC-06-04) once REC-06 is released. Before that, no journal note can be deleted.

  FR-REC-07-16     The system shall write an audit log entry for every entry added, edited or voided and every file attached, with actor, time and result.

  FR-REC-07-17     If an entry cannot be saved, the system shall show ERR-06 and shall not create or change it.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                     **When**                                                                                                                              **Then**                                                                                                                      **Covers**
  -------------- ----------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------- --------------
  AC-REC-07-01   A signed-in parent, and today is 2027-01-15                                   They add an Incident with the title Late pick-up, the date and time 2027-01-14 18:30, and details                                     The entry is saved and MSGT-10 shows                                                                                          FR-REC-07-01

  AC-REC-07-02   A parent adding an entry                                                      They leave the title empty, then enter a title of 101 characters, then details of 5,001 characters, then a time of 2027-01-16 09:00   The saves are refused with ERR-07, ERR-08, ERR-09 and ERR-10                                                                  FR-REC-07-02

  AC-REC-07-03   An entry written at 2027-01-15 18:00 UTC about an event at 2027-01-14 18:30   A user in US Eastern time views it                                                                                                    The entry shows the event time 13:30 on January 14 and the time written 13:00 on January 15                                   FR-REC-07-03

  AC-REC-07-04   An entry that Parent A wrote                                                  Parent B, a Third party and a member of support staff try to see it, and later Parent A shares it with a professional                 None of the first three can see it, and the professional can read it after the parent shares it                               FR-REC-07-04

  AC-REC-07-05   An entry                                                                      The parent attaches 5 files of 4 MB, then a sixth file, then a DOCX file, then a file that fails the scan                             The first 5 are attached, and the other three are refused with ERR-12, ERR-11 and ERR-13                                      FR-REC-07-05

  AC-REC-07-06   A household over its storage limit                                            The parent attaches a file                                                                                                            The file is blocked and ERR-14 shows, and the existing files can still be viewed and exported                                 FR-REC-07-06

  AC-REC-07-07   An entry with a file                                                          The parent looks for a way to remove the file                                                                                         No removal option is offered                                                                                                  FR-REC-07-07

  AC-REC-07-08   An entry                                                                      The parent edits it, voids it, and then tries to edit it again                                                                        Each edit saves a new version, the voided entry stays in the history (MSGT-11), and the last attempt is refused with ERR-15   FR-REC-07-08

  AC-REC-07-09   An entry with 3 versions                                                      The parent opens its history                                                                                                          All 3 versions show and none can be overwritten or deleted                                                                    FR-REC-07-09

  AC-REC-07-10   Entries of different types, dates and children                                The parent opens the list and filters                                                                                                 The newest event date is first, and each filter shows only the matching entries                                               FR-REC-07-10

  AC-REC-07-11   A journal note                                                                A parent exports without selecting it, and then with it selected                                                                      The first export has no journal note and the second has it                                                                    FR-REC-07-11

  AC-REC-07-12   A Linked household and a household in Solo Mode                               A parent adds an entry in each                                                                                                        Both entries are saved                                                                                                        FR-REC-07-12

  AC-REC-07-13   A household with two children and a household with none                       A parent saves an entry with both children, and another with no child                                                                 Both entries are saved                                                                                                        FR-REC-07-13

  AC-REC-07-14   A user in Safety Mode                                                         They add an entry                                                                                                                     The entry is saved and no alert is sent                                                                                       FR-REC-07-14

  AC-REC-07-15   A release in which REC-06 is not released                                     A parent looks for a way to delete a note                                                                                             No delete option is offered                                                                                                   FR-REC-07-15

  AC-REC-07-16   An entry added, edited or voided, and a file attached                         Each is saved                                                                                                                         One audit log entry exists for each, with the actor, the time in UTC and the result                                           FR-REC-07-16

  AC-REC-07-17   A save error                                                                  A parent saves an entry                                                                                                               The entry is not created and ERR-06 shows                                                                                     FR-REC-07-17
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

10.2 Data reference

  ------------------------------------------------------------------------------
  **Entity**                  **Fields used**
  --------------------------- --------------------------------------------------
  User                        user_id, role, display_name

  Household                   household_id, mode (Linked, Solo)

  Child                       child_id

  Audit log entry             actor, action, object, result, device_type, time
  ------------------------------------------------------------------------------

Journal entries use it too.

8.2 New entities (proposed). The sources name none of these fields. They are a BA proposal.

Export

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**               **Type**            **Required**   **Notes**
  ----------------------- ------------------- -------------- ---------------------------------------------------------------------------------------------------------------
  export_id               Unique ID           Yes            System generated

  household_id            Link to Household   Yes            ---

  requested_by_user_id    Link to User        Yes            ---

  format                  Choice              Yes            Certified PDF, PDF, CSV

  record_types            List                Yes            Messages, Calendar, Expenses, Child support payments I recorded, Contact attempts, Journal notes, Agency data

  date_from and date_to   Date                Yes            Start not after end. End not in the future.

  status                  Choice              Yes            Preparing, Ready, Failed

  record_id               Text                No             Certified PDF only. 16 uppercase letters and digits in 4 groups of 4. Unique. Cannot be changed.

  fingerprint             Text                No             Certified PDF only. A digital fingerprint of the file.

  page_count              Number              No             Certified PDF only

  file_id                 Link to file        No             Kept for a certified PDF. Deleted after 24 hours for the other formats.

  generated_at            Date and time       No             UTC

  created_at              Date and time       Yes            UTC
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Verification lookup

  ------------------------------------------------------------------------------------------------------------------------------
  **Field**       **Type**        **Required**   **Notes**
  --------------- --------------- -------------- -------------------------------------------------------------------------------
  lookup_id       Unique ID       Yes            System generated

  text_entered    Text            Yes            The Record ID the visitor entered

  result          Choice          Yes            Valid, Not found, File matches, File does not match, Refused (too many tries)

  checked_at      Date and time   Yes            UTC. Cannot be changed. No personal data of the visitor is saved.
  ------------------------------------------------------------------------------------------------------------------------------

Journal entry

  -------------------------------------------------------------------------------------------------------------------
  **Field**        **Type**                 **Required**   **Notes**
  ---------------- ------------------------ -------------- ----------------------------------------------------------
  entry_id         Unique ID                Yes            System generated

  user_id          Link to User             Yes            The parent who wrote it. The only person who can see it.

  entry_type       Choice                   Yes            Incident, Note

  title            Text                     Yes            1 to 100 characters

  happened_at      Date and time            Yes            UTC. Not in the future.

  details          Text                     Yes            1 to 5,000 characters

  children         List of links to Child   No             ---

  status           Choice                   Yes            Active, Voided

  created_at       Date and time            Yes            UTC. Cannot be changed.
  -------------------------------------------------------------------------------------------------------------------

Each journal entry has versions with the same pattern as an expense version: version number, a snapshot of all fields, who changed it, when, and the device.

  ----------------------------------------------------------------------------------------------------------
  **Field**              **Type**         **Required**   **Notes**
  ---------------------- ---------------- -------------- ---------------------------------------------------
  request_id             Unique ID        Yes            System generated

  case_number            Text             Yes            System generated

  requested_by_user_id   Link to User     Yes            The parent who made the export

  export_id              Link to Export   Yes            A certified export

  delivery               Choice           Yes            Electronic, Mailed copy

  mailing_address        Text             No             Up to 200 characters. Required for a Mailed copy.

  court_date             Date             No             ---

  note                   Text             No             Up to 500 characters

  status                 Choice           Yes            Submitted, In review, Ready, Declined, Delivered

  decline_reason         Text             No             Up to 500 characters

  created_at             Date and time    Yes            UTC
  ----------------------------------------------------------------------------------------------------------

Each status change is saved as a history entry with the status, who made it and when.

  ---------------------------------------------------------------------------------------------------------------
  **Field**             **Type**        **Required**   **Notes**
  --------------------- --------------- -------------- ----------------------------------------------------------
  content_type          Choice          Yes            Court note, Model order language, Retention policy

  state                 Text            No             For a court note only

  version               Number          Yes            Each change is a new version. Earlier versions are kept.

  text                  Text            Yes            ---

  last_reviewed_on      Date            Yes            The date counsel reviewed it

  approved_by_counsel   Yes or No       Yes            Must be Yes before it is published

  published_at          Date and time   No             UTC
  ---------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------
  **Field**         **Type**          **Required**   **Notes**
  ----------------- ----------------- -------------- ------------------------------------------
  deletion_id       Unique ID         Yes            System generated

  user_id           Link to User      Yes            ---

  status            Choice            Yes            Requested, Completed, Blocked

  requested_at      Date and time     Yes            UTC

  completed_at      Date and time     No             UTC. At most 30 days after requested_at.

  kept_summary      Text              Yes            What was kept and why
  ---------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------
  **Field**                **Type**            **Required**   **Notes**
  ------------------------ ------------------- -------------- --------------------------------------
  hold_id                  Unique ID           Yes            System generated

  household_id             Link to Household   Yes            ---

  set_by                   Choice              Yes            Parent, Counsel

  set_by_user_id           Link to User        No             Set when a parent asked for the hold

  case_number              Text                No             Up to 50 characters

  status                   Choice              Yes            On, Released

  set_at and released_at   Date and time       Yes, No        UTC
  --------------------------------------------------------------------------------------------------

10.3 Interfaces

All interfaces except INT-11 and INT-12 are with other modules of the app.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **With**                      **What passes**                                                                                                                                               **Features**
  ---------- ----------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------
  INT-01     Messaging                     Threads, messages, sent and first-read times, attachments and reports come in for the export.                                                                 REC-01, REC-05

  INT-02     Calendar and Parenting Time   Entries, versions, requests, exchange records and check-ins come in for the export.                                                                           REC-01, REC-05

  INT-03     Expenses and Payments         Expenses, versions, files, requests, split rules, disputes, the balance and recorded child support payments come in for the export.                           REC-01, REC-05

  INT-04     Notifications                 The delivery log comes in. Alerts for an export that is ready, an affidavit request and a deletion request go out.                                            REC-01, REC-02, REC-05, REC-06

  INT-05     Accounts and Onboarding       The household mode, the roles, the contact-attempt log and the invite list come in. The export before account closure and the legal hold go out.              REC-01, REC-05, REC-06

  INT-06     Child Support Sync            Agency data comes in when the parent selects it. The hearing packet export (CSS-11) uses the certified export.                                                REC-01

  INT-08     Professionals and Access      Certified exports and journal notes that a parent shares go out as read-only.                                                                                 REC-01, REC-07

  INT-09     Support                       Affidavit requests, deletion requests and holds go to support staff and counsel, and their decisions come back. Case numbers and targets come from Support.   REC-02, REC-06

  INT-10     Children and Documents        The children saved in the household come in for journal entries.                                                                                              REC-07

  INT-11     Notary and mailing            A notary notarizes the affidavit. A copy is printed and mailed. The Manager chooses whether staff or a partner does this.                                     REC-02

  INT-12     Digital signing service       The PDF of a certified export is signed. IT chooses the service before the build.                                                                             REC-01
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

10.4 Non-functional requirements

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**       **Requirement**                                                                          **Where it applies here**
  ------------ ---------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------
  NFR-01       Two-factor sign-in for every account (100 percent of accounts)                           Exports, journal notes and requests open only after sign-in with the second check. The public pages need no sign-in and show no personal data.

  NFR-02       Encryption in transit and at rest                                                        Exports, certified files, journal notes, files, requests and holds

  NFR-03       Role-based access on every request                                                       FR-REC-01-22, FR-REC-02-08, FR-REC-07-04, FR-REC-06-12

  NFR-04       Changes are logged with actor, time and result                                           FR-REC-01-23, FR-REC-02-18, FR-REC-05-11, FR-REC-06-13, FR-REC-07-16

  NFR-05       Records cannot be edited. A change is a new entry.                                       FR-REC-01-13, FR-REC-01-21, FR-REC-07-07 to FR-REC-07-09, FR-REC-02-18, FR-REC-03-09

  NFR-06       Collect only the data that is needed                                                     FR-REC-01-16 and FR-REC-01-18 (no uploaded file and no visitor data is kept)

  NFR-07       Performance. The time to make an export of a large date range is to be agreed with IT.   FR-REC-01-20

  NFR-08       99.9 percent availability each month, not counting planned maintenance                   The public verification page must stay available for as long as certified records are kept

  NFR-09       Plain language on every screen. The standard is to be chosen.2 level AA.                 All screens and public pages

  NFR-11       English only.                                                                            All screens, exports and public pages

  NFR-12       Daily backups, data loss limited to 15 minutes, recovery within 4 hours                  Certified files, fingerprints and Record IDs
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
