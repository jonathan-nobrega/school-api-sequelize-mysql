const Sequelize = require('sequelize');
const db = require('../models');

class PessoaController {
  static async pegaPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await db.Pessoas.findAll();
      return res.status(200).json(pessoasAtivas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasPessoas = await db.Pessoas.scope('todos').findAll();
      return res.status(200).json(todasPessoas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params;
    try {
      // const umaPessoa = await db.Pessoas.findOne({
      //     where: { id }
      // });
      const umaPessoa = await db.Pessoas.findByPk(id);
      return res.status(200).json(umaPessoa);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaPessoa(req, res) {
    const pessoa = req.body;
    try {
      const novaPessoaCriada = await db.Pessoas.create(pessoa);
      res.status(201).json(novaPessoaCriada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async atualizaPessoa(req, res) {
    const novasInfos = req.body;
    const { id } = req.params;
    try {
      await db.Pessoas.update(novasInfos, {
        where: { id: Number(id) },
      });
      const pessoaAtualizada = await db.Pessoas.findOne({
        where: { id },
      });
      res.status(200).json(pessoaAtualizada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async apagaPessoa(req, res) {
    const { id } = req.params;
    try {
      await db.Pessoas.destroy({ where: { id } });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params;
    try {
      await db.Pessoas.restore({
        where: { id: Number(id) },
      });
      return res.status(200).json({ message: `id ${id} restaurado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  // localhost:3000/pessoas/1/matricula/2
  // localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await db.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(umaMatricula);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await db.Matriculas.create(novaMatricula);
      return res.status(200).json(novaMatriculaCriada);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body;
    try {
      await db.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      const matriculaAtualizada = await db.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });
      res.status(200).json(matriculaAtualizada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await db.Matriculas.destroy({ where: { id: Number(matriculaId) } });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await db.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json({ mensagem: `Matricula com id ${matriculaId} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await db.Pessoas.findOne({
        where: { id: Number(estudanteId) },
      });
      const matriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const todasAsMatriculas = await db.Matriculas
        .findAndCountAll({
          where: {
            turma_id: Number(turmaId),
            status: 'confirmado',
          },
          limit: 10,
          order: [['estudante_id', 'DESC']],
        });
      return res.status(200).json(todasAsMatriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaTurmasLotadas(req, res) {
    const lotacaoTurma = 2;
    try {
      const turmasLotadas = await db.Matriculas
        .findAndCountAll({
          where: {
            status: 'confirmado',
          },
          attributes: ['turma_id'],
          group: ['turma_id'],
          having: Sequelize.literal(`COUNT(turma_id) >= ${lotacaoTurma}`), // this is SQL notation for things Sequelize can't do
        });
      return res.status(200).json(turmasLotadas.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async canceladaPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      await db.Pessoas.update({ ativo: false }, { where: { id: Number(estudanteId) } });
      await db.Matriculas.update({ status: 'cancelado' }, { where: { estudante_id: Number(estudanteId) } });
      return res.status(200).json({ message: `id ${estudanteId} atulizada em 'Pessoas' e 'Matriculas'` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
