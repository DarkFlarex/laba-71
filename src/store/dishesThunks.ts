import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiDish, ApiDishes, ApiOrders, Dish, Order} from "../types";
import axiosApi from "../axiosApi";
import {AppDispatch, RootState} from "../app/store";

export const fetchDishes = createAsyncThunk<
    Dish[], undefined, { dispatch: AppDispatch
}>(
    'dishes/fetchDishes',
    async () => {
        const dishesResponse = await axiosApi.get<ApiDishes | null>('/dishes.json');
        const dishes = dishesResponse.data;

        let newDishes: Dish[] = [];

        if (dishes) {
            newDishes = Object.keys(dishes).map((key: string) => {
                const dish = dishes[key];
                return {
                    id: key,
                    ...dish,
                };
            });
        }

        return newDishes;
    }
);

export const createDish = createAsyncThunk<void, ApiDish, { state: RootState }>(
    'dishes/create',
    async (apiDish) => {
        await axiosApi.post('/dishes.json', apiDish);
    },
);

export const fetchOneDish = createAsyncThunk<ApiDish, string, { state: RootState }>(
    'dishes/fetchOne',
    async (id) => {
        const { data: dish } = await axiosApi.get<ApiDish | null>(
            `/dishes/${id}.json`,
        );

        if (dish === null) {
            throw new Error('Not found');
        }

        return dish;
    },
);

export interface UpdateDishArg {
    id: string;
    apiDish: ApiDish;
}

export const updateDish = createAsyncThunk<void, UpdateDishArg, { state: RootState }>(
    'dishes/update',
    async ({ id, apiDish }) => {
        await axiosApi.put(`/dishes/${id}.json`, apiDish);
    },
);

export const deleteDish = createAsyncThunk<void, string, { state: RootState }>(
    'dishes/deleteDish',
    async (dishId) => {
        await axiosApi.delete('/dishes/' + dishId + '.json');
    },
);

export const fetchOrders = createAsyncThunk<Order[], void, { dispatch: AppDispatch }>(
    'orders/fetchOrders',
    async () => {
        const { data: orders } = await axiosApi.get<ApiOrders | null>('/orders.json');
        if (!orders) return [];

        const delivery = 150;

        return Object.keys(orders).map(id => {
            const order = orders[id];
            const totalPrice = order.dishes.reduce((sum, cartDish) => {
                return sum + cartDish.amount * cartDish.dish.price;
            }, delivery);

            return {
                id,
                dishes: order.dishes,
                totalPrice,
            };
        });
    }
);

export const deleteOrder = createAsyncThunk<void, string, { state: RootState }>(
    'orders/deleteOrder',
    async (orderId) => {
        await axiosApi.delete(`/orders/${orderId}.json`);
    },
);