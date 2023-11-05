import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getRoomBookingThunk } from "./room-thunk";
import { RoomBooking } from "../../interfaces/room-booking.type";

export interface RoomBookingState {
    roomBooking: RoomBooking | null;
}

const initialState: RoomBookingState = {
    roomBooking: null
}

export const roomBookingSlice = createSlice({
    name: 'roomBooking',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRoomBookingThunk.fulfilled, (state, action: PayloadAction<RoomBooking | null>) => {
            state.roomBooking = action.payload;
        })
    },
});

export const selectRoomBookingState = (state: RootState) => state.roomBookingState;
export default roomBookingSlice.reducer