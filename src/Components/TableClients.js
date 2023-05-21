import React from 'react'

import {ButtonTable} from '../Components';
import { useCookies} from 'react-cookie';
function TableClients({clientes, setLoading}) {
  const [cookieAuthor] = useCookies(['user']);
  return (
    <table className='table-clients'>
        <thead>
          <tr>
              <th><h2 className='title'>Nombre</h2></th>
              <th><h2 className='title'>Documento</h2></th>
              <th><h2 className='title'>Direccion</h2></th>
              <th><h2 className='title'>Telefono</h2></th>
              <th><h2 className='title'>Accion</h2></th>          
            </tr>
        </thead>
        <tbody>
          {
            clientes.map((el, key)=>{
              return(
                <tr key={key} className='row'>
                  <td className='column name-icon'><strong className='name'>{el.nombre} {el.apellido}</strong></td>
                  <td className='column'><span>{String(el.documento) === "0" ? <p><strong >SIN DOCUMENTO</strong> 00000000</p> : String(el.documento).length === 8 ? <p><strong >DNI</strong> {el.documento}</p> : <p><strong >RUC</strong> {el.documento}</p> }</span></td>
                  <td className='column'>{el.direccion ? <span>{el.direccion}</span> : <span>-</span>}</td>
                  <td className='column'>{el.telefono ? <span>{el.telefono}</span> : <span>-</span>}</td>
                  <td className='column'><ButtonTable idcliente={el.idcliente} token={cookieAuthor.user.token} setLoading={setLoading}></ButtonTable></td>
                </tr>
              )
            })
          }
        </tbody>
    </table>
  )
}

export default TableClients;