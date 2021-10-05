import React from 'react';
import NavigationStack from './src/navigation/NavigationStack';
import UtilitiesContext from './src/context/UtilitiesContext';
import AuthContext from './src/context/AuthContext';
import { useFonts } from 'expo-font';


export default function App() {

  const [loaded] = useFonts({
    rns: require('./assets/font/RNSSanz-Normal.otf'),
    rns_semi: require('./assets/font/RNSSanz-SemiBold.otf'),
    rns_bold: require('./assets/font/RNSSanz-Bold.otf'),
  });


  if (!loaded) {
    return null;
  }
  return (
    <>
      <AuthContext.Provider>
        <UtilitiesContext.Provider>
          <NavigationStack />
        </UtilitiesContext.Provider>
      </AuthContext.Provider>
    </>);
}

