const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT  || 5000;

const public = path.join(__dirname, 'static');

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});
app.get('/translate', function(req, res) {
    res.sendFile(path.join(public, 'translate.html'));
});

app.use('/', express.static(public));
app.listen(PORT, () => console.log('Server listening on port:' + PORT))
