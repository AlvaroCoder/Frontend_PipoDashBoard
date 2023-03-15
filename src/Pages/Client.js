import React from 'react'
import { useParams } from 'react-router-dom';

function Client() {
    const {idcliente} = useParams();
    console.log("🚀 ~ file: Client.js:6 ~ Client ~ idcliente:", idcliente)
    
    return (
    <div>
        Bienvenido Cliente : {idcliente}
    </div>
    )
}

export default Client;