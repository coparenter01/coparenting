# Messaging (MSG)


5.1 Module overview

  -----------------------------------------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------
  Purpose                 The main daily channel between parents. It has to be calm, easy to use and reliable as a record.

  Users                   Parent, co-parent, approved third parties

  Pain points addressed   P12, P13, P15, P16

  Features                13 (5 Must-have, 8 Good-to-have, 0 Unique)

  Depends on              Notifications, Safety and Privacy (AI controls), Records and Court (exports), Accounts and Onboarding (non-user messaging).
  -----------------------------------------------------------------------------------------------------------------------------------------------------

-   Secure messages that are time-stamped and cannot be edited or deleted after sending.

-   A tone check that gives the sender private feedback before sending it. Optional AI rewrite suggestions come later.

-   An incoming message shield. Hostile messages are held back, the user can open the original, choose the level and see why a message was flagged. The original stays in the record.

-   Group chat, an AI co-parenting coach, human mediation and urgent-message detection, all later and all subject to separate decisions.

Purpose and scope

2.1 Purpose. This module is the main daily channel between parents. It has to be calm, easy to use and reliable as a record.

  -----------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **How this module supports it**
  ---------------- ------------------------------------------------------------------------------------------------------------------------------------
  OBJ-01           Messages that cannot be changed, with sent and first-read times, are the base of the court-ready record (MSG-02, MSG-03).

  OBJ-05           AI is opt-in and is explained in plain words, and the shield and the report tool protect parents at risk (MSG-04, MSG-06, MSG-14).
  -----------------------------------------------------------------------------------------------------------------------------------------------------

5.2 Roles and permissions

  --------------------------------------------------------------------------------------------------------------------------------------
  **Role**                          **What they do in this module**
  --------------------------------- ----------------------------------------------------------------------------------------------------
  Parent                            Writes and reads messages, uses the tone check and the shield, reports a message and keeps drafts.

  Co-parent                         The same as the Parent, once linked.

  Co-parent who is not on the app   Gets texts and emails and answers by text or email (ACC-04). Has no account.

  Third party                       Reads and answers in the threads the parents add them to (ACC-07).

  Child                             Gets only the threads the parents set (ACC-07).

  Professional                      Reads the threads a parent shares (PRO-01). Also a mediator can answer in a mediation thread.

  Support staff                     Cannot read parent messages.
  --------------------------------------------------------------------------------------------------------------------------------------

5.3 Business requirements

  ---------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Business requirement**                                                                          **Features**
  --------------- ------------------------------------------------------------------------------------------------- ---------------
  BREQ-01         Parents message each other inside the app, and all talk about the children is in one place.       MSG-01

  BREQ-02         A sent message cannot be edited or deleted.                                                       MSG-02

  BREQ-03         Every message has a sent time and a first-read time.                                              MSG-03

  BREQ-04         A sender gets private feedback on the tone of a message before it is sent.                        MSG-04

  BREQ-05         A sender can get an AI suggestion for a calmer message, if the sender chooses it.                 MSG-05

  BREQ-06         A hostile incoming message is held back, the reason is shown and the original opens in one tap.   MSG-06

  BREQ-07         A parent can search messages by keyword or date.                                                  MSG-07

  BREQ-08         A parent can sort messages into folders and topics.                                               MSG-08

  BREQ-09         A parent can attach files and pictures to a message.                                              MSG-09

  BREQ-10         A parent can message a Third party or a Child, and can start a group thread.                      MSG-10

  BREQ-11         A parent can ask an AI coach for help with co-parenting questions.                                MSG-11

  BREQ-12         A parent can ask for mediation by a licensed mediator inside the app.                             MSG-12

  BREQ-13         An urgent message is marked, and the recipient is alerted at once.                                MSG-13

  BREQ-14         A parent can report a harassing or threatening message, available to every user.                  MSG-14
  ---------------------------------------------------------------------------------------------------------------------------------

5.4 Features

  ---------------------------------------------------------------------------------------------------
  **Feature**   **Name**                                                **Type**
  ------------- ------------------------------------------------------- -----------------------------
  MSG-01        Secure in-app messaging                                 Must-have → Must-have

  MSG-02        Messages cannot be edited or deleted                    Must-have → Must-have

  MSG-03        Time-stamped messages                                   Must-have → Must-have

  MSG-04        Tone checks on outgoing messages                        Must-have → Must-have

  MSG-05        AI rewrite suggestions for outgoing messages (opt-in)   Good-to-have → Good-to-have

  MSG-06        Incoming message shield with view-original              Must-have → Must-have

  MSG-07        Search messages by keyword or date                      Good-to-have → Good-to-have

  MSG-08        Message folders or topics                               Good-to-have → Good-to-have

  MSG-09        Attachments and files in messages                       Good-to-have → Good-to-have

  MSG-10        Group chat and messages to third parties                Good-to-have → Good-to-have

  MSG-11        AI co-parenting coach                                   Good-to-have → Good-to-have

  MSG-12        Human mediation or counseling in the app                Good-to-have → Good-to-have

  MSG-13        Urgent-message detection                                Good-to-have → Good-to-have

  MSG-14        Report a message (proposed)                             --- → Proposed
  ---------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**                 **Screens**
  ------------------ ----------------------------- -----------------------------------------------------------------------------------
  MSG-SUB-01         Threads                       Message inbox/thread list; thread detail; compose/reply; draft management

  MSG-SUB-02         Tone check                    Tone-check result; edit/send-anyway choice; AI disclosure

  MSG-SUB-03         Incoming shield               Shielded-message list/item; view-original; shield settings; incorrect-hold report

  MSG-SUB-04         Reporting                     Report-message dialog; report confirmation

  MSG-SUB-05         Search and organization       Search; folders/topics

  MSG-SUB-06         Attachments                   Attachment upload/view

  MSG-SUB-07         AI assistance                 AI rewrite; AI coach; urgent detection

  MSG-SUB-08         Group/third-party messaging   Group thread; third-party thread

  MSG-SUB-09         Mediation                     Mediation request/thread
  ------------------------------------------------------------------------------------------------------------------------------------

5.5 Screen inventory

  ---------------------------------------------------------------------------------------------------
  **Screen ID**   **Screen**                                                 **Feature**
  --------------- ---------------------------------------------------------- ------------------------
  MSG-SCR-01      Thread list                                                MSG-01

  MSG-SCR-02      Thread and message view, with the status of each message   MSG-01, MSG-02, MSG-03

  MSG-SCR-03      New message and reply                                      MSG-01, MSG-04

  MSG-SCR-04      Drafts                                                     MSG-01

  MSG-SCR-05      AI settings (tone check, shield and level)                 MSG-04, MSG-06

  MSG-SCR-06      Held message                                               MSG-06

  MSG-SCR-07      Report a message                                           MSG-14

  MSG-SCR-08      Search                                                     MSG-07

  MSG-SCR-09      Folders and topics                                         MSG-08

  MSG-SCR-10      Attachments in the message form                            MSG-09

  MSG-SCR-11      Group thread members                                       MSG-10

  MSG-SCR-12      AI coach                                                   MSG-11

  MSG-SCR-13      Mediation request                                          MSG-12

  MSG-SCR-B01     AI rewrite                                                 ---
  ---------------------------------------------------------------------------------------------------

5.6 Screen specifications

MSG-SCR-01 --- Thread list

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-01
  -------------------------------------------------------------------------

