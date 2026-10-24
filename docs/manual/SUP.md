# Support (SUP)


14.1 Module overview

  ----------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- ----------------------------------------------------------------------------------------------
  Purpose                 The help side of the product. Slow or unhelpful support came up in reviews of existing apps.

  Users                   Parent, co-parent, support staff

  Pain points addressed   P09

  Features                1 (0 Must-have, 1 Good-to-have, 0 Unique)

  Depends on              Accounts and Onboarding.
  ----------------------------------------------------------------------------------------------------------------------

-   Response targets, and a case number for every request.

-   A fast track for issues tied to a court date.

-   A searchable help center.

Purpose and scope

2.1 Purpose. This module is the help side of the product. Slow or unhelpful support came up in reviews of the existing apps (P09). The module gives every request a case number, sets reply targets, puts issues tied to a court date first, and gives parents a searchable help center.

  -------------------------------------------------------------------------------------------------------------------
  **ID**             **How this module supports it**
  ------------------ ------------------------------------------------------------------------------------------------
  OBJ-03             Fixes the pain point P09 (SUP-01). P09 is rated Medium, so it is not one of the 12 High items.

  OBJ-05             Protects parents at risk: Safety requests are handled first and discreetly (SUP-01, SUP-02).
  -------------------------------------------------------------------------------------------------------------------

14.2 Roles and permissions

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**                              **What they do in this module**
  ------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------
  Parent                                Searches the help center, opens a request, follows the case, replies, reopens a case and answers whether the problem was solved.

  Co-parent                             The same as the Parent, for their own requests.

  Professional, Third party and Child   Can open a request when signed in. No other feature.

  A person who cannot sign in           Can open a request from the sign-in page and read the help center.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

14.3 Business requirements

  -------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Business requirement**                                                                         **Features**
  -------------- ------------------------------------------------------------------------------------------------ ---------------
  BREQ-01        A parent can ask for help, gets a case number at once, and gets a reply inside a stated time.    SUP-01

  BREQ-02        An issue tied to a court date, or to the safety of a parent, is handled before other requests.   SUP-01

  BREQ-03        A parent can find answers in a searchable help center without contacting support.                SUP-01

  BREQ-04        Support staff can work the queue, reply without reading parent messages.                         SUP-02

  BREQ-05        The manager can see how fast support replies and whether the targets are met.                    SUP-03
  -------------------------------------------------------------------------------------------------------------------------------

14.4 Features

  --------------------------------------------------------------------------------------------------------
  **Feature**   **Name**                                                     **Type**
  ------------- ------------------------------------------------------------ -----------------------------
  SUP-01        Support targets, case numbers and a searchable help center   Good-to-have → Good-to-have

  SUP-02        Staff support workspace (proposed)                           --- → Proposed

  SUP-03        Support measures report (proposed)                           --- → Proposed
  --------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**          **Screens**
  ------------------ ---------------------- ------------------------------------------------------------------------------------
  SUP-SUB-01         Help center            Help home; search results; article detail; topic browse; service notice

  SUP-SUB-02         Support requests       Request form; confirmation; My requests; case detail; reply; reopen

  SUP-SUB-03         Staff workspace        Case queue; case detail; reply; internal notes; assignment; status/category change

  SUP-SUB-04         Knowledge management   Article editor; version history; publish/unpublish

  SUP-SUB-05         Reporting              Support measures report
  ------------------------------------------------------------------------------------------------------------------------------

14.5 Screen inventory

  ----------------------------------------------------------------------------------------------------------
  **Screen ID**   **Screen**                                                                  **Feature**
  --------------- --------------------------------------------------------------------------- --------------
  SUP-SCR-01      Help screen (search, topics, My requests, contact, hours, service notice)   SUP-01

  SUP-SCR-02      Help center search results                                                  SUP-01

  SUP-SCR-03      Article                                                                     SUP-01

  SUP-SCR-04      New request form                                                            SUP-01

  SUP-SCR-05      Request confirmation                                                        SUP-01

  SUP-SCR-06      My requests                                                                 SUP-01

  SUP-SCR-07      Request thread                                                              SUP-01

  SUP-SCR-08      Request form on the sign-in page                                            SUP-01

  SUP-SCR-09      Staff queue                                                                 SUP-02

  SUP-SCR-10      Staff case view                                                             SUP-02

  SUP-SCR-11      Service notices                                                             SUP-02

  SUP-SCR-12      Help article editor                                                         SUP-02

  SUP-SCR-13      Reply templates                                                             SUP-02

  SUP-SCR-14      Support measures report                                                     SUP-03
  ----------------------------------------------------------------------------------------------------------

14.6 Screen specifications

SUP-SCR-01 --- Help

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-01
  -------------------------------------------------------------------------

![Figure SUP-SCR-01 --- Help](media/e348fb34a51e410cdd80c111f1a342526348b2e7.png "Figure SUP-SCR-01 — Help"){width="6.666666666666667in" height="5.0in"}

*Figure SUP-SCR-01 --- Help*

**Navigation**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Help; ACC-SCR-01 Create account; ACC-SCR-02 Sign in; ACC-SCR-03 Second check; ACC-SCR-07 Accept invite; ACC-SCR-15 Reset password; ACC-SCR-21 Error page; ACC-SCR-22 Page not found or not allowed; DOC-SCR-13 Public share link page; DOC-SCR-15 Emergency contact consent page; PRO-SCR-06 Accept invite (professional); REC-SCR-03 Public verification page; REC-SCR-10 Public records request page; REC-SCR-11 Public court notes by state; REC-SCR-12 Public model order language; REC-SCR-13 Public retention policy; SAF-SCR-05 Public safety resources; SUP-SCR-02 Search results; SUP-SCR-04 New request form; SUP-SCR-05 Request confirmation; SUP-SCR-06 My requests; SUP-SCR-08 Request form on sign-in page
  ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-20 Settings; SAF-SCR-05 Public safety resources; SUP-SCR-02 Search results; SUP-SCR-04 New request form; SUP-SCR-06 My requests; Main menu: any module

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------------------------------------
  **Purpose**    Let users search help content, view support hours, access requests, and contact support.
  -------------- ------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Help Screen\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Open/closed status (P-SUP-001-06); Service notice (P-SUP-001-07).

-   Input area (form fields, in specification order): Search help (P-SUP-001-01); Support hours (P-SUP-001-05).

-   Action area (primary action first, then secondary actions and links): Help topics (P-SUP-001-02); My requests (P-SUP-001-03); Contact support (P-SUP-001-04); Safety resources link (P-SUP-001-08).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**     **Allowed values / validation**                                                                              **Error**          **Visibility**   **Saved to**       **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- --------------- ------------------------------------------------------------------------------------------------------------ ------------------ ---------------- ------------------ -------------------------------------
  P-SUP-001-01       Search help               Search input         No             Yes            Blank           Searches help articles                                                                                       No-results state   All users        View state         Opens SUP-SCR-02 Search results

  P-SUP-001-02       Help topics               Topic links          ---            ---            ---             Account/sign-in; Messages/calls; Calendar/expenses; Records/exports; Child support; Safety; Something else   ---                All users        Help taxonomy      Opens relevant articles

  P-SUP-001-03       My requests               Link / button        ---            ---            ---             ---                                                                                                          ---                Signed-in user   ---                Opens SUP-SCR-06 My requests

  P-SUP-001-04       Contact support           Primary button       ---            ---            ---             ---                                                                                                          ---                All users        ---                Opens SUP-SCR-04 New request form

  P-SUP-001-05       Support hours             Informational text   ---            ---            ---             Monday--Friday, 8 am--8 pm Eastern; closed US federal holidays                                               ---                All users        ---                Display only

  P-SUP-001-06       Open/closed status        Badge                System         No             Derived         Open; Closed                                                                                                 ---                All users        Support schedule   Shows next opening time when closed

  P-SUP-001-07       Service notice            Warning panel        System         No             Active notice   Active service notice                                                                                        ---                All users        Service notice     Display only

  P-SUP-001-08       Safety resources link     Text link            ---            ---            ---             ---                                                                                                          ---                All users        ---                Opens Safety resources
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ------------------------------------------------------
  Empty                    Search blank; topics and contact action displayed

  Loading                  Help screen skeleton

  Error                    Help-content load failure with retry

  Success                  Search, topics, hours, and contact actions displayed
  -------------------------------------------------------------------------------

