# Calendar and Parenting Time (CAL)


7.1 Module overview

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Item**                **Description**
  ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------
  Purpose                 Holds the custody schedule and everything that changes it and gives both parents the same view of who has the child and when.

  Users                   Parent, co-parent, third parties (view)

  Pain points addressed   P06, P08, P14

  Features                11 (2 Must-have, 9 Good-to-have, 0 Unique)

  Depends on              Notifications (reminders), Child Support Sync (hearings and deadlines appear here), Safety and Privacy (check-ins), Records and Court.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

-   A shared calendar as the base of the app.

-   Two-way sync with Google, Apple and Outlook calendars, with an ICS feed as a fallback and one clear rule when two entries conflict.

-   An audit trail that keeps original event details. An event that has already started cannot be deleted.

-   Location check-ins at exchanges (switched off in Safety Mode) and pet schedules, both later.

Purpose and scope

2.1 Purpose. This module holds the custody schedule and everything that changes it. It gives both parents the same view of who has the child and when.

  ----------------------------------------------------------------------------------------------------------------------------
  **ID**             **How this module supports it**
  ------------------ ---------------------------------------------------------------------------------------------------------
  OBJ-01             Requests, approvals and the history of every entry are part of the court-ready record (CAL-02, CAL-10).

  OBJ-02             Hearings and deadlines from the agency record appear in the calendar (CAL-01).

  OBJ-03             Fixes the High-rated pain point P06 (CAL-02, CAL-10).

  OBJ-05             Event locations and check-ins follow Safety Mode (CAL-01, CAL-09).
  ----------------------------------------------------------------------------------------------------------------------------

2.3 In scope. The eleven features CAL-01 to CAL-11 listed in section 5.

7.2 Roles and permissions

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  **Role**              **What they do in this module**
  --------------------- ------------------------------------------------------------------------------------------------------------------------------------
  Parent                Adds events and parenting time, sends and answers schedule change requests, builds schedules, tracks parenting time and checks in.

  Co-parent             The same as the Parent, once linked.

  Third party           Sees the parts of the calendar the parents allow, view only (ACC-07).

  Child                 Views the calendar as the parents allow (ACC-07).

  Professional          Reads the calendar entries and reports that a parent shares. Cannot post.

  Support staff         No feature in this module.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

7.3 Business requirements

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Business requirement**                                                                                                                        **Features**
  --------------- ----------------------------------------------------------------------------------------------------------------------------------------------- ---------------
  BREQ-01         Both parents share one calendar that shows parenting time and events, so both see who has the child and when.                                   CAL-01

  BREQ-02         A parent can ask for a schedule change or a swap, and the co-parent answers with a confirm step and an undo window. Every approval is logged.   CAL-02

  BREQ-03         Parents can set up a custody schedule from a template or build their own.                                                                       CAL-03

  BREQ-04         Holidays can override the base schedule.                                                                                                        CAL-04

  BREQ-05         A parent can sync the calendar with Google, Apple and Outlook calendars, with an ICS feed as a fallback.                                        CAL-05

  BREQ-06         Parents can record the parenting time that really happened.                                                                                     CAL-06

  BREQ-07         Parents can see how well the schedule is followed.                                                                                              CAL-07

  BREQ-08         Parents can build a parenting plan by answering questions.                                                                                      CAL-08

  BREQ-09         A parent can check in at an exchange.                                                                                                           CAL-09

  BREQ-10         The calendar keeps the original details of every change, and an event that has started cannot be deleted.                                       CAL-10

  BREQ-11         Parents can keep pet schedules and pet expenses.                                                                                                CAL-11
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

7.4 Features

  -------------------------------------------------------------------------------------------------------------------------------
  **Feature**   **Name**                                                                            **Type**
  ------------- ----------------------------------------------------------------------------------- -----------------------------
  CAL-01        Shared calendar                                                                     Must-have → Must-have

  CAL-02        Schedule change and swap requests with confirm step, undo window and approval log   Must-have → Must-have

  CAL-03        Custody schedule templates and schedule builder                                     Good-to-have → Good-to-have

  CAL-04        Holiday scheduling and overrides                                                    Good-to-have → Good-to-have

  CAL-05        Two-way sync with Google, Apple and Outlook calendars                               Good-to-have → Good-to-have

  CAL-06        Parenting-time tracking                                                             Good-to-have → Good-to-have

  CAL-07        Parenting-time analytics and compliance view                                        Good-to-have → Good-to-have

  CAL-08        Parenting plan builder                                                              Good-to-have → Good-to-have

  CAL-09        Check-ins at exchanges (location)                                                   Good-to-have → Good-to-have

  CAL-10        Calendar audit trail (edit and delete history)                                      Good-to-have → Must-have

  CAL-11        Pet schedules and pet expenses                                                      Good-to-have → Good-to-have
  -------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  **Submodule ID**   **Submodule**             **Screens**
  ------------------ ------------------------- ----------------------------------------------------------------------------------------------------------
  CAL-SUB-01         Calendar view             Day view; week view; month view; event detail

  CAL-SUB-02         Event management          Create/edit event; repeat settings; cancel event; overlap warning

  CAL-SUB-03         Parenting time            Create parenting-time entry; proposed/active status; color-coded display

  CAL-SUB-04         Change requests           Create swap/change request; request detail; approve/decline with confirm; undo approval; request history

  CAL-SUB-05         Audit                     Entry history; change/delete history

  CAL-SUB-06         Templates                 Template list; schedule builder; preview

  CAL-SUB-07         Holidays                  Holiday list; holiday override

  CAL-SUB-08         External sync             Google/Outlook connection; ICS feed

  CAL-SUB-09         Parenting-time tracking   Actual-time entry; reports

  CAL-SUB-10         Check-ins                 Exchange check-in
  -------------------------------------------------------------------------------------------------------------------------------------------------------

7.5 Screen inventory

  ---------------------------------------------------------------------------
  **Screen ID**   **Screen**                                 **Feature**
  --------------- ------------------------------------------ ----------------
  CAL-SCR-01      Calendar (day, week and month views)       CAL-01

  CAL-SCR-02      Event form                                 CAL-01

  CAL-SCR-03      Parenting time form                        CAL-01

  CAL-SCR-04      Schedule change request form               CAL-02

  CAL-SCR-05      Request detail, answer and undo            CAL-02

  CAL-SCR-06      Entry history and request history          CAL-02, CAL-10

  CAL-SCR-07      Schedule templates and builder             CAL-03

  CAL-SCR-08      Holidays                                   CAL-04

  CAL-SCR-09      Calendar sync settings                     CAL-05

  CAL-SCR-10      Exchange record                            CAL-06

  CAL-SCR-11      Compliance view                            CAL-07

  CAL-SCR-12      Parenting plan builder                     CAL-08

  CAL-SCR-13      Check-in                                   CAL-09

  CAL-SCR-14      Pets                                       CAL-11
  ---------------------------------------------------------------------------

7.6 Screen specifications

CAL-SCR-01 --- Calendar (week view)

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-01
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-01
  -------------------------------------------------------------------------

