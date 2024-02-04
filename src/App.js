import './App.css';
import Login from './Components/Login/Login';
import { useState } from 'react';
import TopBar from './Components/Layouts/TopBar';
import Product from './Components/product/Product';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Categories from './Components/product/Categories';
import Dashboard from './Components/Dashboard/Dashboard';
import Footer from './Components/Layouts/Footer';
import SingleProduct from './Components/product/Singleproduct';

function App() {
const [email, setEmail]=useState(null);

  return (
    <div className="">
      <BrowserRouter>
      <TopBar email={email}/>
      <Routes>
        <Route path='/' element={<Login setEmail={setEmail}/>}></Route>
        <Route path='/dashboard'element={<Dashboard/>}></Route>
        <Route path='/product'element={<Product/>}></Route>
        <Route path='/category'element={<Categories/>}></Route>
        <Route path='/product/:productId'element={<SingleProduct/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
