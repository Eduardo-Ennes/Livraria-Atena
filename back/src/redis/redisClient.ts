import { createClient } from 'redis'
import dotenv from 'dotenv'
dotenv.config()

const client = createClient({
    url: process.env.REDIS_URL  // Conectando ao Redis local no Windows
  });
  
client.on('error', (err) => {
console.error('Erro de conexão com o Redis:', err);
});


// Exporta o cliente para ser utilizado em outros arquivos
export default client;