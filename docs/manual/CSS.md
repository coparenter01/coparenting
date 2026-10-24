# Child Support Sync (CSS)


9.1 Module overview

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Purpose                 The main difference between this app and the ones reviewed. It connects the parent\'s account with their child support case so agency facts and the parent\'s own records sit side by side. See section 8 for the full design.

  Users                   Parent (linked to their own case)

  Pain points addressed   P11, P14, P16, P19, P20, P21, P22, P23

  Features                11 (0 Must-have, 0 Good-to-have, 11 Unique)

  Depends on              Every item here needs the agency API and batch process for the first state, and the details of those are not yet known. It also needs Expenses and Payments (EXP-07), Calendar (CAL-01), Notifications (NTF-04), Accounts (ACC-01) and Safety and Privacy (SAF-01).
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Linking a case, with an identity check and recorded consent.

-   A read-only pull of case status, order amount, payment history, arrears and next hearing.

-   Agency payments shown next to the payments the parent recorded, with a flag where they differ.

-   Balance and due dates with reminders. Hearings, deadlines and required documents in the calendar.

-   A source and last-synced label on every agency value.

-   Second step: send proof of direct payments and expense proofs to the agency, offer Safety Mode when the case has a family violence flag, use the agency notice as an invite channel, and show one timeline of everything.

-   Later: a hearing packet export.

Purpose and scope

2.1 Purpose. This module connects the account of a parent with their child support case, so that agency facts and the parent\'s own records sit side by side. It is the main difference between this app and the 11 apps that were reviewed. None of them connects to a state child support system.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **How this module supports it**
  ---------------- -------------------------------------------------------------------------------------------------------------------------------------------------------
  OBJ-01           The proof package, the hearing packet and the exports with agency data are part of the court-ready record (CSS-06, CSS-11).

  OBJ-02           This module is the objective: it connects to US child support systems through an API and a batch process, read-only first (CSS-01 to CSS-07, CSS-12).

  OBJ-03           Fixes the High-rated pain points P19, P20 and P22 (CSS-01 to CSS-07).

  OBJ-05           Agency data stays private to the linked parent, and a family violence flag can offer Safety Mode (CSS-08, CSS-13).
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

9.2 Roles and permissions

  --------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**                **What they do in this module**
  ----------------------- --------------------------------------------------------------------------------------------------------------------------
  Parent                  Links their own case, reads the agency data, refreshes it, shares one item, and unlinks. Also sends proof to the agency.

  Co-parent               Sees nothing from the agency unless the linked parent shares one item.

  Professional            Reads an item that the linked parent shares. Cannot link or send.

  Support staff           Sees that a link exists and the load log. Never sees the agency values.

  Agency staff            Not users of the app.

  Third party and Child   No feature in this module.
  --------------------------------------------------------------------------------------------------------------------------------------------------

9.3 Business requirements

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Business requirement**                                                                                                                      **Features**
  -------------- --------------------------------------------------------------------------------------------------------------------------------------------- --------------
  BREQ-01        A parent can link their own child support case after an identity check and a recorded consent.                                                CSS-01

  BREQ-02        A linked parent sees the case status, the order amount, the payment history, the arrears and the next hearing from the agency, read-only.     CSS-02

  BREQ-03        Agency payments and the payments the parent recorded sit side by side, and a difference is flagged.                                           CSS-03

  BREQ-04        A parent sees the arrears, the balance and the due dates, with reminders.                                                                     CSS-04

  BREQ-05        Hearings, deadlines and required documents show in the calendar.                                                                              CSS-05

  BREQ-06        A parent can send proof of direct payments and expense proofs to the agency, only after confirming it and only where the agency allows it.    CSS-06

  BREQ-07        Every agency value shows its source and the time it was last updated.                                                                         CSS-07

  BREQ-08        A family violence flag on the case can offer Safety Mode to the parent.                                                                       CSS-08

  BREQ-09        An agency notice can carry an invite to the app.                                                                                              CSS-09

  BREQ-10        One timeline shows payments, hearings, notices and expenses.                                                                                  CSS-10

  BREQ-11        A parent can export a hearing packet.                                                                                                         CSS-11

  BREQ-12        The sync runs through one integration layer with one connector for each state, with API calls and batch loads that are checked and watched.   CSS-12

  BREQ-13        A parent can share one agency item with the co-parent or a professional for a limited time.                                                   CSS-13
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

