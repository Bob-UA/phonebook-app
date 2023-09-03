const { readFile, writeFile } = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
console.log();
const contactsPath = path.join(__dirname, "../db/contacts.json");

async function  listContacts(){
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId)
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};