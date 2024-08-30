import { readAllContacts } from '../utils/readAllContacts.js';
import { updateContacts } from '../utils/updateContacts.js';
export const removeLastContact = async () => {};
const contactList = await readAllContacts();
contactList.pop();
await updateContacts(contactList);
removeLastContact();
