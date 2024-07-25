import {ApiDish, Dish} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createDish, deleteDish, fetchDishes, fetchOneDish, updateDish} from "./dishesThunks";


export interface DishesState {
    items:Dish[];
    fetchLoading: boolean;
    createLoading: boolean;
    updateLoading: boolean;
    fetchOneLoading: boolean;
    oneDish: null | ApiDish;
    deleteLoading: false | string;
}

const initialState: DishesState = {
    items:[],
    fetchLoading: false,
    createLoading: false,
    updateLoading: false,
    fetchOneLoading: false,
    oneDish: null,
    deleteLoading: false,
};

export const dishesSlice = createSlice({
    name:'dishes',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchDishes.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchDishes.fulfilled, (state, { payload: items }) => {
                state.fetchLoading = false;
                state.items = items;
            })
            .addCase(fetchDishes.rejected, (state) => {
                state.fetchLoading = false;
            });

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
        builder
            .addCase(fetchOneDish.pending, (state) => {
                state.oneDish = null;
                state.fetchOneLoading = true;
            })
            .addCase(fetchOneDish.fulfilled, (state, { payload: apiDish }) => {
                state.oneDish = apiDish;
                state.fetchOneLoading = false;
            })
            .addCase(fetchOneDish.rejected, (state) => {
                state.fetchOneLoading = false;
            });

        builder
            .addCase(updateDish.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateDish.fulfilled, (state) => {
                state.updateLoading = false;
            })
            .addCase(updateDish.rejected, (state) => {
                state.updateLoading = false;
            });

        builder
            .addCase(deleteDish.pending, (state, { meta: { arg: dishId } }) => {
                state.deleteLoading = dishId;
            })
            .addCase(deleteDish.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteDish.rejected, (state) => {
                state.deleteLoading = false;
            });
    },
    selectors: {
        selectDishes:(state)=>state.items,
        selectFetchDishesLoading: (state) => state.fetchLoading,
        selectCreateDishLoading: (state) => state.createLoading,
        selectFetchOneDishLoading: (state) => state.fetchOneLoading,
        selectUpdateDishLoading: (state) => state.updateLoading,
        selectOneDish: (state) => state.oneDish,
        selectDeleteDishLoading: (state) => state.deleteLoading,
    },
});

export const dishesReducer = dishesSlice.reducer;

export const {
    selectDishes,
    selectFetchDishesLoading,
    selectCreateDishLoading,
    selectFetchOneDishLoading,
    selectUpdateDishLoading,
    selectOneDish,
    selectDeleteDishLoading,
} = dishesSlice.selectors;