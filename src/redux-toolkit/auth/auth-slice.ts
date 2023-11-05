import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LoginResponse } from "../../interfaces/login.type";
import { loginThunk } from "./auth-thunk";

export interface AuthState {
    profile: string;
    email: string;
    loginResponse: LoginResponse | null;
}

const initialState: AuthState = {
    profile: 'John Doe Example',
    email: 'john@gmail.com Example',
    loginResponse: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        updateProfileAction: (state) => {
            state.profile = 'Mary Doe Example';
            state.email = 'mary@gmail.com Example'
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state,action: PayloadAction<LoginResponse | null>) => {
            state.loginResponse = action.payload;
        })
    },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const { updateProfileAction } = authSlice.actions
export const selectAuthState = (state: RootState) => state.authState
export default authSlice.reducer