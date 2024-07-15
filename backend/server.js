const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const generateId = require('shortid');

const db = []

app.use(cors());
app.use(express.json());

app.get('/api/code/:uniqueId', async (req, res) => {
    const { uniqueId } = req.params;
    const findCode = db.find(code => code.uniqueId === uniqueId)

    console.log('found..' + findCode.uniqueId)   

    if (findCode) {
        res.json({ code: findCode})
    } else {
        res.status(404).json({ error: 'Code not found' })
    }

})

app.post('/api/share', (req, res) => {
    const { code } = req.body;
    const uniqueId = generateId.generate();
    const newCode = {code, uniqueId}

    db.push(newCode);
    showDatabase()

    res.json({ uniqueId })

});

function showDatabase() {
    console.log(db)
}



app.listen(3000, () => {
    console.log('it is running in port: 3000')
})