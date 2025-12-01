import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/EvilIcons';
import AuthBackground from "../../Components/AuthBackground/AuthBackground";

function Welcome() {
    const navigation = useNavigation();

    return (
        <AuthBackground>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.desc}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <LinearGradient
                        colors={['#AEDC81', '#6CC51D']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                    >
                        <Icon name="user" size={28} color="#FFFFFF" />
                        <Text style={styles.buttonText}>Create an account</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                    <Text style={styles.text}>
                        Already have an account ? <Text style={styles.span}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </AuthBackground>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#F4F5F9',
        width: "100%",
        height: 358,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
        paddingTop: 31,
    },
    title: {
        fontFamily: "Poppins",
        fontWeight: "600",
        fontSize: 25,
        lineHeight: 25,
        letterSpacing: 0.75,
        color: "#000",
        marginBottom: 8,
    },
    desc: {
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0.45,
        color: "#868889",
        marginBottom: 20,
    },
    button: {
        width: "100%",
        height: 60,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        justifyContent: "flex-start",
        shadowColor: "#6CC51D",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 9,
        elevation: 5,
    },
    buttonText: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0,
        color: '#FFFFFF',
        marginLeft: 10,
    },
    text: {
        fontFamily: 'Poppins',
        fontWeight: '300',
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0.03 * 15,
        color: '#9A9A9A',
        textAlign: 'center',
        marginTop: 30,
        height: 30,
    },
    span: {
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0.03 * 15,
        color: '#000',
    }
});

export default Welcome;
