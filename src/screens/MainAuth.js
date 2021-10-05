import React, { useEffect } from 'react'
import { SafeAreaView, Text, View, Image } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'


const MainAuth = (props) => {

    useEffect(() => {
	
	},[])

    const image = require("../../assets/bg1.jpg")
    const logo = require("../../assets/logo.png")

    
    return (
        <SafeAreaView style={[styles.main]}>
          
            <View style={{position:"relative", flex: 1}}>

                <Image
                    style={{ width: "100%", height: "100%", position: "absolute", left:0, top:0, zIndex:-1 }}
                    source={image}
                    resizeMode="cover"
                />

                <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Image
                        style={{ width: "35%"}}
                        source={logo}
                        resizeMode="contain"
                    />
                    <View style={{height:250}} />
                    <Button 
                        title="Inicia Sesión"
                        buttonStyle={{minWidth:200}}
                        onPress={() => props.navigation.navigate("singin")}
                    />
                    <View style={{height:20}} />
                    <Button
                        styleMode="outline"
                        title="Regístrate"
                        buttonStyle={{minWidth:200}}
                        onPress={() => props.navigation.navigate("singup")}
                    />
                    
                    <View style={{height:120}} />            
                </View>

            </View>

        </SafeAreaView>
    )
}

export default MainAuth

