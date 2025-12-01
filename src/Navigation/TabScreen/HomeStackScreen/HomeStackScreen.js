import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../../screens/HomeScreen/HomeScreen";
import Categories from "../../../screens/HomeScreen/Categories/Categories";
import ProductsByCategory from "../../../screens/HomeScreen/Categories/ProductsByCategory/ProductsByCategory";
import Product from "../../../screens/HomeScreen/Product/Product";
import SearchScreen from "../../../screens/HomeScreen/SearchScreen/SearchScreen";

const Stack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="ProductsByCategory" component={ProductsByCategory} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    );
}

export default HomeStackScreen;
