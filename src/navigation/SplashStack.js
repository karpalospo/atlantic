import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/Splash';

const Stack = createStackNavigator()

const SplashStack = () => {
    
    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    return (
        <Stack.Navigator
            headerShown={false}
            initialRouteName='Splash'
        >
            <Stack.Screen name='Splash' component={SplashScreen} />

        </Stack.Navigator>
    )
}
export default SplashStack