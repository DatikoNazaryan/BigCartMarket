import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../HomeScreen/HomeScreen.tsx";

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}

export default RootStack;