SUP-SCR-02 --- Search results

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-01
  -------------------------------------------------------------------------

![Figure SUP-SCR-02 --- Search results](media/1cdccd436f484246efd40b9138228976768e058c.png "Figure SUP-SCR-02 — Search results"){width="6.666666666666667in" height="5.0in"}

*Figure SUP-SCR-02 --- Search results*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------
  **How you get here**    SUP-SCR-01 Help; SUP-SCR-03 Article
  ----------------------- -----------------------------------------------------------------------------------------
  **Where you go next**   SUP-SCR-01 Help; SUP-SCR-03 Article; SUP-SCR-04 New request form; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Display help articles matching a search.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Help Center Search Results\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Results list (P-SUP-002-03); No-results message (P- SUP-002-06).

-   Input area (form fields, in specification order): Search query (P-SUP-002-01); Topic filter (P-SUP-002-02); Article title (P-SUP-002-04); Article summary (P-SUP-002-05).

-   Action area (primary action first, then secondary actions and links): Contact support (P-SUP-002-07).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**       **Required**   **Editable**   **Default**     **Allowed values / validation**   **Error**               **Visibility**   **Saved to**          **Behavior**
  ------------------ ------------------------- -------------- -------------- -------------- --------------- --------------------------------- ----------------------- ---------------- --------------------- -----------------------------------
  P-SUP-002-01       Search query              Search input   No             Yes            Current query   Text                              ---                     All users        View state            Updates results

  P-SUP-002-02       Topic filter              Select         No             Yes            All topics      Support categories                ---                     All users        View state            Filters results

  P-SUP-002-03       Results list              Article list   ---            ---            ---             Matching published articles       Load error with retry   All users        ---                   Displays results

  P-SUP-002-04       Article title             Text           System         No             Derived         Article title                     ---                     All users        HelpArticle.title     Opens SUP-SCR-03 Article

  P-SUP-002-05       Article summary           Text           System         No             Derived         First 100 characters              ---                     All users        HelpArticle.summary   Display only

  P- SUP-002-06      No-results message        Empty state    System         No             Derived         MSGT-04                           ---                     All users        ---                   Shows Contact support link

  P-SUP-002-07       Contact support           Button         ---            ---            ---             ---                               ---                     All users        ---                   Opens SUP-SCR-04 New request form
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- --------------------------------------------------------------
  Empty                     No query; prompt to search

  Loading                   Results skeleton

  Error                     Search failure with retry

  Success                   Matching articles displayed; no results shows contact option
  ----------------------------------------------------------------------------------------

SUP-SCR-03 --- Article

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-01
  -------------------------------------------------------------------------

![Figure SUP-SCR-03 --- Article](media/2d0da756dbea7c6e12eb9be5f0d3fe37624065c7.png "Figure SUP-SCR-03 — Article"){width="6.666666666666667in" height="5.0in"}

*Figure SUP-SCR-03 --- Article*

**Navigation**

  -------------------------------------------------------------------------------------------------------
  **How you get here**    SUP-SCR-02 Search results
  ----------------------- -------------------------------------------------------------------------------
  **Where you go next**   SUP-SCR-02 Search results; SUP-SCR-04 New request form; Main menu: any module

  -------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Display one published help article.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Help Article\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Article title (P-SUP-003-01); Last updated (P-SUP-003-03).

-   Input area (form fields, in specification order): Article body (P-SUP-003-02).

-   Action area (primary action first, then secondary actions and links): Related articles (P-SUP-003-04); Contact support (P-SUP-003-05); Back to search (P-SUP-003-06).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**     **Required**   **Editable**   **Default**           **Allowed values / validation**   **Error**   **Visibility**   **Saved to**             **Behavior**
  ------------------ ------------------------- ------------ -------------- -------------- --------------------- --------------------------------- ----------- ---------------- ------------------------ -----------------------------------
  P-SUP-003-01       Article title             Page title   System         No             Article value         Required                          ---         All users        HelpArticle.title        Display only

  P-SUP-003-02       Article body              Rich text    System         No             Article value         Published content                 ---         All users        HelpArticle.body         Display only

  P-SUP-003-03       Last updated              Timestamp    System         No             Publish/update time   UTC storage; local display        ---         All users        HelpArticle.updated_at   Display only

  P-SUP-003-04       Related articles          Link list    System         No             Derived               Related published articles        ---         All users        Article relations        Opens article

  P-SUP-003-05       Contact support           Button       ---            ---            ---                   ---                               ---         All users        ---                      Opens SUP-SCR-04 New request form

  P-SUP-003-06       Back to search            Text link    ---            ---            ---                   ---                               ---         All users        ---                      Returns to results
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                   **Behavior**
  --------------------------- -------------------------------------------
  Empty                       Not applicable; article must exist

  Loading                     Article skeleton

  Error                       Not found or unpublished article

  Success                     Article displayed
  -----------------------------------------------------------------------

SUP-SCR-04 --- New request form

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-01
  -------------------------------------------------------------------------

![Figure SUP-SCR-04 --- New request form](media/9b0deae6b56a57e7fc164f56219d4c4ecb2adcd3.png "Figure SUP-SCR-04 — New request form"){width="6.666666666666667in" height="5.5625in"}

*Figure SUP-SCR-04 --- New request form*

**Navigation**

  ---------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-21 Error page; SUP-SCR-01 Help; SUP-SCR-02 Search results; SUP-SCR-03 Article; SUP-SCR-06 My requests
  ----------------------- ---------------------------------------------------------------------------------------------------------------
  **Where you go next**   SUP-SCR-01 Help; SUP-SCR-05 Request confirmation; Main menu: any module

  ---------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Create a support case.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"New Request Form\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Safety emergency notice (P-SUP-004-08).

-   Input area (form fields, in specification order): Category (P-SUP-004-01); Subject (P-SUP-004-02); Description (P-SUP-004-03); Is this about a court date? (P-SUP-004-04); Court date (P-SUP-004-05); Attachments (P-SUP-004-06); Sensitive-data warning (P-SUP-004-07).

