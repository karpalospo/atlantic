import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'
import { API } from '../global/services'

export const UtilitiesContext = createContext();

const Provider = ({ children }) => {

    const [conversion, setConversion] = useState(0)
    const [userDetails, setUserDetails] = useState(null)
    const [code, setCode] = useState(null)
    const [balance, setBalance] = useState({})

    
    let loopingServices = false
    let loopingServicesID = false
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const loopServices = async (callback) => {
        
        if(loopingServices) return
        loopingServices = true

        for(let i = 0; i <= 9999999; i++) {
   
            const res = await API.POST.getServices()
            if(!res.error) {
                if(res.message.data) {
                    callback(res.message.data)
                }
            }
            await sleep(4000);
        }
 
    }

    const loopServicesID = async (orden, callback) => {
        
        if(loopingServicesID) return
        loopingServicesID = true

        for(let i = 0; i <= 9999999; i++) {
   
            const res = await API.POST.getServices({orden})

            if(!res.error) {
                if(res.message.data) {
                    callback(res.message.data[orden])
                }
            }
            await sleep(6000);
        }
 
    }



    const value = {
        setUserDetails,
        userDetails,
        balance,
        setBalance,
        setConversion,
        conversion,
        code,
        setCode,

        loopServices,
        loopServicesID

    }
    return (
        <UtilitiesContext.Provider value={value}>
            {children}
        </UtilitiesContext.Provider>
    )
}
export default {
    Provider,
    Consumer: UtilitiesContext.Consumer
};