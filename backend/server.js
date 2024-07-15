const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const generateId = require('shortid');
const Database = require('./Database');


app.use(cors());
app.use(express.json());

app.get('/api/code/:uniqueId', async (req, res) => {
    const { uniqueId } = req.params;
    // const findCode = db.find(code => code.uniqueId === uniqueId)
    const data = await Database.getCode(uniqueId)

    // console.log('found..' + data.uniqueId)   

    if (data) {
        res.json({ code: data})
    } else {
        res.status(404).json({ error: 'Code not found' })
    }

})

app.post('/api/share', (req, res) => {
    const { code } = req.body;
    const uniqueId = generateId.generate();
    const newCode = {code, uniqueId};
    Database.saveCode(newCode);


    res.json({ uniqueId })
});



app.listen(3000, () => {
    console.log('it is running in port: 3000')
})