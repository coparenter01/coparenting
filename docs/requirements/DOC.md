# Children and Documents (DOC)


11.1 Functional requirements and acceptance criteria

DOC-01 Child information storage (medical, school, contacts)

US-DOC-01-01. As a parent, I want the medical, school and contact details of our child in one place that we both can see, so that neither of us has to ask the other.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**          **Requirement**
  --------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-DOC-01-01    The system shall let the Parent add a child to the household with a first name and a date of birth.

  FR-DOC-01-02    The system shall require a first name of 1 to 60 characters and a date of birth that is not in the future. It shall show ERR-01 for an empty name, ERR-02 for a name that is too long and ERR-03 for a future date.

  FR-DOC-01-03    The system shall allow up to 10 children for each household and shall show ERR-04 if a Parent tries to add more.

  FR-DOC-01-04    The system shall let the Parent edit the first name and the date of birth. Each edit saves a new version with the original details, who made the change, when, and from which device. The Co-parent sees the child list and cannot change it. If the Co-parent tries, the system shall refuse and show ERR-10.

  FR-DOC-01-05    The system shall let the Parent archive a child instead of deleting the child. An archived child stays on earlier expenses, events and entries and is not offered for new ones. If a user tries to use an archived child, the system shall show ERR-17.

  FR-DOC-01-06    The system shall keep child information as entries in three sections: Medical, School and Contacts. An entry has the child (one child or All children), the section, a type, a title, details, a contact name, a phone number, an email, an address and linked documents. The types are Allergy, Medication, Condition, Doctor or clinic, Insurance, Immunization and Other for Medical, School, Teacher, Class schedule, Bus or pick-up and Other for School, and Emergency contact, Family member, Caregiver and Other for Contacts.

  FR-DOC-01-07    The system shall require a title of 1 to 100 characters, and shall limit details to 2,000 characters, the contact name to 100 characters, the email to 254 characters and the address to 200 characters. It shall check that a phone number is valid and that an email is valid. It shall show ERR-01 for a missing title, ERR-05 for a title that is too long, ERR-06 for a text that is too long, ERR-07 for a phone number that is not valid and ERR-08 for an email that is not valid.

  FR-DOC-01-08    The system shall let either parent add an entry. Only the creator of an entry can edit or archive it. If another user tries, the system shall refuse and show ERR-10.

  FR-DOC-01-09    The system shall let a parent in a linked household save an entry as Private or Shared. The default is Shared. In Solo Mode every entry is Private. A Private entry shows only to the creator, and a Shared entry shows to both parents.

  FR-DOC-01-10    The system shall let the creator share a Private entry after a confirm step (MSGT-03). The system shall not let a Shared entry become Private again.

  FR-DOC-01-11    When the co-parent joins a household that has entries saved in Solo Mode, the system shall keep those entries Private until the parent shares them, and shall show MSGT-06.

  FR-DOC-01-12    Each edit of an entry shall save a new version with the original details, who made the change, when, and from which device. The system shall show the history to both parents when the entry is Shared, and to the creator when it is Private. The system shall never overwrite or delete a version.

  FR-DOC-01-13    The system shall not let anyone delete an entry. The creator can archive it. An archived entry is hidden from the list unless the user chooses to show archived entries, stays in the record, and can be restored by the creator. If the creator tries to edit an archived entry, the system shall show ERR-11.

  FR-DOC-01-14    For an entry created by a user in Safety Mode, the system shall hide the address, the phone number and the email from the other parent until the user shares them, and shall show MSGT-11 in their place.

  FR-DOC-01-15    The system shall list entries by child and section, and let a parent filter by child, section and type.

  FR-DOC-01-16    The system shall let the creator link up to 5 documents (DOC-02) that the creator can see to an entry. The other parent sees a link only when the document is Shared. If a user tries to link more than 5, the system shall show ERR-23.

  FR-DOC-01-17    When Third party access is released (ACC-07), the system should let the parents choose which sections of child information a Third party can see, view only. By default a Third party sees none.

  FR-DOC-01-18    The system should show a professional only the entries that a parent shares with that professional.

  FR-DOC-01-19    The system shall make Shared entries and their versions available to Records and Court. Support staff and operations staff cannot see them.

  FR-DOC-01-20    The system shall offer child information in a Linked household and in Solo Mode.

  FR-DOC-01-21    The system shall write an audit log entry for every child added, edited or archived and every entry added, edited, shared, archived or restored, with actor, time and result.

  FR-DOC-01-22    If a child or an entry cannot be saved, the system shall show ERR-09 and shall not create or change it.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                     **When**                                                                                                                                                 **Then**                                                                                                                                                                    **Covers**
  -------------- --------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-DOC-01-01   A signed-in Parent, and today is 2027-01-15                                                   They add a child with the first name Ava and the date of birth 2019-05-04                                                                                The child is saved and MSGT-01 shows                                                                                                                                        FR-DOC-01-01

  AC-DOC-01-02   A Parent adding a child                                                                       They leave the name empty, then enter a name of 61 characters, then enter the date of birth 2027-01-16                                                   The saves are refused with ERR-01, ERR-02 and ERR-03                                                                                                                        FR-DOC-01-02

  AC-DOC-01-03   A household with 10 children                                                                  The Parent adds an 11th child                                                                                                                            The child is not added and ERR-04 shows                                                                                                                                     FR-DOC-01-03

  AC-DOC-01-04   A child named Ava                                                                             The Parent changes the name to Ava Rose, and the Co-parent tries to change it                                                                            A new version is saved with the original details, the actor, the time and the device. The Co-parent is not offered the edit, and a direct attempt is refused with ERR-10.   FR-DOC-01-04

  AC-DOC-01-05   A child with earlier expenses                                                                 The Parent archives the child, and a user then tries to use the child in a new entry                                                                     The earlier expenses still show the child, the child is not offered for new entries, and a direct attempt shows ERR-17                                                      FR-DOC-01-05

  AC-DOC-01-06   A signed-in parent                                                                            They add an entry in Medical with the type Allergy, the title Peanut allergy, the child Ava and details, and open the type lists of the three sections   The entry is saved (MSGT-02), and the lists show the types in FR-DOC-01-06                                                                                                  FR-DOC-01-06

  AC-DOC-01-07   A parent adding an entry                                                                      They enter no title, a title of 101 characters, details of 2,001 characters, the phone 12345, the email name@, and an address of 201 characters          The saves are refused with ERR-01, ERR-05, ERR-06, ERR-07, ERR-08 and ERR-06. A title of 100 characters and details of 2,000 characters are saved.                          FR-DOC-01-07

  AC-DOC-01-08   A linked household                                                                            Parent A and Parent B each add an entry, and Parent B tries to edit the entry of Parent A                                                                Both entries are saved, and the edit by Parent B is refused with ERR-10                                                                                                     FR-DOC-01-08

  AC-DOC-01-09   A linked household, and a household in Solo Mode                                              A parent adds an entry in each                                                                                                                           The entry in the linked household is Shared and the entry in Solo Mode is Private. A Private entry does not show to the other parent.                                       FR-DOC-01-09

  AC-DOC-01-10   A Private entry in a linked household                                                         The creator chooses Share, sees MSGT-03 and confirms                                                                                                     The entry is Shared, MSGT-04 shows, and the creator cannot make it Private again                                                                                            FR-DOC-01-10

  AC-DOC-01-11   A household in Solo Mode with 3 entries                                                       The co-parent accepts an invite                                                                                                                          The 3 entries stay Private, the co-parent cannot see them, and MSGT-06 shows to the parent                                                                                  FR-DOC-01-11

  AC-DOC-01-12   A Shared entry with 2 versions, and a Private entry with 2 versions                           Both parents open the history of each                                                                                                                    Both parents see both versions of the Shared entry. Only the creator sees the history of the Private entry.                                                                 FR-DOC-01-12

  AC-DOC-01-13   A Shared entry                                                                                The creator archives it, shows archived entries, restores it, and tries to edit it while it is archived                                                  The entry is hidden, then shown, then restored (MSGT-05 shows when it is archived), no delete option is offered, and the edit of an archived entry is refused with ERR-11   FR-DOC-01-13

  AC-DOC-01-14   A user in Safety Mode who saves a Shared entry with an address, a phone number and an email   The other parent opens the entry                                                                                                                         The address, phone number and email are hidden and MSGT-11 shows in their place. They show after the user shares them.                                                      FR-DOC-01-14

  AC-DOC-01-15   Entries for two children in three sections                                                    A parent filters by child Ava, by section School, and by type Teacher                                                                                    Each filter shows only the matching entries                                                                                                                                 FR-DOC-01-15

  AC-DOC-01-16   An entry, a Shared document and a Private document                                            The creator links the two documents, and later tries to link 6 documents                                                                                 The other parent sees the link to the Shared document only. The sixth link is refused and ERR-23 shows.                                                                     FR-DOC-01-16

  AC-DOC-01-17   A household with a Third party after ACC-07 is released                                       A parent allows the section School for the Third party                                                                                                   The Third party sees the School entries, view only, and sees no other section                                                                                               FR-DOC-01-17

  AC-DOC-01-18   A Shared entry that a parent has not shared with a professional                               A professional opens the household                                                                                                                       The entry does not show. It shows after the parent shares it.                                                                                                               FR-DOC-01-18

  AC-DOC-01-19   A Shared entry with versions, and a member of support staff                                   Records and Court asks for the entries, and the staff member tries to open them                                                                          The entries and versions are available to Records and Court, and the staff member cannot open them                                                                          FR-DOC-01-19

  AC-DOC-01-20   A Linked household and a household in Solo Mode                                               A parent adds a child and an entry in each                                                                                                               Both are saved and no payment is asked                                                                                                                                      FR-DOC-01-20

  AC-DOC-01-21   A child or an entry                                                                           It is added, edited, shared, archived or restored                                                                                                        One audit log entry exists for each action, with the actor, the time in UTC and the result                                                                                  FR-DOC-01-21

  AC-DOC-01-22   A save error                                                                                  A parent saves a child or an entry                                                                                                                       Nothing is created or changed and ERR-09 shows                                                                                                                              FR-DOC-01-22
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

