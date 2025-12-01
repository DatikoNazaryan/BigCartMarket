import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

function QuantityInput({ onAddToCart }) {
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const onChange = useCallback((text) => {
        const num = Number(text);
        if (!isNaN(num) && num > 0) {
            setQuantity(num);
        } else {
            setQuantity(1);
        }
    },[]);

    return (
        <View style={styles.container}>
            <View style={styles.counter}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder={"Quantity"}
                    placeholderTextColor="#868889"
                    onChangeText={onChange}
                />
                <TouchableOpacity onPress={decrement} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>

                <View style={styles.quantity}>
                    <Text style={styles.quantityText}>{quantity}</Text>
                </View>

                <TouchableOpacity onPress={increment} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={['#AEDC81', '#6CC51D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addButton}
            >
                <TouchableOpacity
                    style={styles.addContent}
                    onPress={() => (onAddToCart(quantity), setQuantity(1))}
                >
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                    <Icon
                        name="shopping-cart"
                        size={20}
                        color="#fff"
                        style={{ marginLeft: 8 }}
                    />
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        height: 50,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        paddingLeft: 20,
        paddingRight: 20,
        marginVertical: 4,
    },
    button: {
        width: 50,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: '600',
        color: '#6CC51D',
        fontFamily: 'Poppins-Medium',
        fontSize: 22,
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: 'center',
    },
    quantity: {
        width: 50,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRightColor: '#F4F5F9',
        borderLeftColor: '#F4F5F9',
    },
    quantityText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: 'center',
    },
    addButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 12,
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
    input: {
        width: "60%",
        height: 50,
        fontSize: 16,
        paddingVertical: 0,
        paddingLeft: 15,
    },
});

export default QuantityInput;
