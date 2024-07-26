import {configureStore} from '@reduxjs/toolkit'
import {serviceReducer} from "@/store/slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            infoService: serviceReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']