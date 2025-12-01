import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

function ToggleCheckbox({ value, onChange }) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChange(!value)}
            style={[
                styles.track,
                { backgroundColor: value ? "#868889" : "#dfe1e4" }
            ]}
        >
            <View
                style={[
                    styles.thumb,
                    { left: value ? 13 : 3 }
                ]}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    track: {
        width: 30,
        height: 20,
        borderRadius: 72,
        position: "relative",
        justifyContent: "center",
        padding: 0,
        transitionDuration: "100ms",
    },

    thumb: {
        width: 14,
        height: 14,
        borderRadius: 50,
        backgroundColor: "#fff",
        position: "absolute",
        transitionDuration: "100ms",
        top: 3,
    },
});

export default ToggleCheckbox;
