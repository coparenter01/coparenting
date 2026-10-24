# Expenses and Payments (EXP)


8.1 Functional requirements and acceptance criteria

EXP-01 Shared expense log

US-EXP-01-01. As a parent, I want to record what I spend on our children in one log, so that both of us can see the costs.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-01-01      The system shall let a parent add an expense with a description, a category, an expense date, an amount in US dollars, the children (optional) and a note (optional).

  FR-EXP-01-02      The system shall require a description of 1 to 100 characters. It shall show ERR-03 if the description is empty and ERR-04 if it is longer than 100 characters.

  FR-EXP-01-03      The system shall require an amount greater than 0 and not more than 99,999.99, with no more than 2 decimal places. It shall show ERR-01 for any other amount.

  FR-EXP-01-04      The system shall require an expense date that is not in the future and shall show ERR-02 for a future date.

  FR-EXP-01-05      The system shall require a category and an expense date and shall show ERR-03 if one is missing.

  FR-EXP-01-06      The system shall let a parent add a note of up to 500 characters and shall show ERR-18 for a longer note.

  FR-EXP-01-07      The system shall save every amount in US dollars to the cent and shall show it with a dollar sign and 2 decimal places.

  FR-EXP-01-08      The system shall set the parent who paid to the parent who adds the expense. Nobody can change it.

  FR-EXP-01-09      The system shall let a parent in a linked household set an expense as Private or Shared. The default is Shared. In Solo Mode every expense is Private.

  FR-EXP-01-10      The system shall show a Private expense only to the parent who created it, and a Shared expense to both parents.

  FR-EXP-01-11      The system shall let the creator share a Private expense in a linked household after a confirm step (MSGT-02). The system shall not let a Shared expense become Private again.

  FR-EXP-01-12      When the co-parent joins a household that has expenses saved in Solo Mode, the system shall keep those expenses Private until the parent shares them, and shall show MSGT-05.

  FR-EXP-01-13      The system shall not send an alert when an expense is shared. Alerts about expenses start with reimbursement requests (EXP-03).

  FR-EXP-01-14      The system shall let only the creator edit an expense. Each edit shall save a new version with the original details, who made the change, when, and from which device. If another user tries to edit, the system shall refuse and show ERR-06.

  FR-EXP-01-15      If an expense has a reimbursement request that is not Withdrawn, the system shall refuse to edit or void it and shall show ERR-07. The creator can still add files (FR-EXP-02-07).

  FR-EXP-01-16      The system shall let the creator void an expense instead of deleting it. A voided expense stays in the log as Voided, is not counted in totals or in the balance, and is never deleted.

  FR-EXP-01-17      The system shall show the version history of an expense to both parents when the expense is Shared, and to the creator when it is Private. The system shall never overwrite or delete a version.

  FR-EXP-01-18      The system shall list expenses with the newest expense date first. Each row shows the description, category, expense date, amount, status (Active or Voided) and visibility.

  FR-EXP-01-19      The system shall make expenses and their versions available to Records and Court. It shall not show expenses to support staff or operations staff.

  FR-EXP-01-20      The system shall save all times in UTC and show them in the local time of the user.

  FR-EXP-01-21      The system shall write an audit log entry for every add, edit, void and share, with actor, time and result.

  FR-EXP-01-22      If an expense cannot be saved, the system shall show ERR-05 and shall not create or change it.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                                                **When**                                                                                                                      **Then**                                                                                                                              **Covers**
  -------------- ------------------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------
  AC-EXP-01-01   A linked household, and today is 2027-01-15                                                                              A parent adds an expense with the description School shoes, the category Clothing, the date 2027-01-10 and the amount 45.50   The expense is saved as Active and Shared, it shows to both parents, and MSGT-01 shows                                                FR-EXP-01-01, FR-EXP-01-09, FR-EXP-01-10

  AC-EXP-01-02   A parent adding an expense                                                                                               They leave the description empty, then enter 101 characters, then enter 100 characters                                        The first is not saved and ERR-03 shows, the second is not saved and ERR-04 shows, and the third is saved                             FR-EXP-01-02

  AC-EXP-01-03   A parent adding an expense                                                                                               They enter the amount 0, then 100000.00, then 12.345, then 99999.99                                                           The first three are not saved and ERR-01 shows each time, and the last is saved                                                       FR-EXP-01-03

  AC-EXP-01-04   Today is 2027-01-15                                                                                                      A parent saves an expense dated 2027-01-16                                                                                    The expense is not saved and ERR-02 shows                                                                                             FR-EXP-01-04

  AC-EXP-01-05   A parent adding an expense                                                                                               They save it with no category, and then with no expense date                                                                  Neither is saved and ERR-03 shows each time                                                                                           FR-EXP-01-05

  AC-EXP-01-06   A parent adding an expense                                                                                               They enter a note of 500 characters, then a note of 501 characters                                                            The first is saved and the second is not saved and ERR-18 shows                                                                       FR-EXP-01-06

  AC-EXP-01-07   A parent who enters the amount 45.5                                                                                      The expense is saved                                                                                                          The amount shows as \$45.50                                                                                                           FR-EXP-01-07

  AC-EXP-01-08   Parent A adds an expense                                                                                                 Parent A opens the expense                                                                                                    The parent who paid is Parent A and no option to change it is offered                                                                 FR-EXP-01-08

  AC-EXP-01-09   A linked household, and a household in Solo Mode                                                                         A parent adds an expense in each                                                                                              The expense in the linked household is Shared by default and the expense in Solo Mode is Private                                      FR-EXP-01-09

  AC-EXP-01-10   A Private expense and a Shared expense that Parent A created                                                             Parent B opens the expense log                                                                                                Parent B sees the Shared expense and does not see the Private expense                                                                 FR-EXP-01-10

  AC-EXP-01-11   A Private expense in a linked household                                                                                  Parent A chooses Share, sees the confirm step (MSGT-02) and confirms                                                          The expense is Shared and Parent B sees it. Parent A cannot make it Private again.                                                    FR-EXP-01-11

  AC-EXP-01-12   A household in Solo Mode with 3 saved expenses                                                                           The co-parent accepts an invite                                                                                               The 3 expenses stay Private, the co-parent cannot see them, and MSGT-05 shows to the parent                                           FR-EXP-01-12

  AC-EXP-01-13   A Private expense in a linked household                                                                                  The parent shares it                                                                                                          No alert is sent to the co-parent                                                                                                     FR-EXP-01-13

  AC-EXP-01-14   An expense of 45.50 that Parent A created                                                                                Parent A changes the amount to 54.50                                                                                          A new version is saved with the original details, the actor, the time in UTC and the device, and the history shows 2 versions         FR-EXP-01-14, FR-EXP-01-17

  AC-EXP-01-15   A Shared expense that Parent A created                                                                                   Parent B tries to edit it                                                                                                     The edit is refused and ERR-06 shows                                                                                                  FR-EXP-01-14

  AC-EXP-01-16   An expense with a request that is Pending, Accepted, Declined or Paid, and an expense with a request that is Withdrawn   The creator tries to edit or void each                                                                                        The first is refused and ERR-07 shows. The second can be edited or voided.                                                            FR-EXP-01-15

  AC-EXP-01-17   An expense with no request                                                                                               The creator voids it                                                                                                          The status is Voided, the expense stays in the log, it is not counted in the total, MSGT-04 shows, and no delete option is offered    FR-EXP-01-16

  AC-EXP-01-18   A Shared expense with 2 versions and a Private expense with 2 versions that Parent A created                             Parent B opens the history of each                                                                                            Parent B sees both versions of the Shared expense and nothing of the Private expense                                                  FR-EXP-01-17

  AC-EXP-01-19   Three expenses dated 2027-01-05, 2027-01-10 and 2027-01-08                                                               A parent opens the log                                                                                                        They show in the order 2027-01-10, 2027-01-08, 2027-01-05, each with its description, category, date, amount, status and visibility   FR-EXP-01-18

  AC-EXP-01-20   An expense with versions                                                                                                 Records and Court asks for the expenses, and a member of support staff tries to open the expenses                             The expenses and versions are available to Records and Court, and the staff member cannot open them                                   FR-EXP-01-19

  AC-EXP-01-21   An expense saved at 2027-01-15 18:00 UTC                                                                                 A user in US Eastern time views it                                                                                            The time shows as 13:00 on January 15, 2027                                                                                           FR-EXP-01-20

  AC-EXP-01-22   An expense                                                                                                               It is added, edited, voided or shared                                                                                         One audit log entry exists for each action, with the actor, the time in UTC and the result                                            FR-EXP-01-21

  AC-EXP-01-23   A parent and a save error                                                                                                They save an expense                                                                                                          The expense is not created and ERR-05 shows                                                                                           FR-EXP-01-22
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-02 Receipt attachment and scanning

