import React, { useContext, useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, InteractionManager } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext'
import AuthStack from './AuthStack'
import AppStacks from './AppStacks'
import SplashStack from './SplashStack'
import {Feather, Entypo} from 'react-native-vector-icons'
import { styles, COLORS } from '../global/styles'
import UserTitle from '../components/UserTitle'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button'


import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';

import { TouchableOpacity } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const image = require("../../assets/face.jpg")


function MenuItem(props) {
    return (
        <TouchableOpacity 
            onPress={props.onPress}
            activeOpacity={0.6} 
            style={{paddingTop:25, paddingBottom: 7, paddingHorizontal:3, borderBottomWidth: 1, borderBottomColor: "#f2f2f2"}}
        >
            <View style={styles.row}>
                <Text style={_styles.labelAzul}>{props.title}</Text>
                <Entypo name={"chevron-thin-right"} color={COLORS.blueText} size={16} />
            </View>
            <Text style={_styles.labelGris}>{props.subtitle}</Text>
        </TouchableOpacity>
    )
}

const NavigationStack = () => {
     
    const { isAuth, loading, getAuth, setAuth} = useContext(AuthContext)
    const [user, setUser] = useState({});

    async function init() {
        setUser( await getAuth())
    }

    useEffect(() => {
        init()

    });

    return (
        <NavigationContainer>
 
            {loading ? 
                <SplashStack/> : 
                isAuth === false ? 
                    <AuthStack /> 
                    : 
                    <Drawer.Navigator
                        screenOptions={{drawerStyle: {width: "80%"}}}
                        drawerContent={props => 
                            <DrawerContentScrollView {...props}>
            
                                <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                                    <Entypo name={"chevron-thin-left"} color={COLORS.mainBlue} size={28} style={{padding:10}} />
                                </TouchableOpacity>
                        
                                <View style={{padding:20}}>
                                    <UserTitle name={user.shortname} image={image} type={user.tipo == "domi" ? "Domiciliario" : "Cliente"}  />
                                    <View style={{height:20}}/>
                                    <MenuItem title="Mi Perfíl" subtitle="Edita tus datos básicos y de contacto" onPress={() => props.navigation.navigate("Perfil")} />
                                    {(user.tipo && user.tipo == "domi") && <MenuItem title="Mis Documentos" subtitle="Revisa el historial de tus domicilios" onPress={() => props.navigation.navigate("Documentos")} />}
                                    <MenuItem title="Contraseña" subtitle="Edita tu contraseña de acceso" onPress={() => props.navigation.navigate("Contrasena")} />
                                    <MenuItem title="Mis Domicilios" subtitle="Revisa el historial de tus domicilios" onPress={() => props.navigation.navigate("Domicilios")} />
                                    <MenuItem title="Ayuda" subtitle="Consulta y aprende sobre Atlantiexpress" onPress={() => props.navigation.navigate("Ayuda")} />
                                    <View style={{height:30}}/>
                                    <View style={styles.rowCenter}>
                                        <Button 
                                            title="Cerrar Sesión"
                                            styleMode="blue"
                                            buttonStyle={{minWidth:200}}
                                            onPress={async () => {
                                                setAuth(false, {}); 
                                                await AsyncStorage.removeItem('user'); 
                                            }}
                                        />
                                    </View>
                                </View>
                            </DrawerContentScrollView>
                        }
                    >
                        <Drawer.Screen name="AppStacks" component={AppStacks} options={{ headerShown:false}} />
                    </Drawer.Navigator>
                    
            }
        </NavigationContainer>
    )
}
export default NavigationStack

const _styles = {
    labelGris: {fontSize: 13, color: "#888", paddingVertical:2, paddingRight: 20},
    labelAzul: {fontSize: 16, paddingVertical:2, color: COLORS.blueText},
}