# Notifications (NTF)


4.1 Module overview

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------
  Purpose                 Make sure a parent actually sees what matters. Missed alerts were repeated complaints, and a missed message can have real consequences.

  Users                   Parent, co-parent

  Pain points addressed   P05, P22

  Features                5 (3 Must-have, 2 Good-to-have, 0 Unique)

  Depends on              Messaging, Calendar and Parenting Time, Child Support Sync (hearing and due-date reminders), Safety and Privacy (discreet notifications).
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Alerts that start as push and move to SMS and email when a message stays unread.

-   Sent, deliver and read status on every message, saved in the record.

-   A health check-in settings that tells the user whether alerts can reach them.

-   Reminders for events, hearings and due dates, sent to both parents.

-   Quiet windows and limits on the number of alerts, as a later addition.

Purpose and scope

2.1 Purpose. This module makes sure a parent actually sees what matters. Missed alerts were a repeated complaint about existing apps, and a missed message can have real consequences.

  --------------------------------------------------------------------------------------------
  **ID**              **How this module supports it**
  ------------------- ------------------------------------------------------------------------
  OBJ-01              The delivery log is part of the court-ready record (NTF-02).

  OBJ-02              Reminders for hearings and due dates from the agency record (NTF-04).

  OBJ-03              Fixes the High-rated pain points P05 and P22 (NTF-01, NTF-02, NTF-04).

  OBJ-05              Alerts for a user in Safety Mode carry no preview text (BR-22).
  --------------------------------------------------------------------------------------------

4.2 Roles and permissions

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**                                             **What they do in this module**
  ---------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------
  Parent                                               Gets alerts and reminders, sees the status of messages, sets the SMS and email wait times and runs the health check. Also sets quiet windows and limits.

  Co-parent                                            The same as the Parent, once linked.

  Co-parent who is not on the app                      Gets texts and emails through the send service (NTF-06). Has no account.

  Support staff, Third party, Child and Professional   No feature in this module.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4.3 Business requirements

  --------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Business requirement**                                                                                           **Features**
  --------------- ------------------------------------------------------------------------------------------------------------------ ---------------
  BREQ-01         A parent is alerted by push, then by SMS and email if a message stays unread.                                      NTF-01

  BREQ-02         A parent sees the sent, delivered and read status of every message, and the status is saved in the record.         NTF-02

  BREQ-03         A parent can check whether alerts can reach them.                                                                  NTF-03

  BREQ-04         Parents are reminded of events, hearings and due dates.                                                            NTF-04

  BREQ-05         A parent can set quiet windows and limits on the number of alerts.                                                 NTF-05

  BREQ-06         Codes, links, invites and messages sent by text or email reach people, and the sending module learns the result.   NTF-06
  --------------------------------------------------------------------------------------------------------------------------------------------------

4.4 Features

  ----------------------------------------------------------------------------------------------------------------------
  **Feature**   **Name**                                                                   **Type**
  ------------- -------------------------------------------------------------------------- -----------------------------
  NTF-01        Multi-channel alerts: push, then SMS and email if a message stays unread   Must-have → Must-have

  NTF-02        Delivery and read status on every message, logged in the record            Must-have → Must-have

  NTF-03        Notification health check in settings                                      Good-to-have → Good-to-have

  NTF-04        Event and deadline reminders                                               Must-have → Must-have

  NTF-05        Notification quiet windows or limits                                       Good-to-have → Good-to-have

  NTF-06        Send service for account, invite and payment messages                      --- → Must-have
  ----------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**         **Screens**
  ------------------ --------------------- ---------------------------------------------------------------------
  NTF-SUB-01         Message alerts        Notification preferences; alert preview controls linkage

  NTF-SUB-02         Delivery evidence     Message status display; delivery log view

  NTF-SUB-03         Reminders             Reminder preferences; reminder display

  NTF-SUB-04         Send service          System service; no direct parent-facing screen except status/errors

  NTF-SUB-05         Notification health   Health-check screen; test-alert action

  NTF-SUB-06         Quiet controls        Quiet windows; daily limits
  --------------------------------------------------------------------------------------------------------------

4.5 Screen inventory

  -------------------------------------------------------------------------------------------------
  **Screen ID**   **Screen**                                                         **Feature**
  --------------- ------------------------------------------------------------------ --------------
  NTF-SCR-01      Notification settings (wait times and reminder times)              NTF-01

  NTF-SCR-02      Notification health check                                          NTF-03

  NTF-SCR-03      Message status display, shown on the message screen in Messaging   NTF-02

  NTF-SCR-04      Quiet windows and limits                                           NTF-05

  NTF-SCR-B01     Message Alert (system output)                                      ---

  NTF-SCR-B02     Reminder Alert (system output)                                     ---

  NTF-SCR-B03     Delivery Log                                                       ---

  NTF-SCR-B04     System Send Status                                                 ---
  -------------------------------------------------------------------------------------------------

4.6 Screen specifications

NTF-SCR-01 --- Notification settings

  -------------------------------------------------------------------------
  **Screen ID**    NTF-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Notifications

  **Feature(s)**   NTF-01
  -------------------------------------------------------------------------

