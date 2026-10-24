# Notifications (NTF)


4.1 Functional requirements and acceptance criteria

NTF-01 Multi-channel alerts: push, then SMS and email

US-NTF-01-01. As a parent, I want to be alerted by push, and then by text and email if I have not read a message, so that I do not miss it.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-NTF-01-01      The system shall send a browser push alert to the recipient when a message arrives, if the recipient has allowed push. If push is not allowed, the system shall skip it, and the SMS and email steps still follow their wait times.

  FR-NTF-01-02      The system shall treat a message as unread until the recipient opens it in the app.

  FR-NTF-01-03      If a message is still unread after the SMS wait time, the system shall send an SMS alert. The default wait time is 15 minutes.

  FR-NTF-01-04      If a message is still unread after the email wait time, the system shall send an email alert. The default wait time is 1 hour.

  FR-NTF-01-05      When the recipient reads the message, the system shall stop the later alerts for that message.

  FR-NTF-01-06      If the recipient has no verified mobile number, the system shall skip the SMS alert.

  FR-NTF-01-07      For a user in Safety Mode, the system shall send every alert with no sender name and no message text, and the user cannot turn previews on.

  FR-NTF-01-08      The system should let a user change the SMS wait time and the email wait time to any value from 15 minutes to 24 hours. It shall show ERR-04 for a value outside this range.

  FR-NTF-01-09      The system shall record every alert in the delivery log, with the channel, the time and the result.

  FR-NTF-01-10      If an alert cannot be sent on a channel, the system shall retry that channel 3 times over 15 minutes and then log the failure. The later channels still follow their wait times.

  FR-NTF-01-11      The system shall show only the name of the sender in an alert for a message and shall show no message text, unless the user has turned on previews. The preview setting is SAF-02 in Safety and Privacy.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                                                       **When**                                   **Then**                                                                                                                                                        **Covers**
  -------------- ------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-NTF-01-01   A recipient who is not in Safety Mode                                                                                           A message arrives for them                 A push alert with the name of the sender and no message text is sent (MSGT-01) and a delivery log entry exists                                                  FR-NTF-01-01, FR-NTF-01-09

  AC-NTF-01-02   A message that is still unread after the SMS wait time (15 minutes by default), and a recipient with a verified mobile number   The SMS wait time ends                     An SMS alert is sent (MSGT-03)                                                                                                                                  FR-NTF-01-02, FR-NTF-01-03

  AC-NTF-01-03   A message that is still unread after the email wait time (1 hour by default)                                                    The email wait time ends                   An email alert is sent (MSGT-04)                                                                                                                                FR-NTF-01-04

  AC-NTF-01-04   A message that the recipient reads after the push alert and before the SMS wait time ends                                       The SMS wait time ends                     No SMS and no email is sent                                                                                                                                     FR-NTF-01-02, FR-NTF-01-05

  AC-NTF-01-05   A recipient with no verified mobile number and an unread message                                                                The SMS wait time ends                     No SMS is sent and the email step still follows                                                                                                                 FR-NTF-01-06

  AC-NTF-01-06   A recipient who is in Safety Mode                                                                                               A message arrives for them                 The alert has no preview text (MSGT-02)                                                                                                                         FR-NTF-01-07

  AC-NTF-01-07   A signed-in user                                                                                                                They save an SMS wait time of 30 minutes   The new value is saved and is used for later messages                                                                                                           FR-NTF-01-08

  AC-NTF-01-08   A push alert that cannot be sent                                                                                                The failure is returned                    The system tries the push channel 3 times over 15 minutes, then the failure is in the delivery log, and the SMS and email steps still run at their wait times   FR-NTF-01-10

  AC-NTF-01-09   A signed-in user                                                                                                                They save an SMS wait time of 5 minutes    The value is not saved and ERR-04 shows                                                                                                                         FR-NTF-01-08

  AC-NTF-01-10   A recipient who is not in Safety Mode and who turned on previews (SAF-02)                                                       A message arrives for them                 The alert shows the name of the sender and the preview set in SAF-02                                                                                            FR-NTF-01-11

  AC-NTF-01-11   A recipient who has not allowed push                                                                                            A message arrives for them                 No push alert is sent and the SMS and email steps still follow their wait times                                                                                 FR-NTF-01-01
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

NTF-02 Delivery and read status on every message, logged in the record

