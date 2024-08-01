import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceHolder from '../ShimmerPlaceholder';

const LoadingDetail: React.FC = () => {
    return (
        <View style={styles.container}>
            <ShimmerPlaceHolder style={styles.imagePlaceholder} />
            <ShimmerPlaceHolder style={styles.shimmerTitle} />
            <ShimmerPlaceHolder style={styles.shimmerDescription} />
            <View style={styles.detailsContainer}>
                <ShimmerPlaceHolder style={styles.shimmerDetail} />
                <ShimmerPlaceHolder style={styles.shimmerDetail} />
                <ShimmerPlaceHolder style={styles.shimmerDetail} />
                <ShimmerPlaceHolder style={styles.shimmerDetail} />
            </View>
            <ShimmerPlaceHolder style={styles.shimmerReview} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    imagePlaceholder: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        backgroundColor: '#ebebeb',
    },
    shimmerTitle: {
        width: '100%',
        height: 30,
        marginVertical: 10,
    },
    shimmerDescription: {
        width: '100%',
        height: 20,
        marginVertical: 10,
    },
    detailsContainer: {
        marginVertical: 20,
    },
    shimmerDetail: {
        width: '100%',
        height: 20,
        marginVertical: 5,
    },
    shimmerReview: {
        width: '100%',
        height: 80,
        marginVertical: 10,
    },
});

export default LoadingDetail;
