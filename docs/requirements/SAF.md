# Safety and Privacy (SAF)


13.1 Functional requirements and acceptance criteria

SAF-01 Safety Mode for survivors of abuse

US-SAF-01-01. As a parent who is afraid of the other parent, I want one switch that hides my details and makes the app discreet, so that I can use the app without putting myself at risk.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Requirement**
  --------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-SAF-01-01    The system shall let any user turn Safety Mode on from the settings, at any time. It needs no proof and no flag. The system shall first show the safety notice (MSGT-01) and ask the user to confirm, and then show MSGT-02.

  FR-SAF-01-02    The system shall keep the Safety Mode setting private to the user. It shall not show the setting, a label or any sign of it to the co-parent, a professional, a Third party or support staff.

  FR-SAF-01-03    To turn Safety Mode off, the system shall ask for a one-time code sent to the verified email or mobile number of the user (MSGT-03). If the code is wrong, expired or already used, Safety Mode stays on and the system shall show ERR-01. When the code is right, the system shall turn Safety Mode off and show MSGT-04.

  FR-SAF-01-04    While Safety Mode is on, the system shall hide from the co-parent, a professional and a Third party any address the user entered, and the location of every event, until the user shares that item. It shall show MSGT-05 or MSGT-06 in place of a hidden detail.

  FR-SAF-01-05    While Safety Mode is on, the system shall not offer check-ins at exchanges, and shall send events to an outside calendar with no location and no details.

  FR-SAF-01-06    While Safety Mode is on, the system shall not show the email or the mobile number of the user to the co-parent, a professional or a Third party. It shall hide the phone number and the email of an entry that the user created, and shall not show the phone number of the user in a call.

  FR-SAF-01-07    While Safety Mode is on, the system shall send every alert with no sender name, no message text, no event title and no other detail, and shall lock the alert preview level at Hidden (FR-SAF-02-02).

  FR-SAF-01-08    While Safety Mode is on, the system shall send an SMS or an email with the text MSGT-09 and no app name in the sender, the subject or the text.

  FR-SAF-01-09    While Safety Mode is on, the system shall not show the first-read time or the status Read of a message to the sender.

  FR-SAF-01-10    While Safety Mode is on, the system shall not offer mediation (MSG-12) or emergency contacts (DOC-07), and shall make new photo albums Private by default (DOC-03).

  FR-SAF-01-11    Safety Mode shall not switch off the report tool, the tone check, the incoming message shield, the journal or exports.

  FR-SAF-01-12    The system shall never show the IP address, the device or the login location of a user to the co-parent or to a professional.

  FR-SAF-01-13    While Safety Mode is on, the system shall show a button called Exit now on every screen, in the same place. A user can also use it by pressing the Escape key twice.

  FR-SAF-01-14    When the user uses Exit now and then confirms Leave now, the system shall replace the current page in the browser history with a neutral page that loads quickly, so that the Back button does not return to the app. It shall sign the user out. Advocates choose the neutral page.

  FR-SAF-01-15    The safety notice (MSGT-01) shall say that Exit now does not delete the browser history and does not stop spyware, that a safer device is better, and where to get help.

  FR-SAF-01-16    The system shall give a public safety resources page that needs no sign-in. It shows the National Domestic Violence Hotline at 1-800-799-7233 and TTY 1-800-787-3224, the line 911 if it is safe to call, and the help links that advocates approve (MSGT-08).

  FR-SAF-01-17    The system should offer Safety Mode to a parent when Child Support Sync reports a family violence flag on the case of that parent. This applies only when the agency allows the flag and the advocates approve it. The system should show MSGT-07 only to that parent, should not show or share the flag with the other parent, and should show the offer once. The parent can turn Safety Mode on later from the settings.

  FR-SAF-01-18    The system shall offer Safety Mode for every user and in Solo Mode.

  FR-SAF-01-19    The system shall offer Safety Mode only in a release where the approval of the advocates and of the survivor panel is recorded as done.

  FR-SAF-01-20    The system shall write an audit log entry whenever a user turns Safety Mode on or off, with actor, time and result. The audit log entry is not visible to the co-parent.

  FR-SAF-01-21    If the Safety Mode setting cannot be saved, the system shall keep the earlier setting and show ERR-02.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                    **When**                                                                                                                                 **Then**                                                                                                                                      **Covers**
  -------------- -------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-SAF-01-01   A signed-in user with no case link                                                           They choose Safety Mode in the settings, read MSGT-01 and confirm                                                                        Safety Mode is on, MSGT-02 shows, and no payment, proof or flag was asked                                                                     FR-SAF-01-01

  AC-SAF-01-02   A user with Safety Mode on                                                                   The co-parent, a professional, a Third party and a member of support staff look at the user                                              None of them sees the setting, a label or any sign of Safety Mode                                                                             FR-SAF-01-02

  AC-SAF-01-03   A user with Safety Mode on                                                                   They ask to turn it off, enter a wrong code, then the right code                                                                         The wrong code is refused with ERR-01 and Safety Mode stays on. After the right code Safety Mode is off and MSGT-04 shows.                    FR-SAF-01-03

  AC-SAF-01-04   A user with Safety Mode on who saved an entry with an address and an event with a location   The co-parent opens the entry and the event                                                                                              The address and the location are hidden and MSGT-05 and MSGT-06 show. They show after the user shares each item.                              FR-SAF-01-04

  AC-SAF-01-05   A user with Safety Mode on                                                                   The user opens an exchange, and an event is sent to an outside calendar                                                                  Check-in is not offered, and the outside calendar entry has no location and no details                                                        FR-SAF-01-05

  AC-SAF-01-06   A user with Safety Mode on                                                                   The co-parent, a professional and a Third party look for the email and the mobile number of the user, and the phone number in an entry   None of them sees any of these                                                                                                                FR-SAF-01-06

  AC-SAF-01-07   A user with Safety Mode on                                                                   A message arrives, an event reminder is due, and the user looks for a way to change the preview level                                    Both alerts show no sender name, no text and no title, and the preview level cannot be changed                                                FR-SAF-01-07

  AC-SAF-01-08   A user with Safety Mode on and an unread message                                             The SMS and the email steps run                                                                                                          Both carry the text MSGT-09 and no app name                                                                                                   FR-SAF-01-08

  AC-SAF-01-09   A message that a user in Safety Mode has read                                                The sender opens the message                                                                                                             The sender sees Sent and Delivered and no first-read time and no Read                                                                         FR-SAF-01-09

  AC-SAF-01-10   A user with Safety Mode on                                                                   The user opens the messaging screen, the child information and the photo albums                                                          Mediation and emergency contacts are not offered, and a new album is Private                                                                  FR-SAF-01-10

  AC-SAF-01-11   A user with Safety Mode on                                                                   The user opens the report tool, the tone check, the shield, the journal and an export                                                    All of them work                                                                                                                              FR-SAF-01-11

  AC-SAF-01-12   A user with Safety Mode on who signed in from two places                                     The co-parent and a professional look for login details                                                                                  No IP address, device or login location shows                                                                                                 FR-SAF-01-12

  AC-SAF-01-13   A user with Safety Mode on                                                                   The user opens three different screens, and later presses Escape twice                                                                   Exit now shows in the same place on each screen and the Escape shortcut works                                                                 FR-SAF-01-13

  AC-SAF-01-14   A user with Safety Mode on                                                                   The user uses Exit now, confirms Leave now, and then presses Back                                                                        The neutral page opens, the Back button does not return to the app, and the user is signed out                                                FR-SAF-01-14

  AC-SAF-01-15   A user turning Safety Mode on                                                                The user reads MSGT-01                                                                                                                   It says that Exit now does not delete history, does not stop spyware, that a safer device is better, and where to get help                    FR-SAF-01-15

  AC-SAF-01-16   A visitor who is not signed in                                                               They open the safety resources page                                                                                                      The page shows the hotline numbers 1-800-799-7233 and TTY 1-800-787-3224, the note about 911 and the approved help links                      FR-SAF-01-16

  AC-SAF-01-17   A parent with a linked case where the agency allows the flag and advocates approved          The case has a family violence flag                                                                                                      The offer (MSGT-07) shows once to that parent only, the other parent sees nothing, and Safety Mode can still be turned on from the settings   FR-SAF-01-17

  AC-SAF-01-18   A Linked household and a household in Solo Mode                                              A user turns on Safety Mode in each                                                                                                      Both work and no payment is asked                                                                                                             FR-SAF-01-18

  AC-SAF-01-19   A release built before the approval of the advocates is recorded as done                     A user looks for Safety Mode                                                                                                             Safety Mode is not offered                                                                                                                    FR-SAF-01-19

  AC-SAF-01-20   A user who turns Safety Mode on and off                                                      Each change is made, and the co-parent looks at the logs                                                                                 One audit log entry exists for each, and the co-parent sees none                                                                              FR-SAF-01-20

  AC-SAF-01-21   A save error                                                                                 A user turns Safety Mode on or off                                                                                                       The earlier setting stays and ERR-02 shows                                                                                                    FR-SAF-01-21
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SAF-02 Notification preview and sensitive-image controls

