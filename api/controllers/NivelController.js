const db = require('../models');

class NivelController {
  static async pegaTodasOsNiveis(req, res) {
    try {
      const todasNiveis = await db.Niveis.findAll();
      return res.status(200).json(todasNiveis);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaUmNivel(req, res) {
    const { id } = req.params;
    try {
      // const umaNivel = await db.Niveis.findOne({
      //     where: { id }
      // });
      const umaNivel = await db.Niveis.findByPk(id);
      return res.status(200).json(umaNivel);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaNivel(req, res) {
    const nivel = req.body;
    try {
      const novaNivelCriada = await db.Niveis.create(nivel);
      res.status(201).json(novaNivelCriada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async atualizaNivel(req, res) {
    const novasInfos = req.body;
    const { id } = req.params;
    try {
      await db.Niveis.update(novasInfos, {
        where: { id: Number(id) },
      });
      const NivelAtualizada = await db.Niveis.findOne({
        where: { id },
      });
      res.status(200).json(NivelAtualizada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async apagaNivel(req, res) {
    const { id } = req.params;
    try {
      await db.Niveis.destroy({
        where: { id },
      });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraNivel(req, res) {
    const { id } = req.params;
    try {
      await db.Niveis.restore({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = NivelController;
