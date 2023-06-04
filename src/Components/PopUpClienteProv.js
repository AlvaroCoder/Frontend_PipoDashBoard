import React,{useState } from 'react'
import { Button, ButtonGroup } from '@mui/material';
import {  InputList } from '../Components';
import { useClient } from '../Hooks/ClientHook';
import { useCookies } from 'react-cookie';
import { fetchDataClient } from '../Services/Sunat'
import LoadingPage from '../Pages/LoadingPage';

function PopUpClienteProv({changeOk}) {
    const { saveClient, changePopup, setIsNewClient,updateClient, errorClient, client, isNewClient } = useClient();
    const [showMore, setShowMore] = useState(false);
    const [cookieUser] = useCookies(['user'])
    const [clientData, setClientData] = useState(client)

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
      
      const [genero, setGenero] = useState(optGenero[0].nombre);
      const [optionDoc, setOptionDoc] = useState(optionsTipoDoc)
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState({});
      const changeShowMore = (evt)=>{
        evt.preventDefault();
        setShowMore(!showMore)
      }
      const changeShowPopupUpWindow =(evt)=>{
        evt.preventDefault();
        setIsNewClient(true);
        console.log(isNewClient);
        changePopup();
        return;
      }
      const changeSelectedTipoDoc = (evt)=>{
        evt.preventDefault();
        const name = evt.currentTarget.name
        const copyOpt = [...optionDoc]
        const posi_selected = copyOpt.filter(val=>val.isSelected)[0].index
        const pos = copyOpt.filter(val=>val.nombre === name)[0].index
        copyOpt[pos].isSelected = true
        copyOpt[posi_selected].isSelected = false
        setOptionDoc(copyOpt)
      }
      const onChange = (evt)=>{
        const target = evt.target;
        setClientData({
          ...clientData,
          [target.name] : target.value
        })
      }
      const searchClientSunat = async (evt)=>{
        evt.preventDefault();
        if (optionDoc[0].isSelected && clientData.nro_doc.length !== 11) {
          setTimeout(()=>{
            setError({})
          }, 3000);

          setError({
            message : 'RUC INVÁLIDO'
          });
          
          return;
        }
        if (optionDoc[1].isSelected && clientData.nro_doc.length !== 8) {
          setTimeout(()=>{
            setError({})
          }, 3000);
          setError({
            message : 'DNI INVÁLIDO'
          });
          return;
        }

        const data = await fetchDataClient(clientData.nro_doc);
        if (data.error) {
          setError({
            message : data.message
          })
          return;
        }
        let client_name = data.nombre || data.razonSocial
        let client_lastName = data.apellido || ''
        let obj_client = {
          nombre : client_name,
          apellido : client_lastName,
          nro_doc : clientData.nro_doc,
          direccion : '',
          telefono : '',
          correo : ''
        }        
        setClientData(obj_client);
      }
      const updateClientData = async (evt)=>{
        evt.preventDefault();
        console.log(genero);
        let client = {
          ...clientData,
          genero : genero
        }
        let token = cookieUser.user.token
        changePopup();
        setLoading(true)
        await updateClient(client, token);
        if (error.message) {
          setLoading(false);
          alert('Error')
          return;
        }
        setLoading(false);
        changeOk(true);
      }
      const saveClientData = async (evt)=>{
        evt.preventDefault();
        let client = {
          ...clientData,
          tipo_doc : optionDoc.filter(val=>val.isSelected)[0].nombre,
          genero : genero
        }
        let token = cookieUser.user.token
        setLoading(true);
        await saveClient(client,token);
        if (!error.message) {
          setLoading(false)
          changePopup()
          changeOk(true)
          setTimeout(()=>{
            changeOk(false)
          },3000)
        }else{
          setLoading(false)
        }
      }
    
      if (loading) {
        return <LoadingPage/>
      }else{
        return (
          <div id='ctn-windowCliente'>
              <div className='windowCliente'>
                  <div className='topWindowCliente'>
                    <h1 className='title'>Nuevo Cliente</h1>
                    <i onClick={changeShowPopupUpWindow} className='bx bx-x button-close'></i>
                  </div>       
                  <div className='bodyWindowCliente'>
                    <label id='first' className='label-windowCliente'>
                      <p className='p-optwindowCliente' id='title-label'>Tipo Documento</p>
                      <ButtonGroup className='optTipoDoc' size='small' color='inherit'>
                        {
                          optionDoc.map((val) => <Button id={val.isSelected ? 'opt-active' : ''} name={val.nombre} className='optDoc' onClick={changeSelectedTipoDoc} key={val.index}>{val.nombre}</Button>
                          )
                        }
                      </ButtonGroup>
                    </label>
                    {
                      !optionDoc[2].isSelected ?  
                      <label className='label-windowCliente'>
                        <p className='p-optwindowCliente'>N° de Documento</p>
                        <div id='column-field' className='item-field'>
                          <input onChange={onChange} name='nro_doc' value={clientData.nro_doc} placeholder='N° de Documento' className={error.message ?'input-field error' : 'input-field'}/>
                          <p className='error-text'>{error.message ? error.message : errorClient.message ? errorClient.message : null }</p>
                        </div>
                        <span onClick={searchClientSunat} className='search-sunat'>SUNAT <i className='bx bx-search-alt-2 search-btn'></i></span>
                      </label> : null 
                    }
                    
                    <label className='label-windowCliente'>
                      <p className='p-optwindowCliente'>Nombre</p>
                      <div className='item-field'>
                        <input onChange={onChange} value={clientData.nombre} placeholder='Nombre / Razón Social' name='nombre' className='input-field'/>
                        <p style={{color:'red', fontSize : '15px'}}>{clientData.nombre.trim() === 'Ingrese el nombre'}</p>
                      </div>
                    </label>
                    <label className='label-windowCliente'>
                      <p className='p-optwindowCliente'>Apellido</p>
                      <div className='item-field'>
                        <input onChange={onChange} value={clientData.apellido} placeholder='Apellido' name='apellido' className='input-field'/>
                      </div>
                    </label>
                    <label  className='label-windowCliente'>
                      <p className='p-optwindowCliente'>Direccion</p>
                      <div className='item-field'>
                        <input onChange={onChange} placeholder='Dirección' value={clientData.direccion} name='direccion' className='input-field'/>
                      </div>
                    </label>
                    
                    <div className='ctn-showMoreDetail'>
                    <p className='showMoreDetail' onClick={changeShowMore}>Ver Más</p>
                    </div>
                    {
                      showMore ?           
                      <div className='moreDetWindowCliente'>
                        <label className='label-windowCliente'>
                          <p className='p-optwindowCliente'>Telefono</p>
                          <input onChange={onChange} name='telefono' value={clientData.telefono} placeholder='Ingrese el telefono' className='input-field'/></label>
                        <label className='label-windowCliente'>
                          <p className='p-optwindowCliente'>Género</p>
                          <InputList data={optGenero} setData={setGenero} />
                        </label>
                        <label className='label-windowCliente'>
                          <p className='p-optwindowCliente'>Correo</p>
                          <input name='correo' onChange={onChange} type="email" value={clientData.correo} placeholder='Ingrese el correo' className='input-field'/>
                        </label>
                        <label className='label-windowCliente'>
                          <p className='p-optwindowCliente'>Detalle Cliente</p>
                          <textarea name='detalle' value={clientData.detalle} onChange={onChange} ></textarea>
                        </label>
                        
                      </div>
                      :null  
                    }
                  </div> 
                  <div className='bottomWindowCliente'>
                    <button onClick={changeShowPopupUpWindow} >Cancelar</button>
                    {isNewClient ? <button onClick={saveClientData } className='button'>Guardar</button> : <button className='button' onClick={updateClientData}>Actualizar Datos</button>}
                  </div>
            </div>
          </div>
        )
      }

}

export default PopUpClienteProv