US-EXP-02-01. As a parent, I want to attach a receipt to an expense, so that the proof is kept with the cost.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-02-01       The system shall let the creator attach files to an expense. An expense can hold up to 5 files with a total size of up to 25 MB.

  FR-EXP-02-02       The system shall accept JPG, PNG and PDF files and shall refuse other types with ERR-08.

  FR-EXP-02-03       The system shall scan every file for malware before it is saved. A file that fails the scan is not attached, and the system shall show ERR-10.

  FR-EXP-02-04       In a phone browser, the system shall let a parent take a photo of a receipt with the camera of the device and attach it. If the camera is not allowed, the system shall let the parent choose a file instead.

  FR-EXP-02-05       If an attachment would make the expense hold more than 5 files or more than 25 MB, the system shall not attach it and shall show ERR-09.

  FR-EXP-02-06       The system shall count the files toward the storage limit: 2 GB for each household. If a household is over the limit, the system shall block new files and show ERR-11. Parents can still view and export the existing files.

  FR-EXP-02-07       The system shall let the creator add files to an expense at any time, also when the expense has a reimbursement request. Adding a file saves a new version of the expense (FR-EXP-01-14).

  FR-EXP-02-08       The system shall not let anyone remove a file from an expense once it is attached.

  FR-EXP-02-09       The system shall show each file with its name, type, size and the time it was added, and shall let the user open it.

  FR-EXP-02-10       The system shall show the files of an expense only to the people who can see the expense.

  FR-EXP-02-11       The system shall include the files in the exports that Records and Court makes.

  FR-EXP-02-12       The system shall write an audit log entry for every file attached.

  FR-EXP-02-13       If a file cannot be saved, the system shall show ERR-05 and shall not attach it.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                   **When**                                                                           **Then**                                                                                                    **Covers**
  -------------- ------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------- ----------------------------
  AC-EXP-02-01   An expense with no files                                                                    The creator attaches 5 files of 4 MB each                                          All 5 files are attached                                                                                    FR-EXP-02-01

  AC-EXP-02-02   An expense with 5 files, and an expense with 1 file of 26 MB                                The creator attaches a sixth file to the first, and the 26 MB file to the second   Neither is attached and ERR-09 shows each time                                                              FR-EXP-02-01, FR-EXP-02-05

  AC-EXP-02-03   An expense                                                                                  The creator attaches a JPG, a PNG, a PDF and a DOCX file                           The JPG, PNG and PDF are attached, and the DOCX is refused and ERR-08 shows                                 FR-EXP-02-02

  AC-EXP-02-04   A file that fails the malware scan                                                          The creator attaches it                                                            The file is not attached and ERR-10 shows                                                                   FR-EXP-02-03

  AC-EXP-02-05   A parent in a phone browser                                                                 They choose to take a photo, and later the camera is not allowed                   The photo is attached as an image the first time, and the second time the parent is offered a file choice   FR-EXP-02-04

  AC-EXP-02-06   A household that is over the storage limit                                                  The creator attaches a file                                                        The file is blocked and ERR-11 shows, and the existing files can still be viewed and exported               FR-EXP-02-06

  AC-EXP-02-07   An expense with a request that is Pending                                                   The creator adds a file                                                            The file is attached, a new version of the expense is saved, and the amount is unchanged                    FR-EXP-02-07

  AC-EXP-02-08   An expense with an attached file                                                            A parent looks for a way to remove the file                                        No removal option is offered                                                                                FR-EXP-02-08

  AC-EXP-02-09   An expense with a file                                                                      A parent opens the expense                                                         The file shows with its name, type, size and the time it was added, and it opens                            FR-EXP-02-09

  AC-EXP-02-10   A Private expense with a file, and a Shared expense with a file, both created by Parent A   Parent B opens the expense log                                                     Parent B sees the file of the Shared expense and no file of the Private expense                             FR-EXP-02-10

  AC-EXP-02-11   An expense with a file                                                                      Records and Court asks for the expenses                                            The file is included                                                                                        FR-EXP-02-11

  AC-EXP-02-12   A file that is attached                                                                     The attachment is saved                                                            One audit log entry exists with the actor, the time in UTC and the result                                   FR-EXP-02-12

  AC-EXP-02-13   A save error                                                                                The creator attaches a file                                                        The file is not attached and ERR-05 shows                                                                   FR-EXP-02-13
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-03 Reimbursement requests with deadlines and required proof

US-EXP-03-01. As a parent who paid for something, I want to ask my co-parent to pay back a share, with a pay-by date and the proof needed, so that it is clear what is asked and by when.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Requirement**
  --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-03-01    The system shall let a parent in a linked household send a reimbursement request for a Shared expense that the parent created. The request has an amount requested, a pay-by date, the proof needed (Receipt, Invoice, Other or None needed) and an optional note of up to 500 characters.

  FR-EXP-03-02    The system shall let only the creator of the expense send a request for it. If another user tries, the system shall refuse and show ERR-06.

  FR-EXP-03-03    The system shall require an amount requested that is greater than 0 and not more than the amount of the expense. It shall show ERR-01 for an amount that is not valid and ERR-13 for an amount above the expense amount.

  FR-EXP-03-04    The system shall require a pay-by date that is today or later. It shall show ERR-03 if the date is missing and ERR-12 if the date is in the past.

  FR-EXP-03-05    If the proof needed is Receipt, Invoice or Other, the system shall not send the request unless the expense has at least one file attached. It shall show ERR-20.

  FR-EXP-03-06    The system shall not send a request for a Private expense and shall show ERR-16. In Solo Mode the system shall not offer requests and shall show ERR-17 if a parent tries.

  FR-EXP-03-07    The system shall allow one open request for each expense. A request is open while its status is Pending, Accepted or Part paid. If a parent tries to send a second one, the system shall refuse and show ERR-14.

  FR-EXP-03-08    The system shall show both parents, on the request, the expense details (description, category, expense date, amount and children), the amount requested, the pay-by date, the proof needed and the files.

  FR-EXP-03-09    The system shall send these alerts through the Notifications module: to the co-parent when a request is sent (MSGT-07) or withdrawn (MSGT-11), to the requester when a request is accepted (MSGT-09) or declined (MSGT-10), and to the parent who must pay when the requester records a payment received (MSGT-13).

  FR-EXP-03-10    For a user in Safety Mode, the system shall send every alert about a request with no names and no details.

  FR-EXP-03-11    The system shall let only the co-parent of the requester answer a request. If the requester tries to answer, the system shall refuse and show ERR-21.

  FR-EXP-03-12    The system shall let the co-parent accept or decline a Pending request. An accept needs a confirm step (MSGT-08). A decline can include a reason of up to 500 characters. The system shall show ERR-18 for a longer reason.

  FR-EXP-03-13    The system shall show the status of a request as Pending, Accepted, Part paid, Declined, Withdrawn or Paid.

  FR-EXP-03-14    The system shall let the requester withdraw a request that is Pending. After any answer or a withdrawal, the system shall not let anyone change the terms of the request. Recording payments received is allowed under FR-EXP-03-15. If a parent tries to answer or withdraw it, the system shall show ERR-15.

  FR-EXP-03-15    The system shall let only the requester record a payment received on an Accepted or Part paid request, with the amount received, the date it was received and an optional note of up to 500 characters. The amount received shall be more than 0 and not more than the amount still unpaid. The status becomes Paid when the amounts received add up to the amount requested, and Part paid before that. A request can have more than one payment recorded.

  FR-EXP-03-16    If a parent other than the requester tries to record a payment on a request, the system shall refuse and show ERR-22. If the request is not Accepted or Part paid, the system shall refuse and show ERR-23. If the date is in the future, the system shall show ERR-02. If the amount is 0 or less, or is more than the amount still unpaid, the system shall show ERR-19.

  FR-EXP-03-17    When the pay-by date has passed and the status is Pending, Accepted or Part paid, the system shall show the flag Overdue (MSGT-12) to both parents. The status does not change.

  FR-EXP-03-18    The system should give the pay-by date to the Notifications module, so that the parent who is asked to pay gets a reminder 1 day before the pay-by date while the request is Pending, Accepted or Part paid (MSGT-14).

  FR-EXP-03-19    The system shall never delete a request. It shall save every status change with who made it, when, and from which device.

  FR-EXP-03-20    The system shall make requests and their history available to Records and Court.

  FR-EXP-03-21    The system shall write an audit log entry for every request, answer, withdrawal and mark as paid, with actor, time and result.

  FR-EXP-03-22    If a request, an answer or a mark as paid cannot be saved, the system shall show ERR-05 and shall not change the request.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                                    **When**                                                                                                                                                                                                              **Then**                                                                                                                           **Covers**
  -------------- ------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------
  AC-EXP-03-01   A Shared expense of 120.00 with a file, created by Parent A in a linked household, and today is 2027-01-15   Parent A sends a request with the amount 60.00, the pay-by date 2027-02-01 and the proof needed Receipt                                                                                                               The request is saved as Pending, MSGT-06 shows to Parent A, and Parent B is alerted (MSGT-07)                                      FR-EXP-03-01, FR-EXP-03-09, FR-EXP-03-13

  AC-EXP-03-02   A Shared expense that Parent A created                                                                       Parent B tries to send a request for it                                                                                                                                                                               The request is refused and ERR-06 shows                                                                                            FR-EXP-03-02

  AC-EXP-03-03   A Shared expense of 120.00                                                                                   A parent enters the amount requested 0, then 120.01, then 120.00                                                                                                                                                      The first is refused with ERR-01, the second is refused with ERR-13, and the third is accepted                                     FR-EXP-03-03

  AC-EXP-03-04   Today is 2027-01-15                                                                                          A parent sends a request with no pay-by date, then with the date 2027-01-14, then with the date 2027-01-15                                                                                                            The first is refused with ERR-03, the second is refused with ERR-12, and the third is sent                                         FR-EXP-03-04

  AC-EXP-03-05   An expense with no files                                                                                     A parent sends a request with the proof needed Receipt, and later one with None needed                                                                                                                                The first is not sent and ERR-20 shows, and the second is sent                                                                     FR-EXP-03-05

  AC-EXP-03-06   A Private expense, and a household in Solo Mode                                                              A parent tries to send a request in each                                                                                                                                                                              No request is sent. ERR-16 shows for the Private expense and ERR-17 shows in Solo Mode.                                            FR-EXP-03-06

  AC-EXP-03-07   An expense with a request that is Pending                                                                    A parent tries to send a second request for the expense                                                                                                                                                               The request is refused and ERR-14 shows                                                                                            FR-EXP-03-07

  AC-EXP-03-08   An expense with a request that is Declined, and an expense with a request that is Withdrawn                  A parent sends a new request for each                                                                                                                                                                                 Both new requests are sent                                                                                                         FR-EXP-03-07

  AC-EXP-03-09   A request                                                                                                    Either parent opens it                                                                                                                                                                                                The expense details, the amount requested, the pay-by date, the proof needed and the files show to both parents                    FR-EXP-03-08

  AC-EXP-03-10   A request that is sent, withdrawn, accepted, declined or marked as paid                                      Each event happens                                                                                                                                                                                                    The alerts in FR-EXP-03-09 go to the right parent through the Notifications module                                                 FR-EXP-03-09

  AC-EXP-03-11   A user in Safety Mode                                                                                        An alert about a request is sent to them                                                                                                                                                                              The alert has no names and no details                                                                                              FR-EXP-03-10

  AC-EXP-03-12   A Pending request that Parent A sent                                                                         Parent A tries to accept it                                                                                                                                                                                           The answer is refused and ERR-21 shows                                                                                             FR-EXP-03-11

  AC-EXP-03-13   A Pending request                                                                                            Parent B chooses Accept                                                                                                                                                                                               The system shows MSGT-08 and asks to confirm, nothing is accepted before the confirm step, and after it the status is Accepted     FR-EXP-03-12

  AC-EXP-03-14   A Pending request                                                                                            Parent B declines it with a reason of 500 characters, and on another request with a reason of 501 characters                                                                                                          The first is Declined with the reason saved, and the second is refused and ERR-18 shows                                            FR-EXP-03-12

  AC-EXP-03-15   A request of 60.00 that is accepted and then paid in two parts                                               A parent opens the request at each step                                                                                                                                                                               The status shows Pending, then Accepted, then Part paid after a payment of 20.00, then Paid after a second payment of 40.00        FR-EXP-03-13

  AC-EXP-03-16   A Pending request                                                                                            Parent A withdraws it                                                                                                                                                                                                 The status is Withdrawn and Parent B is told (MSGT-11)                                                                             FR-EXP-03-14

  AC-EXP-03-17   A request that is Accepted, Declined or Withdrawn                                                            A parent tries to withdraw it or to answer it                                                                                                                                                                         No withdraw option is offered for an Accepted request, and an answer to a Declined or Withdrawn request is refused with ERR-15     FR-EXP-03-14

  AC-EXP-03-18   An Accepted request for 60.00                                                                                Parent A records a payment received with the date 2027-01-20 and the amount 60.00                                                                                                                                     The status is Paid and Parent B is told (MSGT-13)                                                                                  FR-EXP-03-15

  AC-EXP-03-19   A Pending request, an Accepted request, and a request for 60.00                                              Parent B tries to record a payment on the Accepted request. Parent A records a payment on the Pending request. Parent A records a payment of 70.00 on the Accepted request, and later a payment with a future date.   Each is refused: ERR-22 for Parent B, ERR-23 for the Pending request, ERR-19 for the amount 70.00 and ERR-02 for the future date   FR-EXP-03-16

  AC-EXP-03-20   An Accepted request with the pay-by date 2027-02-01                                                          The date 2027-02-01 has passed                                                                                                                                                                                        Both parents see the flag Overdue (MSGT-12) and the status is still Accepted                                                       FR-EXP-03-17

  AC-EXP-03-21   A Paid request with a pay-by date in the past                                                                A parent opens it                                                                                                                                                                                                     The flag Overdue does not show                                                                                                     FR-EXP-03-17

  AC-EXP-03-22   An Accepted request with the pay-by date 2027-02-01                                                          It is 2027-01-31                                                                                                                                                                                                      The parent who must pay gets the reminder (MSGT-14), and no reminder is sent after the request is Paid                             FR-EXP-03-18

  AC-EXP-03-23   Requests with different statuses                                                                             A parent opens the request history                                                                                                                                                                                    All requests show with their status and none is deleted, and each status change shows who made it, when, and from which device     FR-EXP-03-19

  AC-EXP-03-24   A request with history                                                                                       Records and Court asks for the requests                                                                                                                                                                               The requests and their history are available                                                                                       FR-EXP-03-20

  AC-EXP-03-25   A request, an answer, a withdrawal or a mark as paid                                                         It is saved                                                                                                                                                                                                           One audit log entry exists with the actor, the time in UTC and the result                                                          FR-EXP-03-21

  AC-EXP-03-26   A save error                                                                                                 A parent sends a request, answers one or marks one as paid                                                                                                                                                            The request does not change and ERR-05 shows                                                                                       FR-EXP-03-22
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-04 Running balance of who owes what

