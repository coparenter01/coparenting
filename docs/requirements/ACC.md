# Accounts and Onboarding (ACC)


3.1 Functional requirements and acceptance criteria

ACC-01 Sign-in with two-factor authentication and biometric or passcode lock

US-ACC-01-01. As a parent, I want to sign in with a second check, so that my family and agency data stay private.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-ACC-01-01      The system shall let a person create an account by entering email, display_name and a password. The language is English.

  FR-ACC-01-02      1 to email and display_name, and shall require a password of at least 8 characters. It shall show ERR-01, ERR-03, ERR-04 or ERR-10 when a rule is not met.

  FR-ACC-01-03      The system shall set the role of a new account to Parent when the person signs up on their own, and to Co-parent when the account is created by accepting a co-parent invite.

  FR-ACC-01-04      The system shall use email and password as the first sign-in step.

  FR-ACC-01-05      After the first step, the system shall send a one-time code to the verified email of the user and ask for it as the second check. A user with a verified mobile_number can choose to get the code by text instead. The code has 6 digits, is valid for 10 minutes and works once.

  FR-ACC-01-06      The system shall not open any module for a user until the second check is passed.

  FR-ACC-01-07      If the code is wrong, expired or already used, the system shall keep the user signed out and shall show ERR-02.

  FR-ACC-01-08      The system shall let the user ask for a new code. The earlier code stops working.

  FR-ACC-01-09      After 5 consecutive failed sign-in attempts (wrong password or wrong code), the system shall set the account status to Locked for 15 minutes and show ERR-11. After 15 minutes the status returns to Active. A successful sign-in sets the count of failed attempts to 0.

  FR-ACC-01-10      The system shall let a user turn on a passcode lock with a passcode of exactly 6 digits and shall show ERR-13 for any other passcode. When a signed-in user with the lock on opens the app, the system shall ask for the passcode before it shows any data. The passcode does not replace two-factor sign-in.

  FR-ACC-01-11      After 5 wrong passcodes in a row, the system shall sign the user out and show ERR-12.

  FR-ACC-01-12      The system shall write an audit log entry for every sign-in, every account lock and every change to the passcode lock, with actor, time and result.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The decisions for the sign-in steps, the passcode lock and the deferred biometric lock, and the account lock are in section 15.1. Account creation checks, email verification, password reset and profile change are in ACC-09 to ACC-11 (proposed). The numbers in these requirements are BA proposals that Security confirms.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                  **When**                                                                                      **Then**                                                                                                                       **Covers**
  -------------- -------------------------------------------------------------------------- --------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------ ----------------------------
  AC-ACC-01-01   A visitor with no account                                                  They enter a new email, a display_name of 1 to 60 characters and a password of 8 characters   The account is created with the role Parent and the language English, and the user is asked to verify the email (ACC-09)       FR-ACC-01-01, FR-ACC-01-03

  AC-ACC-01-02   An account exists with the email Parent@Example.com                        A visitor creates an account with parent@example.com                                          No account is created and ERR-01 shows                                                                                         FR-ACC-01-02

  AC-ACC-01-03   A visitor                                                                  They leave display_name empty, or enter 61 characters                                         No account is created and ERR-03 shows                                                                                         FR-ACC-01-02

  AC-ACC-01-04   A visitor                                                                  They enter the email name@                                                                    No account is created and ERR-04 shows                                                                                         FR-ACC-01-02

  AC-ACC-01-05   A visitor                                                                  They enter a password of 7 characters                                                         No account is created and ERR-10 shows                                                                                         FR-ACC-01-02

  AC-ACC-01-06   A person with a valid co-parent invite                                     They accept it and create an account                                                          The account has the role Co-parent                                                                                             FR-ACC-01-03

  AC-ACC-01-07   A user with a verified email                                               They enter the correct email and password                                                     A 6-digit code is sent to the email and the code screen shows                                                                  FR-ACC-01-04, FR-ACC-01-05

  AC-ACC-01-08   A user with a verified mobile_number                                       They choose to get the code by text                                                           A 6-digit code is sent by text                                                                                                 FR-ACC-01-05

  AC-ACC-01-09   A user who passed the first step                                           They enter the correct code within 10 minutes                                                 The user is signed in and the modules open                                                                                     FR-ACC-01-05, FR-ACC-01-06

  AC-ACC-01-10   A user who passed the first step                                           They enter a wrong code                                                                       The user stays signed out, ERR-02 shows, and the audit log shows the result Failed                                             FR-ACC-01-07, FR-ACC-01-12

  AC-ACC-01-11   A code that is 11 minutes old, or was already used                         The user enters it                                                                            The user stays signed out and ERR-02 shows                                                                                     FR-ACC-01-07

  AC-ACC-01-12   A user who asks for a new code                                             The new code is sent                                                                          The earlier code no longer works                                                                                               FR-ACC-01-08

  AC-ACC-01-13   A user who failed 4 sign-in attempts in a row                              They fail a 5th time                                                                          The status is Locked, ERR-11 shows, the lock is in the audit log, and a correct password and code are refused for 15 minutes   FR-ACC-01-09, FR-ACC-01-12

  AC-ACC-01-14   An account locked at 10:00                                                 The user signs in correctly at 10:16                                                          The status is Active and the user is signed in                                                                                 FR-ACC-01-09

  AC-ACC-01-15   A user who has not passed the second check                                 They open the address of any module directly                                                  No module data shows                                                                                                           FR-ACC-01-06

  AC-ACC-01-16   A signed-in user who turned on the passcode lock with a 6-digit passcode   They open the app again                                                                       The app asks for the passcode before it shows any data                                                                         FR-ACC-01-10

  AC-ACC-01-17   A signed-in user with the passcode lock on                                 They enter a wrong passcode 5 times in a row                                                  The user is signed out and ERR-12 shows                                                                                        FR-ACC-01-11

  AC-ACC-01-18   A signed-in user                                                           They enter a passcode of 5 digits when they turn on the lock                                  The lock is not turned on and ERR-13 shows                                                                                     FR-ACC-01-10

  AC-ACC-01-19   A user who signs in successfully                                           The sign-in finishes                                                                          One audit log entry exists with the actor, the time in UTC and the result Success                                              FR-ACC-01-12
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACC-02 Invite the co-parent by text, email or link, with invite status

