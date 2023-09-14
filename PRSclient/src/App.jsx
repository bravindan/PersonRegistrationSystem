import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import PRForm from '../pages/PRForm'
import EditPerson from '../pages/EditPerson'
import Dashboard from '../pages/Dashboard'
import Edit from '../pages/Edit'


function App() {

  return (
      <Routes>
       
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/prform' element={<PRForm/>}/>
          <Route path='/edit/:id' element={<EditPerson/>}/>
          <Route path='/update/:id' element={<Edit/>}/>
        
      </Routes>
  )
}

export default App