US-EXP-04-01. As a parent, I want to see who owes what, so that we both see the same figures.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-04-01        The system should show each parent a running balance with three figures: the total the co-parent owes this parent, the total this parent owes the co-parent, and the net amount with the name of the parent who owes it.

  FR-EXP-04-02        The system should count the amount still unpaid on requests with the status Accepted or Part paid. Requests that are Pending, Declined, Withdrawn or Paid are not counted.

  FR-EXP-04-03        The system should show the list of requests behind the balance and let the user open each one.

  FR-EXP-04-04        The system should leave out of the totals a request on an expense that has an open dispute (EXP-09). It should show the amount of these requests on a separate line called In dispute.

  FR-EXP-04-05        The system should never include child support payments (EXP-07) or agency values in the balance.

  FR-EXP-04-06        The system should show the note MSGT-25 on the balance screen.

  FR-EXP-04-07        The system should calculate the balance from the requests each time it is shown, so that both parents see the same figures.

  FR-EXP-04-08        The system should not offer the balance in Solo Mode, because the balance needs the entries of both parents.

  FR-EXP-04-09        The system should show the balance to a professional only when a parent shares it.

  FR-EXP-04-10        The system should make the balance available to Records and Court.

  FR-EXP-04-11        If the balance cannot be calculated, the system should show ERR-29.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                                                                            **When**                                                             **Then**                                                                                                           **Covers**
  -------------- ---------------------------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------ --------------
  AC-EXP-04-01   A linked household where Parent B owes Parent A two Accepted requests of 60.00 and 40.00, and Parent A owes Parent B one Accepted request of 30.00   Parent A opens the balance                                           The balance shows 100.00 owed by the co-parent, 30.00 owed to the co-parent, and a net of 70.00 owed by Parent B   FR-EXP-04-01

  AC-EXP-04-02   Requests that are Pending, Declined, Withdrawn and Paid, each for 25.00                                                                              A parent opens the balance                                           None of the four is counted                                                                                        FR-EXP-04-02

  AC-EXP-04-03   A balance with 3 Accepted requests                                                                                                                   A parent opens the list behind the balance and selects one request   The 3 requests show and the selected request opens                                                                 FR-EXP-04-03

  AC-EXP-04-04   An Accepted request of 60.00 on an expense with an open dispute                                                                                      A parent opens the balance                                           The 60.00 is not in the totals and shows on the line In dispute                                                    FR-EXP-04-04

  AC-EXP-04-05   A parent who records a child support payment of 500.00                                                                                               The parent opens the balance                                         The balance is unchanged                                                                                           FR-EXP-04-05

  AC-EXP-04-06   A parent                                                                                                                                             They open the balance screen                                         MSGT-25 shows                                                                                                      FR-EXP-04-06

  AC-EXP-04-07   An Accepted request of 60.00 on which the requester records a payment of 20.00                                                                       Both parents open the balance                                        Both see the same figures, and only the 40.00 still unpaid is counted                                              FR-EXP-04-07

  AC-EXP-04-08   A household in Solo Mode                                                                                                                             The parent opens the expense menu                                    The balance is not offered                                                                                         FR-EXP-04-08

  AC-EXP-04-09   A balance that a parent has not shared                                                                                                               A professional opens the household                                   The balance does not show. It shows after the parent shares it.                                                    FR-EXP-04-09

  AC-EXP-04-10   A balance                                                                                                                                            Records and Court asks for it                                        The balance is available                                                                                           FR-EXP-04-10

  AC-EXP-04-11   A calculation error                                                                                                                                  A parent opens the balance                                           ERR-29 shows                                                                                                       FR-EXP-04-11
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-05 Split rules from the court order (Unique)

US-EXP-05-01. As a parent, I want to enter the split rules from our court order once, so that every shared expense shows each parent\'s share.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-05-01     The system should let a parent enter a split rule taken from the court order. A rule has a category (one category or All categories), a way to split (Percentage or Fixed amount), the shares, an optional cap and a start date.

  FR-EXP-05-02     For Percentage, the system should take the share of each parent in percent, with up to 2 decimal places. The two shares must add up to 100. If they do not, the system should show ERR-25.

  FR-EXP-05-03     For Fixed amount, the system should take the name of one parent and an amount in US dollars, using the amount rules in FR-EXP-01-03. That parent\'s share of each expense is this amount and is never more than the expense amount. The other parent\'s share is the rest.

  FR-EXP-05-04     The system should treat the cap as the highest amount that the parent who did not pay can owe for one expense. The system should use the cap only when the parent enters one. This reading of the cap is open.

  FR-EXP-05-05     The system should apply a rule only to expenses with an expense date on or after its start date. Earlier expenses do not change.

  FR-EXP-05-06     When more than one rule could apply to an expense, the system should use the rule for the category of the expense before the rule for All categories. Among rules for the same category, it should use the rule with the latest start date on or before the expense date.

  FR-EXP-05-07     The system should show on every Shared expense the share that the parent who did not pay owes, taken from the Active rule that applies. It should round the share to the cent, with halves rounded up, and the share of the parent who paid is the rest. The expense amount does not change. If no Active rule applies, no share shows.

  FR-EXP-05-08     When a parent starts a reimbursement request (EXP-03), the system should fill the amount requested with the share in FR-EXP-05-07. The parent can change it, up to the expense amount (ERR-13).

  FR-EXP-05-09     In a linked household, the system should save a new rule as Proposed. It should show the rule to the co-parent, who can confirm or decline it. A rule is Active only after the co-parent confirms it. A Proposed or Declined rule never applies. If the co-parent tries to answer a rule that was already answered, the system should refuse and show ERR-30.

  FR-EXP-05-10     The system should alert the co-parent through the Notifications module when a rule is proposed (MSGT-18), and alert the parent who proposed it when the rule is confirmed (MSGT-32) or declined (MSGT-33).

  FR-EXP-05-11     In Solo Mode, the system should save a rule as Active at once and show MSGT-21.

  FR-EXP-05-12     The system should allow one rule for each category and start date. If a parent enters a second one, the system should refuse and show ERR-26.

  FR-EXP-05-13     The system should not let anyone edit or delete a rule. A change is a new rule with its own start date. The system should show the rules and their history to both parents.

  FR-EXP-05-14     The system should show MSGT-19 on the rule screen: ParentPath does not check the rule against the court order.

  FR-EXP-05-15     The system should show the share on a Private expense only to the parent who created it.

  FR-EXP-05-16     The system should write an audit log entry for every rule proposed, confirmed or declined, with actor, time and result.

  FR-EXP-05-17     The system should make the rules and their history available to Records and Court.

  FR-EXP-05-18     If a rule cannot be saved, the system should show ERR-05 and should not create it.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                                              **When**                                                                                                                 **Then**                                                                                                                        **Covers**
  -------------- ---------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------
  AC-EXP-05-01   A parent in a linked household                                                                                         They enter a rule with the category Medical, Percentage, Parent A 70, Parent B 30 and the start date 2027-01-01          The rule is saved as Proposed                                                                                                   FR-EXP-05-01, FR-EXP-05-02, FR-EXP-05-09

  AC-EXP-05-02   A parent entering a Percentage rule                                                                                    They enter 70 and 20                                                                                                     The rule is not saved and ERR-25 shows                                                                                          FR-EXP-05-02

  AC-EXP-05-03   An Active Fixed amount rule where Parent B pays 200.00 for each expense                                                Expenses of 500.00 and 150.00, paid by Parent A, show their shares                                                       The share of Parent B is 200.00 on the first and 150.00 on the second, and the share of Parent A is 300.00 and 0.00             FR-EXP-05-03, FR-EXP-05-07

  AC-EXP-05-04   An Active Percentage rule Medical 70/30 with a cap of 100.00, and a Medical expense of 1,000.00 paid by Parent A       The share is shown                                                                                                       The share that Parent B owes is 100.00 and not 300.00                                                                           FR-EXP-05-04

  AC-EXP-05-05   An Active rule with the start date 2027-03-01                                                                          Expenses dated 2027-02-28 and 2027-03-01 are shown                                                                       The first has no share and the second has a share                                                                               FR-EXP-05-05

  AC-EXP-05-06   Active rules: Medical 70/30 from 2027-01-01, All categories 50/50 from 2027-01-01, and Medical 60/40 from 2027-06-01   A Medical expense dated 2027-05-01, a Medical expense dated 2027-07-01 and a School expense dated 2027-05-01 are shown   The first uses 70/30, the second uses 60/40, and the third uses 50/50                                                           FR-EXP-05-06

  AC-EXP-05-07   An Active rule where the parent who did not pay owes 30 percent, and a Shared expense of 10.05                         The share is shown                                                                                                       The share that is owed is 3.02, the share of the parent who paid is 7.03, and the expense amount is still 10.05                 FR-EXP-05-07

  AC-EXP-05-08   An Active Medical rule where Parent B owes 30 percent, and a Medical expense of 100.00 created by Parent A             Parent A starts a reimbursement request                                                                                  The amount requested is filled with 30.00. Parent A can change it to 25.00. An amount of 100.01 is refused and ERR-13 shows.    FR-EXP-05-08

  AC-EXP-05-09   A linked household where Parent A saves a rule                                                                         The rule is saved                                                                                                        The rule is Proposed, MSGT-20 shows, Parent B is alerted (MSGT-18), and no share is calculated from the rule                    FR-EXP-05-09, FR-EXP-05-10

  AC-EXP-05-10   A Proposed rule                                                                                                        Parent B confirms it, and on another rule declines it                                                                    The first is Active and Parent A is told (MSGT-32). The second is Declined, Parent A is told (MSGT-33), and it never applies.   FR-EXP-05-09, FR-EXP-05-10

  AC-EXP-05-11   A rule that Parent B already answered                                                                                  Parent B tries to answer it again                                                                                        The answer is refused and ERR-30 shows                                                                                          FR-EXP-05-09

  AC-EXP-05-12   A household in Solo Mode                                                                                               The parent saves a rule                                                                                                  The rule is Active at once, MSGT-21 shows, and the share shows on expenses                                                      FR-EXP-05-11

  AC-EXP-05-13   A rule for Medical with the start date 2027-01-01                                                                      A parent enters another rule for Medical with the start date 2027-01-01                                                  The rule is not saved and ERR-26 shows                                                                                          FR-EXP-05-12

  AC-EXP-05-14   A saved rule                                                                                                           A parent looks for a way to edit or delete it, and then adds a rule with a later start date                              No edit or delete option is offered, the new rule is saved, and both parents see both rules                                     FR-EXP-05-13

  AC-EXP-05-15   A parent                                                                                                               They open the rule screen                                                                                                MSGT-19 shows                                                                                                                   FR-EXP-05-14

  AC-EXP-05-16   A Private expense that Parent A created, with an Active rule                                                           Parent B opens the expense log                                                                                           Parent B sees no share for that expense                                                                                         FR-EXP-05-15

  AC-EXP-05-17   A rule that is proposed, confirmed or declined                                                                         The action is saved                                                                                                      One audit log entry exists with the actor, the time in UTC and the result                                                       FR-EXP-05-16

  AC-EXP-05-18   Rules with history                                                                                                     Records and Court asks for the rules                                                                                     The rules and their history are available                                                                                       FR-EXP-05-17

  AC-EXP-05-19   A save error                                                                                                           A parent saves a rule                                                                                                    The rule is not created and ERR-05 shows                                                                                        FR-EXP-05-18
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-06 Expense categories and per-child tracking