9.4 Features

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  **Feature**   **Name**                                                                                                             **Type**
  ------------- -------------------------------------------------------------------------------------------------------------------- -----------------------
  CSS-01        Link a child support case with identity check and consent                                                            Unique → Unique

  CSS-02        Read-only pull of case status, order amount, payment history, arrears and next hearing                               Unique → Unique

  CSS-03        Agency payments and app-recorded payments side by side, with mismatch flags                                          Unique → Unique

  CSS-04        Arrears, balance and due dates with reminders                                                                        Unique → Unique

  CSS-05        Hearings, deadlines and required documents in the calendar                                                           Unique → Unique

  CSS-06        Send proof of direct payments and expense proofs to the agency                                                       Unique → Unique

  CSS-07        Source and last-synced label on every agency value                                                                   Unique → Unique

  CSS-08        Family-violence flag linked to Safety Mode                                                                           Unique → Unique

  CSS-09        Child support notice as an extra invite channel                                                                      Unique → Unique

  CSS-10        Unified child support timeline                                                                                       Unique → Unique

  CSS-11        Hearing packet export                                                                                                Unique → Unique

  CSS-12        Sync engine: one integration layer, one connector for each state, API calls, batch loads and monitoring (proposed)   --- → Proposed

  CSS-13        Share one agency item with the co-parent or a professional (proposed)                                                --- → Proposed
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**        **Screens**
  ------------------ -------------------- -----------------------------------------------------------------------------------------------------
  CSS-SUB-01         Case linking         Link-case entry; identity/consent; link status; unlink

  CSS-SUB-02         Agency data          Case overview; order amount; payment history; arrears/balance; due dates; source/last-synced labels

  CSS-SUB-03         Comparison           Agency vs app payments; mismatch list; mismatch detail

  CSS-SUB-04         Agency calendar      Hearings; deadlines; required documents

  CSS-SUB-05         Proof submission     Submit proof; submission status; agency response

  CSS-SUB-06         Safety integration   Family-violence flag offer

  CSS-SUB-07         Agency invite        Agency-notice invite channel

  CSS-SUB-08         Timeline             Unified child-support timeline

  CSS-SUB-09         Hearing packet       Hearing-packet export
  ---------------------------------------------------------------------------------------------------------------------------------------------

9.5 Screen inventory

  -------------------------------------------------------------------------------------------------------------------------
  **Screen ID**   **Screen**                                                                       **Feature**
  --------------- -------------------------------------------------------------------------------- ------------------------
  CSS-SCR-01      Link a case (state, details, one-time code)                                      CSS-01

  CSS-SCR-02      Consent                                                                          CSS-01

  CSS-SCR-03      Child support overview (status, order, arrears, balance, next hearing, labels)   CSS-02, CSS-04, CSS-07

  CSS-SCR-04      Payments side by side, with flags                                                CSS-03

  CSS-SCR-05      Due dates and reminder times                                                     CSS-04

  CSS-SCR-06      Agency items in the calendar, with the required documents                        CSS-05

  CSS-SCR-07      Share an item                                                                    CSS-13

  CSS-SCR-08      Shared with you                                                                  CSS-13

  CSS-SCR-09      Unlink and export                                                                CSS-01

  CSS-SCR-10      Send proof to the agency                                                         CSS-06

  CSS-SCR-11      Proof package                                                                    CSS-06

  CSS-SCR-12      Offer of Safety Mode                                                             CSS-08

  CSS-SCR-13      Invite through agency notice                                                     CSS-09

  CSS-SCR-14      Timeline                                                                         CSS-10

  CSS-SCR-15      Hearing packet                                                                   CSS-11

  CSS-SCR-16      Load log for operations (no case values)                                         CSS-12
  -------------------------------------------------------------------------------------------------------------------------

9.6 Screen specifications

CSS-SCR-01 --- Link a case

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-01
  -------------------------------------------------------------------------

