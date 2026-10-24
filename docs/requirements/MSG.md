# Messaging (MSG)


5.1 Functional requirements and acceptance criteria

MSG-01 Secure in-app messaging

US-MSG-01-01. As a parent, I want to message my co-parent inside the app, so that all our talk about the children is in one place.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-01-01        The system shall let a parent in a linked household start a thread with the co-parent by entering a subject and a message.

  FR-MSG-01-02        The system shall let either parent reply in a thread. A reply keeps the subject of the thread.

  FR-MSG-01-03        The system shall save a message as plain text of up to 10,000 characters and shall show ERR-01 for a longer one.

  FR-MSG-01-04        The system shall let a parent save a draft, and edit or delete the draft before it is sent.

  FR-MSG-01-05        The system shall send a message only after the parent chooses Send.

  FR-MSG-01-06        The system shall list the threads with the latest message first, and show the messages of a thread from the oldest to the newest.

  FR-MSG-01-07        The system shall alert the recipient of each new message through the Notifications module.

  FR-MSG-01-08        The system shall not offer a way to block the co-parent. A parent who wants less contact uses the incoming message shield (MSG-06).

  FR-MSG-01-09        In Solo Mode, the system shall show in the thread the messages that the parent sends to a co-parent who is not on the app.

  FR-MSG-01-10        The system shall add a reply that arrives by text or email from a co-parent who is not on the app to the same thread, with its date and time.

  FR-MSG-01-11        The system shall show a thread only to the people in it. Support staff cannot read it.

  FR-MSG-01-12        If a message cannot be sent, the system shall keep it as a draft and show ERR-02.

  FR-MSG-01-13        The system shall not send a message without a subject and shall show ERR-03.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                        **When**                                                         **Then**                                                                                           **Covers**
  -------------- ---------------------------------------------------------------- ---------------------------------------------------------------- -------------------------------------------------------------------------------------------------- ------------------------------------------
  AC-MSG-01-01   A linked household                                               A parent enters a subject and a message and chooses Send         A thread with the message is saved and the co-parent is alerted                                    FR-MSG-01-01, FR-MSG-01-05, FR-MSG-01-07

  AC-MSG-01-02   A thread                                                         The co-parent replies                                            The reply shows in the same thread with the same subject                                           FR-MSG-01-02

  AC-MSG-01-03   A parent writing a message                                       They enter 10,000 characters, and then 10,001 characters         The first message is accepted and the second is not sent and ERR-01 shows                          FR-MSG-01-03

  AC-MSG-01-04   A parent writing a message                                       They save a draft, edit it and delete it                         The draft is saved (MSGT-01), changed and removed, and nothing was sent                            FR-MSG-01-04

  AC-MSG-01-05   A message that a parent has written                              The parent has not chosen Send                                   The co-parent receives nothing                                                                     FR-MSG-01-05

  AC-MSG-01-06   Two threads with messages at different times                     A parent opens the thread list and then a thread                 The thread with the latest message is first, and the messages show from the oldest to the newest   FR-MSG-01-06

  AC-MSG-01-07   A parent                                                         They open the settings and the co-parent contact options         No block option is offered                                                                         FR-MSG-01-08

  AC-MSG-01-08   A household in Solo Mode                                         The parent sends a text to a co-parent who is not on the app     The message shows in the thread                                                                    FR-MSG-01-09

  AC-MSG-01-09   A thread with a text sent to a co-parent who is not on the app   That person replies by text                                      The reply shows in the same thread with its date and time                                          FR-MSG-01-10

  AC-MSG-01-10   A thread between two parents                                     A member of support staff or operations staff tries to open it   The thread does not open                                                                           FR-MSG-01-11

  AC-MSG-01-11   A parent and a send error                                        They choose Send                                                 The message is saved as a draft and ERR-02 shows                                                   FR-MSG-01-12

  AC-MSG-01-12   A parent who leaves the subject empty                            They choose Send                                                 The message is not sent and ERR-03 shows                                                           FR-MSG-01-13
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-02 Messages cannot be edited or deleted

US-MSG-02-01. As a parent, I want a sent message to stay exactly as it was sent, so that the record can be trusted.

  -----------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- --------------------------------------------------------------------------------------------------------------------------
  FR-MSG-02-01         The system shall not let anyone edit a sent message.

  FR-MSG-02-02         The system shall not let anyone delete or un-send a sent message, even one that the recipient has not read.

  FR-MSG-02-03         The system shall let a parent send a new message to correct an earlier one. The earlier message stays.

  FR-MSG-02-04         The system shall not let support staff or operations staff edit or delete a sent message.

  FR-MSG-02-05         When a parent closes an account, the system shall keep the sent messages of that parent in the thread for the co-parent.

  FR-MSG-02-06         If anyone tries to edit, delete or un-send a sent message, the system shall refuse and show ERR-04.
  -----------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                        **When**                                                           **Then**                                                         **Covers**
  -------------- ------------------------------------------------ ------------------------------------------------------------------ ---------------------------------------------------------------- --------------
  AC-MSG-02-01   A sent message                                   A parent looks for a way to edit it                                No edit option is offered                                        FR-MSG-02-01

  AC-MSG-02-02   A sent message that the recipient has not read   The sender looks for a way to delete or un-send it                 No delete or un-send option is offered                           FR-MSG-02-02

  AC-MSG-02-03   A sent message with a mistake                    The parent sends a new message that corrects it                    Both messages show in the thread                                 FR-MSG-02-03

  AC-MSG-02-04   A sent message                                   A member of support staff or operations staff tries to change it   The change is not possible                                       FR-MSG-02-04

  AC-MSG-02-05   A thread with messages from Parent A             Parent A closes the account                                        The messages of Parent A still show in the thread for Parent B   FR-MSG-02-05

  AC-MSG-02-06   A sent message                                   A direct request tries to edit or delete it                        The request is refused and ERR-04 shows                          FR-MSG-02-06
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-03 Time-stamped messages