US-EXP-06-01. As a parent, I want to sort expenses by category and by child, so that I can see where the money goes for each child.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-06-01      The system shall require one category for each expense from this list: Medical, Dental, School, Childcare, Activities, Clothing, Pet and Other. It shall show ERR-03 if no category is chosen.

  FR-EXP-06-02      The system shall not let a parent add a category of their own.

  FR-EXP-06-03      The system shall let a parent choose no child, one child or more than one child for an expense. The amount stays one amount for all chosen children. The system shall not divide it between children.

  FR-EXP-06-04      The system shall offer the children saved in the household. If no child is saved, the system shall still let the parent save the expense with no child.

  FR-EXP-06-05      The system shall let a parent filter the expense log by category, by child, by a date range and by the parent who paid. The log shows only the expenses the user is allowed to see.

  FR-EXP-06-06      The system shall show the total amount of the Active expenses in the filtered list. Voided expenses are not counted.

  FR-EXP-06-07      The system shall save a change to the category or the children as a new version of the expense (FR-EXP-01-14).

  FR-EXP-06-08      The system shall accept an expense with the category Pet that Calendar and Parenting Time creates (CAL-11). The Expenses module owns the expense.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                               **When**                                                                                                **Then**                                                                                                                      **Covers**
  -------------- --------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------- --------------
  AC-EXP-06-01   A parent adding an expense                                                              They open the category list, and then save with no category                                             The list shows Medical, Dental, School, Childcare, Activities, Clothing, Pet and Other, and the save is refused with ERR-03   FR-EXP-06-01

  AC-EXP-06-02   A parent adding an expense                                                              They look for a way to add a category                                                                   No such option is offered                                                                                                     FR-EXP-06-02

  AC-EXP-06-03   A household with two children, Ava and Ben                                              A parent saves an expense of 80.00 with both children chosen, and another with no child                 Both expenses are saved. The first shows both children and the amount 80.00, not divided.                                     FR-EXP-06-03

  AC-EXP-06-04   A household with no child saved                                                         A parent saves an expense                                                                               The expense is saved with no child                                                                                            FR-EXP-06-04

  AC-EXP-06-05   An expense log with expenses of different categories, children, dates and payers        A parent filters by category Medical, then by child Ava, then by a date range, then by payer Parent B   Each filter shows only the matching expenses that the user is allowed to see                                                  FR-EXP-06-05

  AC-EXP-06-06   A filtered list with Active expenses of 40.00 and 60.00 and a Voided expense of 25.00   A parent views the list                                                                                 The total shows 100.00                                                                                                        FR-EXP-06-06

  AC-EXP-06-07   An expense                                                                              The creator changes the category from Other to Medical                                                  A new version is saved and the history shows both versions                                                                    FR-EXP-06-07

  AC-EXP-06-08   A pet expense that Calendar and Parenting Time creates                                  The expense is saved                                                                                    It shows in the expense log with the category Pet                                                                             FR-EXP-06-08
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-07 Record child support payments

US-EXP-07-01. As a parent who pays child support, I want to record each payment I make, so that my record can be compared with the agency record.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-07-01     The system shall let a parent record a child support payment with an amount, the date paid, how it was paid (State agency payment page, Directly to the other parent or Other) and an optional note of up to 500 characters.

  FR-EXP-07-02     The system shall apply the amount rules in FR-EXP-01-03 (ERR-01), refuse a date in the future (ERR-02), require the amount, the date and how it was paid (ERR-03), and refuse a note over 500 characters (ERR-18).

  FR-EXP-07-03     The system shall save a recorded payment as Private.

  FR-EXP-07-04     The system shall let the parent who recorded a payment share it with the co-parent after a confirm step (MSGT-02). The system shall not let a shared payment become Private again. The co-parent cannot change a shared payment.

  FR-EXP-07-05     The system shall show a recorded payment only to the parent who recorded it, unless that parent shares it. A professional can read it only when the parent shares it. Support staff and operations staff cannot read it.

  FR-EXP-07-06     The system shall save a new payment with the status Recorded by you and show the status on every payment. The statuses Matched with agency, Not on agency record, Sent to agency and Credited by agency are set only by the Child Support Sync module (CSS-03, CSS-06).

  FR-EXP-07-07     The system shall show the plain line MSGT-15 with every payment: this is your own record, and the agency decides what counts.

  FR-EXP-07-08     The system shall never change the order amount, the arrears or any other agency value.

  FR-EXP-07-09     The system shall let only the parent who recorded a payment edit it. Each edit shall save a new version with the original details, who made the change, when, and from which device. If another user tries, the system shall show ERR-06. If the status is Matched with agency, Sent to agency or Credited by agency, the system shall refuse the edit and show ERR-24.

  FR-EXP-07-10     The system shall let the parent void a payment instead of deleting it, under the same status rule as an edit (ERR-24). A voided payment stays in the list as Voided, is never deleted, and is not given to Child Support Sync for comparison.

  FR-EXP-07-11     The system shall show the version history of a payment to the parent who recorded it, and to the co-parent when the payment is shared. The system shall never overwrite or delete a version.

  FR-EXP-07-12     The system should let the parent attach proof files to a payment under the same rules as FR-EXP-02-01, FR-EXP-02-02, FR-EXP-02-03, FR-EXP-02-05, FR-EXP-02-06 and FR-EXP-02-08.

  FR-EXP-07-13     When a parent chooses State agency payment page, and the household has a linked case in a state whose payment page ParentPath has set, the system should show MSGT-16 with a link to that page. If there is no linked case or no page is set, the system should show no link.

  FR-EXP-07-14     The system shall list the recorded payments with the newest date paid first, each with its amount, date, how it was paid, status and visibility.

  FR-EXP-07-15     In Solo Mode, the system shall let the parent record payments in the same way.

  FR-EXP-07-16     When the parent has a linked case, the system shall give Child Support Sync the Active payments with their amount, date and how they were paid, and shall take the status back from it.

  FR-EXP-07-17     The system shall include a recorded payment in an export only when the parent selects it.

  FR-EXP-07-18     The system shall write an audit log entry for every payment recorded, edited, voided or shared, with actor, time and result.

  FR-EXP-07-19     If a payment cannot be saved, the system shall show ERR-05 and shall not create or change it.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                  **When**                                                                                                                    **Then**                                                                                                                      **Covers**
  -------------- ------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------- ------------------------------------------
  AC-EXP-07-01   A signed-in parent, and today is 2027-01-15                                                They record a payment of 500.00 dated 2027-01-10, paid Directly to the other parent, with a note                            The payment is saved with the status Recorded by you, it is Private, and MSGT-17 shows                                        FR-EXP-07-01, FR-EXP-07-03, FR-EXP-07-06

  AC-EXP-07-02   A parent recording a payment                                                               They enter the amount 0, then a date of 2027-01-16, then leave how it was paid empty, then enter a note of 501 characters   Each save is refused: ERR-01, ERR-02, ERR-03 and ERR-18                                                                       FR-EXP-07-02

  AC-EXP-07-03   A payment that Parent A recorded                                                           Parent B opens the household                                                                                                Parent B does not see the payment                                                                                             FR-EXP-07-03, FR-EXP-07-05

  AC-EXP-07-04   A Private payment                                                                          Parent A chooses Share, sees the confirm step and confirms                                                                  Parent B sees the payment and cannot change it. Parent A cannot make it Private again.                                        FR-EXP-07-04

  AC-EXP-07-05   A payment that is not shared                                                               A professional opens the household, and a member of support staff tries to open the payment                                 The professional does not see it, and the staff member cannot open it. The professional sees it after the parent shares it.   FR-EXP-07-05

  AC-EXP-07-06   A payment with the status Recorded by you, and a linked case                               Child Support Sync sets the status Matched with agency                                                                      The payment shows the status Matched with agency                                                                              FR-EXP-07-06, FR-EXP-07-16

  AC-EXP-07-07   A payment                                                                                  A parent opens it                                                                                                           MSGT-15 shows with it                                                                                                         FR-EXP-07-07

  AC-EXP-07-08   A payment and the agency values next to it                                                 A parent looks for a way to change the order amount or the arrears                                                          No such option is offered                                                                                                     FR-EXP-07-08

  AC-EXP-07-09   Payments with the statuses Recorded by you, Not on agency record and Matched with agency   The parent who recorded them edits each, and Parent B tries to edit one                                                     The first two are saved as new versions. The third is refused and ERR-24 shows. Parent B is refused and ERR-06 shows.         FR-EXP-07-09

  AC-EXP-07-10   A payment with the status Recorded by you                                                  The parent voids it                                                                                                         The payment shows as Voided, stays in the list, is not given to Child Support Sync, and no delete option is offered           FR-EXP-07-10

  AC-EXP-07-11   A payment with 2 versions that is shared                                                   Both parents open the history                                                                                               Both see both versions. Before sharing, only the parent who recorded it sees them.                                            FR-EXP-07-11

  AC-EXP-07-12   A payment                                                                                  The parent attaches a JPG, and then a sixth file                                                                            The JPG is attached and the sixth file is refused with ERR-09                                                                 FR-EXP-07-12

  AC-EXP-07-13   A parent with a linked case in a state whose payment page is set                           They choose State agency payment page                                                                                       MSGT-16 shows with the link. With no linked case, no link shows.                                                              FR-EXP-07-13

  AC-EXP-07-14   Payments dated 2027-01-05 and 2027-01-10                                                   A parent opens the list                                                                                                     The payment dated 2027-01-10 shows first, each with its amount, date, how it was paid, status and visibility                  FR-EXP-07-14

  AC-EXP-07-15   A household in Solo Mode                                                                   The parent records a payment                                                                                                The payment is saved in the same way                                                                                          FR-EXP-07-15

  AC-EXP-07-16   A parent with a linked case and an Active payment                                          Child Support Sync asks for the payments                                                                                    The Active payment is given with its amount, date and how it was paid                                                         FR-EXP-07-16

  AC-EXP-07-17   A recorded payment                                                                         A parent exports records without selecting it, and then with it selected                                                    The first export has no payment and the second has it                                                                         FR-EXP-07-17

  AC-EXP-07-18   A payment                                                                                  It is recorded, edited, voided or shared                                                                                    One audit log entry exists for each action, with the actor, the time in UTC and the result                                    FR-EXP-07-18

  AC-EXP-07-19   A save error                                                                               A parent records a payment                                                                                                  The payment is not created and ERR-05 shows                                                                                   FR-EXP-07-19
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-08 In-app money transfer with payment status from start to end

