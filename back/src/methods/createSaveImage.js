// src/methods/image.js
import fs from 'fs';
import path from 'path';

// Função para salvar a nova imagem
export const saveImage = (base64Image) => {
  return new Promise((resolve, reject) => {
    try {
      // Definir diretório de uploads - ajustando o caminho para resolver a partir da raiz do projeto
      const uploadsDir = path.resolve(__dirname, '..', 'uploads', 'images');
      
      // Verificar se o diretório de uploads existe, se não, criar
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Gerar nome único para a nova imagem
      const imageName = `image_${Date.now()}.png`;
      const imagePath = path.join(uploadsDir, imageName);

      // Salvar a imagem em Base64 no sistema de arquivos
      const imageBuffer = Buffer.from(base64Image.split(',')[1], 'base64'); // Remove o prefixo 'data:image/png;base64,' e converte para Buffer
      fs.writeFileSync(imagePath, imageBuffer);

      // Retorna o caminho da nova imagem salva
      resolve(`/uploads/images/${imageName}`);
    } catch (error) {
      console.error('Erro ao salvar a imagem: ', error.message);
      reject(error); // Usar reject para erros
    }
  });
};

export default saveImage;
