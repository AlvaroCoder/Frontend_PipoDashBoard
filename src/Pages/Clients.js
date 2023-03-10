import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import '../Assets/Components/Clients.css'
import { ButtonTable } from '../Components';
import { GetClients } from '../Services/Database';
function PopUpWindowCliente({changeShowPopUp}) {
  const [showMore, setShowMore] = useState(false);
  const changeShowMore = (evt)=>{
    evt.preventDefault();
    setShowMore(!showMore)
  }
  const changeShowPopupUpWindow =()=>{
    changeShowPopUp(false)
  }
  return (
    <div id='ctn-windowCliente'>
      <div className='windowCliente'>
        <div className='topWindowCliente'>
          <h1>Nuevo Cliente</h1>
          <button onClick={changeShowPopupUpWindow}><span class="material-symbols-outlined">close</span></button>
        </div>       
        <div className='bodyWindowCliente'>
          <label>
            <p>Tipo Documento</p>
            <div id='optTipoDocWindowCliente'>
                <label>RUC</label>
                <label>DNI</label>
                <label>SIN DOCUMENTO</label>
            </div>
          </label>
          <label><p>N° de Documento</p><input/></label>
          <label><p>Nombre</p><input/></label>
          <label><p>Direccion</p></label>
          <label>
            <p>Tipo</p>
            <div id='optTipoClienteWindowCliente'>
              <label>Cliente</label>
              <label>Proveedor</label>
            </div>
          </label>
          <p className='' onClick={changeShowMore}>Ver Más</p>
          {
            showMore ?           
            <div className='moreDetWindowCliente'>
              <label><p>Telefono</p><input/></label>
              <label><p>Detalle Cliente</p><textarea></textarea></label>
            </div>
            :null  
          }
        </div> 
      </div>
    </div>
  )
}
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
            <h1 className='title-1'>Clientes / Proveedores</h1>
          </div>
          <div className='ctn-btns-top'>
            <button onClick={changeShowPopUp} ><span>Nuevo Cliente / Proveedor</span></button>
            <button>Exportar Clientes</button>
          </div>
        </div>
        <div className='ctn-col'>
          <div>

          </div>
          <div className='ctn-table'>
            <section className='table_body'>
              <table> 
                <thead>
                  <tr>
                    <th>Documento</th>
                    <th>Nombre / Razon Social</th>
                    <th>Telefono</th>
                    <th>Saldo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {client.map(el=>{
                    return (
                      <tr className='row-table' key={el.documento}>
                        <td>{String(el.documento) === "0" ? <p><span>SIN DOCUMENTO</span> 00000000</p> : (String(el.documento).length === 8 ? <p><span>DNI</span> {el.documento}</p> : <p><span>RUC</span> {el.documento}</p>) }</td>
                        <td><Link to={`/cliente/${el.idcliente}`}><span>{el.nombre}, {el.apellido}</span></Link></td>
                        <td>{el.telefono}</td>
                        <td>{el.saldo}</td>
                        <td><ButtonTable /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>            
          </div>
        </div>
    </div>
  )
}

export default Clients;