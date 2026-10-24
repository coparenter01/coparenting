# Professionals and Access (PRO)


12.1 Module overview

  ------------------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- ------------------------------------------------------------------------------------------------------
  Purpose                 Let a parent bring in an attorney, mediator or therapist without giving them control of the account.

  Users                   Attorney, mediator, therapist (invited by a parent)

  Pain points addressed   None linked directly

  Features                2 (0 Must-have, 2 Good-to-have, 0 Unique)

  Depends on              Accounts and Onboarding (invites and roles), Records and Court.
  ------------------------------------------------------------------------------------------------------------------------------

-   Read-only access for professionals to the records the parent chooses to share.

-   A private channel to a professional, so a parent can send one selected message.

Purpose and scope

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **How this module supports it**
  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  OBJ-01           A professional can read the court-ready records that the parent shares, such as certified exports (PRO-01).

  OBJ-05           The parent chooses what to share, can stop access at any time and sees when the professional looked. Hiding rules for Safety Mode still apply (PRO-01).
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.3 In scope. The two features PRO-01 and PRO-02 listed in section 5.

12.2 Roles and permissions

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**                **What they do in this module**
  ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parent                  Invites professionals, chooses what each one can see, shares single items, stops access, reads the access log, and sends one selected message to a professional.

  Co-parent               The same as the Parent for their own professionals, once linked. Each parent has their own professionals, and a parent does not see the professionals of the other parent.

  Professional            An attorney, a mediator or a therapist invited by a parent. Reads what the parent shares. Cannot post, edit, delete or invite. One account can serve many parents. The mediator in a mediation thread of MSG-12 is the only exception.

  Support staff           No access to shared records. May see the status of an invite and of an access to help with a sign-in problem, and cannot read parent messages.

  Third party and Child   No feature in this module.

  Court or agency staff   Not users of the app.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

12.3 Business requirements

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**        **Business requirement**                                                                                                                                                     **Features**
  ------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------
  BREQ-01       A parent can invite an attorney, a mediator or a therapist and give them read-only access to what the parent chooses to share, without giving them control of the account.   PRO-01

  BREQ-02       A parent can send one selected message to a professional through a private channel.                                                                                          PRO-02
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

12.4 Features

  --------------------------------------------------------------------------------------------
  **Feature**   **Name**                                         **Type**
  ------------- ------------------------------------------------ -----------------------------
  PRO-01        Access for attorneys, mediators and therapists   Good-to-have → Good-to-have

  PRO-02        Private channel to a professional                Good-to-have → Good-to-have
  --------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**              **Screens**
  ------------------ -------------------------- -----------------------------------------------------------------------------
  PRO-SUB-01         Professional invitations   Invite professional; invite status; invite landing; professional terms

  PRO-SUB-02         Access control             Access category/date selection; access detail; pause/end access; access log

  PRO-SUB-03         Professional portal        Client list; client record views; file downloads

  PRO-SUB-04         Message forwarding         Select message; add note; confirm; professional copy view
  ---------------------------------------------------------------------------------------------------------------------------

12.5 Screen inventory

  -------------------------------------------------------------------------------------------------
  **Screen ID**   **Screen**                                                         **Feature**
  --------------- ------------------------------------------------------------------ --------------
  PRO-SCR-01      My professionals: list with status                                 PRO-01

  PRO-SCR-02      Invite a professional: type, categories, date range and end date   PRO-01

  PRO-SCR-03      Access settings of one professional, with end access               PRO-01

  PRO-SCR-04      Share an item with a professional, with confirm step               PRO-01

  PRO-SCR-05      Access log                                                         PRO-01

  PRO-SCR-06      Accept an invite and create a professional account                 PRO-01

  PRO-SCR-07      Professional home: list of clients                                 PRO-01

  PRO-SCR-08      Professional client view, read only                                PRO-01

  PRO-SCR-09      Send one message to a professional                                 PRO-02

  PRO-SCR-10      Professional list of messages From a parent                        PRO-02
  -------------------------------------------------------------------------------------------------

