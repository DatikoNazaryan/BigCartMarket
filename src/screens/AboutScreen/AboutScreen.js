import React from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import AboutHeader from "./AboutHeader/AboutHeader";
import AvatarInfo from "../../Components/AvatarInfo/AvatarInfo";

import Icon from "react-native-vector-icons/Feather";
import { logout } from "../../store/slices/userSlice";

function AboutScreen() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);


    return (
        <View style={styles.container}>
            <AboutHeader />
            <AvatarInfo user={user} />
            <TouchableOpacity style={styles.button} onPress={() => dispatch(logout())}>
                <Icon name="log-out" size={24} color="#28B446" />
                <Text style={styles.signOut}>Sign out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F5F9",
    },
    scroll: {
        paddingBottom: 40,
        alignItems: "center",
    },
    button: {
        marginTop: 40,
        flexDirection: "row",
        paddingLeft: 15,
        alignItems: "center",
    },
    signOut: {
        marginLeft: 10,
        fontFamily: "Poppins",
        fontWeight: "600",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.36,
        textAlign: "center",
        color: "#040404",
    }
});

export default AboutScreen;