US-SAF-02-01. As a user, I want to choose how much an alert shows on my screen and to hide images until I tap them, so that nobody sees something I do not want them to see.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-SAF-02-01      The system shall give every user the setting Alert previews with three levels: Hidden, Name only and Name and text. The default is Name only.

  FR-SAF-02-02      While Safety Mode is on, the system shall lock the level at Hidden and show ERR-03 if the user tries to change it. When Safety Mode is turned off, the level goes back to the one the user had before.

  FR-SAF-02-03      At the level Hidden, an alert shows no name and no text (MSGT-10). At the level Name only, a message alert shows the name of the sender and no message text (MSGT-11). At the level Name and text, it shows the name of the sender and the first 100 characters of the message (MSGT-12).

  FR-SAF-02-04      For event reminders, the level Hidden shows no event title (Notifications MSGT-06). The levels Name only and Name and text show the event title as in Notifications MSGT-05.

  FR-SAF-02-05      Before a user chooses Name and text, the system shall show the warning MSGT-13 and ask the user to confirm.

  FR-SAF-02-06      The system shall apply the level to every channel (push, SMS and email). An image shall never show in an alert at any level.

  FR-SAF-02-07      A change of level takes effect for the alerts made after the change.

  FR-SAF-02-08      The system shall give every user the setting Hide images until I tap. It is off by default. While Safety Mode is on, the system shall turn it on, lock it, and show ERR-04 if the user tries to turn it off.

  FR-SAF-02-09      While the setting is on, the system shall hide each JPG or PNG image sent by the co-parent, in messages and in shared photo albums, and show MSGT-14 in its place, including in the lists of thumbnails. The image shows after the user taps it, and is hidden again when the user opens the item another time.

  FR-SAF-02-10      The system shall offer both settings for every user and in Solo Mode.

  FR-SAF-02-11      The system shall show both settings on one screen called Alerts and images, under the privacy and safety settings.

  FR-SAF-02-12      The system shall write an audit log entry for every change of either setting, with actor, time and result.

  FR-SAF-02-13      If a setting cannot be saved, the system shall keep the earlier setting and show ERR-02.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                                                                          **When**                                                                              **Then**                                                                                                                                           **Covers**
  -------------- -------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-SAF-02-01   A new user                                                                                                                                         They open the screen Alerts and images                                                The level Name only is chosen and the setting Hide images until I tap is off                                                                       FR-SAF-02-01, FR-SAF-02-08

  AC-SAF-02-02   A user at the level Name and text who turns on Safety Mode and later turns it off                                                                  The user tries to change the level during Safety Mode, and after Safety Mode is off   The level is Hidden and cannot be changed (ERR-03) during Safety Mode, and it is Name and text again after it                                      FR-SAF-02-02

  AC-SAF-02-03   A message that starts with the text Please bring the soccer bag to practice on Friday and keep going until it is much longer than 100 characters   An alert is made at each level                                                        Hidden shows no name and no text. Name only shows the name of the sender and no text. Name and text shows the name and the first 100 characters.   FR-SAF-02-03

  AC-SAF-02-04   An event Dentist on 2027-02-01 at 15:00                                                                                                            A reminder is made at each level                                                      At Hidden the reminder shows no title. At the other two it shows the title.                                                                        FR-SAF-02-04

  AC-SAF-02-05   A user at the level Name only                                                                                                                      They choose Name and text                                                             MSGT-13 shows first, and the level changes only after the user confirms                                                                            FR-SAF-02-05

  AC-SAF-02-06   A user at the level Name and text and a message with an image                                                                                      A push alert, an SMS and an email are made                                            All three follow the level and none shows the image                                                                                                FR-SAF-02-06

  AC-SAF-02-07   An alert made at 10:00 and a level changed at 10:05                                                                                                The alert of 10:00 is already sent                                                    It keeps the old level, and later alerts use the new level                                                                                         FR-SAF-02-07

  AC-SAF-02-08   A user with Safety Mode on                                                                                                                         The user opens the screen and tries to turn the image setting off                     The setting is on and locked and ERR-04 shows                                                                                                      FR-SAF-02-08

  AC-SAF-02-09   A user with the image setting on, a message with a PNG, a message with a PDF, and a shared album with a JPG                                        The user opens each, taps the PNG, and later opens the message again                  The PNG and the JPG show MSGT-14 until tapped, the PDF is not hidden, and the PNG is hidden again at the next opening                              FR-SAF-02-09

  AC-SAF-02-10   A Linked household and a household in Solo Mode                                                                                                    A user changes both settings in each                                                  Both settings work and no payment is asked                                                                                                         FR-SAF-02-10

  AC-SAF-02-11   A user                                                                                                                                             The user opens the privacy and safety settings                                        Both settings are on one screen called Alerts and images                                                                                           FR-SAF-02-11

  AC-SAF-02-12   A change of level and a change of the image setting                                                                                                Each is saved                                                                         One audit log entry exists for each, with the actor, the time in UTC and the result                                                                FR-SAF-02-12

  AC-SAF-02-13   A save error                                                                                                                                       A user changes a setting                                                              The earlier setting stays and ERR-02 shows                                                                                                         FR-SAF-02-13
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SAF-03 AI privacy controls