12.6 Screen specifications

PRO-SCR-01 --- My professionals

  -------------------------------------------------------------------------
  **Screen ID**    PRO-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Professionals and Access

  **Feature(s)**   PRO-01
  -------------------------------------------------------------------------

![Figure PRO-SCR-01 --- My professionals](media/8bdc88144c1520162156b5a01ad44da2aced79a4.png "Figure PRO-SCR-01 — My professionals"){width="6.666666666666667in" height="5.0in"}

*Figure PRO-SCR-01 --- My professionals*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Professionals; PRO-SCR-02 Invite a professional; PRO-SCR-03 Access settings; PRO-SCR-09 Send one message to a professional
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   PRO-SCR-02 Invite a professional; PRO-SCR-03 Access settings; PRO-SCR-09 Send one message to a professional; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Professionals Home\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Professional type (P-PRO-001-03); Access status (P-PRO-001-04); Shared items (P-PRO-001-05).

-   Input area (form fields, in specification order): Professional name (P-PRO-001-02).

-   Action area (primary action first, then secondary actions and links): Professional list (P-PRO-001-01); Invite professional (P-PRO-001-06); Manage access (P-PRO-001-07); Revoke (P-PRO-001-08).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**          **Required**   **Editable**   **Default**    **Allowed values / validation**        **Error**               **Visibility**   **Saved to**          **Behavior**
  ------------------ ------------------------- ----------------- -------------- -------------- -------------- -------------------------------------- ----------------------- ---------------- --------------------- ----------------------------------------
  P-PRO-001-01       Professional list         Table / list      ---            ---            ---            Invited/active professionals           Load error with retry   Parent           ProfessionalAccess    Displays professionals

  P-PRO-001-02       Professional name         Text              System         No             Invitee name   Professional identity                  ---                     Parent           Professional record   Display only

  P-PRO-001-03       Professional type         Badge             System         No             Derived        Attorney; Mediator; Therapist; Other   ---                     Parent           Professional record   Display only

  P-PRO-001-04       Access status             Badge             System         No             Pending        Invited; Active; Ended                 ---                     Parent           access_status         Display only

  P-PRO-001-05       Shared items              Count / summary   System         No             Derived        Shared records/messages/etc.           ---                     Parent           Access grant          Display only

  P-PRO-001-06       Invite professional       Primary button    ---            ---            ---            ---                                    ---                     Parent           ---                   Opens PRO-SCR-02 Invite a professional

  P-PRO-001-07       Manage access             Row action        ---            ---            ---            Invited or Active access               ---                     Parent           ---                   Opens PRO-SCR-03 Access settings

  P-PRO-001-08       Revoke                    Row action        ---            ---            ---            Active access                          ---                     Parent           ---                   Opens PRO-SCR-03 Access settings
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- no professionals; Loading --- list skeleton; Error --- load failure; Success --- professionals displayed.

PRO-SCR-02 --- Invite a professional

  -------------------------------------------------------------------------
  **Screen ID**    PRO-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Professionals and Access

  **Feature(s)**   PRO-01
  -------------------------------------------------------------------------

![Figure PRO-SCR-02 --- Invite a professional](media/a521835839b87ff336498a53062b42a113cbacca.png "Figure PRO-SCR-02 — Invite a professional"){width="6.666666666666667in" height="5.0in"}

*Figure PRO-SCR-02 --- Invite a professional*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    PRO-SCR-01 My professionals
  ----------------------- --------------------------------------------------------
  **Where you go next**   PRO-SCR-01 My professionals; Main menu: any module

  --------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Invite Professional\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Professional email (P-PRO-002-01); Professional name (P-PRO-002-02); Professional type (P-PRO-002-03); Access scope (P-PRO-002-04); Expiry (P-PRO-002-05); Read-only notice (P-PRO-002-06).

