const express = require('express');
const router = express.Router();

// Move this data into the database
let carRepairs = [{car: 'Outback', miles: 147300, repair: 'Oil change'}];

router.post('/', (req, res) => {
    console.log('/repair POST');
    console.log(req.body);
    let repairFromClient = req.body;
    carRepairs.push(repairFromClient);
    // delivary confirmation
    res.sendStatus(201); // All OK
})

// basic route for stuff
router.get('/', (req, res) => {
    console.log('/repair GET hit');
    res.send(carRepairs);
}) // end /stuff GET

module.exports = router;