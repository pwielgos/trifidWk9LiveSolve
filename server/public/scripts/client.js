$( document ).ready( onReady );

const verbose = true;

function addTask(){
    if( verbose ) console.log( 'in addTask' );
    let objectToSend = {
        name: $( '#nameIn' ).val()
    } //end obj
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then( function( response ){
        if( verbose ) console.log( 'back from POST:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'nope. console' );
        console.error( err );
    })
}

function completeTask(){
    const myId = $( this ).data( 'id' ); 
    if( verbose ) console.log( 'in completeTask, ID:', myId, `/tasks/${ myId }` );
    $.ajax({
        type: 'PUT',
        url: `/tasks/${ myId }`
    }).then( function( response ){
        if( verbose ) console.log( 'back from PUT with:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'unable to update. see console for details' );
        console.error( err );
    }) //end AJAX
}

function deleteTask(){
    let myId = $( this ).data( 'id' );
    if( verbose ) console.log( 'in deleteTask:', myId );
    $.ajax({
        type: 'DELETE',
        url: '/tasks/' + myId
    }).then( function( response ){
        if( verbose ) console.log( 'back from delete:', response );
        getTasks();
    }).catch( function( err ){
        console.error( err );
        alert( 'error deleting task, see console for deets' );
    })
}

function getTasks(){
    if( verbose ) console.log( 'in getTasks')
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then( function( response ){
        if( verbose ) console.log( 'back from GET:', response );
        showTasks( response );
    }).catch( function ( err ){
        alert( 'error getting tasks. see console for details' );
        console.error( err )
    }) // end AJAX
}

function onReady(){
    $( '#addTaskButton' ).on( 'click', addTask );
    $( '#tasksOut' ).on( 'click', '.completeButton', completeTask );
    $( '#tasksOut' ).on( 'click', '.deleteButton', deleteTask );
    getTasks();
}

function showTasks( tasks ){
    let el = $( '#tasksOut' );
    el.empty();
    for( let i=0; i<tasks.length; i++ ){
        let task = tasks[ i ];
        // style these based on completion
        // make buttons work
        let appendString = `<li`;
        if( task.status === 'true' ){
            appendString += ` class="task complete"`;
        }
        else{
            appendString += ` class="task incomplete"`;
        }
        appendString += `>${ task.task } `;
        appendString += `<button class="completeButton" data-id="${ task.id }">Complete</button>`;
        appendString +=`<button class="deleteButton" data-id="${ task.id }">Delete</button></li>`;
        el.append( appendString );
    } //end for
}