-   Action area (primary action first, then secondary actions and links): Send invitation (P-PRO-002-07); Cancel (P-PRO-002-08).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**     **Allowed values / validation**                    **Error**               **Visibility**   **Saved to**               **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- --------------- -------------------------------------------------- ----------------------- ---------------- -------------------------- --------------------------
  P-PRO-002-01       Professional email        Email input          Yes            Yes            Blank           Valid email                                        ERR invalid email       Parent           Invitation                 Required

  P-PRO-002-02       Professional name         Text input           Yes            Yes            Blank           Required; up to 5,000 characters                   ERR required            Parent           Invitation                 Required

  P-PRO-002-03       Professional type         Select               Yes            Yes            None            Attorney; Mediator; Therapist; Other               Inline field message    Parent           Invitation                 Required

  P-PRO-002-04       Access scope              Checkbox group       Yes            Yes            None selected   Messages; Calendar; Expenses; Documents; Records   At least one required   Parent           Access grant               Defines read-only access

  P-PRO-002-05       Expiry                    Date picker          No             Yes            None            Future date                                        Inline field message    Parent           Access grant               Optional

  P-PRO-002-06       Read-only notice          Informational text   ---            ---            ---             Professional cannot post                           ---                     Parent           ---                        Display only

  P-PRO-002-07       Send invitation           Primary button       ---            ---            ---             ---                                                Send failure            Parent           Invitation.status = Sent   Sends invite

  P-PRO-002-08       Cancel                    Secondary button     ---            ---            ---             ---                                                ---                     Parent           ---                        Discards invite
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- blank form; Loading --- send disabled; Error --- validation/send failure; Success --- invitation sent.

Specification

**Component arrangement:**

-   Page header: screen title \"Invitation Sent / Pending\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Confirmation message (P-PRO-003-01); Access scope (P-PRO-003-03); Expiry (P-PRO-003-04).

-   Input area (form fields, in specification order): Invitee email (P-PRO-003-02).

-   Action area (primary action first, then secondary actions and links): Resend invitation (P-PRO-003-05); Cancel invitation (P-PRO-003-06).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**       **Allowed values / validation**   **Error**              **Visibility**   **Saved to**                    **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ----------------- --------------------------------- ---------------------- ---------------- ------------------------------- ----------------
  P-PRO-003-01       Confirmation message      Confirmation panel   ---            ---            ---               Invitation sent                   ---                    Parent           ---                             Display only

  P-PRO-003-02       Invitee email             Text                 System         No             Invite value      Invitee email                     ---                    Parent           Invitation                      Display only

  P-PRO-003-03       Access scope              Summary              System         No             Selected scope    Read-only items                   ---                    Parent           Access grant                    Display only

  P-PRO-003-04       Expiry                    Timestamp            System         No             Selected expiry   UTC storage; local display        ---                    Parent           Access grant                    Display only

  P-PRO-003-05       Resend invitation         Button               ---            ---            ---               Invited only                      Inline field message   Parent           Invitation                      Resends invite

  P-PRO-003-06       Cancel invitation         Destructive button   ---            ---            ---               Invited only                      ---                    Parent           Invitation.status = Cancelled   Cancels invite
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- not applicable; Loading --- actions disabled; Error --- action failure; Success --- invitation status displayed.

PRO-SCR-03 --- Access settings

  -------------------------------------------------------------------------
  **Screen ID**    PRO-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Professionals and Access

  **Feature(s)**   PRO-01
  -------------------------------------------------------------------------

![Figure PRO-SCR-03 --- Access settings](media/8b9c69bb2cb740901d0c71484f9d229cb88760a7.png "Figure PRO-SCR-03 — Access settings"){width="6.666666666666667in" height="5.0in"}

*Figure PRO-SCR-03 --- Access settings*

**Navigation**

  ---------------------------------------------------------------------------------------------------
  **How you get here**    PRO-SCR-01 My professionals; PRO-SCR-05 Access log
  ----------------------- ---------------------------------------------------------------------------
  **Where you go next**   PRO-SCR-01 My professionals; PRO-SCR-05 Access log; Main menu: any module

  ---------------------------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Professional Access Settings\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Professional identity (P-PRO-004-01).

