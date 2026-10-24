# Calendar and Parenting Time (CAL)


7.1 Functional requirements and acceptance criteria

CAL-01 Shared calendar

US-CAL-01-01. As a parent, I want one shared calendar for parenting time and events, so that both of us see who has the child and when.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-01-01      The system shall show one shared calendar for each household, with day, week and month views.

  FR-CAL-01-02      The system shall let a parent add an event with a title, details, a date, a start time, an end time, a location (optional), the children (optional), and the parent for drop-off and the parent for pick-up (optional).

  FR-CAL-01-03      The system shall let a parent make an event repeat daily, weekly, monthly or on custom days.

  FR-CAL-01-04      The system shall let a parent edit one occurrence of a repeating event or all future occurrences. A parent cannot change the repeat pattern of a series. To change the pattern, the parent adds a new series.

  FR-CAL-01-05      The system shall let only the creator of an event edit or cancel it, and only before the event starts.

  FR-CAL-01-06      The system shall let a creator cancel an event that has not started. The event stays on the calendar as Cancelled, and the co-parent is told through the Notifications module if the event was shared. The system never deletes an entry.

  FR-CAL-01-07      The system shall let a parent mark an event as private. Only the creator sees a private event.

  FR-CAL-01-08      The system shall let a parent add a parenting time entry that shows which parent has the children from a start to an end, and shall show each parent in their own color. A parenting time entry can repeat like an event.

  FR-CAL-01-09      In a linked household, the system shall save a parenting time entry as Proposed, show it to the co-parent, and change it to Active when the co-parent confirms it with the confirm step and the undo window of CAL-02. In Solo Mode, the system shall save it as Active at once.

  FR-CAL-01-10      In a linked household, the system shall let parents change an Active parenting time entry only through a schedule change request (CAL-02). In Solo Mode, the parent can edit an entry before it starts and the change is saved in the history (CAL-10).

  FR-CAL-01-11      The system should warn a parent when a new event or a new parenting time entry overlaps another entry, and should let the parent save it anyway.

  FR-CAL-01-12      The system shall show hearings, deadlines and due dates that Child Support Sync puts in the calendar as read-only agency items to the parent who linked the case, each with its source and the time it was last updated. It shall show an item to the other parent only when the linked parent has shared it.

  FR-CAL-01-13      The system shall save every time in UTC and show it in the local time of the user.

  FR-CAL-01-14      For a user in Safety Mode, the system shall show the location of an event to the other parent only when the user shares it.

  FR-CAL-01-15      The system shall make calendar entries available to Records and Court.

  FR-CAL-01-16      The system shall give Notifications the time and every change of each entry, so that reminders and alerts follow them.

  FR-CAL-01-17      The system shall not let an end time come before a start time and shall show ERR-01.

  FR-CAL-01-18      If an entry cannot be saved, the system shall show ERR-04 and shall not create it.

  FR-CAL-01-19      If a parent tries to edit or cancel an entry that has started, the system shall refuse and show ERR-02. If a parent tries to edit or cancel an entry that someone else created, the system shall refuse and show ERR-03.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                         **When**                                                                   **Then**                                                                                                                                                **Covers**
  -------------- --------------------------------------------------------------------------------- -------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-CAL-01-01   A linked household                                                                Either parent opens the calendar                                           The day, week and month views show the same entries to both parents                                                                                     FR-CAL-01-01

  AC-CAL-01-02   A signed-in parent                                                                They add an event with a title, a date, a start time and an end time       The event is saved and shows on the calendar of both parents                                                                                            FR-CAL-01-02

  AC-CAL-01-03   A signed-in parent                                                                They add a weekly event that repeats for 4 weeks                           4 occurrences show on the calendar                                                                                                                      FR-CAL-01-03

  AC-CAL-01-04   A repeating series                                                                The creator edits one occurrence, and later edits all future occurrences   Only that occurrence changes the first time and all later occurrences change the second time, and no option to change the repeat pattern is offered     FR-CAL-01-04

  AC-CAL-01-05   An event created by Parent A that starts tomorrow                                 Parent A edits it                                                          The change is saved                                                                                                                                     FR-CAL-01-05

  AC-CAL-01-06   The same event                                                                    Parent B tries to edit it                                                  The change is refused and ERR-03 shows                                                                                                                  FR-CAL-01-05, FR-CAL-01-19

  AC-CAL-01-07   An event that started an hour ago                                                 The creator tries to edit or cancel it                                     The change is refused and ERR-02 shows                                                                                                                  FR-CAL-01-05, FR-CAL-01-19

  AC-CAL-01-08   A shared event that starts tomorrow                                               The creator cancels it                                                     The event stays on the calendar as Cancelled and the co-parent is told (MSGT-09)                                                                        FR-CAL-01-06

  AC-CAL-01-09   A parent who marks an event as private                                            The co-parent opens the calendar                                           The event does not show                                                                                                                                 FR-CAL-01-07

  AC-CAL-01-10   A linked household                                                                Parent A adds a parenting time entry from Friday 18:00 to Sunday 18:00     The entry is saved as Proposed and shows to Parent B in the color of Parent A                                                                           FR-CAL-01-08, FR-CAL-01-09

  AC-CAL-01-11   A parenting time entry with the status Proposed                                   Parent B confirms it with the confirm step and the undo window ends        The status is Active                                                                                                                                    FR-CAL-01-09

  AC-CAL-01-12   A household in Solo Mode                                                          The parent adds a parenting time entry                                     The entry is saved as Active at once                                                                                                                    FR-CAL-01-09

  AC-CAL-01-13   An Active parenting time entry in a linked household                              A parent tries to change it directly                                       The change is not possible and the system offers a schedule change request                                                                              FR-CAL-01-10

  AC-CAL-01-14   A parent who adds an event that overlaps another entry                            They save it                                                               A warning shows (MSGT-02) and the parent can save the event anyway                                                                                      FR-CAL-01-11

  AC-CAL-01-15   A hearing that Child Support Sync put in the calendar from the case of Parent A   Parent B opens the calendar, and later Parent A shares the hearing         Parent B does not see the hearing at first and sees it after the sharing. Parent A sees it read-only with its source and the time of the last update.   FR-CAL-01-12

  AC-CAL-01-16   An entry saved as 2027-01-15 18:00 UTC                                            A user in US Eastern time views it                                         It shows as 13:00 on January 15, 2027                                                                                                                   FR-CAL-01-13

  AC-CAL-01-17   A user in Safety Mode who adds an event with a location                           The other parent opens the event                                           The location does not show until the user shares it                                                                                                     FR-CAL-01-14

  AC-CAL-01-18   A calendar entry                                                                  Records and Court asks for the entries                                     The entries are available. The export format is owned by Records and Court.                                                                             FR-CAL-01-15

  AC-CAL-01-19   An entry whose time changes                                                       The change is saved                                                        Notifications gets the new time                                                                                                                         FR-CAL-01-16

  AC-CAL-01-20   A signed-in parent                                                                They save an event with an end time before the start time                  The event is not saved and ERR-01 shows                                                                                                                 FR-CAL-01-17

  AC-CAL-01-21   A signed-in parent and a save error                                               They save an event                                                         The event is not created and ERR-04 shows                                                                                                               FR-CAL-01-18
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CAL-02 Schedule change and swap requests with confirm step, undo window and approval log

