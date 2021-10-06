import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Pressable, Text, Modal, Image, ScrollView, Alert } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Header from "../components/Header";
import { API } from '../global/services'
import { CustomSelectPicker } from '../components/CustomSelectPicker'
import {MaterialCommunityIcons} from 'react-native-vector-icons'


const Express = (props) => {
 
    const [modalVisible, setModalVisible] = useState(false)
    const [state, _setState] = useState({});
    const [user, setUser] = useState(false);

    const moto = require("../../assets/moto.jpg")

    const categorias = [
        {id: 0, label: "Seleccione Categoria", value: "0"},
        {id: 1, label: "Categoria 1", value: "Categoria 1"},
        {id: 2, label: "Categoria 2", value: "Categoria 2"},
        {id: 3, label: "Categoria 3", value: "Categoria 3"},
        {id: 4, label: "Categoria 4", value: "Categoria 4"},
    ]

    const formapago = [
        {id: 0, label: "Efectivo", value: "Efectivo"},
        {id: 1, label: "Nequi", value: "Nequi"},
        {id: 2, label: "Transferencia", value: "Transferencia"},
        {id: 3, label: "Daviplata", value: "Daviplata"},
    ]


    const setState = async (value) => {
        //if(typeof value != "Object") return
        await _setState({...state, ...value})
    }

    useEffect(() => {
        setUser(props.route.params.user)
    });

    

    const HacerPedido = async () => {


        if(!state.categorias || state.categorias.value == "0") return Alert.alert("Error de Validación", "Selecione una categoría")
        if(!state.dir1 || state.dir1.trim() == "") return Alert.alert("Error de Validación", "Ingrese una dirección de recogida")
        if(!state.dir2 || state.dir2.trim() == "") return Alert.alert("Error de Validación", "Ingrese una dirección de entrega")
        if(!state.valor|| state.valor.trim() == "") return Alert.alert("Error de Validación", "Ingrese un valor declarado")
        if(!state.formapago || state.formapago.value == "0") return Alert.alert("Error de Validación", "Selecione una forma de pago")

        let sendData = {...state}
        sendData.categoria = state.categorias.value
        sendData.formapago = state.formapago.value


        const res = await API.POST.setService(sendData)

        if(!res.error && !res.message.error) {
            props.navigation.navigate("Status", {data: res.message.data, user})
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Solicita tu servicio" navigation={props.navigation} />
           
            <ScrollView>

                <View style={{paddingHorizontal:30}}>
                    
                    <View style={{flexDirection:"row", justifyContent:"center"}}>
                        <Image
                            style={{ width: "60%", height:150}}
                            source={moto}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={{height:20}} />
                    

                    <View style={[styles.input]}>
                        <CustomSelectPicker
                            items={categorias}
                            style={{ justifyContent: 'center' }}
                            onValueChange={v => setState({categorias: v})}
                            placeHolder="Categoría"
                        />
                    </View>

                    <View style={{flexDirection:"row"}}>
                        <View style={{width:"81%"}}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Dirección de Recogida"}
                                value={state.dir1}
                                onChangeText={v => setState({dir1: v})}
                            />
                        </View>
                        <View style={{width:"4%"}}/>
                        <View style={[styles.input, {width:"15%", paddingHorizontal: 0, justifyContent:'center', alignItems:"center"}]}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection:"row"}}>
                        <View style={{width:"81%"}}>
                            <TextInput
                                style={styles.input}
                                placeholder={"Dirección de Entrega"}
                                value={state.dir2}
                                onChangeText={v => setState({dir2: v})}
                            />
                        </View>
                        <View style={{width:"4%"}}/>
                        <View style={[styles.input, {width:"15%", paddingHorizontal: 0, justifyContent:'center', alignItems:"center"}]}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TextInput
                        style={[styles.input, {height:100}]}
                        placeholder={"Especificaciones"}
                        value={state.especificaciones}
                        multiline={true}
                        onChangeText={v => setState({especificaciones: v})}
                    />

                    <TextInput
                        style={styles.input}
                        keyboardType="decimal-pad"
                        placeholder={"$ Valor declarado"}
                        value={state.valor}
                        onChangeText={v => setState({valor: v})}
                    />

                    <View style={[styles.input]}>
                        <CustomSelectPicker
                            items={formapago}
                            style={{ justifyContent: 'center' }}
                            onValueChange={v => setState({formapago: v})}
                            placeHolder="Forma de Pago"
                        />
                    </View>

    
                </View>

                <View style={{height:30}} />

                <View style={{backgroundColor:COLORS.mainBlue, alignItems:"center", justifyContent:"center", borderTopLeftRadius:25, borderTopRightRadius:25, overflow:"hidden", height:120}}>
                    <View style={{height:10}} />
                    <Button 
                        title="Solicitar"
                        buttonStyle={{minWidth:200}}
                        onPress={HacerPedido}
                    />
                    <View style={{height:20}} />

                </View>

            </ScrollView>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View />

            </Modal>

         
        </SafeAreaView >
    )
}

export default Express

