const Services = require('./Services');
const db = require('../models');

class PessoasServices extends Services {
  constructor() {
    super('Pessoas');
    this.matriculas = new Services('Matriculas');
  }

  async pegaRegistrosAtivos(where = {}) {
    return db[this.modelName].findAll({ where: { ...where } });
  }

  async pegaTodosOsRegistros(where = {}) {
    return db[this.modelName]
      .scope('todos')
      .findAll({ where: { ...where } });
  }

  async cancelaPessoaEMatriculas(estudanteId) {
    return db.sequelize.transactions(async (t) => {
      await super.atualizaUmRegistro({ ativo: false }, estudanteId, { transaction: t });
      await this.matriculas.atualizaVariosRegistros(
        { status: 'cancelado' },
        { estudante_id: estudanteId },
        { transaction: t },
      );
    });
  }
}

module.exports = PessoasServices;