![Figure CAL-SCR-01 --- Calendar (week view)](media/0d05714645bd6e95e1132096a66617739701101d.png "Figure CAL-SCR-01 — Calendar (week view)"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-01 --- Calendar (week view)*

**Navigation**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    Main menu \> Calendar; ACC-SCR-19 Home; CAL-SCR-02 Event form; CAL-SCR-03 Parenting time form; CAL-SCR-04 Schedule change request; CAL-SCR-05 Request detail, answer and undo; CAL-SCR-06 Entry and request history; CAL-SCR-07 Schedule templates and builder; CAL-SCR-08 Holidays; CAL-SCR-09 Calendar sync settings; CAL-SCR-10 Exchange record; CAL-SCR-11 Compliance view; CAL-SCR-12 Parenting plan builder; NTF-SCR-B02 Reminder alert
  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   CAL-SCR-02 Event form; CAL-SCR-03 Parenting time form; CAL-SCR-04 Schedule change request; CAL-SCR-05 Request detail, answer and undo; CAL-SCR-07 Schedule templates and builder; CAL-SCR-08 Holidays; CAL-SCR-09 Calendar sync settings; CAL-SCR-10 Exchange record; CAL-SCR-11 Compliance view; CAL-SCR-12 Parenting plan builder; CSS-SCR-06 Agency items in the calendar; Main menu: any module

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show all calendar entries for one day.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Calendar: Day View\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Selected date (P-CAL-001-01); Day timeline (P-CAL-001-02); Event item (P-CAL-001-03); Parenting-time item (P-CAL-001-04); Parent color legend (P-CAL-001-05); Agency item (P-CAL-001-10).

-   Action area (primary action first, then secondary actions and links): Add event (P-CAL-001-06); Add parenting time (P-CAL-001-07); Request schedule change (P-CAL-001-08); View switcher (P-CAL-001-09).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                   **Required**   **Editable**   **Default**   **Allowed values / validation**                             **Error**               **Visibility**                                **Saved to**            **Behavior**
  ------------------ ------------------------- -------------------------- -------------- -------------- ------------- ----------------------------------------------------------- ----------------------- --------------------------------------------- ----------------------- -------------------------------------------------------
  P-CAL-001-01       Selected date             Date picker / display      Yes            Yes            Today         Valid calendar date                                         ---                     Parent / Co-parent                            View state              Changes displayed day

  P-CAL-001-02       Day timeline              Calendar grid              ---            ---            ---           Displays entries by time                                    Load error with retry   Parent / Co-parent                            ---                     Displays events and parenting time

  P-CAL-001-03       Event item                Clickable card             System         No             Derived       Title, time, status                                         ---                     Visible per entry permissions                 CalendarEvent           Opens CLL-SCR-04 Call screen

  P-CAL-001-04       Parenting-time item       Clickable card             System         No             Derived       Parent name, time, status, parent color                     ---                     Parent / Co-parent                            ParentingTimeEntry      Opens CLL-SCR-06 Call log, recordings and transcripts

  P-CAL-001-05       Parent color legend       Legend                     System         No             Derived       One color per parent                                        ---                     Parent / Co-parent                            User/calendar setting   Display only

  P-CAL-001-06       Add event                 Primary button             ---            ---            ---           ---                                                         ---                     Parent / Co-parent                            ---                     Opens CLL-SCR-05 Recording request

  P-CAL-001-07       Add parenting time        Primary button             ---            ---            ---           ---                                                         ---                     Parent / Co-parent                            ---                     Opens CLL-SCR-01 Calling settings

  P-CAL-001-08       Request schedule change   Button / menu item         ---            ---            ---           Linked household only                                       ---                     Parent / Co-parent                            ---                     Opens CAL-SCR-04 Schedule change request

  P-CAL-001-09       View switcher             Tabs / segmented control   Yes            Yes            Day           Day; Week; Month                                            ---                     Parent / Co-parent                            View state              Switches calendar view

  P-CAL-001-10       Agency item               Read-only card             System         No             Derived       Hearing, deadline, due date; source and last-updated time   ---                     Linking parent; other parent only if shared   Agency calendar item    Display only; no edit
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------------------------
  **State**                 **Behavior**
  ------------------------- -------------------------------------------------------------------
  Empty                     "No entries for this day"; Add event / Add parenting time actions

  Loading                   Calendar skeleton

  Error                     Load failure and retry

  Success                   Day entries displayed
  ---------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show seven days of calendar entries.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Calendar: Week View\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Week start date (P-CAL-002-01); Week grid (P-CAL-002-02); Event item (P-CAL-002-03); Parenting-time item (P-CAL-002-04).

-   Action area (primary action first, then secondary actions and links): Add event (P-CAL-002-05); Add parenting time (P-CAL-002-06); View switcher (P-CAL-002-07); Previous / next week (P-CAL-002-08).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                **Required**   **Editable**   **Default**    **Allowed values / validation**   **Error**               **Visibility**       **Saved to**         **Behavior**
  ------------------ ------------------------- ----------------------- -------------- -------------- -------------- --------------------------------- ----------------------- -------------------- -------------------- -------------------------------------------------------
  P-CAL-002-01       Week start date           Date display / picker   Yes            Yes            Current week   Valid date                        ---                     Parent / Co-parent   View state           Changes displayed week

  P-CAL-002-02       Week grid                 Calendar grid           ---            ---            ---            Seven-day columns                 Load error with retry   Parent / Co-parent   ---                  Displays entries

  P-CAL-002-03       Event item                Clickable card          System         No             Derived        Title, time, status               ---                     Permission-based     CalendarEvent        Opens CLL-SCR-04 Call screen

  P-CAL-002-04       Parenting-time item       Clickable card          System         No             Derived        Parent, time, status, color       ---                     Permission-based     ParentingTimeEntry   Opens CLL-SCR-06 Call log, recordings and transcripts

  P-CAL-002-05       Add event                 Primary button          ---            ---            ---            ---                               ---                     Parent / Co-parent   ---                  Opens CLL-SCR-05 Recording request

  P-CAL-002-06       Add parenting time        Primary button          ---            ---            ---            ---                               ---                     Parent / Co-parent   ---                  Opens CLL-SCR-01 Calling settings

  P-CAL-002-07       View switcher             Tabs                    Yes            Yes            Week           Day; Week; Month                  ---                     Parent / Co-parent   View state           Switches view

  P-CAL-002-08       Previous / next week      Navigation buttons      ---            ---            ---            ---                               ---                     Parent / Co-parent   View state           Moves one week
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------
  **State**                   **Behavior**
  --------------------------- ---------------------------------------------
  Empty                       Week with no entries; add actions available

  Loading                     Week skeleton

  Error                       Load failure and retry

  Success                     Week entries displayed
  -------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show a monthly overview of entries.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Calendar: Month View\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Month grid (P-CAL-003-02); Event indicator (P-CAL-003-03); Parenting-time indicator (P-CAL-003-04).

-   Input area (form fields, in specification order): Month / year (P-CAL-003-01).

-   Action area (primary action first, then secondary actions and links): Add event (P-CAL-003-05); Add parenting time (P-CAL-003-06); View switcher (P-CAL-003-07); Previous / next month (P-CAL-003-08).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**    **Type**                     **Required**   **Editable**   **Default**     **Allowed values / validation**               **Error**               **Visibility**       **Saved to**         **Behavior**
  ------------------ -------------------------- ---------------------------- -------------- -------------- --------------- --------------------------------------------- ----------------------- -------------------- -------------------- -------------------------------------------------------
  P-CAL-003-01       Month / year               Month picker                 Yes            Yes            Current month   Valid month/year                              ---                     Parent / Co-parent   View state           Changes displayed month

  P-CAL-003-02       Month grid                 Calendar grid                ---            ---            ---             Days 1--31; recurring occurrences displayed   Load error with retry   Parent / Co-parent   ---                  Displays entries

  P-CAL-003-03       Event indicator            Compact card / dot           System         No             Derived         Title                                         ---                     Permission-based     CalendarEvent        Opens CLL-SCR-04 Call screen

  P-CAL-003-04       Parenting-time indicator   Compact card / color block   System         No             Derived         Parent color and time                         ---                     Permission-based     ParentingTimeEntry   Opens CLL-SCR-06 Call log, recordings and transcripts

  P-CAL-003-05       Add event                  Primary button               ---            ---            ---             ---                                           ---                     Parent / Co-parent   ---                  Opens CLL-SCR-05 Recording request

  P-CAL-003-06       Add parenting time         Primary button               ---            ---            ---             ---                                           ---                     Parent / Co-parent   ---                  Opens CLL-SCR-01 Calling settings

  P-CAL-003-07       View switcher              Tabs                         Yes            Yes            Month           Day; Week; Month                              ---                     Parent / Co-parent   View state           Switches view

  P-CAL-003-08       Previous / next month      Navigation buttons           ---            ---            ---             ---                                           ---                     Parent / Co-parent   View state           Moves one month
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------
  **State**                  **Behavior**
  -------------------------- ----------------------------------------------
  Empty                      Month with no entries; add actions available

  Loading                    Month skeleton

  Error                      Load failure and retry

  Success                    Month entries displayed
  -------------------------------------------------------------------------

CAL-SCR-02 --- Event form

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-02
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-01
  -------------------------------------------------------------------------

![Figure CAL-SCR-02 --- Event form](media/8cb96191d4ab57a1ea1994a371a17deff0b06025.png "Figure CAL-SCR-02 — Event form"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-02 --- Event form*

**Navigation**

  ----------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-19 Home; CAL-SCR-01 Calendar (week view)
  ----------------------- ----------------------------------------------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); CAL-SCR-06 Entry and request history; Main menu: any module

  ----------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Create or edit a calendar event.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Add / Edit Event\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Overlap warning (P-CAL-005-13).

-   Input area (form fields, in specification order): Title (P-CAL-005-01); Details (P-CAL-005-02); Date (P-CAL-005-03); Start time (P-CAL-005-04); End time (P-CAL-005-05); Location (P-CAL-005-06); Children (P-CAL-005-07); Drop-off parent (P-CAL-005-08); Pick-up parent (P-CAL-005-09); Repeats (P-CAL-005-10); Custom repeat days (P-CAL-005-11); Private event (P-CAL-005-12).

-   Action area (primary action first, then secondary actions and links): Save (P-CAL-005-14); Cancel (P-CAL-005-15).

**Parameter reference:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                 **Required**   **Editable**                                      **Default**                   **Allowed values / validation**                        **Error**              **Visibility**       **Saved to**                    **Behavior**
  ------------------ ------------------------- ------------------------ -------------- ------------------------------------------------- ----------------------------- ------------------------------------------------------ ---------------------- -------------------- ------------------------------- -------------------------------------
  P-CAL-005-01       Title                     Text input               Yes            Yes                                               Blank or current title        Required; 1--100 characters                            Inline field message   Parent / Co-parent   CalendarEvent.title             Required for save

  P-CAL-005-02       Details                   Textarea                 No             Yes                                               Blank or current value        Plain text; up to 2,000 characters                     Inline field message   Parent / Co-parent   CalendarEvent.details           Optional

  P-CAL-005-03       Date                      Date picker              Yes            Yes                                               Selected date or event date   Valid date                                             ---                    Parent / Co-parent   CalendarEvent.event_date        Sets event day

  P-CAL-005-04       Start time                Time picker              Yes            Yes                                               Blank or current value        Valid time                                             ---                    Parent / Co-parent   CalendarEvent.start_at          Required

  P-CAL-005-05       End time                  Time picker              Yes            Yes                                               Blank or current value        Must be after start                                    ERR-01                 Parent / Co-parent   CalendarEvent.end_at            Required

  P-CAL-005-06       Location                  Text input               No             Yes                                               Blank or current value        Free text / address                                    ---                    Parent / Co-parent   CalendarEvent.location          Safety Mode affects visibility

  P-CAL-005-07       Children                  Multi-select             No             Yes                                               None or current value         Household children                                     ---                    Parent / Co-parent   CalendarEvent.child_ids         Optional

  P-CAL-005-08       Drop-off parent           Select                   No             Yes                                               None or current value         Parent / Co-parent                                     ---                    Parent / Co-parent   CalendarEvent.dropoff_user_id   Optional

  P-CAL-005-09       Pick-up parent            Select                   No             Yes                                               None or current value         Parent / Co-parent                                     ---                    Parent / Co-parent   CalendarEvent.pickup_user_id    Optional

  P-CAL-005-10       Repeats                   Toggle / select          No             Yes on create; pattern immutable after creation   Does not repeat               Does not repeat; Daily; Weekly; Monthly; Custom days   Inline field message   Parent / Co-parent   CalendarEvent.repeat_rule       Enables recurrence options

  P-CAL-005-11       Custom repeat days        Multi-select / control   Conditional    Yes on create                                     None                          Days of week or custom pattern                         Inline field message   Parent / Co-parent   CalendarEvent.repeat_rule       Required when Custom selected

  P-CAL-005-12       Private event             Toggle                   Yes            Creator                                           Off                           On / off                                               ---                    Creator              CalendarEvent.visibility        Private hides event from co-parent

  P-CAL-005-13       Overlap warning           Warning message          System         No                                                Derived                       Shown when new/edited entry overlaps another           ---                    Parent / Co-parent   ---                             Allows Save anyway

  P-CAL-005-14       Save                      Primary button           ---            ---                                               ---                           ---                                                    ---                    Parent / Co-parent   Event record                    Creates or updates event

  P-CAL-005-15       Cancel                    Secondary button         ---            ---                                               ---                           ---                                                    ---                    Parent / Co-parent   ---                             Discards changes after confirmation
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -------------------------------------------------------------------------------------------
  Empty                    Blank create form

  Loading                  Save disabled

  Error                    Invalid time range: ERR-01; save failure: ERR-04; started/non-creator edit: ERR-02/ERR-03

  Success                  Event saved; return to calendar/detail
  --------------------------------------------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------------------
  **Purpose**    Edit one occurrence or all future occurrences of a repeating event.
  -------------- ---------------------------------------------------------------------

  ------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Recurring Event Edit\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Event fields (P-CAL-006-02); Repeat pattern (P-CAL-006-03).

-   Input area (form fields, in specification order): Edit scope (P-CAL-006-01).

-   Action area (primary action first, then secondary actions and links): Save changes (P-CAL-006-04); Cancel (P-CAL-006-05).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**                                        **Required**   **Editable**   **Default**                 **Allowed values / validation**           **Error**              **Visibility**   **Saved to**                **Behavior**
  ------------------ ------------------------- ----------------------------------------------- -------------- -------------- --------------------------- ----------------------------------------- ---------------------- ---------------- --------------------------- -------------------------
  P-CAL-006-01       Edit scope                Radio group                                     Yes            Yes            This occurrence             This occurrence; All future occurrences   Inline field message   Creator only     Event version               Determines update scope

  P-CAL-006-02       Event fields              Same controls as CLL-SCR-05 Recording request   Conditional    Yes            Current occurrence values   Same event validations                    ERR-01 / ERR-04        Creator only     Event occurrence(s)         Edits selected scope

  P-CAL-006-03       Repeat pattern            Read-only text                                  System         No             Current pattern             Cannot be changed                         ---                    Creator only     CalendarEvent.repeat_rule   Display only

  P-CAL-006-04       Save changes              Primary button                                  ---            ---            ---                         ---                                       ---                    Creator only     Event version               Saves selected scope

  P-CAL-006-05       Cancel                    Secondary button                                ---            ---            ---                         ---                                       ---                    Creator only     ---                         Discards changes
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- --------------------------------------------------------------------------------
  Empty                   Not applicable; opens only for recurring event

  Loading                 Save disabled

  Error                   Invalid time: ERR-01; save failure: ERR-04; started/non-creator: ERR-02/ERR-03

  Success                 Selected occurrence(s) updated
  --------------------------------------------------------------------------------------------------------

Specification

  ---------------------------------------------------------------------------
  **Purpose**    View one event and allow creator actions before it starts.
  -------------- ------------------------------------------------------------

  ---------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Event Detail\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Title (P-CAL-004-01); Details (P-CAL-004-02); Date (P-CAL-004-03); Start time (P-CAL-004-04); End time (P-CAL-004-05); Children (P-CAL-004-07); Repeat rule (P-CAL-004-10); Visibility (P-CAL-004-11); Status (P-CAL-004-12).

-   Input area (form fields, in specification order): Drop-off parent (P-CAL-004-08); Pick-up parent (P-CAL-004-09).

-   Action area (primary action first, then secondary actions and links): Location (P-CAL-004-06); Edit (P-CAL-004-13); Cancel event (P-CAL-004-14); View history (P-CAL-004-15).

**Parameter reference:**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**           **Default**         **Allowed values / validation**                     **Error**                            **Visibility**                   **Saved to**                       **Behavior**
  ------------------ ------------------------- -------------------- -------------- ---------------------- ------------------- --------------------------------------------------- ------------------------------------ -------------------------------- ---------------------------------- --------------------------------------------------------------------------------------
  P-CAL-004-01       Title                     Read-only text       Yes            Creator before start   Event title         Required                                            ---                                  Permission-based                 CalendarEvent.title                Display only

  P-CAL-004-02       Details                   Read-only text       No             Creator before start   Event details       Plain text; up to 2,000 characters                  ---                                  Permission-based                 CalendarEvent.details              Display only

  P-CAL-004-03       Date                      Read-only date       Yes            Creator before start   Event date          Valid date                                          ---                                  Permission-based                 CalendarEvent.event_date           Display only

  P-CAL-004-04       Start time                Timestamp            Yes            Creator before start   Event start         UTC storage; local display                          ---                                  Permission-based                 CalendarEvent.start_at             Display only

  P-CAL-004-05       End time                  Timestamp            Yes            Creator before start   Event end           After start                                         ---                                  Permission-based                 CalendarEvent.end_at               Display only

  P-CAL-004-06       Location                  Text / map link      No             Creator before start   Event location      Safety Mode hides from other parent until shared    ---                                  Permission-based; Safety rules   CalendarEvent.location             Display only

  P-CAL-004-07       Children                  Chip list            No             Creator before start   Selected children   Household child references                          ---                                  Permission-based                 CalendarEvent.child_ids            Display only

  P-CAL-004-08       Drop-off parent           Text                 No             Creator before start   Selected parent     Parent / Co-parent                                  ---                                  Permission-based                 CalendarEvent.dropoff_user_id      Display only

  P-CAL-004-09       Pick-up parent            Text                 No             Creator before start   Selected parent     Parent / Co-parent                                  ---                                  Permission-based                 CalendarEvent.pickup_user_id       Display only

  P-CAL-004-10       Repeat rule               Badge                System         No                     Derived             Daily; Weekly; Monthly; Custom days                 ---                                  Permission-based                 CalendarEvent.repeat_rule          Display only

  P-CAL-004-11       Visibility                Badge                System         No                     Shared or Private   Shared; Private                                     ---                                  Permission-based                 CalendarEvent.visibility           Display only

  P-CAL-004-12       Status                    Badge                System         No                     Active              Active; Cancelled                                   ---                                  Permission-based                 CalendarEvent.status               Display only

  P-CAL-004-13       Edit                      Primary button       ---            ---                    ---                 Creator only; before start                          ERR-02 started; ERR-03 non-creator   Creator only                     ---                                Opens CLL-SCR-05 Recording request / CLL-SCR-06 Call log, recordings and transcripts

  P-CAL-004-14       Cancel event              Destructive button   ---            ---                    ---                 Creator only; before start; confirmation required   ERR-02 / ERR-03                      Creator only                     CalendarEvent.status = Cancelled   Cancels; retains entry; notifies co-parent if shared

  P-CAL-004-15       View history              Link                 ---            ---                    ---                 ---                                                 ---                                  Permission-based                 ---                                Opens CAL-SCR-06 Entry and request history
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ------------------------------------------------------
  Empty                    Not applicable; detail opens only for existing event

  Loading                  Detail skeleton

  Error                    Not found, permission denied, or action failure

  Success                  Event details and permitted actions displayed
  -------------------------------------------------------------------------------

CAL-SCR-03 --- Parenting time form

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-03
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-01
  -------------------------------------------------------------------------

![Figure CAL-SCR-03 --- Parenting time form](media/95a6e777f7c3b8744548563634a3d87cd78976eb.png "Figure CAL-SCR-03 — Parenting time form"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-03 --- Parenting time form*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    CAL-SCR-01 Calendar (week view)
  ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); CAL-SCR-04 Schedule change request; CAL-SCR-05 Request detail, answer and undo; CAL-SCR-06 Entry and request history; Main menu: any module

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  ------------------------------------------------------------------------------------------
  **Purpose**    Create a parenting-time entry or edit a Solo Mode entry before it starts.
  -------------- ---------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Add / Edit Parenting Time\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Overlap warning (P-CAL-008-06).

-   Input area (form fields, in specification order): Parent (P-CAL-008-01); Children (P-CAL-008-02); Start (P-CAL-008-03); End (P-CAL-008-04); Repeats (P-CAL-008-05).

-   Action area (primary action first, then secondary actions and links): Save (P-CAL-008-07); Cancel (P-CAL-008-08).

**Parameter reference:**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**                                      **Default**              **Allowed values / validation**       **Error**              **Visibility**       **Saved to**                        **Behavior**
  ------------------ ------------------------- ------------------ -------------- ------------------------------------------------- ------------------------ ------------------------------------- ---------------------- -------------------- ----------------------------------- --------------------------------------------
  P-CAL-008-01       Parent                    Select             Yes            Yes on create                                     Current user             Parent or Co-parent                   Inline field message   Parent / Co-parent   ParentingTimeEntry.parent_user_id   Identifies parent with children

  P-CAL-008-02       Children                  Multi-select       No             Yes                                               None                     Household children                    ---                    Parent / Co-parent   ParentingTimeEntry.child_ids        Optional

  P-CAL-008-03       Start                     Date-time picker   Yes            Yes                                               Blank or current value   Valid date-time                       ---                    Parent / Co-parent   ParentingTimeEntry.start_at         Required

  P-CAL-008-04       End                       Date-time picker   Yes            Yes                                               Blank or current value   After start                           ERR-01                 Parent / Co-parent   ParentingTimeEntry.end_at           Required

  P-CAL-008-05       Repeats                   Toggle / select    No             Yes on create; pattern immutable after creation   Does not repeat          Daily; Weekly; Monthly; Custom days   Inline field message   Parent / Co-parent   ParentingTimeEntry.repeat_rule      Enables recurrence

  P-CAL-008-06       Overlap warning           Warning message    System         No                                                Derived                  Shown on overlapping entry            ---                    Parent / Co-parent   ---                                 Allows Save anyway

  P-CAL-008-07       Save                      Primary button     ---            ---                                               ---                      ---                                   ---                    Parent / Co-parent   Entry record                        Creates Proposed in Linked; Active in Solo

  P-CAL-008-08       Cancel                    Secondary button   ---            ---                                               ---                      ---                                   ---                    Parent / Co-parent   ---                                 Discards changes
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ -------------------------------------------------------------------------------
  Empty                    Blank form

  Loading                  Save disabled

  Error                    Invalid time: ERR-01; save failure: ERR-04

  Success                  Proposed entry created in Linked household; Active entry created in Solo Mode
  --------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------------------------
  **Purpose**    View one parenting-time entry and manage confirmation or change request.
  -------------- --------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Parenting-Time Detail\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Parent (P-CAL-007-01); Children (P-CAL-007-02); Start (P-CAL-007-03); End (P-CAL-007-04); Repeat rule (P-CAL-007-05); Status (P-CAL-007-06); Parent color (P-CAL-007-07).

-   Action area (primary action first, then secondary actions and links): Confirm (P-CAL-007-08); Request change (P-CAL-007-09); Edit (P-CAL-007-10); View history (P-CAL-007-11).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**          **Required**   **Editable**      **Default**          **Allowed values / validation**   **Error**              **Visibility**       **Saved to**                        **Behavior**
  ------------------ ------------------------- ----------------- -------------- ----------------- -------------------- --------------------------------- ---------------------- -------------------- ----------------------------------- --------------------------------------------------
  P-CAL-007-01       Parent                    Text / avatar     System         No                Entry parent         Parent or Co-parent               ---                    Parent / Co-parent   ParentingTimeEntry.parent_user_id   Display only

  P-CAL-007-02       Children                  Chip list         No             Through request   Entry children       Household children                ---                    Parent / Co-parent   ParentingTimeEntry.child_ids        Display only

  P-CAL-007-03       Start                     Timestamp         Yes            Through request   Entry start          UTC storage; local display        ---                    Parent / Co-parent   ParentingTimeEntry.start_at         Display only

  P-CAL-007-04       End                       Timestamp         Yes            Through request   Entry end            After start                       ---                    Parent / Co-parent   ParentingTimeEntry.end_at           Display only

  P-CAL-007-05       Repeat rule               Badge             System         No                Entry rule           Daily; Weekly; Monthly; Custom    ---                    Parent / Co-parent   ParentingTimeEntry.repeat_rule      Display only

  P-CAL-007-06       Status                    Badge             System         No                Proposed or Active   Proposed; Active; Cancelled       ---                    Parent / Co-parent   ParentingTimeEntry.status           Display only

  P-CAL-007-07       Parent color              Color indicator   System         No                Assigned color       Visual only                       ---                    Parent / Co-parent   Calendar display setting            Display only

  P-CAL-007-08       Confirm                   Primary button    ---            ---               ---                  Co-parent only; Proposed entry    Inline field message   Co-parent            Approval record                     Opens CAL-SCR-05 Request detail, answer and undo

  P-CAL-007-09       Request change            Primary button    ---            ---               ---                  Linked household; Active entry    ---                    Parent / Co-parent   ---                                 Opens CAL-SCR-04 Schedule change request

  P-CAL-007-10       Edit                      Button            Conditional    ---               ---                  Solo Mode only; before start      ERR-02 if started      Solo parent          Entry version                       Opens CLL-SCR-01 Calling settings

  P-CAL-007-11       View history              Link              ---            ---               ---                  ---                               ---                    Parent / Co-parent   ---                                 Opens CAL-SCR-06 Entry and request history
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ------------------------------------------------------
  Empty                    Not applicable; detail opens only for existing entry

  Loading                  Detail skeleton

  Error                    Permission, status, or load failure

  Success                  Entry details and permitted actions displayed
  -------------------------------------------------------------------------------

CAL-SCR-04 --- Schedule change request

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-04
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-02
  -------------------------------------------------------------------------

![Figure CAL-SCR-04 --- Schedule change request](media/c3870e35fd1f12080010cd5a56710d08935996a5.png "Figure CAL-SCR-04 — Schedule change request"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-04 --- Schedule change request*

**Navigation**

  ----------------------------------------------------------------------------------------------------------------------------
  **How you get here**    CAL-SCR-01 Calendar (week view); CAL-SCR-03 Parenting time form
  ----------------------- ----------------------------------------------------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); CAL-SCR-05 Request detail, answer and undo; Main menu: any module

  ----------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Create a schedule change or swap request.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Input area (form fields, in specification order): Request type (P-CAL-009-01); Children (P-CAL-009-02); Change start (P-CAL-009-03); Change end (P-CAL-009-04); Reason (P-CAL-009-05); Respond by (P-CAL-009-06); Offered return start (P-CAL-009-07); Offered return end (P-CAL-009-08).

-   Action area (primary action first, then secondary actions and links): Send request (P-CAL-009-09); Cancel (P-CAL-009-10).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**           **Required**   **Editable**      **Default**        **Allowed values / validation**                                         **Error**              **Visibility**       **Saved to**                                 **Behavior**
  ------------------ ------------------------- ------------------ -------------- ----------------- ------------------ ----------------------------------------------------------------------- ---------------------- -------------------- -------------------------------------------- -------------------------------------
  P-CAL-009-01       Request type              Radio group        Yes            Yes before send   None               Swap days; Change of parenting time; Change of exchange time or place   Inline field message   Parent / Co-parent   ScheduleChangeRequest.request_type           Determines swap fields

  P-CAL-009-02       Children                  Multi-select       Yes            Yes before send   None or prefill    Household children                                                      Inline field message   Parent / Co-parent   ScheduleChangeRequest.child_ids              Required

  P-CAL-009-03       Change start              Date-time picker   Yes            Yes before send   Blank or prefill   Valid date-time                                                         ---                    Parent / Co-parent   ScheduleChangeRequest.change_start_at        Required

  P-CAL-009-04       Change end                Date-time picker   Yes            Yes before send   Blank or prefill   After change start                                                      Inline field message   Parent / Co-parent   ScheduleChangeRequest.change_end_at          Required

  P-CAL-009-05       Reason                    Textarea           Yes            Yes before send   Blank              Up to 500 characters                                                    Inline field message   Parent / Co-parent   ScheduleChangeRequest.reason                 Required

  P-CAL-009-06       Respond by                Date-time picker   Yes            Yes before send   Blank              At least 24 hours after send                                            ERR-05                 Parent / Co-parent   ScheduleChangeRequest.respond_by_at          Required

  P-CAL-009-07       Offered return start      Date-time picker   Conditional    Yes before send   Blank              Required for Swap days                                                  Inline field message   Parent / Co-parent   ScheduleChangeRequest.swap_return_start_at   Required for swap

  P-CAL-009-08       Offered return end        Date-time picker   Conditional    Yes before send   Blank              After return start; required for Swap days                              Inline field message   Parent / Co-parent   ScheduleChangeRequest.swap_return_end_at     Required for swap

  P-CAL-009-09       Send request              Primary button     ---            ---               ---                ---                                                                     ---                    Parent / Co-parent   ScheduleChangeRequest.status = Pending       Creates request; notifies co-parent

  P-CAL-009-10       Cancel                    Secondary button   ---            ---               ---                ---                                                                     ---                    Parent / Co-parent   ---                                          Discards request
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ----------------------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ---------------------------------------------------------------------
  Empty                    Blank request form

  Loading                  Send disabled

  Error                    Respond-by under 24 hours: ERR-05; save failure: ERR-04

  Success                  Pending request created; visible to both parents; co-parent alerted
  ----------------------------------------------------------------------------------------------

CAL-SCR-05 --- Request detail, answer and undo

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-05
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-02
  -------------------------------------------------------------------------

![Figure CAL-SCR-05 --- Request detail, answer and undo](media/8c68d2de9448d142561338fd5e704759aaca2e93.png "Figure CAL-SCR-05 — Request detail, answer and undo"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-05 --- Request detail, answer and undo*

**Navigation**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-19 Home; CAL-SCR-01 Calendar (week view); CAL-SCR-03 Parenting time form; CAL-SCR-04 Schedule change request; CAL-SCR-06 Entry and request history
  ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); CAL-SCR-06 Entry and request history; Main menu: any module

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show a schedule-change request and allow response.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Request Detail / Respond\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Request type (P-CAL-010-01); Children (P-CAL-010-03); Change period (P-CAL-010-04); Offered return period (P-CAL-010-05); Respond by (P-CAL-010-07); Status (P-CAL-010-08).

-   Input area (form fields, in specification order): Requested by (P-CAL-010-02); Reason (P-CAL-010-06); Decline reason (P-CAL-010-11).

-   Action area (primary action first, then secondary actions and links): Approve (P-CAL-010-09); Decline (P-CAL-010-10); Withdraw (P-CAL-010-12); View history (P-CAL-010-13).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**         **Default**   **Allowed values / validation**                                **Error**                         **Visibility**   **Saved to**                               **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------------- ------------- -------------------------------------------------------------- --------------------------------- ---------------- ------------------------------------------ --------------------------------------------------
  P-CAL-010-01       Request type              Badge                System         No                   Derived       Swap days; Change parenting time; Change exchange time/place   ---                               Both parents     ScheduleChangeRequest.request_type         Display only

  P-CAL-010-02       Requested by              Text                 System         No                   Derived       Requester name                                                 ---                               Both parents     ScheduleChangeRequest.requester_user_id    Display only

  P-CAL-010-03       Children                  Chip list            System         No                   Derived       Selected children                                              ---                               Both parents     ScheduleChangeRequest.child_ids            Display only

  P-CAL-010-04       Change period             Timestamp range      System         No                   Derived       Start and end                                                  ---                               Both parents     Change start/end                           Display only

  P-CAL-010-05       Offered return period     Timestamp range      System         No                   Derived       Swap only                                                      ---                               Both parents     Swap return start/end                      Display only

  P-CAL-010-06       Reason                    Text                 System         No                   Derived       Requester reason                                               ---                               Both parents     ScheduleChangeRequest.reason               Display only

  P-CAL-010-07       Respond by                Timestamp            System         No                   Derived       At least 24 hours after send                                   ---                               Both parents     ScheduleChangeRequest.respond_by_at        Display only

  P-CAL-010-08       Status                    Badge                System         No                   Pending       Pending; Approved; Declined; Expired; Withdrawn                ---                               Both parents     ScheduleChangeRequest.status               Display only

  P-CAL-010-09       Approve                   Primary button       ---            ---                  ---           Co-parent only; Pending request                                ERR-06 answered; ERR-07 expired   Co-parent        Approval record                            Opens CAL-SCR-05 Request detail, answer and undo

  P-CAL-010-10       Decline                   Destructive button   ---            ---                  ---           Co-parent only; Pending request                                ERR-06 / ERR-07                   Co-parent        ScheduleChangeRequest.status = Declined    Saves optional reason; notifies requester

  P-CAL-010-11       Decline reason            Textarea             No             Yes before decline   Blank         Optional; up to 2,000 characters                               Inline field message              Co-parent        ScheduleChangeRequest.decline_reason       Saved with decline

  P-CAL-010-12       Withdraw                  Destructive button   ---            ---                  ---           Requester only; Pending request                                Inline field message              Requester        ScheduleChangeRequest.status = Withdrawn   Cancels pending request

  P-CAL-010-13       View history              Link                 ---            ---                  ---           ---                                                            ---                               Both parents     ---                                        Opens CAL-SCR-06 Entry and request history
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ ----------------------------------------------------------
  Empty                    Not applicable; opens only for existing request

  Loading                  Detail skeleton

  Error                    Already answered: ERR-06; expired: ERR-07

  Success                  Request details and permitted response actions displayed
  -----------------------------------------------------------------------------------

Specification

  ----------------------------------------------------------------------------------------------
  **Purpose**    Require explicit confirmation before a schedule-change approval takes effect.
  -------------- -------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Approval Confirmation\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Change summary (P-CAL-011-01); Calendar impact (P-CAL-011-02).

-   Input area (form fields, in specification order): Undo countdown (P-CAL-011-06).

-   Action area (primary action first, then secondary actions and links): Confirm approval (P-CAL-011-03); Cancel (P-CAL-011-04); Undo approval (P-CAL-011-05).

**Parameter reference:**

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**             **Required**   **Editable**   **Default**   **Allowed values / validation**          **Error**              **Visibility**   **Saved to**                              **Behavior**
  ------------------ ------------------------- -------------------- -------------- -------------- ------------- ---------------------------------------- ---------------------- ---------------- ----------------------------------------- ------------------------------
  P-CAL-011-01       Change summary            Read-only summary    System         No             Derived       Full requested change                    ---                    Approver         ---                                       Display only

  P-CAL-011-02       Calendar impact           Read-only preview    System         No             Derived       Before/after calendar change             ---                    Approver         ---                                       Display only

  P-CAL-011-03       Confirm approval          Primary button       Yes            ---            ---           ---                                      ---                    Approver         ScheduleChangeRequest.status = Approved   Starts 10-minute undo window

  P-CAL-011-04       Cancel                    Secondary button     ---            ---            ---           ---                                      ---                    Approver         ---                                       Returns without approval

  P-CAL-011-05       Undo approval             Destructive button   ---            ---            ---           Available for 10 minutes after confirm   Inline field message   Approver         Request returns Pending                   Prevents calendar change

  P-CAL-011-06       Undo countdown            Timer                System         No             10:00         Counts down from approval                ---                    Approver         Undo deadline                             Display only
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  --------------------------------------------------------------------------------------------------------
  **State**               **Behavior**
  ----------------------- --------------------------------------------------------------------------------
  Empty                   Not applicable; opens only for approval flow

  Loading                 Confirm disabled

  Error                   Approval failure prevents status change

  Success                 Approval recorded; undo window starts; calendar changes only after window ends
  --------------------------------------------------------------------------------------------------------

CAL-SCR-06 --- Entry and request history

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-06
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-02, CAL-10
  -------------------------------------------------------------------------

![Figure CAL-SCR-06 --- Entry and request history](media/e775473d4f84cd39452efa89b4bf7937569a4392.png "Figure CAL-SCR-06 — Entry and request history"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-06 --- Entry and request history*

**Navigation**

  ----------------------------------------------------------------------------------------------------------------------------
  **How you get here**    CAL-SCR-02 Event form; CAL-SCR-03 Parenting time form; CAL-SCR-05 Request detail, answer and undo
  ----------------------- ----------------------------------------------------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); CAL-SCR-05 Request detail, answer and undo; Main menu: any module

  ----------------------------------------------------------------------------------------------------------------------------

Specification

  -----------------------------------------------------------------------
  **Purpose**    Show all schedule-change requests and their outcomes.
  -------------- --------------------------------------------------------

  -----------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Request History\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Request type (P-CAL-012-02); Status (P-CAL-012-03); Change period (P-CAL-012-05); Respond-by (P-CAL-012-06); Filter (P-CAL-012-07).

-   Input area (form fields, in specification order): Requested by (P-CAL-012-04).

-   Action area (primary action first, then secondary actions and links): Request list (P-CAL-012-01); Open request (P-CAL-012-08).

**Parameter reference:**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**          **Required**   **Editable**   **Default**   **Allowed values / validation**                   **Error**               **Visibility**       **Saved to**        **Behavior**
  ------------------ ------------------------- ----------------- -------------- -------------- ------------- ------------------------------------------------- ----------------------- -------------------- ------------------- --------------------------------------------------
  P-CAL-012-01       Request list              Table / list      ---            ---            ---           All requests; none deleted                        Load error with retry   Parent / Co-parent   ---                 Displays history

  P-CAL-012-02       Request type              Badge             System         No             Derived       Swap; Change parenting time; Change exchange      ---                     Parent / Co-parent   request_type        Display only

  P-CAL-012-03       Status                    Badge             System         No             Derived       Pending; Approved; Declined; Expired; Withdrawn   ---                     Parent / Co-parent   status              Display only

  P-CAL-012-04       Requested by              Text              System         No             Derived       Parent name                                       ---                     Parent / Co-parent   requester_user_id   Display only

  P-CAL-012-05       Change period             Timestamp range   System         No             Derived       Start/end                                         ---                     Parent / Co-parent   Change dates        Display only

  P-CAL-012-06       Respond-by                Timestamp         System         No             Derived       UTC/local display                                 ---                     Parent / Co-parent   respond_by_at       Display only

  P-CAL-012-07       Filter                    Control group     No             Yes            None          Status, type, date range                          ---                     Parent / Co-parent   ---                 Filters list

  P-CAL-012-08       Open request              Row action        ---            ---            ---           ---                                               ---                     Parent / Co-parent   ---                 Opens CAL-SCR-05 Request detail, answer and undo
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  -----------------------------------------------------------------------
  **State**                   **Behavior**
  --------------------------- -------------------------------------------
  Empty                       No requests; guidance to create one

  Loading                     Table skeleton

  Error                       Load failure and retry

  Success                     Full request history displayed
  -----------------------------------------------------------------------

Specification

  ----------------------------------------------------------------------------------------------------------
  **Purpose**    Show the original details and every change to an event, parenting-time entry, or request.
  -------------- -------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------

**Component arrangement:**

-   Page header: screen title \"Calendar Audit History\", global navigation and Exit now control as set out in section 2.2.

-   Information / display area: Entity type (P-CAL-013-01); Original details (P-CAL-013-02); Change time (P-CAL-013-05); Device (P-CAL-013-06); Result (P-CAL-013-07).

-   Input area (form fields, in specification order): Actor (P-CAL-013-04).

-   Action area (primary action first, then secondary actions and links): Change history (P-CAL-013-03); Back (P-CAL-013-08).

**Parameter reference:**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**   **Type**            **Required**   **Editable**   **Default**           **Allowed values / validation**                           **Error**               **Visibility**     **Saved to**        **Behavior**
  ------------------ ------------------------- ------------------- -------------- -------------- --------------------- --------------------------------------------------------- ----------------------- ------------------ ------------------- --------------------------
  P-CAL-013-01       Entity type               Read-only badge     System         No             From context          Event; Parenting time; Request                            ---                     Permission-based   Context             Display only

  P-CAL-013-02       Original details          Read-only section   System         No             First saved version   Immutable snapshot                                        ---                     Permission-based   Version history     Display only

  P-CAL-013-03       Change history            Timeline / table    System         No             Derived               Every edit, cancel, approval, decline, withdrawal         Load error with retry   Permission-based   Audit/version log   Displays history

  P-CAL-013-04       Actor                     Text                System         No             Derived               User display name                                         ---                     Permission-based   Audit actor         Display only

  P-CAL-013-05       Change time               Timestamp           System         No             Event time            UTC storage; local display                                ---                     Permission-based   Audit time          Display only

  P-CAL-013-06       Device                    Text / badge        System         No             Derived               Device type                                               ---                     Permission-based   Audit device        Display only

  P-CAL-013-07       Result                    Badge               System         No             Derived               Saved; Cancelled; Approved; Declined; Withdrawn; Failed   ---                     Permission-based   Audit result        Display only

  P-CAL-013-08       Back                      Button / link       ---            ---            ---                   ---                                                       ---                     User               ---                 Returns to source detail
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Screen states:**

  ---------------------------------------------------------------------------------
  **State**                **Behavior**
  ------------------------ --------------------------------------------------------
  Empty                    No changes beyond creation; show original entry

  Loading                  History skeleton

  Error                    Load failure and retry

  Success                  Original details and complete change history displayed
  ---------------------------------------------------------------------------------

CAL-SCR-07 --- Schedule templates and builder

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-07
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-03
  -------------------------------------------------------------------------

![Figure CAL-SCR-07 --- Schedule templates and builder](media/c8e5a32edf3440fe176cdc67a9684ddd134215d7.png "Figure CAL-SCR-07 — Schedule templates and builder"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-07 --- Schedule templates and builder*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    CAL-SCR-01 Calendar (week view)
  ----------------------- --------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

CAL-SCR-08 --- Holidays

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-08
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-04
  -------------------------------------------------------------------------

![Figure CAL-SCR-08 --- Holidays](media/5fdecb7b6e435d5a0290dda59eab34b978034d0e.png "Figure CAL-SCR-08 — Holidays"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-08 --- Holidays*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    CAL-SCR-01 Calendar (week view)
  ----------------------- --------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

CAL-SCR-09 --- Calendar sync settings

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-09
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-05
  -------------------------------------------------------------------------

![Figure CAL-SCR-09 --- Calendar sync settings](media/df91a9c35cd7611bd8523a6ba42dd7738e2d5f24.png "Figure CAL-SCR-09 — Calendar sync settings"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-09 --- Calendar sync settings*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    ACC-SCR-20 Settings; CAL-SCR-01 Calendar (week view)
  ----------------------- --------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

CAL-SCR-10 --- Exchange record

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-10
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-06
  -------------------------------------------------------------------------

![Figure CAL-SCR-10 --- Exchange record](media/3b9277569487be56107ccff504015473caaa545f.png "Figure CAL-SCR-10 — Exchange record"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-10 --- Exchange record*

**Navigation**

  -----------------------------------------------------------------------------------------------------
  **How you get here**    CAL-SCR-01 Calendar (week view); CAL-SCR-13 Check-in
  ----------------------- -----------------------------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); CAL-SCR-13 Check-in; Main menu: any module

  -----------------------------------------------------------------------------------------------------

The screen components are shown in the figure above.

CAL-SCR-11 --- Compliance view

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-11
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-07
  -------------------------------------------------------------------------

![Figure CAL-SCR-11 --- Compliance view](media/1dcc744768256a8609c74e2300307eb96d12ac29.png "Figure CAL-SCR-11 — Compliance view"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-11 --- Compliance view*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    CAL-SCR-01 Calendar (week view)
  ----------------------- --------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

CAL-SCR-12 --- Parenting plan builder

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-12
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-08
  -------------------------------------------------------------------------

![Figure CAL-SCR-12 --- Parenting plan builder](media/b81ed6af85516d7d3a3870ec6cb5466f1cc9977a.png "Figure CAL-SCR-12 — Parenting plan builder"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-12 --- Parenting plan builder*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    CAL-SCR-01 Calendar (week view)
  ----------------------- --------------------------------------------------------
  **Where you go next**   CAL-SCR-01 Calendar (week view); Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

CAL-SCR-13 --- Check-in

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-13
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-09
  -------------------------------------------------------------------------

![Figure CAL-SCR-13 --- Check-in](media/69c3f0be809448ea48a83f63d145eab26ad556eb.png "Figure CAL-SCR-13 — Check-in"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-13 --- Check-in*

**Navigation**

  --------------------------------------------------------------------------------
  **How you get here**    CAL-SCR-10 Exchange record
  ----------------------- --------------------------------------------------------
  **Where you go next**   CAL-SCR-10 Exchange record; Main menu: any module

  --------------------------------------------------------------------------------

The screen components are shown in the figure above.

CAL-SCR-14 --- Pets

  -------------------------------------------------------------------------
  **Screen ID**    CAL-SCR-14
  ---------------- --------------------------------------------------------
  **Module**       Calendar and Parenting Time

  **Feature(s)**   CAL-11
  -------------------------------------------------------------------------

![Figure CAL-SCR-14 --- Pets](media/d1c7d8564235bb359903ac2fccd84884ed93a90d.png "Figure CAL-SCR-14 — Pets"){width="6.666666666666667in" height="5.0in"}

*Figure CAL-SCR-14 --- Pets*

**Navigation**

  ----------------------------------------------------------------------------------------
  **How you get here**    DOC-SCR-01 Children list and child form
  ----------------------- ----------------------------------------------------------------
  **Where you go next**   DOC-SCR-01 Children list and child form; Main menu: any module

  ----------------------------------------------------------------------------------------

The screen components are shown in the figure above.

Cross-screen rules and pending screen decisions (Calendar and Parenting Time)

Cross-screen Calendar rules

Pending screen decisions --- Calendar

7.7 Field-level specifications

3.1 Event --- CAL-SCR-02 Event form / CAL-SCR-02 Event form → CAL-SCR-02

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**         **Technical name**   **Type / control**   **Required**   **Editable**           **Default**    **Allowed values / validation**                      **Visibility**
  -------------- ----------------- -------------------- -------------------- -------------- ---------------------- -------------- ---------------------------------------------------- -------------------
  FLD-CAL-001    Title             title                Text                 Yes            Creator before start   None           Not specified --- confirmation required for length   Event form/detail

  FLD-CAL-002    Details           details              Textarea             No             Creator before start   None           Not specified --- confirmation required              Event form/detail

  FLD-CAL-003    Date              event_date           Date                 Yes            Creator before start   None           Valid date                                           Event form

  FLD-CAL-004    Start time        start_at             Datetime             Yes            Creator before start   None           UTC storage; local display                           Event form

  FLD-CAL-005    End time          end_at               Datetime             Yes            Creator before start   None           Must be after start; ERR-01 otherwise                Event form

  FLD-CAL-006    Location          location             Text                 No             Creator before start   None           Safety Mode hides from others until shared           Event form/detail

  FLD-CAL-007    Children          child_ids            Multi-select         No             Creator before start   None           Household child references                           Event form

  FLD-CAL-008    Drop-off parent   dropoff_user_id      Select               No             Creator before start   None           Parent/Co-parent                                     Event form

  FLD-CAL-009    Pick-up parent    pickup_user_id       Select               No             Creator before start   None           Parent/Co-parent                                     Event form

  FLD-CAL-010    Repeat rule       repeat_rule          Select               No             No after creation      None           Daily, Weekly, Monthly, Custom days                  Event form

  FLD-CAL-011    Visibility        visibility           Toggle               Yes            Creator                Shared         Shared, Private                                      Event form

  FLD-CAL-012    Status            status               Display              System         No                     Active         Proposed, Active, Cancelled                          Calendar/detail

  FLD-CAL-013    Created by        created_by_user_id   System               System         No                     Current user   User reference                                       Detail/history
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3.2 Parenting Time --- CAL-SCR-03 Parenting time form → CAL-SCR-03

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**      **Technical name**   **Type / control**   **Required**   **Editable**                            **Default**                          **Allowed values / validation**   **Visibility**
  -------------- -------------- -------------------- -------------------- -------------- --------------------------------------- ------------------------------------ --------------------------------- ---------------------
  FLD-CAL-020    Parent         parent_user_id       Select               Yes            Through change request in Linked mode   Current user                         Parent/Co-parent                  Parenting-time form

  FLD-CAL-021    Children       child_ids            Multi-select         No             Change request                          None                                 Household children                Parenting-time form

  FLD-CAL-022    Start          start_at             Datetime             Yes            Change request                          None                                 UTC; local display                Parenting-time form

  FLD-CAL-023    End            end_at               Datetime             Yes            Change request                          None                                 After start; ERR-01               Parenting-time form

  FLD-CAL-024    Repeat rule    repeat_rule          Select               No             No pattern change after creation        None                                 Daily, Weekly, Monthly, Custom    Parenting-time form

  FLD-CAL-025    Status         status               Display              System         No                                      Proposed in Linked; Active in Solo   Proposed, Active, Cancelled       Calendar/detail

  FLD-CAL-026    Parent color   parent_color         Display              System         No                                      Assigned per parent                  Visual only                       Calendar
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3.3 Schedule Change Request --- CAL-SCR-04 Schedule change request / CAL-SCR-05 Request detail, answer and undo → CAL-SCR-04, CAL-SCR-05

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field ID**   **Label**                     **Technical name**                         **Type / control**   **Required**   **Editable**        **Default**                  **Allowed values / validation**                                **Visibility**
  -------------- ----------------------------- ------------------------------------------ -------------------- -------------- ------------------- ---------------------------- -------------------------------------------------------------- ------------------------
  FLD-CAL-030    Request type                  request_type                               Select               Yes            No after creation   None                         Swap days; Change parenting time; Change exchange time/place   Request form

  FLD-CAL-031    Children                      child_ids                                  Multi-select         Yes            No after creation   None                         Household children                                             Request form

  FLD-CAL-032    Change start                  change_start_at                            Datetime             Yes            No after creation   None                         UTC                                                            Request form

  FLD-CAL-033    Change end                    change_end_at                              Datetime             Yes            No after creation   None                         After start                                                    Request form

  FLD-CAL-034    Reason                        reason                                     Textarea             Yes            No after creation   None                         Up to 500 characters                                           Request form

  FLD-CAL-035    Respond by                    respond_by_at                              Datetime             Yes            No after creation   None                         At least 24 hours after request; ERR-05                        Request form

  FLD-CAL-036    Offered return period start   swap_return_start_at                       Datetime             Conditional    No after creation   None                         Required for Swap days                                         Request form

  FLD-CAL-037    Offered return period end     swap_return_end_at                         Datetime             Conditional    No after creation   None                         Required for Swap days; after start                            Request form

  FLD-CAL-038    Request status                status                                     Display              System         No                  Pending                      Pending, Approved, Declined, Expired, Withdrawn                Request detail/history

  FLD-CAL-039    Decline reason                decline_reason                             Textarea             No             No after response   None                         Optional                                                       Request detail

  FLD-CAL-040    Approval undo deadline        undo_until                                 Timestamp            System         No                  Approval time + 10 minutes   UTC                                                            Approver / internal

  FLD-CAL-041    Approval metadata             approval_actor, approved_at, device_type   System               System         No                  Set on confirm               Immutable                                                      Approval log
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

7.8 User actions and procedures

ACT-CAL-001 --- View Shared Calendar

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent, Co-parent
  --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-01 Calendar (week view) / CAL-SCR-01 Calendar (week view) / CAL-SCR-01 Calendar (week view)

  **Objective**         See parenting time and events

  **Trigger**           User opens Calendar and selects day, week, or month

  **Preconditions**     User signed in and 2FA complete

  **System behavior**   Display one household calendar in day, week, and month views; show events and parenting-time entries; use each parent's own color for parenting time.

  **Data viewed**       Calendar events, parenting-time entries, request indicators

  **Success**           Calendar displayed

  **Empty state**       Show first-time guidance and Add event / Add parenting time actions

  **Permissions**       Parent and Co-parent see shared entries; private events are creator-only; Third party/Child views are available.

  **Source**            CAL-01; FR-CAL-01-01, FR-CAL-01-08.

  **Screen(s)**         CAL-SCR-01 Calendar (day, week and month views), CAL-SCR-01 Calendar (day, week and month views), CAL-SCR-01 Calendar (day, week and month views)
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-01 Calendar (day, week and month views), CAL-SCR-01 Calendar (day, week and month views), CAL-SCR-01 Calendar (day, week and month views) (entry: Main navigation → Calendar; date selector from Week/Month views).

2.  Make sure the preconditions are met: User signed in and 2FA complete.

3.  Enter or select the required information: Month / year.

4.  Perform the action: User opens Calendar and selects day, week, or month.

5.  The system processes the action: Display one household calendar in day, week, and month views; show events and parenting-time entries; use each parent's own color for parenting time.

6.  Result on success: Calendar displayed.

ACT-CAL-002 --- Create Event

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-02 Event form

  **Objective**         Add a child-related event

  **Trigger**           User submits event form

  **Preconditions**     User signed in

  **System behavior**   Create event with title, details, date, start/end, optional location, children, drop-off parent, and pick-up parent; support daily, weekly, monthly, or custom recurrence; make entry available to Records and Notifications.

  **Data created**      Calendar event, recurrence rules, audit history

  **Validations**       End time must not precede start time; title/date/time required per form rules.

  **Success**           Event appears in calendar

  **Alternative**       Overlap warning appears; user may save anyway.

  **Negative**          Invalid time range: ERR-01; save failure: ERR-04 and no event created.

  **Permissions**       Any parent/co-parent may create; only creator may edit/cancel before start.

  **Source**            CAL-01; FR-CAL-01-02--FR-CAL-01-06, FR-CAL-01-11, FR-CAL-01-17--FR-CAL-01-19.

  **Screen(s)**         CAL-SCR-02 Event form
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-02 Event form (entry: Any calendar view; notification deep link).

2.  Make sure the preconditions are met: User signed in.

3.  Enter or select the required information: Title; Date; Start time; End time; Private event; Edit scope.

4.  Perform the action: User submits event form.

5.  The system validates: End time must not precede start time; title/date/time required per form rules.

6.  The system processes the action: Create event with title, details, date, start/end, optional location, children, drop-off parent, and pick-up parent; support daily, weekly, monthly, or custom recurrence; make entry available to Records and Notifications.

7.  Result on success: Event appears in calendar.

8.  If it fails or a rule is not met: Overlap warning appears; user may save anyway.

ACT-CAL-003 --- Edit Recurring Event

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Event creator
  --------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-02 Event form / CAL-SCR-02 Event form

  **Objective**         Change one occurrence or all future occurrences

  **Trigger**           Creator edits a repeating event

  **Preconditions**     Event has not started; user is creator

  **System behavior**   Allow editing one occurrence or all future occurrences; do not allow changing the recurrence pattern of an existing series; a new series is required for a pattern change.

  **Data updated**      Event occurrence(s); version/audit history

  **Success**           Selected occurrences updated

  **Negative**          Non-creator edit: ERR-03; started-event edit: ERR-02.

  **Permissions**       Creator only

  **Source**            CAL-01; FR-CAL-01-04--FR-CAL-01-05, FR-CAL-01-19.

  **Screen(s)**         CAL-SCR-02 Event form, CAL-SCR-02 Event form
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-02 Event form, CAL-SCR-02 Event form (entry: Any calendar view; notification deep link).

2.  Make sure the preconditions are met: Event has not started; user is creator.

3.  Enter or select the required information: Title; Date; Start time; End time; Private event; Edit scope.

4.  Perform the action: Creator edits a repeating event.

5.  The system processes the action: Allow editing one occurrence or all future occurrences; do not allow changing the recurrence pattern of an existing series; a new series is required for a pattern change.

6.  Result on success: Selected occurrences updated.

7.  If it fails or a rule is not met: Non-creator edit: ERR-03; started-event edit: ERR-02.

ACT-CAL-004 --- Cancel Event

  --------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Event creator
  --------------------- ----------------------------------------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-02 Event form

  **Objective**         Remove an upcoming event from active schedule without destroying evidence

  **Trigger**           Creator selects Cancel

  **Preconditions**     Event has not started; user is creator

  **System behavior**   Mark event Cancelled; retain it on calendar/history; notify co-parent through Notifications if shared; never delete entry.

  **Data updated**      Event status; audit history; notification/delivery log

  **Success**           Cancelled event retained and visible as cancelled

  **Negative**          Started event cannot be cancelled: ERR-02; non-creator cannot cancel: ERR-03.

  **Permissions**       Creator only

  **Source**            CAL-01, CAL-10; FR-CAL-01-06, FR-CAL-01-19.

  **Screen(s)**         CAL-SCR-02 Event form
  --------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-02 Event form (entry: Any calendar view; notification deep link).

2.  Make sure the preconditions are met: Event has not started; user is creator.

3.  Enter or select the required information: Title; Date; Start time; End time; Private event; Edit scope.

4.  Perform the action: Creator selects Cancel.

5.  The system processes the action: Mark event Cancelled; retain it on calendar/history; notify co-parent through Notifications if shared; never delete entry.

6.  Result on success: Cancelled event retained and visible as cancelled.

7.  If it fails or a rule is not met: Started event cannot be cancelled: ERR-02; non-creator cannot cancel: ERR-03.

ACT-CAL-005 --- Mark Event Private

  ----------------------------------------------------------------------------------------------------
  **Actor**             Event creator
  --------------------- ------------------------------------------------------------------------------
  **Screen**            CAL-SCR-02 Event form

  **Objective**         Keep an event visible only to its creator

  **Trigger**           Creator marks event private

  **Preconditions**     User is creator

  **System behavior**   Hide event from co-parent and other household viewers; only creator sees it.

  **Data updated**      Event visibility; audit history

  **Success**           Private event hidden from co-parent

  **Permissions**       Creator only

  **Source**            CAL-01; FR-CAL-01-07.

  **Screen(s)**         CAL-SCR-02 Event form
  ----------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-02 Event form (entry: Any calendar view; notification deep link).

2.  Make sure the preconditions are met: User is creator.

3.  Enter or select the required information: Title; Date; Start time; End time; Private event; Edit scope.

4.  Perform the action: Creator marks event private.

5.  The system processes the action: Hide event from co-parent and other household viewers; only creator sees it.

6.  Result on success: Private event hidden from co-parent.

ACT-CAL-006 --- Create Parenting-Time Entry

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-03 Parenting time form

  **Objective**         Record which parent has the children and when

  **Trigger**           User submits parenting-time form

  **Preconditions**     User signed in; children available in household

  **System behavior**   Create entry with parent, children, start/end, and recurrence; in Linked household save as Proposed and show to co-parent; in Solo Mode save directly as Active.

  **Data created**      Parenting-time entry, audit history

  **Success**           Proposed or Active entry displayed in creator's color

  **Negative**          Invalid time range: ERR-01; save failure: ERR-04.

  **Permissions**       Either parent may create; co-parent confirmation required to activate in Linked mode.

  **Source**            CAL-01; FR-CAL-01-08--FR-CAL-01-10.

  **Screen(s)**         CAL-SCR-03 Parenting time form
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-03 Parenting time form (entry: Calendar views; notification deep link).

2.  Make sure the preconditions are met: User signed in; children available in household.

3.  Enter or select the required information: Parent; Start; End.

4.  Perform the action: User submits parenting-time form.

5.  The system processes the action: Create entry with parent, children, start/end, and recurrence; in Linked household save as Proposed and show to co-parent; in Solo Mode save directly as Active.

6.  Result on success: Proposed or Active entry displayed in creator's color.

7.  If it fails or a rule is not met: Invalid time range: ERR-01; save failure: ERR-04.

ACT-CAL-007 --- Confirm Parenting-Time Entry

  -------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Co-parent
  --------------------- ---------------------------------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-03 Parenting time form / CAL-SCR-05 Request detail, answer and undo

  **Objective**         Activate a proposed parenting-time schedule

  **Trigger**           Co-parent confirms proposed entry

  **Preconditions**     Entry status Proposed; user is other parent

  **System behavior**   Apply CAL-02 confirmation and 10-minute undo window; after undo window ends, set entry Active and notify requester.

  **Data updated**      Entry status; approval log; audit history

  **Success**           Entry becomes Active after undo window

  **Alternative**       Approver may undo within 10 minutes; entry returns to Pending and calendar does not change.

  **Permissions**       Co-parent only

  **Source**            CAL-01, CAL-02; FR-CAL-01-09, FR-CAL-02-06--FR-CAL-02-08.

  **Screen(s)**         CAL-SCR-03 Parenting time form, CAL-SCR-05 Request detail, answer and undo
  -------------------------------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-03 Parenting time form, CAL-SCR-05 Request detail, answer and undo (entry: Calendar views; notification deep link).

2.  Make sure the preconditions are met: Entry status Proposed; user is other parent.

3.  Enter or select the required information: Parent; Start; End.

4.  Perform the action: Co-parent confirms proposed entry.

5.  The system processes the action: Apply CAL-02 confirmation and 10-minute undo window; after undo window ends, set entry Active and notify requester.

6.  Result on success: Entry becomes Active after undo window.

7.  If it fails or a rule is not met: Approver may undo within 10 minutes; entry returns to Pending and calendar does not change.

ACT-CAL-008 --- Request Schedule Change or Swap

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-04 Schedule change request

  **Objective**         Propose a documented schedule change

  **Trigger**           User submits request

  **Preconditions**     Household Linked; user has an Active parenting-time entry or relevant schedule context

  **System behavior**   Create request with type Swap days, Change of parenting time, or Change of exchange time/place; include children, change period, reason, respond-by date; for swaps include offered replacement period; show on both calendars and notify co-parent.

  **Data created**      Schedule-change request, approval log, notification

  **Validations**       Respond-by date must be at least 24 hours after sending.

  **Success**           Request Pending; both parents can view it

  **Negative**          Respond-by under 24 hours: ERR-05; save failure: ERR-04.

  **Permissions**       Either parent may create; only the other parent may approve/decline.

  **Source**            CAL-02; FR-CAL-02-01--FR-CAL-02-04.

  **Screen(s)**         CAL-SCR-04 Schedule change request form
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-04 Schedule change request form (entry: CAL-SCR-01 Calendar (week view)--003; CAL-SCR-03 Parenting time form).

2.  Make sure the preconditions are met: Household Linked; user has an Active parenting-time entry or relevant schedule context.

3.  Enter or select the required information: Request type; Children; Change start; Change end; Reason; Respond by.

4.  Perform the action: User submits request.

5.  The system validates: Respond-by date must be at least 24 hours after sending.

6.  The system processes the action: Create request with type Swap days, Change of parenting time, or Change of exchange time/place; include children, change period, reason, respond-by date; for swaps include offered replacement period; show on both calendars and notify co-parent.

7.  Result on success: Request Pending; both parents can view it.

8.  If it fails or a rule is not met: Respond-by under 24 hours: ERR-05; save failure: ERR-04.

ACT-CAL-009 --- Approve Schedule Change

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Co-parent
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-05 Request detail, answer and undo → CAL-SCR-05 Request detail, answer and undo

  **Objective**         Approve a proposed schedule change with explicit confirmation

  **Trigger**           Co-parent selects Approve, reviews change, and confirms

  **Preconditions**     Request Pending; actor is the non-requesting parent

  **System behavior**   Set Approved; retain undo capability for 10 minutes; do not change calendar until undo window ends; after window, apply calendar change and notify requester; log approver, UTC time, and device.

  **Data updated**      Request status, calendar entries, approval log, audit history

  **Success**           Calendar updated after undo window

  **Alternative**       Approver undoes within 10 minutes; request returns Pending; no calendar change.

  **Negative**          Requester cannot approve own request.

  **Permissions**       Co-parent only

  **Source**            CAL-02; FR-CAL-02-05--FR-CAL-02-09.

  **Screen(s)**         CAL-SCR-05 Request detail, answer and undo, CAL-SCR-05 Request detail, answer and undo
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-05 Request detail, answer and undo, CAL-SCR-05 Request detail, answer and undo (entry: Calendar indicator; notification deep link; CAL-SCR-06 Entry and request history).

2.  Make sure the preconditions are met: Request Pending; actor is the non-requesting parent.

3.  Perform the action: Co-parent selects Approve, reviews change, and confirms.

4.  The system processes the action: Set Approved; retain undo capability for 10 minutes; do not change calendar until undo window ends; after window, apply calendar change and notify requester; log approver, UTC time, and device.

5.  Result on success: Calendar updated after undo window.

6.  If it fails or a rule is not met: Approver undoes within 10 minutes; request returns Pending; no calendar change.

ACT-CAL-010 --- Decline Schedule Change

  ------------------------------------------------------------------------------------------------------------------
  **Actor**             Co-parent
  --------------------- --------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-05 Request detail, answer and undo

  **Objective**         Reject a proposed change

  **Trigger**           Co-parent selects Decline

  **Preconditions**     Request Pending; actor is non-requester

  **System behavior**   Set status Declined; save optional reason; notify requester; preserve request and history.

  **Data updated**      Request status, decline reason, audit history

  **Success**           Request Declined

  **Negative**          Expired request: ERR-07; already-answered request: ERR-06.

  **Permissions**       Co-parent only

  **Source**            CAL-02; FR-CAL-02-05, FR-CAL-02-11, FR-CAL-02-14.

  **Screen(s)**         CAL-SCR-05 Request detail, answer and undo
  ------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-05 Request detail, answer and undo (entry: Calendar indicator; notification deep link; CAL-SCR-06 Entry and request history).

2.  Make sure the preconditions are met: Request Pending; actor is non-requester.

3.  Perform the action: Co-parent selects Decline.

4.  The system processes the action: Set status Declined; save optional reason; notify requester; preserve request and history.

5.  Result on success: Request Declined.

6.  If it fails or a rule is not met: Expired request: ERR-07; already-answered request: ERR-06.

ACT-CAL-011 --- Withdraw Pending Request

  -----------------------------------------------------------------------------------------------------------
  **Actor**             Requesting parent
  --------------------- -------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-05 Request detail, answer and undo

  **Objective**         Cancel a request before response

  **Trigger**           Requester selects Withdraw

  **Preconditions**     Request status Pending

  **System behavior**   Set status Withdrawn; notify co-parent; retain request/history; no calendar change.

  **Data updated**      Request status; audit history

  **Success**           Request Withdrawn

  **Negative**          Answered request cannot be withdrawn.

  **Permissions**       Requester only

  **Source**            CAL-02; FR-CAL-02-11.

  **Screen(s)**         CAL-SCR-05 Request detail, answer and undo
  -----------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-05 Request detail, answer and undo (entry: Calendar indicator; notification deep link; CAL-SCR-06 Entry and request history).

2.  Make sure the preconditions are met: Request status Pending.

3.  Perform the action: Requester selects Withdraw.

4.  The system processes the action: Set status Withdrawn; notify co-parent; retain request/history; no calendar change.

5.  Result on success: Request Withdrawn.

6.  If it fails or a rule is not met: Answered request cannot be withdrawn.

ACT-CAL-012 --- View Calendar Audit History

  ----------------------------------------------------------------------------------------------------------------------------------------------
  **Actor**             Parent or Co-parent
  --------------------- ------------------------------------------------------------------------------------------------------------------------
  **Screen**            CAL-SCR-06 Entry and request history

  **Objective**         Show original details and every change

  **Trigger**           User opens history for event, parenting-time entry, or request

  **Preconditions**     Entry/request exists

  **System behavior**   Display edit/delete/cancel history, request approvals, actor, UTC time, and device; never overwrite or delete history.

  **Data viewed**       Audit/version history

  **Success**           History displayed

  **Permissions**       Parent/Co-parent for shared entries; creator only for private entries

  **Source**            CAL-10; FR-CAL-02-09, FR-CAL-02-12.

  **Screen(s)**         CAL-SCR-06 Entry history and request history
  ----------------------------------------------------------------------------------------------------------------------------------------------

1.  Open CAL-SCR-06 Entry history and request history (entry: Calendar navigation; CAL-SCR-05 Request detail, answer and undo).

2.  Make sure the preconditions are met: Entry/request exists.

3.  Perform the action: User opens history for event, parenting-time entry, or request.

4.  The system processes the action: Display edit/delete/cancel history, request approvals, actor, UTC time, and device; never overwrite or delete history.

5.  Result on success: History displayed.

7.9 Business rules and validations

  -------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**       **Rule**                                                                                                                      **Features**
  ------------ ----------------------------------------------------------------------------------------------------------------------------- ------------------
  BR-12        Every approval needs a confirm step and has a short undo window. The log records who approved, when, and from which device.   CAL-01, CAL-02

  BR-13        Original event details are kept. An event that has already started cannot be deleted.                                         CAL-01, CAL-10
  -------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------
  **Rule**   **Text**
  ---------- ---------------------------------------------------------------------------------------------------------------------------------
  BR-12      Every approval needs a confirm step and has a short undo window. The log records who approved, when, and from which device.

  BR-13      Original event details are kept. An event that has already started cannot be deleted.

  BR-16      Agency values are read-only in the app. Each one shows its source (API or batch) and the time it was last updated.

  BR-22      In Safety Mode, address and location are hidden, check-ins are off, contact details are masked, and notifications are discreet.
  --------------------------------------------------------------------------------------------------------------------------------------------

7.10 Messages and errors

Errors

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**    **When it shows**                                              **Text**                                                                                                         **Used by**
  --------- -------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------
  ERR-01    The end time is before the start time                          The end time must be after the start time.                                                                       FR-CAL-01-17

  ERR-02    A parent edits or cancels an entry that has started            This entry has already started, so it cannot be changed.                                                         FR-CAL-01-19, FR-CAL-10-04

  ERR-03    A parent edits or cancels an entry that someone else created   Only the person who created this entry can change it.                                                            FR-CAL-01-19

  ERR-04    An entry, a request or a setting cannot be saved               We could not save your change. Nothing was changed. Please try again.                                            FR-CAL-01-18, FR-CAL-02-15, FR-CAL-03-07, FR-CAL-04-06, FR-CAL-06-06, FR-CAL-08-07, FR-CAL-10-07, FR-CAL-11-06

  ERR-05    The respond-by date is less than 24 hours away                 Choose a respond-by date at least 24 hours from now.                                                             FR-CAL-02-03

  ERR-06    A parent answers a request that was already answered           This request was already answered.                                                                               FR-CAL-02-14

  ERR-07    A parent answers a request that expired                        This request expired. Ask for a new one.                                                                         FR-CAL-02-14

  ERR-08    A calendar connection fails                                    We could not connect your calendar. Your earlier entries are unchanged. Please try again.                        FR-CAL-05-09

  ERR-09    The compliance figures cannot be calculated                    We could not show this report. Please try again.                                                                 FR-CAL-07-07

  ERR-10    The location is not allowed or not available                   We could not get your location, so the check-in was not saved. Allow location for this check-in and try again.   FR-CAL-09-08
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Messages

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**       **When it shows**                  **Text**                                                                               **Feature**
  ------------ ---------------------------------- -------------------------------------------------------------------------------------- -------------
  MSGT-01      A request is sent                  Your request was sent to \[name\].                                                     CAL-02

  MSGT-02      An entry overlaps another entry    This overlaps another entry on your calendar. You can still save it.                   CAL-01

  MSGT-03      The approver is asked to confirm   You are about to approve this change. You can undo it for 10 minutes.                  CAL-02

  MSGT-04      The undo window ends               The change was added to the calendar.                                                  CAL-02

  MSGT-05      An approval is undone              Your approval was undone. The request is waiting again.                                CAL-02

  MSGT-06      A request expires                  This request expired. The calendar did not change.                                     CAL-02

  MSGT-07      A request is declined              \[name\] declined your request.                                                        CAL-02

  MSGT-08      A request is withdrawn             \[name\] withdrew a request.                                                           CAL-02

  MSGT-09      A shared event is cancelled        \[name\] cancelled the event \[title\].                                                CAL-01

  MSGT-10      An outside change is not applied   A change in your outside calendar was not applied. ParentPath keeps its own version.   CAL-05
  ----------------------------------------------------------------------------------------------------------------------------------------------------

7.11 Dependencies

  ----------------------------------------------------------------------------------------
  **Module**                 **What it needs from Calendar and Parenting Time**
  -------------------------- -------------------------------------------------------------
  Notifications              Event times for reminders

  Child Support Sync         CAL-01, so that hearings and deadlines show in the calendar

  Records and Court          Calendar entries, requests and history for the record

  Safety and Privacy         Check-ins and event locations that Safety Mode controls
  ----------------------------------------------------------------------------------------

12.3 Assumptions

-   The vendor help pages named in section 15 describe the apps on October 10, 2026 and can change.

7.12 End-to-end workflows and scenarios

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Workflow**   **Description**                                                                                                                                                                   **Module path**                 **Features / rules**
  -------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------- --------------------------------------
  WF-03          Choose Solo Mode, keep records; co-parent joins later; Solo records stay private until shared                                                                                     ACC → EXP/DOC/CAL/REC           ACC-03, BR-01

  WF-07          Create, edit (incl. recurring), cancel calendar events; history kept; reminders sent                                                                                              CAL → NTF → REC                 CAL-01, CAL-10, NTF-04

  WF-08          Parenting-time entry: Proposed → co-parent confirms → undo window → Active                                                                                                        CAL → NTF                       CAL-01, CAL-02

  WF-09          Schedule change / swap request: send → approve (confirm + 10-min undo) / decline / withdraw / expire                                                                              CAL → NTF → REC                 CAL-02, BR-12

  WF-13          Journal notes; data export (PDF/CSV, free); certified export with Record ID; public verification                                                                                  REC ← MSG/CAL/EXP/DOC/NTF/ACC   REC-01, REC-05, REC-07, BR-05, BR-20

  WF-14          Turn Safety Mode on (notice + confirm), effects across modules, Exit Now, turn off with one-time code                                                                             SAF → MSG/CAL/DOC/NTF/PLT/SUP   SAF-01, BR-22

  WF-20          Link a child-support case (state, details, one-time code, consent) → API/batch load → overview, comparison, hearings in calendar, reminders → share an item → unlink and export   CSS → ACC/EXP/CAL/NTF/REC       CSS-01--05, CSS-07, CSS-12, CSS-13
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Scenario**   **Scenario**                                                   **Expected behaviour**
  -------------- -------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------
  SCN-CAL-001    Parent A creates weekly parenting time; Parent B confirms      Entry is Proposed, then becomes Active after confirmation and the 10-minute undo window; approval log retains actor, UTC time, and device.

  SCN-CAL-002    Parent A requests a swap with respond-by date 12 hours ahead   Request is rejected with ERR-05 because respond-by must be at least 24 hours ahead.

  SCN-CAL-003    Parent B approves a swap and undoes it after 6 minutes         Request returns to Pending; calendar remains unchanged.

  SCN-CAL-004    Parent B approves a swap and does not undo                     After 10 minutes, calendar changes; Parent A is notified; approval remains in history.

  SCN-CAL-005    Parent A tries to edit Parent B's event                        System refuses with ERR-03; only the creator may edit.

  SCN-CAL-006    Parent cancels a shared future event                           Event remains as Cancelled; co-parent receives notification; history is retained.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Calendar entry**

  ---------------------------------------------------------------------------------------------------------
  **Meaning**                                            **Transition**
  ------------------------------------------------------ --------------------------------------------------
  Current event or confirmed parenting time              Created directly, or after Proposed confirmation

  Parenting-time entry awaiting co-parent confirmation   Becomes Active after confirm + undo window

  Event cancelled before start                           Terminal display state; retained in history

  Schedule request not answered by respond-by date       Terminal; calendar unchanged

  Schedule request rejected                              Terminal

  Requester cancelled pending request                    Terminal
  ---------------------------------------------------------------------------------------------------------

All calendar history is retained; entries are never deleted.
