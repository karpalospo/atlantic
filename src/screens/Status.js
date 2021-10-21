import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Linking, Text, Platform, Image, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'

import Header from "../components/Header";
import StepIndicator from 'react-native-step-indicator';
import UserTitle from '../components/UserTitle'
import Card from '../components/Card'
import { UtilitiesContext } from '../context/UtilitiesContext'
import { API } from '../global/services'

import Ranking from "../components/Ranking";

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
 
    const [currentPosition, setcurrentPosition] = useState(0);
    const { loopServicesID, setStopLoopServicesID, setLoopOrden } = useContext(UtilitiesContext)

    const [userDomi, setUserDomi] = useState(false);
    const [finalizado, setFinalizado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [calificacion, setCalificacion] = useState("");
    const [calificacionNumero, setCalificacionNumero] = useState(0);

    const [data, setData] = useState(false);

    const image = require("../../assets/face.jpg")

    let stopCallback = false

    const callback = (order_data) => {
 
        if(!order_data || stopCallback) return


        if(!userDomi && order_data.domi) setUserDomi(order_data.domi)

        if(order_data.pos) {
            setcurrentPosition(order_data.pos)
            if(order_data.pos == 2) {
                   //Alert.alert("Servicio Finalizado")
            }
        }

        if(order_data.pos == 2) {
            setFinalizado(true)
            stopCallback = true
        }
 
    }

    useEffect(() => {
        setData(props.route.params.data)
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

    const calificar = async (numero) => {
        setCalificacionNumero(numero)
    }


    const terminar = async() => {
        if(calificacionNumero > 0 || calificacion != "") {
            setLoading(true)
            const res = await API.POST.Calificar({order_id: data.orden, domi_id: userDomi.id, calificacion:calificacionNumero, comentario: calificacion})
            setLoading(false)
        }
        props.navigation.navigate("Home")
    }


    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Estado del domicilio" navigation={props.navigation} noMenu={true} />
           
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
                        descripcion={data.especificaciones}
                        fechaStatus={data.fecha}
                        categoria={data.categoria}
                        dir1={data.dir1}
                        dir2={data.dir2}
                        valor={data.valor}
                        orden={data.orden}
                        forma={data.forma}
                    />
                    }

                    <View style={{height:20}} />

                    {!userDomi &&
                    <View>
                        <ActivityIndicator color="#999" />
                        <Text style={styles.p}>Esperando respuesta de un domiciliario</Text>
                        <Text style={{fontSize:13, color:"#999", textAlign:"center", marginBottom:30}}>59 Segundos...</Text>
                        <View style={[styles.row, {justifyContent:"center"}]}>
                            <Button title="Cancelar" onPress={() => props.navigation.navigate("Home")} styleMode="red" buttonStyle={{minWidth:150}} />
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

                        <View style={{height:20}} />

                        {!finalizado && 
                        <View style={[styles.row, {justifyContent:"center"}]}>
                            <Button title="Mensaje" onPress={() => Linking.openURL(`whatsapp://send?phone=57${userDomi.celular}&text=Hola!! te hablo desde Atlantiexpress`)} styleMode="blue" buttonStyle={{minWidth:140}} />
                            <View style={{width:20}}/>
                            <Button title="Llamar" onPress={() => Linking.openURL(`tel:${userDomi.celular}`)} styleMode="blue" buttonStyle={{minWidth:140}} />
                        </View>}

                    </View>
                    }

                    {finalizado && 
                        <View>
                            <View style={[styles.row, {marginTop:30}]}>
                                <Text style={{color:"#666", fontSize:18}}>Califica el Servicio</Text>
                                <Ranking size={30} onPress={calificar} calificacion={calificacionNumero}/>
                            </View>
                            <View style={{height:5}} />
                            <TextInput
                                style={[styles.input, {height:100}]}
                                placeholder={"Escribe tus comentarios"}
                                value={calificacion}
                                multiline={true}
                                onChangeText={v => setCalificacion(v)}
                            />
                            <View style={{height:10}} />
                            <View style={[styles.row, {justifyContent:"center"}]}>
                                <Button loading={loading} title="Terminar" onPress={terminar} buttonStyle={{minWidth:140}} />
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

