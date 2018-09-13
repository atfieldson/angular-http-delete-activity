const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Similar to a Class

// Define our data structure
const RepairSchema = new Schema({
    car: { type: String }, // car must be a string
    miles: { type: Number },
    repair: { type: String },
    cost: { type: Number },
    complete: { type: Boolean, default: false }
}); // Requires all data adhere to these types

// This is a Model. It allows us to interface with the database.
const Repair = mongoose.model('Repairs', RepairSchema);

router.put('/', (req, res) => {
    console.log('Update', req.query);
    const carToEdit = {
        _id: req.query._id,
        car: req.query.car,
        miles: req.query.miles,
        repair: req.query.repair,
        cost: req.query.cost,
        complete: false
    };

    Repair.findByIdAndUpdate(carToEdit._id, carToEdit).then((response) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error making update', error);
        res.sendStatus(500);
    });
});

router.delete('/', (req, res) => {
    Repair.findByIdAndRemove(req.query._id).then((response) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error making delete', error);
        res.sendStatus(500);
    });
})

router.post('/', (req, res) => {
    console.log('/repair POST');
    console.log(req.body);
    let repairFromClient = req.body;
    Repair.create(repairFromClient).then(() => {
        console.log('Item added', repairFromClient);
        res.sendStatus(201); // All OK
    }).catch((error) => {
        console.log('error making post', error);
        res.sendStatus(500); // Send back an error to client
    });
});

// basic route for stuff
router.get('/', (req, res) => {
    console.log('/repair GET hit');
    // {} means find everything! We are searching the collection.
    Repair.find({}).then((foundRepairs) => {
        // foundRepairs is an Array of everything found
        res.send(foundRepairs);
    }).catch((error) => {
        console.log('error making get', error);
        res.sendStatus(500);
    });
    //res.send(carRepairs);
}) // end /stuff GET

module.exports = router;