const express = require('express');
const moongose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

moongose.connect('mongodb+srv://onmistack:onmistack@rocketseat-week-9-lgavj.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json());
/* Fazer a foto aparecer quando acessar a url/files */
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);