![Figure NTF-SCR-01 --- Notification settings](media/8ab1867e8e38a7be484fa9b6c45058657675c74e.png "Figure NTF-SCR-01 — Notification settings"){width="6.666666666666667in" height="5.177083333333333in"}

*Figure NTF-SCR-01 --- Notification settings*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-20 Settings; NTF-SCR-04 Quiet windows and limits
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   NTF-SCR-02 Notification health check; NTF-SCR-04 Quiet windows and limits; SAF-SCR-07 Alerts and images settings; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  --------------------------------------------------------------------------
  **Purpose**    Let the user control alert wait times and reminder times.
  -------------- -----------------------------------------------------------

  --------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Notification Settings\", global navigation and Exit now control as set out in section 2.2.

-   Input area (form fields, in specification order): SMS wait time (P-NTF-001-01); Email wait time (P-NTF-001-02); Event reminder time (P-NTF-001-03); Hearing/deadline reminder time (P-NTF-001-04); Agency due-date reminder time (P-NTF-001-05); Safety Mode notice (P-NTF-001-08).

-   Action area (primary action first, then secondary actions and links): Save (P-NTF-001-06); Cancel (P-NTF-001-07); Preview setting link (P-NTF-001-09).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**          **Type**                         **Required**   **Editable**   **Default**               **Allowed values / validation**                                                                                                        **Error**              **Visibility**     **Saved to**                  **Behavior**
  ------------------ -------------------------------- -------------------------------- -------------- -------------- ------------------------- -------------------------------------------------------------------------------------------------------------------------------------- ---------------------- ------------------ ----------------------------- ----------------------------------------------------
  P-NTF-001-01       SMS wait time                    Duration select / input          Yes            Yes            15 minutes                15 minutes to 24 hours                                                                                                                 ERR-04 outside range   User               User.sms_wait_time            Applies to future unread messages

  P-NTF-001-02       Email wait time                  Duration select / input          Yes            Yes            1 hour                    15 minutes to 24 hours                                                                                                                 ERR-04 outside range   User               User.email_wait_time          Applies to future unread messages

  P-NTF-001-03       Event reminder time              Duration select / multi-select   Yes            Yes            1 day and 1 hour before   User-changeable. Defaults: 1 day and 1 hour before an event; 7 days and 1 day before a hearing or deadline; 3 days before a due date   Inline field message   User               User.event_reminder_times     Applies to future event reminders

  P-NTF-001-04       Hearing/deadline reminder time   Duration select / multi-select   Yes            Yes            7 days and 1 day before   User-changeable. Defaults: 1 day and 1 hour before an event; 7 days and 1 day before a hearing or deadline; 3 days before a due date   Inline field message   User               User.hearing_reminder_times   Applies to future hearings/deadlines

  P-NTF-001-05       Agency due-date reminder time    Duration select                  Yes            Yes            3 days before             User-changeable. Defaults: 1 day and 1 hour before an event; 7 days and 1 day before a hearing or deadline; 3 days before a due date   Inline field message   Linking parent     User.due_date_reminder_time   Applies to future agency due dates

  P-NTF-001-06       Save                             Primary button                   ---            ---            ---                       ---                                                                                                                                    ---                    User               User notification settings    Saves changes

  P-NTF-001-07       Cancel                           Secondary button                 ---            ---            ---                       ---                                                                                                                                    ---                    User               ---                           Discards changes

  P-NTF-001-08       Safety Mode notice               Informational text               System         No             Derived                   Shown when Safety Mode is on                                                                                                           ---                    Safety Mode user   ---                           Explains locked Hidden previews

  P-NTF-001-09       Preview setting link             Text link                        ---            ---            ---                       ---                                                                                                                                    ---                    User               ---                           Opens Safety SAF-SCR-07 Alerts and images settings
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- --------------------------------------------------------------
  Empty                     Defaults displayed

  Loading                   Save disabled

  Error                     Invalid wait time: ERR-04; save failure retains prior values

  Success                   Settings saved; confirmation shown
  ----------------------------------------------------------------------------------------

NTF-SCR-02 --- Notification health check

  -------------------------------------------------------------------------
  **Screen ID**    NTF-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Notifications

  **Feature(s)**   NTF-03
  -------------------------------------------------------------------------

![Figure NTF-SCR-02 --- Notification health check](media/6bc60215e34a221e61f5950549b71c08e6c702ba.png "Figure NTF-SCR-02 — Notification health check"){width="6.666666666666667in" height="5.0in"}

*Figure NTF-SCR-02 --- Notification health check*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    NTF-SCR-01 Notification settings
  ----------------------- --------------------------------------------------------
  **Where you go next**   ACC-SCR-16 Profile; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

NTF-SCR-03 --- Message status

  -------------------------------------------------------------------------
  **Screen ID**    NTF-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Notifications

  **Feature(s)**   NTF-02
  -------------------------------------------------------------------------

![Figure NTF-SCR-03 --- Message status](media/befcecf1151552f933b49633b1dad9edad0ef0e2.png "Figure NTF-SCR-03 — Message status"){width="6.666666666666667in" height="5.0in"}

