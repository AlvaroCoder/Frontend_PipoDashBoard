import React from 'react'
import { NavBar } from '../Components';

function Layout({children}) {
  return (
    <div id='container'>
        <NavBar/>
        <div className='box-container'>
            {children}
        </div>
    </div>
    )
}

export default Layout;