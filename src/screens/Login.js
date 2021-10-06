import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, ScrollView, Image, Alert, Text } from 'react-native'
import { styles, COLORS } from '../global/styles'
import { API } from '../global/services'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Header from "../components/Header";

const Login = (props) => {
 
    const [password, setPassword] = useState("");
    const [usuario, setUsuario] = useState("");
    const [loading, setLoading] = useState(false);
    const [autoFocus, setAutoFocus] = useState(false);
    const { setAuth } = useContext(AuthContext)
    

    useEffect(() => {
        if(props.route.params && props.route.params.email) {
            setAutoFocus(true)
            setUsuario(props.route.params.email)
        }
    });


    const login = async () => {

        setLoading(true)
        const res = await API.POST.SignIn(usuario, password)

        if(!res.error) {
            if(res.message && Object.keys(res.message.data).length == 0) {
                Alert.alert("Inicio de Sesión", "Usuario y/o contraseña inválidos")
            } else {
                let userdata = res.message.data
                if(userdata.estado == 2) {
                    setPassword("")
                    setLoading(false)
                    return Alert.alert("Inicio de Sesión", "Tu cuenta aun no ha sido validada como Conductor. Por favor espera la confirmación via email.")
                } else if(userdata.estado != 1) {
                    setPassword("")
                    setLoading(false)
                    return Alert.alert("Inicio de Sesión", "Tu cuenta no está habilitada para iniciar sesión.")
                }
                return setAuth(true, res.message.data)
            }
        } else Alert.alert("Inicio de Sesión", "Hubo un error al consultar. Intente nuevamente.")

        setPassword("")
        setLoading(false)
    }
   
    const image = require("../../assets/bg2.jpg")
    const logo = require("../../assets/logo-color.png")
    const ondas = require("../../assets/ondas.png")
    const user = require("../../assets/user.png")

    return (
        <SafeAreaView style={styles.main}>
           
            <View style={{position:"relative", flex: 1}}>

                <Image
                    style={{ width: "100%", height: "100%", position: "absolute", left:0, top:0, zIndex:-2 }}
                    source={image}
                    resizeMode="cover"
                />

                <ScrollView>

                    <Header titleCenter=" " background="transparent" onBack={() => props.navigation.navigate("MainAuth")} />

                    <Image
                        style={{height: 300, position: "absolute", left:0, bottom:0, zIndex:-1 }}
                        source={ondas}
                        resizeMode="contain"
                    />

                    <View style={{flex:1, alignItems:"center", justifyContent:"center", paddingHorizontal:30, paddingBottom:300}}>
                        
                        <View style={{height:40}} />

                        <Image
                            style={{ width: "35%"}}
                            source={logo}
                            resizeMode="contain"
                        />
                        <View style={{height:40}} />

                        <Image
                            style={{ width: 40, height: 40}}
                            source={user}
                            resizeMode="contain"
                        />

                        <View style={{height:20}} />    

                        <TextInput
                            autoFocus={!autoFocus}
                            style={styles.input}
                            placeholder={"Correo Electrónico"}
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCompleteType='email'
                            value={usuario}
                            autoCapitalize="none"
                            onChangeText={v => setUsuario(v)}
                        />

                        <TextInput
                            autoFocus={autoFocus}
                            style={styles.input}
                            placeholder={"Contraseña"}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={v => setPassword(v)}
                            returnKeyType={'done'}
                            onSubmitEditing={() => login()}
                        />
                        <View style={{height:20}} />

                        <TouchableOpacity onPress={() => {}}>
                            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>

                        <View style={{height:30}} />

                        <Button 
                            loading={loading}
                            title="Ingresar"
                            buttonStyle={{minWidth:200}}
                            onPress={() => login()}
                        />
                    </View>
            
                </ScrollView>

            </View>
        </SafeAreaView >
    )
}

export default Login