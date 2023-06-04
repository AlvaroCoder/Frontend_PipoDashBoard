//"https://pipodashboard.fly.dev/" 
// "http://localhost:8080/"

const URL_DATABASE = "http://localhost:8080/client/data/"

export async function fetchDataClient(nro_doc) {
    return fetch(URL_DATABASE+nro_doc).then(async (val)=> await val.json())
}

