const Contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      return console.table(contacts);
    case "get":
      const contact = await Contacts.getContactById(id);
      return console.table(contact);
    case "add":
      const newContact = await Contacts.addContact(name, email, phone);
      return console.table(newContact);
    case "remove":
      const removedContact = await Contacts.removeContact(id);
      return console.table(removedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