*Figure NTF-SCR-03 --- Message status*

**Navigation**

  --------------------------------------------------------------------------------------
  **How you get here**    MSG-SCR-02 Thread and message view; NTF-SCR-B03 Delivery log
  ----------------------- --------------------------------------------------------------
  **Where you go next**   NTF-SCR-B03 Delivery log; Main menu: any module

  --------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show delivery and read status on a message.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Message Status Display\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Message status (P-NTF-003-01); Status time (P-NTF-003-02); Status timeline (P-NTF-003-03); First-read time (P-NTF-003-04); Failure notice (P-NTF-003-05); Non-app recipient rule (P-NTF-003-06).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**        **Required**   **Editable**   **Default**   **Allowed values / validation**           **Error**          **Visibility**                    **Saved to**    **Behavior**
  ------------------ ------------------------- --------------- -------------- -------------- ------------- ----------------------------------------- ------------------ --------------------------------- --------------- -----------------------------
  P-NTF-003-01       Message status            Badge           System         No             Sent          Sent; Delivered; Read; Failed             ---                Sender; Safety Mode limits Read   Delivery log    Display only

  P-NTF-003-02       Status time               Timestamp       System         No             Event time    UTC storage; local display                ---                Sender; Safety Mode limits Read   Delivery log    Display only

  P-NTF-003-03       Status timeline           Event list      System         No             Derived       Append-only status history                Load error         Sender                            Delivery log    Displays all status entries

  P-NTF-003-04       First-read time           Timestamp       System         No             First open    Hidden from sender in Safety Mode         ---                Sender / recipient per rules      first_read_at   Display only

  P-NTF-003-05       Failure notice            Error message   System         No             Derived       Shown when all channels fail              ERR-01 to sender   Sender                            Delivery log    Display only

  P-NTF-003-06       Non-app recipient rule    System          System         No             Derived       Shows Sent/Delivered/Failed; never Read   ---                Sender                            Delivery log    Display only
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ----------------------------------------------------
  Empty                    Not applicable; status exists once message is sent

  Loading                  Status skeleton

  Error                    Load failure or all-channel failure: ERR-01

  Success                  Status and timestamp history displayed
  -----------------------------------------------------------------------------

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

NTF-SCR-04 --- Quiet windows and limits

  -------------------------------------------------------------------------
  **Screen ID**    NTF-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Notifications

  **Feature(s)**   NTF-05
  -------------------------------------------------------------------------

![Figure NTF-SCR-04 --- Quiet windows and limits](media/9e9caff20a60233ac6e6a5c49ff5e9305fb70e27.png "Figure NTF-SCR-04 — Quiet windows and limits"){width="6.666666666666667in" height="5.0in"}

*Figure NTF-SCR-04 --- Quiet windows and limits*

**Navigation**

  ---------------------------------------------------------------------------------
  **How you get here**    NTF-SCR-01 Notification settings
  ----------------------- ---------------------------------------------------------
  **Where you go next**   NTF-SCR-01 Notification settings; Main menu: any module

  ---------------------------------------------------------------------------------

The screen components are shown in the figure above.

NTF-SCR-B01 --- Message alert

  ------------------------------------------------------------------------
  **Screen ID**   NTF-SCR-B01
  --------------- --------------------------------------------------------
  **Module**      Notifications

  ------------------------------------------------------------------------

