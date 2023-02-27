import React, { useState, useMemo, useRef } from 'react'
import { createAutocomplete } from  '@algolia/autocomplete-core'
import { GetClientByLastName, GetClientByName } from '../Services/Database';

const AutoCompleteItem =({nombre, apellido, razon_social})=>{
    const saveItem =(evt)=>{
        evt.preventDefault();
        console.log(razon_social, nombre, apellido);
    }
    return <li onClick={saveItem} className='item-search'>{razon_social}-{nombre},{apellido}</li>
}

// Componente de busqueda al cliente, renderizado al inicio
function SearchClient(props) {

    const [autocompleteState, setAutocompleteState] = useState({
        collections : [],
        isOpen : false
    });
    const autocomplete = useMemo(() => createAutocomplete({
        placeholder : 'Ingresa el nombre o apellido',
        onStateChange : ({state})=>setAutocompleteState(state),
        getSources :  ()=>[
            {
                sourceId : "api_client_name",
                getItems : async ({ query })=>{
                    return await GetClientByName(query)
                    .then(async (res)=>{
                        return await res.json()
                    })
                }
            },
            {
                sourceId : "api_client_apellido",
                getItems : async ({query})=>{
                    return await GetClientByLastName(query)
                    .then(async (res)=>{
                        return await res.json()
                    })
                }
            }
        ],
        ...props
    }) , [props]);

    const formRef = useRef(null);
    const inputRef = useRef(null);
    console.log(inputRef);
    const panelRef = useRef(null);

    const formProps = autocomplete.getFormProps({
        inputElement : inputRef.current
    });
    const inputProps = autocomplete.getInputProps({
        inputElement : inputRef.current
    });
  return (
    <form ref={formRef} className='form-search' {...formProps}>
        <div className='ctn-form-search'>
            <input className='input-search-client'  ref={inputRef}  {...inputProps}></input>
        {
            autocompleteState.isOpen && (
                <div className='box-popup-clients' ref={panelRef}  {...autocomplete.getPanelProps()}>
                    {autocompleteState.collections.map((collections, index)=>{
                        const { items } = collections;
                        return (
                            <section key={`section-${index}`}>
                                {
                                    items.length > 0 && (
                                        <ul {...autocomplete.getListProps()}>
                                            {
                                                items.map(item => <AutoCompleteItem key={item.idcliente} {...item}/>)
                                            }
                                        </ul>
                                    ) 
                                }
                            </section>
                        )
                    })}
                </div>
            )
        }
        </div>
    </form>
    )
}

export default SearchClient;