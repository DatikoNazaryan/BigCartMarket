import React from "react";
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

function CategoriesList() {
    const { categories } = useSelector(store => store.categories);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Categories</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
                    <Icon name="right" size={20} color="#868889" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}
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
    container: { marginTop: 15 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 16,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
    },
    card: {
        width: 76,
        height: 98,
        marginRight: 12,
        alignItems: "center",
        padding: 10,
        borderRadius: 12
    },
    image: {
        width: 43,
        height: 45,
        borderRadius: 50,
        marginBottom: 8
    },
    name: {
        fontFamily: "Poppins-Medium",
        fontSize: 10,
        textAlign: "center",
        color: "#868889",
    },
});

export default CategoriesList;
