import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import { CustomSelectPicker } from '../components/CustomSelectPicker'
import Header from "../components/Header";
import UserTitle from '../components/UserTitle'
import { AuthContext } from '../context/AuthContext'
import { API } from '../global/services'

const Perfil = (props) => {
 
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);


    const [state, _setState] = useState({oldpassword:"", password:"", password2:""});

    const { getAuth} = useContext(AuthContext)

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

        if(state.oldpassword.trim() == "") return Alert.alert("Error de Validación", "Escriba la contraseña anterior")
        if(state.password.trim() == "") return Alert.alert("Error de Validación", "Escriba una contraseña nueva")
        if(state.password.trim() != state.password2.trim()) return Alert.alert("Error de Validación", "La confirmación de la contraseña no coincide")

        let sendData = {...state}
        sendData.id = user.id
        setLoading(true)
        const res = await API.POST.UpdateProfile(sendData)
        setLoading(false)
        console.log(res)
        if(!res.error && !res.message.error) {
            Alert.alert("Actualización", "La informacion se actualizó correctamente")
            setState({oldpassword: "", password: "", password2: ""})
        } else {
            if(res.message && res.message.data) Alert.alert("Actualización", res.message.data.errorText)
            else Alert.alert("Actualización", "Hubo un error al intentar grabar la información")
        }
    }
   

    const image = require("../../assets/face.jpg")

    return (
        <SafeAreaView style={styles.main}>
           
            <View style={{position:"relative", flex: 1}}>

                <Header titleCenter="Editar Contraseña" background="transparent" onBack={() => props.navigation.goBack()} />

                <ScrollView>

                     <View style={{paddingHorizontal:30, paddingBottom:200}}>
     
                        <View style={{height:20}} />
                        

                        <UserTitle name={`${user.nombres} ${user.apellidos}`} image={image} type={user.tipo == "domi" ? "Domiciliario" : "Cliente"} />

                        <View style={{height:30}} />

                        <TextInput
                            style={styles.input}
                            placeholder={"Contraseña Anterior"}
                            value={state.oldpassword}
                            onChangeText={v => setState({oldpassword: v})}
                        />
    
                        <TextInput
                            style={styles.input}
                            placeholder="Nueva Contraseña"
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoCompleteType='email'
                            value={state.password}
                            onChangeText={v => setState({password: v})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={"Confirmar Contraseña"}
                            value={state.password2}
                            onChangeText={v => setState({password2: v})}
                        />

                       
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