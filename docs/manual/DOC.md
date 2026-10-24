# Children and Documents (DOC)


11.1 Module overview

  ----------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- ----------------------------------------------------------------------------------------------
  Purpose                 One place for the practical information about the child and the documents both parents need.

  Users                   Parent, co-parent, third parties (limited)

  Pain points addressed   None linked directly

  Features                7 (2 Must-have, 5 Good-to-have, 0 Unique)

  Depends on              Accounts and Onboarding (roles), Records and Court (exports), Safety and Privacy.
  ----------------------------------------------------------------------------------------------------------------------

-   Child information: medical, school and contacts.

-   Secure document and file storage.

-   Photo album, wish list, shared tasks and to-do lists, all later.

-   Expiring share links for files and an emergency contact who receives key notifications, both later.

Purpose and scope

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **How this module supports it**
  --------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  OBJ-01          Shared child information and shared documents are kept with their history and can be exported through Records and Court (DOC-01, DOC-02).

  OBJ-05          Address, phone and email entered by a user in Safety Mode are hidden from the other parent. Photos lose their location data. The emergency contact is not offered in Safety Mode (DOC-01, DOC-03, DOC-07).

  OBJ-06          The web app has the full feature set. Photos and files can be added from a phone browser (DOC-02, DOC-03).
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.3 In scope. The seven features DOC-01 to DOC-07 listed in section 5.

11.2 Roles and permissions

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**            **What they do in this module**
  ------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parent              Adds and archives children, adds child information entries, uploads documents, shares items with the co-parent, and manages everything in other features.

  Co-parent           Once linked, adds child information entries, uploads documents and uses the other features. Sees the child list. Cannot change a child record.

  Third party         Sees the child information sections that the parents choose, view only. Access comes with ACC-07 in. Also a person outside the app can open a document through a share link.

  Professional        Reads the child information and documents that a parent shares. Cannot post. Access comes with PRO-01.

  Emergency contact   A person a parent names. Has no account. Gets only the key notifications (DOC-07).1.

  Support staff       No feature in this module.2 gives them no access to household and children data or to documents.

  Child               No feature in this module. A child account is part of ACC-07.

  Agency staff        Not users of the app.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

11.3 Business requirements

  ----------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Business requirement**                                                                                       **Features**
  --------------- -------------------------------------------------------------------------------------------------------------- ---------------
  BREQ-01         Both parents can keep the practical information about each child in one place: medical, school and contacts.   DOC-01

  BREQ-02         Both parents can keep the documents they need in one secure place, with clear storage limits.                  DOC-02

  BREQ-03         Parents can keep a photo album and shared memories.                                                            DOC-03

  BREQ-04         Parents can keep a wish list for the needs of each child.                                                      DOC-04

  BREQ-05         Parents can share tasks and to-do lists.                                                                       DOC-05

  BREQ-06         A parent can share a file with a person outside the app, with a link that expires.                             DOC-06

  BREQ-07         A parent can name an emergency contact who receives key notifications.                                         DOC-07
  ----------------------------------------------------------------------------------------------------------------------------------------------

11.4 Features

  ---------------------------------------------------------------------------------------------------
  **Feature**   **Name**                                                **Type**
  ------------- ------------------------------------------------------- -----------------------------
  DOC-01        Child information storage (medical, school, contacts)   Must-have → Must-have

  DOC-02        Secure document and file storage                        Must-have → Must-have

  DOC-03        Photo album and shared memories                         Good-to-have → Good-to-have

  DOC-04        Wish list for the child\'s needs                        Good-to-have → Good-to-have

  DOC-05        Shared tasks and to-do lists                            Good-to-have → Good-to-have

  DOC-06        Expiring share links for files                          Good-to-have → Good-to-have

  DOC-07        Emergency contact assignment                            Good-to-have → Good-to-have
  ---------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**        **Screens**
  ------------------ -------------------- ------------------------------------------------------------------------------------------
  DOC-SUB-01         Children             Child list; add/edit child; archive child; child detail

  DOC-SUB-02         Child information    Medical entries; School entries; Contacts entries; entry detail; add/edit entry; history

  DOC-SUB-03         Documents            Document list; upload document; document detail; version history; storage usage

  DOC-SUB-04         Photo album          Album list; album detail; upload photo

  DOC-SUB-05         Wish list            Child-needs wish list

  DOC-SUB-06         Tasks                Shared task list

  DOC-SUB-07         Share links          Expiring file-share link creation/status

  DOC-SUB-08         Emergency contacts   Emergency-contact assignment
  ----------------------------------------------------------------------------------------------------------------------------------

11.5 Screen inventory

  -----------------------------------------------------------------------------------------
  **Screen ID**   **Screen**                                               **Feature**
  --------------- -------------------------------------------------------- ----------------
  DOC-SCR-01      Children list and child form                             DOC-01

  DOC-SCR-02      Child information by child and section, with filters     DOC-01

  DOC-SCR-03      Child information entry form                             DOC-01

  DOC-SCR-04      Entry detail and version history                         DOC-01

  DOC-SCR-05      Documents list, with storage used and filters            DOC-02

  DOC-SCR-06      Upload a document                                        DOC-02

  DOC-SCR-07      Document detail, versions and history                    DOC-02

  DOC-SCR-08      Recently deleted                                         DOC-02, DOC-03

  DOC-SCR-09      Photo albums                                             DOC-03

  DOC-SCR-10      Wish list                                                DOC-04

  DOC-SCR-11      Task lists                                               DOC-05

  DOC-SCR-12      Share links: create and list                             DOC-06

  DOC-SCR-13      Public share link page                                   DOC-06

  DOC-SCR-14      Emergency contacts                                       DOC-07

  DOC-SCR-15      Public page where an emergency contact agrees or stops   DOC-07
  -----------------------------------------------------------------------------------------

11.6 Screen specifications

DOC-SCR-01 --- Children list and child form

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-01
  -------------------------------------------------------------------------

