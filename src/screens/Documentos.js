import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, Text, Image, ScrollView } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import { CustomSelectPicker } from '../components/CustomSelectPicker'
import Header from "../components/Header";
import UserTitle from '../components/UserTitle'
import { AuthContext } from '../context/AuthContext'
import File from '../components/File'
import {Ionicons, Feather} from 'react-native-vector-icons'



const Documentos = (props) => {

    const { getAuth } = useContext(AuthContext)
 

    const [user, setUser] = useState({});


    useEffect(() => {
        if(user) return
        (async function () {
            setUser(await getAuth())
        })()
    });


    const imageCallback = (result) => {
        console.log(result)
    }

    const image = require("../../assets/face.jpg")

    return (
        <SafeAreaView style={styles.main}>
           
            <View style={{position:"relative", flex: 1}}>

                <Header titleCenter="Mis Documentos" background="transparent" onBack={() => props.navigation.goBack()} />

                <ScrollView>

                    <View style={{paddingHorizontal:30, paddingBottom:40}}>
     
                        <View style={{height:20}} />

                        <UserTitle name={user.shortname} image={image} type={user.tipo == "domi" ? "Domiciliario" : "Cliente"} />

                        <View style={styles.rowCenter}>
                            <Text style={styles.p}>Estado: </Text>
                            <Text style={styles.p}> APROBADO</Text>
                            <Feather name="check-circle" size={30} color={COLORS.green} style={{marginLeft:6}} />
                        </View>
                        <View style={[styles.row, {borderWidth:1, borderColor:COLORS.red, paddingHorizontal:10, marginVertical:20, borderRadius:8}]}>
                            <View style={{width:40}}><Ionicons name="alert-circle-outline" size={40} color={COLORS.red} /></View>
                            <Text style={[styles.p, {flex:1, textAlign:"left", paddingLeft:10, color:COLORS.red, fontSize:14}]}>Tenga en cuenta que al actualizar sus documentos, su cuenta entrará en revisión para su aprobación.</Text>
                        </View>

                        <File title="Revision Tecnomecánica" callback={imageCallback} />
                        <File title="Licencia de conducir" callback={imageCallback} />
                        <File title="Fotocopia de cédula" callback={imageCallback} />
                        <File title="Revision Tecnomecánica" callback={imageCallback} />
                        <File title="Tarjeta de propiedad" callback={imageCallback} />
                        <File title="SOAT" callback={imageCallback} />
                        
                        <Text style={[styles.p, {color: "red"}]}>El tamaño de cada archivo no debe superar los 2 MB</Text>
                        <View style={{height:20}} />

          
                        <View style={{alignItems:"center"}}>
                            <Button 
                                title="Actualizar"
                                buttonStyle={{minWidth:200}}
                                onPress={() => {}}
                            />
                    
                            <View style={{height:20}} />
        
                        </View>
                       
                    </View>


                </ScrollView>

            </View>
        </SafeAreaView >
    )
}

export default Documentos