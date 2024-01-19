import { OpenAPI } from '@/clients/api'
import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'

export const bearerTokenSlice = createSlice({
    name: 'bearerToken',
    initialState: {
      value: null as string | null
    },
    reducers: {
        login(state, token: PayloadAction<string>) {
            state.value = token.payload;
            (OpenAPI.HEADERS as Record<string, string>)['Authorization'] = `Bearer ${token.payload}`;
        },
        logout(state) {
            state.value = null;
            delete (OpenAPI.HEADERS as Record<string, string>)['Authorization'];
        }
    }
  })

export const makeStore = () => {
    return configureStore({
        reducer: {
            bearerToken: bearerTokenSlice.reducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
