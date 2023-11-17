import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import AddProduct from './components/AddProduct'
import ProductList from './components/ProductList'
import UpdateProduct from './components/UpdateProduct'
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path='/' element={<ProductList />} />
              <Route path='/addProduct' element={<AddProduct />} />
              <Route path='/updateProduct/:id/' element={<UpdateProduct />} />
              <Route path='/logout' element={<h1>Logout Component</h1>} />
              <Route path='/profile' element={<h1>Profile Component</h1>} />
            </Route>
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
