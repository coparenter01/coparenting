# Child Support Sync (CSS)


9.1 Functional requirements and acceptance criteria

CSS-01 Link a child support case with identity check and consent

US-CSS-01-01. As a parent, I want to link my own child support case safely, so that I can see the agency facts next to my own records.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**             **Requirement**
  ------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-01-01       The system shall let a parent start linking a case only after the parent has signed in with two-factor sign-in.

  FR-CSS-01-02       The system shall let the parent choose the state of the agency from the states that have a connector. At first only the first state is offered.

  FR-CSS-01-03       The system shall ask for the case ID and the personal details that the agency needs to confirm the match. The details follow the specification of the state.

  FR-CSS-01-04       The system shall send the details to the agency over the API, and the agency shall answer match or no match. As an alternative the agency sends a one-time code to the contact it has on file, and the parent enters the code.

  FR-CSS-01-05       The system shall never store a full Social Security number. The digits used for the check are not saved after the check.

  FR-CSS-01-06       The system shall show a consent screen before any data loads. It says which data is read, how often, that only the parent sees it, and that the parent can unlink at any time (MSGT-01).

  FR-CSS-01-07       The system shall save the consent with the wording version, the date and the time before any data loads.

  FR-CSS-01-08       The system shall set the link to Linked only after the agency has confirmed the match and the consent is saved.

  FR-CSS-01-09       The system shall let a parent link one case and shall show ERR-04 for a second case.

  FR-CSS-01-10       The system shall let the parent unlink at any time. Sync stops at once and the system offers an export of the data.

  FR-CSS-01-11       After an unlink, the system shall remove the synced values after 30 days, except values inside a certified export or under legal hold. It shall keep a short log that a link and an unlink happened, with no case values.

  FR-CSS-01-12       The system shall show agency data only to the parent who linked the case.

  FR-CSS-01-13       If the agency answers no match, the system shall show ERR-01. After 5 failed matches in one day, the system shall stop linking for 24 hours and show ERR-02.

  FR-CSS-01-14       If the agency is not available, the system shall show ERR-03 and let the parent try again later.

  FR-CSS-01-15       The system shall write an audit log entry for every link, every consent and every unlink.

  FR-CSS-01-16       Linking shall work in Solo Mode, in a linked household and for a user in Safety Mode.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                 **When**                                                 **Then**                                                                                                                                         **Covers**
  -------------- ------------------------------------------------------------------------- -------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------ ----------------------------
  AC-CSS-01-01   A parent who has not passed the second check                              They look for the link option                            Linking is not available                                                                                                                         FR-CSS-01-01

  AC-CSS-01-02   A signed-in parent                                                        They open the state list                                 Only the first state shows                                                                                                                       FR-CSS-01-02

  AC-CSS-01-03   A parent who enters the case ID and the details that the state needs      They submit them and the agency answers match            The system asks the parent for consent and does not load data yet                                                                                FR-CSS-01-03, FR-CSS-01-04

  AC-CSS-01-04   A state where the agency sends a one-time code                            The parent enters the correct code                       The agency confirms the match                                                                                                                    FR-CSS-01-04

  AC-CSS-01-05   A match that was confirmed with digits of a Social Security number        The check ends                                           The database holds no Social Security number and no digits of it                                                                                 FR-CSS-01-05

  AC-CSS-01-06   A confirmed match                                                         The consent screen opens                                 It says which data is read, how often, that only the parent sees it, and that the parent can unlink at any time (MSGT-01)                        FR-CSS-01-06

  AC-CSS-01-07   A parent who accepts the consent                                          The consent is saved                                     The consent has the wording version, the date and the time, and no data was loaded before that                                                   FR-CSS-01-07

  AC-CSS-01-08   A confirmed match                                                         The parent closes the consent screen without accepting   The link stays Unlinked and no data loads                                                                                                        FR-CSS-01-08

  AC-CSS-01-09   A parent with a linked case                                               They try to link a second case                           The second link is refused and ERR-04 shows                                                                                                      FR-CSS-01-09

  AC-CSS-01-10   A linked parent                                                           They unlink                                              Sync stops at once and an export is offered (MSGT-09)                                                                                            FR-CSS-01-10

  AC-CSS-01-11   A parent who unlinked 31 days ago, with one value in a certified export   The 30 days pass                                         The synced values are removed except the value in the certified export, and a log shows that a link and an unlink happened with no case values   FR-CSS-01-11

  AC-CSS-01-12   A linked case of Parent A                                                 Parent B opens the app                                   Parent B sees no agency data                                                                                                                     FR-CSS-01-12

  AC-CSS-01-13   A parent whose details do not match, 5 times in one day                   The parent tries a sixth time                            The first failures show ERR-01 and the sixth try is refused with ERR-02 for 24 hours                                                             FR-CSS-01-13

  AC-CSS-01-14   An agency that is not available                                           A parent starts linking                                  ERR-03 shows and the parent can try again later                                                                                                  FR-CSS-01-14

  AC-CSS-01-15   A link, a consent and an unlink                                           Each is done                                             One audit log entry exists for each with the actor, the time in UTC and the result                                                               FR-CSS-01-15

  AC-CSS-01-16   A household in Solo Mode, and a user in Safety Mode                       Each parent links a case                                 Both links work                                                                                                                                  FR-CSS-01-16
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-02 Read-only pull of case status, order amount, payment history, arrears and next hearing

