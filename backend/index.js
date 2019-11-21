const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());

const apiRouter = require('./routes/api');

app.use('/api', apiRouter);

app.get('/', hello_world);

function hello_world(req, res) {
    res.send("Hello baka!");
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App listening on ${port}!`);