const express = require('express');
const path = require('path');
const app = express();

const cors = require('cors');

app.use(cors());

let rootDir = path.join(__dirname, '../');

app.use(express.static(path.join(rootDir, 'client/build')));

const apiRouter = require('./routes/api');

app.use('/api', apiRouter);

app.get('/', hello_world);

function hello_world(req, res) {
    res.send("Hello baka!");
}

app.get('*', (req, res) => {
    res.sendFile(path.resolve(rootDir, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App listening on ${port}!`);