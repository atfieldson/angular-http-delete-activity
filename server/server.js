// requires
const express = require( 'express' );
const app = express();
const bodyParser = require('body-parser');

// makes the data avaiilable on req.body
// bodyParser sets req.body = data;
app.use(bodyParser.urlencoded({extended: true}));

// uses
app.use( express.static( 'server/public' ) );

// globals
// if process.env.PORT is undefined, use 5000
const port = process.env.PORT || 5000;
let stuff = [ 'meow', 'ribbet', 'woof', 'oink', 'moo', 'whinney', 'baaaaaah' ]

// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) // end spin up server

app.post('/addNoise', ( req, res ) => {
    console.log('/addNoise POST');
    console.log(req.body);
    let noiseFromClient = req.body.noise;
    stuff.push(noiseFromClient);
    console.log(stuff);
    // delivary confirmation
    res.sendStatus(201); // All OK
})

// basic route for stuff
app.get( '/stuff', ( req, res )=>{
    console.log( '/stuff GET hit' );
    res.send( stuff );
}) // end /stuff GET 