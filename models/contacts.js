const fs = require("fs/promises");

const path = require("node:path");
const {nanoid} = require("nanoid");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactPath);
	return JSON.parse(data);
};

const getContactById = async (id) => {
	const contact = await listContacts();
	return contact.find((item) => item.id === id);
};

const removeContact = async (id) => {
	const contact = await listContacts();
	const index = contact.findIndex((item) => item.id === id);

	if (index === -1) {
		return null;
	}
	const [result] = contact.splice(index, 1);
	await fs.writeFile(contactPath, JSON.stringify(contact, null, 2));
	return result;
};

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid().toString(),
		...body,
	};
	contacts.push(newContact);
	await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
	return newContact;
};

const updateContact = async (id, body) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === id);
	if (index === -1) {
		return null;
	}
	contacts[index] = {id, ...body}
	await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
	return contacts[index]

};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
