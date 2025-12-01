import {useCallback, useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {useNavigation} from "@react-navigation/native";
import AuthBackground from "../../Components/AuthBackground/AuthBackground";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Fontisto";
import IconLock from "react-native-vector-icons/Feather";
import ToggleCheckbox from "./ToggleCheckBox/ToggleCheckBox";
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../../store/thunks/thunks";
import { ScrollView } from "react-native-gesture-handler";


function LogIn(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [secure, setSecure] = useState(true);
    const [ isChecked, setIsChecked ] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const error = useSelector(state => state.users.error);

    const handleChange = useCallback((field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));

        if (field === "email") {
            const emailRegex = /^[a-zA-Z0-9]+-?[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
            setErrors(prev => ({ ...prev, email: emailRegex.test(value) ? '' : 'Invalid email address' }));
        }

        if (field === "password") {
            setErrors(prev => ({ ...prev, password: value.length >= 4 ? '' : 'Password must be at least 6 characters' }));
        }
    },[]);

    const handleSubmit = () => {
        if (!form.email || !form.password || errors.email || errors.password) {
            alert("Please fix errors before submitting");
            return;
        }
        console.log(form, 'form');
        dispatch(loginUser(form));
    };

    return (
        <AuthBackground>
        <View style={styles.content}>
                <Text style={styles.title}>Welcome back!</Text>
                <Text style={styles.desc}>
                    Sign in to your account
                </Text>
                {error && <Text style={styles.error}>Your email or passwor isn't corect.</Text>}
                <View style={styles.inputBlock}>
                    <Icon name="email" size={26} color="#868889" />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => handleChange('email', text)}
                        placeholder={"Email Address"}
                        placeholderTextColor="#868889"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        color="#000"
                    />
                </View>
                <View style={styles.inputBlock}>
                    <IconLock name="lock" size={26} color="#868889" />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => handleChange('password', text)}
                        placeholder={"Password"}
                        placeholderTextColor="#868889"
                        secureTextEntry={secure}
                        autoCapitalize="none"
                        color="#000"
                    />
                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                        <IconLock name={secure ? 'eye-off' : 'eye'} size={26} color="#868889" />
                    </TouchableOpacity>
                </View>
                <View style={styles.isRememberedForgotPassword}>
                    <View style={styles.isRemembered}>
                        <ToggleCheckbox
                            value={isChecked}
                            onChange={isChecked => setIsChecked(isChecked)}
                        />
                        <Text style={styles.checkBoxText}>Remember me</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot password</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient
                        colors={['#AEDC81', '#6CC51D']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.text}>
                        Don't have an account ? <Text style={styles.span}>Sign up</Text>
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
        // height: 453,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 31,
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
        justifyContent: "center",
        shadowColor: "#6CC51D",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 9,
        elevation: 5,
        marginTop: 10,
    },
    buttonText: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: 0,
        color: '#FFFFFF',
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
    },
    inputBlock: {
        width: "100%",
        height: 60,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        marginVertical: 4,
    },
    input: {
        flex: 1,
        height: "100%",
        marginLeft: 10,
        paddingLeft: 5,
        fontSize: 18,
    },
    isRemembered: {
        width: "50%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    checkBoxText: {
        fontFamily: "Poppins-Medium",
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0.45,
        color: "#868889",
        marginLeft: 5,
    },
    forgotPassword :{
        color: "#407EC7",
        fontFamily: "Poppins-Medium",
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: 0.45,
    },
    isRememberedForgotPassword : {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        alignItems: "center",
    },
    error: {
        color: "#FF0000",
        textAlign: "center",
    }
});

export default LogIn;