DOC-02 Secure document and file storage

US-DOC-02-01. As a parent, I want to keep our important documents in one secure place that we both can open, so that they are there when we need them.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-DOC-02-01     The system shall let a parent upload a document with a title (1 to 100 characters, the file name by default), a category (Court or legal, Medical, School, Insurance or Other) and the children (optional). It shall show ERR-01 for an empty title and ERR-05 for a title that is too long.

  FR-DOC-02-02     The system shall accept PDF, DOCX, JPG and PNG files of up to 25 MB each. It shall show ERR-12 for another type and ERR-13 for a file that is too large.

  FR-DOC-02-03     The system shall scan every file for malware before it is saved. A file that fails the scan is not saved, and the system shall show ERR-14.

  FR-DOC-02-04     In a phone browser, the system shall let a parent take a photo of a paper document with the camera and save it as an image. If the camera is not allowed, the system shall let the parent choose a file instead.

  FR-DOC-02-05     The system shall let a parent in a linked household save a document as Private or Shared. The default is Shared. In Solo Mode every document is Private. The creator can share a Private document after a confirm step (MSGT-03). A Shared document cannot become Private again.

  FR-DOC-02-06     When the co-parent joins a household that has documents saved in Solo Mode, the system shall keep those documents Private until the parent shares them, and shall show MSGT-06.

  FR-DOC-02-07     The system shall let a user open a PDF or an image in the browser and download any file the user can see. The system shall not let anyone edit a file.

  FR-DOC-02-08     The system shall let the creator add a new version of a document. The earlier versions stay, can be opened and downloaded, and are shown in the history with who added each and when.

  FR-DOC-02-09     The system shall let the creator delete a Private document. The document moves to Recently deleted, where the creator can restore it for 30 days (MSGT-08 and MSGT-09). After 30 days the system removes it for good.

  FR-DOC-02-10     The system shall not let anyone delete a Shared document and shall show ERR-16 if a user tries. The creator can archive it. An archived document is hidden unless the user chooses to show archived documents, stays in the record, and can be restored by the creator.

  FR-DOC-02-11     The system shall count the files toward the storage limit: 2 GB for each household. It shall show the storage used, the limit and the percent used on the documents screen (MSGT-10). The screen warns at 80 percent.

  FR-DOC-02-12     If a household is over the storage limit, the system shall block new uploads and show ERR-15. Parents can still view and export the existing files.

  FR-DOC-02-13     The storage count shall include documents, expense receipts (EXP-02), journal files (REC-07), message attachments (MSG-09) and photos (DOC-03).

  FR-DOC-02-14     The system shall list the documents that the user can see, and, when MSG-09 is released, the attachments of sent messages that Messaging saves in the household files, with the label From a message. The list shall not show expense receipts or journal files.

  FR-DOC-02-15     The system shall list documents with the newest first, and let a parent filter by category, by child and by source (Uploaded or From a message).

  FR-DOC-02-16     The system should show a professional only the documents that a parent shares with that professional. A Third party sees no document, except through a share link (DOC-06).

  FR-DOC-02-17     The system shall make Shared documents and their versions available to Records and Court. Support staff and operations staff cannot open them.

  FR-DOC-02-18     The system shall offer document storage in a Linked household and in Solo Mode.

  FR-DOC-02-19     The system shall write an audit log entry for every document uploaded, versioned, shared, deleted, restored, archived and opened for download, with actor, time and result.

  FR-DOC-02-20     If a document cannot be saved, the system shall show ERR-09 and shall not create or change it.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                                  **When**                                                                                                                                  **Then**                                                                                                                                                          **Covers**
  -------------- ------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-DOC-02-01   A signed-in parent                                                                         They upload a PDF with the title School report and the category School, then one with no title, then one with a title of 101 characters   The first is saved (MSGT-07). The others are refused with ERR-01 and ERR-05.                                                                                      FR-DOC-02-01

  AC-DOC-02-02   A parent uploading                                                                         They upload a PDF, a DOCX, a JPG, a PNG, a TXT file and a PDF of 26 MB                                                                    The first four are saved, the TXT file is refused with ERR-12, and the large file is refused with ERR-13                                                          FR-DOC-02-02

  AC-DOC-02-03   A file that fails the malware scan                                                         A parent uploads it                                                                                                                       The file is not saved and ERR-14 shows                                                                                                                            FR-DOC-02-03

  AC-DOC-02-04   A parent in a phone browser                                                                They take a photo of a paper, and later the camera is not allowed                                                                         The photo is saved as an image the first time, and the second time the parent is offered a file choice                                                            FR-DOC-02-04

  AC-DOC-02-05   A linked household, and a household in Solo Mode                                           A parent uploads a document in each, and later shares a Private document and confirms                                                     The first is Shared by default and the second is Private. After the confirm step the shared document shows to the other parent and cannot become Private again.   FR-DOC-02-05

  AC-DOC-02-06   A household in Solo Mode with 3 documents                                                  The co-parent accepts an invite                                                                                                           The 3 documents stay Private and MSGT-06 shows                                                                                                                    FR-DOC-02-06

  AC-DOC-02-07   A document that is a PDF and one that is an image                                          A user opens each, downloads each, and looks for a way to edit the file                                                                   Both open in the browser and download, and no edit option is offered                                                                                              FR-DOC-02-07

  AC-DOC-02-08   A document with one file                                                                   The creator adds a new version                                                                                                            Both versions can be opened and downloaded, and the history shows who added each and when                                                                         FR-DOC-02-08

  AC-DOC-02-09   A Private document                                                                         The creator deletes it, restores it, deletes it again, and 30 days pass                                                                   MSGT-08 shows at each delete, the restore works (MSGT-09), and after 30 days the document is removed for good                                                     FR-DOC-02-09

  AC-DOC-02-10   A Shared document                                                                          A user tries to delete it, and the creator then archives it, shows archived documents and restores it                                     The delete is refused with ERR-16, and the archive and restore work                                                                                               FR-DOC-02-10

  AC-DOC-02-11   A household with 1.6 GB used                                                               A parent opens the documents screen                                                                                                       It shows 1.6 GB of 2 GB and 80 percent.                                                                                                                           FR-DOC-02-11

  AC-DOC-02-12   A household over the storage limit                                                         A parent uploads a file                                                                                                                   The upload is blocked and ERR-15 shows, and the existing files can still be viewed and exported                                                                   FR-DOC-02-12

  AC-DOC-02-13   A household with a document, a receipt, a journal file, a message attachment and a photo   A parent opens the documents screen                                                                                                       The storage used includes all five                                                                                                                                FR-DOC-02-13

  AC-DOC-02-14   A message attachment that Messaging saved, an expense receipt and a journal file           A parent opens the document list                                                                                                          The attachment shows with the label From a message. The receipt and the journal file do not show.                                                                 FR-DOC-02-14

  AC-DOC-02-15   Documents of different categories, children and sources                                    A parent opens the list and filters                                                                                                       The newest is first, and each filter shows only the matching documents                                                                                            FR-DOC-02-15

  AC-DOC-02-16   A Shared document that a parent has not shared with a professional, and a Third party      A professional and the Third party open the household                                                                                     The professional does not see it until the parent shares it, and the Third party sees no document                                                                 FR-DOC-02-16

  AC-DOC-02-17   A Shared document with versions, and a member of support staff                             Records and Court asks for the documents, and the staff member tries to open them                                                         The documents and versions are available to Records and Court, and the staff member cannot open them                                                              FR-DOC-02-17

  AC-DOC-02-18   A Linked household and a household in Solo Mode                                            A parent uploads a document in each                                                                                                       Both are saved and no payment is asked                                                                                                                            FR-DOC-02-18

  AC-DOC-02-19   A document uploaded, versioned, shared, deleted, restored, archived and downloaded         Each is done                                                                                                                              One audit log entry exists for each, with the actor, the time in UTC and the result                                                                               FR-DOC-02-19

  AC-DOC-02-20   A save error                                                                               A parent uploads a document                                                                                                               The document is not created and ERR-09 shows                                                                                                                      FR-DOC-02-20
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

