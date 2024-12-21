import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/header';
import AutoAjuda from './components/autoAjuda';
import Historia from './components/historia';
import Ficcao from './components/ficcao';
import Login from './pages/login';
import CreateUser from './pages/createUser';
import Card from './pages/Card'
import Settings from './pages/Settings';
import UpdateUser from './pages/UpdatedUser'
import CreateSeller from './pages/CreateSellerFirst'
import UpdateSeller from './pages/UpdatedSeller'
import CreateProduct from './pages/CreateProduct'
import UpdateProduct from './pages/UpdatedProduct'
import YourProducts from './pages/YourProducts'
import CreateAddress from './pages/CreateAddress'
import UpdateAddress from './pages/UpdatedAdress'
import Logout from './pages/Logout'
import InfoProduct from './pages/InfoProduct';
import BooksContainer from './components/BooksContainer';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas com layout principal */}
        <Route path="/" element={<MainLayout />}>
        <Route path="" element={<BooksContainer />} />
          <Route path="ficcao" element={<Ficcao />} />
          <Route path="historia" element={<Historia />} />
          <Route path="autoajuda" element={<AutoAjuda />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/card" element={<Card />} />
        <Route path="/infoproduct/:id" element={<InfoProduct />} />

        <Route path="/settings" element={<Settings />}>
          <Route path="user" element={<UpdateUser />} />
          <Route path="createseller" element={<CreateSeller />} />
          <Route path="updateseller" element={<UpdateSeller />} />
          <Route path="createproduct" element={<CreateProduct />} />
          <Route path="updatedproduct/:id" element={<UpdateProduct />} />
          <Route path="yourproducts" element={<YourProducts />} />
          <Route path="createaddress" element={<CreateAddress />} />
          <Route path="updateaddress" element={<UpdateAddress />} />
          <Route path="logout" element={<Logout />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;