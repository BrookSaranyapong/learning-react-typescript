import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../services/auth.service";
import { LoginFormInput } from "../../interfaces/login-form-input.type";
import { LoginErrorResponse, LoginResponse } from "../../interfaces/login.type";
import { AxiosError } from "axios";

export const loginThunk =
    createAsyncThunk<LoginResponse, LoginFormInput, { rejectValue: LoginErrorResponse }>('auth/loginThunkStatus', async (user: LoginFormInput, { rejectWithValue }) => {
        try {
            const response = await login(user.email, user.password)
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            let err: AxiosError<LoginErrorResponse> = error;
            if (!err.response) {
                throw error;
            }
            return rejectWithValue(err.response.data)
        }
    });