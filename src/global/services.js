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

        async search(search, location) {
            return await fetchAsync(`${URL.server2}/search`, HTTP_REQUEST_METHOD.POST, { body: FormUrlEncoded({search, location}), headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        },

        async checkEmail(email) {
            return await fetchAsync(`${URL.HOST}/economia/site/users/sendemailrestore`, HTTP_REQUEST_METHOD.POST, { body: FormUrlEncoded({ email}), headers:  {'Content-Type': 'application/x-www-form-urlencoded'}});
        },

        async cambiarContrasena(email, code, password) {
            return await fetchAsync(`${URL.HOST}/economia/site/users/restorepassv2`, HTTP_REQUEST_METHOD.POST, { body: FormUrlEncoded({ email, code, password}), headers:  {'Content-Type': 'application/x-www-form-urlencoded'}});
        },

        async SignIn (email, password)
        {
         
            return await fetchAsync(`${URL.server2}/signin`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify({email, password}), headers: HEADER_JSON});

        },

        async getServices (params = {})
        {
         
            return await fetchAsync(`${URL.server2}/services`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});

        },

        async setService (params = {})
        {
         
            return await fetchAsync(`${URL.server2}/service`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});

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
                documento: fields.documento, 
                t_sangre: fields.phone,
                tipo: fields.tipo
            }
console.log(JSON.stringify(_fields))
            let response = await fetchAsync(`${URL.server2}/signup/`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(_fields), headers: HEADER_JSON});
            
            if(!response.message.success)
            {
                response.error = true;
            }

            return response;
        },

        async getPedido(id) {
            return await fetchAsync(`${URL.HOST}/economia/api/pedidos/getbyid/${id}`, HTTP_REQUEST_METHOD.POST)
        },

        async PerformPasswordRecovery (email)
        {
            let response = await fetchAsync(`${URL.HOST}/economia/site/users/restore/`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify({email}),});
            
            if(!response.message.success)
            {
                response.error = true;
            }

            return response;
        },


        async PerformEditProfile(document, name, email, token, {password = '', newName, newDocument, dateOfBirth, phone, cellphone})
        {
            let response = {
                error: false,
                message: '',
            }

            const _fields = {
                userInfo: {    
                    nit: document,
                    email,
                    nombres: name, 
                    auth_token: token,
                },
                user: {
                    email,
                    password,
                    confirm_password: password,
                    nombres: newName, 
                    nit: newDocument,
                    fecha_nacimiento: dateOfBirth,
                    celular: cellphone,
                    telefono: phone,
                }
            }
            
            response = await fetchAsync(`${URL.HOST}/economia/site/users/updateUserProfile`, HTTP_REQUEST_METHOD.POST, {body: TwoLevelFormUrlEncoded(_fields), headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
            
            if(!response.message.success)
            {
                response.error = true;
            }
            

            return response;

        },



        async PerformValidateTypeOfCoupon (typeOfCoupon, products) 
        {            
            let response = await fetchAsync(`${URL.HOST}/economia/api/validaCondiciones/`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify({Condicion: typeOfCoupon, Productos: products})});
            
            if(!response.message.Success)
            {
                response.error = true;
            }

            return response;

        },

        async checkout(a, b, c, d, e) {
            return await fetchAsync(`${URL.server2}/checkout`, HTTP_REQUEST_METHOD.POST, {body: 
                FormUrlEncoded(a) + '&' +
                TwoLevelFormUrlEncoded(b) + 
                TwoLevelFormUrlEncoded(c) +
                TwoLevelFormUrlEncoded(d) +
                ArrayFormUrlEncoded(e), headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        },

        async ValidateToken (document, name, email, token)
        {
            const _fields = {
                nit: document,
                email,
                nombres: name, 
                auth_token: token,
            }

            let response = await fetchAsync(`${URL.HOST}/economia/site/users/validateToken/`, HTTP_REQUEST_METHOD.POST, {body: FormUrlEncoded(_fields), headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
            
            if(!response.message.success)
            {
                response.error = true;
            }

            return response;

        },

        // Delete address /economia/site/users/deleteMyDirecciones
        /*
            body: url-encode
            userInfo: loginCtrl.getUserInfo(),
            MyDireccion: {
                nombre_direccion: nombre_direccion
            }
        */
    },
    PUT: {

    },
    DELETE: {

    },
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

