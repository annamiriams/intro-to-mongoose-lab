// i dont know fully understand what this does but i needed it for the into to mongoose lecture
// install dependency
const mongoose = require('mongoose');

// you could also write the following line as require('dotenv').dotenv.config();
const dotenv = require('dotenv');
dotenv.config();

// {sigint: true} allows the user to exit the prompt by pressing Ctrl+C
const prompt = require('prompt-sync')({ sigint: true });



// import customer model
const Customer = require('./models/customer.js');


// function to create a customer
// i think it needs to be an async function so that the very last can be await getAction();
const createCustomer = async () => {
    const customerName = prompt('What is the customer\'s name? ');
    const customerAge = prompt('What is the customer\'s age? ');
    // update Customer model/object to include new customer's information
    const newCustomer = await Customer.create({
        name: customerName,
        age: customerAge,
    });
    // why isn't it logging newCustomer or running getAction() next?
    console.log(newCustomer);
    getAction();
};

// function to view all customers

// function to update a customer

// function to delete a customer

// function to quit
function quit() {
    console.log('Exiting...')
    mongoose.connection.close();
}

// switch statement to handle user choice
function handleChoice(choice) {
    switch (choice) {
        case '1':
            console.log('Enter information for your new customer: ');
            createCustomer();
            break;
        case '2':
            console.log('Here are your current customers: ');
            viewCustomers();
            break;
        case '3':
            console.log('Enter the ID of the customer you\'d like you update: ');
            updateCustomer();
            break;
        case '4':
            console.log('Enter the ID for your customer you\'d like to delete: ');
            deleteCustomer();
            break;
        case '5':
            quit();
            break;
        default:
            console.log("Invalid choice. Please choose a valid option.");
            break;
    };
};

function getAction() {
    // log user's name and ask for action choice
    console.log('What would you like to do?');
    // list menu of options
    console.log('1. Create a customer');
    console.log('2. View all customers');
    console.log('3. Update a customer');
    console.log('4. Delete a customer');
    console.log('5. Quit');
    // prompt user to enter a number corresponding to an action, change string to integer?? unsure if needed yet
    const choice = prompt('Choose an action: ');
    // run switch statement function 
    handleChoice(choice);
};

// create function to start app that asks for name, welcomes to app, and runs getAction();
function startApp() {
    const username = prompt('What is your name? ');
    console.log(`Hi, ${username}! Welcome to our terminal-based CRM app.`);
    getAction();
};


startApp();