import React,{useState } from 'react'
import { CreateProduct, GetGeneralData, GetProveedor, SaveImgProduct } from '../Services/Database';
import '../Assets/Components/AddProduct.css';
import {  FormControl, Select, MenuItem } from '@mui/material';
import { formatDate } from '../Services/Time';
import { useCookies } from 'react-cookie';
import { InputPrice } from '../Components';
import { CheckIcon } from '@heroicons/react/20/solid';

const defaultData = {
  fecha_llegada : formatDate(new Date()),
  proveedor : '',
  productos : []
}
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
  const [igv, setIgv] = useState(true);
  const [imageProduct, setImageProduct] = useState({
    preview : "",
    data : ""
  });
  const [cookieUser] = useCookies(['user'])

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
  const changeIgv = (evt)=>{
    evt.preventDefault();
    setIgv(!igv);
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
        <h1>Nuevo Producto</h1>
        <div className='form-type'>
          <div className='item-field'>
            <h3 className='title-3'>Nombre</h3>
            <input type='text' className='input-field'></input>
          </div>
          <div className='item-field'>
            <h3 className='title-3'>Codigo</h3>
            <input type='text' className='input-field'></input>
          </div>
          <div className='item-field'>
            
            <h3 className='title-3'>Precio Unitario</h3>
            <InputPrice/>
            <button onClick={changeIgv} className={`btn-${igv ? 'active' : 'inactive'}`} id='igv'>{igv ? <p style={{display:'flex',flexDirection:'row',alignItems:'center'}}><span>Con IGV </span><CheckIcon style={{width:'20px',marginLeft:'5px'}}/> </p> : <p>Sin IGV </p>}</button>
          </div>
        </div>
    </div>
  )
}

export default AddProduct;