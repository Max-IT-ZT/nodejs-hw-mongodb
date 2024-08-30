import { readAllContacts } from '../utils/readAllContacts.js';
export const getAllContacts = async () => {
  return readAllContacts();
};

console.log(await getAllContacts());
