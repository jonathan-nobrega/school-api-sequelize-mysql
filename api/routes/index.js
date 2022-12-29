const pessoasRoute = require('./pessoasRoute');
const matriculaRoute = require('./matriculasRoute');
const nivelRoute = require('./niveisRoute');
const turmaRoute = require('./turmasRoute');

const routes = (app) => {
  app
    .get('/', (req, res) => res.status(200).send('PING! Welcome to the School API.'))
    .use(pessoasRoute, matriculaRoute, nivelRoute, turmaRoute);
};

module.exports = routes;