US-EXP-08-01. As a parent, I want to pay what I owe inside the app and see where my payment is, so that I do not wait and wonder.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-08-01      The system should offer in-app money transfer only after a licensed payments partner is chosen and the legal review of the payment terms is recorded as done.

  FR-EXP-08-02      The system should never hold funds. Money moves through the partner.

  FR-EXP-08-03      The system should let the parent who must pay an Accepted or Part paid reimbursement request pay it through the partner. The amount is the amount still unpaid, or a smaller amount that the payer chooses. The system should also let a parent send a payment to the co-parent that is not tied to a request, with a note of up to 500 characters.

  FR-EXP-08-04      The system should ask the payer to confirm the payment before money moves. The confirm step shows the amount, the name of the receiver and any fee.

  FR-EXP-08-05      The system should show the status of a payment from start to end as Started, Processing, Completed or Failed, with the time of each status.

  FR-EXP-08-06      The system should show the payment status to both parents.

  FR-EXP-08-07      When a payment on a request is Completed, the system should record it on the request, which becomes Part paid or Paid. The requester does not need to record it.

  FR-EXP-08-08      If a payment fails, the system should show ERR-32, take no money, and keep the request Accepted.

  FR-EXP-08-09      If the partner is not available, the system should not start the payment and should show ERR-31.

  FR-EXP-08-10      The system should give the same speed to every payment and should not set a cap on the number of payments.

  FR-EXP-08-11      The system should show any fee that the partner charges before the payer confirms. The payer pays the fee. The amount of the fee is set with the partner.

  FR-EXP-08-12      The system should not offer an in-app payment for a recorded child support payment (EXP-07). Child support that goes through the agency is paid on the state payment page.

  FR-EXP-08-13      The system should save every payment and every status change with the time, never edit or delete them, and make them available to Records and Court.

  FR-EXP-08-14      The system should write an audit log entry for every payment started and every status change, with actor, time and result.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                             **When**                                                                                                         **Then**                                                                                              **Covers**
  -------------- ------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------- ----------------------------
  AC-EXP-08-01   A release built before a partner is chosen and the legal review is recorded as done   A parent opens an Accepted request                                                                               No pay option is offered                                                                              FR-EXP-08-01

  AC-EXP-08-02   A payment through the partner                                                         The payment is made                                                                                              The money moves through the partner and the app holds no funds                                        FR-EXP-08-02

  AC-EXP-08-03   An Accepted request for 60.00                                                         The parent who must pay chooses Pay, sees the confirm step with the amount, the name and any fee, and confirms   A payment of 60.00 starts with the status Started                                                     FR-EXP-08-03, FR-EXP-08-04

  AC-EXP-08-04   A payment that is Started                                                             The partner processes and completes it                                                                           The status shows Processing, then Completed, each with its time                                       FR-EXP-08-05

  AC-EXP-08-05   A payment that is Processing                                                          Both parents open the request                                                                                    Both see the status                                                                                   FR-EXP-08-06

  AC-EXP-08-06   A payment that is Completed                                                           The status is saved                                                                                              The request is Paid without a mark from the requester                                                 FR-EXP-08-07

  AC-EXP-08-07   A payment that fails                                                                  The partner reports the failure                                                                                  The status is Failed, no money is taken, ERR-32 shows, and the request is still Accepted              FR-EXP-08-08

  AC-EXP-08-08   A partner that is not available                                                       A parent tries to pay                                                                                            No payment starts and ERR-31 shows                                                                    FR-EXP-08-09

  AC-EXP-08-09   Two households                                                                        Each makes a payment, and one makes more than 12 payments in a month                                             The speed is the same and no cap blocks any payment                                                   FR-EXP-08-10

  AC-EXP-08-10   A payment that has a fee                                                              The confirm step shows                                                                                           The fee and who pays it show before the confirm button                                                FR-EXP-08-11

  AC-EXP-08-11   A recorded child support payment                                                      A parent opens it                                                                                                No pay option is offered                                                                              FR-EXP-08-12

  AC-EXP-08-12   A payment with status changes                                                         Records and Court asks for the payments                                                                          The payments and every status change with its time are available, and none can be edited or deleted   FR-EXP-08-13

  AC-EXP-08-13   A payment started and a status change                                                 Each is saved                                                                                                    One audit log entry exists for each, with the actor, the time in UTC and the result                   FR-EXP-08-14
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-09 Expense disputes

US-EXP-09-01. As a parent, I want to say that I disagree with an expense my co-parent logged, so that the disagreement is in the record and the entry stays as it was.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-09-01      The system should let a parent dispute a Shared expense that the co-parent created, with a note of 1 to 500 characters. It should show ERR-03 if the note is empty and ERR-18 if it is longer.

  FR-EXP-09-02      The system should not let a parent dispute an expense the parent created and should show ERR-27. It should allow one open dispute for each expense and should show ERR-28 if a parent tries to open a second one.

  FR-EXP-09-03      The system should not offer a dispute on a Voided expense.

  FR-EXP-09-04      The system should keep the expense unchanged and in the record. While a dispute is open, the system should show the flag Disputed on the expense and on its requests.

  FR-EXP-09-05      The system should alert the creator of the expense through the Notifications module when a dispute is opened (MSGT-23), and show MSGT-22 to the parent who opened it. For a user in Safety Mode, the alert should carry no names and no details.

  FR-EXP-09-06      The system should let both parents add replies of up to 500 characters to an open dispute. A reply is a new entry. Nobody can edit or delete a reply.

  FR-EXP-09-07      The system should let only the parent who opened a dispute close it. When it is closed, the status is Closed and MSGT-24 shows. The system does not decide who is right.

  FR-EXP-09-08      The system should not stop the co-parent from answering a request, or the requester from marking it as paid, while a dispute is open.

  FR-EXP-09-09      The system should not offer disputes in Solo Mode.

  FR-EXP-09-10      The system should never delete a dispute or a reply. It should save who made each one and when, and make them available to Records and Court.

  FR-EXP-09-11      The system should write an audit log entry for every dispute opened, reply added and dispute closed, with actor, time and result.

  FR-EXP-09-12      If a dispute or a reply cannot be saved, the system should show ERR-05 and should not create it.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                               **When**                                                                                                                                **Then**                                                                                                                        **Covers**
  -------------- ----------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-EXP-09-01   A Shared expense that Parent A created                                  Parent B opens a dispute with a note of 500 characters, and on another expense with an empty note, and on another with 501 characters   The first dispute is saved. The second is refused with ERR-03 and the third with ERR-18.                                        FR-EXP-09-01

  AC-EXP-09-02   An expense that Parent A created, and an expense with an open dispute   Parent A tries to dispute their own expense, and Parent B tries to open a second dispute on the disputed expense                        The first is refused with ERR-27 and the second with ERR-28                                                                     FR-EXP-09-02

  AC-EXP-09-03   A Voided expense                                                        A parent opens it                                                                                                                       No dispute option is offered                                                                                                    FR-EXP-09-03

  AC-EXP-09-04   An expense with an open dispute and a request                           A parent opens the expense and the request                                                                                              The expense is unchanged, and the flag Disputed shows on both                                                                   FR-EXP-09-04

  AC-EXP-09-05   A dispute that Parent B opens                                           The dispute is saved                                                                                                                    MSGT-22 shows to Parent B, Parent A is alerted (MSGT-23), and the alert for a user in Safety Mode has no names and no details   FR-EXP-09-05

  AC-EXP-09-06   An open dispute                                                         Each parent adds a reply of 500 characters, and then looks for a way to edit or delete a reply                                          Both replies show in order, and no edit or delete option is offered                                                             FR-EXP-09-06

  AC-EXP-09-07   An open dispute that Parent B opened                                    Parent A tries to close it, and then Parent B closes it                                                                                 Parent A cannot close it. Parent B closes it, the status is Closed, and MSGT-24 shows.                                          FR-EXP-09-07

  AC-EXP-09-08   An expense with an open dispute and a Pending request                   Parent B accepts the request                                                                                                            The request is Accepted                                                                                                         FR-EXP-09-08

  AC-EXP-09-09   A household in Solo Mode                                                The parent opens an expense                                                                                                             No dispute option is offered                                                                                                    FR-EXP-09-09

  AC-EXP-09-10   A closed dispute with replies                                           Records and Court asks for the disputes                                                                                                 The dispute and its replies are available with who made each and when, and none was deleted                                     FR-EXP-09-10

  AC-EXP-09-11   A dispute opened, a reply added and a dispute closed                    Each is saved                                                                                                                           One audit log entry exists for each, with the actor, the time in UTC and the result                                             FR-EXP-09-11

  AC-EXP-09-12   A save error                                                            A parent opens a dispute or adds a reply                                                                                                Nothing is created and ERR-05 shows                                                                                             FR-EXP-09-12
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-10 Scheduled and recurring payments

