# Expenses and Payments (EXP)


8.1 Module overview

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Purpose                 Tracks what each parent spends on the children and who owes what. It also holds the parent-recorded child support payments that the sync module compares with the agency record.

  Users                   Parent, co-parent

  Pain points addressed   P07, P20, P21

  Features                15 (5 Must-have, 9 Good-to-have, 1 Unique)

  Depends on              Child Support Sync (comparison with agency payments), Records and Court (exports), payment provider (open).
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   A shared expense log with receipt attachment or scanning, categories, and tracking by child.

-   Reimbursement requests that show the deadline and the proof needed.

-   Recording of child support payments made by the parent.

-   Split rules taken from the court order (for example 60/40), applied to every shared expense. This is one of the new features and comes from pain point P21, which still needs validation.

Purpose and scope

2.1 Purpose. This module tracks what each parent spends on the children and who owes what. It also holds the child support payments that a parent records, which the Child Support Sync module compares with the agency record.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **How this module supports it**
  --------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------
  OBJ-01          Expenses, receipts, reimbursement requests and recorded payments, with their history, are part of the court-ready record (EXP-01, EXP-02, EXP-03, EXP-07).

  OBJ-02          The parent-recorded child support payment is the base for the comparison with the agency record. (EXP-07).

  OBJ-03          Fixes the High-rated pain point P20 (EXP-07). Also addresses the Medium-rated P21 and P07 (EXP-03, EXP-04, EXP-05, EXP-08).
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.3 In scope. The fifteen features EXP-01 to EXP-15 listed in section 5.

8.2 Roles and permissions

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**                **What they do in this module**
  ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parent                  Records expenses, attaches receipts, shares items with the co-parent, sends and marks reimbursement requests, and records child support payments. Enters split rules, sees the running balance and opens disputes. Pays through the payment partner.

  Co-parent               The same as the Parent, once linked. Answers reimbursement requests.

  Professional            Reads the expenses and payment records that a parent shares. Cannot post. Access comes with PRO-01.

  Support staff           No feature in this module.2 gives them no access to expenses.

  Third party and Child   No feature in this module.2 gives a Third party no access to expenses.

  Agency staff            Not users of the app.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

8.3 Business requirements

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Business requirement**                                                                                                                               **Features**
  --------------- ------------------------------------------------------------------------------------------------------------------------------------------------------ ---------------
  BREQ-01         A parent can record what they spend on the children in a shared expense log.                                                                           EXP-01

  BREQ-02         A parent can attach a receipt to an expense, by choosing a file or by taking a photo.                                                                  EXP-02

  BREQ-03         A parent can ask the co-parent to pay back a share of an expense. The request shows the deadline and the proof needed, and the co-parent answers it.   EXP-03

  BREQ-04         Both parents can see a running balance of who owes what.                                                                                               EXP-04

  BREQ-05         A parent can enter the split rules from the court order, and the app applies them to every shared expense.                                             EXP-05

  BREQ-06         A parent can sort expenses by category and by child.                                                                                                   EXP-06

  BREQ-07         A parent can record the child support payments they make, so that the record can be compared with the agency record.                                   EXP-07

  BREQ-08         A parent can send money inside the app and see the status of the payment from start to end.                                                            EXP-08

  BREQ-09         A parent can dispute an expense, and the dispute stays in the record.                                                                                  EXP-09

  BREQ-10         A parent can schedule a payment and repeat it.                                                                                                         EXP-10

  BREQ-11         A parent can get help from an AI assistant to fill in an expense.                                                                                      EXP-11

  BREQ-12         A parent can pay a bill straight to the merchant.                                                                                                      EXP-12

  BREQ-13         A parent can pay an expense by credit card.                                                                                                            EXP-13

  BREQ-14         A parent can choose to have payments reported for credit building.                                                                                     EXP-14

  BREQ-15         A parent can import past expenses.                                                                                                                     EXP-15
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

8.4 Features

  ---------------------------------------------------------------------------------------------------------------
  **Feature**   **Name**                                                            **Type**
  ------------- ------------------------------------------------------------------- -----------------------------
  EXP-01        Shared expense log                                                  Must-have → Must-have

  EXP-02        Receipt attachment and scanning                                     Must-have → Must-have

  EXP-03        Reimbursement requests with deadlines and required proof            Must-have → Must-have

  EXP-04        Running balance of who owes what                                    Good-to-have → Good-to-have

  EXP-05        Split rules from the court order, applied to every shared expense   Unique → Unique

  EXP-06        Expense categories and per-child tracking                           Must-have → Must-have

  EXP-07        Record child support payments                                       Must-have → Must-have

  EXP-08        In-app money transfer with payment status from start to end         Good-to-have → Good-to-have

  EXP-09        Expense disputes                                                    Good-to-have → Good-to-have

  EXP-10        Scheduled and recurring payments                                    Good-to-have → Good-to-have

  EXP-11        AI-assisted expense entry                                           Good-to-have → Good-to-have

  EXP-12        Bill pay direct to merchant                                         Good-to-have → Good-to-have

  EXP-13        Pay expenses by credit card                                         Good-to-have → Good-to-have

  EXP-14        Payments reported for credit building (opt-in)                      Good-to-have → Good-to-have

  EXP-15        Import past expenses                                                Good-to-have → Good-to-have
  ---------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**             **Screens**
  ------------------ ------------------------- --------------------------------------------------------------------------------------
  EXP-SUB-01         Expense log               Expense list; expense detail; add/edit expense; version history; void expense

  EXP-SUB-02         Receipts                  Attach receipt; camera capture; file viewer; storage-limit error

  EXP-SUB-03         Reimbursements            Create request; request detail; approve/decline/mark paid; deadline/proof validation

  EXP-SUB-04         Categories and children   Category filter; child filter; per-child view

  EXP-SUB-05         Child-support payments    Record payment; payment list/detail; private visibility

  EXP-SUB-06         Balance                   Running balance

  EXP-SUB-07         Court-order splits        Split-rule setup and application

  EXP-SUB-08         Disputes                  Dispute creation/status

  EXP-SUB-09         Payments                  Transfer, recurring, merchant bill pay, credit card, credit reporting, import
  -----------------------------------------------------------------------------------------------------------------------------------

8.5 Screen inventory

  -------------------------------------------------------------------------------------------
  **Screen ID**   **Screen**                                         **Feature**
  --------------- -------------------------------------------------- ------------------------
  EXP-SCR-01      Expense log, with filters and total                EXP-01, EXP-06

  EXP-SCR-02      Add or edit expense, with files and share          EXP-01, EXP-02, EXP-06

  EXP-SCR-03      Expense detail, with files and version history     EXP-01, EXP-02

  EXP-SCR-04      Reimbursement request form                         EXP-03

  EXP-SCR-05      Request detail: answer, confirm and mark as paid   EXP-03

  EXP-SCR-06      Request list and history                           EXP-03

  EXP-SCR-07      Record a child support payment                     EXP-07

  EXP-SCR-08      Child support payment list and detail              EXP-07

  EXP-SCR-09      Running balance                                    EXP-04

  EXP-SCR-10      Split rules                                        EXP-05

  EXP-SCR-11      Dispute                                            EXP-09

  EXP-SCR-12      Pay a request: confirm and payment status          EXP-08, EXP-13

  EXP-SCR-13      Scheduled and repeating payments                   EXP-10

  EXP-SCR-14      AI-assisted expense entry                          EXP-11

  EXP-SCR-15      Bills                                              EXP-12

  EXP-SCR-16      Credit building setting                            EXP-14

  EXP-SCR-17      Import past expenses                               EXP-15
  -------------------------------------------------------------------------------------------

8.6 Screen specifications

EXP-SCR-01 --- Expense log

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-01, EXP-06
  -------------------------------------------------------------------------

