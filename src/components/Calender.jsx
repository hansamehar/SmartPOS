import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isToday,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCalendarDays = (date) => {
    const start = startOfWeek(startOfMonth(date));
    const end = endOfWeek(endOfMonth(date));
    return eachDayOfInterval({ start, end });
  };

  const days = getCalendarDays(currentDate);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div  className="d-flex flex-column align-items-center p-3 rounded " style={{backgroundColor:'#fff'}} >
  <div className="d-flex justify-content-between align-items-center w-100 mb-2">
    <button className="btn btn-sm" onClick={handlePrevMonth}>
      &lt;
    </button>
    <div className="fw-bold" style={{ fontSize: "16px" }}>{format(currentDate, "MMMM yyyy")}</div>
    <button className="btn btn-sm" onClick={handleNextMonth}>
      &gt;
    </button>
  </div>

  <div
    className="d-grid text-center fw-bold mb-2"
    style={{ gridTemplateColumns: "repeat(7, 1fr)", width: "100%", fontSize: "12px" }}
  >
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <div key={day}>{day}</div>
    ))}
  </div>

  <div
    className="d-grid"
    style={{ gridTemplateColumns: "repeat(7, 1fr)", width: "100%" }}
  >
    {days.map((day) => (
      <div
        key={day}
        className="d-flex justify-content-center align-items-center rounded-circle"
        style={{
          padding: "5px",
          minHeight: "30px",
          cursor: "pointer",
          backgroundColor: isToday(day) ? "#a0e0a0" : "transparent",
          color: isSameMonth(day, currentDate) ? "#000" : "#ccc",
          fontWeight: isToday(day) ? "bold" : "normal",
          fontSize: "12px",
        }}
      >
        {format(day, "d")}
      </div>
    ))}
  </div>
</div>

  );
};

export default Calendar;
