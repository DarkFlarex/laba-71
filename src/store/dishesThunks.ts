import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiDish, ApiDishes, Dish} from "../types";
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