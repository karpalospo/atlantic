import React, {useContext, useEffect, useState} from "react";
import {Text, View, SafeAreaView, TextInput} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, styles } from "../global/styles";
import { AuthContext } from '../context/AuthContext'
import Header from "../components/Header";
import { CustomSelectPicker } from '../components/CustomSelectPicker'
import {MaterialCommunityIcons, Entypo} from 'react-native-vector-icons'
import Button from '../components/Button'
import { TouchableOpacity } from "react-native-gesture-handler";


const Alert = (props) => {

    const { isAuth, loading, getAuth, setAuth} = useContext(AuthContext)

    const { navigation } = props;
    const [on, setOn] = useState(true);
    

    const [state, _setState] = useState({});

    const setState = async (value) => {
        //if(typeof value != "Object") return
        await _setState({...state, ...value})
    }

    const {data=[]} = props
    useEffect(() => {
      
    }, [])


    const image = require("../../assets/face.jpg")

    const t_alertas = [
        {id: "0", label: "Motivo 1", value: "1"},
        {id: "1", label: "Motivo 2", value: "2"},
        {id: "2", label: "Motivo 3", value: "3"},
        {id: "3", label: "Motivo 4", value: "4"},
    ]

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Alerta del servicio" navigation={props.navigation} onBack={() => props.navigation.navigate("StatusDomi")} />
               
            <View style={{flex:1, justifyContent:"center", alignItems:"center", paddingHorizontal:40}}>
                <MaterialCommunityIcons name={on ? "led-on" : "led-variant-on"} size={60} color={on ? COLORS.red : "#999"} />
                <View style={{height:60}} />
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
                    <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.navigate("Camara")} style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                        <Entypo name="camera" size={32} color="#666" />
                        <Text style={{fontSize:17, marginLeft:10, color:"#444"}}>Tomar una foto</Text>
                    </TouchableOpacity>
                </View>

                <View style={{height:40}} />
            </View>

            <View style={{height:120, backgroundColor:COLORS.mainBlue, alignItems:"center", justifyContent:"center", borderTopLeftRadius:25, borderTopRightRadius:25, overflow:"hidden"}}>

                <View style={{alignItems:"center"}} >
                    <Button 
                        title="Enviar"
                        styleMode="red"
                        buttonStyle={{minWidth:200}}
                        textStyle={{fontSize:18}}
                        onPress={() => {}}
                    />
                </View>

            </View>

            
        </SafeAreaView>
    );
};

export default Alert;
