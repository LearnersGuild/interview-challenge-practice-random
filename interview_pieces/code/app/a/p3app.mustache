require('dotenv').config({path: '../.env'})
const express = require('express')
const { getFlightPassengers } = require('./db/db')

const app = express();
app.use(express.static('public'))
// app.set('view engine', 'pug')
// app.set('view engine', 'ejs')

app.get('/flight_roster', (req, res) => {
  const flightNumber = req.query.flightNumber;
  getFlightPassengers(flightNumber)
    .then((passengers) => {
      res.render('flight_roster', { flightNumber, passengers });
    })
    .catch((err) => {
      res.render('flight_roster', { message: `An error occurred: ${err.toString()}` });
    })
    .catch(console.error);
});

app.listen(3000, () => console.log('Flying high on port 3000!'))
