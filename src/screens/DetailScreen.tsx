import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/Navigation';
import { DetailScreenNavigationProp } from '../types/Navigation';
import ImageCarousel from '../components/ImageCarousel';
import { fetchProductById } from '../redux/productSlice';
import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import { addToCart } from '../redux/cartSlice';
import { Product } from '../types/Product';
import Header from '../components/Header';
import Button from '../components/Button';
import LoadingDetail from '../components/Shimmer/LoadingDetail';

type Props = {
    route: RouteProp<RootStackParamList, 'Detail'>;
    navigation: DetailScreenNavigationProp;
};

const DetailScreen: React.FC<Props> = ({ route }) => {
    const dispatch = useAppDispatch();
    const { productId } = route.params;
    const detailedProduct = useAppSelector((state: RootState) => state.products.detailedProduct);
    const loading = useAppSelector((state: RootState) => state.products.loading);

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    const onAddToCart = (product: Product) => {
        const quantity = 1;
        dispatch(addToCart({ product, quantity }));
    }

    return (
        <View style={{ flex: 1 }}>
            <Header title='Detail' isShowCart />
            <ScrollView style={styles.container}>
                {
                    loading ? <LoadingDetail /> : <>
                        <ImageCarousel images={detailedProduct?.images ?? []} />
                        <Text style={styles.title}>{detailedProduct?.title ?? '-'}</Text>
                        <Text style={styles.description}>{detailedProduct?.description ?? '-'}</Text>

                        <View style={styles.detailsContainer}>
                            <Text style={styles.detailTitle}>Details</Text>
                            <Text style={styles.detail}>Brand: {detailedProduct?.brand ?? '-'}</Text>
                            <Text style={styles.detail}>Category: {detailedProduct?.category ?? '-'}</Text>
                            <Text style={styles.detail}>Availability: {detailedProduct?.availabilityStatus ?? '-'}</Text>
                            <Text style={styles.detail}>Discount: {detailedProduct?.discountPercentage ?? '-'}%</Text>
                            <Text style={styles.detail}>Dimensions: {`${detailedProduct?.dimensions?.width ?? '-'} x ${detailedProduct?.dimensions?.height ?? '-'} x ${detailedProduct?.dimensions?.depth ?? '-'} cm`}</Text>
                            <Text style={styles.detail}>Shipping: {detailedProduct?.shippingInformation ?? '-'}</Text>
                            <Text style={styles.detail}>Return Policy: {detailedProduct?.returnPolicy ?? '-'}</Text>
                        </View>

                        <View style={styles.reviewsContainer}>
                            <Text style={styles.reviewTitle}>Reviews</Text>
                            {detailedProduct?.reviews?.map((review, index) => (
                                <View key={index} style={styles.reviewCard}>
                                    <Text style={styles.reviewName}>{review.reviewerName}:</Text>
                                    <Text style={styles.reviewComment}>{review.comment}</Text>
                                    <Text style={styles.reviewRating}>Rating: {review.rating}/5</Text>
                                </View>
                            ))}
                        </View>
                    </>
                }

            </ScrollView>
            <View style={styles.fabContainer}>
                <Text style={styles.price}>${detailedProduct?.price?.toFixed(2) ?? '-'}</Text>
                <Button style={{ width: 250 }} title='Add To Cart' onPress={() => {
                    const product = detailedProduct as Product;
                    onAddToCart(product);
                }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'green',
        marginVertical: 5,
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    detailsContainer: {
        marginVertical: 20,
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        marginVertical: 5,
    },
    reviewsContainer: {
        marginVertical: 20,
        paddingBottom: '25%'
    },
    reviewTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reviewCard: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    reviewName: {
        fontWeight: 'bold',
    },
    reviewComment: {
        fontSize: 14,
    },
    reviewRating: {
        fontSize: 12,
        color: 'gray',
    },
    fabContainer: {
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    fab: {
        width: '60%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addToCart: {
        backgroundColor: '#ff8c00',
    },
    buyNow: {
        backgroundColor: '#28a745',
    },
    fabText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DetailScreen;