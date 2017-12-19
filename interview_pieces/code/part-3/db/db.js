require('dotenv').config({path: require('path').join(__dirname, '../.env')})

const url = require('url')
const pgp = require('pg-promise')()

const {hostname: host, port, pathname, auth} = url.parse(process.env.DATABASE_URL)
const database = pathname ? pathname.slice(1) : undefined
const user = auth ? auth.split(':')[0] : undefined
const password = auth ? auth.split(':')[1] : undefined
const connection = {host, port, database, user, password, ssl: true}

const db = pgp(connection)
db.connect()

/**
 * Get the names for passengers on a specific flight
 * @param  {string} flightNumber  Flight number for which to retrieve passenger names.
 * @return {Promise}              Promise that resolves to an array of strings.
 *                                  Each string is a passenger name.
 */
const getFlightPassengers = flightNumber =>
  db.query(`
    SELECT p.name
    FROM passengers AS p
      JOIN flights_passengers AS fp
        ON p.id = fp.passenger_id
      JOIN flights AS f
        ON f.id = fp.flight_id
    WHERE f.flight_number = $1`,
    [flightNumber])

module.exports = {
  getFlightPassengers,
}
