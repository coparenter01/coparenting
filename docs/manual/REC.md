# Records and Court (REC)


10.1 Module overview

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  Purpose                 Turns everything the parents do in the app into records a court can use. This covers exports, proof of authenticity, and clear rules on how long data is kept.

  Users                   Parent, co-parent, professionals, court or agency (as recipients of exports)

  Pain points addressed   P02, P16, P17, P18

  Features                7 (4 Must-have, 3 Good-to-have, 0 Unique)

  Depends on              Messaging, Calendar, Expenses and Payments, Notifications (delivery logs), Child Support Sync (hearing packet).
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Certified, court-ready exports with a record ID and a public page where anyone can check them.

-   Support for business records affidavits and subpoenas.

-   Notes on court acceptance by jurisdiction, and model order language that accepts any compliant app rather than naming one.

-   Data export in PDF and CSV for every user.

-   A published retention policy, deletion of data that is not a record, and a legal hold for records tied to a case.

-   A journal for incident notes.

Purpose and scope

2.1 Purpose. This module turns what parents do in the app into records a court can review. It covers certified exports, proof that an export is genuine, support for affidavits and subpoenas, notes on court acceptance, model order language, clear rules on how long data is kept, and a journal for incident notes.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **How this module supports it**
  --------------- ------------------------------------------------------------------------------------------------------------------------------------------
  OBJ-01          Certified exports with a record ID and a public check page are the court-ready record of messages, calendar and expenses (REC-01).

  OBJ-02          A parent can select agency data for an export. The hearing packet export of Child Support Sync uses the same certified export (REC-01).

  OBJ-03          Fixes the High-rated pain point P16 (REC-01, REC-05) and (REC-02, REC-03). Also addresses the Medium-rated P17 and P18 (REC-04, REC-06).

  OBJ-05          Deletion and legal hold rules are plain and published (REC-06). Exports follow the Safety Mode hiding rules (FR-REC-01-03).
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

2.3 In scope. The seven features REC-01 to REC-07 listed in section 5.

10.2 Roles and permissions

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**                                            **What they do in this module**
  --------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parent                                              Makes exports, keeps journal notes, asks for a business records affidavit, asks for deletion of non-record data, and asks for a legal hold.

  Co-parent                                           The same as the Parent, once linked. Each parent exports only what they can see.

  Professional                                        Reads the exports and journal notes that a parent shares. Cannot post. Access comes with PRO-01. Whether a professional can ask for an affidavit is open.

  Support staff                                       Handles affidavit requests by hand. Sees the request details, the Record ID, the page count, the record types and the date range. Cannot read parent messages or open the content of an export.

  Court, agency staff, attorney or any other person   Not users of the app. They check a Record ID on the public verification page and read the public pages (court notes, model order language, retention policy, records request page).

  Third party and Child                               No feature in this module.2 gives a Third party no access to records and exports.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

10.3 Business requirements

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Business requirement**                                                                                                                **Features**
  -------------- --------------------------------------------------------------------------------------------------------------------------------------- --------------
  BREQ-01        A parent can make a certified, court-ready export with a record ID that anyone can check on a public page.                              REC-01

  BREQ-02        A parent can ask for a business records affidavit for a certified export, and ParentPath explains how to send a subpoena.               REC-02

  BREQ-03        A parent, a lawyer or a court can read notes on court acceptance by jurisdiction.                                                       REC-03

  BREQ-04        A parent or a lawyer can use model order language that accepts any app that meets a clear standard.                                     REC-04

  BREQ-05        Every user can export their own data in PDF and CSV, and it is.                                                                         REC-05

  BREQ-06        A parent can read the retention policy, ask for deletion of data that is not a record, and know that records tied to a case are kept.   REC-06

  BREQ-07        A parent can keep a private journal of incident notes with the time of each note.                                                       REC-07
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

10.4 Features

  ------------------------------------------------------------------------------------------------------------------------------
  **Feature**   **Name**                                                                           **Type**
  ------------- ---------------------------------------------------------------------------------- -----------------------------
  REC-01        Certified court-ready record exports with record ID and public verification page   Must-have → Must-have

  REC-02        Business records affidavit and subpoena support                                    Must-have → Must-have

  REC-03        Court-order guidance by jurisdiction                                               Good-to-have → Good-to-have

  REC-04        Model order language that accepts any compliant app                                Good-to-have → Good-to-have

  REC-05        Data export (PDF, CSV)                                                             Must-have → Must-have

  REC-06        Data retention policy, deletion of non-record data and legal hold                  Good-to-have → Good-to-have

  REC-07        Journal and incident notes                                                         Must-have → Must-have
  ------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**     **Screens**
  ------------------ ----------------- -------------------------------------------------------------------------------------
  REC-SUB-01         Journal           Journal list; create/edit journal or incident note; attachments

  REC-SUB-02         Exports           Export builder; export preview; export history; download

  REC-SUB-03         Certification     Certified export creation; record ID; public verification page; verification result

  REC-SUB-04         Affidavits        Affidavit request; subpoena support

  REC-SUB-05         Court guidance    Jurisdiction guidance; model order language

  REC-SUB-06         Retention         Retention policy; deletion request; legal hold
  --------------------------------------------------------------------------------------------------------------------------

10.5 Screen inventory

  ---------------------------------------------------------------------------------------
  **Screen ID**   **Screen**                                             **Feature**
  --------------- ------------------------------------------------------ ----------------
  REC-SCR-01      Export records: record types, date range and format    REC-01, REC-05

  REC-SCR-02      Export history                                         REC-01, REC-05

  REC-SCR-03      Public verification page                               REC-01

  REC-SCR-04      Journal list, with filters                             REC-07

  REC-SCR-05      Journal entry form, with files                         REC-07

  REC-SCR-06      Journal entry detail and version history               REC-07

  REC-SCR-07      Affidavit request form                                 REC-02

  REC-SCR-08      Affidavit request status                               REC-02

  REC-SCR-09      Support review of affidavit requests                   REC-02

  REC-SCR-10      Public records request page for attorneys and courts   REC-02

  REC-SCR-11      Public court notes by state                            REC-03

  REC-SCR-12      Public model order language                            REC-04

  REC-SCR-13      Public retention policy                                REC-06

  REC-SCR-14      Deletion request                                       REC-06

  REC-SCR-15      Legal hold request and release                         REC-06

  REC-SCR-B01     Records home                                           ---
  ---------------------------------------------------------------------------------------

10.6 Screen specifications

REC-SCR-01 --- Export records

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-01, REC-05
  -------------------------------------------------------------------------

