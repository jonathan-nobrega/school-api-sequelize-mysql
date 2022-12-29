const db = require('../models');

class MatriculaController {
  static async pegaTodasAsMatriculas(req, res) {
    try {
      const todasMatriculas = await db.Matriculas.findAll();
      return res.status(200).json(todasMatriculas);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaUmaMatricula(req, res) {
    const { id } = req.params;
    try {
      // const umaMatricula = await db.Matriculas.findOne({
      //     where: { id }
      // });
      const umaMatricula = await db.Matriculas.findByPk(id);
      return res.status(200).json(umaMatricula);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaMatricula(req, res) {
    const matricula = req.body;
    try {
      const novaMatriculaCriada = await db.Matriculas.create(matricula);
      res.status(201).json(novaMatriculaCriada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async atualizaMatricula(req, res) {
    const novasInfos = req.body;
    const { id } = req.params;
    try {
      await db.Matriculas.update(novasInfos, {
        where: { id: Number(id) },
      });
      const MatriculaAtualizada = await db.Matriculas.findOne({
        where: { id },
      });
      res.status(200).json(MatriculaAtualizada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async apagaMatricula(req, res) {
    const { id } = req.params;
    try {
      await db.Matriculas.destroy({
        where: { id },
      });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = MatriculaController;