![Figure DOC-SCR-01 --- Children list and child form](media/b9d00bef0351f418802d4e6a78a549653b723d5f.png "Figure DOC-SCR-01 — Children list and child form"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-01 --- Children list and child form*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Children; ACC-SCR-19 Home; ACC-SCR-B01 Household overview; CAL-SCR-14 Pets; DOC-SCR-02 Child information; DOC-SCR-11 Task lists; DOC-SCR-14 Emergency contacts
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   CAL-SCR-14 Pets; DOC-SCR-02 Child information; DOC-SCR-11 Task lists; DOC-SCR-14 Emergency contacts; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------------------------------
  **Purpose**    Display all children in the household and provide access to child information.
  -------------- --------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Children List\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Status (P-DOC-001-05).

-   Input area (form fields, in specification order): First name (P-DOC-001-02); Age (P-DOC-001-03); Date of birth (P-DOC-001-04).

-   Action area (primary action first, then secondary actions and links): Child list (P-DOC-001-01); Add child (P-DOC-001-06); Edit child (P-DOC-001-07); View information (P-DOC-001-08).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**            **Required**   **Editable**   **Default**   **Allowed values / validation**     **Error**                  **Visibility**       **Saved to**          **Behavior**
  ------------------ ------------------------- ------------------- -------------- -------------- ------------- ----------------------------------- -------------------------- -------------------- --------------------- -----------------------------------------------
  P-DOC-001-01       Child list                Card / table list   ---            ---            ---           Maximum 10 children per household   Load error with retry      Parent / Co-parent   ---                   Displays children

  P-DOC-001-02       First name                Text                System         No             Derived       1--60 characters                    ---                        Parent / Co-parent   Child.first_name      Opens child detail

  P-DOC-001-03       Age                       Calculated text     System         No             Derived       Calculated from date of birth       ---                        Parent / Co-parent   Calculated            Display only

  P-DOC-001-04       Date of birth             Date                System         No             Derived       Not future                          ---                        Parent / Co-parent   Child.date_of_birth   Display only

  P-DOC-001-05       Status                    Badge               System         No             Active        Active; Archived                    ---                        Parent / Co-parent   Child.status          Display only

  P-DOC-001-06       Add child                 Primary button      ---            ---            ---           Disabled at 10 children             ERR-04 at eleventh child   Parent               ---                   Opens DOC-SCR-01 Children list and child form

  P-DOC-001-07       Edit child                Row action          ---            ---            ---           Parent only                         ---                        Parent               ---                   Opens DOC-SCR-01 Children list and child form

  P-DOC-001-08       View information          Row action          ---            ---            ---           ---                                 ---                        Parent / Co-parent   ---                   Opens DOC-SCR-02 Child information
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ------------------------------------------------------
  Empty                     "No children added"; Add child action

  Loading                   Child-list skeleton

  Error                     Load failure and retry

  Success                   Children displayed; add action available below limit
  --------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Create or edit a child record.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Add / Edit Child\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Household (P-DOC-002-03).

-   Input area (form fields, in specification order): First name (P-DOC-002-01); Date of birth (P-DOC-002-02).

-   Action area (primary action first, then secondary actions and links): Save (P-DOC-002-04); Cancel (P-DOC-002-05); Archive (P-DOC-002-06).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**              **Allowed values / validation**         **Error**                      **Visibility**   **Saved to**              **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------------------ --------------------------------------- ------------------------------ ---------------- ------------------------- ---------------------------------
  P-DOC-002-01       First name                Text input           Yes            Yes            Blank or current value   1--60 characters                        ERR-01 empty; ERR-02 over 60   Parent           Child.first_name          Required

  P-DOC-002-02       Date of birth             Date picker          Yes            Yes            Blank or current value   Today or earlier                        ERR-03 future date             Parent           Child.date_of_birth       Required

  P-DOC-002-03       Household                 System               Yes            No             Current household        Household reference                     ---                            Internal         Child.household_id        Set automatically

  P-DOC-002-04       Save                      Primary button       ---            ---            ---                      ---                                     ---                            Parent           Child/version             Creates or updates child

  P-DOC-002-05       Cancel                    Secondary button     ---            ---            ---                      ---                                     ---                            Parent           ---                       Discards changes

  P-DOC-002-06       Archive                   Destructive button   Conditional    ---            ---                      Edit mode only; confirmation required   Inline field message           Parent           Child.status = Archived   Archives child; retains history
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                   **Behavior**
  --------------------------- -------------------------------------------
  Empty                       Blank create form

  Loading                     Save disabled

  Error                       Validation or save failure

  Success                     Child saved; return to Children List
  -----------------------------------------------------------------------

Specification

  ----------------------------------------------------------------------------
  **Purpose**    Show one child's details and related information/documents.
  -------------- -------------------------------------------------------------

  ----------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Child Detail\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Child name (P-DOC-003-01); Date of birth / age (P-DOC-003-02); Status (P-DOC-003-03); Related documents (P-DOC-003-05).

-   Action area (primary action first, then secondary actions and links): Information tabs (P-DOC-003-04); Add information (P-DOC-003-06); Edit child (P-DOC-003-07); Upload document (P-DOC-003-08).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**   **Allowed values / validation**   **Error**    **Visibility**       **Saved to**          **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- ------------- --------------------------------- ------------ -------------------- --------------------- -----------------------------------------------------------
  P-DOC-003-01       Child name                Page title       System         No             Derived       Child first name                  ---          Parent / Co-parent   Child.first_name      Display only

  P-DOC-003-02       Date of birth / age       Read-only text   System         No             Derived       Valid date and calculated age     ---          Parent / Co-parent   Child.date_of_birth   Display only

  P-DOC-003-03       Status                    Badge            System         No             Derived       Active; Archived                  ---          Parent / Co-parent   Child.status          Display only

  P-DOC-003-04       Information tabs          Tab navigation   ---            ---            Medical       Medical; School; Contacts         ---          Parent / Co-parent   View state            Filters information entries

  P-DOC-003-05       Related documents         Document list    System         No             Derived       Documents linked to child         Load error   Permission-based     Document.child_ids    Opens document detail

  P-DOC-003-06       Add information           Primary button   ---            ---            ---           ---                               ---          Parent / Co-parent   ---                   Opens DOC-SCR-03 Child information entry form

  P-DOC-003-07       Edit child                Button           ---            ---            ---           Parent only                       ---          Parent               ---                   Opens DOC-SCR-01 Children list and child form

  P-DOC-003-08       Upload document           Button           ---            ---            ---           ---                               ---          Parent / Co-parent   ---                   Opens DOC-SCR-06 Upload a document with child preselected
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -----------------------------------------------------
  Empty                    No information/documents; add actions emphasized

  Loading                  Detail skeleton

  Error                    Not found or load failure

  Success                  Child details, information, and documents displayed
  ------------------------------------------------------------------------------

DOC-SCR-02 --- Child information

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-01
  -------------------------------------------------------------------------

![Figure DOC-SCR-02 --- Child information](media/3e43a13ceb46630fe9f99e712cb3e74d0b0cd342.png "Figure DOC-SCR-02 — Child information"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-02 --- Child information*

**Navigation**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-01 Children list and child form; DOC-SCR-03 Child information entry form; DOC-SCR-04 Entry detail and history; DOC-SCR-10 Wish list
  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   DOC-SCR-01 Children list and child form; DOC-SCR-03 Child information entry form; DOC-SCR-04 Entry detail and history; DOC-SCR-06 Upload a document; DOC-SCR-07 Document detail and versions; DOC-SCR-10 Wish list; Main menu: any module

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------------------------
  **Purpose**    Show medical, school, and contact information for one child or all children.
  -------------- ------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Child Information List\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Entry type (P-DOC-004-05); Child (P-DOC-004-06); Visibility (P-DOC-004-07); Status (P-DOC-004-08).

-   Input area (form fields, in specification order): Child filter (P-DOC-004-02); Title (P-DOC-004-04).

-   Action area (primary action first, then secondary actions and links): Section tabs (P-DOC-004-01); Information list (P-DOC-004-03); Add information (P-DOC-004-09).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**            **Required**   **Editable**   **Default**         **Allowed values / validation**                                                                                                                                                                                             **Error**               **Visibility**       **Saved to**                  **Behavior**
  ------------------ ------------------------- ------------------- -------------- -------------- ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------- -------------------- ----------------------------- -----------------------------------------------
  P-DOC-004-01       Section tabs              Tabs                Yes            Yes            Medical             Medical; School; Contacts                                                                                                                                                                                                   ---                     Parent / Co-parent   View state                    Filters entries

  P-DOC-004-02       Child filter              Select              No             Yes            All children        One child or All children                                                                                                                                                                                                   ---                     Parent / Co-parent   View state                    Filters entries

  P-DOC-004-03       Information list          Table / card list   ---            ---            ---                 Entries for selected section/child                                                                                                                                                                                          Load error with retry   Permission-based     ---                           Displays entries

  P-DOC-004-04       Title                     Text                System         No             Derived             1--100 characters                                                                                                                                                                                                           ---                     Permission-based     InformationEntry.title        Opens detail

  P-DOC-004-05       Entry type                Badge               System         No             Derived             Medical: Allergy, Medication, Condition, Doctor or clinic, Insurance, Immunization, Other · School: School, Teacher, Class schedule, Bus or pick-up, Other · Contacts: Emergency contact, Family member, Caregiver, Other   ---                     Permission-based     InformationEntry.entry_type   Display only

  P-DOC-004-06       Child                     Badge               System         No             Derived             Child name or All children                                                                                                                                                                                                  ---                     Permission-based     InformationEntry.child_id     Display only

  P-DOC-004-07       Visibility                Badge               System         No             Shared or Private   Shared; Private                                                                                                                                                                                                             ---                     Permission-based     InformationEntry.visibility   Display only

  P-DOC-004-08       Status                    Badge               System         No             Active              Active; Archived                                                                                                                                                                                                            ---                     Permission-based     InformationEntry.status       Display only

  P-DOC-004-09       Add information           Primary button      ---            ---            ---                 ---                                                                                                                                                                                                                         ---                     Parent / Co-parent   ---                           Opens DOC-SCR-03 Child information entry form
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ---------------------------------------------------------------
  Empty                     No entries for selected section/child; Add information action

  Loading                   List skeleton

  Error                     Load failure and retry

  Success                   Filtered information entries displayed
  -----------------------------------------------------------------------------------------

DOC-SCR-03 --- Child information entry form

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-01
  -------------------------------------------------------------------------

![Figure DOC-SCR-03 --- Child information entry form](media/cc9e3ebdfc9940a34fd6b85827803835b4ba2544.png "Figure DOC-SCR-03 — Child information entry form"){width="6.666666666666667in" height="6.40625in"}

*Figure DOC-SCR-03 --- Child information entry form*

**Navigation**

  -------------------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-02 Child information; DOC-SCR-04 Entry detail and history
  ----------------------- -------------------------------------------------------------------
  **Where you go next**   DOC-SCR-02 Child information; Main menu: any module

  -------------------------------------------------------------------------------------------

Specification

  --------------------------------------------------------------------------------
  **Purpose**    Create or edit a medical, school, or contact information entry.
  -------------- -----------------------------------------------------------------

  --------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Add / Edit Child Information\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Section (P-DOC-006-01); Entry type (P-DOC-006-02); Child (P-DOC-006-03); Title (P-DOC-006-04); Details (P-DOC-006-05); Contact name (P-DOC-006-06); Contact email (P-DOC-006-07); Contact phone (P-DOC-006-08); Address (P-DOC-006-09); Linked documents (P-DOC-006-10); Visibility (P-DOC-006-11).

-   Action area (primary action first, then secondary actions and links): Save (P-DOC-006-12); Cancel (P-DOC-006-13).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**          **Default**                         **Allowed values / validation**                                                                                                                                                                                             **Error**              **Visibility**       **Saved to**               **Behavior**
  ------------------ ------------------------- ------------------ -------------- --------------------- ----------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------- -------------------- -------------------------- -------------------------------
  P-DOC-006-01       Section                   Select             Yes            No after creation     Medical or prefill                  Medical; School; Contacts                                                                                                                                                                                                   Inline field message   Parent / Co-parent   InformationEntry.section   Determines entry-type options

  P-DOC-006-02       Entry type                Select             Yes            No after creation     Blank                               Medical: Allergy, Medication, Condition, Doctor or clinic, Insurance, Immunization, Other · School: School, Teacher, Class schedule, Bus or pick-up, Other · Contacts: Emergency contact, Family member, Caregiver, Other   Inline field message   Parent / Co-parent   entry_type                 Required

  P-DOC-006-03       Child                     Select             Yes            Yes                   Current child or All children       One child or All children                                                                                                                                                                                                   Inline field message   Parent / Co-parent   child_id                   Required

  P-DOC-006-04       Title                     Text input         Yes            Yes                   Blank or current value              1--100 characters                                                                                                                                                                                                           ERR-01 / ERR-05        Parent / Co-parent   title                      Required

  P-DOC-006-05       Details                   Textarea           Conditional    Yes                   Blank or current value              ≤2,000 characters                                                                                                                                                                                                           ERR-06                 Parent / Co-parent   details                    Conditional by entry type

  P-DOC-006-06       Contact name              Text input         Conditional    Yes                   Blank or current value              ≤100 characters                                                                                                                                                                                                             Inline field message   Parent / Co-parent   Contact name               Contacts entries

  P-DOC-006-07       Contact email             Email input        Conditional    Yes                   Blank or current value              Valid email; ≤254 characters                                                                                                                                                                                                ERR-08                 Parent / Co-parent   Contact email              Contacts entries

  P-DOC-006-08       Contact phone             Phone input        Conditional    Yes                   Blank or current value              Valid phone                                                                                                                                                                                                                 ERR-07                 Parent / Co-parent   Contact phone              Contacts entries

  P-DOC-006-09       Address                   Textarea           Conditional    Yes                   Blank or current value              ≤200 characters                                                                                                                                                                                                             Inline field message   Parent / Co-parent   Address                    Contacts entries

  P-DOC-006-10       Linked documents          Multi-select       No             Yes                   None or current value               Maximum 5 documents                                                                                                                                                                                                         ERR-23                 Parent / Co-parent   document_ids               Optional

  P-DOC-006-11       Visibility                Toggle / radio     Yes            Private→Shared only   Shared in Linked; Private in Solo   Shared; Private                                                                                                                                                                                                             ---                    Parent / Co-parent   visibility                 Solo Mode forces Private

  P-DOC-006-12       Save                      Primary button     ---            ---                   ---                                 ---                                                                                                                                                                                                                         ---                    Parent / Co-parent   Entry/version              Creates or updates entry

  P-DOC-006-13       Cancel                    Secondary button   ---            ---                   ---                                 ---                                                                                                                                                                                                                         ---                    Parent / Co-parent   ---                        Discards changes
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- -----------------------------------------------
  Empty                     Blank form; section controls available fields

  Loading                   Save disabled

  Error                     Validation or save failure: ERR-09

  Success                   Entry saved; return to list/detail
  -------------------------------------------------------------------------

DOC-SCR-04 --- Entry detail and history

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-01
  -------------------------------------------------------------------------

![Figure DOC-SCR-04 --- Entry detail and history](media/22389e81d6e86e8dbc553abf2efe9a4d95021714.png "Figure DOC-SCR-04 — Entry detail and history"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-04 --- Entry detail and history*

**Navigation**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-02 Child information
  ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   DOC-SCR-02 Child information; DOC-SCR-03 Child information entry form; DOC-SCR-07 Document detail and versions; Main menu: any module

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------------------------------
  **Purpose**    View one information entry, its documents, version history, and permitted actions.
  -------------- ------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Child Information Detail\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Section (P-DOC-005-01); Entry type (P-DOC-005-02); Title (P-DOC-005-04); Details (P-DOC-005-05); Contact fields (P-DOC-005-06); Linked documents (P-DOC-005-07); Visibility (P-DOC-005-08); Status (P-DOC-005-09).

-   Input area (form fields, in specification order): Child (P-DOC-005-03); Version history (P-DOC-005-13).

-   Action area (primary action first, then secondary actions and links): Edit (P-DOC-005-10); Share (P-DOC-005-11); Archive / Restore (P-DOC-005-12).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                         **Required**   **Editable**   **Default**         **Allowed values / validation**                                                                                                                                                                                             **Error**                  **Visibility**     **Saved to**               **Behavior**
  ------------------ ------------------------- -------------------------------- -------------- -------------- ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------------------------- ------------------ -------------------------- -----------------------------------------------
  P-DOC-005-01       Section                   Badge                            System         No             Entry value         Medical; School; Contacts                                                                                                                                                                                                   ---                        Permission-based   InformationEntry.section   Display only

  P-DOC-005-02       Entry type                Badge                            System         No             Entry value         Medical: Allergy, Medication, Condition, Doctor or clinic, Insurance, Immunization, Other · School: School, Teacher, Class schedule, Bus or pick-up, Other · Contacts: Emergency contact, Family member, Caregiver, Other   ---                        Permission-based   entry_type                 Display only

  P-DOC-005-03       Child                     Text                             System         No             Entry value         Child name or All children                                                                                                                                                                                                  ---                        Permission-based   child_id                   Display only

  P-DOC-005-04       Title                     Read-only text                   Yes            Creator        Entry value         1--100 characters                                                                                                                                                                                                           ---                        Permission-based   title                      Display only

  P-DOC-005-05       Details                   Read-only text                   Conditional    Creator        Entry value         ≤2,000 characters                                                                                                                                                                                                           ---                        Permission-based   details                    Display only

  P-DOC-005-06       Contact fields            Read-only fields                 Conditional    Creator        Entry values        Name ≤100; email valid ≤254; phone valid; address ≤200                                                                                                                                                                      ---                        Permission-based   Contact fields             Display only

  P-DOC-005-07       Linked documents          File list                        No             Creator        Entry value         Maximum 5 documents                                                                                                                                                                                                         ERR-23                     Permission-based   document_ids               Opens document detail

  P-DOC-005-08       Visibility                Badge                            System         No             Shared or Private   Shared; Private                                                                                                                                                                                                             ---                        Permission-based   visibility                 Display only

  P-DOC-005-09       Status                    Badge                            System         No             Active              Active; Archived                                                                                                                                                                                                            ---                        Permission-based   status                     Display only

  P-DOC-005-10       Edit                      Primary button                   ---            ---            ---                 Creator only; Active entry                                                                                                                                                                                                  ERR-11 archived            Creator            Entry version              Opens DOC-SCR-03 Child information entry form

  P-DOC-005-11       Share                     Button                           ---            ---            ---                 Private entry; Linked household; confirmation required                                                                                                                                                                      ---                        Creator            visibility = Shared        Shares entry permanently

  P-DOC-005-12       Archive / Restore         Destructive / secondary button   ---            ---            ---                 Creator only                                                                                                                                                                                                                ERR-11 for archived edit   Creator            status                     Archives or restores entry

  P-DOC-005-13       Version history           Timeline                         System         No             Derived             All versions retained                                                                                                                                                                                                       Load error                 Permission-based   Version history            Display only
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -------------------------------------------------
  Empty                    Not applicable; opens only for existing entry

  Loading                  Detail skeleton

  Error                    Not found, permission denied, or action failure

  Success                  Entry, documents, and history displayed
  --------------------------------------------------------------------------

DOC-SCR-05 --- Documents list

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-02
  -------------------------------------------------------------------------

![Figure DOC-SCR-05 --- Documents list](media/4e4f30325e77541b1cecaceab4ea6024a41b9c19.png "Figure DOC-SCR-05 — Documents list"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-05 --- Documents list*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Documents; DOC-SCR-06 Upload a document; DOC-SCR-07 Document detail and versions; DOC-SCR-08 Recently deleted; DOC-SCR-09 Photo albums
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   DOC-SCR-06 Upload a document; DOC-SCR-07 Document detail and versions; DOC-SCR-08 Recently deleted; DOC-SCR-09 Photo albums; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  ----------------------------------------------------------------------------
  **Purpose**    Display household documents with filters and upload access.
  -------------- -------------------------------------------------------------

  ----------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Document Library\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Category (P-DOC-007-03); Children (P-DOC-007-04); Uploaded at (P-DOC-007-06); Visibility (P-DOC-007-07); Status (P-DOC-007-08); Storage usage (P-DOC-007-12).

-   Input area (form fields, in specification order): Title (P-DOC-007-02); Uploaded by (P-DOC-007-05); Category filter (P-DOC-007-09); Child filter (P-DOC-007-10).

-   Action area (primary action first, then secondary actions and links): Document list (P-DOC-007-01); Upload document (P-DOC-007-11).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                **Required**   **Editable**   **Default**         **Allowed values / validation**                     **Error**               **Visibility**       **Saved to**                  **Behavior**
  ------------------ ------------------------- ----------------------- -------------- -------------- ------------------- --------------------------------------------------- ----------------------- -------------------- ----------------------------- ------------------------------------
  P-DOC-007-01       Document list             Table / card list       ---            ---            ---                 Documents visible to user                           Load error with retry   Permission-based     ---                           Displays documents

  P-DOC-007-02       Title                     Text                    System         No             Derived             1--100 characters                                   ---                     Permission-based     Document.title                Opens detail

  P-DOC-007-03       Category                  Badge                   System         No             Derived             Court or legal; Medical; School; Insurance; Other   ---                     Permission-based     Document.category             Display only

  P-DOC-007-04       Children                  Chip list               System         No             Derived             Linked children                                     ---                     Permission-based     Document.child_ids            Display only

  P-DOC-007-05       Uploaded by               Text                    System         No             Derived             Contributor name                                    ---                     Permission-based     Document.created_by_user_id   Display only

  P-DOC-007-06       Uploaded at               Timestamp               System         No             Derived             UTC storage; local display                          ---                     Permission-based     Document.created_at           Display only

  P-DOC-007-07       Visibility                Badge                   System         No             Shared or Private   Shared; Private                                     ---                     Permission-based     Document.visibility           Display only

  P-DOC-007-08       Status                    Badge                   System         No             Active              Active; Archived; Recently Deleted                  ---                     Permission-based     Document.status               Display only

  P-DOC-007-09       Category filter           Select / multi-select   No             Yes            All                 Court or legal; Medical; School; Insurance; Other   ---                     Parent / Co-parent   View state                    Filters list

  P-DOC-007-10       Child filter              Select / multi-select   No             Yes            All                 Household children                                  ---                     Parent / Co-parent   View state                    Filters list

  P-DOC-007-11       Upload document           Primary button          ---            ---            ---                 ---                                                 ---                     Parent / Co-parent   ---                           Opens DOC-SCR-06 Upload a document

  P-DOC-007-12       Storage usage             Progress display        System         No             Calculated          Household storage used / limit                      ---                     Parent / Co-parent   Calculated                    Warns at 80%
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ------------------------------------------------
  Empty                     No documents; Upload document action

  Loading                   Library skeleton

  Error                     Load failure and retry

  Success                   Filtered documents and storage usage displayed
  --------------------------------------------------------------------------

DOC-SCR-06 --- Upload a document

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-02
  -------------------------------------------------------------------------

![Figure DOC-SCR-06 --- Upload a document](media/b88f5687f95667f3f9e96c818a2ac2d58812df27.png "Figure DOC-SCR-06 — Upload a document"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-06 --- Upload a document*

**Navigation**

  ---------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-02 Child information; DOC-SCR-05 Documents list
  ----------------------- ---------------------------------------------------------
  **Where you go next**   DOC-SCR-05 Documents list; Main menu: any module

  ---------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Upload a document or capture a photo.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Upload Document\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Choose file (P-DOC-008-01); Title (P-DOC-008-03); Category (P-DOC-008-04); Children (P-DOC-008-05); Visibility (P-DOC-008-06).

-   Action area (primary action first, then secondary actions and links): Take photo (P-DOC-008-02); Upload (P-DOC-008-07); Cancel (P-DOC-008-08).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**          **Default**                         **Allowed values / validation**                     **Error**                                             **Visibility**                     **Saved to**          **Behavior**
  ------------------ ------------------------- ------------------ -------------- --------------------- ----------------------------------- --------------------------------------------------- ----------------------------------------------------- ---------------------------------- --------------------- --------------------------
  P-DOC-008-01       Choose file               File input         Conditional    Yes                   None                                PDF, DOCX, JPG, PNG; ≤25 MB                         ERR-12 type; ERR-13 size                              Parent / Co-parent                 DocumentFile          Opens file picker

  P-DOC-008-02       Take photo                Camera button      Conditional    Yes                   None                                Mobile camera capture; file-picker fallback         Inline field message                                  Parent / Co-parent on mobile web   DocumentFile          Captures image

  P-DOC-008-03       Title                     Text input         Yes            Yes                   File name                           1--100 characters                                   ERR-01 / ERR-05                                       Parent / Co-parent                 Document.title        Required

  P-DOC-008-04       Category                  Select             Yes            Yes                   Blank                               Court or legal; Medical; School; Insurance; Other   Inline field message                                  Parent / Co-parent                 Document.category     Required

  P-DOC-008-05       Children                  Multi-select       No             Yes                   Prefilled child or none             Household children                                  ---                                                   Parent / Co-parent                 Document.child_ids    Optional

  P-DOC-008-06       Visibility                Toggle / radio     Yes            Private→Shared only   Shared in Linked; Private in Solo   Shared; Private                                     ---                                                   Parent / Co-parent                 Document.visibility   Solo Mode forces Private

  P-DOC-008-07       Upload                    Primary button     ---            ---                   ---                                 Malware scan before save                            ERR-14 malware; ERR-15 storage; ERR-09 save failure   Parent / Co-parent                 Document/version      Saves document

  P-DOC-008-08       Cancel                    Secondary button   ---            ---                   ---                                 ---                                                 ---                                                   Parent / Co-parent                 ---                   Discards upload
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -----------------------------------------------
  Empty                    No file selected; Upload disabled

  Loading                  Upload/scan progress

  Error                    Type, size, malware, storage, or save failure

  Success                  Document saved; return to library/detail
  ------------------------------------------------------------------------

DOC-SCR-07 --- Document detail and versions

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-02
  -------------------------------------------------------------------------

![Figure DOC-SCR-07 --- Document detail and versions](media/a73010ae0368f206e22e86fe375ee3944d1dfc40.png "Figure DOC-SCR-07 — Document detail and versions"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-07 --- Document detail and versions*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-02 Child information; DOC-SCR-04 Entry detail and history; DOC-SCR-05 Documents list; DOC-SCR-12 Share links; PRO-SCR-04 Share an item with a professional
  ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   DOC-SCR-05 Documents list; DOC-SCR-12 Share links; PRO-SCR-04 Share an item with a professional; Main menu: any module

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------------------
  **Purpose**    View one document, manage versions, and perform permitted actions.
  -------------- --------------------------------------------------------------------

  -----------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Document Detail\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Title (P-DOC-009-01); Category (P-DOC-009-02); Children (P-DOC-009-03); File preview (P-DOC-009-04); Uploaded at (P-DOC-009-06); Visibility (P-DOC-009-07); Status (P-DOC-009-08).

-   Input area (form fields, in specification order): Uploaded by (P-DOC-009-05).

-   Action area (primary action first, then secondary actions and links): Add version (P-DOC-009-09); Share (P-DOC-009-10); Archive (P-DOC-009-11); Delete (P-DOC-009-12); Version history (P-DOC-009-13).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                        **Required**   **Editable**   **Default**         **Allowed values / validation**                             **Error**                          **Visibility**     **Saved to**                **Behavior**
  ------------------ ------------------------- ------------------------------- -------------- -------------- ------------------- ----------------------------------------------------------- ---------------------------------- ------------------ --------------------------- -----------------------------------------------
  P-DOC-009-01       Title                     Read-only text                  Yes            Creator        Document title      1--100 characters                                           ---                                Permission-based   Document.title              Display only

  P-DOC-009-02       Category                  Badge                           System         No             Document value      Court or legal; Medical; School; Insurance; Other           ---                                Permission-based   category                    Display only

  P-DOC-009-03       Children                  Chip list                       System         No             Document value      Household children                                          ---                                Permission-based   child_ids                   Display only

  P-DOC-009-04       File preview              Image / PDF / document viewer   System         No             Current version     Supported file preview                                      Load error                         Permission-based   Current file                View/download

  P-DOC-009-05       Uploaded by               Text                            System         No             Contributor         User display name                                           ---                                Permission-based   created_by_user_id          Display only

  P-DOC-009-06       Uploaded at               Timestamp                       System         No             Upload time         UTC storage; local display                                  ---                                Permission-based   created_at                  Display only

  P-DOC-009-07       Visibility                Badge                           System         No             Shared or Private   Shared; Private                                             ---                                Permission-based   visibility                  Display only

  P-DOC-009-08       Status                    Badge                           System         No             Active              Active; Archived; Recently Deleted                          ---                                Permission-based   status                      Display only

  P-DOC-009-09       Add version               Primary button                  ---            ---            ---                 Creator; file input                                         Type/size/malware/storage errors   Creator            New document version        Uploads replacement/supplement

  P-DOC-009-10       Share                     Button                          ---            ---            ---                 Private document; Linked household; confirmation required   ---                                Creator            visibility = Shared         Shares document permanently

  P-DOC-009-11       Archive                   Destructive button              ---            ---            ---                 Shared document; creator; confirmation required             ERR-16 for shared delete attempt   Creator            status = Archived           Archives document

  P-DOC-009-12       Delete                    Destructive button              ---            ---            ---                 Private document; creator; confirmation required            ERR-16 for shared delete attempt   Creator            status = Recently Deleted   Moves to Recently Deleted for 30 days

  P-DOC-009-13       Version history           Link                            ---            ---            ---                 ---                                                         ---                                Permission-based   ---                         Opens DOC-SCR-07 Document detail and versions
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ --------------------------------------------------
  Empty                    Not applicable; opens only for existing document

  Loading                  Detail skeleton

  Error                    Not found, permission denied, or action failure

  Success                  Document, metadata, and actions displayed
  ---------------------------------------------------------------------------

Specification

  ----------------------------------------------------------------------------------
  **Purpose**    Show every version of a document and allow access to prior files.
  -------------- -------------------------------------------------------------------

  ----------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Document Version History\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Version number (P-DOC-010-02); Added at (P-DOC-010-04); Current version indicator (P-DOC-010-06).

-   Input area (form fields, in specification order): Contributor (P-DOC-010-03).

-   Action area (primary action first, then secondary actions and links): Version list (P-DOC-010-01); File preview / download (P-DOC-010-05); Back (P-DOC-010-07).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**     **Type**           **Required**   **Editable**   **Default**    **Allowed values / validation**   **Error**               **Visibility**     **Saved to**                 **Behavior**
  ------------------ --------------------------- ------------------ -------------- -------------- -------------- --------------------------------- ----------------------- ------------------ ---------------------------- -------------------------------
  P-DOC-010-01       Version list                Timeline / table   ---            ---            ---            All versions retained             Load error with retry   Permission-based   ---                          Displays versions

  P-DOC-010-02       Version number              Badge              System         No             Derived        Incrementing integer              ---                     Permission-based   DocumentVersion.version_no   Display only

  P-DOC-010-03       Contributor                 Text               System         No             Derived        User display name                 ---                     Permission-based   contributor_user_id          Display only

  P-DOC-010-04       Added at                    Timestamp          System         No             Version time   UTC storage; local display        ---                     Permission-based   added_at                     Display only

  P-DOC-010-05       File preview / download     Button / link      System         No             Version file   Supported file type               Load error              Permission-based   Version file                 Opens/downloads prior version

  P-DOC-010-06       Current version indicator   Badge              System         No             Derived        Current / prior                   ---                     Permission-based   Version status               Display only

  P-DOC-010-07       Back                        Button / link      ---            ---            ---            ---                               ---                     User               ---                          Returns to document detail
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ---------------------------------------------------------
  Empty                     Not applicable; every document has at least one version

  Loading                   History skeleton

  Error                     Load failure and retry

  Success                   Complete version history displayed
  -----------------------------------------------------------------------------------

DOC-SCR-08 --- Recently deleted

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-08
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-02, DOC-03
  -------------------------------------------------------------------------

![Figure DOC-SCR-08 --- Recently deleted](media/bee13cd74636ec0398d1d7ca9f8845a29bc3dc29.png "Figure DOC-SCR-08 — Recently deleted"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-08 --- Recently deleted*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-05 Documents list
  ----------------------- --------------------------------------------------------
  **Where you go next**   DOC-SCR-05 Documents list; Main menu: any module

  --------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------
  **Purpose**    Allow restoration of a private document within 30 days.
  -------------- ---------------------------------------------------------

  ------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Recently Deleted Documents\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Deleted at (P-DOC-011-03); Restore deadline (P-DOC-011-04).

-   Input area (form fields, in specification order): Title (P-DOC-011-02).

-   Action area (primary action first, then secondary actions and links): Deleted document list (P-DOC-011-01); Restore (P-DOC-011-05); Permanently delete (P-DOC-011-06).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**            **Allowed values / validation**                       **Error**               **Visibility**   **Saved to**      **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ---------------------- ----------------------------------------------------- ----------------------- ---------------- ----------------- -------------------------------------
  P-DOC-011-01       Deleted document list     Table / card list    ---            ---            ---                    Private documents deleted by creator                  Load error with retry   Creator          ---               Displays deleted items

  P-DOC-011-02       Title                     Text                 System         No             Derived                Document title                                        ---                     Creator          Document.title    Display only

  P-DOC-011-03       Deleted at                Timestamp            System         No             Delete time            UTC storage; local display                            ---                     Creator          deleted_at        Display only

  P-DOC-011-04       Restore deadline          Timestamp            System         No             Deleted at + 30 days   UTC storage; local display                            ---                     Creator          Calculated        Display only

  P-DOC-011-05       Restore                   Primary button       ---            ---            ---                    Available before deadline                             Inline field message    Creator          status = Active   Restores document

  P-DOC-011-06       Permanently delete        Destructive button   ---            ---            ---                    Confirmation required; deletes the item permanently   Inline field message    Creator          Deletion record   Permanently removes where permitted
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- ---------------------------------------------------
  Empty                      No recently deleted documents

  Loading                    List skeleton

  Error                      Load failure and retry

  Success                    Deleted documents and restore deadlines displayed
  ------------------------------------------------------------------------------

DOC-SCR-09 --- Photo albums

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-09
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-03
  -------------------------------------------------------------------------

![Figure DOC-SCR-09 --- Photo albums](media/cd18f485786a29263335660c33ca0f238a349f46.png "Figure DOC-SCR-09 — Photo albums"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-09 --- Photo albums*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-05 Documents list
  ----------------------- --------------------------------------------------------
  **Where you go next**   DOC-SCR-05 Documents list; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

DOC-SCR-10 --- Wish list

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-10
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-04
  -------------------------------------------------------------------------

![Figure DOC-SCR-10 --- Wish list](media/e3556cab38d12b36dc2e5acadb4f00697d9207e9.png "Figure DOC-SCR-10 — Wish list"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-10 --- Wish list*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-02 Child information
  ----------------------- --------------------------------------------------------
  **Where you go next**   DOC-SCR-02 Child information; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

DOC-SCR-11 --- Task lists

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-11
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-05
  -------------------------------------------------------------------------

![Figure DOC-SCR-11 --- Task lists](media/960aba292399be8c81c19a8b9d5a5e2e94b3d341.png "Figure DOC-SCR-11 — Task lists"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-11 --- Task lists*

**Navigation**

  ----------------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-01 Children list and child form
  ----------------------- ----------------------------------------------------------------
  **Where you go next**   DOC-SCR-01 Children list and child form; Main menu: any module

  ----------------------------------------------------------------------------------------

The screen components are shown in the figure above.

DOC-SCR-12 --- Share links

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-12
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-06
  -------------------------------------------------------------------------

![Figure DOC-SCR-12 --- Share links](media/d346169f85160f48ec5b79bd012c1542b897c5b9.png "Figure DOC-SCR-12 — Share links"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-12 --- Share links*

**Navigation**

  ----------------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-07 Document detail and versions
  ----------------------- ----------------------------------------------------------------
  **Where you go next**   DOC-SCR-07 Document detail and versions; Main menu: any module

  ----------------------------------------------------------------------------------------

The screen components are shown in the figure above.

DOC-SCR-13 --- Public share link page

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-13
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-06
  -------------------------------------------------------------------------

![Figure DOC-SCR-13 --- Public share link page](media/343dd132ec46b47e9377c88d1b7fb499c95ab004.png "Figure DOC-SCR-13 — Public share link page"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-13 --- Public share link page*

**Navigation**

  -------------------------------------------------------------------------------------------------
  **How you get here**    Share link opened outside the app
  ----------------------- -------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  -------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

DOC-SCR-14 --- Emergency contacts

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-14
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-07
  -------------------------------------------------------------------------

![Figure DOC-SCR-14 --- Emergency contacts](media/f403c4bffec23a42ddf7e55aa78af929dd2919b7.png "Figure DOC-SCR-14 — Emergency contacts"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-14 --- Emergency contacts*

**Navigation**

  ----------------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-01 Children list and child form
  ----------------------- ----------------------------------------------------------------
  **Where you go next**   DOC-SCR-01 Children list and child form; Main menu: any module

  ----------------------------------------------------------------------------------------

The screen components are shown in the figure above.

DOC-SCR-15 --- Emergency contact consent page

  -------------------------------------------------------------------------
  **Screen ID**    DOC-SCR-15
  ---------------- --------------------------------------------------------
  **Module**       Children and Documents

  **Feature(s)**   DOC-07
  -------------------------------------------------------------------------

![Figure DOC-SCR-15 --- Emergency contact consent page](media/f027307ac0427de31a43620f2d34bbd76a7c1133.png "Figure DOC-SCR-15 — Emergency contact consent page"){width="6.666666666666667in" height="5.0in"}

*Figure DOC-SCR-15 --- Emergency contact consent page*

**Navigation**

  -------------------------------------------------------------------------------------------------
  **How you get here**    Invitation link the emergency contact receives
  ----------------------- -------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  -------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

Cross-screen rules and pending screen decisions (Children and Documents)

Cross-screen Children and Documents rules

Pending screen decisions --- Children and Documents

11.7 Field-level specifications

1.1 Child --- DOC-SCR-01 Children list and child form → DOC-SCR-01

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**       **Technical name**   **Type / control**   **Required**   **Editable**   **Default**         **Allowed values / validation**   **Visibility**
  -------------- --------------- -------------------- -------------------- -------------- -------------- ------------------- --------------------------------- -----------------
  FLD-DOC-001    First name      first_name           Text                 Yes            Parent         None                1--60 characters; ERR-01/ERR-02   Child list/form

  FLD-DOC-002    Date of birth   date_of_birth        Date                 Yes            Parent         None                Not future; ERR-03                Child list/form

  FLD-DOC-003    Household       household_id         System               Yes            No             Current household   Household reference               Internal

  FLD-DOC-004    Status          status               System               Yes            Parent         Active              Active, Archived                  Child list

  FLD-DOC-005    Version         version_no           Integer              System         No             1                   Increments on edit                History
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.2 Child Information Entry --- DOC-SCR-03 Child information entry form → DOC-SCR-03

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**          **Technical name**   **Type / control**   **Required**   **Editable**          **Default**                         **Allowed values / validation**                                                                                                                                                                                             **Visibility**
  -------------- ------------------ -------------------- -------------------- -------------- --------------------- ----------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------------------
  FLD-DOC-010    Section            section              Select               Yes            No after creation     None                                Medical, School, Contacts                                                                                                                                                                                                   Entry form

  FLD-DOC-011    Entry type         entry_type           Select               Yes            No after creation     None                                Medical: Allergy, Medication, Condition, Doctor or clinic, Insurance, Immunization, Other · School: School, Teacher, Class schedule, Bus or pick-up, Other · Contacts: Emergency contact, Family member, Caregiver, Other   Entry form

  FLD-DOC-012    Child              child_id             Select               Yes            Creator               None                                One child or All children                                                                                                                                                                                                   Entry form

  FLD-DOC-013    Title              title                Text                 Yes            Creator               None                                1--100 characters; ERR-01/ERR-05                                                                                                                                                                                            Entry form/detail

  FLD-DOC-014    Details            details              Textarea             Conditional    Creator               None                                ≤2,000 characters; ERR-06                                                                                                                                                                                                   Entry detail

  FLD-DOC-015    Contact name       contact_name         Text                 Conditional    Creator               None                                ≤100 characters                                                                                                                                                                                                             Contacts entry

  FLD-DOC-016    Contact email      contact_email        Email                Conditional    Creator               None                                Valid email; ≤254 characters; ERR-08                                                                                                                                                                                        Contacts entry

  FLD-DOC-017    Contact phone      contact_phone        Phone                Conditional    Creator               None                                Valid phone; ERR-07                                                                                                                                                                                                         Contacts entry

  FLD-DOC-018    Address            address              Textarea             Conditional    Creator               None                                ≤200 characters                                                                                                                                                                                                             Contacts entry

  FLD-DOC-019    Linked documents   document_ids         Multi-select         No             Creator               None                                Maximum 5; ERR-23                                                                                                                                                                                                           Entry detail

  FLD-DOC-020    Visibility         visibility           Toggle               Yes            Private→Shared only   Shared in Linked; Private in Solo   Shared, Private                                                                                                                                                                                                             Entry form/detail

  FLD-DOC-021    Status             status               Display              System         No                    Active                              Active, Archived                                                                                                                                                                                                            Entry detail
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.3 Document --- DOC-SCR-06 Upload a document / DOC-SCR-07 Document detail and versions → DOC-SCR-06, DOC-SCR-07

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**           **Technical name**   **Type / control**     **Required**   **Editable**          **Default**                         **Allowed values / validation**                     **Visibility**
  -------------- ------------------- -------------------- ---------------------- -------------- --------------------- ----------------------------------- --------------------------------------------------- ------------------
  FLD-DOC-030    File                file_id              File upload / camera   Yes            New version only      None                                PDF, DOCX, JPG, PNG; ≤25 MB; malware scan           Document library

  FLD-DOC-031    Title               title                Text                   Yes            Creator               None                                1--100 characters; ERR-01/ERR-05                    Document library

  FLD-DOC-032    Category            category             Select                 Yes            Creator               None                                Court or legal; Medical; School; Insurance; Other   Document library

  FLD-DOC-033    Children            child_ids            Multi-select           No             Creator               None                                Household children                                  Document library

  FLD-DOC-034    Visibility          visibility           Toggle                 Yes            Private→Shared only   Shared in Linked; Private in Solo   Shared, Private                                     Document library

  FLD-DOC-035    Version number      version_no           Integer                System         No                    1                                   Increments on new version                           Document history

  FLD-DOC-036    Status              status               Display                System         No                    Active                              Active, Archived, Recently Deleted                  Document library

  FLD-DOC-037    Deletion deadline   deleted_at           Timestamp              System         No                    Set on private delete               Restore available for 30 days                       Recently Deleted
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

11.8 User actions and procedures

ACT-DOC-001 --- Add Child

  --------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent
  --------------------- ----------------------------------------------------------------------------------------------
  **Screen**            DOC-SCR-01 Children list and child form

  **Objective**         Add a child to the household

  **Trigger**           Parent submits child form

  **Preconditions**     Parent signed in; household has fewer than 10 children

  **System behavior**   Create child with first name and date of birth; save version history; write audit entry.

  **Data created**      Child record, version, audit log

  **Validations**       First name 1--60 characters; date of birth not in future; maximum 10 children per household.

  **Success**           Child appears in Children list

  **Negative**          Empty name: ERR-01; long name: ERR-02; future DOB: ERR-03; eleventh child: ERR-04.

  **Permissions**       Parent creates/edits; Co-parent views but cannot change child record.

  **Source**            DOC-01; FR-DOC-01-01--FR-DOC-01-05.

  **Screen(s)**         DOC-SCR-01 Children list and child form
  --------------------------------------------------------------------------------------------------------------------

1.  Open DOC-SCR-01 Children list and child form (entry: Main navigation → Children).

2.  Make sure the preconditions are met: Parent signed in; household has fewer than 10 children.

3.  Enter or select the required information: First name; Date of birth.

4.  Perform the action: Parent submits child form.

5.  The system validates: First name 1--60 characters; date of birth not in future; maximum 10 children per household.

6.  The system processes the action: Create child with first name and date of birth; save version history; write audit entry.

7.  Result on success: Child appears in Children list.

8.  If it fails or a rule is not met: Empty name: ERR-01; long name: ERR-02; future DOB: ERR-03; eleventh child: ERR-04.

ACT-DOC-002 --- Archive Child

  -------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent
  --------------------- ---------------------------------------------------------------------------------------------------------------
  **Screen**            DOC-SCR-01 Children list and child form / DOC-SCR-01 Children list and child form

  **Objective**         Retire a child from new records without deleting history

  **Trigger**           Parent selects Archive

  **Preconditions**     Child exists

  **System behavior**   Archive child; retain association with prior expenses, events, and entries; exclude from new-entry selection.

  **Data updated**      Child status; audit log

  **Success**           Child archived and hidden from active selection

  **Negative**          Using archived child in a new entry: ERR-17.

  **Permissions**       Parent

  **Source**            FR-DOC-01-05.

  **Screen(s)**         DOC-SCR-01 Children list and child form, DOC-SCR-01 Children list and child form
  -------------------------------------------------------------------------------------------------------------------------------------

1.  Open DOC-SCR-01 Children list and child form, DOC-SCR-01 Children list and child form (entry: Main navigation → Children).

2.  Make sure the preconditions are met: Child exists.

3.  Enter or select the required information: First name; Date of birth.

4.  Perform the action: Parent selects Archive.

5.  The system processes the action: Archive child; retain association with prior expenses, events, and entries; exclude from new-entry selection.

6.  Result on success: Child archived and hidden from active selection.

7.  If it fails or a rule is not met: Using archived child in a new entry: ERR-17.

ACT-DOC-003 --- Create Child Information Entry

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            DOC-SCR-03 Child information entry form

  **Objective**         Store medical, school, or contact information

  **Trigger**           User submits entry

  **Preconditions**     Child exists; user signed in

  **System behavior**   Create entry in Medical, School, or Contacts; assign child or All children; support defined entry types; attach up to five visible documents; default Shared in Linked household, Private in Solo Mode.

  **Data created**      Information entry, version, audit log

  **Validations**       Title 1--100 characters; details ≤ 2,000; contact name ≤ 100; email ≤ 254 and valid; address ≤ 200; phone valid; maximum five linked documents.

  **Success**           Entry appears under selected child/section

  **Negative**          Missing/long title: ERR-01/ERR-05; long text: ERR-06; invalid phone/email: ERR-07/ERR-08; sixth document: ERR-23; save failure: ERR-09.

  **Permissions**       Either parent may create; only creator edits/archives.

  **Source**            DOC-01; FR-DOC-01-06--FR-DOC-01-16.

  **Screen(s)**         DOC-SCR-03 Child information entry form
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open DOC-SCR-03 Child information entry form (entry: DOC-SCR-01 Children list and child form; DOC-SCR-02 Child information; DOC-SCR-04 Entry detail and history).

2.  Make sure the preconditions are met: Child exists; user signed in.

3.  Enter or select the required information: Section; Entry type; Child; Title; Visibility.

4.  Perform the action: User submits entry.

5.  The system validates: Title 1--100 characters; details ≤ 2,000; contact name ≤ 100; email ≤ 254 and valid; address ≤ 200; phone valid; maximum five linked documents.

6.  The system processes the action: Create entry in Medical, School, or Contacts; assign child or All children; support defined entry types; attach up to five visible documents; default Shared in Linked household, Private in Solo Mode.

7.  Result on success: Entry appears under selected child/section.

8.  If it fails or a rule is not met: Missing/long title: ERR-01/ERR-05; long text: ERR-06; invalid phone/email: ERR-07/ERR-08; sixth document: ERR-23; save failure: ERR-09.

ACT-DOC-004 --- Share Private Information Entry

  -------------------------------------------------------------------------------------------------------------------------
  **Actor**             Entry creator
  --------------------- ---------------------------------------------------------------------------------------------------
  **Screen**            DOC-SCR-04 Entry detail and history

  **Objective**         Make a private entry visible to co-parent

  **Trigger**           Creator selects Share and confirms

  **Preconditions**     Household Linked; entry Private

  **System behavior**   Set entry Shared after confirmation; visibility cannot revert to Private; retain version history.

  **Data updated**      Entry visibility; audit log

  **Success**           Co-parent can view entry

  **Negative**          Save failure retains Private status.

  **Permissions**       Creator only

  **Source**            FR-DOC-01-09--FR-DOC-01-12.

  **Screen(s)**         DOC-SCR-04 Entry detail and version history
  -------------------------------------------------------------------------------------------------------------------------

1.  Open DOC-SCR-04 Entry detail and version history (entry: DOC-SCR-02 Child information).

2.  Make sure the preconditions are met: Household Linked; entry Private.

3.  Perform the action: Creator selects Share and confirms.

4.  The system processes the action: Set entry Shared after confirmation; visibility cannot revert to Private; retain version history.

5.  Result on success: Co-parent can view entry.

6.  If it fails or a rule is not met: Save failure retains Private status.

ACT-DOC-005 --- Archive or Restore Information Entry

  -----------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Entry creator
  --------------------- -------------------------------------------------------------------------------------------------------------
  **Screen**            DOC-SCR-04 Entry detail and history

  **Objective**         Retire or recover an entry without deletion

  **Trigger**           Creator selects Archive or Restore

  **Preconditions**     User is creator

  **System behavior**   Archive hides entry unless archived items are shown; restore returns it; archived entries cannot be edited.

  **Data updated**      Entry status; audit log

  **Success**           Entry archived or restored

  **Negative**          Editing archived entry: ERR-11.

  **Permissions**       Creator only

  **Source**            FR-DOC-01-13.

  **Screen(s)**         DOC-SCR-04 Entry detail and version history
  -----------------------------------------------------------------------------------------------------------------------------------

1.  Open DOC-SCR-04 Entry detail and version history (entry: DOC-SCR-02 Child information).

2.  Make sure the preconditions are met: User is creator.

3.  Perform the action: Creator selects Archive or Restore.

4.  The system processes the action: Archive hides entry unless archived items are shown; restore returns it; archived entries cannot be edited.

5.  Result on success: Entry archived or restored.

6.  If it fails or a rule is not met: Editing archived entry: ERR-11.

ACT-DOC-006 --- Upload Document

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            DOC-SCR-06 Upload a document

  **Objective**         Store a secure document

  **Trigger**           User selects file or captures photo

  **Preconditions**     Storage limit not exceeded

  **System behavior**   Accept PDF, DOCX, JPG, PNG up to 25 MB; malware-scan; save title, category, optional children; default Shared in Linked household and Private in Solo Mode; count toward household storage.

  **Data created**      Document, version, audit log

  **Validations**       Title 1--100 characters; accepted type/size; storage available.

  **Success**           Document appears in library

  **Negative**          Missing/long title: ERR-01/ERR-05; wrong type: ERR-12; too large: ERR-13; malware: ERR-14; storage exceeded: ERR-15; save failure: ERR-09.

  **Permissions**       Uploader controls Private/Shared; support/admin cannot access household documents.

  **Source**            DOC-02; FR-DOC-02-01--FR-DOC-02-20.

  **Screen(s)**         DOC-SCR-06 Upload a document
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open DOC-SCR-06 Upload a document (entry: ; DOC-SCR-01 Children list and child form).

2.  Make sure the preconditions are met: Storage limit not exceeded.

3.  Enter or select the required information: Title; Category; Visibility.

4.  Perform the action: User selects file or captures photo.

5.  The system validates: Title 1--100 characters; accepted type/size; storage available.

6.  The system processes the action: Accept PDF, DOCX, JPG, PNG up to 25 MB; malware-scan; save title, category, optional children; default Shared in Linked household and Private in Solo Mode; count toward household storage.

7.  Result on success: Document appears in library.

8.  If it fails or a rule is not met: Missing/long title: ERR-01/ERR-05; wrong type: ERR-12; too large: ERR-13; malware: ERR-14; storage exceeded: ERR-15; save failure: ERR-09.

ACT-DOC-007 --- Add Document Version

  -------------------------------------------------------------------------------------------------------------------------
  **Actor**             Document creator
  --------------------- ---------------------------------------------------------------------------------------------------
  **Screen**            DOC-SCR-07 Document detail and versions

  **Objective**         Replace or supplement a document while retaining history

  **Trigger**           Creator uploads new version

  **Preconditions**     User can see/edit document

  **System behavior**   Retain all prior versions; display contributor and time; prior versions remain open/downloadable.

  **Data created**      Document version; audit log

  **Success**           New version displayed; history preserved

  **Permissions**       Creator

  **Source**            FR-DOC-02-08.

  **Screen(s)**         DOC-SCR-07 Document detail, versions and history
  -------------------------------------------------------------------------------------------------------------------------

1.  Open DOC-SCR-07 Document detail, versions and history (entry: ; DOC-SCR-01 Children list and child form; DOC-SCR-04 Entry detail and history).

2.  Make sure the preconditions are met: User can see/edit document.

3.  Perform the action: Creator uploads new version.

4.  The system processes the action: Retain all prior versions; display contributor and time; prior versions remain open/downloadable.

5.  Result on success: New version displayed; history preserved.

ACT-DOC-008 --- Delete or Archive Document

  -----------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Document creator
  --------------------- -------------------------------------------------------------------------------------------------------------------------
  **Screen**            DOC-SCR-07 Document detail and versions

  **Objective**         Remove private document or retire shared document

  **Trigger**           Creator selects Delete or Archive

  **Preconditions**     Private document: delete allowed; Shared document: archive only

  **System behavior**   Private document moves to Recently Deleted for 30 days and can be restored; Shared document is archived, never deleted.

  **Data updated**      Document status; audit log

  **Success**           Private document restorable for 30 days; Shared document archived

  **Negative**          Attempt to delete Shared document: ERR-16.

  **Permissions**       Creator

  **Source**            FR-DOC-02-09, FR-DOC-02-10.

  **Screen(s)**         DOC-SCR-07 Document detail, versions and history
  -----------------------------------------------------------------------------------------------------------------------------------------------

1.  Open DOC-SCR-07 Document detail, versions and history (entry: ; DOC-SCR-01 Children list and child form; DOC-SCR-04 Entry detail and history).

2.  Make sure the preconditions are met: Private document: delete allowed; Shared document: archive only.

3.  Perform the action: Creator selects Delete or Archive.

4.  The system processes the action: Private document moves to Recently Deleted for 30 days and can be restored; Shared document is archived, never deleted.

5.  Result on success: Private document restorable for 30 days; Shared document archived.

6.  If it fails or a rule is not met: Attempt to delete Shared document: ERR-16.

11.9 Business rules and validations

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **What it covers in this module**                                                                                                                                                                                                                          **Applied in**
  ---------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------
  BR-21      Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export. Shared child information and shared documents are records, and photos, tasks, wish list items and Private documents are not.   FR-DOC-01-13, FR-DOC-02-09, FR-DOC-02-10, FR-DOC-03-06

  BR-22      In Safety Mode, address and location are hidden, contact details are masked and notifications are discreet.                                                                                                                                                FR-DOC-01-14, FR-DOC-03-03, FR-DOC-03-04, FR-DOC-05-05, FR-DOC-07-08
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- ---------------------------------------------------------------------------------------------------------------------------------
  BR-05      Data export, tone, safety and reporting tools are available to every user.

  BR-21      Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.
  --------------------------------------------------------------------------------------------------------------------------------------------

11.10 Messages and errors

Errors

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **When it shows**                                            **Text**                                                                    **Used by**
  ---------- ------------------------------------------------------------ --------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------
  ERR-01     A required field is empty                                    Fill in the \[field name\].                                                 FR-DOC-01-02, FR-DOC-01-07, FR-DOC-02-01, FR-DOC-03-01, FR-DOC-04-01, FR-DOC-05-01, FR-DOC-07-02

  ERR-02     A child name is longer than 60 characters                    Enter a name with 1 to 60 characters.                                       FR-DOC-01-02

  ERR-03     A date of birth is in the future                             The date of birth cannot be in the future.                                  FR-DOC-01-02

  ERR-04     A household has 10 children                                  You can add up to 10 children.                                              FR-DOC-01-03

  ERR-05     A title or a name is longer than 100 characters              Use up to 100 characters.                                                   FR-DOC-01-07, FR-DOC-02-01, FR-DOC-03-01, FR-DOC-04-01, FR-DOC-05-01, FR-DOC-07-02

  ERR-06     A text is too long                                           That is too long. Use up to the number of characters shown.                 FR-DOC-01-07, FR-DOC-03-02, FR-DOC-04-01, FR-DOC-05-02, FR-DOC-07-02

  ERR-07     A phone number is not valid                                  Enter a valid phone number.                                                 FR-DOC-01-07, FR-DOC-07-02

  ERR-08     An email is not valid                                        Enter a valid email address.                                                FR-DOC-01-07, FR-DOC-06-05, FR-DOC-07-02

  ERR-09     A change cannot be saved                                     We could not save your change. Nothing was changed. Please try again.       FR-DOC-01-22, FR-DOC-02-20, FR-DOC-03-11, FR-DOC-04-08, FR-DOC-05-10, FR-DOC-06-10, FR-DOC-07-11

  ERR-10     Someone other than the creator tries to change an item       Only the person who created this can change it.                             FR-DOC-01-04, FR-DOC-01-08

  ERR-11     An archived entry is edited                                  This entry is archived. Restore it before you change it.                    FR-DOC-01-13

  ERR-12     A file type is not allowed                                   This file type is not allowed. Use PDF, DOCX, JPG or PNG.                   FR-DOC-02-02

  ERR-13     A file is too large                                          Each file can be up to 25 MB.                                               FR-DOC-02-02, FR-DOC-03-01

  ERR-14     A file fails the malware scan                                We could not save this file because it did not pass our safety check.       FR-DOC-02-03, FR-DOC-03-01

  ERR-15     A household is over the storage limit                        You are over the storage limit. You can still view and export your files.   FR-DOC-02-12, FR-DOC-03-08

  ERR-16     A Shared document is deleted                                 A shared document cannot be deleted. You can archive it.                    FR-DOC-02-10

  ERR-17     An archived child is used                                    This child is archived. Choose another child.                               FR-DOC-01-05

  ERR-18     A photo type is not allowed                                  Use a JPG or PNG file for photos.                                           FR-DOC-03-01

  ERR-19     A due date is in the past                                    Choose a due date that is today or later.                                   FR-DOC-05-02

  ERR-20     A link has ended or was stopped                              This link has ended or was stopped. Ask the sender for a new one.           FR-DOC-06-06, FR-DOC-07-04

  ERR-21     A user in Safety Mode tries to assign an emergency contact   This is not available while Safety Mode is on.                              FR-DOC-07-08

  ERR-22     A parent has 3 emergency contacts                            You can add up to 3 emergency contacts.                                     FR-DOC-07-03

  ERR-23     More than 5 documents are linked to an entry                 You can link up to 5 documents.                                             FR-DOC-01-16

  ERR-24     A parent claims an item that is already Claimed              Someone already claimed this item.                                          FR-DOC-04-02
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **When it shows**                                             **Text**                                                                            **Feature**
  ----------- ------------------------------------------------------------- ----------------------------------------------------------------------------------- ------------------------
  MSGT-01     A child is added                                              Your child was added.                                                               DOC-01

  MSGT-02     A child information entry is saved                            Your entry was saved.                                                               DOC-01

  MSGT-03     A parent shares an entry, a document or an album              Once you share this, \[name\] can see it and you cannot make it private again.      DOC-01, DOC-02, DOC-03

  MSGT-04     An item is shared                                             Shared with \[name\].                                                               DOC-01

  MSGT-05     An entry or a document is archived                            This item was archived. It stays in the record.                                     DOC-01, DOC-02

  MSGT-06     The co-parent joins a household with Solo Mode records        Your earlier records stay private until you share them.                             DOC-01, DOC-02

  MSGT-07     A document is saved                                           Your document was saved.                                                            DOC-02

  MSGT-08     A Private document or a photo is deleted                      This item was moved to Recently deleted. You can restore it for 30 days.            DOC-02, DOC-03

  MSGT-09     An item is restored                                           Your item was restored.                                                             DOC-02, DOC-03

  MSGT-10     The documents screen opens                                    You have used \[percent\] percent of your \[limit\] GB.                             DOC-02

  MSGT-11     The other parent opens an entry with hidden contact details   Contact details are hidden until \[name\] shares them.                              DOC-01

  MSGT-12     A photo is uploaded                                           Location data was removed from your photo.                                          DOC-03

  MSGT-13     A task is assigned (alert)                                    \[name\] gave you a task: \[title\].                                                DOC-05

  MSGT-14     The day before a due date (reminder)                          Reminder: \[title\] is due on \[date\].                                             DOC-05

  MSGT-15     A share link is made                                          Your link works until \[date and time\]. Anyone with the link can open this file.   DOC-06

  MSGT-16     A share link is stopped                                       The link was stopped.                                                               DOC-06

  MSGT-17     An emergency contact is invited                               \[name\] asked you to be an emergency contact. Open this link to agree: \[link\].   DOC-07

  MSGT-18     An emergency contact agrees (alert)                           \[contact name\] agreed to be your emergency contact.                               DOC-07

  MSGT-19     An emergency contact is removed                               \[contact name\] is no longer your emergency contact.                               DOC-07

  MSGT-20     A wish list item is claimed (alert)                           \[name\] is getting this item: \[title\].                                           DOC-04
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

11.11 Dependencies

  ----------------------------------------------------------------------------------------------------------
  **Module**                    **What it needs from Children and Documents**
  ----------------------------- ----------------------------------------------------------------------------
  Expenses and Payments         The children of the household (EXP-06)

  Calendar and Parenting Time   The children of the household (CAL-01, CAL-02)

  Messaging                     The household files, where attachments are saved (MSG-09)

  Records and Court             Shared child information and shared documents for the record

  Professionals and Access      The entries and documents that a parent shares

  Accounts and Onboarding       The child list, and the child sections that a Third party can see (ACC-07)
  ----------------------------------------------------------------------------------------------------------

12.3 Assumptions

-   The market review pages of OurFamilyWizard and TalkingParents describe those apps on October 13, 2026 and can change.

11.12 End-to-end workflows and scenarios

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                         **Module path**                       **Features / rules**
  -------------- ------------------------------------------------------------------------------------------------------- ------------------------------------- --------------------------------------
  WF-03          Choose Solo Mode, keep records; co-parent joins later; Solo records stay private until shared           ACC → EXP/DOC/CAL/REC                 ACC-03, BR-01

  WF-10          Expense with receipt → share → reimbursement request → accept / decline / mark paid / withdraw          EXP → DOC/BIL (storage) → NTF → REC   EXP-01--03, EXP-06, BR-14

  WF-12          Add child, information entries, documents with versions; archive/restore; storage accounting            DOC → REC                             DOC-01, DOC-02

  WF-13          Journal notes; data export (PDF/CSV, free); certified export with Record ID; public verification        REC ← MSG/CAL/EXP/DOC/NTF/ACC         REC-01, REC-05, REC-07, BR-05, BR-20

  WF-14          Turn Safety Mode on (notice + confirm), effects across modules, Exit Now, turn off with one-time code   SAF → MSG/CAL/DOC/NTF/PLT/SUP         SAF-01, BR-22
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Scenario**   **Scenario**                                                    **Expected behaviour**
  -------------- --------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------
  SCN-DOC-001    Parent adds child, medical allergy entry, and linked document   Child and entry saved with version/audit history; document counted toward storage; Records can access Shared data.

  SCN-DOC-002    Co-parent joins after Solo Mode document creation               Documents remain Private until parent shares them; co-parent cannot see them.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
