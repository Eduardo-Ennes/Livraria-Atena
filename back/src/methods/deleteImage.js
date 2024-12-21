import fs from 'fs'
import path from 'path';

// Função para apagar a imagem
function deleteImage(imageUrl) {
    const fullPath = path.join(__dirname, '..', imageUrl); // Caminho completo para o arquivo

    // Verifica se o arquivo existe antes de tentar deletá-lo
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error('Erro ao deletar a imagem:', err);
            return false
        } else {
            console.log('Imagem deletada com sucesso!');
            return true
        }
    });
}

export default deleteImage;
