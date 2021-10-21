import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, TextInput, Modal, Image, ScrollView, Alert, Dimensions, Text, TouchableOpacity} from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import Header from "../components/Header";
import { API } from '../global/services'
import { CustomSelectPicker } from '../components/CustomSelectPicker'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import MapView, {Marker} from 'react-native-maps';
import { AuthContext } from '../context/AuthContext'
import Geocoder from 'react-native-geocoding';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Home = (props) => {
 


    const { getAuth} = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [state, _setState] = useState({});
    const [user, setUser] = useState(false);
    const [opener, setOpener] = useState(-1);
    const [loading, setLoading] = useState(false);

    const [direccion, setDireccion] = useState("");
    const [mapRegion, setMapRegion] = useState({
        latitude: 10.9878,
        longitude: -74.7999,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    useEffect(() => {
        if(user) return
        (async function () {
            setUser(await getAuth())
        })()
    });


    const moto = require("../../assets/moto.jpg")
    const marker = require("../../assets/pin.png")

    
    const categorias = [
        {id: 0, label: "Seleccione Categoria", value: "0"},
        {id: 1, label: "Documentos y/o papeles", value: "Documentos y/o papeles"},
        {id: 2, label: "Dinero", value: "Dinero"},
        {id: 3, label: "Producto delicado", value: "Producto delicado"},
        {id: 4, label: "Producto en caja", value: "Producto en caja"},
        {id: 5, label: "Comida", value: "Comida"},
        {id: 6, label: "Dispositivo electrónico", value: "Dispositivo electrónico"},
        {id: 7, label: "Producto en caja", value: "Producto en caja"},
        {id: 8, label: "Mercado", value: "Mercado"},
        {id: 9, label: "Accesorios varios", value: "Accesorios varios"},
    ]

    const formapago = [
        {id: 0, label: "Efectivo", value: "Efectivo"},
        {id: 2, label: "Transferencia", value: "Transferencia"}
    ]



    const setState = async (value) => {
        //if(typeof value != "Object") return
        await _setState({...state, ...value})
    }



    Geocoder.init("AIzaSyCSHufZP3SrsM_B5syDB6HugWbbgqDqLxE");

    const changePos = (value) => {
        
        setMapRegion(value)

        Geocoder.from(value.latitude, value.longitude).then(json => {
        	var addressComponent = json.results[0];
            var last = addressComponent.address_components[0].long_name
            var first = addressComponent.address_components[1].long_name
            var barrio = addressComponent.address_components[2].long_name
			setDireccion(`${first} ${last} ${barrio}`)
            if(opener == 1) setState({dir1:`${first} ${last} ${barrio}`})
            else if(opener == 2) setState({dir2:`${first} ${last} ${barrio}`})
		}).catch(error => console.warn(error));

    }


    const HacerPedido = async () => {

        if(!state.categorias || state.categorias.value == "0") return Alert.alert("Error de Validación", "Selecione una categoría")
        if(!state.dir1 || state.dir1.trim() == "") return Alert.alert("Error de Validación", "Ingrese una dirección de recogida")
        if(!state.dir2 || state.dir2.trim() == "") return Alert.alert("Error de Validación", "Ingrese una dirección de entrega")
        if(!state.valor|| state.valor.trim() == "") return Alert.alert("Error de Validación", "Ingrese un valor declarado")
        if(!state.formapago || state.formapago.value == "0") return Alert.alert("Error de Validación", "Selecione una forma de pago")

        let sendData = {...state}
        sendData.categoria = state.categorias.value
        sendData.formapago = state.formapago.value
        sendData.user = {
            id: user.id,
            shortname: user.shortname,
            celular: user.celular,
            foto: user.foto
        }
        setLoading(true)
        const res = await API.POST.setService(sendData)

        if(!res.error && !res.message.error) {
            setLoading(false)
            return props.navigation.navigate("Status", {data: res.message.data})
        } else {
            Alert.alert("Generar Pedido", "Hubo un error al generar el pedido. Intente nuevamente")
        }
        setLoading(false)
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
                            <TouchableOpacity onPress={() => {setOpener(1); setModalVisible(true)}}>
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
                            <TouchableOpacity onPress={() => {setOpener(2); setModalVisible(true)}}>
                                <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TextInput
                        style={[styles.input, {height:100}]}
                        placeholder={"Especificaciones del servicio"}
                        value={state.especificaciones}
                        multiline={true}
                        onChangeText={v => setState({especificaciones: v})}
                    />

                    <TextInput
                        style={styles.input}
                        keyboardType="decimal-pad"
                        placeholder={"$ Valor ofertado"}
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
                        loading={loading}
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
            >
                         
                <View style={{flex: 1}}>

      
                    <MapView 
                        style={_styles.map} 
                        initialRegion={mapRegion}
                        showsUserLocation={true}
                        onRegionChangeComplete={changePos}
                    >

                    </MapView>

                    <View style={{height:50, width:50, position:"absolute", left:width / 2 - 25, top:height / 2 - 50, justifyContent:"center", alignItems:"center", zIndex:2}} >
                        <Image source={marker} style={{width:30}} resizeMode="contain" />
                    </View>
      
                      <View style={{height:200, position:"absolute", left:0, bottom:0, width:"100%", zIndex:3, backgroundColor:COLORS.mainBlue, alignItems:"center", justifyContent:"flex-start", borderTopLeftRadius:25, borderTopRightRadius:25}}>
                        <Text style={{paddingVertical:20, color:"white", fontSize:16}}>Selecciona tu punto de {opener == 1 ? "recogida" : "entrega"}</Text>
                        <Text style={{paddingBottom:20, color:"white", fontSize:22}}>{direccion}</Text>
                        <View style={styles.rowCenter}>
                        <Button 
                                title="Seleccionar"
                                styleMode="red"
                                buttonStyle={{minWidth:200}}
                                onPress={() => {setModalVisible(false)}}
                            />
                        </View> 
                    </View>
                </View>

            </Modal>

        </SafeAreaView >
    )
}

export default Home


const _styles = {
    map: {width, flex:1, position:"relative", zIndex:1},
}