DOC-03 Photo album and shared memories

US-DOC-03-01. As a parent, I want to share photos of our child with my co-parent, so that we both keep the memories.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-DOC-03-01     The system should let a parent create an album with a name of 1 to 100 characters and add photos in JPG or PNG, up to 25 MB each. It should show ERR-01 for an empty name, ERR-05 for a name that is too long, ERR-18 for another photo type, ERR-13 for a photo that is too large and ERR-14 for a photo that fails the malware scan.

  FR-DOC-03-02     The system should let a parent add a caption of up to 500 characters to a photo. It should show ERR-06 for a longer caption.

  FR-DOC-03-03     The system should remove the location data from every photo when it is uploaded, and show MSGT-12.

  FR-DOC-03-04     The system should let a parent in a linked household save an album as Private or Shared. The default is Shared, except for a user in Safety Mode and in Solo Mode, where it is Private. The creator can share a Private album after a confirm step (MSGT-03). A Shared album cannot become Private again.

  FR-DOC-03-05     The system should let either parent add photos to a Shared album. Each parent can delete only their own photos. The creator of an album can archive it, and the photos stay.

  FR-DOC-03-06     The system should let a parent delete their own photo. The photo moves to Recently deleted, where the parent can restore it for 30 days (MSGT-08 and MSGT-09). After 30 days the system removes it for good.

  FR-DOC-03-07     When Third party access is released (ACC-07), the system should show a Third party an album only when the parents share it with that person, view only.

  FR-DOC-03-08     The system should count photos toward the storage limit. If the household is over the limit, the system should block new photos and show ERR-15.

  FR-DOC-03-09     The system should treat photos as non-record data. They are not in a certified export.

  FR-DOC-03-10     The system should write an audit log entry for every album created and archived and every photo added and deleted, with actor, time and result.

  FR-DOC-03-11     If an album or a photo cannot be saved, the system should show ERR-09 and should not create it.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                 **When**                                                                                                                                  **Then**                                                                                                                                                                           **Covers**
  -------------- ------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-DOC-03-01   A signed-in parent                                                        They create the album Summer 2027, add a JPG, a PNG and a GIF, a photo of 26 MB, a photo that fails the scan, and an album with no name   The JPG and PNG are added. The GIF is refused with ERR-18, the large photo with ERR-13, the infected photo with ERR-14, and the empty name with ERR-01.                            FR-DOC-03-01

  AC-DOC-03-02   A photo                                                                   The parent adds a caption of 500 characters, then 501 characters                                                                          The first is saved and the second is refused with ERR-06                                                                                                                           FR-DOC-03-02

  AC-DOC-03-03   A photo with location data                                                The parent uploads it                                                                                                                     The saved photo has no location data and MSGT-12 shows                                                                                                                             FR-DOC-03-03

  AC-DOC-03-04   A linked household, a user in Safety Mode, and a household in Solo Mode   A parent creates an album in each                                                                                                         The album is Shared in the linked household and Private for the user in Safety Mode and in Solo Mode. A Private album shared after the confirm step cannot become Private again.   FR-DOC-03-04

  AC-DOC-03-05   A Shared album                                                            Parent B adds a photo, Parent A tries to delete the photo of Parent B, and Parent A archives the album                                    The photo of Parent B is added, the delete by Parent A is not offered, and the album is archived with its photos                                                                   FR-DOC-03-05

  AC-DOC-03-06   A photo that a parent uploaded                                            The parent deletes it, restores it, deletes it again, and 30 days pass                                                                    MSGT-08 shows at each delete, the restore works (MSGT-09), and after 30 days the photo is removed for good                                                                         FR-DOC-03-06

  AC-DOC-03-07   An album that the parents share with a Third party                        The Third party opens it                                                                                                                  The Third party sees the album, view only                                                                                                                                          FR-DOC-03-07

  AC-DOC-03-08   A household over the storage limit                                        A parent adds a photo                                                                                                                     The photo is blocked and ERR-15 shows                                                                                                                                              FR-DOC-03-08

  AC-DOC-03-09   An album with photos                                                      A parent makes a certified export of all record types                                                                                     The photos are not in it                                                                                                                                                           FR-DOC-03-09

  AC-DOC-03-10   An album created, an album archived, a photo added and a photo deleted    Each is done                                                                                                                              One audit log entry exists for each                                                                                                                                                FR-DOC-03-10

  AC-DOC-03-11   A save error                                                              A parent adds a photo                                                                                                                     The photo is not added and ERR-09 shows                                                                                                                                            FR-DOC-03-11
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

