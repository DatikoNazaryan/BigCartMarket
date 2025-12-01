import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from "../..//screens/Welcome/Welcome";
import Header from "../../Components/Header/Header";
import LogIn from "../..//screens/LogIn/LogIn";
import SignUp from "../../screens/SignUp/SignUp";

const Stack = createNativeStackNavigator();

function StackScreen(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    header: () => <Header welcome = "welcome" title={"Welcome"} />,
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="LogIn"
                component={LogIn}
                options={{
                    header: () => <Header title={"Welcome"} />,
                    headerTransparent: true
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    header: () => <Header title={"Welcome"} />,
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    );
}

export default StackScreen;
