# Calling (CLL)


6.1 Module overview

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- ----------------------------------------------------------------------------------------------------------------------------
  Purpose                 Let parents talk inside the app without sharing personal phone numbers, with an optional recording made only with consent.

  Users                   Parent, co-parent

  Pain points addressed   None linked directly

  Features                3 (0 Must-have, 3 Good-to-have, 0 Unique)

  Depends on              Messaging, Accounts and Onboarding, Records and Court (call records).
  ----------------------------------------------------------------------------------------------------------------------------------------------------

-   Audio and video calls inside the app.

-   Recording and transcription, only when both parents agree.

-   Phone numbers stay hidden during calls.

Purpose and scope

2.1 Purpose. This module lets parents talk inside the app without sharing personal phone numbers, with an optional recording that is made only with consent.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **How this module supports it**
  ---------------- ----------------------------------------------------------------------------------------------------------------------------------------
  OBJ-01           The call log, the consent log, the recordings and the transcripts are part of the court-ready record (CLL-01, CLL-02).

  OBJ-05           A parent keeps their phone number and location private, and in Safety Mode calling is off until the user turns it on (CLL-03, CLL-01).
  ---------------------------------------------------------------------------------------------------------------------------------------------------------

2.3 In scope. The three features CLL-01 to CLL-03 listed in section 5.

6.2 Roles and permissions

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**                **What they do in this module**
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------
  Parent                  Turns calling settings on or off, places and answers calls, agrees to a recording, and plays or downloads the recordings of the calls they were on.

  Co-parent               The same as the Parent, once linked.

  Professional            Reads the call records and recordings that a parent shares (PRO-01). Cannot call.

  Support staff           Cannot hear recordings or read transcripts.

  Third party and Child   No feature in this module.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

6.3 Business requirements

  ------------------------------------------------------------------------------------------------------------------------
  **ID**          **Business requirement**                                                                **Features**
  --------------- --------------------------------------------------------------------------------------- ----------------
  BREQ-01         Parents can place audio and video calls inside the app, and every call is documented.   CLL-01

  BREQ-02         A call can be recorded and transcribed only when both parents agree.                    CLL-02

  BREQ-03         The phone number of a parent stays hidden during calls.                                 CLL-03
  ------------------------------------------------------------------------------------------------------------------------

6.4 Features

  ---------------------------------------------------------------------------------------------
  **Feature**   **Name**                                          **Type**
  ------------- ------------------------------------------------- -----------------------------
  CLL-01        In-app audio and video calls                      Good-to-have → Good-to-have

  CLL-02        Call recording and transcription (with consent)   Good-to-have → Good-to-have

  CLL-03        Personal phone number hidden during calls         Good-to-have → Good-to-have
  ---------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**      **Screens**
  ------------------ ------------------ ------------------------------------------------------------------
  CLL-SUB-01         Calling settings   Audio/video/recording/transcript settings; consent log

  CLL-SUB-02         Calls              Place call; incoming call; active call; call log

  CLL-SUB-03         Recording          Recording request; recording label; recording/transcript library
  --------------------------------------------------------------------------------------------------------

6.5 Screen inventory

  ------------------------------------------------------------------------------------------
  **Screen ID**   **Screen**                                                **Feature**
  --------------- --------------------------------------------------------- ----------------
  CLL-SCR-01      Calling settings (audio, video, recording, transcripts)   CLL-01, CLL-02

  CLL-SCR-02      Place a call, started from the thread                     CLL-01

  CLL-SCR-03      Incoming call                                             CLL-01

  CLL-SCR-04      Call screen with the controls and the Recording label     CLL-01, CLL-02

  CLL-SCR-05      Recording request                                         CLL-02

  CLL-SCR-06      Call log, recordings and transcripts                      CLL-01, CLL-02

  CLL-SCR-07      Consent log                                               CLL-01
  ------------------------------------------------------------------------------------------

6.6 Screen specifications

CLL-SCR-01 --- Calling settings

  -------------------------------------------------------------------------
  **Screen ID**    CLL-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Calling

  **Feature(s)**   CLL-01, CLL-02
  -------------------------------------------------------------------------