DOC-04 Wish list for the child\'s needs

US-DOC-04-01. As a parent, I want a list of what our child needs, so that we do not buy the same thing twice.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-DOC-04-01      The system should keep a wish list for each child, or for All children. Either parent can add an item with a title of 1 to 100 characters and a note of up to 500 characters. It should show ERR-01 for an empty title, ERR-05 for a title that is too long and ERR-06 for a note that is too long.

  FR-DOC-04-02      The system should show the status of an item as Open, Claimed or Done. A parent can claim an Open item. The other parent is alerted through the Notifications module (MSGT-20). If a parent tries to claim an item that is already Claimed, the system should show ERR-24.

  FR-DOC-04-03      The parent who claimed an item can release it, which makes it Open, or mark it Done.

  FR-DOC-04-04      The system should show the list to both parents. Only the creator of an item can edit it, and the creator can delete it while it is Open.

  FR-DOC-04-05      When Third party access is released (ACC-07), the system should show a Third party a wish list only when the parents share it with that person, view only.

  FR-DOC-04-06      In Solo Mode, the system should let the parent keep a wish list for their own use.

  FR-DOC-04-07      The system should treat wish list items as non-record data. They are not in a certified export.

  FR-DOC-04-08      The system should write an audit log entry for every item added, edited, claimed, released, completed and deleted, and show ERR-09 and make no change if an item cannot be saved.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                               **When**                                                                                                                                                       **Then**                                                                                          **Covers**
  -------------- ------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------- --------------
  AC-DOC-04-01   A linked household with a child named Ava               A parent adds an item with the title Winter coat, and later an item with no title, one with a title of 101 characters, and one with a note of 501 characters   The first item is saved. The others are refused with ERR-01, ERR-05 and ERR-06.                   FR-DOC-04-01

  AC-DOC-04-02   An Open item                                            Parent B claims it, and Parent A then tries to claim it                                                                                                        The item is Claimed, Parent A is alerted (MSGT-20), and the second claim is refused with ERR-24   FR-DOC-04-02

  AC-DOC-04-03   A Claimed item                                          The parent who claimed it releases it, then claims it again and marks it Done                                                                                  The status is Open, then Claimed, then Done                                                       FR-DOC-04-03

  AC-DOC-04-04   An Open item that Parent A created                      Parent B tries to edit it, and Parent A then deletes it                                                                                                        Parent B cannot edit it, and Parent A deletes it                                                  FR-DOC-04-04

  AC-DOC-04-05   A wish list that the parents share with a Third party   The Third party opens it                                                                                                                                       The Third party sees the list, view only                                                          FR-DOC-04-05

  AC-DOC-04-06   A household in Solo Mode                                The parent adds an item                                                                                                                                        The item is saved                                                                                 FR-DOC-04-06

  AC-DOC-04-07   A wish list item                                        A parent makes a certified export of all record types                                                                                                          The item is not in it                                                                             FR-DOC-04-07

  AC-DOC-04-08   An item added, claimed and deleted, and a save error    Each happens                                                                                                                                                   One audit log entry exists for each action, and the save error shows ERR-09 with no change        FR-DOC-04-08
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

