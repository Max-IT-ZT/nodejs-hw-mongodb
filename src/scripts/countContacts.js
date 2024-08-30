import { readAllContacts } from '../utils/readAllContacts.js';

export const countContacts = async () => {
  const contacts = await readAllContacts();
  return contacts.length;
};

console.log(await countContacts());
