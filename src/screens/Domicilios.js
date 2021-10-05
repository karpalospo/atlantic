import React, { useRef, useEffect } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native'
import { styles } from '../global/styles';
import Header from "../components/Header";
import Card from '../components/Card'
import { ScrollView } from 'react-native-gesture-handler';


const Domicilios = (props) => {
    
    const {data=[]} = props
    useEffect(() => {
      
    }, [])

    const dataDummy = [
        { orden: "204756", status: "Entregado", fecha: "Sept 10 10:30pm", categoria: "Envío de documentos", dir1: "Cra 51 # 79-155 Alto Prado", dir2: "Cra 50 # 82-155 La Manga", valor: "$12.000"},
        { orden: "204778", status: "Cancelado", fecha: "Oct 11 11:45pm", categoria: "Compra Supermercados", dir1: "Cra 51 # 79-155 Alto Prado", dir2: "Cra 50 # 82-155 La Manga", valor: "$11.000"},
        { orden: "204976", status: "Entregado", fecha: "Dic 12 10:10pm", categoria: "Envío de documentos", dir1: "Cra 51 # 79-155 Alto Prado", dir2: "Cra 50 # 82-155 La Manga", valor: "$15.800"},
        { orden: "204990", status: "Entregado", fecha: "Dic 22 09:30pm", categoria: "Envío de documentos", dir1: "Cra 51 # 79-155 Alto Prado", dir2: "Cra 50 # 82-155 La Manga", valor: "$9.800"},
    ]


    return (
        <SafeAreaView style={{ flex: 1, position:"relative", backgroundColor:"white" }}>
                
            <Header titleCenter="Mis Domicilios" navigation={props.navigation} />

            <ScrollView style={{paddingHorizontal:30}}>
                {dataDummy.map((item, index) => {
                    return (
                        <Card
                            key={item.orden}
                            status={item.status}
                            fechaStatus={item.fecha}
                            categoria={item.categoria}
                            dir1={item.dir1}
                            dir2={item.dir2}
                            valor={item.valor}
                            orden={item.orden}
                        />
                    )
                })}
                <View style={{height:40}} />
            </ScrollView>
            
        </SafeAreaView>
    )

}

export default Domicilios;