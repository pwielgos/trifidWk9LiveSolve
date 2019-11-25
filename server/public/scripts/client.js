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
        getTasks();
    }).catch( function( err ){
        alert( 'nope. console' );
        console.log( err );
    })
}

function completeTask(){
    const myId = $( this ).data( 'id' ); 
    console.log( 'in completeTask, ID:', myId, `/tasks/${ myId }` );
    $.ajax({
        type: 'PUT',
        url: `/tasks/${ myId }`
    }).then( function( response ){
        console.log( 'back from PUT with:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'unable to update. see console for details' );
        console.log( err );
    }) //end AJAX
}

function deleteTask(){
    let myId = $( this ).data( 'id' );
    console.log( 'in deleteTask:', myId );
    $.ajax({
        type: 'DELETE',
        url: '/tasks/' + myId
    }).then( function( response ){
        console.log( 'back from delete:', response );
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'error deleting task, see console for deets' );
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
