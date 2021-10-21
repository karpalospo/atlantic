import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, TextInput, Alert, Image, ScrollView } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import { CustomSelectPicker } from '../components/CustomSelectPicker'
import Header from "../components/Header";
import { API } from '../global/services'

const Register = (props) => {
 
    const values = {
        tipoSangre: [{id: "0", label: "A+", value: "A+"}, {id: "1", label: "A-", value: "A-"}],
        departamentos: [{id: "0", label: "Atlántico", value: "1"}, {id: "1", label: "Bolivar", value: "2"}],
        municipios: [{id: "0", label: "Barranquilla", value: "1"}, {id: "1", label: "Soledad", value: "2"}] 
    }

    const [state, _setState] = useState(props.route.params.data || {});
    const [loading, setLoading] = useState(false);


    const setState = async (value) => {
        await _setState({...state, ...value})
    }

    useEffect(() => {
  

    });

   
    const image = require("../../assets/bg2.jpg")
    const logo = require("../../assets/logo-largo.png")

    const signUp = async () => {
        //props.navigation.navigate("singup3", {user_id: 69})

        
        state.tipo = "domi"

        setLoading(true)
        console.log(state)
        const res = await API.POST.signUp(state)
        console.log(res)
        if(!res.error) {
            
            if(res.message && res.message.data && res.message.data.signup.data.affectedRows == 1) {
                props.navigation.navigate("singup3", {user_id: res.message.data.signup.data.insertId})
            } else {
                Alert.alert("Registro", "Hubo un error al ingresar la información. Intente nuevamente.") 
            }

        } else {
            Alert.alert("Registro", "Hubo un error al ingresar la información. Intente nuevamente.")
        }
        setLoading(false)

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
            
                    <View style={{flexDirection:"row"}}>
                        <View style={{width:"68%"}}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Documento"}
                                keyboardType="numeric"
                                value={state.documento}
                                onChangeText={v => setState({documento: v})}
                            />
                        </View>
                        <View style={{width:"4%"}}/>
                        <View style={[styles.input, {width:"28%"}]}>
                            <CustomSelectPicker
                                items={values["tipoSangre"]}
                                style={{ justifyContent: 'center' }}
                                onValueChange={v => setState({tipoSangre: v})}
                                placeHolder="Tipo de Sangre"
                            />
                        </View>
                    </View>

                    
                    <View style={{height:30}} />

                    <View style={{alignItems:"center"}} >
                        <Button 
                            loading={loading}
                            title="Continuar"
                            styleMode="blue"
                            buttonStyle={{minWidth:200}}
                            textStyle={{fontSize:18}}
                            onPress={signUp}
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

const style = {
    attach: {height:60, marginVertical: 5, flexDirection:"row", justifyContent:"space-between", backgroundColor: "#eee", borderWidth: 1, borderColor:"#ddd", padding:20, borderRadius: 10}
}