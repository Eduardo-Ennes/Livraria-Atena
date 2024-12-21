import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css'
import '../css/YourProducts.css'

function YourProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/products/user')
          .then(response => response.json())
          .then(data => {
              // Verifica se 'data.pro' é um array antes de definir no estado
              if (Array.isArray(data.pro)) {
                  setProducts(data.pro);
              } else {
                  console.error('A resposta da API não contém um array de produtos');
                  setProducts([]); // Garantir que 'products' seja um array
              }
          })
          .catch(error => {
              console.error('Erro:', error);
              setProducts([]); // Garantir que 'products' seja um array em caso de erro
          });
      }, []);

  return (
    <div className='contein-yourproducts'>
        {products.length > 0 ? (
            products.map((product) => (
                <div key={product.id_product} className='contein-books-yourproducts'>
                    <Link to={`/settings/updatedproduct/${product.id_product}`}>
                        <img src={product.image ? `http://localhost:8080${product.image}` : '/path/to/default/image.png'} alt={product.name} />
                    </Link>
                    <div className='div-contein-titulo-price-yourproducts'>
                        <Link to={`/settings/updatedproduct/${product.id_product}`}>
                            <p className='p-titulo'>{product.name}</p>
                        </Link>
                        <Link to={`/settings/updatedproduct/${product.id_product}`}>
                            <p className='p-price'>{product.price}</p>
                        </Link>
                        <Link to={`/settings/updatedproduct/${product.id_product}`} className='LinkUpdateProduct'>
                            <p className='p-LinkUpdateProduct'>Atualizar</p>
                        </Link>
                    </div>
                </div>
            ))
        ) : (
            <div className='div-notYourProducts'> 
                <h1>Você não possui nenhum livro cadastrado!</h1>
            </div>
        )}
    </div>
  )
}

export default YourProducts