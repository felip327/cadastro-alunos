require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const PORT = 3000;

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_KEY
);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
 res.send('Servidor rodando! Rota raiz OK.');
});

app.get('/alunos', async (req, res) => {
 const { data, error } = await supabase.from('alunos').select('*');
 if (error) return res.status(400).json(error);
 res.json(data);
});

app.get('/alunos/:id', async (req, res) => {
  const { id } = req.params;
 const { data, error } = await supabase.from('alunos').select('*').eq('id', id);
 if (error) return res.status(400).json(error);
 res.json(data);
});

app.post('/alunos', async (req, res) => {
 const { nome, idade, turma } = req.body;
 const { data, error } = await supabase
  .from('alunos')
  .insert([{ nome, idade, turma }]);
 if (error) return res.status(400).json(error);
 res.json(data);
});

app.put('/alunos/:id', async (req, res) => {
 const { id } = req.params;
 const { nome, idade, turma } = req.body;
 const { data, error } = await supabase
  .from('alunos')
  .update({ nome, idade, turma })
  .eq('id', id);
 if (error) return res.status(400).json(error);
 res.json(data);
});

app.delete('/alunos/:id', async (req, res) => {
 const { id } = req.params;
 const { data, error } = await supabase
  .from('alunos')
  .delete()
  .eq('id', id);
 if (error) return res.status(400).json(error);
 res.json(data);
});

app.listen(PORT, () => {
 console.log(`Servidor rodando em http://localhost:${PORT}`);
});