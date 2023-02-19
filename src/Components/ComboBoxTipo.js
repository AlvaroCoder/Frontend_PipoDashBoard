import React,{useState,Fragment} from 'react'
import {Combobox, Transition} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

function ComboBoxTipo({tipoPedido, setTipo}) {
    const dataTipo = [...tipoPedido];
    const [selected, setSelected] = useState(dataTipo[0])
    const [query, setQuery] = useState('');
    const filterTipo = query === '' ? dataTipo : dataTipo.filter((el)=>el.nombre.toLowerCase().includes(query.toLowerCase()));
    const displayTipo = (tipo)=>{
        setTipo(tipo.nombre);
        return tipo.nombre
    }

    return (
        <Combobox value={selected}  onChange={setSelected}>
            <div className='ctn-combobox'>
                <div className='input-combobox'>
                    <Combobox.Input 
                        className='input-field'
                        displayValue={displayTipo}
                        onChange={(evt)=>setQuery(evt.target.value)}/>
                    <Combobox.Button className='btn-updown-icon'>
                        <ChevronUpDownIcon
                        className='updown-icon'
                        aria-hidden = 'true'
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    afterLeave={() => setQuery('')}
                >
                <Combobox.Options className='ctn-item-combobox'>
                {filterTipo.length === 0 && query !== '' ? (
                    <div className='box-nothing'>
                        <p>No existe</p>
                    </div>
                ) : (filterTipo.map((tipo)=>(
                        <Combobox.Option  
                            key={tipo.id} 
                            value={tipo} 
                            as={Fragment} 
                            >
                            {({selected,active})=>(
                                <>
                                    <span id={`item-combobox${selected?'-bold':''}`} className={`item-combobox${active ? '-active':''}`}>
                                        {tipo.nombre}
                                    </span>
                                </>
                            )}
                        </Combobox.Option>
                    )))}
                </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}

export default ComboBoxTipo;