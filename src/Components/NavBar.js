import React from 'react';
import {Link} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import '../Assets/Components/NavBar.css';
function NavBar() {
    const [reactCookie] = useCookies(['user']);
    return (
    <nav>
        <div className='logo-details'>
            <h1>PIPO</h1>
        </div>
        <div className='nav-ctn-routes'>
            <div id='search' className='route'>
                <Link style={{color:'#023047'}} className='link-route' to='/'><span className="material-symbols-outlined">person_search</span><p className='item-route'>Buscar</p></Link>
            </div>
            <div id='home' className='route'>
                <Link style={{color:'#023047'}} className='link-route' to='/'><span className="material-symbols-outlined">monitoring</span><p className='item-route'>Dashboard</p></Link>
            </div>
            <div className='route'>
                <Link style={{color:'#023047'}} className='link-route' to='/clientes'><span className="material-symbols-outlined">contact_page</span><p className='item-route'>Clientes</p></Link>
            </div>
            <div className='route'>
                <Link style={{color:'#023047'}} className='link-route' to='/inventario'><span className="material-symbols-outlined">inventory</span> <p className='item-route'>Inventario</p></Link>
            </div>            
            <div className='ctn-dropdown'>
                <div className='route'>
                    <Link style={{color:'#023047'}} className='link-route' to='/'><span className="material-symbols-outlined">add</span><p className='item-route'>Agregar</p><span className="material-symbols-outlined">arrow_drop_down</span></Link>
                </div>
                <ul className='submenu'>
                    <Link style={{color:'#023047'}} to='/agregar/producto' className='link-route'><li>Producto</li></Link>
                    <Link style={{color:'#023047'}} to='/agregar/credito' className='link-route'><li>Credito</li></Link>
                    <Link style={{color:'#023047'}} to='/agregar/cliente' className='link-route'><li>Cliente</li></Link>
                </ul>
            </div>
            <div className='route'>
                <Link style={{color:'#023047'}} className='link-route' to='/'><span className="material-symbols-outlined">settings</span><p className='item-route'>Ajustes</p></Link>
            </div>
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