import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Navigation from "./Navigation/Navigation";

function App () {
    return(
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Navigation />
                </NavigationContainer>
            </GestureHandlerRootView>
        </Provider>
    )
}

export default App;