-   Input area (form fields, in specification order): Access scope (P-PRO-004-02); Expiry (P-PRO-004-03).

-   Action area (primary action first, then secondary actions and links): Save changes (P-PRO-004-04); Revoke access (P-PRO-004-05).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**           **Allowed values / validation**   **Error**              **Visibility**   **Saved to**          **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- --------------------- --------------------------------- ---------------------- ---------------- --------------------- ----------------------------------
  P-PRO-004-01       Professional identity     Read-only panel      System         No             Professional record   Name, email, type                 Load error             Parent           Professional record   Display only

  P-PRO-004-02       Access scope              Checkbox group       Yes            Yes            Current scope         Read-only modules                 Inline field message   Parent           Access grant          Updates access

  P-PRO-004-03       Expiry                    Date picker          No             Yes            Current expiry        Future date                       Inline field message   Parent           Access grant          Updates expiry

  P-PRO-004-04       Save changes              Primary button       ---            ---            ---                   ---                               Save error             Parent           Access grant          Saves changes

  P-PRO-004-05       Revoke access             Destructive button   ---            ---            ---                   ---                               ---                    Parent           Access grant          Opens PRO-SCR-03 Access settings
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- not applicable; Loading --- settings loading; Error --- save failure; Success --- access updated.

Specification

**Component arrangement:**

-   Page header: screen title \"Revoke Access Confirmation\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Revoke explanation (P-PRO-006-01); Audit record (P-PRO-006-04).

-   Action area (primary action first, then secondary actions and links): Confirm end access (P-PRO-006-02); Keep access (P-PRO-006-03).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**              **Required**   **Editable**   **Default**   **Allowed values / validation**         **Error**   **Visibility**   **Saved to**            **Behavior**
  ------------------ ------------------------- --------------------- -------------- -------------- ------------- --------------------------------------- ----------- ---------------- ----------------------- --------------------------
  P-PRO-006-01       Revoke explanation        Informational panel   ---            ---            ---           Professional loses access immediately   ---         Parent           ---                     Display only

  P-PRO-006-02       Confirm end access        Destructive button    Yes            ---            ---           ---                                     ---         Parent           access_status = Ended   Ends access

  P-PRO-006-03       Keep access               Secondary button      ---            ---            ---           ---                                     ---         Parent           ---                     Returns without revoking

  P-PRO-006-04       Audit record              System                System         No             Generated     Actor, UTC time, result                 ---         Internal         Audit log               Created on revoke
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- not applicable; Loading --- confirm disabled; Error --- revoke failure; Success --- access revoked.

PRO-SCR-04 --- Share an item with a professional

  -------------------------------------------------------------------------
  **Screen ID**    PRO-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Professionals and Access

  **Feature(s)**   PRO-01
  -------------------------------------------------------------------------

![Figure PRO-SCR-04 --- Share an item with a professional](media/5a4689ee5f16e9f9ad2d2d97136c255a6c2f8741.png "Figure PRO-SCR-04 — Share an item with a professional"){width="6.666666666666667in" height="5.0in"}

*Figure PRO-SCR-04 --- Share an item with a professional*

**Navigation**

  -----------------------------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-07 Document detail and versions; MSG-SCR-02 Thread and message view
  ----------------------- -----------------------------------------------------------------------------
  **Where you go next**   DOC-SCR-07 Document detail and versions; Main menu: any module

  -----------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

PRO-SCR-05 --- Access log

  -------------------------------------------------------------------------
  **Screen ID**    PRO-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Professionals and Access

  **Feature(s)**   PRO-01
  -------------------------------------------------------------------------

![Figure PRO-SCR-05 --- Access log](media/40689e148d578e7c5c49253829b427b544b7185a.png "Figure PRO-SCR-05 — Access log"){width="6.666666666666667in" height="5.0in"}

