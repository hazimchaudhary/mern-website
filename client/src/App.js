import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage.js'
import About from './pages/About.js'
import Contact from './pages/Contact.js'
import Policy from './pages/Policy.js'
import PageNotFound from './pages/PageNotFound.js'
import Register from './pages/Auth/Register.js'
import Login from './pages/Auth/Login.js'
import Dashboard from './pages/User/Dashboard.js'
import PrivateRoute from './components/Routes/Private.js'
import ForgetPassword from './pages/Auth/ForgetPassword.js'
import AdminRoute from './components/Routes/AdminRoutes.js'
import AdminDashboard from './pages/Admin/AdminDashboard.js'
import CreateCategory from './pages/Admin/CreateCategory.js'
import CreateProduct from './pages/Admin/CreateProduct.js'
import Users from './pages/Admin/Users.js'
import Orders from './pages/User/Orders.js'
import Profile from './pages/User/Profile.js'
import Products from './pages/Admin/Products.js'
import UpdateProduct from './pages/Admin/UpdateProduct.js'
import Search from './pages/Search.js'
import CartPage from './pages/CartPage.js'
import AdminOrders from './pages/Admin/AdminOrders.js'
import Categories from './pages/Categories.js'
import CategoryProduct from './pages/CategoryProduct.js'




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/search' element={<Search />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/products/:slug' element={<UpdateProduct />} />
          <Route path='admin/products' element={<Products />} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/orders' element={<AdminOrders />} />

        </Route>
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
