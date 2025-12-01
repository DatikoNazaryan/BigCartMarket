import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator, Text} from "react-native";
import {useRoute} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";

import Header from "../../../../Components/Header/Header";
import ProductCard from "../../../../Components/ProductsList/ProductCard/ProductCard";

import { fetchProducts } from "../../../../store/thunks/thunks";

function ProductsByCategory(props) {
    const route = useRoute();
    const { name, id } = route.params || {};
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(store => store.products);

    useEffect(() => {
        dispatch(fetchProducts(`/products?categoryId=${id}`));
    },[dispatch, id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (

        <View style={styles.container}>
            <Header title={name} style={styles.header} textStyle={styles.headerText} />
            {products && products.length > 0 ? (
                <FlatList
                    data={products}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    renderItem={({ item }) => (<ProductCard item={item} />)}
                />
                ) : (
                <Text style={styles.noProducts}>There are no products in this category.</Text>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
    noProducts: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 18,
    }
})

export default ProductsByCategory;
