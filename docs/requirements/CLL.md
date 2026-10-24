# Calling (CLL)


6.1 Functional requirements and acceptance criteria

CLL-01 In-app audio and video calls

US-CLL-01-01. As a parent, I want to call my co-parent inside the app, so that we can talk in real time and the call is documented.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CLL-01-01       The system should let a parent place an audio call or a video call to the co-parent inside the app.

  FR-CLL-01-02       The system should allow a call only when both parents have turned on that type of call. Audio calls and video calls have separate settings.

  FR-CLL-01-03       The calling settings should be off until the parent turns them on.

  FR-CLL-01-04       The system should let a parent turn a type of call off at any time. After that the co-parent cannot call and sees only that calling is not available, with no reason.

  FR-CLL-01-05       The system should save every change of a calling setting in a consent log, with the parent, the type of call, the action and the time.

  FR-CLL-01-06       The system should ring the co-parent in the app, alert the co-parent through the Notifications module, and let the co-parent answer or decline.

  FR-CLL-01-07       During a call the system should let a parent mute and unmute, turn the camera on and off in a video call, and end the call.

  FR-CLL-01-08       The system should save every call with its type, who called, who was called, the start time, the answer time, the end time, the length and the status: Completed, Missed, Declined, Cancelled, Not answered or Failed.

  FR-CLL-01-09       The system should save the events of a call: answered, declined, ended, muted, unmuted, camera on and camera off, each with the parent and the time.

  FR-CLL-01-10       The system should not let anyone edit or delete a call record, an event or an entry of the consent log.

  FR-CLL-01-11       The system should show each call to both parents as an entry in the thread with the co-parent, and should include the call records and the consent log in exports.

  FR-CLL-01-12       The system should offer calls only in a linked household.

  FR-CLL-01-13       The system should make calls available with no cap on the number or the length of calls.

  FR-CLL-01-14       When the co-parent is in a quiet window (NTF-05), the system should not ring, should tell the caller that the co-parent is not available, and should save the call as Not answered.

  FR-CLL-01-15       When a parent turns calls on, and on the call screen, the system should show that calls cannot reach emergency services (MSGT-01).

  FR-CLL-01-16       For a user in Safety Mode, the calling settings should be off until the user turns them on.

  FR-CLL-01-17       If the microphone or the camera is not allowed, the system should show ERR-01. If the co-parent cannot take the call, it should show ERR-02. If the call cannot connect, it should save the call as Failed and show ERR-03. If calling is not available, it should show ERR-04.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                          **When**                                                                  **Then**                                                                                                                        **Covers**
  -------------- ------------------------------------------------------------------ ------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-CLL-01-01   Two parents who both turned on audio calls                         Parent A places an audio call and Parent B answers                        The two parents are connected and can talk                                                                                      FR-CLL-01-01

  AC-CLL-01-02   Two parents where only Parent A turned on video calls              Parent A tries to place a video call                                      The call is not placed and ERR-04 shows                                                                                         FR-CLL-01-02

  AC-CLL-01-03   A new user                                                         They open the calling settings                                            Audio calls and video calls are off                                                                                             FR-CLL-01-03

  AC-CLL-01-04   Two parents who both turned on audio calls                         Parent B turns audio calls off and Parent A tries to call                 The call is not placed, ERR-04 shows and it gives no reason                                                                     FR-CLL-01-04

  AC-CLL-01-05   A parent who turns a calling setting on and later off              Both changes are saved                                                    The consent log has two entries, each with the parent, the type of call, the action and the time                                FR-CLL-01-05

  AC-CLL-01-06   A call from Parent A                                               Parent B is in the app, and later declines another call                   Parent B is rung in the app and alerted (MSGT-02), and can answer the first call and decline the second                         FR-CLL-01-06

  AC-CLL-01-07   A video call in progress                                           A parent mutes, unmutes, turns the camera off and on, and ends the call   Each control works and the call ends                                                                                            FR-CLL-01-07

  AC-CLL-01-08   An answered call of 12 minutes, and a call that was not answered   Both calls end                                                            The first is saved as Completed with the times and a length of 12 minutes, and the second as Missed (MSGT-03)                   FR-CLL-01-08

  AC-CLL-01-09   A call in which a parent muted and turned the camera off           The call ends                                                             The events answered, muted, camera off and ended are saved, each with the parent and the time                                   FR-CLL-01-09

  AC-CLL-01-10   A call record, an event or a consent log entry                     Anyone tries to edit or delete it                                         The change is not possible                                                                                                      FR-CLL-01-10

  AC-CLL-01-11   A completed call                                                   A parent opens the thread and exports the record                          The call shows in the thread, and the export has the call record and the consent log                                            FR-CLL-01-11

  AC-CLL-01-12   A household in Solo Mode                                           The parent opens a thread                                                 Calling is not offered                                                                                                          FR-CLL-01-12

  AC-CLL-01-14   A household                                                        The parents make two calls of 90 minutes each in one month                No cap stops either call                                                                                                        FR-CLL-01-13

  AC-CLL-01-15   A co-parent in a quiet window                                      A parent places a call                                                    The co-parent is not rung, the caller is told the co-parent is not available (MSGT-11), and the call is saved as Not answered   FR-CLL-01-14

  AC-CLL-01-16   A parent who turns calls on                                        They confirm the switch                                                   The notice that calls cannot reach emergency services shows (MSGT-01)                                                           FR-CLL-01-15

  AC-CLL-01-17   A user in Safety Mode                                              They open the calling settings                                            Audio calls and video calls are off                                                                                             FR-CLL-01-16

  AC-CLL-01-18   A parent who did not allow the microphone                          They place an audio call                                                  The call is not placed and ERR-01 shows                                                                                         FR-CLL-01-17

  AC-CLL-01-19   A co-parent who is already on a call                               A parent calls                                                            The call is not connected and ERR-02 shows                                                                                      FR-CLL-01-17

  AC-CLL-01-20   A call that loses its connection before it is answered             The system cannot connect                                                 The call is saved as Failed and ERR-03 shows                                                                                    FR-CLL-01-17
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CLL-02 Call recording and transcription (with consent)

