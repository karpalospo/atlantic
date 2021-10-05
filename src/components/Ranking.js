
import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, COLORS } from '../global/styles';
import {FontAwesome} from 'react-native-vector-icons'


const Ranking = (props) => {

    const {value} = props

    return (
        <View style={styles.rowLeft}>
            <Text style={_styles.labelAzul}>
                <FontAwesome name="star" size={18} />
                <FontAwesome name="star" size={18} />
                <FontAwesome name="star" size={18} />
                <FontAwesome name="star" size={18} />
                <FontAwesome name="star-o" size={18} />
            </Text>
            <Text style={_styles.labelGris}>{value}</Text>
        </View>
    )
}

export default Ranking

const _styles = {
    labelAzul: {fontSize: 15, paddingVertical:2, color: COLORS.blueText, fontWeight:"bold", letterSpacing: 3},
    labelGris: {fontSize: 15, marginLeft:8, color: "#6F757A", fontWeight:"bold"},
}