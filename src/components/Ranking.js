
import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, COLORS } from '../global/styles';
import {FontAwesome} from 'react-native-vector-icons'


const Ranking = (props) => {

    const {value, size = 18, onPress, calificacion} = props

    const starColor = COLORS.blueText
    return (
        <View style={styles.rowLeft}>
            {onPress && 
                <View style={{flexDirection:"row"}} >
                    <TouchableOpacity style={_styles.starPress} onPress={() => onPress(1)}><FontAwesome name={calificacion >= 1 ? "star" : "star-o"} size={size} color={starColor} /></TouchableOpacity>
                    <TouchableOpacity style={_styles.starPress} onPress={() => onPress(2)}><FontAwesome name={calificacion >= 2 ? "star" : "star-o"} size={size} color={starColor} /></TouchableOpacity>
                    <TouchableOpacity style={_styles.starPress} onPress={() => onPress(3)}><FontAwesome name={calificacion >= 3 ? "star" : "star-o"} size={size} color={starColor} /></TouchableOpacity>
                    <TouchableOpacity style={_styles.starPress} onPress={() => onPress(4)}><FontAwesome name={calificacion >= 4 ? "star" : "star-o"} size={size} color={starColor} /></TouchableOpacity>
                    <TouchableOpacity style={_styles.starPress} onPress={() => onPress(5)}><FontAwesome name={calificacion >= 5 ? "star" : "star-o"} size={size} color={starColor} /></TouchableOpacity>
                </View>
            }
            {!onPress &&
                <Text style={_styles.labelAzul}>
                    <FontAwesome name={value >= 1 ? "star" : "star-o"} size={size} />
                    <FontAwesome name={value >= 2 ? "star" : "star-o"} size={size} />
                    <FontAwesome name={value >= 3 ? "star" : "star-o"} size={size} />
                    <FontAwesome name={value >= 4 ? "star" : "star-o"} size={size} />
                    <FontAwesome name={value >= 5 ? "star" : "star-o"} size={size} />
                </Text>
            }
            <Text style={_styles.labelGris}>{value}</Text>
        </View>
    )
}

export default Ranking

const _styles = {
    labelAzul: {fontSize: 15, paddingVertical:2, color: COLORS.blueText, fontWeight:"bold", letterSpacing: 3},
    labelGris: {fontSize: 15, marginLeft:8, color: "#6F757A", fontWeight:"bold"},
    starPress: {marginHorizontal:2}
}