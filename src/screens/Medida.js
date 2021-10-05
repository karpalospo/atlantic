import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, KeyboardAvoidingView, Text, Platform, Image, ScrollView } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Header from "../components/Header";


const Medida = (props) => {
 
    const [password, setPassword] = useState("");
    const [usuario, setUsuario] = useState("");


   
    const parado = require("../../assets/parado.jpg")
    const bg = require("../../assets/bg-menu.png")


    const HacerPedido = () => {

        props.navigation.navigate("Status")
    }
    

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Solicita tu servicio" />
           
                   
            <ScrollView>
                <View style={{paddingHorizontal:30}}>
                    

                    <View style={{height:20}} />
                    

                    <TextInput
                        style={styles.input}
                        placeholder={"Seleciona tu categoria"}
                        value={usuario}
                        onChangeText={(e) => setUsuario(e)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Dirección de Recogida"}
                        value={usuario}
                        onChangeText={(e) => setUsuario(e)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Dirección de Entrega"}
                        value={usuario}
                        onChangeText={(e) => setUsuario(e)}
                    />

                    

                    <TextInput
                        style={styles.input}
                        placeholder={"Valor declarado"}
                        value={usuario}
                        onChangeText={(e) => setUsuario(e)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Forma de Pago"}
                        value={usuario}
                        onChangeText={(e) => setUsuario(e)}
                    />


                    <View style={{height:30}} />


    
                </View>

                <View style={{backgroundColor:COLORS.mainBlue, alignItems:"center", justifyContent:"center", borderTopLeftRadius:25, borderTopRightRadius:25, overflow:"hidden", height:200}}>
                    <View style={{height:10}} />
                    <Text style={[styles.H3, {color:"white"}]}>Domicilio</Text>
                    <Text style={[styles.H1, {color:"white", fontSize:28}]}>A la medida</Text>
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

export default Medida