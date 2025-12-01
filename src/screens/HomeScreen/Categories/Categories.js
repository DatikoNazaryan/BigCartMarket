import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Image } from "react-native";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

import Header from "../../../Components/Header/Header";

function Categories(props) {
    const navigation = useNavigation();
    const { categories } = useSelector(store => store.categories);

    return (
        <View style={styles.container}>
            <Header title={"Categories"} style={styles.header} textStyle={styles.headerText} />
            <FlatList
                data={categories}
                numColumns={3}
                columnWrapperStyle={styles.row}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}
                         onPress={() => navigation.navigate("ProductsByCategory", {name: item.name, id: item.id})}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F5F9",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: 118,
        paddingLeft: 10,
        backgroundColor: "#FFFFFF"
    },
    headerText: {
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 20,
        letterSpacing: 0.54,
        textAlign: "center",
        color: "#000",
        marginHorizontal: "auto",
    },
    row: {
        justifyContent: "flex-start",
        gap: 10,
        margin: 17,
    },
    item: {
        width: "30%",
        height: 120,
        backgroundColor: "#FFFBFB",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontFamily: "Poppins-Medium",
        fontSize: 10,
        lineHeight: 15,
        letterSpacing: 0,
        textAlign: "center",
        color: "#868889",
        flexWrap: "wrap",
        maxWidth: 80,
    },
    image: {
        width: 66,
        height: 66,
        borderRadius: 50,
        marginBottom: 8
    },
});

export default Categories;