US-CAL-02-01. As a parent, I want to ask my co-parent for a schedule change or a swap inside the calendar, so that the answer is clear and recorded.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-02-01       The system shall let a parent in a linked household send a schedule change request with a type (Swap days, Change of parenting time, or Change of exchange time or place), the children, the start and end of the change, a short reason and a respond-by date.

  FR-CAL-02-02       For a swap, the system shall also take the start and end of the parenting time that the requester offers in return.

  FR-CAL-02-03       The system shall require the respond-by date to be at least 24 hours after the request is sent and shall show ERR-05 if it is not.

  FR-CAL-02-04       The system shall show a pending request on the calendar of both parents and shall alert the co-parent through the Notifications module.

  FR-CAL-02-05       The system shall let only the co-parent approve or decline a request. A decline can include a reason.

  FR-CAL-02-06       The system shall show the approver the full change and ask for a confirm step. No approval counts without the confirm step.

  FR-CAL-02-07       After the approver confirms, the system shall set the status Approved and keep the approval undoable for 10 minutes. During this time the approver can undo it, and the request goes back to Pending. The calendar does not change until the undo window ends.

  FR-CAL-02-08       When the undo window ends, the system shall change the calendar to match the request and shall tell the requester.

  FR-CAL-02-09       The system shall save who approved or declined, when, and from which device.

  FR-CAL-02-10       If nobody answers by the respond-by date, the system shall set the status Expired and leave the calendar unchanged.

  FR-CAL-02-11       After a response, the system shall not let anyone change the request. The requester can withdraw a request that is still Pending.

  FR-CAL-02-12       The system shall keep every request with its status and history and shall never delete one.

  FR-CAL-02-13       In Solo Mode, the system shall not offer schedule change requests.

  FR-CAL-02-14       If a parent tries to answer a request that expired, the system shall refuse and show ERR-07. If a parent tries to answer a request that was already answered, the system shall refuse and show ERR-06.

  FR-CAL-02-15       If a request cannot be saved, the system shall show ERR-04 and shall not create it.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                             **When**                                                                                                                     **Then**                                                                                                                 **Covers**
  -------------- --------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------ ------------------------------------------
  AC-CAL-02-01   A linked household                                                    A parent sends a swap request with the children, the dates, the trade dates, a reason and a respond-by date 48 hours ahead   The request is saved as Pending, it shows on the calendar of both parents, the co-parent is alerted, and MSGT-01 shows   FR-CAL-02-01, FR-CAL-02-02, FR-CAL-02-04

  AC-CAL-02-02   A linked household                                                    A parent sets a respond-by date 12 hours ahead and sends                                                                     The request is not sent and ERR-05 shows                                                                                 FR-CAL-02-03

  AC-CAL-02-03   A pending request                                                     The requester tries to approve it                                                                                            The approval is not possible                                                                                             FR-CAL-02-05

  AC-CAL-02-04   A pending request                                                     The co-parent declines it with a reason                                                                                      The status is Declined, the reason is saved and the requester is told (MSGT-07)                                          FR-CAL-02-05

  AC-CAL-02-05   A pending request                                                     The co-parent chooses to approve                                                                                             The system shows the full change and asks to confirm, and nothing is approved before the confirm step                    FR-CAL-02-06

  AC-CAL-02-06   An approval that the approver confirmed                               The approver undoes it within 10 minutes                                                                                     The request is Pending again and the calendar did not change (MSGT-05)                                                   FR-CAL-02-07

  AC-CAL-02-07   An approval that the approver confirmed and did not undo              10 minutes pass                                                                                                              The calendar changes to match, the requester is told, and MSGT-04 shows                                                  FR-CAL-02-07, FR-CAL-02-08

  AC-CAL-02-08   An approval                                                           It is saved                                                                                                                  The log shows the approver, the time in UTC and the device                                                               FR-CAL-02-09

  AC-CAL-02-09   A pending request                                                     The respond-by date passes                                                                                                   The status is Expired, the calendar is unchanged and both parents are told (MSGT-06)                                     FR-CAL-02-10

  AC-CAL-02-10   An answered request                                                   Anyone tries to change it                                                                                                    The change is not possible                                                                                               FR-CAL-02-11

  AC-CAL-02-11   A pending request                                                     The requester withdraws it                                                                                                   The status is Withdrawn and the co-parent is told (MSGT-08)                                                              FR-CAL-02-11

  AC-CAL-02-12   A household with approved, declined, expired and withdrawn requests   A parent opens the request history                                                                                           All requests show with their status and none is deleted                                                                  FR-CAL-02-12

  AC-CAL-02-13   A household in Solo Mode                                              The parent opens the add menu                                                                                                No schedule change request is offered                                                                                    FR-CAL-02-13

  AC-CAL-02-14   An expired request                                                    The co-parent tries to answer it                                                                                             The answer is refused and ERR-07 shows                                                                                   FR-CAL-02-14

  AC-CAL-02-15   An answered request                                                   A parent tries to answer it again                                                                                            The answer is refused and ERR-06 shows                                                                                   FR-CAL-02-14

  AC-CAL-02-16   A parent and a save error                                             They send a request                                                                                                          The request is not created and ERR-04 shows                                                                              FR-CAL-02-15
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CAL-03 Custody schedule templates and schedule builder

