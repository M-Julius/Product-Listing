import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import icons from "../assets/icons";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import ShopCart from "./ShopCart";

interface Props {
    title: string;
    onClick?: () => void;
    isShowCart?: boolean;
}

const Header: React.FC<Props> = ({ title, onClick, isShowCart }) => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();

    const onBack = () => {
        if (onClick) {
            onClick();
        } else {
            navigation.goBack();
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Pressable onPress={onBack}>
                    <Image source={icons.arrowleft} style={styles.iconStyle} />
                </Pressable>
                <Text style={styles.title}>{title}</Text>
            </View>
            {isShowCart && <ShopCart goToCart={() => navigation.navigate('Cart')} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        tintColor: 'gray',
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 20,
        tintColor: 'gray',
        resizeMode: 'contain',
    }
})

export default Header;