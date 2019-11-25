// requires
const pg = require( 'pg' );
let config = {};

if (process.env.DATABASE_URL){
    //use the stuff from the process to configure
    const params = url.parse(process.env.DATABASE_URL)
    const auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true, //heroku requires this to be true
        max: 10,
        idleTimeoutMillis: 30000
    }
}
    else {
        config = {
            database: 'dev-db',
            host: 'localhost',
            port: 5432,
            max: 27,
            idleTimeoutMillis: 10000
        }
    }

// db stuff
const pool = pg.Pool(config); // end pool

// exports
module.exports = pool;