DOC-05 Shared tasks and to-do lists

US-DOC-05-01. As a parent, I want a task list that we both can use, so that we know who does what for our child.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-DOC-05-01     The system should let either parent create a list with a name of 1 to 100 characters and add tasks to it. It should show ERR-01 for an empty name or title and ERR-05 for a name or title that is too long.

  FR-DOC-05-02     A task has a title of 1 to 100 characters, details of up to 500 characters, a due date (optional), a parent it is assigned to or Unassigned, and a child (optional). The due date must be today or later. The system should show ERR-06 for details that are too long and ERR-19 for a due date in the past.

  FR-DOC-05-03     The system should show the status of a task as Open or Done. The parent it is assigned to, or the creator, can mark it Done. The system should save who did it and when. A Done task cannot be reopened. A parent adds a new task instead.

  FR-DOC-05-04     Only the creator of a task can edit it.

  FR-DOC-05-05     The system should alert the parent a task is assigned to through the Notifications module (MSGT-13), and send a reminder 1 day before the due date while the task is Open (MSGT-14). For a user in Safety Mode, the alert and the reminder should carry no names and no details.

  FR-DOC-05-06     The system should save every change of a task with who made it and when. It should never delete a task. The creator can archive a task or a list. An archived item is hidden unless the user chooses to show archived items, and can be restored by the creator.

  FR-DOC-05-07     In Solo Mode, the system should let the parent keep lists for their own use. A task can be assigned only to the parent.

  FR-DOC-05-08     The system should treat tasks as non-record data. They are not in a certified export.

  FR-DOC-05-09     The system should write an audit log entry for every list and task added, edited, completed, archived and restored, with actor, time and result.

  FR-DOC-05-10     If a list or a task cannot be saved, the system should show ERR-09 and should not create or change it.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                             **When**                                                                                                                     **Then**                                                                                                                         **Covers**
  -------------- ------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------- --------------
  AC-DOC-05-01   A linked household                                                                    A parent creates the list School Forms and a task, and later a list with no name and a task with a title of 101 characters   The first list and task are saved. The others are refused with ERR-01 and ERR-05.                                                FR-DOC-05-01

  AC-DOC-05-02   A parent adding a task, and today is 2027-01-15                                       They enter details of 501 characters, then the due date 2027-01-14, then the due date 2027-01-15                             The first is refused with ERR-06, the second with ERR-19, and the third is saved                                                 FR-DOC-05-02

  AC-DOC-05-03   An Open task assigned to Parent B                                                     Parent B marks it Done, and then looks for a way to reopen it                                                                The status is Done with who and when saved, and no reopen option is offered                                                      FR-DOC-05-03

  AC-DOC-05-04   A task that Parent A created                                                          Parent B tries to edit it                                                                                                    The edit is not offered                                                                                                          FR-DOC-05-04

  AC-DOC-05-05   A task assigned to Parent B with the due date 2027-02-01, and a user in Safety Mode   Parent A assigns it, and it is 2027-01-31                                                                                    Parent B is alerted (MSGT-13) and gets the reminder (MSGT-14). For the user in Safety Mode they carry no names and no details.   FR-DOC-05-05

  AC-DOC-05-06   A task with 3 changes                                                                 The creator archives it and restores it                                                                                      All 3 changes are kept with who and when, no delete option is offered, and the archive and restore work                          FR-DOC-05-06

  AC-DOC-05-07   A household in Solo Mode                                                              The parent adds a task                                                                                                       The task can be assigned only to the parent                                                                                      FR-DOC-05-07

  AC-DOC-05-08   A task                                                                                A parent makes a certified export of all record types                                                                        The task is not in it                                                                                                            FR-DOC-05-08

  AC-DOC-05-09   A list or a task added, edited, completed, archived and restored                      Each is done                                                                                                                 One audit log entry exists for each                                                                                              FR-DOC-05-09

  AC-DOC-05-10   A save error                                                                          A parent saves a task                                                                                                        The task is not created and ERR-09 shows                                                                                         FR-DOC-05-10
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

