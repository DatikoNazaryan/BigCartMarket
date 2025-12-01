import { View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import FavoriteIcon from "react-native-vector-icons/AntDesign";

import HomeStackScreen from "./HomeStackScreen/HomeStackScreen";
import FavoriteStackScreen from "./FavoriteStackScreen/FavoriteStackScreen";
import AboutScreen from "../../screens/AboutScreen/AboutScreen";
import BasketScreen from "../../screens/BasketScreen/BasketScreen";

const Tab = createBottomTabNavigator();

function getTabBarVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

    if (routeName === "Categories" || routeName === "ProductsByCategory" || routeName === "Product" || routeName === "SearchScreen") {
        return false;
    }
    return true;
}

function TabScreen() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    height: 70,
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                },
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStackScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => ( <Icon name="home" size={26} color={focused ? "#040404" : "#868889"}/> ),
                    tabBarStyle: { display: getTabBarVisibility(route) ? "flex" : "none" }, })}
            />

            <Tab.Screen
                name="About"
                component={AboutScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="user" size={26} color={focused ? "#040404" : "#868889"} />
                    ),
                }}

            />
            <Tab.Screen
                name="FavoriteTab"
                component={FavoriteStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FavoriteIcon name="hearto" size={26} color={focused ? "#040404" : "#868889"} />
                    ),
                }}
            />

            <Tab.Screen
                name="BasketScreen"
                component={BasketScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                position: "absolute",
                                top: -30,
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: "#6CC51D",
                                justifyContent: "center",
                                alignItems: "center",
                                elevation: 5,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 3,
                            }}
                        >
                            <Icon name="shopping-cart" size={26} color="#fff" />
                        </View>
                    ),
                    tabBarStyle: {display: "none"},
                }}
            />
        </Tab.Navigator>
    );
}

export default TabScreen;