-   Action area (primary action first, then secondary actions and links): Submit request (P-SUP-004-09); Cancel (P-SUP-004-10).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**       **Type**             **Required**   **Editable**        **Default**   **Allowed values / validation**                                                                                                   **Error**                                        **Visibility**    **Saved to**                  **Behavior**
  ------------------ ----------------------------- -------------------- -------------- ------------------- ------------- --------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------ ----------------- ----------------------------- ------------------------------
  P-SUP-004-01       Category                      Select               Yes            Yes before submit   None          Account and sign-in; Messages and calls; Calendar and expenses; Records and exports; Child support link; Safety; Something else   ERR-02 missing                                   Requester         SupportCase.category          Determines Safety notice

  P-SUP-004-02       Subject                       Text input           Yes            Yes before submit   Blank         1--120 characters                                                                                                                 ERR-02 missing/too long                          Requester         SupportCase.subject           Required

  P-SUP-004-03       Description                   Textarea             Yes            Yes before submit   Blank         1--5,000 characters                                                                                                               ERR-02 missing/too long                          Requester         SupportCase.description       Required

  P-SUP-004-04       Is this about a court date?   Radio / toggle       Yes            Yes before submit   No            Yes; No                                                                                                                           Inline field message                             Requester         SupportCase.court_date_flag   Reveals court-date field

  P-SUP-004-05       Court date                    Date picker          Conditional    Yes before submit   Blank         Today or future                                                                                                                   ERR-07 past date                                 Requester         SupportCase.court_date        Required when Yes

  P-SUP-004-06       Attachments                   File upload          No             Yes before submit   None          Max 3 files; 10 MB total; JPG, PNG, PDF, DOCX; malware scan                                                                       ERR-03 type; ERR-04 count/size; ERR-06 malware   Requester         SupportCaseAttachment         Adds files

  P-SUP-004-07       Sensitive-data warning        Informational text   ---            ---                 ---           MSGT-01: do not enter passwords, full SSNs, or card numbers                                                                       ---                                              Requester         ---                           Display only

  P-SUP-004-08       Safety emergency notice       Warning panel        Conditional    ---                 ---           MSGT-05; advocate-approved links                                                                                                  ---                                              Safety category   ---                           Display only

  P-SUP-004-09       Submit request                Primary button       ---            ---                 ---           Daily limit: 10 requests per user/email                                                                                           ERR-05 eleventh request                          Requester         SupportCase.status = New      Creates case and case number

  P-SUP-004-10       Cancel                        Secondary button     ---            ---                 ---           ---                                                                                                                               ---                                              Requester         ---                           Discards form
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **State**            **Behavior**
  -------------------- ------------------------------------------------------------------------------------------------------------------------------------
  Empty                Blank form; category controls conditional fields

  Loading              Submit disabled

  Error                Missing/overlong field: ERR-02; past court date: ERR-07; file issue: ERR-03/04/06; rate limit: ERR-05; save failure: ERR-01/ERR-08

  Success              Case created; navigate to SUP-SCR-05 Request confirmation
  ---------------------------------------------------------------------------------------------------------------------------------------------------------

SUP-SCR-05 --- Request confirmation

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-01
  -------------------------------------------------------------------------

![Figure SUP-SCR-05 --- Request confirmation](media/af2b33a505b6ea9f9bbc6c6633195e3ff320d1a9.png "Figure SUP-SCR-05 — Request confirmation"){width="6.666666666666667in" height="5.0in"}

*Figure SUP-SCR-05 --- Request confirmation*

**Navigation**

  -------------------------------------------------------------------------------------------
  **How you get here**    SUP-SCR-04 New request form
  ----------------------- -------------------------------------------------------------------
  **Where you go next**   SUP-SCR-01 Help; SUP-SCR-07 Request thread; Main menu: any module

  -------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Confirm case creation and show the response target.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Request Confirmation\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Case number (P-SUP-005-01).

-   Input area (form fields, in specification order): Reply target (P-SUP-005-02); Support hours (P-SUP-005-03); Next opening time (P-SUP-005-04); Email confirmation notice (P-SUP-005-05).

-   Action area (primary action first, then secondary actions and links): View request (P-SUP-005-06); Back to Help (P-SUP-005-07).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**     **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**        **Error**   **Visibility**   **Saved to**                     **Behavior**
  ------------------ --------------------------- -------------------- -------------- -------------- ------------- -------------------------------------- ----------- ---------------- -------------------------------- ---------------------------------
  P-SUP-005-01       Case number                 Read-only text       System         No             Generated     SC- + 8 digits; unique; never reused   ---         Requester        SupportCase.case_number          Display/copy

  P-SUP-005-02       Reply target                Text                 System         No             Derived       Normal or Priority target              ---         Requester        SupportCase.first_reply_target   Display only

  P-SUP-005-03       Support hours               Informational text   ---            ---            ---           Monday--Friday, 8 am--8 pm Eastern     ---         Requester        ---                              Display only

  P-SUP-005-04       Next opening time           Text                 Conditional    System         Derived       Shown when support closed              ---         Requester        Support schedule                 Display only

  P-SUP-005-05       Email confirmation notice   Informational text   System         No             Derived       Not sent to Safety Mode user           ---         Requester        ---                              Display only

  P-SUP-005-06       View request                Primary button       ---            ---            ---           ---                                    ---         Requester        ---                              Opens SUP-SCR-07 Request thread

  P-SUP-005-07       Back to Help                Text link            ---            ---            ---           ---                                    ---         Requester        ---                              Opens SUP-SCR-01 Help
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ------------------------------------------------
  Empty                     Not applicable; opens only after case creation

  Loading                   Confirmation skeleton

  Error                     Case lookup failure

  Success                   Case number, target, and next steps displayed
  --------------------------------------------------------------------------

SUP-SCR-06 --- My requests

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-01
  -------------------------------------------------------------------------

![Figure SUP-SCR-06 --- My requests](media/f0573733ea6d019563253558faa837b4dde02da3.png "Figure SUP-SCR-06 — My requests"){width="6.666666666666667in" height="5.0in"}

*Figure SUP-SCR-06 --- My requests*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------------
  **How you get here**    SUP-SCR-01 Help; SUP-SCR-07 Request thread
  ----------------------- ------------------------------------------------------------------------------------------------
  **Where you go next**   SUP-SCR-01 Help; SUP-SCR-04 New request form; SUP-SCR-07 Request thread; Main menu: any module

  ------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show a signed-in user's support cases and statuses.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"My Requests\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Category (P-SUP-006-03); Status (P-SUP-006-05); Created at (P-SUP-006-06); Last activity (P-SUP-006-07).

-   Input area (form fields, in specification order): Case number (P-SUP-006-02); Subject (P-SUP-006-04); Status filter (P-SUP-006-08).

-   Action area (primary action first, then secondary actions and links): Case list (P-SUP-006-01); New request (P-SUP-006-09).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**           **Allowed values / validation**                     **Error**               **Visibility**   **Saved to**    **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- --------------------- --------------------------------------------------- ----------------------- ---------------- --------------- -----------------------------------
  P-SUP-006-01       Case list                 Table / list     ---            ---            ---                   User's own cases                                    Load error with retry   Signed-in user   ---             Displays cases

  P-SUP-006-02       Case number               Text             System         No             Derived               SC- + 8 digits                                      ---                     Case owner       case_number     Opens thread

  P-SUP-006-03       Category                  Badge            System         No             Derived               Support category                                    ---                     Case owner       category        Display only

  P-SUP-006-04       Subject                   Text             System         No             Derived               1--120 characters                                   ---                     Case owner       subject         Display only

  P-SUP-006-05       Status                    Badge            System         No             Derived               New; In progress; Awaiting user; Resolved; Closed   ---                     Case owner       status          Display only

  P-SUP-006-06       Created at                Timestamp        System         No             Case creation         UTC storage; local display                          ---                     Case owner       created_at      Display only

  P-SUP-006-07       Last activity             Timestamp        System         No             Latest reply/update   UTC storage; local display                          ---                     Case owner       Case activity   Display only

  P-SUP-006-08       Status filter             Select           No             Yes            All                   Support statuses                                    ---                     Case owner       View state      Filters list

  P-SUP-006-09       New request               Primary button   ---            ---            ---                   ---                                                 ---                     Signed-in user   ---             Opens SUP-SCR-04 New request form
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                   **Behavior**
  --------------------------- -------------------------------------------
  Empty                       No requests; New request action

  Loading                     List skeleton

  Error                       Load failure and retry

  Success                     User's cases displayed
  -----------------------------------------------------------------------

SUP-SCR-07 --- Request thread

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-01
  -------------------------------------------------------------------------

![Figure SUP-SCR-07 --- Request thread](media/3cfce1f982c951ef8c9f7c8239a302a14b3e5748.png "Figure SUP-SCR-07 — Request thread"){width="6.666666666666667in" height="5.229166666666667in"}

