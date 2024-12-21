import { useEffect, useState } from 'react';
import '../App.css'
import { Link } from 'react-router-dom';

const BooksContainer = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para verificar se está carregando

  useEffect(() => {
    fetch('http://localhost:8080/')
      .then(response => response.json())
      .then(data => {
        console.log(data.data)
        setProducts(data.data);
        setIsLoading(false); // Carregamento finalizado
      })
      .catch(error => {
        console.error('Erro:', error);
        setIsLoading(false); // Mesmo com erro, finaliza o carregamento
      });
  }, []);

  return (
    <>
      {isLoading ? ( 
        <div className="loading">
          <h1>Carregando...</h1> {/* Mensagem enquanto carrega */}
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id_product} className='contein-books'>
                <div className='contein-books-item'>
                  <Link to={`/infoproduct/${product.id_product}`}>
                    <img src={`http://localhost:8080${product.image}`} alt={product.name} className="img" />
                  </Link>
                  <div className='div-contein-titulo-price'>
                    <Link to={`/infoproduct/${product.id_product}`}>
                      <p className='p-titulo'>{product.name}</p>
                    </Link>
                    <Link to={`/infoproduct/${product.id_product}`}>
                      {product.promotion === 1 ? (
                        <div className='LinkPriciPromotion'>
                          <p className='price_promotion'>R${product.price_promotion}x</p>
                          <p className='p-price-des'> R${product.price}</p>
                        </div>
                      ) : (
                        <p className='p-price'>R${product.price}</p>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='empety'>
              <h1>Não temos livros no momento!</h1>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BooksContainer