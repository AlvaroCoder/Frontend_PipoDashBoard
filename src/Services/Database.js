
// process.env.REACT_APP_API_ENDPOINT
//"https://pipodashboard.fly.dev/" 
const API_URL =  'http://localhost:8080/'

export function LoginUser(data={}) {
    return fetch(`${API_URL}admin/signin`,{
        method : 'GET',
        headers:{
            'user-name': data.usuario,
            'user-password':data.contrasenna
        }
    })
};
export function GetClientById(idcliente) {
    return fetch(`${API_URL}client/${idcliente}`,{
        method : 'GET',
        mode :'cors'
    })
}
export function GetClientByName(name) {
    return fetch(`${API_URL}client/s/nombre/${name}`,{
        method : 'GET'
    })
}
export function GetClientByLastName(lastname) {
    return fetch(`${API_URL}client/s/apellido/${lastname}`,{
        method : 'GET'
    })
}
export function SaveData(data, token) {
    return fetch(`${API_URL}client/`,{
        method : 'POST',
        headers : {
            'Authorization' : String(token),
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
}

export function SaveProveedor(data, token) {
    return fetch(`${API_URL}proveedor/`,{
        method : 'POST',
        headers : {
            'Authorization' : String(token),
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data) 
    })
}

export function SaveClient(data, token) {
    return fetch(`${API_URL}client/`,{
        method : 'POST',
        mode : 'cors',
        headers : {
            'Authorization' : String(token),
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
}
export function GetClients() {
    return fetch(`${API_URL}client/`,{
        method : 'GET',
        mode : 'cors'
    })
}
export function GetGeneralData() {
    return fetch(`${API_URL}product/generalData`,{
        method : 'GET',
        mode :'cors'
    })
}
export function CreateBrand(bodyData,token){
    return fetch(`${API_URL}product/marca`,{
        method : 'POST',
        headers:{
            'Authorization':String(token),
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(bodyData)
    })
}

export function CreateProduct(bodyData, token) {
    return fetch(`${API_URL}product/`,{
        method : 'POST',
        headers : {
            'Authorization':String(token),
            'Content-Type':'application/json'
        },
        body : JSON.stringify(bodyData)
    })
}
export function SaveImgProduct(img) {
    return fetch(`${API_URL}product/img`,{
        method :'POST',
        mode : 'cors',
        body : img
    })
}
export function GetProveedor() {
    return fetch(`${API_URL}costumer/`,{
        method : 'GET',
        mode :'cors'
    })
}

export function GetCategory() {
    return fetch(`${API_URL}product/categoria`,{
        method : 'GET',
        mode : 'cors'
    })
}

export function DeleteClient(idcliente,token) {
    return fetch(`${API_URL}client/`,{
        method : 'DELETE',
        mode : 'cors',
        headers : {
            'Authorization':String(token),
            'client-id' : String(idcliente)
        }
    })
}
