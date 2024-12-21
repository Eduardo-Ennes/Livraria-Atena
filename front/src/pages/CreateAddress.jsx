import '../css/CreateAddress.css'
import { useState } from 'react'
import Method from '../method/Address/CreateAddress'
import { useNavigate } from 'react-router-dom';

const CreateAddress = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')

  const handleSubmit = async (event) => {
    try{
        event.preventDefault()
        const info = {
            state: state,
            city: city,
            neighborhood: neighborhood,
            street: street,
            number: number,
            complement: complement
        }
        const response = await Method.Validation(info)
        if(response.status){
            navigate('/settings/updateaddress')
            window.alert('Endereço cadastrado com sucesso!')
        }
        else{
            setErr(response.err)
        }
    }catch(err){
        console.log(err)
        setErr('Houve um problema no servidor. Tente novamente.')
    }
}


  return (
    <div className='createaddress-position'>
        <form onSubmit={handleSubmit} className='createaddress-form'>
            <input 
            type="text" 
            name="state" 
            id="state" 
            placeholder='Estado'
            onChange={e => setState(e.target.value)}/>
            <input 
            type="text" 
            name="city" 
            id="city" 
            placeholder='Cidade'
            onChange={e => setCity(e.target.value)}/>
            <input 
            type="text" 
            name="neighborhood" 
            id="neighborhood" 
            placeholder='Bairro'
            onChange={e => setNeighborhood(e.target.value)}/>
            <input 
            type="text" 
            name="street" 
            id="street" 
            placeholder='Rua'
            onChange={e => setStreet(e.target.value)}/>
            <input 
            type="number" 
            name="number" 
            id="number" 
            placeholder='Número'
            onChange={e => setNumber(e.target.value)}/>
            <input 
            type="text" 
            name="complement" 
            id="complement" 
            placeholder='Complemento'
            onChange={e => setComplement(e.target.value)}/>
            {err.length > 0 ?
              <div className='createaddress-err'>
                <p>{err}</p>
              </div>
            :
              <div className='createaddress-err-white'>
                <p>Criação do endereço de entrega!</p>
              </div>
            }
            
            <button type='submit'>Enviar</button>
        </form>
    </div>
  )
}

export default CreateAddress