*Figure SUP-SCR-07 --- Request thread*

**Navigation**

  ---------------------------------------------------------------------------------
  **How you get here**    SUP-SCR-05 Request confirmation; SUP-SCR-06 My requests
  ----------------------- ---------------------------------------------------------
  **Where you go next**   SUP-SCR-06 My requests; Main menu: any module

  ---------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show one support case and allow replies.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Request Thread\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Case number (P-SUP-007-01); Subject (P-SUP-007-02); Status (P-SUP-007-03); Thread (P-SUP-007-04).

-   Input area (form fields, in specification order): Reply (P-SUP-007-05); Satisfaction question (P-SUP-007-07); Attach file (P-SUP-007-09).

-   Action area (primary action first, then secondary actions and links): Send reply (P-SUP-007-06); Reopen case (P-SUP-007-08).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**                     **Error**               **Visibility**              **Saved to**           **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------- --------------------------------------------------- ----------------------- --------------------------- ---------------------- ----------------------------
  P-SUP-007-01       Case number               Page title / badge   System         No             Case value    SC- + 8 digits                                      ---                     Case owner                  case_number            Display only

  P-SUP-007-02       Subject                   Read-only text       System         No             Case value    1--120 characters                                   ---                     Case owner                  subject                Display only

  P-SUP-007-03       Status                    Badge                System         No             Case status   New; In progress; Awaiting user; Resolved; Closed   ---                     Case owner                  status                 Display only

  P-SUP-007-04       Thread                    Message list         System         No             Derived       Chronological case messages                         Load error with retry   Case owner                  Case messages          Displays thread

  P-SUP-007-05       Reply                     Textarea             Conditional    Yes            Blank         Required; up to 5,000 characters                    ERR-08 save failure     Case owner; open case       Case message           Sends reply

  P-SUP-007-06       Send reply                Primary button       ---            ---            ---           ---                                                 ---                     Case owner                  Case message           Adds reply; alerts support

  P-SUP-007-07       Satisfaction question     Radio                Conditional    No             None          Yes; No                                             ---                     Case owner; Resolved case   Case feedback          MSGT-07

  P-SUP-007-08       Reopen case               Button               Conditional    ---            ---           Resolved case within 30 days                        Inline field message    Case owner                  status = In progress   Reopens case

  P-SUP-007-09       Attach file               File input           Conditional    Yes            None          Support attachment rules                            File errors             Case owner                  Case attachment        Adds file to reply
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -----------------------------------------------------
  Empty                    Not applicable; opens only for existing case

  Loading                  Thread skeleton

  Error                    Save failure: ERR-08; not found / permission denied

  Success                  Thread displayed; reply sent or case reopened
  ------------------------------------------------------------------------------

SUP-SCR-08 --- Request form on sign-in page

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-08
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-01
  -------------------------------------------------------------------------

![Figure SUP-SCR-08 --- Request form on sign-in page](media/de75ebb5695b1272a35d043437f02eb3629f4af3.png "Figure SUP-SCR-08 — Request form on sign-in page"){width="6.666666666666667in" height="5.072916666666667in"}

*Figure SUP-SCR-08 --- Request form on sign-in page*

**Navigation**

  -------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-02 Sign in; Get help on the Sign in page
  ----------------------- -------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  -------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Let a person without account access request help.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Request Form on Sign-In Page\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Email address (P-SUP-008-01); Category (P-SUP-008-02); Subject (P-SUP-008-03); Description (P-SUP-008-04); Attachments (P-SUP-008-05); Sensitive-data warning (P-SUP-008-06).

-   Action area (primary action first, then secondary actions and links): Submit request (P-SUP-008-07); Back to sign in (P-SUP-008-08).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**        **Default**   **Allowed values / validation**                **Error**                **Visibility**            **Saved to**                  **Behavior**
  ------------------ ------------------------- -------------------- -------------- ------------------- ------------- ---------------------------------------------- ------------------------ ------------------------- ----------------------------- --------------------
  P-SUP-008-01       Email address             Email input          Yes            Yes before submit   Blank         Valid email; used as requester identity        ERR-02 invalid/missing   Unauthenticated visitor   SupportCase.requester_email   Required

  P-SUP-008-02       Category                  Select               Yes            Yes before submit   None          Support categories                             ERR-02                   Unauthenticated visitor   category                      Required

  P-SUP-008-03       Subject                   Text input           Yes            Yes before submit   Blank         1--120 characters                              ERR-02                   Unauthenticated visitor   subject                       Required

  P-SUP-008-04       Description               Textarea             Yes            Yes before submit   Blank         1--5,000 characters                            ERR-02                   Unauthenticated visitor   description                   Required

  P-SUP-008-05       Attachments               File upload          No             Yes before submit   None          Max 3; 10 MB; JPG/PNG/PDF/DOCX; malware scan   ERR-03/04/06             Unauthenticated visitor   Case attachment               Adds files

  P-SUP-008-06       Sensitive-data warning    Informational text   ---            ---                 ---           MSGT-01                                        ---                      Unauthenticated visitor   ---                           Display only

  P-SUP-008-07       Submit request            Primary button       ---            ---                 ---           Max 10 requests per email/day                  ERR-05                   Unauthenticated visitor   SupportCase.status = New      Creates case

  P-SUP-008-08       Back to sign in           Text link            ---            ---                 ---           ---                                            ---                      Unauthenticated visitor   ---                           Returns to sign-in
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- -----------------------------------------------
  Empty                      Blank form

  Loading                    Submit disabled

  Error                      Validation, file, rate-limit, or save failure

  Success                    Case created; confirmation sent to email
  --------------------------------------------------------------------------

SUP-SCR-09 --- Staff queue

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-09
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-02
  -------------------------------------------------------------------------

![Figure SUP-SCR-09 --- Staff queue](media/fe0c5fd648a6d187697680775c9521657a81afa6.png "Figure SUP-SCR-09 — Staff queue"){width="6.666666666666667in" height="5.0in"}

*Figure SUP-SCR-09 --- Staff queue*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    SUP-SCR-10 Staff case view; SUP-SCR-11 Service notices; SUP-SCR-12 Help article editor; SUP-SCR-13 Reply templates; Support staff sign in to the support workspace
  ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   SUP-SCR-10 Staff case view; SUP-SCR-11 Service notices; SUP-SCR-12 Help article editor; SUP-SCR-13 Reply templates

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Let support staff manage open cases in priority order.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Staff Queue\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Priority (P-SUP-009-03); Category (P-SUP-009-04); Status (P-SUP-009-05); Assigned agent (P-SUP-009-07); Filters (P-SUP-009-10); Internal alert item (P-SUP-009-11); Lead alert (P-SUP-009-12).

-   Input area (form fields, in specification order): Case number (P-SUP-009-02); Time remaining (P-SUP-009-06).

