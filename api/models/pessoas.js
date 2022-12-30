const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id',
      });
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado' },
        as: 'aulasMatriculadas',
      });
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora(dado) {
          if (dado.length < 4) throw new Error('o campo deve ter min 4 caracteres');
        },
      },
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dado do tipo e-mail invalido',
        },
      },
    },
    role: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    defaultScope: {
      where: { ativo: true },
    },
    scopes: {
      todos: { where: {} },
      // poderia ser qualquer palavra. "todos" foi escolhida
      // etc: { contraint: valor }
    },
    modelName: 'Pessoas',
  });
  return Pessoas;
};
