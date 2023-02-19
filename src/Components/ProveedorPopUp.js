import React, { useState } from 'react'
import '../Assets/Components/PopUpProveedor.css'
function ProveedorPopUp({visible,changeVisible}) {
    const [dataProveedor, setDataProveedor] = useState({
        nombre : '',
        razon_social : '',
        telefono : ''
    })
    const changeDataProveedor = (evt)=>{
        const target = evt.target
        setDataProveedor({
            ...dataProveedor,
            [target.name] : target.value
        })
    }
    const saveProveedor = (evt)=>{
        evt.preventDefault();
        console.log(dataProveedor);
    }
    if(visible){
        return (
            <div className='popup-proveedor'>
                <div className='ctn-popup'>
                    <section className='sec-data-proveedor'>
                        <div className='data-proveedor'>
                            <h1 className='title-1'>Nuevo Proveedor</h1>
                            <label htmlFor='nombre'> <input name='nombre' onChange={changeDataProveedor} value={dataProveedor.nombre} type='tex' className='input-field' placeholder='Ingrese el nombre del proveedor'></input></label>
                            <label htmlFor='razon_social'><input name='razon_social' onChange={changeDataProveedor} value={dataProveedor.razon_social} type='number' className='input-field' placeholder='Ingrese la razon social'></input></label>
                            <label htmlFor='telefono'><input name='telefono' type='number' onChange={changeDataProveedor} value={dataProveedor.telefono} className='input-field' placeholder='Ingrese el telefono' ></input></label>
                            <button onClick={saveProveedor} className='btn-save-add'>Guardar Proveedor</button>
                            <button onClick={changeVisible} className='cancel'>Cancelar</button>
                        </div>
                    </section>
                </div>
            </div>
          )
    }
}

export default ProveedorPopUp;