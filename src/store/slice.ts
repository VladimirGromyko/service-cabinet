import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {TableData} from "@/components/ServiceJournal/serviceJournal.types";

export interface ServiceState {
    data: TableData | null
}
const currentServiceState: ServiceState = {data: null}
export const serviceSlice = createSlice({
    name: "infoService",
    initialState: currentServiceState,
    reducers: {
        setServiceInfo: (state, action: PayloadAction<TableData>) => {
            state.data = action.payload;
        }
    }
})

export const {setServiceInfo} = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;