US-NTF-02-01. As a parent, I want to see when my message was sent, delivered and read, so that I can show it was received.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-NTF-02-01       The system shall show the status of every message as Sent, Delivered, Read or Failed.

  FR-NTF-02-02       The system shall set Sent when it has accepted the message for delivery, Delivered when the message has reached the account of the recipient or the text or email channel confirms delivery, and Read when the recipient opens it in the app.

  FR-NTF-02-03       The system shall save every status change in the record with the date and time in UTC.

  FR-NTF-02-04       The system shall add each status change as a new entry and shall not edit or delete an earlier entry.

  FR-NTF-02-05       If every channel has failed after the retries in FR-NTF-01-10, the system shall set the status Failed and show ERR-01 to the sender.

  FR-NTF-02-06       The system shall show the sender the status of the message and the time of each status.

  FR-NTF-02-07       The system shall make the delivery log available to Records and Court.

  FR-NTF-02-08       For a message to a co-parent who is not on the app, the system shall show Sent, Delivered or Failed as the channel reports. The status Read is not shown.

  FR-NTF-02-09       When the recipient of a message is in Safety Mode, the system shall not show the status Read to the sender. The sender still sees Sent and Delivered.

  FR-NTF-02-10       The system shall keep delivery log entries that are tied to a case under legal hold. It shall delete other entries on request after the user is offered an export. Counsel sets the retention period in the retention policy.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The sender sees every status. The delivery log is part of the record and follows the sharing rules of Records and Court. A recipient in Safety Mode hides the status Read from the sender. The status Read is never shown for a co-parent who is not on the app. The retention period is set by counsel.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                  **When**                             **Then**                                                                                                         **Covers**
  -------------- ------------------------------------------------------------------------------------------ ------------------------------------ ---------------------------------------------------------------------------------------------------------------- ------------------------------------------
  AC-NTF-02-01   A parent who sends a message in the app                                                    The system accepts the message       The status is Sent and it is saved with the date and time in UTC                                                 FR-NTF-02-01, FR-NTF-02-02, FR-NTF-02-03

  AC-NTF-02-02   A sent message                                                                             It reaches the recipient             The status Delivered is saved with the date and time                                                             FR-NTF-02-02, FR-NTF-02-03

  AC-NTF-02-03   A delivered message                                                                        The recipient opens it               The status Read is saved with the date and time, and the sender sees Read and the time                           FR-NTF-02-02, FR-NTF-02-03, FR-NTF-02-06

  AC-NTF-02-04   A message for which every channel failed after 3 retries over 15 minutes                   The failure is returned              The status is Failed and ERR-01 shows to the sender                                                              FR-NTF-02-05

  AC-NTF-02-05   A status entry                                                                             Anyone tries to edit or delete it    The change is not possible                                                                                       FR-NTF-02-04

  AC-NTF-02-06   A message with the statuses Sent, Delivered and Read                                       The sender opens the message         All three statuses show with their times                                                                         FR-NTF-02-06

  AC-NTF-02-07   A delivery log entry                                                                       Records and Court asks for the log   The log is available. The export format is owned by Records and Court.                                           FR-NTF-02-07

  AC-NTF-02-08   A text to a co-parent who is not on the app that the phone network delivers                The channel reports the delivery     The status Delivered shows and the status Read does not show                                                     FR-NTF-02-08

  AC-NTF-02-09   A message to a recipient who is in Safety Mode, which the recipient reads                  The sender opens the message         The sender sees Sent and Delivered and does not see Read                                                         FR-NTF-02-09

  AC-NTF-02-10   Delivery log entries tied to a case, other entries, and a deletion request from the user   The request is processed             The user was offered an export first, the entries tied to the case are kept, and the other entries are deleted   FR-NTF-02-10
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

NTF-03 Notification health check in settings

US-NTF-03-01. As a parent, I want to check that alerts can reach me, so that I do not miss messages.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-NTF-03-01        The system should give every user a notification health check in settings.

  FR-NTF-03-02        The health check should show, for push, SMS and email, whether the app can use the channel for this user.

  FR-NTF-03-03        When a channel cannot be used, the health check should say why and what the user can do. The check tests the verified email, the verified mobile number, the push permission and the last failed delivery on each channel.

  FR-NTF-03-04        The health check should let the user send one test alert on each channel.

  FR-NTF-03-05        If a test alert cannot be sent, the health check should show ERR-02.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                 **When**                              **Then**                                                               **Covers**
  -------------- ------------------------------------------------------------------------- ------------------------------------- ---------------------------------------------------------------------- ----------------------------
  AC-NTF-03-01   A signed-in user                                                          They open the notification settings   The health check shows                                                 FR-NTF-03-01

  AC-NTF-03-02   A user with a verified email, a verified mobile number and push allowed   They open the health check            All three channels show as usable (MSGT-09)                            FR-NTF-03-02

  AC-NTF-03-03   A user with no verified mobile number                                     They open the health check            SMS shows as not usable, with the reason and the next step (MSGT-08)   FR-NTF-03-02, FR-NTF-03-03

  AC-NTF-03-04   A user with a usable email channel                                        They send a test alert on email       The test alert arrives by email                                        FR-NTF-03-04

  AC-NTF-03-05   A test alert that cannot be sent                                          The user sends it                     ERR-02 shows                                                           FR-NTF-03-05
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

