$( document ).ready( onReady );

function addTask(){
    console.log( 'in addTask' );
    let objectToSend = {
        name: $( '#nameIn' ).val()
    } //end obj
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST:', response );
    }).catch( function( err ){
        alert( 'nope. console' );
        console.log( err );
    })
}

function getTasks(){
    console.log( 'in getTasks')
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then( function( response ){
        console.log( 'back from GET:', response );
        showTasks( response );
    }).catch( function ( err ){
        alert( 'error getting tasks. see console for details' );
        console.log( err )
    }) // end AJAX
}

function onReady(){
    $( '#addTaskButton' ).on( 'click', addTask );
    getTasks();
}

function showTasks( tasks ){
    let el = $( '#tasksOut' );
    el.empty();
    for( let i=0; i<tasks.length; i++ ){
        let task = tasks[ i ];
        // style these based on completion
        // make buttons work
        el.append( `<li>${ task.task } <button>Complete</button><button>Delete</button></li>`)
    } //end for
}