US-MSG-03-01. As a parent, I want every message to show when it was sent and when it was first read, so that I can show what was said and when.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-03-01         The system shall save the sent time of every message in UTC and show it in the local time of the user.

  FR-MSG-03-02         The system shall save, for each recipient, the time the recipient first opened the message (the first-read time).

  FR-MSG-03-03         The system shall show both parents the sent time and the first-read time of a message.

  FR-MSG-03-04         The system shall not let anyone change a time stamp.

  FR-MSG-03-05         The system shall include the sent time and the first-read time of every message in each export.

  FR-MSG-03-06         The system shall set the first-read time when the recipient opens the message. For a held message (MSG-06) it shall set the time when the recipient opens the original.

  FR-MSG-03-07         When the recipient is in Safety Mode, the system shall not show the first-read time to the sender.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                    **When**                             **Then**                                                    **Covers**
  -------------- ------------------------------------------------------------ ------------------------------------ ----------------------------------------------------------- ----------------------------
  AC-MSG-03-01   A message sent at 2027-01-15 18:00 UTC                       A user in US Eastern time views it   The sent time shows as 13:00 on January 15, 2027            FR-MSG-03-01

  AC-MSG-03-02   A sent message                                               The recipient opens it               The first-read time is saved for that recipient             FR-MSG-03-02, FR-MSG-03-06

  AC-MSG-03-03   A message that the recipient opened                          Both parents view it                 Both see the sent time and the first-read time              FR-MSG-03-03

  AC-MSG-03-04   A saved time stamp                                           Anyone tries to change it            The change is not possible                                  FR-MSG-03-04

  AC-MSG-03-05   A thread with messages                                       A parent exports it                  Every message shows its sent time and its first-read time   FR-MSG-03-05

  AC-MSG-03-06   A held message                                               The recipient opens the original     The first-read time is set at that moment and not before    FR-MSG-03-06

  AC-MSG-03-07   A recipient who is in Safety Mode and who opened a message   The sender views the message         The sent time shows and the first-read time does not        FR-MSG-03-07
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-04 Tone checks on outgoing messages

US-MSG-04-01. As a parent, I want private feedback on the tone of my message before I send it, so that I do not send something I regret.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-04-01        The system shall let a user turn the tone check on or off. The tone check is off until the user turns it on.

  FR-MSG-04-02        While the tone check is on, the system shall review a draft when the sender chooses Send.

  FR-MSG-04-03        If the review finds a concern, the system shall highlight the phrases, show a short reason, and offer Edit or Send anyway.

  FR-MSG-04-04        The system shall never stop a message from being sent because of the tone check.

  FR-MSG-04-05        The system shall show the tone feedback only to the sender. It is not saved in the record and the recipient cannot see it.

  FR-MSG-04-06        The system shall review only the drafts of the user and never a received message.

  FR-MSG-04-07        Before the user turns the tone check on, the system shall say plainly what the AI sees. It sees the draft text only when the draft is reviewed, and the text is not used for training.

  FR-MSG-04-08        The tone check shall work for English text.

  FR-MSG-04-09        If the AI service is not available, the system shall let the sender send the message and shall show MSGT-03.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                               **When**                                        **Then**                                                                                                       **Covers**
  -------------- ----------------------------------------------------------------------- ----------------------------------------------- -------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-MSG-04-01   A new user                                                              They open the settings                          The tone check is off                                                                                          FR-MSG-04-01

  AC-MSG-04-02   A user who turns the tone check on                                      They confirm the switch                         The notice about what the AI sees shows first (MSGT-09), and the tone check is on only after the user agrees   FR-MSG-04-01, FR-MSG-04-07

  AC-MSG-04-03   A user with the tone check on and a hostile draft                       They choose Send                                The phrases are highlighted, a short reason shows, and Edit and Send anyway are offered (MSGT-02)              FR-MSG-04-02, FR-MSG-04-03

  AC-MSG-04-04   A tone concern on a draft                                               The sender chooses Send anyway                  The message is sent                                                                                            FR-MSG-04-04

  AC-MSG-04-05   A message that had tone feedback                                        The recipient views the thread and the record   No tone feedback shows to the recipient and none is in the record                                              FR-MSG-04-05

  AC-MSG-04-06   A received message                                                      The user looks for a tone check on it           No tone check is offered                                                                                       FR-MSG-04-06

  AC-MSG-04-07   A user with the tone check on and a draft in English                    They choose Send                                The review runs                                                                                                FR-MSG-04-08

  AC-MSG-04-08   A user with the tone check on and an AI service that is not available   They choose Send                                The message is sent and MSGT-03 shows                                                                          FR-MSG-04-09
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-05 AI rewrite suggestions for outgoing messages