![Figure REC-SCR-01 --- Export records](media/b23892cf55d8217d64ffd96bf536a42579fa9f9e.png "Figure REC-SCR-01 — Export records"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-01 --- Export records*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-10 Contact-attempt log; REC-SCR-02 Export history; REC-SCR-B01 Records home
  ----------------------- --------------------------------------------------------------------------------------------------------------------
  **Where you go next**   REC-SCR-02 Export history; REC-SCR-11 Public court notes by state; REC-SCR-B01 Records home; Main menu: any module

  --------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Select record types, date range, and export format.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Export Records\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Export progress (P-REC-001-12).

-   Input area (form fields, in specification order): Export format (P-REC-001-01); Messages (P-REC-001-02); Calendar (P-REC-001-03); Expenses (P-REC-001-04); Child support payments I recorded (P-REC-001-05); Contact attempts (P-REC-001-06); Journal notes (P-REC-001-07); Agency data (P-REC-001-08); Start date (P-REC-001-09); End date (P-REC-001-10); Free-export notice (P-REC-001-14).

-   Action area (primary action first, then secondary actions and links): Create export (P-REC-001-11); View export history (P-REC-001-13); Court notes link (P-REC-001-15).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**             **Type**             **Required**   **Editable**        **Default**   **Allowed values / validation**                           **Error**                 **Visibility**       **Saved to**                **Behavior**
  ------------------ ----------------------------------- -------------------- -------------- ------------------- ------------- --------------------------------------------------------- ------------------------- -------------------- --------------------------- -----------------------------------
  P-REC-001-01       Export format                       Radio group          Yes            Yes before submit   None          Certified PDF; PDF; CSV                                   Inline field message      Parent / Co-parent   Export.format               Determines export type

  P-REC-001-02       Messages                            Checkbox             Conditional    Yes                 Off           Selectable record type                                    ERR-02 if none selected   Parent / Co-parent   Export.record_types         Includes accessible messages

  P-REC-001-03       Calendar                            Checkbox             Conditional    Yes                 Off           Selectable record type                                    ERR-02 if none selected   Parent / Co-parent   Export.record_types         Includes accessible calendar data

  P-REC-001-04       Expenses                            Checkbox             Conditional    Yes                 Off           Selectable record type                                    ERR-02 if none selected   Parent / Co-parent   Export.record_types         Includes accessible expenses

  P-REC-001-05       Child support payments I recorded   Checkbox             Conditional    Yes                 Off           Selectable record type                                    ERR-02 if none selected   Recording parent     Export.record_types         Includes private payment log

  P-REC-001-06       Contact attempts                    Checkbox             Conditional    Yes                 Off           Selectable record type                                    ERR-02 if none selected   Parent / Co-parent   Export.record_types         Includes contact-attempt log

  P-REC-001-07       Journal notes                       Checkbox             Conditional    Yes                 Off           Selectable record type                                    ERR-02 if none selected   Parent / Co-parent   Export.record_types         Includes author's journal notes

  P-REC-001-08       Agency data                         Checkbox             Conditional    Yes                 Off           Selectable record type; available only with linked case   ERR-02 if none selected   Linking parent       Export.record_types         Includes selected agency data

  P-REC-001-09       Start date                          Date picker          Yes            Yes before submit   Blank         Not after end date                                        ERR-01                    Parent / Co-parent   Export.start_date           Required

  P-REC-001-10       End date                            Date picker          Yes            Yes before submit   Blank         Today or earlier; not before start                        ERR-01                    Parent / Co-parent   Export.end_date             Required

  P-REC-001-11       Create export                       Primary button       ---            ---                 ---           Requires format, at least one record type, valid range    ERR-01 / ERR-02           Parent / Co-parent   Export.status = Preparing   Starts export

  P-REC-001-12       Export progress                     Status indicator     System         No                  Preparing     Preparing; Ready; Failed                                  ---                       Parent / Co-parent   Export.status               Updates after creation

  P-REC-001-13       View export history                 Text link            ---            ---                 ---           ---                                                       ---                       Parent / Co-parent   ---                         Opens REC-SCR-02 Export history

  P-REC-001-14       Free-export notice                  Informational text   ---            ---                 ---           Exports are                                               ---                       Parent / Co-parent   ---                         Display only

  P-REC-001-15       Court notes link                    Text link            ---            ---                 ---           Court notes content                                       ---                       Parent / Co-parent   ---                         Opens Court notes by state
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------------------------------------------------------
  **State**             **Behavior**
  --------------------- -------------------------------------------------------------------------------------------------
  Empty                 No selections; Create export disabled

  Loading               Create disabled; progress shown

  Error                 Invalid date range: ERR-01; no record type: ERR-02; generation failure: ERR-03 and no Record ID

  Success               Export becomes Ready; user notified; download available
  -----------------------------------------------------------------------------------------------------------------------

Visibility rule: The export includes only data the exporting user can see on screen; Private items remain private and Safety Mode hiding rules apply.

REC-SCR-02 --- Export history

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-01, REC-05
  -------------------------------------------------------------------------

![Figure REC-SCR-02 --- Export history](media/93ec81ead3299865fbf68224baeba15e438ab77a.png "Figure REC-SCR-02 — Export history"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-02 --- Export history*

**Navigation**

  ---------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    REC-SCR-01 Export records; REC-SCR-07 Affidavit request; REC-SCR-B01 Records home
  ----------------------- ---------------------------------------------------------------------------------------------------------------------
  **Where you go next**   REC-SCR-01 Export records; REC-SCR-03 Public verification page; REC-SCR-07 Affidavit request; Main menu: any module

  ---------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -------------------------------------------------------------------------------
  **Purpose**    Show prior exports and allow re-download of certified exports.
  -------------- ----------------------------------------------------------------

  -------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Export History\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Format (P-REC-002-02); Record types (P-REC-002-03); Created at (P-REC-002-05); Status (P-REC-002-06); Record ID (P-REC-002-07); Filter (P-REC-002-12).

-   Input area (form fields, in specification order): Date range (P-REC-002-04); Page count (P-REC-002-08).

-   Action area (primary action first, then secondary actions and links): Export list (P-REC-002-01); Download (P-REC-002-09); Verify (P-REC-002-10); Request affidavit (P-REC-002-11).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**          **Required**   **Editable**   **Default**              **Allowed values / validation**                               **Error**               **Visibility**       **Saved to**                  **Behavior**
  ------------------ ------------------------- ----------------- -------------- -------------- ------------------------ ------------------------------------------------------------- ----------------------- -------------------- ----------------------------- ----------------------------------------------------------
  P-REC-002-01       Export list               Table / list      ---            ---            ---                      User's exports                                                Load error with retry   Parent / Co-parent   ---                           Displays export history

  P-REC-002-02       Format                    Badge             System         No             Derived                  Certified PDF; PDF; CSV                                       ---                     Parent / Co-parent   Export.format                 Display only

  P-REC-002-03       Record types              Badge / chips     System         No             Derived                  Selected record types                                         ---                     Parent / Co-parent   Export.record_types           Display only

  P-REC-002-04       Date range                Text              System         No             Derived                  Start--end dates                                              ---                     Parent / Co-parent   Export.start_date, end_date   Display only

  P-REC-002-05       Created at                Timestamp         System         No             Derived                  UTC storage; local display                                    ---                     Parent / Co-parent   Export.created_at             Display only

  P-REC-002-06       Status                    Badge             System         No             Derived                  Preparing; Ready; Failed                                      ---                     Parent / Co-parent   Export.status                 Display only

  P-REC-002-07       Record ID                 Text / copyable   System         No             Certified exports only   16 uppercase alphanumeric characters in four groups of four   ---                     Parent / Co-parent   Export.record_id              Copy / open verification

  P-REC-002-08       Page count                Text              System         No             Certified exports only   Positive integer                                              ---                     Parent / Co-parent   Export.page_count             Display only

  P-REC-002-09       Download                  Row action        ---            ---            ---                      Available for Ready exports                                   Load/download error     Parent / Co-parent   ---                           Downloads export

  P-REC-002-10       Verify                    Row action        ---            ---            ---                      Certified exports only                                        ---                     Parent / Co-parent   ---                           Opens REC-SCR-03 Public verification page with Record ID

  P-REC-002-11       Request affidavit         Row action        ---            ---            ---                      Certified exports only                                        ---                     Parent               ---                           ---

  P-REC-002-12       Filter                    Control group     No             Yes            None                     Format, status, date range                                    ---                     Parent / Co-parent   View state                    Filters list
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                   **Behavior**
  --------------------------- -------------------------------------------
  Empty                       No exports; Create export action

  Loading                     History skeleton

  Error                       Load failure and retry

  Success                     Export history displayed
  -----------------------------------------------------------------------

REC-SCR-03 --- Public verification page

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-01
  -------------------------------------------------------------------------

![Figure REC-SCR-03 --- Public verification page](media/e054503d305b204ad817753e4737d79b8c6a6973.png "Figure REC-SCR-03 — Public verification page"){width="6.666666666666667in" height="6.052083333333333in"}

*Figure REC-SCR-03 --- Public verification page*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    REC-SCR-02 Export history; Public web address printed on every certified export
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; REC-SCR-10 Public records request page; REC-SCR-13 Public retention policy; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -------------------------------------------------------------------------
  **Purpose**    Let anyone verify a certified export without signing in.
  -------------- ----------------------------------------------------------

  -------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Public Verification\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Verification result (P-REC-003-03); Created at (P-REC-003-04); Record types (P-REC-003-06); Comparison result (P-REC-003-09).

-   Input area (form fields, in specification order): Record ID (P-REC-003-01); Page count (P-REC-003-05); Upload PDF to compare (P-REC-003-07).

-   Action area (primary action first, then secondary actions and links): Verify (P-REC-003-02); Compare file (P-REC-003-08); Court notes link (P-REC-003-10).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**            **Allowed values / validation**                                        **Error**                                      **Visibility**                 **Saved to**          **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- ---------------------- ---------------------------------------------------------------------- ---------------------------------------------- ------------------------------ --------------------- ----------------------------
  P-REC-003-01       Record ID                 Text input         Yes            Yes            URL value if present   16 uppercase letters/digits in four groups of four; hyphen-separated   ERR-04 after 10 failed lookups in 10 minutes   Public visitor                 Lookup log            Validates ID

  P-REC-003-02       Verify                    Primary button     ---            ---            ---                    ---                                                                    ---                                            Public visitor                 Lookup result         Checks Record ID

  P-REC-003-03       Verification result       Status panel       System         No             None                   Valid; Unknown ID                                                      ---                                            Public visitor                 Lookup result         Displays result

  P-REC-003-04       Created at                Timestamp          System         No             Valid export only      UTC and local display                                                  ---                                            Public visitor, valid result   Export.created_at     Display only

  P-REC-003-05       Page count                Text               System         No             Valid export only      Positive integer                                                       ---                                            Public visitor, valid result   Export.page_count     Display only

  P-REC-003-06       Record types              Badge / chips      System         No             Valid export only      Selected record types                                                  ---                                            Public visitor, valid result   Export.record_types   Display only

  P-REC-003-07       Upload PDF to compare     File input         No             Yes            None                   PDF only; ≤25 MB; not retained                                         ERR-05 wrong type/size                         Public visitor                 Not saved             Compares file fingerprint

  P-REC-003-08       Compare file              Secondary button   Conditional    ---            ---                    Requires uploaded PDF                                                  ERR-05                                         Public visitor                 Comparison result     Returns match/mismatch

  P-REC-003-09       Comparison result         Status panel       System         No             None                   Same record; Different record                                          ---                                            Public visitor                 Comparison result     Display only

  P-REC-003-10       Court notes link          Text link          ---            ---            ---                    Court notes content                                                    ---                                            Public visitor                 ---                   Opens Court notes by state
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- -------------------------------------------------------------
  Empty                   Blank Record ID; Verify disabled

  Loading                 Verify disabled

  Error                   Unknown ID; rate limit after 10 failures/10 minutes: ERR-04

  Success                 Verification details shown without name or record content
  -------------------------------------------------------------------------------------

Privacy rule: A valid verification shows creation time, page count, and record types only; it never shows the exporter's name or record content.

REC-SCR-04 --- Journal list

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-07
  -------------------------------------------------------------------------

![Figure REC-SCR-04 --- Journal list](media/965f6d79818d6396807dfc416ae5debb8e380da2.png "Figure REC-SCR-04 — Journal list"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-04 --- Journal list*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    REC-SCR-05 Journal entry form; REC-SCR-06 Journal entry detail; REC-SCR-B01 Records home
  ----------------------- -----------------------------------------------------------------------------------------------------------------
  **Where you go next**   REC-SCR-05 Journal entry form; REC-SCR-06 Journal entry detail; REC-SCR-B01 Records home; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Display the user's private journal and incident notes.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Journal List\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Note date and time (P-REC-004-03); Attachment indicator (P-REC-004-05).

-   Input area (form fields, in specification order): Title (P-REC-004-02); Details preview (P-REC-004-04); Search (P-REC-004-06); Date filter (P-REC-004-07); Privacy notice (P-REC-004-09).

-   Action area (primary action first, then secondary actions and links): Journal list (P-REC-004-01); Add journal entry (P-REC-004-08).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**       **Error**               **Visibility**   **Saved to**               **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------- ------------------------------------- ----------------------- ---------------- -------------------------- -------------------------------------
  P-REC-004-01       Journal list              Table / card list    ---            ---            ---           Author's notes                        Load error with retry   Author only      ---                        Displays journal entries

  P-REC-004-02       Title                     Text                 System         No             Derived       1--100 characters                     ---                     Author only      JournalEntry.title         Opens detail

  P-REC-004-03       Note date and time        Timestamp            System         No             Derived       Not future                            ---                     Author only      JournalEntry.occurred_at   Display only

  P-REC-004-04       Details preview           Text                 System         No             Derived       First 100 characters                  ---                     Author only      JournalEntry.details       Display only

  P-REC-004-05       Attachment indicator      Badge / icon         System         No             Derived       Has files / none                      ---                     Author only      JournalEntry.files         Display only

  P-REC-004-06       Search                    Search input         No             Yes            Blank         Searches title/details                Inline field message    Author only      ---                        Filters list

  P-REC-004-07       Date filter               Date-range control   No             Yes            None          Valid date range                      Inline field message    Author only      View state                 Filters list

  P-REC-004-08       Add journal entry         Primary button       ---            ---            ---           ---                                   ---                     Author only      ---                        Opens REC-SCR-05 Journal entry form

  P-REC-004-09       Privacy notice            Informational text   ---            ---            ---           Journal notes are private to author   ---                     Author only      ---                        Display only
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- ------------------------------------------------
  Empty                      "No journal entries"; Add journal entry action

  Loading                    List skeleton

  Error                      Load failure and retry

  Success                    Author's journal entries displayed
  ---------------------------------------------------------------------------

REC-SCR-05 --- Journal entry form

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-07
  -------------------------------------------------------------------------

![Figure REC-SCR-05 --- Journal entry form](media/4bda503787c27921369dcbbca19b95f1743ffab8.png "Figure REC-SCR-05 — Journal entry form"){width="6.666666666666667in" height="5.416666666666667in"}

*Figure REC-SCR-05 --- Journal entry form*

**Navigation**

  ----------------------------------------------------------------------------------
  **How you get here**    REC-SCR-04 Journal list; REC-SCR-06 Journal entry detail
  ----------------------- ----------------------------------------------------------
  **Where you go next**   REC-SCR-04 Journal list; Main menu: any module

  ----------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Create or edit a private journal/incident note.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Journal Entry Form\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Title (P-REC-005-01); Details (P-REC-005-02); Date and time (P-REC-005-03); Attachments (P-REC-005-04); Character count (P-REC-005-07).

-   Action area (primary action first, then secondary actions and links): Save (P-REC-005-05); Cancel (P-REC-005-06).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**                   **Allowed values / validation**               **Error**                         **Visibility**   **Saved to**               **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- ----------------------------- --------------------------------------------- --------------------------------- ---------------- -------------------------- --------------------------
  P-REC-005-01       Title                     Text input         Yes            Yes            Blank or current value        1--100 characters                             ERR-07 missing; ERR-08 too long   Author only      JournalEntry.title         Required

  P-REC-005-02       Details                   Textarea           Yes            Yes            Blank or current value        1--5,000 characters                           ERR-07 missing; ERR-09 too long   Author only      JournalEntry.details       Required

  P-REC-005-03       Date and time             Date-time picker   Yes            Yes            Current time or entry value   Not future                                    ERR-10 future                     Author only      JournalEntry.occurred_at   Required

  P-REC-005-04       Attachments               File upload        No             Yes            Existing files                Up to 5 files (JPG, PNG, PDF), 25 MB in all   Inline field message              Author only      JournalEntry.files         Adds files

  P-REC-005-05       Save                      Primary button     ---            ---            ---                           ---                                           ---                               Author only      Journal entry/version      Creates or updates entry

  P-REC-005-06       Cancel                    Secondary button   ---            ---            ---                           ---                                           ---                               Author only      ---                        Discards changes

  P-REC-005-07       Character count           Helper text        ---            ---            0 / 5,000                     Updates as user types                         ---                               Author only      ---                        Display only
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ --------------------------------------------------------------------------------------
  Empty                    Blank form

  Loading                  Save disabled

  Error                    Missing field: ERR-07; long title: ERR-08; long details: ERR-09; future time: ERR-10

  Success                  Journal entry saved; return to list/detail
  ---------------------------------------------------------------------------------------------------------------

REC-SCR-06 --- Journal entry detail

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-07
  -------------------------------------------------------------------------

![Figure REC-SCR-06 --- Journal entry detail](media/6e94f414e853a7a4ba52ad36e9678eb824761945.png "Figure REC-SCR-06 — Journal entry detail"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-06 --- Journal entry detail*

**Navigation**

  -------------------------------------------------------------------------------------------------------
  **How you get here**    REC-SCR-04 Journal list
  ----------------------- -------------------------------------------------------------------------------
  **Where you go next**   REC-SCR-04 Journal list; REC-SCR-05 Journal entry form; Main menu: any module

  -------------------------------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------
  **Purpose**    View one journal entry, its files, and version history.
  -------------- ---------------------------------------------------------

  ------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Journal Entry Detail / History\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Title (P-REC-006-01); Details (P-REC-006-02); Date and time (P-REC-006-03); Attachments (P-REC-006-04).

-   Input area (form fields, in specification order): Author (P-REC-006-05); Version history (P-REC-006-06).

-   Action area (primary action first, then secondary actions and links): Edit (P-REC-006-07); Delete (P-REC-006-08); Back (P-REC-006-09).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**                        **Error**              **Visibility**   **Saved to**              **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------- ------------------------------------------------------ ---------------------- ---------------- ------------------------- -------------------------------------
  P-REC-006-01       Title                     Read-only text       System         No             Entry value   1--100 characters                                      ---                    Author only      JournalEntry.title        Display only

  P-REC-006-02       Details                   Read-only text       System         No             Entry value   1--5,000 characters                                    ---                    Author only      JournalEntry.details      Display only

  P-REC-006-03       Date and time             Timestamp            System         No             Entry value   Not future; UTC storage; local display                 ---                    Author only      occurred_at               Display only

  P-REC-006-04       Attachments               File list            System         No             Entry value   Up to 5 files (JPG, PNG, PDF), 25 MB in all            Load error             Author only      JournalEntry.files        View/download

  P-REC-006-05       Author                    Text                 System         No             Creator       Author display name                                    ---                    Author only      author_user_id            Display only

  P-REC-006-06       Version history           Timeline             System         No             Derived       All versions retained                                  Load error             Author only      Journal version history   Display only

  P-REC-006-07       Edit                      Primary button       ---            ---            ---           Author only; each edit saves a new version             Inline field message   Author           New version               Opens REC-SCR-05 Journal entry form

  P-REC-006-08       Delete                    Destructive button   ---            ---            ---           Author only; the note is voided and stays in history   Inline field message   Author           Deletion record           Deletes or archives entry

  P-REC-006-09       Back                      Button / link        ---            ---            ---           ---                                                    ---                    Author only      ---                       Returns to journal list
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- -----------------------------------------------
  Empty                     Not applicable; opens only for existing entry

  Loading                   Detail skeleton

  Error                     Not found or load failure

  Success                   Entry, files, and version history displayed
  -------------------------------------------------------------------------

REC-SCR-07 --- Affidavit request

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-02
  -------------------------------------------------------------------------

![Figure REC-SCR-07 --- Affidavit request](media/46e67b416a9887595df69b6e9385b1d8ee269fe9.png "Figure REC-SCR-07 — Affidavit request"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-07 --- Affidavit request*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    REC-SCR-02 Export history
  ----------------------- --------------------------------------------------------
  **Where you go next**   REC-SCR-02 Export history; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

REC-SCR-08 --- Affidavit request status

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-08
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-02
  -------------------------------------------------------------------------

![Figure REC-SCR-08 --- Affidavit request status](media/8b58d5c537e40e57968b6385e638463d1f87e3e6.png "Figure REC-SCR-08 — Affidavit request status"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-08 --- Affidavit request status*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    REC-SCR-B01 Records home
  ----------------------- --------------------------------------------------------
  **Where you go next**   REC-SCR-B01 Records home; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

REC-SCR-09 --- Staff review of affidavits

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-09
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-02
  -------------------------------------------------------------------------

![Figure REC-SCR-09 --- Staff review of affidavits](media/e57eda973f58f079e3ee0eba1d392c3b5b695f6d.png "Figure REC-SCR-09 — Staff review of affidavits"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-09 --- Staff review of affidavits*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-16 Load log for operations; SUP-SCR-14 Support measures report; Operations staff sign in to the operations workspace
  ----------------------- ------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   CSS-SCR-16 Load log for operations; SUP-SCR-14 Support measures report

  ------------------------------------------------------------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

REC-SCR-10 --- Public records request page

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-10
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-02
  -------------------------------------------------------------------------

![Figure REC-SCR-10 --- Public records request page](media/fd5e18c0dad347515be86aff28f176aced3b0a5d.png "Figure REC-SCR-10 — Public records request page"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-10 --- Public records request page*

**Navigation**

  --------------------------------------------------------------------------------------------------------
  **How you get here**    REC-SCR-03 Public verification page; Public web address for courts and lawyers
  ----------------------- --------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  --------------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

REC-SCR-11 --- Public court notes by state

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-11
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-03
  -------------------------------------------------------------------------

![Figure REC-SCR-11 --- Public court notes by state](media/957e5a17f4311df50be2d5a10c8070b0bfe021b0.png "Figure REC-SCR-11 — Public court notes by state"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-11 --- Public court notes by state*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    REC-SCR-01 Export records
  ----------------------- -----------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; REC-SCR-12 Public model order language; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  -----------------------------------------------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

REC-SCR-12 --- Public model order language

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-12
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-04
  -------------------------------------------------------------------------

![Figure REC-SCR-12 --- Public model order language](media/9b688e642748f2de44400437720f3400ec46ac58.png "Figure REC-SCR-12 — Public model order language"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-12 --- Public model order language*

**Navigation**

  -------------------------------------------------------------------------------------------------
  **How you get here**    REC-SCR-11 Public court notes by state
  ----------------------- -------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  -------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

REC-SCR-13 --- Public retention policy

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-13
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-06
  -------------------------------------------------------------------------

![Figure REC-SCR-13 --- Public retention policy](media/99edebb4cc4ef7fc42e915921bef7fa998257178.png "Figure REC-SCR-13 — Public retention policy"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-13 --- Public retention policy*

**Navigation**

  -------------------------------------------------------------------------------------------------
  **How you get here**    REC-SCR-03 Public verification page; REC-SCR-14 Deletion request
  ----------------------- -------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  -------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

REC-SCR-14 --- Deletion request

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-14
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-06
  -------------------------------------------------------------------------

![Figure REC-SCR-14 --- Deletion request](media/d5350b227f5b9b42e0df530b0dddb8fa07578fd6.png "Figure REC-SCR-14 — Deletion request"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-14 --- Deletion request*

**Navigation**

  -----------------------------------------------------------------------------------
  **How you get here**    REC-SCR-B01 Records home
  ----------------------- -----------------------------------------------------------
  **Where you go next**   REC-SCR-13 Public retention policy; Main menu: any module

  -----------------------------------------------------------------------------------

The screen components are shown in the figure above.

REC-SCR-15 --- Legal hold

  -------------------------------------------------------------------------
  **Screen ID**    REC-SCR-15
  ---------------- --------------------------------------------------------
  **Module**       Records and Court

  **Feature(s)**   REC-06
  -------------------------------------------------------------------------

![Figure REC-SCR-15 --- Legal hold](media/d070ecbbf2849e43e297a15a605fa105e7993fdc.png "Figure REC-SCR-15 — Legal hold"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-15 --- Legal hold*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-18 Close account; REC-SCR-B01 Records home
  ----------------------- --------------------------------------------------------
  **Where you go next**   REC-SCR-B01 Records home; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

REC-SCR-B01 --- Records home

  ------------------------------------------------------------------------
  **Screen ID**   REC-SCR-B01
  --------------- --------------------------------------------------------
  **Module**      Records and Court

  ------------------------------------------------------------------------

![Figure REC-SCR-B01 --- Records home](media/0ec39e6cb3fbe26d0fb73b3b6591d81131507320.png "Figure REC-SCR-B01 — Records home"){width="6.666666666666667in" height="5.0in"}

*Figure REC-SCR-B01 --- Records home*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Records; REC-SCR-01 Export records; REC-SCR-04 Journal list; REC-SCR-08 Affidavit request status; REC-SCR-15 Legal hold
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   REC-SCR-01 Export records; REC-SCR-02 Export history; REC-SCR-04 Journal list; REC-SCR-08 Affidavit request status; REC-SCR-14 Deletion request; REC-SCR-15 Legal hold; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

Cross-screen rules and pending screen decisions (Records and Court)

Cross-screen Records rules

Pending screen decisions --- Records and Court

10.7 Field-level specifications

2.1 Journal / Incident Note --- REC-SCR-05 Journal entry form → REC-SCR-05

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**     **Technical name**   **Type / control**   **Required**   **Editable**                              **Default**    **Allowed values / validation**           **Visibility**
  -------------- ------------- -------------------- -------------------- -------------- ----------------------------------------- -------------- ----------------------------------------- ----------------
  FLD-REC-001    Note          note_text            Textarea             Yes            Not specified --- confirmation required   None           Not specified --- confirmation required   Author only

  FLD-REC-002    Note time     occurred_at          Datetime             Yes            Not specified --- confirmation required   Current time   UTC storage; local display                Author only

  FLD-REC-003    Attachments   attachment_ids       File upload          No             Not specified --- confirmation required   None           Not specified --- confirmation required   Author only

  FLD-REC-004    Author        author_user_id       System               System         No                                        Current user   Immutable                                 Author only
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.2 Data Export --- REC-SCR-01 Export records → REC-SCR-01

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**        **Technical name**    **Type / control**   **Required**   **Editable**        **Default**     **Allowed values / validation**                                                                                 **Visibility**
  -------------- ---------------- --------------------- -------------------- -------------- ------------------- --------------- --------------------------------------------------------------------------------------------------------------- ----------------------
  FLD-REC-010    Export format    format                Select               Yes            No after creation   None            PDF, CSV                                                                                                        Export form

  FLD-REC-011    Record types     record_types          Multi-select         Yes            No after creation   None            Messages, Calendar, Expenses, Child support payments I recorded, Contact attempts, Journal notes, Agency data   Export form

  FLD-REC-012    Start date       start_date            Date                 Yes            No after creation   None            Not after end date; ERR-01                                                                                      Export form

  FLD-REC-013    End date         end_date              Date                 Yes            No after creation   None            Not future; ERR-01                                                                                              Export form

  FLD-REC-014    Export status    status                Display              System         No                  Preparing       Preparing, Ready, Failed                                                                                        Export history

  FLD-REC-015    Created at       created_at            Timestamp            System         No                  Creation time   UTC + local display                                                                                             Export cover/history

  FLD-REC-016    Exporting user   exported_by_user_id   System               System         No                  Current user    Immutable                                                                                                       Export cover
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.3 Certified Export --- REC-SCR-01 Export records / REC-SCR-03 Public verification page → REC-SCR-01, REC-SCR-03

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**                 **Technical name**        **Type / control**   **Required**   **Editable**   **Default**                **Allowed values / validation**                                                               **Visibility**
  -------------- ------------------------- ------------------------- -------------------- -------------- -------------- -------------------------- --------------------------------------------------------------------------------------------- ---------------------------
  FLD-REC-020    Record ID                 record_id                 Display              System         No             Generated                  16 uppercase letters/digits; four groups of four; hyphen-separated; unique and never reused   Export/verification

  FLD-REC-021    Digital fingerprint       file_fingerprint          System               System         No             Generated                  Immutable                                                                                     Internal / verification

  FLD-REC-022    Page count                page_count                Integer              System         No             Generated                  Positive integer                                                                              Export cover/verification

  FLD-REC-023    Certification statement   certification_statement   Display              System         No             Counsel-approved wording   Court-ready wording; never "court approved"                                                   Export cover

  FLD-REC-024    Verification lookup       lookup_record_id          Text                 Yes            No             None                       Valid format; 10 failures/10 minutes triggers 15-minute block; ERR-04                         Public page

  FLD-REC-025    Verification PDF          verification_file         File upload          No             No             None                       PDF only; ≤25 MB; not retained; ERR-05 otherwise                                              Public page

  FLD-REC-026    Verification result       verification_result       Display              System         No             None                       Match, mismatch, unknown ID                                                                   Public page
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

10.8 User actions and procedures

ACT-REC-001 --- Create Journal / Incident Note

  ------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- --------------------------------------------------------------------------------------------------------------------------------
  **Screen**            REC-SCR-05 Journal entry form

  **Objective**         Record an incident or personal note for the record

  **Trigger**           User saves note

  **Preconditions**     User signed in

  **System behavior**   Create journal/incident note with timestamp and optional files; note is private to its author; available for export by author.

  **Data created**      Journal note, attachments, audit log

  **Success**           Note appears in Journal list

  **Negative**          Save failure creates no note.

  **Permissions**       Author only; professional access only if explicitly shared.

  **Source**            REC-07.

  **Screen(s)**         REC-SCR-05 Journal entry form, with files
  ------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open REC-SCR-05 Journal entry form, with files (entry: REC-SCR-05 Journal entry form; REC-SCR-01 Export records).

2.  Make sure the preconditions are met: User signed in.

3.  Enter or select the required information: Title; Details; Date and time.

4.  Perform the action: User saves note.

5.  The system processes the action: Create journal/incident note with timestamp and optional files; note is private to its author; available for export by author.

6.  Result on success: Note appears in Journal list.

7.  If it fails or a rule is not met: Save failure creates no note.

ACT-REC-002 --- Build Data Export

  ----------------------------------------------------------------------------------------------------------
  **Actor**           Parent or Co-parent
  ------------------- --------------------------------------------------------------------------------------
  **Screen**          REC-SCR-01 Export records

  **Objective**       Export the user's accessible records

  **Trigger**         User selects record types and date range

  **Preconditions**   User signed in

  **Data created**    Export request/file, audit log

  **Success**         Export preview and download

  **Negative**        No selectable data: empty state; generation failure: error state with retry/support.

  **Permissions**     Each user exports only what they can see.

  **Source**          REC-05; BR-05.

  **Screen(s)**       REC-SCR-01 Export records: record types, date range and format
  ----------------------------------------------------------------------------------------------------------

1.  Open REC-SCR-01 Export records: record types, date range and format (entry: Main navigation → Records; account-closure export flow).

2.  Make sure the preconditions are met: User signed in.

3.  Enter or select the required information: Export format; Start date; End date.

4.  Perform the action: User selects record types and date range.

5.  Result on success: Export preview and download.

6.  If it fails or a rule is not met: No selectable data: empty state; generation failure: error state with retry/support.

ACT-REC-003 --- Create Certified Export

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- ----------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            REC-SCR-01 Export records → REC-SCR-01 Export records

  **Objective**         Create a court-ready, verifiable export

  **Trigger**           User selects certified export

  **Preconditions**     Legal approval for certified-export release is recorded; user has access to selected records

  **System behavior**   Generate certified export with unique Record ID; expose public verification page; preserve record integrity; apply Safety Mode hiding rules.

  **Data created**      Certified export, Record ID, verification record, audit log

  **Success**           Export downloadable; Record ID verifiable publicly

  **Negative**          Legal gate not complete: feature unavailable; generation failure prevents Record ID issuance.

  **Permissions**       Parent/Co-parent; professional may view/share only if parent shares.

  **Source**            9\.

  **Release gate**      Legal review required.

  **Screen(s)**         REC-SCR-01 Export records: record types, date range and format, REC-SCR-01 Export records: record types, date range and format
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open REC-SCR-01 Export records: record types, date range and format, REC-SCR-01 Export records: record types, date range and format (entry: Main navigation → Records; account-closure export flow).

2.  Make sure the preconditions are met: Legal approval for certified-export release is recorded; user has access to selected records.

3.  Enter or select the required information: Export format; Start date; End date.

4.  Perform the action: User selects certified export.

5.  The system processes the action: Generate certified export with unique Record ID; expose public verification page; preserve record integrity; apply Safety Mode hiding rules.

6.  Result on success: Export downloadable; Record ID verifiable publicly.

7.  If it fails or a rule is not met: Legal gate not complete: feature unavailable; generation failure prevents Record ID issuance.

ACT-REC-004 --- Verify Record ID

  ---------------------------------------------------------------------------------------------------------
  **Actor**             Visitor, professional, court user
  --------------------- -----------------------------------------------------------------------------------
  **Screen**            REC-SCR-03 Public verification page / REC-SCR-03 Public verification page

  **Objective**         Confirm that an export is genuine

  **Trigger**           User enters Record ID

  **Preconditions**     Public verification page available

  **System behavior**   Return valid/invalid verification result without exposing private record content.

  **Data viewed**       Verification status

  **Success**           Valid/invalid result displayed

  **Negative**          Invalid ID returns not-verified result.

  **Permissions**       Public

  **Source**            REC-01.

  **Screen(s)**         REC-SCR-03 Public verification page, REC-SCR-03 Public verification page
  ---------------------------------------------------------------------------------------------------------

1.  Open REC-SCR-03 Public verification page, REC-SCR-03 Public verification page (entry: Public URL; REC-SCR-04 Journal list).

2.  Make sure the preconditions are met: Public verification page available.

3.  Enter or select the required information: Record ID.

4.  Perform the action: User enters Record ID.

5.  The system processes the action: Return valid/invalid verification result without exposing private record content.

6.  Result on success: Valid/invalid result displayed.

7.  If it fails or a rule is not met: Invalid ID returns not-verified result.

10.9 Business rules and validations

-   Each journal entry has a type, Incident or Note, and can be linked to one or more children (optional).

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**     **What it covers in this module**                                                                                            **Applied in**
  ------------ ---------------------------------------------------------------------------------------------------------------------------- --------------------------------------------
  BR-05        Data export is                                                                                                               FR-REC-01-19, FR-REC-05-02

  BR-20        Every certified export carries a record ID that anyone can check on a public verification page                               FR-REC-01-12, FR-REC-01-15, FR-REC-02-09

  BR-21        Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export   FR-REC-05-10, FR-REC-06-04 to FR-REC-06-11

  BR-22        Safety Mode hides address and location, and makes notifications discreet                                                     FR-REC-01-03, FR-REC-01-05, FR-REC-07-14

  BR-25        Every request gets a case number, and issues tied to court dates are handled first                                           FR-REC-02-05
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Two more rules are used from other modules. BR-08 (a sent message cannot be edited or deleted) and BR-16 (agency values are read-only) are kept in an export because the export copies the source data and never changes it (FR-REC-01-21).

  --------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- ---------------------------------------------------------------------------------------------------------------------------------
  BR-05      Data export, tone, safety and reporting tools are available to every user.

  BR-08      A sent message cannot be edited or deleted.

  BR-16      Agency values are read-only in the app. Each one shows its source (API or batch) and the time it was last updated.

  BR-20      Every certified export carries a record ID that anyone can check on a public verification page.

  BR-21      Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.

  BR-25      Every request gets a case number. Issues tied to court dates are handled first.
  --------------------------------------------------------------------------------------------------------------------------------------------

10.10 Messages and errors

Errors

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **When it shows**                                   **Text**                                                                                         **Used by**
  ---------- --------------------------------------------------- ------------------------------------------------------------------------------------------------ ------------------------------------------
  ERR-01     The date range is not valid                         Choose a start date that is not after the end date, and an end date that is not in the future.   FR-REC-01-02

  ERR-02     No record type is chosen                            Choose at least one record type.                                                                 FR-REC-01-02

  ERR-03     An export cannot be made                            We could not make your export. No record ID was issued. Please try again.                        FR-REC-01-24, FR-REC-05-12

  ERR-04     A device made too many failed lookups               Too many tries. Please wait 15 minutes and try again.                                            FR-REC-01-17

  ERR-05     An uploaded file is not a PDF or is too large       Upload a PDF file of up to 25 MB.                                                                FR-REC-01-16

  ERR-06     A change cannot be saved                            We could not save your change. Nothing was changed. Please try again.                            FR-REC-02-19, FR-REC-06-14, FR-REC-07-17

  ERR-07     A required field is empty                           Fill in the \[field name\].                                                                      FR-REC-02-02, FR-REC-07-02

  ERR-08     A title is longer than 100 characters               Use up to 100 characters.                                                                        FR-REC-07-02

  ERR-09     Journal details are longer than 5,000 characters    Your note is too long. Keep it under 5,000 characters.                                           FR-REC-07-02

  ERR-10     The date and time of an entry are in the future     The date and time cannot be in the future.                                                       FR-REC-07-02

  ERR-11     A file type is not allowed                          This file type is not allowed. Use JPG, PNG or PDF.                                              FR-REC-07-05

  ERR-12     Too many files or too much data                     Attach up to 5 files, 25 MB in all.                                                              FR-REC-07-05

  ERR-13     A file fails the malware scan                       We could not attach this file because it did not pass our safety check.                          FR-REC-07-05

  ERR-14     A household is over the storage limit               You are over the storage limit. You can still view and export your files.                        FR-REC-07-06

  ERR-15     A voided entry is edited                            This note was voided and cannot be changed.                                                      FR-REC-07-08

  ERR-17     The Record ID is not in the account of the parent   We could not find a certified record with this ID in your account.                               FR-REC-02-03

  ERR-18     A second open affidavit request for a Record ID     You already asked for an affidavit for this record.                                              FR-REC-02-04

  ERR-19     A note or an address is too long                    That is too long. Use up to the number of characters shown.                                      FR-REC-02-02

  ERR-20     A deletion is asked for while a legal hold is on    Your data is under a legal hold, so it cannot be deleted now.                                    FR-REC-06-06

  ERR-21     A second open deletion request                      You already have a deletion request in progress.                                                 FR-REC-06-06

  ERR-22     A hold is asked for while one is on                 A legal hold is already on.                                                                      FR-REC-06-09

  ERR-23     A public page cannot be loaded                      We could not load this page. Please try again.                                                   FR-REC-03-10, FR-REC-04-09, FR-REC-06-14
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **When it shows**                                **Text**                                                                                                                                                                                       **Feature**
  ----------- ------------------------------------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------
  MSGT-01     An export starts                                 We are making your export. We will tell you when it is ready.                                                                                                                                  REC-01, REC-05

  MSGT-02     An export is ready (alert)                       Your export is ready.                                                                                                                                                                          REC-01, REC-05

  MSGT-03     No item matches the range and the record types   No records match this date range and these record types.                                                                                                                                       REC-01

  MSGT-04     A PDF that is not certified is shown             This export is not certified. It has no record ID.                                                                                                                                             REC-05

  MSGT-05     A valid Record ID is entered                     This record was made by ParentPath on \[date and time\] UTC. It has \[number\] pages and holds: \[record types\].                                                                              REC-01

  MSGT-06     An unknown Record ID is entered                  No record was found for this ID. Check the ID and try again.                                                                                                                                   REC-01

  MSGT-07     An uploaded file matches the record              The file you uploaded is the same as the record.                                                                                                                                               REC-01

  MSGT-08     An uploaded file does not match the record       The file you uploaded is not the same as the record.                                                                                                                                           REC-01

  MSGT-09     The cover of a certified export                  ParentPath certifies that this record was created by ParentPath from the data in the account of \[name\], on \[date and time\]. It is a court-ready record. A court decides what it accepts.   REC-01

  MSGT-10     A journal entry is saved                         Your note was saved.                                                                                                                                                                           REC-07

  MSGT-11     A journal entry is voided                        This note was voided. It stays in your history.                                                                                                                                                REC-07

  MSGT-12     An affidavit request is sent                     We received your request. Your case number is \[number\]. We will tell you when there is an update.                                                                                            REC-02

  MSGT-13     An affidavit request changes status (alert)      Your affidavit request is now \[status\].                                                                                                                                                      REC-02

  MSGT-14     An affidavit request is declined                 Your affidavit request was declined. Reason: \[reason\].                                                                                                                                       REC-02

  MSGT-15     A parent chooses Mailed copy                     A mailed copy costs \[amount\]. An electronic copy is free.                                                                                                                                    REC-02

  MSGT-16     A page of court notes opens                      ParentPath records are court-ready. A court decides what it accepts. This is not legal advice.                                                                                                 REC-03

  MSGT-17     A state has no note                              We have no note for this state yet. Please read the general note.                                                                                                                              REC-03

  MSGT-18     A note is more than 12 months old                This note was last reviewed on \[date\] and may be out of date.                                                                                                                                REC-03

  MSGT-19     The model order language opens                   This is sample language. It is not legal advice. Ask a lawyer to check it for your case.                                                                                                       REC-04

  MSGT-20     A parent confirms a deletion request             You are asking us to delete data that is not a record. This cannot be undone. Records stay. Export your data first if you want a copy.                                                         REC-06

  MSGT-21     A deletion request is completed                  Your data was deleted. Records were kept.                                                                                                                                                      REC-06

  MSGT-22     A deletion request changes status (alert)        Your deletion request is now \[status\].                                                                                                                                                       REC-06

  MSGT-23     A legal hold is on                               A legal hold is on. Your data will not be deleted while it is on.                                                                                                                              REC-06

  MSGT-24     A legal hold is released                         The legal hold was released.                                                                                                                                                                   REC-06

  MSGT-25     The records request page opens                   ParentPath produces only the records of the account named in a valid subpoena.                                                                                                                 REC-02
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

10.11 Dependencies

  -------------------------------------------------------------------------------------------
  **Module**                 **What it needs from Records and Court**
  -------------------------- ----------------------------------------------------------------
  Accounts and Onboarding    The export before account closure, and the legal hold (ACC-12)

  Child Support Sync         The certified export for the hearing packet (CSS-11)

  Professionals and Access   The exports and journal notes that a parent shares

  Support                    Affidavit, deletion and hold requests to handle
  -------------------------------------------------------------------------------------------

12.3 Assumptions

-   The pages of other apps named in the market review describe those apps on October 13, 2026 and can change.

-   Pain point P17 rests on user reviews that are not verified (Pain Point workbook).

10.12 End-to-end workflows and scenarios

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                                                                                                   **Module path**                       **Features / rules**
  -------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------- --------------------------------------
  WF-02          Invite co-parent, accept invite, household becomes Linked                                                                                                                         ACC → NTF → REC                       ACC-02, ACC-05

  WF-03          Choose Solo Mode, keep records; co-parent joins later; Solo records stay private until shared                                                                                     ACC → EXP/DOC/CAL/REC                 ACC-03, BR-01

  WF-04          Reach a co-parent who is not on the app by text/email; replies appended; every attempt logged before send                                                                         ACC → NTF → MSG → REC                 ACC-04, ACC-05, NTF-06

  WF-05          Compose and send a message with optional tone check; delivery escalation push → SMS (15 min) → email (1 h); status logged                                                         MSG → SAF → NTF → REC                 MSG-01--04, NTF-01, NTF-02

  WF-07          Create, edit (incl. recurring), cancel calendar events; history kept; reminders sent                                                                                              CAL → NTF → REC                       CAL-01, CAL-10, NTF-04

  WF-09          Schedule change / swap request: send → approve (confirm + 10-min undo) / decline / withdraw / expire                                                                              CAL → NTF → REC                       CAL-02, BR-12

  WF-10          Expense with receipt → share → reimbursement request → accept / decline / mark paid / withdraw                                                                                    EXP → DOC/BIL (storage) → NTF → REC   EXP-01--03, EXP-06, BR-14

  WF-12          Add child, information entries, documents with versions; archive/restore; storage accounting                                                                                      DOC → REC                             DOC-01, DOC-02

  WF-13          Journal notes; data export (PDF/CSV, free); certified export with Record ID; public verification                                                                                  REC ← MSG/CAL/EXP/DOC/NTF/ACC         REC-01, REC-05, REC-07, BR-05, BR-20

  WF-20          Link a child-support case (state, details, one-time code, consent) → API/batch load → overview, comparison, hearings in calendar, reminders → share an item → unlink and export   CSS → ACC/EXP/CAL/NTF/REC             CSS-01--05, CSS-07, CSS-12, CSS-13

  WF-22          Place / receive an in-app call, recording only with both parties' consent, call log, recordings and transcripts                                                                   CLL → MSG → REC                       CLL-01--03

  WF-23          Invite a professional, set categories and dates, professional accepts, read-only view, access log, end access                                                                     PRO → ACC → REC                       PRO-01, PRO-02, BR-24

  WF-24          Account closure, deletion of non-record data, legal hold                                                                                                                          ACC → REC                             ACC-12, REC-06, BR-21
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Scenario**   **Scenario**                                      **Expected behaviour**
  -------------- ------------------------------------------------- -------------------------------------------------------------------------------------------------------------
  SCN-REC-001    Parent exports messages, calendar, and expenses   Export includes only records the parent can see; PDF/CSV export remains free.

  SCN-REC-002    Parent creates certified export                   System issues Record ID and public verification capability; legal approval must be recorded before release.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
