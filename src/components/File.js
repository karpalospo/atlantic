
import React, {useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../global/styles';

import {Entypo} from 'react-native-vector-icons'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { uploadFile } from '../global/functions'

const File = (props) => {

    const {callback = () => {}, id} = props


    const [imagePicked, setImagePicked] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    
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

        if(uploading) return

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //allowsEditing: true,
            //aspect: [4, 3],
            quality: 1,
        });

        /*let result = await DocumentPicker.getDocumentAsync({
            type: [DocumentPicker.types.pdf],
        })*/

        if(!result.cancelled || !result.cancel) {
            setImagePicked(true)
        } else {
            setImagePicked(false)
        }

        const cbProgress = (e) => callback(id, "progress", e)
        const cbComplete = (e) => {
            setUploading(false)
            callback(id, "complete", e)
        }
        const cbError = (e, msg) => {
            setUploading(false)
            setUploadError(true)
            console.log(e)
            callback(id, "error", msg)
        }

        if(!result.cancelled) {
            setUploading(true)
            setUploadError(false)
            uploadFile(result.uri, "upload", 0, cbComplete, cbProgress, cbError)
        } else {
            callback(id, "error", "cancelled")
        }
//console.log(result)
        /*if(!result.cancel && result.type == "success") {
            setUploading(true)
            setUploadError(false)
            uploadFile(result.uri, result.name, result.size, cbComplete, cbProgress, cbError)
        } else {
            callback(id, "error", "cancelled")
        }*/
        

    };


    const {title} = props
    return (
        <View style={style.attach}>
            <Text style={{color:"#565656", fontSize:15}}>
                {uploading && <Entypo name="arrow-with-circle-up" color="#999" size={16} />}
                {!uploading && !imagePicked && <Entypo name="circle" color="#ccc" size={16} />}
                {imagePicked && !uploading && !uploadError && <Entypo name="check" color="green" size={16} />}
                {imagePicked && uploadError && <Entypo name="circle-with-cross" color="red" size={16} />}
                {" "} {title}
            </Text>
            <TouchableOpacity onPress={pickImage}>
                <Text style={{color: COLORS.mainBlue, paddingLeft:15, paddingVertical: 10, borderLeftWidth: 1, borderColor: "#eee", opacity: uploading ? 0.3 : 1}}>
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