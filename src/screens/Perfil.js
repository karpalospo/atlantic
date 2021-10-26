import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Image, ScrollView, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'

import { values } from '../global/constants'
import Button from '../components/Button'
import { CustomSelectPicker } from '../components/CustomSelectPicker'
import Header from "../components/Header";
import UserTitle from '../components/UserTitle'
import { AuthContext } from '../context/AuthContext'
import { API } from '../global/services'



const Perfil = (props) => {
 
    const {getAuth, setAuth} = useContext(AuthContext)

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const [state, _setState] = useState({});


    useEffect(() => {
        async function init() {
            const user = await getAuth()
            setUser(user)
            setState({
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email,
                celular: user.celular,
                direccion: user.direccion,
            })
        }
        init()
        
    }, []);

    const setState = async (value) => {
        //if(typeof value != "Object") return
        await _setState({...state, ...value})
    }

    const updateProfile = async () => {
        let sendData = {...state}
        sendData.id = user.id
        setLoading(true)
        const res = await API.POST.UpdateProfile(sendData)
        setLoading(false)
        if(!res.error && res.message.success) {
            Alert.alert("Actualización", "La informacion se actualizó correctamente")
            setAuth(true, {...user, ...state})
        } else Alert.alert("Actualización", "Hubo un error al intentar grabar la información")
    }
   

    const image = require("../../assets/face.jpg")

    return (
        <SafeAreaView style={styles.main}>
           
            <View style={{position:"relative", flex: 1}}>

                <Header titleCenter="Editar Perfil" background="transparent" onBack={() => props.navigation.goBack()} />

                <ScrollView>

                     <View style={{paddingHorizontal:30, paddingBottom:200}}>
     
                        <View style={{height:20}} />
                        

                        <UserTitle name={user.shortname} image={image} type={user.tipo == "domi" ? "Domiciliario" : "Cliente"} />

                        <View style={{height:30}} />

                        <TextInput
                            style={styles.input}
                            placeholder={"Nombres"}
                            value={state.nombres}
                            onChangeText={v => setState({nombres: v})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={"Apellidos"}
                            value={state.apellidos}
                            onChangeText={v => setState({apellidos: v})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Correo Electrónico"
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoCompleteType='email'
                            value={state.email}
                            onChangeText={v => setState({email: v})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={"Teléfono Celular"}
                            value={state.celular}
                            onChangeText={v => setState({celular: v})}
                        />


                        <TextInput
                            style={styles.input}
                            placeholder={"Dirección"}
                            value={state.direccion}
                            onChangeText={v => setState({direccion: v})}
                        />
      
                        <View style={styles.input}>
                            <CustomSelectPicker
                                items={values["departamentos"]}
                                style={{ justifyContent: 'center' }}
                                onValueChange={v => setState({departamentos: v})}
                                placeHolder="Departamento"
                            />
                        </View>
                        <View style={styles.input}>
                            <CustomSelectPicker
                                items={values["municipios"]}
                                style={{ justifyContent: 'center' }}
                                onValueChange={v => setState({municipios: v})}
                                placeHolder="Municipio"
                            />
                        </View>
                       
                        <View style={{height:30}} />

          
                        <View style={{alignItems:"center"}}>
                            <Button 
                                loading={loading}
                                title="Actualizar"
                                buttonStyle={{minWidth:200}}
                                onPress={updateProfile}
                            />
                    
                            <View style={{height:20}} />
                    
        
                        </View>
                       
                    </View>


                </ScrollView>

            </View>
        </SafeAreaView >
    )
}

export default Perfil