import React, {useContext, useEffect, useState} from "react";
import {Text, View, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView, Modal, Dimensions, Alert as ALt} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, styles } from "../global/styles";
import { AuthContext } from '../context/AuthContext'
import Header from "../components/Header";
import { CustomSelectPicker } from '../components/CustomSelectPicker'
import {MaterialCommunityIcons, Entypo} from 'react-native-vector-icons'
import Button from '../components/Button'
import { uploadFile } from '../global/functions'
import { API } from "../global/services";

import { Camera } from 'expo-camera';

import {Ionicons, MaterialIcons} from 'react-native-vector-icons'


const {width, height} = Dimensions.get('screen')
const volver = require('../../assets/times.png')

const Alert = (props) => {

    const { isAuth, getAuth, setAuth} = useContext(AuthContext)

    const [on, setOn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(false)
    const [photoVisible, setPhotoVisible] = useState(false)

    const [state, _setState] = useState({});

    const setState = async (value) => {
        //if(typeof value != "Object") return
        await _setState({...state, ...value})
    }

    const t_alertas = [
        {id: 0, label: "Accidente en la vía", value: "Accidente en la vía"},
        {id: 1, label: "Hurto o Robo", value: "Hurto o Robo"},
        {id: 2, label: "Incendio", value: "Incendio"},
        {id: 3, label: "Riña", value: "Riña"},
        {id: 4, label: "Arroyo peligroso", value: "Arroyo peligroso"},
        {id: 5, label: "Actividad sospechosa", value: "Actividad sospechosa"},
        {id: 6, label: "Enfrentamiento armado", value: "Enfrentamiento armado"},
        {id: 7, label: "Persona(s) en peligro", value: "Persona(s) en peligro"},
        {id: 8, label: "Mascota pérdida", value: "Mascota pérdida"},
        {id: 9, label: "Calle obstruida", value: "Calle obstruida"},
        {id: 10, label: "Otro", value: "Otro"},
    ]

    const enviarAlerta = async () => {
        setLoading(true)

        const cbProgress = (e) => {}
        const cbComplete = async (e) => {
            console.log(e)
            if(e.success) {
                const res = await API.POST.setAlerta({
                    user_id: 1,
                    archivo: e.url,
                    motivo: state.motivo.label,
                    especificacion: state.mensaje
                })
                console.log(res)
                if(!res.error && res.message.data) {
                    ALt.alert("Botón de Pánico", "Mensaje enviado correctamente")
                }
                setLoading(false)
            }
            
        }
        const cbError = (e, msg) => {
            console.log(e)
            setLoading(false)
        }

        uploadFile(photo, "upload", 0, cbComplete, cbProgress, cbError)
        
    }

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraRef, setCameraRef] = useState(false);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [hasPermission]);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Debe permitir acceso a la camara</Text>;
    }

    

    onPictureSaved = photo => {
        setPhoto(photo.uri)
        setPhotoVisible(false)
    } 

    takePicture = () => {

        if (cameraRef) {
            cameraRef.takePictureAsync({ onPictureSaved });
        }
    };



    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Alerta del servicio" navigation={props.navigation} onBack={() => props.navigation.goBack()} />
               
            <ScrollView>
                <View style={{justifyContent:"center", alignItems:"center", paddingHorizontal:40}}>
                <MaterialCommunityIcons name={on ? "led-on" : "led-variant-on"} size={60} color={on ? COLORS.red : "#999"} />
                <View style={{height:30}} />

                <View style={styles.input}>
                    <CustomSelectPicker
                        items={t_alertas}
                        style={{ justifyContent: 'center' }}
                        onValueChange={v => setState({motivo: v})}
                        placeHolder="Motivo de Alerta"
                    />
                </View>
                <View style={{height:10}} />
                <TextInput
                    style={[styles.input, {minHeight:150}]}
                    placeholder={"Mensaje / Motivo"}
                    value={state.mensaje}
                    multiline={true}
                    onChangeText={v => setState({mensaje: v})}
                />
                <View style={{height:10}} />
                <View style={[styles.input, {height:70}]}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setPhotoVisible(true)} style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                        <Entypo name="camera" size={32} color="#666" />
                        <Text style={{fontSize:17, marginLeft:10, color:"#444"}}>Tomar una foto</Text>
                    </TouchableOpacity>
                </View>

                {photo && <Image source={{uri: photo}} style={{width:200, height:200}} resizeMode="contain" />}
                <View style={{height:20}} />

              
                <View style={{height:40}} />

                </View>
            </ScrollView>

            <View style={{height:120, backgroundColor:COLORS.mainBlue, alignItems:"center", justifyContent:"center", borderTopLeftRadius:25, borderTopRightRadius:25, overflow:"hidden"}}>

                <View style={{alignItems:"center"}} >
                    <Button 
                        loading={loading}
                        title="Enviar"
                        buttonStyle={{minWidth:200}}
                        textStyle={{fontSize:18}}
                        onPress={enviarAlerta}
                    />
                </View>

            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={photoVisible}
            >
                <View style={{flex:1, backgroundColor: "rgba(0,0,0,0.6)"}}>

                    <View style={{backgroundColor:"white", height: height * 0.80, position:"absolute", left: 0, bottom: 0, width, padding:10, borderTopLeftRadius:15, borderTopRightRadius:15}} >
                        <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
                            <TouchableOpacity onPress={() => setPhotoVisible(false)} style={{width:35, height:35, borderRadius:18, backgroundColor:"#222", alignItems:"center", justifyContent:"center"}}>
                                <Image source={volver} tintColor="white" resizeMode='contain' style={{width:16, height:16}} />
                            </TouchableOpacity>
                        </View>
                        <View style={{height:15}} />
                        <View style={{ flex: 1 }}>
                            <View style={{ height: 60, position: "absolute", width:"100%", zIndex:1, left: 0, bottom: 50, flexDirection: "row", alignItems:"center", justifyContent:"space-around" }}>
                                <TouchableOpacity
                                    style={{ width: 40, height: 40}}
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}>
                                    <Ionicons name="camera-reverse" size={36} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: 60, height: 60, backgroundColor: COLORS.red, borderRadius:31, borderWidth:2, borderColor:"white" }}
                                    onPress={takePicture}
                                />
                                <TouchableOpacity
                                    style={{ width: 40, height: 40}}
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}>
                                    <Ionicons name="camera-reverse" size={36} color="white" />
                                </TouchableOpacity>
                            </View>

                            <Camera style={{ flex: 1, position:"relative", zIndex:0 }} type={type} ref={ref => setCameraRef(ref)} />

                        </View>
                    </View>
                </View>

            </Modal>
            
            
        </SafeAreaView>
    );
};

export default Alert;
