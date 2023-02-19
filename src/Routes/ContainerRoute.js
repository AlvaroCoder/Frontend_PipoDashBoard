import React from 'react'
import { CookiesProvider } from 'react-cookie';
import {BrowserRouter} from 'react-router-dom';
import UserContext from '../Hooks/UserHook';
import ProtectedRoutes from './ProtectedRoutes';

function ContainerRoute() {
    return (
        <UserContext>
            <CookiesProvider>
                <BrowserRouter>
                    <ProtectedRoutes/>
                </BrowserRouter>
            </CookiesProvider>
        </UserContext>
    )
}

export default ContainerRoute