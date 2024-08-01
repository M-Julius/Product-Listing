import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types/Product';
import { HomeScreenNavigationProp } from '../types/Navigation';
import ShimmerPlaceHolder from './ShimmerPlaceholder';

interface ProductItemProps {
    product: Product;
    navigation: HomeScreenNavigationProp;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const handlePress = () => {
        navigation.navigate('Detail', { productId: product.id });
    };

    return (
        <TouchableOpacity style={styles.containerItem} onPress={handlePress}>
            <View style={styles.item}>
                <ShimmerPlaceHolder style={styles.imagePlaceholder} visible={!isLoading} >
                    <Image source={{ uri: product.thumbnail }} style={styles.image} onLoadEnd={() => setLoading(false)} />
                </ShimmerPlaceHolder>
                <Text style={styles.title}>{product.title}</Text>
                <Text>${product.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerItem: {
        width: '48%',
        alignItems: 'center',
        borderRadius: 10,
    },
    item: {
        padding: 10,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    imagePlaceholder: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
        alignSelf: 'center'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    }
});

export default ProductItem;