const connectToMongo=require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 5000

app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// this is a Route to respond to get request
app.get('/', (req, res) => {
  res.send('Hello Rishi!')
})

// it is for listening on Port 5000 On Localhost
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})