-   Action area (primary action first, then secondary actions and links): Case queue (P-SUP-009-01); Assign to me (P-SUP-009-08); Assign to agent (P-SUP-009-09).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**   **Allowed values / validation**                  **Error**               **Visibility**         **Saved to**         **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- ------------- ------------------------------------------------ ----------------------- ---------------------- -------------------- ---------------------
  P-SUP-009-01       Case queue                Table / list       ---            ---            ---           Priority first, then oldest first                Load error with retry   Support Agent / Lead   ---                  Displays open cases

  P-SUP-009-02       Case number               Text               System         No             Derived       SC- + 8 digits                                   ---                     Support staff          case_number          Opens case

  P-SUP-009-03       Priority                  Badge              System         No             Derived       Normal; Priority                                 ---                     Support staff          priority             Display only

  P-SUP-009-04       Category                  Badge              System         No             Derived       Support category                                 ---                     Support staff          category             Display only

  P-SUP-009-05       Status                    Badge              System         No             Derived       Open statuses                                    ---                     Support staff          status               Display only

  P-SUP-009-06       Time remaining            Countdown / text   System         No             Calculated    Time to first-reply target                       ---                     Support staff          Target calculation   Display only

  P-SUP-009-07       Assigned agent            Text / avatar      System         No             Unassigned    Agent name                                       ---                     Support staff          assigned_agent_id    Display only

  P-SUP-009-08       Assign to me              Row action         ---            ---            ---           Agent only; unassigned case                      Inline field message    Agent                  assigned_agent_id    Assigns case

  P-SUP-009-09       Assign to agent           Row action         ---            ---            ---           Lead only                                        Inline field message    Lead                   assigned_agent_id    Assigns any case

  P-SUP-009-10       Filters                   Control group      No             Yes            None          Status, category, priority, assignee             ---                     Support staff          View state           Filters queue

  P-SUP-009-11       Internal alert item       Warning row        System         No             Derived       Failed/late batch load; no case values           ---                     Support staff          Internal alert       Display only

  P-SUP-009-12       Lead alert                Notification       System         No             Derived       Within 1 working hour of target; target missed   ---                     Lead                   Alert record         Alerts Lead
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                    **Behavior**
  ---------------------------- ------------------------------------------
  Empty                        No open cases

  Loading                      Queue skeleton

  Error                        Queue load failure and retry

  Success                      Prioritized queue displayed
  -----------------------------------------------------------------------

SUP-SCR-10 --- Staff case view

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-10
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-02
  -------------------------------------------------------------------------

![Figure SUP-SCR-10 --- Staff case view](media/b88cf316b32231d663cb444fc9acb6a1042d0dc3.png "Figure SUP-SCR-10 — Staff case view"){width="6.666666666666667in" height="5.208333333333333in"}

*Figure SUP-SCR-10 --- Staff case view*

**Navigation**

  ----------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    SUP-SCR-09 Staff queue
  ----------------------- ----------------------------------------------------------------------------------------------------------------
  **Where you go next**   SUP-SCR-09 Staff queue; SUP-SCR-11 Service notices; SUP-SCR-12 Help article editor; SUP-SCR-13 Reply templates

  ----------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------------------------
  **Purpose**    Let support staff view permitted case facts, reply, and manage the case.
  -------------- --------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Staff Case View\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Plan (P-SUP-010-03); Account status (P-SUP-010-04); Household mode (P-SUP-010-05); Child-support case linked (P-SUP-010-06); Safety Mode status (P-SUP-010-07); Case thread (P-SUP-010-08); Consent-shared message (P-SUP-010-15).

-   Input area (form fields, in specification order): Requester name (P-SUP-010-01); Requester email (P-SUP-010-02); Reply (P-SUP-010-09); Internal note (P-SUP-010-10); Reply template (P-SUP-010-11); Status (P-SUP-010-12); Category (P-SUP-010-13); Audit trail (P-SUP-010-17).

-   Action area (primary action first, then secondary actions and links): Lower priority (P-SUP-010-14) decision link (P-SUP-010-16).

-   Controls that must NOT be provided: Parent messages / recordings / agency values (P-SUP-010-18).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**                        **Type**                  **Required**   **Editable**   **Default**        **Allowed values / validation**                     **Error**              **Visibility**    **Saved to**               **Behavior**
  ------------------ ---------------------------------------------- ------------------------- -------------- -------------- ------------------ --------------------------------------------------- ---------------------- ----------------- -------------------------- ----------------------------------
  P-SUP-010-01       Requester name                                 Text                      System         No             Derived            User name                                           ---                    Support staff     User profile               Display only

  P-SUP-010-02       Requester email                                Text                      System         No             Derived            User email                                          ---                    Support staff     User profile               Display only

  P-SUP-010-04       Account status                                 Badge                     System         No             Derived            Active; Locked                                      ---                    Support staff     User status                Display only

  P-SUP-010-05       Household mode                                 Badge                     System         No             Derived            Linked; Solo                                        ---                    Support staff     Household mode             Display only

  P-SUP-010-06       Child-support case linked                      Badge                     System         No             Derived            Yes; No                                             ---                    Support staff     CSS link status            Display only

  P-SUP-010-08       Case thread                                    Message list              System         No             Derived            Support thread only                                 Load error             Support staff     Case messages              Display only

  P-SUP-010-09       Reply                                          Textarea                  Conditional    Yes            Blank              Required; up to 5,000 characters                    Inline field message   Support staff     Case message               Sends reply; alerts parent

  P-SUP-010-10       Internal note                                  Textarea                  No             Yes            Blank              Staff-only                                          ---                    Support staff     Internal note              Adds private note

  P-SUP-010-11       Reply template                                 Select / insert           No             Yes            None               Legally approved templates only                     Inline field message   Support staff     Case message               Inserts editable template

  P-SUP-010-12       Status                                         Select                    Yes            Yes            Current status     New; In progress; Awaiting user; Resolved; Closed   Inline field message   Support staff     status                     Updates case

  P-SUP-010-13       Category                                       Select                    Yes            Yes            Current category   Support categories                                  Inline field message   Support staff     category                   Updates case

  P-SUP-010-14       Lower priority                                 Action                    Conditional    ---            ---                Priority case; requires note                        ERR-09 without note    Support staff     priority = Normal          Lowers priority; notifies parent

  P-SUP-010-15       Consent-shared message                         Restricted message view   System         No             Derived            Lead only; consent record shown                     ---                    Support Lead      Shared message + consent   Display only

  P-SUP-010-17       Audit trail                                    Timeline                  System         No             Derived            Every view/change                                   Load error             Support staff     Audit log                  Display only

  P-SUP-010-18       Parent messages / recordings / agency values   Not displayed             ---            ---            ---                Never accessible                                    ---                    No support role   ---                        Privacy restriction
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -----------------------------------------------------
  Empty                    Not applicable; opens only for existing case

  Loading                  Case skeleton

  Error                    Not found, permission denied, or action failure

  Success                  Permitted case facts, thread, and actions displayed
  ------------------------------------------------------------------------------

SUP-SCR-11 --- Service notices

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-11
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-02
  -------------------------------------------------------------------------

![Figure SUP-SCR-11 --- Service notices](media/d12a879326a1264db0ff02ce9e59a4033b6b826e.png "Figure SUP-SCR-11 — Service notices"){width="6.666666666666667in" height="5.0in"}

*Figure SUP-SCR-11 --- Service notices*

**Navigation**

  ----------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    SUP-SCR-09 Staff queue; SUP-SCR-10 Staff case view; SUP-SCR-12 Help article editor; SUP-SCR-13 Reply templates
  ----------------------- ----------------------------------------------------------------------------------------------------------------
  **Where you go next**   SUP-SCR-09 Staff queue; SUP-SCR-12 Help article editor; SUP-SCR-13 Reply templates

  ----------------------------------------------------------------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------
  **Purpose**    Let a Lead publish a service notice shown on Help screens.
  -------------- ------------------------------------------------------------

  ---------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Service Notices\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Notice text (P-SUP-011-01); Start time (P-SUP-011-02); End time (P-SUP-011-03); Status (P-SUP-011-04).

