# Safety and Privacy (SAF)


13.1 Module overview

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Purpose                 Protects parents who are at risk and build trust in how the app treats personal data. No app in the review lists a dedicated safety mode, so this is a real gap.

  Users                   Parent, co-parent, support staff

  Pain points addressed   P04, P14, P15

  Features                3 (1 Must-have, 1 Good-to-have, 1 Unique)

  Depends on              Messaging, Notifications, Calendar (check-ins), Child Support Sync (family violence flag).
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Safety Mode: hides address and location, turns off check-ins, masks contact details, adds a quick exit and discreet notifications. Access is free for survivors.

-   Controls for notification previews and sensitive images.

-   AI privacy controls: AI is opt-in, the app says plainly what the AI sees, messages are not used for training, and AI suggestions stay out of the legal record.

Purpose and scope

  -----------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **How this module supports it**
  ---------------- ------------------------------------------------------------------------------------------------------------------------------------------
  OBJ-02           A family violence flag on a child support case can offer Safety Mode to the parent, where the agency allows it (SAF-01, with CSS-08 in).

  OBJ-03           Fixes the High-rated pain point P14 (SAF-01, SAF-02) and addresses the Medium-rated P15 (SAF-03).

  OBJ-04           Safety Mode, the alert and image controls and the AI controls available to every user (BR-05).

  OBJ-05           This is the main objective of the module: protect parents at risk, and be plain about how AI and personal data are used.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------

2.3 In scope. The three features SAF-01 to SAF-03 listed in section 5.

13.2 Roles and permissions

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**                                         **What they do in this module**
  ------------------------------------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parent                                           Turns Safety Mode on and off for their own account, sets the alert preview level and the image control, and controls the AI features. Sees the AI use log.

  Co-parent                                        The same as the Parent, once linked. Does not see that the other parent uses Safety Mode. Sees only that some details are hidden until shared.

  Support staff                                    Handles the safety access request of, whose basis shows only to staff and to the parent. Cannot see whether a user has Safety Mode on, cannot read parent messages and cannot see the AI use log.

  Professional                                     Sees what a parent shares, with the same hiding rules as the parent.

  Domestic violence advocates and survivor panel   Review and approve the design. They are not users of the app.

  Agency staff                                     Not users of the app.

  Third party and Child                            No feature in this module.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

13.3 Business requirements

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**       **Business requirement**                                                                                                                                                                                  **Features**
  ------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------
  BREQ-01      A parent at risk can turn on Safety Mode, which hides address and location, turns off check-ins, masks contact details, gives a quick exit and makes notifications discreet. It is free for every user.   SAF-01

  BREQ-02      A user can choose how much an alert shows on a locked screen, and can hide images from the co-parent until the user taps them.                                                                            SAF-02

  BREQ-03      A user can see every AI feature in one place, what each one reads, and can turn each one off. AI is opt-in, is not trained on user data, and its suggestions stay out of the record.                      SAF-03
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

13.4 Features

  -----------------------------------------------------------------------------------------------
  **Feature**   **Name**                                            **Type**
  ------------- --------------------------------------------------- -----------------------------
  SAF-01        Safety Mode for survivors of abuse                  Unique → Unique

  SAF-02        Notification preview and sensitive-image controls   Must-have → Must-have

  SAF-03        AI privacy controls                                 Good-to-have → Good-to-have
  -----------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**                **Screens**
  ------------------ ---------------------------- -----------------------------------------------------------------------------------------------
  SAF-SUB-01         Safety Mode                  Safety Mode onboarding/notice; enable/confirm; disable with one-time code; Safety Mode status

  SAF-SUB-02         Quick exit                   Persistent Exit now control; neutral exit page

  SAF-SUB-03         Public safety                Public safety-resources page

  SAF-SUB-04         Alerts and images            Alert-preview setting; hide-images setting

  SAF-SUB-05         AI privacy                   AI and your data screen; per-feature consent; turn-all-off; AI-use log

  SAF-SUB-06         Family-violence flag offer   Flag-based Safety Mode offer
  -----------------------------------------------------------------------------------------------------------------------------------------------

13.5 Screen inventory

  --------------------------------------------------------------------------------------
  **Screen ID**   **Screen**                                              **Feature**
  --------------- ------------------------------------------------------- --------------
  SAF-SCR-01      Safety Mode settings                                    SAF-01

  SAF-SCR-02      Safety notice and confirm to turn on                    SAF-01

  SAF-SCR-03      Enter the code to turn off                              SAF-01

  SAF-SCR-04      Exit now button on every screen, and the neutral page   SAF-01

  SAF-SCR-05      Public safety resources page                            SAF-01

  SAF-SCR-06      Offer of Safety Mode from a family violence flag        SAF-01

  SAF-SCR-07      Alerts and images settings                              SAF-02

  SAF-SCR-08      Warning and confirm for the level Name and text         SAF-02

  SAF-SCR-09      Hidden image placeholder                                SAF-02

  SAF-SCR-10      AI and your data                                        SAF-03

  SAF-SCR-11      AI use log                                              SAF-03
  --------------------------------------------------------------------------------------

13.6 Screen specifications

SAF-SCR-01 --- Safety Mode settings

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-01
  -------------------------------------------------------------------------

![Figure SAF-SCR-01 --- Safety Mode settings](media/e5ee71cb09570fc65ccbfde03443de29d7193891.png "Figure SAF-SCR-01 — Safety Mode settings"){width="6.666666666666667in" height="5.0in"}

*Figure SAF-SCR-01 --- Safety Mode settings*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-20 Settings; SAF-SCR-02 Safety notice and confirm; SAF-SCR-03 Enter code to turn off; SAF-SCR-07 Alerts and images settings; SAF-SCR-10 AI and your data
  ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   SAF-SCR-02 Safety notice and confirm; SAF-SCR-03 Enter code to turn off; SAF-SCR-05 Public safety resources; SAF-SCR-07 Alerts and images settings; SAF-SCR-10 AI and your data; Main menu: any module

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  --------------------------------------------------------------------------
  **Purpose**    Let a user turn Safety Mode on or request to turn it off.
  -------------- -----------------------------------------------------------

  --------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Safety Mode Settings\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Current status (P-SAF-001-02).

-   Input area (form fields, in specification order): Safety Mode (P-SAF-001-01); Safety explanation (P-SAF-001-03); Co-parent visibility notice (P-SAF-001-07).

