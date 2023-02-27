export function LoginUser(data={}) {
    return fetch('http://localhost:8087/admin/signin',{
        method : 'GET',
        headers:{
            'user-name': data.usuario,
            'user-password':data.contrasenna
        }
    })
};

export function GetClientByName(name) {
    return fetch(`http://localhost:8087/client/s/nombre/${name}`,{
        method : 'GET'
    })
}
export function GetClientByLastName(lastname) {
    return fetch(`http://localhost:8087/client/s/apellido/${lastname}`,{
        method : 'GET'
    })
}
export function SaveData(data, token) {
    return fetch('http://localhost:8087/client/',{
        method : 'POST',
        headers : {
            'Authorization' : String(token),
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
}
export function GetClients() {
    return fetch('http://localhost:8087/client/',{
        method : 'GET',
        mode : 'cors'
    })
}
export function GetGeneralData() {
    return fetch('http://localhost:8087/product/generalData',{
        method : 'GET',
        mode :'cors'
    })
}
export function CreateBrand(bodyData,token){
    return fetch('http://localhost:8087/product/marca',{
        method : 'POST',
        headers:{
            'Authorization':String(token),
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(bodyData)
    })
}

export function CreateProduct(bodyData, token) {
    return fetch('http://localhost:8087/product/',{
        method : 'POST',
        headers : {
            'Authorization':String(token),
            'Content-Type':'application/json'
        },
        body : JSON.stringify(bodyData)
    })
}
export function SaveImgProduct(img) {
    return fetch('http://localhost:8087/product/img',{
        method :'POST',
        mode : 'cors',
        body : img
    })
}
export function GetProveedor() {
    return fetch('http://localhost:8087/costumer/',{
        method : 'GET',
        mode :'cors'
    })
}