import { ImageBackground, StyleSheet } from "react-native";
import image from "../../assets/images/image.png";

//KeyboardAvoidingView օգտագործելիս խնդիրներ եղան շատ կտրուկ էր բլոկի թոիչքը վերև։

function AuthBackground({ children }) {
    return (
        <ImageBackground source={image} style={styles.background}>
            {/*<KeyboardAvoidingView*/}
            {/*    behavior='padding'*/}
            {/*    // extraHeight={120}*/}
            {/*    // enableOnAndroid={true}*/}
            {/*>*/}
            {children}
                {/*</KeyboardAvoidingView>*/}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default AuthBackground;
