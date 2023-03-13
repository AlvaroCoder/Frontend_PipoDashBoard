import React,{useState} from 'react'
import { Button, ButtonGroup } from '@mui/material';
import {  InputList } from '../Components';

function PopUpClienteProv({changeShowPopUp}) {
    
    const optionsTipoDoc = [
        {index : 0,nombre : 'RUC', isSelected : true},
        {index : 1,nombre : 'DNI', isSelected : false},
        {index : 2, nombre : 'SIN DOCUMENTO', isSelected : false}
      ]
      const optGenero = [
        {index : 0, nombre : 'M', displayName : 'Masculino'},
        {index : 1, nombre : 'F', displayName : 'Femenino'},
        {index : 2, nombre : 'O', displayName : 'Otro'},
        
      ]
      const optTipoCliente = [
        {index : 0, nombre : 'Cliente', displayName : 'Cliente'},
        {index : 1, nombre : 'Proveedor', displayName : 'Proveedor'}
      ]
      const [optionDoc, setOptionDoc] = useState(optionsTipoDoc)
      const [showMore, setShowMore] = useState(false);
      const changeShowMore = (evt)=>{
        evt.preventDefault();
        setShowMore(!showMore)
      }
      const changeShowPopupUpWindow =()=>{
        changeShowPopUp(false)
      }
      const changeSelectedTipoDoc = (evt)=>{
        evt.preventDefault();
        const name = evt.currentTarget.name
        const copyOpt = [...optionDoc]
        const posi_bef = copyOpt.filter(val=>val.isSelected)[0].index
        const pos = copyOpt.filter(val=>val.nombre === name)[0].index
        copyOpt[pos].isSelected = true
        copyOpt[posi_bef].isSelected = false
        setOptionDoc(copyOpt)
      }
      return (
        <div id='ctn-windowCliente'>
          <div id='container-WindowCliente'>
          <div className='windowCliente'>
            <div className='topWindowCliente'>
              <h1>Nuevo Cliente</h1>
              <button onClick={changeShowPopupUpWindow}><span class="material-symbols-outlined">close</span></button>
            </div>       
            <div className='bodyWindowCliente'>
              <label id='first' className='label-windowCliente'>
                <p className='p-optwindowCliente' id='title-label'>Tipo Documento</p>
                <ButtonGroup className='optTipoDoc' size='small' color='inherit'>
                  {
                    optionDoc.map(val => <Button id={val.isSelected ? 'opt-active' : ''} name={val.nombre} className='optDoc' onClick={changeSelectedTipoDoc} key={val.index}>{val.nombre}</Button>)
                  }
                </ButtonGroup>
              </label>
              {
                !optionDoc[2].isSelected ?  <label className='label-windowCliente'><p className='p-optwindowCliente'>N° de Documento</p><div className='item-field'><input placeholder='N° de Documento' className='input-field'/></div></label> : null 
              }
              <label className='label-windowCliente'><p className='p-optwindowCliente'>Nombre</p><div className='item-field'><input placeholder='Nombre / Razón Social' name='nombre' className='input-field'/></div></label>
              <label  className='label-windowCliente'><p className='p-optwindowCliente'>Direccion</p><div className='item-field'><input placeholder='Dirección' name='direccion' className='input-field'/></div></label>
              <label className='label-windowCliente'>
                <p className='p-optwindowCliente'>Tipo</p>
                <div className='ctn-inputOpt' >
                  <InputList data={optTipoCliente}></InputList>
                </div>
    
              </label>
              <div className='ctn-showMoreDetail'>
              <p className='showMoreDetail' onClick={changeShowMore}>Ver Más</p>
              </div>
              {
                showMore ?           
                <div className='moreDetWindowCliente'>
                  <label className='label-windowCliente'><p className='p-optwindowCliente'>Telefono</p><input className='input-field'/></label>
                  <label className='label-windowCliente'>
                    <p className='p-optwindowCliente'>Género</p>
                    <InputList data={optGenero}></InputList>
                  </label>
                  <label className='label-windowCliente'>
                    <p className='p-optwindowCliente'>Correo</p>
                    <input type="email" className='input-field'/>
                  </label>
                  <label className='label-windowCliente'><p className='p-optwindowCliente'>Detalle Cliente</p><textarea></textarea></label>
                
                </div>
                :null  
              }
            </div> 
            <div className='bottomWindowCliente'>
              <button onClick={changeShowPopupUpWindow}>Cancelar</button>
              <button id="saveBtn">Guardar</button>
            </div>
          </div>
          </div>
        </div>
      )
}

export default PopUpClienteProv