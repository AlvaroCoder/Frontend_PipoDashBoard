import { useState, useContext, createContext } from 'react';

//
const costumerData = {
    nombre : String,
    contrasenna : String,
    contrasenna_hash : String,
    email : String,
    isLogin : false
}


const errorData ={
    message : ''
}

const costumerContext = createContext(costumerData);

export function useCostumer() {
    return useContext(costumerContext);
}

export default function CostumerContext({children}) {
    const [costumer, setCostumer] = useState(costumerData);

    return (
        <costumerContext.Provider value={costumer}>
            {children}
        </costumerContext.Provider>
    )
}