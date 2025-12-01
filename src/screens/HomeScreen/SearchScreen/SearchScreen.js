import React, {useEffect} from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { fetchProducts } from "../../../store/thunks/thunks";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

function SearchScreen(props) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [value, setValue] = React.useState("");
    const products = useSelector(state => state.products.products);

    useEffect(() => {
       dispatch(fetchProducts(`/products?title=${value}`));
    },[value]);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Icon
                    name="search"
                    size={20}
                    color="#868889"
                    style={{ marginLeft: 10, marginRight: 8 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={(value) => setValue(value)}
                />
            </View>
            <FlatList
                // contentContainerStyle={styles.content}
                data={products}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => navigation.navigate('Product', { product: item })}
                        >
                            <View style={styles.imageAndText}>
                                <Image
                                    source={{ uri: item?.images?.[0] }}
                                    style={styles.image}
                                />
                                <View style={styles.texts}>
                                    <Text style={styles.price}>$ {item.price}</Text>
                                    <Text style={styles.title}>{item?.title}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
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
        color: "#000",
        height: "100%",
    },
    item: {
        width: "100%",
        height: 100,
        backgroundColor: "#F4F5F9",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    imageAndText: {
        flexDirection: "row",
    },
    image: {
        width: 64,
        height: 71,
        borderRadius: 50,
        marginBottom: 8
    },
    price: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        lineHeight: 12,
        color: "#6CC51D",
    },
    texts: {
        width: 160,
        height: 57,
        marginLeft: 10,
    },
    title: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0,
        color: "#000",
    },
});

export default SearchScreen;