US-ACC-02-01. As a parent, I want to invite my co-parent by text, email or link, so that we can use the app together.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-ACC-02-01       The system shall let a parent invite the co-parent by text, by email or by link.

  FR-ACC-02-02       The system shall create an invite with the channel Text, Email or Link and the status Sent when the invite goes out. The invite expires 7 days after sent_at.

  FR-ACC-02-03       The system shall show the parent the status of every invite as Sent, Opened, Accepted, Expired or Cancelled.

  FR-ACC-02-04       The system shall change the status to Opened when the person opens the invite and to Accepted when the person accepts it.

  FR-ACC-02-05       The system shall send text and email invites through the Notifications module.

  FR-ACC-02-06       The system shall log every invite as a contact-attempt entry (see ACC-05), including an invite that could not be sent.

  FR-ACC-02-07       The system shall require a person who accepts an invite to create an account with the role Co-parent and pass two-factor sign-in before any module opens.

  FR-ACC-02-08       When the co-parent accepts the invite, the system shall add the co-parent to the household of the parent and set the household mode to Linked.

  FR-ACC-02-09       The system shall keep one valid invite at a time. The latest invite sent is the valid one.

  FR-ACC-02-10       The system shall let a parent send a new invite only when the earlier invite is Expired or Cancelled, or 24 hours have passed since the earlier invite was sent. Otherwise the system shall show ERR-14 and shall not create the invite.

  FR-ACC-02-11       When a new invite is sent while the earlier invite is still Sent or Opened, the system shall set the earlier invite to Expired and stop its link from working.

  FR-ACC-02-12       The system shall let a parent cancel an invite that is Sent or Opened. The status becomes Cancelled and the link stops working. The parent can then send a new invite at once.

  FR-ACC-02-13       If a person opens an invite that is Expired or Cancelled, the system shall not accept it and shall show ERR-16.

  FR-ACC-02-14       If an invite cannot be sent, the system shall show ERR-05 and shall not show the status Sent.

  FR-ACC-02-15       The system shall show ERR-04 for an email that is not valid and ERR-08 for a mobile number that is not valid, and shall not create the invite.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1\. The values 7 days and 24 hours are BA proposals that the Manager confirms.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                      **When**                                                                      **Then**                                                                                                                            **Covers**
  -------------- ------------------------------------------------------------------------------ ----------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------
  AC-ACC-02-01   A signed-in parent                                                             They enter a valid email and choose Email                                     An invite with the channel Email and the status Sent is created, the email is sent, and a contact-attempt entry exists              FR-ACC-02-01, FR-ACC-02-02, FR-ACC-02-05, FR-ACC-02-06

  AC-ACC-02-02   A signed-in parent                                                             They enter +12025550123 and choose Text                                       An invite with the channel Text and the status Sent is created, the text is sent, and a contact-attempt entry exists                FR-ACC-02-01, FR-ACC-02-02, FR-ACC-02-05, FR-ACC-02-06

  AC-ACC-02-03   A signed-in parent                                                             They choose Link                                                              An invite with the channel Link and the status Sent is created and the system shows a link the parent can share                     FR-ACC-02-01, FR-ACC-02-02

  AC-ACC-02-04   An invite with the status Sent                                                 The person opens it                                                           The status changes to Opened                                                                                                        FR-ACC-02-04

  AC-ACC-02-05   An invite with the status Opened                                               The person accepts it and completes account creation and two-factor sign-in   The status is Accepted, the co-parent is in the household of the parent with the role Co-parent, and the household mode is Linked   FR-ACC-02-04, FR-ACC-02-07, FR-ACC-02-08

  AC-ACC-02-06   An invite with sent_at 2027-01-01 10:00 UTC that nobody accepted               The time reaches 2027-01-08 10:00 UTC                                         The status is Expired                                                                                                               FR-ACC-02-02, FR-ACC-02-03

  AC-ACC-02-07   A parent whose invite was sent 2 hours ago and is still Sent                   They try to send a new invite                                                 No invite is created and ERR-14 shows                                                                                               FR-ACC-02-10

  AC-ACC-02-08   A parent whose invite was sent 25 hours ago and is still Sent                  They send a new invite                                                        The new invite has the status Sent, the earlier invite is Expired, and the earlier link shows ERR-16 when opened                    FR-ACC-02-09, FR-ACC-02-10, FR-ACC-02-11, FR-ACC-02-13

  AC-ACC-02-09   An invite with the status Sent or Opened                                       The parent cancels it                                                         The status is Cancelled, MSGT-08 shows, and the link stops working                                                                  FR-ACC-02-03, FR-ACC-02-12

  AC-ACC-02-10   A parent who just cancelled an invite                                          They send a new invite                                                        The new invite is created with the status Sent                                                                                      FR-ACC-02-12

  AC-ACC-02-11   An invite that is Cancelled or Expired                                         A person opens its link                                                       The invite is not accepted and ERR-16 shows                                                                                         FR-ACC-02-13

  AC-ACC-02-12   A signed-in parent                                                             They enter the email name@ and choose Email                                   No invite is created and ERR-04 shows                                                                                               FR-ACC-02-15

  AC-ACC-02-13   A signed-in parent                                                             They enter 12345 as the mobile number and choose Text                         No invite is created and ERR-08 shows                                                                                               FR-ACC-02-15

  AC-ACC-02-14   A signed-in parent and a send that the email or text service does not accept   They send an invite                                                           ERR-05 shows, the status Sent does not show, and a result entry with the result Failed exists                                       FR-ACC-02-06, FR-ACC-02-14

  AC-ACC-02-15   A parent with one Expired invite and one Sent invite                           They open the invite list                                                     Each invite shows its channel and its status                                                                                        FR-ACC-02-03
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACC-03 Solo Mode

