import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import '../Assets/Components/Clients.css'
import { ButtonTable,  PopUpWindowCliente } from '../Components';
import { GetClients } from '../Services/Database';

function Clients() {
  const [client, setClient] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const clients = await GetClients();
      const cliente_data = await clients.json();
      setClient(cliente_data);
    }
    fetchData()
  }, [])
  const changeShowPopUp = (evt)=>{
    evt.preventDefault();
    setShowPopUp(!showPopUp)
  }
  return (
    <div className='ctn-clients'>
        {showPopUp ? <PopUpWindowCliente changeShowPopUp={setShowPopUp}/> : null}
        <div id='nav-top'>
          <div>
            <h1  className='title-1'>Clientes / Proveedores</h1>
          </div>
          <div className='ctn-btns-top'>
            <button style={{background:'#023047', color :'white', borderRadius:'10px'}} onClick={changeShowPopUp} ><span>Nuevo Cliente / Proveedor</span></button>
            <button>Exportar Clientes</button>
          </div>
        </div>
        <div className='ctn-table'>
            <section className='table_body'>
              <table> 
                <thead>
                  <tr>
                    <th><h2 className='title-2'>Documento</h2></th>
                    <th><h2 className='title-2'>Nombre / Razon Social</h2></th>
                    <th><h2 className='title-2'>Tipo</h2></th>
                    <th><h2 className='title-2'>Direccion</h2></th>
                    <th><h2 className='title-2'>Telefono</h2></th>
                    <th><h2 className='title-2'>Saldo</h2></th>
                    <th><h2 className='title-2'>Acciones</h2></th>
                  </tr>
                </thead>
                <tbody>
                  {client.map((el,key)=>{
                    if (key<25) {
                      return (
                        <tr className='row-table' key={el.idcliente}>
                          <td>{String(el.documento) === "0" ? <p><strong >SIN DOCUMENTO</strong> 00000000</p> : (String(el.documento).length === 8 ? <p><strong >DNI</strong> {el.documento}</p> : <p><strong >RUC</strong> {el.documento}</p>) }</td>
                          <td><Link to={`/cliente/${el.idcliente}`}><span>{el.nombre}, {el.apellido}</span></Link></td>
                          <td>Cliente</td>
                          <td>{el.direccion ? <p>{el.direccion}</p> : <p>-</p>}</td>
                          <td>{el.telefono ? el.telefono : '-'}</td>
                          <td>{el.saldo}</td>
                          <td><ButtonTable /></td>
                        </tr>
                      )
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </section>            
          </div>
    </div>
  )
}

export default Clients;