import '../css/CreateProduct.css'
import Method from '../method/Products/CreateProduct'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function CreateProduct() {
    const navigate = useNavigate();
    const [err, setErr] = useState('')
    const [price, setPrice] = useState('')
    const [price_promotion, setPrice_promotion] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState('')

    const handleSubmit = async (event) => {
        try{
            event.preventDefault()
            const activateValue = parseInt(event.target.activate.value);
            const promotionValue = parseInt(event.target.promotion.value);
            const info = {
                name: event.target.name.value || event.target.name.placeholder,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                activate: isNaN(activateValue) ? 0 : activateValue,
                category: parseInt(event.target.category.value),
                promotion: isNaN(promotionValue) ? 0 : promotionValue,
                price_promotion: parseFloat(price_promotion),
                description: description,
                image: event.target.imagem.files[0]
            }
            console.log(info)
            const response = await Method.Validation(info)
            if(response.status){
                navigate('/settings/yourproducts')
                window.alert('Endereço cadastrado com sucesso!')
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
            setErr('Houve um problema no servidor. Tente novamente.')
        }
    }


  return (
    <div className='createpro-position'>
        <form onSubmit={handleSubmit} className='createpro-form'>
            <div className="div-createpro-grid">

                <div className='div-createpro-position'>
                <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder='Digite o nome do produto' 
                required/>

                <input 
                type="text" 
                name="price" 
                id="price" 
                placeholder='Digite o valor do produto' 
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
                placeholder='Digite a quantidade em estoque' 
                required
                onChange={(e) => setQuantity(e.target.value)}
                />

                <div className="div-createpro-select">
                    <select name="activate" id="activate" required>
                        <option value="">Produto ativo?</option>
                        <option value={1}>Sim</option>
                        <option value={0}>Não</option>
                    </select>
                    <select name="category" id="category" required>
                        <option value="">Gênero?</option>
                        <option value={1}>ficcao</option>
                        <option value={2}>História</option>
                        <option value={3}>Auto-ajuda</option>
                    </select>
                    <select name="promotion" id="promotion" required>
                        <option value="">Promoção?</option>
                        <option value={1}>Sim</option>
                        <option value={0}>Não</option>
                    </select>
                </div>

                <input 
                type="text" 
                name="price-promotion" 
                id="price-promotion" 
                placeholder='Digite o preço de promoção'
                required
                onChange={(e) =>{
                    const format = e.target.value.replace(',', '.')
                    setPrice_promotion(format)
                }}/>

                <input 

                type="file" 
                name="imagem" 
                id="imagem" />
                </div>

                <div className='div-createpro-position-textarea'>
                    <textarea 
                    name="description" 
                    id="description" 
                    value={description}
                    placeholder='Descrição do produto deve conter no mínimo 20 caracteres e no máximo 300.'
                    onChange={e => setDescription(e.target.value)}
                    required>Descrição do produto.</textarea>
                    {err.length > 0 
                    ? 
                        <div className='CreateProduct-err'>
                            <p>{err}</p>
                        </div>
                    :
                        <div className='CreateProduct-err-white'>
                            <p>Criação de um produto!</p>
                        </div>
                    }
                    
                    <button type='submit' className='ButtonAdd'>Enviar</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default CreateProduct