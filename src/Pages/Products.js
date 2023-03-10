import React from 'react'
import { Link,  useParams } from 'react-router-dom';

function NavBarTop() {
  const {url} = useParams();
  return (
    <nav className='navtop-products'>
      <Link to={'/productos/unidad'}><h1>Productos</h1></Link>
      <Link to={'/productos/paquete'}><h1>Paquetes</h1></Link>  
      <div>
        {url === 'unidad' ? <Link to={'/agregar/producto/unidad'}><p>Nuevo producto</p></Link> : <Link to={'/agregar/producto/paquete'}><p>Nuevo Paquete</p></Link>}
      </div>
    </nav>
    )
}

function Products() {
  return (
    <div className='ctn-products'>
        <NavBarTop></NavBarTop>
        <div>
          <div className='head-table'>

          </div>
        </div>
    </div>
  )
}

export default Products;