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
    const [stopLoopServices, setStopLoopServices] = useState(false)
    const [stopLoopServicesID, setStopLoopServicesID] = useState(false)
    const [loopOrden, setLoopOrden] = useState(false)

    
    let loopingServices = false
    let loopingServicesID = false
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const loopServices = async (callback) => {
        
        if(loopingServices) return
        loopingServices = true

        for(let i = 0; i <= 9999999; i++) {
            
            if(stopLoopServices) break;

            const res = await API.POST.getServices()
            if(!res.error) {
                if(res.message.data) {
                    callback(res.message.data)
                }
            }
            await sleep(4000);
        }
 
    }

    const loopServicesID = async (callback) => {
        
        if(loopingServicesID) return
        loopingServicesID = true

        for(let i = 0; i <= 9999999; i++) {
            
            if(stopLoopServicesID) break;
            if(loopOrden) {
                const res = await API.POST.getServices({orden: loopOrden})
                if(!res.error) {
                    if(res.message.data) {
                        callback(res.message.data[loopOrden])
                    }
                }
            }
            await sleep(5000);
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
        setStopLoopServices,
        setLoopOrden,

        loopServicesID,
        setStopLoopServicesID

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