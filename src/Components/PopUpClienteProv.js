import React,{useState } from 'react'
import { Button, ButtonGroup } from '@mui/material';
import {  InputList } from '../Components';
import { useClient } from '../Hooks/ClientHook';
import { useCookies } from 'react-cookie';
import LoadingPage from '../Pages/LoadingPage';
function PopUpClienteProv({changeShowPopUp}) {
    const { saveClient } = useClient();
    const [showMore, setShowMore] = useState(false);
    const [cookieUser] = useCookies(['user'])
    const [clientData, setClientData] = useState({
      nro_doc : '',
      nombre : '',
      apellido : '',
      direccion : '',
      telefono : '',
      correo : ''

    })

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
        {index : 0, nombre : 'CLIENTE', displayName : 'Cliente'},
        {index : 1, nombre : 'PROVEEDOR', displayName : 'Proveedor'}
      ]
      
      const [genero, setGenero] = useState(optGenero[0].nombre);
      const [tipoCliente, setTipoCliente] = useState(optTipoCliente[0].nombre);
      const [optionDoc, setOptionDoc] = useState(optionsTipoDoc)
      const [loading, setLoading] = useState(false);
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
      const onChange = (evt)=>{
        const target = evt.target;
        setClientData({
          ...clientData,
          [target.name] : target.value
        })
      }
      const saveClientProve = async (evt)=>{
        evt.preventDefault();
        let client = {
          ...clientData,
          tipo_doc : optionDoc.filter(val=>val.isSelected)[0].nombre,
          tipo_cliente : tipoCliente,
          genero : genero
        }
        let token = cookieUser.user.token
        setLoading(true);
        let response = await saveClient(client,token);
        if (response >= 200 && response < 400) {
          setLoading(false)
          changeShowPopUp(false)
          alert(`${tipoCliente} creado correctamente`)
        }
      }
      
      if (loading) {
        return <LoadingPage/>
      }else{
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
                  !optionDoc[2].isSelected ?  
                  <label className='label-windowCliente'>
                    <p className='p-optwindowCliente'>N° de Documento</p>
                    <div className='item-field'>
                      <input onChange={onChange} name='nro_doc' placeholder='N° de Documento' className='input-field'/>
                      <p style={{color:'red', fontSize : '15px'}}>{optionDoc[0].isSelected && clientData.nro_doc.length !== 11 ? 'RUC inválido' : optionDoc[1].isSelected && clientData.nro_doc.length !== 8 ? 'DNI inválido' : null }</p>
                    </div>
                  </label> : null 
                }
                
                <label className='label-windowCliente'>
                  <p className='p-optwindowCliente'>Nombre</p>
                  <div className='item-field'>
                    <input onChange={onChange} placeholder='Nombre / Razón Social' name='nombre' className='input-field'/>
                    <p style={{color:'red', fontSize : '15px'}}>{clientData.nombre.trim() === 'Ingrese el nombre'}</p>
                  </div>
                </label>
                {
                  tipoCliente === 'CLIENTE' ? <label className='label-windowCliente'><p className='p-optwindowCliente'>Apellido</p><div className='item-field'><input onChange={onChange} placeholder='Apellido' name='apellido' className='input-field'/></div></label> : null
                }
                <label  className='label-windowCliente'><p className='p-optwindowCliente'>Direccion</p><div className='item-field'><input onChange={onChange} placeholder='Dirección' name='direccion' className='input-field'/></div></label>
                <label className='label-windowCliente'>
                  <p className='p-optwindowCliente'>Tipo</p>
                  <div className='ctn-inputOpt' >
                    <InputList data={optTipoCliente} setData={setTipoCliente}></InputList>
                  </div>
      
                </label>
                <div className='ctn-showMoreDetail'>
                <p className='showMoreDetail' onClick={changeShowMore}>Ver Más</p>
                </div>
                {
                  showMore ?           
                  <div className='moreDetWindowCliente'>
                    <label className='label-windowCliente'><p className='p-optwindowCliente'>Telefono</p><input onChange={onChange} name='telefono' className='input-field'/></label>
                    <label className='label-windowCliente'>
                      <p className='p-optwindowCliente'>Género</p>
                      <InputList data={optGenero} setData={setGenero}></InputList>
                    </label>
                    <label className='label-windowCliente'>
                      <p className='p-optwindowCliente'>Correo</p>
                      <input onChange={onChange} type="email" className='input-field'/>
                    </label>
                    <label className='label-windowCliente'><p className='p-optwindowCliente'>Detalle Cliente</p><textarea ></textarea></label>
                  
                  </div>
                  :null  
                }
              </div> 
              <div className='bottomWindowCliente'>
                <button onClick={changeShowPopupUpWindow}>Cancelar</button>
                <button onClick={saveClientProve} id="saveBtn">Guardar</button>
              </div>
            </div>
            </div>
          </div>
        )
      }

}

export default PopUpClienteProv