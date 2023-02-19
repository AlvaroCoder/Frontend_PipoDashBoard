import React from 'react'
import { NavBar } from '../Components';

function NavBarLayout({children}) {
  return (
        <section className='navbar-layout' >
            <NavBar/>
            {children}
        </section>
    )
}

export default NavBarLayout;