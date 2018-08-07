// requires
const express = require( 'express' );
const app = express();
const bodyParser = require('body-parser');
const repairRouter = require('./routes/repair.router.js');

// makes the data avaiilable on req.body
// bodyParser sets req.body = data;
app.use(bodyParser.urlencoded({extended: true}));

// uses
app.use( express.static( 'server/public' ) );
app.use('/repair', repairRouter)

// globals
// if process.env.PORT is undefined, use 5000
const port = process.env.PORT || 5000;


// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) // end spin up server

 