US-CLL-02-01. As a parent, I want to record a call only when both of us agree, so that we have an accurate record and nobody is recorded in secret.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CLL-02-01      Recording should be off by default. The system should offer recording only when both parents have turned on the recording setting.

  FR-CLL-02-02      A recording should start only when both parents agree for that call. The caller chooses Record this call before or during the call. The co-parent sees a request (MSGT-04) and can accept or decline.

  FR-CLL-02-03      The agreement should count for one call only. The system should ask again for the next call.

  FR-CLL-02-04      When a recording starts, the system should play a spoken notice to both parents that the call is being recorded (MSGT-05), and should show a Recording label on the screen for as long as the recording runs.

  FR-CLL-02-05      Either parent should be able to stop the recording at any time. The part already recorded is kept and the call goes on.

  FR-CLL-02-06      If the co-parent declines, the call should go on without a recording.

  FR-CLL-02-07      The system should save every agreement, decline, start and stop of a recording in the events of the call, with the parent and the time.

  FR-CLL-02-08      The system should save the recording of an audio call as an audio file and the recording of a video call as an audio and video file, each with a recording ID, a start time and an end time.

  FR-CLL-02-09      The system should not let anyone edit or delete a recording.

  FR-CLL-02-10      The system should let both parents play and download a recording of a call they were on. Nobody else can, except a professional with whom a parent shares it. Support staff and operations staff cannot.

  FR-CLL-02-11      The system should make a transcript only when the call was recorded and both parents have turned on call transcripts. Transcripts are off by default.

  FR-CLL-02-12      A transcript should show who spoke and when. It should carry the notice that a machine made it, that it may have mistakes and that the recording is the original (MSGT-07). It is kept with the recording.

  FR-CLL-02-13      Before a parent turns on recording or transcripts, the system should say plainly what is recorded, who can hear it, that the AI makes the transcript, and that nothing is used for training (MSGT-08 and MSGT-09).

  FR-CLL-02-14      The system should include recordings and transcripts, with their recording IDs, in exports through Records and Court.

  FR-CLL-02-15      Recordings should count toward the storage limit. If the household is over the limit, the system should not start a recording, should show ERR-05, and should let the call go on.

  FR-CLL-02-17      When a parent turns on recording, the system should ask for the state where the parent lives. It should offer recording only when the legal review of the recording consent rules is recorded as done for the state of each parent, and should otherwise show MSGT-10.

  FR-CLL-02-18      If a recording cannot start, the system should let the call go on and should show ERR-06.

  FR-CLL-02-19      Transcripts should work for English speech.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                         **When**                                                                                                                   **Then**                                                                                                                        **Covers**
  -------------- ------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-CLL-02-01   A new user                                                                                        They open the calling settings                                                                                             Recording and transcripts are off                                                                                               FR-CLL-02-01

  AC-CLL-02-02   Two parents where only Parent A turned recording on                                               Parent A starts a call                                                                                                     Record this call is not offered                                                                                                 FR-CLL-02-01

  AC-CLL-02-03   Two parents who both turned recording on                                                          The caller chooses Record this call and the co-parent accepts the request (MSGT-04)                                        The recording starts                                                                                                            FR-CLL-02-02

  AC-CLL-02-04   A request to record a call                                                                        The co-parent declines                                                                                                     No recording starts and the call goes on                                                                                        FR-CLL-02-02, FR-CLL-02-06

  AC-CLL-02-05   A second call after a call that was recorded                                                      The parents start the second call                                                                                          No recording starts until the caller asks again and the co-parent agrees again                                                  FR-CLL-02-03

  AC-CLL-02-06   A recording that starts                                                                           The recording begins                                                                                                       Both parents hear the spoken notice (MSGT-05) and the Recording label shows until the recording ends                            FR-CLL-02-04

  AC-CLL-02-07   A call that is being recorded                                                                     A parent stops the recording                                                                                               The label goes away (MSGT-06), the part already recorded is kept, and the call goes on                                          FR-CLL-02-05

  AC-CLL-02-08   A call with an agreement, a decline, a start and a stop of a recording                            The call ends                                                                                                              Each of these events is saved with the parent and the time                                                                      FR-CLL-02-07

  AC-CLL-02-09   A recorded audio call and a recorded video call                                                   Both calls end                                                                                                             The first has an audio file and the second an audio and video file, and each has a recording ID, a start time and an end time   FR-CLL-02-08

  AC-CLL-02-10   A saved recording                                                                                 Anyone tries to edit or delete it                                                                                          The change is not possible                                                                                                      FR-CLL-02-09

  AC-CLL-02-11   A recorded call                                                                                   Both parents, a member of support staff, and a professional with whom Parent A shared the call try to open the recording   Both parents can play and download it, the professional can open it, and the member of support staff cannot                     FR-CLL-02-10

  AC-CLL-02-12   A recorded call, where both parents turned transcripts on, and another where one parent did not   Each call ends                                                                                                             A transcript is made for the first call and none for the second                                                                 FR-CLL-02-11

  AC-CLL-02-13   A transcript                                                                                      A parent opens it                                                                                                          It shows who spoke and when, and it carries the notice about the machine and the original (MSGT-07)                             FR-CLL-02-12

  AC-CLL-02-14   A parent who turns on recording or transcripts                                                    They confirm the switch                                                                                                    The plain notice shows first (MSGT-08 or MSGT-09)                                                                               FR-CLL-02-13

  AC-CLL-02-15   A recorded call with a transcript                                                                 A parent exports the record                                                                                                The export has the recording ID, the recording and the transcript                                                               FR-CLL-02-14

  AC-CLL-02-16   A household that is over its storage limit                                                        A parent asks to record a call                                                                                             No recording starts, ERR-05 shows, and the call goes on                                                                         FR-CLL-02-15

  AC-CLL-02-18   A parent who lives in a state whose legal review is not recorded as done                          They turn on recording                                                                                                     Recording is not offered and MSGT-10 shows                                                                                      FR-CLL-02-17

  AC-CLL-02-19   A recording that cannot start                                                                     The caller chooses Record this call and the co-parent agrees                                                               The call goes on and ERR-06 shows                                                                                               FR-CLL-02-18

  AC-CLL-02-20   A recorded call in which both parents speak English                                               A transcript is made                                                                                                       The transcript has the English text                                                                                             FR-CLL-02-19
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CLL-03 Personal phone number hidden during calls