US-CAL-03-01. As a parent, I want to set up our custody schedule from a template or build my own, so that I do not enter every day by hand.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-03-01        The system should offer schedule templates for common custody patterns: alternating weeks, 2-2-3, 2-2-5-5, 3-4-4-3 and every other weekend.

  FR-CAL-03-02        The system should let a parent build a custom schedule as a repeating cycle of days in which each day belongs to a parent, with a start date and an optional end date.

  FR-CAL-03-03        The system should let a household have more than one schedule, for example one for each child.

  FR-CAL-03-04        The system should create parenting time entries from the schedule for the dates it covers.

  FR-CAL-03-05        In a linked household, the system should save the entries as Proposed until the co-parent confirms them (FR-CAL-01-09).

  FR-CAL-03-06        The system should show the parent a preview of the entries before the parent saves the schedule.

  FR-CAL-03-07        If a schedule cannot be saved, the system should show ERR-04 and should not create any entry.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                             **When**                                                         **Then**                                                            **Covers**
  -------------- ------------------------------------- ---------------------------------------------------------------- ------------------------------------------------------------------- ----------------------------
  AC-CAL-03-01   A signed-in parent                    They open the template list                                      The five templates show                                             FR-CAL-03-01

  AC-CAL-03-02   A signed-in parent                    They choose alternating weeks with a start date of next Monday   A preview shows the weeks given to each parent in turn              FR-CAL-03-01, FR-CAL-03-06

  AC-CAL-03-03   A signed-in parent                    They build a 14-day cycle by giving each day to a parent         The preview shows the 14-day cycle repeating from the start date    FR-CAL-03-02, FR-CAL-03-06

  AC-CAL-03-04   A household with two children         The parent adds a schedule for each child                        Both schedules show on the calendar                                 FR-CAL-03-03

  AC-CAL-03-05   A parent who saves a schedule         The save completes                                               Parenting time entries exist for the dates the schedule covers      FR-CAL-03-04

  AC-CAL-03-06   A linked household                    A parent saves a schedule                                        The entries have the status Proposed until the co-parent confirms   FR-CAL-03-05

  AC-CAL-03-07   A signed-in parent and a save error   They save a schedule                                             Nothing is created and ERR-04 shows                                 FR-CAL-03-07
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CAL-04 Holiday scheduling and overrides

