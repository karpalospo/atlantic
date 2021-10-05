import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'

export const UtilitiesContext = createContext();

const Provider = ({ children }) => {
    const [userSignUp, setUserSignUp] = useState({
        commerce_phone: '',
        manager_password: '',
        document_type: 0,
        commerce_dni: '',
        accept_data_policy: false,
        accept_term_and_conditions: false,
        manager_dni: '',
        manager_date_of_birth: ''
    })
    const [conversion, setConversion] = useState(0)
    const [userDetails, setUserDetails] = useState(null)
    const [code, setCode] = useState(null)
    const [balance, setBalance] = useState({})
    /**
     * @param {*} commerce_phone 
     * @param {*} manager_password 
     * @param {*} document_type 
     * @param {*} commerce_dni 
     * @param {*} accept_data_policy
     * @param {*} accept_term_and_conditions 
     */

    const saveUserSignUp = async (commerce_phone, manager_password, document_type, commerce_dni, accept_data_policy, accept_term_and_conditions, manager_dni, manager_date_of_birth) => {
        const data = {
            commerce_phone,
            manager_password,
            document_type,
            commerce_dni,
            accept_data_policy,
            accept_term_and_conditions,
            manager_dni: manager_dni || '',
            manager_date_of_birth,
            manager_document_type: 1
        }
        setUserSignUp(data)
    }
    const value = {
        userSignUp,
        setUserSignUp,
        saveUserSignUp,
        setUserDetails,
        userDetails,
        balance,
        setBalance,
        setConversion,
        conversion,
        code,
        setCode
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