*Figure PRO-SCR-05 --- Access log*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    PRO-SCR-03 Access settings
  ----------------------- --------------------------------------------------------
  **Where you go next**   PRO-SCR-03 Access settings; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

PRO-SCR-06 --- Accept invite (professional)

  -------------------------------------------------------------------------
  **Screen ID**    PRO-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Professionals and Access

  **Feature(s)**   PRO-01
  -------------------------------------------------------------------------

![Figure PRO-SCR-06 --- Accept invite (professional)](media/dce561edfd7e0faf0e241b8052dc8eb51035ed4d.png "Figure PRO-SCR-06 — Accept invite (professional)"){width="6.666666666666667in" height="5.0in"}

*Figure PRO-SCR-06 --- Accept invite (professional)*

**Navigation**

  -------------------------------------------------------------------------------------------------
  **How you get here**    Invite link the professional receives
  ----------------------- -------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; SAF-SCR-05 Public safety resources; SUP-SCR-01 Help

  -------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

PRO-SCR-07 --- Professional home

  -------------------------------------------------------------------------
  **Screen ID**    PRO-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Professionals and Access

  **Feature(s)**   PRO-01
  -------------------------------------------------------------------------

![Figure PRO-SCR-07 --- Professional home](media/4344b862335c318834a3b2a5fcacf23d657da13d.png "Figure PRO-SCR-07 — Professional home"){width="6.666666666666667in" height="5.0in"}

*Figure PRO-SCR-07 --- Professional home*

**Navigation**

  ----------------------------------------------------------------------------------------------------------------------
  **How you get here**    PRO-SCR-08 Client view (read only); PRO-SCR-10 Messages from a parent; Professional signs in
  ----------------------- ----------------------------------------------------------------------------------------------
  **Where you go next**   PRO-SCR-08 Client view (read only); PRO-SCR-10 Messages from a parent

  ----------------------------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

PRO-SCR-08 --- Client view (read only)

  -------------------------------------------------------------------------
  **Screen ID**    PRO-SCR-08
  ---------------- --------------------------------------------------------
  **Module**       Professionals and Access

  **Feature(s)**   PRO-01
  -------------------------------------------------------------------------

![Figure PRO-SCR-08 --- Client view (read only)](media/27be8a347742325249974d6bed520b9e45ae8483.png "Figure PRO-SCR-08 — Client view (read only)"){width="6.666666666666667in" height="5.0in"}

*Figure PRO-SCR-08 --- Client view (read only)*

**Navigation**

  -----------------------------------------------------------------------------------------
  **How you get here**    PRO-SCR-07 Professional home
  ----------------------- -----------------------------------------------------------------
  **Where you go next**   PRO-SCR-07 Professional home; PRO-SCR-10 Messages from a parent

  -----------------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Professional View\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Shared content (P-PRO-005-01); Messages (P-PRO-005-02); Calendar (P-PRO-005-03); Expenses (P-PRO-005-04); Documents / records (P-PRO-005-05); Access expiry notice (P-PRO-005-07).

-   Controls that must NOT be provided: Post / reply (P-PRO-005-06).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**     **Allowed values / validation**   **Error**      **Visibility**   **Saved to**     **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- --------------- --------------------------------- -------------- ---------------- ---------------- ------------------------
  P-PRO-005-01       Shared content            Read-only view   System         No             Granted scope   Only items parent shared          Access error   Professional     Access grant     Display only

  P-PRO-005-02       Messages                  Read-only list   System         No             Granted scope   Shared messages only              ---            Professional     Shared message   Display only

  P-PRO-005-03       Calendar                  Read-only view   System         No             Granted scope   Shared calendar items             ---            Professional     Shared event     Display only

  P-PRO-005-04       Expenses                  Read-only view   System         No             Granted scope   Shared expenses                   ---            Professional     Shared expense   Display only

  P-PRO-005-05       Documents / records       Read-only view   System         No             Granted scope   Shared documents/records          ---            Professional     Shared record    Display only

  P-PRO-005-06       Post / reply              Not available    ---            ---            ---             Professionals cannot post         ---            Professional     ---              Permission restriction

  P-PRO-005-07       Access expiry notice      Warning banner   System         No             Derived         Expiring/expired access           ---            Professional     Access grant     Display only
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- no shared content; Loading --- shared-content skeleton; Error --- access denied/expired; Success --- permitted read-only content displayed.