-   Action area (primary action first, then secondary actions and links): Turn on Safety Mode (P-SAF-001-04); Turn off Safety Mode (P-SAF-001-05); Safety resources link (P-SAF-001-06).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**       **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**                  **Error**                **Visibility**   **Saved to**               **Behavior**
  ------------------ ----------------------------- -------------------- -------------- -------------- ------------- ------------------------------------------------ ------------------------ ---------------- -------------------------- -------------------------------------------------
  P-SAF-001-01       Safety Mode                   Toggle               Yes            Yes            Off           On / off                                         ERR-02 on save failure   User only        User.safety_mode_enabled   On: opens safety notice; Off: opens code screen

  P-SAF-001-02       Current status                Badge / text         System         No             Off           On; Off                                          ---                      User only        User.safety_mode_enabled   Display only

  P-SAF-001-03       Safety explanation            Informational text   ---            ---            ---           Explains hiding, discreet alerts, quick exit     ---                      User only        ---                        Display only

  P-SAF-001-04       Turn on Safety Mode           Primary button       ---            ---            ---           ---                                              ---                      User only        ---                        Opens SAF-SCR-02 Safety notice and confirm

  P-SAF-001-05       Turn off Safety Mode          Destructive button   ---            ---            ---           ---                                              ---                      User only        ---                        Opens SAF-SCR-03 Enter code to turn off

  P-SAF-001-06       Safety resources link         Text link            ---            ---            ---           ---                                              ---                      User only        ---                        Opens SAF-SCR-05 Public safety resources

  P-SAF-001-07       Co-parent visibility notice   Informational text   ---            ---            ---           Safety Mode status is never shown to co-parent   ---                      User only        ---                        Display only
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ---------------------------------------------
  Empty                     Current Safety Mode status displayed

  Loading                   Toggle/actions disabled

  Error                     Save failure retains prior setting: ERR-02

  Success                   Safety Mode on/off state updated
  -----------------------------------------------------------------------

SAF-SCR-02 --- Safety notice and confirm

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-01
  -------------------------------------------------------------------------