NTF-04 Event and deadline reminders

US-NTF-04-01. As a parent, I want reminders for events, hearings and due dates, so that I do not miss them.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-NTF-04-01        The system shall send a reminder before each calendar event.

  FR-NTF-04-02        The system shall send a reminder before each hearing and each deadline that Child Support Sync puts in the calendar.

  FR-NTF-04-03        The system shall send a reminder before each due date from the agency record.

  FR-NTF-04-04        The system shall send event reminders to both parents of a linked household, and to the parent in Solo Mode.

  FR-NTF-04-05        The system shall send a reminder about an agency item (a hearing, a deadline or a due date) only to the parent who linked the case. It shall send it to the other parent only when the linked parent has shared the item.

  FR-NTF-04-06        The system shall send a court-date reminder by push and by SMS at the same time, without waiting for the unread time.

  FR-NTF-04-07        For a user in Safety Mode, the system shall send every reminder with no event title and no other details.

  FR-NTF-04-08        The system shall record every reminder in the delivery log, with the channel, the time and the result.

  FR-NTF-04-09        If a reminder cannot be sent on a channel, the system shall retry that channel 3 times over 15 minutes and then log the failure.

  FR-NTF-04-10        If the time of an event changes, the system shall send the reminder for the new time and not for the old time.

  FR-NTF-04-11        The system shall send reminders at these default times: 1 day and 1 hour before an event, 7 days and 1 day before a hearing or a deadline, and 3 days before a due date.

  FR-NTF-04-12        The system shall let a user change the reminder times.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The default reminder times are in FR-NTF-04-11. A court hearing is a court date, so its reminders go by push and SMS at the same time.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                         **When**                                                                  **Then**                                                                                   **Covers**
  -------------- --------------------------------------------------------------------------------- ------------------------------------------------------------------------- ------------------------------------------------------------------------------------------ --------------------------------------------------------
  AC-NTF-04-01   A linked household with a calendar event                                          It is 1 day before the event                                              Both parents get the reminder (MSGT-05) by push and a delivery log entry exists for each   FR-NTF-04-01, FR-NTF-04-04, FR-NTF-04-08, FR-NTF-04-11

  AC-NTF-04-02   A household in Solo Mode with a calendar event                                    It is 1 day before the event                                              Only the parent gets the reminder                                                          FR-NTF-04-04

  AC-NTF-04-03   A hearing that Child Support Sync put in the calendar from the case of Parent A   It is 7 days before the hearing                                           Parent A gets the reminder (MSGT-07) and the other parent does not                         FR-NTF-04-02, FR-NTF-04-05

  AC-NTF-04-04   The same hearing, which Parent A has shared with the other parent                 It is 7 days before the hearing                                           Both parents get the reminder                                                              FR-NTF-04-05

  AC-NTF-04-05   A due date from the agency record of Parent A                                     It is 3 days before the due date                                          Parent A gets the reminder                                                                 FR-NTF-04-03, FR-NTF-04-11

  AC-NTF-04-06   A court hearing                                                                   It is 7 days before the hearing                                           The reminder goes by push and by SMS at the same time                                      FR-NTF-04-06

  AC-NTF-04-07   A user in Safety Mode                                                             A reminder is sent                                                        The reminder has no event title and no other details (MSGT-06)                             FR-NTF-04-07

  AC-NTF-04-08   An event whose time changes after a reminder was set                              The new reminder time arrives                                             The reminder is sent for the new time and none is sent for the old time                    FR-NTF-04-10

  AC-NTF-04-09   A reminder that cannot be sent on a channel                                       The system tries the channel 3 times over 15 minutes and all tries fail   The failure is in the delivery log                                                         FR-NTF-04-09

  AC-NTF-04-10   A calendar event that starts in 2 days                                            The default reminder times of the event arrive                            A reminder is sent 1 day before and another 1 hour before the event                        FR-NTF-04-11

  AC-NTF-04-11   A user who changes the event reminder time to 2 hours before                      It is 2 hours before the event                                            The reminder is sent then, and no reminder is sent 1 day before                            FR-NTF-04-12
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

NTF-05 Notification quiet windows or limits

