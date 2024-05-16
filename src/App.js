import React from 'react'
import ResponsiveAppBar from './Components/Header'
import ForgotPassword from './Components/ForgotPassword'
import Login from './Components/Login'
import Register from './Components/Register'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      </Routes>
    </div>
  )
}

export default App;