![Figure EXP-SCR-01 --- Expense log](media/52a8a178ff460a1bbec78a4ef9643dbf27a27d2c.png "Figure EXP-SCR-01 — Expense log"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-01 --- Expense log*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Expenses; EXP-SCR-02 Add or edit expense; EXP-SCR-03 Expense detail; EXP-SCR-06 Request list and history; EXP-SCR-08 Child support payments; EXP-SCR-09 Running balance; EXP-SCR-10 Split rules; EXP-SCR-15 Bills; EXP-SCR-17 Import past expenses
  ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   EXP-SCR-02 Add or edit expense; EXP-SCR-03 Expense detail; EXP-SCR-06 Request list and history; EXP-SCR-08 Child support payments; EXP-SCR-09 Running balance; EXP-SCR-10 Split rules; EXP-SCR-13 Scheduled payments; EXP-SCR-15 Bills; EXP-SCR-17 Import past expenses; Main menu: any module

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------------------------------------
  **Purpose**    Show expenses, support filtering by category and child, and display the Active total.
  -------------- ---------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Expense List\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Category (P-EXP-001-03); Amount (P-EXP-001-05); Status (P-EXP-001-06); Visibility (P-EXP-001-07); Total (P-EXP-001-08).

-   Input area (form fields, in specification order): Description (P-EXP-001-02); Expense date (P-EXP-001-04); Category filter (P-EXP-001-09); Child filter (P-EXP-001-10).

-   Action area (primary action first, then secondary actions and links): Expense list (P-EXP-001-01); Add expense (P-EXP-001-11); Record child support (P-EXP-001-12).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                **Required**   **Editable**   **Default**         **Allowed values / validation**                                        **Error**               **Visibility**       **Saved to**           **Behavior**
  ------------------ ------------------------- ----------------------- -------------- -------------- ------------------- ---------------------------------------------------------------------- ----------------------- -------------------- ---------------------- --------------------------------------------------------------------------------------
  P-EXP-001-01       Expense list              Table / list            ---            ---            ---                 Sorted newest expense date first                                       Load error with retry   Permission-based     ---                    Displays expenses

  P-EXP-001-02       Description               Text                    System         No             Derived             1--100 characters                                                      ---                     Permission-based     Expense.description    Opens detail on select

  P-EXP-001-03       Category                  Badge                   System         No             Derived             Medical; Dental; School; Childcare; Activities; Clothing; Pet; Other   ---                     Permission-based     Expense.category       Display only

  P-EXP-001-04       Expense date              Date                    System         No             Derived             Not future                                                             ---                     Permission-based     Expense.expense_date   Display only

  P-EXP-001-05       Amount                    Currency                System         No             Derived             USD; two decimals; \$ prefix                                           ---                     Permission-based     Expense.amount         Display only

  P-EXP-001-06       Status                    Badge                   System         No             Active              Active; Voided                                                         ---                     Permission-based     Expense.status         Display only

  P-EXP-001-07       Visibility                Badge                   System         No             Shared or Private   Shared; Private                                                        ---                     Permission-based     Expense.visibility     Display only

  P-EXP-001-08       Total                     Currency display        System         No             Calculated          Sum of Active expenses in filtered list                                ---                     Permission-based     Calculated             Excludes Voided expenses

  P-EXP-001-09       Category filter           Select / multi-select   No             Yes            All                 Medical; Dental; School; Childcare; Activities; Clothing; Pet; Other   ---                     Parent / Co-parent   View state             Filters list

  P-EXP-001-10       Child filter              Select / multi-select   No             Yes            All                 Household children                                                     ---                     Parent / Co-parent   View state             Filters list

  P-EXP-001-11       Add expense               Primary button          ---            ---            ---                 ---                                                                    ---                     Parent / Co-parent   ---                    Opens EXP-SCR-02 Add or edit expense

  P-EXP-001-12       Record child support      Button / tab            ---            ---            ---                 ---                                                                    ---                     Parent               ---                    Opens EXP-SCR-08 Child support payments or EXP-SCR-07 Record a child support payment
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- --------------------------------------------------
  Empty                     "No expenses yet"; Add expense action

  Loading                   Table skeleton

  Error                     Load failure and retry

  Success                   Filtered expense rows and Active total displayed
  ----------------------------------------------------------------------------

Specification

  ----------------------------------------------------------------------------------------
  **Purpose**    Filter expenses by category and child and recalculate the Active total.
  -------------- -------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Expense Filters\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Filtered total (P-EXP-011-06).

-   Input area (form fields, in specification order): Category filter (P-EXP-011-01); Child filter (P-EXP-011-02); Status filter (P-EXP-011-03).

-   Action area (primary action first, then secondary actions and links): Apply (P-EXP-011-04); Clear filters (P-EXP-011-05).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                **Required**   **Editable**   **Default**   **Allowed values / validation**                                        **Error**   **Visibility**       **Saved to**   **Behavior**
  ------------------ ------------------------- ----------------------- -------------- -------------- ------------- ---------------------------------------------------------------------- ----------- -------------------- -------------- --------------------------
  P-EXP-011-01       Category filter           Select / multi-select   No             Yes            All           Medical; Dental; School; Childcare; Activities; Clothing; Pet; Other   ---         Parent / Co-parent   View state     Filters list

  P-EXP-011-02       Child filter              Select / multi-select   No             Yes            All           Household children                                                     ---         Parent / Co-parent   View state     Filters list

  P-EXP-011-03       Status filter             Select                  No             Yes            Active        Active; Voided; All                                                    ---         Parent / Co-parent   View state     Filters list

  P-EXP-011-04       Apply                     Primary button          ---            ---            ---           ---                                                                    ---         Parent / Co-parent   View state     Applies filters

  P-EXP-011-05       Clear filters             Secondary button        ---            ---            ---           ---                                                                    ---         Parent / Co-parent   View state     Resets filters

  P-EXP-011-06       Filtered total            Currency display        System         No             Calculated    Sum of Active filtered expenses                                        ---         Parent / Co-parent   Calculated     Excludes Voided expenses
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ---------------------------------------------
  Empty                     No matching expenses; clear-filters action

  Loading                   Filter results skeleton

  Error                     Filter/load failure with retry

  Success                   Filtered list and total displayed
  -----------------------------------------------------------------------

EXP-SCR-02 --- Add or edit expense

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-01, EXP-02, EXP-06
  -------------------------------------------------------------------------

![Figure EXP-SCR-02 --- Add or edit expense](media/dbcdca69467ae0fc8cd0989f913baa976b4baf4c.png "Figure EXP-SCR-02 — Add or edit expense"){width="6.666666666666667in" height="5.583333333333333in"}

*Figure EXP-SCR-02 --- Add or edit expense*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-19 Home; EXP-SCR-01 Expense log; EXP-SCR-03 Expense detail; EXP-SCR-14 AI-assisted entry
  ----------------------- --------------------------------------------------------------------------------------------------------
  **Where you go next**   EXP-SCR-01 Expense log; EXP-SCR-03 Expense detail; EXP-SCR-14 AI-assisted entry; Main menu: any module

  --------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Create or edit an expense.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Add / Edit Expense\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Paid by (P-EXP-003-07).

-   Input area (form fields, in specification order): Description (P-EXP-003-01); Category (P-EXP-003-02); Expense date (P-EXP-003-03); Amount (P-EXP-003-04); Children (P-EXP-003-05); Note (P-EXP-003-06); Visibility (P-EXP-003-08); Character count (P-EXP-003-11).

-   Action area (primary action first, then secondary actions and links): Save (P-EXP-003-09); Cancel (P-EXP-003-10).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**          **Default**                                    **Allowed values / validation**                                        **Error**                       **Visibility**       **Saved to**              **Behavior**
  ------------------ ------------------------- ------------------ -------------- --------------------- ---------------------------------------------- ---------------------------------------------------------------------- ------------------------------- -------------------- ------------------------- --------------------------------
  P-EXP-003-01       Description               Text input         Yes            Yes                   Blank or current value                         1--100 characters                                                      ERR-03 empty; ERR-04 over 100   Parent / Co-parent   Expense.description       Required

  P-EXP-003-02       Category                  Select             Yes            Yes                   Blank or current value                         Medical; Dental; School; Childcare; Activities; Clothing; Pet; Other   ERR-03 if missing               Parent / Co-parent   Expense.category          Required

  P-EXP-003-03       Expense date              Date picker        Yes            Yes                   Today or current value                         Today or earlier                                                       ERR-02 future; ERR-03 missing   Parent / Co-parent   Expense.expense_date      Required

  P-EXP-003-04       Amount                    Currency input     Yes            Yes                   Blank or current value                         USD; \>0; ≤99,999.99; max two decimals                                 ERR-01                          Parent / Co-parent   Expense.amount            Required; displayed as \$45.50

  P-EXP-003-05       Children                  Multi-select       No             Yes                   None or current value                          Household children                                                     ---                             Parent / Co-parent   Expense.child_ids         Optional

  P-EXP-003-06       Note                      Textarea           No             Yes                   Blank or current value                         ≤500 characters                                                        ERR-18                          Parent / Co-parent   Expense.note              Optional

  P-EXP-003-07       Paid by                   Read-only text     System         No                    Current user on create; immutable thereafter   Creator                                                                ---                             Parent / Co-parent   Expense.paid_by_user_id   Display only

  P-EXP-003-08       Visibility                Toggle / radio     Yes            Private→Shared only   Shared in Linked; Private in Solo              Shared; Private                                                        ---                             Parent / Co-parent   Expense.visibility        Solo Mode forces Private

  P-EXP-003-09       Save                      Primary button     ---            ---                   ---                                            ---                                                                    ---                             Parent / Co-parent   Expense/version           Creates or updates expense

  P-EXP-003-10       Cancel                    Secondary button   ---            ---                   ---                                            ---                                                                    ---                             Parent / Co-parent   ---                       Discards changes

  P-EXP-003-11       Character count           Helper text        ---            ---                   Description and note counts                    Updates as user types                                                  ---                             Parent / Co-parent   ---                       Display only
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- -----------------------------------------------
  Empty                      Blank create form

  Loading                    Save disabled

  Error                      Field validation errors; save failure: ERR-05

  Success                    Expense saved; return to list/detail
  --------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Attach, view, and retain receipts for an expense.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Receipt Upload / View\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: File type (P-EXP-004-04); Added at (P-EXP-004-06); File preview (P-EXP-004-07).

-   Input area (form fields, in specification order): Choose file (P-EXP-004-01); File name (P-EXP-004-03); File size (P-EXP-004-05).

-   Action area (primary action first, then secondary actions and links): Take photo (P-EXP-004-02); Upload (P-EXP-004-08); Done (P-EXP-004-10).

-   Controls that must NOT be provided: Remove file (P-EXP-004-09).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**     **Allowed values / validation**                           **Error**                                                           **Visibility**          **Saved to**             **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- --------------- --------------------------------------------------------- ------------------------------------------------------------------- ----------------------- ------------------------ ---------------------------
  P-EXP-004-01       Choose file               File input           Conditional    Yes            None            JPG, PNG, PDF                                             ERR-08 wrong type                                                   Creator                 ExpenseFile              Opens file picker

  P-EXP-004-02       Take photo                Camera button        Conditional    Yes            None            Mobile browser camera capture; file-picker fallback       Inline field message                                                Creator on mobile web   ExpenseFile              Captures image

  P-EXP-004-03       File name                 Text                 System         No             Uploaded name   Display                                                   ---                                                                 Permission-based        ExpenseFile.file_name    Display only

  P-EXP-004-04       File type                 Badge                System         No             Derived         JPG; PNG; PDF                                             ---                                                                 Permission-based        ExpenseFile.file_type    Display only

  P-EXP-004-05       File size                 Text                 System         No             Derived         Counts toward 25 MB expense limit and household storage   ---                                                                 Permission-based        ExpenseFile.size_bytes   Display only

  P-EXP-004-06       Added at                  Timestamp            System         No             Upload time     UTC storage; local display                                ---                                                                 Permission-based        ExpenseFile.added_at     Display only

  P-EXP-004-07       File preview              Image / PDF viewer   System         No             Derived         JPG/PNG preview; PDF viewer                               Load error                                                          Permission-based        File storage             Display/download

  P-EXP-004-08       Upload                    Primary button       ---            ---            ---             Max 5 files and 25 MB total per expense                   ERR-09 limit; ERR-10 malware; ERR-11 storage; ERR-05 save failure   Creator                 Expense file/version     Attaches file

  P-EXP-004-09       Remove file               Not displayed        ---            ---            ---             No removal after attachment                               ---                                                                 No user                 ---                      File cannot be removed

  P-EXP-004-10       Done                      Secondary button     ---            ---            ---             ---                                                       ---                                                                 Creator                 ---                      Returns to expense detail
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -----------------------------------------------
  Empty                    No receipts; upload/camera actions

  Loading                  Upload progress; actions disabled

  Error                    Type, size, malware, storage, or save failure

  Success                  Receipt attached; new expense version created
  ------------------------------------------------------------------------

Specification

  -------------------------------------------------------------------------------
  **Purpose**    Confirm that a Private expense will become Shared permanently.
  -------------- ----------------------------------------------------------------

  -------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Share Private Expense Confirmation\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Expense summary (P-EXP-005-01).

-   Input area (form fields, in specification order): Sharing notice (P-EXP-005-02); Alert notice (P-EXP-005-05).

-   Action area (primary action first, then secondary actions and links): Confirm share (P-EXP-005-03); Cancel (P-EXP-005-04).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**      **Allowed values / validation**               **Error**   **Visibility**   **Saved to**                  **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ---------------- --------------------------------------------- ----------- ---------------- ----------------------------- -----------------------
  P-EXP-005-01       Expense summary           Read-only text       System         No             Expense values   Description, date, amount                     ---         Creator          Expense                       Display only

  P-EXP-005-02       Sharing notice            Informational text   ---            ---            ---              Explains Shared cannot become Private again   ---         Creator          ---                           Display only

  P-EXP-005-03       Confirm share             Primary button       Yes            ---            ---              ---                                           ---         Creator          Expense.visibility = Shared   Shares expense

  P-EXP-005-04       Cancel                    Secondary button     ---            ---            ---              ---                                           ---         Creator          ---                           Keeps expense Private

  P-EXP-005-05       Alert notice              Informational text   System         No             Derived          No alert is sent for sharing                  ---         Creator          ---                           Display only
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ------------------------------------------------
  Empty                    Not applicable; opens only for Private expense

  Loading                  Confirm disabled

  Error                    Save failure keeps expense Private

  Success                  Expense becomes Shared; co-parent can view it
  -------------------------------------------------------------------------

EXP-SCR-03 --- Expense detail

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-01, EXP-02
  -------------------------------------------------------------------------

![Figure EXP-SCR-03 --- Expense detail](media/a4b706673d2be1bf76d92ce58e3a3ee86e675bb7.png "Figure EXP-SCR-03 — Expense detail"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-03 --- Expense detail*

**Navigation**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-01 Expense log; EXP-SCR-02 Add or edit expense; EXP-SCR-04 Reimbursement request form; EXP-SCR-05 Request detail; EXP-SCR-11 Dispute
  ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   EXP-SCR-01 Expense log; EXP-SCR-02 Add or edit expense; EXP-SCR-04 Reimbursement request form; EXP-SCR-05 Request detail; EXP-SCR-11 Dispute; Main menu: any module

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------------------------------------------
  **Purpose**    View one expense, its receipts, reimbursement request, version history, and permitted actions.
  -------------- ------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Expense Detail\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Description (P-EXP-002-01); Category (P-EXP-002-02); Amount (P-EXP-002-04); Children (P-EXP-002-06); Visibility (P-EXP-002-08); Status (P-EXP-002-09); Receipts (P-EXP-002-10).

-   Input area (form fields, in specification order): Expense date (P-EXP-002-03); Paid by (P-EXP-002-05); Note (P-EXP-002-07).

-   Action area (primary action first, then secondary actions and links): Reimbursement request (P-EXP-002-11); Version history (P-EXP-002-12); Edit (P-EXP-002-13); Void (P-EXP-002-14); Share (P-EXP-002-15); Request reimbursement (P-EXP-002-16); Add receipt (P-EXP-002-17).

-   Controls that must NOT be provided: Delete (P-EXP-002-18).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**                       **Default**         **Allowed values / validation**                                        **Error**                     **Visibility**                           **Saved to**                  **Behavior**
  ------------------ ------------------------- -------------------- -------------- ---------------------------------- ------------------- ---------------------------------------------------------------------- ----------------------------- ---------------------------------------- ----------------------------- ---------------------------------------------
  P-EXP-002-01       Description               Read-only text       Yes            Creator, subject to request rule   Expense value       1--100 characters                                                      ---                           Permission-based                         Expense.description           Display only

  P-EXP-002-02       Category                  Badge                Yes            Creator, subject to request rule   Expense value       Medical; Dental; School; Childcare; Activities; Clothing; Pet; Other   ---                           Permission-based                         Expense.category              Display only

  P-EXP-002-03       Expense date              Date                 Yes            Creator, subject to request rule   Expense value       Not future                                                             ---                           Permission-based                         Expense.expense_date          Display only

  P-EXP-002-04       Amount                    Currency             Yes            Creator, subject to request rule   Expense value       USD; \>0; ≤99,999.99; two decimals                                     ---                           Permission-based                         Expense.amount                Display only

  P-EXP-002-05       Paid by                   Text                 System         No                                 Creator             Immutable                                                              ---                           Permission-based                         Expense.paid_by_user_id       Display only

  P-EXP-002-06       Children                  Chip list            No             Creator, subject to request rule   Expense value       Household children                                                     ---                           Permission-based                         Expense.child_ids             Display only

  P-EXP-002-07       Note                      Text                 No             Creator, subject to request rule   Expense value       ≤500 characters                                                        ---                           Permission-based                         Expense.note                  Display only

  P-EXP-002-08       Visibility                Badge                System         No                                 Shared or Private   Shared; Private                                                        ---                           Permission-based                         Expense.visibility            Display only

  P-EXP-002-09       Status                    Badge                System         No                                 Active              Active; Voided                                                         ---                           Permission-based                         Expense.status                Display only

  P-EXP-002-10       Receipts                  File list            No             Creator can add                    Existing files      Max 5 files; 25 MB total; JPG/PNG/PDF                                  ERR-08/09/10/11               Permission-based                         ExpenseFile                   Opens EXP-SCR-02 Add or edit expense

  P-EXP-002-11       Reimbursement request     Summary / link       System         No                                 None or existing    One open request per expense                                           ERR-14 on duplicate           Permission-based                         ReimbursementRequest          Opens EXP-SCR-05 Request detail

  P-EXP-002-12       Version history           Timeline / table     System         No                                 Derived             All versions retained                                                  Load error with retry         Shared: both parents; Private: creator   ExpenseVersion                Displays history

  P-EXP-002-13       Edit                      Primary button       ---            ---                                ---                 Creator only; no open non-withdrawn request                            ERR-06 / ERR-07               Creator                                  Expense version               Opens EXP-SCR-02 Add or edit expense

  P-EXP-002-14       Void                      Destructive button   ---            ---                                ---                 Creator only; no open non-withdrawn request; confirmation required     ERR-06 / ERR-07               Creator                                  Expense.status = Voided       Voids expense; retains record

  P-EXP-002-15       Share                     Button               ---            ---                                ---                 Private expense in Linked household; confirmation required             ---                           Creator                                  Expense.visibility = Shared   Opens EXP-SCR-02 Add or edit expense

  P-EXP-002-16       Request reimbursement     Primary button       ---            ---                                ---                 Creator; Shared expense; Linked household; no open request             ERR-06/ERR-14/ERR-16/ERR-17   Creator                                  Request record                Opens EXP-SCR-04 Reimbursement request form

  P-EXP-002-17       Add receipt               Button               ---            ---                                ---                 Creator only; storage available                                        ERR-09/ERR-11                 Creator                                  Expense file/version          Opens EXP-SCR-02 Add or edit expense

  P-EXP-002-18       Delete                    Not displayed        ---            ---                                ---                 No delete control                                                      ---                           No user                                  ---                           Expense is voided, never deleted
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- --------------------------------------------------------
  Empty                   Not applicable; detail opens only for existing expense

  Loading                 Detail skeleton

  Error                   Not found, permission denied, or action failure

  Success                 Expense, receipts, request, and history displayed
  --------------------------------------------------------------------------------

EXP-SCR-04 --- Reimbursement request form

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-03
  -------------------------------------------------------------------------

![Figure EXP-SCR-04 --- Reimbursement request form](media/adbfade4d3972cf067dc8ee738c144edd94242c8.png "Figure EXP-SCR-04 — Reimbursement request form"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-04 --- Reimbursement request form*

**Navigation**

  -----------------------------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-03 Expense detail
  ----------------------- -----------------------------------------------------------------------------
  **Where you go next**   EXP-SCR-03 Expense detail; EXP-SCR-05 Request detail; Main menu: any module

  -----------------------------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------
  **Purpose**    Request repayment from the co-parent for a Shared expense.
  -------------- ------------------------------------------------------------

  ---------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Reimbursement Request Form\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Expense summary (P-EXP-006-01).

-   Input area (form fields, in specification order): Amount requested (P-EXP-006-02); Pay-by date (P-EXP-006-03); Proof needed (P-EXP-006-04); Note (P-EXP-006-05).

-   Action area (primary action first, then secondary actions and links): Send request (P-EXP-006-06); Cancel (P-EXP-006-07).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**        **Default**                         **Allowed values / validation**                      **Error**                            **Visibility**   **Saved to**                            **Behavior**
  ------------------ ------------------------- ------------------ -------------- ------------------- ----------------------------------- ---------------------------------------------------- ------------------------------------ ---------------- --------------------------------------- -------------------------------------
  P-EXP-006-01       Expense summary           Read-only text     System         No                  Selected expense                    Description, date, amount, receipts                  ---                                  Requester        ReimbursementRequest.expense_id         Display only

  P-EXP-006-02       Amount requested          Currency input     Yes            Yes before submit   Blank; split-rule prefill applies   USD; \>0; ≤ expense amount                           ERR-01; ERR-13 over expense amount   Requester        ReimbursementRequest.amount_requested   Required

  P-EXP-006-03       Pay-by date               Date picker        Yes            Yes before submit   Blank                               Today or later                                       ERR-03 missing; ERR-12 past date     Requester        ReimbursementRequest.pay_by_date        Required

  P-EXP-006-04       Proof needed              Select             Yes            Yes before submit   None needed                         Receipt; Invoice; Other; None needed                 Inline field message                 Requester        ReimbursementRequest.proof_required     Determines proof validation

  P-EXP-006-05       Note                      Textarea           No             Yes before submit   Blank                               ≤500 characters                                      Inline field message                 Requester        ReimbursementRequest.note               Optional

  P-EXP-006-06       Send request              Primary button     ---            ---                 ---                                 Requires receipt if proof is Receipt/Invoice/Other   ERR-20 missing proof                 Requester        ReimbursementRequest.status = Pending   Creates request; notifies co-parent

  P-EXP-006-07       Cancel                    Secondary button   ---            ---                 ---                                 ---                                                  ---                                  Requester        ---                                     Discards request
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- ------------------------------------------------------------------------------------------------------
  Empty                   Blank request form

  Loading                 Send disabled

  Error                   Invalid amount, missing/past pay-by, missing proof, duplicate request, Private expense, or Solo Mode

  Success                 Request created; co-parent notified
  ------------------------------------------------------------------------------------------------------------------------------

EXP-SCR-05 --- Request detail

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-03
  -------------------------------------------------------------------------

![Figure EXP-SCR-05 --- Request detail](media/8943dfdaf377f507c2f506be85ae21b4cb2cff11.png "Figure EXP-SCR-05 — Request detail"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-05 --- Request detail*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-19 Home; EXP-SCR-03 Expense detail; EXP-SCR-04 Reimbursement request form; EXP-SCR-06 Request list and history; EXP-SCR-12 Pay a request
  ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   EXP-SCR-03 Expense detail; EXP-SCR-06 Request list and history; EXP-SCR-12 Pay a request; Main menu: any module

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  --------------------------------------------------------------------------------------
  **Purpose**    Show a reimbursement request and allow response or payment recording.
  -------------- -----------------------------------------------------------------------

  --------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Reimbursement Request Detail / Respond\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Expense summary (P-EXP-007-01); Amount requested (P-EXP-007-02); Proof needed (P-EXP-007-04); Status (P-EXP-007-06); Overdue flag (P-EXP-007-07).

-   Input area (form fields, in specification order): Pay-by date (P-EXP-007-03); Request note (P-EXP-007-05); Amount received (P-EXP-007-11); Date received (P-EXP-007-12); Payment note (P-EXP-007-13); Request history (P-EXP-007-15).

-   Action area (primary action first, then secondary actions and links): Accept (P-EXP-007-08); Decline (P-EXP-007-09); Mark paid / record payment received (P-EXP-007-10); Withdraw (P-EXP-007-14).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**               **Type**             **Required**   **Editable**     **Default**      **Allowed values / validation**                                   **Error**              **Visibility**   **Saved to**                      **Behavior**
  ------------------ ------------------------------------- -------------------- -------------- ---------------- ---------------- ----------------------------------------------------------------- ---------------------- ---------------- --------------------------------- -------------------------------------
  P-EXP-007-01       Expense summary                       Read-only text       System         No               Linked expense   Description, date, amount, receipts                               ---                    Both parents     ReimbursementRequest.expense_id   Display only

  P-EXP-007-02       Amount requested                      Currency             System         No               Request value    Immutable after creation                                          ---                    Both parents     amount_requested                  Display only

  P-EXP-007-03       Pay-by date                           Date                 System         No               Request value    Immutable after creation                                          ---                    Both parents     pay_by_date                       Display only

  P-EXP-007-04       Proof needed                          Badge                System         No               Request value    Receipt; Invoice; Other; None needed                              ---                    Both parents     proof_required                    Display only

  P-EXP-007-05       Request note                          Text                 System         No               Request value    ≤500 characters                                                   ---                    Both parents     note                              Display only

  P-EXP-007-06       Status                                Badge                System         No               Pending          Pending; Accepted; Part paid; Declined; Withdrawn; Paid           ---                    Both parents     status                            Display only

  P-EXP-007-07       Overdue flag                          Badge                System         No               Derived          Shown after pay-by for Pending/Accepted/Part paid                 ---                    Both parents     Calculated                        Display only

  P-EXP-007-08       Accept                                Primary button       ---            ---              ---              Co-parent only; open request; confirmation required               Inline field message   Co-parent        status = Accepted                 Accepts request

  P-EXP-007-09       Decline                               Destructive button   ---            ---              ---              Co-parent only; open request; confirmation required               Inline field message   Co-parent        status = Declined                 Declines request

  P-EXP-007-10       Mark paid / record payment received   Button / form        Conditional    Requester only   Blank            Amount \>0 and ≤ unpaid balance; valid date; optional note ≤500   Inline field message   Requester        Payment received record           Updates status to Part paid or Paid

  P-EXP-007-11       Amount received                       Currency input       Conditional    Requester only   Blank            \>0; ≤ remaining unpaid                                           Inline field message   Requester        Payment received amount           Required for payment

  P-EXP-007-12       Date received                         Date picker          Conditional    Requester only   Blank            Valid date                                                        Inline field message   Requester        Payment received date             Required for payment

  P-EXP-007-13       Payment note                          Textarea             No             Requester only   Blank            ≤500 characters                                                   Inline field message   Requester        Payment note                      Optional

  P-EXP-007-14       Withdraw                              Destructive button   ---            ---              ---              Requester only; open request                                      Inline field message   Requester        status = Withdrawn                Withdraws request

  P-EXP-007-15       Request history                       Timeline             System         No               Derived          Status changes with actor, time, device                           Load error             Both parents     Request history                   Display only
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -----------------------------------------------------------
  Empty                    Not applicable; opens only for existing request

  Loading                  Actions disabled

  Error                    Already answered/withdrawn request cannot be responded to

  Success                  Status updated; other parent notified
  ------------------------------------------------------------------------------------

EXP-SCR-06 --- Request list and history

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-03
  -------------------------------------------------------------------------

![Figure EXP-SCR-06 --- Request list and history](media/d283f45493d24835a616aa0b314544cb473b0be8.png "Figure EXP-SCR-06 — Request list and history"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-06 --- Request list and history*

**Navigation**

  --------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-19 Home; EXP-SCR-01 Expense log; EXP-SCR-05 Request detail
  ----------------------- --------------------------------------------------------------------------
  **Where you go next**   EXP-SCR-01 Expense log; EXP-SCR-05 Request detail; Main menu: any module

  --------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

EXP-SCR-07 --- Record a child support payment

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-07
  -------------------------------------------------------------------------

![Figure EXP-SCR-07 --- Record a child support payment](media/28ab7e8064b7d13bd357b8740219c32028792229.png "Figure EXP-SCR-07 — Record a child support payment"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-07 --- Record a child support payment*

**Navigation**

  ----------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-08 Child support payments
  ----------------------- ----------------------------------------------------------
  **Where you go next**   EXP-SCR-08 Child support payments; Main menu: any module

  ----------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------------
  **Purpose**    Record or correct a child-support payment made by the parent.
  -------------- ---------------------------------------------------------------

  ------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Add / Edit Child-Support Payment\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Visibility (P-EXP-009-05).

-   Input area (form fields, in specification order): Amount (P-EXP-009-01); Date paid (P-EXP-009-02); Payment method (P-EXP-009-03); Note (P-EXP-009-04).

-   Action area (primary action first, then secondary actions and links): Save (P-EXP-009-06); Cancel (P-EXP-009-07).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**             **Default**              **Allowed values / validation**                              **Error**              **Visibility**     **Saved to**                 **Behavior**
  ------------------ ------------------------- ------------------ -------------- ------------------------ ------------------------ ------------------------------------------------------------ ---------------------- ------------------ ---------------------------- ----------------------------
  P-EXP-009-01       Amount                    Currency input     Yes            Subject to status rule   Blank or current value   USD; \$0.01 to \$99,999.99                                   Inline field message   Recording parent   ChildSupportPayment.amount   Required

  P-EXP-009-02       Date paid                 Date picker        Yes            Subject to status rule   Blank or current value   Valid date                                                   Inline field message   Recording parent   date_paid                    Required

  P-EXP-009-03       Payment method            Select             Yes            Subject to status rule   Blank or current value   State agency payment page; Directly to other parent; Other   Inline field message   Recording parent   payment_method               Required

  P-EXP-009-04       Note                      Textarea           No             Subject to status rule   Blank or current value   ≤500 characters                                              Inline field message   Recording parent   note                         Optional

  P-EXP-009-05       Visibility                Read-only badge    System         No                       Private                  Private by default                                           ---                    Recording parent   visibility                   Display only

  P-EXP-009-06       Save                      Primary button     ---            ---                      ---                      ---                                                          ---                    Recording parent   Payment/version              Creates or updates payment

  P-EXP-009-07       Cancel                    Secondary button   ---            ---                      ---                      ---                                                          ---                    Recording parent   ---                          Discards changes
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- ------------------------------------------------------
  Empty                      Blank payment form

  Loading                    Save disabled

  Error                      Validation or save failure

  Success                    Payment saved as Private with status Recorded by you
  ---------------------------------------------------------------------------------

EXP-SCR-08 --- Child support payments

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-08
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-07
  -------------------------------------------------------------------------

![Figure EXP-SCR-08 --- Child support payments](media/f33d3e938a85b0d6fb7329778bcbd71928a00709.png "Figure EXP-SCR-08 — Child support payments"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-08 --- Child support payments*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-01 Expense log; EXP-SCR-07 Record a child support payment
  ----------------------- ------------------------------------------------------------------------------------------
  **Where you go next**   EXP-SCR-01 Expense log; EXP-SCR-07 Record a child support payment; Main menu: any module

  ------------------------------------------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------
  **Purpose**    Show the parent's private child-support payment record.
  -------------- ---------------------------------------------------------

  ------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Child-Support Payment List\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Amount (P-EXP-008-02); Payment method (P-EXP-008-04); Sync status (P-EXP-008-05); Payment status (P-EXP-008-06).

-   Input area (form fields, in specification order): Date paid (P-EXP-008-03); Privacy notice (P-EXP-008-08).

-   Action area (primary action first, then secondary actions and links): Payment list (P-EXP-008-01); Add payment (P-EXP-008-07).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**       **Allowed values / validation**                                                                  **Error**               **Visibility**     **Saved to**                 **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ----------------- ------------------------------------------------------------------------------------------------ ----------------------- ------------------ ---------------------------- -------------------------------------------------
  P-EXP-008-01       Payment list              Table / list         ---            ---            ---               Payments sorted by date                                                                          Load error with retry   Recording parent   ---                          Displays payments

  P-EXP-008-02       Amount                    Currency             System         No             Derived           USD; two decimals                                                                                ---                     Recording parent   ChildSupportPayment.amount   Display only

  P-EXP-008-03       Date paid                 Date                 System         No             Derived           Valid date                                                                                       ---                     Recording parent   date_paid                    Display only

  P-EXP-008-04       Payment method            Badge                System         No             Derived           State agency payment page; Directly to other parent; Other                                       ---                     Recording parent   payment_method               Display only

  P-EXP-008-05       Sync status               Badge                System         No             Recorded by you   Recorded by you; Matched with agency; Not on agency record; Sent to agency; Credited by agency   ---                     Recording parent   sync_status                  Display only

  P-EXP-008-06       Payment status            Badge                System         No             Active            Active; Voided                                                                                   ---                     Recording parent   status                       Display only

  P-EXP-008-07       Add payment               Primary button       ---            ---            ---               ---                                                                                              ---                     Recording parent   ---                          Opens EXP-SCR-07 Record a child support payment

  P-EXP-008-08       Privacy notice            Informational text   ---            ---            ---               Payments are private unless shared                                                               ---                     Recording parent   ---                          Display only
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                   **Behavior**
  --------------------------- -------------------------------------------
  Empty                       No payments; Add payment action

  Loading                     Table skeleton

  Error                       Load failure and retry

  Success                     Private payment history displayed
  -----------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    View one payment, its history, and permitted actions.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Child-Support Payment Detail\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Amount (P-EXP-010-01); Payment method (P-EXP-010-03); Sync status (P-EXP-010-05); Payment status (P-EXP-010-06).

-   Input area (form fields, in specification order): Date paid (P-EXP-010-02); Note (P-EXP-010-04); History (P-EXP-010-10).

-   Action area (primary action first, then secondary actions and links): Edit (P-EXP-010-07); Void (P-EXP-010-08); Share (P-EXP-010-09).

-   Controls that must NOT be provided: Delete (P-EXP-010-11).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**       **Allowed values / validation**                 **Error**                 **Visibility**     **Saved to**            **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ----------------- ----------------------------------------------- ------------------------- ------------------ ----------------------- -------------------------------------------------
  P-EXP-010-01       Amount                    Currency             System         No             Payment value     USD; two decimals                               ---                       Recording parent   amount                  Display only

  P-EXP-010-02       Date paid                 Date                 System         No             Payment value     Valid date                                      ---                       Recording parent   date_paid               Display only

  P-EXP-010-03       Payment method            Badge                System         No             Payment value     Three allowed methods                           ---                       Recording parent   payment_method          Display only

  P-EXP-010-04       Note                      Text                 System         No             Payment value     ≤500 characters                                 ---                       Recording parent   note                    Display only

  P-EXP-010-05       Sync status               Badge                System         No             Recorded by you   Sync statuses owned by CSS                      ---                       Recording parent   sync_status             Display only

  P-EXP-010-06       Payment status            Badge                System         No             Active            Active; Voided                                  ---                       Recording parent   status                  Display only

  P-EXP-010-07       Edit                      Primary button       ---            ---            ---               Subject to status rule                          ERR-24 where applicable   Recording parent   Payment version         Opens EXP-SCR-07 Record a child support payment

  P-EXP-010-08       Void                      Destructive button   ---            ---            ---               Subject to status rule; confirmation required   ERR-24 where applicable   Recording parent   status = Voided         Voids payment; excludes from CSS

  P-EXP-010-09       Share                     Button               ---            ---            ---               Private payment; the recorder can share it      Inline field message      Recording parent   Visibility              Optional sharing

  P-EXP-010-10       History                   Timeline             System         No             Derived           Record/edit/void/share events                   Load error                Recording parent   Audit/version history   Display only

  P-EXP-010-11       Delete                    Not displayed        ---            ---            ---               No delete control                               ---                       No user            ---                     Payment is voided, never deleted
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -----------------------------------------------------
  Empty                    Not applicable; opens only for existing payment

  Loading                  Detail skeleton

  Error                    Not found, permission denied, or status restriction

  Success                  Payment, status, and history displayed
  ------------------------------------------------------------------------------

EXP-SCR-09 --- Running balance

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-09
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-04
  -------------------------------------------------------------------------

![Figure EXP-SCR-09 --- Running balance](media/f6ac82868141554aac7564f93fdb54c7d69a9e67.png "Figure EXP-SCR-09 — Running balance"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-09 --- Running balance*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-01 Expense log
  ----------------------- --------------------------------------------------------
  **Where you go next**   EXP-SCR-01 Expense log; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

EXP-SCR-10 --- Split rules

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-10
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-05
  -------------------------------------------------------------------------

![Figure EXP-SCR-10 --- Split rules](media/581068aa3ed0e62db20cf9b7f9434969f537ec71.png "Figure EXP-SCR-10 — Split rules"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-10 --- Split rules*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-01 Expense log
  ----------------------- --------------------------------------------------------
  **Where you go next**   EXP-SCR-01 Expense log; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

EXP-SCR-11 --- Dispute

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-11
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-09
  -------------------------------------------------------------------------

![Figure EXP-SCR-11 --- Dispute](media/69448a22c0b7cefebbe644301969674b2a72faf1.png "Figure EXP-SCR-11 — Dispute"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-11 --- Dispute*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-03 Expense detail
  ----------------------- --------------------------------------------------------
  **Where you go next**   EXP-SCR-03 Expense detail; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

EXP-SCR-12 --- Pay a request

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-12
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-08, EXP-13
  -------------------------------------------------------------------------

![Figure EXP-SCR-12 --- Pay a request](media/95d48d652b7b086c05adfbceeea957e274f5ae91.png "Figure EXP-SCR-12 — Pay a request"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-12 --- Pay a request*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-05 Request detail
  ----------------------- --------------------------------------------------------
  **Where you go next**   EXP-SCR-05 Request detail; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

EXP-SCR-13 --- Scheduled payments

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-13
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-10
  -------------------------------------------------------------------------

![Figure EXP-SCR-13 --- Scheduled payments](media/5b83aeef61913e1d9f38dcc9e45cf3ef1fc429f5.png "Figure EXP-SCR-13 — Scheduled payments"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-13 --- Scheduled payments*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-01 Expense log; EXP-SCR-16 Credit building
  ----------------------- --------------------------------------------------------
  **Where you go next**   EXP-SCR-16 Credit building; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

EXP-SCR-14 --- AI-assisted entry

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-14
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-11
  -------------------------------------------------------------------------

![Figure EXP-SCR-14 --- AI-assisted entry](media/7e34b2500d4836053f0ebb50ae140aacf5f98eed.png "Figure EXP-SCR-14 — AI-assisted entry"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-14 --- AI-assisted entry*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-02 Add or edit expense
  ----------------------- --------------------------------------------------------
  **Where you go next**   EXP-SCR-02 Add or edit expense; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

EXP-SCR-15 --- Bills

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-15
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-12
  -------------------------------------------------------------------------

![Figure EXP-SCR-15 --- Bills](media/6fa07714ef88272067b667ae0ba485120051a38f.png "Figure EXP-SCR-15 — Bills"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-15 --- Bills*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-01 Expense log
  ----------------------- --------------------------------------------------------
  **Where you go next**   EXP-SCR-01 Expense log; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

EXP-SCR-16 --- Credit building

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-16
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-14
  -------------------------------------------------------------------------

![Figure EXP-SCR-16 --- Credit building](media/0159aba1c620756bd8073d2582bafe18519b1510.png "Figure EXP-SCR-16 — Credit building"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-16 --- Credit building*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-13 Scheduled payments
  ----------------------- --------------------------------------------------------
  **Where you go next**   EXP-SCR-13 Scheduled payments; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

EXP-SCR-17 --- Import past expenses

  -------------------------------------------------------------------------
  **Screen ID**    EXP-SCR-17
  ---------------- --------------------------------------------------------
  **Module**       Expenses and Payments

  **Feature(s)**   EXP-15
  -------------------------------------------------------------------------

![Figure EXP-SCR-17 --- Import past expenses](media/19e022435bd82119f8883d500d1879f2c996d1c8.png "Figure EXP-SCR-17 — Import past expenses"){width="6.666666666666667in" height="5.0in"}

*Figure EXP-SCR-17 --- Import past expenses*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    EXP-SCR-01 Expense log
  ----------------------- --------------------------------------------------------
  **Where you go next**   EXP-SCR-01 Expense log; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

Cross-screen rules and pending screen decisions (Expenses and Payments)

Cross-screen Expenses rules

Pending screen decisions --- Expenses

8.7 Field-level specifications

4.1 Expense --- EXP-SCR-02 Add or edit expense → EXP-SCR-02

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**      **Technical name**   **Type / control**   **Required**   **Editable**                       **Default**                         **Allowed values / validation**                                        **Visibility**
  -------------- -------------- -------------------- -------------------- -------------- ---------------------------------- ----------------------------------- ---------------------------------------------------------------------- ---------------------
  FLD-EXP-001    Description    description          Text                 Yes            Creator, subject to request rule   None                                1--100 characters; ERR-03/ERR-04                                       Expense form/list

  FLD-EXP-002    Category       category             Select               Yes            Creator, subject to request rule   None                                Medical; Dental; School; Childcare; Activities; Clothing; Pet; Other   Expense form/list

  FLD-EXP-003    Expense date   expense_date         Date                 Yes            Creator, subject to request rule   None                                Not future; ERR-02                                                     Expense form/list

  FLD-EXP-004    Amount         amount               Currency             Yes            Creator, subject to request rule   None                                USD; \>0; ≤99,999.99; max 2 decimals; ERR-01                           Expense form/list

  FLD-EXP-005    Children       child_ids            Multi-select         No             Creator, subject to request rule   None                                Household children                                                     Expense form

  FLD-EXP-006    Note           note                 Textarea             No             Creator, subject to request rule   None                                ≤500 characters; ERR-18                                                Expense form/detail

  FLD-EXP-007    Paid by        paid_by_user_id      System               System         No                                 Current user                        Immutable                                                              Expense detail

  FLD-EXP-008    Visibility     visibility           Toggle               Yes            Private→Shared only                Shared in Linked; Private in Solo   Shared, Private                                                        Expense form/detail

  FLD-EXP-009    Status         status               Display              System         No                                 Active                              Active, Voided                                                         Expense list/detail

  FLD-EXP-010    Version        version_no           Integer              System         No                                 1                                   Increments on edit/file addition                                       History
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4.2 Receipt --- EXP-SCR-02 Add or edit expense → EXP-SCR-02

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**      **Technical name**   **Type / control**     **Required**   **Editable**              **Default**     **Allowed values / validation**                                        **Visibility**
  -------------- -------------- -------------------- ---------------------- -------------- ------------------------- --------------- ---------------------------------------------------------------------- ----------------
  FLD-EXP-020    Receipt file   file_id              File upload / camera   Yes            No removal after attach   None            JPG, PNG, PDF; max 5 files and 25 MB total per expense; malware scan   Expense detail

  FLD-EXP-021    File name      file_name            Display                System         No                        Uploaded name   Display                                                                Expense detail

  FLD-EXP-022    File type      file_type            Display                System         No                        Derived         JPG, PNG, PDF                                                          Expense detail

  FLD-EXP-023    File size      size_bytes           Display                System         No                        Derived         Counts toward expense and household storage                            Expense detail

  FLD-EXP-024    Added at       added_at             Timestamp              System         No                        Upload time     UTC; local display                                                     Expense detail
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4.3 Reimbursement Request --- EXP-SCR-04 Reimbursement request form / EXP-SCR-05 Request detail → EXP-SCR-04, EXP-SCR-05

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**               **Technical name**      **Type / control**   **Required**   **Editable**        **Default**        **Allowed values / validation**                           **Visibility**
  -------------- ----------------------- ----------------------- -------------------- -------------- ------------------- ------------------ --------------------------------------------------------- ----------------
  FLD-EXP-030    Expense                 expense_id              System               Yes            No                  Selected expense   Must be Shared; creator must be requester                 Request form

  FLD-EXP-031    Amount requested        amount_requested        Currency             Yes            No after creation   None               \>0; ≤ expense amount; ERR-01/ERR-13                      Request form

  FLD-EXP-032    Pay-by date             pay_by_date             Date                 Yes            No after creation   None               Today or later; ERR-03/ERR-12                             Request form

  FLD-EXP-033    Proof needed            proof_required          Select               Yes            No after creation   None               Receipt, Invoice, Other, None needed                      Request form

  FLD-EXP-034    Note                    note                    Textarea             No             No after creation   None               ≤500 characters                                           Request form

  FLD-EXP-035    Request status          status                  Display              System         No                  Pending            Pending, Accepted, Part paid, Declined, Withdrawn, Paid   Request detail

  FLD-EXP-036    Overdue flag            is_overdue              Display              System         No                  false              True after pay-by date for Pending/Accepted/Part paid     Both parents

  FLD-EXP-037    Amount received         amount_received         Currency             Conditional    Requester only      None               \>0; ≤ remaining unpaid                                   Request detail

  FLD-EXP-038    Payment received date   payment_received_date   Date                 Conditional    Requester only      None               Valid date                                                Request detail
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4.4 Child-Support Payment --- EXP-SCR-07 Record a child support payment / EXP-SCR-08 Child support payments → EXP-SCR-07, EXP-SCR-08

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**        **Technical name**   **Type / control**   **Required**   **Editable**             **Default**       **Allowed values / validation**                                                                  **Visibility**
  -------------- ---------------- -------------------- -------------------- -------------- ------------------------ ----------------- ------------------------------------------------------------------------------------------------ -------------------
  FLD-EXP-040    Amount           amount               Currency             Yes            Subject to status rule   None              USD; \$0.01 to \$99,999.99                                                                       Payment form/list

  FLD-EXP-041    Date paid        date_paid            Date                 Yes            Subject to status rule   None              Valid date                                                                                       Payment form

  FLD-EXP-042    Payment method   payment_method       Select               Yes            Subject to status rule   None              State agency payment page; Directly to other parent; Other                                       Payment form

  FLD-EXP-043    Note             note                 Textarea             No             Subject to status rule   None              ≤500 characters                                                                                  Payment form

  FLD-EXP-044    Visibility       visibility           System               System         No                       Private           Private by default                                                                               Recording parent

  FLD-EXP-045    Sync status      sync_status          Display              System         No                       Recorded by you   Recorded by you; Matched with agency; Not on agency record; Sent to agency; Credited by agency   Payment list

  FLD-EXP-046    Payment status   status               Display              System         No                       Active            Active, Voided                                                                                   Payment list
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

8.8 User actions and procedures

ACT-EXP-001 --- Create Expense

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            EXP-SCR-02 Add or edit expense

  **Objective**         Record a child-related cost

  **Trigger**           User submits expense form

  **Preconditions**     User signed in; household exists

  **System behavior**   Create expense with description, category, expense date, USD amount, optional children, optional note; set payer to creator; default visibility Shared in Linked household and Private in Solo Mode; save amount to the cent.

  **Data created**      Expense, initial version, audit log

  **Validations**       Description 1--100 characters; amount \> 0 and ≤ 99,999.99 with max two decimals; expense date not future; category and date required; note ≤ 500 characters.

  **Success**           Expense appears in list, newest expense date first

  **Negative**          Empty/long description: ERR-03/ERR-04; invalid amount: ERR-01; future date: ERR-02; missing category/date: ERR-03; long note: ERR-18; save failure: ERR-05.

  **Permissions**       Creator can edit; co-parent can view Shared expense; Private expense is creator-only.

  **Source**            EXP-01; FR-EXP-01-01--FR-EXP-01-22.

  **Screen(s)**         EXP-SCR-02 Add or edit expense, with files and share
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-02 Add or edit expense, with files and share (entry: EXP-SCR-01 Expense log; EXP-SCR-03 Expense detail).

2.  Make sure the preconditions are met: User signed in; household exists.

3.  Enter or select the required information: Description; Category; Expense date; Amount; Visibility.

4.  Perform the action: User submits expense form.

5.  The system validates: Description 1--100 characters; amount \> 0 and ≤ 99,999.99 with max two decimals; expense date not future; category and date required; note ≤ 500 characters.

6.  The system processes the action: Create expense with description, category, expense date, USD amount, optional children, optional note; set payer to creator; default visibility Shared in Linked household and Private in Solo Mode; save amount to the cent.

7.  Result on success: Expense appears in list, newest expense date first.

8.  If it fails or a rule is not met: Empty/long description: ERR-03/ERR-04; invalid amount: ERR-01; future date: ERR-02; missing category/date: ERR-03; long note: ERR-18; save failure: ERR-05.

ACT-EXP-002 --- Edit Expense

  ---------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Expense creator
  --------------------- -----------------------------------------------------------------------------------------------------------------------------
  **Screen**            EXP-SCR-03 Expense detail / EXP-SCR-02 Add or edit expense

  **Objective**         Correct an expense while preserving prior version

  **Trigger**           Creator saves changes

  **Preconditions**     Expense is Active; no non-withdrawn reimbursement request exists

  **System behavior**   Save a new version with original details, actor, UTC time, and device; retain prior version; update Records-available data.

  **Data updated**      Expense version history; audit log

  **Success**           Updated expense and version history

  **Alternative**       Creator may still add files even when a reimbursement request exists.

  **Negative**          Non-creator edit: ERR-06; open reimbursement request: ERR-07.

  **Permissions**       Creator only

  **Source**            EXP-01; FR-EXP-01-14--FR-EXP-01-17.

  **Screen(s)**         EXP-SCR-03 Expense detail, with files and version history, EXP-SCR-02 Add or edit expense, with files and share
  ---------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-03 Expense detail, with files and version history, EXP-SCR-02 Add or edit expense, with files and share (entry: EXP-SCR-01 Expense log; notification deep link).

2.  Make sure the preconditions are met: Expense is Active; no non-withdrawn reimbursement request exists.

3.  Enter or select the required information: Expense date; Description; Category; Amount; Visibility.

4.  Perform the action: Creator saves changes.

5.  The system processes the action: Save a new version with original details, actor, UTC time, and device; retain prior version; update Records-available data.

6.  Result on success: Updated expense and version history.

7.  If it fails or a rule is not met: Creator may still add files even when a reimbursement request exists.

ACT-EXP-003 --- Void Expense

  --------------------------------------------------------------------------------------------------------
  **Actor**             Expense creator
  --------------------- ----------------------------------------------------------------------------------
  **Screen**            EXP-SCR-03 Expense detail

  **Objective**         Remove an expense from totals without deleting evidence

  **Trigger**           Creator selects Void

  **Preconditions**     Expense Active; no non-withdrawn reimbursement request

  **System behavior**   Set status Voided; retain in log; exclude from totals and balance; never delete.

  **Data updated**      Expense status; audit log

  **Success**           Voided expense remains visible with Voided status

  **Negative**          Open reimbursement request prevents void: ERR-07.

  **Permissions**       Creator only

  **Source**            EXP-01; FR-EXP-01-15, FR-EXP-01-16.

  **Screen(s)**         EXP-SCR-03 Expense detail, with files and version history
  --------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-03 Expense detail, with files and version history (entry: EXP-SCR-01 Expense log; notification deep link).

2.  Make sure the preconditions are met: Expense Active; no non-withdrawn reimbursement request.

3.  Enter or select the required information: Expense date.

4.  Perform the action: Creator selects Void.

5.  The system processes the action: Set status Voided; retain in log; exclude from totals and balance; never delete.

6.  Result on success: Voided expense remains visible with Voided status.

7.  If it fails or a rule is not met: Open reimbursement request prevents void: ERR-07.

ACT-EXP-004 --- Attach Receipt

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Expense creator
  --------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            EXP-SCR-02 Add or edit expense

  **Objective**         Preserve proof of expense

  **Trigger**           Creator uploads file or captures photo

  **Preconditions**     Expense exists; storage limit not exceeded

  **System behavior**   Accept up to 5 files and 25 MB total per expense; accept JPG, PNG, PDF; malware-scan files; in mobile browser allow camera capture with file-picker fallback; file cannot be removed after attachment; adding a file creates a new expense version.

  **Data created**      File attachment, expense version, audit log

  **Success**           Receipt displayed with name, type, size, and added time

  **Negative**          Wrong type: ERR-08; size/count limit: ERR-09; malware: ERR-10; storage limit: ERR-11; save failure: ERR-05.

  **Permissions**       Creator attaches; viewers of the expense can view files.

  **Source**            EXP-02; FR-EXP-02-01--FR-EXP-02-13.

  **Screen(s)**         EXP-SCR-02 Add or edit expense, with files and share
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-02 Add or edit expense, with files and share (entry: EXP-SCR-01 Expense log; EXP-SCR-03 Expense detail).

2.  Make sure the preconditions are met: Expense exists; storage limit not exceeded.

3.  Enter or select the required information: Description; Category; Expense date; Amount; Visibility.

4.  Perform the action: Creator uploads file or captures photo.

5.  The system processes the action: Accept up to 5 files and 25 MB total per expense; accept JPG, PNG, PDF; malware-scan files; in mobile browser allow camera capture with file-picker fallback; file cannot be removed after attachment; adding a file creates a new expense version.

6.  Result on success: Receipt displayed with name, type, size, and added time.

7.  If it fails or a rule is not met: Wrong type: ERR-08; size/count limit: ERR-09; malware: ERR-10; storage limit: ERR-11; save failure: ERR-05.

ACT-EXP-005 --- Share Private Expense

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Expense creator
  --------------------- ------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            EXP-SCR-03 Expense detail

  **Objective**         Make a previously private expense visible to co-parent

  **Trigger**           Creator selects Share and confirms

  **Preconditions**     Household Linked; expense is Private

  **System behavior**   After confirmation, set visibility Shared; co-parent gains access; visibility cannot revert to Private; no alert is sent for the share itself.

  **Data updated**      Expense visibility; audit log

  **Success**           Co-parent can view expense and files

  **Negative**          Save failure retains Private status.

  **Permissions**       Creator only

  **Source**            EXP-01; FR-EXP-01-09--FR-EXP-01-13.

  **Screen(s)**         EXP-SCR-03 Expense detail, with files and version history
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-03 Expense detail, with files and version history (entry: EXP-SCR-01 Expense log; notification deep link).

2.  Make sure the preconditions are met: Household Linked; expense is Private.

3.  Enter or select the required information: Expense date.

4.  Perform the action: Creator selects Share and confirms.

5.  The system processes the action: After confirmation, set visibility Shared; co-parent gains access; visibility cannot revert to Private; no alert is sent for the share itself.

6.  Result on success: Co-parent can view expense and files.

7.  If it fails or a rule is not met: Save failure retains Private status.

ACT-EXP-006 --- Create Reimbursement Request

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Expense creator
  --------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            EXP-SCR-04 Reimbursement request form

  **Objective**         Request repayment from co-parent

  **Trigger**           Creator submits request

  **Preconditions**     Household Linked; expense is Shared and created by requester; no existing open request

  **System behavior**   Create request with amount requested, pay-by date, proof needed (Receipt, Invoice, Other, or None needed), and optional note; notify co-parent.

  **Data created**      Reimbursement request, notification, audit log

  **Validations**       Amount \> 0 and ≤ expense amount; pay-by date today or later; if proof is Receipt/Invoice/Other, expense must have at least one attachment.

  **Success**           Request created and visible to both parents

  **Negative**          Non-creator: ERR-06; invalid amount: ERR-01; over-expense amount: ERR-13; missing/past pay-by: ERR-03/ERR-12; missing proof: ERR-20; Private expense: ERR-16; Solo Mode: ERR-17.

  **Permissions**       Expense creator only

  **Source**            EXP-03; FR-EXP-03-01--FR-EXP-03-07.

  **Screen(s)**         EXP-SCR-04 Reimbursement request form
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-04 Reimbursement request form (entry: EXP-SCR-03 Expense detail).

2.  Make sure the preconditions are met: Household Linked; expense is Shared and created by requester; no existing open request.

3.  Enter or select the required information: Amount requested; Pay-by date; Proof needed.

4.  Perform the action: Creator submits request.

5.  The system validates: Amount \> 0 and ≤ expense amount; pay-by date today or later; if proof is Receipt/Invoice/Other, expense must have at least one attachment.

6.  The system processes the action: Create request with amount requested, pay-by date, proof needed (Receipt, Invoice, Other, or None needed), and optional note; notify co-parent.

7.  Result on success: Request created and visible to both parents.

8.  If it fails or a rule is not met: Non-creator: ERR-06; invalid amount: ERR-01; over-expense amount: ERR-13; missing/past pay-by: ERR-03/ERR-12; missing proof: ERR-20; Private expense: ERR-16; Solo Mode: ERR-17.

ACT-EXP-007 --- Respond to Reimbursement Request

  -----------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Co-parent
  --------------------- -------------------------------------------------------------------------------------------------------------
  **Screen**            EXP-SCR-05 Request detail

  **Objective**         Accept, decline, or mark reimbursement paid

  **Trigger**           Co-parent selects response

  **Preconditions**     Request is open; actor is the other parent

  **System behavior**   Update request status; retain response and history; notify requester; prevent further edits after response.

  **Data updated**      Request status/response; audit log

  **Success**           Request reflects response

  **Negative**          Already answered or withdrawn request cannot be responded to.

  **Permissions**       Co-parent only

  **Source**            EXP-03.

  **Screen(s)**         EXP-SCR-05 Request detail: answer, confirm and mark as paid
  -----------------------------------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-05 Request detail: answer, confirm and mark as paid (entry: EXP-SCR-03 Expense detail; notification deep link).

2.  Make sure the preconditions are met: Request is open; actor is the other parent.

3.  Perform the action: Co-parent selects response.

4.  The system processes the action: Update request status; retain response and history; notify requester; prevent further edits after response.

5.  Result on success: Request reflects response.

6.  If it fails or a rule is not met: Already answered or withdrawn request cannot be responded to.

ACT-EXP-008 --- Withdraw Reimbursement Request

  --------------------------------------------------------------------------------------------
  **Actor**             Request creator
  --------------------- ----------------------------------------------------------------------
  **Screen**            EXP-SCR-05 Request detail

  **Objective**         Cancel an open reimbursement request

  **Trigger**           Creator selects Withdraw

  **Preconditions**     Request still open

  **System behavior**   Set status Withdrawn; retain history; allow expense edit/void again.

  **Data updated**      Request status; audit log

  **Success**           Request Withdrawn

  **Permissions**       Request creator

  **Source**            EXP-03; FR-EXP-01-15.

  **Screen(s)**         EXP-SCR-05 Request detail: answer, confirm and mark as paid
  --------------------------------------------------------------------------------------------

1.  Open EXP-SCR-05 Request detail: answer, confirm and mark as paid (entry: EXP-SCR-03 Expense detail; notification deep link).

2.  Make sure the preconditions are met: Request still open.

3.  Perform the action: Creator selects Withdraw.

4.  The system processes the action: Set status Withdrawn; retain history; allow expense edit/void again.

5.  Result on success: Request Withdrawn.

ACT-EXP-009 --- Record Child-Support Payment

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent who pays support
  --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            EXP-SCR-07 Record a child support payment

  **Objective**         Retain a personal record of support paid

  **Trigger**           Parent submits payment

  **Preconditions**     Parent signed in

  **System behavior**   Record amount, date paid, payment method (State agency payment page, Directly to the other parent, or Other), and optional note; save as Private; set status Recorded by you; make Active payments available to future Child Support Sync comparison.

  **Data created**      Child-support payment, audit log

  **Validations**       Amount/date/method required per EXP rules; note ≤ 500 characters.

  **Success**           Payment appears in private payment list

  **Negative**          Invalid input prevents save; save failure creates no payment.

  **Permissions**       Recording parent only; co-parent cannot see unless explicitly shared.

  **Source**            EXP-07; FR-EXP-07-01--FR-EXP-07-06.

  **Screen(s)**         EXP-SCR-07 Record a child support payment
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-07 Record a child support payment (entry: EXP-SCR-07 Record a child support payment; ).

2.  Make sure the preconditions are met: Parent signed in.

3.  Enter or select the required information: Amount; Date paid; Payment method.

4.  Perform the action: Parent submits payment.

5.  The system validates: Amount/date/method required per EXP rules; note ≤ 500 characters.

6.  The system processes the action: Record amount, date paid, payment method (State agency payment page, Directly to the other parent, or Other), and optional note; save as Private; set status Recorded by you; make Active payments available to future Child Support Sync comparison.

7.  Result on success: Payment appears in private payment list.

8.  If it fails or a rule is not met: Invalid input prevents save; save failure creates no payment.

ACT-EXP-010 --- Edit Child-Support Payment

  ------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Recording parent
  --------------------- --------------------------------------------------------------------------------------------------------
  **Screen**            EXP-SCR-08 Child support payments

  **Objective**         Correct a recorded payment

  **Trigger**           Parent saves changes

  **Preconditions**     Payment is Active and editable under EXP status rules

  **System behavior**   Save corrected payment while preserving history; future Sync comparison uses updated Active payment.

  **Data updated**      Payment version/history; audit log

  **Success**           Payment updated

  **Negative**          Payment in a non-editable sync status may be restricted; exact re-comparison behavior is owned by CSS.

  **Permissions**       Recording parent

  **Source**            EXP-07; FR-EXP-07-16--FR-EXP-07-18.

  **Screen(s)**         EXP-SCR-08 Child support payment list and detail
  ------------------------------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-08 Child support payment list and detail (entry: Expenses navigation / tab).

2.  Make sure the preconditions are met: Payment is Active and editable under EXP status rules.

3.  Perform the action: Parent saves changes.

4.  The system processes the action: Save corrected payment while preserving history; future Sync comparison uses updated Active payment.

5.  Result on success: Payment updated.

6.  If it fails or a rule is not met: Payment in a non-editable sync status may be restricted; exact re-comparison behavior is owned by CSS.

ACT-EXP-011 --- Void Child-Support Payment

  -------------------------------------------------------------------------------------------------------------
  **Actor**             Recording parent
  --------------------- ---------------------------------------------------------------------------------------
  **Screen**            EXP-SCR-08 Child support payments

  **Objective**         Remove an incorrect payment from comparison without deletion

  **Trigger**           Parent selects Void

  **Preconditions**     Payment status permits void

  **System behavior**   Set Voided; retain in list; exclude from Child Support Sync comparison; never delete.

  **Data updated**      Payment status; audit log

  **Success**           Voided payment retained but excluded from sync

  **Negative**          ERR-24 applies where status prevents edit/void.

  **Permissions**       Recording parent

  **Source**            EXP-07; FR-EXP-07-10.

  **Screen(s)**         EXP-SCR-08 Child support payment list and detail
  -------------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-08 Child support payment list and detail (entry: Expenses navigation / tab).

2.  Make sure the preconditions are met: Payment status permits void.

3.  Perform the action: Parent selects Void.

4.  The system processes the action: Set Voided; retain in list; exclude from Child Support Sync comparison; never delete.

5.  Result on success: Voided payment retained but excluded from sync.

6.  If it fails or a rule is not met: ERR-24 applies where status prevents edit/void.

ACT-EXP-012 --- Filter and Total Expenses

  ------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- --------------------------------------------------------------------------------------
  **Screen**            EXP-SCR-01 Expense log

  **Objective**         Analyze expenses by category and child

  **Trigger**           User applies filters

  **Preconditions**     Expenses exist

  **System behavior**   Filter by category and child; display Active expense total; exclude Voided expenses.

  **Data viewed**       Expense list and calculated total

  **Success**           Filtered list and total displayed

  **Empty state**       Show no-results state and Add expense action

  **Permissions**       Users see only expenses they are permitted to view.

  **Source**            EXP-06; FR-EXP-06-06.

  **Screen(s)**         EXP-SCR-01 Expense log, with filters and total
  ------------------------------------------------------------------------------------------------------------

1.  Open EXP-SCR-01 Expense log, with filters and total (entry: Main navigation → Expenses).

2.  Make sure the preconditions are met: Expenses exist.

3.  Perform the action: User applies filters.

4.  The system processes the action: Filter by category and child; display Active expense total; exclude Voided expenses.

5.  Result on success: Filtered list and total displayed.

8.9 Business rules and validations

-   Dispute: when a parent disputes an expense on EXP-SCR-11 Dispute, the expense shows the label Disputed and the other parent is alerted (\'\[name\] disputed the expense \[description\].\').

-   A disputed expense stays in the running balance. Both parents can add notes to the dispute; every note is kept in the record.

-   Only the parent who opened the dispute can close it. When it is closed, the Disputed label is removed and the dispute and its notes stay in the expense history.

  -------------------------------------------------------------------------------------------------------------------
  **ID**         **Rule**                                                                           **Features**
  -------------- ---------------------------------------------------------------------------------- -----------------
  BR-14          A reimbursement request shows its deadline and the proof needed.                   EXP-03

  BR-15          Once a split rule from the order is entered, it applies to every shared expense.   EXP-05
  -------------------------------------------------------------------------------------------------------------------

BR-17 (a difference between the agency record and a parent-recorded payment is flagged and never changed automatically) is owned by Child Support Sync. This module only holds the recorded payment (EXP-07).

  --------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- ---------------------------------------------------------------------------------------------------------------------------------
  BR-05      Data export, tone, safety and reporting tools are available to every user.

  BR-11      AI is opt-in. The app does not train on user messages. AI suggestions never enter the legal record.

  BR-14      A reimbursement request shows its deadline and the proof needed.

  BR-15      Once a split rule from the order is entered, it applies to every shared expense.

  BR-16      Agency values are read-only in the app. Each one shows its source (API or batch) and the time it was last updated.

  BR-17      A difference between the agency record and a parent-recorded payment is flagged, never changed automatically.

  BR-21      Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.
  --------------------------------------------------------------------------------------------------------------------------------------------

8.10 Messages and errors

Errors

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**    **When it shows**                                                           **Text**                                                                                                                      **Used by**
  --------- --------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------
  ERR-01    An amount is not valid                                                      Enter an amount more than 0 and up to 99,999.99, with no more than 2 decimal places.                                          FR-EXP-01-03, FR-EXP-03-03, FR-EXP-05-03, FR-EXP-07-02

  ERR-02    A date is in the future                                                     The date cannot be in the future.                                                                                             FR-EXP-01-04, FR-EXP-03-16, FR-EXP-07-02

  ERR-03    A required field is empty                                                   Fill in the \[field name\].                                                                                                   FR-EXP-01-02, FR-EXP-01-05, FR-EXP-03-04, FR-EXP-06-01, FR-EXP-07-02, FR-EXP-09-01

  ERR-04    A description or a merchant name is longer than 100 characters              Use up to 100 characters.                                                                                                     FR-EXP-01-02, FR-EXP-12-02

  ERR-05    A change cannot be saved                                                    We could not save your change. Nothing was changed. Please try again.                                                         FR-EXP-01-22, FR-EXP-02-13, FR-EXP-03-22, FR-EXP-05-18, FR-EXP-07-19, FR-EXP-09-12, FR-EXP-15-09

  ERR-06    Someone other than the creator tries to change or request                   Only the person who created this entry can do this.                                                                           FR-EXP-01-14, FR-EXP-03-02, FR-EXP-07-09

  ERR-07    A parent edits or voids an expense that has a request                       This entry has a reimbursement request, so it cannot be changed. Add a new entry to correct it.                               FR-EXP-01-15

  ERR-08    A file type is not allowed                                                  This file type is not allowed. Use JPG, PNG or PDF.                                                                           FR-EXP-02-02

  ERR-09    Too many files or too much data                                             Attach up to 5 files, 25 MB in all.                                                                                           FR-EXP-02-05

  ERR-10    A file fails the malware scan                                               We could not attach this file because it did not pass our safety check.                                                       FR-EXP-02-03

  ERR-11    A household is over the storage limit                                       You are over the storage limit. You can still view and export your files.                                                     FR-EXP-02-06

  ERR-12    A pay-by date is in the past                                                Choose a pay-by date that is today or later.                                                                                  FR-EXP-03-04

  ERR-13    The amount requested is above the expense amount                            The amount requested cannot be more than the expense amount.                                                                  FR-EXP-03-03, FR-EXP-05-08

  ERR-14    A second open request is sent for an expense                                There is already an open request for this expense.                                                                            FR-EXP-03-07

  ERR-15    A request that was answered or withdrawn is answered or withdrawn again     This request was already answered or withdrawn.                                                                               FR-EXP-03-14

  ERR-16    A request is sent for a Private expense                                     Share this expense with your co-parent before you ask for a reimbursement.                                                    FR-EXP-03-06

  ERR-17    A request is tried in Solo Mode                                             You can ask for a reimbursement after your co-parent joins.                                                                   FR-EXP-03-06

  ERR-18    A note or reason is too long                                                That is too long. Use up to the number of characters shown.                                                                   FR-EXP-01-06, FR-EXP-03-12, FR-EXP-07-02, FR-EXP-09-01

  ERR-19    The amount received is 0 or less, or is more than the amount still unpaid   Enter an amount more than 0 and not more than the amount still unpaid.                                                        FR-EXP-03-16

  ERR-20    A request names proof but the expense has no file                           Attach the proof you named, for example a receipt, before you send this request.                                              FR-EXP-03-05

  ERR-21    The requester tries to answer the request                                   Only your co-parent can answer this request.                                                                                  FR-EXP-03-11

  ERR-22    A parent other than the requester records a payment on a request            Only the person who sent this request can record a payment on it.                                                             FR-EXP-03-16

  ERR-23    A payment is recorded on a request that is not Accepted or Part paid        You can record a payment after the request was accepted.                                                                      FR-EXP-03-16

  ERR-24    A payment that the agency side has matched, sent or credited is changed     This payment is already matched with, sent to or credited by the agency, so it cannot be changed. Add a new record instead.   FR-EXP-07-09, FR-EXP-07-10

  ERR-25    The two shares of a split rule do not add up to 100                         The two shares must add up to 100 percent.                                                                                    FR-EXP-05-02

  ERR-26    A split rule exists for the same category and start date                    A rule for this category already starts on that date.                                                                         FR-EXP-05-12

  ERR-27    A parent disputes their own expense                                         You cannot dispute an entry you created.                                                                                      FR-EXP-09-02

  ERR-28    A second open dispute is opened                                             There is already an open dispute for this entry.                                                                              FR-EXP-09-02

  ERR-29    The balance cannot be calculated                                            We could not show your balance. Please try again.                                                                             FR-EXP-04-11

  ERR-30    A split rule that was answered is answered again                            This rule was already answered.                                                                                               FR-EXP-05-09

  ERR-31    The payment partner is not available                                        Payments are not available now. Please try again later.                                                                       FR-EXP-08-09, FR-EXP-12-08

  ERR-32    A payment fails                                                             Your payment did not go through. No money was taken. Please try again.                                                        FR-EXP-08-08, FR-EXP-10-06, FR-EXP-12-08, FR-EXP-13-05

  ERR-33    An import file cannot be read                                               We could not read this file. Check that it follows the sample file and has up to 500 rows.                                    FR-EXP-15-02

  ERR-34    The AI service is not available                                             The AI assistant is not available now. You can enter the expense yourself.                                                    FR-EXP-11-10

  ERR-35    A scheduled date is not after today                                         Choose a date after today.                                                                                                    FR-EXP-10-02
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **When it shows**                                                            **Text**                                                                                                                                      **Feature**
  ----------- ---------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------- ----------------
  MSGT-01     An expense is saved                                                          Your expense was saved.                                                                                                                       EXP-01

  MSGT-02     A parent shares an expense or a payment                                      Once you share this, \[name\] can see it and you cannot make it private again.                                                                EXP-01, EXP-07

  MSGT-03     An item is shared                                                            Shared with \[name\].                                                                                                                         EXP-01, EXP-07

  MSGT-04     An expense or payment is voided                                              This entry was voided. It stays in the record.                                                                                                EXP-01, EXP-07

  MSGT-05     The co-parent joins a household with Solo Mode records                       Your earlier records stay private until you share them.                                                                                       EXP-01

  MSGT-06     A request is sent                                                            Your request was sent to \[name\].                                                                                                            EXP-03

  MSGT-07     A request arrives (alert)                                                    \[name\] sent you a reimbursement request for \[amount\]. Pay by \[date\].                                                                    EXP-03

  MSGT-08     The co-parent chooses Accept                                                 You are agreeing to pay \[amount\] to \[name\] by \[date\]. Please confirm.                                                                   EXP-03

  MSGT-09     A request is accepted (alert)                                                \[name\] agreed to pay \[amount\] by \[date\].                                                                                                EXP-03

  MSGT-10     A request is declined (alert)                                                \[name\] declined your request.                                                                                                               EXP-03

  MSGT-11     A request is withdrawn (alert)                                               \[name\] withdrew a reimbursement request.                                                                                                    EXP-03

  MSGT-12     The pay-by date has passed                                                   Overdue. The pay-by date was \[date\].                                                                                                        EXP-03

  MSGT-13     A payment is recorded on a request (alert)                                   \[name\] recorded a payment of \[amount\] on this request on \[date\].                                                                        EXP-03

  MSGT-14     The day before the pay-by date (reminder)                                    Reminder: a reimbursement of \[amount\] to \[name\] is due on \[date\].                                                                       EXP-03

  MSGT-15     A recorded child support payment is shown                                    This is your own record. The agency decides what counts.                                                                                      EXP-07

  MSGT-16     A parent chooses State agency payment page                                   Pay your child support on the state payment page: \[link\]. Then record your payment here.                                                    EXP-07

  MSGT-17     A child support payment is saved                                             Your payment was saved as Recorded by you.                                                                                                    EXP-07

  MSGT-18     A split rule is proposed (alert)                                             \[name\] entered a split rule from the court order. Please confirm it.                                                                        EXP-05

  MSGT-19     A split rule is entered                                                      ParentPath does not check this rule against your court order. Enter it as it is written in the order.                                         EXP-05

  MSGT-20     A rule is saved in a linked household                                        Your split rule was saved. It applies after \[name\] confirms it.                                                                             EXP-05

  MSGT-21     A rule is saved in Solo Mode                                                 Your split rule is on. It applies to expenses dated on or after \[date\].                                                                     EXP-05

  MSGT-22     A dispute is opened                                                          Your dispute was sent to \[name\]. The entry stays in the record.                                                                             EXP-09

  MSGT-23     A dispute is opened (alert)                                                  \[name\] disputed the expense \[description\].                                                                                                EXP-09

  MSGT-24     A dispute is closed                                                          This dispute was closed.                                                                                                                      EXP-09

  MSGT-25     The balance screen opens                                                     This balance comes from the requests you both agreed to in ParentPath. It is not a legal calculation and it does not include child support.   EXP-04

  MSGT-26     A payment changes status                                                     Your payment of \[amount\] to \[name\] is \[status\].                                                                                         EXP-08

  MSGT-27     A user turns on AI-assisted entry                                            The AI reads \[what it reads\]. It does not use your data for training. What it suggests is not saved in your record.                         EXP-11

  MSGT-28     A suggestion fills the form                                                  Check what the AI filled in before you save.                                                                                                  EXP-11

  MSGT-29     An import ends                                                               \[number\] expenses were added. \[number\] rows were skipped.                                                                                 EXP-15

  MSGT-30     A parent turns on credit building                                            \[Wording approved by legal and the payment partner.\]                                                                                        EXP-14

  MSGT-31     A repeating payment is stopped                                               Your repeating payment was stopped.                                                                                                           EXP-10

  MSGT-32     A split rule is confirmed (alert)                                            \[name\] confirmed your split rule.                                                                                                           EXP-05

  MSGT-33     A split rule is declined (alert)                                             \[name\] declined your split rule.                                                                                                            EXP-05

  MSGT-34     A scheduled payment is cancelled because the request is no longer Accepted   Your scheduled payment was cancelled because the request is no longer open.                                                                   EXP-10

  MSGT-35     The day before a scheduled payment (reminder)                                Reminder: your payment of \[amount\] to \[name\] runs on \[date\].                                                                            EXP-10
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

8.11 Dependencies

  -------------------------------------------------------------------------------------------
  **Module**                     **What it needs from Expenses and Payments**
  ------------------------------ ------------------------------------------------------------
  Child Support Sync             EXP-07.

  Records and Court              Expenses, requests and payments for the court-ready record

  Calendar and Parenting Time    The expense for a pet (CAL-11)
  -------------------------------------------------------------------------------------------

12.3 Assumptions

-   App counts come from the Feature Comparison workbook only. Cells marked not listed mean not listed on the pages reviewed (Pain Point workbook, Read Me).

8.12 End-to-end workflows and scenarios

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                                                                                                   **Module path**                       **Features / rules**
  -------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------- --------------------------------------
  WF-03          Choose Solo Mode, keep records; co-parent joins later; Solo records stay private until shared                                                                                     ACC → EXP/DOC/CAL/REC                 ACC-03, BR-01

  WF-10          Expense with receipt → share → reimbursement request → accept / decline / mark paid / withdraw                                                                                    EXP → DOC/BIL (storage) → NTF → REC   EXP-01--03, EXP-06, BR-14

  WF-11          Record child-support payment (private); later compared with agency record                                                                                                         EXP → CSS                             EXP-07, CSS-03, BR-17

  WF-13          Journal notes; data export (PDF/CSV, free); certified export with Record ID; public verification                                                                                  REC ← MSG/CAL/EXP/DOC/NTF/ACC         REC-01, REC-05, REC-07, BR-05, BR-20

  WF-20          Link a child-support case (state, details, one-time code, consent) → API/batch load → overview, comparison, hearings in calendar, reminders → share an item → unlink and export   CSS → ACC/EXP/CAL/NTF/REC             CSS-01--05, CSS-07, CSS-12, CSS-13
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Scenario**   **Scenario**                                                           **Expected behaviour**
  -------------- ---------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------
  SCN-EXP-001    Parent creates \$45.50 expense and attaches receipt                    Expense is Active/Shared; receipt is malware-scanned and retained; version history and audit entry are created.

  SCN-EXP-002    Parent requests \$30 reimbursement on a \$45.50 expense with receipt   Request is valid; co-parent is notified; request status lifecycle begins.

  SCN-EXP-003    Parent requests reimbursement without attaching required receipt       Request is blocked with ERR-20 until at least one file is attached.

  SCN-EXP-004    Parent tries to edit expense with an open reimbursement request        Edit/void refused with ERR-07; adding a file is still allowed.

  SCN-EXP-005    Parent records \$500 child-support payment                             Payment is Private, status Recorded by you; it is excluded from expense balance and reserved for future agency comparison.

  SCN-EXP-006    Parent voids a recorded support payment                                Payment remains visible as Voided, is never deleted, and is excluded from Child Support Sync.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Expense**

  ------------------------------------------------------------------------------------------------------------------------------
  **Meaning**                                                         **Transition**
  ------------------------------------------------------------------- ----------------------------------------------------------
  Valid expense included in totals                                    Created

  Incorrect or withdrawn expense; retained but excluded from totals   Creator voids

  Visibility state                                                    Private may become Shared; Shared cannot become Private.
  ------------------------------------------------------------------------------------------------------------------------------

**Reimbursement request**

  -----------------------------------------------------------------------
  **Status**                     **Meaning**
  ------------------------------ ----------------------------------------
  Pending                        Awaiting co-parent response

  Accepted                       Co-parent accepted

  Declined                       Co-parent declined

  Paid                           Marked paid

  Withdrawn                      Requester withdrew
  -----------------------------------------------------------------------

An expense with a non-withdrawn request cannot be edited or voided.

**Child-support payment**

  -----------------------------------------------------------------------------
  **Meaning**                                   **Owner**
  --------------------------------------------- -------------------------------
  Parent-recorded payment awaiting comparison   Expenses

  Agency record matches                         Child Support Sync

  No matching agency payment                    Child Support Sync

  Proof submitted                               Child Support Sync

  Agency credited payment                       Child Support Sync

  Excluded from comparison; retained            Expenses
  -----------------------------------------------------------------------------

EXP owns the payment record and initial status; CSS owns agency comparison statuses.
