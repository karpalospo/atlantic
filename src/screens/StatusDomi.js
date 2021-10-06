import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Linking, Text, Platform, Image, ScrollView } from 'react-native'
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
 
    const { loopServicesID } = useContext(UtilitiesContext)

    const [currentPosition, setcurrentPosition] = useState(0);

    const [userClient, setUserClient] = useState(false);
    const [data, setData] = useState(false);
    const [user, setUser] = useState(false);
    const [extradata, setExtradata] = useState({});

    const callback = (data) => {

        if(data.user) {
            if(data.user.nombres) {
                let nombres = data.user.nombres.split(" ")
                let apellidos = data.user.apellidos.split(" ")

                data.user.shortname = data.user.nombres + " " + data.user.apellidos
                if(nombres.length > 0) data.user.shortname = nombres[0]
                if(apellidos.length > 0) data.user.shortname += " " + apellidos[0]
            }

            setUserClient(data.user)
        }
        setData(setExtradata)
    }

    async function setStatus() {
        if(!data) return
        await API.POST.setServiceData({orden: data.orden, status:"tomado", domi: user})
    }

    useEffect(() => {
        setData(props.route.params.data)
        setUser(props.route.params.user)
        loopServicesID(props.route.params.data.orden, callback)
        setStatus()
    });


    //setServiceData
    const image = require("../../assets/face.jpg")

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Estado del domicilio" onBack={() => props.navigation.navigate("HomeDomi")} />

            <View style={{flex:1}}>
                <ScrollView>

                    {/*<Text style={[styles.p, {paddingHorizontal:20, fontSize:15}]}>
                        Tu servicio ha sido solicitado a las 3:00 pm {"\n"} La hora estimada de entrega a las 3:30 pm
    </Text>*/}

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

                        {userClient &&
                            <View>
                                <View style={{height:20}} />
                                <View style={{borderWidth:1, borderColor:"#ddd", borderRadius: 8, padding:15}}>
                                    <UserTitle 
                                        type="Cliente" 
                                        name={`${userClient.shortname}`}
                                        image={image} 
                                    />  
                            

                                    <View style={{height:20}} />

                                
                                    <View style={[styles.row, {justifyContent:"center"}]}>
                                        <Button title="Mensaje" onPress={() => {}} styleMode="blue" buttonStyle={{minWidth:120}} />
                                        <View style={{width:20}}/>
                                        <Button title="Llamar" onPress={() => Linking.openURL(`tel:${userClient.celular}`)} styleMode="blue" buttonStyle={{minWidth:120}} />
                                    </View>
                                </View>

                            </View>
                        }
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

