import React from 'react'
import ResponsiveAppBar from './Components/Header'
import ForgotPassword from './Components/ForgotPassword'
import Login from './Components/Login'
import Register from './Components/Register'
import { Route, Routes } from 'react-router-dom'
import { Success } from './Components/Success'

function App() {
  return (
    <div className='App'>
      <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </div>
  )
}

export default App;
