import React,{useState} from 'react'
import { SaveData } from '../Services/Database';
import {ComboBox} from '../Components'
import { useCookies } from 'react-cookie'
import LoadingPage from './LoadingPage';

const defaultData = {
    razon_social : '',
    nombre : '',
    apellido : '',
    telefono : '',
    email : '',
    ocupacion : '',
    fecha_cumpleannos : '',
    direccion : '',
    genero : 'M',
    credito_limite :'',
    duracion_credit : '',
    detalle_cliente : ''
}
const vip = [
    {nombre : 'No es Vip',value : 0},
    {nombre : 'Es vip', value : 1}
]
function AddClient() {
    const [cookieUser] = useCookies(['user'])
    const [data, setDatosPersonale] = useState(defaultData);
    const [error, setError] = useState({message : ''});
    const [loadingPage, setLoadingPage] = useState(false)
    const [ok, setOk] = useState(false);
    const [valComboBox, setValComboBox] = useState('');
    const [genero, setGenero] = useState('M');
    const onChange = evt =>{
        evt.preventDefault();
        const target = evt.target;
        setDatosPersonale({
            ...data,
            [target.name]:target.value
        })
    }
    const changeGenero = evt=>{
        setGenero(evt.target.value)
    }
    const saveClient = async (evt)=>{
        evt.preventDefault();
        if (data.razon_social === '' || data.nombre === '' || data.apellido === '') return setError({message :'Ingrese su razon social'});
        const token = cookieUser.user.token
        setLoadingPage(true);
        const copyData = data
        copyData.vip = vip.filter(el=>el.nombre.toUpperCase() === valComboBox.toUpperCase())[0].value
        copyData.genero = genero
        const response = await SaveData(copyData, token);
        setLoadingPage(false);
        setError({message: ''})
        setOk(true)
        setTimeout(()=>{
            setOk(false);
        }, 3000)
        if (response.ok) {
            setDatosPersonale(defaultData);
        }
    }
    if (loadingPage) {
        return (
            <LoadingPage/>
        )
    }else{
        return (
            <div className='ctn-add-client'>
                {
                    ok && <div className='box-succesfull-created'><p className='text-box-succesfull'>Cliente creado correctamente</p></div>
                }
                <div className='add-client-title'>
                    <h1>Nuevo Cliente</h1>
                </div>
                <section className='sec-personal-info'>
                    <h2 className='title-2'>
                        Datos Personales
                    </h2>
                    <div className='ctn-fields-3'>
                        <div style={{position:'relative'}}  className='item-field'>
                            <h3 className='title-3'>Razon Social (DNI, R.U.C)</h3>
                            <input type='number' id={error.message.length > 0 ? 'input-error' : ''}  name='razon_social' value={data.razon_social} onChange={onChange} className='input-field' placeholder='Ingrese la razón social'></input>
                            <p style={{color:'red', fontSize : '10px', position:'absolute', top:'65px'}}> {error.message}</p>                            
                        </div>
                        <div className='item-field'>
                            <h3 className='title-3'>Nombre</h3>
                            <input value={data.nombre} name='nombre' onChange={onChange} placeholder='Ingrese su nombre' className='input-field'></input>
                            <p style={{color:'red', fontSize : '10px', position:'absolute', top:'65px'}}> {error.message}</p>                            
                        </div>
                        <div className='item-field'>
                            <h3 className='title-3'>Apellidos</h3>
                            <input value={data.apellido} name='apellido' onChange={onChange} placeholder='Ingrese su apellido' className='input-field' ></input>
                            <p style={{color:'red', fontSize : '10px', position:'absolute', top:'65px'}}> {error.message}</p>                            
                        </div>
                    </div>
                    <div className='ctn-fields-3'>
                        <div className='item-field'>
                            <h3 className='title-3'>Telefono</h3>
                            <input name='telefono' value={data.telefono} onChange={onChange} type='number' placeholder='Ingrese su telefono' className='input-field'></input>
                        </div>
                        <div className='item-field'>
                            <h3 className='title-3'>Email</h3>
                            <input onChange={onChange} name='email' value={data.email} type='email' placeholder='Ingrese su email' className='input-field'></input>
                        </div>
                        <div className='item-field'>
                            <h3 className='title-3'>Ocupación</h3>
                            <input onChange={onChange} value={data.ocupacion} name='ocupacion' placeholder='Ingrese su ocupación' className='input-field'></input>
                        </div>
                    </div>
                    <div className='ctn-fields-3'>
                        <div className='item-field'>
                            <h3 className='title-3'>Fecha Cumpleaños</h3>
                            <input onChange={onChange} name='fecha_cumpleannos' value={data.fecha_cumpleannos} type='date' className='input-field'></input>
                        </div>
                        <div className='item-field'>
                            <h3 className='title-3'>Dirección</h3>
                            <input onChange={onChange} value={data.direccion} name='direccion' placeholder='Ingrese su dirección' className='input-field'></input>
                        </div>
                        <div className='ctn-fields-2'>
                            <div className='item-field'>
                                <h3 className='title-3'>Vip</h3>
                                <ComboBox setTipo={setValComboBox} tipoPedido={vip}></ComboBox>
                            </div>
                            <div className='item-field'>
                                <h3 className='title-3'>Género</h3>
                                <div className='box-radio-gen'>
                                    <span>M<input checked={genero === 'M'}  onChange={changeGenero} value='M' type='radio'></input></span>
                                    <span>F<input checked={genero === 'F'} onChange={changeGenero} value='F' type='radio'></input></span>
                                </div>
                            </div>
                        </div>  
                    </div>
                </section>
                <section className='sec-credit-info'>
                    <h2 className='title-2'>
                        Datos Crediticios
                    </h2>
                    <div className='ctn-fields-3'>
                        <div className='item-field'>
                            <h3 className='title-3'>Crédito Máximo</h3>
                            <input name='credito_limite' value={data.credito_limite} onChange={onChange} placeholder='Ingrese el crédito máximo' className='input-field'></input>
                        </div>
                        <div className='item-field'>
                            <h3 className='title-3'>Duración del crédito</h3>
                            <input name='duracion_credit' value={data.duracion_credit} onChange={onChange} placeholder='Ex : 7d' className='input-field'></input>
                        </div>
                    </div>
                    <div id='sec-detail-field' className='item-field'>
                        <h3 className='title-3'>Detalle del cliente</h3>
                        <textarea name='detalle_cliente' value={data.detalle_cliente} onChange={onChange} id='textarea-field' className='input-field'>
                        </textarea>
                    </div>
                </section>
                <div className='box-save-client'>
                    <button onClick={saveClient} id='btn-save-client'><span className="material-symbols-outlined">send</span><p>Guardar Cliente</p></button>
                </div>
            </div>
            )
    }
}

export default AddClient;