US-CSS-02-01. As a parent, I want to see the agency\'s own facts about my case in the app, so that I do not have to check a separate site.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-02-01        After a case is linked, the system shall pull the case status, the order amount, the payment history, the arrears and the next hearing from the agency.

  FR-CSS-02-02        The system shall pull by API for the first pull after linking and for a refresh that the parent asks for, where the state offers an API. It shall pull by batch for the regular updates.

  FR-CSS-02-03        The system shall show agency data as read-only. The app never changes an agency value.

  FR-CSS-02-04        The system shall show the status of the case as the agency gives it, with the case type when the agency gives one.

  FR-CSS-02-05        The system shall show each payment with its date, its amount and the type that the agency gives.

  FR-CSS-02-06        The system shall show the arrears as the agency gives them. The app does not calculate arrears or the balance.

  FR-CSS-02-07        The system shall show the next hearing with its date, time and place or court as the agency gives them.

  FR-CSS-02-08        When the agency gives no value for an item, the system shall show Not provided by the agency (MSGT-04) and never a blank or a guessed value.

  FR-CSS-02-09        The system shall keep the values it loaded for as long as the case is linked, even when the agency shows only part of the history.

  FR-CSS-02-10        Where the state offers an API, the system shall let the parent ask for a refresh, and shall allow it once every 30 minutes.

  FR-CSS-02-11        If a pull fails, the system shall keep the last good data and mark it out of date.

  FR-CSS-02-12        The system shall load only the data of a case that a parent has linked.

  FR-CSS-02-13        The system shall log every pull with the time, the channel and the result.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                               **When**                                                     **Then**                                                                                        **Covers**
  -------------- ------------------------------------------------------- ------------------------------------------------------------ ----------------------------------------------------------------------------------------------- --------------
  AC-CSS-02-01   A case that was just linked                             The first pull finishes                                      The case status, the order amount, the payment history, the arrears and the next hearing show   FR-CSS-02-01

  AC-CSS-02-02   A linked case in a state with an API and a batch        The parent links the case, and the next day the batch runs   The first pull came by API and the daily update came by batch                                   FR-CSS-02-02

  AC-CSS-02-03   An agency value on the screen                           The parent looks for a way to change it                      No edit option is offered                                                                       FR-CSS-02-03

  AC-CSS-02-04   A case with the type payment processing                 The parent opens the case                                    The status and the type show as the agency gives them                                           FR-CSS-02-04

  AC-CSS-02-05   A case with 3 payments                                  The parent opens the payment history                         Each payment shows its date, its amount and its type                                            FR-CSS-02-05

  AC-CSS-02-06   A case with arrears of 1,200.00 dollars at the agency   The parent opens the case                                    The arrears show as 1,200.00 dollars and the app has calculated nothing                         FR-CSS-02-06

  AC-CSS-02-07   A case with a hearing on a set date                     The parent opens the case                                    The date, the time and the place or court show                                                  FR-CSS-02-07

  AC-CSS-02-08   A case where the agency gives no next hearing           The parent opens the case                                    The next hearing shows Not provided by the agency                                               FR-CSS-02-08

  AC-CSS-02-09   A state that shows 13 months of payments                The agency drops the oldest month                            The app still shows the month it loaded earlier                                                 FR-CSS-02-09

  AC-CSS-02-10   A state with an API                                     The parent asks for a refresh twice within 30 minutes        The first refresh runs and the second is refused until 30 minutes have passed                   FR-CSS-02-10

  AC-CSS-02-11   A batch load that fails                                 The parent opens the case                                    The last good values show marked out of date                                                    FR-CSS-02-11

  AC-CSS-02-12   A batch file with a linked case and an unlinked case    The load runs                                                Only the linked case loads                                                                      FR-CSS-02-12

  AC-CSS-02-13   A pull by API and a pull by batch                       Both finish                                                  The log has one entry for each with the time, the channel and the result                        FR-CSS-02-13
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-03 Agency payments and app-recorded payments side by side, with mismatch flags

US-CSS-03-01. As a parent, I want my own payment records next to the agency record, so that I see at once when they differ.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-03-01        The system shall show the agency payments next to the child support payments that the parent recorded in Expenses and Payments (EXP-07).

  FR-CSS-03-02        The system shall treat a recorded payment as matching an agency payment when the amounts are equal and the dates are within 5 days. The connector of a state can set a different number of days.

  FR-CSS-03-03        The system shall show a status on each recorded payment: Recorded by you, Matched with agency, Not on agency record, Sent to agency or Credited by agency.

  FR-CSS-03-04        The status Sent to agency shall be used only.

  FR-CSS-03-05        After every load and every refresh, the system shall compare the agency payments with the recorded payments and raise a flag for each difference: Recorded payment not on the agency record, Agency payment not recorded, or Amounts differ.

  FR-CSS-03-06        The system shall never change a payment and shall never fix a difference by itself.

  FR-CSS-03-07        The system shall let the parent dismiss a flag with an optional note. The flag stays in the history.

  FR-CSS-03-08        The system shall show the plain line that the agency decides what counts (MSGT-02) next to the comparison.

  FR-CSS-03-09        The system shall never change the order amount or the arrears.

  FR-CSS-03-10        The system shall show the comparison only to the linked parent.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                             **When**                                        **Then**                                                                    **Covers**
  -------------- ----------------------------------------------------------------------------------------------------- ----------------------------------------------- --------------------------------------------------------------------------- ----------------------------
  AC-CSS-03-01   A linked case with agency payments and recorded payments                                              The parent opens the comparison                 Both lists show side by side                                                FR-CSS-03-01

  AC-CSS-03-02   A recorded payment of 300.00 dollars on March 3 and an agency payment of 300.00 dollars on March 6    The comparison runs                             The recorded payment is Matched with agency                                 FR-CSS-03-02, FR-CSS-03-03

  AC-CSS-03-03   A recorded payment of 300.00 dollars on March 3 and an agency payment of 300.00 dollars on March 12   The comparison runs                             The recorded payment is Not on agency record                                FR-CSS-03-02, FR-CSS-03-03

  AC-CSS-03-04   A payment that was just recorded                                                                      The parent opens it                             The status is Recorded by you                                               FR-CSS-03-03

  AC-CSS-03-05   A household                                                                                           A parent opens the statuses                     Sent to agency is not offered                                               FR-CSS-03-04

  AC-CSS-03-06   A batch load that finishes                                                                            The comparison runs                             A flag shows for each of the three kinds of difference that exist           FR-CSS-03-05

  AC-CSS-03-07   A flag                                                                                                The system and the parent look at the payment   The payment is unchanged and the flag stays until the parent dismisses it   FR-CSS-03-06

  AC-CSS-03-08   A flag                                                                                                The parent dismisses it with a note             The flag is dismissed and stays in the history with the note                FR-CSS-03-07

  AC-CSS-03-09   The comparison screen                                                                                 A parent opens it                               The line that the agency decides what counts shows (MSGT-02)                FR-CSS-03-08

  AC-CSS-03-10   A recorded payment that differs from the agency                                                       The comparison runs                             The order amount and the arrears are unchanged                              FR-CSS-03-09

  AC-CSS-03-11   A linked case of Parent A                                                                             Parent B opens the app                          Parent B sees no comparison                                                 FR-CSS-03-10
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-04 Arrears, balance and due dates with reminders