-   Action area (primary action first, then secondary actions and links): Save (P-SUP-011-05); Publish / Unpublish (P-SUP-011-06); Notice list (P-SUP-011-07).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**              **Allowed values / validation**   **Error**              **Visibility**   **Saved to**         **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- ------------------------ --------------------------------- ---------------------- ---------------- -------------------- ------------------------
  P-SUP-011-01       Notice text               Textarea           Yes            Yes            Blank or current value   1--500 characters                 ERR-11 if too long     Support Lead     ServiceNotice.text   Required

  P-SUP-011-02       Start time                Date-time picker   Yes            Yes            Now                      Valid date-time                   ERR-11 invalid range   Support Lead     start_at             Required

  P-SUP-011-03       End time                  Date-time picker   Yes            Yes            Blank or current value   After start                       ERR-11 invalid range   Support Lead     end_at               Required

  P-SUP-011-04       Status                    Toggle / select    Yes            Yes            Draft                    Draft; Published; Unpublished     Inline field message   Support Lead     status               Controls visibility

  P-SUP-011-05       Save                      Primary button     ---            ---            ---                      ---                               ---                    Support Lead     Service notice       Creates/updates notice

  P-SUP-011-06       Publish / Unpublish       Action             ---            ---            ---                      ---                               ---                    Support Lead     status               Changes visibility

  P-SUP-011-07       Notice list               Table              ---            ---            ---                      All notices                       Load error             Support Lead     ---                  Displays notices
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- -------------------------------------------------
  Empty                      No notices; create action

  Loading                    Save disabled

  Error                      Missing/long text or invalid time range: ERR-11

  Success                    Notice saved/published
  ----------------------------------------------------------------------------

SUP-SCR-12 --- Help article editor

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-12
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-02
  -------------------------------------------------------------------------

![Figure SUP-SCR-12 --- Help article editor](media/b051f6be82e2775f8d5d05e9cd8f2bf4a2113cf6.png "Figure SUP-SCR-12 — Help article editor"){width="6.666666666666667in" height="5.0in"}

*Figure SUP-SCR-12 --- Help article editor*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    SUP-SCR-09 Staff queue; SUP-SCR-10 Staff case view; SUP-SCR-11 Service notices; SUP-SCR-13 Reply templates
  ----------------------- ------------------------------------------------------------------------------------------------------------
  **Where you go next**   SUP-SCR-09 Staff queue; SUP-SCR-11 Service notices; SUP-SCR-13 Reply templates

  ------------------------------------------------------------------------------------------------------------------------------------

Specification

  -------------------------------------------------------------------------------
  **Purpose**    Let a Lead create, edit, publish, and unpublish help articles.
  -------------- ----------------------------------------------------------------

  -------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Help Article Editor\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Title (P-SUP-012-01); Body (P-SUP-012-02); Topic (P-SUP-012-03); Status (P-SUP-012-04); Version history (P-SUP-012-08).

-   Action area (primary action first, then secondary actions and links): Save draft (P-SUP-012-05); Publish (P-SUP-012-06); Unpublish (P-SUP-012-07).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**              **Allowed values / validation**                                                                                                   **Error**              **Visibility**   **Saved to**           **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------------------ --------------------------------------------------------------------------------------------------------------------------------- ---------------------- ---------------- ---------------------- --------------------------
  P-SUP-012-01       Title                     Text input           Yes            Yes            Blank or current value   Required; up to 5,000 characters                                                                                                  ERR-10 missing         Support Lead     HelpArticle.title      Required

  P-SUP-012-02       Body                      Rich-text editor     Yes            Yes            Blank or current value   Required                                                                                                                          ERR-10 missing         Support Lead     HelpArticle.body       Required

  P-SUP-012-03       Topic                     Select               Yes            Yes            None or current value    Account and sign-in; Messages and calls; Calendar and expenses; Records and exports; Child support link; Safety; Something else   Inline field message   Support Lead     HelpArticle.topic      Required

  P-SUP-012-04       Status                    Select / toggle      Yes            Yes            Draft                    Draft; Published; Unpublished                                                                                                     Inline field message   Support Lead     status                 Controls visibility

  P-SUP-012-05       Save draft                Secondary button     ---            ---            ---                      ---                                                                                                                               ---                    Support Lead     Article draft          Saves without publishing

  P-SUP-012-06       Publish                   Primary button       ---            ---            ---                      Requires title and body                                                                                                           ERR-10                 Support Lead     Published article      Publishes article

  P-SUP-012-07       Unpublish                 Destructive button   ---            ---            ---                      Published article                                                                                                                 ---                    Support Lead     status = Unpublished   Removes from public help

  P-SUP-012-08       Version history           Timeline             System         No             Derived                  Earlier versions retained                                                                                                         Load error             Support Lead     Article versions       Display only
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- --------------------------------------------
  Empty                      Blank article form

  Loading                    Save/publish disabled

  Error                      Missing title/body: ERR-10

  Success                    Article saved, published, or unpublished
  -----------------------------------------------------------------------

SUP-SCR-13 --- Reply templates

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-13
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-02
  -------------------------------------------------------------------------

![Figure SUP-SCR-13 --- Reply templates](media/d0291f0c6595c0815ddf77379d68d95dce379c9e.png "Figure SUP-SCR-13 — Reply templates"){width="6.666666666666667in" height="5.0in"}

*Figure SUP-SCR-13 --- Reply templates*

**Navigation**

  ----------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    SUP-SCR-09 Staff queue; SUP-SCR-10 Staff case view; SUP-SCR-11 Service notices; SUP-SCR-12 Help article editor
  ----------------------- ----------------------------------------------------------------------------------------------------------------
  **Where you go next**   SUP-SCR-09 Staff queue; SUP-SCR-11 Service notices; SUP-SCR-12 Help article editor

  ----------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Let a Lead manage legally approved reply templates.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Reply Templates\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Legal approval status (P-SUP-013-03).

-   Input area (form fields, in specification order): Template name (P-SUP-013-01); Template text (P-SUP-013-02); Category (P-SUP-013-04).

-   Action area (primary action first, then secondary actions and links): Save (P-SUP-013-05); Use template (P-SUP-013-06); Template list (P-SUP-013-07).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**              **Allowed values / validation**                                                                                                   **Error**              **Visibility**   **Saved to**             **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- ------------------------ --------------------------------------------------------------------------------------------------------------------------------- ---------------------- ---------------- ------------------------ ----------------------------------
  P-SUP-013-01       Template name             Text input         Yes            Yes            Blank or current value   Required; up to 5,000 characters                                                                                                  Inline field message   Support Lead     ReplyTemplate.name       Required

  P-SUP-013-02       Template text             Rich-text editor   Yes            Yes            Blank or current value   Required; no legal advice                                                                                                         Inline field message   Support Lead     ReplyTemplate.body       Required

  P-SUP-013-03       Legal approval status     Badge              System         No             Pending                  Approved; Not approved                                                                                                            ---                    Support Lead     Approval record          Only approved templates usable

  P-SUP-013-04       Category                  Select             Yes            Yes            None                     Account and sign-in; Messages and calls; Calendar and expenses; Records and exports; Child support link; Safety; Something else   Inline field message   Support Lead     ReplyTemplate.category   Required

  P-SUP-013-05       Save                      Primary button     ---            ---            ---                      ---                                                                                                                               ---                    Support Lead     Template/version         Saves template

  P-SUP-013-06       Use template              Row action         ---            ---            ---                      Agent; approved template only                                                                                                     Inline field message   Agent / Lead     Case message             Inserts editable text into reply

  P-SUP-013-07       Template list             Table              ---            ---            ---                      All templates                                                                                                                     Load error             Support Lead     ---                      Displays templates
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- ------------------------------------------------
  Empty                      No templates; create action

  Loading                    Template skeleton

  Error                      Validation or save failure

  Success                    Templates displayed; approved templates usable
  ---------------------------------------------------------------------------

SUP-SCR-14 --- Support measures report

  -------------------------------------------------------------------------
  **Screen ID**    SUP-SCR-14
  ---------------- --------------------------------------------------------
  **Module**       Support

  **Feature(s)**   SUP-03
  -------------------------------------------------------------------------

