import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import '../Assets/Components/Clients.css'
import { GetClients } from '../Services/Database'
function Clients() {
  const [client, setClient] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const clients = await GetClients();
      const cliente_data = await clients.json()
      setClient(cliente_data);
    }
    fetchData()
  }, [])
  
  return (
    <div className='ctn-clients'>
        <h1>Clientes</h1>
        <div className='ctn-col'>
          <div>

          </div>
          <div className='ctn-table'>
            <section className='table_body'>
              <table> 
                <thead>
                  <tr>
                    <th>Acciones</th>
                    <th>Razon Social</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha Cumpleaños</th>
                    <th>Genero</th>
                    <th>Calificacion</th>
                    <th>Vip</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {client.map(el=>{
                    return (
                      <tr className='row-table'>
                        <td><button><span className="material-symbols-outlined">edit</span></button></td>
                        <td>{el.razon_social}</td>
                        <td><Link to={`/cliente/${el.nombre}`}><span>{el.nombre}</span></Link></td>
                        <td>{el.apellido}</td>
                        <td>{el.fecha_cumpleannos && el.fecha_cumpleannos.toString().slice(0,10)}</td>
                        <td>{el.genero}</td>
                        <td>{el.calificacion}</td>
                        <td>{el.esVip === 1 ? 'Es vip' : 'No es Vip'}</td>
                        <td>{el.saldo}</td>
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