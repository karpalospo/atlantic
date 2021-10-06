import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/Splash';

const Stack = createStackNavigator()

const SplashStack = () => {
    
    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown:false }} />
        </Stack.Navigator>
    )
}
export default SplashStack