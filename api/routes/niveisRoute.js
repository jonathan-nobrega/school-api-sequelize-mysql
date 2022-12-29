const { Router } = require('express');
const NivelController = require('../controllers/NivelController');

const router = Router();

router
  .get('/niveis', NivelController.pegaTodasOsNiveis)
  .get('/niveis/:id', NivelController.pegaUmNivel)
  .post('/niveis', NivelController.criaNivel)
  .post('/niveis/:id/restaura', NivelController.restauraNivel)
  .put('/niveis', NivelController.atualizaNivel)
  .delete('/niveis/:id', NivelController.apagaNivel);

module.exports = router;