US-CLL-03-01. As a parent, I want to call my co-parent without my phone number being shared, so that my number stays private.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CLL-03-01       The system should place every call inside the app over the internet. It should never show, send or use the personal phone number of either parent.

  FR-CLL-03-02       The system should show a parent only the name of the other parent on the call screen, in the call log, in the recordings and in the transcripts.

  FR-CLL-03-03       The system should not share the location of either parent during a call. It should route the call through a ParentPath relay, so that the network address of one parent is not shown to the other.

  FR-CLL-03-04       The system should not let a parent call a phone number or receive a call from a phone number.

  FR-CLL-03-05       The system should not show a phone number in the exports of calls.

  FR-CLL-03-06       The system should let a parent without a saved mobile number place and take calls.

  FR-CLL-03-07       If the system cannot set up a call that keeps the phone number and the network address private, it shall not connect the call and shall show ERR-03.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                            **When**                                                        **Then**                                                                                       **Covers**
  -------------- ---------------------------------------------------- --------------------------------------------------------------- ---------------------------------------------------------------------------------------------- ----------------------------
  AC-CLL-03-01   Two parents in a call                                Each parent looks at the screens of the app during the call     No phone number of the other parent shows anywhere                                             FR-CLL-03-01, FR-CLL-03-02

  AC-CLL-03-02   A completed call with a recording and a transcript   A parent opens the call log, the recording and the transcript   Only the name of the other parent shows, and no phone number                                   FR-CLL-03-02

  AC-CLL-03-03   A call in progress                                   A tester looks at the network path between the two parents      The path goes through the ParentPath relay, no direct path exists, and no location is shared   FR-CLL-03-03

  AC-CLL-03-04   A parent in a household                              The parent tries to enter a phone number to call                The calling screen offers no way to dial a number                                              FR-CLL-03-04

  AC-CLL-03-05   A parent who exports the record of a call            The export is created                                           The export shows no phone number                                                               FR-CLL-03-05

  AC-CLL-03-06   A parent who has no mobile number saved              The parent places a call                                        The call connects                                                                              FR-CLL-03-06

  AC-CLL-03-07   A call whose relay cannot be set up                  A parent places the call                                        The call is not connected and ERR-03 shows                                                     FR-CLL-03-07
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

