import { readAllContacts } from '../utils/readAllContacts.js';
import { updateContacts } from '../utils/updateContacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
const generateContacts = async (number) => {
  const contactList = await readAllContacts();
  const newContactsList = Array(number)
    .fill(0)
    .map(() => createFakeContact());
  contactList.push(...newContactsList);
  await updateContacts(contactList);
};

generateContacts(50);