US-CSS-04-01. As a parent, I want to see what is owed and when the next payment is due, so that I do not miss it.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-04-01         The system shall show the arrears, the balance and the next due date with its amount, as the agency gives them.

  FR-CSS-04-02         The system shall get the balance and the due dates by batch.

  FR-CSS-04-03         The system shall send a reminder for a due date through the Notifications module, 3 days before the due date by default. The parent can change the time.

  FR-CSS-04-04         The system shall send the reminder only to the parent who linked the case, unless the parent shared the item.

  FR-CSS-04-05         The system shall show on each value its source and the time it was last updated (CSS-07).

  FR-CSS-04-06         When the agency gives no due date, the system shall show Not provided by the agency.

  FR-CSS-04-07         When the data is more than 2 days old, the system shall show a warning (MSGT-03).
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                              **When**                    **Then**                                                          **Covers**
  -------------- ------------------------------------------------------ --------------------------- ----------------------------------------------------------------- --------------
  AC-CSS-04-01   A linked case with arrears, a balance and a due date   The parent opens the case   The arrears, the balance, and the due date with its amount show   FR-CSS-04-01

  AC-CSS-04-02   A due date that changes at the agency                  The next batch runs         The new due date shows after that batch                           FR-CSS-04-02

  AC-CSS-04-03   A due date on March 20                                 It is March 17              The parent gets a reminder                                        FR-CSS-04-03

  AC-CSS-04-04   A linked case of Parent A                              The reminder time arrives   Only Parent A gets the reminder                                   FR-CSS-04-04

  AC-CSS-04-05   A value on the screen                                  The parent looks at it      It shows its source and the time of its last update               FR-CSS-04-05

  AC-CSS-04-06   A case without a due date                              The parent opens the case   The due date shows Not provided by the agency                     FR-CSS-04-06

  AC-CSS-04-07   Data last updated 3 days ago                           The parent opens the case   The warning shows (MSGT-03)                                       FR-CSS-04-07
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-05 Hearings, deadlines and required documents in the calendar

US-CSS-05-01. As a parent, I want hearings and deadlines in my calendar with the documents I need, so that I do not miss a date or turn up without a paper.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-05-01        The system shall show each hearing and each deadline in the calendar as a read-only agency item.

  FR-CSS-05-02        The system shall show on each item the required documents as the agency lists them.

  FR-CSS-05-03        When the agency changes the date or the time of an item, the system shall update the item and keep the earlier values in the history.

  FR-CSS-05-04        When the agency removes an item, the system shall mark it Removed by the agency and shall not delete it.

  FR-CSS-05-05        The system shall send reminders through the Notifications module: 7 days and 1 day before a hearing or a deadline, and a court date by push and by SMS at the same time.

  FR-CSS-05-06        The system shall show an item and send its reminders only to the parent who linked the case, unless the parent shared the item (CSS-13).

  FR-CSS-05-07        The system shall get hearings and deadlines by a daily batch, and by a refresh where the state offers an API.

  FR-CSS-05-08        The system should let the parent mark each required document as Ready or Not ready, in a note that only the parent sees.

  FR-CSS-05-09        The system shall show on each item its source and the time it was last updated (CSS-07).
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                       **When**                                **Then**                                                                                                         **Covers**
  -------------- ----------------------------------------------- --------------------------------------- ---------------------------------------------------------------------------------------------------------------- --------------
  AC-CSS-05-01   A hearing and a deadline in the agency record   The batch loads them                    Both show in the calendar as read-only agency items                                                              FR-CSS-05-01

  AC-CSS-05-02   A hearing with three required documents         The parent opens the item               The three documents show as the agency lists them                                                                FR-CSS-05-02

  AC-CSS-05-03   A hearing that the agency moves to a new date   The next batch runs                     The item shows the new date and the history keeps the earlier date                                               FR-CSS-05-03

  AC-CSS-05-04   A hearing that the agency removes               The next batch runs                     The item shows Removed by the agency and is still in the calendar and the history                                FR-CSS-05-04

  AC-CSS-05-05   A court hearing on March 20                     It is March 13, March 19 and March 20   The reminders go 7 days and 1 day before, and the court date reminder goes by push and by SMS at the same time   FR-CSS-05-05

  AC-CSS-05-06   A hearing from the case of Parent A             Parent B opens the calendar             Parent B does not see the hearing and gets no reminder                                                           FR-CSS-05-06

  AC-CSS-05-07   A state with a daily batch and an API           A hearing changes at the agency         The batch picks it up the next day, and a refresh picks it up at once                                            FR-CSS-05-07

  AC-CSS-05-08   A hearing with a required document              The parent marks it Ready               The mark shows only to the parent                                                                                FR-CSS-05-08

  AC-CSS-05-09   An agency item in the calendar                  The parent looks at it                  It shows its source and the time of its last update                                                              FR-CSS-05-09
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-06 Send proof of direct payments and expense proofs to the agency

