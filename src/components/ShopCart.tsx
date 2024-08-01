import { Image, Pressable, StyleSheet, View } from "react-native";
import icons from "../assets/icons";
import { useAppSelector } from "../redux/store";

interface Props {
    goToCart: () => void
}

const ShopCart: React.FC<Props> = ({ goToCart }) => {
    const carts = useAppSelector(state => state.cart.items);

    return (
        <Pressable style={{ width: 40 }} onPress={goToCart}>
            <Image source={icons.cart} style={styles.iconCart} />
            {carts?.length > 0 && <View style={styles.badge}></View>}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    iconCart: {
        width: 40,
        height: 40,
    },
    badge: {
        width: 15,
        height: 15,
        borderRadius: 20,
        position: 'absolute',
        top: 5,
        right: 20,
        backgroundColor: 'red'
    }
})

export default ShopCart;