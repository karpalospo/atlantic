import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, KeyboardAvoidingView, Text, Platform, Image, ScrollView } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'

import Header from "../components/Header";
import StepIndicator from 'react-native-step-indicator';
import UserTitle from '../components/UserTitle'
import Card from '../components/Card'


const labels = ["En Proceso","Entregado","Cancelado"];

const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 9,
    currentStepStrokeWidth: 6,
    stepStrokeCurrentColor: COLORS.red,
    stepStrokeWidth: 6,
    stepStrokeFinishedColor: COLORS.red,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: COLORS.red,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: COLORS.red,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: COLORS.red,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: COLORS.red
}


const Status = (props) => {
 
    const [password, setPassword] = useState("");
    const [usuario, setUsuario] = useState("");
    const [currentPosition, setcurrentPosition] = useState(0);

    const currentUsuario = {
        nombres: "Carlos",
        apellidos: "Fernandez"
    }

    const image = require("../../assets/face.jpg")

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Estado del domicilio" onBack={() => props.navigation.navigate("HomeDomi")} />

            <View style={{flex:1}}>
                <ScrollView>

                    <Text style={[styles.p, {paddingHorizontal:20, fontSize:15}]}>
                        Tu servicio ha sido solicitado a las 3:00 pm {"\n"} La hora estimada de entrega a las 3:30 pm
                    </Text>

                    <View style={{height:10}} />

                    <StepIndicator
                        stepCount={3}
                        customStyles={customStyles}
                        currentPosition={currentPosition}
                        labels={labels}
                    />

                    <View style={{paddingHorizontal:30}}>
                        
                        <View style={{height:10}} />

                        <Card
                            categoria="Envío de documento"
                            dir1="Cra 51 # 79-155 Alto Prado"
                            dir2="Cra 50 # 82-155 La Manga"
                            valor="$12.000"
                            orden="2047563"
                        />

                        <View style={{height:20}} />


                        <View style={{borderWidth:1, borderColor:"#ddd", borderRadius: 8, padding:15}}>
                            <UserTitle 
                                type="Cliente" 
                                name={`${currentUsuario.nombres} ${currentUsuario.apellidos}`}
                                image={image} 
                            />  
                    

                            <View style={{height:20}} />

                        
                            <View style={[styles.row, {justifyContent:"center"}]}>
                                <Button title="Mensaje" onPress={() => {}} styleMode="blue" buttonStyle={{minWidth:120}} />
                                <View style={{width:20}}/>
                                <Button title="Llamar" onPress={() => {}} styleMode="blue" buttonStyle={{minWidth:120}} />
                            </View>
                        </View>

                        <View style={{height:30}} />

                    </View>

                

                </ScrollView>
            </View>

            <View style={{height:140, backgroundColor:COLORS.mainBlue, alignItems:"center", justifyContent:"flex-start", borderTopLeftRadius:25, borderTopRightRadius:25, overflow:"hidden"}}>

                <Text style={{paddingVertical:20, color:"white", fontSize:16}}>Reporta alertas durante tu recorrido</Text>
     
                <View style={{alignItems:"center"}} >
                    <Button 
                        title="Alertar"
                        styleMode="red"
                        buttonStyle={{minWidth:200}}
                        textStyle={{fontSize:18}}
                        onPress={() => props.navigation.navigate("Alert")}
                    />
                </View>

            </View>

         
        </SafeAreaView >
    )
}

export default Status

