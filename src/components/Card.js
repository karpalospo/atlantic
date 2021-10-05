
import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, COLORS } from '../global/styles';
import Button from '../components/Button'

const Card = (props) => {

    const {categoria, status, fechaStatus, dir1, dir2, valor, orden, domi, accept = () => {}, item} = props

    return (
        <View style={_styles.container}>
            
            <View style={[styles.row, {borderBottomWidth: 1, borderColor: COLORS.border, paddingBottom: 7}]}>
                <View style={{width:"65%"}}>
                    <Text style={_styles.label1}>Categoría del envío</Text>
                    <Text style={_styles.labelAzul}>{categoria}</Text>
                </View>
                <View style={{flex:1, alignItems:"flex-end"}}>
                    {domi && <Text style={[_styles.label1, {fontSize:12, marginRight:0}]}>Oferta disponible</Text>}
                    {domi && <Text style={[_styles.labelAzul, {color: COLORS.red}]}>59 Seg</Text>}

                    {!domi && status && <Text style={[_styles.labelAzul, {color: COLORS.blueText}]}>{status}</Text>}
                    {!domi && status && fechaStatus && <Text style={[_styles.label1, {fontSize:12, marginRight:0}]}>{fechaStatus}</Text>}
                </View>
            </View>

            <View style={[styles.row, {borderBottomWidth: 1, borderColor: COLORS.border, paddingVertical:12}]}>
                <View style={{width:"50%"}}>
                    <View style={styles.rowLeft}>
                        <Text style={_styles.punto}>A</Text>
                        <Text style={_styles.labelGrisBold}>Recogida</Text>
                    </View>
                    <Text style={_styles.direccion}>{dir1}</Text>
                </View>
                <View style={{flex:1, borderLeftWidth: 1, borderColor: COLORS.border, paddingLeft:10}}>
                    <View style={styles.rowLeft}>
                        <Text style={[_styles.punto, {backgroundColor:COLORS.red}]}>B</Text>
                        <Text style={_styles.labelGrisBold}>Entrega</Text>
                    </View>
                    <Text style={_styles.direccion}>{dir2}</Text>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 13}]}>
                <View style={{width:"50%"}}>
                    <View style={styles.rowLeft}>
                        <Text style={_styles.labelGris}>Valor: </Text>
                        <Text style={_styles.labelAzul}>{valor}</Text>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={styles.rowRight}>
                        {domi && <Button styleMode="red" title="Aceptar" buttonStyle={{paddingVertical:8, minWidth:130}} onPress={() => accept(item)} />}
                        {!domi && <Text style={_styles.labelGris}>Orden: </Text>}
                        {!domi && <Text style={_styles.labelNegro}>{orden}</Text>}
                    </View>
                </View>
            </View>
    
        </View>
    )

}
export default Card

const _styles = {
    container: {paddingHorizontal:20, paddingVertical:10, borderWidth:1, borderColor: COLORS.border, marginVertical:15, borderRadius:10},
    label1: {fontSize: 15, color: "#888", paddingVertical:2, marginRight:10},
    labelAzul: {fontSize: 16, paddingVertical:1, color: COLORS.mainBlue, fontWeight:"bold"},
    labelNegro: {fontSize: 17, paddingVertical:1, color: "#333", fontWeight:"bold"},
    labelGrisBold: {fontSize: 16, color: "#444", fontWeight:"bold", paddingLeft:6},
    labelGris: {fontSize: 16, color: "#6F757A"},
    punto: {fontSize: 17, backgroundColor: COLORS.mainBlue, color:"white", padding:3, paddingHorizontal: 9, borderRadius:20, fontWeight:"bold"},
    nombre: {fontSize: 18, color: COLORS.mainBlue, paddingVertical:2, fontWeight:"bold"},
    direccion: {fontSize: 14, color: "#555", marginTop:7},
}
