const express = require('express');
const app = express();
const db = require('./db');
const port = 3000; 
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: '*'
}))

app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            return res.status(500).json('Erro ao selecionar a tabela usuarios');
        }
        res.status(200).json(results);
    });
});

app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    db.query('INSERT INTO usuarios ( nome, email, senha ) VALUES (?, ?, ?)', 
        [nome, email, senha ], 
        (error, results) => {
        if (error) {
            return res.status(500).json(`Erro ao inserir usuario`);
        }
        res.status(201).json({message: 'Usuario inserido com sucesso!'});
    });
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    db.query('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, id], (error, results) => {
        if (error) {
            return res.status(500).json('Erro ao atualizar algo na tabela usuarios');
        }
        res.status(201).json({message: 'Usuario atualizado com sucesso!'});
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json('Erro ao atualizar algo na tabela usuarios');
        }
        res.status(201).json({message: 'Usuario deletado com sucesso!'});
    });
});

app.get('/tarefas', (req, res) => {
    db.query('SELECT * FROM tarefas', (error, results) => {
        if (error) {
            return res.status(500).json('Erro ao selecionar a tabela tarefas');
        }
        res.status(200).json(results);
    });
});

app.post('/tarefas', (req, res) => {
    const { usuarios_id, titulo, descricao } = req.body;
    db.query('INSERT INTO tarefas (usuarios_id, titulo, descricao) VALUES (?, ?, ?)', 
        [usuarios_id, titulo, descricao], 
        (error, results) => {
            if (error) {
                return res.status(500).json(`Erro ao inserir tarefa`);
            }
            res.status(201).json({ message: 'Tarefa inserida com sucesso!' });
        });
});

app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { usuarios_id, titulo, descricao } = req.body;
    db.query('UPDATE tarefas SET usuarios_id = ?, titulo = ?, descricao = ? WHERE id = ?', [usuarios_id, titulo, descricao, id], (error, results) => {
        if (error) {
            return res.status(500).json('Erro ao atualizar algo na tabela tarefas');
        }
        res.status(201).json({message: 'Tarefa atualizada com sucesso!'});
    });
});

app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tarefas WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json('Erro ao atualizar algo na tabela tarefas');
        }
        res.status(201).json({message: 'Tarefa deletada com sucesso!'});
    });
});

app.listen(port, () => {
    console.log(`Api rodando em http://localhost:${port}`);
});

module.exports = app;