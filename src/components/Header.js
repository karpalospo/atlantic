import React, {useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Image, Platform, StatusBar, SafeAreaView, Switch } from 'react-native';
import {Feather, Entypo} from 'react-native-vector-icons'
import { styles, COLORS } from '../global/styles'
import * as WebBrowser from 'expo-web-browser';


const Header = (props) => {
    

    const {onBack, titleCenter, onSwitch, enableSwitch = false, noMenu, navigation} = props


    const logo = require("../../assets/logo-menu.png")
    const h = Platform.OS == "ios" ? StatusBar.currentHeight + 40 : 0


    return (

        <SafeAreaView style={{paddingTop: h, backgroundColor: titleCenter ? "transparent" : "white"}} forceInset={{top: "never", bottom: "never"}}>
            
            {titleCenter ?
                <StatusBar backgroundColor="white" barStyle="dark-content"/>
            :
                <StatusBar backgroundColor={COLORS.mainBlue} barStyle="light-content"/>
            }


            <View style={style.container}>

                {onBack ? 
                    <TouchableOpacity onPress={onBack}>
                        <Entypo name={"chevron-thin-left"} color={COLORS.mainBlue} size={28} style={{padding:10}} />
                    </TouchableOpacity>
                :
                    noMenu ? 
                    <View style={{width:40}} /> 
                    :
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Feather name={"menu"} color={COLORS.mainBlue} size={34} style={{padding:10}} />
                    </TouchableOpacity>
                }

                {titleCenter && <Text style={{fontFamily: "rns_semi", fontSize:21, flex:1, textAlign:"center"}}>{titleCenter}</Text>}

      
                {!titleCenter && <Image
                        style={{ width: "25%", height:60, marginRight:10}}
                        source={logo}
                        resizeMode="contain"
                    />
                }

                {onSwitch &&
                <View style={{width:60}}>      
                    <Switch
                        trackColor={{ false: "#767577", true: COLORS.red }}
                        thumbColor={enableSwitch ? "#fff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={onSwitch}
                        value={enableSwitch}
                    />
                </View>
                }
                {!onSwitch && <View style={{width:40}} /> }

            
            </View>
            
        </SafeAreaView>
        
    )
};
export default Header

const style = {
    container: {paddingHorizontal:15, flexDirection:"row", alignItems: "center", justifyContent:"space-between", minHeight:60},
    text: {textAlign: "center", color: "white", fontSize:17}
}