US-ACC-03-01. As a parent, I want to keep my records without my co-parent joining, so that I still have a full record.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-ACC-03-01        The system shall let a parent choose Solo Mode.

  FR-ACC-03-02        The system shall set the household mode to Solo when the parent chooses Solo Mode.

  FR-ACC-03-03        While the household mode is Solo, the system shall keep the parent\'s records in full.

  FR-ACC-03-04        In Solo Mode, the system shall give the parent the features that the feature list marks Must-have or Good-to-have and that work with one parent.The Unique features in Child Support Sync (CSS-01 to CSS-11) and Safety Mode (SAF-01) are also available in Solo Mode when they are released.

  FR-ACC-03-05        The system shall make the household mode available to so that BR-03 can be applied.

  FR-ACC-03-06        When the co-parent accepts an invite to a household in Solo Mode, the system shall change the household mode to Linked and keep every record already saved, unchanged and complete.

  FR-ACC-03-07        The system shall write an audit log entry when the household mode changes.

  FR-ACC-03-08        If the household mode cannot be saved, the system shall keep the earlier mode and show ERR-06.

  FR-ACC-03-09        After the co-parent joins, the system shall keep the records saved in Solo Mode visible only to the parent until the parent shares them.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                              **When**                                                                                     **Then**                                                                                                                  **Covers**
  -------------- -------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------- ------------------------------------------
  AC-ACC-03-01   A signed-in parent with no linked co-parent                                            They choose Solo Mode                                                                        The household mode is Solo and an audit log entry is saved                                                                FR-ACC-03-01, FR-ACC-03-02, FR-ACC-03-07

  AC-ACC-03-02   A household with the mode Solo                                                         reads the household mode                                                                     It reads Solo                                                                                                             FR-ACC-03-05

  AC-ACC-03-03   A household with the mode Solo                                                         The parent saves an item in a Must-have or Good-to-have feature that works with one parent   The item is saved in the parent\'s record with date and time                                                              FR-ACC-03-03, FR-ACC-03-04

  AC-ACC-03-04   A signed-in parent and a save error                                                    They choose Solo Mode                                                                        The household mode stays as it was and ERR-06 shows                                                                       FR-ACC-03-08

  AC-ACC-03-05   A household in Solo Mode with 3 saved records                                          The co-parent accepts an invite                                                              The mode is Linked, the 3 records are still there with the same content, date and time, and an audit log entry is saved   FR-ACC-03-06, FR-ACC-03-07

  AC-ACC-03-06   A household that was in Solo Mode with 3 saved records, and the co-parent has joined   The co-parent opens the shared modules                                                       The co-parent cannot see the 3 records until the parent shares them                                                       FR-ACC-03-09

  AC-ACC-03-07   A household with the mode Solo and Child Support Sync released                         The parent links their own child support case                                                The link works without the co-parent                                                                                      FR-ACC-03-04

  AC-ACC-03-08   A household with the mode Solo                                                         The parent turns on Safety Mode                                                              Safety Mode works without the co-parent                                                                                   FR-ACC-03-04
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACC-04 Reach a co-parent who is not on the app

