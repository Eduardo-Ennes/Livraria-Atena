import { useState } from 'react'
import Method from '../method/User/CreateUser'
import { useNavigate } from 'react-router-dom';
import '../css/CreateUser.css'

const CreateUser = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState('')
    const [first_name, setFirst] = useState('')
    const [last_name, setLast] = useState('')
    const [email1, setEmail1] = useState('')
    const [email2, setEmail2] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const handleSubmit = async (event) => {
        try{
            event.preventDefault()
            const info = {
                first_name: first_name,
                last_name: last_name,
                email1: email1,
                email2: email2,
                password1: password1,
                password2: password2
            }
            const response = await Method.Validation(info)
            if(response.status){
                navigate('/login')
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
    <div className='createUser-position'>
        <form onSubmit={handleSubmit} className='createUser-form'>
            <label htmlFor="first_name"></label>
            <input type="text" name="first_name" id="first_name" autoComplete='off' 
            placeholder='Nome' onChange={e => setFirst(e.target.value)}/>

            <label htmlFor="last_name"></label>
            <input type="text" name="last_name" id="last_name" autoComplete='off' 
            placeholder='Sobrenome' onChange={e => setLast(e.target.value)}/>

            <label htmlFor="email"></label>
            <input type="text" name="email" id="email" autoComplete='off' 
            placeholder='Dgite o e-mail' onChange={e => setEmail1(e.target.value)}/>

            <label htmlFor="conf_email"></label>
            <input type="text" name="conf_email" id="conf_email" autoComplete='off' 
            placeholder='Confimação do e-mail' onChange={e => setEmail2(e.target.value)}/>

            <label htmlFor="password"></label>
            <input type="password" name="password" id="password" autoComplete='off' 
            placeholder='Digite a senha' onChange={e => setPassword1(e.target.value)}/>

            <label htmlFor="conf_password"></label>
            <input type="password" name="conf_password" id="conf_password" autoComplete='off' placeholder='Confirmação da senha' onChange={e => setPassword2(e.target.value)}/>

            {err.length > 0 ?
                <div className='CreateUser-err'>
                    <p>{err}</p>
                </div>
            : 
                <div className='CreateUser-err-white'>
                    <p>Preencha os dados de cadastro</p>
                </div>                
            }

            <button type="submit" className='CreateUser-Button'>Enviar</button>

        </form>
    </div>
  )
}

export default CreateUser