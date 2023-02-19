import React, { Fragment, useState } from 'react'
import { Combobox} from '@headlessui/react';
import {ChevronUpDownIcon} from '@heroicons/react/20/solid';


function ComboBoxProveedor({proveedores, showPopUp}) {
    const dataProveedor = [...proveedores]
    const [proveedor, setProveedor] = useState(proveedores[0] || '');
    const [query, setQuery] = useState('');
    const filterProveedor = query === '' ? dataProveedor : dataProveedor.filter((el)=>{
        return el.nombre.toLowerCase().includes(query.toLowerCase())
    })

  return (
    <Combobox value={proveedor} onChange={setProveedor}>
        <div className='ctn-combobox'>
            <div className='input-combobox'>
                <Combobox.Input
                className='input-field'
                displayValue={(tipo)=>tipo.nombre}
                onChange={(val)=>setQuery(val.target.value)}
                />
                <Combobox.Button className='btn-updown-icon'>
                    <ChevronUpDownIcon
                    className='updown-icon'
                    aria-hidden='true'
                    />
                </Combobox.Button>
            </div>
            <Combobox.Options className={'ctn-item-combobox'}>
                {filterProveedor.length === 0 && query !== ''? (
                    <div className='box-nothing'>
                        <button onClick={showPopUp} className='btn-save-add'>Agregar Proveedor</button>
                    </div>
                ):(
                    filterProveedor.map((val)=>(
                        <Combobox.Option
                        key={val.razon_social}
                        value={val}
                        as={Fragment}>
                            {({selected,active})=>{
                                <Fragment>
                                    <span id={`item-combobox${selected?'-bold':''}`} className={`item-combobox${active ? '-active' : ''}`}>
                                        {val.razon_social} - {val.nombre}
                                    </span>
                                </Fragment>
                            }}
                        </Combobox.Option>
                    ))
                ) }
            </Combobox.Options>
        </div>
    </Combobox>
    )
}

export default ComboBoxProveedor;