![Figure CLL-SCR-01 --- Calling settings](media/f4630ee8a3cdaf454b98b344d1292246e8b565df.png "Figure CLL-SCR-01 — Calling settings"){width="6.666666666666667in" height="5.0in"}

*Figure CLL-SCR-01 --- Calling settings*

**Navigation**

  ------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-20 Settings; CLL-SCR-06 Call log, recordings and transcripts
  ----------------------- ------------------------------------------------------------------------
  **Where you go next**   CLL-SCR-06 Call log, recordings and transcripts; Main menu: any module

  ------------------------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Call Settings\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Default recording preference (P-CAL-008-01); Microphone device (P-CAL-008-02); Speaker device (P-CAL-008-03).

-   Action area (primary action first, then secondary actions and links): Save (P-CAL-008-04).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**        **Type**         **Required**   **Editable**   **Default**      **Allowed values / validation**   **Error**              **Visibility**       **Saved to**     **Behavior**
  ------------------ ------------------------------ ---------------- -------------- -------------- ---------------- --------------------------------- ---------------------- -------------------- ---------------- ----------------------
  P-CAL-008-01       Default recording preference   Toggle           No             Yes            Off              On / off                          Inline field message   Parent / Co-parent   User setting     Applies to new calls

  P-CAL-008-02       Microphone device              Select           No             Yes            System default   Available devices                 Device error           Caller               Device setting   Selects microphone

  P-CAL-008-03       Speaker device                 Select           No             Yes            System default   Available devices                 Device error           Caller               Device setting   Selects speaker

  P-CAL-008-04       Save                           Primary button   ---            ---            ---              ---                               Save error             Caller               User setting     Saves settings
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- defaults displayed; Loading --- settings loading; Error --- device failure; Success --- settings saved.

CLL-SCR-02 --- Place a call

  -------------------------------------------------------------------------
  **Screen ID**    CLL-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Calling

  **Feature(s)**   CLL-01
  -------------------------------------------------------------------------

![Figure CLL-SCR-02 --- Place a call](media/dff03b5fc3897ce7e1915652994f1d3422fcfc8f.png "Figure CLL-SCR-02 — Place a call"){width="6.666666666666667in" height="5.0in"}

*Figure CLL-SCR-02 --- Place a call*

**Navigation**

  -------------------------------------------------------------------------------------------------------------
  **How you get here**    CLL-SCR-06 Call log, recordings and transcripts; MSG-SCR-02 Thread and message view
  ----------------------- -------------------------------------------------------------------------------------
  **Where you go next**   CLL-SCR-04 Call screen; MSG-SCR-02 Thread and message view; Main menu: any module

  -------------------------------------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Start Call\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Call recipient (P-CAL-002-01).

-   Input area (form fields, in specification order): Call type (P-CAL-002-02); Recording request (P-CAL-002-03).

-   Action area (primary action first, then secondary actions and links): Start call (P-CAL-002-04); Cancel (P-CAL-002-05).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                **Required**   **Editable**   **Default**        **Allowed values / validation**   **Error**              **Visibility**   **Saved to**            **Behavior**
  ------------------ ------------------------- ----------------------- -------------- -------------- ------------------ --------------------------------- ---------------------- ---------------- ----------------------- --------------------------
  P-CAL-002-01       Call recipient            Read-only participant   System         No             Linked co-parent   Linked parent only                Inline field message   Caller           Call.participants       Display only

  P-CAL-002-02       Call type                 Select                  Yes            Yes            Voice              Audio; Video                      Inline field message   Caller           Call.type               Required

  P-CAL-002-03       Recording request         Toggle                  No             Yes            Off                On / off                          ---                    Caller           recording_requested     Opens consent flow if on

  P-CAL-002-04       Start call                Primary button          ---            ---            ---                ---                               Call failure error     Caller           Call.status = Ringing   Starts call

  P-CAL-002-05       Cancel                    Secondary button        ---            ---            ---                ---                               ---                    Caller           ---                     Returns without call
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- recipient displayed; Loading --- connecting; Error --- call cannot start; Success --- opens Active Call.

CLL-SCR-03 --- Incoming call

  -------------------------------------------------------------------------
  **Screen ID**    CLL-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Calling

  **Feature(s)**   CLL-01
  -------------------------------------------------------------------------

