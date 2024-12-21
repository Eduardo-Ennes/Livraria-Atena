import '../css/CreateProduct.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Method from '../method/Products/UpdateProduct'
import MethodDelete from '../method/Products/DeleteProduct'
import { useNavigate } from 'react-router-dom';

function UpdateProduct() {
    const navigate = useNavigate();
    const {id} = useParams()
    const [err, setErr] = useState('')
    const [price, setPrice] = useState('')
    const [price_promotion, setPrice_promotion] = useState('')
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch(`http://localhost:8080/product/${id}`)
          .then(response => response.json())
          .then(data => setProduct(data.pro[0]))
          .catch(error => console.error('Erro:', error));
      });


      const handleSubmit = async (event, id) => {
        try{
            event.preventDefault()
            /* os valores "Não" desses inputs estava vindo NaN, então abixo verifico se ele for um NaN o valor será 0 */
            const activateValue = parseInt(event.target.activate.value) || parseInt(event.target.activate.placeholder);
            const promotionValue = parseInt(event.target.promotion.value) || parseInt(event.target.promotion.placeholder);

            const info = {
              id: id,
              name: event.target.name.value || event.target.name.placeholder,
              price: parseFloat(price) || parseFloat(event.target.price.value),
              quantity: parseInt(event.target.quantity.value) || parseInt(event.target.quantity.placeholder),
              activate: isNaN(activateValue) ? 0 : activateValue,
              category: parseInt(event.target.category.value) || parseInt(event.target.category.placeholder),
              promotion: isNaN(promotionValue) ? 0 : promotionValue,
              price_promotion: parseFloat(price_promotion) || parseInt(event.target['price-promotion'].value),
              description: event.target.description.value || event.target.description.placeholder,
              image: event.target.imagem.files[0]
            }
            const response = await Method.Validation(info)
            console.log(response)
            if(response.status){
                window.location.reload()
                window.alert(response.cer)
            }
            else{
                if(response.code === 401){
                    navigate('/login')
                    window.alert(response.err)
                }
                if(response.code === 403){
                    navigate('/setting/createseller')
                    window.alert(response.err)
                }
                setErr(response.err)
            }
        }catch(err){
            console.log(err)
            window.alert('Houve um problema no servidor. Tente novamente.')
        }
    }

    const handleDelete = async (id) => {
        try{
            const info = {
              id: id,
            }
            const response = await MethodDelete.Api(info)
            if(response.status){
                navigate('/settings/yourproducts')
              window.alert(response.cer)
            }
            else{
              if(response.code === 422){
                navigate('/settings/yourproducts')
                window.alert(response.err)
              }
              if(response.code === 403){
                navigate('/')
                window.alert(response.err)
              }
              if(response.code === 401){
                navigate('/login')
                window.alert(response.err)
              }
              window.alert(response.err)
            }
        }catch(err){
            console.log(err)
            window.alert('Houve um problema no servidor. Tente novamente.')
        }
      }

  return (
    <div className='createpro-position'>
        <form className='createpro-form' onSubmit={(e) => handleSubmit(e, product.id_product)}>
            <div className="div-createpro-grid">

                <div className='div-createpro-position'>
                <input 
                type="text" 
                name="name" 
                id="name"  
                required 
                defaultValue={product.name} 
                placeholder={product.name}/>

                <input 
                type="text" 
                name="price" 
                id="price" 
                defaultValue={product.price} 
                required 
                onChange={(e) =>{
                    const format = e.target.value.replace(',', '.')
                    setPrice(format)
                }}
                />

                <input 
                type="number" 
                name="quantity" 
                id="quantity" 
                placeholder={product.quantity} 
                required 
                defaultValue={product.quantity}/>

                <div className="div-createpro-select">
                    <select name="activate" id="activate" defaultValue={product.activate}>
                        <option value={product.activate}>Produto ativo?</option>
                        <option value={1}>Sim</option>
                        <option value={0}>Não</option>
                    </select>
                    <select name="category" id="category" defaultValue={product.category}>
                        <option value={product.category}>Gênero?</option>
                        <option value={1}>ficcao</option>
                        <option value={2}>História</option>
                        <option value={3}>Auto-ajuda</option>
                    </select>
                    <select name="promotion" id="promotion" defaultValue={product.promotion}>
                        <option value={product.promotion}>Promoção?</option>
                        <option value={1}>Sim</option>
                        <option value={0}>Não</option>
                    </select>
                </div>

                <input 
                type="text" 
                name="price-promotion" 
                id="price-promotion" 
                defaultValue={product.price_promotion} 
                onChange={(e) =>{
                    const format = e.target.value.replace(',', '.')
                    setPrice_promotion(format)
                }}
                />

                <input 
                type="file" 
                name="imagem" 
                id="imagem"/>
                </div>

                <div className='div-createpro-position-textarea'>
                    <textarea 
                    name="description" 
                    id="description" 
                    required 
                    placeholder={product.description}
                    defaultValue={product.description}></textarea>

                    {err.length > 0 ? 
                        <div className='CreateProduct-err'>
                            <p>{err}</p>
                        </div>
                    :
                        <div className='CreateProduct-err-white'>
                            <p>Preencha um produto!</p>
                        </div>
                    }
                    <div className="Createproduct-contein-buttons">
                        <button type='submit' className='ButtonAdd'>Enviar</button>
                        <button type='button' className='ButtonDelete' onClick={() => handleDelete(product.id_product)}>Delete</button>
                    </div>       
                </div>
            </div>
        </form>
    </div>
  )
}


export default UpdateProduct