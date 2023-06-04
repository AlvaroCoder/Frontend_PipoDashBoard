import React,{useState} from 'react'
import { useClient } from '../Hooks/ClientHook';
import { Link } from 'react-router-dom';

function PopUpWindow({setLoading, client, token, changePopControl}) {
    const { deleteClient, editClient, changePopup, setIsNewClient } = useClient();
    const {idcliente} = client;
    const RemoveClient =async (evt)=>{
        evt.preventDefault();
        setLoading(true)
        await deleteClient(idcliente, token);
        setLoading(false);
        alert('Se elimino el cliente');
    }
    const EditClient = (evt)=>{
        evt.preventDefault();
        changePopControl(false);
        setIsNewClient(false);
        changePopup();
        editClient(client);
    }

    return(
        <div className='popup'>
            <div className='opt-popup'>
                <p onClick={EditClient} >Editar</p>
            </div>
            <div className='opt-popup'>
                <p><Link to={`/cliente/${idcliente}`}>Ver</Link></p>
            </div>
            <div  className='opt-popup'>
                <p onClick={RemoveClient}>Eliminar</p>
            </div>
        </div>
    )
}

function ButtonTable({ client, token,setLoading}) {
    const [onShowPopUp, setonShowPopUp] = useState(false);
    const OnshowPopUp = (evt)=>{
        evt.preventDefault();
        setonShowPopUp(!onShowPopUp)
    }
  return (
    <div className='ctn-btn-popup'>
        <i class='bx bx-dots-horizontal-rounded action' onClick={OnshowPopUp}></i>
        {onShowPopUp ? <PopUpWindow client={client} token={token} setLoading={setLoading} changePopControl={setonShowPopUp}/> : null}
    </div>
    )
}

export default ButtonTable;