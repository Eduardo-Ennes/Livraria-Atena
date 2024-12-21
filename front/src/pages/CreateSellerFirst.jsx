import '../css/CreateSeller.css'
import Method from '../method/Seller/CreateSeller'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function CreateSellerFirst() {
  const navigate = useNavigate();
  const [err, setErr] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState(0)
  const [phone, setPhone] = useState('')

  const handleSubmit = async (event) => {
    try{
        event.preventDefault()
        const info = {
          cnpj: cnpj,
          state: state,
          city: city,
          street: street,
          number: parseInt(number),
          phone: phone
        }
        const responde = await Method.Validation(info)
        if(responde.status){
          navigate('/')
          window.alert(responde.cer)
        }
        else{
          if(responde.code == 401){
            navigate('/login')
            window.alert(responde.err)
          }
          setErr(responde.err)
        }
    }catch(err){
        console.log(err)
        setErr('Houve um problema no servidor. Tente novamente.')
    }
}

  return (
    <div className='CrateSeller-position'>
      <form onSubmit={handleSubmit} className="CreateSeller-form">
        <input 
        type="text" 
        name='cnpj' 
        id='cnpj' 
        placeholder='Digite o seu cnpj'
        onChange={e => setCnpj(e.target.value)}/>

        <input 
        type="text" 
        name="state" 
        id="state" 
        placeholder='Digite seu estado'
        onChange={e => setState(e.target.value)}/>

        <input 
        type="text" 
        name="city" 
        id="city" 
        placeholder='Digite sua cidade'
        onChange={e => setCity(e.target.value)}/>

        <input 
        type="text" 
        name="street" 
        id="street" 
        placeholder='Digite sua rua'
        onChange={e => setStreet(e.target.value)}/>

        <input 
        type="number" 
        name="number" 
        id="number" 
        placeholder='Digite o número'
        onChange={e => setNumber(e.target.value)}/>

        <input 
        type="text" 
        name="phone" 
        id="phone" 
        placeholder='Digite o seu telefone de contato'
        onChange={e => setPhone(e.target.value)}/>

        {err.length > 0 ? 
          <div className='CreateSeller-err'>
            <p>{err}</p>
          </div>
        : 
          <div className='CreateSeller-err-white'>
            <p>Cria perfil de vendedor!</p>
          </div>
        }
        
        <button>Enviar</button>
      </form>
    </div>
  )
}

export default CreateSellerFirst