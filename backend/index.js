const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const generateId = require('shortid');
const Database = require('./Database');
let port = process.env.PORT || 3000


const corsOptions = {
    origin: '*', // Allow requests from any origin (replace with your frontend URL in production)
    credentials: true, // Allow cookies and other credentials to be sent
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // Allow specified methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
};

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: 'welcome to the backend'})
    // res.setHeader("Access-Control-Allow-Origin", "*")
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
});

app.get('/api', (req, res) => {
    res.json({ hello: 'hello'})
})

// app.get('/api/hello', (req, res) => {
//     res.json({ hello: 'hello'})
// })

app.get('/api/:uniqueId',  async (req, res) => {
    const { uniqueId } = req.params;
    const findCode = db.find(code => code.uniqueId === uniqueId)
    const data = await Database.getCode(uniqueId)

    res.json({ uniqueId })
    if (data) {
        res.json({ code: data.code,
            language: data.language
        })
    } else {
        res.status(404).json({ error: 'Code not found' })
    }
})


app.put('/api/code/:uniqueId', async (req, res) => {
    try {
        const { uniqueId }  = req.params;
        const { code, language } = req.body;
        

        const result = await Database.updateCode(uniqueId, code, language);

        console.log('Updated')
        console.log(uniqueId, code)
        
        res.json({ message: 'updating'})
    } catch (error) {
        console.error(error)
    }
})

app.post('/api/share', (req, res) => {
    const { code, language } = req.body;
    const uniqueId = generateId.generate();
    const newCode = {uniqueId, language, code};
    Database.saveCode(newCode);


    res.json({ uniqueId })
});

app.listen(port, () => {
    console.log('it is running in port: 3000')
})


module.exports = app