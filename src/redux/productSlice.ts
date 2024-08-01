import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DetailedProduct, Product, ResponseProduct } from '../types/Product';
import { ProductState } from '../types/ReduxState';
import { Category } from '../types/Category';
import api from '../services/api';


export const fetchProducts = createAsyncThunk<ResponseProduct, number>(
    'products/fetchProducts',
    async (page: number) => {
        const response = await api.get(`/products?limit=10&skip=${(page - 1) * 10}&select=title,price,thumbnail`);
        const data = await response.data;
        return data;
    }
);

export const fetchProductById = createAsyncThunk<DetailedProduct, number>(
    'products/fetchById',
    async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    }
);

export const fetchCategory = createAsyncThunk<Category[], void>(
    'products/fetchCategory',
    async () => {
        const response = await api.get('/products/categories');
        return response.data;
    }
);

export const fetchProductsByCategory = createAsyncThunk<Product[], string>(
    'products/fetchByCategory',
    async (category: string) => {
        const response = await api.get(`/products/category/${category}`);
        const data = await response.data;
        return data.products;
    }
);

export const fetchBySearch = createAsyncThunk<Product[], string>(
    'products/fetchBySearch',
    async (search: string) => {
        const response = await api.get(`/products/search?q=${search}`);

        const data = await response.data;
        return data.products;
    }
);

const initialState: ProductState = {
    items: [],
    detailedProduct: null,
    loading: false,
    hasMore: true,
    page: 1,
    category: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts(state) {
            state.items = [];
            state.page = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ResponseProduct>) => {
                if (action.payload.products.length === 0) {
                    state.hasMore = false;
                }

                const existingIds = new Set(state.items.map(product => product.id));

                action.payload.products.forEach(product => {
                    if (!existingIds.has(product.id)) {
                        state.items.push(product);
                    }
                });

                state.page += 1; 

                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<DetailedProduct>) => {
                state.detailedProduct = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductById.rejected, (state) => {
                state.loading = false;
            }).addCase(fetchCategory.pending, (state) => {
                state.loading = true;
            }
            ).addCase(fetchCategory.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.category = action?.payload;
                state.loading = false;
            })
            .addCase(fetchCategory.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.items = action.payload;
                state.loading = false;
            }).addCase(fetchProductsByCategory.rejected, (state) => {
                state.loading = false;
            }).addCase(fetchBySearch.pending, (state) => {
                state.loading = true;
            }
            ).addCase(fetchBySearch.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchBySearch.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { resetProducts } = productSlice.actions;

export default productSlice.reducer;