US-NTF-05-01. As a parent, I want to set quiet times and limit how many alerts I get, so that I am not disturbed.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-NTF-05-01       The system should let a user set quiet windows. Alerts due in a window are held and sent when the window ends. Court-date reminders are not held.

  FR-NTF-05-02       The system should let a user set a limit on the number of non-urgent alerts per day. Court-date reminders do not count toward the limit. Alerts over the limit are held and sent when the next day starts.

  FR-NTF-05-03       The system should write an audit log entry when a user changes a quiet window or a limit.

  FR-NTF-05-04       If a setting cannot be saved, the system should keep the earlier setting and show ERR-03.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

How alerts over a limit are handled is a BA reading of that decision.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                    **When**                              **Then**                                              **Covers**
  -------------- ---------------------------------------------------------------------------- ------------------------------------- ----------------------------------------------------- ----------------------------
  AC-NTF-05-01   A signed-in user                                                             They set a quiet window and save      The window is saved and an audit log entry is saved   FR-NTF-05-01, FR-NTF-05-03

  AC-NTF-05-02   A user with a quiet window                                                   An alert is due inside the window     The alert is held and sent when the window ends       FR-NTF-05-01

  AC-NTF-05-03   A signed-in user                                                             They set a limit on alerts and save   The limit is saved and an audit log entry is saved    FR-NTF-05-02, FR-NTF-05-03

  AC-NTF-05-04   A signed-in user and a save error                                            They save a setting                   The earlier setting stays and ERR-03 shows            FR-NTF-05-04

  AC-NTF-05-05   A user with a quiet window and a court-date reminder due inside the window   The reminder time arrives             The reminder is sent at its time and is not held      FR-NTF-05-01

  AC-NTF-05-06   A user with a limit of 5 non-urgent alerts per day who already got 5 today   A sixth non-urgent alert is due       The alert is held and sent when the next day starts   FR-NTF-05-02
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

NTF-06 Send service for account, invite and payment messages

US-NTF-06-01. As a parent, I want codes, links, invites and messages to reach me by text or email, so that I can sign in, join and use the app.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-NTF-06-01       The system shall send an email or a text when another module asks for it, using the channel the module names.

  FR-NTF-06-02       The system shall return the result of each send, Sent or Failed, to the module that asked.

  FR-NTF-06-03       The system shall report Delivered to the module when the channel confirms delivery.

  FR-NTF-06-04       The system shall send texts from a ParentPath number and emails from a ParentPath email address, and shall receive replies there. It shall pass each reply to the module that sent the original message. Messaging adds the reply to the same exchange.

  FR-NTF-06-05       The system shall record every send in the delivery log.

  FR-NTF-06-06       If a channel does not accept a message, the system shall retry 3 times over 15 minutes and then return Failed to the module and log the failure. The system shall stop retrying when the module says the message has expired, for example a one-time code that is valid for 10 minutes.

  FR-NTF-06-07       The system shall use sending services that report delivery to the system and can receive replies.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                             **When**                            **Then**                                                                      **Covers**
  -------------- ----------------------------------------------------- ----------------------------------- ----------------------------------------------------------------------------- ----------------------------
  AC-NTF-06-01   A module that asks for an email to be sent            The system sends it                 The email is sent and the module gets the result Sent                         FR-NTF-06-01, FR-NTF-06-02

  AC-NTF-06-02   A module that asks for a text to be sent              The system sends it                 The text is sent                                                              FR-NTF-06-01

  AC-NTF-06-03   A sent text that the phone network delivers           The channel confirms the delivery   The module gets the result Delivered                                          FR-NTF-06-03

  AC-NTF-06-04   A reply that arrives for a message sent by a module   The reply arrives                   The reply is passed to that module                                            FR-NTF-06-04

  AC-NTF-06-05   A channel that does not accept a message              The system tries to send it         The module gets the result Failed and the failure is in the delivery log      FR-NTF-06-06

  AC-NTF-06-06   Any send                                              The send is done                    A delivery log entry exists with the channel, the time and the result         FR-NTF-06-05

  AC-NTF-06-07   A sending service chosen by IT                        It is connected for a test          A test text shows the status Delivered and a reply to it reaches the system   FR-NTF-06-07
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4.2 Data reference

  -----------------------------------------------------------------------
  **Entity**                   **Fields used**
  ---------------------------- ------------------------------------------
  User                         email, mobile_number, language

  Household                    mode (Linked, Solo)

  Audit log entry              actor, action, object, result, time
  -----------------------------------------------------------------------

8.2 New entities (proposed). The sources name none of these fields. They are a BA proposal.

