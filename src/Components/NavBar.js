import React from 'react';
import {Link} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import '../Assets/Components/NavBar.css';
function NavBar() {
    const [reactCookie] = useCookies(['user']);
    const routes = [
        {nombre : 'Buscar', logo : 'person_search', route : '/', active : false},
        {nombre : 'Clientes', logo : 'contact_page', route : '/clientes', active : false},
        {nombre: 'Productos', logo:'inventory', route:'/productos/unidad', active : false},
        {nombre : 'Reportes', logo : 'monitoring', route : '/', active :  false},
        {nombre : 'Ajustes', logo : 'settings', route : '/', active : false}
    
    ]
    return (
    <nav>
        <div className='logo-details'>
            <h1>PIPO</h1>
        </div>
        <div className='nav-ctn-routes'>
            {
                routes.map((val)=>{
                    return (
                        <div className='route'>
                            <Link className='link-route' to={val.route}><span className='material-symbols-outlined'>{val.logo}</span><p className='item-route'>{val.nombre}</p></Link>
                        </div>
                    )
                })
            }
        </div>
        <section className='sec-logout'>
            <div >
                <p>{reactCookie.user.usuario}</p>
            </div>
            <button>
                <span className="material-symbols-outlined">logout</span>
            </button>
        </section>
    </nav>
    )
}

export default NavBar;