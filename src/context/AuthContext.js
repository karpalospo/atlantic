import React, { useState, createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'
import moment from 'moment'
//import * as SecureStore from 'expo-secure-store';
//import { deleteSecurelyMultipleValues, getSecurelyValueFor, saveSecurely } from '../helpers/secure_store/secure_utils';
//import { SECURE_KEYS } from '../helpers/secure_store/secure_constants';

export const AuthContext = createContext();

const Provider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(false)
    const [provideToken, setProvidedToken] = useState(null)


    const [user, setUser] = useState({logged:false})

    const [login, setLogin] = useState(async () => {
        try {
            setLoading(true)
            setIsAuth(false)
            /*//const access_token = await getSecurelyValueFor(SECURE_KEYS.ACCESS);
            if (access_token) {
                setIsAuth(true)
                setTimeout(() => {
                    setLoading(false)
                }, 2000);
                return
            } else {
                setLoading(false)

            }*/
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setIsAuth(false)
        }
    })

    const getAuth = async () => {
        return user
    }

    const value = {
        isAuth,
        login,
        loading,
        getAuth,
        setAuth: (value, user) => {

            if(user.nombres) {
                let nombres = user.nombres.split(" ")
                let apellidos = user.apellidos.split(" ")

                user.shortname = user.nombres + " " + user.apellidos
                if(nombres.length > 0) user.shortname = nombres[0]
                if(apellidos.length > 0) user.shortname += " " + apellidos[0]
            }
            
            setUser(user)
            setIsAuth(value)
        },
        /*activateAuth: async (token, refresh) => {
            try {
                const token_created = moment().format('HH:mm:ss')
                const secureTokenPromises = [
                    saveSecurely(SECURE_KEYS.ACCESS, token),
                    saveSecurely(SECURE_KEYS.REFRESH, refresh),
                    saveSecurely(SECURE_KEYS.TOKEN_CREATED, JSON.stringify(token_created))
                ]; 
                
                await Promise.all(secureTokenPromises);

                setLogin(true);
                setIsAuth(true);
                setProvidedToken(null)
            } catch (error) {
            }
        },

        removeAuth: async () => {

            setLogin(false);
            setIsAuth(false);
            setProvidedToken(null)
            try {
                await deleteSecurelyMultipleValues([SECURE_KEYS.ACCESS, SECURE_KEYS.REFRESH, SECURE_KEYS.TOKEN_CREATED, SECURE_KEYS.FINGER])
                const storageKeys = await AsyncStorage.getAllKeys();
                await AsyncStorage.multiRemove(storageKeys);    
            } catch (error) {
                // TODO: what we gonna do removing async storage keys ???   
            }
        },*/
        setProvidedToken,
        provideToken

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default {
    Provider,
    Consumer: AuthContext.Consumer
};