US-MSG-05-01. As a parent, I want a calmer version of my draft when I ask for one, so that I can send a message that does not start a fight.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-05-01        The system should offer an AI rewrite of a draft when the tone check finds a concern, and when the user asks for one.

  FR-MSG-05-02        The system should offer the rewrite only to a user who turned on AI rewrite. AI rewrite is off until the user turns it on, and it is a separate switch from the tone check.

  FR-MSG-05-03        The system should show the suggested text and let the user edit it, use it or ignore it.

  FR-MSG-05-04        The system should never send a suggestion unless the user chooses Send.

  FR-MSG-05-05        The system should save only the message that is sent. The suggestion and the original draft stay out of the record.

  FR-MSG-05-06        Before the user turns AI rewrite on, the system should say plainly what the AI sees.

  FR-MSG-05-08        If the AI service is not available, the system should keep the draft as it is and show MSGT-10.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                               **When**                                                                            **Then**                                                                            **Covers**
  -------------- ----------------------------------------------------------------------- ----------------------------------------------------------------------------------- ----------------------------------------------------------------------------------- --------------
  AC-MSG-05-01   A user with AI rewrite on and a draft with a tone concern               The tone check shows the concern                                                    A suggested rewrite is offered                                                      FR-MSG-05-01

  AC-MSG-05-02   A user who did not turn AI rewrite on                                   They write a draft                                                                  No rewrite is offered                                                               FR-MSG-05-02

  AC-MSG-05-03   A suggested rewrite                                                     The user edits it, and later uses another one as it is, and later ignores a third   Each choice works and the draft changes only as the user chose                      FR-MSG-05-03

  AC-MSG-05-04   A suggested rewrite                                                     The user does not choose Send                                                       Nothing is sent                                                                     FR-MSG-05-04

  AC-MSG-05-05   A message that was sent after a rewrite                                 A parent opens the record                                                           Only the message that was sent is there, with no suggestion and no original draft   FR-MSG-05-05

  AC-MSG-05-06   A user who turns AI rewrite on                                          They confirm the switch                                                             The notice about what the AI sees shows first (MSGT-09)                             FR-MSG-05-06

  AC-MSG-05-08   A user who asks for a rewrite and an AI service that is not available   They ask                                                                            The draft stays as it is and MSGT-10 shows                                          FR-MSG-05-08
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-06 Incoming message shield with view-original

US-MSG-06-01. As a parent, I want hostile messages held back, so that I can read them when I am ready and can still see the original.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-06-01       The system shall let a user turn the incoming message shield on or off. The shield is off until the user turns it on.

  FR-MSG-06-02       The system shall let the user set the level of the shield as Low, Medium or High. Medium is the level when the user turns the shield on.

  FR-MSG-06-03       At the level Low the shield shall hold messages with threats or abusive language. At Medium it shall also hold insults and personal attacks. At High it shall also hold blame, sarcasm and pressure.

  FR-MSG-06-04       While the shield is on, the system shall hold an incoming message that crosses the level. A held message shows the name of the sender, the time, the notice Message held and the reason. It does not show the text.

  FR-MSG-06-05       The system shall show the original of a held message with one tap.

  FR-MSG-06-06       The system shall never delete, block or change a message. The shield only holds and labels it.

  FR-MSG-06-07       The system shall save the original message and its times in the record exactly as for any other message. The hold is not part of the record.

  FR-MSG-06-08       The system shall not tell the sender that a message was held.

  FR-MSG-06-09       The shield shall apply to messages from the co-parent, including replies by text or email from a co-parent who is not on the app.

  FR-MSG-06-10       The shield shall work for English text.

  FR-MSG-06-11       The system shall let a user report that a hold was wrong. A report shares that one message with the review team only when the user agrees, and the reports are used to track the error rate.

  FR-MSG-06-12       If the AI service is not available, the system shall show messages as they are and show MSGT-05.

  FR-MSG-06-13       Before the user turns the shield on, the system shall say plainly what the AI sees. It sees the text of an incoming message when it arrives, and the text is not used for training.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                            **When**                                                  **Then**                                                                                                                                          **Covers**
  -------------- ---------------------------------------------------------------------------------------------------- --------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-MSG-06-01   A new user                                                                                           They open the settings                                    The shield is off                                                                                                                                 FR-MSG-06-01

  AC-MSG-06-02   A user who turns the shield on                                                                       They confirm the switch                                   The notice about what the AI sees shows first (MSGT-09), and the level is Medium after the user agrees                                            FR-MSG-06-02, FR-MSG-06-13

  AC-MSG-06-03   A user with the shield on                                                                            They set the level to High                                The level High is saved                                                                                                                           FR-MSG-06-02

  AC-MSG-06-04   A user with the shield at Medium                                                                     A message with an insult arrives                          The message is held. It shows the name of the sender, the time, the notice Message held and the reason, and it does not show the text (MSGT-04)   FR-MSG-06-03, FR-MSG-06-04

  AC-MSG-06-05   A user with the shield at Low                                                                        A message with an insult but no threat arrives            The message is not held                                                                                                                           FR-MSG-06-03

  AC-MSG-06-06   A held message                                                                                       The user taps it                                          The original shows                                                                                                                                FR-MSG-06-05

  AC-MSG-06-07   A held message                                                                                       The user looks at the thread and at an export             The original is in the thread and in the export, and it is unchanged                                                                              FR-MSG-06-06, FR-MSG-06-07

  AC-MSG-06-08   A held message                                                                                       The sender looks at the message                           Nothing shows that it was held                                                                                                                    FR-MSG-06-08

  AC-MSG-06-09   A user with the shield on and a reply by text with a threat from a co-parent who is not on the app   The reply arrives                                         The reply is held                                                                                                                                 FR-MSG-06-09

  AC-MSG-06-10   A user with the shield on                                                                            A message in English arrives                              The shield checks it                                                                                                                              FR-MSG-06-10

  AC-MSG-06-11   A held message that the user thinks was wrong                                                        The user reports it, once with consent and once without   The message goes to the review team only when the user agreed, and both reports count in the error rate                                           FR-MSG-06-11

  AC-MSG-06-12   A user with the shield on and an AI service that is not available                                    A message arrives                                         The message shows as it is and MSGT-05 shows                                                                                                      FR-MSG-06-12
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-07 Search messages by keyword or date

