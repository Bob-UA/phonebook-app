const { Command } = require("commander");
const program = new Command();

const contacts = require("./utils/contacts");


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    case "get":
      const getContactById = await contacts.getContactById(id);
      return console.log(getContactById);

    case "add":
      const newContact = await contacts.addContact({ name, phone, email });
      return console.log(newContact);

    case "remove":
      const contactsList = await contacts.removeContact(id);
      return console.log(contactsList);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
