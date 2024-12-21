// src/methods/image.js
import fs from 'fs';
import path from 'path';

// Função para salvar a nova imagem e deletar a antiga
export const saveImage = (oldImage, base64Image) => {
  return new Promise((resolve, reject) => {
    try {
      // Se a imagem nova for igual à antiga, não faz nada
      if (oldImage && base64Image && oldImage === base64Image) {
        console.log('A imagem nova é igual à antiga. Nenhuma alteração será feita.');
        return resolve(oldImage); // Retorna a URL da imagem antiga
      }

      // Definir diretório de uploads - ajustando o caminho para resolver a partir da raiz do projeto
      const uploadsDir = path.resolve(__dirname, '..', 'uploads', 'images');
      
      // Verificar se o diretório de uploads existe, se não, criar
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Verificar se existe uma imagem antiga e deletá-la
      if (oldImage && oldImage !== 'null') {  // Só tenta deletar se a imagem antiga for válida
        const oldImageName = oldImage.split('/').pop(); // Extrai o nome do arquivo da URL
        const oldImagePath = path.join(uploadsDir, oldImageName);

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);  // Deleta a imagem antiga
          console.log(`Imagem antiga ${oldImageName} deletada com sucesso.`);
        }
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
      resolve(false); // Indica que houve um erro
    }
  });
};

export default saveImage;