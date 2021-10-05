import React, { useRef, useEffect } from 'react';
import { View, Text, Image, Dimensions, Platform } from 'react-native'
import { styles } from '../global/styles';
//import LottieView from 'lottie-react-native';


const Splash = (props) => {
    const animation = useRef(null);
    useEffect(() => {
      
    }, [])
    return (
        <View style={[styles.main, styles.center, styles.bgColorMain, { width: '100%', height: '100%' }]}>
            <Image source={require('../../assets/splash.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
        </View>
    );
}

export default Splash;