US-ACC-04-01. As a parent, I want to send a text or email to my co-parent when they are not on the app, so that I keep a full record of what I sent.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------
  FR-ACC-04-01         The system shall let a parent send a message by text or by email to a co-parent who is not on the app.

  FR-ACC-04-02         The system shall send the text or email through the Notifications module.

  FR-ACC-04-03         The system shall save the whole exchange in the parent\'s record, with date and time on every message.

  FR-ACC-04-04         When the co-parent replies to the text or email, the system shall add the reply to the same exchange in the parent\'s record, with date and time.

  FR-ACC-04-05         The system shall not let a sent message be edited or deleted.

  FR-ACC-04-06         The system shall show the delivery status of each message as Sent, Delivered or Failed, as reported by the Notifications module.

  FR-ACC-04-07         The system shall create a contact-attempt entry for every message sent (see ACC-05).

  FR-ACC-04-08         If a text or email cannot be delivered, the system shall show ERR-07.

  FR-ACC-04-09         The system shall show ERR-04 for an email that is not valid and ERR-08 for a mobile number that is not valid, and shall not send the message.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1\. Texts and emails to a person who is not on the app follow the approach of other co-parenting apps (AppClose lists messaging to non-app users by text or email). Legal confirms this before launch.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                  **When**                                             **Then**                                                                                                                     **Covers**
  -------------- ---------------------------------------------------------- ---------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------
  AC-ACC-04-01   A signed-in parent and a co-parent who is not on the app   The parent sends a text to +12025550123              The text is sent, it is saved in the record with date and time, and a contact-attempt entry with the channel Text exists     FR-ACC-04-01, FR-ACC-04-02, FR-ACC-04-03, FR-ACC-04-07

  AC-ACC-04-02   A signed-in parent and a co-parent who is not on the app   The parent sends an email to a valid email address   The email is sent, it is saved in the record with date and time, and a contact-attempt entry with the channel Email exists   FR-ACC-04-01, FR-ACC-04-02, FR-ACC-04-03, FR-ACC-04-07

  AC-ACC-04-03   A text the parent sent                                     The co-parent replies to it                          The reply is added to the same exchange in the record with date and time                                                     FR-ACC-04-04

  AC-ACC-04-04   A sent message                                             The parent looks for a way to edit or delete it      No edit or delete option is available, and a direct request to change it is rejected                                         FR-ACC-04-05

  AC-ACC-04-05   A text that the phone network delivers                     The Notifications module reports it                  The message shows the status Delivered                                                                                       FR-ACC-04-06

  AC-ACC-04-06   A signed-in parent and a text that cannot be delivered     The parent sends the text                            ERR-07 shows, the message shows the status Failed, and the attempt is in the contact-attempt log                             FR-ACC-04-06, FR-ACC-04-07, FR-ACC-04-08

  AC-ACC-04-07   A signed-in parent                                         They enter 12345 as the mobile number                No message is sent and ERR-08 shows                                                                                          FR-ACC-04-09

  AC-ACC-04-08   A signed-in parent                                         They enter the email name@                           No message is sent and ERR-04 shows                                                                                          FR-ACC-04-09
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACC-05 Contact-attempt log

US-ACC-05-01. As a parent, I want a log of every time I tried to reach my co-parent, so that I can see when and how I tried.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-ACC-05-01       The system shall create a contact-attempt entry for every invite and every message to a co-parent who is not on the app, including an attempt that fails.

  FR-ACC-05-02       The system shall save the contact-attempt entry before it sends the invite or message. If the entry cannot be saved, the system shall not send it and shall show ERR-18.

  FR-ACC-05-03       After the send outcome is known, the system shall add a result entry (Success or Failed) linked to the attempt. The attempt entry stays as it was.

  FR-ACC-05-04       The system shall save the date and time of each attempt in UTC and show it in the user\'s local time.

  FR-ACC-05-05       The system shall save the type (Invite or Message) and the channel (Text, Email or Link) of each attempt.

  FR-ACC-05-06       The system shall let the parent view the log, with each attempt and its result.

  FR-ACC-05-07       The system shall not let anyone edit or delete a contact-attempt entry or a result entry.

  FR-ACC-05-08       The system shall make the log available to Records and Court.

  FR-ACC-05-09       The system shall show the invite list, the contact-attempt log and the exchange with a co-parent who is not on the app only to the parent who made them. A professional can read them only when the parent shares them. They go into an export only when the parent selects them.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.1.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                       **When**                                                                             **Then**                                                                                                                                                                 **Covers**
  -------------- ------------------------------------------------------------------------------- ------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------
  AC-ACC-05-01   A parent sends an invite by Email                                               The invite is sent                                                                   An attempt entry with the type Invite, the channel Email and the date and time was saved before the send, and a result entry with the result Success is added after it   FR-ACC-05-01, FR-ACC-05-02, FR-ACC-05-03, FR-ACC-05-05

  AC-ACC-05-02   A parent sends a text to a co-parent who is not on the app and delivery fails   The failure is returned                                                              A result entry with the result Failed is added and the attempt entry is not changed                                                                                      FR-ACC-05-01, FR-ACC-05-03, FR-ACC-05-05

  AC-ACC-05-03   A parent who made 3 attempts                                                    They open the log                                                                    All 3 attempts show with date, time, channel and result                                                                                                                  FR-ACC-05-06

  AC-ACC-05-04   A contact-attempt entry or a result entry                                       Anyone tries to edit or delete it                                                    The change is not possible                                                                                                                                               FR-ACC-05-07

  AC-ACC-05-05   A contact-attempt entry                                                         Records and Court asks for the entries                                               The entries are available. The export format is owned by Records and Court.                                                                                              FR-ACC-05-08

  AC-ACC-05-06   An entry saved as 2027-01-15 14:00 UTC                                          A user in US Eastern time views it                                                   It shows as 09:00 on January 15, 2027                                                                                                                                    FR-ACC-05-04

  AC-ACC-05-07   A parent and an attempt entry that cannot be saved                              They send an invite or a message                                                     Nothing is sent and ERR-18 shows                                                                                                                                         FR-ACC-05-02

  AC-ACC-05-08   A parent with a linked co-parent                                                The co-parent or a Third party tries to open the contact-attempt log of the parent   The log does not show                                                                                                                                                    FR-ACC-05-09

  AC-ACC-05-09   A parent who exports records                                                    They do not select the contact-attempt log                                           The export has no contact-attempt entries                                                                                                                                FR-ACC-05-09
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACC-06 User-set session timeout and draft auto-save