US-CSS-06-01. As a parent who paid directly, I want to send proof to the agency, so that the agency can credit the payment.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-06-01      The system should let a parent choose a payment recorded in EXP-07, or an expense proof, and ask to send it to the agency. It should offer this only where the agency accepts records.

  FR-CSS-06-02      The system should show exactly what will be sent and ask the parent to confirm. Nothing is sent without the confirm step.

  FR-CSS-06-03      The system should send by API, or by a batch file where the state accepts only files.

  FR-CSS-06-04      The system should send only the payment date, the amount, the method and the proof file that the parent chooses. It should never send messages.

  FR-CSS-06-05      The system should show the status Sent to agency after the send, and Credited by agency when the agency record shows the payment as credited.

  FR-CSS-06-06      When the agency does not accept records, the system should offer a proof package: a PDF with a record ID and a public check page. The parent can upload it in the agency portal, mail it or bring it to a hearing.

  FR-CSS-06-07      The proof package should say that the agency decides what counts and that the pay history of the agency is the official record.

  FR-CSS-06-08      The system should never change an agency value. Sending a record does not change the order amount or the arrears.

  FR-CSS-06-09      The system should log every send with what was sent, when, the channel and the result, and should save the receipt of the agency when it gives one.

  FR-CSS-06-10      If a send fails, the system should keep the payment as not sent, show ERR-05, and let the parent try again or use the proof package.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                             **When**                                **Then**                                                                                                              **Covers**
  -------------- --------------------------------------------------------------------- --------------------------------------- --------------------------------------------------------------------------------------------------------------------- --------------
  AC-CSS-06-01   A state whose agency accepts records, and a recorded direct payment   The parent chooses to send it           The send option is offered                                                                                            FR-CSS-06-01

  AC-CSS-06-02   A payment that the parent chose to send                               The parent has not confirmed            The system shows what will be sent and sends nothing                                                                  FR-CSS-06-02

  AC-CSS-06-03   A state with an API, and a state that accepts only files              The parent confirms a send in each      The first goes by API and the second goes in a batch file                                                             FR-CSS-06-03

  AC-CSS-06-04   A confirmed send                                                      The send is made                        The date, the amount, the method and the chosen proof go, and no message goes                                         FR-CSS-06-04

  AC-CSS-06-05   A payment that was sent                                               The agency later shows it as credited   The status goes from Sent to agency to Credited by agency                                                             FR-CSS-06-05

  AC-CSS-06-06   A state whose agency does not accept records                          The parent asks for proof               A PDF proof package with a record ID and a public check page is offered                                               FR-CSS-06-06

  AC-CSS-06-07   A proof package                                                       The parent opens it                     It says that the agency decides what counts and that the pay history of the agency is the official record (MSGT-10)   FR-CSS-06-07

  AC-CSS-06-08   A send                                                                It is made                              The order amount and the arrears are unchanged                                                                        FR-CSS-06-08

  AC-CSS-06-09   A send and a receipt from the agency                                  Both are saved                          The log has the content, the time, the channel and the result, and the receipt                                        FR-CSS-06-09

  AC-CSS-06-10   A send that fails                                                     The parent confirms it                  The payment stays not sent, ERR-05 shows, and the parent can retry or use the proof package                           FR-CSS-06-10
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-07 Source and last-synced label on every agency value

US-CSS-07-01. As a parent, I want to know where each number comes from and how old it is, so that I do not act on an old figure.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ----------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-07-01        The system shall show on every agency value its source (API or batch) and the time it was last updated, in the local time of the user.

  FR-CSS-07-02        When data is more than 2 days old, the system shall show a warning (MSGT-03).

  FR-CSS-07-03        When an API call or a batch load failed, the system shall mark the values as out of date (MSGT-05) and keep the last good values.

  FR-CSS-07-04        Where a state offers both channels and they give different values, the system shall show the newer agency value and shall log both.

  FR-CSS-07-05        The system shall show the label in exports and in shared items.

  FR-CSS-07-06        The system shall tag a value that comes from the agency as Agency, and shall never give that tag to a value that the parent typed.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                     **When**                             **Then**                                                              **Covers**
  -------------- ----------------------------------------------------------------------------- ------------------------------------ --------------------------------------------------------------------- --------------
  AC-CSS-07-01   An agency value loaded by batch at 06:00 UTC on 2027-02-10                    A user in US Eastern time views it   It shows Batch and 01:00 on February 10, 2027                         FR-CSS-07-01

  AC-CSS-07-02   Data last updated 3 days ago                                                  A parent opens the case              The warning shows (MSGT-03)                                           FR-CSS-07-02

  AC-CSS-07-03   A batch load that failed                                                      A parent opens the case              The values show as out of date (MSGT-05) with the last good figures   FR-CSS-07-03

  AC-CSS-07-04   A state where the API and the batch give different values for the same item   Both arrive                          The newer agency value shows and both are in the log                  FR-CSS-07-04

  AC-CSS-07-05   An export and a shared item with an agency value                              The parent creates both              Each shows the source and the time of the last update                 FR-CSS-07-05

  AC-CSS-07-06   A value from the agency and a value the parent typed                          A parent looks at both               Only the agency value has the tag Agency                              FR-CSS-07-06
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-08 Family-violence flag linked to Safety Mode

US-CSS-08-01. As a parent in danger, I want the app to offer Safety Mode when the agency record shows a family violence flag, so that I get protection without having to ask.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-08-01        Where the agency allows it and advocates approve, the system should read the family violence flag of the case by API.

  FR-CSS-08-02        When the flag is present, the system should offer Safety Mode (SAF-01) to the parent. The parent decides. The system never turns Safety Mode on by itself.

  FR-CSS-08-03        The system shall not show the value of the flag, shall not store it and shall not share it. It saves only that an offer was shown and the answer of the parent.

  FR-CSS-08-04        The system should show the offer once. It should show a new offer only when the flag goes away and comes back.

  FR-CSS-08-05        Safety Mode should stay open to every parent without a flag. The flag is not needed to turn it on.

  FR-CSS-08-06        The system shall never show the flag to the other parent.

  FR-CSS-08-07        The system should offer this feature only after the agency has agreed and the advocates have approved.

  FR-CSS-08-08        If the flag cannot be read, the system should show no offer and should guess nothing. It should log the failure.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                 **When**                                                                                      **Then**                                                                                         **Covers**
  -------------- ----------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------ ----------------------------
  AC-CSS-08-01   A state whose agency allowed it and whose advocates approved it, and a case with a flag   The next load reads the flag                                                                  The parent is offered Safety Mode (MSGT-06)                                                      FR-CSS-08-01, FR-CSS-08-02

  AC-CSS-08-02   An offer of Safety Mode                                                                   The parent does nothing                                                                       Safety Mode stays off                                                                            FR-CSS-08-02

  AC-CSS-08-03   A case with a flag                                                                        A tester looks at the app and at the stored data                                              The value of the flag is not shown and not stored, and only the offer and the answer are saved   FR-CSS-08-03

  AC-CSS-08-04   A parent who declined the offer                                                           The next loads run with the flag still present, and later the flag goes away and comes back   No second offer shows at first, and one new offer shows after the flag comes back                FR-CSS-08-04

  AC-CSS-08-05   A parent whose case has no flag                                                           The parent turns Safety Mode on in the settings                                               Safety Mode turns on                                                                             FR-CSS-08-05

  AC-CSS-08-06   A case with a flag                                                                        The other parent opens the app                                                                Nothing about the flag shows to the other parent                                                 FR-CSS-08-06

  AC-CSS-08-07   A state whose agency has not agreed, or a release before the advocates approved           A parent looks for the offer                                                                  The offer does not exist                                                                         FR-CSS-08-07

  AC-CSS-08-08   A flag that cannot be read                                                                A load runs                                                                                   No offer shows, nothing is guessed and the failure is in the log                                 FR-CSS-08-08
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-09 Child support notice as an extra invite channel

