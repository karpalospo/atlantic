
import React, {useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../global/styles';

import {Entypo} from 'react-native-vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const File = (props) => {

    const {callback = () => {}} = props


    const [imagePicked, setImagePicked] = useState(false);
    
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Se necesitan estos permisos para poder subir la imagen');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //allowsEditing: true,
            //aspect: [4, 3],
            quality: 1,
        });

        if(!result.cancelled) {
            setImagePicked(true)
        } else {
            setImagePicked(false)
        }
        callback(result)

    };


    const {title} = props
    return (
        <View style={style.attach}>
            <Text style={{color:"#565656", fontSize:15}}>
                <Entypo name={imagePicked ? "check" : "circle"} color={imagePicked ? "green" : "#ccc"} size={16} />  {title}
            </Text>
            <TouchableOpacity onPress={pickImage}>
                <Text style={{color: COLORS.mainBlue, paddingLeft:15, paddingVertical: 10, borderLeftWidth: 1, borderColor: "#eee"}}>
                    <Entypo name={"attachment"} color={COLORS.mainBlue} size={16} /> Adjuntar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default File


const style = {
    attach: {marginVertical: 5, flexDirection:"row", justifyContent:"space-between", alignItems: "center", backgroundColor: "white", borderWidth: 1, borderColor:"#ddd", paddingHorizontal:15, paddingVertical:4, borderRadius: 10}
}