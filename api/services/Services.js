/* eslint-disable default-param-last */
const db = require('../models');

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async pegaTodosOsRegistros(where = {}) {
    return db[this.modelName].findAll({ where: { ...where } });
  }

  async pegaUmRegistro(id, where = {}) {
    return db[this.modelName].findOne({
      where: { id },
      ...where,
    });
  }

  async criaUmRegistro(data) {
    return db[this.modelName].create(data);
  }

  async atualizaUmRegistro(data, id, transacao = {}) {
    return db[this.modelName]
      .update(data, { where: { id } }, transacao);
  }

  async atualizaVariosRegistros(data, where, transacao = {}) {
    return db[this.modelName]
      .update(data, { where: { ...where } }, transacao);
  }

  async apagaUmRegistro(id) {
    return db[this.modelName].destroy({
      where: { id },
    });
  }

  async restauraUmRegistro(id) {
    return db[this.modelName].restore({ where: { id: Number(id) } });
  }

  async encontraEContaRegistros(where = {}, agregadores) {
    return db[this.modelName]
      .findAndCountAll({ where: { ...where } }, ...agregadores);
  }
}

module.exports = Services;