US-SAF-03-01. As a parent, I want to see every AI feature in one place and know what each one reads, so that I can decide what to allow.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-SAF-03-01     The system should give a screen called AI and your data. It lists every AI feature in the release: the tone check (MSG-04) and the incoming message shield (MSG-06), and later AI rewrite (MSG-05), the AI coach (MSG-11), urgent detection (MSG-13) and AI-assisted expense entry (EXP-11). Each row shows the name, one plain sentence on what the AI reads (MSGT-15), a switch, and the time of the last change.

  FR-SAF-03-02     Each AI feature should have its own switch, off by default. When a user turns a switch on, the system should show the notice of that feature, ask the user to agree, and save the consent with the wording version, the date and the time.

  FR-SAF-03-03     The system should give a button Turn all AI off. It turns every switch off at once and shows MSGT-16.

  FR-SAF-03-04     When a switch is turned off, the system should stop sending anything to the AI for that feature at once.

  FR-SAF-03-05     The screen should show the promises in MSGT-17: the AI does not use your data for training, what it suggests is not saved in your record, it never deletes or blocks a message, and it is used only when you turn it on.

  FR-SAF-03-06     The system should send to the AI service only the text that the feature needs. It should not send the email, the mobile number or the address of any user.

  FR-SAF-03-07     The system should not save any AI suggestion, label or score in the record or in an export. Only the text that a user sends is saved.

  FR-SAF-03-08     The system should give the user an AI use log. Each line shows the feature, the date and time, and the kind of item (a draft, an incoming message or a receipt). The log holds no content and shows only to the user. It is kept for 12 months.

  FR-SAF-03-10     The system should use only an AI service whose terms say that the data is not used for training. Legal and IT confirm the terms before launch.

  FR-SAF-03-11     Safety Mode should not change the AI screen or the AI switches.

  FR-SAF-03-12     The system should write an audit log entry for every switch turned on or off, with the feature, actor, time and result.

  FR-SAF-03-13     If a switch cannot be saved, the system should keep the earlier setting and show ERR-02.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                               **When**                           **Then**                                                                                                                                                                           **Covers**
  -------------- ----------------------------------------------------------------------- ---------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-SAF-03-01   The release                                                             A user opens AI and your data      The screen lists the tone check and the shield, each with a name, the sentence on what the AI reads, a switch and the time of the last change                                      FR-SAF-03-01

  AC-SAF-03-02   A new user                                                              They turn on the tone check        The notice shows first, the switch turns on only after the user agrees, and the consent is saved with the wording version, the date and the time. Before that the switch is off.   FR-SAF-03-02

  AC-SAF-03-03   A user with two switches on                                             The user chooses Turn all AI off   Both switches are off at once and MSGT-16 shows                                                                                                                                    FR-SAF-03-03

  AC-SAF-03-04   A user who turns the shield off                                         A message arrives                  Nothing is sent to the AI and the message shows as it is                                                                                                                           FR-SAF-03-04

  AC-SAF-03-05   A user                                                                  They open the screen               The four promises in MSGT-17 show                                                                                                                                                  FR-SAF-03-05

  AC-SAF-03-06   A draft that the tone check reviews                                     The request goes to the AI         Only the text of the draft goes, and no email, mobile number or address of any user goes                                                                                           FR-SAF-03-06

  AC-SAF-03-07   A message sent after a tone check and a message that the shield held    A parent makes an export           The export holds only the text that was sent, with no suggestion, label or score                                                                                                   FR-SAF-03-07

  AC-SAF-03-08   A user who used the tone check on a draft and the shield on a message   The user opens the AI use log      The log shows each use with the feature, the date and time and the kind of item, and no content. The co-parent does not see it.                                                    FR-SAF-03-08

  AC-SAF-03-10   A release built before legal and IT confirm the AI service terms        A user looks for any AI feature    No AI feature is offered                                                                                                                                                           FR-SAF-03-10

  AC-SAF-03-11   A user with Safety Mode on                                              The user opens the AI screen       The screen and the switches are the same as without Safety Mode                                                                                                                    FR-SAF-03-11

  AC-SAF-03-12   A switch turned on and a switch turned off                              Each is saved                      One audit log entry exists for each, with the feature, the actor, the time in UTC and the result                                                                                   FR-SAF-03-12

  AC-SAF-03-13   A save error                                                            A user turns a switch on           The earlier setting stays and ERR-02 shows                                                                                                                                         FR-SAF-03-13
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

