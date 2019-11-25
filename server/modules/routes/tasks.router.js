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

router.delete( '/', ( req, res )=>{
    console.log( 'in DELETE:', req.params );
    res.send( 'quack' );
}) // end DELETE

router.put( '/', ( req, res )=>{
    console.log( 'in PUT:', req.params );
    res.send( 'ribbet' );
}) // end PUT

// exports
module.exports = router;