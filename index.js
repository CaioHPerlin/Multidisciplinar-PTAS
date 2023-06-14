const express = require('express');
const path = require('path');
const Produto = require("./models/produto");
const cors= require('cors');
const app = express();
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/produtos', async function(req, res){
  try {
    var produtos = await Produto.select();
    res.json(produtos.rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar produtos' });
  }
});

app.post('/produtos', async function(req,res){
  try{
    var produto = req.body
    var produto = await Produto.insert(produto);
    res.json(produto.rows)
  }catch(error){
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao cadastrar produto' });
  }
})

app.post('/detalhes', async function(req,res){
  try{
    var produto = await Produto.selectOne(req.body.id);
    res.json(produto.rows[0])
  }catch(error){
    console.error('Erro ao selecionar produto:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao selecionar produto' });
  }
})

app.delete('/detalhes/deletar', async function(req, res){
  try {
    var produto = await Produto.delete(2);
    res.json(produto.rows);
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao deletar produto' });
  }
});

/*
app.put('/detalhes/atualizar', async function(req, res){
  try{
    var produto = await Produto.update(req.body.id, req.body)
  }
})
*/

app.listen(3001, function() {
  console.log(`app de Exemplo escutando na porta ${3001}.`)
});
