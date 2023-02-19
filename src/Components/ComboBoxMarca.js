import React, {useState,Fragment} from 'react'
import {Combobox} from '@headlessui/react';
import {ChevronUpDownIcon} from '@heroicons/react/20/solid';
import { CreateBrand } from '../Services/Database';
import {useCookies} from 'react-cookie';
function ComboBoxMarca({marcas}) {
  const dataBrand = [...marcas];
  const [brand, setBrand] = useState(dataBrand[0]);
  const [query, setQuery] = useState('');
  const [reactCookie] = useCookies(['user'])
  const filterBrand = query === '' ? dataBrand : dataBrand.filter((el)=>el.nombre.toLowerCase().includes(query.toLowerCase()));
  const AddBrand = async()=>{
    const obj = {id : dataBrand.length+1, nombre : query.toUpperCase()}
    const token = reactCookie.user.token
    await CreateBrand(obj, token);
  }
  return (
    <Combobox value={brand} onChange={setBrand}>
      <div className='ctn-combobox'>
        <div className='input-combobox'>
          <Combobox.Input
          className='input-field'
          displayValue={(tipo) => tipo.nombre}
          onChange={(evt) => setQuery(evt.target.value)}
          />
          <Combobox.Button className='btn-updown-icon'>
            <ChevronUpDownIcon
              className='updown-icon'
              aria-hidden='true'
            />
          </Combobox.Button>
        </div>
        <Combobox.Options className='ctn-item-combobox'>
          {filterBrand.length === 0 && query !== '' ? (
            <div className='box-nothing'>
              <button className='btn-save-add' onClick={AddBrand}>Agregar</button>
            </div>
          ) : (filterBrand.map((tipo) => (
            <Combobox.Option
              key={tipo.id}
              value={tipo}
              as={Fragment} >
              {({ selected, active }) => (
                <>
                  <span id={`item-combobox${selected ? '-bold' : ''}`} className={`item-combobox${active ? '-active' : ''}`}>
                    {tipo.nombre}
                  </span>
                </>
              )}
            </Combobox.Option>
          )))}
        </Combobox.Options>
      </div>
    </Combobox>
    )
}

export default ComboBoxMarca;