// requires
const express = require( 'express' );
const router = express.Router();

// routes
router.get( '/', ( req, res )=>{
    console.log( 'in GET' );
    res.send( 'meow' );
}) // end GET

router.post( '/', ( req, res )=>{
    console.log( 'in POST:', req.body );
    res.send( 'woof' );
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