import { useState, useEffect } from 'react'
import '../css/InfoProduct.css'
import Method from '../method/Card/AddProduct'
import { Link, useParams, useNavigate } from 'react-router-dom'

const InfoProduct = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    // Para não causar um loop infinito na url /product/informatrion
    const [loading, setLoading] = useState(false)
    // Armazena os dados de usuário do proprietário do livro
    const [user, setUser] = useState({})
    // Armazena os dados de vendedor do proprietário do livro
    const [seller, setSeller] = useState({})
    // Armazena os dados do livro selecionado
    const [product, setProduct] = useState({})
    // Armazena os dados do usuário que está logado, se não tiver ninguém logado vira 0
    const [userLogado, setUserLogado] = useState({})

    useEffect(() => {
        if(loading === false){
            fetch(`http://localhost:8080/product/information/${id}`)
            .then(res => res.json())
            .then(data => {
                if(data.code === 400){
                    window.alert(data.err)
                    setLoading(true)
                    navigate('/')
                }
                else{
                    setProduct(data.data[0])
                    setUser(data.data[1])
                    setSeller(data.data[2])
                    setUserLogado(data.data[3])
                    console.log(data.data)
                    setLoading(true)
                }
            })
            .catch(err => console.log(err))
        }
    })

    const handleCard = async () => {
        const info = {
            id: product.id_product,
            image: product.image,
            name: product.name,
            quantity_pro: 1,
            promotion: product.promotion,
            price: parseFloat(product.price),
            price_promotion: parseFloat(product.price_promotion)
        }
        console.log(info)
        const response = await Method.Api(info)
        if(response.status){
            window.alert(response.cer)
            navigate('/card')
        }
        else{
            if(response.code === 500){
                window.alert(response.err)
            }
            if(response.code === 400){
                window.alert(response.err)
                navigate('/')
            }
            if(response.code === 409){
                window.alert(response.err)
                navigate('/')
            }
            window.alert(response.err)
        }
    }

  return (
    <>
        <header>
            <h1>
                <Link to="/" className='h1-InfoProduct'>
                    Livraria
                </Link>
            </h1>
            <h1>Informações do Produto</h1>
        </header>
        <div className="Infopro-position">

            <div className="InfoSeller">
                <h3>Vendedor</h3>
                <p>Nome: {user.first_name} {user.last_name}</p>
                <p>E-mail: {user.email}</p>
                <p>Cnpj: {seller.cnpj}</p>
                <p>Estado: {seller.state}</p>
                <p>Cidade: {seller.city}</p>
                <p>Rua: {seller.street}</p>
                <p>Número: {seller.number}</p>
                <p>Telefône: {seller.phone}</p>
            </div>

            <div className='InfoProduct-contein'>
                <div className='Infoproduct-positionInContein'>
                    <img src={`http://localhost:8080${product.image}`} alt={product.name} className="img" />
                    <div className='InfoProduct-position-info'>
                        <div className='InfoProduct-name-genero-price'>
                            <p>{product.name}</p>
                            {product.category === 1 && 
                                <p>Categoria: Ficção</p>
                            }
                            {product.category === 2 && 
                                <p>Categoria: História</p>
                            }
                            {product.category === 3 && 
                                <p>Categoria: Auto-ajuda</p>
                            }
                            {product.promotion === 1 ?
                                <div className='LinkPriciPromotion'>
                                    <p className='price_promotion'>R${product.price_promotion}x</p>
                                    <p className='p-price-des'> R${product.price}</p>
                                </div>
                            :
                                <p>R${product.price}</p>
                            }
                        </div>
                        <div className="InfoAddCard">
                            {product.own === userLogado.id ?
                                <Link to={`/settings/updatedproduct/${product.id_product}`}>
                                    <button type='button' className='Button-add'>Atualizar produto</button>
                                </Link>
                                :
                                <button type='button' onClick={handleCard} className='Button-add'>Adicionar ao carrinho</button>
                            }
                            <Link to="/">
                                <button className='Button-Continuar-comprando'>Continuar comprando</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='InfoProduct-description'>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default InfoProduct