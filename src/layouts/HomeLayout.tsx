import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'


export default function MainLayout() {
  return (
    <div className="wrapper">
        
        <div className="content">
          <div className="container">
            <Outlet/>
          </div>
        </div>
      </div>
  )
}
