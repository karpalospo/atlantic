import React, {useContext, useEffect, useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'


import Blank from '../screens/Blank'
import Home from '../screens/Home'
import HomeDomi from '../screens/HomeDomi'
import Status from '../screens/Status'
import StatusDomi from '../screens/StatusDomi'
import Domicilios from '../screens/Domicilios'
import Perfil from '../screens/Perfil'
import Contrasena from '../screens/Contrasena'
import Ayuda from '../screens/Ayuda'
import Documentos from '../screens/Documentos'
import Alert from '../screens/Alert'
import Camara from '../screens/Camera'



const Stack = createStackNavigator()

const AppStacks = () => {
    
    const { isAuth, loading, getAuth, setAuth} = useContext(AuthContext)
    const [user, setUser] = useState({});

    async function init() {
        setUser(await getAuth())
    }

    useEffect(() => {

        init()

    });

    return (
        <Stack.Navigator initialRouteName={"Blank"}>

            <Stack.Screen name='Blank' component={Blank} options={{ headerShown:false }}/>
            <Stack.Screen name='Home' component={Home} options={{ headerShown:false }}/>
            <Stack.Screen name='HomeDomi' component={HomeDomi} options={{ headerShown:false }}/>
            <Stack.Screen name='Status' component={Status} options={{ headerShown:false }}/>
            <Stack.Screen name='StatusDomi' component={StatusDomi} options={{ headerShown:false }}/>
            <Stack.Screen name='Domicilios' component={Domicilios} options={{ headerShown:false }}/>
            <Stack.Screen name='Perfil' component={Perfil} options={{ headerShown:false }}/>
            <Stack.Screen name='Contrasena' component={Contrasena} options={{ headerShown:false }}/>
            <Stack.Screen name='Ayuda' component={Ayuda} options={{ headerShown:false }}/>
            <Stack.Screen name='Documentos' component={Documentos} options={{ headerShown:false }}/>
            <Stack.Screen name='Alert' component={Alert} options={{ headerShown:false }}/>
            <Stack.Screen name='Camara' component={Camara} options={{ headerShown:false }}/>
            
        </Stack.Navigator>
    )
}
export default AppStacks