6.2 Data reference

  ------------------------------------------------------------------------------
  **Entity**               **Fields used**
  ------------------------ -----------------------------------------------------
  User                     user_id, role, mobile_number (never used for calls)

  Household                household_id, mode (Linked, Solo)
  ------------------------------------------------------------------------------

8.2 New entities (proposed). The sources name none of these fields. They are a BA proposal.

Calling setting

  -----------------------------------------------------------------------------------------------------------------------------------
  **Field**          **Type**         **Required**   **Notes**
  ------------------ ---------------- -------------- --------------------------------------------------------------------------------
  user_id            Link to User     Yes            ---

  audio_calls_on     Yes or No        Yes            Default No

  video_calls_on     Yes or No        Yes            Default No

  recording_on       Yes or No        Yes            Default No

  transcripts_on     Yes or No        Yes            Default No

  recording_state    Choice           No             The US state where the parent lives. Asked when the parent turns recording on.
  -----------------------------------------------------------------------------------------------------------------------------------

Consent log entry

  -----------------------------------------------------------------------------------------------------
  **Field**         **Type**          **Required**   **Notes**
  ----------------- ----------------- -------------- --------------------------------------------------
  consent_id        Unique ID         Yes            System generated

  user_id           Link to User      Yes            ---

  setting           Choice            Yes            Audio calls, Video calls, Recording, Transcripts

  action            Choice            Yes            Enabled, Disabled

  recorded_at       Date and time     Yes            UTC. Cannot be changed.

  device_type       Text              No             5
  -----------------------------------------------------------------------------------------------------

