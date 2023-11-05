import { LoginResponse } from "../interfaces/login.type";
import { AxiosResponse, http } from "./http.service";


export async function login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
    return await http.post<LoginResponse>('https://api.codingthailand.com/api/login', {
        email: email,
        password: password
    });
}

export function logout() {

}

export function getProfile() {

}