DOC-06 Expiring share links for files

US-DOC-06-01. As a parent, I want to send a document to a lawyer, a school or a doctor with a link that stops working, so that the file does not stay open forever.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**            **Requirement**
  ----------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-DOC-06-01      The system should offer share links only after the legal review of the sharing terms is recorded as done.

  FR-DOC-06-02      The system should let a parent create a link for a document that the parent can see. The parent chooses how long it works: 24 hours, 48 hours or 7 days. The system should not make a link without an end. It should show MSGT-15 with the end time.

  FR-DOC-06-03      The link should have an address that cannot be guessed. It opens a page where the visitor can view and download the file, without signing in. The page shows no name and no other data of the household.

  FR-DOC-06-04      The link should show the version of the document that was shared, even if a new version is added later.

  FR-DOC-06-05      The system should let the parent copy the link or send it by email. The system should show ERR-08 for an email that is not valid and send the email through the Notifications module.

  FR-DOC-06-06      The system should let the parent who made a link stop it before it ends (MSGT-16). When a link has ended or was stopped, the page the visitor opens should show ERR-20.

  FR-DOC-06-07      The system should show the parent who made the links a list with the document, the end time, the status (Active, Expired or Stopped) and the number of times it was opened. It should not save any data about the visitor.

  FR-DOC-06-08      Only the parent who made a link can see or stop it. The co-parent is not told.

  FR-DOC-06-09      The system should write an audit log entry for every link made and stopped, with actor, time and result.

  FR-DOC-06-10      If a link cannot be made, the system should show ERR-09 and should not create it.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                                          **When**                                                                **Then**                                                                                           **Covers**
  -------------- ---------------------------------------------------------------------------------- ----------------------------------------------------------------------- -------------------------------------------------------------------------------------------------- --------------
  AC-DOC-06-01   A release built before the legal review of the sharing terms is recorded as done   A parent opens a document                                               No share link option is offered                                                                    FR-DOC-06-01

  AC-DOC-06-02   A document                                                                         A parent creates a link for 48 hours                                    The link is made, MSGT-15 shows the end time, and no option for a link without an end is offered   FR-DOC-06-02

  AC-DOC-06-03   A link                                                                             A visitor who is not signed in opens it                                 The visitor can view and download the file, and no name or other household data shows              FR-DOC-06-03

  AC-DOC-06-04   A link for a document with one version                                             The parent adds a second version, and the visitor opens the link        The visitor sees the first version                                                                 FR-DOC-06-04

  AC-DOC-06-05   A link                                                                             The parent copies it, and sends it to name@ and then to a valid email   The copy works. The first email is refused with ERR-08 and the second is sent.                     FR-DOC-06-05

  AC-DOC-06-06   An Active link, and a link that ended 1 hour ago                                   The parent stops the first, and a visitor opens both                    The first shows MSGT-16 when stopped. Both links show ERR-20 to the visitor.                       FR-DOC-06-06

  AC-DOC-06-07   A link opened 3 times                                                              The parent opens the link list                                          The list shows the document, the end time, the status and 3 opens, and no visitor data is saved    FR-DOC-06-07

  AC-DOC-06-08   A link that Parent A made                                                          Parent B opens the household                                            Parent B cannot see or stop the link and was not told                                              FR-DOC-06-08

  AC-DOC-06-09   A link made and a link stopped                                                     Each is done                                                            One audit log entry exists for each                                                                FR-DOC-06-09

  AC-DOC-06-10   A save error                                                                       A parent makes a link                                                   No link is created and ERR-09 shows                                                                FR-DOC-06-10
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

DOC-07 Emergency contact assignment

US-DOC-07-01. As a parent, I want to name a person who is told about key events, so that someone I trust can step in.

