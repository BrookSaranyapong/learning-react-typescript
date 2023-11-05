import "react-big-calendar/lib/css/react-big-calendar.css";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import { selectRoomBookingState } from "../../redux-toolkit/room/room-slice";
import { getRoomBookingThunk } from "../../redux-toolkit/room/room-thunk";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { th } from "date-fns/locale";

const locales = {
  "th-TH": th,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function DHome() {
  const dispatch = useAppDispatch();
  const { roomBooking } = useAppSelector(selectRoomBookingState);

  useEffect(() => {
    dispatch(getRoomBookingThunk());
  }, []);

  const onSelectEvent = (caleEvent: any) => {
    alert(JSON.stringify(caleEvent));
  };
  return (
    <>
      <h1>รายการจองห้องประชุมทั้งหมด</h1>
      <Calendar
        culture="th-TH"
        localizer={localizer}
        events={[
          ...(roomBooking?.events != undefined ? roomBooking.events : []),
        ]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={onSelectEvent}
        views={['month']}
      />
    </>
  );
}

export default DHome;
