import '../css/UpdateAddress.css'
import { useState, useEffect } from 'react'
import Method from '../method/Address/UpdateAddress'
import MethodDelete from '../method/Address/DeleteAddress'
import { useNavigate } from 'react-router-dom'

const UpdateAdress = () => {
  const navigate = useNavigate()
  const [address, setAddress] = useState([])
  const [addresErr, setAddressErr] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/address/user')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.status){
          setAddress(data.cer)
        }
        else{
          setAddressErr(data.err)
        }
      })
      .catch(error => console.error('Erro:', error));
  }, []);

  const handleSubmit = async (event, id) => {
    try{
        event.preventDefault()
        const info = {
          id: id,
          state: event.target.state.value || event.target.state.placeholder,
          city: event.target.city.value || event.target.city.placeholder,
          neighborhood: event.target.neighborhood.value || event.target.neighborhood.placeholder,
          street: event.target.street.value || event.target.street.placeholder,
          number: event.target.number.value || event.target.number.placeholder,
          complement: event.target.complement.value || event.target.complement.placeholder
        }
        const response = await Method.Validation(info)
        if(response.status){
          window.alert(response.cer)
        }
        else{
          if(response.code === 422){
            navigate('/settings/updateaddress')
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

const handleDelete = async (id) => {
  try{
      const info = {
        id: id,
      }
      const response = await MethodDelete.Api(info)
      if(response.status){
        window.location.reload()
        window.alert(response.cer)
      }
      else{
        if(response.code === 422){
          navigate('/settings/updateaddress')
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
    <div className='UpdateAddress-position'>
      {address.map((element) => (
          <form key={element.id} onSubmit={(e) => handleSubmit(e, element.id)} className='UpdateAddress-form'>
              <div className="UpdateAddress-position-inputs">
                <div className="UpdateAddress-In-Inputs-1">
                  <input
                  type="text"
                  name="state"
                  id="state"
                  placeholder={element.id}
                  defaultValue={element.state}/>
                  <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder={element.city}
                  defaultValue={element.city}/>
                  <input
                  type="text"
                  name="neighborhood"
                  id="neighborhood"
                  placeholder={element.neighborhood}
                  defaultValue={element.neighborhood}/>
                </div>

                <div className="UpdateAddress-In-Inputs-2">
                  <input
                  type="text"
                  name="street"
                  id="street"
                  placeholder={element.street}
                  defaultValue={element.street}/>
                  <input
                  type="number"
                  name="number"
                  id="number"
                  placeholder={element.number}
                  defaultValue={element.number}/>
                  <input
                  type="text"
                  name="complement"
                  id="complement"
                  placeholder={element.complement}
                  defaultValue={element.complement}/>
                  <input 
                  type="hidden" 
                  value={element.id}
                  id='elementId'/>
                </div>
              </div>

              <div className="UpdateAddress-position-button">
                <button type='submit' className='UpdateAddress-button-add'>Atualizar</button>
                <button type='button' className='UpdateAddress-button-delete' onClick={() => handleDelete(element.id)}>Deletar</button>
              </div>
          </form>
      ))}
      {addresErr.length > 0 &&
        <div className='div-notAddress'>
          <h1>Você não possui nenhum endereço!</h1>
        </div>
      }
    </div>
  )
}

export default UpdateAdress