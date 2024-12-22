import express from 'express'
import cors from 'cors'
import router from './routes/http'
import 'reflect-metadata'
import client from './redis/redisClient'
import path from 'path'
// import db from '../database/Connection' 

const app = express()

// Middleware para permitir JSON e dados de formulários
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Teste de conexão com o banco
// db.raw('SELECT 1')
//   .then(() => {
//     console.log('Conexão bem-sucedida ao MySQL!');
//     db.destroy();  // Fecha a conexão após o teste
//   })
//   .catch((err) => {
//     console.error('Erro ao conectar ao MySQL:', err.message);
//     db.destroy();  // Fecha a conexão em caso de erro
//     });

// Configuração de CORS
app.use(cors())

// Url para exibir imagens no frontend
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Rotas
app.use(router)


const startServer = async () => {
    try{
        // Conecta o redis
        if (!client.isOpen) {
            await client.connect();
            console.log('Conectado ao Redis');
        } else {
            console.log('Redis já está conectado.');
        }
        
        // Inicializa a aplicação
        app.listen(8080, () => {
            console.log('Servidor inicializado na porta 8080.')
        })

    }catch(err){
        console.log('Inicialização do servidor: ' + err)
    }
}

startServer()