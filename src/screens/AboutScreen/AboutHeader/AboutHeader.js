import React from "react";
import { View, StyleSheet } from "react-native";

function AboutHeader() {
    return <View style={styles.header} />;
}

const styles = StyleSheet.create({
        header: {
            width: "100%",
            height: 145,
            backgroundColor: "#FFFFFF",
            zIndex: 1,
        },
});

export default AboutHeader;
