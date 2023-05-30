import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as All from './pages/index';

function App() {

  return (
    <>
     <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={< All.Shop/>} />
          <Route path='/cart' element={< All.Cart/>}/>
        </Routes>
     </Router>
    </>
  )
}

export default App
