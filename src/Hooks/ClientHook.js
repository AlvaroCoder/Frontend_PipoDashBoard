import * as React   from "react";
import { SaveClient, GetClients, DeleteClient, UpdateClient } from "../Services/Database";
const clientData ={
    nro_doc : '',
    nombre : '',
    apellido : '',
    direccion : '',
    telefono : 0,
    genero : '',
    correo : '',
    detalle : ''
}

const ContextClient = React.createContext({
    client : {
        nro_doc : '',
        nombre : '',
        apellido : '',
        direccion : '',
        genero : '',
        telefono : 0,
        correo : '',
        detalle : ''
    },
    popup : false,
    isNewClient : true,
    errorClient : {},
    dataClients : [],
    setIsNewClient : ()=>{},
    changePopup : ()=>{},
    resetClient : ()=>{},
    createClient : async (data) =>{},
    deleteClient : async (idClient, token)=>{},
    saveClient : async ()=>{},
    setClient : function (data) {},
    editClient : function (newClient) {},
    updateClient : (client, token)=>{}
});

export const useClient = ()=>{
    return React.useContext(ContextClient);
}

export default function ClientContext({children}) {
    const [client, setClient] = React.useState(clientData);
    const [dataClients, setDataClient] = React.useState([]);
    const [errorClient, setErrorClient] = React.useState({});
    // Validate if I'm not creating a new client
    const [isNewClient, setIsNewClient] = React.useState(true);
    const [popup, setPopup] = React.useState(false);
    const saveClient = async (clientObj = {}, token)=>{
        const res = await SaveClient(clientObj,token).then(async val=> await val.json())
        if (res.error) {
            setErrorClient(res);
            return;
        }
        setDataClient((current)=>[...current, clientObj]);

    }
    const changePopup = ()=>{
        setPopup(!popup)
    }
    
    React.useEffect(()=>{
        async function fetchDataClient() {
            const clients = await GetClients();
            const client_json = await clients.json();
            setDataClient(client_json);
        }
        fetchDataClient();
    },[]);
    const resetClient = ()=>{
        setClient(clientData);
        return;
    }
    const editClient = (newClient)=>{
        setClient(newClient);
        return;
    }
    const updateClient = async (client, token)=>{
        console.log(client);
        const res =  await UpdateClient(client, token);
        const res_json = await res.json();
        if (res_json.error) {
            setErrorClient(res_json);
            return;
        }
        return res;
    }
    const deleteClient = async (idClient, token)=>{
        const res = await DeleteClient(idClient, token)
        const res_json = await res.json()
        if (res_json.error) {
            setErrorClient(res_json)
            return;
        }
        // Actualizamos la lista de los clientes en la UI
        const arrClient = [...dataClients]
        for(const [index,val] of arrClient.entries()){
            if (val.idcliente === idClient) {
                arrClient.splice(index,1);
                setDataClient(arrClient);
                return;
            }
        }
    }
    return (
        <ContextClient.Provider value={{client, errorClient, isNewClient, dataClients, popup, changePopup, saveClient, resetClient,deleteClient, editClient, setIsNewClient, updateClient}}>
            {children}
        </ContextClient.Provider>
    )
}