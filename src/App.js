import React from 'react'
import ResponsiveAppBar from './Components/Header'
import ForgotPassword from './Components/ForgotPassword'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
      </Routes>
    </div>
  )
}

export default App;
