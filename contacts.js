const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

// Повертає масив контактів.
async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
async function getContactById(contactId) {
  const contacts = await listContacts();

  if (contacts.id !== contactId) {
    return null;
  }

  return contacts.find((contact) => contact.id === contactId);
}

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];

  await listContacts(newContacts);

  return contacts[index];
}

// Повертає об'єкт доданого контакту.
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contactId = crypto.randomUUID();
  const newContact = { contactId, name, email, phone };
  const newContacts = [...contacts, newContact];
  await listContacts(newContacts);

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
