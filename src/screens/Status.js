import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Linking, Text, Platform, Image, ScrollView, ActivityIndicator } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'

import Header from "../components/Header";
import StepIndicator from 'react-native-step-indicator';
import UserTitle from '../components/UserTitle'
import Card from '../components/Card'
import { UtilitiesContext } from '../context/UtilitiesContext'
import { API } from '../global/services'



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
 
    const [currentPosition, setcurrentPosition] = useState(0);
    const [domiciliario, setDomiciliario] = useState(false);
    const { loopServicesID } = useContext(UtilitiesContext)

    const [userDomi, setUserDomi] = useState(false);

    const [data, setData] = useState(false);
    const [user, setUser] = useState(false);
    const [extradata, setExtradata] = useState({});

    const image = require("../../assets/face.jpg")

    const callback = (data) => {
        if(data.domi) {
            if(data.domi.nombres) {
                let nombres = data.domi.nombres.split(" ")
                let apellidos = data.domi.apellidos.split(" ")

                data.domi.shortname = data.domi.nombres + " " + data.domi.apellidos
                if(nombres.length > 0) data.domi.shortname = nombres[0]
                if(apellidos.length > 0) data.domi.shortname += " " + apellidos[0]
            }

            setUserDomi(data.domi)
        }
        setExtradata(data)

    }

    async function setStatus() {
        if(!data) return
        await API.POST.setServiceData({orden: data.orden, user})
    }

    useEffect(() => {
        setData(props.route.params.data)
        setUser(props.route.params.user)
        loopServicesID(props.route.params.data.orden, callback)
        setStatus()
    });


    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Estado del domicilio" navigation={props.navigation} onBack={() => props.navigation.navigate("Home")} />
           
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

                    {data && 
                    <Card
                        status={data.status}
                        fechaStatus={data.fecha}
                        categoria={data.categoria}
                        dir1={data.dir1}
                        dir2={data.dir2}
                        valor={data.valor}
                        orden={data.orden}
                    />
                    }

                    <View style={{height:20}} />


                    {!userDomi &&
                    <View>
                        <ActivityIndicator color="#999" />
                        <Text style={styles.p}>Esperando respuesta de un domiciliario</Text>
                        <Text style={{fontSize:13, color:"#999", textAlign:"center", marginBottom:30}}>59 Segundos...</Text>
                        <View style={[styles.row, {justifyContent:"center"}]}>
                            <Button title="Cancelar" onPress={() => {}} styleMode="red" buttonStyle={{minWidth:150}} />
                        </View>
                    </View>
                    }
                    {userDomi && 
                    <View>
                        <UserTitle 
                            domiMode 
                            name={userDomi.shortname}
                            image={image} 
                            data={{placa: userDomi.placa, rep: userDomi.rep}}
                            
                        />

                        <View style={{height:50}} />

                        <View style={[styles.row, {justifyContent:"center"}]}>
                            <Button title="Mensaje" onPress={() => {}} styleMode="blue" buttonStyle={{minWidth:150}} />
                            <View style={{width:20}}/>
                            <Button title="Llamar" onPress={() => Linking.openURL(`tel:${userDomi.celular}`)} styleMode="blue" buttonStyle={{minWidth:150}} />
                        </View>
                    </View>
                    }

                    

                    <View style={{height:30}} />

                </View>

               

            </ScrollView>

         
        </SafeAreaView >
    )
}

export default Status

