import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'
import Method from '../method/Login'
import { Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    try{
      event.preventDefault()
      const info = {
        email: email,
        password: password
      }
      const validation = await Method.Validation(info)
      console.log('RESPONSE: ' + validation.status)
      if(validation.status){
        navigate('/')
      }
      else{
        setErr(validation.err)
      }
    }catch(err){
      console.log(err)
      setErr('Houve um problema no servidor. Tente novamente.')
    }
  }

  return (
    <>
      <div className='div-father'>
        <div className='position'>
          <form onSubmit={handleSubmit} className='form-login'>
            <h3>Login</h3>
            <input type="email" name="email" id="email" placeholder='Digite seu E-mail' onChange={e => setEmail(e.target.value)}/>
            <input type="password" name="password" id="password" placeholder='Digite sua Senha' onChange={e => setPassword(e.target.value)}/>
            {err.length > 0 ? 
              <div className='error'>
                <p>{err}</p>
              </div>
            :
              <div className='error-white'>
                <p>Preencha os dados de login!</p>
              </div>
            }
            <button type="submit" className='Login-Button'>Enviar</button>
          </form>
          <div className='cadastrar-se'>
            <Link to="/create" className='cadastrar-se'>Cadastrar-se?</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login