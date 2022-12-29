const express = require('express');
const routes = require('./routes');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

module.exports = app;
