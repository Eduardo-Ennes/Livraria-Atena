import '../css/UpdateSeller.css'
import Method from '../method/Seller/UpdateSeller'
import MethodDelete from '../method/Seller/DeleteSeller'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

function UpdateSeller() {

    const navigate = useNavigate();
    const [err, setErr] = useState('')
    const [sellers, setSellers] = useState([])

    useEffect(() => {
      fetch(`http://localhost:8080/seller/user`)
        .then(response => response.json())
        .then(data => setSellers(data.data))
        .catch(error => console.error('Erro:', error));
    });

    const handleSubmit = async (event, id) => {
      try{
          event.preventDefault()
          const info = {
            id: id,
            cnpj: event.target.cnpj.value || event.target.cnpj.placeholder,
            state: event.target.state.value || event.target.state.placeholder,
            city: event.target.city.value || event.target.city.placeholder,
            street: event.target.street.value || event.target.street.placeholder,
            number: parseInt(event.target.number.value) || parseInt(event.target.number.placeholder),
            phone: event.target.phone.value || event.target.phone.placeholder
          }
          const response = await Method.Validation(info)
          if(response.status){
            window.alert(response.cer)
            navigate('/settings/updateseller');
          }
          else{
            if(response.code === 401){
              navigate('/login')
              window.alert(response.err)
            }
            if(response.code === 403){
              navigate('/')
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
        const response = await MethodDelete.Api(info.id)
        if(response.status){
          window.alert(response.cer)
        }
        else{
          if(response.code === 409){
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
    <>
      {sellers.map((seller) => (
        <div key={seller.id_seller} className='UpdateSeller-position'>
          <form className="UpdateSeller-form" onSubmit={(e) => handleSubmit(e, seller.id_seller)}>
            <div className="UpdateSeller-flex">

              <div className="UpdateSeller-conetin-inputs">
                <input 
                type="text" 
                name='cnpj' 
                id='cnpj' 
                placeholder={seller.cnpj}
                defaultValue={seller.cnpj}/>

                <input 
                type="text" 
                name="state" 
                id="state" 
                placeholder={seller.state}
                defaultValue={seller.state}/>

                <input 
                type="text" 
                name="city" 
                id="city" 
                placeholder={seller.city}
                defaultValue={seller.city}/>

                <input 
                type="text" 
                name="street" 
                id="street" 
                placeholder={seller.street}
                defaultValue={seller.street}/>

                <input 
                type="number" 
                name="number" 
                id="number" 
                placeholder={seller.number}
                defaultValue={seller.number}/>

                <input 
                type="text" 
                name="phone" 
                id="phone" 
                placeholder={seller.phone}
                defaultValue={seller.phone}/>

              </div>

              <div className='div-contein-info-3'>
                {err.length > 0 ?
                  <div className='UpdateSeller-err'>
                    <p>{err}</p>
                  </div>
                :
                  <div className='UpdateSeller-err-white'>
                    <p>Atualiza dados de vendedor!</p>
                  </div>
                }
                <div className='UpdateSeller-contein-buttons'>
                  <button type='submit' className='UpdateSeller-buttonAdd'>Enviar</button>
                  <button 
                  onClick={() => handleDelete(seller.id_seller)}
                  type="button" 
                  className='UpdateSeller-buttonDel'>delete</button>
                </div>
              </div>

            </div>
          </form>
        </div>
      ))}
    </>
  )
}

export default UpdateSeller