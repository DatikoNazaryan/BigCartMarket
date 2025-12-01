import React, {useCallback, useState} from "react";
import {View, FlatList, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";


import Header from "../../Components/Header/Header";
import { getUserFavorites, removeFavoriteItem, addToBasket } from "../../helpers/storage";
import { fetchProducts } from "../../store/thunks/thunks";
import Icon from "react-native-vector-icons/Feather";


function FavoriteScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [favoriteItems, setFavoriteItems] = useState([]);
    const user = useSelector(state => state.users.user);
    const products = useSelector(state => state.products.products);

    useFocusEffect(
        useCallback( () => {
            let isActive = true;

            const fetchFavorites = async () => {
                try {
                    const itemIds = await getUserFavorites(user.id);
                    if (isActive) {
                        setFavoriteItems(itemIds);
                    }
                } catch (e) {
                    console.log("Failed to load favorites:", e);
                }
            }

            dispatch(fetchProducts("/products"));
            fetchFavorites();
            return () => {
                isActive = false;
            };

        }, [user?.id,])
    );

    return (
        <View style={styles.container}>
            <Header title={"Favorites"} style={styles.header} textStyle={styles.headerText} />
            {favoriteItems.length === 0 ? (
                <View style={styles.center}>
                    <Text>No favorites yet.</Text>
                </View>
            ) : (
                <FlatList
                    contentContainerStyle={styles.content}
                    data={products?.length ? products.filter(item => favoriteItems.includes(item.id)) : []}
                    keyExtractor={(item) => item?.id}
                    renderItem={({ item }) => (
                        <Swipeable
                            renderRightActions={() => (
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity
                                        style={styles.deleteBox}
                                        onPress={() => {
                                            removeFavoriteItem(user?.id, item?.id);
                                            setFavoriteItems(prev => prev.filter(id => id !== item.id));
                                        }}
                                    >
                                        <Icon name="trash-2" size={24} color="#FFFFFF" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        >
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

                                <TouchableOpacity
                                  style={styles.button}
                                  onPress={async () => {
                                      addToBasket(user?.id, item?.id, 1);
                                      navigation.navigate("BasketScreen");
                                  }}
                                >
                                    <Icon name="shopping-cart" size={20} color="#fff" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Swipeable>
                    )}
                />
            )}
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
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: 0.54,
        textAlign: 'center',
        color: '#000',
        marginHorizontal: "auto",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: 12,
    },
    item: {
        width: "100%",
        height: 100,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
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
    button: {
        width: 56,
        height: 56,
        borderRadius: 9999,
        backgroundColor: "#6CC51D",
        alignItems: "center",
        justifyContent: "center",
    },
    deleteBox: {
        width: 100,
        height: 100,
        backgroundColor: "#EF574B",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginVertical: 5,
    }
})

export default FavoriteScreen;
