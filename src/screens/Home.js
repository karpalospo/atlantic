import React, {useContext, useState, useEffect} from "react";
import {Text, View, SafeAreaView, Image} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, styles } from "../global/styles";
import { AuthContext } from '../context/AuthContext'
import Header from "../components/Header";
import Button from '../components/Button'


const Home = (props) => {

    const { isAuth, loading, getAuth, setAuth} = useContext(AuthContext)
    const [user, setUser] = useState({});

    async function init() {
        setUser(await getAuth())
        if(user.tipo == "domi") props.navigation.navigate("HomeDomi")
    }

    useEffect(() => {
        init()

    });

    const moto = require("../../assets/moto-ondas.jpg")
    
    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
            
            <Header titleCenter="Solicita tu servicio" navigation={props.navigation} />
               
            <View style={{flex:1}}>
                <Image
                    style={{ width: "100%", height: "100%" }}
                    source={moto}
                    resizeMode="contain"
                />
            </View>

            <View style={{height:230, backgroundColor:COLORS.mainBlue, alignItems:"center", justifyContent:"flex-start", borderTopLeftRadius:25, borderTopRightRadius:25, overflow:"hidden"}}>
                {/*<Image
                    style={{ width:"100%", position:"absolute", top:0, left:0, zIndex:-1}}
                    source={bg}
                    resizeMode="cover"
                />*/}

                <Text style={{paddingVertical:40, color:"white", fontSize:19}}>Selecciona el tipo de domicilio</Text>
     
                <View style={{flexDirection: "row", paddingHorizontal: 30}}>
                    <View style={{width:"48%"}}>
                        <Button 
                            minWidth={20}
                            title="Express"
                            styleMode={"blackText"}
                            onPress={() => props.navigation.navigate("Express")}
                        />
                    </View>
                    <View style={{width:"4%"}}/>
                    <View style={{width:"48%"}}>
                        <Button 
                            title="A la medida"
                            styleMode={"blackText"}
                            onPress={() => props.navigation.navigate("Medida")}
                        />
                    </View>
                </View>

            </View>

            
            
        </SafeAreaView>
    );
};

export default Home;