US-ACC-06-01. As a user, I want to choose how long I stay signed in and not lose my drafts, so that I am not signed out too soon and do not lose my text.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-ACC-06-01        The system should let a user set a session timeout. The values are 15, 30 and 60 minutes; the default is 30 minutes.

  FR-ACC-06-02        When the session timeout ends, the system should sign the user out.

  FR-ACC-06-03        The system should let the user sign back in with the passcode lock set up under ACC-01. On a trusted device within 30 days the passcode replaces the second check; otherwise the second check is needed.

  FR-ACC-06-04        The system should save drafts automatically while the user writes. Drafts are saved every 10 seconds and kept for 30 days.

  FR-ACC-06-05        The system should keep a saved draft after the session ends, so the user finds it after signing in again.

  FR-ACC-06-06        The system should write an audit log entry when the user changes the session timeout.

  FR-ACC-06-07        If a draft cannot be saved, the system should show ERR-09.

  FR-ACC-06-08        If the session timeout cannot be saved, the system should keep the earlier value and show ERR-06.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                         **When**                                        **Then**                                                     **Covers**
  -------------- ----------------------------------------------------------------- ----------------------------------------------- ------------------------------------------------------------ ----------------------------
  AC-ACC-06-01   A signed-in user                                                  They choose an allowed timeout value and save   The system keeps the value and writes an audit log entry     FR-ACC-06-01, FR-ACC-06-06

  AC-ACC-06-02   A user with a session timeout set                                 They are inactive for the full timeout          The user is signed out and MSGT-04 shows                     FR-ACC-06-02

  AC-ACC-06-03   A user who turned on the lock and was signed out by the timeout   They sign back in with the lock                 The user is signed in as set in Session and draft settings   FR-ACC-06-03

  AC-ACC-06-04   A user writing a draft                                            The auto-save runs                              The draft is saved                                           FR-ACC-06-04

  AC-ACC-06-05   A saved draft and a sign-out by timeout                           The user signs in again                         The draft is there                                           FR-ACC-06-05

  AC-ACC-06-06   A user writing a draft and a save error                           The auto-save runs                              ERR-09 shows                                                 FR-ACC-06-07

  AC-ACC-06-07   A signed-in user and a save error                                 They save a timeout value                       The earlier value stays and ERR-06 shows                     FR-ACC-06-08
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACC-07 Household roles: parent, child and third party

US-ACC-07-01. As a parent, I want to add my child and trusted adults to my household with the access I choose, so that each person sees only what I allow.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- ----------------------------------------------------------------------------------------------------------------------------------------
  FR-ACC-07-01         The system should let a parent add a household member with the role Parent, Child or Third party.

  FR-ACC-07-02         The system should let the parents set what a Child can see, limited to messages and calendar view.

  FR-ACC-07-03         The system should let the parents set which parts of the calendar a Third party can see and whether the Third party receives messages.

  FR-ACC-07-04         The system should allow only the Parent role to add, change or remove household members.

  FR-ACC-07-05         The system should collect only the data needed to run a Child account.

  FR-ACC-07-06         The system should not release Child accounts until legal review is done and the parent consent steps are set.

  FR-ACC-07-07         The system should write an audit log entry for every add, change and removal of a household member.

  FR-ACC-07-08         If a household change cannot be saved, the system should keep the earlier setting and show ERR-06.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------

Who can add or remove members, what a Third party sees by default.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                           **When**                                                                            **Then**                                                                                      **Covers**
  -------------- ----------------------------------------------------------------------------------- ----------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------- ----------------------------
  AC-ACC-07-01   A signed-in parent                                                                  They add a member with the role Third party and allow some parts of the calendar    The member has the role Third party and can open only the calendar parts the parent allowed   FR-ACC-07-01, FR-ACC-07-03

  AC-ACC-07-02   A Child with access set to messages and calendar view                               The child signs in                                                                  The child can open messages and view the calendar and cannot open any other module            FR-ACC-07-02

  AC-ACC-07-03   A signed-in user with the role Third party                                          They try to add a household member                                                  The request is rejected                                                                       FR-ACC-07-04

  AC-ACC-07-04   A signed-in parent                                                                  They add, change or remove a household member                                       An audit log entry is saved for each action                                                   FR-ACC-07-07

  AC-ACC-07-05   A signed-in parent and a save error                                                 They change a household member                                                      The earlier setting stays and ERR-06 shows                                                    FR-ACC-07-08

  AC-ACC-07-06   A Child account is created                                                          The data collected is checked against the field list approved in the legal review   Only the approved fields are collected                                                        FR-ACC-07-05

  AC-ACC-07-07   A build made before the legal review is done and the parent consent steps are set   A parent tries to add a member with the role Child                                  The role Child is not offered                                                                 FR-ACC-07-06
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACC-08 English

  -----------------------------------------------------------------------------------------------------------------
  **ID**          **Requirement**
  --------------- -------------------------------------------------------------------------------------------------
  ---             The system should let a user choose the language when creating the account and change it later.

  ---             If the language cannot be saved, the system should keep the earlier language and show ERR-06.
  -----------------------------------------------------------------------------------------------------------------

ACC-09 Email verification at sign-up

