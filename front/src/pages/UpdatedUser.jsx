import '../css/UpdateUser.css'
import Method from '../method/User/UpdateUser'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function UpdateUser() {
  const navigate = useNavigate()
  const [err, setErr] = useState('')
  const [cer, setCer] = useState('')
  const [first_name, setFirst] = useState('')
  const [last_name, setLast] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/user')
      .then(response => response.json())
      .then(data => {
        if(data.status){
          setFirst(data.user[0].first_name)
          setLast(data.user[0].last_name)
          setEmail(data.user[0].email)
        }
        else{
          if(data.code === 401){
            navigate('/login')
            window.alert(data.err)
          }
          if(data.code === 422){
            navigate('/login')
            window.alert(data.err)
          }
          window.alert(data.err)
        }
      })
      .catch(error => console.error('Erro:', error));
  }, []);

  const handleSubmit = async (event) => {
    try{
        event.preventDefault()
        const info = {
            first_name: first_name,
            last_name: last_name,
            email1: email
        }
        const response = await Method.Validation(info)
        if(response.status){
          setCer(response.cer)
          // window.location.reload()
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
    <div className='div-UpdateUser'>
      <form onSubmit={handleSubmit} className='UpdateUser-form'>
        <div className='UpdateUser-div-container'>
          <input 
          type="text" 
          value={first_name}
          name='first-name' 
          id='UpdateUser-first-name' 
          placeholder='Digite seu novo first-name' 
          onChange={(e) => setFirst(e.target.value)}/>

          <input 
          type="text" 
          value={last_name}
          name='last-name' 
          id='UpdateUser-last-name' 
          placeholder='Digite o seu novo last-name' 
          onChange={(e) => setLast(e.target.value)}/>

          <input 
          type="email" 
          name='email' 
          value={email}
          id='UpdateUser-email' 
          placeholder='Digite um novo email' 
          onChange={(e) => setEmail(e.target.value)}/>

        </div>
        {err.length > 0 && 
          <div className='UpdateUser-error'>
            <p>{err}</p>
          </div>
        }

        {cer.length > 0 && 
          <div className='UpdateUser-error-green'>
            <p>{cer}</p>
          </div>
        }

        {err.length === 0 && cer.length === 0 &&
          <div className='UpdateUser-error-white'>
            <p>Atualização das informações pessoais</p>
          </div>
        }
        
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default UpdateUser