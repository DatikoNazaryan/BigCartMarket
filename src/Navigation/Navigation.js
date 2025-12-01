import {useSelector} from "react-redux";

import TabScreen from "./TabScreen/TabScreen";
import StackScreen from "./StackScreen/StackScreen";

function Navigation() {
    const token = useSelector(store => store.users.token);

    return token ?
           <TabScreen />
        :
           <StackScreen />
        ;
}


export default Navigation;