![Figure NTF-SCR-B01 --- Message alert](media/6fad5578885e0d2f587e4244d00ed504e4c3e614.png "Figure NTF-SCR-B01 — Message alert"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure NTF-SCR-B01 --- Message alert*

**Navigation**

  --------------------------------------------------------------------------------------------------------
  **How you get here**    System: a new message arrives (push, text or email alert)
  ----------------------- --------------------------------------------------------------------------------
  **Where you go next**   MSG-SCR-02 Thread and message view; Tapping the alert opens the message thread

  --------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Alert the recipient about a new message.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Message Alert\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Alert channel (P-NTF-002-03); Alert time (P-NTF-002-04); Open message action (P-NTF-002-05); Safety Mode content (P-NTF-002-06).

-   Input area (form fields, in specification order): Sender name (P-NTF-002-01); Message preview (P-NTF-002-02).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**      **Required**   **Editable**   **Default**    **Allowed values / validation**                      **Error**   **Visibility**                    **Saved to**           **Behavior**
  ------------------ ------------------------- ------------- -------------- -------------- -------------- ---------------------------------------------------- ----------- --------------------------------- ---------------------- -----------------------------------------------
  P-NTF-002-01       Sender name               Text          Conditional    No             Derived        Shown unless Safety Mode or Hidden preview           ---         Recipient                         Derived from message   Display only

  P-NTF-002-02       Message preview           Text          Conditional    No             None           First 100 characters when Name and text is enabled   ---         Recipient; never in Safety Mode   Derived from message   Display only

  P-NTF-002-03       Alert channel             System        System         No             Push           Push; SMS; Email                                     ---         Recipient                         Delivery log           Channel determines delivery

  P-NTF-002-04       Alert time                Timestamp     System         No             Trigger time   UTC storage                                          ---         System / delivery log             attempted_at           Display only

  P-NTF-002-05       Open message action       Tap / click   ---            ---            ---            ---                                                  ---         Recipient                         ---                    Opens message; marks read; stops later alerts

  P-NTF-002-06       Safety Mode content       System        System         No             Hidden         No sender, text, title, or details                   ---         Safety Mode recipient             ---                    Neutral alert only
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- -------------------------------------------------------------------------------
  Empty                   Not applicable; alert is event-driven

  Loading                 Not user-facing

  Error                   Channel failure retried three times over 15 minutes; later channels still run

  Success                 Alert delivered; delivery-log entry created
  -------------------------------------------------------------------------------------------------------

NTF-SCR-B02 --- Reminder alert

  ------------------------------------------------------------------------
  **Screen ID**   NTF-SCR-B02
  --------------- --------------------------------------------------------
  **Module**      Notifications

  ------------------------------------------------------------------------

![Figure NTF-SCR-B02 --- Reminder alert](media/5a4d33886d9650a101872a957a9bb02a8bb9bae2.png "Figure NTF-SCR-B02 — Reminder alert"){width="6.666666666666667in" height="5.552083333333333in"}

*Figure NTF-SCR-B02 --- Reminder alert*

**Navigation**

  ----------------------------------------------------------------------------------------------------
  **How you get here**    System: a reminder time is reached
  ----------------------- ----------------------------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); Tapping the alert opens the calendar item

  ----------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------------------
  **Purpose**    Remind users of events, hearings, deadlines, and agency due dates.
  -------------- --------------------------------------------------------------------

  -----------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Reminder Alert\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Reminder type (P-NTF-004-01); Event time (P-NTF-004-03); Reminder time (P-NTF-004-04); Channels (P-NTF-004-05); Open calendar item (P-NTF-004-06); Safety Mode content (P-NTF-004-07).

-   Input area (form fields, in specification order): Event title (P-NTF-004-02).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**      **Required**   **Editable**   **Default**         **Allowed values / validation**              **Error**   **Visibility**          **Saved to**           **Behavior**
  ------------------ ------------------------- ------------- -------------- -------------- ------------------- -------------------------------------------- ----------- ----------------------- ---------------------- --------------------------------
  P-NTF-004-01       Reminder type             System        System         No             Derived             Event; Hearing; Deadline; Agency due date    ---         Recipient               Reminder record        Determines timing/channels

  P-NTF-004-02       Event title               Text          Conditional    No             Derived             Shown unless Safety Mode or Hidden preview   ---         Recipient               Calendar/agency item   Display only

  P-NTF-004-03       Event time                Timestamp     Conditional    No             Derived             UTC storage; local display                   ---         Recipient               Calendar/agency item   Display only

  P-NTF-004-04       Reminder time             Timestamp     System         No             Configured offset   UTC storage                                  ---         System / delivery log   remind_at              Display only

  P-NTF-004-05       Channels                  System        System         No             Push                Push; Push + SMS for court hearing           ---         Recipient               Delivery log           Channel rules by reminder type

  P-NTF-004-06       Open calendar item        Tap / click   ---            ---            ---                 ---                                          ---         Recipient               ---                    Opens event/agency item

  P-NTF-004-07       Safety Mode content       System        System         No             Hidden              No title or details                          ---         Safety Mode recipient   ---                    Neutral reminder only
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- ---------------------------------------------------------------------
  Empty                   Not applicable; reminder is event-driven

  Loading                 Not user-facing

  Error                   Channel failure retried three times over 15 minutes; failure logged

  Success                 Reminder delivered; delivery-log entry created
  ---------------------------------------------------------------------------------------------

NTF-SCR-B03 --- Delivery log

  ------------------------------------------------------------------------
  **Screen ID**   NTF-SCR-B03
  --------------- --------------------------------------------------------
  **Module**      Notifications

  ------------------------------------------------------------------------

![Figure NTF-SCR-B03 --- Delivery log](media/eb7f9968f2b51fdb52067d5a671448932c4ac511.png "Figure NTF-SCR-B03 — Delivery log"){width="6.666666666666667in" height="5.0in"}

*Figure NTF-SCR-B03 --- Delivery log*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    NTF-SCR-03 Message status
  ----------------------- --------------------------------------------------------
  **Where you go next**   NTF-SCR-03 Message status; Main menu: any module

  --------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------------------
  **Purpose**    Preserve an append-only record of alerts, reminders, and system sends.
  -------------- ------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Delivery Log\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Event type (P-NTF-005-02); Channel (P-NTF-005-03); Recipient (P-NTF-005-04); Attempt time (P-NTF-005-05); Result (P-NTF-005-06); Retry count (P-NTF-005-07); Source module (P-NTF-005-08); Filter (P-NTF-005-09).

-   Action area (primary action first, then secondary actions and links): Log entries (P-NTF-005-01).

