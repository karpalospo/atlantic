import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, SafeAreaView, TextInput, Image, ScrollView } from 'react-native'
import { styles, COLORS } from '../global/styles'
import Button from '../components/Button'
import { CustomSelectPicker } from '../components/CustomSelectPicker'
import Header from "../components/Header";
import UserTitle from '../components/UserTitle'
import { AuthContext } from '../context/AuthContext'

const Perfil = (props) => {
 
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});

    const values = {
        tipoSangre: [{id: "0", label: "A+", value: "A+"}, {id: "1", label: "A-", value: "A-"}],
        departamentos: [{id: "0", label: "Atlántico", value: "1"}, {id: "1", label: "Bolivar", value: "2"}],
        municipios: [{id: "0", label: "Barranquilla", value: "1"}, {id: "1", label: "Soledad", value: "2"}] 
    }

    const [state, _setState] = useState({});

    const { getAuth} = useContext(AuthContext)

    useEffect(() => {
        async function init() {
            const user = await getAuth()
            setUser(user)
            setState({
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email,
                celular: user.celular,
                direccion: user.direccion,
            })
        }
        init()
        
    }, []);

    const setState = async (value) => {
        //if(typeof value != "Object") return
        await _setState({...state, ...value})
    }

    const signIn = async () => {
        console.log(state)
    }
   

    const image = require("../../assets/face.jpg")

    return (
        <SafeAreaView style={styles.main}>
           
            <View style={{position:"relative", flex: 1}}>

                <Header titleCenter="Editar Contraseña" background="transparent" onBack={() => props.navigation.goBack()} />

                <ScrollView>

                     <View style={{paddingHorizontal:30, paddingBottom:200}}>
     
                        <View style={{height:20}} />
                        

                        <UserTitle name={`${user.nombres} ${user.apellidos}`} image={image} type={user.tipo == "domi" ? "Domiciliario" : "Cliente"} />

                        <View style={{height:30}} />

                        <TextInput
                            style={styles.input}
                            placeholder={"Contraseña Anterior"}
                            value={state.contra1}
                            onChangeText={v => setState({nombres: v})}
                        />
    
                        <TextInput
                            style={styles.input}
                            placeholder="Nueva Contraseña"
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoCompleteType='email'
                            value={state.contra2}
                            onChangeText={v => setState({email: v})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={"Confirmar Contraseña"}
                            value={state.contra3}
                            onChangeText={v => setState({telefono: v})}
                        />


                        
                       
                        <View style={{height:30}} />

          
                        <View style={{alignItems:"center"}}>
                            <Button 
                                title="Actualizar"
                                buttonStyle={{minWidth:200}}
                                onPress={signIn}
                            />
                    
                            <View style={{height:20}} />
                    
        
                        </View>
                       
                    </View>


                </ScrollView>

            </View>
        </SafeAreaView >
    )
}

export default Perfil