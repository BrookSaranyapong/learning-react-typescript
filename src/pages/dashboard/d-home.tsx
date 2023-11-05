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
import { Event } from "../../interfaces/room-booking.type";

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
    const data = {
      id: caleEvent.id,
      title: caleEvent.title,
      start: format(Date.parse(caleEvent.start), "dd MMM yyyy HH:mm:ss", {
        locale: th,
      }),
      end: format(Date.parse(caleEvent.end), "dd MMM yyyy HH:mm:ss", {
        locale: th,
      }),
      createdBy: caleEvent.created_by,
    };
    alert(JSON.stringify(data));
  };

  let myEvents = roomBooking?.events.map((item: Event) => {
    return {
      id: item.id,
      title: item.title,
      start: new Date(item.start),
      end: new Date(item.end),
      created_by: new Date(item.created_by),
    };
  });

  return (
    <>
      <h1>รายการจองห้องประชุมทั้งหมด</h1>
      <Calendar
        culture="th-TH"
        localizer={localizer}
        events={[...(myEvents != undefined ? myEvents : [])]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={onSelectEvent}
        views={["day", "week", "month", "agenda"]}
        formats={{
          dateFormat: "d",
          monthHeaderFormat: "dd MM yyyy",
          timeGutterFormat: "HH:mm",
        }}
      />
    </>
  );
}

export default DHome;
