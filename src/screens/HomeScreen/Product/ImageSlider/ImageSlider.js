import React, { useState, useRef } from 'react';
import {View, FlatList, Image, Dimensions, StyleSheet, Text} from 'react-native';

const { width } = Dimensions.get('window');

function ImageSlider({images}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef();

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewConfigRef.current}
                ref={flatListRef}
                contentContainerStyle={{ height: 545, position: "relative" }}
            />
            <View style={styles.pagination}>
                {images?.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { opacity: index === activeIndex ? 1 : 0.3 },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: width,
        height: "100%",
        resizeMode: 'cover',
    },
    pagination: {
        position: 'absolute',
        bottom: 98,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginHorizontal: 4,
    },
});

export default ImageSlider;