![Figure CSS-SCR-01 --- Link a case](media/1234187cc8032ce3327498f111d281260774ba5d.png "Figure CSS-SCR-01 — Link a case"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-01 --- Link a case*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-02 Consent
  ----------------------- --------------------------------------------------------
  **Where you go next**   CSS-SCR-02 Consent; Main menu: any module

  --------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Child Support Home\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Link status (P-CSS-001-01); Data freshness (P-CSS-001-06).

-   Input area (form fields, in specification order): Agency name (P-CSS-001-02); Case number (P-CSS-001-03); Privacy notice (P-CSS-001-07).

-   Action area (primary action first, then secondary actions and links): Link case (P-CSS-001-04); Open linked case (P-CSS-001-05).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**                            **Error**    **Visibility**   **Saved to**          **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------- ---------------------------------------------------------- ------------ ---------------- --------------------- -----------------------------------------
  P-CSS-001-01       Link status               Badge                System         No             Not linked    Not linked; Linked; Verification pending; Unlinked         Load error   Parent           CSSLink.status        Display only

  P-CSS-001-02       Agency name               Text                 System         No             Derived       Connected agency                                           ---          Linked parent    CSSLink.agency        Display only

  P-CSS-001-03       Case number               Masked text          System         No             Derived       Agency case reference                                      ---          Linked parent    CSSLink.case_number   Display only

  P-CSS-001-04       Link case                 Primary button       ---            ---            ---           ---                                                        ---          Parent           ---                   Opens CSS-SCR-01 Link a case

  P-CSS-001-05       Open linked case          Primary button       ---            ---            ---           Linked case only                                           ---          Parent           ---                   Opens CSS-SCR-03 Child support overview

  P-CSS-001-06       Data freshness            Timestamp            System         No             Last sync     UTC storage; local display                                 ---          Linked parent    last_synced_at        Display only

  P-CSS-001-07       Privacy notice            Informational text   ---            ---            ---           Agency data visible only to linking parent unless shared   ---          Parent           ---                   Display only
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- not linked; Loading --- status skeleton; Error --- agency/sync failure; Success --- link status and actions displayed.

Specification

**Component arrangement:**

-   Page header: screen title \"Link Case --- Identity\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Legal first name (P-CSS-002-01); Legal last name (P-CSS-002-02); Date of birth (P-CSS-002-03); Agency case number (P-CSS-002-04).

-   Action area (primary action first, then secondary actions and links): Continue (P-CSS-002-06); Cancel (P-CSS-002-07).

-   Controls that must NOT be provided: SSN (P-CSS-002-05).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**     **Allowed values / validation**   **Error**              **Visibility**   **Saved to**           **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- --------------- --------------------------------- ---------------------- ---------------- ---------------------- ------------------------------
  P-CSS-002-01       Legal first name          Text input         Yes            Yes            Account value   Match agency record               Inline field message   Parent           Verification request   Required

  P-CSS-002-02       Legal last name           Text input         Yes            Yes            Account value   Match agency record               Inline field message   Parent           Verification request   Required

  P-CSS-002-03       Date of birth             Date picker        Yes            Yes            Blank           Valid date; adult                 Inline field message   Parent           Verification request   Required

  P-CSS-002-04       Agency case number        Text input         Yes            Yes            Blank           Agency-format validation          Inline field message   Parent           Verification request   Required

  P-CSS-002-05       SSN                       Not collected      ---            ---            ---             Full SSN never stored             ---                    Parent           ---                    Privacy rule

  P-CSS-002-06       Continue                  Primary button     ---            ---            ---             ---                               Validation error       Parent           Verification request   Opens CSS-SCR-01 Link a case

  P-CSS-002-07       Cancel                    Secondary button   ---            ---            ---             ---                               ---                    Parent           ---                    Returns without linking
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- blank form; Loading --- submit disabled; Error --- identity mismatch/validation; Success --- verification step opens.

Specification

**Component arrangement:**

-   Page header: screen title \"Link Case --- Verification\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Verification method (P-CSS-003-01).

-   Input area (form fields, in specification order): One-time code (P-CSS-003-02).

-   Action area (primary action first, then secondary actions and links): Resend code (P-CSS-003-03); Verify (P-CSS-003-04); Cancel (P-CSS-003-05).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**         **Allowed values / validation**    **Error**                  **Visibility**   **Saved to**                **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------------- ---------------------------------- -------------------------- ---------------- --------------------------- --------------------------
  P-CSS-003-01       Verification method       Read-only / select   System         Yes            Agency-determined   Case-detail match; one-time code   Inline field message       Parent           Verification request        Determined by agency

  P-CSS-003-02       One-time code             OTP input            Conditional    Yes            Blank               Agency code; expiry applies        ERR invalid/expired code   Parent           Verification record         Required for code method

  P-CSS-003-03       Resend code               Button               Conditional    ---            ---                 Rate-limited                       Inline field message       Parent           Verification request        Sends new code

  P-CSS-003-04       Verify                    Primary button       ---            ---            ---                 ---                                Verification failure       Parent           CSSLink.status = Verified   Confirms identity

  P-CSS-003-05       Cancel                    Secondary button     ---            ---            ---                 ---                                ---                        Parent           ---                         Abandons link
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- verification prompt; Loading --- verifying; Error --- invalid/expired code; Success --- opens consent screen.

CSS-SCR-02 --- Consent

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-01
  -------------------------------------------------------------------------

![Figure CSS-SCR-02 --- Consent](media/cc0102ba70710f3d98036feeb3ad1f239c66f173.png "Figure CSS-SCR-02 — Consent"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-02 --- Consent*

**Navigation**

  ----------------------------------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-01 Link a case
  ----------------------- ----------------------------------------------------------------------------------
  **Where you go next**   CSS-SCR-01 Link a case; CSS-SCR-03 Child support overview; Main menu: any module

  ----------------------------------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Link Case --- Consent\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Consent text (P-CSS-004-01); Consent timestamp (P-CSS-004-04).

-   Input area (form fields, in specification order): Consent version (P-CSS-004-02); I agree (P-CSS-004-03).

-   Action area (primary action first, then secondary actions and links): Link case (P-CSS-004-05); Cancel (P-CSS-004-06).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**       **Allowed values / validation**   **Error**          **Visibility**   **Saved to**              **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- ----------------- --------------------------------- ------------------ ---------------- ------------------------- ---------------
  P-CSS-004-01       Consent text              Read-only panel    Yes            No             Current version   Approved consent wording          ---                Parent           Consent version           Display only

  P-CSS-004-02       Consent version           Text               System         No             Current version   Version ID                        ---                Parent           consent_version           Display only

  P-CSS-004-03       I agree                   Checkbox           Yes            Yes            Unchecked         Required                          Consent required   Parent           Consent record            Enables link

  P-CSS-004-04       Consent timestamp         Timestamp          System         No             Consent time      UTC storage; local display        ---                Parent           Consent record            Display only

  P-CSS-004-05       Link case                 Primary button     ---            ---            ---               Consent required                  ---                Parent           CSSLink.status = Linked   Creates link

  P-CSS-004-06       Cancel                    Secondary button   ---            ---            ---               ---                               ---                Parent           ---                       Does not link
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- consent displayed; Loading --- linking; Error --- consent/link failure; Success --- case linked.

CSS-SCR-03 --- Child support overview

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-02, CSS-04, CSS-07
  -------------------------------------------------------------------------

![Figure CSS-SCR-03 --- Child support overview](media/13720b02ba26cb4d529260ff34d9776cb3324f94.png "Figure CSS-SCR-03 — Child support overview"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-03 --- Child support overview*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Child support; CSS-SCR-02 Consent; CSS-SCR-04 Payments side by side; CSS-SCR-05 Due dates and reminders; CSS-SCR-07 Share an item; CSS-SCR-08 Shared with you; CSS-SCR-09 Unlink and export; CSS-SCR-13 Invite through agency notice; CSS-SCR-14 Timeline
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   CSS-SCR-04 Payments side by side; CSS-SCR-05 Due dates and reminders; CSS-SCR-06 Agency items in the calendar; CSS-SCR-07 Share an item; CSS-SCR-08 Shared with you; CSS-SCR-09 Unlink and export; CSS-SCR-10 Send proof to the agency; CSS-SCR-13 Invite through agency notice; CSS-SCR-14 Timeline; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Linked Case Overview\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Balance (P-CSS-005-02); Next hearing (P-CSS-005-03); Next deadline (P-CSS-005-04); Last synced (P-CSS-005-05).

-   Input area (form fields, in specification order): Case number (P-CSS-005-01).

-   Action area (primary action first, then secondary actions and links): View payments (P-CSS-005-06); View hearings (P-CSS-005-07); Compare payments (P-CSS-005-08); Unlink (P-CSS-005-09).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**            **Allowed values / validation**   **Error**    **Visibility**   **Saved to**          **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ---------------------- --------------------------------- ------------ ---------------- --------------------- -----------------------------------------------
  P-CSS-005-01       Case number               Masked text          System         No             Agency value           Agency case reference             Load error   Linked parent    CSSLink.case_number   Display only

  P-CSS-005-02       Balance                   Currency             System         No             Agency value           Read-only agency data             Sync error   Linked parent    Agency balance        Display only

  P-CSS-005-03       Next hearing              Date / timestamp     System         No             Agency value           Future or past agency hearing     ---          Linked parent    Agency hearing        Display only

  P-CSS-005-04       Next deadline             Date / timestamp     System         No             Agency value           Agency deadline                   ---          Linked parent    Agency deadline       Display only

  P-CSS-005-05       Last synced               Timestamp            System         No             Last successful sync   UTC storage; local display        ---          Linked parent    last_synced_at        Display only

  P-CSS-005-06       View payments             Button               ---            ---            ---                    ---                               ---          Linked parent    ---                   Opens CSS-SCR-03 Child support overview

  P-CSS-005-07       View hearings             Button               ---            ---            ---                    ---                               ---          Linked parent    ---                   Opens CSS-SCR-06 Agency items in the calendar

  P-CSS-005-08       Compare payments          Button               ---            ---            ---                    ---                               ---          Linked parent    ---                   Opens CSS-SCR-04 Payments side by side

  P-CSS-005-09       Unlink                    Destructive button   ---            ---            ---                    Confirmation required             ---          Linked parent    ---                   Opens CSS-SCR-09 Unlink and export
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- not applicable; Loading --- agency data skeleton; Error --- sync/API failure; Success --- agency facts displayed.

Specification

**Component arrangement:**

-   Page header: screen title \"Agency Balance and Payments\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Current balance (P-CSS-006-01); Arrears (P-CSS-006-02); Payment date (P-CSS-006-04); Amount (P-CSS-006-05); Payment status (P-CSS-006-06); Data as of (P-CSS-006-07).

-   Action area (primary action first, then secondary actions and links): Payment history (P-CSS-006-03).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**    **Required**   **Editable**   **Default**    **Allowed values / validation**   **Error**               **Visibility**   **Saved to**     **Behavior**
  ------------------ ------------------------- ----------- -------------- -------------- -------------- --------------------------------- ----------------------- ---------------- ---------------- -------------------
  P-CSS-006-01       Current balance           Currency    System         No             Agency value   Read-only                         Sync error              Linked parent    Agency balance   Display only

  P-CSS-006-02       Arrears                   Currency    System         No             Agency value   Read-only                         Sync error              Linked parent    Agency arrears   Display only

  P-CSS-006-03       Payment history           Table       ---            ---            ---            Agency payment records            Load error with retry   Linked parent    Agency payment   Displays payments

  P-CSS-006-04       Payment date              Timestamp   System         No             Agency value   UTC storage; local display        ---                     Linked parent    Agency payment   Display only

  P-CSS-006-05       Amount                    Currency    System         No             Agency value   Payment amount                    ---                     Linked parent    Agency payment   Display only

  P-CSS-006-06       Payment status            Badge       System         No             Agency value   Status values from the agency     ---                     Linked parent    Agency payment   Display only

  P-CSS-006-07       Data as of                Timestamp   System         No             Last sync      UTC storage; local display        ---                     Linked parent    last_synced_at   Display only
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- no agency payments; Loading --- table skeleton; Error --- sync failure; Success --- agency payments displayed.

Specification

**Component arrangement:**

-   Page header: screen title \"Sync Status / Data Freshness\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Sync status (P-CSS-009-01); Last successful sync (P-CSS-009-02); Next scheduled sync (P-CSS-009-03); Sync failure notice (P-CSS-009-04).

-   Action area (primary action first, then secondary actions and links): Refresh (P-CSS-009-05).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**        **Required**   **Editable**   **Default**    **Allowed values / validation**   **Error**              **Visibility**   **Saved to**     **Behavior**
  ------------------ ------------------------- --------------- -------------- -------------- -------------- --------------------------------- ---------------------- ---------------- ---------------- ------------------
  P-CSS-009-01       Sync status               Badge           System         No             Derived        Current; Delayed; Failed          ---                    Linked parent    Sync record      Display only

  P-CSS-009-02       Last successful sync      Timestamp       System         No             Last success   UTC storage; local display        ---                    Linked parent    last_synced_at   Display only

  P-CSS-009-03       Next scheduled sync       Timestamp       System         No             Schedule       UTC storage; local display        ---                    Linked parent    Sync schedule    Display only

  P-CSS-009-04       Sync failure notice       Warning panel   System         No             Derived        Explains delayed/failed load      ---                    Linked parent    Sync record      Display only

  P-CSS-009-05       Refresh                   Button          ---            ---            ---            Rate-limited                      Inline field message   Linked parent    Sync request     Requests refresh
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- not applicable; Loading --- refresh pending; Error --- sync failure; Success --- status refreshed.

CSS-SCR-04 --- Payments side by side

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-03
  -------------------------------------------------------------------------

![Figure CSS-SCR-04 --- Payments side by side](media/d246a6b7efe0f2f0f0f0ec3a3f46111c8bf3f10a.png "Figure CSS-SCR-04 — Payments side by side"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-04 --- Payments side by side*

**Navigation**

  ----------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-03 Child support overview
  ----------------------- ----------------------------------------------------------
  **Where you go next**   CSS-SCR-03 Child support overview; Main menu: any module

  ----------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Payment Comparison\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Match status (P-CSS-008-03); Difference (P-CSS-008-04).

-   Input area (form fields, in specification order): Explanation (P-CSS-008-05).

-   Action area (primary action first, then secondary actions and links): Agency payments (P-CSS-008-01); Parent-recorded payments (P-CSS-008-02); Export comparison (P-CSS-008-06).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**    **Type**   **Required**   **Editable**   **Default**   **Allowed values / validation**   **Error**      **Visibility**   **Saved to**        **Behavior**
  ------------------ -------------------------- ---------- -------------- -------------- ------------- --------------------------------- -------------- ---------------- ------------------- ----------------------
  P-CSS-008-01       Agency payments            Table      ---            ---            ---           Read-only agency data             Load error     Linked parent    Agency payment      Displays agency side

  P-CSS-008-02       Parent-recorded payments   Table      ---            ---            ---           Expenses module data              Load error     Linked parent    Parent payment      Displays parent side

  P-CSS-008-03       Match status               Badge      System         No             Calculated    Matched; Mismatch; Unmatched      ---            Linked parent    Comparison result   Display only

  P-CSS-008-04       Difference                 Currency   System         No             Calculated    Agency vs parent amount           ---            Linked parent    Comparison result   Display only

  P-CSS-008-05       Explanation                Text       System         No             Derived       Why rows differ                   ---            Linked parent    Comparison result   Display only

  P-CSS-008-06       Export comparison          Button     ---            ---            ---           ---                               Export error   Linked parent    Export record       Exports comparison
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- no comparable payments; Loading --- comparison skeleton; Error --- data failure; Success --- comparison displayed.

CSS-SCR-05 --- Due dates and reminders

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-04
  -------------------------------------------------------------------------

![Figure CSS-SCR-05 --- Due dates and reminders](media/e2a1079c5f81cb5b7a61d4e9f206508a7168be48.png "Figure CSS-SCR-05 — Due dates and reminders"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-05 --- Due dates and reminders*

**Navigation**

  ----------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-03 Child support overview
  ----------------------- ----------------------------------------------------------
  **Where you go next**   CSS-SCR-03 Child support overview; Main menu: any module

  ----------------------------------------------------------------------------------

The screen components are shown in the figure above.

CSS-SCR-06 --- Agency items in the calendar

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-05
  -------------------------------------------------------------------------

![Figure CSS-SCR-06 --- Agency items in the calendar](media/468f76e01ef7b0ef3dbdafcc408fec9c5a56200b.png "Figure CSS-SCR-06 — Agency items in the calendar"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-06 --- Agency items in the calendar*

**Navigation**

  ----------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-19 Home; CAL-SCR-01 Calendar (week view); CSS-SCR-03 Child support overview; CSS-SCR-15 Hearing packet
  ----------------------- ----------------------------------------------------------------------------------------------------------------
  **Where you go next**   CSS-SCR-15 Hearing packet; Main menu: any module

  ----------------------------------------------------------------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Agency Hearings and Deadlines\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Hearing date (P-CSS-007-02).

-   Input area (form fields, in specification order): Hearing type (P-CSS-007-03); Location (P-CSS-007-04).

-   Action area (primary action first, then secondary actions and links): Hearing list (P-CSS-007-01); Deadline list (P-CSS-007-05); Add hearing to calendar (P-CSS-007-06); Set reminder (P-CSS-007-07).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**    **Allowed values / validation**   **Error**               **Visibility**   **Saved to**      **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- -------------- --------------------------------- ----------------------- ---------------- ----------------- ------------------------
  P-CSS-007-01       Hearing list              Table / list       ---            ---            ---            Agency hearings                   Load error with retry   Linked parent    Agency hearing    Displays hearings

  P-CSS-007-02       Hearing date              Date / timestamp   System         No             Agency value   UTC storage; local display        ---                     Linked parent    Agency hearing    Display only

  P-CSS-007-03       Hearing type              Text               System         No             Agency value   Values from the agency            ---                     Linked parent    Agency hearing    Display only

  P-CSS-007-04       Location                  Text               System         No             Agency value   Hearing location                  ---                     Linked parent    Agency hearing    Display only

  P-CSS-007-05       Deadline list             Table / list       ---            ---            ---            Agency deadlines                  Load error              Linked parent    Agency deadline   Displays deadlines

  P-CSS-007-06       Add hearing to calendar   Row action         ---            ---            ---            ---                               Calendar error          Linked parent    Calendar event    Creates calendar entry

  P-CSS-007-07       Set reminder              Row action         ---            ---            ---            ---                               Notification error      Linked parent    Reminder          Creates reminder
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- no hearings/deadlines; Loading --- list skeleton; Error --- sync failure; Success --- hearings and deadlines displayed.

CSS-SCR-07 --- Share an item

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-13
  -------------------------------------------------------------------------

![Figure CSS-SCR-07 --- Share an item](media/137d6614b9ceb77a83893702259bafb967bd6f21.png "Figure CSS-SCR-07 — Share an item"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-07 --- Share an item*

**Navigation**

  ----------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-03 Child support overview
  ----------------------- ----------------------------------------------------------
  **Where you go next**   CSS-SCR-03 Child support overview; Main menu: any module

  ----------------------------------------------------------------------------------

The screen components are shown in the figure above.

CSS-SCR-08 --- Shared with you

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-08
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-13
  -------------------------------------------------------------------------

![Figure CSS-SCR-08 --- Shared with you](media/03b484117c657d14c09b8eab9c6bedc33ef39e12.png "Figure CSS-SCR-08 — Shared with you"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-08 --- Shared with you*

**Navigation**

  ----------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-03 Child support overview
  ----------------------- ----------------------------------------------------------
  **Where you go next**   CSS-SCR-03 Child support overview; Main menu: any module

  ----------------------------------------------------------------------------------

The screen components are shown in the figure above.

CSS-SCR-09 --- Unlink and export

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-09
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-01
  -------------------------------------------------------------------------

![Figure CSS-SCR-09 --- Unlink and export](media/c456190f01118e2ae27ebec739a8f6d0c6aa29db.png "Figure CSS-SCR-09 — Unlink and export"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure CSS-SCR-09 --- Unlink and export*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-03 Child support overview
  ----------------------- --------------------------------------------------------
  **Where you go next**   CSS-SCR-03 Child support overview

  --------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Unlink Confirmation\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Unlink explanation (P-CSS-010-01); Audit record (P-CSS-010-04).

-   Action area (primary action first, then secondary actions and links): Confirm unlink (P-CSS-010-02); Keep link (P-CSS-010-03).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**              **Required**   **Editable**   **Default**   **Allowed values / validation**     **Error**   **Visibility**   **Saved to**                **Behavior**
  ------------------ ------------------------- --------------------- -------------- -------------- ------------- ----------------------------------- ----------- ---------------- --------------------------- ---------------------------
  P-CSS-010-01       Unlink explanation        Informational panel   ---            ---            ---           Explains loss of agency data view   ---         Linked parent    ---                         Display only

  P-CSS-010-02       Confirm unlink            Destructive button    Yes            ---            ---           Confirmation required               ---         Linked parent    CSSLink.status = Unlinked   Removes link

  P-CSS-010-03       Keep link                 Secondary button      ---            ---            ---           ---                                 ---         Linked parent    ---                         Returns without unlinking

  P-CSS-010-04       Audit record              System                System         No             Generated     Actor, UTC time, result             ---         Internal         Audit log                   Created on unlink
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- not applicable; Loading --- confirm disabled; Error --- unlink failure; Success --- link removed.

CSS-SCR-10 --- Send proof to the agency

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-10
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-06
  -------------------------------------------------------------------------

![Figure CSS-SCR-10 --- Send proof to the agency](media/8fb478bc651ac93775c24536ce59c8dfc3741f6d.png "Figure CSS-SCR-10 — Send proof to the agency"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-10 --- Send proof to the agency*

**Navigation**

  -------------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-03 Child support overview; CSS-SCR-11 Proof package
  ----------------------- -------------------------------------------------------------
  **Where you go next**   CSS-SCR-11 Proof package; Main menu: any module

  -------------------------------------------------------------------------------------

The screen components are shown in the figure above.

CSS-SCR-11 --- Proof package

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-11
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-06
  -------------------------------------------------------------------------

![Figure CSS-SCR-11 --- Proof package](media/085da2914b8e9b4ac7517631398e57b21f4e99cb.png "Figure CSS-SCR-11 — Proof package"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-11 --- Proof package*

**Navigation**

  ------------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-10 Send proof to the agency
  ----------------------- ------------------------------------------------------------
  **Where you go next**   CSS-SCR-10 Send proof to the agency; Main menu: any module

  ------------------------------------------------------------------------------------

The screen components are shown in the figure above.

CSS-SCR-12 --- Offer of Safety Mode

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-12
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-08
  -------------------------------------------------------------------------

![Figure CSS-SCR-12 --- Offer of Safety Mode](media/c5f8cd1a0b8fa57d354cd5e706465c39d0b17e2a.png "Figure CSS-SCR-12 — Offer of Safety Mode"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure CSS-SCR-12 --- Offer of Safety Mode*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    System: the agency marks a family violence flag
  ----------------------- --------------------------------------------------------
  **Where you go next**   SAF-SCR-02 Safety notice and confirm

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

CSS-SCR-13 --- Invite through agency notice

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-13
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-09
  -------------------------------------------------------------------------

![Figure CSS-SCR-13 --- Invite through agency notice](media/e621f3a1b44dd6e291e85d460d4229d12a14592d.png "Figure CSS-SCR-13 — Invite through agency notice"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-13 --- Invite through agency notice*

**Navigation**

  ----------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-03 Child support overview
  ----------------------- ----------------------------------------------------------
  **Where you go next**   CSS-SCR-03 Child support overview; Main menu: any module

  ----------------------------------------------------------------------------------

The screen components are shown in the figure above.

CSS-SCR-14 --- Timeline

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-14
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-10
  -------------------------------------------------------------------------

![Figure CSS-SCR-14 --- Timeline](media/dff79e7ce670c33fc48d19b95e1bb069cef07260.png "Figure CSS-SCR-14 — Timeline"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-14 --- Timeline*

**Navigation**

  ----------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-03 Child support overview
  ----------------------- ----------------------------------------------------------
  **Where you go next**   CSS-SCR-03 Child support overview; Main menu: any module

  ----------------------------------------------------------------------------------

The screen components are shown in the figure above.

CSS-SCR-15 --- Hearing packet

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-15
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-11
  -------------------------------------------------------------------------

![Figure CSS-SCR-15 --- Hearing packet](media/9f63bacfabe98f4ddc7578f05c5ae61ec1ba7db0.png "Figure CSS-SCR-15 — Hearing packet"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-15 --- Hearing packet*

**Navigation**

  ----------------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-06 Agency items in the calendar
  ----------------------- ----------------------------------------------------------------
  **Where you go next**   CSS-SCR-06 Agency items in the calendar; Main menu: any module

  ----------------------------------------------------------------------------------------

The screen components are shown in the figure above.

CSS-SCR-16 --- Load log for operations

  -------------------------------------------------------------------------
  **Screen ID**    CSS-SCR-16
  ---------------- --------------------------------------------------------
  **Module**       Child Support Sync

  **Feature(s)**   CSS-12
  -------------------------------------------------------------------------

![Figure CSS-SCR-16 --- Load log for operations](media/d8c765077eaad0ee332493a6cc8e7cb4ae23b7a7.png "Figure CSS-SCR-16 — Load log for operations"){width="6.666666666666667in" height="5.0in"}

*Figure CSS-SCR-16 --- Load log for operations*

**Navigation**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    REC-SCR-09 Staff review of affidavits; SUP-SCR-14 Support measures report; Operations staff sign in to the operations workspace
  ----------------------- ---------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   REC-SCR-09 Staff review of affidavits; SUP-SCR-14 Support measures report

  ---------------------------------------------------------------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

9.7 Field-level specifications

9.8 User actions and procedures

9.9 Business rules and validations

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**       **Rule**                                                                                                                                       **Features**
  ------------ ---------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------
  BR-17        A difference between the agency record and a parent-recorded payment is flagged, never changed automatically.                                  CSS-03, CSS-12

  BR-19        Nothing is sent to the agency without the confirmation of the parent, and only where the agency allows it.                                     CSS-06

  BR-23        Where the agency allows it, a family violence flag on the case can offer Safety Mode to the parent.                                            CSS-08

  BR-27        Batch data is loaded only for cases a parent has linked. Records for any other case are discarded and not stored.                              CSS-02, CSS-12

  BR-28        If an API call or batch load fails, the app keeps the last good data and marks it as out of date. It never shows a blank or a guessed value.   CSS-02, CSS-07, CSS-08, CSS-12

  BR-29        Every batch file is checked before it is loaded. A file that fails the check is held back and reported to support staff.                       CSS-12

  BR-30        Where a state offers both channels and they give different values, the newer agency value is shown and both are logged.                        CSS-07, CSS-12
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- --------------------------------------------------------------------------------------------------------------------------------------------
  BR-05      Data export, tone, safety and reporting tools are available to every user.

  BR-13      Original event details are kept. An event that has already started cannot be deleted.

  BR-16      Agency values are read-only in the app. Each one shows its source (API or batch) and the time it was last updated.

  BR-17      A difference between the agency record and a parent-recorded payment is flagged, never changed automatically.

  BR-18      Linking a case needs an identity check and recorded consent. The parent can unlink.

  BR-19      Nothing is sent to the agency without the parent\'s confirmation, and only where the agency allows it.

  BR-20      Every certified export carries a record ID that anyone can check on a public verification page.

  BR-21      Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.

  BR-23      Where the agency allows it, a family violence flag on the case can offer Safety Mode to the parent.

  BR-27      Batch data is loaded only for cases a parent has linked. Records for any other case are discarded and not stored.

  BR-28      If an API call or batch load fails, the app keeps the last good data and marks it as out of date. It never shows a blank or guessed value.

  BR-29      Every batch file is checked before it is loaded. A file that fails the check is held back and reported to support staff.

  BR-30      Where a state offers both channels and they give different values, the newer agency value is shown and both are logged.
  -------------------------------------------------------------------------------------------------------------------------------------------------------

9.10 Messages and errors

Errors

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **When it shows**                        **Text**                                                                                           **Used by**
  ---------- ---------------------------------------- -------------------------------------------------------------------------------------------------- --------------
  ERR-01     The agency answers no match              We could not match these details with your case. Check them and try again.                         FR-CSS-01-13

  ERR-02     There were 5 failed matches in one day   Too many tries. You can try again in 24 hours.                                                     FR-CSS-01-13

  ERR-03     The agency is not available              The agency system is not available now. Please try again later.                                    FR-CSS-01-14

  ERR-04     A parent tries to link a second case     You can link one case for now.                                                                     FR-CSS-01-09

  ERR-05     A send to the agency fails               We could not send this to the agency. It was not sent. You can try again or use a proof package.   FR-CSS-06-10

  ERR-06     An invite code is not valid              This invite code is not valid. Ask for a new one.                                                  FR-CSS-09-09

  ERR-07     A hearing packet cannot be created       We could not create the packet. Please try again.                                                  FR-CSS-11-09

  ERR-08     An item cannot be shared                 We could not share this item. Nothing was shared. Please try again.                                FR-CSS-13-11
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **When it shows**                 **Text**                                                                                                                                                                                                                                                                                **Feature**
  ----------- --------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------
  MSGT-01     The consent screen opens          ParentPath will read your child support case from \[agency name\]: the case status, the order amount, the payments, the arrears, the balance, the due dates and the hearings. It updates about once a day. Only you can see it unless you share one item. You can unlink at any time.   CSS-01

  MSGT-02     Next to the payment comparison    The agency decides what counts.                                                                                                                                                                                                                                                         CSS-03

  MSGT-03     Data is more than 2 days old      This information is more than 2 days old. It may have changed.                                                                                                                                                                                                                          CSS-04, CSS-07

  MSGT-04     The agency gives no value         Not provided by the agency.                                                                                                                                                                                                                                                             CSS-02, CSS-04

  MSGT-05     A load or a call failed           Out of date. The last update did not work. These are the last good figures from \[time\].                                                                                                                                                                                               CSS-07

  MSGT-06     Safety Mode is offered            Safety Mode can hide your address and location. Do you want to turn it on?                                                                                                                                                                                                              CSS-08

  MSGT-07     The timeline is empty             There is nothing to show yet.                                                                                                                                                                                                                                                           CSS-10

  MSGT-08     An item is shared with a person   \[name\] shared an item with you.                                                                                                                                                                                                                                                       CSS-13

  MSGT-09     A parent chooses to unlink        If you unlink, we stop reading your case and we remove the data after 30 days. You can export it first.                                                                                                                                                                                 CSS-01

  MSGT-10     A proof package opens             The agency decides what counts. For the official record, ask the agency for your pay history.                                                                                                                                                                                           CSS-06
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

9.11 Dependencies

  --------------------------------------------------------------------------------------------
  **Module**                    **What it needs from Child Support Sync**
  ----------------------------- --------------------------------------------------------------
  Accounts and Onboarding       The agency invite channel and the strength of the sign-in

  Notifications                 The dates of hearings, deadlines and due dates for reminders

  Calendar and Parenting Time   The hearings and deadlines that appear in the calendar

  Records and Court             The hearing packet and the proof package

  Safety and Privacy            The family violence flag that offers Safety Mode
  --------------------------------------------------------------------------------------------

12.3 Assumptions

9.12 End-to-end workflows and scenarios

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                                                                                                   **Module path**             **Features / rules**
  -------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------- ------------------------------------
  WF-11          Record child-support payment (private); later compared with agency record                                                                                                         EXP → CSS                   EXP-07, CSS-03, BR-17

  WF-20          Link a child-support case (state, details, one-time code, consent) → API/batch load → overview, comparison, hearings in calendar, reminders → share an item → unlink and export   CSS → ACC/EXP/CAL/NTF/REC   CSS-01--05, CSS-07, CSS-12, CSS-13

  WF-21          send proof to agency, family-violence flag offers Safety Mode, agency notice invite, unified timeline                                                                             CSS → SAF/ACC               CSS-06, CSS-08--10
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