US-MSG-07-01. As a parent, I want to search our messages, so that I can find what was said without scrolling.

  --------------------------------------------------------------------------------------------------------------------------------------------
  **ID**                **Requirement**
  --------------------- ----------------------------------------------------------------------------------------------------------------------
  FR-MSG-07-01          The system should let a parent search messages by keyword.

  FR-MSG-07-02          The system should let a parent narrow a search by date range and by sender.

  FR-MSG-07-03          The system should show each result with the sender, the time, the subject of the thread and a short extract.

  FR-MSG-07-04          The system should search only the messages the user is allowed to see.

  FR-MSG-07-05          For a held message, the system should show the notice Message held and no extract until the user opens the original.

  FR-MSG-07-06          The system should open the thread at the message when the user selects a result.

  FR-MSG-07-07          If nothing matches, the system should show MSGT-08. If the search fails, the system should show ERR-05.
  --------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                         **When**                              **Then**                                                         **Covers**
  -------------- ------------------------------------------------- ------------------------------------- ---------------------------------------------------------------- --------------
  AC-MSG-07-01   A household with messages                         A parent searches for the word swap   Every message with that word shows as a result                   FR-MSG-07-01

  AC-MSG-07-02   A search with a date range and a sender           The parent runs it                    Only messages in the range and from that sender show             FR-MSG-07-02

  AC-MSG-07-03   A search result                                   The parent looks at it                It shows the sender, the time, the subject and a short extract   FR-MSG-07-03

  AC-MSG-07-04   A thread that the user is not in                  The user searches                     No message of that thread shows                                  FR-MSG-07-04

  AC-MSG-07-05   A held message that matches                       The user searches                     The result shows Message held and no extract                     FR-MSG-07-05

  AC-MSG-07-06   A search result                                   The parent selects it                 The thread opens at that message                                 FR-MSG-07-06

  AC-MSG-07-07   A search with no match, and a search that fails   The parent runs each                  MSGT-08 shows for the first and ERR-05 shows for the second      FR-MSG-07-07
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-08 Message folders or topics

US-MSG-08-01. As a parent, I want to sort threads into folders and topics, so that I can find them later.

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- -----------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-08-01        The system should let a user create personal folders with a name of 1 to 60 characters, and should show ERR-11 for a longer name.

  FR-MSG-08-02        The system should let a user move a thread into a folder. A thread is in one folder for each user.

  FR-MSG-08-03        Folders are personal. The other parent does not see them, and they do not change the record.

  FR-MSG-08-04        The system should let the sender give a thread a topic: Schedule, Health, School, Expenses or Other. Both parents see the topic.

  FR-MSG-08-05        The system should let a user filter the thread list by folder or by topic.

  FR-MSG-08-06        When a user deletes a folder, the system should move its threads back to the main list. No message is deleted.

  FR-MSG-08-07        If a folder or a topic cannot be saved, the system should show ERR-06 and keep the earlier setting.
  -------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                **When**                                                       **Then**                                                           **Covers**
  -------------- ---------------------------------------- -------------------------------------------------------------- ------------------------------------------------------------------ --------------
  AC-MSG-08-01   A signed-in user                         They create a folder named School and one with 61 characters   The first folder is saved and the second is not and ERR-11 shows   FR-MSG-08-01

  AC-MSG-08-02   A thread and a folder                    The user moves the thread into the folder                      The thread shows in that folder only for that user                 FR-MSG-08-02

  AC-MSG-08-03   A thread that Parent A put in a folder   Parent B opens the thread list                                 Parent B does not see the folder of Parent A                       FR-MSG-08-03

  AC-MSG-08-04   A thread                                 The sender gives it the topic Health                           Both parents see the topic Health                                  FR-MSG-08-04

  AC-MSG-08-05   Threads in folders and with topics       The user filters by a folder and by a topic                    Only the matching threads show each time                           FR-MSG-08-05

  AC-MSG-08-06   A folder with 3 threads                  The user deletes the folder                                    The 3 threads are in the main list and no message is deleted       FR-MSG-08-06

  AC-MSG-08-07   A save error                             The user saves a topic                                         The earlier setting stays and ERR-06 shows                         FR-MSG-08-07
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-09 Attachments and files in messages

