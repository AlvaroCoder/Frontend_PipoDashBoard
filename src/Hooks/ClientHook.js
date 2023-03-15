import * as React   from "react";
import { SaveClient, SaveData, SaveProveedor } from "../Services/Database";
const clientData ={
    documento : 0,
    nombre : '',
    apellido : '',
    tipo : '',
    direccion : '',
    genero : '',
    correo : '',
    detalle : ''
}

const ContextClient = React.createContext({
    client : {
        documento : 0,
        nombre : '',
        apellido : '',
        tipo : '',
        direccion : '',
        genero : '',
        correo : '',
        detalle : '',
        credito_limite : 200
    },
    error : {},
    saveClient : async ()=>{},
    setClient : function (data) {    }
});

export const useClient = ()=>{
    return React.useContext(ContextClient);
}

export default function ClientContext({children}) {
    const [client, setClientProv] = React.useState(clientData);
    const [error, setError] = React.useState({})
    const saveClient = async (client = {}, token)=>{
        if (client.tipo_cliente === 'CLIENTE') {
            return await SaveClient(client,token).then(val=>val.status)
        }
        if (client.tipo_cliente === 'PROVEEDOR') {
            return await SaveProveedor(client, token).then(val=>val.status);
        }
    }
    const setClient = (data)=>{
        setClientProv({...client, data})
        console.log(client);
        return;
    }
    return (
        <ContextClient.Provider value={{client, error,saveClient,setClient}}>
            {children}
        </ContextClient.Provider>
    )
}