US-EXP-10-01. As a parent, I want to set a payment to run on a later date, so that I pay on time without remembering.

This feature depends on EXP-08 and on the partner. A repeating payment repeats every month. Other frequencies depend on the partner.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-10-01     The system should offer scheduled payments only when EXP-08 is offered.

  FR-EXP-10-02     The system should let the parent who must pay an Accepted or Part paid request choose a later date for the payment in FR-EXP-08-03. The date must be after today. If it is not, the system should show ERR-35.

  FR-EXP-10-03     The system should ask the payer to confirm when the payment is scheduled. The confirm step shows the amount, the name of the receiver, any fee and the date. The payment then runs on that date without another confirm.

  FR-EXP-10-04     The system should list scheduled payments with the date, amount and receiver, and let the payer cancel one before its date. A cancelled payment is kept with the time of the cancel and is not deleted.

  FR-EXP-10-05     The system should alert the payer through the Notifications module 1 day before a scheduled payment runs (MSGT-35).

  FR-EXP-10-06     If a scheduled payment fails on its date, the system should treat it as in FR-EXP-08-08 and alert the payer. It should not try again by itself.

  FR-EXP-10-07     If the request is no longer Accepted or Part paid on the date, the system should not run the payment, should cancel it and should show MSGT-34 to the payer.

  FR-EXP-10-08     The system should let a parent set a payment to the co-parent to repeat every month, with a start date and an optional end date, and stop it at any time (MSGT-31). The amount is set when the payment is set up. Each run is a payment with its own status as in EXP-08. Other frequencies depend on the partner.

  FR-EXP-10-09     The system should save every scheduled payment, cancel and run, make them available to Records and Court, and write an audit log entry for each, with actor, time and result.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                             **When**                                                               **Then**                                                                                                                               **Covers**
  -------------- ------------------------------------------------------------------------------------- ---------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-EXP-10-01   A release in which EXP-08 is not offered                                              A parent opens an Accepted request                                     No option to schedule is offered                                                                                                       FR-EXP-10-01

  AC-EXP-10-02   An Accepted request, and today is 2027-01-15                                          The payer chooses the date 2027-02-01, and later the date 2027-01-15   The first is saved as Scheduled and the second is refused with ERR-35                                                                  FR-EXP-10-02

  AC-EXP-10-03   A payment scheduled for 2027-02-01                                                    The payer confirms at scheduling, and the date arrives                 The confirm step showed the amount, the receiver, any fee and the date, and the payment starts on 2027-02-01 with no further confirm   FR-EXP-10-03

  AC-EXP-10-04   A scheduled payment                                                                   The payer cancels it before its date                                   The payment is Cancelled with the time, it is kept in the list, and it does not run                                                    FR-EXP-10-04

  AC-EXP-10-05   A payment scheduled for 2027-02-01                                                    It is 2027-01-31                                                       The payer gets the alert (MSGT-35)                                                                                                     FR-EXP-10-05

  AC-EXP-10-06   A scheduled payment that fails on its date                                            The partner reports the failure                                        The status is Failed, ERR-32 shows, the payer is alerted, and no second try is made                                                    FR-EXP-10-06

  AC-EXP-10-07   A scheduled payment, and a request that the requester marks as paid before the date   The date arrives                                                       The payment does not run, it is cancelled, and MSGT-34 shows to the payer                                                              FR-EXP-10-07

  AC-EXP-10-08   A scheduled payment, a cancel and a run                                               Each is saved                                                          Each is available to Records and Court, and one audit log entry exists for each                                                        FR-EXP-10-09
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Acceptance criteria for FR-EXP-10-08:

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                        **When**                                     **Then**                                                            **Covers**
  -------------- ------------------------------------------------------------------------------------------------ -------------------------------------------- ------------------------------------------------------------------- --------------
  AC-EXP-10-09   A parent who sets a repeating payment of 300.00 with the start date 2027-02-01 and no end date   The dates 2027-02-01 and 2027-03-01 arrive   A payment of 300.00 starts on each date, each with its own status   FR-EXP-10-08

  AC-EXP-10-10   A repeating payment                                                                              The parent stops it on 2027-02-15            No payment runs on 2027-03-01, and MSGT-31 shows                    FR-EXP-10-08
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-11 AI-assisted expense entry

US-EXP-11-01. As a parent, I want help to fill in an expense from a receipt, so that I type less.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-11-01       The system should offer AI-assisted expense entry only after the legal review of the AI terms is recorded as done.

  FR-EXP-11-02       The system should let a user turn AI-assisted entry on or off. It is off until the user turns it on, and it has its own switch.

  FR-EXP-11-03       Before the user turns it on, the system should say plainly what the AI sees (MSGT-27). The AI sees the receipt file or the text the user gives, only when the user asks for help. The data is not used for training.

  FR-EXP-11-04       The system should let a parent give a receipt file (JPG, PNG or PDF) or type a short text. The AI then suggests a description, a category, an expense date and an amount.

  FR-EXP-11-05       The system should show the suggestion in the expense form with MSGT-28 and let the parent edit every field. Nothing is saved until the parent chooses Save.

  FR-EXP-11-06       The system should not save the suggestion. Only the expense that the parent saves is in the record.

  FR-EXP-11-07       The AI should only fill in the form of a new expense. It should never save, share, edit, void or request on its own.

  FR-EXP-11-08       The system should attach the receipt file to the expense only when the parent saves the expense. The file follows the rules of EXP-02.

  FR-EXP-11-09       AI-assisted entry should work in English first.

  FR-EXP-11-10       If the AI service is not available, the system should show ERR-34 and let the parent enter the expense by hand.

  FR-EXP-11-11       The system should write an audit log entry when a user turns the feature on or off.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                     **When**                                                                **Then**                                                                                                    **Covers**
  -------------- ------------------------------------------------------------- ----------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------- --------------
  AC-EXP-11-01   A release built before the legal review is recorded as done   A parent adds an expense                                                AI-assisted entry is not offered                                                                            FR-EXP-11-01

  AC-EXP-11-02   A new user                                                    They open the settings                                                  AI-assisted entry is off                                                                                    FR-EXP-11-02

  AC-EXP-11-03   A user who turns the feature on                               They confirm the switch                                                 The notice about what the AI sees shows first (MSGT-27), and the feature is on only after the user agrees   FR-EXP-11-03

  AC-EXP-11-04   A user with the feature on                                    They give a JPG of a receipt                                            The form is filled with a suggested description, category, expense date and amount                          FR-EXP-11-04

  AC-EXP-11-05   A suggestion in the form                                      The parent edits the amount and leaves the form without choosing Save   MSGT-28 showed, the amount could be edited, and no expense is saved                                         FR-EXP-11-05

  AC-EXP-11-06   A suggestion that the parent saves after edits                A parent opens the record                                               Only the saved expense is there, with no suggestion                                                         FR-EXP-11-06

  AC-EXP-11-07   A suggestion                                                  The AI service finishes                                                 The expense is not saved, shared, edited, voided or requested by the AI                                     FR-EXP-11-07

  AC-EXP-11-08   A receipt file given for a suggestion                         The parent saves the expense, and in another case does not save         The file is attached in the first case and not attached in the second                                       FR-EXP-11-08

  AC-EXP-11-09   A user with the feature on and a receipt in English           They ask for help                                                       The AI suggests the fields                                                                                  FR-EXP-11-09

  AC-EXP-11-10   An AI service that is not available                           A user asks for help                                                    ERR-34 shows and the parent can enter the expense by hand                                                   FR-EXP-11-10

  AC-EXP-11-11   A user                                                        They turn the feature on and off                                        One audit log entry exists for each, with the actor, the time in UTC and the result                         FR-EXP-11-11
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-12 Bill pay direct to merchant

US-EXP-12-01. As a parent, I want each of us to pay our share of a bill straight to the merchant, so that nobody has to front the money.

