import '../css/Card.css'
import MethodDelete from '../method/Card/DeleteProduct'
import Method from '../method/Card/AddProduct'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Card() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [logado, setLogado] = useState()
  const [product, setProduct] = useState([])
  const [total, setTotal] = useState()

  useEffect(() => {
    if(loading === false){
      fetch('http://localhost:8080/card')
      .then(res => res.json())
      .then(data => {
        console.log(data)
      setLogado(data.logado)
      setProduct(data.data)
      setTotal(data.total)
      setLoading(true)
    })
    .catch(err => console.log(err))
    }    
  })

  const handleAddOne = async (event, item) => {
    try{
      event.preventDefault()
      const info = {
        id: item.id,
        name: item.name,
        quantity_pro: 1,
        promotion: item.promotion,
        price: parseFloat(item.price),
        price_promotion: parseFloat(item.price_promotion)
    }
    const response = await Method.Api(info)
    if(response.status){
      window.alert(response.cer)
      window.location.reload()
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
    }catch(err){
      console.log(err)

    }
  }

  const handleDelOne = async (event, item) => {
    try{
      event.preventDefault()
      const info = {
        id: item.id,
        name: item.name,
        quantity_pro: -1,
        promotion: item.promotion,
        price: parseFloat(item.price),
        price_promotion: parseFloat(item.price_promotion)
    }
    const response = await Method.Api(info)
    if(response.status){
      window.alert(response.cer)
      window.location.reload()
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
    }catch(err){
      console.log(err)

    }
  }

  const handleDelete = async (event, item) => {
    try{
      event.preventDefault()
      const info = {
        id: item.id,
        name: item.name,
        quantity_pro: item.quantity_pro,
        promotion: item.promotion,
        price: parseFloat(item.price),
        price_promotion: parseFloat(item.price_promotion)
    }
    const response = await MethodDelete.Api(info)
    if(response.status){
      window.alert(response.cer)
      window.location.reload()
    }
    else{
      if(response.code === 500){
        window.alert(response.err)
      }
      if(response.code === 400){
        window.alert(response.code)
        navigate('/')
      }
      if(response.code === 409){
        window.alert(response.code)
        navigate('/')
      }
    }
    }catch(err){
      console.log(err)

    }
  }

  return (
    <div className='card-back'>
      <div className='card-conteiner'>
        {product.length > 0 ?
          <>
            {product.map(item => (
              <div key={item.id} className='card-product'>
                  <img src={`http://localhost:8080${item.image}`} alt={product.name} className="img" />
                  <div className="card-position">
                    <h3><a href="#">{item.name}</a></h3>
                    {item.promotion === 1 ? (
                        <div className='CardPriciPromotion'>
                          <p className='price_promotion'>R${item.price_promotion.toFixed(2)}x</p>
                          <p className='p-price-des'> R${item.price.toFixed(2)}</p>
                        </div>
                    ) : (
                        <p className='p-price'>R${item.price.toFixed(2)}</p>
                    )}
                    <div className='card-position-two'>
                      <div className='card-add'>
                        <button type='button' onClick={(event) => handleDelOne(event, item)}><p>-</p></button>
                        <p>{item.quantity_pro}</p>
                        <button type='button' onClick={(event) => handleAddOne(event, item)}><p>+</p></button>
                      </div>
                    <button type='button' onClick={(event) => handleDelete(event, item)} className="exclude">&#x274C;</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        : 
          <div className="div-empety">
            <h1>Carrinho vazio :(</h1>
          </div>
        }
      </div>

      <div className='card-payment'>
          <div className="card-payment-position">
            <p>R${total}</p>
            <p>Quantidade produtos: 50</p>
            {logado === true ? ( 
              product.length > 0 && (
                <Link className='Card-Link-width'>
                  <button className='Card-button-add-card'>Fechar pedido</button>
                </Link>
              )
            ):(
              <Link to="/login" className='Card-Link-width'>
                <button className='Card-button-add-card'>Fazer login</button>
              </Link>
            )}
            
            <Link to="/" className='Card-Link-width'>
              <button className='Card-button-continuar-comprando'>Continuar comprando</button>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default Card