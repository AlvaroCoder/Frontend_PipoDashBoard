import React,{useState} from 'react'
import { DeleteClient } from '../Services/Database';

function PopUpWindow({idcliente, token, setLoading}) {
    const deleteClient =async (evt)=>{
        evt.preventDefault();
        setLoading(true)
        console.log("🚀 ~ file: ButtonTable.js:5 ~ PopUpWindow ~ idcliente:", idcliente)
        await DeleteClient(idcliente, token)
        setLoading(false);
        alert('Se elimino el cliente')
    }
    return(
        <div className='popup'>
            <div className='opt-popup'>
                <p>Editar</p>
            </div>
            <div className='opt-popup'>
                <p>Ver</p>
            </div>
            <div  className='opt-popup'>
                <p onClick={deleteClient}>Eliminar</p>
            </div>
        </div>
    )
}

function ButtonTable({idcliente, token, setLoading}) {
    const [onShowPopUp, setonShowPopUp] = useState(false);
    const OnshowPopUp = (evt)=>{
        evt.preventDefault();
        setonShowPopUp(!onShowPopUp)
    }
  return (
    <div className='ctn-btn-popup'>
        <button onClick={OnshowPopUp} className='btn-edit-table'><span className="material-symbols-outlined">edit</span></button>
        {onShowPopUp ? <PopUpWindow idcliente={idcliente} token={token} setLoading={setLoading}/> : null}
    </div>
    )
}

export default ButtonTable;