-   Controls that must NOT be provided: Edit / delete (P-NTF-005-10).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**   **Default**    **Allowed values / validation**        **Error**               **Visibility**                       **Saved to**                **Behavior**
  ------------------ ------------------------- ------------------ -------------- -------------- -------------- -------------------------------------- ----------------------- ------------------------------------ --------------------------- ---------------------------
  P-NTF-005-01       Log entries               Table / timeline   ---            ---            ---            Append-only; no edit/delete            Load error with retry   Records / authorized internal view   DeliveryLog                 Displays delivery history

  P-NTF-005-02       Event type                Badge              System         No             Derived        Message alert; Reminder; System send   ---                     Authorized viewer                    DeliveryLog.event_type      Display only

  P-NTF-005-03       Channel                   Badge              System         No             Derived        Push; SMS; Email                       ---                     Authorized viewer                    DeliveryLog.channel         Display only

  P-NTF-005-04       Recipient                 Text / reference   System         No             Derived        User or non-app contact                ---                     Authorized viewer                    DeliveryLog.recipient       Display only

  P-NTF-005-05       Attempt time              Timestamp          System         No             Attempt time   UTC storage                            ---                     Authorized viewer                    attempted_at                Display only

  P-NTF-005-06       Result                    Badge              System         No             Derived        Sent; Delivered; Read; Failed          ---                     Authorized viewer                    DeliveryLog.result          Display only

  P-NTF-005-07       Retry count               Integer            System         No             0              0--3                                   ---                     Authorized viewer                    DeliveryLog.retry_count     Display only

  P-NTF-005-08       Source module             Badge              System         No             Derived        Messaging; Calendar; Accounts          ---                     Authorized viewer                    DeliveryLog.source_module   Display only

  P-NTF-005-09       Filter                    Control group      No             Yes            None           Event type, channel, result, date      ---                     Authorized viewer                    View state                  Filters log

  P-NTF-005-10       Edit / delete             Not displayed      ---            ---            ---            No edit/delete control                 ---                     No user                              ---                         Log is append-only
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                   **Behavior**
  --------------------------- -------------------------------------------
  Empty                       No delivery events for filter

  Loading                     Log skeleton

  Error                       Load failure and retry

  Success                     Delivery history displayed
  -----------------------------------------------------------------------

NTF-SCR-B04 --- System send status

  ------------------------------------------------------------------------
  **Screen ID**   NTF-SCR-B04
  --------------- --------------------------------------------------------
  **Module**      Notifications

  ------------------------------------------------------------------------

![Figure NTF-SCR-B04 --- System send status](media/b9d105a82dd3a956af210c30631daeb39eda383d.png "Figure NTF-SCR-B04 — System send status"){width="6.666666666666667in" height="5.0in"}

*Figure NTF-SCR-B04 --- System send status*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-06 Invite list and status
  ----------------------- --------------------------------------------------------
  **Where you go next**   ACC-SCR-10 Contact-attempt log; Main menu: any module

  --------------------------------------------------------------------------------

Specification

  -------------------------------------------------------------------------------------------------------------------------------
  **Purpose**    Show the result of a system-initiated email or text, such as an invite, verification code, or billing message.
  -------------- ----------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"System Send Status\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Send type (P-NTF-006-01); Channel (P-NTF-006-02); Sent at (P-NTF-006-04); Result (P-NTF-006-05); Reply received (P-NTF-006-06); Retry indicator (P-NTF-006-07); Expiry rule (P-NTF-006-08).

-   Input area (form fields, in specification order): Recipient (P-NTF-006-03).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**            **Required**   **Editable**   **Default**   **Allowed values / validation**                      **Error**   **Visibility**                         **Saved to**           **Behavior**
  ------------------ ------------------------- ------------------- -------------- -------------- ------------- ---------------------------------------------------- ----------- -------------------------------------- ---------------------- ------------------------------------
  P-NTF-006-01       Send type                 Badge               System         No             Derived       Verification code; Invite; Non-app message message   ---         Originating user / authorized viewer   SystemSend.type        Display only

  P-NTF-006-02       Channel                   Badge               System         No             Derived       Email; Text                                          ---         Originating user / authorized viewer   SystemSend.channel     Display only

  P-NTF-006-03       Recipient                 Masked text         System         No             Derived       Email or mobile                                      ---         Originating user / authorized viewer   SystemSend.recipient   Display only

  P-NTF-006-04       Sent at                   Timestamp           System         No             Send time     UTC storage; local display                           ---         Originating user / authorized viewer   sent_at                Display only

  P-NTF-006-05       Result                    Badge               System         No             Sent          Sent; Delivered; Failed                              ---         Originating user / authorized viewer   result                 Display only

  P-NTF-006-06       Reply received            Badge / indicator   System         No             None          Reply received / none                                ---         Originating user / authorized viewer   Reply record           Routes reply to originating module

  P-NTF-006-07       Retry indicator           Badge               System         No             None          Retry 1--3; Failed                                   ---         Authorized viewer                      Delivery log           Display only

  P-NTF-006-08       Expiry rule               System              System         No             Derived       Expired messages stop retrying                       ---         System                                 Send metadata          Prevents retries after expiry
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- ----------------------------------------------------------
  Empty                   Not applicable; status exists after send request

  Loading                 Status skeleton

  Error                   Channel failure: Failed after retries; logged

  Success                 Send/delivery result displayed; reply routed if received
  ----------------------------------------------------------------------------------

