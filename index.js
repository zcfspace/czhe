const express = require('express');

const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Servidor desplegado por el puerto: ' + port)
});

app.get('/', (request, response) => {
    response.send('<html><body><p>Hola mundo</p></body></html>');
});

app.get('/html', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.set('view enginr', 'ejs')

app.get('/render', (req, res) => {
    const personas = ['Jack', 'Karen', 'John', 'Mary', 'Peter', 'Lucas'];
    res.render(__dirname + '/views/index.ejs', {
        nombreIndex: personas
    })
});

let coches = [
    { marca: 'Opel', modelo: 'Corsar' },
    { marca: 'Kia', modelo: 'Rio' }
];

app.get('/coches', (req, res) => {
    res.json(coches);
});

app.post('/coches', (req, res) => {
    coches.push(req.body);
    res.json(coches);
});


//Obetener id
app.get('/coches/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const isIdInvalido = isNaN(id) || id >= coches.length || id < 0;

    if (isIdInvalido) {
        res.status(404).json({ error: 404, message: 'Id invalido' });
    } else {
        const result = coches[id];
        res.json(result);
    }
});


//Actualizar coche 
app.put('/coches/:id', (req, res) => {

    const id = parseInt(req.params.id)

    const isIdInvalido = isNaN(id) || id >= coches.length || id < 0;
    if (isIdInvalido) {
        res.status(404).json({ error: 404, message: "Id inválida" });
    } else {
        coches[id] = req.body;
        res.json(coches);
    }
});


//Borrar coche
app.delete('/coches/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const isIdInvalido = isNaN(id) || id >= coches.length || id < 0;

    if (isIdInvalido) {
        res.status(404).json({ error: 404, message: 'Id invalido' });
    } else {
        coches.splice(id, 1);
        res.json(coches);
    }
});




