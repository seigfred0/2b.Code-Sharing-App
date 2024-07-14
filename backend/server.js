const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');


app.use(cors());
app.use(express.json());
// app.get('/api/test', (req, res) => {
//     res.json({ message: 'Hello from Express API'})
// })

app.post('/api/test', (req, res) => {
    const received = req.body;
    console.log(received); // Log received data on the server
    res.json({ message: 'Data received successfully' }); // Send a response back to the client
});

app.listen(3000, () => {
    console.log('it is running in port: 3000')
})