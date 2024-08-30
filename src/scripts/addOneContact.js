import { readAllContacts } from '../utils/readAllContacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import { updateContacts } from '../utils/updateContacts.js';
export const addOneContact = async () => {
  const contactList = await readAllContacts();
  const newContact = createFakeContact();
  contactList.push(newContact);
  await updateContacts(contactList);
};

addOneContact();
