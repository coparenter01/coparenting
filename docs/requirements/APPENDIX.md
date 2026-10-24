# Appendices (APPENDIX)


  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Feature**   **Name**                                                                                                             **FRs**   **ACs**   **Screens**                                                                                      **Actions (ACT)**                                                                           **Business rules**
  ------------- -------------------------------------------------------------------------------------------------------------------- --------- --------- ------------------------------------------------------------------------------------------------ ------------------------------------------------------------------------------------------- -----------------------------------
  ACC-01        Sign-in with two-factor authentication and biometric or passcode lock                                                12        24        ACC-SCR-01, ACC-SCR-02, ACC-SCR-03, ACC-SCR-04, ACC-SCR-17                                       ACT-ACC-001, ACT-ACC-005, ACT-ACC-006                                                       ---

  ACC-02        Invite the co-parent by text, email or link, with invite status                                                      15        30        ACC-SCR-05, ACC-SCR-06, ACC-SCR-07                                                               ACT-ACC-008, ACT-ACC-009, ACT-ACC-010                                                       BR-02

  ACC-03        Solo Mode: keep records without the co-parent joining                                                                9         12        ACC-SCR-08                                                                                       ACT-ACC-007, ACT-ACC-009                                                                    BR-01, BR-03

  ACC-04        Reach a co-parent who is not on the app, by text or email, with a full record                                        9         16        ACC-SCR-09                                                                                       ACT-ACC-011, ACT-MSG-010                                                                    BR-02, BR-07, BR-08

  ACC-05        Contact-attempt log                                                                                                  9         14        ACC-SCR-10                                                                                       ACT-ACC-011, ACT-ACC-012                                                                    BR-02

  ACC-06        User-set session timeout and draft auto-save                                                                         8         8         ACC-SCR-11                                                                                       ---                                                                                         ---

  ACC-07        Household roles: parent, child and third party                                                                       8         8         ACC-SCR-12                                                                                       ---                                                                                         ---

  ACC-09        Email verification at sign-up (proposed)                                                                             6         8         ACC-SCR-14                                                                                       ACT-ACC-001, ACT-ACC-002                                                                    ---

  ACC-10        Password reset (proposed)                                                                                            7         10        ACC-SCR-15                                                                                       ACT-ACC-003, ACT-ACC-004                                                                    ---

  ACC-11        Profile management (proposed)                                                                                        6         7         ACC-SCR-16                                                                                       ACT-ACC-013                                                                                 ---

  ACC-12        Account closure (proposed)                                                                                           7         7         ACC-SCR-18                                                                                       ---                                                                                         BR-05, BR-21

  NTF-01        Multi-channel alerts: push, then SMS and email if a message stays unread                                             11        14        NTF-SCR-01                                                                                       ACT-NTF-001                                                                                 BR-06, BR-07, BR-22

  NTF-02        Delivery and read status on every message, logged in the record                                                      10        15        NTF-SCR-03                                                                                       ACT-NTF-002, ACT-MSG-009                                                                    BR-07, BR-21, BR-22

  NTF-03        Notification health check in settings                                                                                5         6         NTF-SCR-02                                                                                       ---                                                                                         ---

  NTF-04        Event and deadline reminders                                                                                         12        16        ---                                                                                              ACT-NTF-003                                                                                 BR-07, BR-22

  NTF-05        Notification quiet windows or limits                                                                                 4         8         NTF-SCR-04                                                                                       ---                                                                                         ---

  NTF-06        Send service for account, invite and payment messages                                                                7         8         ---                                                                                              ACT-NTF-004                                                                                 BR-07

  MSG-01        Secure in-app messaging                                                                                              13        14        MSG-SCR-01, MSG-SCR-02, MSG-SCR-03, MSG-SCR-04                                                   ACT-MSG-001, ACT-MSG-002, ACT-MSG-003, ACT-MSG-004, ACT-MSG-010                             ---

  MSG-02        Messages cannot be edited or deleted                                                                                 6         6         MSG-SCR-02                                                                                       ---                                                                                         BR-08

  MSG-03        Time-stamped messages                                                                                                7         8         MSG-SCR-02                                                                                       ACT-MSG-009                                                                                 ---

  MSG-04        Tone checks on outgoing messages                                                                                     9         10        MSG-SCR-03, MSG-SCR-05                                                                           ACT-MSG-004, ACT-MSG-005                                                                    BR-09, BR-11

  MSG-05        AI rewrite suggestions for outgoing messages (opt-in)                                                                8         8         ---                                                                                              ---                                                                                         BR-11

  MSG-06        Incoming message shield with view-original                                                                           13        15        MSG-SCR-05, MSG-SCR-06                                                                           ACT-MSG-006, ACT-MSG-007                                                                    BR-10, BR-11

  MSG-07        Search messages by keyword or date                                                                                   7         7         MSG-SCR-08                                                                                       ---                                                                                         BR-10

  MSG-08        Message folders or topics                                                                                            7         7         MSG-SCR-09                                                                                       ---                                                                                         BR-08

  MSG-09        Attachments and files in messages                                                                                    9         9         MSG-SCR-10                                                                                       ---                                                                                         BR-08

  MSG-10        Group chat and messages to third parties                                                                             9         9         MSG-SCR-11                                                                                       ---                                                                                         BR-08

  MSG-11        AI co-parenting coach                                                                                                8         8         MSG-SCR-12                                                                                       ---                                                                                         BR-11

  MSG-12        Human mediation or counseling in the app                                                                             9         9         MSG-SCR-13                                                                                       ---                                                                                         BR-08, BR-22

  MSG-13        Urgent-message detection                                                                                             10        12        ---                                                                                              ---                                                                                         BR-11

  MSG-14        Report a message (proposed)                                                                                          9         9         MSG-SCR-07                                                                                       ACT-MSG-008                                                                                 BR-05, BR-08

  CLL-01        In-app audio and video calls                                                                                         17        20        CLL-SCR-01, CLL-SCR-02, CLL-SCR-03, CLL-SCR-04, CLL-SCR-06, CLL-SCR-07                           ---                                                                                         BR-22

  CLL-02        Call recording and transcription (with consent)                                                                      19        21        CLL-SCR-01, CLL-SCR-04, CLL-SCR-05, CLL-SCR-06                                                   ---                                                                                         BR-05, BR-11, BR-21

  CLL-03        Personal phone number hidden during calls                                                                            7         8         ---                                                                                              ---                                                                                         ---

  CAL-01        Shared calendar                                                                                                      19        24        CAL-SCR-01, CAL-SCR-02, CAL-SCR-03                                                               ACT-CAL-001, ACT-CAL-002, ACT-CAL-003, ACT-CAL-004, ACT-CAL-005, ACT-CAL-006, ACT-CAL-007   BR-12, BR-13, BR-16, BR-22

  CAL-02        Schedule change and swap requests with confirm step, undo window and approval log                                    15        19        CAL-SCR-04, CAL-SCR-05, CAL-SCR-06                                                               ACT-CAL-007, ACT-CAL-008, ACT-CAL-009, ACT-CAL-010, ACT-CAL-011, ACT-CAL-012                BR-12, BR-13

  CAL-03        Custody schedule templates and schedule builder                                                                      7         9         CAL-SCR-07                                                                                       ---                                                                                         BR-12

  CAL-04        Holiday scheduling and overrides                                                                                     6         6         CAL-SCR-08                                                                                       ---                                                                                         BR-12

  CAL-05        Two-way sync with Google, Apple and Outlook calendars                                                                10        14        CAL-SCR-09                                                                                       ---                                                                                         BR-22

  CAL-06        Parenting-time tracking                                                                                              7         9         CAL-SCR-10                                                                                       ---                                                                                         ---

  CAL-07        Parenting-time analytics and compliance view                                                                         7         7         CAL-SCR-11                                                                                       ---                                                                                         ---

  CAL-08        Parenting plan builder                                                                                               7         7         CAL-SCR-12                                                                                       ---                                                                                         ---

  CAL-09        Check-ins at exchanges (location)                                                                                    8         8         CAL-SCR-13                                                                                       ---                                                                                         BR-22

  CAL-10        Calendar audit trail (edit and delete history)                                                                       7         7         CAL-SCR-06                                                                                       ACT-CAL-004, ACT-CAL-012                                                                    BR-12, BR-13

  CAL-11        Pet schedules and pet expenses                                                                                       6         6         CAL-SCR-14                                                                                       ---                                                                                         BR-12

  EXP-01        Shared expense log                                                                                                   22        26        EXP-SCR-01, EXP-SCR-02, EXP-SCR-03                                                               ACT-EXP-001, ACT-EXP-002, ACT-EXP-003, ACT-EXP-005, ACT-EXP-008                             ---

  EXP-02        Receipt attachment and scanning                                                                                      13        14        EXP-SCR-02, EXP-SCR-03                                                                           ACT-EXP-004                                                                                 ---

  EXP-03        Reimbursement requests with deadlines and required proof                                                             22        28        EXP-SCR-04, EXP-SCR-05, EXP-SCR-06                                                               ACT-EXP-006, ACT-EXP-007, ACT-EXP-008                                                       BR-14, BR-22

  EXP-04        Running balance of who owes what                                                                                     11        11        EXP-SCR-09                                                                                       ---                                                                                         ---

  EXP-05        Split rules from the court order, applied to every shared expense                                                    18        24        EXP-SCR-10                                                                                       ---                                                                                         BR-15

  EXP-06        Expense categories and per-child tracking                                                                            8         8         EXP-SCR-01, EXP-SCR-02                                                                           ACT-EXP-012                                                                                 ---

  EXP-07        Record child support payments                                                                                        19        23        EXP-SCR-07, EXP-SCR-08                                                                           ACT-EXP-009, ACT-EXP-010, ACT-EXP-011                                                       BR-16

  EXP-08        In-app money transfer with payment status from start to end                                                          14        14        EXP-SCR-12                                                                                       ---                                                                                         ---

  EXP-09        Expense disputes                                                                                                     12        12        EXP-SCR-11                                                                                       ---                                                                                         BR-22

  EXP-10        Scheduled and recurring payments                                                                                     9         10        EXP-SCR-13                                                                                       ---                                                                                         ---

  EXP-11        AI-assisted expense entry                                                                                            11        11        EXP-SCR-14                                                                                       ---                                                                                         BR-11

  EXP-12        Bill pay direct to merchant                                                                                          9         9         EXP-SCR-15                                                                                       ---                                                                                         ---

  EXP-13        Pay expenses by credit card                                                                                          7         7         EXP-SCR-12                                                                                       ---                                                                                         ---

  EXP-14        Payments reported for credit building (opt-in)                                                                       8         8         EXP-SCR-16                                                                                       ---                                                                                         ---

  EXP-15        Import past expenses                                                                                                 9         9         EXP-SCR-17                                                                                       ---                                                                                         ---

  CSS-01        Link a child support case with identity check and consent                                                            16        17        CSS-SCR-01, CSS-SCR-02, CSS-SCR-09                                                               ---                                                                                         BR-18, BR-21

  CSS-02        Read-only pull of case status, order amount, payment history, arrears and next hearing                               13        13        CSS-SCR-03                                                                                       ---                                                                                         BR-16, BR-27, BR-28

  CSS-03        Agency payments and app-recorded payments side by side, with mismatch flags                                          10        13        CSS-SCR-04                                                                                       ---                                                                                         BR-16, BR-17

  CSS-04        Arrears, balance and due dates with reminders                                                                        7         7         CSS-SCR-03, CSS-SCR-05                                                                           ---                                                                                         BR-16, BR-28

  CSS-05        Hearings, deadlines and required documents in the calendar                                                           9         9         CSS-SCR-06                                                                                       ---                                                                                         BR-13, BR-16

  CSS-06        Send proof of direct payments and expense proofs to the agency                                                       10        10        CSS-SCR-10, CSS-SCR-11                                                                           ---                                                                                         BR-16, BR-19

  CSS-07        Source and last-synced label on every agency value                                                                   6         6         CSS-SCR-03                                                                                       ---                                                                                         BR-16, BR-28, BR-30

  CSS-08        Family-violence flag linked to Safety Mode                                                                           8         9         CSS-SCR-12                                                                                       ---                                                                                         BR-23, BR-28

  CSS-09        Child support notice as an extra invite channel                                                                      9         10        CSS-SCR-13                                                                                       ---                                                                                         BR-22

  CSS-10        Unified child support timeline                                                                                       8         8         CSS-SCR-14                                                                                       ---                                                                                         ---

  CSS-11        Hearing packet export                                                                                                9         9         CSS-SCR-15                                                                                       ---                                                                                         BR-05, BR-16, BR-20

  CSS-12        Sync engine: one integration layer, one connector for each state, API calls, batch loads and monitoring (proposed)   18        18        CSS-SCR-16                                                                                       ---                                                                                         BR-17, BR-27, BR-28, BR-29, BR-30

  CSS-13        Share one agency item with the co-parent or a professional (proposed)                                                11        13        CSS-SCR-07, CSS-SCR-08                                                                           ---                                                                                         BR-16

  REC-01        Certified court-ready record exports with record ID and public verification page                                     24        27        REC-SCR-01, REC-SCR-02, REC-SCR-03                                                               ACT-REC-003, ACT-REC-004                                                                    BR-05, BR-20, BR-22

  REC-02        Business records affidavit and subpoena support                                                                      19        21        REC-SCR-07, REC-SCR-08, REC-SCR-09, REC-SCR-10                                                   ---                                                                                         BR-20, BR-25

  REC-03        Court-order guidance by jurisdiction                                                                                 10        10        REC-SCR-11                                                                                       ---                                                                                         ---

  REC-04        Model order language that accepts any compliant app                                                                  9         9         REC-SCR-12                                                                                       ---                                                                                         ---

  REC-05        Data export (PDF, CSV)                                                                                               12        12        REC-SCR-01, REC-SCR-02                                                                           ACT-REC-002                                                                                 BR-05, BR-21

  REC-06        Data retention policy, deletion of non-record data and legal hold                                                    14        14        REC-SCR-13, REC-SCR-14, REC-SCR-15                                                               ---                                                                                         BR-21

  REC-07        Journal and incident notes                                                                                           17        17        REC-SCR-04, REC-SCR-05, REC-SCR-06                                                               ACT-REC-001                                                                                 BR-21, BR-22

  DOC-01        Child information storage (medical, school, contacts)                                                                22        22        DOC-SCR-01, DOC-SCR-02, DOC-SCR-03, DOC-SCR-04                                                   ACT-DOC-001, ACT-DOC-002, ACT-DOC-003, ACT-DOC-004, ACT-DOC-005                             BR-22

  DOC-02        Secure document and file storage                                                                                     20        20        DOC-SCR-05, DOC-SCR-06, DOC-SCR-07, DOC-SCR-08                                                   ACT-DOC-006, ACT-DOC-007, ACT-DOC-008                                                       ---

  DOC-03        Photo album and shared memories                                                                                      11        11        DOC-SCR-08, DOC-SCR-09                                                                           ---                                                                                         BR-22

  DOC-04        Wish list for the child\'s needs                                                                                     8         8         DOC-SCR-10                                                                                       ---                                                                                         ---

  DOC-05        Shared tasks and to-do lists                                                                                         10        10        DOC-SCR-11                                                                                       ---                                                                                         BR-22

  DOC-06        Expiring share links for files                                                                                       10        10        DOC-SCR-12, DOC-SCR-13                                                                           ---                                                                                         ---

  DOC-07        Emergency contact assignment                                                                                         11        11        DOC-SCR-14, DOC-SCR-15                                                                           ---                                                                                         BR-22

  PRO-01        Access for attorneys, mediators and therapists                                                                       22        25        PRO-SCR-01, PRO-SCR-02, PRO-SCR-03, PRO-SCR-04, PRO-SCR-05, PRO-SCR-06, PRO-SCR-07, PRO-SCR-08   ---                                                                                         BR-22, BR-24

  PRO-02        Private channel to a professional                                                                                    12        12        PRO-SCR-09, PRO-SCR-10                                                                           ---                                                                                         BR-24

  SAF-01        Safety Mode for survivors of abuse                                                                                   21        21        SAF-SCR-01, SAF-SCR-02, SAF-SCR-03, SAF-SCR-04, SAF-SCR-05, SAF-SCR-06                           ACT-SAF-001, ACT-SAF-002, ACT-SAF-003                                                       BR-05, BR-22, BR-23

  SAF-02        Notification preview and sensitive-image controls                                                                    13        14        SAF-SCR-07, SAF-SCR-08, SAF-SCR-09                                                               ACT-SAF-004                                                                                 BR-05

  SAF-03        AI privacy controls                                                                                                  13        13        SAF-SCR-10, SAF-SCR-11                                                                           ACT-SAF-005                                                                                 BR-11

  SUP-01        Support targets, case numbers and a searchable help center                                                           30        32        SUP-SCR-01, SUP-SCR-02, SUP-SCR-03, SUP-SCR-04, SUP-SCR-05, SUP-SCR-06, SUP-SCR-07, SUP-SCR-08   ACT-SUP-001, ACT-SUP-002, ACT-SUP-003                                                       BR-22, BR-25

  SUP-02        Staff support workspace (proposed)                                                                                   18        18        SUP-SCR-09, SUP-SCR-10, SUP-SCR-11, SUP-SCR-12, SUP-SCR-13                                       ACT-SUP-004                                                                                 BR-22, BR-25, BR-31

  SUP-03        Support measures report (proposed)                                                                                   8         8         SUP-SCR-14                                                                                       ---                                                                                         BR-05
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Appendix B. Parameter Index

  ----------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter ID**   **Parameter / control**                        **Type**                                        **Required**   **Screen**
  ------------------ ---------------------------------------------- ----------------------------------------------- -------------- -------------
  P-ACC-001-01       Email                                          Email input                                     Yes            ACC-SCR-01

  P-ACC-001-02       Display name                                   Text input                                      Yes            ACC-SCR-01

  P-ACC-001-03       Password                                       Password input                                  Yes            ACC-SCR-01

  P-ACC-001-04       Create account                                 Primary button                                  ---            ACC-SCR-01

  P-ACC-001-05       Sign in                                        Text link                                       ---            ACC-SCR-01

  P-ACC-002-01       Email display                                  Read-only text                                  Yes            ACC-SCR-14

  P-ACC-002-02       Verification code                              Numeric input                                   Yes            ACC-SCR-14

  P-ACC-002-03       Resend code                                    Secondary button                                ---            ACC-SCR-14

  P-ACC-002-04       Verify                                         Primary button                                  ---            ACC-SCR-14

  P-ACC-002-05       Change email                                   Text link                                       ---            ACC-SCR-14

  P-ACC-003-01       Email                                          Email input                                     Yes            ACC-SCR-02

  P-ACC-003-02       Password                                       Password input                                  Yes            ACC-SCR-02

  P-ACC-003-03       Forgot password                                Text link                                       ---            ACC-SCR-02

  P-ACC-003-04       Sign in                                        Primary button                                  ---            ACC-SCR-02

  P-ACC-003-05       Create account                                 Text link                                       ---            ACC-SCR-02

  P-ACC-004-01       Code destination                               Read-only text                                  Yes            ACC-SCR-03

  P-ACC-004-02       One-time code                                  Numeric input                                   Yes            ACC-SCR-03

  P-ACC-004-03       Send code by                                   Radio group                                     Conditional    ACC-SCR-03

  P-ACC-004-04       Resend code                                    Secondary button                                ---            ACC-SCR-03

  P-ACC-004-05       Verify                                         Primary button                                  ---            ACC-SCR-03

  P-ACC-004-06       Back to sign in                                Text link                                       ---            ACC-SCR-03

  P-ACC-005-01       Email                                          Email input                                     Yes            ACC-SCR-15

  P-ACC-005-02       Send reset link                                Primary button                                  ---            ACC-SCR-15

  P-ACC-005-03       Back to sign in                                Text link                                       ---            ACC-SCR-15

  P-ACC-006-01       Reset token                                    System / URL                                    Yes            ACC-SCR-15

  P-ACC-006-02       New password                                   Password input                                  Yes            ACC-SCR-15

  P-ACC-006-03       Confirm new password                           Password input                                  Yes            ACC-SCR-15

  P-ACC-006-04       Reset password                                 Primary button                                  ---            ACC-SCR-15

  P-ACC-006-05       Back to sign in                                Text link                                       ---            ACC-SCR-15

  P-ACC-007-01       Household mode                                 Radio group                                     Yes            ACC-SCR-08

  P-ACC-007-02       Choose Solo Mode                               Primary button                                  ---            ACC-SCR-08

  P-ACC-007-03       Invite co-parent                               Primary button                                  ---            ACC-SCR-08

  P-ACC-007-04       Privacy notice                                 Informational text                              ---            ACC-SCR-08

  P-ACC-008-01       Invite channel                                 Radio group                                     Yes            ACC-SCR-05

  P-ACC-008-02       Co-parent email                                Email input                                     Conditional    ACC-SCR-05

  P-ACC-008-03       Co-parent mobile                               Phone input                                     Conditional    ACC-SCR-05

  P-ACC-008-04       Send invite                                    Primary button                                  ---            ACC-SCR-05

  P-ACC-008-05       Generate link                                  Primary button                                  ---            ACC-SCR-05

  P-ACC-008-06       Invite link                                    Read-only text + Copy                           System         ACC-SCR-05

  P-ACC-008-07       View invite status                             Text link                                       ---            ACC-SCR-05

  P-ACC-009-01       Invite list                                    Table                                           ---            ACC-SCR-06

  P-ACC-009-02       Channel                                        Badge / text                                    System         ACC-SCR-06

  P-ACC-009-03       Status                                         Badge                                           System         ACC-SCR-06

  P-ACC-009-04       Sent at                                        Timestamp                                       System         ACC-SCR-06

  P-ACC-009-05       Expires at                                     Timestamp                                       System         ACC-SCR-06

  P-ACC-009-06       Cancel                                         Row action                                      ---            ACC-SCR-06

  P-ACC-009-07       Send new invite                                Primary button                                  ---            ACC-SCR-06

  P-ACC-009-08       Copy link                                      Row action                                      ---            ACC-SCR-06

  P-ACC-010-01       Invite token                                   System / URL                                    Yes            ACC-SCR-07

  P-ACC-010-02       Inviter name                                   Read-only text                                  System         ACC-SCR-07

  P-ACC-010-03       Email                                          Email input                                     Yes            ACC-SCR-07

  P-ACC-010-04       Display name                                   Text input                                      Yes            ACC-SCR-07

  P-ACC-010-05       Password                                       Password input                                  Yes            ACC-SCR-07

  P-ACC-010-06       Accept invite                                  Primary button                                  ---            ACC-SCR-07

  P-ACC-010-07       Continue to verification                       Secondary action                                ---            ACC-SCR-07

  P-ACC-011-01       Display name                                   Text input                                      Yes            ACC-SCR-16

  P-ACC-011-02       Email                                          Email input                                     Yes            ACC-SCR-16

  P-ACC-011-03       Mobile number                                  Phone input                                     No             ACC-SCR-16

  P-ACC-011-04       Language                                       Select                                          Yes            ACC-SCR-16

  P-ACC-011-05       Save                                           Primary button                                  ---            ACC-SCR-16

  P-ACC-011-06       Cancel                                         Secondary button                                ---            ACC-SCR-16

  P-ACC-012-01       Current password                               Password input                                  Conditional    ACC-SCR-04

  P-ACC-012-02       New password                                   Password input                                  Conditional    ACC-SCR-04

  P-ACC-012-03       App passcode                                   Numeric input                                   Conditional    ACC-SCR-04

  P-ACC-012-04       Passcode lock                                  Toggle                                          Yes            ACC-SCR-04

  P-ACC-012-05       Verified email                                 Read-only text                                  System         ACC-SCR-04

  P-ACC-012-06       Verified mobile                                Read-only text / edit                           No             ACC-SCR-04

  P-ACC-012-07       Sign out                                       Button                                          ---            ACC-SCR-04

  P-ACC-012-08       Change password                                Primary button                                  ---            ACC-SCR-04

  P-ACC-013-01       Contact channel                                Radio group                                     Yes            ACC-SCR-09

  P-ACC-013-02       Recipient email                                Email input                                     Conditional    ACC-SCR-09

  P-ACC-013-03       Recipient mobile                               Phone input                                     Conditional    ACC-SCR-09

  P-ACC-013-04       Message                                        Textarea                                        Yes            ACC-SCR-09

  P-ACC-013-05       Send                                           Primary button                                  ---            ACC-SCR-09

  P-ACC-013-06       View contact log                               Text link                                       ---            ACC-SCR-09

  P-ACC-014-01       Attempt list                                   Table                                           ---            ACC-SCR-10

  P-ACC-014-02       Attempt type                                   Badge                                           System         ACC-SCR-10

  P-ACC-014-03       Channel                                        Badge                                           System         ACC-SCR-10

  P-ACC-014-04       Result                                         Badge                                           System         ACC-SCR-10

  P-ACC-014-05       Attempt time                                   Timestamp                                       System         ACC-SCR-10

  P-ACC-014-06       Message preview                                Text                                            System         ACC-SCR-10

  P-ACC-014-07       Filter                                         Control group                                   No             ACC-SCR-10

  P-ACC-015-01       Household mode                                 Badge                                           System         ACC-SCR-B01

  P-ACC-015-02       Members                                        Member list                                     System         ACC-SCR-B01

  P-ACC-015-03       Member role                                    Badge                                           System         ACC-SCR-B01

  P-ACC-015-04       Plan                                           Badge                                           System         ACC-SCR-B01

  P-ACC-015-05       Payer name                                     Text                                            System         ACC-SCR-B01

  P-ACC-015-06       Invite co-parent                               Button                                          ---            ACC-SCR-B01

  P-ACC-015-07       Message outside app                            Button                                          ---            ACC-SCR-B01

  P-ACC-015-08       Manage profile                                 Link                                            ---            ACC-SCR-B01

  P-ACC-015-09       Manage security                                Link                                            ---            ACC-SCR-B01

  P-MSG-001-01       Thread list                                    Table / list                                    ---            MSG-SCR-01

  P-MSG-001-02       Subject                                        Text                                            System         MSG-SCR-01

  P-MSG-001-03       Latest message preview                         Text                                            System         MSG-SCR-01

  P-MSG-001-04       Latest activity time                           Timestamp                                       System         MSG-SCR-01

  P-MSG-001-05       Unread indicator                               Badge                                           System         MSG-SCR-01

  P-MSG-001-06       Search                                         Search input                                    No             MSG-SCR-01

  P-MSG-001-07       New message                                    Primary button                                  ---            MSG-SCR-01

  P-MSG-001-08       Solo Mode notice                               Informational text                              ---            MSG-SCR-01

  P-MSG-002-01       Subject                                        Text input                                      Yes            MSG-SCR-03

  P-MSG-002-02       Message                                        Textarea                                        Yes            MSG-SCR-03

  P-MSG-002-03       Character count                                Helper text                                     ---            MSG-SCR-03

  P-MSG-002-04       Save draft                                     Secondary button                                ---            MSG-SCR-03

  P-MSG-002-05       Send                                           Primary button                                  ---            MSG-SCR-03

  P-MSG-002-06       Cancel                                         Secondary button                                ---            MSG-SCR-03

  P-MSG-003-01       Thread subject                                 Page title                                      System         MSG-SCR-02

  P-MSG-003-02       Message list                                   Message stream                                  ---            MSG-SCR-02

  P-MSG-003-03       Sender name                                    Text                                            System         MSG-SCR-02

  P-MSG-003-04       Message text                                   Text                                            System         MSG-SCR-02

  P-MSG-003-05       Sent time                                      Timestamp                                       System         MSG-SCR-02

  P-MSG-003-06       First-read time                                Timestamp                                       System         MSG-SCR-02

  P-MSG-003-07       Message status                                 Badge                                           System         MSG-SCR-02

  P-MSG-003-08       Reply                                          Primary button / composer                       ---            MSG-SCR-02

  P-MSG-003-09       Report message                                 Row action                                      ---            MSG-SCR-02

  P-MSG-003-10       Held message indicator                         Badge                                           System         MSG-SCR-02

  P-MSG-003-11       Edit / delete sent message                     Not displayed                                   ---            MSG-SCR-02

  P-MSG-004-01       Thread subject                                 Read-only text                                  System         MSG-SCR-03

  P-MSG-004-02       Message                                        Textarea                                        Yes            MSG-SCR-03

  P-MSG-004-03       Character count                                Helper text                                     ---            MSG-SCR-03

  P-MSG-004-04       Save draft                                     Secondary button                                ---            MSG-SCR-03

  P-MSG-004-05       Send                                           Primary button                                  ---            MSG-SCR-03

  P-MSG-004-06       Cancel                                         Secondary button                                ---            MSG-SCR-03

  P-MSG-005-01       Concern phrases                                Highlighted text                                System         MSG-SCR-03

  P-MSG-005-02       Concern reason                                 Text                                            System         MSG-SCR-03

  P-MSG-005-03       Edit message                                   Primary button                                  ---            MSG-SCR-03

  P-MSG-005-04       Send anyway                                    Secondary button                                ---            MSG-SCR-03

  P-MSG-005-05       AI notice                                      Informational text                              ---            MSG-SCR-03

  P-MSG-005-06       AI unavailable notice                          Informational text                              System         MSG-SCR-03

  P-MSG-006-01       Sender name                                    Text                                            System         MSG-SCR-06

  P-MSG-006-02       Message time                                   Timestamp                                       System         MSG-SCR-06

  P-MSG-006-03       Held notice                                    Badge / text                                    System         MSG-SCR-06

  P-MSG-006-04       Hold reason                                    Text                                            System         MSG-SCR-06

  P-MSG-006-05       Original message                               Hidden text / reveal control                    System         MSG-SCR-06

  P-MSG-006-06       Shield level                                   Read-only text                                  System         MSG-SCR-06

  P-MSG-006-07       Report incorrect hold                          Button / link                                   ---            MSG-SCR-06

  P-MSG-006-08       Delete / block                                 Not displayed                                   ---            MSG-SCR-06

  P-MSG-007-01       Reported message preview                       Read-only text                                  System         MSG-SCR-07

  P-MSG-007-02       Report reason                                  Select / radio                                  Yes            MSG-SCR-07

  P-MSG-007-03       Additional details                             Textarea                                        No             MSG-SCR-07

  P-MSG-007-04       Share message with review team                 Toggle                                          Conditional    MSG-SCR-07

  P-MSG-007-05       Submit report                                  Primary button                                  ---            MSG-SCR-07

  P-MSG-007-06       Cancel                                         Secondary button                                ---            MSG-SCR-07

  P-MSG-008-01       Message preview                                Read-only text                                  System         NTF-SCR-03

  P-MSG-008-02       Sent time                                      Timestamp                                       System         NTF-SCR-03

  P-MSG-008-03       Status timeline                                Event list                                      System         NTF-SCR-03

  P-MSG-008-04       Status time                                    Timestamp                                       System         NTF-SCR-03

  P-MSG-008-05       First-read time                                Timestamp                                       System         NTF-SCR-03

  P-MSG-008-06       Close                                          Button                                          ---            NTF-SCR-03

  P-CAL-001-01       Selected date                                  Date picker / display                           Yes            CAL-SCR-01

  P-CAL-001-02       Day timeline                                   Calendar grid                                   ---            CAL-SCR-01

  P-CAL-001-03       Event item                                     Clickable card                                  System         CAL-SCR-01

  P-CAL-001-04       Parenting-time item                            Clickable card                                  System         CAL-SCR-01

  P-CAL-001-05       Parent color legend                            Legend                                          System         CAL-SCR-01

  P-CAL-001-06       Add event                                      Primary button                                  ---            CAL-SCR-01

  P-CAL-001-07       Add parenting time                             Primary button                                  ---            CAL-SCR-01

  P-CAL-001-08       Request schedule change                        Button / menu item                              ---            CAL-SCR-01

  P-CAL-001-09       View switcher                                  Tabs / segmented control                        Yes            CAL-SCR-01

  P-CAL-001-10       Agency item                                    Read-only card                                  System         CAL-SCR-01

  P-CAL-002-01       Week start date                                Date display / picker                           Yes            CAL-SCR-01

  P-CAL-002-02       Week grid                                      Calendar grid                                   ---            CAL-SCR-01

  P-CAL-002-03       Event item                                     Clickable card                                  System         CAL-SCR-01

  P-CAL-002-04       Parenting-time item                            Clickable card                                  System         CAL-SCR-01

  P-CAL-002-05       Add event                                      Primary button                                  ---            CAL-SCR-01

  P-CAL-002-06       Add parenting time                             Primary button                                  ---            CAL-SCR-01

  P-CAL-002-07       View switcher                                  Tabs                                            Yes            CAL-SCR-01

  P-CAL-002-08       Previous / next week                           Navigation buttons                              ---            CAL-SCR-01

  P-CAL-003-01       Month / year                                   Month picker                                    Yes            CAL-SCR-01

  P-CAL-003-02       Month grid                                     Calendar grid                                   ---            CAL-SCR-01

  P-CAL-003-03       Event indicator                                Compact card / dot                              System         CAL-SCR-01

  P-CAL-003-04       Parenting-time indicator                       Compact card / color block                      System         CAL-SCR-01

  P-CAL-003-05       Add event                                      Primary button                                  ---            CAL-SCR-01

  P-CAL-003-06       Add parenting time                             Primary button                                  ---            CAL-SCR-01

  P-CAL-003-07       View switcher                                  Tabs                                            Yes            CAL-SCR-01

  P-CAL-003-08       Previous / next month                          Navigation buttons                              ---            CAL-SCR-01

  P-CAL-004-01       Title                                          Read-only text                                  Yes            CAL-SCR-02

  P-CAL-004-02       Details                                        Read-only text                                  No             CAL-SCR-02

  P-CAL-004-03       Date                                           Read-only date                                  Yes            CAL-SCR-02

  P-CAL-004-04       Start time                                     Timestamp                                       Yes            CAL-SCR-02

  P-CAL-004-05       End time                                       Timestamp                                       Yes            CAL-SCR-02

  P-CAL-004-06       Location                                       Text / map link                                 No             CAL-SCR-02

  P-CAL-004-07       Children                                       Chip list                                       No             CAL-SCR-02

  P-CAL-004-08       Drop-off parent                                Text                                            No             CAL-SCR-02

  P-CAL-004-09       Pick-up parent                                 Text                                            No             CAL-SCR-02

  P-CAL-004-10       Repeat rule                                    Badge                                           System         CAL-SCR-02

  P-CAL-004-11       Visibility                                     Badge                                           System         CAL-SCR-02

  P-CAL-004-12       Status                                         Badge                                           System         CAL-SCR-02

  P-CAL-004-13       Edit                                           Primary button                                  ---            CAL-SCR-02

  P-CAL-004-14       Cancel event                                   Destructive button                              ---            CAL-SCR-02

  P-CAL-004-15       View history                                   Link                                            ---            CAL-SCR-02

  P-CAL-005-01       Title                                          Text input                                      Yes            CAL-SCR-02

  P-CAL-005-02       Details                                        Textarea                                        No             CAL-SCR-02

  P-CAL-005-03       Date                                           Date picker                                     Yes            CAL-SCR-02

  P-CAL-005-04       Start time                                     Time picker                                     Yes            CAL-SCR-02

  P-CAL-005-05       End time                                       Time picker                                     Yes            CAL-SCR-02

  P-CAL-005-06       Location                                       Text input                                      No             CAL-SCR-02

  P-CAL-005-07       Children                                       Multi-select                                    No             CAL-SCR-02

  P-CAL-005-08       Drop-off parent                                Select                                          No             CAL-SCR-02

  P-CAL-005-09       Pick-up parent                                 Select                                          No             CAL-SCR-02

  P-CAL-005-10       Repeats                                        Toggle / select                                 No             CAL-SCR-02

  P-CAL-005-11       Custom repeat days                             Multi-select / control                          Conditional    CAL-SCR-02

  P-CAL-005-12       Private event                                  Toggle                                          Yes            CAL-SCR-02

  P-CAL-005-13       Overlap warning                                Warning message                                 System         CAL-SCR-02

  P-CAL-005-14       Save                                           Primary button                                  ---            CAL-SCR-02

  P-CAL-005-15       Cancel                                         Secondary button                                ---            CAL-SCR-02

  P-CAL-006-01       Edit scope                                     Radio group                                     Yes            CAL-SCR-02

  P-CAL-006-02       Event fields                                   Same controls as CLL-SCR-05 Recording request   Conditional    CAL-SCR-02

  P-CAL-006-03       Repeat pattern                                 Read-only text                                  System         CAL-SCR-02

  P-CAL-006-04       Save changes                                   Primary button                                  ---            CAL-SCR-02

  P-CAL-006-05       Cancel                                         Secondary button                                ---            CAL-SCR-02

  P-CAL-007-01       Parent                                         Text / avatar                                   System         CAL-SCR-03

  P-CAL-007-02       Children                                       Chip list                                       No             CAL-SCR-03

  P-CAL-007-03       Start                                          Timestamp                                       Yes            CAL-SCR-03

  P-CAL-007-04       End                                            Timestamp                                       Yes            CAL-SCR-03

  P-CAL-007-05       Repeat rule                                    Badge                                           System         CAL-SCR-03

  P-CAL-007-06       Status                                         Badge                                           System         CAL-SCR-03

  P-CAL-007-07       Parent color                                   Color indicator                                 System         CAL-SCR-03

  P-CAL-007-08       Confirm                                        Primary button                                  ---            CAL-SCR-03

  P-CAL-007-09       Request change                                 Primary button                                  ---            CAL-SCR-03

  P-CAL-007-10       Edit                                           Button                                          Conditional    CAL-SCR-03

  P-CAL-007-11       View history                                   Link                                            ---            CAL-SCR-03

  P-CAL-008-01       Parent                                         Select                                          Yes            CAL-SCR-03

  P-CAL-008-02       Children                                       Multi-select                                    No             CAL-SCR-03

  P-CAL-008-03       Start                                          Date-time picker                                Yes            CAL-SCR-03

  P-CAL-008-04       End                                            Date-time picker                                Yes            CAL-SCR-03

  P-CAL-008-05       Repeats                                        Toggle / select                                 No             CAL-SCR-03

  P-CAL-008-06       Overlap warning                                Warning message                                 System         CAL-SCR-03

  P-CAL-008-07       Save                                           Primary button                                  ---            CAL-SCR-03

  P-CAL-008-08       Cancel                                         Secondary button                                ---            CAL-SCR-03

  P-CAL-009-01       Request type                                   Radio group                                     Yes            CAL-SCR-04

  P-CAL-009-02       Children                                       Multi-select                                    Yes            CAL-SCR-04

  P-CAL-009-03       Change start                                   Date-time picker                                Yes            CAL-SCR-04

  P-CAL-009-04       Change end                                     Date-time picker                                Yes            CAL-SCR-04

  P-CAL-009-05       Reason                                         Textarea                                        Yes            CAL-SCR-04

  P-CAL-009-06       Respond by                                     Date-time picker                                Yes            CAL-SCR-04

  P-CAL-009-07       Offered return start                           Date-time picker                                Conditional    CAL-SCR-04

  P-CAL-009-08       Offered return end                             Date-time picker                                Conditional    CAL-SCR-04

  P-CAL-009-09       Send request                                   Primary button                                  ---            CAL-SCR-04

  P-CAL-009-10       Cancel                                         Secondary button                                ---            CAL-SCR-04

  P-CAL-010-01       Request type                                   Badge                                           System         CAL-SCR-05

  P-CAL-010-02       Requested by                                   Text                                            System         CAL-SCR-05

  P-CAL-010-03       Children                                       Chip list                                       System         CAL-SCR-05

  P-CAL-010-04       Change period                                  Timestamp range                                 System         CAL-SCR-05

  P-CAL-010-05       Offered return period                          Timestamp range                                 System         CAL-SCR-05

  P-CAL-010-06       Reason                                         Text                                            System         CAL-SCR-05

  P-CAL-010-07       Respond by                                     Timestamp                                       System         CAL-SCR-05

  P-CAL-010-08       Status                                         Badge                                           System         CAL-SCR-05

  P-CAL-010-09       Approve                                        Primary button                                  ---            CAL-SCR-05

  P-CAL-010-10       Decline                                        Destructive button                              ---            CAL-SCR-05

  P-CAL-010-11       Decline reason                                 Textarea                                        No             CAL-SCR-05

  P-CAL-010-12       Withdraw                                       Destructive button                              ---            CAL-SCR-05

  P-CAL-010-13       View history                                   Link                                            ---            CAL-SCR-05

  P-CAL-011-01       Change summary                                 Read-only summary                               System         CAL-SCR-05

  P-CAL-011-02       Calendar impact                                Read-only preview                               System         CAL-SCR-05

  P-CAL-011-03       Confirm approval                               Primary button                                  Yes            CAL-SCR-05

  P-CAL-011-04       Cancel                                         Secondary button                                ---            CAL-SCR-05

  P-CAL-011-05       Undo approval                                  Destructive button                              ---            CAL-SCR-05

  P-CAL-011-06       Undo countdown                                 Timer                                           System         CAL-SCR-05

  P-CAL-012-01       Request list                                   Table / list                                    ---            CAL-SCR-06

  P-CAL-012-02       Request type                                   Badge                                           System         CAL-SCR-06

  P-CAL-012-03       Status                                         Badge                                           System         CAL-SCR-06

  P-CAL-012-04       Requested by                                   Text                                            System         CAL-SCR-06

  P-CAL-012-05       Change period                                  Timestamp range                                 System         CAL-SCR-06

  P-CAL-012-06       Respond-by                                     Timestamp                                       System         CAL-SCR-06

  P-CAL-012-07       Filter                                         Control group                                   No             CAL-SCR-06

  P-CAL-012-08       Open request                                   Row action                                      ---            CAL-SCR-06

  P-CAL-013-01       Entity type                                    Read-only badge                                 System         CAL-SCR-06

  P-CAL-013-02       Original details                               Read-only section                               System         CAL-SCR-06

  P-CAL-013-03       Change history                                 Timeline / table                                System         CAL-SCR-06

  P-CAL-013-04       Actor                                          Text                                            System         CAL-SCR-06

  P-CAL-013-05       Change time                                    Timestamp                                       System         CAL-SCR-06

  P-CAL-013-06       Device                                         Text / badge                                    System         CAL-SCR-06

  P-CAL-013-07       Result                                         Badge                                           System         CAL-SCR-06

  P-CAL-013-08       Back                                           Button / link                                   ---            CAL-SCR-06

  P-EXP-001-01       Expense list                                   Table / list                                    ---            EXP-SCR-01

  P-EXP-001-02       Description                                    Text                                            System         EXP-SCR-01

  P-EXP-001-03       Category                                       Badge                                           System         EXP-SCR-01

  P-EXP-001-04       Expense date                                   Date                                            System         EXP-SCR-01

  P-EXP-001-05       Amount                                         Currency                                        System         EXP-SCR-01

  P-EXP-001-06       Status                                         Badge                                           System         EXP-SCR-01

  P-EXP-001-07       Visibility                                     Badge                                           System         EXP-SCR-01

  P-EXP-001-08       Total                                          Currency display                                System         EXP-SCR-01

  P-EXP-001-09       Category filter                                Select / multi-select                           No             EXP-SCR-01

  P-EXP-001-10       Child filter                                   Select / multi-select                           No             EXP-SCR-01

  P-EXP-001-11       Add expense                                    Primary button                                  ---            EXP-SCR-01

  P-EXP-001-12       Record child support                           Button / tab                                    ---            EXP-SCR-01

  P-EXP-002-01       Description                                    Read-only text                                  Yes            EXP-SCR-03

  P-EXP-002-02       Category                                       Badge                                           Yes            EXP-SCR-03

  P-EXP-002-03       Expense date                                   Date                                            Yes            EXP-SCR-03

  P-EXP-002-04       Amount                                         Currency                                        Yes            EXP-SCR-03

  P-EXP-002-05       Paid by                                        Text                                            System         EXP-SCR-03

  P-EXP-002-06       Children                                       Chip list                                       No             EXP-SCR-03

  P-EXP-002-07       Note                                           Text                                            No             EXP-SCR-03

  P-EXP-002-08       Visibility                                     Badge                                           System         EXP-SCR-03

  P-EXP-002-09       Status                                         Badge                                           System         EXP-SCR-03

  P-EXP-002-10       Receipts                                       File list                                       No             EXP-SCR-03

  P-EXP-002-11       Reimbursement request                          Summary / link                                  System         EXP-SCR-03

  P-EXP-002-12       Version history                                Timeline / table                                System         EXP-SCR-03

  P-EXP-002-13       Edit                                           Primary button                                  ---            EXP-SCR-03

  P-EXP-002-14       Void                                           Destructive button                              ---            EXP-SCR-03

  P-EXP-002-15       Share                                          Button                                          ---            EXP-SCR-03

  P-EXP-002-16       Request reimbursement                          Primary button                                  ---            EXP-SCR-03

  P-EXP-002-17       Add receipt                                    Button                                          ---            EXP-SCR-03

  P-EXP-002-18       Delete                                         Not displayed                                   ---            EXP-SCR-03

  P-EXP-003-01       Description                                    Text input                                      Yes            EXP-SCR-02

  P-EXP-003-02       Category                                       Select                                          Yes            EXP-SCR-02

  P-EXP-003-03       Expense date                                   Date picker                                     Yes            EXP-SCR-02

  P-EXP-003-04       Amount                                         Currency input                                  Yes            EXP-SCR-02

  P-EXP-003-05       Children                                       Multi-select                                    No             EXP-SCR-02

  P-EXP-003-06       Note                                           Textarea                                        No             EXP-SCR-02

  P-EXP-003-07       Paid by                                        Read-only text                                  System         EXP-SCR-02

  P-EXP-003-08       Visibility                                     Toggle / radio                                  Yes            EXP-SCR-02

  P-EXP-003-09       Save                                           Primary button                                  ---            EXP-SCR-02

  P-EXP-003-10       Cancel                                         Secondary button                                ---            EXP-SCR-02

  P-EXP-003-11       Character count                                Helper text                                     ---            EXP-SCR-02

  P-EXP-004-01       Choose file                                    File input                                      Conditional    EXP-SCR-02

  P-EXP-004-02       Take photo                                     Camera button                                   Conditional    EXP-SCR-02

  P-EXP-004-03       File name                                      Text                                            System         EXP-SCR-02

  P-EXP-004-04       File type                                      Badge                                           System         EXP-SCR-02

  P-EXP-004-05       File size                                      Text                                            System         EXP-SCR-02

  P-EXP-004-06       Added at                                       Timestamp                                       System         EXP-SCR-02

  P-EXP-004-07       File preview                                   Image / PDF viewer                              System         EXP-SCR-02

  P-EXP-004-08       Upload                                         Primary button                                  ---            EXP-SCR-02

  P-EXP-004-09       Remove file                                    Not displayed                                   ---            EXP-SCR-02

  P-EXP-004-10       Done                                           Secondary button                                ---            EXP-SCR-02

  P-EXP-005-01       Expense summary                                Read-only text                                  System         EXP-SCR-02

  P-EXP-005-02       Sharing notice                                 Informational text                              ---            EXP-SCR-02

  P-EXP-005-03       Confirm share                                  Primary button                                  Yes            EXP-SCR-02

  P-EXP-005-04       Cancel                                         Secondary button                                ---            EXP-SCR-02

  P-EXP-005-05       Alert notice                                   Informational text                              System         EXP-SCR-02

  P-EXP-006-01       Expense summary                                Read-only text                                  System         EXP-SCR-04

  P-EXP-006-02       Amount requested                               Currency input                                  Yes            EXP-SCR-04

  P-EXP-006-03       Pay-by date                                    Date picker                                     Yes            EXP-SCR-04

  P-EXP-006-04       Proof needed                                   Select                                          Yes            EXP-SCR-04

  P-EXP-006-05       Note                                           Textarea                                        No             EXP-SCR-04

  P-EXP-006-06       Send request                                   Primary button                                  ---            EXP-SCR-04

  P-EXP-006-07       Cancel                                         Secondary button                                ---            EXP-SCR-04

  P-EXP-007-01       Expense summary                                Read-only text                                  System         EXP-SCR-05

  P-EXP-007-02       Amount requested                               Currency                                        System         EXP-SCR-05

  P-EXP-007-03       Pay-by date                                    Date                                            System         EXP-SCR-05

  P-EXP-007-04       Proof needed                                   Badge                                           System         EXP-SCR-05

  P-EXP-007-05       Request note                                   Text                                            System         EXP-SCR-05

  P-EXP-007-06       Status                                         Badge                                           System         EXP-SCR-05

  P-EXP-007-07       Overdue flag                                   Badge                                           System         EXP-SCR-05

  P-EXP-007-08       Accept                                         Primary button                                  ---            EXP-SCR-05

  P-EXP-007-09       Decline                                        Destructive button                              ---            EXP-SCR-05

  P-EXP-007-10       Mark paid / record payment received            Button / form                                   Conditional    EXP-SCR-05

  P-EXP-007-11       Amount received                                Currency input                                  Conditional    EXP-SCR-05

  P-EXP-007-12       Date received                                  Date picker                                     Conditional    EXP-SCR-05

  P-EXP-007-13       Payment note                                   Textarea                                        No             EXP-SCR-05

  P-EXP-007-14       Withdraw                                       Destructive button                              ---            EXP-SCR-05

  P-EXP-007-15       Request history                                Timeline                                        System         EXP-SCR-05

  P-EXP-008-01       Payment list                                   Table / list                                    ---            EXP-SCR-08

  P-EXP-008-02       Amount                                         Currency                                        System         EXP-SCR-08

  P-EXP-008-03       Date paid                                      Date                                            System         EXP-SCR-08

  P-EXP-008-04       Payment method                                 Badge                                           System         EXP-SCR-08

  P-EXP-008-05       Sync status                                    Badge                                           System         EXP-SCR-08

  P-EXP-008-06       Payment status                                 Badge                                           System         EXP-SCR-08

  P-EXP-008-07       Add payment                                    Primary button                                  ---            EXP-SCR-08

  P-EXP-008-08       Privacy notice                                 Informational text                              ---            EXP-SCR-08

  P-EXP-009-01       Amount                                         Currency input                                  Yes            EXP-SCR-07

  P-EXP-009-02       Date paid                                      Date picker                                     Yes            EXP-SCR-07

  P-EXP-009-03       Payment method                                 Select                                          Yes            EXP-SCR-07

  P-EXP-009-04       Note                                           Textarea                                        No             EXP-SCR-07

  P-EXP-009-05       Visibility                                     Read-only badge                                 System         EXP-SCR-07

  P-EXP-009-06       Save                                           Primary button                                  ---            EXP-SCR-07

  P-EXP-009-07       Cancel                                         Secondary button                                ---            EXP-SCR-07

  P-EXP-010-01       Amount                                         Currency                                        System         EXP-SCR-08

  P-EXP-010-02       Date paid                                      Date                                            System         EXP-SCR-08

  P-EXP-010-03       Payment method                                 Badge                                           System         EXP-SCR-08

  P-EXP-010-04       Note                                           Text                                            System         EXP-SCR-08

  P-EXP-010-05       Sync status                                    Badge                                           System         EXP-SCR-08

  P-EXP-010-06       Payment status                                 Badge                                           System         EXP-SCR-08

  P-EXP-010-07       Edit                                           Primary button                                  ---            EXP-SCR-08

  P-EXP-010-08       Void                                           Destructive button                              ---            EXP-SCR-08

  P-EXP-010-09       Share                                          Button                                          ---            EXP-SCR-08

  P-EXP-010-10       History                                        Timeline                                        System         EXP-SCR-08

  P-EXP-010-11       Delete                                         Not displayed                                   ---            EXP-SCR-08

  P-EXP-011-01       Category filter                                Select / multi-select                           No             EXP-SCR-01

  P-EXP-011-02       Child filter                                   Select / multi-select                           No             EXP-SCR-01

  P-EXP-011-03       Status filter                                  Select                                          No             EXP-SCR-01

  P-EXP-011-04       Apply                                          Primary button                                  ---            EXP-SCR-01

  P-EXP-011-05       Clear filters                                  Secondary button                                ---            EXP-SCR-01

  P-EXP-011-06       Filtered total                                 Currency display                                System         EXP-SCR-01

  P-DOC-001-01       Child list                                     Card / table list                               ---            DOC-SCR-01

  P-DOC-001-02       First name                                     Text                                            System         DOC-SCR-01

  P-DOC-001-03       Age                                            Calculated text                                 System         DOC-SCR-01

  P-DOC-001-04       Date of birth                                  Date                                            System         DOC-SCR-01

  P-DOC-001-05       Status                                         Badge                                           System         DOC-SCR-01

  P-DOC-001-06       Add child                                      Primary button                                  ---            DOC-SCR-01

  P-DOC-001-07       Edit child                                     Row action                                      ---            DOC-SCR-01

  P-DOC-001-08       View information                               Row action                                      ---            DOC-SCR-01

  P-DOC-002-01       First name                                     Text input                                      Yes            DOC-SCR-01

  P-DOC-002-02       Date of birth                                  Date picker                                     Yes            DOC-SCR-01

  P-DOC-002-03       Household                                      System                                          Yes            DOC-SCR-01

  P-DOC-002-04       Save                                           Primary button                                  ---            DOC-SCR-01

  P-DOC-002-05       Cancel                                         Secondary button                                ---            DOC-SCR-01

  P-DOC-002-06       Archive                                        Destructive button                              Conditional    DOC-SCR-01

  P-DOC-003-01       Child name                                     Page title                                      System         DOC-SCR-01

  P-DOC-003-02       Date of birth / age                            Read-only text                                  System         DOC-SCR-01

  P-DOC-003-03       Status                                         Badge                                           System         DOC-SCR-01

  P-DOC-003-04       Information tabs                               Tab navigation                                  ---            DOC-SCR-01

  P-DOC-003-05       Related documents                              Document list                                   System         DOC-SCR-01

  P-DOC-003-06       Add information                                Primary button                                  ---            DOC-SCR-01

  P-DOC-003-07       Edit child                                     Button                                          ---            DOC-SCR-01

  P-DOC-003-08       Upload document                                Button                                          ---            DOC-SCR-01

  P-DOC-004-01       Section tabs                                   Tabs                                            Yes            DOC-SCR-02

  P-DOC-004-02       Child filter                                   Select                                          No             DOC-SCR-02

  P-DOC-004-03       Information list                               Table / card list                               ---            DOC-SCR-02

  P-DOC-004-04       Title                                          Text                                            System         DOC-SCR-02

  P-DOC-004-05       Entry type                                     Badge                                           System         DOC-SCR-02

  P-DOC-004-06       Child                                          Badge                                           System         DOC-SCR-02

  P-DOC-004-07       Visibility                                     Badge                                           System         DOC-SCR-02

  P-DOC-004-08       Status                                         Badge                                           System         DOC-SCR-02

  P-DOC-004-09       Add information                                Primary button                                  ---            DOC-SCR-02

  P-DOC-005-01       Section                                        Badge                                           System         DOC-SCR-04

  P-DOC-005-02       Entry type                                     Badge                                           System         DOC-SCR-04

  P-DOC-005-03       Child                                          Text                                            System         DOC-SCR-04

  P-DOC-005-04       Title                                          Read-only text                                  Yes            DOC-SCR-04

  P-DOC-005-05       Details                                        Read-only text                                  Conditional    DOC-SCR-04

  P-DOC-005-06       Contact fields                                 Read-only fields                                Conditional    DOC-SCR-04

  P-DOC-005-07       Linked documents                               File list                                       No             DOC-SCR-04

  P-DOC-005-08       Visibility                                     Badge                                           System         DOC-SCR-04

  P-DOC-005-09       Status                                         Badge                                           System         DOC-SCR-04

  P-DOC-005-10       Edit                                           Primary button                                  ---            DOC-SCR-04

  P-DOC-005-11       Share                                          Button                                          ---            DOC-SCR-04

  P-DOC-005-12       Archive / Restore                              Destructive / secondary button                  ---            DOC-SCR-04

  P-DOC-005-13       Version history                                Timeline                                        System         DOC-SCR-04

  P-DOC-006-01       Section                                        Select                                          Yes            DOC-SCR-03

  P-DOC-006-02       Entry type                                     Select                                          Yes            DOC-SCR-03

  P-DOC-006-03       Child                                          Select                                          Yes            DOC-SCR-03

  P-DOC-006-04       Title                                          Text input                                      Yes            DOC-SCR-03

  P-DOC-006-05       Details                                        Textarea                                        Conditional    DOC-SCR-03

  P-DOC-006-06       Contact name                                   Text input                                      Conditional    DOC-SCR-03

  P-DOC-006-07       Contact email                                  Email input                                     Conditional    DOC-SCR-03

  P-DOC-006-08       Contact phone                                  Phone input                                     Conditional    DOC-SCR-03

  P-DOC-006-09       Address                                        Textarea                                        Conditional    DOC-SCR-03

  P-DOC-006-10       Linked documents                               Multi-select                                    No             DOC-SCR-03

  P-DOC-006-11       Visibility                                     Toggle / radio                                  Yes            DOC-SCR-03

  P-DOC-006-12       Save                                           Primary button                                  ---            DOC-SCR-03

  P-DOC-006-13       Cancel                                         Secondary button                                ---            DOC-SCR-03

  P-DOC-007-01       Document list                                  Table / card list                               ---            DOC-SCR-05

  P-DOC-007-02       Title                                          Text                                            System         DOC-SCR-05

  P-DOC-007-03       Category                                       Badge                                           System         DOC-SCR-05

  P-DOC-007-04       Children                                       Chip list                                       System         DOC-SCR-05

  P-DOC-007-05       Uploaded by                                    Text                                            System         DOC-SCR-05

  P-DOC-007-06       Uploaded at                                    Timestamp                                       System         DOC-SCR-05

  P-DOC-007-07       Visibility                                     Badge                                           System         DOC-SCR-05

  P-DOC-007-08       Status                                         Badge                                           System         DOC-SCR-05

  P-DOC-007-09       Category filter                                Select / multi-select                           No             DOC-SCR-05

  P-DOC-007-10       Child filter                                   Select / multi-select                           No             DOC-SCR-05

  P-DOC-007-11       Upload document                                Primary button                                  ---            DOC-SCR-05

  P-DOC-007-12       Storage usage                                  Progress display                                System         DOC-SCR-05

  P-DOC-008-01       Choose file                                    File input                                      Conditional    DOC-SCR-06

  P-DOC-008-02       Take photo                                     Camera button                                   Conditional    DOC-SCR-06

  P-DOC-008-03       Title                                          Text input                                      Yes            DOC-SCR-06

  P-DOC-008-04       Category                                       Select                                          Yes            DOC-SCR-06

  P-DOC-008-05       Children                                       Multi-select                                    No             DOC-SCR-06

  P-DOC-008-06       Visibility                                     Toggle / radio                                  Yes            DOC-SCR-06

  P-DOC-008-07       Upload                                         Primary button                                  ---            DOC-SCR-06

  P-DOC-008-08       Cancel                                         Secondary button                                ---            DOC-SCR-06

  P-DOC-009-01       Title                                          Read-only text                                  Yes            DOC-SCR-07

  P-DOC-009-02       Category                                       Badge                                           System         DOC-SCR-07

  P-DOC-009-03       Children                                       Chip list                                       System         DOC-SCR-07

  P-DOC-009-04       File preview                                   Image / PDF / document viewer                   System         DOC-SCR-07

  P-DOC-009-05       Uploaded by                                    Text                                            System         DOC-SCR-07

  P-DOC-009-06       Uploaded at                                    Timestamp                                       System         DOC-SCR-07

  P-DOC-009-07       Visibility                                     Badge                                           System         DOC-SCR-07

  P-DOC-009-08       Status                                         Badge                                           System         DOC-SCR-07

  P-DOC-009-09       Add version                                    Primary button                                  ---            DOC-SCR-07

  P-DOC-009-10       Share                                          Button                                          ---            DOC-SCR-07

  P-DOC-009-11       Archive                                        Destructive button                              ---            DOC-SCR-07

  P-DOC-009-12       Delete                                         Destructive button                              ---            DOC-SCR-07

  P-DOC-009-13       Version history                                Link                                            ---            DOC-SCR-07

  P-DOC-010-01       Version list                                   Timeline / table                                ---            DOC-SCR-07

  P-DOC-010-02       Version number                                 Badge                                           System         DOC-SCR-07

  P-DOC-010-03       Contributor                                    Text                                            System         DOC-SCR-07

  P-DOC-010-04       Added at                                       Timestamp                                       System         DOC-SCR-07

  P-DOC-010-05       File preview / download                        Button / link                                   System         DOC-SCR-07

  P-DOC-010-06       Current version indicator                      Badge                                           System         DOC-SCR-07

  P-DOC-010-07       Back                                           Button / link                                   ---            DOC-SCR-07

  P-DOC-011-01       Deleted document list                          Table / card list                               ---            DOC-SCR-08

  P-DOC-011-02       Title                                          Text                                            System         DOC-SCR-08

  P-DOC-011-03       Deleted at                                     Timestamp                                       System         DOC-SCR-08

  P-DOC-011-04       Restore deadline                               Timestamp                                       System         DOC-SCR-08

  P-DOC-011-05       Restore                                        Primary button                                  ---            DOC-SCR-08

  P-DOC-011-06       Permanently delete                             Destructive button                              ---            DOC-SCR-08

  P-REC-001-01       Export format                                  Radio group                                     Yes            REC-SCR-01

  P-REC-001-02       Messages                                       Checkbox                                        Conditional    REC-SCR-01

  P-REC-001-03       Calendar                                       Checkbox                                        Conditional    REC-SCR-01

  P-REC-001-04       Expenses                                       Checkbox                                        Conditional    REC-SCR-01

  P-REC-001-05       Child support payments I recorded              Checkbox                                        Conditional    REC-SCR-01

  P-REC-001-06       Contact attempts                               Checkbox                                        Conditional    REC-SCR-01

  P-REC-001-07       Journal notes                                  Checkbox                                        Conditional    REC-SCR-01

  P-REC-001-08       Agency data                                    Checkbox                                        Conditional    REC-SCR-01

  P-REC-001-09       Start date                                     Date picker                                     Yes            REC-SCR-01

  P-REC-001-10       End date                                       Date picker                                     Yes            REC-SCR-01

  P-REC-001-11       Create export                                  Primary button                                  ---            REC-SCR-01

  P-REC-001-12       Export progress                                Status indicator                                System         REC-SCR-01

  P-REC-001-13       View export history                            Text link                                       ---            REC-SCR-01

  P-REC-001-14       Free-export notice                             Informational text                              ---            REC-SCR-01

  P-REC-001-15       Court notes link                               Text link                                       ---            REC-SCR-01

  P-REC-002-01       Export list                                    Table / list                                    ---            REC-SCR-02

  P-REC-002-02       Format                                         Badge                                           System         REC-SCR-02

  P-REC-002-03       Record types                                   Badge / chips                                   System         REC-SCR-02

  P-REC-002-04       Date range                                     Text                                            System         REC-SCR-02

  P-REC-002-05       Created at                                     Timestamp                                       System         REC-SCR-02

  P-REC-002-06       Status                                         Badge                                           System         REC-SCR-02

  P-REC-002-07       Record ID                                      Text / copyable                                 System         REC-SCR-02

  P-REC-002-08       Page count                                     Text                                            System         REC-SCR-02

  P-REC-002-09       Download                                       Row action                                      ---            REC-SCR-02

  P-REC-002-10       Verify                                         Row action                                      ---            REC-SCR-02

  P-REC-002-11       Request affidavit                              Row action                                      ---            REC-SCR-02

  P-REC-002-12       Filter                                         Control group                                   No             REC-SCR-02

  P-REC-003-01       Record ID                                      Text input                                      Yes            REC-SCR-03

  P-REC-003-02       Verify                                         Primary button                                  ---            REC-SCR-03

  P-REC-003-03       Verification result                            Status panel                                    System         REC-SCR-03

  P-REC-003-04       Created at                                     Timestamp                                       System         REC-SCR-03

  P-REC-003-05       Page count                                     Text                                            System         REC-SCR-03

  P-REC-003-06       Record types                                   Badge / chips                                   System         REC-SCR-03

  P-REC-003-07       Upload PDF to compare                          File input                                      No             REC-SCR-03

  P-REC-003-08       Compare file                                   Secondary button                                Conditional    REC-SCR-03

  P-REC-003-09       Comparison result                              Status panel                                    System         REC-SCR-03

  P-REC-003-10       Court notes link                               Text link                                       ---            REC-SCR-03

  P-REC-004-01       Journal list                                   Table / card list                               ---            REC-SCR-04

  P-REC-004-02       Title                                          Text                                            System         REC-SCR-04

  P-REC-004-03       Note date and time                             Timestamp                                       System         REC-SCR-04

  P-REC-004-04       Details preview                                Text                                            System         REC-SCR-04

  P-REC-004-05       Attachment indicator                           Badge / icon                                    System         REC-SCR-04

  P-REC-004-06       Search                                         Search input                                    No             REC-SCR-04

  P-REC-004-07       Date filter                                    Date-range control                              No             REC-SCR-04

  P-REC-004-08       Add journal entry                              Primary button                                  ---            REC-SCR-04

  P-REC-004-09       Privacy notice                                 Informational text                              ---            REC-SCR-04

  P-REC-005-01       Title                                          Text input                                      Yes            REC-SCR-05

  P-REC-005-02       Details                                        Textarea                                        Yes            REC-SCR-05

  P-REC-005-03       Date and time                                  Date-time picker                                Yes            REC-SCR-05

  P-REC-005-04       Attachments                                    File upload                                     No             REC-SCR-05

  P-REC-005-05       Save                                           Primary button                                  ---            REC-SCR-05

  P-REC-005-06       Cancel                                         Secondary button                                ---            REC-SCR-05

  P-REC-005-07       Character count                                Helper text                                     ---            REC-SCR-05

  P-REC-006-01       Title                                          Read-only text                                  System         REC-SCR-06

  P-REC-006-02       Details                                        Read-only text                                  System         REC-SCR-06

  P-REC-006-03       Date and time                                  Timestamp                                       System         REC-SCR-06

  P-REC-006-04       Attachments                                    File list                                       System         REC-SCR-06

  P-REC-006-05       Author                                         Text                                            System         REC-SCR-06

  P-REC-006-06       Version history                                Timeline                                        System         REC-SCR-06

  P-REC-006-07       Edit                                           Primary button                                  ---            REC-SCR-06

  P-REC-006-08       Delete                                         Destructive button                              ---            REC-SCR-06

  P-REC-006-09       Back                                           Button / link                                   ---            REC-SCR-06

  P-SAF-001-01       Safety Mode                                    Toggle                                          Yes            SAF-SCR-01

  P-SAF-001-02       Current status                                 Badge / text                                    System         SAF-SCR-01

  P-SAF-001-03       Safety explanation                             Informational text                              ---            SAF-SCR-01

  P-SAF-001-04       Turn on Safety Mode                            Primary button                                  ---            SAF-SCR-01

  P-SAF-001-05       Turn off Safety Mode                           Destructive button                              ---            SAF-SCR-01

  P-SAF-001-06       Safety resources link                          Text link                                       ---            SAF-SCR-01

  P-SAF-001-07       Co-parent visibility notice                    Informational text                              ---            SAF-SCR-01

  P-SAF-002-01       Safety notice                                  Informational panel                             ---            SAF-SCR-02

  P- SAF-002-02      Exit Now explanation                           Informational text                              ---            SAF-SCR-02

  P-SAF-002-03       Help resources                                 Links                                           ---            SAF-SCR-02

  P-SAF-002-04       Confirm and turn on                            Primary button                                  Yes            SAF-SCR-02

  P-SAF-002-05       Cancel                                         Secondary button                                ---            SAF-SCR-02

  P-SAF-003-01       Code destination                               Read-only text                                  System         SAF-SCR-03

  P-SAF-003-02       One-time code                                  Numeric input                                   Yes            SAF-SCR-03

  P-SAF-003-03       Resend code                                    Secondary button                                ---            SAF-SCR-03

  P-SAF-003-04       Turn off Safety Mode                           Primary button                                  ---            SAF-SCR-03

  P-SAF-003-05       Cancel                                         Secondary button                                ---            SAF-SCR-03

  P-SAF-004-01       Exit now                                       Persistent button                               ---            SAF-SCR-04

  P-SAF-004-02       Escape shortcut                                Keyboard action                                 ---            SAF-SCR-04

  P-SAF-004-03       Neutral page                                   External/internal neutral page                  System         SAF-SCR-04

  P-SAF-004-04       Session termination                            System action                                   System         SAF-SCR-04

  P-SAF-005-01       National Domestic Violence Hotline             Click-to-call link                              ---            SAF-SCR-05

  P-SAF-005-02       TTY line                                       Click-to-call link                              ---            SAF-SCR-05

  P-SAF-005-03       Emergency guidance                             Informational text                              ---            SAF-SCR-05

  P-SAF-005-04       Advocate-approved help links                   Link list                                       ---            SAF-SCR-05

  P-SAF-005-05       Quick exit                                     Button                                          ---            SAF-SCR-05

  P-SAF-006-01       Alert previews                                 Radio group                                     Yes            SAF-SCR-07

  P-SAF-006-02       Hidden option                                  Radio option                                    ---            SAF-SCR-07

  P-SAF-006-03       Name only option                               Radio option                                    ---            SAF-SCR-07

  P-SAF-006-04       Name and text option                           Radio option                                    ---            SAF-SCR-07

  P-SAF-006-05       Hide images until I tap                        Toggle                                          Yes            SAF-SCR-07

  P-SAF-006-06       Save                                           Primary button                                  ---            SAF-SCR-07

  P-SAF-006-07       Safety Mode lock notice                        Informational text                              System         SAF-SCR-07

  P-SAF-006-08       Image rule notice                              Informational text                              ---            SAF-SCR-07

  P-SAF-007-01       Warning message                                Informational panel                             ---            SAF-SCR-08

  P-SAF-007-02       Preview explanation                            Informational text                              ---            SAF-SCR-08

  P-SAF-007-03       Confirm                                        Primary button                                  Yes            SAF-SCR-08

  P-SAF-007-04       Cancel                                         Secondary button                                ---            SAF-SCR-08

  P-SAF-008-01       Hidden image placeholder                       Placeholder panel                               System         SAF-SCR-09

  P-SAF-008-02       Tap to view                                    Button / tap target                             ---            SAF-SCR-09

  P-SAF-008-03       Re-hidden state                                System                                          System         SAF-SCR-09

  P-SAF-008-04       File type exception                            System                                          System         SAF-SCR-09

  P-SAF-009-01       AI feature list                                Feature rows                                    ---            SAF-SCR-10

  P-SAF-009-02       Feature name                                   Text                                            System         SAF-SCR-10

  P-SAF-009-03       Data-use explanation                           Text                                            System         SAF-SCR-10

  P-SAF-009-04       AI switch                                      Toggle                                          Yes            SAF-SCR-10

  P-SAF-009-05       Last changed                                   Timestamp                                       System         SAF-SCR-10

  P-SAF-009-06       Turn all AI off                                Destructive button                              ---            SAF-SCR-10

  P-SAF-009-07       AI promises                                    Informational panel                             ---            SAF-SCR-10

  P-SAF-009-08       Plan label                                     Badge                                           System         SAF-SCR-10

  P-SAF-009-09       View AI use log                                Text link                                       ---            SAF-SCR-10

  P-SAF-010-01       Feature name                                   Read-only text                                  System         SAF-SCR-10

  P-SAF-010-02       Data-use notice                                Informational text                              ---            SAF-SCR-10

  P-SAF-010-03       Privacy promises                               Informational text                              ---            SAF-SCR-10

  P-SAF-010-04       Agree and turn on                              Primary button                                  Yes            SAF-SCR-10

  P-SAF-010-05       Cancel                                         Secondary button                                ---            SAF-SCR-10

  P-SAF-011-01       AI use list                                    Table / timeline                                ---            SAF-SCR-11

  P-SAF-011-02       Feature                                        Badge                                           System         SAF-SCR-11

  P-SAF-011-03       Date and time                                  Timestamp                                       System         SAF-SCR-11

  P- SAF-011-04      Item type                                      Badge                                           System         SAF-SCR-11

  P-SAF-011-05       Content                                        Not displayed                                   ---            SAF-SCR-11

  P-SAF-011-06       Date filter                                    Date-range control                              No             SAF-SCR-11

  P-SAF-011-07       Back                                           Button / link                                   ---            SAF-SCR-11

  P-NTF-001-01       SMS wait time                                  Duration select / input                         Yes            NTF-SCR-01

  P-NTF-001-02       Email wait time                                Duration select / input                         Yes            NTF-SCR-01

  P-NTF-001-03       Event reminder time                            Duration select / multi-select                  Yes            NTF-SCR-01

  P-NTF-001-04       Hearing/deadline reminder time                 Duration select / multi-select                  Yes            NTF-SCR-01

  P-NTF-001-05       Agency due-date reminder time                  Duration select                                 Yes            NTF-SCR-01

  P-NTF-001-06       Save                                           Primary button                                  ---            NTF-SCR-01

  P-NTF-001-07       Cancel                                         Secondary button                                ---            NTF-SCR-01

  P-NTF-001-08       Safety Mode notice                             Informational text                              System         NTF-SCR-01

  P-NTF-001-09       Preview setting link                           Text link                                       ---            NTF-SCR-01

  P-NTF-002-01       Sender name                                    Text                                            Conditional    NTF-SCR-B01

  P-NTF-002-02       Message preview                                Text                                            Conditional    NTF-SCR-B01

  P-NTF-002-03       Alert channel                                  System                                          System         NTF-SCR-B01

  P-NTF-002-04       Alert time                                     Timestamp                                       System         NTF-SCR-B01

  P-NTF-002-05       Open message action                            Tap / click                                     ---            NTF-SCR-B01

  P-NTF-002-06       Safety Mode content                            System                                          System         NTF-SCR-B01

  P-NTF-003-01       Message status                                 Badge                                           System         NTF-SCR-03

  P-NTF-003-02       Status time                                    Timestamp                                       System         NTF-SCR-03

  P-NTF-003-03       Status timeline                                Event list                                      System         NTF-SCR-03

  P-NTF-003-04       First-read time                                Timestamp                                       System         NTF-SCR-03

  P-NTF-003-05       Failure notice                                 Error message                                   System         NTF-SCR-03

  P-NTF-003-06       Non-app recipient rule                         System                                          System         NTF-SCR-03

  P-NTF-004-01       Reminder type                                  System                                          System         NTF-SCR-B02

  P-NTF-004-02       Event title                                    Text                                            Conditional    NTF-SCR-B02

  P-NTF-004-03       Event time                                     Timestamp                                       Conditional    NTF-SCR-B02

  P-NTF-004-04       Reminder time                                  Timestamp                                       System         NTF-SCR-B02

  P-NTF-004-05       Channels                                       System                                          System         NTF-SCR-B02

  P-NTF-004-06       Open calendar item                             Tap / click                                     ---            NTF-SCR-B02

  P-NTF-004-07       Safety Mode content                            System                                          System         NTF-SCR-B02

  P-NTF-005-01       Log entries                                    Table / timeline                                ---            NTF-SCR-B03

  P-NTF-005-02       Event type                                     Badge                                           System         NTF-SCR-B03

  P-NTF-005-03       Channel                                        Badge                                           System         NTF-SCR-B03

  P-NTF-005-04       Recipient                                      Text / reference                                System         NTF-SCR-B03

  P-NTF-005-05       Attempt time                                   Timestamp                                       System         NTF-SCR-B03

  P-NTF-005-06       Result                                         Badge                                           System         NTF-SCR-B03

  P-NTF-005-07       Retry count                                    Integer                                         System         NTF-SCR-B03

  P-NTF-005-08       Source module                                  Badge                                           System         NTF-SCR-B03

  P-NTF-005-09       Filter                                         Control group                                   No             NTF-SCR-B03

  P-NTF-005-10       Edit / delete                                  Not displayed                                   ---            NTF-SCR-B03

  P-NTF-006-01       Send type                                      Badge                                           System         NTF-SCR-B04

  P-NTF-006-02       Channel                                        Badge                                           System         NTF-SCR-B04

  P-NTF-006-03       Recipient                                      Masked text                                     System         NTF-SCR-B04

  P-NTF-006-04       Sent at                                        Timestamp                                       System         NTF-SCR-B04

  P-NTF-006-05       Result                                         Badge                                           System         NTF-SCR-B04

  P-NTF-006-06       Reply received                                 Badge / indicator                               System         NTF-SCR-B04

  P-NTF-006-07       Retry indicator                                Badge                                           System         NTF-SCR-B04

  P-NTF-006-08       Expiry rule                                    System                                          System         NTF-SCR-B04

  P-SUP-001-01       Search help                                    Search input                                    No             SUP-SCR-01

  P-SUP-001-02       Help topics                                    Topic links                                     ---            SUP-SCR-01

  P-SUP-001-03       My requests                                    Link / button                                   ---            SUP-SCR-01

  P-SUP-001-04       Contact support                                Primary button                                  ---            SUP-SCR-01

  P-SUP-001-05       Support hours                                  Informational text                              ---            SUP-SCR-01

  P-SUP-001-06       Open/closed status                             Badge                                           System         SUP-SCR-01

  P-SUP-001-07       Service notice                                 Warning panel                                   System         SUP-SCR-01

  P-SUP-001-08       Safety resources link                          Text link                                       ---            SUP-SCR-01

  P-SUP-002-01       Search query                                   Search input                                    No             SUP-SCR-02

  P-SUP-002-02       Topic filter                                   Select                                          No             SUP-SCR-02

  P-SUP-002-03       Results list                                   Article list                                    ---            SUP-SCR-02

  P-SUP-002-04       Article title                                  Text                                            System         SUP-SCR-02

  P-SUP-002-05       Article summary                                Text                                            System         SUP-SCR-02

  P- SUP-002-06      No-results message                             Empty state                                     System         SUP-SCR-02

  P-SUP-002-07       Contact support                                Button                                          ---            SUP-SCR-02

  P-SUP-003-01       Article title                                  Page title                                      System         SUP-SCR-03

  P-SUP-003-02       Article body                                   Rich text                                       System         SUP-SCR-03

  P-SUP-003-03       Last updated                                   Timestamp                                       System         SUP-SCR-03

  P-SUP-003-04       Related articles                               Link list                                       System         SUP-SCR-03

  P-SUP-003-05       Contact support                                Button                                          ---            SUP-SCR-03

  P-SUP-003-06       Back to search                                 Text link                                       ---            SUP-SCR-03

  P-SUP-004-01       Category                                       Select                                          Yes            SUP-SCR-04

  P-SUP-004-02       Subject                                        Text input                                      Yes            SUP-SCR-04

  P-SUP-004-03       Description                                    Textarea                                        Yes            SUP-SCR-04

  P-SUP-004-04       Is this about a court date?                    Radio / toggle                                  Yes            SUP-SCR-04

  P-SUP-004-05       Court date                                     Date picker                                     Conditional    SUP-SCR-04

  P-SUP-004-06       Attachments                                    File upload                                     No             SUP-SCR-04

  P-SUP-004-07       Sensitive-data warning                         Informational text                              ---            SUP-SCR-04

  P-SUP-004-08       Safety emergency notice                        Warning panel                                   Conditional    SUP-SCR-04

  P-SUP-004-09       Submit request                                 Primary button                                  ---            SUP-SCR-04

  P-SUP-004-10       Cancel                                         Secondary button                                ---            SUP-SCR-04

  P-SUP-005-01       Case number                                    Read-only text                                  System         SUP-SCR-05

  P-SUP-005-02       Reply target                                   Text                                            System         SUP-SCR-05

  P-SUP-005-03       Support hours                                  Informational text                              ---            SUP-SCR-05

  P-SUP-005-04       Next opening time                              Text                                            Conditional    SUP-SCR-05

  P-SUP-005-05       Email confirmation notice                      Informational text                              System         SUP-SCR-05

  P-SUP-005-06       View request                                   Primary button                                  ---            SUP-SCR-05

  P-SUP-005-07       Back to Help                                   Text link                                       ---            SUP-SCR-05

  P-SUP-006-01       Case list                                      Table / list                                    ---            SUP-SCR-06

  P-SUP-006-02       Case number                                    Text                                            System         SUP-SCR-06

  P-SUP-006-03       Category                                       Badge                                           System         SUP-SCR-06

  P-SUP-006-04       Subject                                        Text                                            System         SUP-SCR-06

  P-SUP-006-05       Status                                         Badge                                           System         SUP-SCR-06

  P-SUP-006-06       Created at                                     Timestamp                                       System         SUP-SCR-06

  P-SUP-006-07       Last activity                                  Timestamp                                       System         SUP-SCR-06

  P-SUP-006-08       Status filter                                  Select                                          No             SUP-SCR-06

  P-SUP-006-09       New request                                    Primary button                                  ---            SUP-SCR-06

  P-SUP-007-01       Case number                                    Page title / badge                              System         SUP-SCR-07

  P-SUP-007-02       Subject                                        Read-only text                                  System         SUP-SCR-07

  P-SUP-007-03       Status                                         Badge                                           System         SUP-SCR-07

  P-SUP-007-04       Thread                                         Message list                                    System         SUP-SCR-07

  P-SUP-007-05       Reply                                          Textarea                                        Conditional    SUP-SCR-07

  P-SUP-007-06       Send reply                                     Primary button                                  ---            SUP-SCR-07

  P-SUP-007-07       Satisfaction question                          Radio                                           Conditional    SUP-SCR-07

  P-SUP-007-08       Reopen case                                    Button                                          Conditional    SUP-SCR-07

  P-SUP-007-09       Attach file                                    File input                                      Conditional    SUP-SCR-07

  P-SUP-008-01       Email address                                  Email input                                     Yes            SUP-SCR-08

  P-SUP-008-02       Category                                       Select                                          Yes            SUP-SCR-08

  P-SUP-008-03       Subject                                        Text input                                      Yes            SUP-SCR-08

  P-SUP-008-04       Description                                    Textarea                                        Yes            SUP-SCR-08

  P-SUP-008-05       Attachments                                    File upload                                     No             SUP-SCR-08

  P-SUP-008-06       Sensitive-data warning                         Informational text                              ---            SUP-SCR-08

  P-SUP-008-07       Submit request                                 Primary button                                  ---            SUP-SCR-08

  P-SUP-008-08       Back to sign in                                Text link                                       ---            SUP-SCR-08

  P-SUP-009-01       Case queue                                     Table / list                                    ---            SUP-SCR-09

  P-SUP-009-02       Case number                                    Text                                            System         SUP-SCR-09

  P-SUP-009-03       Priority                                       Badge                                           System         SUP-SCR-09

  P-SUP-009-04       Category                                       Badge                                           System         SUP-SCR-09

  P-SUP-009-05       Status                                         Badge                                           System         SUP-SCR-09

  P-SUP-009-06       Time remaining                                 Countdown / text                                System         SUP-SCR-09

  P-SUP-009-07       Assigned agent                                 Text / avatar                                   System         SUP-SCR-09

  P-SUP-009-08       Assign to me                                   Row action                                      ---            SUP-SCR-09

  P-SUP-009-09       Assign to agent                                Row action                                      ---            SUP-SCR-09

  P-SUP-009-10       Filters                                        Control group                                   No             SUP-SCR-09

  P-SUP-009-11       Internal alert item                            Warning row                                     System         SUP-SCR-09

  P-SUP-009-12       Lead alert                                     Notification                                    System         SUP-SCR-09

  P-SUP-010-01       Requester name                                 Text                                            System         SUP-SCR-10

  P-SUP-010-02       Requester email                                Text                                            System         SUP-SCR-10

  P-SUP-010-03       Plan                                           Badge                                           System         SUP-SCR-10

  P-SUP-010-04       Account status                                 Badge                                           System         SUP-SCR-10

  P-SUP-010-05       Household mode                                 Badge                                           System         SUP-SCR-10

  P-SUP-010-06       Child-support case linked                      Badge                                           System         SUP-SCR-10

  P-SUP-010-08       Case thread                                    Message list                                    System         SUP-SCR-10

  P-SUP-010-09       Reply                                          Textarea                                        Conditional    SUP-SCR-10

  P-SUP-010-10       Internal note                                  Textarea                                        No             SUP-SCR-10

  P-SUP-010-11       Reply template                                 Select / insert                                 No             SUP-SCR-10

  P-SUP-010-12       Status                                         Select                                          Yes            SUP-SCR-10

  P-SUP-010-13       Category                                       Select                                          Yes            SUP-SCR-10

  P-SUP-010-14       Lower priority                                 Action                                          Conditional    SUP-SCR-10

  P-SUP-010-15       Consent-shared message                         Restricted message view                         System         SUP-SCR-10

  P-SUP-010-17       Audit trail                                    Timeline                                        System         SUP-SCR-10

  P-SUP-010-18       Parent messages / recordings / agency values   Not displayed                                   ---            SUP-SCR-10

  P-SUP-011-01       Notice text                                    Textarea                                        Yes            SUP-SCR-11

  P-SUP-011-02       Start time                                     Date-time picker                                Yes            SUP-SCR-11

  P-SUP-011-03       End time                                       Date-time picker                                Yes            SUP-SCR-11

  P-SUP-011-04       Status                                         Toggle / select                                 Yes            SUP-SCR-11

  P-SUP-011-05       Save                                           Primary button                                  ---            SUP-SCR-11

  P-SUP-011-06       Publish / Unpublish                            Action                                          ---            SUP-SCR-11

  P-SUP-011-07       Notice list                                    Table                                           ---            SUP-SCR-11

  P-SUP-012-01       Title                                          Text input                                      Yes            SUP-SCR-12

  P-SUP-012-02       Body                                           Rich-text editor                                Yes            SUP-SCR-12

  P-SUP-012-03       Topic                                          Select                                          Yes            SUP-SCR-12

  P-SUP-012-04       Status                                         Select / toggle                                 Yes            SUP-SCR-12

  P-SUP-012-05       Save draft                                     Secondary button                                ---            SUP-SCR-12

  P-SUP-012-06       Publish                                        Primary button                                  ---            SUP-SCR-12

  P-SUP-012-07       Unpublish                                      Destructive button                              ---            SUP-SCR-12

  P-SUP-012-08       Version history                                Timeline                                        System         SUP-SCR-12

  P-SUP-013-01       Template name                                  Text input                                      Yes            SUP-SCR-13

  P-SUP-013-02       Template text                                  Rich-text editor                                Yes            SUP-SCR-13

  P-SUP-013-03       Legal approval status                          Badge                                           System         SUP-SCR-13

  P-SUP-013-04       Category                                       Select                                          Yes            SUP-SCR-13

  P-SUP-013-05       Save                                           Primary button                                  ---            SUP-SCR-13

  P-SUP-013-06       Use template                                   Row action                                      ---            SUP-SCR-13

  P-SUP-013-07       Template list                                  Table                                           ---            SUP-SCR-13

  P-SYS-001-01       Main navigation                                Navigation bar / menu                           Yes            ACC-SCR-19

  P-SYS-001-02       Home                                           Navigation item                                 System         ACC-SCR-19

  P-SYS-001-03       Messages                                       Navigation item                                 System         ACC-SCR-19

  P-SYS-001-04       Calendar                                       Navigation item                                 System         ACC-SCR-19

  P-SYS-001-05       Expenses                                       Navigation item                                 System         ACC-SCR-19

  P-SYS-001-06       Children                                       Navigation item                                 System         ACC-SCR-19

  P-SYS-001-07       Documents                                      Navigation item                                 System         ACC-SCR-19

  P-SYS-001-08       Records                                        Navigation item                                 System         ACC-SCR-19

  P-SYS-001-09       Settings                                       Navigation item                                 System         ACC-SCR-19

  P-SYS-001-10       Plan                                           Navigation item                                 System         ACC-SCR-19

  P-SYS-001-11       Help                                           Navigation item                                 System         ACC-SCR-19

  P-SYS-001-12       User menu                                      Dropdown                                        System         ACC-SCR-19

  P-SYS-001-13       Exit now                                       Persistent button                               ---            ACC-SCR-19

  P-SYS-001-14       Time zone                                      Select                                          Yes            ACC-SCR-19

  P-SYS-001-15       Unsupported-browser warning                    Warning banner                                  System         ACC-SCR-19

  P-SYS-001-16       Neutral title / icon                           Browser metadata                                System         ACC-SCR-19

  P-SYS-003-01       Maintenance message                            Informational panel                             ---            ACC-SCR-23

  P-SYS-003-02       Expected end time                              Timestamp                                       System         ACC-SCR-23

  P-SYS-003-04       Retry app                                      Button                                          ---            ACC-SCR-23

  P-SYS-003-05       Maintenance window                             System                                          System         ACC-SCR-23

  P-SYS-004-01       Not-found message                              Error panel                                     ---            ACC-SCR-22

  P-SYS-004-02       Go home                                        Primary button                                  ---            ACC-SCR-22

  P-SYS-004-03       Contact support                                Text link                                       ---            ACC-SCR-22

  P-SYS-004-04       Technical reference                            System                                          System         ACC-SCR-22

  P-SYS-005-01       Access-denied message                          Error panel                                     ---            ACC-SCR-22

  P-SYS-005-02       Go home                                        Primary button                                  ---            ACC-SCR-22

  P-SYS-005-03       Contact support                                Text link                                       ---            ACC-SCR-22

  P-SYS-005-04       Technical reference                            System                                          System         ACC-SCR-22

  P-SYS-006-01       Error message                                  Error panel                                     ---            ACC-SCR-21

  P-SYS-006-02       Contact support                                Primary button                                  ---            ACC-SCR-21

  P-SYS-006-03       Retry                                          Secondary button                                ---            ACC-SCR-21

  P-SYS-006-04       Go home                                        Text link                                       ---            ACC-SCR-21

  P-SYS-006-05       Technical reference                            System                                          System         ACC-SCR-21

  P-SYS-007-01       Timeout warning                                Modal / banner                                  ---            ACC-SCR-25

  P-SYS-007-02       Countdown                                      Timer                                           System         ACC-SCR-25

  P-SYS-007-03       Stay signed in                                 Primary button                                  ---            ACC-SCR-25

  P-SYS-007-04       Sign out                                       Secondary button                                ---            ACC-SCR-25

  P-SYS-007-05       Unsaved-work notice                            Informational text                              System         ACC-SCR-25

  P-SYS-010-01       Offline banner                                 Warning banner                                  System         ACC-SCR-24

  P-SYS-010-02       Draft preservation                             Local storage                                   System         ACC-SCR-24

  P-SYS-010-03       Send / Submit                                  Disabled button                                 ---            ACC-SCR-24

  P-SYS-010-04       Retry connection                               Button / automatic                              ---            ACC-SCR-24

  P-CAL-001-01       Call history                                   Call list                                       ---            CLL-SCR-06

  P-CAL-001-02       Call type                                      Badge                                           System         CLL-SCR-06

  P-CAL-001-03       Call status                                    Badge                                           System         CLL-SCR-06

  P-CAL-001-04       Started at                                     Timestamp                                       System         CLL-SCR-06

  P-CAL-001-05       Duration                                       Duration                                        System         CLL-SCR-06

  P-CAL-001-06       Recording indicator                            Badge                                           System         CLL-SCR-06

  P-CAL-001-07       Start call                                     Primary button                                  ---            CLL-SCR-06

  P-CAL-001-08       Open recording                                 Row action                                      ---            CLL-SCR-06

  P-CAL-002-01       Call recipient                                 Read-only participant                           System         CLL-SCR-02

  P-CAL-002-02       Call type                                      Select                                          Yes            CLL-SCR-02

  P-CAL-002-03       Recording request                              Toggle                                          No             CLL-SCR-02

  P-CAL-002-04       Start call                                     Primary button                                  ---            CLL-SCR-02

  P-CAL-002-05       Cancel                                         Secondary button                                ---            CLL-SCR-02

  P-CAL-003-01       Call timer                                     Duration                                        System         CLL-SCR-04

  P-CAL-003-02       Mute                                           Toggle                                          No             CLL-SCR-04

  P-CAL-003-03       Speaker                                        Toggle                                          No             CLL-SCR-04

  P-CAL-003-04       Recording status                               Badge                                           System         CLL-SCR-04

  P-CAL-003-05       End call                                       Destructive button                              ---            CLL-SCR-04

  P-CAL-003-06       Connection quality                             Indicator                                       System         CLL-SCR-04

  P-CAL-004-01       Call outcome                                   Badge                                           System         CLL-SCR-04

  P-CAL-004-02       Duration                                       Duration                                        System         CLL-SCR-04

  P-CAL-004-03       Recording saved                                Badge                                           System         CLL-SCR-04

  P-CAL-004-04       Add to record                                  Button                                          ---            CLL-SCR-04

  P-CAL-004-05       Back to calls                                  Button                                          ---            CLL-SCR-04

  P-CAL-005-01       Consent explanation                            Informational text                              ---            CLL-SCR-05

  P-CAL-005-02       Caller consent                                 Toggle                                          Yes            CLL-SCR-05

  P-CAL-005-03       Recipient consent                              Toggle                                          Yes            CLL-SCR-05

  P-CAL-005-04       Consent timestamp                              Timestamp                                       System         CLL-SCR-05

  P-CAL-005-05       Start recording                                Primary button                                  ---            CLL-SCR-05

  P-CAL-005-06       Decline                                        Secondary button                                ---            CLL-SCR-05

  P-CAL-006-01       Recording list                                 Table / list                                    ---            CLL-SCR-06

  P-CAL-006-02       Call date                                      Timestamp                                       System         CLL-SCR-06

  P-CAL-006-03       Duration                                       Duration                                        System         CLL-SCR-06

  P-CAL-006-04       Consent record                                 Link / badge                                    System         CLL-SCR-06

  P-CAL-006-05       Play                                           Row action                                      ---            CLL-SCR-06

  P-CAL-006-06       Export                                         Row action                                      ---            CLL-SCR-06

  P-CAL-007-01       Audio player                                   Media player                                    ---            CLL-SCR-06

  P-CAL-007-02       Playback position                              Progress bar                                    System         CLL-SCR-06

  P-CAL-007-03       Recording metadata                             Read-only panel                                 System         CLL-SCR-06

  P-CAL-007-04       Download / export                              Button                                          ---            CLL-SCR-06

  P-CAL-007-05       Back to recordings                             Text link                                       ---            CLL-SCR-06

  P-CAL-008-01       Default recording preference                   Toggle                                          No             CLL-SCR-01

  P-CAL-008-02       Microphone device                              Select                                          No             CLL-SCR-01

  P-CAL-008-03       Speaker device                                 Select                                          No             CLL-SCR-01

  P-CAL-008-04       Save                                           Primary button                                  ---            CLL-SCR-01

  P-CSS-001-01       Link status                                    Badge                                           System         CSS-SCR-01

  P-CSS-001-02       Agency name                                    Text                                            System         CSS-SCR-01

  P-CSS-001-03       Case number                                    Masked text                                     System         CSS-SCR-01

  P-CSS-001-04       Link case                                      Primary button                                  ---            CSS-SCR-01

  P-CSS-001-05       Open linked case                               Primary button                                  ---            CSS-SCR-01

  P-CSS-001-06       Data freshness                                 Timestamp                                       System         CSS-SCR-01

  P-CSS-001-07       Privacy notice                                 Informational text                              ---            CSS-SCR-01

  P-CSS-002-01       Legal first name                               Text input                                      Yes            CSS-SCR-01

  P-CSS-002-02       Legal last name                                Text input                                      Yes            CSS-SCR-01

  P-CSS-002-03       Date of birth                                  Date picker                                     Yes            CSS-SCR-01

  P-CSS-002-04       Agency case number                             Text input                                      Yes            CSS-SCR-01

  P-CSS-002-05       SSN                                            Not collected                                   ---            CSS-SCR-01

  P-CSS-002-06       Continue                                       Primary button                                  ---            CSS-SCR-01

  P-CSS-002-07       Cancel                                         Secondary button                                ---            CSS-SCR-01

  P-CSS-003-01       Verification method                            Read-only / select                              System         CSS-SCR-01

  P-CSS-003-02       One-time code                                  OTP input                                       Conditional    CSS-SCR-01

  P-CSS-003-03       Resend code                                    Button                                          Conditional    CSS-SCR-01

  P-CSS-003-04       Verify                                         Primary button                                  ---            CSS-SCR-01

  P-CSS-003-05       Cancel                                         Secondary button                                ---            CSS-SCR-01

  P-CSS-004-01       Consent text                                   Read-only panel                                 Yes            CSS-SCR-02

  P-CSS-004-02       Consent version                                Text                                            System         CSS-SCR-02

  P-CSS-004-03       I agree                                        Checkbox                                        Yes            CSS-SCR-02

  P-CSS-004-04       Consent timestamp                              Timestamp                                       System         CSS-SCR-02

  P-CSS-004-05       Link case                                      Primary button                                  ---            CSS-SCR-02

  P-CSS-004-06       Cancel                                         Secondary button                                ---            CSS-SCR-02

  P-CSS-005-01       Case number                                    Masked text                                     System         CSS-SCR-03

  P-CSS-005-02       Balance                                        Currency                                        System         CSS-SCR-03

  P-CSS-005-03       Next hearing                                   Date / timestamp                                System         CSS-SCR-03

  P-CSS-005-04       Next deadline                                  Date / timestamp                                System         CSS-SCR-03

  P-CSS-005-05       Last synced                                    Timestamp                                       System         CSS-SCR-03

  P-CSS-005-06       View payments                                  Button                                          ---            CSS-SCR-03

  P-CSS-005-07       View hearings                                  Button                                          ---            CSS-SCR-03

  P-CSS-005-08       Compare payments                               Button                                          ---            CSS-SCR-03

  P-CSS-005-09       Unlink                                         Destructive button                              ---            CSS-SCR-03

  P-CSS-006-01       Current balance                                Currency                                        System         CSS-SCR-03

  P-CSS-006-02       Arrears                                        Currency                                        System         CSS-SCR-03

  P-CSS-006-03       Payment history                                Table                                           ---            CSS-SCR-03

  P-CSS-006-04       Payment date                                   Timestamp                                       System         CSS-SCR-03

  P-CSS-006-05       Amount                                         Currency                                        System         CSS-SCR-03

  P-CSS-006-06       Payment status                                 Badge                                           System         CSS-SCR-03

  P-CSS-006-07       Data as of                                     Timestamp                                       System         CSS-SCR-03

  P-CSS-007-01       Hearing list                                   Table / list                                    ---            CSS-SCR-06

  P-CSS-007-02       Hearing date                                   Date / timestamp                                System         CSS-SCR-06

  P-CSS-007-03       Hearing type                                   Text                                            System         CSS-SCR-06

  P-CSS-007-04       Location                                       Text                                            System         CSS-SCR-06

  P-CSS-007-05       Deadline list                                  Table / list                                    ---            CSS-SCR-06

  P-CSS-007-06       Add hearing to calendar                        Row action                                      ---            CSS-SCR-06

  P-CSS-007-07       Set reminder                                   Row action                                      ---            CSS-SCR-06

  P-CSS-008-01       Agency payments                                Table                                           ---            CSS-SCR-04

  P-CSS-008-02       Parent-recorded payments                       Table                                           ---            CSS-SCR-04

  P-CSS-008-03       Match status                                   Badge                                           System         CSS-SCR-04

  P-CSS-008-04       Difference                                     Currency                                        System         CSS-SCR-04

  P-CSS-008-05       Explanation                                    Text                                            System         CSS-SCR-04

  P-CSS-008-06       Export comparison                              Button                                          ---            CSS-SCR-04

  P-CSS-009-01       Sync status                                    Badge                                           System         CSS-SCR-03

  P-CSS-009-02       Last successful sync                           Timestamp                                       System         CSS-SCR-03

  P-CSS-009-03       Next scheduled sync                            Timestamp                                       System         CSS-SCR-03

  P-CSS-009-04       Sync failure notice                            Warning panel                                   System         CSS-SCR-03

  P-CSS-009-05       Refresh                                        Button                                          ---            CSS-SCR-03

  P-CSS-010-01       Unlink explanation                             Informational panel                             ---            CSS-SCR-09

  P-CSS-010-02       Confirm unlink                                 Destructive button                              Yes            CSS-SCR-09

  P-CSS-010-03       Keep link                                      Secondary button                                ---            CSS-SCR-09

  P-CSS-010-04       Audit record                                   System                                          System         CSS-SCR-09

  P-PRO-001-01       Professional list                              Table / list                                    ---            PRO-SCR-01

  P-PRO-001-02       Professional name                              Text                                            System         PRO-SCR-01

  P-PRO-001-03       Professional type                              Badge                                           System         PRO-SCR-01

  P-PRO-001-04       Access status                                  Badge                                           System         PRO-SCR-01

  P-PRO-001-05       Shared items                                   Count / summary                                 System         PRO-SCR-01

  P-PRO-001-06       Invite professional                            Primary button                                  ---            PRO-SCR-01

  P-PRO-001-07       Manage access                                  Row action                                      ---            PRO-SCR-01

  P-PRO-001-08       Revoke                                         Row action                                      ---            PRO-SCR-01

  P-PRO-002-01       Professional email                             Email input                                     Yes            PRO-SCR-02

  P-PRO-002-02       Professional name                              Text input                                      Yes            PRO-SCR-02

  P-PRO-002-03       Professional type                              Select                                          Yes            PRO-SCR-02

  P-PRO-002-04       Access scope                                   Checkbox group                                  Yes            PRO-SCR-02

  P-PRO-002-05       Expiry                                         Date picker                                     No             PRO-SCR-02

  P-PRO-002-06       Read-only notice                               Informational text                              ---            PRO-SCR-02

  P-PRO-002-07       Send invitation                                Primary button                                  ---            PRO-SCR-02

  P-PRO-002-08       Cancel                                         Secondary button                                ---            PRO-SCR-02

  P-PRO-003-01       Confirmation message                           Confirmation panel                              ---            PRO-SCR-02

  P-PRO-003-02       Invitee email                                  Text                                            System         PRO-SCR-02

  P-PRO-003-03       Access scope                                   Summary                                         System         PRO-SCR-02

  P-PRO-003-04       Expiry                                         Timestamp                                       System         PRO-SCR-02

  P-PRO-003-05       Resend invitation                              Button                                          ---            PRO-SCR-02

  P-PRO-003-06       Cancel invitation                              Destructive button                              ---            PRO-SCR-02

  P-PRO-004-01       Professional identity                          Read-only panel                                 System         PRO-SCR-03

  P-PRO-004-02       Access scope                                   Checkbox group                                  Yes            PRO-SCR-03

  P-PRO-004-03       Expiry                                         Date picker                                     No             PRO-SCR-03

  P-PRO-004-04       Save changes                                   Primary button                                  ---            PRO-SCR-03

  P-PRO-004-05       Revoke access                                  Destructive button                              ---            PRO-SCR-03

  P-PRO-005-01       Shared content                                 Read-only view                                  System         PRO-SCR-08

  P-PRO-005-02       Messages                                       Read-only list                                  System         PRO-SCR-08

  P-PRO-005-03       Calendar                                       Read-only view                                  System         PRO-SCR-08

  P-PRO-005-04       Expenses                                       Read-only view                                  System         PRO-SCR-08

  P-PRO-005-05       Documents / records                            Read-only view                                  System         PRO-SCR-08

  P-PRO-005-06       Post / reply                                   Not available                                   ---            PRO-SCR-08

  P-PRO-005-07       Access expiry notice                           Warning banner                                  System         PRO-SCR-08

  P-PRO-006-01       Revoke explanation                             Informational panel                             ---            PRO-SCR-03

  P-PRO-006-02       Confirm end access                             Destructive button                              Yes            PRO-SCR-03

  P-PRO-006-03       Keep access                                    Secondary button                                ---            PRO-SCR-03

  P-PRO-006-04       Audit record                                   System                                          System         PRO-SCR-03
  ----------------------------------------------------------------------------------------------------------------------------------------------
