import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { CustomModalDropdown } from './CustomModalDropdown';
import { useEffect } from 'react';

export const CustomSelectPicker = ({ 
    items = [],
    onValueChange = () => {},
    style = {}, 
    customLabelKey = 'label', // overwrites the default selected item label key, default `label`  
    placeHolder,
    InitialselectedItem
}) => {

    const [selectedItem, setSelectedItem] = useState(InitialselectedItem)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        items.length > 0 && selectItem(items[0], 0);
    }, [])

    const selectItem = (item, index) => {
        setModalVisible(false);
        setSelectedItem(item[customLabelKey]);
        onValueChange(item, index);
    }

    return (
        <View style={{flex:1}}>
            <TouchableOpacity 
                style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, ...style}} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={{ fontSize: 16, flex:1 }}>{selectedItem ? selectedItem : placeHolder}</Text>
                <View style={{ position: 'absolute', justifyContent: 'center', right: 5 }} pointerEvents="none">
                    <MaterialIcons name="arrow-drop-down" size={22} color={"#444"} />
                </View>
            </TouchableOpacity>
            <CustomModalDropdown
                placeHolder={placeHolder}
                items={items}
                modalVisible={modalVisible}
                onCloseModal={() => setModalVisible(false)}
                onValueChange={(item, index) => selectItem(item, index)}
            />
        </View>
    )
}