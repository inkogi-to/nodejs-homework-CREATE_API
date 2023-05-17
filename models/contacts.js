const fs = require('fs/promises')

const path = require('path')
const {nanoid} = require('nanoid')

const contactPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
const data = await fs.readFile(contactPath )
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const res = contact.find((item) => item.id === contactId);
  return res
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid().toString(),
    ...body,
  };
  console.log(newContact);
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
