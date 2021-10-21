import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import Header from "../components/Header";
import UserTitle from '../components/UserTitle'
import { AuthContext } from '../context/AuthContext'

const Blank = (props) => {

    const { getAuth } = useContext(AuthContext)
    const [user, setUser] = useState(false);

    async function init() {
        setUser(await getAuth())
        if(user.tipo == "domi") props.navigation.navigate("HomeDomi")
        else props.navigation.navigate("Home")
    }

    useEffect(() => {
        init()
    }, [user]);



    return (
        <SafeAreaView style={styles.main}>

            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>

                <ActivityIndicator color="#999" />
            </View>

        </SafeAreaView >
    )
}

export default Blank