![Figure CLL-SCR-03 --- Incoming call](media/06ebc71422cec2bb141026d50b5a6dea848c02b4.png "Figure CLL-SCR-03 — Incoming call"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure CLL-SCR-03 --- Incoming call*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    System: the co-parent starts a call
  ----------------------- --------------------------------------------------------
  **Where you go next**   CLL-SCR-04 Call screen

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

CLL-SCR-04 --- Call screen

  -------------------------------------------------------------------------
  **Screen ID**    CLL-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Calling

  **Feature(s)**   CLL-01, CLL-02
  -------------------------------------------------------------------------

![Figure CLL-SCR-04 --- Call screen](media/5d0751dc00efc4c81259520d8ff4c12570b21dda.png "Figure CLL-SCR-04 — Call screen"){width="6.666666666666667in" height="5.0in"}

*Figure CLL-SCR-04 --- Call screen*

**Navigation**

  ---------------------------------------------------------------------------------------------------------
  **How you get here**    CLL-SCR-02 Place a call; CLL-SCR-03 Incoming call; CLL-SCR-05 Recording request
  ----------------------- ---------------------------------------------------------------------------------
  **Where you go next**   CLL-SCR-06 Call log, recordings and transcripts; Main menu: any module

  ---------------------------------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Active Call\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Call timer (P-CAL-003-01); Recording status (P-CAL-003-04); Connection quality (P-CAL-003-06).

-   Input area (form fields, in specification order): Mute (P-CAL-003-02); Speaker (P-CAL-003-03).

-   Action area (primary action first, then secondary actions and links): End call (P-CAL-003-05).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**   **Error**   **Visibility**      **Saved to**              **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------- --------------------------------- ----------- ------------------- ------------------------- --------------------
  P-CAL-003-01       Call timer                Duration             System         No             00:00         Elapsed time                      ---         Call participants   duration                  Display only

  P-CAL-003-02       Mute                      Toggle               No             Yes            Off           On / off                          ---         Caller              Call session state        Toggles microphone

  P-CAL-003-03       Speaker                   Toggle               No             Yes            Off           On / off                          ---         Caller              Call session state        Toggles speaker

  P-CAL-003-04       Recording status          Badge                System         No             Off           Recording; Not recording          ---         Call participants   recording_status          Display only

  P-CAL-003-05       End call                  Destructive button   ---            ---            ---           Confirmation required             ---         Caller              Call.status = Completed   Ends call

  P-CAL-003-06       Connection quality        Indicator            System         No             Derived       Good; Poor; Lost                  ---         Call participants   Call telemetry            Display only
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- not applicable; Loading --- connecting; Error --- connection lost; Success --- active call displayed.

Specification

**Component arrangement:**

-   Page header: screen title \"Call Ended / Summary\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Call outcome (P-CAL-004-01); Duration (P-CAL-004-02); Recording saved (P-CAL-004-03).

-   Action area (primary action first, then secondary actions and links): Add to record (P-CAL-004-04); Back to calls (P-CAL-004-05).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**   **Required**   **Editable**   **Default**   **Allowed values / validation**       **Error**   **Visibility**      **Saved to**       **Behavior**
  ------------------ ------------------------- ---------- -------------- -------------- ------------- ------------------------------------- ----------- ------------------- ------------------ -------------------------------------------------------
  P-CAL-004-01       Call outcome              Badge      System         No             Derived       Completed; Missed; Declined; Failed   ---         Call participants   Call.status        Display only

  P-CAL-004-02       Duration                  Duration   System         No             Calculated    Call duration                         ---         Call participants   duration           Display only

  P-CAL-004-03       Recording saved           Badge      System         No             Derived       Saved; Not saved                      ---         Call participants   Recording record   Display only

  P-CAL-004-04       Add to record             Button     ---            ---            ---           ---                                   ---         Call participant    Call record link   Adds call to Records

  P-CAL-004-05       Back to calls             Button     ---            ---            ---           ---                                   ---         Call participant    ---                Opens CLL-SCR-06 Call log, recordings and transcripts
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- not applicable; Loading --- summary loading; Error --- summary unavailable; Success --- summary displayed.

CLL-SCR-05 --- Recording request

  -------------------------------------------------------------------------
  **Screen ID**    CLL-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Calling

  **Feature(s)**   CLL-02
  -------------------------------------------------------------------------

![Figure CLL-SCR-05 --- Recording request](media/2a75db21064c345ad2913c4c3829a2c395bdbe88.png "Figure CLL-SCR-05 — Recording request"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure CLL-SCR-05 --- Recording request*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    System: the other parent asks to record during a call
  ----------------------- --------------------------------------------------------
  **Where you go next**   CLL-SCR-04 Call screen

  --------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Call Recording Consent\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Consent timestamp (P-CAL-005-04).

-   Input area (form fields, in specification order): Consent explanation (P-CAL-005-01); Caller consent (P-CAL-005-02); Recipient consent (P-CAL-005-03).

-   Action area (primary action first, then secondary actions and links): Start recording (P-CAL-005-05); Decline (P-CAL-005-06).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**    **Allowed values / validation**                     **Error**              **Visibility**      **Saved to**                   **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- -------------- --------------------------------------------------- ---------------------- ------------------- ------------------------------ -----------------------
  P-CAL-005-01       Consent explanation       Informational text   ---            ---            ---            Both parents must agree; recording off by default   ---                    Call participants   ---                            Display only

  P-CAL-005-02       Caller consent            Toggle               Yes            Yes            Off            On / off                                            Inline field message   Caller              CallerConsent                  Required

  P-CAL-005-03       Recipient consent         Toggle               Yes            Yes            Off            On / off                                            Inline field message   Recipient           RecipientConsent               Required

  P-CAL-005-04       Consent timestamp         Timestamp            System         No             Consent time   UTC storage; local display                          ---                    Call participants   Consent record                 Display only

  P-CAL-005-05       Start recording           Primary button       ---            ---            ---            Both consents required                              Inline field message   Caller              recording_status = Recording   Starts recording

  P-CAL-005-06       Decline                   Secondary button     ---            ---            ---            ---                                                 ---                    Recipient           Consent record                 Recording not started
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- consent request displayed; Loading --- consent pending; Error --- consent failure; Success --- recording begins only after both consents.

CLL-SCR-06 --- Call log, recordings and transcripts

  -------------------------------------------------------------------------
  **Screen ID**    CLL-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Calling

  **Feature(s)**   CLL-01, CLL-02
  -------------------------------------------------------------------------

![Figure CLL-SCR-06 --- Call log, recordings and transcripts](media/16813fa94d5b4d1dea5ecfd3d23bd4397f692840.png "Figure CLL-SCR-06 — Call log, recordings and transcripts"){width="6.666666666666667in" height="5.0in"}

*Figure CLL-SCR-06 --- Call log, recordings and transcripts*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Calls; CLL-SCR-01 Calling settings; CLL-SCR-04 Call screen; CLL-SCR-07 Consent log
  ----------------------- -----------------------------------------------------------------------------------------------------
  **Where you go next**   CLL-SCR-01 Calling settings; CLL-SCR-02 Place a call; CLL-SCR-07 Consent log; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------

Specification

**Component arrangement:**

-   Page header: screen title \"Calls Home\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Call history (P-CAL-001-01); Call type (P-CAL-001-02); Call status (P-CAL-001-03); Started at (P-CAL-001-04); Duration (P-CAL-001-05); Recording indicator (P-CAL-001-06).

-   Action area (primary action first, then secondary actions and links): Start call (P-CAL-001-07); Open recording (P-CAL-001-08).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**   **Allowed values / validation**       **Error**               **Visibility**       **Saved to**       **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- ------------- ------------------------------------- ----------------------- -------------------- ------------------ -------------------------------------------------------
  P-CAL-001-01       Call history              Call list        ---            ---            ---           User's calls                          Load error with retry   Parent / Co-parent   Call               Displays calls

  P-CAL-001-02       Call type                 Badge            System         No             Derived       Audio; Video                          ---                     Call participants    Call.type          Display only

  P-CAL-001-03       Call status               Badge            System         No             Derived       Completed; Missed; Declined; Failed   ---                     Call participants    Call.status        Display only

  P-CAL-001-04       Started at                Timestamp        System         No             Call start    UTC storage; local display            ---                     Call participants    started_at         Display only

  P-CAL-001-05       Duration                  Duration         System         No             Calculated    Call duration                         ---                     Call participants    duration           Display only

  P-CAL-001-06       Recording indicator       Badge            System         No             Off           Recorded; Not recorded                ---                     Call participants    recording_status   Display only

  P-CAL-001-07       Start call                Primary button   ---            ---            ---           ---                                   ---                     Parent / Co-parent   ---                Opens CLL-SCR-02 Place a call

  P-CAL-001-08       Open recording            Row action       ---            ---            ---           Recorded call only                    ---                     Call participant     ---                Opens CLL-SCR-06 Call log, recordings and transcripts
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- no calls; Loading --- call skeleton; Error --- load failure; Success --- calls displayed.

Specification

**Component arrangement:**

-   Page header: screen title \"Call Recordings\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Call date (P-CAL-006-02); Duration (P-CAL-006-03).

-   Action area (primary action first, then secondary actions and links): Recording list (P-CAL-006-01); Consent record (P-CAL-006-04); Play (P-CAL-006-05); Export (P-CAL-006-06).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**       **Required**   **Editable**   **Default**        **Allowed values / validation**   **Error**               **Visibility**     **Saved to**     **Behavior**
  ------------------ ------------------------- -------------- -------------- -------------- ------------------ --------------------------------- ----------------------- ------------------ ---------------- -------------------------------------------------------
  P-CAL-006-01       Recording list            Table / list   ---            ---            ---                User's recorded calls             Load error with retry   Call participant   CallRecording    Displays recordings

  P-CAL-006-02       Call date                 Timestamp      System         No             Recording date     UTC storage; local display        ---                     Call participant   recorded_at      Display only

  P-CAL-006-03       Duration                  Duration       System         No             Recording length   ---                               ---                     Call participant   duration         Display only

  P-CAL-006-04       Consent record            Link / badge   System         No             Derived            Both consents recorded            ---                     Call participant   Consent record   Opens consent details

  P-CAL-006-05       Play                      Row action     ---            ---            ---                ---                               Playback error          Call participant   ---              Opens CLL-SCR-06 Call log, recordings and transcripts

  P-CAL-006-06       Export                    Row action     ---            ---            ---                ---                               ---                     Call participant   Export record    Exports recording
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- no recordings; Loading --- list skeleton; Error --- load failure; Success --- recordings displayed.

Specification

**Component arrangement:**

-   Page header: screen title \"Recording Playback\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Audio player (P-CAL-007-01); Playback position (P-CAL-007-02); Recording metadata (P-CAL-007-03).

-   Action area (primary action first, then secondary actions and links): Download / export (P-CAL-007-04); Back to recordings (P-CAL-007-05).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**          **Required**   **Editable**   **Default**   **Allowed values / validation**         **Error**        **Visibility**     **Saved to**       **Behavior**
  ------------------ ------------------------- ----------------- -------------- -------------- ------------- --------------------------------------- ---------------- ------------------ ------------------ -------------------------------------------------------
  P-CAL-007-01       Audio player              Media player      ---            ---            Paused        Play / pause / seek                     Playback error   Call participant   ---                Plays recording

  P-CAL-007-02       Playback position         Progress bar      System         No             0:00          Recording duration                      ---              Call participant   View state         Display/control

  P-CAL-007-03       Recording metadata        Read-only panel   System         No             Derived       Date, duration, participants, consent   ---              Call participant   Recording record   Display only

  P-CAL-007-04       Download / export         Button            ---            ---            ---           ---                                     ---              Call participant   Export record      Exports recording

  P-CAL-007-05       Back to recordings        Text link         ---            ---            ---           ---                                     ---              Call participant   ---                Opens CLL-SCR-06 Call log, recordings and transcripts
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

States: Empty --- not applicable; Loading --- player loading; Error --- playback failure; Success --- recording plays.

CLL-SCR-07 --- Consent log

  -------------------------------------------------------------------------
  **Screen ID**    CLL-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Calling

  **Feature(s)**   CLL-01
  -------------------------------------------------------------------------

![Figure CLL-SCR-07 --- Consent log](media/2d1a2802722e8f75ecea88b574bfb72175126a98.png "Figure CLL-SCR-07 — Consent log"){width="6.666666666666667in" height="5.0in"}

*Figure CLL-SCR-07 --- Consent log*

**Navigation**

  ------------------------------------------------------------------------------------------------
  **How you get here**    CLL-SCR-06 Call log, recordings and transcripts
  ----------------------- ------------------------------------------------------------------------
  **Where you go next**   CLL-SCR-06 Call log, recordings and transcripts; Main menu: any module

  ------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

6.7 Field-level specifications

6.8 User actions and procedures

6.9 Business rules and validations

  --------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- ---------------------------------------------------------------------------------------------------------------------------------
  BR-05      Data export, tone, safety and reporting tools are available to every user.

  BR-11      AI is opt-in. The app does not train on user messages. AI suggestions never enter the legal record.

  BR-21      Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.
  --------------------------------------------------------------------------------------------------------------------------------------------

6.10 Messages and errors

Errors

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **When it shows**                                 **Text**                                                                                                             **Used by**
  ---------- ------------------------------------------------- -------------------------------------------------------------------------------------------------------------------- ----------------------------
  ERR-01     The microphone or the camera is not allowed       We could not use your microphone or camera. Allow it in your browser and try again.                                  FR-CLL-01-17

  ERR-02     The co-parent cannot take the call                \[name\] cannot take your call now. Try again later or send a message.                                               FR-CLL-01-17

  ERR-03     A call cannot connect or cannot be kept private   The call could not connect. No call was made. Please try again.                                                      FR-CLL-01-17, FR-CLL-03-07

  ERR-04     Calling is not available                          Calls are not available now.                                                                                         FR-CLL-01-17

  ERR-05     The household is over the storage limit           Your household is over its storage limit, so this call cannot be recorded. The call can go on without a recording.   FR-CLL-02-15

  ERR-06     A recording cannot start                          We could not start the recording. The call goes on without it.                                                       FR-CLL-02-18
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **When it shows**                                   **Text**                                                                                                                                                                   **Feature**
  ----------- --------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------------
  MSGT-01     A parent turns calls on, and on the call screen     Calls use the internet. They cannot reach emergency services. In an emergency, call 911.                                                                                   CLL-01

  MSGT-02     A call comes in                                     \[name\] is calling you.                                                                                                                                                   CLL-01

  MSGT-03     A call is missed                                    You missed a call from \[name\].                                                                                                                                           CLL-01

  MSGT-04     A parent asks to record a call                      \[name\] wants to record this call. Do you agree?                                                                                                                          CLL-02

  MSGT-05     A recording starts (spoken and on the screen)       This call is being recorded.                                                                                                                                               CLL-02

  MSGT-06     A recording stops                                   The recording stopped.                                                                                                                                                     CLL-02

  MSGT-07     A transcript shows                                  A machine made this transcript. It may have mistakes. The recording is the original.                                                                                       CLL-02

  MSGT-08     A parent turns recording on                         A recording has the voice of both parents, and the picture in a video call. It starts only when both parents agree for that call. Either parent can stop it at any time.   CLL-02

  MSGT-09     A parent turns transcripts on                       The AI turns a recording into text. It does not use your calls for training. Check the recording if the text matters.                                                      CLL-02

  MSGT-10     Recording is not offered in the state of a parent   Call recording is not available in your state yet.                                                                                                                         CLL-02

  MSGT-11     A caller reaches a co-parent in a quiet window      \[name\] is not available.                                                                                                                                                 CLL-01
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

6.11 Dependencies

  --------------------------------------------------------------------------------------
  **Module**                   **What it needs from Calling**
  ---------------------------- ---------------------------------------------------------
  Notifications                Call events for the alerts of incoming and missed calls

  Records and Court            Call records, recordings and transcripts for the record

  Safety and Privacy           Calling that Safety Mode switches off

  Professionals and Access     Recordings that a parent shares
  --------------------------------------------------------------------------------------

12.3 Assumptions

6.12 End-to-end workflows and scenarios

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                                   **Module path**   **Features / rules**
  -------------- ----------------------------------------------------------------------------------------------------------------- ----------------- ----------------------
  WF-22          Place / receive an in-app call, recording only with both parties' consent, call log, recordings and transcripts   CLL → MSG → REC   CLL-01--03

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
