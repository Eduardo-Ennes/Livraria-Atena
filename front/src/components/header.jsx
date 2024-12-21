import { useState, useEffect } from 'react'
import '../App.css'
import { Outlet, Link } from 'react-router-dom';



function Header() {
  const [logado, setLogado] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/logado')
      .then(response => response.json())
      .then(data => setLogado(data.logado))
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
      <>
        <header>
          <h2>Livraria</h2>
          <nav className='nav-menu'>
            <ul>
              <Link to="/card">&#x1F6D2;</Link>
              {logado === true ? 
              <>
                <li><Link to="/settings">Settings</Link></li>
              </>
              : 
              <>
                <li><Link to="/create">Criar conta</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>}
            </ul>
          </nav>
        </header>
        <nav className='nav-category'>
        <Link to="/">Geral</Link>
          <Link to="/ficcao">Ficção</Link>
          <Link to="/historia">História</Link>
          <Link to="/autoajuda">Autoajuda</Link>
        </nav>
        <div className='contein'>
            <Outlet /> 
        </div>
      </>
  );
}

export default Header;