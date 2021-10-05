import { StyleSheet, Platform, Dimensions } from "react-native"
import { color } from "react-native-reanimated"

export const COLORS = {
    mainBlue: "#0090CC",
    red: "#E12D2D",
    mainText: "#545D62",
    blueText: "#0062AE",
    border: "#ddd",
    green: "#04B100"
}

export const styles = StyleSheet.create({

    main: {flex: 1},
    p: {fontFamily: "rns_semi", fontSize:17, marginVertical:20, textAlign: "center", color: COLORS.mainText},
    H1: {fontFamily: "rns_bold", fontSize:21},
    H3: {fontFamily: "rns_semi", fontSize:17, color: COLORS.mainText},
    input: {width:"100%", height: 56, backgroundColor: "#ffffff", marginVertical:7, borderRadius: 10, paddingHorizontal: 15, paddingVertical: 18, fontFamily: "rns", fontSize: 18, borderColor:"#ccc", borderWidth: 1},
    link: {padding:3, color: COLORS.blueText, fontSize:18, fontFamily: "rns_semi"},
    row: {flexDirection:"row", alignItems:"center", justifyContent: "space-between"},
    rowCenter: {flexDirection:"row", alignItems:"center", justifyContent: "center"},
    rowLeft: {flexDirection:"row", alignItems:"center", justifyContent: "flex-start"},
    rowRight: {flexDirection:"row", alignItems:"center", justifyContent: "flex-end"}
})