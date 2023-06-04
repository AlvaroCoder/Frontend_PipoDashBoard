import React,{useState, useEffect} from 'react';
import {Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import '../Assets/Components/NavBar.css';
import LoadingPage from '../Pages/LoadingPage';
import Logo from '../Assets/Images/ShortLogo.png';
function NavBar() {
    const [loading, setLoading] = useState(false);
    const [navCookie, setNavCookie] = useCookies(['open-nav']);
    const [open, setOpen] = useState(navCookie['open-nav']==='false');

    const styleRoute = {
        color : "#EDF2F4",
        textDecoration : "none",
        width : '100%',
        display : 'flex',
        alignItems : 'center'
    }
    const routes = [
        {nombre : 'Buscar', iconName : 'bx bx-search icon', route : '/', active : false},
        {nombre : 'Clientes', iconName : 'bx bxs-user icon', route : '/clientes', active : false},
        {nombre: 'Productos', iconName:'bx bxs-store-alt icon', route:'/products', active : false},
    ]
    const changeOpen = (evt)=>{
        evt.preventDefault();
        setOpen(s=>!s);
        setNavCookie("open-nav",String(open), {
            expires : new Date(Date.now()+(1*60*60*24*1000))
        })
        return;
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
            <nav className={open ? "sidebar" : "sidebar close"}>
                <header>
                    <div className='image-text'>
                        <span className='image'>
                            <img src={Logo} alt='logo'></img>
                        </span>
                        <div className='header-text'>
                            <span className='name text'>PIPO</span>
                            <span className='description text'>Zapatería Bazar</span>
                        </div>
                    </div>
                    <i className='bx bx-chevron-right toggle' onClick={changeOpen}></i>
                </header>
                <div className='menu-routes'>
                    <div className='menu'>
                        <ul className='routes-links'>
                            {
                                routes.map((val,key)=>{
                                    return (
                                        <li key={key} className='route'>
                                            <Link style={styleRoute} to={val.route}><i className={val.iconName}></i><span className='item-route text'>{val.nombre}</span></Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
        </nav>
        )
    }
}

export default NavBar;