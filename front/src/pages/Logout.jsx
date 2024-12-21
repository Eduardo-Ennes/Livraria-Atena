import "../css/Logout.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if(loading === false){
      fetch('http://localhost:8080/logoutinformation')
    .then(res => res.json())
    .then(data => {
      if(data.code === 401){
        navigate('/login')
        window.alert(data.err)
      }
      setLoading(true)
      setName(data.data)
    })
    .catch(err => console.log(err))
    }
  })

  const handleLogout = async () => {
    const confirmed = window.confirm('Você tem realmente deseja sair?')
    if(confirmed){
      const response = await fetch('http://localhost:8080/logout', {
        method: 'DELETE'
      })
      const res = await response.json()
      if(res.status){
        window.alert(`Volte sempre ${name.first_name} ${name.last_name}`)
        navigate('/')
      }
      else{
        if(res.code === 401){
          navigate('/login')
        }
        window.alert(res.err)
      }
    }
    else{
      console.log('Não saiu')
    }
  }

  return (
    <div className="Logout-position">
        <h1>Fico feliz por ver minha aplicação {name.first_name} {name.last_name}!</h1>
        <button type="button" onClick={handleLogout}>Sair da conta</button>
    </div>
  )
}

export default Logout;