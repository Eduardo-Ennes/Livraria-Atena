import express from 'express'
var router = express.Router()
import UserController from '../controller/User'
import ProductController from '../controller/Products'
import SellerController from '../controller/seller'
import AddressController from '../controller/address'
import CardController from '../controller/card'
// Middleware
import Seller from '../middleware/seller'
import User from '../middleware/user'


// Login
// Rotas para UserController
router.get('/logado', UserController.Logado) // Tras informação se o usuario esta logado
router.get('/', UserController.Initial) // Url inicial
router.get('/user', User, UserController.BringUser) // tras info do user logado
router.get('/user/information', User, UserController.BringInformationUser) // tras informações de login do user
router.get('/logoutinformation', User, UserController.LogoutInfomations) // Leva as informações do cache do user para a área de logout
router.post('/user', UserController.createUser) // Criar user
router.post('/login', UserController.loginUser) // Login
router.put('/user', User, UserController.updateUser) // Atualizar user
router.delete('/user', User, UserController.deleteUser) // Deletar user
router.delete('/logout', User, UserController.Logout) // Loouth

// Rotas para ProductsController
// Aqui as urls estão em ordem em relação com suas funções.
router.get('/product/ficcao', ProductController.BringFiccao) // Livros de ficção
router.get('/product/history', ProductController.Bringhistory) // Livros de historia
router.get('/product/autoajuda', ProductController.BringAutoAjuda) // Livros de auto-ajuda
router.post('/product', Seller, ProductController.createProduct) // Cria produto
router.put('/product', Seller, ProductController.updateProduct) // Atualiza produto
router.delete('/product', Seller, ProductController.deleteProduct) // Deleta produto
router.get('/product/information/:id', ProductController.InfoProduct) // tras as informações do produto e do seu proprietário
router.get('/products', ProductController.bringAllProducts) // Busca todos os produtos
router.get('/products/user', Seller, ProductController.bringAllProductsUser) // Produtos user
router.get('/product/:id', ProductController.bringProduct) // Busca um produto para atualização

// Rotas para SellerController
router.get('/seller/user', Seller, SellerController.bringAllSellersUser) // busca endereços vendedor user
// router.post('/createseller', User, SellerController.createSellerFirstTime) // Cria o perfil de Seller 
router.post('/seller', User, SellerController.createSeller) // Cria endereço vendedor
router.put('/seller', Seller, SellerController.updateSeller) // Atualiza endereço vendedor
router.delete('/seller/:id', Seller, SellerController.deleteSeller) // Deleta endereço vendedor

// Rotas para AddressController
router.get('/address/user', AddressController.bringAllAddressUser) // busca endereços user
router.post('/address', User ,AddressController.createAddress) // Cria endereços de entrega
router.put('/address', User, AddressController.updateAddress) // Atualiza endereços de entrega
router.delete('/address', User ,AddressController.deleteAddress) // Deleta endereços de entrega

// Rotas para CardController
router.get('/card', CardController.bringAllCard) // Busca produtos no carrinho
router.post('/card', CardController.addProductInCard) // Adicionar produto no card
router.delete('/card', CardController.deleteProductInCard) // Excluir produto no card

// Teste redis
router.get('/teste', UserController.teste) // teste para cache(redis)
router.get('/teste2', UserController.teste2) // teste para apagar redis(card)


export default router