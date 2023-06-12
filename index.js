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

/*
app.delete('/pessoas', async function(req, res){
  try {
    console.log(req.body.id)
    var pessoa = await Pessoa.delete(req.body.id);
    res.json(pessoa.rows);
  } catch (error) {
    console.error('Erro ao atualizar pessoa:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar pessoa' });
  }
});*/


app.listen(3001, function() {
  console.log(`app de Exemplo escutando na porta ${3001}.`)
});
