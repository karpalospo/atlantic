import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { COLORS } from '../global/styles';
import {Ionicons, MaterialIcons} from 'react-native-vector-icons'


export default function Camara(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ backgroundColor:"yellow", flex: 1 }}>
            
            <View style={{ height: 50, position: "absolute", top: 20, paddingHorizontal:20, left: 0, zIndex:1, width:"100%", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => props.navigation.navigate("Alert")}>
                    <MaterialIcons name="arrow-back-ios" size={36} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{ height: 60, position: "absolute", width:"100%", zIndex:1, left: 0, bottom: 100, flexDirection: "row", alignItems:"center", justifyContent:"space-around" }}>
                <TouchableOpacity
                    style={{ width: 40, height: 40}}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Ionicons name="camera-reverse" size={36} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ width: 60, height: 60, backgroundColor: COLORS.red, borderRadius:31, borderWidth:2, borderColor:"white" }}
                    onPress={() => {}}
                />
                <TouchableOpacity
                    style={{ width: 40, height: 40}}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Ionicons name="camera-reverse" size={36} color="white" />
                </TouchableOpacity>
            </View>

            <Camera style={{ flex: 1, position:"relative", zIndex:0 }} type={type}>
 
            </Camera>

        </View>
    );
}