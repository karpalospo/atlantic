export const URL = {
    HOST: 'https://www.droguerialaeconomia.com',
    server2: "http://api.atlantiexpress.com",
    S3: 'https://panel-economia.s3.amazonaws.com/economia/',

}



const HTTP_STATUS_CODE = {
    OK: 200,
    CORRECT: 201, 
    BAD_REQUEST: 400,
    FORBIDDEN: 401,
    NOT_FOUND: 404,
    ERROR_SERVER: 500,
    BAD_GATEWAY: 502,
}

const HEADER_JSON =  { 'content-type': 'application/json' } 
const HEADER_FORM_ENCODED =  {'Content-Type': 'application/x-www-form-urlencoded'}
const HEADER_FORM_DATA = {'content-type': 'multipart/form-data'}

const HTTP_REQUEST_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    HEAD: 'HEAD',
}


export const ROUTES = 
{
    MAIN: "principal",
    DICTIONARY: "diccionario",
    BABY: "cuidadobebe",
}


export const ORDER_BY = 
{
    PERCENT: "PJ",
    DESCRIPTION: "DS",
    GREATER: "MY", // From greater value to lower
    LOWER: "MN", // From lower value to greater
}

export const SEARCH_BY = 
{
    CODE: 'code',
    BAR_CODE: 'bar_code',
    TEXT: 'text',
}

export const IN_OFFER = 
{
    YES: "S",
    NO: "N",
}



const fetchAsync = async (url, method, { body = {}, headers = {'content-type': 'application/json'}} = {}) => 
{
    const form = (method === HTTP_REQUEST_METHOD.GET || method === HTTP_REQUEST_METHOD.HEAD) ? { method, headers } : { method, headers, body };
    let response = {
        error: true, 
        message: '',
    }

    try {
        const fetchResponse = await fetch(url, form); 
        
        response.error = (fetchResponse.status !== HTTP_STATUS_CODE.OK);
        response.message = await fetchResponse.json();
        
    } catch (error) {
        response.message = error;
    }

    return response;
}



export const API = {

    POST: {

        async SignIn (email, password) {
            return await fetchAsync(`${URL.server2}/signin`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify({email, password}), headers: HEADER_JSON});
        },

        async UpdateProfile (data) {
            return await fetchAsync(`${URL.server2}/update`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(data), headers: HEADER_JSON});
        },
        
        async getServices (params = {}) {
            return await fetchAsync(`${URL.server2}/services`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async getServices (params = {}) {
            return await fetchAsync(`${URL.server2}/services`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async myServices (params = {}) {
            return await fetchAsync(`${URL.server2}/myservices`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setService (params = {}) {
            return await fetchAsync(`${URL.server2}/service`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setServiceData (params = {}) {
            return await fetchAsync(`${URL.server2}/servicedata`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setFile (params = {}) {
            return await fetchAsync(`${URL.server2}/setfile`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setAlerta (params = {}) {
            return await fetchAsync(`${URL.server2}/setalerta`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async Calificar (params = {}) {
            return await fetchAsync(`${URL.server2}/calificar`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

 
        async signUp (fields)
        {
            const _fields = {
                email: fields.email, 
                nombres: fields.nombres,
                apellidos: fields.apellidos, 
                direccion: fields.direccion, 
                nacimiento: fields.nacimiento, 
                celular: fields.celular, 
                password: fields.password,
                municipio: fields.municipios.value,
                tipo: fields.tipo
            }

            if(fields.documento) _fields.documento = fields.documento
            if(fields.t_sangre) _fields.t_sangre = fields.tipoSangre.value
            

            let response = await fetchAsync(`${URL.server2}/signup/`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(_fields), headers: HEADER_JSON});
            
            if(!response.message.success)
            {
                response.error = true;
            }

            return response;
        },




    }
}


const FormUrlEncoded = (params) => 
{
    return Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
}


const TwoLevelFormUrlEncoded = (params) => 
{
    let urlEncoded = '';

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            for (const childkey in params[key]) {
                if (params[key].hasOwnProperty(childkey)) {
                    urlEncoded += encodeURIComponent(key + '[' + childkey + ']') + '=' + encodeURIComponent(params[key][childkey]) + '&';
                }
            }            
        }
    }
    
    return urlEncoded;
}


const ArrayFormUrlEncoded = (params) => 
{
    let urlEncoded = '';

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            for (const childkey in params[key]) {
                if (params[key].hasOwnProperty(childkey)) {
                    for (const childOfChildKey in params[key][childkey]) {
                        if (params[key][childkey].hasOwnProperty(childOfChildKey)) {
                            urlEncoded += encodeURIComponent(key + '[' + childkey + ']' + '[' + childOfChildKey + ']' ) + '=' + encodeURIComponent(params[key][childkey][childOfChildKey]) + '&';
                        }
                    }
                }
            }
        }
    }
    
    return urlEncoded;
}

