import { CircularProgress } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { ComboBox } from '../Components';
import { GetClients } from '../Services/Database';
import { formatDate } from '../Services/Time';
  
function AddTicket() {

  const date = formatDate(new Date());
  const deadline = formatDate(new Date(Date.now() + (7 * 60 * 60 * 24 * 1000)))
  const [data2Send, setData2Send] = useState('');
  const [dataFetch, setdataFetch] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await GetClients();
      if (!data.ok) return;
      const jsonData = await data.json();
      const ar = jsonData.map(el=>{
        const arr = [el.nombre,el.apellido].join(" ")
        return {nombre : arr}
      });
      setdataFetch(ar)
    }
    fetchData()
  }, [])
  return (
    <div className='ctn-add-credit'>
        <h1>Emitir Nota de Crédito</h1>
        <div className='ctn-fields-3'>
            <div className='item-field'>
                <h2 className='title-3'>Cliente</h2>
                {dataFetch[0] ?  <ComboBox tipoPedido={dataFetch} setTipo={setData2Send}/> : <CircularProgress/>}
            </div>
            <div className='item-field'>
                <h2 className='title-3'>Fecha de Emisión</h2>
                <input className='input-field' disabled={true} value={date} type='date'></input>
            </div>
            <div className='item-field'>
                <h2 className='title-3'>Fecha de Caducidad</h2>
                <input className='input-field' disabled={true} value={deadline} type='date'></input>
            </div>
        </div>
        <div>
        </div>
    </div>
  )
}

export default AddTicket;