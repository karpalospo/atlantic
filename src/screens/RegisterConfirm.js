import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, Image, ScrollView } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import {Feather} from 'react-native-vector-icons'



const RegisterConfirm = (props) => {
 
  
    const image = require("../../assets/bg2.jpg")
    const logo = require("../../assets/logo-largo.png")


    return (
        <SafeAreaView style={styles.main}>

            <View style={{paddingHorizontal:30, paddingBottom:30, flex:1, justifyContent:"center", alignItems:"center"}}>
                
                <View style={{flexDirection:"row", justifyContent:"center"}}>
                    <Image
                        style={{ width: "75%", height:50}}
                        source={logo}
                        resizeMode="contain"
                    />
                </View>

                <View style={{height:40}} />
                <Feather name="check-circle" color="#04B100" size={40} />
                <View style={{height:20}} />
                <Text style={[styles.p, {fontWeight:"bold", color:"#222", fontSize:19}]}>Tu registro ha sido enviado para revisión.</Text>
                <View style={{height:20}} />

                <Text style={styles.p}>Nuestro equipo validará la documentación para aprobar tu cuenta, en caso de ser aprobado o no, te enviaremos un correo electrónico con toda la información.</Text>

                <View style={{height:50}} />

                <View style={styles.rowCenter}>
                    <Button 
                        title="Aceptar"
                        styleMode="blue"
                        buttonStyle={{minWidth:200}}
                        onPress={() => props.navigation.navigate("MainAuth")}
                    />
                </View>
            </View>



            <Image
                style={{ width: "100%", height: "100%", position: "absolute", left:0, top:0, zIndex:-2 }}
                source={image}
                resizeMode="cover"
            />
      
        </SafeAreaView >
    )
}

export default RegisterConfirm

