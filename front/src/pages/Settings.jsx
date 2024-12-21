import { useState, useEffect } from 'react';
import '../css/Settings.css'
import { Link, Outlet } from 'react-router-dom';

function Settings() {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch('http://localhost:8080/user/information')
      .then(response => response.json())
      .then(data => {
        setUser(data.data)
      })
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
    <div className='settings-back'>
      <div className='settings'>
        <ul className='settings-topics'>
          {(user.role === 2 || user.role === 3) ? (
            <>
              <li><Link to="/">Voltar ao inicio</Link></li>
              <li><Link to="user">Informações pessoais</Link></li>
              <li><Link to="createaddress">Criar endereço de entrega</Link></li>
              <li><Link to="updateaddress">Atualizar endereço de entrega</Link></li>
              <li><Link to="createproduct">Criar produto</Link></li>
              <li><Link to="yourproducts">Seus produtos</Link></li>
              <li><Link to="updateseller">Atualizar vendedor</Link></li>
              <li><Link to="logout">Sair</Link></li>
            </>
          )
          :
          (
            <>
              <li><Link to="/">Voltar ao inicio</Link></li>
              <li><Link to="user">Informações pessoais</Link></li>
              <li><Link to="createaddress">Criar endereço de entrega</Link></li>
              <li><Link to="updateaddress">Atualizar endereço de entrega</Link></li>
              <li><Link to="createseller">Seja um vendedor</Link></li>
              <li><Link to="logout">Sair</Link></li>
            </>
          )}
          
          
        </ul>
      </div>

      <div className='settings-container'>
        <Outlet />
      </div>
    </div>
  )
}

export default Settings