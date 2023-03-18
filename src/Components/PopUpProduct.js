import React, {useEffect,useState} from 'react'
import { InputList, InputPrice } from '.';
import { GetCategory } from '../Services/Database';

function PopUpProduct({changeShopwPopUp}) {
    const [dataCategoria, setDataCategoria] = useState([]);
    const [categoria, setCategoria] = useState('')
    useEffect(() => {
        async function getCategory() {
            const response = await GetCategory().then(async(val)=>{return await val.json()})
            console.log("🚀 ~ file: PopUpProduct.js:11 ~ getCategory ~ response:", response)
            setDataCategoria(response);
                
        }
        getCategory()
    }, [])
    
    const changeShowPopupWindow = ()=>{
        changeShopwPopUp(false)
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
                    <p>Nombre</p>
                    <input/>
                </label>
                <label className='label-windowCliente'>
                    <p>Código</p>
                    <input/>
                </label>
                <label className='label-windowCliente'>
                    <p>Precio de Venta</p>
                    <InputPrice></InputPrice>
                </label>
                <label className='label-windowCliente'>
                    <p>Nombre</p>
                    <input/>
                </label>
                <label className='label-windowCliente'>
                    <p>Categoría</p>
                    
                </label>
            </div>
        </div>
        </div>
    </div>
  )
}

export default PopUpProduct;