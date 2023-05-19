import React,{useEffect, useState} from 'react'
import { PopUpWindowCliente, TableClientes } from '../Components';
import { GetClients } from '../Services/Database';
import LoadingPage from './LoadingPage';
import '../Assets/Components/Clients.css'

function Clients() {
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [ok, setOk] = useState(false);
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
  if (loading) {
    return <LoadingPage/>
  }else{
    return (
      <div className='ctn-clients'>
          { ok ?  <div className='box-succesfull-created'><p className='text-box-succesfull'>Cliente creado correctamente</p></div> : null}
          {showPopUp ? <PopUpWindowCliente changeOk={setOk} changeShowPopUp={setShowPopUp}/> : null}
          <div id='nav-top'>
            <div>
              <h1  className='title-1'>Clientes</h1>
            </div>
            <div className='ctn-btns-top'>
              <button style={{background:'#023047', color :'white', borderRadius:'10px'}} onClick={changeShowPopUp} ><span>Nuevo Cliente / Proveedor</span></button>
              <button>Exportar Clientes</button>
            </div>
          </div>
          <div className='ctn-table'>
              <section className='table_body'>
                <TableClientes clientes={client} setLoading={setLoading}/>
              </section>            
            </div>
      </div>
    )
  }
}

export default Clients;