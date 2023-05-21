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
        <div className='nav-top'>
          <div className='elements'>
            <h1 className='title-1'>Productos</h1>
            <button  className='button' onClick={changeShowPopUp} ><span>Nuevo Cliente / Proveedor</span></button>
          </div>
        </div>
        <div className='ctn-table'>
          <section className='table_body'>
            <table className='table-clients'>
              <thead>
                <tr>
                  <th><h2 className='title'>Código</h2></th>
                  <th><h2 className='title'>Nombre</h2></th>
                  <th><h2 className='title'>Precio</h2></th>
                  <th><h2 className='title'>Cantidad</h2></th>
                  <tr><h2 className='title'>Categoría</h2></tr>
                  <tr><h2 className='title'>Serie</h2></tr>
                </tr>
              </thead>
            </table>
          </section>
        </div>
    </div>
  )
}

export default Products;