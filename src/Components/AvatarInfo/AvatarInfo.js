import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function AvatarInfo({ user }) {
    return (
        <View style={styles.content}>
            <Image
                source={{ uri: user?.avatar }}
                style={styles.avatar}
            />
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.title}>{user?.email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginTop: -60,
        alignItems: "center",
        zIndex: 10,
    },
    avatar: {
        width: 114,
        height: 114,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#fff",
        marginBottom: 5,
        zIndex: 20,
    },
    name: {
        fontFamily: "Poppins",
        fontWeight: "600",
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: -0.5,
        textAlign: "center",
        color: "#000",
    },
    title: {
        fontFamily: "Poppins",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: -0.5,
        textAlign: "center",
        color: "#868889",
    },
});

export default AvatarInfo;
