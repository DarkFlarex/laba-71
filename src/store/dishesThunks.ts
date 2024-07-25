import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiDish} from "../types";
import axiosApi from "../axiosApi";
import {RootState} from "../app/store";


export const createDish = createAsyncThunk<void, ApiDish, { state: RootState }>(
    'dishes/create',
    async (apiDish) => {
        await axiosApi.post('/dishes.json', apiDish);
    },
);