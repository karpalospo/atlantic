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

    const image = require("../../assets/face.jpg")

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Estado del domicilio" onBack={() => props.navigation.navigate("Home")} />
           
            <ScrollView>

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
                        status="Entregado"
                        fechaStatus="Sept 10 10:30pm"
                        categoria="Envío de documento"
                        dir1="Cra 51 # 79-155 Alto Prado"
                        dir2="Cra 50 # 82-155 La Manga"
                        valor="$12.000"
                        orden="2047563"
                    />

                    <View style={{height:20}} />

                    <UserTitle 
                        domiMode 
                        name="Benito Suarez" 
                        image={image} 
                        data={{placa: "BMX081", rep: 4.7}}
                        
                    />  
                

                    <View style={{height:50}} />

                    <View style={[styles.row, {justifyContent:"center"}]}>
                        <Button title="Mensaje" onPress={() => {}} styleMode="blue" buttonStyle={{minWidth:150}} />
                        <View style={{width:20}}/>
                        <Button title="Llamar" onPress={() => {}} styleMode="blue" buttonStyle={{minWidth:150}} />
                    </View>

                    <View style={{height:30}} />

                </View>

               

            </ScrollView>

         
        </SafeAreaView >
    )
}

export default Status

