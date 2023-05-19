import { CircularProgress } from '@mui/material';
import React, {useEffect,useState} from 'react'
import { InputList, InputPrice } from '.';
import { GetCategory } from '../Services/Database';


function PopUpProduct({changeShopwPopUp}) {
    const [dataCategoria, setDataCategoria] = useState([{index : 0,nombre : 'NINGUNO', displayName : 'NINGUNO', valor : 'NINGUNO'}]);
    const [categoria, setCategoria] = useState([]);
    const [money, setMoney] = useState('');
    const [files, setFiles] = useState({});
    const [image, setImage] = useState(null);
    useEffect(() => {
        async function getCategory() {
            const response = await GetCategory().then(async(val)=>{return await val.json()})
            setDataCategoria(response);
        }
        getCategory()
    }, [])
    const onChangeImage = (evt)=>{
        const files_img = evt.target.files
        setFiles(files_img[0])
        setImage(URL.createObjectURL(files_img[0]))
    }   
    const changeShowPopupWindow = ()=>{
        changeShopwPopUp(false)
    }
    const saveData = ()=>{
        const data = new FormData();
        data.append("image",files)
    }
  return (
    <div id='ctn-windowCliente'>
        <div id='container-WindowCliente'>
        <div className='windowCliente'>
            <div className='topWindowCliente'>
                <h1>Nuevo Producto</h1>
                <button onClick={changeShowPopupWindow}><span class="material-symbols-outlined">close</span></button>
            </div>
            <div className='bodyWindowCliente'>
                <label className='label-windowCliente'>
                    <p className='p-optwindowCliente'>Nombre</p>
                    <div className='box-input-forms'>
                        <input className='input-field'/>
                    </div>
                </label>
                <label className='label-windowCliente'>
                    <p className='p-optwindowCliente'>Código</p>
                    <div className='box-input-forms'>
                        <input className='input-field'/>
                    </div>
                </label>
                <label className='label-windowCliente'>
                    <p className='p-optwindowCliente'>Precio de Venta</p>
                    <div className='box-input-forms'>
                        <InputPrice setMoney={setMoney}></InputPrice>
                    </div>
                </label>
                <label className='label-windowCliente'>
                    <p className='p-optwindowCliente'>Stock</p>
                    <div className='box-input-forms'>
                        <input className='input-field'/>
                    </div>
                </label>
                <label className='label-windowCliente'>
                    <p className='p-optwindowCliente'>Categoría</p>
                    <div className='box-input-forms'>
                    {dataCategoria[0] ?<InputList data={dataCategoria} setData={setCategoria} />:<CircularProgress/>}
                    </div>
                </label>
                <label className='label-windowCliente'>
                    <p className='p-optwindowCliente'>Imágen</p>
                    <div className='box-input-forms'>
                        <input onChange={onChangeImage} type='file' />
                        { image && <img className='image' src={image} alt='Producto' /> }
                    </div>
                </label>
            </div>
            <div className='bottomWindowCliente'>
                <button onClick={changeShowPopupWindow} >Cancelar</button>
                <button onClick={saveData} id="saveBtn">Guardar</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default PopUpProduct;