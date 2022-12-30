const Services = require('./Services');

class MatriculasServices extends Services {
  constructor() {
    super('Matriculas');
  }

  async encontraEContaMatriculas(){
    const todasAsMatriculas = await db.Matriculas
    .findAndCountAll({
      where: {
        turma_id: Number(turmaId),
        status: 'confirmado',
      },
      limit: 10,
      order: [['estudante_id', 'DESC']],
    });
  }
}

module.exports = MatriculasServices;
