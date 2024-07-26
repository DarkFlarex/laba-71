import { createSlice } from '@reduxjs/toolkit';
import { Order } from '../types';
import {deleteOrder, fetchOrders} from "./dishesThunks";

export interface OrdersState {
    items: Order[];
    fetchOrderLoading: boolean;
    deleteLoading: false | string;
}

const initialState: OrdersState = {
    items: [],
    fetchOrderLoading: false,
    deleteLoading: false,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchOrders.pending, state => {
            state.fetchOrderLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
            state.fetchOrderLoading = false;
            state.items = payload;
        });
        builder.addCase(fetchOrders.rejected, state => {
            state.fetchOrderLoading = false;
        });

        builder
            .addCase(deleteOrder.pending, (state, { meta: { arg: contactId } }) => {
                state.deleteLoading = contactId;
            })
            .addCase(deleteOrder.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteOrder.rejected, (state) => {
                state.deleteLoading = false;
        });
    },
    selectors: {
        selectOrders:(state)=>state.items,
        selectFetchOrdersLoading: (state) => state.fetchOrderLoading,
        selectDeleteOrderLoading:(state)=>state.deleteLoading
    },
});

export const ordersReducer = ordersSlice.reducer;

export const {
    selectOrders,
    selectFetchOrdersLoading,
    selectDeleteOrderLoading,

} = ordersSlice.selectors;

