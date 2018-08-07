const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Similar to a Class

// Define our data structure
const RepairSchema = new Schema({
    car: {type: String}, // car must be a string
    miles: {type: Number},
    repair: {type: String}
}); // Requires all data adhere to these types

// This is a Model. It allows us to interface with the database.
const Repair = mongoose.model('Repairs', RepairSchema);
// Repairs will be the collection name

// Move this data into the database
let carRepairs = [{car: 'Outback', miles: 147300, repair: 'Oil change'}];

router.post('/', (req, res) => {
    console.log('/repair POST');
    console.log(req.body);
    let repairFromClient = req.body;
    // Add to the database
    // validating we match the schema
    const repairToAdd = new Repair(repairFromClient); 
    // Puts the data into the database
    repairToAdd.save().then(() => {
        console.log('Item added', repairToAdd);
        res.sendStatus(201); // All OK
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500); // Send back an error to client
    });
    //carRepairs.push(repairFromClient);
    // delivary confirmation
})

// basic route for stuff
router.get('/', (req, res) => {
    console.log('/repair GET hit');
    // {} means find everything! We are searching the collection.
    Repair.find({}).then( (foundRepairs) => {
        // foundRepairs is an Array of everything found
        res.send(foundRepairs);
    }).catch( (error) => {
        res.sendStatus(500);  
    });
    //res.send(carRepairs);
}) // end /stuff GET

module.exports = router;