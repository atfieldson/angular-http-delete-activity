$( document ).ready( readyNow );
let verbose = true;

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
    let carFromInput = $('#car-input').val();
    let milesFromInput = $('#miles-input').val();
    let repairFromInput = $('#repair-input').val();
    $.ajax({
        method: 'post',
        url: '/repair',
        data: { car: carFromInput, miles: milesFromInput, repair: repairFromInput}
    }).then(function(response) {
        console.log('success!!!!!', response);
        getCarRepairs();
    }).catch(function(error){
        alert('unable to add repair');
        console.log(error);
    });
}

function getCarRepairs(){
    if( verbose ) console.log( 'in getStuff' );
    $.ajax({
        method: 'GET',
        url: '/repair'
    }).then( function( response ){
        if( verbose ) console.log( 'back from server with:', response );
        let outputElement = $( '#noisesOut' );
        outputElement.empty();
        for( repair of response ){
            outputElement.append('<li>' + repair.car + ' ' + repair.miles + ' ' + repair.repair + '</li>' );
        } // end for
    }).catch( function( error ){
        if( verbose ) console.log( 'error with AJAX request:', error );
    }) // end ajax
} // end getStuff