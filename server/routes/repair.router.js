const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Similar to a Class

// Define our data structure
const RepairSchema = new Schema({
    car: {type: String}, // car must be a string
    miles: {type: Number},
    repair: {type: String},
    cost: {type: Number},
    complete: {type: Boolean}
}); // Requires all data adhere to these types

// This is a Model. It allows us to interface with the database.
const Repair = mongoose.model('Repairs', RepairSchema);
// Repairs will be the collection name

// Move this data into the database
let carRepairs = [{car: 'Outback', miles: 147300, repair: 'Oil change'}];

// PUT & DELETE will always have a /:id
router.put('/repairComplete/:id', (req, res) => {
    // PUT will update something in the database
    // req.body for anything other than an id
    console.log('Update', req.params.id);
    // _id is a Mongo id
    // Find a document by id
    Repair.findOne({_id: req.params.id}).then((foundRepair) => {
        console.log(foundRepair);
        // make the change
        foundRepair.complete = true;
        foundRepair.cost += 100;
        // save the document
        foundRepair.save().then((response) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
    }).catch((error) => {
        res.sendStatus(500);
        console.log('error', error);
    })
});

router.delete('/:id', (req, res) => {
    Repair.findByIdAndRemove(req.params.id).then( (response) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });
})

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
});

router.get('/outback', (req, res) => {
    // { search query }
    Repair.find({car: 'Outback'}).then( (outbackRepairs) => {
        res.send(outbackRepairs);
    }).catch( (error) => {
        res.sendStatus(500);
    })
});

// Route parameter
router.get('/search/:name', (req, res) => {
    // req.params.name is whatever you put in the URL
    // /repair/legacy then req.params.name = 'outback'
    Repair.find({car: req.params.name}).then( (foundRepairs) => {
        res.send(foundRepairs);
    }).catch( (error) => {
        res.sendStatus(500);
    });
});

// localhost:5000/repair/miles/0/100000
router.get('/miles/:start/:end', (req, res) => {
    const startMiles = req.params.start; // 0
    const endMiles = req.params.end; // 100000
    Repair.find({miles: {$gt: startMiles, $lt: endMiles}})
          .then( (foundInRange) => {
            res.send(foundInRange);
    }).catch( (error) => {
        res.sendStatus(500);
    })
});

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