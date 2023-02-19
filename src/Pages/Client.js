import React from 'react'
import { useParams } from 'react-router-dom';

function Client({clients}) {
    const {nombre} = useParams()
    return (
    <div>Client : {nombre}</div>
    )
}

export default Client;