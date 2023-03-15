import React,{useState} from 'react'

function PopUpWindow() {
    return(
        <div className='popup'>
            <div className='opt-popup'>
                <p>Editar</p>
            </div>
            <div className='opt-popup'>
                <p>Ver</p>
            </div>
            <div  className='opt-popup'>
                <p>Eliminar</p>
            </div>
        </div>
    )
}

function ButtonTable() {
    const [onShowPopUp, setonShowPopUp] = useState(false);
    const OnshowPopUp = (evt)=>{
        evt.preventDefault();
        setonShowPopUp(!onShowPopUp)
    }
  return (
    <div className='ctn-btn-popup'>
        <button onClick={OnshowPopUp} className='btn-edit-table'><span className="material-symbols-outlined">edit</span></button>
        {onShowPopUp ? <PopUpWindow/> : null}
    </div>
    )
}

export default ButtonTable;