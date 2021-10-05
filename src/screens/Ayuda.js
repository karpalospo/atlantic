import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Image, ScrollView } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import Header from "../components/Header";
import UserTitle from '../components/UserTitle'
import { AuthContext } from '../context/AuthContext'

const Ayuda = (props) => {
 

    useEffect(() => {

        
    }, []);


    return (
        <SafeAreaView style={styles.main}>
           
            <View style={{position:"relative", flex: 1}}>

                <Header titleCenter="Ayuda" background="transparent" onBack={() => props.navigation.goBack()} />

                <ScrollView>

                     <View style={{paddingHorizontal:30, paddingBottom:200}}>
     
                       
                    
        
                
                       
                    </View>


                </ScrollView>

            </View>
        </SafeAreaView >
    )
}

export default Ayuda