US-MSG-09-01. As a parent, I want to attach files and pictures to a message, so that I can share documents in the thread.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-09-01        The system should let a parent attach up to 5 files to a message, with a total size of up to 25 MB.

  FR-MSG-09-02        The system should accept JPG, PNG, PDF and DOCX files and refuse other types with ERR-08.

  FR-MSG-09-03        The system should scan every file for malware before it is delivered. A file that fails the scan is not delivered, and the system should show ERR-09.

  FR-MSG-09-04        The system should not let anyone remove an attachment from a sent message.

  FR-MSG-09-05        The system should save each attachment of a sent message in the household files (DOC-02).

  FR-MSG-09-06        The system should count attachments toward the storage limit. Over the limit, it should block new attachments and show ERR-10.

  FR-MSG-09-07        For a recipient who turned on the sensitive-image control (SAF-02), the system should hide an image behind MSGT-14 until the recipient taps it.

  FR-MSG-09-08        The system should include attachments in exports.

  FR-MSG-09-09        If a message has more than 5 files or more than 25 MB, the system should not send it and should show ERR-07.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                               **When**                                              **Then**                                                    **Covers**
  -------------- ------------------------------------------------------- ----------------------------------------------------- ----------------------------------------------------------- --------------
  AC-MSG-09-01   A parent writing a message                              They attach 5 files of 4 MB each                      The message is sent with the 5 files                        FR-MSG-09-01

  AC-MSG-09-02   A parent writing a message                              They attach a file of another type                    The file is refused and ERR-08 shows                        FR-MSG-09-02

  AC-MSG-09-03   A file that fails the malware scan                      A parent sends it                                     The file is not delivered and ERR-09 shows                  FR-MSG-09-03

  AC-MSG-09-04   A sent message with an attachment                       A parent looks for a way to remove the attachment     No removal option is offered                                FR-MSG-09-04

  AC-MSG-09-05   A sent message with an attachment                       A parent opens the household files                    The attachment is there                                     FR-MSG-09-05

  AC-MSG-09-06   A household that is over the storage limit              A parent attaches a file                              The file is blocked and ERR-10 shows                        FR-MSG-09-06

  AC-MSG-09-07   A recipient who turned on the sensitive-image control   A message with an image arrives                       The image is hidden (MSGT-14) until the recipient taps it   FR-MSG-09-07

  AC-MSG-09-08   A thread with attachments                               A parent exports it                                   The attachments are in the export                           FR-MSG-09-08

  AC-MSG-09-09   A parent writing a message                              They attach 6 files, and later 26 MB in one message   The message is not sent and ERR-07 shows each time          FR-MSG-09-09
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-10 Group chat and messages to third parties

US-MSG-10-01. As a parent, I want to message a grandparent or a caregiver, and to talk in a group, so that everyone who helps with the child is in the loop.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- --------------------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-10-01         The system should let a parent send a message to a Third party or a Child account that the parents added (ACC-07).

  FR-MSG-10-02         The system should let a parent start a group thread with the co-parent and chosen Third parties.

  FR-MSG-10-03         The system should let a Third party read and answer only in the threads they are added to.

  FR-MSG-10-04         The system should give a Child account only the threads the parents set.

  FR-MSG-10-05         A thread with a Child account should include both parents.

  FR-MSG-10-06         A person who is added to a thread later should see only the messages sent after they were added. The thread should show who added them and when.

  FR-MSG-10-07         The tone check should work for every sender. The shield should work on messages from the co-parent only.

  FR-MSG-10-08         The same record rules should apply to every thread: no edit, no delete, a sent time and a first-read time.

  FR-MSG-10-09         If a person cannot be added to a thread, the system should show ERR-06 and should not change the thread.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                           **When**                                                                **Then**                                                                                                                         **Covers**
  -------------- --------------------------------------------------- ----------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-MSG-10-01   A Third party that the parents added                A parent sends them a message                                           The Third party gets it                                                                                                          FR-MSG-10-01

  AC-MSG-10-02   A parent                                            They start a group thread with the co-parent and a Third party          All three see the thread                                                                                                         FR-MSG-10-02

  AC-MSG-10-03   A Third party who is in one group thread            They open the app                                                       They see and answer in that thread and in no other                                                                               FR-MSG-10-03

  AC-MSG-10-04   A Child account                                     The child opens the app                                                 The child sees only the threads the parents set                                                                                  FR-MSG-10-04

  AC-MSG-10-05   A parent who starts a thread with a Child account   The thread is created                                                   Both parents are in the thread                                                                                                   FR-MSG-10-05

  AC-MSG-10-06   A group thread with 3 messages                      A parent adds a Third party                                             The Third party sees only later messages and the thread shows who added them and when                                            FR-MSG-10-06

  AC-MSG-10-07   A user with the tone check and the shield on        They write in a group thread and a message from the co-parent arrives   The tone check reviews the draft and the shield checks the message of the co-parent. A message from a Third party is not held.   FR-MSG-10-07

  AC-MSG-10-08   A group thread                                      Anyone tries to edit or delete a message                                The change is not possible and the message has a sent time and a first-read time                                                 FR-MSG-10-08

  AC-MSG-10-09   A person who cannot be added                        A parent adds them                                                      The thread is unchanged and ERR-06 shows                                                                                         FR-MSG-10-09
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-11 AI co-parenting coach

