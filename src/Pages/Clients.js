import React,{ useState } from 'react'
import { PopUpWindowCliente, TableClientes } from '../Components';
import LoadingPage from './LoadingPage';
import '../Assets/Components/Clients.css'
import { useClient } from '../Hooks/ClientHook';

function Clients() {
  const { dataClients, popup, isNewClient,changePopup, resetClient, setIsNewClient } = useClient();
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [query, setQuery] = useState('');

  const changeShowPopUp = (evt)=>{
    evt.preventDefault();
    resetClient();
    if (isNewClient) {
      setIsNewClient(true);
    }
    changePopup();
  }
  const handleOnChange = (evt)=>{
    evt.preventDefault();
    const target = evt.target;
    setQuery(target.value);
    const dataClient = [...dataClients]
    const data = query === '' ? dataClient : dataClient.filter((val)=>{
      return val.nombre.toLowerCase().includes(query.toLowerCase())
    });
    setClientsData(data);
  }
  if (loading) {
    return <LoadingPage/>
  }else{
    return (
      <div className='ctn-clients'>
          { ok ?  <div className='box-succesfull-created'><p className='text-box-succesfull'>Cliente creado correctamente</p></div> : null}
          {popup ? <PopUpWindowCliente changeOk={setOk} /> : null}
          <div className='nav-top'>
            <div className='elements'>
              <h1  className='title-1'>Clientes</h1>
              <button className='button' onClick={changeShowPopUp} ><span>Nuevo Cliente</span></button>
              <input value={query}  onChange={handleOnChange} className='search-user' placeholder='Busca un cliente ..'></input>
            </div>
          </div>
          <section className='table_body'>
            <TableClientes clientes={query === '' ? dataClients : clientsData} setLoading={setLoading}/>
          </section>  
      </div>
    )
  }
}

export default Clients;