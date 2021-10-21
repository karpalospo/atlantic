import React, { useState, createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shortName } from '../global/functions'
//import * as SecureStore from 'expo-secure-store';
//import { deleteSecurelyMultipleValues, getSecurelyValueFor, saveSecurely } from '../helpers/secure_store/secure_utils';
//import { SECURE_KEYS } from '../helpers/secure_store/secure_constants';

export const AuthContext = createContext();

const Provider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState(false)

    const [login, setLogin] = useState(async () => {

        try {
            setLoading(true)

            let cacheuser = await AsyncStorage.getItem('user')
            if(cacheuser) {
                cacheuser = JSON.parse(cacheuser)
                if(cacheuser.nombres) {
                    setUser(cacheuser)
                    setIsAuth(true)
                }
            } else {
                setIsAuth(false)
            }
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
        login,
        isAuth,
        loading,
        getAuth,
        setAuth: (value, user) => {
            
            if(user.id) user.shortname = shortName(user)
            setUser(user)
            setIsAuth(value)
            if(value) {
                AsyncStorage.setItem('user', JSON.stringify(user))
            } else {
                AsyncStorage.removeItem('user');
            }
        }


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