US-ACC-09-01. As a parent, I want to confirm my email address, so that only I can use my account and receive my codes.

  -------------------------------------------------------------------------------------------------------------------------------------
  **ID**                **Requirement**
  --------------------- ---------------------------------------------------------------------------------------------------------------
  FR-ACC-09-01          After an account is created, the system shall send a verification link to the email address entered.

  FR-ACC-09-02          The verification link shall be valid for 24 hours and work once.

  FR-ACC-09-03          The system shall not let a user sign in until the email is verified, and shall show ERR-17 if the user tries.

  FR-ACC-09-04          The system shall let the user ask for a new verification link. The earlier link stops working.

  FR-ACC-09-05          If the link has expired or was already used, the system shall show ERR-15.

  FR-ACC-09-06          The system shall write an audit log entry when an email is verified.
  -------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                   **When**                  **Then**                                                                       **Covers**
  -------------- ----------------------------------------------------------- ------------------------- ------------------------------------------------------------------------------ ------------------------------------------
  AC-ACC-09-01   A new account                                               The account is created    A verification link is sent to the email and MSGT-06 shows                     FR-ACC-09-01

  AC-ACC-09-02   A link sent 1 hour ago                                      The user opens it         The email is verified, the user can sign in, and an audit log entry is saved   FR-ACC-09-02, FR-ACC-09-03, FR-ACC-09-06

  AC-ACC-09-03   A link sent 25 hours ago, or a link that was already used   The user opens it         The link is not accepted and ERR-15 shows                                      FR-ACC-09-02, FR-ACC-09-05

  AC-ACC-09-04   A user whose email is not verified                          They try to sign in       The user is not signed in and ERR-17 shows                                     FR-ACC-09-03

  AC-ACC-09-05   A user whose email is not verified                          They ask for a new link   A new link is sent and the earlier link stops working                          FR-ACC-09-04
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACC-10 Password reset

US-ACC-10-01. As a user, I want to reset my password, so that I can get back into my account.

  ---------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- ------------------------------------------------------------------------------------------------------------------------------
  FR-ACC-10-01         The system shall let a user ask for a password reset link by entering their email.

  FR-ACC-10-02         The system shall show MSGT-07 whether or not an account exists for the email entered.

  FR-ACC-10-03         The system shall send the reset link to the email of the account. The link shall be valid for 1 hour and work once.

  FR-ACC-10-04         The system shall ask for a new password of at least 8 characters and shall show ERR-10 for a shorter one.

  FR-ACC-10-05         After a reset, the old password shall stop working. The user signs in with the email, the new password and the second check.

  FR-ACC-10-06         If the link has expired or was already used, the system shall show ERR-15.

  FR-ACC-10-07         The system shall write an audit log entry for every password reset.
  ---------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                        **When**                                                      **Then**                                                                                **Covers**
  -------------- ---------------------------------------------------------------- ------------------------------------------------------------- --------------------------------------------------------------------------------------- ------------------------------------------
  AC-ACC-10-01   An account with a verified email                                 The user enters that email on the reset screen                A reset link is sent and MSGT-07 shows                                                  FR-ACC-10-01, FR-ACC-10-02, FR-ACC-10-03

  AC-ACC-10-02   An email that has no account                                     A person enters it on the reset screen                        MSGT-07 shows and no email is sent                                                      FR-ACC-10-02

  AC-ACC-10-03   A reset link sent 30 minutes ago                                 The user opens it and enters a new password of 8 characters   The password is changed, the old password is refused, and an audit log entry is saved   FR-ACC-10-04, FR-ACC-10-05, FR-ACC-10-07

  AC-ACC-10-04   A valid reset link                                               The user enters a new password of 7 characters                The password is not changed and ERR-10 shows                                            FR-ACC-10-04

  AC-ACC-10-05   A reset link sent 61 minutes ago, or one that was already used   The user opens it                                             The link is not accepted and ERR-15 shows                                               FR-ACC-10-03, FR-ACC-10-06
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACC-11 Profile management

US-ACC-11-01. As a user, I want to change my name, email and mobile number, so that my details stay correct.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-ACC-11-01        The system shall let a user change display_name, email and mobile_number.

  FR-ACC-11-02        1 to the changed values and shall show ERR-03, ERR-04 or ERR-08 when a rule is not met.

  FR-ACC-11-03        When a user changes the email, the system shall send a verification link to the new email and keep the old email in use until the new one is verified. When a user changes the mobile_number, the system shall verify it with a one-time code sent by text.

  FR-ACC-11-04        The system shall not let a user change their own role.

  FR-ACC-11-05        The system shall write an audit log entry for every change to the profile.

  FR-ACC-11-06        If a change cannot be saved, the system shall keep the earlier value and show ERR-06.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                           **When**                                                                                 **Then**                                                                                                                      **Covers**
  -------------- ----------------------------------- ---------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-ACC-11-01   A signed-in user                    They change display_name to a name of 1 to 60 characters                                 The name is saved and an audit log entry is saved                                                                             FR-ACC-11-01, FR-ACC-11-05

  AC-ACC-11-02   A signed-in user                    They change the email to a new valid email                                               A verification link goes to the new email, the old email stays in use, and after the link is opened the new email is in use   FR-ACC-11-03

  AC-ACC-11-03   A signed-in user                    They change the mobile_number to a valid number                                          A one-time code is sent by text, and after the code is entered the new number is saved                                        FR-ACC-11-03

  AC-ACC-11-04   A signed-in user                    They try to change their role                                                            The change is not possible                                                                                                    FR-ACC-11-04

  AC-ACC-11-05   A signed-in user                    They enter a display_name of 61 characters, the email name@ or the mobile number 12345   The change is not saved and ERR-03, ERR-04 or ERR-08 shows                                                                    FR-ACC-11-02

  AC-ACC-11-06   A signed-in user and a save error   They change display_name                                                                 The earlier value stays and ERR-06 shows                                                                                      FR-ACC-11-06
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACC-12 Account closure (proposed)

