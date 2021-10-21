import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, Image, ScrollView, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import File from '../components/File'
import Header from "../components/Header";
import { API } from '../global/services'


const Register = (props) => {
 
    const [loading, setLoading] = useState(false);
    const [userid, setUserid] = useState(props.route.params.user_id || 0);


    const signInFiles = async () => {

        let ret = false
        ids.forEach(item => {
            if(!files[item]) ret = true
        })

        if(ret) {
            Alert.alert("Registro", "Debe subir todos los archivos")
            return
        }

        return props.navigation.navigate("singupconfirm")

        
    }

    let files = {}
    const ids = ["cc", "propiedad", "licencia", "tecno", "soat"]

    const image = require("../../assets/bg2.jpg")
    const logo = require("../../assets/logo-largo.png")

    const cb = async (id, type, value) => {

        console.log(id, type, value)
        if(type == "complete") {
            const res = await API.POST.setFile({
                user_id: userid,
                archivo: value.url,
                label: id
            })
            console.log(res)
            if(!res.error && res.message.data.files.data.affectedRows > 0) {
                files[id] = true
            } else {
                Alert.alert("Registro", "Ocurrió un error al subir el archivo. Intente nuevamente")
            }
        }
    }


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


                    <File title="Revisión Tecnomecánica" id="tecno" callback={cb} />
                    <File title="Licencia de conducir" id="licencia" callback={cb} />
                    <File title="Fotocopia de cédula" id="cc" callback={cb} />
                    <File title="Tarjeta de propiedad" id="propiedad" callback={cb} />
                    <File title="SOAT" id="soat" callback={cb} />
   
                    <Text style={[styles.p, {color: "red"}]}>El tamaño de cada archivo no debe superar los 2 MB</Text>
                    <View style={{height:20}} />

                    <View style={styles.rowCenter}>
                        <Button 
                            title="Registrarme"
                            buttonStyle={{minWidth:200}}
                            onPress={signInFiles}
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