Delivery log entry

  --------------------------------------------------------------------------------------------------------------------
  **Field**           **Type**        **Required**   **Notes**
  ------------------- --------------- -------------- -----------------------------------------------------------------
  entry_id            Unique ID       Yes            System generated

  item_type           Choice          Yes            Message, Reminder, Account message

  item_id             Unique ID       Yes            The message, reminder or send that this entry is about

  recipient_user_id   Link to User    No             Empty for a co-parent who is not on the app

  recipient_address   Text            No             The mobile number or email of a co-parent who is not on the app

  channel             Choice          Yes            In-app, Push, SMS, Email

  status              Choice          Yes            Sent, Delivered, Read, Failed

  recorded_at         Date and time   Yes            UTC. Cannot be changed.
  --------------------------------------------------------------------------------------------------------------------

Notification settings

  -------------------------------------------------------------------------------------------------------------------------------
  **Field**                         **Type**                                       **Required**   **Notes**
  --------------------------------- ---------------------------------------------- -------------- -------------------------------
  user_id                           Link to User                                   Yes            ---

  sms_wait_minutes                  Number                                         Yes            Default 15. Range 15 to 1440.

  email_wait_minutes                Number                                         Yes            Default 60. Range 15 to 1440.

  event_reminder_times              List of times before the event                 Yes            Default 1 day and 1 hour

  hearing_deadline_reminder_times   List of times before the hearing or deadline   Yes            Default 7 days and 1 day

  due_date_reminder_times           List of times before the due date              Yes            Default 3 days
  -------------------------------------------------------------------------------------------------------------------------------

Reminder

  -------------------------------------------------------------------------------------------------------
  **Field**           **Type**         **Required**   **Notes**
  ------------------- ---------------- -------------- ---------------------------------------------------
  reminder_id         Unique ID        Yes            System generated

  source_type         Choice           Yes            Calendar event, Hearing, Deadline, Due date

  source_id           Unique ID        Yes            The event, hearing, deadline or due date

  recipient_user_id   Link to User     Yes            ---

  send_at             Date and time    Yes            UTC. Set from the reminder times in FR-NTF-04-11.

  status              Choice           Yes            Scheduled, Sent, Failed
  -------------------------------------------------------------------------------------------------------

4.3 Interfaces

All interfaces except INT-08 are with other modules of the app.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **With**                       **What passes**                                                                                                                                           **Features**
  ---------- ------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------
  INT-01     Messaging                      Message events come in. Alerts go out. Status changes (Sent, Delivered, Read, Failed) go back to the message screen.                                      NTF-01, NTF-02

  INT-02     Calendar and Parenting Time    Event times come in. Reminders go out.                                                                                                                    NTF-04

  INT-03     Child Support Sync             Hearings, deadlines and due dates come in. Reminders go out.                                                                                              NTF-04

  INT-04     Safety and Privacy             The Safety Mode flag comes in, so that alerts carry no preview text.                                                                                      NTF-01, NTF-04

  INT-05     Accounts and Onboarding        Codes, links, invites and messages to a co-parent who is not on the app come in through the send service. The verified email and mobile number come in.   NTF-06, NTF-01

  INT-06     ---                            Decision and trial messages come in through the send service.                                                                                             NTF-06

  INT-07     Records and Court              The delivery log goes out.                                                                                                                                NTF-02

  INT-08     Push, SMS and email services   Alerts and fallback delivery. IT chooses the providers before the build. Each provider must report delivery and must be able to receive replies.          NTF-01, NTF-04, NTF-06
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4.4 Non-functional requirements

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Requirement**                                                                                             **Where it applies here**
  -------------- ----------------------------------------------------------------------------------------------------------- --------------------------------------------------------
  NFR-02         Encryption in transit and at rest                                                                           The delivery log, mobile numbers and email addresses

  NFR-03         Role-based access on every request                                                                          Access to the delivery log

  NFR-04         Sign-ins, changes and sync actions are logged with actor, time and result                                   FR-NTF-01-09, FR-NTF-04-08, FR-NTF-05-03, FR-NTF-06-05

  NFR-05         Records cannot be edited. A change is a new entry.                                                          FR-NTF-02-04

  NFR-06         Collect only the data that is needed                                                                        The address kept for a co-parent who is not on the app

  NFR-09         Plain language on every screen. The standard is to be chosen.2 level AA.                                    All screens and alert texts

  NFR-11         English only.                                                                                               All screens and alert texts

  NFR-13 (new)   99 percent of alerts are sent within 1 minute. The point where the minute starts is to be agreed with IT.   NTF-01, NTF-04, NTF-06
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
