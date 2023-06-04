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
            setLoading(false);
            setClient(response)
        }
      getData()
    }, [idcliente])
    
    if (loading) {
        return <LoadingPage/>
    }else{
        return(
            <div className='ctn-client'>
                <div className='top-client'>
                    <div className='data-client'>
                        <h1>{client.nombre}</h1>
                        <section>
                            <p>{client.cumpleannos}</p>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Client;