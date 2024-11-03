import express from 'express';
import path from 'path';

const porta = 5000;
const host = '0.0.0.0';

var listarCarros = [];

const app = express();

app.use(express.static('./publico'));

app.use('/cadastro', (req, resp) => {
    const modelo = req.query.modelo;
    const placa = req.query.placa;
    const ano = req.query.ano;
    const cidade = req.query.cidade;
    const estado = req.query.estado;

    listarCarros.push({

        modelo: modelo,
        placa: placa,
        ano: ano,
        cidade: cidade,
        estado: estado
    });
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="UTF-8">');
    resp.write('<title>Cadastro de Veiculos</title>');
    resp.write('</head>');
    resp.write('<body>');
    resp.write(`<h1>Cadastro do Veiculo modelo ${modelo} placa ${placa} efetuado com Sucesso</h1>`);
    resp.write('<button><a href="cadastro.html">Continuar Cadastrando</a></button>');
    resp.write('<br>');
    resp.write('<br>');
    resp.write('<button><a href="/relatorio">Relatorio de Veiculos</a></button>');
    resp.write('</body>')
    resp.write('</html>');
    resp.end();
});

app.use('/relatorio',(req,resp)=>{
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resp.write('<meta charset="UTF-8">');
    resp.write('<title>Relatorio de Veiculos</title>');
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Veiculos</h1>');
    resp.write('<table class="table table-dark table-striped">');
    resp.write('<tr>');
    resp.write('<th>Modelo</th>');
    resp.write('<th>Placa</th>');
    resp.write('<th>Ano</th>');
    resp.write('<th>Cidade</th>');
    resp.write('<th>Estado</th>');
    resp.write('</tr>');
    for (let i = 0; i < listarCarros.length; i++) {
        resp.write('<tr>');
        resp.write(`<td>${listarCarros[i].modelo}</td>`);
        resp.write(`<td>${listarCarros[i].placa}</td>`);
        resp.write(`<td>${listarCarros[i].ano}</td>`);
        resp.write(`<td>${listarCarros[i].cidade}</td>`);
        resp.write(`<td>${listarCarros[i].estado}</td>`);
    }
    resp.write('</table>');
    resp.write('<button><a href="cadastro.html">Continuar Cadastrando</a></button>');
    resp.write('<br>');
    resp.write('<br>');
    resp.write('<button><a href="index.html">Voltar ao Inicio</a></button>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resp.write('</html>');
    resp.end();
    
})

app.use(express.static(path.join(process.cwd(),'/publico')));

app.listen(porta, host, () => {
    console.log(`Servidor executando na porta http://${host}; ${porta}`);
})