13.2 Data reference

  -------------------------------------------------------------------------------
  **Entity**                 **Fields used**
  -------------------------- ----------------------------------------------------
  User                       user_id, email, mobile_number, role, status

  Household                  household_id, mode (Linked, Solo)

  Child support case link    status, state (for the family violence flag offer)

  Audit log entry            actor, action, object, result, device_type, time
  -------------------------------------------------------------------------------

Messaging proposes an AI settings entity with one switch for each AI feature. This module uses it and adds the switch expense_entry_on for EXP-11.

8.2 New entities (proposed). The sources name none of these fields. They are a BA proposal.

Safety setting

  ---------------------------------------------------------------------------------------------------------------------------------
  **Field**                **Type**        **Required**   **Notes**
  ------------------------ --------------- -------------- -------------------------------------------------------------------------
  user_id                  Link to User    Yes            The only person who can read or change it

  safety_mode_on           Yes or No       Yes            Default No. Never shown to anyone else.

  changed_at               Date and time   Yes            UTC

  previous_preview_level   Choice          No             The level before Safety Mode was turned on. Used when it is turned off.
  ---------------------------------------------------------------------------------------------------------------------------------

Alert and image settings

  ----------------------------------------------------------------------------------------------------------------------------------------------
  **Field**               **Type**         **Required**   **Notes**
  ----------------------- ---------------- -------------- --------------------------------------------------------------------------------------
  user_id                 Link to User     Yes            ---

  preview_level           Choice           Yes            Hidden, Name only, Name and text. Default Name only. Hidden while Safety Mode is on.

  hide_images_until_tap   Yes or No        Yes            Default No. Yes while Safety Mode is on.

  changed_at              Date and time    Yes            UTC
  ----------------------------------------------------------------------------------------------------------------------------------------------