US-CAL-04-01. As a parent, I want holidays to override the normal schedule, so that holiday custody follows our plan.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-04-01      The system should offer a list of US holidays and school breaks: New Year\'s Day, Martin Luther King Jr. Day, Presidents\' Day, Easter, Memorial Day, Mother\'s Day, Father\'s Day, Independence Day, Labor Day, Halloween, Thanksgiving, Christmas Eve, Christmas Day, winter break, spring break and summer break.

  FR-CAL-04-02      The system should let a parent give each holiday to a parent for every year, for even years only or for odd years only.

  FR-CAL-04-03      The system should let a parent add a custom holiday or special day with a name, a date or date range, and a parent.

  FR-CAL-04-04      The system should let a holiday entry override the base schedule on its dates and should keep the base entry in the history.

  FR-CAL-04-05      In a linked household, the system should save holiday entries as Proposed until the co-parent confirms them (FR-CAL-01-09).

  FR-CAL-04-06      If a holiday setting cannot be saved, the system should show ERR-04 and should not create any entry.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                      **When**                                                         **Then**                                                                   **Covers**
  -------------- -------------------------------------------------------------- ---------------------------------------------------------------- -------------------------------------------------------------------------- --------------
  AC-CAL-04-01   A signed-in parent                                             They open the holiday list                                       The holidays and school breaks in FR-CAL-04-01 show                        FR-CAL-04-01

  AC-CAL-04-02   A signed-in parent                                             They give Thanksgiving to Parent A for odd years only            Entries exist for Thanksgiving in odd years only                           FR-CAL-04-02

  AC-CAL-04-03   A signed-in parent                                             They add a custom special day with a name, a date and a parent   The day shows on the calendar for that parent                              FR-CAL-04-03

  AC-CAL-04-04   A holiday entry that overlaps an Active parenting time entry   The holiday is saved                                             The holiday applies on its dates and the base entry stays in the history   FR-CAL-04-04

  AC-CAL-04-05   A linked household                                             A parent saves a holiday                                         The holiday entry has the status Proposed until the co-parent confirms     FR-CAL-04-05

  AC-CAL-04-06   A signed-in parent and a save error                            They save a holiday                                              Nothing is created and ERR-04 shows                                        FR-CAL-04-06
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CAL-05 Two-way sync with Google, Apple and Outlook calendars

US-CAL-05-01. As a parent, I want the ParentPath calendar to show in my own calendar app, so that I only check one calendar.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-05-01      The system should let a parent connect a Google calendar or an Outlook calendar after the parent gives permission, and disconnect it at any time.

  FR-CAL-05-02      The system should offer an ICS feed for any other calendar app, including Apple Calendar. The feed is read-only and has its own private link. The parent can reset the link at any time.

  FR-CAL-05-03      The system should let the parent choose to send the time of both parents or only their own time to the outside calendar.

  FR-CAL-05-04      The system should send entries to the outside calendar and keep them up to date when they change.

  FR-CAL-05-05      The system should import into ParentPath only the events that the parent creates in the connected outside calendar. Parenting time, schedule changes, agency items and events of the co-parent stay read-only in the outside calendar.

  FR-CAL-05-06      When the same entry differs in the two calendars, the system should keep the ParentPath version, log the outside change as not applied and tell the parent.

  FR-CAL-05-07      For a user in Safety Mode, the system should send events with no location and no details.

  FR-CAL-05-09      If a connection fails, the system should show ERR-08 and should keep the earlier data in the outside calendar.

  FR-CAL-05-10      The system should write an audit log entry when a parent connects or disconnects a calendar and when an outside change is imported or not applied.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                             **When**                                             **Then**                                                                                                          **Covers**
  -------------- --------------------------------------------------------------------- ---------------------------------------------------- ----------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-CAL-05-01   A parent                                                              They connect a Google calendar and give permission   The connection is active and the ParentPath entries show in the Google calendar                                   FR-CAL-05-01, FR-CAL-05-04

  AC-CAL-05-02   A connected calendar                                                  The parent disconnects it                            The sync stops and no further changes go to the outside calendar                                                  FR-CAL-05-01

  AC-CAL-05-03   A parent                                                              They ask for an ICS feed                             The system shows a private read-only link, and a calendar app that subscribes to it shows the entries             FR-CAL-05-02

  AC-CAL-05-04   A parent who reset the ICS link                                       Someone uses the old link                            The old link no longer works                                                                                      FR-CAL-05-02

  AC-CAL-05-05   A parent who chooses to send only their own time                      The sync runs                                        Only the own entries of the parent go to the outside calendar                                                     FR-CAL-05-03

  AC-CAL-05-06   An entry that changes in ParentPath                                   The change is saved                                  The outside calendar shows the change                                                                             FR-CAL-05-04

  AC-CAL-05-07   A parent who creates an event in the connected outside calendar       The sync runs                                        The event shows in ParentPath as an event of that parent                                                          FR-CAL-05-05

  AC-CAL-05-08   A parent who changes a parenting time entry in the outside calendar   The sync runs                                        ParentPath keeps its own version, the outside change is logged as not applied, and the parent is told (MSGT-10)   FR-CAL-05-05, FR-CAL-05-06

  AC-CAL-05-09   A user in Safety Mode                                                 Entries go to the outside calendar                   They carry no location and no details                                                                             FR-CAL-05-07

  AC-CAL-05-11   A connection that fails                                               The parent connects a calendar                       ERR-08 shows and the earlier data in the outside calendar is unchanged                                            FR-CAL-05-09

  AC-CAL-05-12   A parent who connects, disconnects or imports a change                The action is done                                   One audit log entry exists with the actor, the time in UTC and the result                                         FR-CAL-05-10
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CAL-06 Parenting-time tracking

