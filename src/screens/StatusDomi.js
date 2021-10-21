import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Linking, Text, Modal, Image, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'

import Header from "../components/Header";
import StepIndicator from 'react-native-step-indicator';
import UserTitle from '../components/UserTitle'
import Card from '../components/Card'
import { UtilitiesContext } from '../context/UtilitiesContext'
import { API } from '../global/services'
import {Feather, Ionicons} from 'react-native-vector-icons'
const labels = ["Búsqueda","Recogido","Entregado"];

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
 
    const { loopServicesID, setStopLoopServicesID, setLoopOrden } = useContext(UtilitiesContext)

    const [currentPosition, setcurrentPosition] = useState(0);

    const [userClient, setUserClient] = useState(false);
    const [data, setData] = useState(false);
    const [user, setUser] = useState(false);
    const [finalizado, setFinalizado] = useState(false);

    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)


    let stopCallback = false

    const callback = (order_data) => {
        
        if(!order_data || stopCallback) return

        if(order_data.pos && order_data.pos < 3) {
            setcurrentPosition(order_data.pos)
        }

        if(order_data.pos == 2) {
            sendData({status: "terminado", persist: 1})
            setFinalizado(true)
            stopCallback = true
        }
    }

    useEffect(() => {
        setData(props.route.params.data)
        setUser(props.route.params.user)
        setUserClient(props.route.params.data.user)
    }, [props.route.params.data])

    
    useEffect(() => {
        setLoopOrden(data.orden)
        loopServicesID(callback)
    })


    
    const sendData = async (sendData = {}) => {
        setLoading(true)
        const res = await API.POST.setServiceData({orden: data.orden, ...sendData})
        setLoading(false)
        if(res.error) Alert.alert("Atlantiexpress", "Hubo un error al conectarse al servidor.")
    }

    //setServiceData
    const image = require("../../assets/face.jpg")


    const vermas = (item) => {
        setModalVisible(true)
    }

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Estado del domicilio" noMenu={true} />

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

                    <View style={{height:20}} />

                    {!finalizado && 
                    <View style={styles.rowCenter}>
                        <Button loading={loading} title="Cambiar Estado" onPress={() => sendData({pos: currentPosition + 1})} styleMode="blue" buttonStyle={{minWidth:140}} />
                    </View>
                    }

                    <View style={{paddingHorizontal:30}}>
                        
                        <View style={{height:10}} />


                        {data &&
                        <Card
                            status={data.status}
                            fechaStatus={data.fecha}
                            categoria={data.categoria}
                            onVerMas={vermas}
                            descripcion={data.especificaciones}
                            dir1={data.dir1}
                            dir2={data.dir2}
                            valor={data.valor}
                            orden={data.orden}
                            forma={data.forma}
                        />
                        }

                        {userClient &&
                            <View>
                                <View style={{height:20}} />
                          
                                    <UserTitle 
                                        type="Cliente" 
                                        name={`${userClient.shortname}`}
                                        image={image} 
                                    />  

                                    <View style={{height:20}} />
                              
                                   {!finalizado &&
                                    <View style={[styles.row, {justifyContent:"center"}]}>
                                        <Button title="Mensaje" onPress={() => Linking.openURL(`whatsapp://send?phone=57${userClient.celular}&text=Hola!! te hablo desde Atlantiexpress`)} styleMode="blue" buttonStyle={{minWidth:140}} />
                                        <View style={{width:20}}/>
                                        <Button title="Llamar" onPress={() => Linking.openURL(`tel:${userClient.celular}`)} styleMode="blue" buttonStyle={{minWidth:140}} />
                                    </View>
                                    }

                            </View>
                        }

                        <View style={{height:10}} />
                        {finalizado && 
                            <View style={[styles.row, {justifyContent:"center"}]}>
                                <Button title="Terminar" onPress={() => props.navigation.navigate("HomeDomi")} buttonStyle={{minWidth:140}} />
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
                        title="Botón de Pánico"
                        styleMode="red"
                        buttonStyle={{minWidth:200}}
                        textStyle={{fontSize:18}}
                        onPress={() => props.navigation.navigate("Alert")}
                    />
                </View>

            </View>

            <Modal
                animationType="fade"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={_styles.centeredView}>
                    <View style={_styles.modalView}>
                        <View style={styles.row}>
                            <View style={{flex: 1}}></View>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close-circle-outline" size={44} color="#333" />
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}} />
                        <Text style={{fontSize: 18, color: COLORS.blueText, fontWeight: "bold"}}>{data.especificaciones}</Text>
                    </View>
                </View>
            </Modal>

         
        </SafeAreaView >
    )
}

export default Status

const _styles = {

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)"
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical:15,
        minWidth: 250,
        minHeight: 300,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
}

