import {FlatList, Text, View, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import ProductCard from "./ProductCard/ProductCard";
import CategoriesList from "../CategoriesList/CategoriesList";

function ProductsList() {
    const { products } = useSelector(store => store.products);

    return (
        <FlatList
            data={products}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16 }}
            ListHeaderComponent={
                <>
                    <CategoriesList />
                    <View style={styles.header}>
                        <Text style={styles.title}>Products</Text>
                        <Icon name="right" size={20} color="#868889" />
                    </View>
                </>
            }
            renderItem={({ item }) => (<ProductCard item={item} />)}
        />
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 16,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
    },
});


export default ProductsList;