The list of key notifications is open. This feature goes to build only after it is closed.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**           **Requirement**
  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  FR-DOC-07-01     The system should offer emergency contacts only after the list of key notifications is closed and the legal and advocate review of it is recorded as done.

  FR-DOC-07-02     The system should let a parent assign an emergency contact with a name of 1 to 100 characters, a phone number or an email (at least one), a relation of up to 60 characters (optional), and the children or All children. The parent can choose a Contacts entry of the type Emergency contact (DOC-01). It should show ERR-01 for a missing name or for a missing phone and email, ERR-05 for a name that is too long, ERR-06 for a relation that is too long, ERR-07 for a phone number that is not valid and ERR-08 for an email that is not valid.

  FR-DOC-07-03     The system should allow up to 3 emergency contacts for each parent and show ERR-22 if a parent tries to add more.

  FR-DOC-07-04     The contact must agree. The system should send an invite by text or email through the Notifications module (MSGT-17). The link works for 7 days, and the contact opens it without an account and agrees. Until then the status is Invited. An expired link shows ERR-20.

  FR-DOC-07-05     The system should show the status of an emergency contact as Invited, Active or Removed, and alert the parent when the contact agrees (MSGT-18).

  FR-DOC-07-06     The system should send an Active contact only the emergency alerts the parent sends. It should never send message text, case details or agency data.

  FR-DOC-07-07     The system should let the parent remove a contact at any time (MSGT-19). Every notification to a contact should carry a link that lets the contact stop getting them.

  FR-DOC-07-08     The system should not offer emergency contacts to a user in Safety Mode and should show ERR-21 if the user tries.

  FR-DOC-07-09     The emergency contacts of a parent are private to that parent. The co-parent is not told. They are not in an export.

  FR-DOC-07-10     The system should keep only the name, the phone number or email, the relation and the status of a contact.

  FR-DOC-07-11     The system should write an audit log entry for every contact invited, agreed and removed, and show ERR-09 and make no change if a contact cannot be saved.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**         **Given**                                                 **When**                                                                                                                                                                                                                                **Then**                                                                                                        **Covers**
  -------------- --------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------- --------------
  AC-DOC-07-01   A release                                                 A parent opens the child information                                                                                                                                                                                                    Emergency contacts are not offered                                                                              FR-DOC-07-01

  AC-DOC-07-02   A signed-in parent                                        They assign a contact with a name, a valid phone number and the relation Aunt, then one with no name, one with no phone and email, one with 101 characters, one with a relation of 61 characters, the phone 12345 and the email name@   The first is saved as Invited. The others are refused with ERR-01, ERR-01, ERR-05, ERR-06, ERR-07 and ERR-08.   FR-DOC-07-02

  AC-DOC-07-03   A parent with 3 emergency contacts                        The parent adds a fourth                                                                                                                                                                                                                The contact is not added and ERR-22 shows                                                                       FR-DOC-07-03

  AC-DOC-07-04   A contact who is invited                                  The contact opens the link on day 3 and agrees, and another contact opens a link on day 8                                                                                                                                               The first becomes Active. The second link shows ERR-20. The invite was sent as MSGT-17.                         FR-DOC-07-04

  AC-DOC-07-05   A contact who agrees                                      The status changes                                                                                                                                                                                                                      The status is Active and the parent is alerted (MSGT-18)                                                        FR-DOC-07-05

  AC-DOC-07-06   An Active contact                                         A key notification is sent                                                                                                                                                                                                              The contact gets only the emergency alerts the parent sends and no message text, case details or agency data    FR-DOC-07-06

  AC-DOC-07-07   An Active contact                                         The parent removes the contact, and a contact opens the stop link in a notification                                                                                                                                                     The status is Removed (MSGT-19) in both cases and no more notifications are sent                                FR-DOC-07-07

  AC-DOC-07-08   A user in Safety Mode                                     They try to assign a contact                                                                                                                                                                                                            The option is not offered, and a direct attempt shows ERR-21                                                    FR-DOC-07-08

  AC-DOC-07-09   A contact that Parent A assigned                          Parent B opens the household, and Parent A makes an export                                                                                                                                                                              Parent B does not see the contact and was not told, and the export has no contact                               FR-DOC-07-09

  AC-DOC-07-10   A contact                                                 The data is saved                                                                                                                                                                                                                       Only the name, phone number or email, relation and status are kept                                              FR-DOC-07-10

  AC-DOC-07-11   A contact invited, agreed and removed, and a save error   Each happens                                                                                                                                                                                                                            One audit log entry exists for each action, and the save error shows ERR-09 with no change                      FR-DOC-07-11
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

11.2 Data reference

  ------------------------------------------------------------------------------
  **Entity**                 **Fields used**
  -------------------------- ---------------------------------------------------
  User                       user_id, role

  Household                  household_id, mode (Linked, Solo)

  Child                      child_id, household_id, first_name, date_of_birth

  Audit log entry            actor, action, object, result, device_type, time
  ------------------------------------------------------------------------------

8.2 New entities (proposed). The sources name none of these fields. They are a BA proposal.

