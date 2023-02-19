export function LoginUser(data={}) {
    return fetch('http://localhost:8086/admin/signin',{
        method : 'GET',
        headers:{
            'user-name': data.usuario,
            'user-password':data.contrasenna
        }
    })
};
export function ScrapperUser(razon_social) {
    if (String(razon_social).length === 8) {
        return fetch(`http://localhost:8086/client/dni/${razon_social}`,{
            method : 'GET',
            mode : 'cors'
        })
    }
    if (String(razon_social).length === 11) {
        return fetch(`http://localhost:8086/client/ruc/${razon_social}`,{
            method : 'GET',
            mode : 'cors'
        })
    }
}
export function SaveData(data, token) {
    return fetch('http://localhost:8086/client/',{
        method : 'POST',
        headers : {
            'Authorization' : String(token),
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
}
export function GetClients() {
    return fetch('http://localhost:8086/client/',{
        method : 'GET',
        mode : 'cors'
    })
}
export function GetGeneralData() {
    return fetch('http://localhost:8086/product/generalData',{
        method : 'GET',
        mode :'cors'
    })
}
export function CreateBrand(bodyData,token){
    return fetch('http://localhost:8086/product/marca',{
        method : 'POST',
        headers:{
            'Authorization':String(token),
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(bodyData)
    })
}

export function CreateProduct(bodyData, token) {
    return fetch('http://localhost:8086/product/',{
        method : 'POST',
        headers : {
            'Authorization':String(token),
            'Content-Type':'application/json'
        },
        body : JSON.stringify(bodyData)
    })
}
export function SaveImgProduct(img) {
    return fetch('http://localhost:8086/product/img',{
        method :'POST',
        mode : 'cors',
        body : img
    })
}
export function GetProveedor() {
    return fetch('http://localhost:8086/costumer/',{
        method : 'GET',
        mode :'cors'
    })
}