US-CSS-09-01. As a parent whose co-parent is not on the app, I want the agency notice to carry an invite, so that my co-parent can join.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-09-01        Where the agency agrees, the system should let a parent choose Invite through agency notice. The system sends a one-time invite code to the agency for the next notice to the other parent of the case.

  FR-CSS-09-02        The system should use the invite channel Agency notice.

  FR-CSS-09-03        The invite code should work once and should be valid for 60 days.

  FR-CSS-09-04        A person who uses the code should create an account with two-factor sign-in and join as the co-parent, and the household should become Linked.

  FR-CSS-09-05        The system shall not offer this channel to a user in Safety Mode.

  FR-CSS-09-06        The parent should be able to cancel the invite before it is used.

  FR-CSS-09-07        The system should log the request, the send and the use of the code as a contact attempt.

  FR-CSS-09-08        The notice should carry only the code and the name of the app, and nothing else about the parent.

  FR-CSS-09-09        When the agency does not accept this channel, the system should not offer it. If a code is used after it expired, after it was cancelled or a second time, the system should refuse it and show ERR-06.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                           **When**                                                **Then**                                                                    **Covers**
  -------------- ------------------------------------------------------------------- ------------------------------------------------------- --------------------------------------------------------------------------- ----------------------------
  AC-CSS-09-01   A state whose agency agreed                                         A parent chooses Invite through agency notice           A request with a one-time code goes to the agency                           FR-CSS-09-01

  AC-CSS-09-02   A parent with an invite that is still valid                         The parent sends an invite through the agency notice    The earlier invite expires and only the new one is valid                    FR-CSS-09-02

  AC-CSS-09-03   An invite code that is 61 days old, and one that was already used   Someone uses each                                       Both are refused and ERR-06 shows                                           FR-CSS-09-03, FR-CSS-09-09

  AC-CSS-09-04   A valid code                                                        The other parent creates an account and uses the code   The other parent joins as the co-parent and the household is Linked         FR-CSS-09-04

  AC-CSS-09-05   A parent in Safety Mode                                             The parent opens the invite options                     Invite through agency notice is not offered                                 FR-CSS-09-05

  AC-CSS-09-06   An invite code that is not yet used                                 The parent cancels it                                   The code stops working and ERR-06 shows when it is used                     FR-CSS-09-06

  AC-CSS-09-07   A request, a send and a use of a code                               Each is done                                            Each is in the contact-attempt log                                          FR-CSS-09-07

  AC-CSS-09-08   A notice that carries a code                                        The other parent reads it                               It has the code and the name of the app and nothing else about the parent   FR-CSS-09-08

  AC-CSS-09-09   A state whose agency does not accept the channel                    A parent opens the invite options                       Invite through agency notice is not offered                                 FR-CSS-09-09
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-10 Unified child support timeline

US-CSS-10-01. As a parent, I want one timeline of everything about child support, so that I see the whole story in order.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**               **Requirement**
  -------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-10-01         The system should show one timeline in time order of the agency payments, the payments the parent recorded, the hearings, the deadlines, the due dates, the notices and the expenses.

  FR-CSS-10-02         The system should show on each entry its type and its source, Agency or You.

  FR-CSS-10-03         The system should let the parent filter the timeline by type and by date range.

  FR-CSS-10-04         The system should show the timeline only to the linked parent. Another person sees an item only when the parent shares it (CSS-13).

  FR-CSS-10-05         The notices in the timeline should be the notices and forms that the agency lists with a hearing, a deadline or a required document. The system should not pull a separate notice feed.

  FR-CSS-10-06         The system should include the timeline in an export only when the parent selects it.

  FR-CSS-10-07         ---

  FR-CSS-10-08         When there is nothing to show, the system should show MSGT-07.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                    **When**                                                     **Then**                                                                           **Covers**
  -------------- ------------------------------------------------------------ ------------------------------------------------------------ ---------------------------------------------------------------------------------- --------------
  AC-CSS-10-01   A case with payments, a hearing, a due date and an expense   The parent opens the timeline                                All the entries show in time order                                                 FR-CSS-10-01

  AC-CSS-10-02   A timeline                                                   The parent looks at the entries                              Each shows its type and the source Agency or You                                   FR-CSS-10-02

  AC-CSS-10-03   A timeline                                                   The parent filters by the type Hearing and by a date range   Only hearings in the range show                                                    FR-CSS-10-03

  AC-CSS-10-04   A case of Parent A with one shared hearing                   Parent B opens the app                                       Parent B sees no timeline and sees only the shared hearing                         FR-CSS-10-04

  AC-CSS-10-05   A hearing with a notice and a form listed by the agency      The parent opens the timeline                                The notice and the form show with the hearing and no separate notice feed exists   FR-CSS-10-05

  AC-CSS-10-06   A parent who exports a record                                The parent does not select the timeline                      The export has no timeline                                                         FR-CSS-10-06

  AC-CSS-10-07   A release before the interviews support the timeline         A parent looks for it                                        The timeline is not offered                                                        FR-CSS-10-07

  AC-CSS-10-08   A linked case with no data yet                               The parent opens the timeline                                MSGT-07 shows                                                                      FR-CSS-10-08
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-11 Hearing packet export