Child information entry

  --------------------------------------------------------------------------------------------------------------------
  **Field**            **Type**                    **Required**   **Notes**
  -------------------- --------------------------- -------------- ----------------------------------------------------
  entry_id             Unique ID                   Yes            System generated

  household_id         Link to Household           Yes            ---

  created_by_user_id   Link to User                Yes            Cannot be changed

  child_id             Link to Child               No             Empty means All children

  section              Choice                      Yes            Medical, School, Contacts

  type                 Choice                      Yes            One of the types for the section (FR-DOC-01-06)

  title                Text                        Yes            1 to 100 characters

  details              Text                        No             Up to 2,000 characters

  contact_name         Text                        No             Up to 100 characters

  phone                Text                        No             E.164 format

  email                Text                        No             Up to 254 characters, email format

  address              Text                        No             Up to 200 characters

  linked_documents     List of links to Document   No             Up to 5

  visibility           Choice                      Yes            Private, Shared. Shared cannot go back to Private.

  status               Choice                      Yes            Active, Archived

  created_at           Date and time               Yes            UTC
  --------------------------------------------------------------------------------------------------------------------

Each entry and each child has versions with the same pattern as an expense version: version number, a snapshot of all fields, who changed it, when, and the device. A version cannot be changed.

Document

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**            **Type**                 **Required**   **Notes**
  -------------------- ------------------------ -------------- ---------------------------------------------------------------------------------------------------
  document_id          Unique ID                Yes            System generated

  household_id         Link to Household        Yes            ---

  created_by_user_id   Link to User             Yes            Cannot be changed. For a message attachment, the sender.

  title                Text                     Yes            1 to 100 characters

  category             Choice                   Yes            Court or legal, Medical, School, Insurance, Other

  children             List of links to Child   No             ---

  visibility           Choice                   Yes            Private, Shared. Shared cannot go back to Private.

  status               Choice                   Yes            Active, Archived, Recently deleted (Private only)

  source               Choice                   Yes            Uploaded, From a message

  deleted_at           Date and time            No             UTC. Set when a Private document moves to Recently deleted. It is removed for good 30 days later.

  created_at           Date and time            Yes            UTC
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

Document version

  ----------------------------------------------------------------------------------------------------------------------------
  **Field**                          **Type**               **Required**   **Notes**
  ---------------------------------- ---------------------- -------------- ---------------------------------------------------
  version_id                         Unique ID              Yes            System generated

  document_id                        Link to Document       Yes            ---

  version_number                     Number                 Yes            1 for the first file

  file_name, file_type, size_bytes   Text, Choice, Number   Yes            File type: PDF, DOCX, JPG, PNG. Size up to 25 MB.

  added_by_user_id                   Link to User           Yes            ---

  added_at                           Date and time          Yes            UTC. Cannot be changed.

  device_type                        Text                   No             5
  ----------------------------------------------------------------------------------------------------------------------------

11.3 Interfaces

All interfaces except INT-10 are with other modules of the app.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**     **With**                      **What passes**                                                                                                                                                                **Features**
  ---------- ----------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ --------------------------------
  INT-01     Accounts and Onboarding       The household mode (Linked or Solo), the roles and the access of a Third party come in.                                                                                        DOC-01 to DOC-07

  INT-03     Records and Court             Shared child information entries, shared documents and their versions go out for exports. The storage used by journal files comes in. Deletion and legal hold rules come in.   DOC-01, DOC-02

  INT-04     Messaging                     Attachments of sent messages come in and are saved in the household files.                                                                                                     DOC-02

  INT-05     Expenses and Payments         The children go out. The storage used by receipts comes in.                                                                                                                    DOC-01, DOC-02

  INT-06     Calendar and Parenting Time   The children go out.                                                                                                                                                           DOC-01

  INT-07     Notifications                 Alerts and reminders for tasks, wish list claims, emergency contacts and share links by email go out.                                                                          DOC-04, DOC-05, DOC-06, DOC-07

  INT-08     Safety and Privacy            The Safety Mode flag comes in, so that contact details are hidden, photo location data is removed and emergency contacts are not offered.                                      DOC-01, DOC-03, DOC-05, DOC-07

  INT-09     Professionals and Access      Entries and documents that a parent shares go out as read-only.                                                                                                                DOC-01, DOC-02

  INT-10     Malware scanning service      Every uploaded file goes to it, and the result comes back. IT chooses the service before the build.                                                                            DOC-02, DOC-03
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

11.4 Non-functional requirements

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**      **Requirement**                                                            **Where it applies here**
  ----------- -------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  NFR-01      Two-factor sign-in for every account (100 percent of accounts)             Child information and documents open only after sign-in with the second check. A share link page and an emergency contact page need no sign-in and show no household data.

  NFR-02      Encryption in transit and at rest                                          Child information, medical details, documents, photos and share links

  NFR-03      Role-based access on every request                                         FR-DOC-01-04, FR-DOC-01-08, FR-DOC-01-09, FR-DOC-02-05, FR-DOC-06-08

  NFR-04      Changes are logged with actor, time and result                             FR-DOC-01-21, FR-DOC-02-19, FR-DOC-03-10, FR-DOC-05-09, FR-DOC-06-09, FR-DOC-07-11

  NFR-05      Records cannot be edited. A change is a new entry.                         FR-DOC-01-04, FR-DOC-01-12, FR-DOC-02-08, FR-DOC-02-10, FR-DOC-06-04

  NFR-06      Collect only the data that is needed                                       Location data is removed from photos (FR-DOC-03-03). No visitor data is saved for a share link (FR-DOC-06-07). Only the needed data is kept for an emergency contact (FR-DOC-07-10).

  NFR-07      Performance. The time to upload and open a file is to be agreed with IT.   FR-DOC-02-01, FR-DOC-02-07

  NFR-08      99.9 percent availability each month, not counting planned maintenance     The public share link page and the emergency contact page

  NFR-09      Plain language on every screen. The standard is to be chosen.2 level AA.   All screens

  NFR-11      English only.                                                              All screens and messages

  NFR-12      Daily backups, data loss limited to 15 minutes, recovery within 4 hours    Documents and their versions
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