PRO-SCR-09 --- Send one message to a professional

  -------------------------------------------------------------------------
  **Screen ID**    PRO-SCR-09
  ---------------- --------------------------------------------------------
  **Module**       Professionals and Access

  **Feature(s)**   PRO-02
  -------------------------------------------------------------------------

![Figure PRO-SCR-09 --- Send one message to a professional](media/f03a4f5f09c959690187993822fdd7d4e7cf19e8.png "Figure PRO-SCR-09 — Send one message to a professional"){width="6.666666666666667in" height="5.0in"}

*Figure PRO-SCR-09 --- Send one message to a professional*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    PRO-SCR-01 My professionals
  ----------------------- --------------------------------------------------------
  **Where you go next**   PRO-SCR-01 My professionals; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

PRO-SCR-10 --- Messages from a parent

  -------------------------------------------------------------------------
  **Screen ID**    PRO-SCR-10
  ---------------- --------------------------------------------------------
  **Module**       Professionals and Access

  **Feature(s)**   PRO-02
  -------------------------------------------------------------------------

![Figure PRO-SCR-10 --- Messages from a parent](media/13f8f86f3b9bc19349237633281402de6419e460.png "Figure PRO-SCR-10 — Messages from a parent"){width="6.666666666666667in" height="5.0in"}

*Figure PRO-SCR-10 --- Messages from a parent*

**Navigation**

  ------------------------------------------------------------------------------------------
  **How you get here**    PRO-SCR-07 Professional home; PRO-SCR-08 Client view (read only)
  ----------------------- ------------------------------------------------------------------
  **Where you go next**   PRO-SCR-07 Professional home

  ------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

12.7 Field-level specifications

12.8 User actions and procedures

12.9 Business rules and validations

-   When a parent gives a professional access, the co-parent is alerted: \'\[Name\] gave \[professional name\] read-only access to shared items.\' The co-parent does not need to approve.

  ---------------------------------------------------------------------------------------------------------------
  **ID**         **Rule**                                                                    **Features**
  -------------- --------------------------------------------------------------------------- --------------------
  BR-24          A professional gets read-only access to what the parent chooses to share.   PRO-01, PRO-02

  ---------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- ---------------------------------------------------------------------------------------------------------------------------------
  BR-05      Data export, tone, safety and reporting tools are available to every user.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.

  BR-24      A professional gets read-only access to what the parent chooses to share.
  --------------------------------------------------------------------------------------------------------------------------------------------

12.10 Messages and errors

