import React, { useState, useMemo, useRef } from 'react'
import { createAutocomplete } from  '@algolia/autocomplete-core'
import { GetClientByLastName, GetClientByName } from '../Services/Database';
import { Link } from 'react-router-dom';

const AutoCompleteItem =({idcliente,nombre, apellido, documento,url})=>{
    const saveItem =(evt)=>{
        evt.preventDefault();
    }
    return <Link style={{textDecoration:'none'}} to={`/cliente/${idcliente}`}>
        <li onClick={saveItem} className='item-search'>
        <div className='img-item-search'>
            <img className='icon' src={url} alt='icon avatar'></img>
        </div>
        <div className='content-item-search'>
            <h2 className='title-2'>{apellido}, {nombre}</h2>
            <p><strong>{documento===0?'SIN DOCUMENTO':String(documento).length===8?'DNI':String(documento).length===11?'RUC':null}</strong> {documento}</p>
        </div>
        </li>
    </Link>
}

function SearchClient(props) {
    const [autocompleteState, setAutocompleteState] = useState({
        collections : [],
        isOpen : false
    });
    const autocomplete = useMemo(() => createAutocomplete({
        placeholder : 'Buscar ...',
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
                                                items.map((item) => <AutoCompleteItem key={item.idcliente} {...item}/>)
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