US-CSS-11-01. As a parent, I want one export for a hearing, so that I bring the facts in one place.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-11-01        The system should let a parent create a hearing packet for one hearing.

  FR-CSS-11-02        The parent chooses what goes in: the agency case data (status, order, payments, arrears), the recorded payments with their statuses and flags, the hearing with its required documents, and chosen expense proofs. Agency data goes in only when the parent selects it.

  FR-CSS-11-03        The packet should show on every agency value its source and the time it was last updated.

  FR-CSS-11-04        The packet should have a record ID and a public check page.

  FR-CSS-11-05        The packet should say that it is a court-ready record, that the agency decides what counts and that a court decides. It should never say court approved.

  FR-CSS-11-06        The system should create the packet as a PDF and never ask for payment.

  FR-CSS-11-07        Only the parent who linked the case can create the packet. A professional reads it only when the parent shares it.

  FR-CSS-11-08        The system should offer the packet only after legal review of its wording is recorded as done.

  FR-CSS-11-09        If a packet cannot be created, the system should show ERR-07 and should not create it.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                               **When**                                                                    **Then**                                                                                                                                    **Covers**
  -------------- ------------------------------------------------------- --------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-CSS-11-01   A linked case with a hearing                            The parent creates a packet for the hearing                                 A packet for that hearing is created                                                                                                        FR-CSS-11-01

  AC-CSS-11-02   A packet that the parent builds                         The parent does not select agency data, and later selects it                The first packet has no agency data and the second has it                                                                                   FR-CSS-11-02

  AC-CSS-11-03   A packet with agency values                             The parent opens it                                                         Each agency value shows its source and the time of its last update                                                                          FR-CSS-11-03

  AC-CSS-11-04   A created packet                                        Anyone opens the public check page with the record ID                       The page confirms the packet                                                                                                                FR-CSS-11-04

  AC-CSS-11-05   A packet                                                The parent reads it                                                         It says that it is a court-ready record, that the agency decides what counts and that a court decides, and it does not say court approved   FR-CSS-11-05

  AC-CSS-11-06   A household                                             The parent creates a packet                                                 A PDF is created and no payment is asked                                                                                                    FR-CSS-11-06

  AC-CSS-11-07   A packet of Parent A                                    Parent B, and a professional with whom Parent A shared it, try to open it   Parent B cannot and the professional can                                                                                                    FR-CSS-11-07

  AC-CSS-11-08   A release before the legal review is recorded as done   A parent looks for the packet                                               The packet is not offered                                                                                                                   FR-CSS-11-08

  AC-CSS-11-09   A packet that cannot be created                         The parent asks for it                                                      Nothing is created and ERR-07 shows                                                                                                         FR-CSS-11-09
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-12 Sync engine: one integration layer, one connector for each state, API calls, batch loads and monitoring (proposed)

US-CSS-12-01. As the owner of the product, I want one sync engine with a connector for each state, so that a new state does not change the app.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-12-01      The system shall talk to agencies only through one internal integration layer and never to a state directly from a screen or from another module.

  FR-CSS-12-02      The system shall have one connector for each state. The connector handles the API and the batch format of that state and turns the data into one common format.

  FR-CSS-12-03      The common format shall hold the case status, the order amount, the payments, the arrears, the balance, the due dates, the hearings, the deadlines and the documents.

  FR-CSS-12-04      Adding a state shall mean adding a connector. The rest of the app does not change.

  FR-CSS-12-05      An API call shall start only when a parent links a case or asks for a refresh.

  FR-CSS-12-06      Each API call shall have a time limit of 10 seconds and up to 3 retries, and shall respect the rate limits of the agency.

  FR-CSS-12-07      If the API is down, the system shall show the last good data marked with its age.

  FR-CSS-12-08      A scheduled job shall collect or receive the agency file at the times agreed with the agency. Files shall move by an encrypted method that the agency approves.

  FR-CSS-12-09      The system shall check every file before it loads it: it is complete, the format is right and the record counts match. A file that fails the check is held back and reported to support staff.

  FR-CSS-12-10      The system shall load only records of linked cases. It shall discard every other record without storing it, and shall delete the raw file after it was checked and loaded.

  FR-CSS-12-11      After each load, the system shall compare the agency payments with the payments that parents recorded and raise flags (CSS-03).

  FR-CSS-12-12      Each load shall write a log entry with the file name, the time, and the number of records loaded and rejected. A failed or late load shall alert the on-call engineer and support within 30 minutes, and the manager shall get a weekly load report.

  FR-CSS-12-13      The system shall load payments, arrears, balance and due dates once a day. It shall load hearings and deadlines once a day, and also on a refresh where the state offers an API.

  FR-CSS-12-14      Where both channels give different values, the system shall show the newer agency value and log both.

  FR-CSS-12-15      Until the specification of the first state is available, the team shall build and test against a simulator that follows the common format. Test and development use fake data only.

  FR-CSS-12-16      The system shall not load live agency data before the data sharing agreement, the security review, the staff background checks and the pilot approval are done.

  FR-CSS-12-17      The system shall log every sync action, so that a parent or support staff can see what was pulled or sent and when.

  FR-CSS-12-18      The system shall not offer the sync for a state that has neither an API nor a batch process.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                     **When**                                              **Then**                                                                                                                                 **Covers**
  -------------- --------------------------------------------------------------------------------------------- ----------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-CSS-12-01   The code of the app                                                                           A tester checks every call to an agency               Every call goes through the integration layer and none goes straight from a screen or a module                                           FR-CSS-12-01

  AC-CSS-12-02   Two states with different formats                                                             Both are connected                                    Each has its own connector and the app shows the data of both in the same common format                                                  FR-CSS-12-02

  AC-CSS-12-03   A connector that loads a case                                                                 The load finishes                                     The common format holds all nine kinds of data named in FR-CSS-12-03                                                                     FR-CSS-12-03

  AC-CSS-12-04   A new state                                                                                   Its connector is added                                No other part of the app has to change                                                                                                   FR-CSS-12-04

  AC-CSS-12-05   A parent who links a case, and a parent who asks for a refresh                                Each acts                                             An API call starts for each, and no call starts without one of these two actions                                                         FR-CSS-12-05

  AC-CSS-12-06   An agency that answers after 11 seconds, and an agency that fails twice and then answers      The system calls each                                 The first call stops at 10 seconds, the second works after 2 retries, no call has more than 3 retries, and the rate limit is kept        FR-CSS-12-06

  AC-CSS-12-07   An API that is down                                                                           A parent opens the case                               The last good data shows, marked with its age                                                                                            FR-CSS-12-07

  AC-CSS-12-08   A batch schedule agreed with an agency                                                        The time arrives                                      The file is collected or received by the approved encrypted method                                                                       FR-CSS-12-08

  AC-CSS-12-09   A file that is incomplete, one with a wrong format and one whose record counts do not match   The loads run                                         All three are held back and reported to support staff, and none is loaded                                                                FR-CSS-12-09

  AC-CSS-12-10   A file with 3 linked cases and 7 unlinked cases                                               The load runs                                         Only the 3 cases load, the 7 are discarded and not stored, and the raw file is deleted after the load                                    FR-CSS-12-10

  AC-CSS-12-11   A load that finishes                                                                          The comparison runs                                   Flags are raised for the differences                                                                                                     FR-CSS-12-11

  AC-CSS-12-12   A load that fails and a load that is late                                                     Each happens                                          A log entry exists for each, the on-call engineer and support are alerted within 30 minutes, and the manager gets a weekly load report   FR-CSS-12-12

  AC-CSS-12-13   A state with an API                                                                           Payments change and a hearing changes at the agency   The payments show after the next daily load, and the hearing shows after the daily load or at once after a refresh                       FR-CSS-12-13

  AC-CSS-12-14   Both channels with different values                                                           Both arrive                                           The newer agency value shows and both are logged                                                                                         FR-CSS-12-14

  AC-CSS-12-15   A team without the specification of the first state                                           They build and test                                   They use a simulator with the common format and fake data only                                                                           FR-CSS-12-15

  AC-CSS-12-16   A first state whose approvals are not done                                                    The team tries to load live data                      The live data does not load                                                                                                              FR-CSS-12-16

  AC-CSS-12-17   A sync action                                                                                 It happens                                            It is in the sync log with what was pulled or sent and when                                                                              FR-CSS-12-17

  AC-CSS-12-18   A state with neither an API nor a batch process                                               A parent looks for the state                          The sync is not offered for that state                                                                                                   FR-CSS-12-18
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CSS-13 Share one agency item with the co-parent or a professional (proposed)

