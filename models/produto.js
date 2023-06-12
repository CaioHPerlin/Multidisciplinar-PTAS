const db = require("../db");

class Produto {
  static async select() {
    try {
      const connect = await db.connect();
      const sql = "SELECT * FROM produto"
      return await connect.query(sql);
    } catch (error) {
      console.error('Erro ao selecionar produtos:', error);
      throw error;
    }
  }

  static async insert(data) {
    try {
      const connect = await db.connect();
      const sql = "INSERT INTO produto(titulo, data_cadastro, preco, descricao, imagem) VALUES ($1, $2, $3, $4, $5)";
      const values = [data.titulo, data.dataCadastro, data.preco, data.descricao, data.imagem];
      return await connect.query(sql, values);
    } catch (error) {
      console.error('Erro ao inserir novo produto:', error);
      throw error;
    }
  }

  static async selectOne(id) {
    try {
      const connect = await db.connect();
      const sql = "SELECT * FROM produto WHERE id=$1";
      return await connect.query(sql,[id]);
    } catch (error) {
      console.error('Erro ao recuperar registro por id:', error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const connect = await db.connect();
      const sql = "";
      const values = [data.nome, data.idade, data.uf, id];
      return await connect.query(sql, values);
    } catch (error) {
      console.error('Erro em update:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const connect = await db.connect();
      const sql = "DELETE FROM pessoas WHERE id=$1";
      return await connect.query(sql, [id]);
    } catch (error) {
      console.error('Erro em delete:', error);
      throw error;
    }
  }
}

module.exports = Produto;