AI consent

  ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**         **Type**        **Required**   **Notes**
  ----------------- --------------- -------------- --------------------------------------------------------------------------------------------------------
  consent_id        Unique ID       Yes            System generated

  user_id           Link to User    Yes            ---

  feature           Choice          Yes            Tone check, Incoming message shield, AI rewrite, AI coach, Urgent detection, AI-assisted expense entry

  wording_version   Text            Yes            The version of the notice the user agreed to

  consented_at      Date and time   Yes            UTC. Cannot be changed.

  withdrawn_at      Date and time   No             UTC. Set when the switch is turned off.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------

AI use log entry

  ------------------------------------------------------------------------------------------------------------------
  **Field**       **Type**         **Required**   **Notes**
  --------------- ---------------- -------------- ------------------------------------------------------------------
  log_id          Unique ID        Yes            System generated

  user_id         Link to User     Yes            ---

  feature         Choice           Yes            As in AI consent

  item_kind       Choice           Yes            Draft, Incoming message, Receipt

  used_at         Date and time    Yes            UTC. Cannot be changed. No content is saved. Kept for 12 months.
  ------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------
  **Field**       **Type**         **Required**   **Notes**
  --------------- ---------------- -------------- -----------------------------------------------------------------
  offer_id        Unique ID        Yes            System generated

  user_id         Link to User     Yes            The parent whose case has the flag. Not visible to anyone else.

  shown_at        Date and time    Yes            UTC

  response        Choice           No             Accepted, Dismissed. The flag itself is not saved here.
  -----------------------------------------------------------------------------------------------------------------

