import React,{useEffect, useState} from 'react'
import { PopUpWindowCliente, TableClientes } from '../Components';
import { GetClients } from '../Services/Database';
import LoadingPage from './LoadingPage';
import '../Assets/Components/Clients.css'

function Clients() {
  const [client, setClient] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [ok, setOk] = useState(false);
  const [query, setQuery] = useState('');
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
  const handleOnChange = (evt)=>{
    evt.preventDefault();
    const target = evt.target;
    setQuery(target.value);
    const dataClient = [...client]
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
          {showPopUp ? <PopUpWindowCliente changeOk={setOk} changeShowPopUp={setShowPopUp}/> : null}
          <div className='nav-top'>
            <div className='elements'>
              <h1  className='title-1'>Clientes</h1>
              <button className='button' onClick={changeShowPopUp} ><span>Nuevo Cliente</span></button>
              <input value={query}  onChange={handleOnChange} className='search-user' placeholder='Busca un cliente ..'></input>
            </div>
          </div>
          <section className='table_body'>
            <TableClientes clientes={query === '' ? client : clientsData} setLoading={setLoading}/>
          </section>  
      </div>
    )
  }
}

export default Clients;