Call

  ---------------------------------------------------------------------------------------------------------------------
  **Field**           **Type**            **Required**   **Notes**
  ------------------- ------------------- -------------- --------------------------------------------------------------
  call_id             Unique ID           Yes            System generated

  household_id        Link to Household   Yes            ---

  call_type           Choice              Yes            Audio, Video

  caller_user_id      Link to User        Yes            ---

  recipient_user_id   Link to User        Yes            ---

  started_at          Date and time       Yes            UTC

  answered_at         Date and time       No             UTC

  ended_at            Date and time       No             UTC

  duration_seconds    Number              No             Set when the call ends

  status              Choice              Yes            Completed, Missed, Declined, Cancelled, Not answered, Failed

  end_reason          Choice              No             Ended by the caller, Ended by the recipient, Connection lost

  recorded            Yes or No           Yes            Default No
  ---------------------------------------------------------------------------------------------------------------------

Call event

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**        **Type**         **Required**   **Notes**
  ---------------- ---------------- -------------- ----------------------------------------------------------------------------------------------------------------------------------------------
  event_id         Unique ID        Yes            System generated

  call_id          Link to Call     Yes            ---

  event_type       Choice           Yes            Answered, Declined, Ended, Muted, Unmuted, Camera on, Camera off, Recording agreed, Recording declined, Recording started, Recording stopped

  actor_user_id    Link to User     Yes            ---

  occurred_at      Date and time    Yes            UTC. Cannot be changed.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Recording and transcript

  --------------------------------------------------------------------------------------------------------------------
  **Field**         **Type**          **Required**   **Notes**
  ----------------- ----------------- -------------- -----------------------------------------------------------------
  recording_id      Unique ID         Yes            Shown in exports

  call_id           Link to Call      Yes            ---

  file_id           Link to file      Yes            An audio file, or an audio and video file

  started_at        Date and time     Yes            UTC

  ended_at          Date and time     Yes            UTC

  size_bytes        Number            Yes            Counts toward the storage limit

  transcript_text   Text              No             Made by a machine, only when both parents turned transcripts on
  --------------------------------------------------------------------------------------------------------------------

6.3 Interfaces

All interfaces except INT-08 and INT-09 are with other modules of the app.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **With**                   **What passes**                                                                                                                              **Features**
  ---------- -------------------------- -------------------------------------------------------------------------------------------------------------------------------------------- ------------------------
  INT-01     Notifications              Call events go out. Alerts for an incoming call and a missed call come back to the users. Quiet windows come in.                             CLL-01

  INT-02     Messaging                  A call starts from the thread with the co-parent, and each call shows as an entry in the thread.                                             CLL-01

  INT-03     Accounts and Onboarding    The household mode and the roles come in.                                                                                                    CLL-01, CLL-03

  INT-04     Records and Court          Call records, the consent log, recordings and transcripts go out.                                                                            CLL-01, CLL-02

  INT-05     Safety and Privacy         The Safety Mode flag and the AI privacy controls (SAF-03) come in.                                                                           CLL-01, CLL-02

  INT-07     Professionals and Access   Call records and recordings that a parent shares go out as read-only.                                                                        CLL-02

  INT-08     Call service               Real-time audio and video between the parents through a relay, and recording on the server side. IT chooses the provider before the build.   CLL-01, CLL-02, CLL-03

  INT-09     Speech-to-text service     Recordings go in and transcripts come back. All AI use is opt-in.                                                                            CLL-02
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

6.4 Non-functional requirements

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**        **Requirement**                                                             **Where it applies here**
  ------------- --------------------------------------------------------------------------- --------------------------------------------------------------
  NFR-02        Encryption in transit and at rest                                           Calls, recordings, transcripts and the call records

  NFR-03        Role-based access on every request                                          FR-CLL-02-10

  NFR-04        Sign-ins, changes and sync actions are logged with actor, time and result   FR-CLL-01-05, FR-CLL-01-09

  NFR-05        Records cannot be edited. A change is a new entry.                          FR-CLL-01-10, FR-CLL-02-09

  NFR-06        Collect only the data that is needed                                        FR-CLL-03-01, FR-CLL-03-03 (no phone number and no location)

  NFR-09        Plain language on every screen. The standard is to be chosen.2 level AA.    All screens

  NFR-10        Current desktop and phone browsers.                                         Calls run in these browsers

  NFR-11        English only. Transcripts are English first.                                All screens and transcripts
  --------------------------------------------------------------------------------------------------------------------------------------------------------