US-CSS-13-01. As a linked parent, I want to share one agency item for a limited time, so that the other person sees only what I choose.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**              **Requirement**
  ------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-CSS-13-01        The system shall let the linked parent share one item with the co-parent or a professional. An item is a payment summary, a hearing, a deadline or a due date.

  FR-CSS-13-02        A payment summary shall be the payments in a date range that the parent chooses, with the date and the amount of each.

  FR-CSS-13-03        When the parent shares an item, the system shall let the parent choose an expiry of 7, 30 or 90 days. The default is 30 days.

  FR-CSS-13-04        The system shall let the parent stop sharing at any time.

  FR-CSS-13-05        The system shall show the recipient the item as read-only, with the label Shared by \[name\] and the source and the last-synced time.

  FR-CSS-13-06        The system shall remove a stopped or expired item from the view of the recipient.

  FR-CSS-13-07        The system shall share only the chosen item, never the case and never another item.

  FR-CSS-13-08        A shared hearing, deadline or due date shall show in the calendar of the recipient, and the reminders of the Notifications module shall follow.

  FR-CSS-13-09        The system shall tell the recipient through the Notifications module that an item was shared. A recipient in Safety Mode gets an alert with no details.

  FR-CSS-13-10        The system shall log every share and every stop with the parent, the item, the recipient and the time.

  FR-CSS-13-11        If an item cannot be shared, the system shall show ERR-08 and shall not share it.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                             **When**                                               **Then**                                                                                                        **Covers**
  -------------- ------------------------------------------------------------------------------------- ------------------------------------------------------ --------------------------------------------------------------------------------------------------------------- ----------------------------
  AC-CSS-13-01   A linked parent                                                                       They share one hearing with the co-parent              The co-parent sees that hearing as read-only and nothing else                                                   FR-CSS-13-01, FR-CSS-13-07

  AC-CSS-13-02   A parent who shares a payment summary for January to March                            The summary is created                                 It has the date and the amount of each payment in that range and no other payment                               FR-CSS-13-02

  AC-CSS-13-03   A parent who shares an item without choosing an expiry, and one who chooses 90 days   Both share                                             The first item expires after 30 days and the second after 90 days                                               FR-CSS-13-03

  AC-CSS-13-04   A shared item                                                                         The parent stops sharing                               The item disappears at once for the recipient                                                                   FR-CSS-13-04, FR-CSS-13-06

  AC-CSS-13-05   A shared item                                                                         The recipient opens it                                 It shows as read-only with Shared by \[name\], the source and the last-synced time                              FR-CSS-13-05

  AC-CSS-13-06   A shared item whose expiry has passed                                                 The recipient opens the app                            The item no longer shows                                                                                        FR-CSS-13-06

  AC-CSS-13-07   A shared hearing                                                                      The recipient looks for the case and for other items   Only that one hearing shows                                                                                     FR-CSS-13-07

  AC-CSS-13-08   A shared hearing                                                                      The recipient opens the calendar                       The hearing shows and its reminders follow                                                                      FR-CSS-13-08

  AC-CSS-13-09   A shared item                                                                         The sharing is saved                                   The recipient is told that an item was shared (MSGT-08), with no details when the recipient is in Safety Mode   FR-CSS-13-09

  AC-CSS-13-10   A share and a stop                                                                    Each is done                                           One log entry exists for each                                                                                   FR-CSS-13-10

  AC-CSS-13-11   An item that cannot be shared                                                         The parent shares it                                   Nothing is shared and ERR-08 shows                                                                              FR-CSS-13-11
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

9.2 Data reference

  ---------------------------------------------------------------------------------------------------------------------
  **Entity**                  **Fields used**
  --------------------------- -----------------------------------------------------------------------------------------
  User                        user_id

  Household                   mode (Linked, Solo)

  Invite                      channel (Agency notice), status

  Audit log entry             actor, action, object, result, time

  Child support case link     link_id, user_id, state, consent_recorded_at, status (Linked, Unlinked), last_synced_at
  ---------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**              **Type**        **Required**   **Notes**
  ---------------------- --------------- -------------- ----------------------------------------------------------------------------------------------
  agency_case_ref        Text            Yes            The case ID. Kept encrypted and shown masked. A full Social Security number is never stored.

  case_type              Text            No             As the agency gives it

  linked_at              Date and time   Yes            UTC

  unlinked_at            Date and time   No             UTC

  failed_matches_today   Number          Yes            Reset each day. At 5 the linking stops for 24 hours.

  linking_locked_until   Date and time   No             UTC
  ----------------------------------------------------------------------------------------------------------------------------------------------------

8.3 New entities (proposed). The sources name none of these fields. They are a BA proposal.

Consent record

  --------------------------------------------------------------------------------------
  **Field**         **Type**            **Required**   **Notes**
  ----------------- ------------------- -------------- ---------------------------------
  consent_id        Unique ID           Yes            System generated

  link_id           Link to Case link   Yes            ---

  wording_version   Text                Yes            The version of the consent text

  accepted_at       Date and time       Yes            UTC. Cannot be changed.
  --------------------------------------------------------------------------------------