![Figure SAF-SCR-02 --- Safety notice and confirm](media/0586dc5c578f13ebdbafb0c2500883ba65d332f7.png "Figure SAF-SCR-02 — Safety notice and confirm"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure SAF-SCR-02 --- Safety notice and confirm*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    CSS-SCR-12 Offer of Safety Mode; SAF-SCR-01 Safety Mode settings; SAF-SCR-06 Offer from family violence flag
  ----------------------- --------------------------------------------------------------------------------------------------------------
  **Where you go next**   SAF-SCR-01 Safety Mode settings; SAF-SCR-05 Public safety resources

  --------------------------------------------------------------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------------------------------
  **Purpose**    Explain Safety Mode limits and obtain explicit confirmation before enabling it.
  -------------- ---------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Safety Notice and Confirm\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Safety notice (P-SAF-002-01).

-   Input area (form fields, in specification order): Exit Now explanation (P- SAF-002-02).

-   Action area (primary action first, then secondary actions and links): Help resources (P-SAF-002-03); Confirm and turn on (P-SAF-002-04); Cancel (P-SAF-002-05).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**              **Required**   **Editable**   **Default**   **Allowed values / validation**                                                             **Error**   **Visibility**   **Saved to**                      **Behavior**
  ------------------ ------------------------- --------------------- -------------- -------------- ------------- ------------------------------------------------------------------------------------------- ----------- ---------------- --------------------------------- ------------------------------------------
  P-SAF-002-01       Safety notice             Informational panel   ---            ---            ---           MSGT-01; explains Exit Now limits, browser history, spyware, safer device, help resources   ---         User only        ---                               Display only

  P- SAF-002-02      Exit Now explanation      Informational text    ---            ---            ---           Does not delete browser history or stop spyware                                             ---         User only        ---                               Display only

  P-SAF-002-03       Help resources            Links                 ---            ---            ---           Advocate-approved links; hotline details                                                    ---         User only        ---                               Opens SAF-SCR-05 Public safety resources

  P-SAF-002-04       Confirm and turn on       Primary button        Yes            ---            ---           ---                                                                                         ---         User only        User.safety_mode_enabled = true   Enables Safety Mode

  P-SAF-002-05       Cancel                    Secondary button      ---            ---            ---           ---                                                                                         ---         User only        ---                               Returns without enabling
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ----------------------------------------------------------
  Empty                    Notice displayed; confirmation required

  Loading                  Confirm disabled

  Error                    Save failure retains Off status: ERR-02

  Success                  Safety Mode on; MSGT-02 shown; Exit Now appears globally
  -----------------------------------------------------------------------------------

Release gate: Safety Mode may be offered only after advocate and survivor-panel approval is recorded.

SAF-SCR-03 --- Enter code to turn off

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-01
  -------------------------------------------------------------------------

![Figure SAF-SCR-03 --- Enter code to turn off](media/56284d637b813924650a42ac740b536dc13fea41.png "Figure SAF-SCR-03 — Enter code to turn off"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure SAF-SCR-03 --- Enter code to turn off*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    SAF-SCR-01 Safety Mode settings
  ----------------------- --------------------------------------------------------
  **Where you go next**   SAF-SCR-01 Safety Mode settings

  --------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Securely disable Safety Mode using a one-time code.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Enter Code to Turn Off\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Code destination (P-SAF-003-01).

-   Input area (form fields, in specification order): One-time code (P-SAF-003-02).

-   Action area (primary action first, then secondary actions and links): Resend code (P-SAF-003-03); Turn off Safety Mode (P-SAF-003-04); Cancel (P-SAF-003-05).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**                **Allowed values / validation**                        **Error**                   **Visibility**   **Saved to**                       **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- -------------------------- ------------------------------------------------------ --------------------------- ---------------- ---------------------------------- ---------------------------
  P-SAF-003-01       Code destination          Read-only text     System         No             Verified email or mobile   Masked contact                                         ---                         User only        User contact                       Shows where code was sent

  P-SAF-003-02       One-time code             Numeric input      Yes            Yes            Blank                      Exactly 6 digits; valid 10 minutes; single use         ERR-01 wrong/expired/used   User only        Verification record                Validates code

  P-SAF-003-03       Resend code               Secondary button   ---            ---            ---                        Available after 60 seconds; at most 5 codes per hour   Inline field message        User only        ---                                Sends new code

  P-SAF-003-04       Turn off Safety Mode      Primary button     ---            ---            ---                        ---                                                    ---                         User only        User.safety_mode_enabled = false   Disables Safety Mode

  P-SAF-003-05       Cancel                    Secondary button   ---            ---            ---                        ---                                                    ---                         User only        ---                                Keeps Safety Mode on
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ --------------------------------------------------------------
  Empty                    Code blank; Turn off disabled

  Loading                  Turn off/Resend disabled

  Error                    Wrong, expired, or used code: ERR-01; Safety Mode remains on

  Success                  Safety Mode off; MSGT-04 shown
  ---------------------------------------------------------------------------------------

SAF-SCR-04 --- Exit now and neutral page

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-01
  -------------------------------------------------------------------------

![Figure SAF-SCR-04 --- Exit now and neutral page](media/fb9b9ee7b3a11104e923b4a5c1236a41a08c1fcf.png "Figure SAF-SCR-04 — Exit now and neutral page"){width="6.666666666666667in" height="5.0in"}

*Figure SAF-SCR-04 --- Exit now and neutral page*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    SAF-SCR-12 Exit now confirmation; Exit now button on every screen (Safety Mode on) or Escape twice
  ----------------------- --------------------------------------------------------------------------------------------------------
  **Where you go next**   SAF-SCR-12 Exit now confirmation; Signs the user out and opens the neutral page; Main menu: any module

  --------------------------------------------------------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------------------------
  **Purpose**    Let a Safety Mode user leave the app quickly and reduce traceable return.
  -------------- ---------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Exit Now / Neutral Page\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Neutral page (P-SAF-004-03); Session termination (P-SAF-004-04).

-   Action area (primary action first, then secondary actions and links): Exit now (P-SAF-004-01); Escape shortcut (P-SAF-004-02).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                         **Required**   **Editable**   **Default**                     **Allowed values / validation**   **Error**   **Visibility**          **Saved to**     **Behavior**
  ------------------ ------------------------- -------------------------------- -------------- -------------- ------------------------------- --------------------------------- ----------- ----------------------- ---------------- ----------------------------------------
  P-SAF-004-01       Exit now                  Persistent button                ---            ---            ---                             Same position on every screen     ---         Safety Mode user only   ---              Replaces history entry; signs user out

  P-SAF-004-02       Escape shortcut           Keyboard action                  ---            ---            ---                             Escape pressed twice              ---         Safety Mode user only   ---              Triggers Exit Now

  P-SAF-004-03       Neutral page              External/internal neutral page   System         No             Advocate-approved destination   Fast-loading neutral page         ---         After exit              ---              Back button does not return to app

  P-SAF-004-04       Session termination       System action                    System         No             ---                             ---                               ---         System                  Session record   Signs user out
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -----------------------------------------------------------------
  Empty                    Not applicable

  Loading                  Immediate redirect priority

  Error                    If redirect fails, sign out still occurs; a blank page is shown

  Success                  Neutral page displayed; Back does not return to app
  ------------------------------------------------------------------------------------------

Limitation: Exit Now does not delete browser history and does not stop spyware; the safety notice must state this.

SAF-SCR-05 --- Public safety resources

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-01
  -------------------------------------------------------------------------

![Figure SAF-SCR-05 --- Public safety resources](media/4696e9714a0d9e3285c869ca7416ffa3ddad0c8c.png "Figure SAF-SCR-05 — Public safety resources"){width="6.666666666666667in" height="5.0in"}

*Figure SAF-SCR-05 --- Public safety resources*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-01 Create account; ACC-SCR-02 Sign in; ACC-SCR-03 Second check; ACC-SCR-07 Accept invite; ACC-SCR-15 Reset password; DOC-SCR-13 Public share link page; DOC-SCR-15 Emergency contact consent page; PRO-SCR-06 Accept invite (professional); REC-SCR-03 Public verification page; REC-SCR-10 Public records request page; REC-SCR-11 Public court notes by state; REC-SCR-12 Public model order language; REC-SCR-13 Public retention policy; SAF-SCR-01 Safety Mode settings; SAF-SCR-02 Safety notice and confirm; SUP-SCR-01 Help; SUP-SCR-08 Request form on sign-in page
  ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-02 Sign in; SUP-SCR-01 Help

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -------------------------------------------------------------------------
  **Purpose**    Provide immediate safety help without requiring sign-in.
  -------------- ----------------------------------------------------------

  -------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Public Safety Resources\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Emergency guidance (P-SAF-005-03).

-   Action area (primary action first, then secondary actions and links): National Domestic Violence Hotline (P-SAF-005-01); TTY line (P-SAF-005-02); Advocate-approved help links (P-SAF-005-04); Quick exit (P-SAF-005-05).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**              **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**   **Error**   **Visibility**     **Saved to**   **Behavior**
  ------------------ ------------------------------------ -------------------- -------------- -------------- ------------- --------------------------------- ----------- ------------------ -------------- --------------------------------------------
  P-SAF-005-01       National Domestic Violence Hotline   Click-to-call link   ---            ---            ---           1-800-799-7233                    ---         Public visitor     ---            Initiates call

  P-SAF-005-02       TTY line                             Click-to-call link   ---            ---            ---           1-800-787-3224                    ---         Public visitor     ---            Initiates call

  P-SAF-005-03       Emergency guidance                   Informational text   ---            ---            ---           911 if safe to call               ---         Public visitor     ---            Display only

  P-SAF-005-04       Advocate-approved help links         Link list            ---            ---            ---           Advocate-approved resources       ---         Public visitor     ---            Opens external resources

  P-SAF-005-05       Quick exit                           Button               ---            ---            ---           Available for Safety Mode users   ---         Safety Mode user   ---            Opens SAF-SCR-04 Exit now and neutral page
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ------------------------------------------------------
  Empty                     Not applicable; static public page

  Loading                   Page skeleton

  Error                     Resource-link failure does not block hotline display

  Success                   Safety resources displayed
  --------------------------------------------------------------------------------

SAF-SCR-06 --- Offer from family violence flag

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-01
  -------------------------------------------------------------------------

![Figure SAF-SCR-06 --- Offer from family violence flag](media/b88c9e87b8bf1c2d2d1557bc6006355fa6f0cf21.png "Figure SAF-SCR-06 — Offer from family violence flag"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure SAF-SCR-06 --- Offer from family violence flag*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    System: the agency marks a family violence flag
  ----------------------- --------------------------------------------------------
  **Where you go next**   SAF-SCR-02 Safety notice and confirm

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

SAF-SCR-07 --- Alerts and images settings

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-02
  -------------------------------------------------------------------------

![Figure SAF-SCR-07 --- Alerts and images settings](media/f51da612d66a39fab795ef4722359c54902afd1b.png "Figure SAF-SCR-07 — Alerts and images settings"){width="6.666666666666667in" height="5.0in"}

*Figure SAF-SCR-07 --- Alerts and images settings*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-20 Settings; NTF-SCR-01 Notification settings; SAF-SCR-01 Safety Mode settings; SAF-SCR-08 Warning for Name and text; SAF-SCR-10 AI and your data
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   SAF-SCR-01 Safety Mode settings; SAF-SCR-08 Warning for Name and text; SAF-SCR-10 AI and your data; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -------------------------------------------------------------------------------
  **Purpose**    Control notification preview level and sensitive-image hiding.
  -------------- ----------------------------------------------------------------

  -------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Alerts and Images Settings\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Alert previews (P-SAF-006-01); Hidden option (P-SAF-006-02); Name only option (P-SAF-006-03); Name and text option (P-SAF-006-04); Hide images until I tap (P-SAF-006-05); Safety Mode lock notice (P-SAF-006-07); Image rule notice (P-SAF-006-08).

-   Action area (primary action first, then secondary actions and links): Save (P-SAF-006-06).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**                    **Default**   **Allowed values / validation**         **Error**                              **Visibility**     **Saved to**                 **Behavior**
  ------------------ ------------------------- -------------------- -------------- ------------------------------- ------------- --------------------------------------- -------------------------------------- ------------------ ---------------------------- --------------------------------------------
  P-SAF-006-01       Alert previews            Radio group          Yes            Yes; locked in Safety Mode      Name only     Hidden; Name only; Name and text        ERR-03 if changed during Safety Mode   User only          User.notification_preview    Applies to future alerts

  P-SAF-006-02       Hidden option             Radio option         ---            ---                             ---           No sender name or text                  ---                                    User only          Setting value                Saved with the Save button

  P-SAF-006-03       Name only option          Radio option         ---            ---                             Default       Sender name; no message text            ---                                    User only          Setting value                Selecting saves setting

  P-SAF-006-04       Name and text option      Radio option         ---            ---                             ---           Sender name plus first 100 characters   Warning required                       User only          Setting value                Opens SAF-SCR-08 Warning for Name and text

  P-SAF-006-05       Hide images until I tap   Toggle               Yes            Yes; locked on in Safety Mode   Off           On / off                                ERR-04 if disabled in Safety Mode      User only          User.hide_images_until_tap   Hides JPG/PNG until tapped

  P-SAF-006-06       Save                      Primary button       ---            ---                             ---           ---                                     ---                                    User only          User settings                Saves both settings

  P-SAF-006-07       Safety Mode lock notice   Informational text   System         No                              Derived       Shown when Safety Mode is on            ---                                    Safety Mode user   ---                          Explains locked settings

  P-SAF-006-08       Image rule notice         Informational text   ---            ---                             ---           Images never appear in alerts           ---                                    User only          ---                          Display only
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- ------------------------------------------------------------------------------
  Empty                   Defaults: Name only; image hiding off

  Loading                 Save disabled

  Error                   Safety Mode lock: ERR-03/ERR-04; save failure retains prior settings: ERR-02

  Success                 Settings saved; apply to alerts created afterward
  ------------------------------------------------------------------------------------------------------

SAF-SCR-08 --- Warning for Name and text

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-08
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-02
  -------------------------------------------------------------------------

![Figure SAF-SCR-08 --- Warning for Name and text](media/684cf5c21a7734b56a71238da3419bdf145191a9.png "Figure SAF-SCR-08 — Warning for Name and text"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure SAF-SCR-08 --- Warning for Name and text*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    SAF-SCR-07 Alerts and images settings
  ----------------------- --------------------------------------------------------
  **Where you go next**   SAF-SCR-07 Alerts and images settings

  --------------------------------------------------------------------------------

Specification

  -------------------------------------------------------------------------------------------------------
  **Purpose**    Confirm the user understands the exposure risk before enabling Name-and-text previews.
  -------------- ----------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Sensitive-Image Warning\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Warning message (P-SAF-007-01).

-   Input area (form fields, in specification order): Preview explanation (P-SAF-007-02).

-   Action area (primary action first, then secondary actions and links): Confirm (P-SAF-007-03); Cancel (P-SAF-007-04).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**              **Required**   **Editable**   **Default**   **Allowed values / validation**                 **Error**   **Visibility**   **Saved to**                           **Behavior**
  ------------------ ------------------------- --------------------- -------------- -------------- ------------- ----------------------------------------------- ----------- ---------------- -------------------------------------- ---------------------------
  P-SAF-007-01       Warning message           Informational panel   ---            ---            ---           MSGT-13                                         ---         User only        ---                                    Display only

  P-SAF-007-02       Preview explanation       Informational text    ---            ---            ---           Explains sender name and first 100 characters   ---         User only        ---                                    Display only

  P-SAF-007-03       Confirm                   Primary button        Yes            ---            ---           ---                                             ---         User only        notification_preview = Name and text   Saves setting

  P-SAF-007-04       Cancel                    Secondary button      ---            ---            ---           ---                                             ---         User only        ---                                    Keeps prior preview level
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- ---------------------------------------------
  Empty                      Warning displayed

  Loading                    Confirm disabled

  Error                      Save failure retains previous level: ERR-02

  Success                    Name-and-text preview enabled
  ------------------------------------------------------------------------

SAF-SCR-09 --- Hidden image placeholder

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-09
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-02
  -------------------------------------------------------------------------

![Figure SAF-SCR-09 --- Hidden image placeholder](media/5b88d13f2553bd9019c90976075f0e5a68897630.png "Figure SAF-SCR-09 — Hidden image placeholder"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure SAF-SCR-09 --- Hidden image placeholder*

**Navigation**

  ------------------------------------------------------------------------------------
  **How you get here**    Automatically in place of an image when image hiding is on
  ----------------------- ------------------------------------------------------------
  **Where you go next**   MSG-SCR-02 Thread and message view

  ------------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------------
  **Purpose**    Hide a sensitive JPG/PNG until the user deliberately reveals it.
  -------------- ------------------------------------------------------------------

  ---------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Hidden Image Placeholder\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Hidden image placeholder (P-SAF-008-01); Re-hidden state (P-SAF-008-03); File type exception (P-SAF-008-04).

-   Action area (primary action first, then secondary actions and links): Tap to view (P-SAF-008-02).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**    **Type**              **Required**   **Editable**   **Default**    **Allowed values / validation**   **Error**    **Visibility**              **Saved to**   **Behavior**
  ------------------ -------------------------- --------------------- -------------- -------------- -------------- --------------------------------- ------------ --------------------------- -------------- --------------------------------
  P-SAF-008-01       Hidden image placeholder   Placeholder panel     System         No             Hidden         MSGT-14                           Load error   User with image hiding on   ---            Display only

  P-SAF-008-02       Tap to view                Button / tap target   ---            ---            ---            ---                               ---          User with image hiding on   ---            Reveals image for current view

  P-SAF-008-03       Re-hidden state            System                System         No             Hidden again   Image hides on next item open     ---          User with image hiding on   ---            Enforces repeat hiding

  P-SAF-008-04       File type exception        System                System         No             Derived        JPG/PNG hidden; PDF not hidden    ---          User                        ---            Display only
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -----------------------------------------------------
  Empty                    Not applicable; appears only for eligible image

  Loading                  Placeholder shown until media loads

  Error                    Media-load failure

  Success                  Image revealed after tap; hidden again on next open
  ------------------------------------------------------------------------------

SAF-SCR-10 --- AI and your data

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-10
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-03
  -------------------------------------------------------------------------

![Figure SAF-SCR-10 --- AI and your data](media/8c192edf01799f737359940c26b6699d8dd28c93.png "Figure SAF-SCR-10 — AI and your data"){width="6.666666666666667in" height="5.0in"}

*Figure SAF-SCR-10 --- AI and your data*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-20 Settings; MSG-SCR-05 AI settings; SAF-SCR-01 Safety Mode settings; SAF-SCR-07 Alerts and images settings; SAF-SCR-11 AI use log
  ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   SAF-SCR-01 Safety Mode settings; SAF-SCR-07 Alerts and images settings; SAF-SCR-11 AI use log; Main menu: any module

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------------------------------
  **Purpose**    Show every released AI feature, explain its data use, and allow individual opt-in.
  -------------- ------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"AI and Your Data\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Feature name (P-SAF-009-02); Data-use explanation (P-SAF-009-03); AI switch (P-SAF-009-04).

-   Action area (primary action first, then secondary actions and links): Turn all AI off (P-SAF-009-06); View AI use log (P-SAF-009-09).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**              **Required**   **Editable**   **Default**                **Allowed values / validation**                                         **Error**               **Visibility**   **Saved to**          **Behavior**
  ------------------ ------------------------- --------------------- -------------- -------------- -------------------------- ----------------------------------------------------------------------- ----------------------- ---------------- --------------------- -----------------------------
  P-SAF-009-01       AI feature list           Feature rows          ---            ---            ---                        Tone check; Incoming message shield                                     Load error with retry   User only        ---                   Displays features

  P-SAF-009-02       Feature name              Text                  System         No             Derived                    Feature label                                                           ---                     User only        AI feature registry   Display only

  P-SAF-009-03       Data-use explanation      Text                  System         No             Feature-specific MSGT-15   Plain-language explanation                                              ---                     User only        Consent copy          Display only

  P-SAF-009-04       AI switch                 Toggle                Yes            Yes            Off                        On / off                                                                ERR-02 save failure     User only        AIConsent.enabled     On: opens consent modal

  P-SAF-009-05       Last changed              Timestamp             System         No             Derived                    UTC storage; local display                                              ---                     User only        Consent/change time   Display only

  P-SAF-009-06       Turn all AI off           Destructive button    ---            ---            ---                        ---                                                                     ---                     User only        All AI consents off   Disables every AI feature

  P-SAF-009-07       AI promises               Informational panel   ---            ---            ---                        MSGT-17: no training, no record storage, no delete/block, opt-in only   ---                     User only        ---                   Display only

  P-SAF-009-09       View AI use log           Text link             ---            ---            ---                        ---                                                                     ---                     User only        ---                   Opens SAF-SCR-11 AI use log
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- -------------------------------------------------
  Empty                     Shows tone check and shield

  Loading                   Feature-row skeleton

  Error                     Save failure retains prior switch state: ERR-02

  Success                   AI settings and consent state displayed
  ---------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Obtain explicit consent before enabling an AI feature.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"AI Consent Modal\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Feature name (P-SAF-010-01).

-   Input area (form fields, in specification order): Data-use notice (P-SAF-010-02); Privacy promises (P-SAF-010-03).

-   Action area (primary action first, then secondary actions and links): Agree and turn on (P-SAF-010-04); Cancel (P-SAF-010-05).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**        **Allowed values / validation**   **Error**   **Visibility**   **Saved to**                             **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------------ --------------------------------- ----------- ---------------- ---------------------------------------- --------------------
  P-SAF-010-01       Feature name              Read-only text       System         No             Selected feature   Feature label                     ---         User only        Consent record                           Display only

  P-SAF-010-02       Data-use notice           Informational text   ---            ---            ---                Feature-specific MSGT-15          ---         User only        Consent wording version                  Display only

  P-SAF-010-03       Privacy promises          Informational text   ---            ---            ---                MSGT-17                           ---         User only        Consent wording version                  Display only

  P-SAF-010-04       Agree and turn on         Primary button       Yes            ---            ---                ---                               ---         User only        Consent with wording version/date/time   Enables feature

  P-SAF-010-05       Cancel                    Secondary button     ---            ---            ---                ---                               ---         User only        ---                                      Leaves feature off
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- ----------------------------------------------------------------------
  Empty                   Notice displayed; feature remains off

  Loading                 Agree disabled

  Error                   Consent save failure leaves feature off: ERR-02

  Success                 Feature enabled; consent stored with wording version, date, and time
  ----------------------------------------------------------------------------------------------

SAF-SCR-11 --- AI use log

  -------------------------------------------------------------------------
  **Screen ID**    SAF-SCR-11
  ---------------- --------------------------------------------------------
  **Module**       Safety and Privacy

  **Feature(s)**   SAF-03
  -------------------------------------------------------------------------

![Figure SAF-SCR-11 --- AI use log](media/078f2a821e9f1654ef52d703410bf5d3f2693f5e.png "Figure SAF-SCR-11 — AI use log"){width="6.666666666666667in" height="5.0in"}

*Figure SAF-SCR-11 --- AI use log*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    SAF-SCR-10 AI and your data
  ----------------------- --------------------------------------------------------
  **Where you go next**   SAF-SCR-10 AI and your data; Main menu: any module

  --------------------------------------------------------------------------------

Specification

  -------------------------------------------------------------------------------------------
  **Purpose**    Show when AI features were used, without exposing message or file content.
  -------------- ----------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"AI Use Log\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Feature (P-SAF-011-02); Date and time (P-SAF-011-03); Item type (P- SAF-011-04).

-   Input area (form fields, in specification order): Date filter (P-SAF-011-06).

-   Action area (primary action first, then secondary actions and links): AI use list (P-SAF-011-01); Back (P-SAF-011-07).

-   Controls that must NOT be provided: Content (P-SAF-011-05).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**            **Error**               **Visibility**   **Saved to**           **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------- ------------------------------------------ ----------------------- ---------------- ---------------------- ----------------------
  P-SAF-011-01       AI use list               Table / timeline     ---            ---            ---           User's AI events; retained 12 months       Load error with retry   User only        AI use log             Displays events

  P-SAF-011-02       Feature                   Badge                System         No             Derived       Tone check; Incoming shield                ---                     User only        AIUseLog.feature       Display only

  P-SAF-011-03       Date and time             Timestamp            System         No             Event time    UTC storage; local display                 ---                     User only        AIUseLog.occurred_at   Display only

  P- SAF-011-04      Item type                 Badge                System         No             Derived       Draft; Incoming message; Receipt           ---                     User only        AIUseLog.item_type     Display only

  P-SAF-011-05       Content                   Not displayed        ---            ---            ---           No message, file, or user content in log   ---                     User only        ---                    Privacy rule

  P-SAF-011-06       Date filter               Date-range control   No             Yes            None          Valid range                                Inline field message    User only        View state             Filters log

  P-SAF-011-07       Back                      Button / link        ---            ---            ---           ---                                        ---                     User only        ---                    Returns to AI screen
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                    **Behavior**
  ---------------------------- ------------------------------------------
  Empty                        No AI use yet

  Loading                      Log skeleton

  Error                        Load failure and retry

  Success                      AI-use events displayed without content
  -----------------------------------------------------------------------

SAF-SCR-12 --- Exit now confirmation

  --------------------------------------------------------------------------------------
  **Screen ID**     SAF-SCR-12
  ----------------- --------------------------------------------------------------------
  **Purpose**       Confirms that the user wants to leave the application immediately.

  **Who uses it**   User with Safety Mode on
  --------------------------------------------------------------------------------------

![Figure SAF-SCR-12 --- Exit now confirmation](media/c34be52c279490415c9f7ee3dad29924ec1fc488.png "Figure SAF-SCR-12 — Exit now confirmation"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure SAF-SCR-12 --- Exit now confirmation*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    SAF-SCR-04 Exit now and neutral page
  ----------------------- --------------------------------------------------------
  **Where you go next**   SAF-SCR-04 Exit now and neutral page

  --------------------------------------------------------------------------------

**What the screen shows**

  ------------------------------------------------------------------------------------------------------------------------------------
  **Part**             **Description**
  -------------------- ---------------------------------------------------------------------------------------------------------------
  Question             Leave ParentPath now? You will be signed out and taken to another page. The Back button will not return here.

  Leave now            Signs the user out, replaces the page in the browser history and opens the neutral page (SAF-SCR-04).

  Stay                 Closes the dialog.
  ------------------------------------------------------------------------------------------------------------------------------------

-   Pressing Escape twice opens this confirmation.

-   Exit now does not delete browser history and does not stop spyware; the safety notice says so.

Cross-screen rules and pending screen decisions (Safety and Privacy)

Cross-screen Safety rules

Pending screen decisions --- Safety and Privacy

13.7 Field-level specifications

3.1 Safety Mode --- SAF-SCR-02 Safety notice and confirm--003 → SAF-SCR-02

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**                **Technical name**    **Type / control**   **Required**   **Editable**   **Default**                **Allowed values / validation**                              **Visibility**
  -------------- ------------------------ --------------------- -------------------- -------------- -------------- -------------------------- ------------------------------------------------------------ ----------------
  FLD-SAF-001    Safety Mode enabled      safety_mode_enabled   Toggle               Yes            User only      Off                        Enable after safety notice; disable requires one-time code   User only

  FLD-SAF-002    One-time code            disable_code          Text / numeric       Conditional    No             None                       Exactly 6 digits; valid 10 minutes; single use; ERR-01       Disable screen

  FLD-SAF-003    Code destination         code_destination      System               System         No             Verified email or mobile   User's verified contact                                      Internal

  FLD-SAF-004    Safety Mode changed at   changed_at            Timestamp            System         No             Change time                UTC                                                          Internal audit
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3.2 Alerts and Images --- SAF-SCR-07 Alerts and images settings → SAF-SCR-07

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**               **Technical name**      **Type / control**   **Required**   **Editable**                     **Default**   **Allowed values / validation**    **Visibility**
  -------------- ----------------------- ----------------------- -------------------- -------------- -------------------------------- ------------- ---------------------------------- ------------------
  FLD-SAF-010    Notification preview    notification_preview    Radio                Yes            User; locked in Safety Mode      Name only     Hidden, Name only, Name and text   Privacy settings

  FLD-SAF-011    Hide sensitive images   hide_sensitive_images   Toggle               Yes            User; locked on in Safety Mode   Off           On/off; forced on in Safety Mode   Privacy settings

  FLD-SAF-012    Setting changed at      changed_at              Timestamp            System         No                               Save time     UTC                                Internal
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3.3 AI Privacy --- SAF-SCR-10 AI and your data / SAF-SCR-10 AI and your data → SAF-SCR-10

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**              **Technical name**   **Type / control**   **Required**   **Editable**   **Default**           **Allowed values / validation**                 **Visibility**
  -------------- ---------------------- -------------------- -------------------- -------------- -------------- --------------------- ----------------------------------------------- ------------------------------
  FLD-SAF-020    AI feature             ai_feature_id        Display              System         No             None                  Tone check, incoming shield, coach, mediation   AI privacy screen

  FLD-SAF-021    AI enabled             ai_enabled           Toggle               Yes            User           Off                   Consent required before enabling                AI privacy screen

  FLD-SAF-022    Consent timestamp      consented_at         Timestamp            System         No             Consent time          UTC                                             AI privacy screen / internal

  FLD-SAF-023    Data-use explanation   data_use_text        Display              System         No             Plain-language copy   Feature-specific                                AI privacy screen

  FLD-SAF-024    Turn all AI off        all_ai_disabled      Button               No             User           None                  Disables every AI feature                       AI privacy screen
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

13.8 User actions and procedures

ACT-SAF-001 --- Enable Safety Mode

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Any signed-in user
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            SAF-SCR-02 Safety notice and confirm → SAF-SCR-02 Safety notice and confirm

  **Objective**         Activate survivor-focused privacy protections

  **Trigger**           User confirms after safety notice

  **Preconditions**     User signed in; advocate approval recorded for release

  **System behavior**   Enable Safety Mode privately; hide addresses/locations; mask contact details; disable check-ins; suppress read receipts; lock alerts to Hidden; show persistent Exit Now; write audit entry invisible to co-parent.

  **Data updated**      User Safety Mode setting; audit log

  **Success**           Safety Mode active

  **Negative**          Save failure retains prior setting and shows ERR-02.

  **Permissions**       User only; co-parent/professional/support cannot see status.

  **Source**            SAF-01; FR-SAF-01-01--FR-SAF-01-21.

  **Release gate**      Advocate and survivor-panel approval.

  **Screen(s)**         SAF-SCR-02 Safety notice and confirm to turn on, SAF-SCR-02 Safety notice and confirm to turn on
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open SAF-SCR-02 Safety notice and confirm to turn on, SAF-SCR-02 Safety notice and confirm to turn on (entry: SAF-SCR-02 Safety notice and confirm).

2.  Make sure the preconditions are met: User signed in; advocate approval recorded for release.

3.  Perform the action: User confirms after safety notice.

4.  The system processes the action: Enable Safety Mode privately; hide addresses/locations; mask contact details; disable check-ins; suppress read receipts; lock alerts to Hidden; show persistent Exit Now; write audit entry invisible to co-parent.

5.  Result on success: Safety Mode active.

6.  If it fails or a rule is not met: Save failure retains prior setting and shows ERR-02.

ACT-SAF-002 --- Disable Safety Mode

  --------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Safety Mode user
  --------------------- ----------------------------------------------------------------------------------------------------------------------
  **Screen**            SAF-SCR-03 Enter code to turn off

  **Objective**         Turn off Safety Mode securely

  **Trigger**           User requests disable and enters one-time code

  **Preconditions**     Verified email or mobile available

  **System behavior**   Send one-time code; only correct, unexpired, unused code disables mode; wrong code keeps Safety Mode on with ERR-01.

  **Data updated**      Safety Mode setting; audit log

  **Success**           Safety Mode off

  **Negative**          Invalid/expired/used code: ERR-01.

  **Permissions**       User only

  **Source**            FR-SAF-01-03.

  **Screen(s)**         SAF-SCR-03 Enter the code to turn off
  --------------------------------------------------------------------------------------------------------------------------------------------

1.  Open SAF-SCR-03 Enter the code to turn off (entry: SAF-SCR-02 Safety notice and confirm).

2.  Make sure the preconditions are met: Verified email or mobile available.

3.  Enter or select the required information: One-time code.

4.  Perform the action: User requests disable and enters one-time code.

5.  The system processes the action: Send one-time code; only correct, unexpired, unused code disables mode; wrong code keeps Safety Mode on with ERR-01.

6.  Result on success: Safety Mode off.

7.  If it fails or a rule is not met: Invalid/expired/used code: ERR-01.

ACT-SAF-003 --- Use Exit Now

  --------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Safety Mode user
  --------------------- ----------------------------------------------------------------------------------------------------------------------------
  **Screen**            SAF-SCR-04 Exit now and neutral page

  **Objective**         Leave the app quickly and reduce traceable return

  **Trigger**           User clicks Exit Now or presses Escape twice

  **Preconditions**     Safety Mode active

  **System behavior**   Replace current browser-history entry with a neutral fast-loading page; sign user out; Back button does not return to app.

  **Data updated**      Session terminated

  **Success**           Neutral page displayed; user signed out

  **Limitation**        Does not delete browser history or protect against spyware; safety notice must state this.

  **Permissions**       Safety Mode user

  **Source**            FR-SAF-01-13--FR-SAF-01-15.

  **Screen(s)**         SAF-SCR-04 Exit now button on every screen, and the neutral page
  --------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open SAF-SCR-04 Exit now button on every screen, and the neutral page (entry: Persistent Exit Now button on every screen; Escape key pressed twice).

2.  Make sure the preconditions are met: Safety Mode active.

3.  Perform the action: User clicks Exit Now or presses Escape twice.

4.  The system processes the action: Replace current browser-history entry with a neutral fast-loading page; sign user out; Back button does not return to app.

5.  Result on success: Neutral page displayed; user signed out.

ACT-SAF-004 --- Configure Alerts and Images

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            SAF-SCR-07 Alerts and images settings

  **Objective**         Control notification preview and image exposure

  **Trigger**           User saves settings

  **Preconditions**     User signed in

  **System behavior**   Offer Hidden, Name only, and Name and text; default Name only; Safety Mode locks Hidden; image hiding defaults off but is forced on and locked in Safety Mode; images never appear in alerts.

  **Data updated**      User privacy settings; audit log

  **Success**           Settings saved

  **Negative**          Safety Mode prevents preview change: ERR-03; prevents image-hiding disable: ERR-04; save failure retains prior setting: ERR-02.

  **Permissions**       User only

  **Source**            SAF-02; FR-SAF-02-01--FR-SAF-02-13.

  **Screen(s)**         SAF-SCR-07 Alerts and images settings
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open SAF-SCR-07 Alerts and images settings (entry: Settings → Privacy and safety).

2.  Make sure the preconditions are met: User signed in.

3.  Enter or select the required information: Alert previews; Hide images until I tap.

4.  Perform the action: User saves settings.

5.  The system processes the action: Offer Hidden, Name only, and Name and text; default Name only; Safety Mode locks Hidden; image hiding defaults off but is forced on and locked in Safety Mode; images never appear in alerts.

6.  Result on success: Settings saved.

7.  If it fails or a rule is not met: Safety Mode prevents preview change: ERR-03; prevents image-hiding disable: ERR-04; save failure retains prior setting: ERR-02.

ACT-SAF-005 --- Manage AI Privacy

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            SAF-SCR-10 AI and your data / SAF-SCR-10 AI and your data

  **Objective**         Control each AI feature and understand its data use

  **Trigger**           User changes an AI switch

  **Preconditions**     Feature released; user signed in

  **System behavior**   Show each AI feature, plain-language data use, individual switch, and last-change time; require consent before enabling; Turn all AI off disables all; stopped features immediately stop sending data to AI; AI output is not saved to record/export.

  **Data updated**      AI consent/settings; AI-use log; audit log

  **Success**           AI setting saved

  **Permissions**       User only

  **Source**            SAF-03; FR-SAF-03-01--FR-SAF-03-10.

  **Screen(s)**         SAF-SCR-10 AI and your data, SAF-SCR-10 AI and your data
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open SAF-SCR-10 AI and your data, SAF-SCR-10 AI and your data (entry: Settings → Privacy and safety → AI and your data).

2.  Make sure the preconditions are met: Feature released; user signed in.

3.  Enter or select the required information: AI switch.

4.  Perform the action: User changes an AI switch.

5.  The system processes the action: Show each AI feature, plain-language data use, individual switch, and last-change time; require consent before enabling; Turn all AI off disables all; stopped features immediately stop sending data to AI; AI output is not saved to record/export.

6.  Result on success: AI setting saved.

13.9 Business rules and validations

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**    **What it covers in this module**                                                                                               **Applied in**
  ----------- ------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------
  BR-05       Tone, safety and reporting tools available to every user                                                                        FR-SAF-01-18, FR-SAF-02-10

  BR-11       AI is opt-in. The app does not train on user messages. AI suggestions never enter the legal record.                             FR-SAF-03-01 to FR-SAF-03-10

  BR-22       In Safety Mode, address and location are hidden, check-ins are off, contact details are masked and notifications are discreet   FR-SAF-01-04 to FR-SAF-01-12, FR-SAF-02-02, FR-SAF-02-08

  BR-23       Where the agency allows it, a family violence flag on the case can offer Safety Mode to the parent                              FR-SAF-01-17
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The messaging rules BR-08 (a sent message cannot be edited or deleted) and BR-10 (a held message can be opened and stays in the record) are not changed by this module.

  ----------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- -----------------------------------------------------------------------------------------------------------------------------------
  BR-05      Data export, tone, safety and reporting tools are available to every user.

  BR-08      A sent message cannot be edited or deleted.

  BR-10      A held-back incoming message can be opened by the user. The reason it was flagged is shown, and the original stays in the record.

  BR-11      AI is opt-in. The app does not train on user messages. AI suggestions never enter the legal record.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.

  BR-23      Where the agency allows it, a family violence flag on the case can offer Safety Mode to the parent.
  ----------------------------------------------------------------------------------------------------------------------------------------------

13.10 Messages and errors

Errors

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**    **When it shows**                                                    **Text**                                                                **Used by**
  --------- -------------------------------------------------------------------- ----------------------------------------------------------------------- ------------------------------------------
  ERR-01    The code to turn off Safety Mode is wrong, expired or already used   The code did not work or has expired. Safety Mode stays on.             FR-SAF-01-03

  ERR-02    A setting cannot be saved                                            We could not save your change. Nothing was changed. Please try again.   FR-SAF-01-21, FR-SAF-02-13, FR-SAF-03-13

  ERR-03    A user changes the alert preview level while Safety Mode is on       Alerts stay hidden while Safety Mode is on.                             FR-SAF-02-02

  ERR-04    A user turns off the image setting while Safety Mode is on           Images stay hidden until you tap them while Safety Mode is on.          FR-SAF-02-08
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **When it shows**                                            **Text**                                                                                                                                                                                                                                                                                                                                                                             **Feature**
  ---------- ------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -------------
  MSGT-01    A user turns Safety Mode on (the safety notice)              Safety Mode hides some details from the other parent and makes alerts discreet. The Exit now button leaves this site quickly, but it does not delete your browser history and does not stop spyware. If you can, use a safer device. If you are in danger, call 911 if it is safe to do so, or call the National Domestic Violence Hotline at 1-800-799-7233 (TTY 1-800-787-3224).   SAF-01

  MSGT-02    Safety Mode is turned on                                     Safety Mode is on.                                                                                                                                                                                                                                                                                                                                                                   SAF-01

  MSGT-03    A user asks to turn Safety Mode off                          To turn off Safety Mode, enter the code we sent you.                                                                                                                                                                                                                                                                                                                                 SAF-01

  MSGT-04    Safety Mode is turned off                                    Safety Mode is off.                                                                                                                                                                                                                                                                                                                                                                  SAF-01

  MSGT-05    The other parent opens an item with hidden contact details   Contact details are hidden until \[name\] shares them.                                                                                                                                                                                                                                                                                                                               SAF-01

  MSGT-06    The other parent opens an item with a hidden location        Location is hidden until \[name\] shares it.                                                                                                                                                                                                                                                                                                                                         SAF-01

  MSGT-07    The offer from a family violence flag                        Would you like to turn on Safety Mode? It hides some details, and you can turn it off at any time. The other parent will not be told.                                                                                                                                                                                                                                                SAF-01

  MSGT-08    The safety resources page opens                              If you are in danger, call 911 if it is safe to do so. National Domestic Violence Hotline: 1-800-799-7233, TTY 1-800-787-3224. \[More help and support links approved by advocates.\]                                                                                                                                                                                                SAF-01

  MSGT-09    An SMS or an email goes to a user in Safety Mode             You have a new notification.                                                                                                                                                                                                                                                                                                                                                         SAF-01

  MSGT-10    An alert at the level Hidden                                 You have a new notification in ParentPath. Open the app to see it.                                                                                                                                                                                                                                                                                                                   SAF-02

  MSGT-11    An alert at the level Name only                              You have a new message from \[name\].                                                                                                                                                                                                                                                                                                                                                SAF-02

  MSGT-12    An alert at the level Name and text                          You have a new message from \[name\]: \[first 100 characters of the message\]                                                                                                                                                                                                                                                                                                        SAF-02

  MSGT-13    A user chooses the level Name and text                       Anyone who can see your screen can read your messages in alerts. Do you want to show message text in alerts?                                                                                                                                                                                                                                                                         SAF-02

  MSGT-14    An image is hidden                                           Image hidden. Tap to view.                                                                                                                                                                                                                                                                                                                                                           SAF-02

  MSGT-15    A user turns on an AI feature                                The AI reads \[what it reads\]. It does not use your data for training. What it suggests is not saved in your record.                                                                                                                                                                                                                                                                SAF-03

  MSGT-16    A user chooses Turn all AI off                               All AI features are off.                                                                                                                                                                                                                                                                                                                                                             SAF-03

  MSGT-17    The AI screen opens                                          ParentPath does not use your data to train AI. What the AI suggests is not saved in your record. The AI never deletes or blocks a message. AI is used only when you turn it on.                                                                                                                                                                                                      SAF-03
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

13.11 Dependencies

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Module**                                                            **What it needs from Safety and Privacy**
  --------------------------------------------------------------------- --------------------------------------------------------------------------------------
  Messaging                                                             The AI switches and notices, and the Safety Mode rules for read status and mediation

  Notifications                                                         The Safety Mode flag and the alert preview level

  Calendar and Parenting Time                                           The Safety Mode flag, for locations, check-ins and outside calendar entries

  Child Support Sync                                                    The offer of Safety Mode to a parent with a family violence flag

  Children and Documents, Records and Court, Professionals and Access   The Safety Mode flag, so that hidden details stay hidden
  ------------------------------------------------------------------------------------------------------------------------------------------------------------

12.3 Assumptions

-   Safety Mode cannot protect a user from spyware or from a person who can use the device of the user. The safety notice says so.

-   The NNEDV pages named in the review describe its guidance on October 14, 2026 and can change.

-   P15 is rated Medium, and P14 is rated High (Pain Point workbook).

13.12 End-to-end workflows and scenarios

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                                             **Module path**                 **Features / rules**
  -------------- --------------------------------------------------------------------------------------------------------------------------- ------------------------------- ----------------------------
  WF-05          Compose and send a message with optional tone check; delivery escalation push → SMS (15 min) → email (1 h); status logged   MSG → SAF → NTF → REC           MSG-01--04, NTF-01, NTF-02

  WF-06          Receive a hostile message: shield holds it, reason shown, user views original, may report it                                MSG → SAF → SUP                 MSG-06, MSG-14, BR-10

  WF-14          Turn Safety Mode on (notice + confirm), effects across modules, Exit Now, turn off with one-time code                       SAF → MSG/CAL/DOC/NTF/PLT/SUP   SAF-01, BR-22

  WF-15          Alert-preview level, sensitive images, AI consent and AI use log                                                            SAF → NTF → MSG                 SAF-02, SAF-03, BR-11

  WF-21          send proof to agency, family-violence flag offers Safety Mode, agency notice invite, unified timeline                       CSS → SAF/ACC                   CSS-06, CSS-08--10
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Scenario**   **Scenario**                        **Expected behaviour**
  -------------- ----------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------
  SCN-SAF-001    User enables Safety Mode            Addresses/locations hidden, contact details masked, alerts Hidden, check-ins unavailable, Exit Now available; co-parent sees no Safety Mode indicator.

  SCN-SAF-002    Safety Mode user receives message   Alert has no sender/text; sender does not see Read; message remains immutable and exportable.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
