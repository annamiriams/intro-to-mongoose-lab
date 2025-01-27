// i dont know fully understand what this does but i needed it for the into to mongoose lecture
// install dependency
const mongoose = require('mongoose');

// you could also write the following line as require('dotenv').dotenv.config();
const dotenv = require('dotenv');
const Customer = require('./models/customer');
dotenv.config();

// {sigint: true} allows the user to exit the prompt by pressing Ctrl+C
const prompt = require('prompt-sync')({ sigint: true });



// import customer model
// const Customer = require('./models/customer.js');


// // function to create a customer
// // i think it needs to be an async function so that the very last can be await getAction();
// const createCustomer = async () => {
//     const customerName = prompt('What is the customer\'s name? ');
//     const customerAge = prompt('What is the customer\'s age? ');
//     // update Customer model/object to include new customer's information
//     const newCustomer = await Customer.create({
//         name: customerName,
//         age: customerAge,
//     });
//     // why isn't it logging newCustomer or running getAction() next?
//     console.log(newCustomer);
//     getAction();
// };

// // function to view all customers

// // function to update a customer

// // function to delete a customer

// // function to quit
// function quit() {
//     console.log('Exiting...')
//     mongoose.connection.close();
// }

// // switch statement to handle user choice
// function handleChoice(choice) {
//     switch (choice) {
//         case '1':
//             console.log('Enter information for your new customer: ');
//             createCustomer();
//             break;
//         case '2':
//             console.log('Here are your current customers: ');
//             viewCustomers();
//             break;
//         case '3':
//             console.log('Enter the ID of the customer you\'d like you update: ');
//             updateCustomer();
//             break;
//         case '4':
//             console.log('Enter the ID for your customer you\'d like to delete: ');
//             deleteCustomer();
//             break;
//         case '5':
//             quit();
//             break;
//         default:
//             console.log("Invalid choice. Please choose a valid option.");
//             break;
//     };
// };

// function getAction() {
//     // log user's name and ask for action choice
//     console.log('What would you like to do?');
//     // list menu of options
//     console.log('1. Create a customer');
//     console.log('2. View all customers');
//     console.log('3. Update a customer');
//     console.log('4. Delete a customer');
//     console.log('5. Quit');
//     // prompt user to enter a number corresponding to an action, change string to integer?? unsure if needed yet
//     const choice = prompt('Choose an action: ');
//     // run switch statement function 
//     handleChoice(choice);
// };

// // create function to start app that asks for name, welcomes to app, and runs getAction();
// function startApp() {
//     const username = prompt('What is your name? ');
//     console.log(`Hi, ${username}! Welcome to our terminal-based CRM app.`);
//     getAction();
// };


// startApp();


// austin's support time code below:


// has to be async because we're going to connect to a database within it
const main = async () => {

    // function definitions

    // added from starter code block in intro to mongoose module
    const connect = async () => {
        // connect to mongodb using the MONGODB_URI specified in the .env file
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    };

    // if user says exit, then disconnect();
    const disconnect = async () => {
        await mongoose.disconnect();
        console.log('Disconnecting')
        process.exit();
    };

    const welcome = () => {
        // using backticks allows you to log multiple lines
        // the string below will print the indentations and line breaks as written below. you could console log each line too (like i did earlier)
        console.log(`What would you like to do?
    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. quit
    `);
        const response = prompt('Number of action to run: ');
        console.log(response);
        return response;
    };

    const createCustomer = async () => {
        const name = prompt('What is the customer\'s name? ');
        const age = prompt('What is the customer\'s age? ');
        let customer = await Customer.create({
            // shorthand for 'name: 
            name,
            // to make sure that we convert the string into an integer for age
            // "edge case": if we were trying to guard against errors, we should add something to catch the possibility that a user adds NaN when asked for an age (ie reprompt for age)
            age: parseInt(age),
        });
        console.log('You created: ', customer);
    };

    const viewCustomers = async () => {
        const customers = await Customer.find({});
        console.log('Here are all current customers: ', customers);
    };

    const updateCustomer = async () => {
        const id = 
        
        console.log('Below is a list of all current customers. ', customers);
        prompt('Copy and paste the id of the customer you want to update here: ');
        customer = await Customer.findById(id);
        
        prompt('What is the customer\'s new name? ');
        prompt('What is the customer\'s new age? ');
        await customer.save();

        //     const username = prompt('What is your name? ');
        //     console.log(`Hi, ${username}! Welcome to our terminal-based CRM app.`);
    };
    // ------------------------------------------------------

    // function invocations

    // wait until connect() is done running before continuing to run the rest of the code
    await connect();
    // \n adds adds an empty line after the log
    console.log('Welcome to your favorite CRM!\n');


    // let answer = welcome();

    // borrowing a structure from python (do..while loop)
    // while true, keep doing whatever the user tells you, but if they ever hit 5, quit
    // austin prefers this method instead of the solution code because it allows you to not have to call getAction() in every other function like the solution code. one thing can happen when you do it the solution code way
    // don't do this in the browser. the reason it's possible here it's because we have access to process.exit() which is global and trumps everything. otherwise we'd be in an infinite loop.
    // bottom line: this is easier to debug later instead of calling getAction() and whatever other repeatable functions
    while(true) {
        const answer = welcome();
        // not required, but leaving 5 at top to remind us that we need it to make sure we dont end up in an infinite loop
        if (answer === '5') await disconnect();
        if (answer === '1') await createCustomer();
        if (answer === '2') await viewCustomers();
        if (answer === '3') await updateCustomer();

    };

};

main();