US-MSG-11-01. As a parent, I want to ask an AI coach about a co-parenting problem in private, so that I can think before I write.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-11-01         The system should offer a private chat with an AI coach about co-parenting questions. The coach is off until the user turns it on.

  FR-MSG-11-02         The chat should be private to the user. It is not shown to the co-parent, not saved in the record and not in exports.

  FR-MSG-11-03         The coach should see only what the user types or shares in the chat. It should not read the threads of the user unless the user shares a message.

  FR-MSG-11-04         The coach should show MSGT-11: it is not a lawyer or a therapist and it does not give legal advice.

  FR-MSG-11-05         Before the user turns the coach on, the system should say plainly what the AI sees.

  FR-MSG-11-07         The coach should work in English first.

  FR-MSG-11-08         If the AI service is not available, the system should show MSGT-15.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                         **When**                                                       **Then**                                                                             **Covers**
  -------------- ------------------------------------------------- -------------------------------------------------------------- ------------------------------------------------------------------------------------ --------------
  AC-MSG-11-01   A new user                                        They open the settings                                         The coach is off                                                                     FR-MSG-11-01

  AC-MSG-11-02   A user who chats with the coach                   The co-parent opens the app, and a parent exports the record   The chat does not show to the co-parent, and it is not in the record or the export   FR-MSG-11-02

  AC-MSG-11-03   A user who chats with the coach                   The user has not shared a message                              The coach has not read any thread                                                    FR-MSG-11-03

  AC-MSG-11-04   A user who opens the coach                        The chat opens                                                 MSGT-11 shows                                                                        FR-MSG-11-04

  AC-MSG-11-05   A user who turns the coach on                     They confirm the switch                                        The notice about what the AI sees shows first (MSGT-09)                              FR-MSG-11-05

  AC-MSG-11-07   A user who asks the coach a question in English   They send it                                                   The coach answers                                                                    FR-MSG-11-07

  AC-MSG-11-08   An AI service that is not available               A user opens the coach                                         MSGT-15 shows                                                                        FR-MSG-11-08
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-12 Human mediation or counseling in the app

US-MSG-12-01. As a parent, I want to ask for a licensed mediator, so that we can settle a dispute without going to court.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- ---------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-12-01         The system should let a parent ask for mediation by a licensed mediator from a partner of ParentPath.

  FR-MSG-12-02         Mediation should start only after both parents agree.

  FR-MSG-12-03         The mediator should get access only to the threads that both parents choose to share, and should answer only in the mediation thread.

  FR-MSG-12-04         The mediation thread should follow the same record rules as any thread.

  FR-MSG-12-05         Booking and payment should go through the partner, by referral or paid booking. The app never holds funds.

  FR-MSG-12-06         Either parent should be able to end the mediation, and the access of the mediator ends at once.

  FR-MSG-12-07         The system shall not offer mediation to a user in Safety Mode.

  FR-MSG-12-08         The system should offer mediation only after legal review of the mediation terms is recorded as done.

  FR-MSG-12-09         If a mediation request cannot be saved, the system should show ERR-06 and should not start it.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                     **When**                                   **Then**                                                                                  **Covers**
  -------------- ------------------------------------------------------------- ------------------------------------------ ----------------------------------------------------------------------------------------- --------------
  AC-MSG-12-01   A parent                                                      They ask for mediation                     A request goes to the partner mediators                                                   FR-MSG-12-01

  AC-MSG-12-02   A mediation request                                           Only one parent agrees                     Mediation does not start (MSGT-13)                                                        FR-MSG-12-02

  AC-MSG-12-03   A mediation that both parents agreed to                       The parents share one thread               The mediator sees that thread and no other, and can answer only in the mediation thread   FR-MSG-12-03

  AC-MSG-12-04   A mediation thread                                            Anyone tries to edit or delete a message   The change is not possible                                                                FR-MSG-12-04

  AC-MSG-12-05   A mediation that needs payment                                A parent books it                          The booking and the payment go through the partner and the app holds no funds             FR-MSG-12-05

  AC-MSG-12-06   A running mediation                                           A parent ends it                           The access of the mediator ends at once                                                   FR-MSG-12-06

  AC-MSG-12-07   A user in Safety Mode                                         They open the messaging screen             Mediation is not offered                                                                  FR-MSG-12-07

  AC-MSG-12-08   A release built before the legal review is recorded as done   A parent looks for mediation               Mediation is not offered                                                                  FR-MSG-12-08

  AC-MSG-12-09   A save error                                                  A parent asks for mediation                Mediation does not start and ERR-06 shows                                                 FR-MSG-12-09
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-13 Urgent-message detection

US-MSG-13-01. As a parent, I want urgent messages marked, so that I see them first.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-13-01         The system should let a sender mark a message as Urgent.

  FR-MSG-13-02         The system should detect a message that may be urgent with AI, only for a recipient who turned on urgent detection. Urgent detection is off until the user turns it on.

  FR-MSG-13-03         The system should show the label Marked urgent or May be urgent on the message (MSGT-12).

  FR-MSG-13-04         The system should never hide, delay or block a message because of the label.

  FR-MSG-13-05         The system should alert the recipient of an urgent message by push and by SMS at once.

  FR-MSG-13-06         The system should let the recipient say that a label was wrong. With the consent of the recipient, it should share that message with the review team and should track the error rate.

  FR-MSG-13-07         The system should offer urgent detection only after the Manager accepts the error rate of a test.

  FR-MSG-13-08         Urgent detection should work in English first.

  FR-MSG-13-09         Before the user turns urgent detection on, the system should say plainly what the AI sees.

  FR-MSG-13-10         If the AI service is not available, the system should show messages as they are.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                 **When**                                             **Then**                                                                                          **Covers**
  -------------- ------------------------------------------------------------------------- ---------------------------------------------------- ------------------------------------------------------------------------------------------------- ----------------------------
  AC-MSG-13-01   A sender                                                                  They mark a message as Urgent and send it            The message shows the label Marked urgent (MSGT-12)                                               FR-MSG-13-01, FR-MSG-13-03

  AC-MSG-13-02   A recipient with urgent detection on and a message that may be urgent     The message arrives                                  The message shows the label May be urgent                                                         FR-MSG-13-02, FR-MSG-13-03

  AC-MSG-13-03   A new user                                                                They open the settings                               Urgent detection is off                                                                           FR-MSG-13-02

  AC-MSG-13-04   A message with the label                                                  The recipient looks for it                           The message is not hidden, delayed or blocked                                                     FR-MSG-13-04

  AC-MSG-13-05   An urgent message                                                         It arrives                                           The recipient is alerted by push and by SMS at the same time                                      FR-MSG-13-05

  AC-MSG-13-06   A label that the recipient thinks was wrong                               The recipient reports it, with consent and without   The message goes to the review team only with consent, and both reports count in the error rate   FR-MSG-13-06

  AC-MSG-13-07   A release built before the Manager accepts the error rate                 A user looks for urgent detection                    Urgent detection is not offered                                                                   FR-MSG-13-07

  AC-MSG-13-08   A user with urgent detection on                                           A message in English arrives                         The detection runs                                                                                FR-MSG-13-08

  AC-MSG-13-09   A user who turns urgent detection on                                      They confirm the switch                              The notice about what the AI sees shows first (MSGT-09)                                           FR-MSG-13-09

  AC-MSG-13-10   A user with urgent detection on and an AI service that is not available   A message arrives                                    The message shows as it is                                                                        FR-MSG-13-10
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MSG-14 Report a message

