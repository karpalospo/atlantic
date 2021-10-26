import React, {useContext, useEffect, useState} from "react";
import {Text, View, SafeAreaView, Image, Modal, TouchableOpacity} from "react-native";
import { COLORS, styles } from "../global/styles";
import { AuthContext } from '../context/AuthContext'
import { UtilitiesContext } from '../context/UtilitiesContext'

import Header from "../components/Header";
import Button from '../components/Button'
import { ScrollView } from "react-native-gesture-handler";
import Card from '../components/Card'
import Ranking from "../components/Ranking";
import { API } from '../global/services'
import {Feather, Ionicons} from 'react-native-vector-icons'
import { useFocusEffect } from '@react-navigation/native';

const HomeDomi = (props) => {

    const { getAuth, updateUser} = useContext(AuthContext)
    const { loopServices, setStopLoopServices } = useContext(UtilitiesContext)

    const [user, setUser] = useState(false);
    const [data, setData] = useState([]);

    const [enableSwitch, setEnableSwitch] = useState(false);
    const [currentItem, setCurrentItem] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if(user) return
        (async function a() {
            setUser(await getAuth())
        })()
    });


    const callback = (data) => {
        //console.log("data", data, enableSwitch)
        //if(!enableSwitch) return

        let servicios = []
        Object.keys(data).forEach(key => servicios.push(data[key]))
        setData(servicios)
    }

    useEffect(() => {
 
        if(user) {
            loopServices(callback)
            return function cleanup() {
                setStopLoopServices(true)
            }
        }
    }, [user]);

    useFocusEffect(
        React.useCallback(() => {
            (async function() {
                if(!user.id) return
                const res = await API.POST.getUser({id: user.id});
                if(!res.error && res.message) {
                    let user = res.message.data.user.data[0]
                    console.log(res)
                    updateUser({calif_sum: user.calif_sum, calif_veces: user.calif_veces})
                    setUser(await getAuth())
                }
            })()
        }, [])
    );

    const image = require("../../assets/face.jpg")

    const acceptService = (data) => {
        (async function () {
            setLoading(true)
            const res = await API.POST.setServiceData({orden: data.orden, status:"tomado", domi: {
                    id: user.id,
                    shortname: user.shortname,
                    celular: user.celular,
                    foto: user.foto,
                    rep: user.calif_veces ? (user.calif_sum / user.calif_veces).toFixed(1) : 0,
                    placa: user.placa
                }
            })
            
            if(!res.error) {
                const res2 = await API.POST.setServiceData({orden: data.orden, persist: true, domi_id: user.id})
                props.navigation.navigate("StatusDomi", {data})
            } else {
                if(res.message.data && res.message.data.msgError) Alert.alert("Atlantiexpress", res.message.data.msgError)
                else Alert.alert("Atlantiexpress", "Hubo un error al conectarse al servidor.")
                setLoading(false)
            }
                
        })()
    }

    const setActive = (value) => {

        setEnableSwitch(value)
    }

    const vermas = (item) => {
        setModalVisible(true)
        setCurrentItem(item)
    }

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Estado del servicio" navigation={props.navigation} enableSwitch={enableSwitch} onSwitch={setActive} />
               
            <View style={{flex:1}}>

                <ScrollView style={{paddingHorizontal:30}}>

                    <View style={{alignItems:"center"}}>
                        <View style={{borderRadius: 46, overflow: "hidden"}}>
                            <Image
                                style={{width: 90, height:90}}
                                source={image}
                                resizeMode="contain"
                            />
                        </View>

                        <Text style={{fontSize:19, padding:3, fontWeight:"bold"}}>¡Bienvenido {user.shortname}!</Text>
                        <Text style={{fontSize:16, padding:8}}>Mi reputación</Text>
                        <Ranking value={user.calif_veces ? (user.calif_sum / user.calif_veces).toFixed(1) : 0} />

                    </View>

                    <View style={{height:1, paddingBottom:15, marginTop:20, borderTopWidth: 1, borderColor: "#6F757A"}} />


                    {!enableSwitch &&
                        <View style={_styles.message}>
                            <Feather name="alert-triangle" size={40} color={COLORS.red} />   
                            <Text style={styles.p}>Estas en modo invisible.</Text>
                            <Text style={[styles.p, {fontSize: 16}]}>NO RECIBIRÁS SERVICIOS</Text>
                        </View>
                    }

                    {enableSwitch && data && data.length == 0 && 
                        <View style={_styles.message}>
                            <Feather name="alert-triangle" size={40} color={COLORS.red} />   
                            <Text style={styles.p}>En estos momentos no tienes solicitudes recientes</Text>
                            <Text style={[styles.p, {fontSize: 16}]}>ESPERANDO SERVICIOS....</Text>
                        </View>
                    }

                    {enableSwitch && data && data.length > 0 && data.map((item, index) => {
                        if(!item.orden) return null
                        else return (
                            <Card
                                domi={true}
                                key={item.orden}
                                status={item.status}
                                onVerMas={vermas}
                                descripcion={item.especificaciones}
                                fechaStatus={item.fecha}
                                categoria={item.categoria}
                                dir1={item.dir1}
                                dir2={item.dir2}
                                valor={item.valor}
                                orden={item.orden}
                                item={item}
                                accept={acceptService}
                                forma={item.forma}
                            />
                        )
                    })}

                    <View style={{height:30}} />

                </ScrollView>
            </View>

            {/*<View style={{height:140, backgroundColor:COLORS.mainBlue, alignItems:"center", justifyContent:"flex-start", borderTopLeftRadius:25, borderTopRightRadius:25, overflow:"hidden"}}>

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

            </View>*/}

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
                        <Text style={{fontSize: 18, color: COLORS.blueText, fontWeight: "bold"}}>{currentItem.especificaciones}</Text>
                        <View style={{height:30}} />
                        <Button
                            loading={loading}
                            title="Aceptar servicio"
                            styleMode="red"
                            buttonStyle={{minWidth:200}}
                            textStyle={{fontSize:18}}
                            onPress={() => {setModalVisible(false); acceptService(currentItem)}}
                        />
                    </View>
                </View>
            </Modal>
            
        </SafeAreaView>
    );
};

export default HomeDomi;


const _styles = {
    message: {alignItems:"center", borderWidth: 1, borderColor: "#6F757A", paddingTop:20, borderRadius: 20},
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