How shares are set when no split rule applies is open.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-12-01     The system should offer bill pay only when EXP-08 is offered and the legal review of the bill pay terms is recorded as done.

  FR-EXP-12-02     The system should let a parent add a bill with a file (JPG, PNG or PDF, under the rules of FR-EXP-02-02, FR-EXP-02-03 and FR-EXP-02-05), the name of the merchant (1 to 100 characters, and ERR-04 if longer), an amount (under FR-EXP-01-03), a due date and a category from the list in EXP-06.

  FR-EXP-12-03     The system should let each parent pay a share of the bill directly to the merchant through the partner. When an Active split rule (EXP-05) applies to the category of the bill, the shares come from that rule. Otherwise the shares are open.

  FR-EXP-12-04     The system should alert the co-parent through the Notifications module when a bill is added.

  FR-EXP-12-05     The system should ask each parent to confirm their own payment before money moves. The confirm step shows the amount, the name of the merchant and any fee.

  FR-EXP-12-06     The system should show, for each parent, the status of their share as Unpaid, Started, Processing, Completed or Failed, with the time of each status.

  FR-EXP-12-07     The system should never hold funds. The money goes from the payer to the merchant through the partner.

  FR-EXP-12-08     If the partner is not available, the system should show ERR-31. If a payment fails, the system should show ERR-32 and take no money.

  FR-EXP-12-09     The system should save the bill, the file and every payment status, never edit or delete them, make them available to Records and Court, and write an audit log entry for each action.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                    **When**                                                                                          **Then**                                                                                                                          **Covers**
  -------------- ------------------------------------------------------------ ------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-EXP-12-01   A release in which EXP-08 is not offered                     A parent opens the expense menu                                                                   Bill pay is not offered                                                                                                           FR-EXP-12-01

  AC-EXP-12-02   A parent adding a bill                                       They add a JPG, the merchant Dental Care, the amount 200.00, a due date and the category Dental   The bill is saved. A merchant name of 101 characters is refused with ERR-04, and an amount of 0 is refused with ERR-01.           FR-EXP-12-02

  AC-EXP-12-03   An Active Dental rule of 60/40 and a Dental bill of 200.00   The shares are shown                                                                              The shares are 120.00 and 80.00                                                                                                   FR-EXP-12-03

  AC-EXP-12-04   A bill that Parent A adds                                    The bill is saved                                                                                 Parent B is alerted                                                                                                               FR-EXP-12-04

  AC-EXP-12-05   A bill with an unpaid share                                  A parent chooses Pay                                                                              The confirm step shows the amount, the merchant and any fee, and no money moves before the confirm                                FR-EXP-12-05

  AC-EXP-12-06   A bill with two shares                                       A parent opens it                                                                                 Each share shows its status and the time of each status                                                                           FR-EXP-12-06

  AC-EXP-12-07   A share that is paid                                         The payment completes                                                                             The money went to the merchant and the app held no funds                                                                          FR-EXP-12-07

  AC-EXP-12-08   A partner that is not available, and a payment that fails    A parent tries to pay                                                                             ERR-31 shows for the first case. For the second, ERR-32 shows and no money is taken.                                              FR-EXP-12-08

  AC-EXP-12-09   A bill with payments                                         Records and Court asks for the bills                                                              The bill, its file and every status are available, none can be edited or deleted, and an audit log entry exists for each action   FR-EXP-12-09
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-13 Pay expenses by credit card

US-EXP-13-01. As a parent, I want to pay by credit card, so that I can use the card I already have.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-13-01        The system should offer card payment only when EXP-08 is offered and the legal review of card payments is recorded as done.

  FR-EXP-13-02        The system should let the payer choose Credit card as the way to pay in a payment under EXP-08 or EXP-12.

  FR-EXP-13-03        The system should take card details only through the partner and should not store card numbers.

  FR-EXP-13-04        The system should show any fee for a card payment before the payer confirms. The payer pays the fee. The amount of the fee is set with the partner.

  FR-EXP-13-05        If a card payment fails, the system should show ERR-32, take no money, and leave the request or bill as it was.

  FR-EXP-13-06        The system should show the way of payment (Credit card) on the payment record.

  FR-EXP-13-07        The system should write an audit log entry for every card payment, with actor, time and result.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                  **When**                            **Then**                                                                    **Covers**
  -------------- ------------------------------------------ ----------------------------------- --------------------------------------------------------------------------- --------------
  AC-EXP-13-01   A release in which EXP-08 is not offered   A parent opens a payment            Card payment is not offered                                                 FR-EXP-13-01

  AC-EXP-13-02   A payer on the confirm step of a payment   They choose Credit card             The payment goes through the partner as a card payment                      FR-EXP-13-02

  AC-EXP-13-03   A payer who enters a card                  The payment is made                 The partner holds the card details and the app holds no card number         FR-EXP-13-03

  AC-EXP-13-04   A card payment that has a fee              The confirm step shows              The fee and who pays it show before the confirm button                      FR-EXP-13-04

  AC-EXP-13-05   A card payment that fails                  The partner reports the failure     ERR-32 shows, no money is taken, and the request or bill is as it was       FR-EXP-13-05

  AC-EXP-13-06   A completed card payment                   A parent opens the payment record   The way of payment shows as Credit card                                     FR-EXP-13-06

  AC-EXP-13-07   A card payment                             It is made                          One audit log entry exists with the actor, the time in UTC and the result   FR-EXP-13-07
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-14 Payments reported for credit building, opt-in

US-EXP-14-01. As a parent, I want to choose to have my on-time payments reported, so that they can help my credit.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-14-01       The system should offer credit building only when EXP-08 is offered and the legal review of credit reporting is recorded as done.

  FR-EXP-14-02       The system should let each parent turn credit building on or off for their own payments. It is off until the parent turns it on, and it has its own switch.

  FR-EXP-14-03       Before the parent turns it on, the system should show MSGT-30, which says what is reported, to whom, and by whom. The wording is approved by legal and the partner.

  FR-EXP-14-04       The system should report only payments that the parent made through the payment features of EXP-08, EXP-12 and EXP-13. It should never report a child support payment that a parent recorded under EXP-07.

  FR-EXP-14-05       The system should give the partner only the data the partner needs to report.

  FR-EXP-14-06       When the parent turns it off, the system should stop reporting later payments. The system does not recall payments reported before.

  FR-EXP-14-07       The system should not make any feature depend on credit building being on.

  FR-EXP-14-08       The system should write an audit log entry when a parent turns it on or off, with actor, time and result.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                  **When**                                       **Then**                                                                                    **Covers**
  -------------- ------------------------------------------------------------------------------------------ ---------------------------------------------- ------------------------------------------------------------------------------------------- --------------
  AC-EXP-14-01   A release built before the legal review of credit reporting is recorded as done            A parent opens the settings                    Credit building is not offered                                                              FR-EXP-14-01

  AC-EXP-14-02   A new user, and a parent who turns it on                                                   They open the settings, and later turn it on   It is off at first. After the parent turns it on, it is on for that parent only.            FR-EXP-14-02

  AC-EXP-14-03   A parent who turns it on                                                                   They confirm the switch                        MSGT-30 shows first, and credit building is on only after the parent agrees                 FR-EXP-14-03

  AC-EXP-14-04   A parent with it on, a payment made through EXP-08, and a recorded child support payment   The partner reports                            The payment made through EXP-08 is reported and the recorded child support payment is not   FR-EXP-14-04

  AC-EXP-14-05   A payment that is reported                                                                 The partner gets the data                      The partner gets only the data it needs to report                                           FR-EXP-14-05

  AC-EXP-14-06   A parent who turns it off                                                                  A later payment is made                        The later payment is not reported, and earlier reports are not recalled                     FR-EXP-14-06

  AC-EXP-14-07   A parent with it off                                                                       The parent pays                                Every payment feature works the same                                                        FR-EXP-14-07

  AC-EXP-14-08   A parent                                                                                   They turn it on and off                        One audit log entry exists for each, with the actor, the time in UTC and the result         FR-EXP-14-08
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

EXP-15 Import past expenses

US-EXP-15-01. As a parent, I want to bring in my old expenses, so that my record starts before I joined the app.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-15-01       The system should let a parent import past expenses from a CSV file with the columns Description, Category, Expense date, Amount and Note (optional). It should offer a sample file.

  FR-EXP-15-02       The system should accept a CSV file of up to 500 rows and 2 MB. For any other file, it should show ERR-33.

  FR-EXP-15-03       The system should show a preview before the import, with the rows to add and the rows to skip and the reason for each skip.

  FR-EXP-15-04       The system should skip a row that does not meet the expense rules (FR-EXP-01-02 to FR-EXP-01-06 and FR-EXP-06-01) and should add the other rows.

  FR-EXP-15-05       The system should save each imported expense as Private, with the label Imported and the time of the import as the time it was created. The expense date is the date in the file.

  FR-EXP-15-06       After the import, the system should treat each imported expense under the normal rules of EXP-01, so it can be edited as a new version, voided or shared.

  FR-EXP-15-07       The system should show MSGT-29 with the number of rows added and skipped when the import ends.

  FR-EXP-15-08       The system should write one audit log entry for each import, with the file name, the number of rows added, the number skipped, the actor, the time and the result.

  FR-EXP-15-09       If the import cannot be saved, the system should show ERR-05 and add no expense.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                      **When**                                                **Then**                                                                                                                     **Covers**
  -------------- ---------------------------------------------------------------------------------------------- ------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------- --------------
  AC-EXP-15-01   A signed-in parent                                                                             They open the import screen                             The sample file is offered and a file with the five columns is accepted                                                      FR-EXP-15-01

  AC-EXP-15-02   A CSV file with 501 rows, a file over 2 MB, and a file that is not a CSV                       A parent imports each                                   Each is refused and ERR-33 shows                                                                                             FR-EXP-15-02

  AC-EXP-15-03   A CSV file with 10 rows                                                                        A parent starts the import                              A preview shows the rows to add and the rows to skip, with a reason for each skip                                            FR-EXP-15-03

  AC-EXP-15-04   A file with 8 valid rows and 2 rows (one with the amount 0 and one with an unknown category)   The parent confirms the import                          The 8 valid rows are added and the 2 other rows are skipped                                                                  FR-EXP-15-04

  AC-EXP-15-05   An imported expense with the file date 2025-06-01, imported on 2027-01-15                      A parent opens it                                       It is Private, it shows the label Imported, its expense date is 2025-06-01, and its created time is the time of the import   FR-EXP-15-05

  AC-EXP-15-06   An imported expense                                                                            The parent edits it, voids another and shares a third   Each action works under the normal rules                                                                                     FR-EXP-15-06

  AC-EXP-15-07   An import that adds 8 rows and skips 2                                                         The import ends                                         MSGT-29 shows 8 rows added and 2 skipped                                                                                     FR-EXP-15-07

  AC-EXP-15-08   An import                                                                                      It ends                                                 One audit log entry exists with the file name, 8 rows added, 2 skipped, the actor, the time in UTC and the result            FR-EXP-15-08

  AC-EXP-15-09   A save error                                                                                   A parent imports a file                                 No expense is added and ERR-05 shows                                                                                         FR-EXP-15-09
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Linking, Solo Mode, dispute and access rules**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-EXP-09-13       When a dispute is opened, the system shall label the expense Disputed and alert the other parent.

  FR-EXP-09-14       A disputed expense shall stay in the running balance. Both parents shall be able to add notes to the dispute, and every note shall be kept.

  FR-EXP-09-15       Only the parent who opened a dispute shall be able to close it. On closing, the system shall remove the Disputed label and keep the dispute and its notes in the expense history.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