Cross-screen rules and pending screen decisions (Notifications)

Cross-screen Notifications rules

Pending screen decisions --- Notifications

4.7 Field-level specifications

4.1 Message Alert --- NTF-01

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**           **Technical name**   **Type / control**   **Required**   **Editable**   **Default**              **Allowed values / validation**   **Visibility**
  -------------- ------------------- -------------------- -------------------- -------------- -------------- ------------------------ --------------------------------- ----------------
  FLD-NTF-001    Message reference   message_id           System               Yes            No             Generated                Message reference                 Internal

  FLD-NTF-002    Recipient           recipient_user_id    System               Yes            No             Message recipient        User reference                    Internal

  FLD-NTF-003    Channel             channel              System               No             No             Push                     Push, SMS, Email                  Delivery log

  FLD-NTF-004    Attempt time        attempted_at         Timestamp            System         No             Attempt time             UTC                               Delivery log

  FLD-NTF-005    Attempt result      result               Display              System         No             Derived                  Sent, Delivered, Read, Failed     Delivery log

  FLD-NTF-006    Safety Mode flag    safety_mode          Boolean              System         No             Derived from recipient   true/false                        Internal
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4.2 Message Status --- NTF-02

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**         **Technical name**   **Type / control**   **Required**   **Editable**   **Default**   **Allowed values / validation**                        **Visibility**
  -------------- ----------------- -------------------- -------------------- -------------- -------------- ------------- ------------------------------------------------------ ----------------
  FLD-NTF-010    Status            status               Display              System         No             Sent          Sent, Delivered, Read, Failed                          Message thread

  FLD-NTF-011    Status time       status_at            Timestamp            System         No             Event time    UTC; append-only                                       Delivery log

  FLD-NTF-012    First-read time   first_read_at        Timestamp            System         No             None          Set on first open; hidden from sender in Safety Mode   Message/export
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4.3 Reminder --- NTF-04

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**         **Technical name**   **Type / control**   **Required**   **Editable**   **Default**         **Allowed values / validation**                                   **Visibility**
  -------------- ----------------- -------------------- -------------------- -------------- -------------- ------------------- ----------------------------------------------------------------- ----------------
  FLD-NTF-020    Reminder type     reminder_type        System               Yes            No             Derived             Event, hearing/deadline, agency due date                          Internal

  FLD-NTF-021    Reminder time     remind_at            Timestamp            System         Yes            Configured offset   UTC                                                               Internal

  FLD-NTF-022    Recipients        recipient_user_ids   System               Yes            No             Derived             Linked: both parents; Solo: parent; agency item: linking parent   Internal

  FLD-NTF-023    Channels          channels             System               No             No             Derived             Push; push + SMS for hearings                                     Internal

  FLD-NTF-024    Delivery result   result               Display              System         No             Derived             Sent, Delivered, Failed                                           Delivery log
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4.8 User actions and procedures

ACT-NTF-001 --- Send Message Alerts

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             System
  --------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-02 Thread and message view / notification channels

  **Objective**         Ensure unread messages reach the recipient

  **Trigger**           New message arrives

  **Preconditions**     Recipient identified; channel permissions/verified contacts known

  **System behavior**   Send browser push if allowed; if still unread after 15 minutes, send SMS; if still unread after 1 hour, send email; stop later alerts when read; record every attempt in delivery log.

  **Data created**      Delivery-log entries

  **Success**           Recipient alerted through applicable channels

  **Alternative**       No verified mobile: skip SMS; push denied: skip push; later channels still run.

  **Negative**          Channel failure retried three times over 15 minutes, then logged; subsequent channels still follow their schedules.

  **Safety Mode**       No sender name or message text; previews cannot be enabled.

  **Source**            NTF-01; FR-NTF-01-01--FR-NTF-01-11.

  **Screen(s)**         MSG-SCR-02 Thread and message view, with the status of each message
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-02 Thread and message view, with the status of each message (entry: MSG-SCR-01 Thread list; notification deep link).

2.  Make sure the preconditions are met: Recipient identified; channel permissions/verified contacts known.

3.  Perform the action: New message arrives.

4.  The system processes the action: Send browser push if allowed; if still unread after 15 minutes, send SMS; if still unread after 1 hour, send email; stop later alerts when read; record every attempt in delivery log.

5.  Result on success: Recipient alerted through applicable channels.

6.  If it fails or a rule is not met: No verified mobile: skip SMS; push denied: skip push; later channels still run.

