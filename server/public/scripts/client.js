const myApp = angular.module('CarApp', []);

myApp.controller('CarController', function() {
    // onReady for our controller
    // ALL OF OUR CODE GOES HERE
    console.log('CarController is ready');
    const vm = this;
    vm.carToAdd = {car: 'Outback', 
                   miles: 12345, 
                   repair:'tires', 
                   cost: 800};

    

});



$( document ).ready( readyNow );

function readyNow(){
    // 'submit' is triggered when the user submits
    // the form.
    $( '#repair-form' ).on( 'submit', sendRepairToServer);
    getCarRepairs();
} // end readyNow

function sendRepairToServer(event) {
    // browsers will refresh on form submit by default.
    // stop the page from refreshing with preventDefault
    event.preventDefault(); 
    const carFromInput = $('#car-input').val();
    const milesFromInput = $('#miles-input').val();
    const repairFromInput = $('#repair-input').val();
    const costFromInput = $('#cost-input').val();
    $.ajax({
        method: 'post',
        url: '/repair',
        data: { car: carFromInput, 
                miles: milesFromInput, 
                repair: repairFromInput,
                cost: costFromInput }
    }).then(function(response) {
        console.log('success!!!!!', response);
        getCarRepairs();
    }).catch(function(error){
        alert('unable to add repair');
        console.log(error);
    });
}

// AJAX request to get all car repairs from the server
function getCarRepairs(){
    console.log( 'in getCarRepairs' );
    $.ajax({
        method: 'GET',
        url: '/repair'
    }).then( function( response ){
        console.log( 'back from server with:', response );
        let outputElement = $( '#repairs-output' );
        outputElement.empty();
        for( repair of response ){
            const row = $('<tr></tr>');
            row.append('<td>' + repair.car + '</td>');
            row.append('<td>' + repair.miles + '</td>');
            row.append('<td>' + repair.repair + '</td>');
            row.append('<td>' + repair.cost + '</td>');
            outputElement.append(row);
        } // end for
    }).catch( function( error ){
        alert('unable to get repairs');
        console.log( 'error with AJAX request:', error );
    }) // end ajax
} // end getStuff