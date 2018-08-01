$( document ).ready( readyNow );
let verbose = true;

function readyNow(){
    $( '#getButton' ).on( 'click', getStuff );
    // 'submit' is triggered when the user submits
    // the form.
    $( '#noise-form' ).on( 'submit', sendNoiseToServer);
} // end readyNow

function sendNoiseToServer(event) {
    // browsers will refresh on form submit by default.
    // stop the page from refreshing with preventDefault
    event.preventDefault(); 
    let noiseFromInput = $('#noise-input').val();
    console.log(noiseFromInput);
    $.ajax({
       method: 'post',
       url: '/addNoise',
       data: {noise: noiseFromInput}
    }).then(function(response) {
        console.log('success!!!!!', response);
        getStuff();
    }).catch(function(error){
        alert('unable to add noise');
        console.log(error);
    });
}

function getStuff(){
    if( verbose ) console.log( 'in getStuff' );
    $.ajax({
        method: 'GET',
        url: '/stuff'
    }).done( function( response ){
        if( verbose ) console.log( 'back from server with:', response );
        let outputElement = $( '#noisesOut' );
        outputElement.empty();
        for( noise of response ){
            outputElement.append( '<li>' + noise + '</li>' );
        } // end for
    }).fail( function( error ){
        if( verbose ) console.log( 'error with AJAX request:', error );
    }) // end ajax
} // end getStuff