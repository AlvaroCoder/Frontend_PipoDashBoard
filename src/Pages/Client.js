import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { GetClientById } from '../Services/Database';
import LoadingPage from './LoadingPage';

function Client() {
    const {idcliente} = useParams();
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState({});
    useEffect(() => {
        async function getData() {
            const response = await GetClientById(idcliente).then(async(val)=>{return await val.json()})
            console.log("🚀 ~ file: Client.js:13 ~ getData ~ response:", response)
            setLoading(false);
            setClient(response)
        }
      getData()
    }, [])
    
    if (loading) {
        return <LoadingPage/>
    }else{
        return(
            <div>
                <h1>Bienvenido {client.nombre}</h1>
            </div>
        )
    }
}

export default Client;