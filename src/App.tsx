import { NavigationContainer } from '@react-navigation/native';

import RootStack from "./RootStack/RootStack.tsx";

function App () {
    return(
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
    )
}

export default App;
