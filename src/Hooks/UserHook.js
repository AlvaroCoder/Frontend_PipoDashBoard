import { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { LoginUser } from '../Services/Database';

const userOptions = {
    usuario : '',
    contrasenna : '',
    esAdmin : false,
    isLogin : false,
    token : ''
}

const ContextUser = createContext({
    user : {
        usuario : '',
        contrasenna : '',
        isLogin : false,
        token : ''
    } ,
    cookieUser : {},
    error : {message : ''},
    login : async (data)=>{},
    logout : ()=>{}
});

export const useUser=()=>{
    return useContext(ContextUser);
}
export default function UserContext({children}) {
    const [user, setUser] = useState(userOptions);
    const [error, setError] = useState(null);
    const [cookieUser, setUserCookie, removeCookie] = useCookies(['user']);
    const login = async (data={})=>{
        const result = await LoginUser(data);
        if (result.status === 500) {
            setError({message : 'Servidor no responde'})            
            return ;
        }

        if (!result.ok) {
            setError({message : 'Usuario o contraseña incorrectos'})
            return;
        }
        const response = await result.json();
        const dataresponse = {usuario : data.usuario, contrasenna: data.contrasenna, isLogin : true, token : response.data.token}
        setUserCookie("user",dataresponse, {
            expires : new Date(Date.now()+(1*60*60*24*1000))
        })
        setUser(dataresponse);
        return;
    }
    const logout = ()=>{
        removeCookie("user");
        return;
    }
    return (
        <ContextUser.Provider value={{user, login, error,cookieUser,logout}}>
            {children}
        </ContextUser.Provider>
    )
}