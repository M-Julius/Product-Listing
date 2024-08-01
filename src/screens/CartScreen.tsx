import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, removeFromCart } from '../redux/cartSlice';
import { Cart } from '../types/Cart';
import { RootState } from '../redux/store';
import { Product } from '../types/Product';
import CartItem from '../components/CartItem';
import Header from '../components/Header';
import Button from '../components/Button';
import CheckoutModal from '../components/Modal/CheckoutModal';

const CartScreen: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [isModalVisible, setModalVisible] = useState(false);

    const onAddToCart = (product: Product) => {
        const quantity = 1;
        dispatch(addToCart({ product, quantity }));
    }

    const onRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    }

    const renderItem = ({ item }: { item: Cart }) => (
        <CartItem
            item={item}
            onClickMinus={() => onRemoveFromCart(item.product.id)}
            onClickPlus={() => onAddToCart(item.product)}
        />
    );

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Header title='Cart Items' />
            {cartItems.length === 0 ? (
                <Text style={{ alignSelf: 'center' }}>Your cart is empty.</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    renderItem={renderItem}
                    style={{ paddingHorizontal: 20 }}
                    keyExtractor={(item) => item.product.id.toString()}
                    ListFooterComponent={<Button
                        style={styles.button}
                        title='Checkout'
                        onPress={() => setModalVisible(true)}
                    />}
                />
            )}
            <CheckoutModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                cartItems={cartItems}
                onConfirm={() => {
                    setModalVisible(false);
                    dispatch(clearCart());
                    Alert.alert('Success', 'Checkout successful');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: 20,
    }
});

export default CartScreen;