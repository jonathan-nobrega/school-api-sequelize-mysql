const db = require('../models');

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    try {
      const todasTurmas = await db.Turmas.findAll();
      return res.status(200).json(todasTurmas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params;
    try {
      // const umaTurma = await db.Turmas.findOne({
      //     where: { id }
      // });
      const umaTurma = await db.Turmas.findByPk(id);
      return res.status(200).json(umaTurma);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaTurma(req, res) {
    const turma = req.body;
    try {
      const novaTurmaCriada = await db.Turmas.create(turma);
      res.status(201).json(novaTurmaCriada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async atualizaTurma(req, res) {
    const novasInfos = req.body;
    const { id } = req.params;
    try {
      await db.Turmas.update(novasInfos, {
        where: { id: Number(id) },
      });
      const TurmaAtualizada = await db.Turmas.findOne({
        where: { id },
      });
      res.status(200).json(TurmaAtualizada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async apagaTurma(req, res) {
    const { id } = req.params;
    try {
      await db.Turmas.destroy({
        where: { id },
      });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params;
    try {
      await db.Turmas.restore({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TurmaController;
