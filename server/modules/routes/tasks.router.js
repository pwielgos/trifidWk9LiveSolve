// requires
const express = require( 'express' );
const router = express.Router();
const pool = require( '../pool' );

// routes
router.get( '/', ( req, res )=>{
    console.log( 'in GET' );
    let queryString = `SELECT * FROM tasks`;
    pool.query( queryString ).then( ( result )=>{
        res.send( result.rows );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 400 );
    }) // end query
}) // end GET

router.post( '/', ( req, res )=>{
    console.log( 'in POST:', req.body );
    let queryString = `INSERT INTO tasks ( task, status ) VALUES ( $1, $2 )`;
    pool.query( queryString, [ req.body.name , 'false' ] ).then( ( result )=>{
        console.log( 'added!' );
        res.sendStatus( 201 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 400 );
    })
}) // end POST

router.delete( '/:id', ( req, res )=>{
    console.log( 'in DELETE, removing task with ID:', req.params );
    let queryString = `DELETE FROM tasks WHERE id=($1)`;
    pool.query( queryString, [ req.params.id ] ).then( ( result )=>{
        console.log( 'deleted' );
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 400 );
    }) // end DELETE
}) // end DELETE

router.put( '/:id', ( req, res )=>{
    console.log( 'in PUT, completing task with ID:', req.params );
    let queryString = `UPDATE tasks SET status='true' WHERE id = ($1)`;
    pool.query( queryString, [ req.params.id ] ).then( ( result )=>{
        console.log( 'updated' );
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 400 );
    })
}) // end PUT

// exports
module.exports = router;