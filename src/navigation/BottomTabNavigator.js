import React, { useContext, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = ({ navigation }) => {


    return <Tab.Navigator
        initialRouteName={Home}
        screenOptions={({ route, title }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let icon = require("../../assets/icons/calculadoraTab.png")
                return (
                    <Image source={icon} />
                )
            },
            "tabBarHideOnKeyboard": true,
            "tabBarShowLabel": true,
            "tabBarStyle": [
              {
                "display": "flex"
              },
              null
            ]


        })}

    >
        <Tab.Screen name='Home' component={Home} options={{ headerShown:false }} />




    </Tab.Navigator >


}
export default BottomTabNavigator