import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import CheckerDashboard from '../pages/CheckerDashboard'
import MakerDashboard from '../pages/MakerDashboard'
import PRForm from '../pages/PRForm'
import EditPerson from '../pages/EditPerson'

function App() {

  return (
      <Routes>
       
          <Route path='/' element={<Login/>}/>
          <Route path='/checker' element={<CheckerDashboard/>}/>
          <Route path='/maker' element={<MakerDashboard/>}/>
          <Route path='/prform' element={<PRForm/>}/>
          <Route path='/edit/:id' element={<EditPerson/>}/>
        
      </Routes>
  )
}

export default App
