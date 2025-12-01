import React from "react";
import {TextInput, StyleSheet, View, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

function SearchBar({ value, onChange }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
           <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
               <Icon
                   name="search"
                   size={20}
                   color="#868889"
                   style={{ marginLeft: 10, marginRight: 8 }}
               />
           </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor="#999"
                onFocus={() => navigation.navigate("SearchScreen")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F4F5F9",
        borderRadius: 5,
        marginTop: 31,
        marginHorizontal: 16,
        height: 50,
    },
    input: {
        flex: 1,
        paddingHorizontal: 8,
        fontFamily: "Poppins-Medium",
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0,
        color: "#868889",
        height: "100%",
    },
});

export default SearchBar;