Agency value

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**           **Type**            **Required**   **Notes**
  ------------------- ------------------- -------------- ---------------------------------------------------------------------------------------------------------
  value_id            Unique ID           Yes            System generated

  link_id             Link to Case link   Yes            ---

  item_type           Choice              Yes            Case status, Order amount, Arrears, Balance, Due date, Hearing, Deadline, Required document, Case event

  content             Text                Yes            As the agency gave it

  source              Choice              Yes            API, Batch

  agency_updated_at   Date and time       No             UTC. As the agency gives it.

  loaded_at           Date and time       Yes            UTC

  status              Choice              Yes            Current, Superseded, Removed by the agency
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

Agency payment

  ------------------------------------------------------------------------------
  **Field**          **Type**            **Required**   **Notes**
  ------------------ ------------------- -------------- ------------------------
  payment_id         Unique ID           Yes            System generated

  link_id            Link to Case link   Yes            ---

  paid_on            Date                Yes            As the agency gives it

  amount             Amount              Yes            In US dollars

  type_as_given      Text                No             As the agency gives it

  source             Choice              Yes            API, Batch

  loaded_at          Date and time       Yes            UTC
  ------------------------------------------------------------------------------

Payment match

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**            **Type**                      **Required**   **Notes**
  -------------------- ----------------------------- -------------- ------------------------------------------------------------------------------------------------
  match_id             Unique ID                     Yes            System generated

  link_id              Link to Case link             Yes            ---

  expense_payment_id   Link to a payment of EXP-07   No             Empty for an agency payment that is not recorded

  agency_payment_id    Link to Agency payment        No             Empty for a recorded payment that is not on the agency record

  status               Choice                        Yes            Recorded by you, Matched with agency, Not on agency record, Sent to agency, Credited by agency

  flag                 Choice                        Yes            None, Recorded payment not on the agency record, Agency payment not recorded, Amounts differ

  flag_dismissed_at    Date and time                 No             UTC

  flag_note            Text                          No             The note of the parent when the flag is dismissed

  evaluated_at         Date and time                 Yes            UTC. Set at each comparison.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------

Share

  -----------------------------------------------------------------------------------------------------------
  **Field**             **Type**            **Required**   **Notes**
  --------------------- ------------------- -------------- --------------------------------------------------
  share_id              Unique ID           Yes            System generated

  link_id               Link to Case link   Yes            ---

  item_type             Choice              Yes            Payment summary, Hearing, Deadline, Due date

  item_ref              Text                Yes            The item, or the date range of a payment summary

  shared_with_user_id   Link to User        Yes            The co-parent or a professional

  shared_at             Date and time       Yes            UTC

  expires_at            Date and time       Yes            UTC. 7, 30 or 90 days after shared_at.

  stopped_at            Date and time       No             UTC
  -----------------------------------------------------------------------------------------------------------

Load log entry

  ---------------------------------------------------------------------------------------------------------------------
  **Field**          **Type**          **Required**   **Notes**
  ------------------ ----------------- -------------- -----------------------------------------------------------------
  load_id            Unique ID         Yes            System generated

  state              Choice            Yes            ---

  channel            Choice            Yes            API, Batch

  file_name          Text              No             For a batch

  started_at         Date and time     Yes            UTC

  finished_at        Date and time     No             UTC

  records_loaded     Number            No             ---

  records_rejected   Number            No             ---

  result             Choice            Yes            Success, Held back, Failed, Late. The log holds no case values.
  ---------------------------------------------------------------------------------------------------------------------

9.3 Interfaces

INT-01 and INT-02 are with the agencies. INT-10 is with the monitoring of ParentPath. The others are with other modules of the app.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **With**                      **What passes**                                                                                                                                           **Features**
  ---------- ----------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------
  INT-01     Child support agency, API     Actions that a parent starts: the link and the identity check, a refresh, and later the sending of records and the reading of the family violence flag.   CSS-01, CSS-02, CSS-06, CSS-08

  INT-02     Child support agency, batch   Scheduled files come in. Later, files go out where the state accepts them.                                                                                CSS-02, CSS-04, CSS-05, CSS-06, CSS-12

  INT-03     Accounts and Onboarding       Two-factor sign-in and the household mode come in. Invites go out.                                                                                        CSS-01, CSS-09

  INT-04     Expenses and Payments         Payments recorded in EXP-07 come in. Statuses go back. Expense proofs come in.                                                                            CSS-03, CSS-06, CSS-10

  INT-05     Calendar and Parenting Time   Hearings, deadlines and due dates go in as read-only agency items.                                                                                        CSS-05

  INT-06     Notifications                 Dates go out for reminders. The alert for a shared item goes out.                                                                                         CSS-04, CSS-05, CSS-13

  INT-07     Safety and Privacy            The offer of Safety Mode goes out. The Safety Mode flag of a user comes in.                                                                               CSS-08, CSS-09, CSS-13

  INT-08     Records and Court             Proof packages, hearing packets and exports with agency data go out.                                                                                      CSS-06, CSS-11

  INT-09     Professionals and Access      Items that a parent shares go out as read-only.                                                                                                           CSS-13

  INT-10     Monitoring and alerting       Load results and failures go to the on-call engineer and to support.                                                                                      CSS-12
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

9.4 Non-functional requirements

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Requirement**                                                                                                                                                                    **Where it applies here**
  -------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------
  NFR-01         Two-factor sign-in for every account (100 percent of accounts).                                                                                                                    FR-CSS-01-01

  NFR-02         Encryption in transit and at rest                                                                                                                                                  Agency data, case IDs, files and logs

  NFR-03         Role-based access on every request                                                                                                                                                 FR-CSS-01-12, FR-CSS-13-07

  NFR-04         Sign-ins, changes and sync actions are logged with actor, time and result                                                                                                          FR-CSS-01-15, FR-CSS-02-13, FR-CSS-12-17

  NFR-06         Collect only the data that is needed                                                                                                                                               FR-CSS-01-05 (no Social Security number is stored), FR-CSS-12-10

  NFR-14 (new)   Every agency value shows its source (API or batch) and the last-synced time. There is one batch load a day. A warning shows when data is more than 2 days old.                     CSS-07, CSS-12

  NFR-15 (new)   Secure sign-in to the agency. A time limit of 10 seconds and up to 3 retries on every API call. The rate limits of the agency are respected. The final limits follow the agency.   FR-CSS-12-06

  NFR-16 (new)   Encrypted transfer of files. An agreed schedule. Every file is checked before loading. Raw files are removed after loading.                                                        FR-CSS-12-08 to FR-CSS-12-10

  NFR-17 (new)   A failed or late load alerts support within 30 minutes.                                                                                                                            FR-CSS-12-12
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
