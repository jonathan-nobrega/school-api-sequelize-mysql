const db = require('../models');

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasPessoas = await db.Pessoas.findAll();
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
}

module.exports = PessoaController;