US-MSG-14-01. As a parent, I want to report a threatening or harassing message, so that it is marked in my own record.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-MSG-14-01        The system shall let a parent report a message from the co-parent as Threat, Harassment or Other, with an optional note of up to 500 characters. It shall show ERR-11 for a longer note.

  FR-MSG-14-02        The system shall save the report as a marker linked to the message, with the date, the time and the parent. The message is not changed.

  FR-MSG-14-03        The system shall show a report only to the parent who made it. The other parent is not told.

  FR-MSG-14-04        The system shall include the reports of a parent in the exports of that parent and in what that parent shares with a professional.

  FR-MSG-14-05        The system shall not send a reported message to the staff of ParentPath. Support staff cannot read parent messages.

  FR-MSG-14-06        For the category Threat, the system shall show a safety notice (MSGT-07) with how to get help. The text and the links are approved with advocates.

  FR-MSG-14-07        The system shall make the report tool available to every user.

  FR-MSG-14-08        The system shall not let anyone change or delete a report.

  FR-MSG-14-09        If a report cannot be saved, the system shall show ERR-06 and shall not create it.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                         **When**                                                                                                   **Then**                                                                               **Covers**
  -------------- --------------------------------- ---------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------- --------------
  AC-MSG-14-01   A message from the co-parent      A parent reports it as Harassment with a note of 500 characters, and later with a note of 501 characters   The first report is saved and the second is not and ERR-11 shows                       FR-MSG-14-01

  AC-MSG-14-02   A reported message                A parent opens the thread                                                                                  The message is unchanged and a marker shows with the category, the date and the time   FR-MSG-14-02

  AC-MSG-14-03   A report by Parent A              Parent B opens the thread                                                                                  Parent B sees no report and was not told. MSGT-06 shows only to Parent A               FR-MSG-14-03

  AC-MSG-14-04   A report by Parent A              Parent A exports the record and shares a thread with a professional                                        The report is in the export and in the shared thread                                   FR-MSG-14-04

  AC-MSG-14-05   A reported message                A member of support staff looks for it                                                                     They cannot open the message and no copy went to the staff                             FR-MSG-14-05

  AC-MSG-14-06   A report in the category Threat   The parent saves it                                                                                        The safety notice shows (MSGT-07)                                                      FR-MSG-14-06

  AC-MSG-14-07   A household                       A parent reports a message                                                                                 The report is saved                                                                    FR-MSG-14-07

  AC-MSG-14-08   A saved report                    Anyone tries to change or delete it                                                                        The change is not possible                                                             FR-MSG-14-08

  AC-MSG-14-09   A save error                      A parent reports a message                                                                                 No report is created and ERR-06 shows                                                  FR-MSG-14-09
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

5.2 Data reference

  -----------------------------------------------------------------------
  **Entity**                  **Fields used**
  --------------------------- -------------------------------------------
  User                        user_id, role, language

  Household                   household_id, mode (Linked, Solo)

  Audit log entry             actor, action, object, result, time
  -----------------------------------------------------------------------

8.2 New entities (proposed). The sources name none of these fields. They are a BA proposal.

Thread

  ---------------------------------------------------------------------------------------------------
  **Field**            **Type**            **Required**   **Notes**
  -------------------- ------------------- -------------- -------------------------------------------
  thread_id            Unique ID           Yes            System generated

  household_id         Link to Household   Yes            ---

  subject              Text                Yes            Set by the sender who starts the thread

  topic                Choice              No             Schedule, Health, School, Expenses, Other

  created_by_user_id   Link to User        Yes            ---

  created_at           Date and time       Yes            UTC
  ---------------------------------------------------------------------------------------------------

Message

  ------------------------------------------------------------------------------------------------------------------
  **Field**        **Type**         **Required**   **Notes**
  ---------------- ---------------- -------------- -----------------------------------------------------------------
  message_id       Unique ID        Yes            System generated

  thread_id        Link to Thread   Yes            ---

  sender_user_id   Link to User     No             Empty for a co-parent who is not on the app

  sender_address   Text             No             The mobile number or email of a co-parent who is not on the app

  body             Text             Yes            Plain text, up to 10,000 characters. Cannot be changed.

  sent_at          Date and time    Yes            UTC. Cannot be changed.

  source           Choice           Yes            App, Text reply, Email reply

  urgent_label     Choice           No             None, Marked urgent, May be urgent
  ------------------------------------------------------------------------------------------------------------------

