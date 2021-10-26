import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Image, ScrollView, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import { CustomSelectPicker } from '../components/CustomSelectPicker'
import Header from "../components/Header";
import { API } from '../global/services'
import { values } from '../global/constants'

const Register = (props) => {
 


    const [state, _setState] = useState({});
    const [loading, setLoading] = useState(false);


    const setState = async (value) => {
        //if(typeof value != "Object") return
        await _setState({...state, ...value})
    }

    const signIn = async () => {
        
        state.tipo = "cliente"

        setLoading(true)
        const res = await API.POST.signUp(state)

        if(!res.error) {
            
            if(res.message && res.message.data && res.message.data.signup.data.affectedRows == 1) {
                Alert.alert("Registro", "El registro se realizó satisfactoriamente.")
                return props.navigation.navigate("singin", {email: state.email})
            } else {
                Alert.alert("Registro", "Hubo un error al ingresar la información. Intente nuevamente.") 
            }

        } else {
            Alert.alert("Registro", "Hubo un error al ingresar la información. Intente nuevamente.")
        }
        setLoading(false)
    }
   
    const image = require("../../assets/bg2.jpg")
    const logo = require("../../assets/logo-largo.png")
    const ondas = require("../../assets/ondas.png")

    return (
        <SafeAreaView style={styles.main}>
           
            <View style={{position:"relative", flex: 1}}>

                <Header titleCenter="Registro como cliente" background="transparent" onBack={() => props.navigation.goBack()} />

                <Image
                    style={{ width: "100%", height: "100%", position: "absolute", left:0, top:0, zIndex:-2 }}
                    source={image}
                    resizeMode="cover"
                />

                <ScrollView>

                     <View style={{paddingHorizontal:30, paddingBottom:200}}>
     
                        <View style={{flexDirection:"row", justifyContent:"center"}}>
                            <Image
                                style={{ width: "75%", height:50}}
                                source={logo}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={{height:20}} />
                        

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
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            value={state.password}
                            onChangeText={v => setState({password: v})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={"Teléfono Celular"}
                            textContentType='telephoneNumber'
                            keyboardType='number-pad'
                            value={state.celular}
                            onChangeText={v => setState({celular: v})}
                        />


                        <TextInput
                            style={styles.input}
                            placeholder={"Dirección"}
                            value={state.direccion}
                            onChangeText={v => setState({direccion: v})}
                        />
                        <View style={{flexDirection:"row"}}>
                            <View style={[styles.input, {width:"48%"}]}>
                                <CustomSelectPicker
                                    items={values["departamentos"]}
                                    style={{ justifyContent: 'center' }}
                                    onValueChange={v => setState({departamentos: v})}
                                    placeHolder="Departamento"
                                />
                            </View>
                            <View style={{width:"4%"}}/>
                            <View style={[styles.input, {width:"48%"}]}>
                                <CustomSelectPicker
                                    items={values["municipios"]}
                                    style={{ justifyContent: 'center' }}
                                    onValueChange={v => setState({municipios: v})}
                                    placeHolder="Municipio"
                                />
                            </View>
                        </View>
                        
                       
                        <View style={{height:30}} />

          
                        <View style={{alignItems:"center"}}>
                            <Button 
                                loading={loading}
                                title="Registrarme"
                                buttonStyle={{maxWidth:200}}
                                onPress={signIn}
                            />
                    
                            <View style={{height:20}} />
                    
                            <Button 
                                title="¡Quiero Ser Conductor!"
                                buttonStyle={{maxWidth:250}}
                                styleMode="outlineBlue"
                                onPress={() => props.navigation.navigate("singup2", {data: state})}
                            />
                        </View>
                       
                    </View>

                    <Image
                        style={{height: 300, position: "absolute", left:0, bottom:-50, zIndex:-1 }}
                        source={ondas}
                        resizeMode="contain"
                    />

                </ScrollView>

            </View>
        </SafeAreaView >
    )
}

export default Register