ACT-NTF-002 --- Record Message Status

  ---------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             System
  --------------------- -----------------------------------------------------------------------------------------------------------------------------
  **Screen**            MSG-SCR-02 Thread and message view

  **Objective**         Preserve delivery/read evidence

  **Trigger**           Message accepted, delivered, opened, or failed

  **Preconditions**     Message exists

  **System behavior**   Append Sent, Delivered, Read, or Failed with UTC time; never edit/delete prior status entry; make log available to Records.

  **Data created**      Delivery-log entries

  **Success**           Sender sees status timeline

  **Negative**          All channels fail after retries: Failed and ERR-01 to sender.

  **Safety Mode**       Read is hidden from sender.

  **Source**            NTF-02; FR-NTF-02-01--FR-NTF-02-10.

  **Screen(s)**         MSG-SCR-02 Thread and message view, with the status of each message
  ---------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open MSG-SCR-02 Thread and message view, with the status of each message (entry: MSG-SCR-01 Thread list; notification deep link).

2.  Make sure the preconditions are met: Message exists.

3.  Perform the action: Message accepted, delivered, opened, or failed.

4.  The system processes the action: Append Sent, Delivered, Read, or Failed with UTC time; never edit/delete prior status entry; make log available to Records.

5.  Result on success: Sender sees status timeline.

6.  If it fails or a rule is not met: All channels fail after retries: Failed and ERR-01 to sender.

ACT-NTF-003 --- Send Event and Deadline Reminders

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             System
  --------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-01 Calendar (week view) / notification channels

  **Objective**         Prevent missed events, hearings, and due dates

  **Trigger**           Reminder time reached

  **Preconditions**     Calendar event or future agency item exists

  **System behavior**   Send event reminders at 1 day and 1 hour before; hearing/deadline reminders at 7 days and 1 day before; agency due-date reminders 3 days before; court hearings use simultaneous push and SMS; send to both parents in Linked households or the Solo parent; agency items go only to the linking parent unless shared.

  **Data created**      Reminder delivery-log entries

  **Success**           Reminder sent at configured time

  **Alternative**       User may change reminder times; changed event time replaces old reminder.

  **Safety Mode**       No event title or other details.

  **Source**            NTF-04; FR-NTF-04-01--FR-NTF-04-12.

  **Screen(s)**         CAL-SCR-01 Calendar (day, week and month views)
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-01 Calendar (day, week and month views) (entry: Main navigation → Calendar; date selector from Week/Month views).

2.  Make sure the preconditions are met: Calendar event or future agency item exists.

3.  Enter or select the required information: Month / year.

4.  Perform the action: Reminder time reached.

5.  The system processes the action: Send event reminders at 1 day and 1 hour before; hearing/deadline reminders at 7 days and 1 day before; agency due-date reminders 3 days before; court hearings use simultaneous push and SMS; send to both parents in Linked households or the Solo parent; agency items go only to the linking parent unless shared.

6.  Result on success: Reminder sent at configured time.

7.  If it fails or a rule is not met: User may change reminder times; changed event time replaces old reminder.

ACT-NTF-004 --- Send System Message

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             System on behalf of Accounts, Calendar, Messaging
  --------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            Varies

  **Objective**         Deliver codes, invites, non-app messages, and billing messages

  **Trigger**           Another module requests send

  **Preconditions**     Recipient contact and channel available

  **System behavior**   Send email/text; return Sent/Failed; report Delivered when channel confirms; receive replies and route them to originating module; retry failed sends three times over 15 minutes unless message expires.

  **Data created**      Delivery-log entry

  **Success**           Message sent/delivered; reply routed

  **Negative**          Channel failure returns Failed and is logged.

  **Source**            NTF-06; FR-NTF-06-01--FR-NTF-06-07.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open the screen.

2.  Make sure the preconditions are met: Recipient contact and channel available.

3.  Perform the action: Another module requests send.

4.  The system processes the action: Send email/text; return Sent/Failed; report Delivered when channel confirms; receive replies and route them to originating module; retry failed sends three times over 15 minutes unless message expires.

5.  Result on success: Message sent/delivered; reply routed.

6.  If it fails or a rule is not met: Channel failure returns Failed and is logged.

4.9 Business rules and validations

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**        **Rule**                                                                                                                                **Features**
  ------------- --------------------------------------------------------------------------------------------------------------------------------------- ----------------
  BR-06         A message that stays unread moves from push to SMS and email. The waiting time is 15 minutes for SMS and 1 hour for email by default.   NTF-01

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- ---------------------------------------------------------------------------------------------------------------------------------
  BR-06      A message that stays unread moves from push to SMS and email. The waiting time is to be set.

  BR-07      Sent, delivered and read status is saved in the record.

  BR-21      Records tied to a case can be put on legal hold. Other data can be deleted on request, after the user is offered an export.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.
  --------------------------------------------------------------------------------------------------------------------------------------------

4.10 Messages and errors

