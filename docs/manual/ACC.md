# Accounts and Onboarding (ACC)


3.1 Module overview

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Purpose                 Takes a parent from sign-up to a working account and gets the co-parent on board. If the co-parent will not join, the parent can carry on alone and still keep a proper record.

  Users                   Parent, co-parent, invited third parties

  Pain points addressed   P10, P11, P25

  Features                8 (5 Must-have, 3 Good-to-have, 0 Unique)

  Depends on              Notifications (SMS and email channels), Records and Court (contact log is part of the record), Child Support Sync (sign-in strength, agency invite).
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Sign-in with two-factor authentication and a biometric or passcode lock. The app will hold agency data, so this is a firm requirement.

-   Invitations by text, email or link, with the status of each invite shown (sent, opened, accepted).

-   Solo Mode, so a parent gets full value even when the other parent never joins.

-   A way to reach a co-parent who is not on the app, by text or email, with the whole exchange saved in the record.

-   A log of every contact attempt, with date and time.

-   Smaller items: a session timeout the user can set, saved drafts, household roles, and English screens.

Purpose and scope

2.1 Purpose. This module takes a parent from sign-up to a working account and gets the co-parent on board. If the co-parent will not join, the parent can carry on alone and still keep a proper record.

  ------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **How this module supports it**
  ------------------ -----------------------------------------------------------------------------------------------------------------------------
  OBJ-01             The contact-attempt log is part of the court-ready record (ACC-05).

  OBJ-02             Sign-in strength is needed because the app holds agency data (ACC-01). An agency notice can later carry an invite (CSS-09).

  OBJ-03             Fixes the High-rated pain point P11 (ACC-02 to ACC-05).

  OBJ-04             No billing starts until the co-parent is linked or the parent chooses Solo Mode (BR-03).
  ------------------------------------------------------------------------------------------------------------------------------------------------

3.2 Roles and permissions

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**                          **What they do in this module**
  --------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parent                            Creates an account, signs in with two-factor sign-in, turns on the app lock, invites the co-parent, chooses Solo Mode, contacts a co-parent who is not on the app, and views the contact-attempt log. Sets the session timeout and manages household roles.

  Co-parent                         Receives an invite. After accepting, creates an account and signs in with two-factor sign-in like every user.

  Co-parent who is not on the app   Receives a text or email from the parent (ACC-04). Has no account.1.

  Support staff                     No feature in this module.2 gives both read access to own-profile data and the audit log.

  Professional                      Not covered here. Invites and roles for professionals are in PRO.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3.3 Business requirements

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Business requirement**                                                                                                   **Features**
  -------------- -------------------------------------------------------------------------------------------------------------------------- ------------------------
  BREQ-01        A parent can create an account and sign in with a second check, so that family and agency data stay private.               ACC-01

  BREQ-02        A parent can invite the co-parent and see the status of each invite.                                                       ACC-02

  BREQ-03        A parent can use the app alone and still keep a full record.                                                               ACC-03

  BREQ-04        A parent can reach a co-parent who is not on the app and keep a full record of every contact attempt and every exchange.   ACC-04, ACC-05

  BREQ-05        A user can choose how long a session lasts and does not lose drafts when signed out.                                       ACC-06

  BREQ-06        A parent can add household members with the roles Parent, Child or Third party.                                            ACC-07

  BREQ-08        A person can verify their email, reset their password and change their profile details.                                    ACC-09, ACC-10, ACC-11

  BREQ-09        A user can close their account and get an export of their data first.                                                      ACC-12
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------

3.4 Features

  ---------------------------------------------------------------------------------------------------------------------------
  **Feature**   **Name**                                                                        **Type**
  ------------- ------------------------------------------------------------------------------- -----------------------------
  ACC-01        Sign-in with two-factor authentication and biometric or passcode lock           Must-have → Must-have

  ACC-02        Invite the co-parent by text, email or link, with invite status                 Must-have → Must-have

  ACC-03        Solo Mode: keep records without the co-parent joining                           Must-have → Must-have

  ACC-04        Reach a co-parent who is not on the app, by text or email, with a full record   Must-have → Must-have

  ACC-05        Contact-attempt log                                                             Must-have → Must-have

  ACC-06        User-set session timeout and draft auto-save                                    Good-to-have → Good-to-have

  ACC-07        Household roles: parent, child and third party                                  Good-to-have → Good-to-have

  ACC-09        Email verification at sign-up (proposed)                                        --- → Proposed

  ACC-10        Password reset (proposed)                                                       --- → Proposed

  ACC-11        Profile management (proposed)                                                   --- → Proposed

  ACC-12        Account closure (proposed)                                                      --- → Proposed
  ---------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**           **Screens**
  ------------------ ----------------------- -------------------------------------------------------------------------------------------------
  ACC-SUB-01         Authentication          Landing / sign-up; email verification; sign-in; two-factor code; password reset; account locked

  ACC-SUB-02         App security            Passcode lock setup; passcode unlock

  ACC-SUB-03         Household setup         Create household; choose Solo Mode; household overview

  ACC-SUB-04         Co-parent invitation    Invite co-parent; invite status list; cancel invite; invite landing; expired/cancelled invite

  ACC-SUB-05         Non-app communication   Send text/email to non-app co-parent; exchange thread; contact-attempt log

  ACC-SUB-06         Profile                 Profile view/edit; account settings

  ACC-SUB-07         Account closure         Close-account request; export-before-close

  ACC-SUB-08         Household roles         Add/manage child or third party

  ACC-SUB-09         Localization            Language selection
  --------------------------------------------------------------------------------------------------------------------------------------------

3.5 Screen inventory

  -------------------------------------------------------------------------
  **Screen ID**   **Screen**                                 **Feature**
  --------------- ------------------------------------------ --------------
  ACC-SCR-01      Create account                             ACC-01

  ACC-SCR-02      Sign in                                    ACC-01

  ACC-SCR-03      Second check                               ACC-01

  ACC-SCR-04      App lock settings                          ACC-01

  ACC-SCR-05      Invite co-parent                           ACC-02

  ACC-SCR-06      Invite list and status                     ACC-02

  ACC-SCR-07      Accept invite                              ACC-02

  ACC-SCR-08      Choose Solo Mode                           ACC-03

  ACC-SCR-09      Contact co-parent who is not on the app    ACC-04

  ACC-SCR-10      Contact-attempt log                        ACC-05

  ACC-SCR-11      Session and draft settings                 ACC-06

  ACC-SCR-12      Household members and roles                ACC-07

  ACC-SCR-14      Verify email                               ACC-09

  ACC-SCR-15      Reset password                             ACC-10

  ACC-SCR-16      Profile                                    ACC-11

  ACC-SCR-17      Enter passcode                             ACC-01

  ACC-SCR-18      Close account                              ACC-12

  ACC-SCR-B01     Household Overview                         ---
  -------------------------------------------------------------------------

3.6 Screen specifications

ACC-SCR-01 --- Create account

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-01
  -------------------------------------------------------------------------

