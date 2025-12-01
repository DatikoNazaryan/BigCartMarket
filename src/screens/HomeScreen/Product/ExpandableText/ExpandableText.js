import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function ExpandableText({ text, lines = 3 }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <View>
            <Text style={styles.text} numberOfLines={expanded ? 0 : lines}>
                {text}
            </Text>

            {!expanded && (
                <TouchableOpacity onPress={() => setExpanded(true)}>
                    <Text style={styles.more}>More...</Text>
                </TouchableOpacity>
            )}

            {expanded && (
                <TouchableOpacity onPress={() => setExpanded(false)}>
                    <Text style={styles.more}>Less...</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 12 * 1.63,
        color: '#868889',
        marginTop: 8
    },
    more: {
        color: "#000",
        marginTop: 4,
        fontWeight: "500",
        fontSize: 12,
    },
});
