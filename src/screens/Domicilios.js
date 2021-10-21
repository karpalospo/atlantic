import React, { useState, useEffect, useContext} from 'react';
import { View, Text, Image, SafeAreaView, Alert } from 'react-native'
import { styles } from '../global/styles';
import Header from "../components/Header";
import Card from '../components/Card'
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext'
import { API } from '../global/services'


const Domicilios = (props) => {
    
    const { getAuth} = useContext(AuthContext)

    const [services, setServices] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        (async function () {
            setUser(await getAuth())
            const res = await API.POST.myServices({id: user.id})
            if(!res.error && !res.message.error) {
                setServices(res.message.data.services.data)
            } else Alert.alert("Obtener Servicios", "Hubo un error al cargar los servicios.")
        })()
    }, [services])

    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
                
            <Header titleCenter="Mis Domicilios" navigation={props.navigation} onBack={() => props.navigation.goBack()} />

            <ScrollView style={{paddingHorizontal:30}}>
                {services.map((item, index) => {
                    if(item.Status == "terminado") {
                        return (
                            <Card
                                key={index}
                                status={item.Status}
                                fechaStatus={item.Fecha}
                                categoria={item.Categoria}
                                dir1={item.Dir1}
                                dir2={item.Dir2}
                                valor={item.Valor}
                                orden={item.ID}
                                forma={item.Forma}
                                descripcion={item.Especificaciones}
                            />
                        )
                    }
                })}
                <View style={{height:40}} />
            </ScrollView>
            
        </SafeAreaView>
    )

}

export default Domicilios;