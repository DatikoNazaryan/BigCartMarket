import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import FavoriteIcon from "react-native-vector-icons/AntDesign";

import ImageSlider from "./ImageSlider/ImageSlider";
import QuantityInput from "./QuantityInput/QuantityInput";
import ExpandableText from "./ExpandableText/ExpandableText";
import { addFavoriteItem, removeFavoriteItem, getUserFavorites, addToBasket } from "../../../helpers/storage";

function Product(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params || {};
    const user = useSelector(store => store.users.user);

    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (!user || !product?.id) return;

        const loadFavorite = async () => {
            try {
                const favorites = await getUserFavorites(user.id);
                setFavorite(Array.isArray(favorites) && favorites.includes(product.id));
            } catch (e) {
                console.log("Load favorite error:", e);
                setFavorite(false);
            }
        };

        loadFavorite();
    }, [user?.id, product?.id]);

    const onClickFavorite = useCallback(async () => {
        if (!user || !product?.id) return;

        try {
            if (favorite) {
                await removeFavoriteItem(user.id, product.id);
                setFavorite(false);
            } else {
                await addFavoriteItem(user.id, product.id);
                setFavorite(true);
            }
        } catch (e) {
            console.log("Favorite toggle error:", e);
        }
    }, [user?.id, favorite, product?.id]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color={"#fff"} />
            </TouchableOpacity>

            <ImageSlider images={product?.images} />

            <View style={styles.productCard}>
                <TouchableOpacity style={styles.favoriteIcon} onPress={onClickFavorite}>
                    <FavoriteIcon
                        name={favorite ? "heart" : "hearto"}
                        size={20}
                        color={favorite ? "#FE585A" : "#868889"}
                    />
                </TouchableOpacity>

                <Text style={styles.price}>$ {product?.price}</Text>
                <Text style={styles.productTitle}>{product?.title}</Text>
                <ExpandableText text={product?.description} />
                <QuantityInput onAddToCart={async (qty) => {
                    await addToBasket(user.id, product.id, qty);
                    navigation.navigate("BasketScreen");
                }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    productCard: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        // height: 358,
        backgroundColor: "#F4F5F9",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    goBack: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 9999 },
    favoriteIcon: {
        position: "absolute",
        top: 20,
        right: 10,
        zIndex: 10,
        backgroundColor: "#F4F5F9",
        borderRadius: 20,
        padding: 4,
    },
    productTitle: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 23,
        color: '#000',
        marginTop: 8
    },
    price: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 18,
        color: '#28B446'
    },
});

export default Product;
