import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {useNavigation} from "@react-navigation/native";

function Header(props) {
    const navigation = useNavigation();
    return (
        <View style={props.title === "Welcome" ? styles.header : props.style}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                {!props.welcome && (
                    <Icon
                        name="arrow-left"
                        size={24}
                        color={props.title === "Welcome" ? "#fff" : "#000"}
                    />
                )}
            </TouchableOpacity>

            <Text style={props.title === "Welcome" ? styles.headerText : props.textStyle}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems: "center",
       width: 236,
       height: 27,
       marginLeft: 17,
       marginTop: 63,
    },
    headerText: {
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: 0.54,
        textAlign: "center",
        color: "#fff",
    },
});

export default Header;
