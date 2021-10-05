import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, KeyboardAvoidingView, Text, Platform, Image, ScrollView } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Header from "../components/Header";
import { API } from '../global/services'

const Express = (props) => {
 
    const [password, setPassword] = useState("");
    const [usuario, setUsuario] = useState("");

    const [state, _setState] = useState({});

   
    const moto = require("../../assets/moto.jpg")
    const bg = require("../../assets/bg-menu.png")


    const setState = async (value) => {
        //if(typeof value != "Object") return
        await _setState({...state, ...value})
    }

    const HacerPedido = async () => {

        console.log(state)
        const res = await API.POST.setService(state)
        console.log(res)
        //props.navigation.navigate("Status")
    }

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Solicita tu servicio" />
           
            <ScrollView>
                <View style={{paddingHorizontal:30}}>
                    
                    <View style={{flexDirection:"row", justifyContent:"center"}}>
                        <Image
                            style={{ width: "60%", height:150}}
                            source={moto}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={{height:20}} />
                    

                    <TextInput
                        style={styles.input}
                        placeholder={"Seleciona tu categoria"}
                        value={state.categoria}
                        onChangeText={v => setState({categoria: v})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Dirección de Recogida"}
                        value={state.dir1}
                        onChangeText={v => setState({dir1: v})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Dirección de Entrega"}
                        value={state.dir2}
                        onChangeText={v => setState({dir2: v})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Valor declarado"}
                        value={state.valor}
                        onChangeText={v => setState({valor: v})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Forma de Pago"}
                        value={state.forma}
                        onChangeText={v => setState({forma: v})}
                    />


                    <View style={{height:30}} />


    
                </View>

                <View style={{backgroundColor:COLORS.mainBlue, alignItems:"center", justifyContent:"center", borderTopLeftRadius:25, borderTopRightRadius:25, overflow:"hidden", height:200}}>
                    <View style={{height:10}} />
                    <Text style={[styles.H3, {color:"white"}]}>Domicilio</Text>
                    <Text style={[styles.H1, {color:"white", fontSize:28}]}>Express</Text>
                    <View style={{height:40}} />
                    <Button 
                        title="Solicitar"
                        buttonStyle={{minWidth:200}}
                        onPress={HacerPedido}
                    />
                    <View style={{height:30}} />


                </View>

            </ScrollView>

         
        </SafeAreaView >
    )
}

export default Express