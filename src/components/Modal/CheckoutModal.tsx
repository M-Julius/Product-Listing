import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Image } from 'react-native';
import { Cart } from '../../types/Cart';
import Button from '../Button';
import icons from '../../assets/icons';

interface CheckoutModalProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    cartItems: Cart[];
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isVisible, onClose, cartItems, onConfirm }) => {
    const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.containerHeader}>
                        <Text style={styles.title}>Checkout Details</Text>
                        <Pressable onPress={onClose}>
                            <Image source={icons.close} style={styles.iconStyle} />
                        </Pressable>
                    </View>
                    {cartItems.map((item) => (
                        <View key={item.product.id} style={styles.itemContainer}>
                            <Text style={styles.itemName}>{item.product.title} - ${item.product.price.toFixed(2)}</Text>
                            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                            <Text style={styles.itemPrice}>Price: ${item.quantity * item.product.price}</Text>
                        </View>
                    ))}
                    <Text style={styles.total}>Total Amount: ${totalAmount.toFixed(2)}</Text>

                    <Button style={{ marginTop: 30 }} title='Proceed to Payment' onPress={() => onConfirm()} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemContainer: {
        marginBottom: 10,
    },
    itemName: {
        fontSize: 18,
    },
    itemQuantity: {
        fontSize: 16,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    iconStyle: {
        width: 60,
        height: 60,
        tintColor: '#dc3545'
    },
});

export default CheckoutModal;