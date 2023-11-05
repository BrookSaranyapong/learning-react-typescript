import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRoomBooking } from "../../services/room.service";
import { RoomBooking } from "../../interfaces/room-booking.type";
import { AxiosError } from "axios";

export const getRoomBookingThunk =
    createAsyncThunk<RoomBooking, void>('room/getRoomBookingThunkStatus', async () => {
        try {
            const response = await getRoomBooking()
            // console.log(response.data)
            return response.data;
        } catch (error: any) {
            let err: AxiosError<any> = error;
            if (!err.response) {
                throw error;
            }
            return err.response.data
        }
    });