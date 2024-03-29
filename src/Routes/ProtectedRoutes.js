import React from 'react'
import { useCookies } from 'react-cookie';
import { Route, Routes } from 'react-router-dom'
import { useUser } from '../Hooks/UserHook'
import { Client,AddClient, LostPage, LoginPage, SearchPage, Products, AddCredit, Clients } from '../Pages'
import Layout from '../Pages/Layout';

function ProtectedRoutes() {
    const {user} = useUser();
    const [cookieUser] = useCookies(['user']);
    const isLogin = cookieUser.user ? cookieUser.user.isLogin : false
    return (user.isLogin || isLogin) ? <PanelRoutes/> : <LoginRoutes/>;
}
function PanelRoutes() {
    return (
        <Routes >
            <Route path='/' >
                <Route index element={<Layout><SearchPage/></Layout>}></Route>
                <Route path='clientes' element={<Layout><Clients/></Layout>}>
                </Route>
                <Route path='products' element={<Layout><Products/></Layout>}>
                </Route>
            </Route>
            <Route path='agregar'>
                <Route path='cliente' element={<Layout><AddClient/></Layout>}></Route>
                <Route path='credito' element={<Layout><AddCredit/></Layout>}></Route>
            </Route>
            <Route path='/cliente/:idcliente' element={<Layout><Client/></Layout>}></Route>
            <Route path='*' element={<LostPage/>}></Route>
        </Routes>
    )
}
function LoginRoutes() {
    return (
        <Routes>
            <Route exact path='/' element={<LoginPage/>}></Route>
            <Route path='*' element={<LostPage/>}></Route>
        </Routes>
        )
}

export default ProtectedRoutes