US-ACC-12-01. As a user, I want to close my account and take my data with me, so that I stay in control of my personal data.

  ---------------------------------------------------------------------------------------------------------------------------
  **ID**                **Requirement**
  --------------------- -----------------------------------------------------------------------------------------------------
  FR-ACC-12-01          The system should let a user ask to close their account, with a confirm step.

  FR-ACC-12-02          Before the account closes, the system should offer the user an export of their data in PDF and CSV.

  FR-ACC-12-03          The system should keep records tied to a case under legal hold.

  FR-ACC-12-04          The system should delete the other data of the user within 30 days of the closure request.

  FR-ACC-12-05          The system should set the user status to Closed and should not let the user sign in again.

  FR-ACC-12-06          The system should write an audit log entry when an account is closed.

  FR-ACC-12-07          If the closure cannot be completed, the system should keep the account Active and show ERR-06.
  ---------------------------------------------------------------------------------------------------------------------------

What happens to shared household records and to the co-parent when one parent closes an account is open.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                 **When**                                    **Then**                                                                         **Covers**
  -------------- --------------------------------------------------------- ------------------------------------------- -------------------------------------------------------------------------------- ----------------------------
  AC-ACC-12-01   A signed-in user                                          They ask to close the account and confirm   The system offers a PDF and CSV export before the account closes                 FR-ACC-12-01, FR-ACC-12-02

  AC-ACC-12-02   A user who finished the closure steps                     The closure completes                       The status is Closed, the user cannot sign in, and an audit log entry is saved   FR-ACC-12-05, FR-ACC-12-06

  AC-ACC-12-03   Records tied to a case                                    The account is closed                       Those records stay under legal hold                                              FR-ACC-12-03

  AC-ACC-12-04   Other data of a user who asked for closure                30 days pass after the request              The data is deleted                                                              FR-ACC-12-04

  AC-ACC-12-05   A signed-in user and a closure that cannot be completed   They confirm the closure                    The account stays Active and ERR-06 shows                                        FR-ACC-12-07
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Linking, Solo Mode, dispute and access rules**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-ACC-02-16      The system shall let a person who already has an account accept an invite. On acceptance, both parents shall share one household with the mode Linked.

  FR-ACC-02-17      When two existing accounts link, the system shall keep each parent\'s earlier records private to that parent until they share them, and shall not merge or delete any record.

  FR-ACC-02-18      When both parents already have children, the system shall ask the accepting parent to match each child with a child of the other parent, or to keep it separate. A matched child shall appear once in the household.

  FR-ACC-02-19      The system shall not show whether an email address or phone number belongs to an account. Invite screens, messages and errors shall be the same in both cases.

  FR-ACC-02-20      The system shall never add a person to a household without an accepted invite.

  FR-ACC-03-10      In Solo Mode, the system shall show \'Invite your co-parent to use this\', linking to Invite co-parent, on every feature that needs the co-parent.

  FR-ACC-07-09      A third party or child added to a household shall accept through the Accept invite screen, which shall show the role they are invited for.

  FR-ACC-12-08      While a legal hold is on, the system shall not close the account and shall show the legal hold notice with a link to Legal hold.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3.2 Data reference

  --------------------------------------------------------------------------------------
  **Entity**                **Fields used**
  ------------------------- ------------------------------------------------------------
  User                      email, mobile_number, display_name, role, language, status

  Household                 mode (Linked, Solo)

  Invite                    channel (Text, Email, Link), status, sent_at

  Audit log entry           actor, action, object, result, time
  --------------------------------------------------------------------------------------

User status values are Active, Locked and Closed. Locked is set for 15 minutes after 5 consecutive failed sign-in attempts (FR-ACC-01-09). Closed is set when an account is closed (FR-ACC-12-05).

8.2 Contact-attempt entries (new, proposed). Only date and time are named in the sources (BR-02). The other fields are a BA proposal. Two entities keep the log append-only (NFR-05): the attempt and its result.

  ---------------------------------------------------------------------------------------------------
  **Field**        **Type**         **Required**   **Notes**
  ---------------- ---------------- -------------- --------------------------------------------------
  attempt_id       Unique ID        Yes            System generated

  user_id          Link to User     Yes            The parent who made the attempt

  attempt_type     Choice           Yes            Invite, Message

  channel          Choice           Yes            Text, Email, Link. Link applies to invites only.

  invite_id        Link to Invite   No             Set when attempt_type is Invite

  attempted_at     Date and time    Yes            UTC. Cannot be changed.
  ---------------------------------------------------------------------------------------------------

Contact-attempt result

  ----------------------------------------------------------------------------------------------------
  **Field**        **Type**                        **Required**   **Notes**
  ---------------- ------------------------------- -------------- ------------------------------------
  result_id        Unique ID                       Yes            System generated

  attempt_id       Link to contact-attempt entry   Yes            The attempt this result belongs to

  result           Choice                          Yes            Success, Failed

  recorded_at      Date and time                   Yes            UTC. Cannot be changed.
  ----------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------
  **Field**           **Type**        **Required**   **Notes**
  ------------------- --------------- -------------- ---------------------------------------------------------------------------
  email_verified_at   Date and time   No             UTC. Set when the verification link is opened.

  password            Credential      Yes            Never shown to anyone. At least 8 characters.

  passcode            Credential      No             6 digits. Set only when the user turns on the passcode lock.

  failed_attempts     Number          Yes            Consecutive failed sign-in attempts. Set to 0 after a successful sign-in.

  failed_passcodes    Number          Yes            Wrong passcodes in a row. Set to 0 after a correct passcode.

  locked_until        Date and time   No             UTC. Set when the status becomes Locked.
  ------------------------------------------------------------------------------------------------------------------------------

