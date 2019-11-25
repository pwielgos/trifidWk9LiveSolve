// requires
const pg = require( 'pg' );

// db stuff
const pool = pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: '5432',
    max: 27,
    idleTimeoutMillis: 10000
}); // end pool
