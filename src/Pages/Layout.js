import React from 'react'
import { NavBar } from '../Components';

function Layout({children}) {
  return (
    <div id='container'>
        <NavBar/>
        <div className='space-nav'>
        </div>
        <div className='space-left'>
            {children}
        </div>
    </div>
    )
}

export default Layout;