8.2 Data reference

  --------------------------------------------------------------------------------
  **Entity**                    **Fields used**
  ----------------------------- --------------------------------------------------
  User                          user_id, role

  Household                     household_id, mode (Linked, Solo)

  Child                         child_id

  Audit log entry               actor, action, object, result, device_type, time

  Child support case link       state (used to find the state payment page)
  --------------------------------------------------------------------------------

Expense

  -----------------------------------------------------------------------------------------------------------------------------------
  **Field**            **Type**                 **Required**   **Notes**
  -------------------- ------------------------ -------------- ----------------------------------------------------------------------
  expense_id           Unique ID                Yes            System generated

  household_id         Link to Household        Yes            ---

  created_by_user_id   Link to User             Yes            Also the parent who paid. Cannot be changed.

  description          Text                     Yes            1 to 100 characters

  category             Choice                   Yes            Medical, Dental, School, Childcare, Activities, Clothing, Pet, Other

  expense_date         Date                     Yes            Not in the future

  amount               Amount                   Yes            US dollars, more than 0, up to 99,999.99, 2 decimal places

  children             List of links to Child   No             The amount is for all chosen children together

  note                 Text                     No             Up to 500 characters

  visibility           Choice                   Yes            Private, Shared. Shared cannot go back to Private.

  status               Choice                   Yes            Active, Voided

  source               Choice                   Yes            Entered, Calendar (pet), Imported

  created_at           Date and time            Yes            UTC
  -----------------------------------------------------------------------------------------------------------------------------------

Expense version

  --------------------------------------------------------------------------------------------------------------
  **Field**            **Type**          **Required**   **Notes**
  -------------------- ----------------- -------------- --------------------------------------------------------
  version_id           Unique ID         Yes            System generated

  expense_id           Link to Expense   Yes            ---

  version_number       Number            Yes            1 for the original details

  details_snapshot     Text              Yes            All fields of the expense as saved. Cannot be changed.

  change_type          Choice            Yes            Created, Edited, File added, Voided, Shared

  changed_by_user_id   Link to User      Yes            ---

  changed_at           Date and time     Yes            UTC

  device_type          Text              No             5
  --------------------------------------------------------------------------------------------------------------

Attached file (used for expenses and for recorded payments)

  -------------------------------------------------------------------------------------------------------
  **Field**                  **Type**         **Required**   **Notes**
  -------------------------- ---------------- -------------- --------------------------------------------
  file_id                    Unique ID        Yes            System generated

  expense_id or payment_id   Link             Yes            The expense or payment the file belongs to

  file_name                  Text             Yes            ---

  file_type                  Choice           Yes            JPG, PNG, PDF

  size_bytes                 Number           Yes            ---

  added_by_user_id           Link to User     Yes            ---

  added_at                   Date and time    Yes            UTC. Cannot be changed.
  -------------------------------------------------------------------------------------------------------

Reimbursement request

  ---------------------------------------------------------------------------------------------------------------------------------------
  **Field**              **Type**          **Required**   **Notes**
  ---------------------- ----------------- -------------- -------------------------------------------------------------------------------
  request_id             Unique ID         Yes            System generated

  expense_id             Link to Expense   Yes            ---

  requested_by_user_id   Link to User      Yes            The creator of the expense

  amount_requested       Amount            Yes            More than 0 and not more than the expense amount

  pay_by_date            Date              Yes            Today or later when the request is sent

  proof_needed           Choice            Yes            Receipt, Invoice, Other, None needed

  note                   Text              No             Up to 500 characters

  status                 Choice            Yes            Pending, Accepted, Part paid, Declined, Withdrawn, Paid

  answered_by_user_id    Link to User      No             The co-parent who accepted or declined

  answer_reason          Text              No             Given with a decline. Up to 500 characters.

  paid_on                Date              No             Date of the latest payment received. Each payment is a request history entry.

  paid_note              Text              No             Up to 500 characters

  created_at             Date and time     Yes            UTC
  ---------------------------------------------------------------------------------------------------------------------------------------

Request history entry

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**            **Type**                        **Required**   **Notes**
  -------------------- ------------------------------- -------------- ---------------------------------------------------------------------------------------------------------------------------------
  entry_id             Unique ID                       Yes            System generated

  request_id           Link to Reimbursement request   Yes            ---

  status               Choice                          Yes            The status set by this entry. For a payment received, the entry also holds the amount received, the date received and the note.

  changed_by_user_id   Link to User                    Yes            ---

  changed_at           Date and time                   Yes            UTC. Cannot be changed.

  device_type          Text                            No             5
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Recorded child support payment

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**             **Type**            **Required**   **Notes**
  --------------------- ------------------- -------------- ---------------------------------------------------------------------------------------------------------------------------------------------
  payment_id            Unique ID           Yes            System generated

  household_id          Link to Household   Yes            ---

  recorded_by_user_id   Link to User        Yes            The parent who made the payment

  amount                Amount              Yes            Same rules as the expense amount

  paid_on               Date                Yes            Not in the future

  paid_through          Choice              Yes            State agency payment page, Directly to the other parent, Other

  note                  Text                No             Up to 500 characters

  visibility            Choice              Yes            Private, Shared. Private when saved.

  agency_status         Choice              Yes            Recorded by you, Matched with agency, Not on agency record, Sent to agency, Credited by agency. Only Child Support Sync sets the last four.

  record_status         Choice              Yes            Active, Voided

  created_at            Date and time       Yes            UTC
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Each recorded payment also has versions with the same fields as an expense version, and can have attached files.

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**                             **Type**                         **Required**   **Notes**
  ------------------------------------- -------------------------------- -------------- ------------------------------------------------------------------
  rule_id                               Unique ID                        Yes            System generated

  household_id                          Link to Household                Yes            ---

  category                              Choice                           Yes            One category or All categories

  method                                Choice                           Yes            Percentage, Fixed amount

  percent_by_parent                     Two numbers                      No             The percent for each parent. Must add up to 100. For Percentage.

  fixed_parent_id and fixed_amount      Link to User and Amount          No             For Fixed amount

  cap_amount                            Amount                           No             ---

  start_date                            Date                             Yes            Unique together with category

  status                                Choice                           Yes            Proposed, Active, Declined

  proposed_by_user_id                   Link to User                     Yes            ---

  answered_by_user_id and answered_at   Link to User and Date and time   No             Set when the co-parent confirms or declines

  created_at                            Date and time                    Yes            UTC. Cannot be changed.
  --------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------
  **Field**                                                                       **Type**          **Required**   **Notes**
  ------------------------------------------------------------------------------- ----------------- -------------- ---------------------
  dispute_id                                                                      Unique ID         Yes            System generated

  expense_id                                                                      Link to Expense   Yes            ---

  opened_by_user_id                                                               Link to User      Yes            ---

  note                                                                            Text              Yes            1 to 500 characters

  status                                                                          Choice            Yes            Open, Closed

  opened_at and closed_at                                                         Date and time     Yes, No        UTC

  Reply: reply_id, dispute_id, user_id, body (up to 500 characters), created_at   Entry             No             Cannot be changed
  --------------------------------------------------------------------------------------------------------------------------------------

8.3 Interfaces

All interfaces except INT-09 and INT-10 are with other modules of the app.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **With**                      **What passes**                                                                                                                                                           **Features**
  ---------- ----------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------
  INT-01     Child Support Sync            Active recorded payments (amount, date, how paid) go out. The status of each payment comes back. The state of the linked case comes in, to find the state payment page.   EXP-07

  INT-02     Notifications                 Alerts and reminders for requests, split rules, disputes, bills and scheduled payments go out.                                                                            EXP-03, EXP-05, EXP-09, EXP-10, EXP-12

  INT-03     Records and Court             Expenses, versions, files, requests, recorded payments (when selected), split rules, disputes and payments go out.                                                        EXP-01 to EXP-15

  INT-05     Accounts and Onboarding       The household mode (Linked or Solo) and the roles come in.                                                                                                                EXP-01 to EXP-09

  INT-06     Calendar and Parenting Time   Pet expenses come in with the category Pet.                                                                                                                               EXP-06

  INT-07     Children and Documents        The children saved in the household come in.                                                                                                                              EXP-06

  INT-08     Professionals and Access      Items that a parent shares go out as read-only.                                                                                                                           EXP-01, EXP-04, EXP-07

  INT-09     AI service                    Receipt files and text go to it. Suggestions come back. All AI use is opt-in.                                                                                             EXP-11

  INT-10     Payment partner               Payments, statuses, fees, card payments and credit reporting go through it. The partner is not chosen. The partner holds card details and takes the money.                EXP-08, EXP-10, EXP-12, EXP-13, EXP-14
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

8.4 Non-functional requirements

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**       **Requirement**                                                            **Where it applies here**
  ------------ -------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------
  NFR-01       Two-factor sign-in for every account (100 percent of accounts)             Expense, payment and money data open only after sign-in with the second check

  NFR-02       Encryption in transit and at rest                                          Expenses, files, requests, recorded payments, split rules and disputes

  NFR-03       Role-based access on every request                                         FR-EXP-01-10, FR-EXP-03-02, FR-EXP-03-11, FR-EXP-07-05

  NFR-04       Changes are logged with actor, time and result                             FR-EXP-01-21, FR-EXP-02-12, FR-EXP-03-21, FR-EXP-05-16, FR-EXP-07-18, FR-EXP-09-11

  NFR-05       Records cannot be edited. A change is a new entry.                         FR-EXP-01-14 to FR-EXP-01-17, FR-EXP-02-08, FR-EXP-03-19, FR-EXP-05-13, FR-EXP-07-09 to FR-EXP-07-11, FR-EXP-09-06

  NFR-06       Collect only the data that is needed                                       No card numbers and no bank details are stored by the app (FR-EXP-13-03). The AI and the partner get only what they need (FR-EXP-11-03, FR-EXP-14-05).

  NFR-09       Plain language on every screen. The standard is to be chosen.2 level AA.   All screens

  NFR-11       English only.                                                              All screens, messages and AI features

  NFR-13       99 percent of alerts are sent within 1 minute                              Alerts and reminders in FR-EXP-03-09 and FR-EXP-03-18
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
