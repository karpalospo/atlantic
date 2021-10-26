
import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, COLORS } from '../global/styles';
import { FormatCurrency } from '../global/functions';
import Button from '../components/Button'





const Card = (props) => {

    const {categoria, status, fechaStatus, onVerMas, descripcion, dir1, dir2, valor, orden, domi, accept = () => {}, item, forma} = props

    return (
        <View style={_styles.container}>
            
            <View style={[styles.row, {borderBottomWidth: 1, borderColor: COLORS.border, paddingBottom: 7}]}>
                <View style={{width:"65%"}}>
                    <Text style={_styles.label1}>{categoria}</Text>
                    <Text numberOfLines={1} style={[_styles.labelAzul, {flex: 1}]}>{descripcion}</Text>
                </View>
                <View style={{flex:1, alignItems:"flex-end"}}>
                    {onVerMas && <Button title="Ver mas" styleMode="blue" buttonStyle={{minWidth:90, paddingHorizontal:8, paddingVertical:8}} textStyle={{fontSize:16}} onPress={() => onVerMas(item)} />}
                    {/*orden && <Text style={_styles.label1}>Orden</Text>*/}
                    {/*orden && <Text style={_styles.labelNegro}>{orden}</Text>*/}
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
                        <Text style={_styles.labelAzul}>{FormatCurrency(valor)}</Text>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={styles.rowRight}>
                        <Text style={_styles.labelGris}>Pago: </Text>
                        <Text style={_styles.labelNegro}>{forma}</Text>
                    </View>
                </View>
            </View>
            {domi && false &&
            <View style={[styles.rowCenter, {paddingTop: 10}]} >
                <Text style={[_styles.labelGris, {marginRight:0}]}>disponible </Text>
                <Text style={[_styles.labelRojo]}> 59 Segundos</Text>
            </View>
            }
            {domi && 
             <View style={[styles.rowCenter, {paddingTop: 10}]} >
                <Button styleMode="red" title="Aceptar servicio" buttonStyle={{paddingVertical:12, minWidth:180}} onPress={() => accept(item)} />
            </View>
            }
    
        </View>
    )

}
export default Card

const _styles = {
    container: {paddingHorizontal:20, paddingVertical:10, borderWidth:1, borderColor: COLORS.border, marginVertical:15, borderRadius:10},
    label1: {fontSize: 15, color: "#888", paddingVertical:2},
    labelAzul: {fontSize: 16, paddingVertical:1, color: COLORS.mainBlue, fontWeight:"bold"},
    labelRojo: {fontSize: 16, paddingVertical:1, color: COLORS.red, fontWeight:"bold"},
    labelNegro: {fontSize: 17, paddingVertical:1, color: "#333", fontWeight:"bold"},
    labelGrisBold: {fontSize: 16, color: "#444", fontWeight:"bold", paddingLeft:6},
    labelGris: {fontSize: 16, color: "#6F757A"},
    punto: {fontSize: 17, backgroundColor: COLORS.mainBlue, color:"white", padding:3, paddingHorizontal: 9, borderRadius:20, fontWeight:"bold"},
    nombre: {fontSize: 18, color: COLORS.mainBlue, paddingVertical:2, fontWeight:"bold"},
    direccion: {fontSize: 14, color: "#555", marginTop:7},
}