The status of a message (Sent, Delivered, Read, Failed) is kept in the delivery log of the Notifications module.

Read record

  --------------------------------------------------------------------------------
  **Field**           **Type**            **Required**   **Notes**
  ------------------- ------------------- -------------- -------------------------
  read_id             Unique ID           Yes            System generated

  message_id          Link to Message     Yes            ---

  recipient_user_id   Link to User        Yes            ---

  first_read_at       Date and time       Yes            UTC. Cannot be changed.
  --------------------------------------------------------------------------------

Draft

  --------------------------------------------------------------------------------------------------------
  **Field**         **Type**           **Required**   **Notes**
  ----------------- ------------------ -------------- ----------------------------------------------------
  draft_id          Unique ID          Yes            System generated

  user_id           Link to User       Yes            ---

  thread_id         Link to Thread     No             Set for a reply

  subject           Text               No             ---

  body              Text               No             A draft can be edited and deleted until it is sent

  saved_at          Date and time      Yes            UTC
  --------------------------------------------------------------------------------------------------------

Report

  -----------------------------------------------------------------------------------
  **Field**             **Type**           **Required**   **Notes**
  --------------------- ------------------ -------------- ---------------------------
  report_id             Unique ID          Yes            System generated

  message_id            Link to Message    Yes            ---

  reported_by_user_id   Link to User       Yes            ---

  category              Choice             Yes            Threat, Harassment, Other

  note                  Text               No             Up to 500 characters

  reported_at           Date and time      Yes            UTC. Cannot be changed.
  -----------------------------------------------------------------------------------

AI settings

  ----------------------------------------------------------------------------------------------------------------
  **Field**             **Type**          **Required**   **Notes**
  --------------------- ----------------- -------------- ---------------------------------------------------------
  user_id               Link to User      Yes            ---

  tone_check_on         Yes or No         Yes            Default No

  shield_on             Yes or No         Yes            Default No

  shield_level          Choice            Yes            Low, Medium, High. Medium when the shield is turned on.

  rewrite_on            Yes or No         Yes            Default No

  coach_on              Yes or No         Yes            Default No

  urgent_detection_on   Yes or No         Yes            Default No
  ----------------------------------------------------------------------------------------------------------------

Hold label (display only, not part of the record)

  ------------------------------------------------------------------------------------------------------------
  **Field**           **Type**           **Required**   **Notes**
  ------------------- ------------------ -------------- ------------------------------------------------------
  message_id          Link to Message    Yes            ---

  recipient_user_id   Link to User       Yes            ---

  reason              Choice             Yes            Threat or abuse, Insult or attack, Blame or pressure

  held_at             Date and time      Yes            UTC

  reported_wrong      Yes or No          Yes            Default No
  ------------------------------------------------------------------------------------------------------------

5.3 Interfaces

All interfaces except INT-08 and INT-09 are with other modules of the app.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **With**                   **What passes**                                                                                                                                **Features**
  ---------- -------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------
  INT-01     Notifications              Message events go out. Alerts go to the users. The status of each message (Sent, Delivered, Read, Failed) comes in and shows on the message.   MSG-01, MSG-03

  INT-02     Safety and Privacy         The Safety Mode flag, the AI privacy controls (SAF-03), and the preview and sensitive-image controls (SAF-02) come in.                         MSG-03, MSG-04, MSG-06, MSG-09, MSG-12

  INT-03     Records and Court          Threads, messages, read times, attachments and reports go out.                                                                                 MSG-01, MSG-02, MSG-03, MSG-09, MSG-14

  INT-04     Accounts and Onboarding    The household mode, a co-parent who is not on the app (ACC-04) and the roles come in. Third party and Child access comes with ACC-07.          MSG-01, MSG-10

  INT-06     Children and Documents     Attachments go to the household files (DOC-02).                                                                                                MSG-09

  INT-07     Professionals and Access   Threads and reports that a parent shares go out as read-only.                                                                                  MSG-02, MSG-14

  INT-08     AI service                 Drafts, incoming messages, questions and urgent checks go to it, and the results come back. All AI use is opt-in.                              MSG-04, MSG-05, MSG-06, MSG-11, MSG-13

  INT-09     Mediation partner          Mediation requests go to the partner mediators.                                                                                                MSG-12
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

5.4 Non-functional requirements

  ------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**        **Requirement**                                                            **Where it applies here**
  ------------- -------------------------------------------------------------------------- -------------------------------------------------------------
  NFR-02        Encryption in transit and at rest                                          Messages, attachments, drafts, reports and AI settings

  NFR-03        Role-based access on every request                                         FR-MSG-01-11, FR-MSG-02-04, FR-MSG-14-03

  NFR-05        Records cannot be edited. A change is a new entry.                         FR-MSG-02-01, FR-MSG-03-04, FR-MSG-14-08

  NFR-06        Collect only the data that is needed                                       FR-MSG-04-07, FR-MSG-11-03 (the AI sees only what it needs)

  NFR-09        Plain language on every screen. The standard is to be chosen.2 level AA.   All screens

  NFR-11        English only.                                                              All screens, messages and AI features
  ------------------------------------------------------------------------------------------------------------------------------------------------------