US-CAL-06-01. As a parent, I want to record when the child really changed hands, so that we have a record of actual parenting time.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-06-01        The system should let a parent record an exchange for a parenting time entry: who handed over, who received, the date and time, and an optional note.

  FR-CAL-06-02        The system should let the other parent confirm or dispute an exchange record. An exchange record that nobody answers stays Unconfirmed.

  FR-CAL-06-03        The system should not let anyone edit or delete an exchange record. A correction is a new record.

  FR-CAL-06-04        The system should show the actual time next to the scheduled time for each parenting time entry.

  FR-CAL-06-05        In Solo Mode, the system should let the parent record exchanges. They stay Unconfirmed.

  FR-CAL-06-06        If an exchange record cannot be saved, the system should show ERR-04 and should not create it.

  FR-CAL-06-07        The system should write an audit log entry for every exchange record and every answer to one.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Tracking is available to every user. The parenting-time report in CAL-07 is available to every user.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                        **When**                                                            **Then**                                                                    **Covers**
  -------------- ------------------------------------------------ ------------------------------------------------------------------- --------------------------------------------------------------------------- --------------
  AC-CAL-06-01   A parenting time entry that ended                A parent records who handed over, who received, the date and time   The exchange record is saved with the status Unconfirmed                    FR-CAL-06-01

  AC-CAL-06-02   An Unconfirmed exchange record                   The other parent confirms it                                        The status is Confirmed                                                     FR-CAL-06-02

  AC-CAL-06-03   An Unconfirmed exchange record                   The other parent disputes it with a note                            The status is Disputed and both parents see the note                        FR-CAL-06-02

  AC-CAL-06-04   An exchange record that nobody answers           7 days pass                                                         The status is still Unconfirmed                                             FR-CAL-06-02

  AC-CAL-06-05   An exchange record                               Anyone tries to edit or delete it                                   The change is not possible and a correction can be added as a new record    FR-CAL-06-03

  AC-CAL-06-06   A parenting time entry with an exchange record   A parent opens the entry                                            The actual time shows next to the scheduled time                            FR-CAL-06-04

  AC-CAL-06-07   A household in Solo Mode                         The parent records an exchange                                      The record is saved and stays Unconfirmed                                   FR-CAL-06-05

  AC-CAL-06-08   A parent and a save error                        They record an exchange                                             Nothing is created and ERR-04 shows                                         FR-CAL-06-06

  AC-CAL-06-09   An exchange record or an answer to one           It is saved                                                         One audit log entry exists with the actor, the time in UTC and the result   FR-CAL-06-07
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CAL-07 Parenting-time analytics and compliance view

US-CAL-07-01. As a parent, I want to see how well the schedule is followed, so that I can talk about facts and not memories.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-07-01       The system should show, for each month and each parent, the scheduled time, the actual time and the difference, taken from the exchange records (CAL-06).

  FR-CAL-07-02       The system should show, for each month, the number of late exchanges, the number of Unconfirmed and Disputed exchange records, and the number of schedule change requests by status.

  FR-CAL-07-03       The system should count an exchange as late when the actual time is more than 15 minutes after the scheduled time.

  FR-CAL-07-04       The system should let a parent export the compliance view as part of a court-ready record through Records and Court.

  FR-CAL-07-06       The system should show the compliance view only to the parents of the household and to a professional with whom a parent shares it.

  FR-CAL-07-07       If the figures cannot be calculated, the system should show ERR-09.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                               **When**                                       **Then**                                                                                                                  **Covers**
  -------------- ------------------------------------------------------- ---------------------------------------------- ------------------------------------------------------------------------------------------------------------------------- --------------
  AC-CAL-07-01   A household with exchange records in March              A parent opens the compliance view for March   The scheduled time, the actual time and the difference show for each parent                                               FR-CAL-07-01

  AC-CAL-07-02   The same month                                          A parent opens the compliance view             The number of late exchanges, the number of Unconfirmed and Disputed records, and the number of requests by status show   FR-CAL-07-02

  AC-CAL-07-03   An exchange scheduled for 18:00 and recorded at 18:20   The compliance view is calculated              The exchange counts as late                                                                                               FR-CAL-07-03

  AC-CAL-07-04   A compliance view                                       A parent exports it                            It is included in the court-ready record from Records and Court                                                           FR-CAL-07-04

  AC-CAL-07-06   A compliance view                                       A Third party opens the calendar               The compliance view does not show                                                                                         FR-CAL-07-06

  AC-CAL-07-07   A calculation error                                     A parent opens the compliance view             ERR-09 shows                                                                                                              FR-CAL-07-07
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CAL-08 Parenting plan builder