Safety content versions

  -----------------------------------------------------------------------------------------------------------------
  **Field**               **Type**        **Required**   **Notes**
  ----------------------- --------------- -------------- ----------------------------------------------------------
  content_type            Choice          Yes            Safety notice, Safety resources page

  version                 Number          Yes            Each change is a new version. Earlier versions are kept.

  text                    Text            Yes            Hotline numbers and approved links

  approved_by_advocates   Yes or No       Yes            Must be Yes before it is published

  published_at            Date and time   No             UTC
  -----------------------------------------------------------------------------------------------------------------

13.3 Interfaces

All interfaces except INT-11 are with other modules of the app.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **With**                      **What passes**                                                                                                                                                                          **Features**
  ---------- ----------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------
  INT-01     Notifications                 The Safety Mode flag and the alert preview level go out. Alerts follow them. The SMS and email text for Safety Mode goes out.                                                            SAF-01, SAF-02

  INT-02     Messaging                     The switches of the AI features, the hidden first-read time, the hidden images and the rule that mediation is not offered go out. The notices of the AI features come in.                SAF-01, SAF-02, SAF-03

  INT-03     Calendar and Parenting Time   The Safety Mode flag goes out, so that locations are hidden, check-ins are off and outside calendar entries carry no details.                                                            SAF-01

  INT-04     Children and Documents        The Safety Mode flag and the image setting go out, so that addresses, phone numbers and emails are hidden, photo albums are Private by default and emergency contacts are not offered.   SAF-01, SAF-02

  INT-05     ---                           Safety Mode is available to every user. A link to the safety access request is offered when it is released.                                                                              SAF-01

  INT-06     Child Support Sync            A family violence flag comes in when the agency allows it.                                                                                                                               SAF-01

  INT-07     Accounts and Onboarding       The verified email and mobile number come in, to send the code that turns Safety Mode off. The sign-out of Exit now goes out.                                                            SAF-01

  INT-08     Records and Court             Exports follow the same hiding rules. No AI output is in an export.                                                                                                                      SAF-01, SAF-03

  INT-09     Professionals and Access      The Safety Mode flag goes out, so that a professional does not see what is hidden.                                                                                                       SAF-01

  INT-10     Expenses and Payments         The switch of AI-assisted expense entry goes out.                                                                                                                                        SAF-03

  INT-11     AI service                    Only the text that a feature needs goes to it, and only after the user turned the feature on. Legal and IT confirm its terms.                                                            SAF-03
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

13.4 Non-functional requirements

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **Requirement**                                                            **Where it applies here**
  ----------- -------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  NFR-01      Two-factor sign-in for every account (100 percent of accounts)             Turning Safety Mode off needs a code (FR-SAF-01-03). Exit now signs the user out (FR-SAF-01-14).

  NFR-02      Encryption in transit and at rest                                          The Safety setting, the alert and image settings, the AI consent and the AI use log

  NFR-03      Role-based access on every request                                         Only the user can read or change their own safety, alert and AI settings. No other role can, including support staff and operations staff (FR-SAF-01-02). Checked in tests for every role.

  NFR-04      Changes are logged with actor, time and result                             FR-SAF-01-20, FR-SAF-02-12, FR-SAF-03-12

  NFR-05      Records cannot be edited. A change is a new entry.                         The AI consent and the AI use log (FR-SAF-03-02, FR-SAF-03-08)

  NFR-06      Collect only the data that is needed                                       The AI gets only the text that a feature needs (FR-SAF-03-06). The AI use log holds no content (FR-SAF-03-08). The safety resources page saves no data about the visitor.

  NFR-08      99.9 percent availability each month, not counting planned maintenance     The public safety resources page and the neutral page of Exit now

  NFR-09      Plain language on every screen. The standard is to be chosen.2 level AA.   All screens. Exit now and the safety notice are tested with a screen reader.

  NFR-11      English only.                                                              All screens and messages

  NFR-13      99 percent of alerts are sent within 1 minute                              The alerts that follow the preview level and Safety Mode
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
