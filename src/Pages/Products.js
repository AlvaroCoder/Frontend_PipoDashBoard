import React,{useState} from 'react'
import { PopUpWindowProduct } from '../Components'

function Products() {
  const [showPopUp, setShowPopUp] = useState(false)
  const changeShowPopUp = (evt)=>{
    evt.preventDefault();
    setShowPopUp(true)
  }
  return (
    <div className='ctn-products'>
        {showPopUp ? <PopUpWindowProduct changeShopwPopUp={setShowPopUp}/> : null}
        <div>
          <div>
            <h1 className='title-1'>Productos</h1>
          </div>
          <div className='ctn-btns-top'>
            <button style={{background:'#023047', color :'white', borderRadius:'10px'}} onClick={changeShowPopUp} ><span>Nuevo Cliente / Proveedor</span></button>
          </div>
        </div>
        <div className='ctn-table'>
          <section className='table_body'>
            <table>
              <thead>
                <tr>
                  <th><h2 className='title-2'>Código</h2></th>
                  <th><h2 className='title-2'>Nombre</h2></th>
                  <th><h2 className='title-2'>Precio</h2></th>
                  <th><h2 className='title-2'>Cantidad</h2></th>
                  <tr><h2 className='title-2'>Categoría</h2></tr>
                  <tr><h2 className='title-2'>Serie</h2></tr>
                </tr>
              </thead>
            </table>
          </section>
        </div>
    </div>
  )
}

export default Products;