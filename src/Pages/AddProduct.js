import React,{useState, useEffect, useRef} from 'react'
import { CreateProduct, GetGeneralData, GetProveedor, SaveImgProduct } from '../Services/Database';
import '../Assets/Components/AddProduct.css';
import { ComboBox, ComBoBoxAdd, ComboBoxProveedor, ProveedorPopUp, TableProducts } from '../Components';
import { CircularProgress } from '@mui/material';
import { formatDate } from '../Services/Time';
import { useCookies } from 'react-cookie';

const defaultData = {
  fecha_llegada : formatDate(new Date()),
  proveedor : '',
  productos : []
}
console.log(defaultData.fecha_llegada);
const defaultProduct = {
  codigo : '',
  nombre : '',
  color : '',
  p_uni : 0,
  cantidad : 1,
  n_uni : 1,
  t_inicial : '',
  t_final : ''

}

const row_names = [
  "Nombre",
  "Codigo",
  "Imagen",
  "Marca",
  "T.Inicial",
  "T.final",
  "Precio"
]

function AddProduct() {
  const [generalData, setGeneralData] = useState({});
  const [valTipoPed, setValTipoPed] = useState('')
  const [valAlmacen, setValAlmacen] = useState('')
  const [data, setData] = useState(defaultData)
  const [productData, setProducto] = useState(defaultProduct);
  const [proveedor, setProveedor] = useState([])
  const [visisble, setVisisble] = useState(false);

  const [imageProduct, setImageProduct] = useState({
    preview : "",
    data : ""
  });
  const [cookieUser] = useCookies(['user'])
  useEffect(() => {
    async function fetData() {
      const res = await GetGeneralData();
      const res_proveedor = await GetProveedor();
      const general = await res.json()
      const proveed = await res_proveedor.json()
      console.log(proveed);
      setGeneralData(general);
      setProveedor(proveed);
    }    
    fetData()
  }, [])
  const onChangeProduct = (evt)=>{
    evt.preventDefault();
    const target = evt.target
    setProducto({
      ...productData,
      [target.name] : target.value
    })
  }
  const onChangeImage = (evt)=>{
    const target = evt.target
    const img = {
      preview : URL.createObjectURL(target.files[0]),
      data : target.files[0]
    }
    setImageProduct(img)
  }
  const showPopUp = ()=>{
    setVisisble(!visisble)
  }
  const onChangeGeneral = evt =>{
    setData({
      ...data,
      [evt.target.name] : evt.target.value 
    })
  }
  const addProduct = async (evt)=>{
    evt.preventDefault();
    productData.img = imageProduct;
    let products = [...data.productos].concat(productData);
    data.productos = products;
    
    setProducto(defaultProduct)
    setImageProduct({preview : '', data : ''})
  }
  const  saveData = async (evt)=>{
    evt.preventDefault();
    const copy = data
    copy.almacen = valAlmacen
    copy.tipoPedido = valTipoPed
    copy.productos = [...data.productos].concat(productData)
    setData({
      ...data,
      tipoPedido : valTipoPed,
      almacen : valAlmacen
    })
    console.log(data);
    const token = cookieUser.user.token;
    setData(defaultData);
    setProducto(defaultProduct);    
    const responseProduct = await CreateProduct(data,token)
    if (!responseProduct.ok) return;
    if (imageProduct.data) {
      const formData = new FormData();
      formData.append("titleImage", data.nombre);
      formData.append("imgProduct",imageProduct.data);
  
      await SaveImgProduct(formData);
    }
  }
  return (
    <div>
        {visisble ? <ProveedorPopUp visible={visisble} changeVisible={showPopUp}></ProveedorPopUp> : null}
        <h1 >Lote de Productos Nro N° {generalData.numProducts}</h1>
        <section className='sec-personal-info'>
          <h2 className='title-2'>Datos Generales</h2>
          <div className='ctn-fields-3'>
            <div className='item-field'>
              <h3 className='title-3'>Fecha de Llegada</h3>
              <input className='input-field' type='date' value={defaultData.fecha_llegada} disabled={true}></input>
            </div>
            <div className='item-field'>
              <h3 className='title-3' >Proveedor</h3>
              {proveedor ? <ComboBoxProveedor proveedores={proveedor} showPopUp={showPopUp}></ComboBoxProveedor> : <CircularProgress/>}
            </div>
            <div className='item-field'>
              <h3 className='title-3'>Tipo Pedido</h3>
              {generalData.tipo_pedido ? <ComboBox setTipo={setValTipoPed} tipoPedido={generalData.tipo_pedido}/> : <CircularProgress/>}
            </div>
            <div className='item-field'>
              <h3 className='title-3'>Almacen</h3>
              {generalData.almacen ? <ComboBox setTipo={setValAlmacen} tipoPedido={generalData.almacen}/> : <CircularProgress/>}
            </div>
          </div>
        </section>
        <section className='sec-personal-info'>
          <h2 className='title-2'>Datos del Producto</h2>
          <div className='ctn-fields-3'>
            <div className='item-field'>
              <h3 className='title-3'>Código</h3>
              <input name='codigo' value={productData.codigo} onChange={onChangeProduct} placeholder='Ingrese el código' className='input-field'></input>
            </div>
            <div className='item-field'>
              <h3 className='title-3'>Nombre</h3>
              <input name='nombre' value={productData.nombre} onChange={onChangeProduct} placeholder='Ingrese el nombre del producto' className='input-field'></input>
            </div>
            <div className='ctn-fields-2'>
              <div className='item-field'>
                <h3 className='title-3'>Color</h3>
                <input name='color' value={productData.color} onChange={onChangeProduct} placeholder='Ingrese el color' className='input-field'></input>
              </div>
              <div className='item-field'>
                <h3 className='title-3'>P. Unitario (S/.)</h3>
                <input name='p_uni' value={productData.p_uni} onChange={onChangeProduct} placeholder='Ingrese el Precio' className='input-field' type='number' ></input>
              </div>
            </div>
          </div>
          <div className='ctn-fields-3'>
            <div className='ctn-fields-2'>
              <div className='item-field'>
                <h3 className='title-3'>Cantidad</h3>
                <input name='cantidad' value={productData.cantidad} onChange={onChangeProduct} placeholder='Ingrese la cantidad' className='input-field'></input>
              </div>
              <div className='item-field'>
                <h3 className='title-3'>N°Unidades</h3>
                <input name='n_uni' value={productData.n_uni} onChange={onChangeProduct} placeholder='Ingrese las unidades' className='input-field'></input>
              </div>
            </div>
            <div className='item-field'>
              <h3 className='title-3'>Marca</h3>
              {generalData.marca ? <ComBoBoxAdd marcas={generalData.marca}/> : <CircularProgress/>}
            </div>
            <div className='ctn-fields-2'>
              <div className='item-field'>
                <h3 className='title-3'>Talla Inicial (Ti)</h3>
                <input name='t_inicial' value={productData.t_inicial} onChange={onChangeProduct} placeholder='Ingrese la Talla inicial' className='input-field'></input>
              </div>
              <div className='item-field'>
                <h3 className='title-3'>Talla Final (Tf)</h3>
                <input name='t_final' value={productData.t_final} onChange={onChangeProduct} placeholder='Ingrese la Talla Final' className='input-field'></input>
              </div>
            </div>
          </div>
          <div className='ctn-drop-img'>
            <h3 className='title-3'>Imagen</h3>
            
              {
                imageProduct.preview ? <div className='ctn-img-product'>
                  <img className='img-product' src={imageProduct.preview} alt={`img-1`}></img>
                </div> : 
              <div className='ctn-item-dropzone'>
                <label className='item-dropzone' htmlFor='dropzone'>
                  <div className='dropzone'>
                    <span className="material-symbols-outlined">upload_file</span>
                    <p>Arrastra o sube una imagen</p>
                  </div>
                </label>
                <input id='dropzone' onChange={onChangeImage} type='file'></input>
              </div>
              }
            
          </div>
        </section>
        <section className='sec-btn-send'>
          <button className='btn-add' onClick={addProduct}><span>Agregar</span></button>
          <button className='btn-add-save' onClick={saveData}><span className="material-symbols-outlined">send</span><span>Agregar y Guardar</span></button>
        </section>
        <h1 className='title-1'>
          Productos {data.productos.length}
        </h1>
        <TableProducts row_names={row_names} products={data.productos} />
    </div>
  )
}

export default AddProduct;