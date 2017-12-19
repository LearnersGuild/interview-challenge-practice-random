const pgp = require('pg-promise')()

const db_url = "localhost:///{{ dbName }}"
const db = pgp(connection)
db.connect()