US-CAL-08-01. As a parent, I want to build a parenting plan by answering questions, so that I have a clear document to share and a schedule to match.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-08-01        The system should guide a parent through questions about the schedule, holidays, exchanges, transport, communication and decisions about the child, and should build a parenting plan document from the answers.

  FR-CAL-08-02        The system should let a parent share the plan with the co-parent, a professional or a Third party, who can read it.

  FR-CAL-08-03        The system should offer to create the schedule and the holidays of the plan in the calendar (CAL-03 and CAL-04).

  FR-CAL-08-04        The system should show on the plan that it is a record tool and not legal advice, and that a court decides.

  FR-CAL-08-05        The system should let a parent export the plan as a PDF.

  FR-CAL-08-06        The system should offer the plan builder only after the legal review of its questions and its document text is recorded as done.

  FR-CAL-08-07        If a plan cannot be saved, the system should show ERR-04 and should not create it.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                     **When**                                  **Then**                                                                                             **Covers**
  -------------- ------------------------------------------------------------- ----------------------------------------- ---------------------------------------------------------------------------------------------------- --------------
  AC-CAL-08-01   A signed-in parent                                            They answer all the questions             A parenting plan document is built from the answers                                                  FR-CAL-08-01

  AC-CAL-08-02   A built plan                                                  The parent shares it with the co-parent   The co-parent can read the plan and cannot change it                                                 FR-CAL-08-02

  AC-CAL-08-03   A built plan with a schedule and holidays                     The parent accepts the offer              Entries for the schedule and the holidays exist in the calendar, as Proposed in a linked household   FR-CAL-08-03

  AC-CAL-08-04   A built plan                                                  A parent opens it                         The notice that it is a record tool and not legal advice shows                                       FR-CAL-08-04

  AC-CAL-08-05   A built plan                                                  The parent exports it                     A PDF of the plan is created                                                                         FR-CAL-08-05

  AC-CAL-08-06   A release built before the legal review is recorded as done   A parent looks for the plan builder       The plan builder is not offered                                                                      FR-CAL-08-06

  AC-CAL-08-07   A signed-in parent and a save error                           They save a plan                          Nothing is created and ERR-04 shows                                                                  FR-CAL-08-07
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CAL-09 Check-ins at exchanges

US-CAL-09-01. As a parent, I want to check in at an exchange, so that I can show I was there on time.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-09-01         The system should let a parent check in at an exchange or another place by choosing Check in. The check-in saves the time and the location of the device at that moment.

  FR-CAL-09-02         The system should read the location only when the parent chooses Check in and should never read it in the background.

  FR-CAL-09-03         The system should keep a check-in private to the parent until the parent shares it with the co-parent, a professional or a Third party.

  FR-CAL-09-04         The system shall not offer check-ins to a user in Safety Mode.

  FR-CAL-09-05         The system should not let anyone edit or delete a check-in.

  FR-CAL-09-06         The system should link a check-in to the calendar entry of the exchange when there is one.

  FR-CAL-09-07         The system should make check-ins available to Records and Court.

  FR-CAL-09-08         If the location is not allowed or not available, the system should not save the check-in and should show ERR-10.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                      **When**                                   **Then**                                                                          **Covers**
  -------------- ---------------------------------------------- ------------------------------------------ --------------------------------------------------------------------------------- --------------
  AC-CAL-09-01   A parent who allows location for this action   They choose Check in                       A check-in is saved with the time and the location of the device at that moment   FR-CAL-09-01

  AC-CAL-09-02   A parent who did not choose Check in           The app is open or in the background       The app does not read the location                                                FR-CAL-09-02

  AC-CAL-09-03   A saved check-in                               The co-parent opens the calendar           The check-in does not show until the parent shares it                             FR-CAL-09-03

  AC-CAL-09-04   A user in Safety Mode                          They open an exchange                      Check in is not offered                                                           FR-CAL-09-04

  AC-CAL-09-05   A saved check-in                               Anyone tries to edit or delete it          The change is not possible                                                        FR-CAL-09-05

  AC-CAL-09-06   An exchange that has a calendar entry          The parent checks in during the exchange   The check-in is linked to that entry                                              FR-CAL-09-06

  AC-CAL-09-07   A saved check-in                               Records and Court asks for check-ins       The check-ins are available                                                       FR-CAL-09-07

  AC-CAL-09-08   A parent who does not allow location           They choose Check in                       No check-in is saved and ERR-10 shows                                             FR-CAL-09-08
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CAL-10 Calendar audit trail

