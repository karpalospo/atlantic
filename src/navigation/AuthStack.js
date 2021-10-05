import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainAuth from '../screens/MainAuth'
import Login from '../screens/Login'
import Register from '../screens/Register'
import RegisterDomi from '../screens/RegisterDomi'
import RegisterDomi2 from '../screens/RegisterDomi2'
import RegisterConfirm from '../screens/RegisterConfirm'

const Stack = createStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="MainAuth">
            <Stack.Screen name='MainAuth' component={MainAuth} options={{ headerShown:false }} />
            <Stack.Screen name='singin' component={Login}  options={{ headerShown:false }} />
            <Stack.Screen name='singup' component={Register}  options={{ headerShown:false }} />
            <Stack.Screen name='singup2' component={RegisterDomi}  options={{ headerShown:false }} />
            <Stack.Screen name='singup3' component={RegisterDomi2}  options={{ headerShown:false }} />
            <Stack.Screen name='singupconfirm' component={RegisterConfirm}  options={{ headerShown:false }} />
        </Stack.Navigator>
    )
}

export default AuthStack


