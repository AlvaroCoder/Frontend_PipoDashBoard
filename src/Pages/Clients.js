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
                      <tr className='row-table' key={el.idcliente}>
                        <td>{String(el.documento) === "0" ? <p><span>SIN DOCUMENTO</span> 00000000</p> : (String(el.documento).length === 8 ? <p><span>DNI</span> {el.documento}</p> : <p><span>RUC</span> {el.documento}</p>) }</td>
                        <td><Link to={`/cliente/${el.idcliente}`}><span>{el.nombre}, {el.apellido}</span></Link></td>
                        <td>{el.telefono ? el.telefono : '-'}</td>
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