import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Product from "../../../screens/HomeScreen/Product/Product";
import FavoriteScreen from "../../../screens/FavoriteScreen/FavoriteScreen";

const Stack = createNativeStackNavigator();

function FavoriteStackScreen(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Favorite"
                component={FavoriteScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Product"
                component={Product}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                    tabBarStyle: { display: 'none' },
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    );
}

export default FavoriteStackScreen;
