import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Image, Alert} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import {getBasket, removeFromBasket, updateBasketQty, clearBasket} from "../../helpers/storage";
import {useFocusEffect} from "@react-navigation/native";
import Header from "../../Components/Header/Header";
import {Swipeable} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { fetchProducts } from '../../store/thunks/thunks';

function BasketScreen(props) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.users.user);
    const products = useSelector(state => state.products.products);
    const [basket, setBasket] = useState([]);
    const totalPrice = basket.reduce((acc, item) => (acc + item?.price * item?.qty),0);

    useFocusEffect(
        useCallback( () => {
            let isActive = true;

            const load = async () => {
                const data = await getBasket(user.id);
                const cartItems = data.map(item => {
                    const product = products.find(p => p.id === item.id);

                    return product
                        ? { ...product, qty: item.qty }
                        : null;
                }).filter(Boolean);

                if(isActive) {
                    setBasket(cartItems);
                }
            };
            dispatch(fetchProducts("/products"));
            load();
            return () => {
                isActive = false;
            };

        }, [user?.id,])
    );

    return (
        <View style={styles.container}>
            <Header title={"Shopping Cart"} style={styles.header} textStyle={styles.headerText} />
            {basket.length === 0 ? (
                <View style={styles.center}>
                    <Text>No shopping cart yet.</Text>
                </View>
            ) : (
                <FlatList
                    contentContainerStyle={styles.content}
                    data={basket}
                    keyExtractor={(item) => item?.id}
                    renderItem={({ item }) => (
                        <Swipeable
                            renderRightActions={() => (
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity
                                        style={styles.deleteBox}
                                        onPress={async () => {
                                            await removeFromBasket(user?.id, item.id);
                                            setBasket(prev => prev.filter(i => i.id !== item.id));
                                        }}
                                    >
                                        <Icon name="trash-2" size={24} color="#FFFFFF" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        >
                            <View style={styles.item}>
                                <TouchableOpacity
                                    style={styles.imageAndText}
                                >
                                    <Image
                                        source={{ uri: item?.images?.[0] }}
                                        style={styles.image}
                                    />
                                    <View style={styles.texts}>
                                        <Text style={styles.price}>$ {item.price}</Text>
                                        <Text style={styles.title}>{item?.title}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.quantityButton}>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            const newQty = item.qty + 1;
                                            const updated = basket.map(p =>
                                                p.id === item.id ? { ...p, qty: newQty } : p
                                            );
                                            setBasket(updated);
                                            await updateBasketQty(user.id, item.id, newQty);
                                        }}
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                    <View style={styles.quantity}>
                                        <Text style={styles.quantityText}>{item.qty}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={async () => {
                                            if (item.qty > 1) {
                                                const newQty = item.qty - 1;
                                                const updated = basket.map(p =>
                                                    p.id === item.id ? { ...p, qty: newQty } : p
                                                );
                                                setBasket(updated);

                                                await updateBasketQty(user.id, item.id, newQty);
                                            }
                                        }}
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>-</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Swipeable>
                    )}
                />
            )}
            <View style={styles.TotalChargePrice}>
                <View style={styles.SubTotalCharge}>
                    <Text style={styles.subChargePrice}>Subtotoal</Text>
                    <Text style={styles.subChargePrice}>$ {totalPrice}</Text>
                </View>
                <View style={styles.SubTotalCharge}>
                    <Text style={styles.subChargePrice}>Shepping Charges</Text>
                    <Text style={styles.subChargePrice}>$ 1.68</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.SubTotalCharge}>
                    <Text style={styles.totalPrice}>Total</Text>
                    <Text style={styles.totalPrice}>$ {totalPrice + 1.68}</Text>
                </View>
                <LinearGradient
                    colors={['#AEDC81', '#6CC51D']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.addButton}
                >
                    <TouchableOpacity
                        style={styles.addContent}
                        onPress={async () => {
                            if(basket.length === 0) {
                                Alert.alert("There are no products in your cart.")
                            } else {
                                await clearBasket(user?.id);
                                setBasket([]);
                                Alert.alert("Payment Successful", "Your payment was successful!");
                            }
                        }}
                    >
                        <Text style={styles.addButtonText}>Checkout</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: "#F4F5F9",
        justifyContent: "space-between",
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
        lineHeight: 20,
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
    quantityButton: {
        height: '100%',
        marginRight: 10,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    button: {
        width: 18,
        height: "30%",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: "Poppins-Medium",
        fontSize: 15,
        color: "#6CC51D",
    },
    quantityText: {
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0,
        color: "#868889",
    },
    deleteBox: {
        width: 100,
        height: 100,
        backgroundColor: "#EF574B",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginVertical: 5,
    },
    TotalChargePrice: {
        width: "100%",
        height: 220,
        backgroundColor: "#FFFFFF",
        padding: 10,
    },
    SubTotalCharge: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    subChargePrice: {
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: 0,
        color: "#868889",
    },
    line: {
        width: "100%",
        marginTop: 20,
        height: 2,
        backgroundColor: "#EBEBEB",
    },
    totalPrice: {
        ontFamily: "Poppins",
        fontWeight: "600",
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: 0,
        color: "#000",
    },
    addButton: {
        width: '100%',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 15,
        paddingRight: 12,
        borderRadius: 8,
    },
    addContent: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addButtonText: {
        color: '#fff',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: 'center',
    },
});

export default BasketScreen;
