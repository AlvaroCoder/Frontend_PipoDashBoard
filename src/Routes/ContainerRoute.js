import React from 'react'
import { CookiesProvider } from 'react-cookie';
import {BrowserRouter} from 'react-router-dom';
import ClientContext from '../Hooks/ClientHook';
import UserContext from '../Hooks/UserHook';
import ProtectedRoutes from './ProtectedRoutes';

function ContainerRoute() {
    return (
        <UserContext>
            <ClientContext>
                <CookiesProvider>
                    <BrowserRouter>
                        <ProtectedRoutes/>
                    </BrowserRouter>
                </CookiesProvider>
            </ClientContext>
        </UserContext>
    )
}

export default ContainerRoute