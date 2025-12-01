import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";

import { addFavoriteItem, removeFavoriteItem, getUserFavorites, addToBasket } from '../../../helpers/storage';

function ProductCard({ item }) {
    const [favorite, setFavorite] = useState(false);
    const navigation = useNavigation();
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        const loadFavorite = async () => {
            const favorites = await getUserFavorites(user?.id);
            setFavorite(favorites.includes(item?.id));
        };

        loadFavorite();
    }, [user?.id, item?.id]);

    const onClickFavorite = useCallback(async () => {
        if (favorite) {
            await removeFavoriteItem(user?.id, item?.id);
            setFavorite(false);
        } else {
            await addFavoriteItem(user?.id, item?.id);
            setFavorite(true);
        }
    }, [ user?.id, favorite, item?.id]);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Product', { product: item })}
        >
            <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={onClickFavorite}
            >
                <Icon
                    name={favorite ? "heart" : "hearto"}
                    size={20}
                    color={favorite ? "#FE585A" : "#868889"}
                />
            </TouchableOpacity>

            <Image
                source={{ uri: item?.images?.[0] || 'https://via.placeholder.com/90' }}
                style={styles.image}
            />

            <Text style={styles.price}>$ {item.price}</Text>
            <Text style={styles.productTitle}>{item.title}</Text>

            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={async () => {
                  addToBasket(user?.id, item?.id, 1);
                  navigation.navigate("BasketScreen");
              }}
            >
                <Icon name="shoppingcart" size={16} color="#6CC51D" style={{ marginRight: 8 }} />
                <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        width: "48%",
        height: 234,
        alignItems: "center",
        marginBottom: 16,
        paddingTop: 12,
        position: "relative",
        justifyContent: "space-between",
    },
    favoriteIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 4,
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 9999,
    },
    productTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 15,
        lineHeight: 15,
        textAlign: "center",
        color: "#000",
        marginTop: 8
    },
    price: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        lineHeight: 12,
        textAlign: "center",
        color: "#6CC51D",
        marginTop: 4,
    },
    addToCartButton: {
        width: "100%",
        borderTopWidth: 1,
        borderColor: "#EBEBEB",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    addToCartText: {
        color: "#000",
        fontFamily: "Poppins-Medium",
        fontSize: 12,
    },
});

export default ProductCard;
