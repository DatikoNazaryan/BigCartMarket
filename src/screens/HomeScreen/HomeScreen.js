import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {fetchCategories, fetchProducts, getUserById} from "../../store/thunks/thunks";

import SearchBar from "../../Components/SearchBar/SearchBar";
import ProductsList from "../../Components/ProductsList/ProductsList";
import LinearGradient from "react-native-linear-gradient";

function HomeScreen() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.users.userId);
    const loadingCategores = useSelector(store => store.categories.loading);
    const errorCategores = useSelector(store => store.categories.error);
    const loadingProducts = useSelector(store => store.products.loading);
    const errorProducts = useSelector(store => store.products.error);

    useEffect(() => {
        if (userId?.sub) {
            dispatch(getUserById(userId.sub));
        }
        dispatch(fetchCategories("/categories"));
    }, [dispatch]);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchProducts("/products?offset=0&limit=10"));
        }, [dispatch])
    );

    if (loadingCategores || loadingProducts) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (errorCategores || errorProducts) {
        return (
            <View style={styles.center}>
                <Text>Error: {errorCategores || errorProducts}</Text>
            </View>
        );
    }

    return (
        <LinearGradient
            colors={['#FFFFFF', '#F4F5F9']}
            style={{ flex: 1 }}
        >
            <SearchBar />
            <ProductsList />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default HomeScreen;
