import { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AuthBackground from "../../Components/AuthBackground/AuthBackground";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Fontisto";
import IconFeather from "react-native-vector-icons/Feather";
import { signUpUser } from "../../store/thunks/thunks";

function SignUp() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [secure, setSecure] = useState(true);
    const [form, setForm] = useState({ email: '', password: '', name: '' });
    const [errors, setErrors] = useState({});

    const handleChange = useCallback((field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));

        if(field === "name") {
            setErrors(prev => ({ ...prev, name: value.trim().length > 0 ? '' : "Required" }));
        }

        if (field === "email") {
            const emailRegex = /^[a-zA-Z0-9]+-?[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
            setErrors(prev => ({ ...prev, email: emailRegex.test(value) ? '' : 'Invalid email address' }));
        }
        if (field === "password") {
            setErrors(prev => ({ ...prev, password: value.length >= 6 ? '' : 'Password must be at least 6 characters' }));
        }
    }, []);

    const handleSubmit = () => {
        if (!form.email || !form.password  || !form.name || errors.email || errors.password) {
            alert("Please fix errors before submitting");
            return;
        }
        dispatch(signUpUser(form));
        navigation.navigate("LogIn");
    };

    return (
        <AuthBackground>
            <View style={styles.content}>
                <Text style={styles.title}>Create account</Text>
                <Text style={styles.desc}>Sign in to your account</Text>

                {/* Name */}
                <View style={styles.inputBlock}>
                    <IconFeather name="user" size={22} color="#868889" />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => handleChange('name', text)}
                        placeholder={"Name"}
                        placeholderTextColor="#868889"
                        color="#000"
                    />
                </View>
                {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

                {/* Email */}
                <View style={styles.inputBlock}>
                    <Icon name="email" size={22} color="#868889" />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => handleChange('email', text)}
                        placeholder="Email Address"
                        placeholderTextColor="#868889"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        color="#000"
                    />
                </View>
                {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
                <View style={styles.inputBlock}>
                    <IconFeather name="lock" size={22} color="#868889" />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => handleChange('password', text)}
                        placeholder="Password"
                        placeholderTextColor="#868889"
                        secureTextEntry={secure}
                        autoCapitalize="none"
                        color="#000"
                    />
                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                        <IconFeather
                            name={secure ? "eye-off" : "eye"}
                            size={22}
                            color="#868889"
                        />
                    </TouchableOpacity>
                </View>
                {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
                {/* Submit Button */}
                <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient
                        colors={['#AEDC81', '#6CC51D']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                    <Text style={styles.text}>
                        Already have an account? <Text style={styles.span}>Login</Text>
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
        height: 466,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 30,
    },

    /* Typography */
    title: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 25,
        lineHeight: 25,
        letterSpacing: 0.75,
        color: "#000",
        marginBottom: 8,
    },
    desc: {
        fontFamily: "Poppins-Medium",
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: 0.45,
        color: "#868889",
        marginBottom: 24,
    },

    /* Inputs */
    inputBlock: {
        width: "100%",
        height: 60,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        color: "#000",
    },

    /* Button */
    button: {
        width: "100%",
        height: 60,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        shadowColor: "#6CC51D",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: "#FFFFFF",
    },

    /* Bottom text */
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: 0.45,
        color: "#9A9A9A",
        textAlign: "center",
        marginTop: 30,
    },
    span: {
        fontFamily: "Poppins-Medium",
        color: "#000",
    },
    error: {
        color: 'red',
        fontSize: 13,
        marginBottom: 5,
        marginLeft: 5 },
});


export default SignUp;