Errors

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **When it shows**                  **Text**                                                                                      **Used by**
  ---------- ---------------------------------- --------------------------------------------------------------------------------------------- --------------
  ERR-01     A message cannot be delivered      We could not deliver your message to \[name\]. It is saved in your record as not delivered.   FR-NTF-02-05

  ERR-02     A test alert cannot be sent        We could not send the test alert. Check the settings shown for this channel.                  FR-NTF-03-05

  ERR-03     A setting cannot be saved          We could not save your change. Nothing was changed. Please try again.                         FR-NTF-05-04

  ERR-04     A wait time is outside the range   Choose a time from 15 minutes to 24 hours.                                                    FR-NTF-01-08
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **When it shows**                                            **Text**                                                                                                                         **Feature**
  ----------- ------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------- -------------
  MSGT-01     A message arrives for a user who is not in Safety Mode       You have a new message from \[name\].                                                                                            NTF-01

  MSGT-02     A message arrives for a user in Safety Mode                  You have a new notification.                                                                                                     NTF-01

  MSGT-03     A message is still unread after the SMS wait time            You have an unread message from \[name\] in ParentPath. Open the app to read it.                                                 NTF-01

  MSGT-04     A message is still unread after the email wait time          Subject: You have an unread message in ParentPath. Body: You have an unread message from \[name\]. Open ParentPath to read it.   NTF-01

  MSGT-05     A calendar event reminder is sent                            Reminder: \[event title\] on \[date and time\].                                                                                  NTF-04

  MSGT-06     A reminder is sent to a user in Safety Mode                  You have a reminder.                                                                                                             NTF-04

  MSGT-07     A hearing, deadline or due-date reminder is sent             Reminder: you have a child support date on \[date and time\].                                                                    NTF-04

  MSGT-08     The health check finds that SMS cannot be used               SMS is not set up. Add and verify a mobile number to get text alerts.                                                            NTF-03

  MSGT-09     The health check finds that all three channels can be used   Alerts can reach you on push, SMS and email.                                                                                     NTF-03
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4.11 Dependencies

  -------------------------------------------------------------------------
  **Module**                         **What it needs from Notifications**
  ---------------------------------- --------------------------------------
  Accounts and Onboarding            The SMS and email channels

  Messaging                          Alerts and delivery status

  Calendar and Parenting Time        Reminders

  Child Support Sync                 Reminders (NTF-04)

  Records and Court                  Delivery logs

  Safety and Privacy                 Discreet alerts
  -------------------------------------------------------------------------

12.3 Assumptions

4.12 End-to-end workflows and scenarios

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                                                                                                   **Module path**                       **Features / rules**
  -------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------- --------------------------------------
  WF-01          Sign up, verify email, sign in with second check, set up household                                                                                                                ACC → NTF → PLT                       ACC-01, ACC-09, ACC-10, NTF-06

  WF-02          Invite co-parent, accept invite, household becomes Linked                                                                                                                         ACC → NTF → REC                       ACC-02, ACC-05

  WF-04          Reach a co-parent who is not on the app by text/email; replies appended; every attempt logged before send                                                                         ACC → NTF → MSG → REC                 ACC-04, ACC-05, NTF-06

  WF-05          Compose and send a message with optional tone check; delivery escalation push → SMS (15 min) → email (1 h); status logged                                                         MSG → SAF → NTF → REC                 MSG-01--04, NTF-01, NTF-02

  WF-07          Create, edit (incl. recurring), cancel calendar events; history kept; reminders sent                                                                                              CAL → NTF → REC                       CAL-01, CAL-10, NTF-04

  WF-08          Parenting-time entry: Proposed → co-parent confirms → undo window → Active                                                                                                        CAL → NTF                             CAL-01, CAL-02

  WF-09          Schedule change / swap request: send → approve (confirm + 10-min undo) / decline / withdraw / expire                                                                              CAL → NTF → REC                       CAL-02, BR-12

  WF-10          Expense with receipt → share → reimbursement request → accept / decline / mark paid / withdraw                                                                                    EXP → DOC/BIL (storage) → NTF → REC   EXP-01--03, EXP-06, BR-14

  WF-13          Journal notes; data export (PDF/CSV, free); certified export with Record ID; public verification                                                                                  REC ← MSG/CAL/EXP/DOC/NTF/ACC         REC-01, REC-05, REC-07, BR-05, BR-20

  WF-14          Turn Safety Mode on (notice + confirm), effects across modules, Exit Now, turn off with one-time code                                                                             SAF → MSG/CAL/DOC/NTF/PLT/SUP         SAF-01, BR-22

  WF-15          Alert-preview level, sensitive images, AI consent and AI use log                                                                                                                  SAF → NTF → MSG                       SAF-02, SAF-03, BR-11

  WF-18          Support request → case number → priority for safety / court date → staff queue → reply → close / reopen                                                                           SUP → NTF                             SUP-01, SUP-02, BR-25, BR-31

  WF-20          Link a child-support case (state, details, one-time code, consent) → API/batch load → overview, comparison, hearings in calendar, reminders → share an item → unlink and export   CSS → ACC/EXP/CAL/NTF/REC             CSS-01--05, CSS-07, CSS-12, CSS-13
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  **Scenario**   **Scenario**                      **Expected behaviour**
  -------------- --------------------------------- -------------------------------------------------------------------------------------------------------
  SCN-NTF-001    Recipient does not open message   Push at arrival; SMS at 15 minutes; email at 1 hour; all attempts logged; reading stops later alerts.

  SCN-NTF-002    Hearing is seven days away        Linked parent receives push + SMS; other parent receives only if hearing was shared.
  --------------------------------------------------------------------------------------------------------------------------------------------------------
