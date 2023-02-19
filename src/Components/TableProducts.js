import React from 'react'

function TableProducts({row_names,products}) {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    {
                        row_names.map(names=>{
                            return <th key={names}>{names}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        products.map(product=>{
                            let len_same = product.length === row_names.length;
                            if (len_same) {
                                console.log(                                Object.keys(product)                                );
                                return (
                                    <tr key={product.nombre}>
                                        <td>{product.nombre}</td>
                                        <td>{product.codigo}</td>
                                        <td><img src={product.img.preview} alt={`img`}></img></td>
                                        <td>{product.t_inicial}</td>
                                        <td>{product.t_final}</td>
                                        <td>{product.p_uni}</td>
                                    </tr>
                                )                                
                            }
                            return <th><p>No match length of row</p></th>
                        })
                    }
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default TableProducts;