![Figure SUP-SCR-14 --- Support measures report](media/ca786aa9065b928b5b461b7a5fdd0bc0e7a316a8.png "Figure SUP-SCR-14 — Support measures report"){width="6.666666666666667in" height="5.0in"}

*Figure SUP-SCR-14 --- Support measures report*

**Navigation**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-16 Load log for operations; REC-SCR-09 Staff review of affidavits; Operations staff sign in to the operations workspace
  ----------------------- ---------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   CSS-SCR-16 Load log for operations; REC-SCR-09 Staff review of affidavits

  ---------------------------------------------------------------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

Cross-screen rules and pending screen decisions (Support)

Cross-screen Support rules

Pending screen decisions --- Support

14.7 Field-level specifications

6.1 Support Case --- SUP-SCR-04 New request form / SUP-SCR-07 Request thread → SUP-SCR-04, SUP-SCR-07

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**            **Technical name**   **Type / control**   **Required**   **Editable**             **Default**   **Allowed values / validation**                                                                                                   **Visibility**
  -------------- -------------------- -------------------- -------------------- -------------- ------------------------ ------------- --------------------------------------------------------------------------------------------------------------------------------- ---------------------
  FLD-SUP-001    Case number          case_number          Display              System         No                       Generated     SC- + 8 digits; unique                                                                                                            Requester / Support

  FLD-SUP-002    Category             category             Select               Yes            Support can change       None          Account and sign-in; Messages and calls; Calendar and expenses; Records and exports; Child support link; Safety; Something else   Requester / Support

  FLD-SUP-003    Subject              subject              Text                 Yes            Requester before close   None          1--120 characters; ERR-02                                                                                                         Requester / Support

  FLD-SUP-004    Description          description          Textarea             Yes            Requester before close   None          1--5,000 characters; ERR-02                                                                                                       Requester / Support

  FLD-SUP-005    Court date           court_date           Date                 No             Requester before close   None          Today or future; ERR-07 if past                                                                                                   Requester / Support

  FLD-SUP-006    Attachments          attachment_ids       File upload          No             Before close             None          Max 3; total 10 MB; JPG, PNG, PDF, DOCX; malware scan                                                                             Requester / Support

  FLD-SUP-007    Priority             priority             Display              System         No                       Normal        Normal, Priority                                                                                                                  Support queue

  FLD-SUP-008    Status               status               Display              System         No                       New           New, In progress, Awaiting user, Resolved, Closed                                                                                 Requester / Support

  FLD-SUP-009    First-reply target   first_reply_target   Timestamp            System         No                       Derived       Four working hours for Priority                                                                                                   Support queue

  FLD-SUP-010    Assigned agent       assigned_agent_id    Select               No             Support Lead / Agent     Unassigned    Support staff                                                                                                                     Support queue
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

6.2 Case Reply --- SUP-SCR-10 Staff case view → SUP-SCR-10

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**       **Technical name**   **Type / control**   **Required**   **Editable**    **Default**    **Allowed values / validation**           **Visibility**
  -------------- --------------- -------------------- -------------------- -------------- --------------- -------------- ----------------------------------------- -------------------
  FLD-SUP-020    Reply           reply_text           Textarea             Yes            No after send   None           Not specified --- confirmation required   Case participants

  FLD-SUP-021    Sender          sender_id            System               System         No              Current user   Requester or Support                      Case thread

  FLD-SUP-022    Sent at         sent_at              Timestamp            System         No              Send time      UTC                                       Case thread

  FLD-SUP-023    Internal note   internal_note        Textarea             No             Support         None           Not visible to requester                  Support only
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

14.8 User actions and procedures

ACT-SUP-001 --- Create Support Request

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Signed-in user, unauthenticated user, or email sender
  --------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            SUP-SCR-04 New request form

  **Objective**         Get help with a case number and response target

  **Trigger**           User submits form or sends support email

  **Preconditions**     Required fields supplied

  **System behavior**   Create case with unique SC- + 8-digit number; set status New; assign normal or Priority target; send confirmation except Safety Mode users receive no case-detail email.

  **Data created**      Support case, case number, attachments, audit log

  **Validations**       Category, subject 1--120, description 1--5,000 required; optional court-date question; up to 3 files / 10 MB total; accepted JPG, PNG, PDF, DOCX; malware scan.

  **Success**           Confirmation with case number and target

  **Negative**          Missing/overlong field: ERR-02; file count/type/scan issue: ERR-04/ERR-03/ERR-06; past court date: ERR-07; 11th request in a day: ERR-05; save failure: ERR-01/ERR-08.

  **Permissions**       Signed-in user for own cases; unauthenticated requester for email-based case; support staff for queue.

  **Source**            SUP-01; FR-SUP-01-01--FR-SUP-01-30.

  **Screen(s)**         SUP-SCR-04 New request form
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Make sure the preconditions are met: Required fields supplied.

2.  Enter or select the required information: Category; Subject; Description; Is this about a court date?.

3.  Perform the action: User submits form or sends support email.

4.  The system validates: Category, subject 1--120, description 1--5,000 required; optional court-date question; up to 3 files / 10 MB total; accepted JPG, PNG, PDF, DOCX; malware scan.

5.  The system processes the action: Create case with unique SC- + 8-digit number; set status New; assign normal or Priority target; send confirmation except Safety Mode users receive no case-detail email.

6.  Result on success: Confirmation with case number and target.

7.  If it fails or a rule is not met: Missing/overlong field: ERR-02; file count/type/scan issue: ERR-04/ERR-03/ERR-06; past court date: ERR-07; 11th request in a day: ERR-05; save failure: ERR-01/ERR-08.

ACT-SUP-002 --- Reply to Support Case

  ----------------------------------------------------------------------------------------------------------------
  **Actor**             Requester or Support staff
  --------------------- ------------------------------------------------------------------------------------------
  **Screen**            SUP-SCR-07 Request thread / SUP-SCR-10 Staff case view

  **Objective**         Continue a case

  **Trigger**           User replies in app or by email

  **Preconditions**     Case exists and is not permanently closed

  **System behavior**   Append reply to same case; notify other party; update status as applicable.

  **Data created**      Case message; audit log

  **Success**           Reply visible in case thread

  **Alternative**       Reply to Resolved case within 30 days reopens it; after 30 days creates linked new case.

  **Permissions**       Case participant; support staff

  **Source**            FR-SUP-01-11, FR-SUP-01-12.

  **Screen(s)**         SUP-SCR-07 Request thread, SUP-SCR-10 Staff case view
  ----------------------------------------------------------------------------------------------------------------

1.  Open SUP-SCR-07 Request thread, SUP-SCR-10 Staff case view (entry: SUP-SCR-05 Request confirmation; SUP-SCR-06 My requests; email link).

2.  Make sure the preconditions are met: Case exists and is not permanently closed.

3.  Enter or select the required information: Status; Category.

4.  Perform the action: User replies in app or by email.

5.  The system processes the action: Append reply to same case; notify other party; update status as applicable.

6.  Result on success: Reply visible in case thread.

7.  If it fails or a rule is not met: Reply to Resolved case within 30 days reopens it; after 30 days creates linked new case.

ACT-SUP-003 --- Prioritize Safety or Court-Date Case

  ----------------------------------------------------------------------------------------------------------
  **Actor**             System
  --------------------- ------------------------------------------------------------------------------------
  **Screen**            SUP-SCR-04 New request form / SUP-SCR-09 Staff queue

  **Objective**         Accelerate urgent cases

  **Trigger**           Category is Safety, or user identifies court date within next 14 days

  **Preconditions**     Case created

  **System behavior**   Mark Priority; set first-reply target to four working hours; queue Priority first.

  **Data updated**      Case priority/target

  **Negative**          Past court date: ERR-07.

  **Source**            FR-SUP-01-15, FR-SUP-01-16.

  **Screen(s)**         SUP-SCR-04 New request form, SUP-SCR-09 Staff queue
  ----------------------------------------------------------------------------------------------------------

