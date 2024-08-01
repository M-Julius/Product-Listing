import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import icons from "../assets/icons";
import { Cart } from "../types/Cart";

interface Props {
    item: Cart,
    onClickPlus: () => void,
    onClickMinus: () => void
}

const CartItem: React.FC<Props> = ({ item, onClickPlus, onClickMinus }) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.rowCenter}>
                <Image source={{ uri: item.product.thumbnail }} style={styles.thumbnail} />
                <View style={styles.containerInfo}>
                    <Text style={styles.title}>{item.product.title}</Text>
                    <Text style={styles.price}>${item.product.price.toFixed(2)} x {item.quantity}</Text>
                </View>
            </View>
            <View style={styles.rowCenter}>
                <Pressable onPress={onClickMinus}>
                    <Image source={icons.minus} style={styles.iconPlusMin} />
                </Pressable>
                <Text style={styles.textQty}>{item.quantity}</Text>
                <Pressable onPress={onClickPlus}>
                    <Image source={icons.plus} style={styles.iconPlusMin} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
    },
    price: {
        fontSize: 16,
        color: 'green',
    },
    thumbnail: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 100,
        height: 100
    },
    containerInfo: {
        width: '45%',
        marginLeft: 10
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconPlusMin: {
        width: 20,
        height: 20
    },
    textQty: {
        marginHorizontal: 25,
        fontSize: 18
    }

})


export default CartItem;