import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLogin from './pages/auth/Login'
import AuthLayout from './components/ui/auth/layout'
import AuthRegister from './pages/auth/Register'
import AdminLayout from './components/ui/admin-view/layout'

function App() {
  return (
    <div>
      App     

      <Routes>
      <Route path ='/auth' element = {<AuthLayout/>}>
        <Route path='login' element = {<AuthLogin/>}/>
        <Route path='register' element = {<AuthRegister/>} />
      </Route>

      <Route>
        <Route path='/admin' element ={<AdminLayout/>}/>
        
      </Route>
      </Routes>
    </div>
  )
}

export default App