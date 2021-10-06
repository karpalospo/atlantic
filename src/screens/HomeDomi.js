import React, {useContext, useEffect, useState} from "react";
import {Text, View, SafeAreaView, Image, ListViewComponent} from "react-native";
import { COLORS, styles } from "../global/styles";
import { AuthContext } from '../context/AuthContext'
import { UtilitiesContext } from '../context/UtilitiesContext'

import Header from "../components/Header";
import Button from '../components/Button'
import { ScrollView } from "react-native-gesture-handler";
import Card from '../components/Card'
import Ranking from "../components/Ranking";


const HomeDomi = (props) => {

    const { getAuth} = useContext(AuthContext)
    const { loopServices } = useContext(UtilitiesContext)

    const [user, setUser] = useState({});
    const [data, setData] = useState([]);

    async function init() {
        setUser(await getAuth())
    }

    const callback = (data) => {
        let servicios = []
        Object.keys(data).forEach(key => servicios.push(data[key]))
        setData(servicios)
    }

    useEffect(() => {
        init()
        loopServices(callback)
    });

    const image = require("../../assets/face.jpg")

    const acceptService = (data) => {
        props.navigation.navigate("StatusDomi", {data, user})
    }

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Estado del servicio" navigation={props.navigation} />
               
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
                        <Ranking value={3.7} />

                    </View>

                    <View style={{height:20}} />

                    {data.map((item, index) => {
                        if(!item.orden) return null
                        else return (
                            <Card
                                domi={true}
                                key={item.orden}
                                status={item.status}
                                fechaStatus={item.fecha}
                                categoria={item.categoria}
                                dir1={item.dir1}
                                dir2={item.dir2}
                                valor={item.valor}
                                orden={item.orden}
                                item={item}
                                accept={acceptService}
                            />
                        )
                    })}

                    <View style={{height:30}} />

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

            
            
        </SafeAreaView>
    );
};

export default HomeDomi;
