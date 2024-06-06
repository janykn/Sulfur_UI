import React, { useEffect, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
} from "date-fns";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './DateRangePicker.css';

const DateRangePicker = ({ minDate, maxDate, theme, startDate: initialStartDate, onDateChange }) => {
  const today = new Date();
  const isInitialStartDateWithinRange = initialStartDate && isWithinInterval(initialStartDate, { start: minDate, end: maxDate });
  const isTodayWithinRange = isWithinInterval(today, { start: minDate, end: maxDate });

  const initialDate = isInitialStartDateWithinRange
    ? initialStartDate
    : isTodayWithinRange
      ? today
      : minDate;

  const [currentMonth, setCurrentMonth] = useState(startOfMonth(initialDate));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isYearMonthSelectorOpen, setIsYearMonthSelectorOpen] = useState(false);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [yearRange, setYearRange] = useState({ start: currentMonth.getFullYear(), end: currentMonth.getFullYear() + 19 });

  useEffect(() => {
    if (onDateChange) {
      onDateChange({ startDate, endDate });
    }
  }, [startDate, endDate, onDateChange]);

  const handleDateClick = (date) => {
    if (!isSelecting) {
      setStartDate(date);
      setEndDate(null);
      setIsSelecting(true);
    } else {
      if (date >= startDate) {
        setEndDate(date);
        setIsSelecting(false);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    }
  };

  const handlePrevMonth = () => {
    const prevMonth = subMonths(currentMonth, 1);
    if (!minDate || prevMonth >= startOfMonth(minDate)) {
      setCurrentMonth(prevMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    if (!maxDate || nextMonth <= endOfMonth(maxDate)) {
      setCurrentMonth(nextMonth);
    }
  };

  const handleHeaderClick = () => {
    setIsYearMonthSelectorOpen(!isYearMonthSelectorOpen);
    setIsMonthSelectorOpen(false);
  };

  const handlePrevYears = () => {
    const newStart = yearRange.start - 20;
    const newEnd = yearRange.end - 20;
    if (!minDate || newEnd >= minDate.getFullYear()) {
      setYearRange({ start: newStart, end: newEnd });
    }
  };

  const handleNextYears = () => {
    const newStart = yearRange.start;
    const newEnd = yearRange.end + 20;
    if (!maxDate || newStart <= maxDate.getFullYear()) {
      setYearRange({ start: newStart, end: newEnd });
    }
  };

  const handleYearClick = (year) => {
    if ((!minDate || year >= minDate.getFullYear()) && (!maxDate || year <= maxDate.getFullYear())) {
      setCurrentMonth(new Date(year, currentMonth.getMonth()));
      setIsMonthSelectorOpen(true);
      setIsYearMonthSelectorOpen(false);
    }
  };

  const handleMonthClick = (month) => {
    const newDate = new Date(currentMonth.getFullYear(), month);
    if ((!minDate || newDate >= startOfMonth(minDate)) && (!maxDate || newDate <= endOfMonth(maxDate))) {
      setCurrentMonth(newDate);
      setIsMonthSelectorOpen(false);
      setIsYearMonthSelectorOpen(false);
    }
  };

  const renderYears = () => {
    const years = [];
    for (let i = yearRange.start; i <= yearRange.end; i++) {
      if ((!minDate || i >= minDate.getFullYear()) && (!maxDate || i <= maxDate.getFullYear())) {
        years.push(i);
      }
    }
    return (
      <div className="years">
        {years.map((year) => (
          <div key={year} className={`year ${year === currentMonth.getFullYear() ? "selected" : ""}`} onClick={() => handleYearClick(year)}>
            {year}
          </div>
        ))}
      </div>
    );
  };

  const renderMonths = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months.map((month, index) => {
      const newDate = new Date(currentMonth.getFullYear(), index);
      if ((!minDate || newDate >= startOfMonth(minDate)) && (!maxDate || newDate <= endOfMonth(maxDate))) {
        return (
          <div key={month} className="month" onClick={() => handleMonthClick(index)}>
            {month}
          </div>
        );
      }
      return null;
    });
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek.map((day) => (
      <div key={day} className="day-of-week">
        {day}
      </div>
    ));
  };

  const renderDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({
      start: startOfWeek(start, { weekStartsOn: 0 }), // Week starts on Sunday
      end: endOfWeek(end, { weekStartsOn: 0 }),
    });

    return days.map((day) => {
      const isDisabled = (minDate && day < minDate) || (maxDate && day > maxDate);
      const isSelected = isSameDay(day, startDate) || isSameDay(day, endDate);
      const isInRange = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
      const isInitialStartDate = isSameDay(day, initialStartDate);
      return (
        <div
          key={day}
          className={`day ${isInitialStartDate ? "initial" : ""} ${isSelected ? "selected" : ""} ${isInRange ? "in-range" : ""} ${!isSameMonth(day, start) ? "disabled" : ""} ${isDisabled ? "disabled" : ""}`}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          {format(day, "d")}
        </div>
      );
    });
  };

  return (
    <div className={`date-range-picker ${theme}`}>
      <div className="header">
        <>
          {isYearMonthSelectorOpen && (
            <div onClick={handlePrevYears} className={`arrow-icon ${minDate && yearRange.start <= minDate.getFullYear() ? "disabled" : ""}`}><ArrowBackIcon /></div>
          )}
          {!isYearMonthSelectorOpen && (
            <div onClick={handlePrevMonth} className={`arrow-icon ${minDate && currentMonth <= startOfMonth(minDate) ? "disabled" : ""}`}><ArrowBackIcon /></div>
          )}
          
          {isYearMonthSelectorOpen && (
            <span onClick={handleHeaderClick}>Please Select an Year</span>
          )}
          {!isYearMonthSelectorOpen && (
            <span onClick={handleHeaderClick}>{format(currentMonth, "MMMM yyyy")}</span>
          )}

          {!isYearMonthSelectorOpen && (
            <div onClick={handleNextMonth} className={`arrow-icon ${maxDate && currentMonth >= endOfMonth(maxDate) ? "disabled" : ""}`}><ArrowForwardIcon /></div>
          )}
          {isYearMonthSelectorOpen && (
            <div onClick={handleNextYears} className={`arrow-icon ${maxDate && yearRange.end >= maxDate.getFullYear() ? "disabled" : ""}`}><ArrowForwardIcon /></div>
          )}
        </>
      </div>
      {isYearMonthSelectorOpen && (
        <div className="year-month-selector">
          <div className="years">
            {renderYears()}
          </div>
        </div>
      )}
      {isMonthSelectorOpen && (
        <div className="year-month-selector">
          <div className="months">
            {renderMonths()}
          </div>
        </div>
      )}
      {!isYearMonthSelectorOpen && !isMonthSelectorOpen && (
        <>
          <div className="days-of-week">{renderDaysOfWeek()}</div>
          <div className="calendar">{renderDays()}</div>
        </>
      )}
    </div>
  );
};

export default DateRangePicker;