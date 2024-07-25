import {Dish} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createDish} from "./dishesThunks";


export interface DishesState {
    items:Dish[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: DishesState = {
    items:[],
    fetchLoading: false,
    createLoading: false,
};

export const dishesSlice = createSlice({
    name:'dishes',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createDish.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createDish.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createDish.rejected, (state) => {
                state.createLoading = false;
            });
    },
    selectors: {
        selectFetchDishesLoading: (state) => state.fetchLoading,
        selectCreateDishLoading: (state) => state.createLoading,
    },
});

export const dishesReducer = dishesSlice.reducer;

export const {
    selectFetchDishesLoading,
    selectCreateDishLoading,
} = dishesSlice.selectors;