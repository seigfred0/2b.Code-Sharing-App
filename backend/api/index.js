const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const generateId = require('shortid');
const Database = require('../Database');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome to the backend'})
})

app.get('/api/code/:uniqueId', async (req, res) => {
    const { uniqueId } = req.params;
    // const findCode = db.find(code => code.uniqueId === uniqueId)
    const data = await Database.getCode(uniqueId)

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

// delete this
// app.listen(3000, () => {
//     console.log('it is running in port: 3000')
// })


module.exports = app