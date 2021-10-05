import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, Image, ScrollView, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import File from '../components/File'
import Header from "../components/Header";
import { API } from '../global/services'

const Register = (props) => {
 


    const [state, _setState] = useState(props.route.params.data || {});
    const [loading, setLoading] = useState(false);

    const setState = async (value) => {
        await _setState({...state, ...value})
    }

    useEffect(() => {
    

    });

    const signIn = async () => {

        state.tipo = "domi"

        setLoading(true)
        const res = await API.POST.signUp(state)

        if(!res.error) {
            
            if(res.message && res.message.data && res.message.data.signup.data.affectedRows == 1) {
                return props.navigation.navigate("singupconfirm")
            } else {
                Alert.alert("Registro", "Hubo un error al ingresar la información. Intente nuevamente.") 
            }

        } else {
            Alert.alert("Registro", "Hubo un error al ingresar la información. Intente nuevamente.")
        }
        setLoading(false)
        
    }

    const imageCallback = (result) => {
        console.log(result)
    }
   
    const image = require("../../assets/bg2.jpg")
    const logo = require("../../assets/logo-largo.png")


    return (
        <SafeAreaView style={styles.main}>
                  
            <Header titleCenter="Registro como domiciliario" background="transparent" onBack={() => props.navigation.goBack()} />

            <ScrollView>

                <View style={{paddingHorizontal:30, paddingBottom:30}}>
                    
                    <View style={{flexDirection:"row", justifyContent:"center"}}>
                        <Image
                            style={{ width: "75%", height:50}}
                            source={logo}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.p}>Para poder solicitar aprobación, es necesario que adjuntes los siguientes documentos legibles.</Text>
                    <View style={{height:20}} />


                    <File title="Revisión Tecnomecánica" callback={imageCallback} />
                    <File title="Licencia de conducir" callback={imageCallback} />
                    <File title="Fotocopia de cédula" callback={imageCallback} />
                    <File title="Revisión Tecnomecánica" callback={imageCallback} />
                    <File title="Tarjeta de propiedad" callback={imageCallback} />
                    <File title="SOAT" callback={imageCallback} />
   
                    <Text style={[styles.p, {color: "red"}]}>El tamaño de cada archivo no debe superar los 2 MB</Text>
                    <View style={{height:20}} />

                    <View style={styles.rowCenter}>
                        <Button 
                            title="Registrarme"
                            buttonStyle={{minWidth:200}}
                            onPress={signIn}
                        />
                    </View>
                </View>

            </ScrollView>

            <Image
                style={{ width: "100%", height: "100%", position: "absolute", left:0, top:0, zIndex:-2 }}
                source={image}
                resizeMode="cover"
            />
      
        </SafeAreaView >
    )
}

export default Register