US-CAL-10-01. As a parent, I want a history of every change to an entry, so that the original details are never lost.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-10-01        The system shall save a version of an entry when it is created and every time it is changed or cancelled, with the original details, who made the change, when, and from which device.

  FR-CAL-10-02        The system shall never overwrite or delete a version.

  FR-CAL-10-03        The system shall show the history of an entry to both parents when the entry is shared, and to the creator when the entry is private.

  FR-CAL-10-04        The system shall not let an event that has started be edited or deleted.

  FR-CAL-10-05        The system shall include the history in the calendar records that Records and Court exports.

  FR-CAL-10-06        For a change that comes from a schedule change request, the system shall link the version to the request.

  FR-CAL-10-07        If a version cannot be saved, the system shall not make the change and shall show ERR-04.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                               **When**                                          **Then**                                                                                          **Covers**
  -------------- ------------------------------------------------------- ------------------------------------------------- ------------------------------------------------------------------------------------------------- --------------
  AC-CAL-10-01   An event                                                The creator creates it, edits it and cancels it   Three versions exist, each with the original details, the actor, the time in UTC and the device   FR-CAL-10-01

  AC-CAL-10-02   A saved version                                         Anyone tries to overwrite or delete it            The change is not possible                                                                        FR-CAL-10-02

  AC-CAL-10-03   A shared event with two versions, and a private event   The co-parent opens the history of each           The co-parent sees both versions of the shared event and nothing of the private event             FR-CAL-10-03

  AC-CAL-10-04   An event that started an hour ago                       The creator tries to edit or delete it            The change is refused and ERR-02 shows                                                            FR-CAL-10-04

  AC-CAL-10-05   An entry with a history                                 Records and Court asks for the calendar records   The history is included                                                                           FR-CAL-10-05

  AC-CAL-10-06   A calendar change made by an approved request           A parent opens the history of the entry           The version shows the request that caused it                                                      FR-CAL-10-06

  AC-CAL-10-07   A version that cannot be saved                          A parent edits an event                           The edit is not made and ERR-04 shows                                                             FR-CAL-10-07
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CAL-11 Pet schedules and pet expenses

US-CAL-11-01. As a parent, I want to keep a schedule and the expenses for our pet, so that pet care is shared like child care.

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- ----------------------------------------------------------------------------------------------------------------------------------
  FR-CAL-11-01         The system should let a parent add a pet to the household with a name.

  FR-CAL-11-02         The system should let a parent add pet events, for example a vet visit.

  FR-CAL-11-03         The system should let parents say which parent has the pet in the same way as parenting time.

  FR-CAL-11-04         In a linked household, the system should save pet schedule entries as Proposed until the co-parent confirms them (FR-CAL-01-09).

  FR-CAL-11-05         The system should let a parent record a pet expense in Expenses and Payments with the category Pet.

  FR-CAL-11-06         If a pet or a pet entry cannot be saved, the system should show ERR-04 and should not create it.
  -------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                   **When**                                                   **Then**                                                            **Covers**
  -------------- --------------------------- ---------------------------------------------------------- ------------------------------------------------------------------- --------------
  AC-CAL-11-01   A signed-in parent          They add a pet with a name                                 The pet shows in the household                                      FR-CAL-11-01

  AC-CAL-11-02   A household with a pet      A parent adds a vet visit for the pet                      The pet event shows on the calendar                                 FR-CAL-11-02

  AC-CAL-11-03   A household with a pet      A parent says Parent A has the pet from Friday to Sunday   The pet schedule shows in the color of Parent A                     FR-CAL-11-03

  AC-CAL-11-04   A linked household          A parent saves a pet schedule                              The entries have the status Proposed until the co-parent confirms   FR-CAL-11-04

  AC-CAL-11-05   A household with a pet      A parent chooses the category Pet for an expense           The expense shows in Expenses and Payments with the category Pet    FR-CAL-11-05

  AC-CAL-11-06   A parent and a save error   They save a pet                                            Nothing is created and ERR-04 shows                                 FR-CAL-11-06
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

7.2 Data reference

  -------------------------------------------------------------------------------
  **Entity**                   **Fields used**
  ---------------------------- --------------------------------------------------
  User                         user_id, role

  Household                    household_id, mode (Linked, Solo)

  Child                        child_id

  Audit log entry              actor, action, object, result, device_type, time
  -------------------------------------------------------------------------------

8.2 New entities (proposed). The sources name none of these fields. They are a BA proposal.

Calendar entry

  ------------------------------------------------------------------------------------------------------------------------------------------
  **Field**               **Type**                 **Required**   **Notes**
  ----------------------- ------------------------ -------------- --------------------------------------------------------------------------
  entry_id                Unique ID                Yes            System generated

  household_id            Link to Household        Yes            ---

  entry_type              Choice                   Yes            Event, Parenting time, Holiday, Pet

  title                   Text                     Yes            ---

  details                 Text                     No             ---

  location                Text                     No             Shown to the other parent as set in FR-CAL-01-14

  start_at                Date and time            Yes            UTC

  end_at                  Date and time            Yes            UTC. After start_at.

  children                List of links to Child   No             ---

  responsible_parent_id   Link to User             No             The parent who has the children, for parenting time and holiday entries

  drop_off_parent_id      Link to User             No             ---

  pick_up_parent_id       Link to User             No             ---

  visibility              Choice                   Yes            Shared, Private

  status                  Choice                   Yes            Proposed, Active, Cancelled

  repeat_rule             Text                     No             Daily, weekly, monthly or custom days. Cannot be changed after creation.

  series_id               Unique ID                No             Links the occurrences of a repeating series

  source                  Choice                   Yes            Parent, Request, Schedule, Holiday, Agency item, Outside calendar

  created_by_user_id      Link to User             Yes            ---

  created_at              Date and time            Yes            UTC
  ------------------------------------------------------------------------------------------------------------------------------------------