![Figure MSG-SCR-01 --- Thread list](media/c95b8fb8383a9ae2db0ee31c643a5d2eeb74f3c5.png "Figure MSG-SCR-01 — Thread list"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-01 --- Thread list*

**Navigation**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Messages; ACC-SCR-19 Home; MSG-SCR-02 Thread and message view; MSG-SCR-03 New message and reply; MSG-SCR-04 Drafts; MSG-SCR-05 AI settings; MSG-SCR-10 Attachments
  ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   ACC-SCR-09 Contact co-parent not on the app; MSG-SCR-02 Thread and message view; MSG-SCR-03 New message and reply; MSG-SCR-04 Drafts; MSG-SCR-08 Search; MSG-SCR-09 Folders and topics; MSG-SCR-10 Attachments; Main menu: any module

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show all message threads, newest activity first.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Thread List\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Latest activity time (P-MSG-001-04); Unread indicator (P-MSG-001-05).

-   Input area (form fields, in specification order): Subject (P-MSG-001-02); Latest message preview (P-MSG-001-03); Search (P-MSG-001-06); Solo Mode notice (P-MSG-001-08).

-   Action area (primary action first, then secondary actions and links): Thread list (P-MSG-001-01); New message (P-MSG-001-07).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**          **Error**               **Visibility**                           **Saved to**           **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------- ---------------------------------------- ----------------------- ---------------------------------------- ---------------------- ---------------------------------------------------------
  P-MSG-001-01       Thread list               Table / list         ---            ---            ---           Threads sorted by latest message first   Load error with retry   Parent / Co-parent in Linked household   ---                    Displays threads

  P-MSG-001-02       Subject                   Text                 System         No             Derived       Thread subject                           ---                     Thread participants                      Thread.subject         Opens thread on select

  P-MSG-001-03       Latest message preview    Text                 System         No             Derived       First 100 characters                     ---                     Thread participants                      Message.message_text   Display only

  P-MSG-001-04       Latest activity time      Timestamp            System         No             Derived       UTC storage; local display               ---                     Thread participants                      Message.sent_at        Display only

  P-MSG-001-05       Unread indicator          Badge                System         No             Derived       Unread / none                            ---                     Thread participants                      Delivery/read state    Highlights unread thread

  P-MSG-001-06       Search                    Search input         No             Yes            Blank         Searches subject and message text        Inline field message    Thread participants                      ---                    Filters thread list

  P-MSG-001-07       New message               Primary button       ---            ---            ---           ---                                      ---                     Parent / Co-parent                       ---                    Opens MSG-SCR-03 New message and reply

  P-MSG-001-08       Solo Mode notice          Informational text   ---            ---            ---           Shown in Solo Mode                       ---                     Solo parent                              ---                    Explains messages to non-app co-parent appear in thread
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- ------------------------------------------------
  Empty                     "No messages yet" guidance; New message action

  Loading                   Thread-list skeleton

  Error                     Load failure and retry

  Success                   Threads displayed, latest first
  --------------------------------------------------------------------------

MSG-SCR-02 --- Thread and message view

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-01, MSG-02, MSG-03
  -------------------------------------------------------------------------

![Figure MSG-SCR-02 --- Thread and message view](media/e1d28d73ecc659f223c865aa02ad9199dc883df1.png "Figure MSG-SCR-02 — Thread and message view"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-02 --- Thread and message view*

**Navigation**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-19 Home; CLL-SCR-02 Place a call; MSG-SCR-01 Thread list; MSG-SCR-03 New message and reply; MSG-SCR-06 Held message; MSG-SCR-07 Report a message; MSG-SCR-08 Search; MSG-SCR-09 Folders and topics; MSG-SCR-11 Group thread members; MSG-SCR-13 Mediation request; MSG-SCR-B01 AI rewrite; NTF-SCR-B01 Message alert; SAF-SCR-09 Hidden image placeholder
  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   CLL-SCR-02 Place a call; MSG-SCR-01 Thread list; MSG-SCR-03 New message and reply; MSG-SCR-06 Held message; MSG-SCR-07 Report a message; MSG-SCR-11 Group thread members; MSG-SCR-13 Mediation request; NTF-SCR-03 Message status; PRO-SCR-04 Share an item with a professional; Main menu: any module

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  --------------------------------------------------------------------------------
  **Purpose**    Display one thread's immutable messages in chronological order.
  -------------- -----------------------------------------------------------------

  --------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Thread and Message View\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Thread subject (P-MSG-003-01); Message list (P-MSG-003-02); Sent time (P-MSG-003-05); First-read time (P-MSG-003-06); Message status (P-MSG-003-07); Held message indicator (P-MSG-003-10).

-   Input area (form fields, in specification order): Sender name (P-MSG-003-03); Message text (P-MSG-003-04).

-   Action area (primary action first, then secondary actions and links): Reply (P-MSG-003-08); Report message (P-MSG-003-09).

-   Controls that must NOT be provided: Edit / delete sent message (P-MSG-003-11).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**      **Type**                    **Required**   **Editable**   **Default**       **Allowed values / validation**         **Error**                  **Visibility**                                                 **Saved to**             **Behavior**
  ------------------ ---------------------------- --------------------------- -------------- -------------- ----------------- --------------------------------------- -------------------------- -------------------------------------------------------------- ------------------------ ----------------------------------------
  P-MSG-003-01       Thread subject               Page title                  System         No             Thread subject    Immutable after creation                ---                        Thread participants                                            Thread.subject           Display only

  P-MSG-003-02       Message list                 Message stream              ---            ---            ---               Oldest to newest                        Load error with retry      Thread participants                                            Message                  Displays messages

  P-MSG-003-03       Sender name                  Text                        System         No             Derived           Participant display name                ---                        Thread participants                                            Message.sender_user_id   Display only

  P-MSG-003-04       Message text                 Text                        System         No             Message content   Plain text; immutable after send        ---                        Thread participants                                            Message.message_text     Display only

  P-MSG-003-05       Sent time                    Timestamp                   System         No             Send time         UTC storage; local display; immutable   ---                        Both parents                                                   Message.sent_at          Display only

  P-MSG-003-06       First-read time              Timestamp                   System         No             First open time   UTC storage; local display; immutable   ---                        Both parents; hidden from sender if recipient in Safety Mode   Message.first_read_at    Display only

  P-MSG-003-07       Message status               Badge                       System         No             Sent              Sent; Delivered; Read; Failed           ---                        Sender; recipient visibility rules apply                       Delivery log             Display only

  P-MSG-003-08       Reply                        Primary button / composer   ---            ---            ---               Opens reply composer                    ---                        Thread participants                                            ---                      Opens MSG-SCR-03 New message and reply

  P-MSG-003-09       Report message               Row action                  ---            ---            ---               Available per message                   ---                        Message recipient                                              Report record            Opens MSG-SCR-07 Report a message

  P-MSG-003-10       Held message indicator       Badge                       System         No             Derived           Message held                            ---                        Shield user only                                               Shield state             Opens MSG-SCR-06 Held message

  P-MSG-003-11       Edit / delete sent message   Not displayed               ---            ---            ---               No edit/delete/un-send control          ERR-04 on direct request   No user                                                        ---                      Enforces immutability
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ------------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- ------------------------------------------------------------------------
  Empty                   Thread exists but has no visible messages --- edge case; show guidance

  Loading                 Message-stream skeleton

  Error                   Load failure and retry

  Success                 Messages displayed chronologically with timestamps and status
  ------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show delivery and read evidence for one message.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Message Status Detail\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Message preview (P-MSG-008-01); Sent time (P-MSG-008-02); Status timeline (P-MSG-008-03); Status time (P-MSG-008-04); First-read time (P-MSG-008-05).

-   Action area (primary action first, then secondary actions and links): Close (P-MSG-008-06).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**         **Required**   **Editable**   **Default**        **Allowed values / validation**                       **Error**   **Visibility**                  **Saved to**            **Behavior**
  ------------------ ------------------------- ---------------- -------------- -------------- ------------------ ----------------------------------------------------- ----------- ------------------------------- ----------------------- -------------------------
  P-MSG-008-01       Message preview           Read-only text   System         No             Selected message   First 100 characters                                  ---         Message participants            Message.message_text    Display only

  P-MSG-008-02       Sent time                 Timestamp        System         No             Send time          UTC storage; local display                            ---         Message participants            Message.sent_at         Display only

  P-MSG-008-03       Status timeline           Event list       System         No             Derived            Sent; Delivered; Read; Failed                         ---         Sender; recipient rules apply   Delivery log            Displays status history

  P-MSG-008-04       Status time               Timestamp        System         No             Event time         UTC storage; local display                            ---         Sender; recipient rules apply   Delivery log            Display only

  P-MSG-008-05       First-read time           Timestamp        System         No             First open time    Hidden from sender when recipient is in Safety Mode   ---         Message participants            Message.first_read_at   Display only

  P-MSG-008-06       Close                     Button           ---            ---            ---                ---                                                   ---         Message participants            ---                     Returns to thread
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- --------------------------------------------------------
  Empty                     Not applicable; detail opens only for existing message

  Loading                   Timeline skeleton

  Error                     Load failure with retry

  Success                   Status timeline displayed
  ----------------------------------------------------------------------------------

MSG-SCR-03 --- New message and reply

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-01, MSG-04
  -------------------------------------------------------------------------

![Figure MSG-SCR-03 --- New message and reply](media/81d2afa21f05e908a2826994eeb324073bbb81c6.png "Figure MSG-SCR-03 — New message and reply"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-03 --- New message and reply*

**Navigation**

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-19 Home; MSG-SCR-01 Thread list; MSG-SCR-02 Thread and message view; MSG-SCR-04 Drafts; MSG-SCR-12 AI coach
  ----------------------- --------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   MSG-SCR-01 Thread list; MSG-SCR-02 Thread and message view; MSG-SCR-12 AI coach; MSG-SCR-B01 AI rewrite; Main menu: any module

  --------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Start a new thread with the co-parent.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"New Thread\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Subject (P-MSG-002-01); Message (P-MSG-002-02); Character count (P-MSG-002-03).

-   Action area (primary action first, then secondary actions and links): Save draft (P-MSG-002-04); Send (P-MSG-002-05); Cancel (P-MSG-002-06).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**     **Default**   **Allowed values / validation**    **Error**                   **Visibility**       **Saved to**              **Behavior**
  ------------------ ------------------------- ------------------ -------------- ---------------- ------------- ---------------------------------- --------------------------- -------------------- ------------------------- -----------------------------------------------
  P-MSG-002-01       Subject                   Text input         Yes            Yes until sent   Blank         Required; 1--120 characters        ERR-03 if empty             Parent / Co-parent   Thread.subject            Becomes immutable thread subject

  P-MSG-002-02       Message                   Textarea           Yes            Yes until sent   Blank         Plain text; 1--10,000 characters   ERR-01 if over 10,000       Parent / Co-parent   Message.message_text      Becomes first message

  P-MSG-002-03       Character count           Helper text        ---            ---              0 / 10,000    Updates as user types              ---                         Parent / Co-parent   ---                       Display only

  P-MSG-002-04       Save draft                Secondary button   ---            ---              ---           ---                                ---                         Parent / Co-parent   Message.is_draft = true   Saves editable draft

  P-MSG-002-05       Send                      Primary button     ---            ---              ---           Requires subject and message       ERR-03 if subject missing   Parent / Co-parent   Message.sent_at           Runs tone check if enabled; sends message

  P-MSG-002-06       Cancel                    Secondary button   ---            ---              ---           ---                                ---                         Parent / Co-parent   ---                       Returns to thread list; prompts to save draft
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------------------------------------------------
  **State**              **Behavior**
  ---------------------- ------------------------------------------------------------------------------------------
  Empty                  Blank subject and message; Send disabled

  Loading                Send/Save disabled

  Error                  Missing subject: ERR-03; over-length message: ERR-01; send failure retains draft: ERR-02

  Success                Thread created; navigate to MSG-SCR-02 Thread and message view
  -----------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Add a reply to an existing thread.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Reply / Compose Message\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Thread subject (P-MSG-004-01).

-   Input area (form fields, in specification order): Message (P-MSG-004-02); Character count (P-MSG-004-03).

-   Action area (primary action first, then secondary actions and links): Save draft (P-MSG-004-04); Send (P-MSG-004-05); Cancel (P-MSG-004-06).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**     **Default**      **Allowed values / validation**    **Error**              **Visibility**        **Saved to**              **Behavior**
  ------------------ ------------------------- ------------------ -------------- ---------------- ---------------- ---------------------------------- ---------------------- --------------------- ------------------------- -----------------------------------------
  P-MSG-004-01       Thread subject            Read-only text     System         No               Thread subject   Cannot be changed in reply         ---                    Thread participants   Thread.subject            Display only

  P-MSG-004-02       Message                   Textarea           Yes            Yes until sent   Blank            Plain text; 1--10,000 characters   ERR-01 if over limit   Thread participants   Message.message_text      Creates reply

  P-MSG-004-03       Character count           Helper text        ---            ---              0 / 10,000       Updates as user types              ---                    Thread participants   ---                       Display only

  P-MSG-004-04       Save draft                Secondary button   ---            ---              ---              ---                                ---                    Thread participants   Message.is_draft = true   Saves editable draft

  P-MSG-004-05       Send                      Primary button     ---            ---              ---              Requires non-empty message         ERR-01 if over limit   Thread participants   Message.sent_at           Runs tone check if enabled; sends reply

  P-MSG-004-06       Cancel                    Secondary button   ---            ---              ---              ---                                ---                    Thread participants   ---                       Returns to thread; the draft is saved
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ---------------------------------------------------------
  Empty                    Blank composer; Send disabled

  Loading                  Send/Save disabled

  Error                    Over-length: ERR-01; send failure retains draft: ERR-02

  Success                  Reply appended to thread; recipient alerted
  ----------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show private AI tone feedback before sending.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Tone Check Modal\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): Concern phrases (P-MSG-005-01); Concern reason (P-MSG-005-02); AI notice (P-MSG-005-05); AI unavailable notice (P-MSG-005-06).

-   Action area (primary action first, then secondary actions and links): Edit message (P-MSG-005-03); Send anyway (P-MSG-005-04).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**          **Allowed values / validation**              **Error**   **Visibility**   **Saved to**          **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- -------------------- -------------------------------------------- ----------- ---------------- --------------------- ------------------------------------
  P-MSG-005-01       Concern phrases           Highlighted text     System         No             Derived from draft   Highlights concerning phrases                ---         Sender only      Not saved to record   Display only

  P-MSG-005-02       Concern reason            Text                 System         No             Derived              Short explanation                            ---         Sender only      Not saved to record   Display only

  P-MSG-005-03       Edit message              Primary button       ---            ---            ---                  ---                                          ---         Sender only      ---                   Returns to composer

  P-MSG-005-04       Send anyway               Secondary button     ---            ---            ---                  ---                                          ---         Sender only      Message.sent_at       Sends original message

  P-MSG-005-05       AI notice                 Informational text   ---            ---            ---                  Explains draft-only review and no training   ---         Sender only      ---                   Display only

  P-MSG-005-06       AI unavailable notice     Informational text   System         No             Derived              Shown when AI service unavailable            ---         Sender only      ---                   Message can still be sent; MSGT-03
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- ---------------------------------------------------
  Empty                   Not applicable; modal opens only after review

  Loading                 Review in progress; Send disabled

  Error                   AI unavailable: message remains sendable; MSGT-03

  Success                 Sender chooses Edit or Send anyway
  ---------------------------------------------------------------------------

Rules: Tone feedback is private to the sender, is never stored in the record, and never blocks sending.

MSG-SCR-04 --- Drafts

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-01
  -------------------------------------------------------------------------

![Figure MSG-SCR-04 --- Drafts](media/1bd5bcbe5e1e753523aceb9bdb6727ae7d6af27c.png "Figure MSG-SCR-04 — Drafts"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-04 --- Drafts*

**Navigation**

  ---------------------------------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-01 Thread list
  ----------------------- ---------------------------------------------------------------------------------
  **Where you go next**   MSG-SCR-01 Thread list; MSG-SCR-03 New message and reply; Main menu: any module

  ---------------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

MSG-SCR-05 --- AI settings

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-04, MSG-06
  -------------------------------------------------------------------------

![Figure MSG-SCR-05 --- AI settings](media/68762264ed8888dfb9ea6e92f1ea9e11719f48a1.png "Figure MSG-SCR-05 — AI settings"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-05 --- AI settings*

**Navigation**

  ----------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-20 Settings; MSG-SCR-06 Held message
  ----------------------- ----------------------------------------------------------------------------
  **Where you go next**   MSG-SCR-01 Thread list; SAF-SCR-10 AI and your data; Main menu: any module

  ----------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

MSG-SCR-06 --- Held message

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-06
  -------------------------------------------------------------------------

![Figure MSG-SCR-06 --- Held message](media/303dd84814aeac4cf6b1b0a5a752efc04a0a5a5c.png "Figure MSG-SCR-06 — Held message"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-06 --- Held message*

**Navigation**

  ----------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-02 Thread and message view; MSG-SCR-08 Search
  ----------------------- ----------------------------------------------------------------------------------------------------------------
  **Where you go next**   MSG-SCR-02 Thread and message view; MSG-SCR-05 AI settings; MSG-SCR-07 Report a message; Main menu: any module

  ----------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------------------------
  **Purpose**    Hold a hostile incoming message while preserving access to the original.
  -------------- --------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Shielded Message View\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Message time (P-MSG-006-02); Held notice (P-MSG-006-03); Original message (P-MSG-006-05); Shield level (P-MSG-006-06).

-   Input area (form fields, in specification order): Sender name (P-MSG-006-01); Hold reason (P-MSG-006-04).

-   Action area (primary action first, then secondary actions and links): Report incorrect hold (P-MSG-006-07).

-   Controls that must NOT be provided: Delete / block (P-MSG-006-08).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                       **Required**   **Editable**   **Default**      **Allowed values / validation**                **Error**   **Visibility**     **Saved to**             **Behavior**
  ------------------ ------------------------- ------------------------------ -------------- -------------- ---------------- ---------------------------------------------- ----------- ------------------ ------------------------ ----------------------------------------
  P-MSG-006-01       Sender name               Text                           System         No             Derived          Sender display name                            ---         Shield user only   Message.sender_user_id   Display only

  P-MSG-006-02       Message time              Timestamp                      System         No             Send time        UTC storage; local display                     ---         Shield user only   Message.sent_at          Display only

  P-MSG-006-03       Held notice               Badge / text                   System         No             "Message held"   Fixed label                                    ---         Shield user only   Shield state             Display only

  P-MSG-006-04       Hold reason               Text                           System         No             Derived          Reason for hold                                ---         Shield user only   Shield state             Display only

  P-MSG-006-05       Original message          Hidden text / reveal control   System         No             Hidden           Revealed on one tap                            ---         Shield user only   Message.message_text     Reveals original; sets first-read time

  P-MSG-006-06       Shield level              Read-only text                 System         No             User setting     Low; Medium; High                              ---         Shield user only   User shield setting      Display only

  P-MSG-006-07       Report incorrect hold     Button / link                  ---            ---            ---              Requires user consent before sharing message   ---         Shield user only   Hold-report record       Opens report/consent flow

  P-MSG-006-08       Delete / block            Not displayed                  ---            ---            ---              No delete or block control                     ---         No user            ---                      Shield never deletes or blocks
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ----------------------------------------------------------
  Empty                    Not applicable; view opens only for held message

  Loading                  Shielded-message skeleton

  Error                    Load failure with retry

  Success                  Held notice displayed; original available through reveal
  -----------------------------------------------------------------------------------

Rules: The shield holds and labels a message but never deletes, blocks, or changes it; the sender is not told that the message was held; the original and timestamps remain in the record.

MSG-SCR-07 --- Report a message

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-14
  -------------------------------------------------------------------------

![Figure MSG-SCR-07 --- Report a message](media/b2c998973cd26f1ae376d99a2a03f9102f1ce67f.png "Figure MSG-SCR-07 — Report a message"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure MSG-SCR-07 --- Report a message*

**Navigation**

  -------------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-02 Thread and message view; MSG-SCR-06 Held message
  ----------------------- -------------------------------------------------------------
  **Where you go next**   MSG-SCR-02 Thread and message view

  -------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Report a harassing or threatening message.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Report Message Modal\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Reported message preview (P-MSG-007-01).

-   Input area (form fields, in specification order): Report reason (P-MSG-007-02); Additional details (P-MSG-007-03); Share message with review team (P-MSG-007-04).

-   Action area (primary action first, then secondary actions and links): Submit report (P-MSG-007-05); Cancel (P-MSG-007-06).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**          **Type**           **Required**   **Editable**        **Default**        **Allowed values / validation**             **Error**              **Visibility**   **Saved to**                   **Behavior**
  ------------------ -------------------------------- ------------------ -------------- ------------------- ------------------ ------------------------------------------- ---------------------- ---------------- ------------------------------ ---------------------------------
  P-MSG-007-01       Reported message preview         Read-only text     System         No                  Selected message   First 100 characters                        ---                    Reporting user   Report reference               Display only

  P-MSG-007-02       Report reason                    Select / radio     Yes            Yes before submit   None               Threat; Harassment; Other                   Inline field message   Reporting user   MessageReport.reason           Required for submission

  P-MSG-007-03       Additional details               Textarea           No             Yes before submit   Blank              Required; 1--120 characters                 Inline field message   Reporting user   MessageReport.details          Optional context

  P-MSG-007-04       Share message with review team   Toggle             Conditional    Yes before submit   Off                Required consent to share message content   Inline field message   Reporting user   MessageReport.review_consent   Controls review-team access

  P-MSG-007-05       Submit report                    Primary button     ---            ---                 ---                ---                                         ---                    Reporting user   MessageReport.status           Creates report

  P-MSG-007-06       Cancel                           Secondary button   ---            ---                 ---                ---                                         ---                    Reporting user   ---                            Closes modal; no report created
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- -------------------------------------------------------------------
  Empty                   Message preview shown; reason unselected

  Loading                 Submit disabled

  Error                   Missing required reason or consent prevents submission

  Success                 Report submitted; confirmation shown; reporter returned to thread
  -------------------------------------------------------------------------------------------

MSG-SCR-08 --- Search

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-08
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-07
  -------------------------------------------------------------------------

![Figure MSG-SCR-08 --- Search](media/0c6c1e684ecb549c4d65af67cdde77b8dc71dc02.png "Figure MSG-SCR-08 — Search"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-08 --- Search*

**Navigation**

  ------------------------------------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-01 Thread list
  ----------------------- ------------------------------------------------------------------------------------
  **Where you go next**   MSG-SCR-02 Thread and message view; MSG-SCR-06 Held message; Main menu: any module

  ------------------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

MSG-SCR-09 --- Folders and topics

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-09
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-08
  -------------------------------------------------------------------------

![Figure MSG-SCR-09 --- Folders and topics](media/86909bad6734a288e5e9c75d5d719a85a16835b7.png "Figure MSG-SCR-09 — Folders and topics"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-09 --- Folders and topics*

**Navigation**

  -----------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-01 Thread list
  ----------------------- -----------------------------------------------------------
  **Where you go next**   MSG-SCR-02 Thread and message view; Main menu: any module

  -----------------------------------------------------------------------------------

The screen components are shown in the figure above.

MSG-SCR-10 --- Attachments

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-10
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-09
  -------------------------------------------------------------------------

![Figure MSG-SCR-10 --- Attachments](media/0e09b19498d17b6b02910ca42d8d1dad745cefcf.png "Figure MSG-SCR-10 — Attachments"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-10 --- Attachments*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-01 Thread list
  ----------------------- --------------------------------------------------------
  **Where you go next**   MSG-SCR-01 Thread list; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

MSG-SCR-11 --- Group thread members

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-11
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-10
  -------------------------------------------------------------------------

![Figure MSG-SCR-11 --- Group thread members](media/49aed90871fa45b343ebdeff449ab8361f223c0e.png "Figure MSG-SCR-11 — Group thread members"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-11 --- Group thread members*

**Navigation**

  -----------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-02 Thread and message view
  ----------------------- -----------------------------------------------------------
  **Where you go next**   MSG-SCR-02 Thread and message view; Main menu: any module

  -----------------------------------------------------------------------------------

The screen components are shown in the figure above.

MSG-SCR-12 --- AI coach

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-12
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-11
  -------------------------------------------------------------------------

![Figure MSG-SCR-12 --- AI coach](media/000d7609c59d52334cf089db802f061f5b62bd5b.png "Figure MSG-SCR-12 — AI coach"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-12 --- AI coach*

**Navigation**

  ---------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-03 New message and reply
  ----------------------- ---------------------------------------------------------
  **Where you go next**   MSG-SCR-03 New message and reply; Main menu: any module

  ---------------------------------------------------------------------------------

The screen components are shown in the figure above.

MSG-SCR-13 --- Mediation request

  -------------------------------------------------------------------------
  **Screen ID**    MSG-SCR-13
  ---------------- --------------------------------------------------------
  **Module**       Messaging

  **Feature(s)**   MSG-12
  -------------------------------------------------------------------------

![Figure MSG-SCR-13 --- Mediation request](media/81c28c1886eb75142b796349b184bdfee34bac02.png "Figure MSG-SCR-13 — Mediation request"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-13 --- Mediation request*

**Navigation**

  -----------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-02 Thread and message view
  ----------------------- -----------------------------------------------------------
  **Where you go next**   MSG-SCR-02 Thread and message view; Main menu: any module

  -----------------------------------------------------------------------------------

The screen components are shown in the figure above.

MSG-SCR-B01 --- AI rewrite

  ------------------------------------------------------------------------
  **Screen ID**   MSG-SCR-B01
  --------------- --------------------------------------------------------
  **Module**      Messaging

  ------------------------------------------------------------------------

![Figure MSG-SCR-B01 --- AI rewrite](media/147884d89d4d34d39ae45b7955451cc1e0404d64.png "Figure MSG-SCR-B01 — AI rewrite"){width="6.666666666666667in" height="5.0in"}

*Figure MSG-SCR-B01 --- AI rewrite*

**Navigation**

  -----------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-03 New message and reply
  ----------------------- -----------------------------------------------------------
  **Where you go next**   MSG-SCR-02 Thread and message view; Main menu: any module

  -----------------------------------------------------------------------------------

The screen components are shown in the figure above.

Cross-screen rules and pending screen decisions (Messaging)

Cross-screen Messaging rules

Pending screen decisions --- Messaging

5.7 Field-level specifications

2.1 Thread / Message --- MSG-SCR-01 Thread list--003 → MSG-SCR-01

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**        **Technical name**   **Type / control**   **Required**   **Editable**                              **Default**    **Allowed values / validation**                                        **Visibility**
  -------------- ---------------- -------------------- -------------------- -------------- ----------------------------------------- -------------- ---------------------------------------------------------------------- -----------------------
  FLD-MSG-001    Subject          subject              Text                 Yes            Thread subject immutable after creation   None           Required; ERR-03 if missing; replies retain subject                    Thread compose/detail

  FLD-MSG-002    Message          message_text         Textarea             Yes            Draft only; never after send              None           Plain text; maximum 10,000 characters; ERR-01 if longer                Compose/thread

  FLD-MSG-003    Sender           sender_user_id       System               System         No                                        Current user   User reference                                                         Thread

  FLD-MSG-004    Thread           thread_id            System               System         No                                        Generated      Thread reference                                                       Internal

  FLD-MSG-005    Sent at          sent_at              Timestamp            System         No                                        Send time      UTC; displayed local                                                   Thread/export

  FLD-MSG-006    First read at    first_read_at        Timestamp            System         No                                        None           Set when recipient opens message; held message sets on original open   Thread/export

  FLD-MSG-007    Message status   status               Display              System         No                                        Sent           Sent, Delivered, Read, Failed                                          Thread

  FLD-MSG-008    Draft flag       is_draft             Boolean              System         Yes until sent                            true           true/false                                                             Compose
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.2 Tone Check --- MSG-SCR-03 New message and reply → MSG-SCR-03

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**              **Technical name**   **Type / control**   **Required**   **Editable**   **Default**   **Allowed values / validation**   **Visibility**
  -------------- ---------------------- -------------------- -------------------- -------------- -------------- ------------- --------------------------------- ---------------------
  FLD-MSG-020    Tone check enabled     tone_check_enabled   Toggle               Yes            Yes            Off           Requires AI notice consent        Privacy/AI settings

  FLD-MSG-021    Tone concern phrases   tone_flags           Display              System         No             None          Highlighted draft phrases         Sender-only modal

  FLD-MSG-022    Tone reason            tone_reason          Display              System         No             None          Short explanation                 Sender-only modal

  FLD-MSG-023    Send anyway            send_anyway          Button               No             Yes            None          Sends despite concern             Sender-only modal
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.3 Incoming Shield --- MSG-SCR-06 Held message / MSG-SCR-05 AI settings → MSG-SCR-05, MSG-SCR-06

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**               **Technical name**   **Type / control**   **Required**   **Editable**   **Default**           **Allowed values / validation**                **Visibility**
  -------------- ----------------------- -------------------- -------------------- -------------- -------------- --------------------- ---------------------------------------------- --------------------------
  FLD-MSG-030    Shield enabled          shield_enabled       Toggle               Yes            Yes            Off                   Requires AI notice consent                     Privacy settings

  FLD-MSG-031    Shield level            shield_level         Select               Conditional    Yes            Medium when enabled   Low, Medium, High                              Privacy settings

  FLD-MSG-032    Held indicator          is_held              Display              System         No             false                 true when message crosses threshold            Recipient thread

  FLD-MSG-033    Hold reason             hold_reason          Display              System         No             None                  Reason for hold                                Recipient only

  FLD-MSG-034    Original message        original_text        Display              System         No             Message text          Revealed on tap; unchanged in record/export    Recipient only after tap

  FLD-MSG-035    Incorrect-hold report   hold_report          Action / record      No             Create only    None                  User consent required for review-team access   Shielded item
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2.4 Message Report --- MSG-SCR-07 Report a message → MSG-SCR-07

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**          **Technical name**    **Type / control**   **Required**   **Editable**        **Default**        **Allowed values / validation**              **Visibility**
  -------------- ------------------ --------------------- -------------------- -------------- ------------------- ------------------ -------------------------------------------- ------------------------
  FLD-MSG-040    Reported message   reported_message_id   System               Yes            No                  Selected message   Message reference                            Report modal

  FLD-MSG-041    Report reason      report_reason         Select / text        Yes            No after submit     None               Not specified --- confirmation required      Report modal

  FLD-MSG-042    Review consent     review_consent        Toggle               Conditional    Yes before submit   Off                Required to share message with review team   Report modal

  FLD-MSG-043    Report status      report_status         Display              System         No                  Submitted          Not specified --- confirmation required      Reporter / Lead review
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

5.8 User actions and procedures

ACT-MSG-001 --- Start Message Thread

  ---------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent in linked household
  --------------------- -----------------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-03 New message and reply

  **Objective**         Begin a child-related conversation

  **Trigger**           User submits subject and message

  **Preconditions**     Household mode Linked; user passed 2FA

  **System behavior**   Create thread and first message; notify recipient through Notifications; list thread with latest message first.

  **Data created**      Thread, message, notification/delivery log

  **Validations**       Subject required; message plain text up to 10,000 characters.

  **Success**           MSG-SCR-02 Thread and message view

  **Negative**          Missing subject: ERR-03; over-limit message: ERR-01.

  **Error recovery**    Send failure retains message as draft and shows ERR-02.

  **Permissions**       Parent/Co-parent create and read; nobody may update/delete sent messages.

  **Source**            MSG-01; FR-MSG-01-01--FR-MSG-01-13.

  **Screen(s)**         MSG-SCR-03 New message and reply
  ---------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-03 New message and reply (entry: MSG-SCR-01 Thread list).

2.  Make sure the preconditions are met: Household mode Linked; user passed 2FA.

3.  Enter or select the required information: Subject; Message.

4.  Perform the action: User submits subject and message.

5.  The system validates: Subject required; message plain text up to 10,000 characters.

6.  The system processes the action: Create thread and first message; notify recipient through Notifications; list thread with latest message first.

7.  Result on success: MSG-SCR-02 Thread and message view.

8.  If it fails or a rule is not met: Missing subject: ERR-03; over-limit message: ERR-01.

9.  To recover: Send failure retains message as draft and shows ERR-02.

ACT-MSG-002 --- Reply in Thread

  ---------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- -----------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-02 Thread and message view

  **Objective**         Continue an existing conversation

  **Trigger**           User sends reply

  **Preconditions**     User is thread participant; household linked

  **System behavior**   Append reply to same thread and subject; notify recipient; preserve chronological order oldest to newest.

  **Data created**      Message, delivery log

  **Validations**       Same subject/message rules as ACT-MSG-001.

  **Success**           Reply displayed in thread

  **Negative**          Send failure retains draft and shows ERR-02.

  **Permissions**       Thread participants

  **Source**            MSG-01; FR-MSG-01-02, FR-MSG-01-05--FR-MSG-01-07.

  **Screen(s)**         MSG-SCR-02 Thread and message view, with the status of each message
  ---------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-02 Thread and message view, with the status of each message (entry: MSG-SCR-01 Thread list; notification deep link).

2.  Make sure the preconditions are met: User is thread participant; household linked.

3.  Perform the action: User sends reply.

4.  The system validates: Same subject/message rules as ACT-MSG-001.

5.  The system processes the action: Append reply to same thread and subject; notify recipient; preserve chronological order oldest to newest.

6.  Result on success: Reply displayed in thread.

7.  If it fails or a rule is not met: Send failure retains draft and shows ERR-02.

ACT-MSG-003 --- Save, Edit, or Delete Draft

  ------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**                          Parent or Co-parent
  ---------------------------------- -------------------------------------------------------------------------------------------------------
  **Screen**                         MSG-SCR-02 Thread and message view / MSG-SCR-03 New message and reply

  **Objective**                      Preserve an unsent message

  **Trigger**                        User saves, edits, or deletes a draft

  **Preconditions**                  Draft not sent

  **System behavior**                Save draft; allow edit/delete before sending; no recipient notification occurs.

  **Data created/updated/deleted**   Draft

  **Success**                        Draft saved, updated, or removed

  **Negative**                       Draft rules do not apply after send; sent messages become immutable.

  **Permissions**                    Draft owner

  **Source**                         MSG-01; FR-MSG-01-04.

  **Screen(s)**                      MSG-SCR-02 Thread and message view, with the status of each message, MSG-SCR-03 New message and reply
  ------------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-02 Thread and message view, with the status of each message, MSG-SCR-03 New message and reply (entry: MSG-SCR-01 Thread list; notification deep link).

2.  Make sure the preconditions are met: Draft not sent.

3.  Enter or select the required information: Subject; Message.

4.  Perform the action: User saves, edits, or deletes a draft.

5.  The system processes the action: Save draft; allow edit/delete before sending; no recipient notification occurs.

6.  Result on success: Draft saved, updated, or removed.

7.  If it fails or a rule is not met: Draft rules do not apply after send; sent messages become immutable.

ACT-MSG-004 --- Send Message

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-02 Thread and message view / MSG-SCR-03 New message and reply

  **Objective**         Deliver a message

  **Trigger**           User selects Send

  **Preconditions**     Subject and message valid; user is participant

  **System behavior**   If tone check is enabled, run private tone review first; otherwise send immediately. Create immutable message; notify recipient; record sent time in UTC.

  **Data created**      Message, delivery/read status entries, notification

  **Success**           Message appears in thread; recipient notified

  **Alternative**       Tone concern shows highlighted phrases, reason, Edit, and Send anyway; user may still send.

  **Negative**          Missing subject: ERR-03; length violation: ERR-01; send failure preserves draft and shows ERR-02.

  **Permissions**       Thread participant

  **Source**            MSG-01--MSG-04; FR-MSG-01-05, FR-MSG-04-01--FR-MSG-04-09.

  **Screen(s)**         MSG-SCR-02 Thread and message view, with the status of each message, MSG-SCR-03 New message and reply
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-02 Thread and message view, with the status of each message, MSG-SCR-03 New message and reply (entry: MSG-SCR-01 Thread list; notification deep link).

2.  Make sure the preconditions are met: Subject and message valid; user is participant.

3.  Enter or select the required information: Subject; Message.

4.  Perform the action: User selects Send.

5.  The system processes the action: If tone check is enabled, run private tone review first; otherwise send immediately. Create immutable message; notify recipient; record sent time in UTC.

6.  Result on success: Message appears in thread; recipient notified.

7.  If it fails or a rule is not met: Tone concern shows highlighted phrases, reason, Edit, and Send anyway; user may still send.

ACT-MSG-005 --- Run Tone Check

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Message sender
  --------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-03 New message and reply

  **Objective**         Receive private feedback before sending

  **Trigger**           Sender with tone check enabled selects Send

  **Preconditions**     Tone check enabled through explicit consent; draft is English

  **System behavior**   Review draft only; highlight concerning phrases; show short reason; offer Edit or Send anyway; never block sending; feedback is private and excluded from record/export.

  **Data processed**    Draft text sent to AI service only during review

  **Success**           Feedback modal shown

  **Alternative**       AI unavailable: message can still be sent; MSGT-03 shown.

  **Negative**          Recipient never sees tone feedback; received messages are not scanned.

  **Permissions**       Sender only

  **Source**            MSG-04; FR-MSG-04-01--FR-MSG-04-09.

  **Screen(s)**         MSG-SCR-03 New message and reply
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-03 New message and reply (entry: MSG-SCR-01 Thread list).

2.  Make sure the preconditions are met: Tone check enabled through explicit consent; draft is English.

3.  Enter or select the required information: Subject; Message.

4.  Perform the action: Sender with tone check enabled selects Send.

5.  The system processes the action: Review draft only; highlight concerning phrases; show short reason; offer Edit or Send anyway; never block sending; feedback is private and excluded from record/export.

6.  Result on success: Feedback modal shown.

7.  If it fails or a rule is not met: AI unavailable: message can still be sent; MSGT-03 shown.

ACT-MSG-006 --- View Original Shielded Message

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Message recipient
  --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-06 Held message

  **Objective**         Read a held message when ready

  **Trigger**           Recipient taps shielded message

  **Preconditions**     Incoming shield enabled; message crossed selected threshold

  **System behavior**   Display sender name, time, "Message held," and reason without text; one tap reveals original; original remains unchanged in thread/export; sender is not told the message was held.

  **Data updated**      First-read time set when original is opened; no change to message content

  **Success**           Original message displayed

  **Alternative**       Shield level determines what is held: Low threats/abuse; Medium adds insults/personal attacks; High adds blame, sarcasm, pressure.

  **Negative**          AI unavailable: messages display normally with MSGT-05.

  **Permissions**       Recipient only

  **Source**            MSG-06; FR-MSG-06-01--FR-MSG-06-13.

  **Screen(s)**         MSG-SCR-06 Held message
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-06 Held message (entry: MSG-SCR-03 New message and reply held-message indicator).

2.  Make sure the preconditions are met: Incoming shield enabled; message crossed selected threshold.

3.  Perform the action: Recipient taps shielded message.

4.  The system processes the action: Display sender name, time, "Message held," and reason without text; one tap reveals original; original remains unchanged in thread/export; sender is not told the message was held.

5.  Result on success: Original message displayed.

6.  If it fails or a rule is not met: Shield level determines what is held: Low threats/abuse; Medium adds insults/personal attacks; High adds blame, sarcasm, pressure.

ACT-MSG-007 --- Configure Incoming Shield

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- ------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-05 AI settings

  **Objective**         Control how hostile messages are presented

  **Trigger**           User changes shield setting

  **Preconditions**     User signed in; AI disclosure accepted before enabling

  **System behavior**   Shield defaults off; when enabled, default level is Medium; user may select Low/Medium/High; setting applies to co-parent and non-app replies.

  **Data updated**      User shield setting; consent record; audit log

  **Success**           Setting saved

  **Negative**          User must acknowledge AI notice before enabling; AI failure does not delete or alter messages.

  **Permissions**       User only

  **Source**            MSG-06; FR-MSG-06-01--FR-MSG-06-03, FR-MSG-06-13.

  **Screen(s)**         MSG-SCR-05 AI settings (tone check, shield and level)
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-05 AI settings (tone check, shield and level).

2.  Make sure the preconditions are met: User signed in; AI disclosure accepted before enabling.

3.  Perform the action: User changes shield setting.

4.  The system processes the action: Shield defaults off; when enabled, default level is Medium; user may select Low/Medium/High; setting applies to co-parent and non-app replies.

5.  Result on success: Setting saved.

6.  If it fails or a rule is not met: User must acknowledge AI notice before enabling; AI failure does not delete or alter messages.

ACT-MSG-008 --- Report Message

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-07 Report a message

  **Objective**         Flag harassing or threatening content

  **Trigger**           User submits report

  **Preconditions**     User can view the message

  **System behavior**   Create report; make reporting available to every user; where user consents, share the one reported message with the review team for shield-error tracking; do not expose the full thread.

  **Data created**      Message report; optional consent record; audit log

  **Success**           Report confirmation

  **Alternative**       User may report an incorrect shield hold.

  **Negative**          Report failure preserves message and allows retry.

  **Permissions**       Message recipient/viewer

  **Screen(s)**         MSG-SCR-07 Report a message
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-07 Report a message (entry: Row action on any received message in MSG-SCR-03 New message and reply).

2.  Make sure the preconditions are met: User can view the message.

3.  Enter or select the required information: Report reason.

4.  Perform the action: User submits report.

5.  The system processes the action: Create report; make reporting available to every user; where user consents, share the one reported message with the review team for shield-error tracking; do not expose the full thread.

6.  Result on success: Report confirmation.

7.  If it fails or a rule is not met: User may report an incorrect shield hold.

ACT-MSG-009 --- View Message Status

  -----------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Message sender
  --------------------- -------------------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-02 Thread and message view

  **Objective**         See delivery/read evidence

  **Trigger**           Sender opens thread/message

  **Preconditions**     Message sent

  **System behavior**   Show Sent, Delivered, Read, or Failed with UTC timestamps displayed in local time; status history is append-only.

  **Data viewed**       Message status/delivery log

  **Success**           Status timeline displayed

  **Alternative**       Non-app co-parent messages show Sent, Delivered, or Failed, never Read.

  **Negative**          Safety Mode recipient: sender sees Sent/Delivered but not Read.

  **Permissions**       Sender; recipient sees own read state

  **Source**            MSG-03; NTF-02.

  **Screen(s)**         MSG-SCR-02 Thread and message view, with the status of each message
  -----------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-02 Thread and message view, with the status of each message (entry: MSG-SCR-01 Thread list; notification deep link).

2.  Make sure the preconditions are met: Message sent.

3.  Perform the action: Sender opens thread/message.

4.  The system processes the action: Show Sent, Delivered, Read, or Failed with UTC timestamps displayed in local time; status history is append-only.

5.  Result on success: Status timeline displayed.

6.  If it fails or a rule is not met: Non-app co-parent messages show Sent, Delivered, or Failed, never Read.

ACT-MSG-010 --- View Non-App Exchange in Messaging

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent
  --------------------- --------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-02 Thread and message view

  **Objective**         See texts/emails to a non-app co-parent in the message record

  **Trigger**           Parent opens relevant thread

  **Preconditions**     ACC-04 exchange exists

  **System behavior**   Display outbound messages and inbound text/email replies in the same thread with timestamps; apply shield to inbound replies when enabled.

  **Data viewed**       Exchange messages and delivery statuses

  **Success**           Unified exchange displayed

  **Negative**          Delivery failure remains visible as Failed; no read status is shown.

  **Permissions**       Parent; support staff excluded.

  **Source**            MSG-01; FR-MSG-01-09, FR-MSG-01-10; ACC-04.

  **Screen(s)**         MSG-SCR-02 Thread and message view, with the status of each message
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-02 Thread and message view, with the status of each message (entry: MSG-SCR-01 Thread list; notification deep link).

2.  Make sure the preconditions are met: ACC-04 exchange exists.

3.  Perform the action: Parent opens relevant thread.

4.  The system processes the action: Display outbound messages and inbound text/email replies in the same thread with timestamps; apply shield to inbound replies when enabled.

5.  Result on success: Unified exchange displayed.

6.  If it fails or a rule is not met: Delivery failure remains visible as Failed; no read status is shown.

5.9 Business rules and validations

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Rule**                                                                                                                            **Features**
  -------------- ----------------------------------------------------------------------------------------------------------------------------------- ----------------
  BR-09          Tone feedback is shown only to the sender.                                                                                          MSG-04

  BR-10          A held-back incoming message can be opened by the user. The reason it was flagged is shown, and the original stays in the record.   MSG-06
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- -----------------------------------------------------------------------------------------------------------------------------------
  BR-05      Data export, tone, safety and reporting tools are available to every user.

  BR-07      Sent, delivered and read status is saved in the record.

  BR-08      A sent message cannot be edited or deleted.

  BR-09      Tone feedback is shown only to the sender.

  BR-10      A held-back incoming message can be opened by the user. The reason it was flagged is shown, and the original stays in the record.

  BR-11      AI is opt-in. The app does not train on user messages. AI suggestions never enter the legal record.

  BR-21      Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.
  ----------------------------------------------------------------------------------------------------------------------------------------------

5.10 Messages and errors

Errors

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **When it shows**                                                               **Text**                                                                    **Used by**
  ---------- ------------------------------------------------------------------------------- --------------------------------------------------------------------------- --------------------------------------------------------
  ERR-01     A message is longer than 10,000 characters                                      Your message is too long. Keep it under 10,000 characters.                  FR-MSG-01-03

  ERR-02     A message cannot be sent                                                        We could not send your message. It is saved as a draft. Please try again.   FR-MSG-01-12

  ERR-03     A message has no subject                                                        Enter a subject for this message.                                           FR-MSG-01-13

  ERR-04     Someone tries to edit, delete or un-send a sent message                         A sent message cannot be changed or deleted.                                FR-MSG-02-06

  ERR-05     A search fails                                                                  We could not run your search. Please try again.                             FR-MSG-07-07

  ERR-06     A setting, a topic, a report, a member or a mediation request cannot be saved   We could not save your change. Nothing was changed. Please try again.       FR-MSG-08-07, FR-MSG-10-09, FR-MSG-12-09, FR-MSG-14-09

  ERR-07     A message has more than 5 files or more than 25 MB                              Send up to 5 files, 25 MB in all.                                           FR-MSG-09-09

  ERR-08     A file has a type that is not allowed                                           This file type is not allowed. Use JPG, PNG, PDF or DOCX.                   FR-MSG-09-02

  ERR-09     A file fails the malware scan                                                   We could not send this file because it did not pass our safety check.       FR-MSG-09-03

  ERR-10     A household is over the storage limit                                           You are over the storage limit. You can still read and export your files.   FR-MSG-09-06

  ERR-11     A folder name or a report note is too long                                      That is too long. Use up to the number of characters shown.                 FR-MSG-08-01, FR-MSG-14-01
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **When it shows**                          **Text**                                                                                                                    **Feature**
  ----------- ------------------------------------------ --------------------------------------------------------------------------------------------------------------------------- ----------------------------------------
  MSGT-01     A draft is saved                           Your draft was saved.                                                                                                       MSG-01

  MSGT-02     The tone check finds a concern             This message may sound hostile. You can edit it or send it as it is.                                                        MSG-04

  MSGT-03     The tone check is not available            The tone check is not available now. You can still send your message.                                                       MSG-04

  MSGT-04     A message is held                          Message held from \[name\] at \[time\]. Reason: \[reason\]. Tap to read it.                                                 MSG-06

  MSGT-05     The shield is not available                The message shield is not available now. Messages show as they are.                                                         MSG-06

  MSGT-06     A report is saved                          Your report was saved. The other parent is not told.                                                                        MSG-14

  MSGT-07     A report in the category Threat is saved   If you are in danger, call 911. \[Help and support links approved by advocates.\]                                           MSG-14

  MSGT-08     A search has no result                     No messages match your search.                                                                                              MSG-07

  MSGT-09     A user turns on an AI feature              The AI reads \[what it reads\]. It does not use your messages for training. What it suggests is not saved in your record.   MSG-04, MSG-05, MSG-06, MSG-11, MSG-13

  MSGT-10     AI rewrite is not available                The AI rewrite is not available now. Your draft is unchanged.                                                               MSG-05

  MSGT-11     The coach opens                            The AI coach is not a lawyer or a therapist and does not give legal advice.                                                 MSG-11

  MSGT-12     An urgent label shows                      Marked urgent. May be urgent.                                                                                               MSG-13

  MSGT-13     Only one parent agrees to mediation        Both parents must agree before mediation starts.                                                                            MSG-12

  MSGT-14     A sensitive image is hidden                Image hidden. Tap to view.                                                                                                  MSG-09

  MSGT-15     The coach is not available                 The AI coach is not available now. Please try again later.                                                                  MSG-11
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

5.11 Dependencies

  -------------------------------------------------------------------------------------------------
  **Module**                    **What it needs from Messaging**
  ----------------------------- -------------------------------------------------------------------
  Notifications                 Message events for alerts and status

  Records and Court             Messages for the court-ready record

  Safety and Privacy            The AI features and the messages that Safety Mode controls

  Calendar and Parenting Time   Messages to talk about a schedule change request (no data passes)
  -------------------------------------------------------------------------------------------------

12.3 Assumptions

-   The vendor pages named in section 15 describe the apps on October 12, 2026 and can change.

5.12 End-to-end workflows and scenarios

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                                             **Module path**                 **Features / rules**
  -------------- --------------------------------------------------------------------------------------------------------------------------- ------------------------------- --------------------------------------
  WF-04          Reach a co-parent who is not on the app by text/email; replies appended; every attempt logged before send                   ACC → NTF → MSG → REC           ACC-04, ACC-05, NTF-06

  WF-05          Compose and send a message with optional tone check; delivery escalation push → SMS (15 min) → email (1 h); status logged   MSG → SAF → NTF → REC           MSG-01--04, NTF-01, NTF-02

  WF-06          Receive a hostile message: shield holds it, reason shown, user views original, may report it                                MSG → SAF → SUP                 MSG-06, MSG-14, BR-10

  WF-13          Journal notes; data export (PDF/CSV, free); certified export with Record ID; public verification                            REC ← MSG/CAL/EXP/DOC/NTF/ACC   REC-01, REC-05, REC-07, BR-05, BR-20

  WF-14          Turn Safety Mode on (notice + confirm), effects across modules, Exit Now, turn off with one-time code                       SAF → MSG/CAL/DOC/NTF/PLT/SUP   SAF-01, BR-22

  WF-15          Alert-preview level, sensitive images, AI consent and AI use log                                                            SAF → NTF → MSG                 SAF-02, SAF-03, BR-11

  WF-22          Place / receive an in-app call, recording only with both parties' consent, call log, recordings and transcripts             CLL → MSG → REC                 CLL-01--03
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Scenario**   **Scenario**                                                         **Expected behaviour**
  -------------- -------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  SCN-MSG-001    Sender enables tone check, writes hostile draft, chooses Send        Tone modal highlights concern and offers Edit/Send anyway; sender may send; feedback is not visible to recipient or saved in record.

  SCN-MSG-002    Recipient enables Medium shield; co-parent sends insulting message   Message is held, text hidden, reason shown; recipient can view original; original remains unchanged and exportable; sender is not notified of the hold.

  SCN-MSG-003    Recipient in Safety Mode reads a message                             Sender sees Sent and Delivered but not Read; alerts contain no sender name or message text.

  SCN-MSG-004    User reports a threatening message                                   Report is created available to every user; with consent, only that message is available to Lead-level review for shield-error tracking; support staff otherwise cannot read the thread.

  SCN-MSG-005    Message send fails because of a system error                         Message remains a draft; ERR-02 shown; no recipient notification; user can retry.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
