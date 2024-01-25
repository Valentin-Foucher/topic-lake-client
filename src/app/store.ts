import { LogInResponse } from '@/clients/api';
import { PayloadAction, Reducer, combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER } from "redux-persist";
import storage from 'redux-persist/lib/storage';

export const bearerTokenSlice = createSlice({
    name: 'bearerToken',
    initialState: {
      value: null as LogInResponse | null
    },
    reducers: {
        login(state, token: PayloadAction<LogInResponse>) {
            state.value = token.payload;
        },
        logout(state) {
            state.value = null;
        }
    }
  })

export const makeStore = (reducer: Reducer) => {
    return configureStore({ reducer: reducer })
}
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({ bearerToken: bearerTokenSlice.reducer }))

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})
export const persistor = persistStore(store)


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
