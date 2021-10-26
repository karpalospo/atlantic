import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, COLORS } from '../global/styles';
import Ranking from "../components/Ranking";

const UserTitle = (props) => {

    const {name, image, type, data, domiMode} = props


    const imageSize = { width: 70, height:70}
    const borderRadius = 36

    return (

        <TouchableOpacity activeOpacity={0.6} style={styles.rowCenter}>
            <View style={{marginRight: 20, borderRadius, overflow: "hidden"}}>
                <Image
                    style={imageSize}
                    source={image}
                    resizeMode="contain"
                />
            </View>
            <View>
                <Text style={_styles.nombre}>{name}</Text>
                {type && <Text style={_styles.label1}>{type}</Text>}
                {data && 
                <View>
                    <View style={styles.rowLeft}>
                        <Text style={_styles.label1}>Placa:</Text>
                        <Text style={{fontWeight:"bold", fontSize:16, letterSpacing: 1, color:"#333"}}>{data.placa}</Text>
                    </View>
                    <View style={styles.rowLeft}>
                        <Text style={_styles.label1}>Reputación</Text>
                        <Ranking value={data.rep} />
                    </View>
                </View>
                }
            </View>
        </TouchableOpacity>


    )

}


export default UserTitle

const _styles = {
    label1: {fontSize: 15, color: "#888", paddingVertical:2, marginRight:10},
    labelAzul: {fontSize: 15, paddingVertical:2, color: COLORS.blueText, fontWeight:"bold", letterSpacing: 3},
    labelGris: {fontSize: 15, marginLeft:8, color: "#6F757A", fontWeight:"bold"},
    nombre: {fontSize: 21, color: COLORS.blueText, paddingVertical:2, fontWeight:"400"}
}