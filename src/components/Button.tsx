import React from "react";
import { StyleSheet, TextStyle, ViewStyle, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    children?: React.ReactNode;
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
            {children ?
                children
                :
                <Text style={[styles.buttonText, props.textStyle]}>{props.title}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Button;