![Figure ACC-SCR-01 --- Create account](media/98a2fad7386b0dae5c03ecaf125d740bee4e3173.png "Figure ACC-SCR-01 — Create account"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-01 --- Create account*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-02 Sign in; ACC-SCR-14 Verify email; Opening the ParentPath web address, or Sign up on Sign in
  ----------------------- --------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; ACC-SCR-14 Verify email; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  --------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Create a Parent account.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Sign Up\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Email (P-ACC-001-01); Display name (P-ACC-001-02); Password (P-ACC-001-03).

-   Action area (primary action first, then secondary actions and links): Create account (P-ACC-001-04); Sign in (P-ACC-001-05).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**   **Allowed values / validation**     **Error**        **Visibility**   **Saved to**         **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- ------------- ----------------------------------- ---------------- ---------------- -------------------- ------------------------------------------------------------
  P-ACC-001-01       Email                     Email input      Yes            Yes            Blank         Valid email; unique account email   ERR-01, ERR-04   All visitors     User.email           Validates before submission

  P-ACC-001-02       Display name              Text input       Yes            Yes            Blank         1--60 characters                    ERR-03           All visitors     User.display_name    Saved with account

  P-ACC-001-03       Password                  Password input   Yes            Yes            Blank         Minimum 8 characters                ERR-10           All visitors     User.password_hash   Validated before account creation

  P-ACC-001-04       Create account            Primary button   ---            ---            ---           ---                                 ---              All visitors     ---                  Validates form; creates account; navigates to Verify Email

  P-ACC-001-05       Sign in                   Text link        ---            ---            ---           ---                                 ---              All visitors     ---                  Opens ACC-SCR-02 Sign in
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------------------
  **State**              **Behavior**
  ---------------------- -------------------------------------------------------------------
  Empty                  Blank form; primary action disabled until required fields entered

  Loading                Disable Create account; show progress indicator

  Error                  Inline field errors; no account created

  Success                Navigate to ACC-SCR-14 Verify email
  ------------------------------------------------------------------------------------------

ACC-SCR-02 --- Sign in

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-01
  -------------------------------------------------------------------------

![Figure ACC-SCR-02 --- Sign in](media/74a66d7e63e4fc4ee9549305a74aa27929a0c098.png "Figure ACC-SCR-02 — Sign in"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-02 --- Sign in*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-01 Create account; ACC-SCR-03 Second check; ACC-SCR-07 Accept invite; ACC-SCR-15 Reset password; ACC-SCR-17 Enter passcode; ACC-SCR-25 Session timeout warning; DOC-SCR-13 Public share link page; DOC-SCR-15 Emergency contact consent page; PRO-SCR-06 Accept invite (professional); REC-SCR-03 Public verification page; REC-SCR-10 Public records request page; REC-SCR-11 Public court notes by state; REC-SCR-12 Public model order language; REC-SCR-13 Public retention policy; SAF-SCR-05 Public safety resources; SUP-SCR-08 Request form on sign-in page; Opening the ParentPath web address; after sign-out or session end
  ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-01 Create account; ACC-SCR-03 Second check; ACC-SCR-15 Reset password; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help; SUP-SCR-08 Request form on sign-in page

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Authenticate an existing user.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Sign In\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Email (P-ACC-003-01); Password (P-ACC-003-02).

-   Action area (primary action first, then secondary actions and links): Forgot password (P-ACC-003-03); Sign in (P-ACC-003-04); Create account (P-ACC-003-05).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**   **Allowed values / validation**   **Error**   **Visibility**   **Saved to**     **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- ------------- --------------------------------- ----------- ---------------- ---------------- -----------------------------------------------------------------
  P-ACC-003-01       Email                     Email input      Yes            Yes            Blank         Valid email                       ERR-01      All visitors     Session lookup   Identifies account

  P-ACC-003-02       Password                  Password input   Yes            Yes            Blank         Required                          ERR-01      All visitors     ---              Validates credentials

  P-ACC-003-03       Forgot password           Text link        ---            ---            ---           ---                               ---         All visitors     ---              Opens ACC-SCR-15 Reset password

  P-ACC-003-04       Sign in                   Primary button   ---            ---            ---           ---                               ---         All visitors     ---              On success sends 6-digit code and opens ACC-SCR-03 Second check

  P-ACC-003-05       Create account            Text link        ---            ---            ---           ---                               ---         All visitors     ---              Opens ACC-SCR-01 Create account
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- ----------------------------------------------------------------------------------------
  Empty                   Blank form; Sign in disabled

  Loading                 Sign in disabled

  Error                   Wrong password: ERR-01; fifth consecutive failure locks account for 15 minutes: ERR-11

  Success                 One-time code sent; navigate to ACC-SCR-03 Second check
  ----------------------------------------------------------------------------------------------------------------

ACC-SCR-03 --- Second check

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-01
  -------------------------------------------------------------------------

![Figure ACC-SCR-03 --- Second check](media/8fd18334a22e213fc111605b91194579e441381e.png "Figure ACC-SCR-03 — Second check"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-03 --- Second check*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-02 Sign in; Automatically after Sign in
  ----------------------- ------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; ACC-SCR-08 Choose Solo Mode; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  ------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Complete sign-in with a one-time code.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Two-Factor Authentication\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Code destination (P-ACC-004-01).

-   Input area (form fields, in specification order): One-time code (P-ACC-004-02); Send code by (P-ACC-004-03).

-   Action area (primary action first, then secondary actions and links): Resend code (P-ACC-004-04); Verify (P-ACC-004-05); Back to sign in (P-ACC-004-06).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**      **Default**                                   **Allowed values / validation**                        **Error**              **Visibility**        **Saved to**            **Behavior**
  ------------------ ------------------------- ------------------ -------------- ----------------- --------------------------------------------- ------------------------------------------------------ ---------------------- --------------------- ----------------------- ---------------------------------
  P-ACC-004-01       Code destination          Read-only text     Yes            No                Verified email; verified mobile if selected   Masked email/mobile                                    ---                    Authenticating user   ---                     Shows where code was sent

  P-ACC-004-02       One-time code             Numeric input      Yes            Yes               Blank                                         Exactly 6 digits; valid 10 minutes; single use         ERR-02                 Authenticating user   Authentication record   Validates code

  P-ACC-004-03       Send code by              Radio group        Conditional    Yes before send   Email                                         Email; SMS only if verified mobile exists              Inline field message   Authenticating user   ---                     Changes delivery channel

  P-ACC-004-04       Resend code               Secondary button   ---            ---               ---                                           Available after 60 seconds; at most 5 codes per hour   Inline field message   Authenticating user   ---                     Sends new code

  P-ACC-004-05       Verify                    Primary button     ---            ---               ---                                           ---                                                    ---                    Authenticating user   ---                     Creates session; opens app home

  P-ACC-004-06       Back to sign in           Text link          ---            ---               ---                                           ---                                                    ---                    Authenticating user   ---                     Returns to ACC-SCR-02 Sign in
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- ------------------------------------------------------------------------
  Empty                   Code blank; Verify disabled

  Loading                 Verify/Resend disabled

  Error                   Invalid/expired/used code: ERR-02; fifth failure locks account: ERR-11

  Success                 User signed in; redirect to home or intended page
  ------------------------------------------------------------------------------------------------

ACC-SCR-04 --- App lock settings

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-01
  -------------------------------------------------------------------------

![Figure ACC-SCR-04 --- App lock settings](media/8c92f10d11d64a5381d2b4b2c67c9204309fe091.png "Figure ACC-SCR-04 — App lock settings"){width="6.666666666666667in" height="5.166666666666667in"}

*Figure ACC-SCR-04 --- App lock settings*

**Navigation**

  -------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-16 Profile; ACC-SCR-20 Settings; ACC-SCR-B01 Household overview
  ----------------------- -------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-16 Profile; Main menu: any module

  -------------------------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------------
  **Purpose**    Manage password, passcode lock, verified contacts, and sign-out.
  -------------- ------------------------------------------------------------------

  ---------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Security Settings\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Verified email (P-ACC-012-05); Verified mobile (P-ACC-012-06).

-   Input area (form fields, in specification order): Current password (P-ACC-012-01); New password (P-ACC-012-02); App passcode (P-ACC-012-03); Passcode lock (P-ACC-012-04).

-   Action area (primary action first, then secondary actions and links): Sign out (P-ACC-012-07); Change password (P-ACC-012-08).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                **Required**   **Editable**   **Default**              **Allowed values / validation**   **Error**              **Visibility**   **Saved to**                 **Behavior**
  ------------------ ------------------------- ----------------------- -------------- -------------- ------------------------ --------------------------------- ---------------------- ---------------- ---------------------------- -----------------------
  P-ACC-012-01       Current password          Password input          Conditional    Yes            Blank                    Required to change password       Inline field message   Own user         ---                          Validates identity

  P-ACC-012-02       New password              Password input          Conditional    Yes            Blank                    Minimum 8 characters              ERR-10                 Own user         User.password_hash           Updates password

  P-ACC-012-03       App passcode              Numeric input           Conditional    Yes            Off                      Exactly 6 digits                  ERR-13                 Own user         User.app_passcode            Enables passcode lock

  P-ACC-012-04       Passcode lock             Toggle                  Yes            Yes            Off                      On/off                            ---                    Own user         User.passcode_lock_enabled   Enables lock

  P-ACC-012-05       Verified email            Read-only text          System         No             Current email            Masked display                    ---                    Own user         User.email                   Display only

  P-ACC-012-06       Verified mobile           Read-only text / edit   No             Yes            Current value or blank   Valid phone                       ERR-08                 Own user         User.mobile_number           Enables SMS

  P-ACC-012-07       Sign out                  Button                  ---            ---            ---                      ---                               ---                    Own user         ---                          Ends session

  P-ACC-012-08       Change password           Primary button          ---            ---            ---                      ---                               ---                    Own user         ---                          Saves new password
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- ----------------------------------------------------------------------------------
  Empty                   Current security values displayed

  Loading                 Save actions disabled

  Error                   Invalid current password, weak new password, invalid passcode, or invalid mobile

  Success                 Security setting updated; confirmation shown
  ----------------------------------------------------------------------------------------------------------

ACC-SCR-05 --- Invite co-parent

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-02
  -------------------------------------------------------------------------

![Figure ACC-SCR-05 --- Invite co-parent](media/cd644ea632f55eb56bd5d8affd74fcf78d41dc73.png "Figure ACC-SCR-05 — Invite co-parent"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-05 --- Invite co-parent*

**Navigation**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-06 Invite list and status; ACC-SCR-08 Choose Solo Mode; ACC-SCR-B01 Household overview; \'Invite your co-parent to use this\' on any feature that needs the co-parent (Solo Mode)
  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-06 Invite list and status; Main menu: any module

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Send an invitation by text, email, or link.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Invite Co-Parent\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Invite link (P-ACC-008-06).

-   Input area (form fields, in specification order): Invite channel (P-ACC-008-01); Co-parent email (P-ACC-008-02); Co-parent mobile (P-ACC-008-03).

-   Action area (primary action first, then secondary actions and links): Send invite (P-ACC-008-04); Generate link (P-ACC-008-05); View invite status (P-ACC-008-07).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                **Required**   **Editable**      **Default**   **Allowed values / validation**   **Error**              **Visibility**             **Saved to**           **Behavior**
  ------------------ ------------------------- ----------------------- -------------- ----------------- ------------- --------------------------------- ---------------------- -------------------------- ---------------------- ---------------------------------------------------
  P-ACC-008-01       Invite channel            Radio group             Yes            Yes before send   None          Text; Email; Link                 Inline field message   Parent                     Invite.channel         Determines required contact field

  P-ACC-008-02       Co-parent email           Email input             Conditional    Yes before send   Blank         Required for Email; valid email   ERR-04                 Parent                     Invite.email           Used for email invite

  P-ACC-008-03       Co-parent mobile          Phone input             Conditional    Yes before send   Blank         Required for Text; valid phone    ERR-08                 Parent                     Invite.mobile          Used for text invite

  P-ACC-008-04       Send invite               Primary button          ---            ---               ---           ---                               ---                    Parent                     Invite.status = Sent   Creates invite; sends message; opens confirmation

  P-ACC-008-05       Generate link             Primary button          ---            ---               ---           ---                               ---                    Parent                     Invite.status = Sent   Creates link invite; displays copyable link

  P-ACC-008-06       Invite link               Read-only text + Copy   System         No                Generated     Unique invite URL                 ---                    Parent, Link invite only   Invite.invite_url      Copy action available

  P-ACC-008-07       View invite status        Text link               ---            ---               ---           ---                               ---                    Parent                     ---                    Opens ACC-SCR-06 Invite list and status
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------------------------------------
  **State**             **Behavior**
  --------------------- ------------------------------------------------------------------------------------------
  Empty                 No channel selected; contact fields hidden until relevant

  Loading               Send/Generate disabled

  Error                 Invalid email/mobile: ERR-04/ERR-08; delivery failure: ERR-05 and status not set to Sent

  Success               Invite created; confirmation and link/status access shown
  ----------------------------------------------------------------------------------------------------------------

ACC-SCR-06 --- Invite list and status

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-02
  -------------------------------------------------------------------------

![Figure ACC-SCR-06 --- Invite list and status](media/4445246b546b114d4aa50bc5486104ec82818fcd.png "Figure ACC-SCR-06 — Invite list and status"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-06 --- Invite list and status*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-05 Invite co-parent; ACC-SCR-19 Home; ACC-SCR-20 Settings; ACC-SCR-B01 Household overview
  ----------------------- --------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-05 Invite co-parent; ACC-SCR-10 Contact-attempt log; NTF-SCR-B04 System send status; Main menu: any module

  --------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show status and allow cancellation/resend.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Invite Status\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Channel (P-ACC-009-02); Status (P-ACC-009-03); Sent at (P-ACC-009-04); Expires at (P-ACC-009-05).

-   Action area (primary action first, then secondary actions and links): Invite list (P-ACC-009-01); Cancel (P-ACC-009-06); Send new invite (P-ACC-009-07); Copy link (P-ACC-009-08).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**        **Allowed values / validation**              **Error**              **Visibility**   **Saved to**                **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- ------------------ -------------------------------------------- ---------------------- ---------------- --------------------------- -----------------------------------
  P-ACC-009-01       Invite list               Table            ---            ---            ---                Shows channel and status                     ---                    Parent           ---                         Displays all household invites

  P-ACC-009-02       Channel                   Badge / text     System         No             Derived            Text; Email; Link                            ---                    Parent           Invite.channel              Display only

  P-ACC-009-03       Status                    Badge            System         No             Sent               Sent; Opened; Accepted; Expired; Cancelled   ---                    Parent           Invite.status               Updates automatically

  P-ACC-009-04       Sent at                   Timestamp        System         No             Send time          UTC storage; local display                   ---                    Parent           Invite.sent_at              Display only

  P-ACC-009-05       Expires at                Timestamp        System         No             Sent at + 7 days   UTC storage; local display                   ---                    Parent           Invite.expires_at           Display only

  P-ACC-009-06       Cancel                    Row action       ---            ---            ---                Available only for Sent or Opened            Inline field message   Parent           Invite.status = Cancelled   Invalidates link

  P-ACC-009-07       Send new invite           Primary button   ---            ---            ---                Available after expiry/cancel                ---                    Parent           New invite                  Opens ACC-SCR-05 Invite co-parent

  P-ACC-009-08       Copy link                 Row action       ---            ---            ---                Available for active Link invite             ---                    Parent           ---                         Copies invite URL
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- --------------------------------------------
  Empty                      No invites; Show Invite Co-Parent action

  Loading                    Table skeleton

  Error                      Load failure with retry

  Success                    Invite rows displayed with current status
  -----------------------------------------------------------------------

ACC-SCR-07 --- Accept invite

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-02
  -------------------------------------------------------------------------

![Figure ACC-SCR-07 --- Accept invite](media/19cea6a56e858ce2bcf352dd3ebb99831a6cf7d9.png "Figure ACC-SCR-07 — Accept invite"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-07 --- Accept invite*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Invite link in the email or text message the co-parent or household member receives
  ----------------------- --------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; ACC-SCR-14 Verify email; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  --------------------------------------------------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------------
  **Purpose**    Let an invited person create/join the household as Co-parent.
  -------------- ---------------------------------------------------------------

  ------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Accept Invite\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Invite token (P-ACC-010-01); Inviter name (P-ACC-010-02).

-   Input area (form fields, in specification order): Email (P-ACC-010-03); Display name (P-ACC-010-04); Password (P-ACC-010-05).

-   Action area (primary action first, then secondary actions and links): Accept invite (P-ACC-010-06); Continue to verification (P-ACC-010-07).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**    **Type**           **Required**   **Editable**   **Default**             **Allowed values / validation**   **Error**                              **Visibility**     **Saved to**               **Behavior**
  ------------------ -------------------------- ------------------ -------------- -------------- ----------------------- --------------------------------- -------------------------------------- ------------------ -------------------------- -----------------------------------------------------
  P-ACC-010-01       Invite token               System / URL       Yes            No             From invite link        Valid, unexpired, unused token    ERR-16 for invalid/expired/cancelled   Invite recipient   ---                        Validates invitation

  P-ACC-010-02       Inviter name               Read-only text     System         No             Derived                 Parent display name               ---                                    Invite recipient   ---                        Display only

  P-ACC-010-03       Email                      Email input        Yes            Yes            Prefilled if provided   Valid email; unique               ERR-01/ERR-04                          New user           User.email                 Creates/links account

  P-ACC-010-04       Display name               Text input         Yes            Yes            Blank                   1--60 characters                  ERR-03                                 New user           User.display_name          Creates profile

  P-ACC-010-05       Password                   Password input     Yes            Yes            Blank                   Minimum 8 characters              ERR-10                                 New user           User.password_hash         Creates credential

  P-ACC-010-06       Accept invite              Primary button     ---            ---            ---                     ---                               ---                                    Invite recipient   Invite.status = Accepted   Creates Co-parent membership; sets household Linked

  P-ACC-010-07       Continue to verification   Secondary action   ---            ---            ---                     ---                               ---                                    Invite recipient   ---                        Proceeds to email verification / 2FA
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------------------------------------------
  **State**             **Behavior**
  --------------------- -----------------------------------------------------------------------------------------
  Empty                 Invite details displayed; form blank

  Loading               Accept disabled

  Error                 Invalid/expired/cancelled invite: ERR-16; validation errors prevent acceptance

  Success               User becomes Co-parent; household becomes Linked; user enters verification/sign-in flow
  ---------------------------------------------------------------------------------------------------------------

ACC-SCR-08 --- Choose Solo Mode

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-08
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-03
  -------------------------------------------------------------------------

![Figure ACC-SCR-08 --- Choose Solo Mode](media/ab8e9dc20fe7a7e9a765cb69a0c71c386db0a05e.png "Figure ACC-SCR-08 — Choose Solo Mode"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-08 --- Choose Solo Mode*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-03 Second check; ACC-SCR-14 Verify email
  ----------------------- --------------------------------------------------------
  **Where you go next**   ACC-SCR-05 Invite co-parent; ACC-SCR-19 Home

  --------------------------------------------------------------------------------

Specification

  -------------------------------------------------------------------------
  **Purpose**    Let the parent choose Solo Mode or invite the co-parent.
  -------------- ----------------------------------------------------------

  -------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Household Setup / Solo Mode\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Household mode (P-ACC-007-01); Privacy notice (P-ACC-007-04).

-   Action area (primary action first, then secondary actions and links): Choose Solo Mode (P-ACC-007-02); Invite co-parent (P-ACC-007-03).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**         **Default**   **Allowed values / validation**                     **Error**              **Visibility**                  **Saved to**            **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------------- ------------- --------------------------------------------------- ---------------------- ------------------------------- ----------------------- ----------------------------------------------------
  P-ACC-007-01       Household mode            Radio group          Yes            Yes until mode set   None          Solo Mode; Invite co-parent                         Inline field message   Parent without household mode   Household.mode          Determines downstream privacy and billing behavior

  P-ACC-007-02       Choose Solo Mode          Primary button       ---            ---                  ---           ---                                                 ---                    Parent without household mode   Household.mode = Solo   Sets Solo Mode; opens app home

  P-ACC-007-03       Invite co-parent          Primary button       ---            ---                  ---           ---                                                 ---                    Parent without household mode   ---                     Opens ACC-SCR-05 Invite co-parent

  P-ACC-007-04       Privacy notice            Informational text   ---            ---                  ---           Explains Solo records remain private until shared   ---                    Parent without household mode   ---                     Display only
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ---------------------------------------------
  Empty                     No mode selected; both paths available

  Loading                   Buttons disabled

  Error                     Save failure retains unset mode

  Success                   Solo Mode set, or invite flow opened
  -----------------------------------------------------------------------

ACC-SCR-09 --- Contact co-parent not on the app

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-09
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-04
  -------------------------------------------------------------------------

![Figure ACC-SCR-09 --- Contact co-parent not on the app](media/6bb9092b208fdfa69b8d1417cf7006d9fd3e8612.png "Figure ACC-SCR-09 — Contact co-parent not on the app"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-09 --- Contact co-parent not on the app*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-B01 Household overview; MSG-SCR-01 Thread list
  ----------------------- --------------------------------------------------------
  **Where you go next**   ACC-SCR-10 Contact-attempt log; Main menu: any module

  --------------------------------------------------------------------------------

Specification

  ----------------------------------------------------------------------------------------------
  **Purpose**    Send a one-way message by text or email to a co-parent who is not on the app.
  -------------- -------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Message Co-Parent Outside App\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Contact channel (P-ACC-013-01); Recipient email (P-ACC-013-02); Recipient mobile (P-ACC-013-03); Message (P-ACC-013-04).

-   Action area (primary action first, then secondary actions and links): Send (P-ACC-013-05); View contact log (P-ACC-013-06).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**      **Default**   **Allowed values / validation**    **Error**              **Visibility**   **Saved to**             **Behavior**
  ------------------ ------------------------- ---------------- -------------- ----------------- ------------- ---------------------------------- ---------------------- ---------------- ------------------------ --------------------------------------
  P-ACC-013-01       Contact channel           Radio group      Yes            Yes before send   None          Text; Email                        Inline field message   Parent           ContactAttempt.channel   Determines recipient field

  P-ACC-013-02       Recipient email           Email input      Conditional    Yes before send   Blank         Valid email                        ERR-04                 Parent           ContactAttempt.email     Used for email send

  P-ACC-013-03       Recipient mobile          Phone input      Conditional    Yes before send   Blank         Valid phone                        ERR-08                 Parent           ContactAttempt.mobile    Used for text send

  P-ACC-013-04       Message                   Textarea         Yes            Yes before send   Blank         Required; up to 1,000 characters   Inline field message   Parent           ContactAttempt.message   Sent through Notifications

  P-ACC-013-05       Send                      Primary button   ---            ---               ---           ---                                ---                    Parent           ContactAttempt.result    Sends message; records attempt

  P-ACC-013-06       View contact log          Text link        ---            ---               ---           ---                                ---                    Parent           ---                      Opens ACC-SCR-10 Contact-attempt log
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- -------------------------------------------------------------------
  Empty                   Blank form; channel controls recipient field

  Loading                 Send disabled

  Error                   Invalid contact or send failure: ERR-07; attempt logged as Failed

  Success                 Message sent; delivery status shown; attempt logged
  -------------------------------------------------------------------------------------------

ACC-SCR-10 --- Contact-attempt log

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-10
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-05
  -------------------------------------------------------------------------

![Figure ACC-SCR-10 --- Contact-attempt log](media/d7a3a3eaa6433fd60300b26f033e865aced65fe2.png "Figure ACC-SCR-10 — Contact-attempt log"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-10 --- Contact-attempt log*

**Navigation**

  ----------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-06 Invite list and status; ACC-SCR-09 Contact co-parent not on the app; NTF-SCR-B04 System send status
  ----------------------- ----------------------------------------------------------------------------------------------------------------
  **Where you go next**   REC-SCR-01 Export records; Main menu: any module

  ----------------------------------------------------------------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------------------------
  **Purpose**    Show history of invites, non-app messages, replies, and delivery results.
  -------------- ---------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Contact Attempt Log\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Attempt type (P-ACC-014-02); Channel (P-ACC-014-03); Result (P-ACC-014-04); Attempt time (P-ACC-014-05); Filter (P-ACC-014-07).

-   Input area (form fields, in specification order): Message preview (P-ACC-014-06).

-   Action area (primary action first, then secondary actions and links): Attempt list (P-ACC-014-01).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**        **Required**   **Editable**   **Default**   **Allowed values / validation**           **Error**   **Visibility**   **Saved to**                  **Behavior**
  ------------------ ------------------------- --------------- -------------- -------------- ------------- ----------------------------------------- ----------- ---------------- ----------------------------- -----------------------------
  P-ACC-014-01       Attempt list              Table           ---            ---            ---           Chronological; newest first               ---         Parent           ---                           Displays contact history

  P-ACC-014-02       Attempt type              Badge           System         No             Derived       Invite; Message; Reply                    ---         Parent           ContactAttempt.type           Display only

  P-ACC-014-03       Channel                   Badge           System         No             Derived       Text; Email                               ---         Parent           ContactAttempt.channel        Display only

  P-ACC-014-04       Result                    Badge           System         No             Derived       Sent; Failed; Delivered; Reply received   ---         Parent           ContactAttempt.result         Display only

  P-ACC-014-05       Attempt time              Timestamp       System         No             Event time    UTC storage; local display                ---         Parent           ContactAttempt.attempted_at   Display only

  P-ACC-014-06       Message preview           Text            System         No             Derived       First 100 characters                      ---         Parent           ContactAttempt.message        Opens detail if implemented

  P-ACC-014-07       Filter                    Control group   No             Yes            None          Type, channel, result                     ---         Parent           ---                           Filters list
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- ----------------------------------------------------
  Empty                      No contact attempts; guidance to invite or message

  Loading                    Table skeleton

  Error                      Load failure with retry

  Success                    Attempt history displayed
  -------------------------------------------------------------------------------

ACC-SCR-11 --- Session and draft settings

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-11
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-06
  -------------------------------------------------------------------------

![Figure ACC-SCR-11 --- Session and draft settings](media/2e0ad3ee389435d0a74c4532fb12da1a50fdf33d.png "Figure ACC-SCR-11 — Session and draft settings"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-11 --- Session and draft settings*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-20 Settings
  ----------------------- --------------------------------------------------------
  **Where you go next**   ACC-SCR-20 Settings; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

ACC-SCR-12 --- Household members and roles

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-12
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-07
  -------------------------------------------------------------------------

![Figure ACC-SCR-12 --- Household members and roles](media/a80ae772e8ced863758bc85ea20b713ae2b424b5.png "Figure ACC-SCR-12 — Household members and roles"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-12 --- Household members and roles*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-20 Settings; ACC-SCR-B01 Household overview
  ----------------------- --------------------------------------------------------
  **Where you go next**   ACC-SCR-B01 Household overview; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

ACC-SCR-14 --- Verify email

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-14
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-09
  -------------------------------------------------------------------------

![Figure ACC-SCR-14 --- Verify email](media/356cd9a978a3ff3c8ebe2552469c443c4eabc0c5.png "Figure ACC-SCR-14 — Verify email"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-14 --- Verify email*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-01 Create account; ACC-SCR-07 Accept invite; Automatically after Create account
  ----------------------- -----------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-01 Create account; ACC-SCR-08 Choose Solo Mode

  -----------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Verify the email used at signup.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Verify Email\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Email display (P-ACC-002-01).

-   Input area (form fields, in specification order): Verification code (P-ACC-002-02).

-   Action area (primary action first, then secondary actions and links): Resend code (P-ACC-002-03); Verify (P-ACC-002-04); Change email (P-ACC-002-05).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**    **Allowed values / validation**                        **Error**              **Visibility**   **Saved to**          **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- -------------- ------------------------------------------------------ ---------------------- ---------------- --------------------- ------------------------------------------------------------------------
  P-ACC-002-01       Email display             Read-only text     Yes            No             Signup email   Masked email                                           ---                    Signed-up user   User.email            Shows destination of code

  P-ACC-002-02       Verification code         Numeric input      Yes            Yes            Blank          Exactly 6 digits; valid 10 minutes; single use         ERR-02                 Signed-up user   Verification record   Validates code

  P-ACC-002-03       Resend code               Secondary button   ---            ---            ---            Available after 60 seconds; at most 5 codes per hour   Inline field message   Signed-up user   ---                   Sends new email code

  P-ACC-002-04       Verify                    Primary button     ---            ---            ---            ---                                                    ---                    Signed-up user   ---                   Verifies code; marks email verified; opens ACC-SCR-08 Choose Solo Mode

  P-ACC-002-05       Change email              Text link          ---            ---            ---            ---                                                    ---                    Signed-up user   ---                   Returns to ACC-SCR-01 Create account
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- --------------------------------------------------
  Empty                     Code field blank; Verify disabled

  Loading                   Verify/Resend disabled

  Error                     Invalid/expired/used code: ERR-02

  Success                   Email verified; user proceeds to household setup
  ----------------------------------------------------------------------------

ACC-SCR-15 --- Reset password

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-15
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-10
  -------------------------------------------------------------------------

![Figure ACC-SCR-15 --- Reset password](media/376678b38fdb334b98b6c6954aad86fc0806437b.png "Figure ACC-SCR-15 — Reset password"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-15 --- Reset password*

**Navigation**

  -------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-02 Sign in
  ----------------------- -------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  -------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Request a password-reset link.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Forgot Password\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Email (P-ACC-005-01).

-   Action area (primary action first, then secondary actions and links): Send reset link (P-ACC-005-02); Back to sign in (P-ACC-005-03).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**   **Allowed values / validation**   **Error**   **Visibility**   **Saved to**    **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- ------------- --------------------------------- ----------- ---------------- --------------- -----------------------------------------------------------------
  P-ACC-005-01       Email                     Email input      Yes            Yes            Blank         Valid email format                ERR-01      All visitors     Reset request   Identifies reset target

  P-ACC-005-02       Send reset link           Primary button   ---            ---            ---           ---                               ---         All visitors     ---             Sends link if account exists; always shows neutral confirmation

  P-ACC-005-03       Back to sign in           Text link        ---            ---            ---           ---                               ---         All visitors     ---             Opens ACC-SCR-02 Sign in
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -----------------------------------------------------------------------------------------
  Empty                    Email blank; Send disabled

  Loading                  Send disabled

  Error                    Invalid email: ERR-01

  Success                  MSGT-07 shown for both existing and non-existing emails; no account existence disclosed
  ------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Set a new password from a reset link.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Reset Password\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Reset token (P-ACC-006-01).

-   Input area (form fields, in specification order): New password (P-ACC-006-02); Confirm new password (P-ACC-006-03).

-   Action area (primary action first, then secondary actions and links): Reset password (P-ACC-006-04); Back to sign in (P-ACC-006-05).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**       **Allowed values / validation**   **Error**              **Visibility**       **Saved to**         **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- ----------------- --------------------------------- ---------------------- -------------------- -------------------- -------------------------------------------------------------
  P-ACC-006-01       Reset token               System / URL     Yes            No             From email link   Valid, unused, unexpired token    Inline field message   Reset-link visitor   ---                  Validates reset request

  P-ACC-006-02       New password              Password input   Yes            Yes            Blank             Minimum 8 characters              ERR-10                 Reset-link visitor   User.password_hash   Updates credential

  P-ACC-006-03       Confirm new password      Password input   Yes            Yes            Blank             Must match new password           Inline field message   Reset-link visitor   ---                  Prevents typo

  P-ACC-006-04       Reset password            Primary button   ---            ---            ---               ---                               ---                    Reset-link visitor   ---                  Saves password; invalidates token; opens ACC-SCR-02 Sign in

  P-ACC-006-05       Back to sign in           Text link        ---            ---            ---               ---                               ---                    Reset-link visitor   ---                  Opens ACC-SCR-02 Sign in
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ------------------------------------------------------------------
  Empty                    Password fields blank; Reset disabled

  Loading                  Reset disabled

  Error                    Invalid/expired token, weak password, or mismatch prevents reset

  Success                  Password updated; user directed to sign in
  -------------------------------------------------------------------------------------------

ACC-SCR-16 --- Profile

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-16
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-11
  -------------------------------------------------------------------------

![Figure ACC-SCR-16 --- Profile](media/8eb08091ac0e598c97f524fc5d061ad0d5df714f.png "Figure ACC-SCR-16 — Profile"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-16 --- Profile*

**Navigation**

  -------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-04 App lock settings; ACC-SCR-20 Settings; ACC-SCR-B01 Household overview; NTF-SCR-02 Notification health check
  ----------------------- -------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-04 App lock settings; Main menu: any module

  -------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    View and edit the user's profile.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Profile\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Display name (P-ACC-011-01); Email (P-ACC-011-02); Mobile number (P-ACC-011-03); Language (P-ACC-011-04).

-   Action area (primary action first, then secondary actions and links): Save (P-ACC-011-05); Cancel (P-ACC-011-06).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**                           **Default**              **Allowed values / validation**   **Error**              **Visibility**   **Saved to**         **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------------------------------- ------------------------ --------------------------------- ---------------------- ---------------- -------------------- ------------------------------
  P-ACC-011-01       Display name              Text input         Yes            Yes                                    Current value            1--60 characters                  ERR-03                 Own user         User.display_name    Saves on submit

  P-ACC-011-02       Email                     Email input        Yes            Yes; re-verified with a 6-digit code   Current value            Valid email; unique               ERR-01/ERR-04/ERR-08   Own user         User.email           May require re-verification

  P-ACC-011-03       Mobile number             Phone input        No             Yes                                    Current value or blank   Valid phone                       ERR-08                 Own user         User.mobile_number   Enables SMS channel

  P-ACC-011-05       Save                      Primary button     ---            ---                                    ---                      ---                               ---                    Own user         ---                  Saves changed profile fields

  P-ACC-011-06       Cancel                    Secondary button   ---            ---                                    ---                      ---                               ---                    Own user         ---                  Discards unsaved changes
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ---------------------------------------------------
  Empty                     Not applicable; profile always has account values

  Loading                   Form skeleton

  Error                     Field validation or save failure

  Success                   Confirmation; updated values displayed
  -----------------------------------------------------------------------------

ACC-SCR-17 --- Enter passcode

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-17
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-01
  -------------------------------------------------------------------------

![Figure ACC-SCR-17 --- Enter passcode](media/cea0bde689cd8dbd6821e1d4146061c6cd7911e2.png "Figure ACC-SCR-17 — Enter passcode"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-17 --- Enter passcode*

**Navigation**

  -------------------------------------------------------------------------------------------
  **How you get here**    Automatically when the app is reopened or idle and App lock is on
  ----------------------- -------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; ACC-SCR-19 Home

  -------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

ACC-SCR-18 --- Close account

  -------------------------------------------------------------------------
  **Screen ID**    ACC-SCR-18
  ---------------- --------------------------------------------------------
  **Module**       Accounts and Onboarding

  **Feature(s)**   ACC-12
  -------------------------------------------------------------------------

![Figure ACC-SCR-18 --- Close account](media/a0e9c020be01494a552640570b1d4d7f421f80f0.png "Figure ACC-SCR-18 — Close account"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-18 --- Close account*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-20 Settings
  ----------------------- --------------------------------------------------------
  **Where you go next**   REC-SCR-15 Legal hold; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

ACC-SCR-B01 --- Household overview

  ------------------------------------------------------------------------
  **Screen ID**   ACC-SCR-B01
  --------------- --------------------------------------------------------
  **Module**      Accounts and Onboarding

  ------------------------------------------------------------------------

![Figure ACC-SCR-B01 --- Household overview](media/1c08e9446eb6c2c79b53f27bfa478157ae39a15e.png "Figure ACC-SCR-B01 — Household overview"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-B01 --- Household overview*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-12 Household members and roles; ACC-SCR-19 Home; ACC-SCR-20 Settings
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-04 App lock settings; ACC-SCR-05 Invite co-parent; ACC-SCR-06 Invite list and status; ACC-SCR-09 Contact co-parent not on the app; ACC-SCR-12 Household members and roles; ACC-SCR-16 Profile; DOC-SCR-01 Children list and child form; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show household mode, members and key actions.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Household Overview\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Household mode (P-ACC-015-01); Members (P-ACC-015-02); Member role (P-ACC-015-03); Plan (P-ACC-015-04).

-   Input area (form fields, in specification order): Payer name (P-ACC-015-05).

-   Action area (primary action first, then secondary actions and links): Invite co-parent (P-ACC-015-06); Message outside app (P-ACC-015-07); Manage profile (P-ACC-015-08); Manage security (P-ACC-015-09).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**      **Required**   **Editable**   **Default**   **Allowed values / validation**     **Error**   **Visibility**      **Saved to**      **Behavior**
  ------------------ ------------------------- ------------- -------------- -------------- ------------- ----------------------------------- ----------- ------------------- ----------------- ---------------------------------------------------
  P-ACC-015-01       Household mode            Badge         System         No             Derived       Solo; Linked                        ---         Household members   Household.mode    Display only

  P-ACC-015-02       Members                   Member list   System         No             Derived       Parent; Co-parent                   ---         Household members   HouseholdMember   Display only

  P-ACC-015-03       Member role               Badge         System         No             Derived       Parent; Co-parent                   ---         Household members   User.role         Display only

  P-ACC-015-06       Invite co-parent          Button        ---            ---            ---           Visible when no Co-parent linked    ---         Parent              ---               Opens ACC-SCR-05 Invite co-parent

  P-ACC-015-07       Message outside app       Button        ---            ---            ---           Visible when co-parent not on app   ---         Parent              ---               Opens ACC-SCR-09 Contact co-parent not on the app

  P-ACC-015-08       Manage profile            Link          ---            ---            ---           ---                                 ---         Signed-in user      ---               Opens ACC-SCR-16 Profile

  P-ACC-015-09       Manage security           Link          ---            ---            ---           ---                                 ---         Signed-in user      ---               Opens ACC-SCR-04 App lock settings
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ---------------------------------------------------------------------
  Empty                    New household without co-parent; invite and Solo actions emphasized

  Loading                  Overview skeleton

  Error                    Load failure with retry

  Success                  Household, members and actions displayed
  ----------------------------------------------------------------------------------------------

ACC-SCR-19 --- Home

  ---------------------------------------------------------------------------------------------------------------------------
  **Screen ID**     ACC-SCR-19
  ----------------- ---------------------------------------------------------------------------------------------------------
  **Purpose**       The first screen after sign-in. Shows what needs the parent\'s attention today and gives quick actions.

  **Who uses it**   Parent, Co-parent
  ---------------------------------------------------------------------------------------------------------------------------

![Figure ACC-SCR-19 --- Home](media/983c516032df2eb559e0a101ce3fda2c0febfff8.png "Figure ACC-SCR-19 — Home"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-19 --- Home*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Home; ACC-SCR-08 Choose Solo Mode; ACC-SCR-17 Enter passcode; ACC-SCR-21 Error page; ACC-SCR-22 Page not found or not allowed; ACC-SCR-23 Maintenance page
  ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-06 Invite list and status; ACC-SCR-B01 Household overview; CAL-SCR-01 Calendar (week view); CAL-SCR-02 Event form; CAL-SCR-05 Request detail, answer and undo; CSS-SCR-06 Agency items in the calendar; DOC-SCR-01 Children list and child form; EXP-SCR-02 Add or edit expense; EXP-SCR-05 Request detail; EXP-SCR-06 Request list and history; MSG-SCR-01 Thread list; MSG-SCR-02 Thread and message view; MSG-SCR-03 New message and reply; Main menu: any module

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**What the screen shows**

  ----------------------------------------------------------------------------------------------------------------------------
  **Part**                      **Description**
  ----------------------------- ----------------------------------------------------------------------------------------------
  Greeting                      User\'s name, household name and whether the co-parent is linked.

  Quick actions                 New message, Add event, Add expense.

  Today and next 7 days         Calendar items, parenting time and agency hearings for the next 7 days; each opens the item.

  Unread messages               Latest unread messages; each opens the thread.

  Waiting for your answer       Schedule change requests, reimbursement requests and invites that need an answer.

  Open reimbursement requests   Number and total of open requests; opens the request list.

  Household                     Co-parent and number of children; opens Household overview or Children.
  ----------------------------------------------------------------------------------------------------------------------------

-   Home never shows private items, hidden details or Safety Mode information of the other parent.

-   The main menu and top bar described in section 2.1 frame this and every signed-in screen.

ACC-SCR-20 --- Settings

  --------------------------------------------------------------------------
  **Screen ID**     ACC-SCR-20
  ----------------- --------------------------------------------------------
  **Purpose**       One place for every personal and household setting.

  **Who uses it**   Parent, Co-parent
  --------------------------------------------------------------------------

![Figure ACC-SCR-20 --- Settings](media/c99ccdb658ffea81703fae2848290bc31cddf6b1.png "Figure ACC-SCR-20 — Settings"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-20 --- Settings*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Settings; ACC-SCR-11 Session and draft settings; SUP-SCR-01 Help
  ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-04 App lock settings; ACC-SCR-06 Invite list and status; ACC-SCR-11 Session and draft settings; ACC-SCR-12 Household members and roles; ACC-SCR-16 Profile; ACC-SCR-18 Close account; ACC-SCR-B01 Household overview; CAL-SCR-09 Calendar sync settings; CLL-SCR-01 Calling settings; MSG-SCR-05 AI settings; NTF-SCR-01 Notification settings; SAF-SCR-01 Safety Mode settings; SAF-SCR-07 Alerts and images settings; SAF-SCR-10 AI and your data; Main menu: any module

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**What the screen shows**

  -------------------------------------------------------------------------------------------------------
  **Part**                   **Description**
  -------------------------- ----------------------------------------------------------------------------
  Profile and security       Profile, App lock, Session and drafts.

  Household                  Household overview, Members and roles, Invites.

  Notifications              Notification settings, Calling, Calendar sync.

  Privacy and safety         Safety Mode, Alerts and images, AI and your data, AI settings in messages.

  Close account              Export records, then close the account.
  -------------------------------------------------------------------------------------------------------

-   The Safety Mode entry shows no status text that the other parent could notice on a shared device.

System messages

These screens are not opened from a menu. The application shows them when a system event happens on any screen.

ACC-SCR-21 --- Error page

  ------------------------------------------------------------------------
  **Screen ID**   ACC-SCR-21
  --------------- --------------------------------------------------------

  ------------------------------------------------------------------------

![Figure ACC-SCR-21 --- Error page](media/a43a9a5f17f9c34e540644400da809d1794e7ef7.png "Figure ACC-SCR-21 — Error page"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-21 --- Error page*

**Navigation**

  ---------------------------------------------------------------------------------------
  **How you get here**    System: an unexpected error on any screen
  ----------------------- ---------------------------------------------------------------
  **Where you go next**   ACC-SCR-19 Home; SUP-SCR-01 Help; SUP-SCR-04 New request form

  ---------------------------------------------------------------------------------------

Specification

  ----------------------------------------------------------------------------------------
  **Purpose**    Handle an unexpected system failure without exposing technical details.
  -------------- -------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Unexpected Error Page\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Error message (P-SYS-006-01); Technical reference (P-SYS-006-05).

-   Action area (primary action first, then secondary actions and links): Contact support (P-SYS-006-02); Retry (P-SYS-006-03); Go home (P-SYS-006-04).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**   **Allowed values / validation**     **Error**   **Visibility**       **Saved to**                     **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- ------------- ----------------------------------- ----------- -------------------- -------------------------------- --------------------------------------
  P-SYS-006-01       Error message             Error panel        ---            ---            ---           ERR-01                              ---         All users            Error record                     Display only

  P-SYS-006-02       Contact support           Primary button     ---            ---            ---           ---                                 ---         User                 Support case / error reference   Sends technical reference to Support

  P-SYS-006-03       Retry                     Secondary button   ---            ---            ---           ---                                 ---         User                 ---                              Reloads current action

  P-SYS-006-04       Go home                   Text link          ---            ---            ---           ---                                 ---         User                 ---                              Opens app home

  P-SYS-006-05       Technical reference       System             System         No             Generated     Hidden from user; sent to Support   ---         Internal / Support   Error record                     Supports troubleshooting
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ------------------------------------------------------------------
  Empty                     Not applicable

  Loading                   Retry disabled during submission

  Error                     Always error state

  Success                   Support receives technical reference; user receives confirmation
  --------------------------------------------------------------------------------------------

ACC-SCR-22 --- Page not found or not allowed

  ------------------------------------------------------------------------
  **Screen ID**   ACC-SCR-22
  --------------- --------------------------------------------------------

  ------------------------------------------------------------------------

![Figure ACC-SCR-22 --- Page not found or not allowed](media/b7e99e9dfd59479d40e042e0f04082518c09b286.png "Figure ACC-SCR-22 — Page not found or not allowed"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-22 --- Page not found or not allowed*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    System: a wrong link, or a page the user may not open
  ----------------------- --------------------------------------------------------
  **Where you go next**   ACC-SCR-19 Home; SUP-SCR-01 Help

  --------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Handle a nonexistent route.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Not Found Page\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Not-found message (P-SYS-004-01); Technical reference (P-SYS-004-04).

-   Action area (primary action first, then secondary actions and links): Go home (P-SYS-004-02); Contact support (P-SYS-004-03).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**   **Allowed values / validation**          **Error**   **Visibility**       **Saved to**   **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- ------------- ---------------------------------------- ----------- -------------------- -------------- --------------------------
  P-SYS-004-01       Not-found message         Error panel      ---            ---            ---           ERR-02                                   ---         All users            ---            Display only

  P-SYS-004-02       Go home                   Primary button   ---            ---            ---           ---                                      ---         All users            ---            Opens app home

  P-SYS-004-03       Contact support           Text link        ---            ---            ---           ---                                      ---         All users            ---            Opens Support

  P-SYS-004-04       Technical reference       System           System         No             Generated     Sent to Support only; hidden from user   ---         Internal / Support   Error record   Supports troubleshooting
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                    **Behavior**
  ---------------------------- ------------------------------------------
  Empty                        Not applicable

  Loading                      Error skeleton

  Error                        Always error state

  Success                      User can return home or contact support
  -----------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Handle a route the user is not permitted to open.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Access Denied Page\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Access-denied message (P-SYS-005-01); Technical reference (P-SYS-005-04).

-   Action area (primary action first, then secondary actions and links): Go home (P-SYS-005-02); Contact support (P-SYS-005-03).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**   **Allowed values / validation**   **Error**   **Visibility**       **Saved to**   **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- ------------- --------------------------------- ----------- -------------------- -------------- --------------------------
  P-SYS-005-01       Access-denied message     Error panel      ---            ---            ---           ERR-03                            ---         Unauthorized user    ---            Display only

  P-SYS-005-02       Go home                   Primary button   ---            ---            ---           ---                               ---         User                 ---            Opens permitted home

  P-SYS-005-03       Contact support           Text link        ---            ---            ---           ---                               ---         User                 ---            Opens Support

  P-SYS-005-04       Technical reference       System           System         No             Generated     Sent to Support only              ---         Internal / Support   Error record   Supports troubleshooting
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                    **Behavior**
  ---------------------------- ------------------------------------------
  Empty                        Not applicable

  Loading                      Error skeleton

  Error                        Always error state

  Success                      User can return to permitted area
  -----------------------------------------------------------------------

ACC-SCR-23 --- Maintenance page

  ------------------------------------------------------------------------
  **Screen ID**   ACC-SCR-23
  --------------- --------------------------------------------------------

  ------------------------------------------------------------------------

![Figure ACC-SCR-23 --- Maintenance page](media/b4a3f944d6cd70a1dad18aafc1d43b99629b1fa7.png "Figure ACC-SCR-23 — Maintenance page"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-23 --- Maintenance page*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    System: any page during planned maintenance
  ----------------------- --------------------------------------------------------
  **Where you go next**   ACC-SCR-19 Home

  --------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Inform users during planned maintenance.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Maintenance Page\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Maintenance message (P-SYS-003-01); Expected end time (P-SYS-003-02); Maintenance window (P-SYS-003-05).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**              **Required**   **Editable**   **Default**              **Allowed values / validation**     **Error**   **Visibility**   **Saved to**           **Behavior**
  ------------------ ------------------------- --------------------- -------------- -------------- ------------------------ ----------------------------------- ----------- ---------------- ---------------------- ------------------------
  P-SYS-003-01       Maintenance message       Informational panel   ---            ---            ---                      MSGT-02                             ---         All users        Maintenance record     Display only

  P-SYS-003-02       Expected end time         Timestamp             System         No             Maintenance end          UTC storage; local display          ---         All users        Maintenance record     Display only

  P-SYS-003-04       Retry app                 Button                ---            ---            ---                      ---                                 ---         All users        ---                    Attempts return to app

  P-SYS-003-05       Maintenance window        System                System         No             Sunday 2--5 am Eastern   Announced at least 48 hours ahead   ---         Public / app     Maintenance schedule   Display only
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- --------------------------------------------
  Empty                      Not applicable

  Loading                    Maintenance notice displayed

  Error                      Status-link failure does not block notice

  Success                    User informed; retry available
  -----------------------------------------------------------------------

ACC-SCR-24 --- Offline banner

  ------------------------------------------------------------------------
  **Screen ID**   ACC-SCR-24
  --------------- --------------------------------------------------------

  ------------------------------------------------------------------------

![Figure ACC-SCR-24 --- Offline banner](media/8d0db079bc4f515ff9c5da43cd60081e259410d4.png "Figure ACC-SCR-24 — Offline banner"){width="6.666666666666667in" height="5.0in"}

*Figure ACC-SCR-24 --- Offline banner*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    System: the connection drops on any screen
  ----------------------- --------------------------------------------------------
  **Where you go next**   Main menu: any module

  --------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Preserve user input and prevent sends while offline.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Offline State\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Offline banner (P-SYS-010-01); Draft preservation (P-SYS-010-02).

-   Action area (primary action first, then secondary actions and links): Send / Submit (P-SYS-010-03); Retry connection (P-SYS-010-04).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**     **Allowed values / validation**   **Error**   **Visibility**    **Saved to**       **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- --------------- --------------------------------- ----------- ----------------- ------------------ ------------------------------
  P-SYS-010-01       Offline banner            Warning banner       System         No             Derived         MSGT-06                           ---         Mobile-web user   Connection state   Display only

  P-SYS-010-02       Draft preservation        Local storage        System         System         Current input   Retains typed text on device      ---         Mobile-web user   Local draft        Preserves content

  P-SYS-010-03       Send / Submit             Disabled button      ---            ---            ---             Blocked while offline             ERR-04      Mobile-web user   ---                Prevents submission

  P-SYS-010-04       Retry connection          Button / automatic   ---            ---            ---             Reconnects when available         ---         Mobile-web user   Connection state   Enables send after reconnect
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ----------------------------------------------------
  Empty                     Not applicable

  Loading                   Reconnecting indicator

  Error                     Offline send: ERR-04; text retained

  Success                   Connection restored; user can send preserved draft
  ------------------------------------------------------------------------------

ACC-SCR-25 --- Session timeout warning

  ------------------------------------------------------------------------
  **Screen ID**   ACC-SCR-25
  --------------- --------------------------------------------------------

  ------------------------------------------------------------------------

![Figure ACC-SCR-25 --- Session timeout warning](media/51cc07a82878e76212211eb9f99e1d4d5a792f23.png "Figure ACC-SCR-25 — Session timeout warning"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure ACC-SCR-25 --- Session timeout warning*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    System: 2 minutes before the session ends
  ----------------------- --------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in

  --------------------------------------------------------------------------------

Specification

  ----------------------------------------------------------------------------------------
  **Purpose**    Warn the user before session expiry and allow them to remain signed in.
  -------------- -------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Session Timeout Warning\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Timeout warning (P-SYS-007-01).

-   Input area (form fields, in specification order): Countdown (P-SYS-007-02); Unsaved-work notice (P-SYS-007-05).

-   Action area (primary action first, then secondary actions and links): Stay signed in (P-SYS-007-03); Sign out (P-SYS-007-04).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**      **Allowed values / validation**                     **Error**   **Visibility**   **Saved to**          **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ---------------- --------------------------------------------------- ----------- ---------------- --------------------- -----------------
  P-SYS-007-01       Timeout warning           Modal / banner       ---            ---            ---              MSGT-03; appears at least 2 minutes before expiry   ---         Signed-in user   Session state         Display only

  P-SYS-007-02       Countdown                 Timer                System         No             Remaining time   Counts down                                         ---         Signed-in user   Session state         Display only

  P-SYS-007-03       Stay signed in            Primary button       ---            ---            ---              ---                                                 ---         Signed-in user   Session renewal       Extends session

  P-SYS-007-04       Sign out                  Secondary button     ---            ---            ---              ---                                                 ---         Signed-in user   Session termination   Ends session

  P-SYS-007-05       Unsaved-work notice       Informational text   System         No             Derived          Warns about unsaved changes                         ---         Signed-in user   ---                   Display only
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                   **Behavior**
  --------------------------- -------------------------------------------
  Empty                       Not applicable

  Loading                     Countdown active

  Error                       Renewal failure leads to sign-out

  Success                     Session extended; modal closes
  -----------------------------------------------------------------------

Cross-screen rules and pending screen decisions (Accounts and Onboarding)

Screen-state standard

Every Accounts screen must implement:

  ------------------------------------------------------------------------------------
  **State**                **Required behavior**
  ------------------------ -----------------------------------------------------------
  Empty                    Meaningful guidance and primary next action

  Loading                  Disable submit actions; show progress

  Error                    Preserve entered values; show specific error; allow retry

  Success                  Confirm result and navigate or refresh

  Permission denied        ERR-03 as set out in section 2.2

  Offline                  Preserve typed content; block send until reconnect
  ------------------------------------------------------------------------------------

Pending screen decisions --- Accounts

3.7 Field-level specifications

1.1 Signup --- ACC-SCR-01 Create account → ACC-SCR-01

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**        **Technical name**   **Type / control**   **Required**   **Editable**                 **Default**                                    **Allowed values / validation**              **Visibility**
  -------------- ---------------- -------------------- -------------------- -------------- ---------------------------- ---------------------------------------------- -------------------------------------------- ------------------------
  FLD-ACC-001    Email            email                Text / email input   Yes            Yes until verified           None                                           Valid email; unique; errors ERR-01/ERR-04    Public signup

  FLD-ACC-002    Display name     display_name         Text                 Yes            Yes                          None                                           1--60 characters; ERR-03 if empty/too long   Public signup; profile

  FLD-ACC-003    Password         password             Password             Yes            Yes through reset/settings   None                                           Minimum 8 characters; ERR-10 otherwise       Public signup

  FLD-ACC-004    Role             role                 System               System         No                           Parent for self-signup; Co-parent via invite   Parent, Co-parent                            Internal

  FLD-ACC-006    Account status   status               System               System         No                           Active                                         Active, Locked                               Internal

  FLD-ACC-007    Email verified   email_verified       Boolean              System         No                           false                                          true/false                                   Internal
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.2 Two-Factor Authentication --- ACC-SCR-03 Second check → ACC-SCR-03

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**         **Technical name**   **Type / control**   **Required**   **Editable**      **Default**   **Allowed values / validation**                                    **Visibility**
  -------------- ----------------- -------------------- -------------------- -------------- ----------------- ------------- ------------------------------------------------------------------ -------------------------
  FLD-ACC-010    One-time code     otp_code             Text / numeric       Yes            No                None          Exactly 6 digits; valid 10 minutes; single use; ERR-02 otherwise   2FA screen

  FLD-ACC-011    Code channel      otp_channel          Radio                Conditional    Yes before send   Email         Email; SMS only if verified mobile exists                          2FA screen

  FLD-ACC-012    Mobile number     mobile_number        Text / phone         No             Yes               None          Valid phone format; ERR-08 if invalid                              Signup/profile/settings

  FLD-ACC-013    Failed attempts   failed_attempts      Integer              System         No                0             Reset on success; lock at 5                                        Internal

  FLD-ACC-014    Locked until      locked_until         Timestamp            System         No                None          15 minutes after fifth failure                                     Internal
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.3 Passcode Lock --- ACC-SCR-04 App lock settings / ACC-SCR-17 Enter passcode → ACC-SCR-04, ACC-SCR-17

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**               **Technical name**      **Type / control**   **Required**   **Editable**   **Default**   **Allowed values / validation**      **Visibility**
  -------------- ----------------------- ----------------------- -------------------- -------------- -------------- ------------- ------------------------------------ -------------------
  FLD-ACC-020    App passcode            app_passcode            Password / numeric   Conditional    Yes            Off           Exactly 6 digits; ERR-13 otherwise   Security settings

  FLD-ACC-021    Passcode lock enabled   passcode_lock_enabled   Boolean              System         Yes            false         true/false                           Security settings

  FLD-ACC-022    Wrong passcode count    wrong_passcode_count    Integer              System         No             0             Sign out at 5 with ERR-12            Internal
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.4 Household and Invites --- ACC-SCR-08 Choose Solo Mode--023 → ACC-SCR-08

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**        **Technical name**   **Type / control**   **Required**   **Editable**           **Default**               **Allowed values / validation**                    **Visibility**
  -------------- ---------------- -------------------- -------------------- -------------- ---------------------- ------------------------- -------------------------------------------------- ----------------------
  FLD-ACC-030    Household mode   mode                 System               Yes            Via Solo/invite flow   None initially            Solo, Linked                                       Household overview

  FLD-ACC-031    Invite channel   channel              Radio                Yes            No after creation      None                      Text, Email, Link                                  Invite modal/list

  FLD-ACC-032    Invite email     invite_email         Email                Conditional    No after send          None                      Required for Email; valid format; ERR-04           Invite modal

  FLD-ACC-033    Invite mobile    invite_mobile        Phone                Conditional    No after send          None                      Required for Text; valid format; ERR-08            Invite modal

  FLD-ACC-034    Invite status    status               Display              System         No                     Sent on successful send   Sent, Opened, Accepted, Expired, Cancelled         Invite list

  FLD-ACC-035    Sent at          sent_at              Timestamp            System         No                     Send time                 UTC                                                Invite list/internal

  FLD-ACC-036    Expires at       expires_at           Timestamp            System         No                     Sent at + 7 days          UTC                                                Internal

  FLD-ACC-037    Invite link      invite_url           Display / copy       System         No                     Generated                 Single valid invite; invalid after expiry/cancel   Invite confirmation
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.5 Non-App Communication --- ACC-SCR-09 Contact co-parent not on the app / ACC-SCR-10 Contact-attempt log → ACC-SCR-09, ACC-SCR-10

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**          **Technical name**   **Type / control**   **Required**   **Editable**    **Default**             **Allowed values / validation**                              **Visibility**
  -------------- ------------------ -------------------- -------------------- -------------- --------------- ----------------------- ------------------------------------------------------------ ----------------------
  FLD-ACC-040    Contact channel    contact_channel      Radio                Yes            No after send   None                    Text, Email                                                  Non-app message form

  FLD-ACC-041    Recipient email    recipient_email      Email                Conditional    No after send   None                    Valid email; ERR-04                                          Non-app message form

  FLD-ACC-042    Recipient mobile   recipient_mobile     Phone                Conditional    No after send   None                    Valid phone; ERR-08                                          Non-app message form

  FLD-ACC-043    Message text       message_text         Textarea             Yes            No after send   None                    Not specified --- confirmation required for maximum length   Non-app message form

  FLD-ACC-044    Delivery status    delivery_status      Display              System         No              Sent on accepted send   Sent, Delivered, Failed                                      Exchange/thread

  FLD-ACC-045    Attempt type       attempt_type         Display              System         No              Derived                 Invite, Message, Reply                                       Contact log

  FLD-ACC-046    Attempt result     result               Display              System         No              Derived                 Sent, Failed, Delivered, Reply received                      Contact log
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3.8 User actions and procedures

ACT-ACC-001 --- Create Parent Account

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Visitor
  --------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            ACC-SCR-01 Create account

  **Objective**         Create an account and begin email verification

  **Trigger**           User submits signup form

  **Preconditions**     Email is not already registered; user provides valid email, display name, and password

  **System behavior**   Create User with role Parent, language English, status pending email verification; send a 6-digit verification code valid for 10 minutes and usable once.

  **Data created**      User, verification token, audit-log entry

  **Validations**       Email valid and unique; display name 1--60 characters; password at least 8 characters.

  **Success**           ACC-SCR-14 Verify email

  **Alternative**       Existing email: ERR-01; invalid email: ERR-04; invalid name: ERR-03; short password: ERR-10.

  **Error recovery**    User corrects fields and resubmits; no account is created on validation failure.

  **Permissions**       Public

  **Source**            FR-ACC-01-01, FR-ACC-01-02, FR-ACC-01-03; ACC-09.

  **Open question**     Security must confirm proposed authentication thresholds.

  **Screen(s)**         ACC-SCR-01 Create account
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-01 Create account (entry: Marketing site, sign-in screen).

2.  Make sure the preconditions are met: Email is not already registered; user provides valid email, display name, and password.

3.  Enter or select the required information: Email; Display name; Password.

4.  Perform the action: User submits signup form.

5.  The system validates: Email valid and unique; display name 1--60 characters; password at least 8 characters.

6.  The system processes the action: Create User with role Parent, language English, status pending email verification; send a 6-digit verification code valid for 10 minutes and usable once.

7.  Result on success: ACC-SCR-14 Verify email.

8.  If it fails or a rule is not met: Existing email: ERR-01; invalid email: ERR-04; invalid name: ERR-03; short password: ERR-10.

9.  To recover: User corrects fields and resubmits; no account is created on validation failure.

ACT-ACC-002 --- Verify Email

  --------------------------------------------------------------------------------------------------------------
  **Actor**             New user
  --------------------- ----------------------------------------------------------------------------------------
  **Screen**            ACC-SCR-14 Verify email / ACC-SCR-14 Verify email

  **Objective**         Confirm ownership of the signup email

  **Trigger**           User enters the 6-digit code from the email

  **Preconditions**     Code is valid, unused, and entered within 10 minutes

  **System behavior**   Mark email verified; invalidate token; allow sign-in flow.

  **Data updated**      User email-verified status; token state; audit log

  **Success**           ACC-SCR-02 Sign in

  **Negative**          Expired/used link shows invalid-link state; user can request a new verification email.

  **Permissions**       Token holder

  **Source**            ACC-09; FR-ACC-09-02.

  **Screen(s)**         ACC-SCR-14 Verify email, ACC-SCR-14 Verify email
  --------------------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-14 Verify email, ACC-SCR-14 Verify email (entry: ACC-SCR-01 Create account).

2.  Make sure the preconditions are met: Code is valid, unused, and entered within 10 minutes.

3.  Enter or select the required information: Verification code.

4.  Perform the action: User enters the 6-digit code from the email.

5.  The system processes the action: Mark email verified; invalidate token; allow sign-in flow.

6.  Result on success: ACC-SCR-02 Sign in.

7.  If it fails or a rule is not met: Expired/used link shows invalid-link state; user can request a new verification email.

ACT-ACC-003 --- Request Password Reset

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Visitor or signed-out user
  --------------------- -----------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            ACC-SCR-15 Reset password

  **Objective**         Regain account access

  **Trigger**           User submits email on reset-request screen

  **Preconditions**     None beyond email entry

  **System behavior**   If account exists, send one-time reset link valid for 1 hour; if no account exists, show the same neutral confirmation without sending email.

  **Data created**      Password-reset token; delivery-log entry

  **Success**           Neutral confirmation

  **Negative**          Invalid/expired link cannot be used; user requests a new link.

  **Permissions**       Public

  **Source**            ACC-10; FR-ACC-10-01--FR-ACC-10-03.

  **Screen(s)**         ACC-SCR-15 Reset password
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-15 Reset password (entry: ACC-SCR-14 Verify email).

2.  Make sure the preconditions are met: None beyond email entry.

3.  Enter or select the required information: Email; New password; Confirm new password.

4.  Perform the action: User submits email on reset-request screen.

5.  The system processes the action: If account exists, send one-time reset link valid for 1 hour; if no account exists, show the same neutral confirmation without sending email.

6.  Result on success: Neutral confirmation.

7.  If it fails or a rule is not met: Invalid/expired link cannot be used; user requests a new link.

ACT-ACC-004 --- Reset Password

  ------------------------------------------------------------------------------------------------
  **Actor**             User with valid reset link
  --------------------- --------------------------------------------------------------------------
  **Screen**            ACC-SCR-15 Reset password

  **Objective**         Set a new password

  **Trigger**           User submits new password

  **Preconditions**     Reset token valid and unused

  **System behavior**   Update password; invalidate reset token; require normal sign-in and 2FA.

  **Data updated**      User credential; audit log

  **Success**           ACC-SCR-02 Sign in

  **Negative**          Invalid/weak password or expired token prevents reset.

  **Permissions**       Reset-token holder

  **Source**            ACC-10.

  **Screen(s)**         ACC-SCR-15 Reset password
  ------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-15 Reset password (entry: ACC-SCR-14 Verify email).

2.  Make sure the preconditions are met: Reset token valid and unused.

3.  Enter or select the required information: Email; New password; Confirm new password.

4.  Perform the action: User submits new password.

5.  The system processes the action: Update password; invalidate reset token; require normal sign-in and 2FA.

6.  Result on success: ACC-SCR-02 Sign in.

7.  If it fails or a rule is not met: Invalid/weak password or expired token prevents reset.

ACT-ACC-005 --- Sign In with Two-Factor Authentication

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**                  User
  -------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**                 ACC-SCR-02 Sign in → ACC-SCR-03 Second check

  **Objective**              Authenticate securely before accessing data

  **Trigger**                User submits email/password, then one-time code

  **Preconditions**          Account exists, email verified, account not locked

  **System behavior**        Step 1 validates email/password. Step 2 sends a six-digit one-time code to verified email, or verified mobile if selected; code is valid 10 minutes and single-use. No module opens before 2FA succeeds.

  **Data created/updated**   Session, 2FA code, failed-attempt count, audit-log entry

  **Success**                ACC-SCR-19 Home, or ACC-SCR-17 Enter passcode if passcode lock is enabled

  **Alternative**            Wrong/expired/used code: ERR-02; resend invalidates prior code.

  **Negative**               Fifth consecutive failed password or code attempt locks account for 15 minutes with ERR-11.

  **Error recovery**         Wait for lock expiry or use password reset/support.

  **Permissions**            Account owner

  **Source**                 ACC-01; FR-ACC-01-04--FR-ACC-01-12.

  **Screen(s)**              ACC-SCR-02 Sign in, ACC-SCR-03 Second check
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-02 Sign in, ACC-SCR-03 Second check (entry: Public navigation, signup screen, session expiry).

2.  Make sure the preconditions are met: Account exists, email verified, account not locked.

3.  Enter or select the required information: Email; Password; One-time code.

4.  Perform the action: User submits email/password, then one-time code.

5.  The system processes the action: Step 1 validates email/password. Step 2 sends a six-digit one-time code to verified email, or verified mobile if selected; code is valid 10 minutes and single-use. No module opens before 2FA succeeds.

6.  Result on success: ACC-SCR-19 Home, or ACC-SCR-17 Enter passcode if passcode lock is enabled.

7.  If it fails or a rule is not met: Wrong/expired/used code: ERR-02; resend invalidates prior code.

8.  To recover: Wait for lock expiry or use password reset/support.

ACT-ACC-006 --- Enable Passcode Lock

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Signed-in user
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------
  **Screen**            ACC-SCR-04 App lock settings

  **Objective**         Require a local app lock before data is displayed

  **Trigger**           User enables passcode lock

  **Preconditions**     User is fully signed in

  **System behavior**   Require exactly six digits; store lock setting; require passcode on next app open before showing data. It does not replace 2FA.

  **Data updated**      User security setting; audit log

  **Success**           Lock enabled

  **Negative**          Non-six-digit passcode: ERR-13; five wrong unlock attempts signs user out with ERR-12.

  **Permissions**       Account owner only

  **Source**            ACC-01; FR-ACC-01-10--FR-ACC-01-12.

  **Screen(s)**         ACC-SCR-04 App lock settings
  -------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-04 App lock settings (entry: Account menu).

2.  Make sure the preconditions are met: User is fully signed in.

3.  Enter or select the required information: Passcode lock.

4.  Perform the action: User enables passcode lock.

5.  The system processes the action: Require exactly six digits; store lock setting; require passcode on next app open before showing data. It does not replace 2FA.

6.  Result on success: Lock enabled.

7.  If it fails or a rule is not met: Non-six-digit passcode: ERR-13; five wrong unlock attempts signs user out with ERR-12.

ACT-ACC-007 --- Choose Solo Mode

  -------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent without linked co-parent
  --------------------- ---------------------------------------------------------------------------------------------------------------------------
  **Screen**            ACC-SCR-08 Choose Solo Mode

  **Objective**         Use ParentPath and retain records without the other parent joining

  **Trigger**           Parent selects Solo Mode

  **Preconditions**     No linked co-parent

  **System behavior**   Set household mode to Solo; make billing gate read Solo; retain all future one-parent-capable records; write audit entry.

  **Data updated**      Household mode; audit log

  **Success**           ACC-SCR-19 Home with Solo Mode active

  **Negative**          Save failure retains previous mode and shows ERR-06.

  **Permissions**       Parent

  **Source**            ACC-03; FR-ACC-03-01--FR-ACC-03-08.

  **Screen(s)**         ACC-SCR-08 Choose Solo Mode
  -------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-08 Choose Solo Mode (entry: ACC-SCR-14 Verify email; app home when household mode unset).

2.  Make sure the preconditions are met: No linked co-parent.

3.  Enter or select the required information: Household mode.

4.  Perform the action: Parent selects Solo Mode.

5.  The system processes the action: Set household mode to Solo; make billing gate read Solo; retain all future one-parent-capable records; write audit entry.

6.  Result on success: ACC-SCR-19 Home with Solo Mode active.

7.  If it fails or a rule is not met: Save failure retains previous mode and shows ERR-06.

ACT-ACC-008 --- Invite Co-Parent

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent
  --------------------- --------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            ACC-SCR-05 Invite co-parent

  **Objective**         Invite the other parent by text, email, or link

  **Trigger**           Parent submits invite

  **Preconditions**     Parent signed in; no blocking active invite unless rules permit resend

  **System behavior**   Create Invite with channel Text, Email, or Link; set status Sent; expire after 7 days; send through Notifications; create contact-attempt entry.

  **Data created**      Invite, contact-attempt entry, delivery-log entry, audit log

  **Validations**       Valid email or mobile number depending on channel.

  **Success**           Invite status Sent; link shown for Link channel

  **Alternative**       New invite allowed only if prior invite is Expired/Cancelled or 24 hours have elapsed; otherwise ERR-14.

  **Negative**          Invalid email: ERR-04; invalid mobile: ERR-08; delivery failure: ERR-05 and status does not become Sent.

  **Permissions**       Parent

  **Source**            ACC-02; FR-ACC-02-01--FR-ACC-02-15.

  **Screen(s)**         ACC-SCR-05 Invite co-parent
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-05 Invite co-parent (entry: ACC-SCR-15 Reset password; Household Overview).

2.  Make sure the preconditions are met: Parent signed in; no blocking active invite unless rules permit resend.

3.  Enter or select the required information: Invite channel.

4.  Perform the action: Parent submits invite.

5.  The system validates: Valid email or mobile number depending on channel.

6.  The system processes the action: Create Invite with channel Text, Email, or Link; set status Sent; expire after 7 days; send through Notifications; create contact-attempt entry.

7.  Result on success: Invite status Sent; link shown for Link channel.

8.  If it fails or a rule is not met: New invite allowed only if prior invite is Expired/Cancelled or 24 hours have elapsed; otherwise ERR-14.

ACT-ACC-009 --- Accept Co-Parent Invite

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Invitee
  --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            ACC-SCR-07 Accept invite

  **Objective**         Join the household as Co-parent

  **Trigger**           Invitee opens valid invite and accepts

  **Preconditions**     Invite status Sent or Opened; invite not expired/cancelled

  **System behavior**   Set invite Opened on open; require account creation with role Co-parent, email verification, and 2FA; on acceptance add user to household and set mode Linked; preserve all prior Solo records as private until shared.

  **Data updated**      Invite status, household membership, household mode, audit log

  **Success**           Invite Accepted; household Linked; invitee reaches app shell

  **Negative**          Expired/cancelled invite shows ERR-16; account creation/2FA failure prevents module access.

  **Permissions**       Invite recipient

  **Source**            ACC-02; FR-ACC-02-04, FR-ACC-02-07--FR-ACC-02-13; ACC-03 FR-ACC-03-06/09.

  **Screen(s)**         ACC-SCR-07 Accept invite
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-07 Accept invite (entry: Invite email, text link, or shared link).

2.  Make sure the preconditions are met: Invite status Sent or Opened; invite not expired/cancelled.

3.  Enter or select the required information: Email; Display name; Password.

4.  Perform the action: Invitee opens valid invite and accepts.

5.  The system processes the action: Set invite Opened on open; require account creation with role Co-parent, email verification, and 2FA; on acceptance add user to household and set mode Linked; preserve all prior Solo records as private until shared.

6.  Result on success: Invite Accepted; household Linked; invitee reaches app shell.

7.  If it fails or a rule is not met: Expired/cancelled invite shows ERR-16; account creation/2FA failure prevents module access.

ACT-ACC-010 --- Cancel Co-Parent Invite

  ------------------------------------------------------------------------------------------
  **Actor**             Parent
  --------------------- --------------------------------------------------------------------
  **Screen**            ACC-SCR-06 Invite list and status

  **Objective**         Stop a pending invitation

  **Trigger**           Parent selects Cancel

  **Preconditions**     Invite status Sent or Opened

  **System behavior**   Set status Cancelled; invalidate link; allow immediate new invite.

  **Data updated**      Invite status; audit log

  **Success**           Confirmation; invite link no longer accepted

  **Negative**          Already expired/accepted invite cannot be cancelled.

  **Permissions**       Inviting Parent

  **Source**            FR-ACC-02-12, FR-ACC-02-13.

  **Screen(s)**         ACC-SCR-06 Invite list and status
  ------------------------------------------------------------------------------------------

1.  Open ACC-SCR-06 Invite list and status (entry: ; Household Overview).

2.  Make sure the preconditions are met: Invite status Sent or Opened.

3.  Perform the action: Parent selects Cancel.

4.  The system processes the action: Set status Cancelled; invalidate link; allow immediate new invite.

5.  Result on success: Confirmation; invite link no longer accepted.

6.  If it fails or a rule is not met: Already expired/accepted invite cannot be cancelled.

ACT-ACC-011 --- Message Non-App Co-Parent

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent
  --------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            ACC-SCR-09 Contact co-parent not on the app

  **Objective**         Contact a co-parent who has not joined while preserving evidence

  **Trigger**           Parent sends text or email

  **Preconditions**     Parent signed in; valid mobile/email for selected channel

  **System behavior**   Send via Notifications; save full exchange with timestamps; create contact-attempt entry; show Sent, Delivered, or Failed; add inbound reply to same exchange.

  **Data created**      Message/exchange, contact-attempt entry, delivery-log entry, audit log

  **Success**           Message visible in Messaging thread; delivery status displayed

  **Alternative**       Recipient reply is appended to same exchange.

  **Negative**          Invalid email: ERR-04; invalid mobile: ERR-08; delivery failure: ERR-07.

  **Permissions**       Parent only; support staff cannot read exchange.

  **Source**            ACC-04, ACC-05; FR-ACC-04-01--FR-ACC-04-09.

  **Screen(s)**         ACC-SCR-09 Contact co-parent who is not on the app
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-09 Contact co-parent who is not on the app (entry: Household Overview; invite/status context).

2.  Make sure the preconditions are met: Parent signed in; valid mobile/email for selected channel.

3.  Enter or select the required information: Contact channel; Message.

4.  Perform the action: Parent sends text or email.

5.  The system processes the action: Send via Notifications; save full exchange with timestamps; create contact-attempt entry; show Sent, Delivered, or Failed; add inbound reply to same exchange.

6.  Result on success: Message visible in Messaging thread; delivery status displayed.

7.  If it fails or a rule is not met: Recipient reply is appended to same exchange.

ACT-ACC-012 --- View Contact-Attempt Log

  -----------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent
  --------------------- -------------------------------------------------------------------------------------------------
  **Screen**            ACC-SCR-10 Contact-attempt log

  **Objective**         Demonstrate contact attempts and outcomes

  **Trigger**           Parent opens log

  **Preconditions**     Parent has contact attempts

  **System behavior**   Display invite and message attempts with channel, date/time, and result; entries are immutable.

  **Data viewed**       Contact-attempt entries

  **Success**           Log displayed

  **Negative**          No entries: empty state with invitation/non-app messaging actions.

  **Permissions**       Parent; professional only if explicitly shared; support staff excluded.

  **Source**            ACC-05.

  **Screen(s)**         ACC-SCR-10 Contact-attempt log
  -----------------------------------------------------------------------------------------------------------------------

1.  Open ACC-SCR-10 Contact-attempt log (entry:, ACC-SCR-04 App lock settings).

2.  Make sure the preconditions are met: Parent has contact attempts.

3.  Perform the action: Parent opens log.

4.  The system processes the action: Display invite and message attempts with channel, date/time, and result; entries are immutable.

5.  Result on success: Log displayed.

6.  If it fails or a rule is not met: No entries: empty state with invitation/non-app messaging actions.

ACT-ACC-013 --- Update Profile

  ----------------------------------------------------------------------------------------
  **Actor**             Signed-in user
  --------------------- ------------------------------------------------------------------
  **Screen**            ACC-SCR-16 Profile

  **Objective**         Maintain display name and profile details

  **Trigger**           User saves profile

  **Preconditions**     User signed in

  **System behavior**   Validate and update permitted profile fields; write audit entry.

  **Data updated**      User profile; audit log

  **Success**           Profile saved

  **Negative**          Invalid field values prevent save.

  **Permissions**       Account owner

  **Source**            ACC-11.

  **Screen(s)**         ACC-SCR-16 Profile
  ----------------------------------------------------------------------------------------

1.  Open ACC-SCR-16 Profile (entry: App navigation / account menu).

2.  Make sure the preconditions are met: User signed in.

3.  Enter or select the required information: Display name; Email; Language.

4.  Perform the action: User saves profile.

5.  The system processes the action: Validate and update permitted profile fields; write audit entry.

6.  Result on success: Profile saved.

7.  If it fails or a rule is not met: Invalid field values prevent save.

3.9 Business rules and validations

-   Linking two existing accounts: a person who already has a ParentPath account accepts an invite by choosing Sign in to accept on ACC-SCR-07 Accept invite. Both parents then share one household, and its mode becomes Linked.

-   Each parent\'s records from before the link stay private to that parent until they share them. Nothing is merged or deleted.

-   If both parents already have children in the app, Accept invite asks the accepting parent to match each child with the same child in the other parent\'s list, or to keep the child as separate. A matched child appears once in the household. Both parents\' earlier entries stay attached to it, private until shared.

-   The app never shows whether an email address or phone number already belongs to an account. The invite screens, messages and errors are the same either way.

-   No person is ever added to a household without accepting an invite.

-   Solo Mode: features that need the co-parent (Call, Reimbursement request, Schedule change request, Share with co-parent, Split rules, Mediation request) show \'Invite your co-parent to use this\' with a link to ACC-SCR-05 Invite co-parent. The parent\'s own records keep working.

-   Household members: a third party or child is added on ACC-SCR-12 Household members and roles and accepts through ACC-SCR-07 Accept invite, which shows the role they are invited for.

-   Close account: while a legal hold is on, ACC-SCR-18 Close account shows the legal hold notice with a link to REC-SCR-15 Legal hold, and the account cannot be closed.

  ----------------------------------------------------------------------------------------------------------------------------
  **ID**        **Rule**                                                                              **Features**
  ------------- ------------------------------------------------------------------------------------- ------------------------
  BR-01         A parent can use the app alone (Solo Mode) and still keeps a full record.             ACC-03

  BR-02         Every invite and every attempt to reach the co-parent is logged with date and time.   ACC-02, ACC-04, ACC-05
  ----------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- -----------------------------------------------------------------------------------------------------------------------------
  BR-01      A parent can use the app alone (Solo Mode) and still keeps a full record.

  BR-02      Every invite and every attempt to reach the co-parent is logged with date and time.

  BR-05      Data export, tone, safety and reporting tools are available to every user.

  BR-07      Sent, delivered and read status is saved in the record.

  BR-08      A sent message cannot be edited or deleted.

  BR-21      Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export.
  ----------------------------------------------------------------------------------------------------------------------------------------

3.10 Messages and errors

Errors

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**    **When it shows**                                              **Text**                                                                                                   **Used by**
  --------- -------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------
  ERR-01    The email is already used by an account                        This email is already used for an account. Sign in, or use a different email.                              FR-ACC-01-02

  ERR-02    The code is wrong, expired or already used                     That code did not work or has expired. Check it or ask for a new code.                                     FR-ACC-01-07

  ERR-03    display_name is empty or longer than 60 characters             Enter a name with 1 to 60 characters.                                                                      FR-ACC-01-02, FR-ACC-11-02

  ERR-04    An email is not valid                                          Enter a valid email address.                                                                               FR-ACC-01-02, FR-ACC-02-15, FR-ACC-04-09, FR-ACC-11-02

  ERR-05    An invite cannot be sent                                       We could not send your invite. Check the details and try again.                                            FR-ACC-02-14

  ERR-06    A setting or change cannot be saved                            We could not save your change. Nothing was changed. Please try again.                                      FR-ACC-03-08, FR-ACC-06-08, FR-ACC-07-08, FR-ACC-11-06, FR-ACC-12-07

  ERR-07    A text or email cannot be delivered                            We could not deliver your message. The attempt is saved in your contact log. Please try again.             FR-ACC-04-08

  ERR-08    A mobile number is not valid                                   Enter a valid mobile number.                                                                               FR-ACC-02-15, FR-ACC-04-09, FR-ACC-11-02

  ERR-09    A draft cannot be saved                                        We could not save your draft. Copy your text before you leave this page.                                   FR-ACC-06-07

  ERR-10    A password has fewer than 8 characters                         Enter a password with at least 8 characters.                                                               FR-ACC-01-02, FR-ACC-10-04

  ERR-11    The account is locked                                          Too many tries. Your account is locked for 15 minutes. Try again later.                                    FR-ACC-01-09

  ERR-12    A user enters a wrong passcode 5 times in a row                Too many wrong passcodes. You were signed out. Sign in again.                                              FR-ACC-01-11

  ERR-13    A passcode does not have 6 digits                              Enter a passcode with 6 digits.                                                                            FR-ACC-01-10

  ERR-14    A new invite is sent too early                                 You can send another invite after \[date and time\]. Or cancel the current invite to send a new one now.   FR-ACC-02-10

  ERR-15    A verification or reset link has expired or was already used   This link has expired or was already used. Ask for a new one.                                              FR-ACC-09-05, FR-ACC-10-06

  ERR-16    An invite has expired, was cancelled or was replaced           This invite is no longer valid. Ask the sender for a new invite.                                           FR-ACC-02-13

  ERR-17    A user whose email is not verified tries to sign in            Verify your email first. We can send you a new link.                                                       FR-ACC-09-03

  ERR-18    A contact-attempt entry cannot be saved                        We could not save the record of this contact, so nothing was sent. Please try again.                       FR-ACC-05-02
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**       **When it shows**                                              **Text**                                                                   **Feature**
  ------------ -------------------------------------------------------------- -------------------------------------------------------------------------- -------------
  MSGT-01      An invite is sent                                              Your invite was sent.                                                      ACC-02

  MSGT-02      The parent chooses Solo Mode                                   Solo Mode is on. Your records are saved in your account.                   ACC-03

  MSGT-03      A text or email to a co-parent who is not on the app is sent   Your message was sent and saved in your record.                            ACC-04

  MSGT-04      A session ends because of the timeout                          You were signed out. Your drafts are saved.                                ACC-06

  MSGT-06      An account is created                                          We sent a link to your email. Open it to finish setting up your account.   ACC-09

  MSGT-07      A user asks for a password reset                               If this email has an account, we sent a link to reset your password.       ACC-10

  MSGT-08      A parent cancels an invite                                     Your invite was cancelled.                                                 ACC-02
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------

3.11 Dependencies

  ----------------------------------------------------------------------------------
  **Module**                        **What it needs from Accounts and Onboarding**
  --------------------------------- ------------------------------------------------
  Messaging                         Non-user messaging

  Child Support Sync                ACC-01.

  Children and Documents            Roles

  Professionals and Access          Invites and roles

  Support                           Accounts (no detail given)
  ----------------------------------------------------------------------------------

12.3 Assumptions

-   The evidence for P10 is one 2022 review that may be fixed since (Pain Point workbook).

3.12 End-to-end workflows and scenarios

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                                                                                                   **Module path**                 **Features / rules**
  -------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------- --------------------------------------
  WF-01          Sign up, verify email, sign in with second check, set up household                                                                                                                ACC → NTF → PLT                 ACC-01, ACC-09, ACC-10, NTF-06

  WF-02          Invite co-parent, accept invite, household becomes Linked                                                                                                                         ACC → NTF → REC                 ACC-02, ACC-05

  WF-03          Choose Solo Mode, keep records; co-parent joins later; Solo records stay private until shared                                                                                     ACC → EXP/DOC/CAL/REC           ACC-03, BR-01

  WF-04          Reach a co-parent who is not on the app by text/email; replies appended; every attempt logged before send                                                                         ACC → NTF → MSG → REC           ACC-04, ACC-05, NTF-06

  WF-13          Journal notes; data export (PDF/CSV, free); certified export with Record ID; public verification                                                                                  REC ← MSG/CAL/EXP/DOC/NTF/ACC   REC-01, REC-05, REC-07, BR-05, BR-20

  WF-20          Link a child-support case (state, details, one-time code, consent) → API/batch load → overview, comparison, hearings in calendar, reminders → share an item → unlink and export   CSS → ACC/EXP/CAL/NTF/REC       CSS-01--05, CSS-07, CSS-12, CSS-13

  WF-21          send proof to agency, family-violence flag offers Safety Mode, agency notice invite, unified timeline                                                                             CSS → SAF/ACC                   CSS-06, CSS-08--10

  WF-23          Invite a professional, set categories and dates, professional accepts, read-only view, access log, end access                                                                     PRO → ACC → REC                 PRO-01, PRO-02, BR-24

  WF-24          Account closure, deletion of non-record data, legal hold                                                                                                                          ACC → REC                       ACC-12, REC-06, BR-21
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Scenario**   **Scenario**                                                                                                     **Expected behaviour**
  -------------- ---------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------
  SCN-ACC-001    Parent chooses Solo Mode, creates expenses and child entries, then co-parent accepts invite                      Household becomes Linked; prior records remain private until the parent shares them; audit entries record the mode change.

  SCN-ACC-002    Parent sends invite by email, invitee opens but does not accept, then parent sends a new invite after 25 hours   Old invite becomes Expired; new invite becomes Sent; old link returns ERR-16.

  SCN-ACC-003    Parent sends text to non-app co-parent; co-parent replies                                                        Reply is appended to same exchange/thread with timestamp; contact-attempt log records both directions; no Read status is shown for non-app channel.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
