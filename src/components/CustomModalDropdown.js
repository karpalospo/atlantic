import React from 'react';
import { Modal, View, TouchableWithoutFeedback, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../global/styles';
import { useCustomBackHandler } from '../hooks/useCustomBackHandler';



export const CustomModalDropdown = ({
    items = [],
    keyExtractor = (item) => `item_${item.id}`,
    onValueChange = () => { },
    placeHolder = "",

    // modal props
    showsVerticalScrollIndicator = true,
    modalVisible = true,
    onCloseModal = () => { },
    onRequestClose = () => { }

}) => {

    useCustomBackHandler({ preventBackEvent: true });

    return (
        <Modal
            animationType="fade"
            transparent={true}
            style={{ width: '100%', alignSelf: 'center', height: '100%', }}
            visible={modalVisible}
            onRequestClose={onRequestClose}
        >

            <TouchableWithoutFeedback onPress={onCloseModal}>
                <View style={{ flex: 1, backgroundColor: "rgba(255,255,255, 0.95)", justifyContent: 'center', }} >
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View>
                            <Text style={[styles.H1, {color: "#333", textAlign:"center", marginBottom: 20}]}>{placeHolder}</Text>
                            <View style={{ alignSelf: 'center', width: '85%', backgroundColor:"white", borderRadius:10, overflow: "hidden", borderWidth: 1, borderColor: "#ddd" }}>
                                
                                <FlatList
                                    data={items}
                                    keyExtractor={keyExtractor}
                                    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity style={{ width: '100%', paddingVertical: 13, paddingHorizontal: 15, borderBottomWidth: index == items.length -1 ? 0 : 1, borderBottomColor: "#ddd" }} onPress={() => onValueChange(item, index)}>
                                                <Text style={{ fontSize: 16, color: 'black' }}>{item.label}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}