Errors

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **When it shows**                                                **Text**                                                                **Used by**
  ---------- ---------------------------------------------------------------- ----------------------------------------------------------------------- ----------------------------
  ERR-02     An email is not valid                                            Enter a valid email address.                                            FR-PRO-01-02

  ERR-03     A required field is empty                                        Fill in the \[field name\].                                             FR-PRO-01-02

  ERR-04     A parent already has 5 professionals                             You can have up to 5 professionals at one time.                         FR-PRO-01-04

  ERR-05     A second open invite for the same email                          You already invited this email. Cancel that invite to send a new one.   FR-PRO-01-03

  ERR-06     A professional tries to add, change, delete, post or invite      A professional can only read what a parent shares.                      FR-PRO-01-11

  ERR-07     An invite has expired or was cancelled                           This invite is no longer valid. Ask the parent for a new invite.        FR-PRO-01-03

  ERR-08     A text is too long                                               That is too long. Use up to the number of characters shown.             FR-PRO-01-02, FR-PRO-02-02

  ERR-09     An end date is in the past                                       Choose an end date that is today or later.                              FR-PRO-01-14

  ERR-10     The start date is after the end date                             Choose a start date that is not after the end date.                     FR-PRO-01-08

  ERR-11     A parent shares with a professional whose access is not Active   This professional does not have active access.                          FR-PRO-01-09, FR-PRO-02-02

  ERR-12     A change cannot be saved                                         We could not save your change. Nothing was changed. Please try again.   FR-PRO-01-22, FR-PRO-02-12

  ERR-13     A professional opens a client whose access has ended             Your access to this family has ended.                                   FR-PRO-01-21

  ERR-14     A parent sends a held message that was not opened                Open the message before you send it to a professional.                  FR-PRO-02-05
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **When it shows**                                                 **Text**                                                                                                      **Feature**
  ----------- ----------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------- -------------
  MSGT-01     An invite is sent                                                 Your invite was sent to \[email\].                                                                            PRO-01

  MSGT-02     An invite goes out (email to the professional)                    \[name\] invited you to read records in ParentPath. Open this link to accept: \[link\].                       PRO-01

  MSGT-03     An invite is accepted (alert)                                     \[professional name\] accepted your invite.                                                                   PRO-01

  MSGT-04     An access is changed                                              Access for \[professional name\] was updated.                                                                 PRO-01

  MSGT-05     A parent shares an item                                           You are about to share \[item\] with \[professional name\]. They can read it and cannot change it.            PRO-01

  MSGT-06     An item is shared                                                 Shared with \[professional name\].                                                                            PRO-01

  MSGT-07     A parent ends an access                                           \[professional name\] will no longer see anything. Files they already downloaded stay with them.              PRO-01

  MSGT-08     An access ends (to the professional)                              Your access to the records of \[parent name\] has ended.                                                      PRO-01

  MSGT-10     A professional opens a client                                     Read only. You see what \[parent name\] chose to share.                                                       PRO-01

  MSGT-11     A professional accepts an invite                                  \[Wording of the professional terms, approved by legal.\]                                                     PRO-01

  MSGT-12     A parent chooses to send a message to a professional              You are about to send this message to \[professional name\]. They will see only this message and your note.   PRO-02

  MSGT-13     A message is sent to a professional                               Your message was sent to \[professional name\].                                                               PRO-02

  MSGT-14     A message is sent to a professional (email to the professional)   You have a new item from \[parent name\]. Sign in to read it.                                                 PRO-02

  MSGT-15     A professional looks for a way to reply                           You cannot reply here. Please contact \[parent name\] directly.                                               PRO-02

  MSGT-16     A parent looks at a message sent to a professional                Sent to \[professional name\] on \[date and time\].                                                           PRO-02

  MSGT-17     A professional opened the copy                                    Opened on \[date and time\].                                                                                  PRO-02

  MSGT-18     A professional has not opened the copy                            Not opened yet.                                                                                               PRO-02
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

12.11 Dependencies

  ------------------------------------------------------------------------------------------------------------------------------------------------------
  **Module**                                                                   **What it needs from Professionals and Access**
  ---------------------------------------------------------------------------- -------------------------------------------------------------------------
  Messaging                                                                    Read-only access for threads, reports and the mediation thread (MSG-12)

  Records and Court                                                            Read-only access for certified exports and journal notes

  Expenses and Payments, Calendar and Parenting Time, Children and Documents   Read-only access for the items a parent shares
  ------------------------------------------------------------------------------------------------------------------------------------------------------

12.3 Assumptions

-   ParentPath does not check that a professional holds a licence. The parent chooses who to invite.

-   A professional never signs in with the login of a parent.

-   The market review pages of OurFamilyWizard, AppClose and BestInterest describe those apps on October 13, 2026 and can change.

12.12 End-to-end workflows and scenarios

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                                 **Module path**   **Features / rules**
  -------------- --------------------------------------------------------------------------------------------------------------- ----------------- -----------------------
  WF-23          Invite a professional, set categories and dates, professional accepts, read-only view, access log, end access   PRO → ACC → REC   PRO-01, PRO-02, BR-24

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