1.  Make sure the preconditions are met: Case created.

2.  Enter or select the required information: Category; Subject; Description; Is this about a court date?.

3.  Perform the action: Category is Safety, or user identifies court date within next 14 days.

4.  The system processes the action: Mark Priority; set first-reply target to four working hours; queue Priority first.

5.  If it fails or a rule is not met: Past court date: ERR-07.

ACT-SUP-004 --- Manage Support Queue

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Support Agent / Lead
  --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            SUP-SCR-09 Staff queue / SUP-SCR-10 Staff case view

  **Objective**         Respond within SLA without accessing restricted content

  **Trigger**           Staff opens queue/case

  **Preconditions**     Staff passed 2FA

  **System behavior**   Show Priority first then oldest; display permitted metadata and thread; allow assignment, reply, internal notes, status/category changes; alert Leads near/after SLA breach; audit every view/change.

  **Data updated**      Case assignment/status/category; internal notes; audit log

  **Success**           Case handled

  **Restriction**       Staff cannot see messages, call recordings, agency values, passwords, one-time codes, or Safety Mode settings; cannot change user settings; cannot contact co-parent about a parent's case.

  **Source**            SUP-02; FR-SUP-02-01--FR-SUP-02-18.

  **Screen(s)**         SUP-SCR-09 Staff queue, SUP-SCR-10 Staff case view
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open SUP-SCR-09 Staff queue, SUP-SCR-10 Staff case view (entry: Staff workspace; 2FA required).

2.  Make sure the preconditions are met: Staff passed 2FA.

3.  Enter or select the required information: Status; Category.

4.  Perform the action: Staff opens queue/case.

5.  The system processes the action: Show Priority first then oldest; display permitted metadata and thread; allow assignment, reply, internal notes, status/category changes; alert Leads near/after SLA breach; audit every view/change.

6.  Result on success: Case handled.

14.9 Business rules and validations

  --------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**        **Rule**                                                                                                                       **Features**
  ------------- ------------------------------------------------------------------------------------------------------------------------------ -----------------
  BR-25         Every request gets a case number. Issues tied to court dates are handled first.                                                SUP-01, SUP-02

  BR-31         Support staff never contact the co-parent about the case of a parent, and never confirm to the co-parent that a case exists.   SUP-02
  --------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- ---------------------------------------------------------------------------------------------------------------------------------
  BR-05      Data export, tone, safety and reporting tools are available to every user.

  BR-21      Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.

  BR-25      Every request gets a case number. Issues tied to court dates are handled first.

  BR-31      Support staff never contact the co-parent about the case of a parent, and never confirm to the co-parent that a case exists.
  --------------------------------------------------------------------------------------------------------------------------------------------

14.10 Messages and errors

Errors

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **When it shows**                                       **Text**                                                                                                                            **Used by**
  ---------- ------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------- ----------------------------
  ERR-01     A request cannot be saved                               We could not send your request. Nothing was saved. Please try again.                                                                FR-SUP-01-30

  ERR-02     A required field is missing or too long                 Fill in the category, the subject and the description. The subject can have up to 120 characters and the description up to 5,000.   FR-SUP-01-04, FR-SUP-01-30

  ERR-03     A file has a type that is not allowed                   This file type is not allowed. Use JPG, PNG, PDF or DOCX.                                                                           FR-SUP-01-06

  ERR-04     There are too many files or they are too big            Attach up to 3 files, 10 MB in all.                                                                                                 FR-SUP-01-06

  ERR-05     A user opens an 11th request in a day                   You sent many requests today. Please wait until tomorrow, or reply to an open case.                                                 FR-SUP-01-29

  ERR-06     A file fails the malware scan                           We could not attach this file because it did not pass our safety check.                                                             FR-SUP-01-06

  ERR-07     The court date is in the past                           Enter a court date that is today or later.                                                                                          FR-SUP-01-17

  ERR-08     A reply cannot be saved                                 We could not send your reply. Please try again.                                                                                     FR-SUP-01-30

  ERR-09     A Priority case is lowered without a note               Add a note to say why the priority is lowered.                                                                                      FR-SUP-02-08

  ERR-10     An article is published without a title or a text       Add a title and a text before you publish.                                                                                          FR-SUP-02-16

  ERR-11     A service notice is too long or ends before it starts   The notice can have up to 500 characters, and the end time must be after the start time.                                            FR-SUP-02-15
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **When it shows**                              **Text**                                                                                                                                                                                                     **Feature**
  ----------- ---------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ----------------
  MSGT-01     The request form opens                         Do not write passwords, full Social Security numbers or card numbers in your request.                                                                                                                        SUP-01

  MSGT-02     A request is saved                             We received your request. Your case number is \[number\]. We reply within \[1 business day or 4 working hours\]. Support is open Monday to Friday, 8 am to 8 pm Eastern. We open next on \[day and time\].   SUP-01

  MSGT-03     Support replies to a case                      Support replied to case \[number\].                                                                                                                                                                          SUP-01, SUP-02

  MSGT-04     A help search has no result                    No articles match your search. You can contact support.                                                                                                                                                      SUP-01

  MSGT-05     The category Safety is chosen                  If you are in danger, call 911. \[Help and support links approved by advocates.\]                                                                                                                            SUP-01

  MSGT-06     Staff lower a Priority case                    We changed your request to normal priority. Reason: \[note\]. We reply within 1 business day of the time you sent it.                                                                                        SUP-02

  MSGT-07     A case is Resolved                             Did we solve your problem?                                                                                                                                                                                   SUP-01

  MSGT-08     A service notice is active                     \[Text of the notice\]                                                                                                                                                                                       SUP-01, SUP-02

  MSGT-09     A case is Closed                               Your case \[number\] is closed. Reply to open it again within 30 days.                                                                                                                                       SUP-01

  MSGT-10     The Help screen opens when support is closed   Support is closed now. We open on \[day and time\]. You can still send a request.                                                                                                                            SUP-01
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

14.11 Dependencies

12.2 Modules that need this module.

  --------------------------------------------------------------------------------------------
  **Module**                **What it needs from Support**
  ------------------------- ------------------------------------------------------------------
  Messaging                 The Leads who review a message that a parent shared with consent

  Child Support Sync        Staff who get the alerts about failed or late loads

  Safety and Privacy        Discreet and priority handling of Safety requests
  --------------------------------------------------------------------------------------------

12.3 Assumptions

-   A business day is 12 support hours. Support is closed on US federal holidays, and those days do not count.

-   The vendor pages named in section 15 describe the apps on October 13, 2026 and can change.

14.12 End-to-end workflows and scenarios

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                           **Module path**                 **Features / rules**
  -------------- --------------------------------------------------------------------------------------------------------- ------------------------------- ------------------------------
  WF-06          Receive a hostile message: shield holds it, reason shown, user views original, may report it              MSG → SAF → SUP                 MSG-06, MSG-14, BR-10

  WF-14          Turn Safety Mode on (notice + confirm), effects across modules, Exit Now, turn off with one-time code     SAF → MSG/CAL/DOC/NTF/PLT/SUP   SAF-01, BR-22

  WF-18          Support request → case number → priority for safety / court date → staff queue → reply → close / reopen   SUP → NTF                       SUP-01, SUP-02, BR-25, BR-31
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Scenario**   **Scenario**                **Expected behaviour**
  -------------- --------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------
  SCN-SUP-001    User reports Safety issue   Case categorized Safety, marked Priority, four-working-hour target; Safety Mode user receives in-app reply and non-identifying email alert.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