3.3 Interfaces

All four interfaces are with other modules of the app.

  -----------------------------------------------------------------------------------------------------------------------------------------
  **ID**       **With**             **What passes**                                                                        **Features**
  ------------ -------------------- -------------------------------------------------------------------------------------- ----------------
  INT-01       Notifications        Text and email invites and messages go out. The send result comes back.                ACC-02, ACC-04

  INT-02       ---                  The household mode and the link status are read.                                       ACC-03

  INT-03       Records and Court    Contact-attempt entries are read.                                                      ACC-05

  INT-04       Child Support Sync   Sign-in strength from ACC-01 is used. An agency notice can carry an invite (CSS-09).   ACC-01, ACC-02
  -----------------------------------------------------------------------------------------------------------------------------------------

3.4 Non-functional requirements

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**        **Requirement**                                                            **Where it applies here**
  ------------- -------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------
  NFR-01        Two-factor sign-in for every account (100 percent of accounts)             FR-ACC-01-05, FR-ACC-01-06, FR-ACC-02-07

  NFR-02        Encryption in transit and at rest                                          Accounts, credentials, invites and contact-attempt entries

  NFR-03        Role-based access on every request                                         FR-ACC-01-06, FR-ACC-07-04, FR-ACC-11-04

  NFR-04        Sign-ins and changes are logged with actor, time and result                FR-ACC-01-12, FR-ACC-03-07, FR-ACC-06-06, FR-ACC-07-07, FR-ACC-09-06, FR-ACC-10-07, FR-ACC-11-05, FR-ACC-12-06

  NFR-05        Records cannot be edited. A change is a new entry.                         FR-ACC-04-05, FR-ACC-05-03, FR-ACC-05-07

  NFR-06        Collect only the data that is needed                                       FR-ACC-07-05

  NFR-09        Plain language on every screen. The standard is to be chosen.2 level AA.   All screens

  NFR-11        English only.                                                              All screens
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3.7 Home, navigation and system messages

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-SYS-01-02      The system shall give every screen one main navigation in the same place. It shall list only the modules that are released and shall not show a link to a module that is not yet available.

  FR-SYS-01-05      The system shall store every date and time in UTC and shall show it in the local time of the user. The time zone comes from the browser, and the user can change it.

  FR-SYS-01-06      Every screen shall have the four designed states: empty, loading, error and success. When an unexpected problem happens, the system shall show ERR-01 with a Contact support button. The button sends the technical reference to Support and does not show it to the user.

  FR-SYS-01-07      During planned maintenance, the system shall show MSGT-02 with the end time.

  FR-SYS-01-08      The system shall show ERR-02 for a page that does not exist and ERR-03 for a page that the user may not open.

  FR-SYS-01-09      The system shall use one confirm dialog for every destructive or approval action.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                       **When**                                                      **Then**                                                                                                                            **Covers**
  -------------- ------------------------------------------------------------------------------- ------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-SYS-01-02   A signed-in user                                                                They open any screen                                          The main navigation is in the same place, lists only released modules, and has no link to a module that is not released             FR-SYS-01-02

  AC-SYS-01-05   A time saved as 2027-03-05 14:00 UTC and a user in US Eastern time              The user opens it                                             It shows 09:00 on March 5, 2027, and the user can change the time zone                                                              FR-SYS-01-05

  AC-SYS-01-06   Any screen, and an unexpected problem that a tester forces                      A tester checks the four states and then forces the problem   The four states exist, ERR-01 shows with the Contact support button, and the technical reference reaches Support and is not shown   FR-SYS-01-06

  AC-SYS-01-07   Planned maintenance                                                             A user opens the app                                          MSGT-02 shows with the end time                                                                                                     FR-SYS-01-07

  AC-SYS-01-08   A page that does not exist, and a page that the role of the user may not open   The user opens each                                           ERR-02 shows for the first and ERR-03 for the second                                                                                FR-SYS-01-08

  AC-SYS-01-09   A destructive action and an approval action in two different modules            A user starts each                                            The same confirm dialog shows for both                                                                                              FR-SYS-01-09
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-SYS-03-08     When the phone is offline, the web app should show MSGT-06 and should keep what the user typed on the device until the connection is back. If the user tries to send while offline, the web app should show ERR-04 and keep the text.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                **When**                                                **Then**                                                                                                                               **Covers**
  -------------- -------------------------------------------------------- ------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-SYS-03-08   A phone that loses its connection while the user types   The user keeps typing and then the connection returns   MSGT-06 shows, the typed text is still there, and it can be sent after the connection returns, and a send while offline shows ERR-04   FR-SYS-03-08

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- --------------------------------------------------------------------------------------------------------------------------
  FR-SYS-05-08         The system shall warn the user at least 2 minutes before a session ends and shall let the user stay signed in (MSGT-03).

  -----------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                              **When**         **Then**                                         **Covers**
  -------------- -------------------------------------- ---------------- ------------------------------------------------ --------------
  AC-SYS-05-08   A session that will end in 2 minutes   The time comes   MSGT-03 shows, and the user can stay signed in   FR-SYS-05-08

  --------------------------------------------------------------------------------------------------------------------------------------
