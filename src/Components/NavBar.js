import React,{useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import '../Assets/Components/NavBar.css';
import { useUser } from '../Hooks/UserHook';
import LoadingPage from '../Pages/LoadingPage';
function NavBar() {
    const { logout } = useUser();
    const [loading, setLoading] = useState(false);
    const [reactCookie] = useCookies(['user']);
    const routes = [
        {nombre : 'Buscar', logo : 'person_search', route : '/', active : false},
        {nombre : 'Clientes', logo : 'contact_page', route : '/clientes', active : false},
        {nombre: 'Productos', logo:'inventory', route:'/productos/unidad', active : false},
        {nombre : 'Reportes', logo : 'monitoring', route : '/', active :  false},
        {nombre : 'Ajustes', logo : 'settings', route : '/', active : false}
    
    ]
    const logoutSession = (evt)=>{
        evt.preventDefault()
        setLoading(true)
        logout()
    }
    useEffect(() => {
        function closeSession() {
            if (loading) {
                setTimeout(()=>{
                    setLoading(false)    
                },2000)
            }
        }
        closeSession()
    }, [loading])

    if (loading) {
        return (
            <LoadingPage />
        )
    }
    else {
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
                <button onClick={logoutSession}>
                    <span className="material-symbols-outlined">logout</span>
                </button>
            </section>
        </nav>
        )
    }
}

export default NavBar;