Entry version

  ---------------------------------------------------------------------------------------------------------------------------------
  **Field**            **Type**                          **Required**   **Notes**
  -------------------- --------------------------------- -------------- -----------------------------------------------------------
  version_id           Unique ID                         Yes            System generated

  entry_id             Link to Calendar entry            Yes            ---

  version_number       Number                            Yes            1 for the original details

  details_snapshot     Text                              Yes            All fields of the entry as saved. Cannot be changed.

  change_type          Choice                            Yes            Created, Edited, Cancelled, Confirmed, Changed by request

  changed_by_user_id   Link to User                      Yes            ---

  changed_at           Date and time                     Yes            UTC

  device_type          Text                              No             5

  request_id           Link to Schedule change request   No             Set when a request caused the change
  ---------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------
  **Field**              **Type**                 **Required**   **Notes**
  ---------------------- ------------------------ -------------- -----------------------------------------------------------------------
  request_id             Unique ID                Yes            System generated

  household_id           Link to Household        Yes            ---

  request_type           Choice                   Yes            Swap days, Change of parenting time, Change of exchange time or place

  requested_by_user_id   Link to User             Yes            ---

  children               List of links to Child   Yes            ---

  change_start_at        Date and time            Yes            UTC

  change_end_at          Date and time            Yes            UTC

  trade_start_at         Date and time            No             UTC. For a swap.

  trade_end_at           Date and time            No             UTC. For a swap.

  reason                 Text                     Yes            Short

  respond_by_at          Date and time            Yes            UTC. At least 24 hours after created_at.

  status                 Choice                   Yes            Pending, Approved, Declined, Expired, Withdrawn

  response_reason        Text                     No             Given with a decline

  responded_by_user_id   Link to User             No             ---

  responded_at           Date and time            No             UTC

  device_type            Text                     No             The device of the response

  undo_until             Date and time            No             UTC. 10 minutes after the approval is confirmed.

  applied_at             Date and time            No             UTC. Set when the calendar changes.

  created_at             Date and time            Yes            UTC
  --------------------------------------------------------------------------------------------------------------------------------------

7.3 Interfaces

All interfaces except INT-08 are with other modules of the app.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **With**                                    **What passes**                                                                                                      **Features**
  ---------- ------------------------------------------- -------------------------------------------------------------------------------------------------------------------- ------------------------------------------------
  INT-01     Notifications                               The time and every change of an entry go out. Reminders, request alerts and event alerts come back to the users.     CAL-01, CAL-02

  INT-02     Child Support Sync                          Hearings, deadlines and due dates come in as read-only agency items.                                                 CAL-01

  INT-03     Safety and Privacy                          The Safety Mode flag comes in, so that locations are hidden, check-ins are off and synced events carry no details.   CAL-01, CAL-05, CAL-09

  INT-04     Records and Court                           Entries, versions, requests, exchange records and check-ins go out.                                                  CAL-01, CAL-02, CAL-06, CAL-07, CAL-09, CAL-10

  INT-05     Accounts and Onboarding                     The household mode (Linked or Solo), the roles, and the access of a Third party and a Child come in.                 CAL-01, CAL-02

  INT-07     Expenses and Payments                       Pet expenses are recorded with the category Pet.                                                                     CAL-11

  INT-08     Google, Outlook and ICS calendar services   Entries go out. Events the parent creates come in.                                                                   CAL-05
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

7.4 Non-functional requirements

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**        **Requirement**                                                             **Where it applies here**
  ------------- --------------------------------------------------------------------------- ----------------------------------------------------------------------------------
  NFR-02        Encryption in transit and at rest                                           Entries, versions, requests, locations and check-ins

  NFR-03        Role-based access on every request                                          FR-CAL-01-05, FR-CAL-01-07, FR-CAL-07-06

  NFR-04        Sign-ins, changes and sync actions are logged with actor, time and result   FR-CAL-05-10, FR-CAL-06-07, FR-CAL-10-01

  NFR-05        Records cannot be edited. A change is a new entry.                          FR-CAL-06-03, FR-CAL-09-05, FR-CAL-10-02

  NFR-06        Collect only the data that is needed                                        FR-CAL-09-02 (location read only when the parent chooses Check in), FR-CAL-05-03

  NFR-09        Plain language on every screen. The standard is to be chosen.2 level AA.    All screens

  NFR-11        English only.                                                               All screens and messages
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
