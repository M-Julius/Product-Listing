import React, { Suspense, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { fetchBySearch, fetchCategory, fetchProducts } from '../redux/productSlice';
import { HomeScreenNavigationProp } from '../types/Navigation';
import { Product } from '../types/Product';
import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import CategorySelecting from '../components/CategorySelecting';
import { TextInput } from 'react-native-gesture-handler';
import useDebounce from '../hooks/useDebounce';
import ShopCart from '../components/ShopCart';
import ShimmerPlaceHolder from '../components/ShimmerPlaceholder';

const ProductItem = React.lazy(() => import('../components/ProductItem'));

type Props = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState('');
    const [categoySelected, setCategorySelected] = useState('');
    const debouncedSearchQuery = useDebounce(searchText, 300);
    const { items: products, loading, hasMore, page, category } = useAppSelector((state: RootState) => state.products);

    useEffect(() => {
        if (debouncedSearchQuery) {
            dispatch(fetchBySearch(debouncedSearchQuery));
        } else {
            dispatch(fetchProducts(1));
            dispatch(fetchCategory());
        }
    }, [debouncedSearchQuery, dispatch]);

    const renderItem = ({ item }: { item: Product }) => (
        <Suspense fallback={
            <ShimmerPlaceHolder
                style={styles.shimmer}
            />
        }>
            <ProductItem product={item} navigation={navigation} />
        </Suspense>
    );

    const loadMoreProducts = () => {
        if (!loading && hasMore && !debouncedSearchQuery && !categoySelected) {
            dispatch(fetchProducts(page + 1));
        }
    };

    const goToCart = () => {
        navigation.navigate('Cart');
    }

    const resetFilter = () => {
        setCategorySelected('');
        setSearchText('');
        dispatch(fetchProducts(1));
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingVertical: 15, }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Discover Product</Text>
                    <ShopCart goToCart={goToCart} />
                </View>
                <View>
                    <TextInput
                        onChangeText={setSearchText}
                        value={searchText}
                        placeholder="Search" style={styles.searchInput} />
                </View>
                <CategorySelecting
                    categories={category ?? []}
                    selected={categoySelected}
                    onSelected={(ctgry) => setCategorySelected(ctgry.slug)}
                />
            </View>

            <FlatList
                refreshing={false}
                onRefresh={resetFilter}
                data={products}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: 20, }}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={1}
                ListFooterComponent={() => loading && <ActivityIndicator size="large" color="#000000" style={styles.loader} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
    },
    columnWrapper: {
        marginVertical: 10,
        justifyContent: 'space-between'
    },
    searchInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 20,
        marginBottom: 15
    },
    loader: {
        alignSelf: 'center',
        paddingVertical: 20
    },
    shimmer: {
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
    },

});

export default HomeScreen;