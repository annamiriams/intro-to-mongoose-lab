// import mongoose (dependency)
const mongoose = require('mongoose');

// build the customer schema (ie a blueprint/shape of these objects)
const customerSchema = new mongoose.Schema({
    // uppercase because they're classes
    name: String,
    age: Number,
});

// compile the schema into a model
// models/todo.js
// 'Customer' is the name for the database, and we're passing in customerSchema, so that we can add, update, etc.
const Customer = mongoose.model('Customer', customerSchema);

// export the model
// models, not schemas, contain the functionality to perform CRUD on a MongoDB collection
// export it so we can use it in our other files
module.exports = Customer;
