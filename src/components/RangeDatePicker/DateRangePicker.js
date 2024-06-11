import React, { useCallback, useState } from "react";
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

const DateRangePicker = ({
  minDate = new Date('1999-01-01'),
  maxDate = new Date('2050-11-01'),
  theme = 'light',
  startDate: initialStartDate = new Date(),
  width = '18rem', 
  height= '18rem',  
  onDateChange
}) => {
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
  const [yearRange, setYearRange] = useState({ start: currentMonth.getFullYear(), end: currentMonth.getFullYear()+15 });

  const handleDateClick = useCallback((date) => {
    if (!isSelecting) {
      setStartDate(date);
      setEndDate(null);
      setIsSelecting(true);
      onDateChange && onDateChange({ startDate: date, endDate: null });
    } else {
      if (date >= startDate) {
        setEndDate(date);
        setIsSelecting(false);
        onDateChange && onDateChange({ startDate, endDate: date });
      } else {
        setStartDate(date);
        setEndDate(null);
        onDateChange && onDateChange({ startDate: date, endDate: null });
      }
    }
  }, [isSelecting, startDate, onDateChange]);

  const handlePrevMonth = useCallback(() => {
    const prevMonth = subMonths(currentMonth, 1);
    if (!minDate || prevMonth >= startOfMonth(minDate)) {
      setCurrentMonth(prevMonth);
    }
  }, [currentMonth, minDate]);

  const handleNextMonth = useCallback(() => {
    const nextMonth = addMonths(currentMonth, 1);
    if (!maxDate || nextMonth <= endOfMonth(maxDate)) {
      setCurrentMonth(nextMonth);
    }
  }, [currentMonth, maxDate]);

  const handleHeaderClick = useCallback(() => {
    setIsYearMonthSelectorOpen(!isYearMonthSelectorOpen);
    setIsMonthSelectorOpen(false);
  }, [isYearMonthSelectorOpen]);

  const handlePrevYears = useCallback(() => {
    const newStart = yearRange.start - 16;
    const newEnd = yearRange.end - 16;
    if (!minDate || newEnd >= minDate.getFullYear()) {
      setYearRange({ start: newStart, end: newEnd });
    }
  }, [yearRange, minDate]);

  const handleNextYears = useCallback(() => {
    const newStart = yearRange.start + 16;
    const newEnd = yearRange.end + 16;
    if (!maxDate || newStart <= maxDate.getFullYear()) {
      setYearRange({ start: newStart, end: newEnd });
    }
  }, [yearRange, maxDate]);

  const handleYearClick = useCallback((year) => {
    if ((!minDate || year >= minDate.getFullYear()) && (!maxDate || year <= maxDate.getFullYear())) {
      setCurrentMonth(new Date(year, currentMonth.getMonth()));
      setIsMonthSelectorOpen(true);
      setIsYearMonthSelectorOpen(false);
    }
  }, [currentMonth, minDate, maxDate]);

  const handleMonthClick = useCallback((month) => {
    const newDate = new Date(currentMonth.getFullYear(), month);
    if ((!minDate || newDate >= startOfMonth(minDate)) && (!maxDate || newDate <= endOfMonth(maxDate))) {
      setCurrentMonth(newDate);
      setIsMonthSelectorOpen(false);
      setIsYearMonthSelectorOpen(false);
    }
  }, [currentMonth, minDate, maxDate]);

  const renderYears = useCallback(() => {
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
  }, [yearRange, currentMonth, minDate, maxDate, handleYearClick]);

  const renderMonths = useCallback(() => {
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
  }, [currentMonth, minDate, maxDate, handleMonthClick]);

  const renderDaysOfWeek = useCallback(() => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek.map((day) => (
      <div key={day} className="day-of-week">
        {day}
      </div>
    ));
  }, []);

  const renderDays = useCallback(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({
      start: startOfWeek(start, { weekStartsOn: 0 }), // Week starts on Sunday
      end: endOfWeek(end, { weekStartsOn: 0 }),
    });
  
    const weeks = [];
    let week = [];
    days.forEach((day, index) => {
      const isDisabled = (minDate && day < minDate) || (maxDate && day > maxDate);
      const isSelected = isSameDay(day, startDate) || isSameDay(day, endDate);
      const isInRange = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
      const isInitialStartDate = isSameDay(day, initialStartDate);
  
      week.push(
        <div
          key={day}
          className={`day ${isInitialStartDate ? "initial" : ""} ${isSelected ? "selected" : ""} ${isInRange ? "in-range" : ""} ${!isSameMonth(day, start) ? "disabled" : ""} ${isDisabled ? "disabled" : ""}`}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          {format(day, "d")}
        </div>
      );
  
      if ((index + 1) % 7 === 0) {
        weeks.push(<div className="week" key={index}>{week}</div>);
        week = [];
      }
    });
  
    return weeks;
  }, [currentMonth, minDate, maxDate, startDate, endDate, initialStartDate, handleDateClick]);

  return (
    <div className={`date-range-picker ${theme}`} style={{ width, height }}>
      <div className="header">
        <>
          {isYearMonthSelectorOpen && (
            <div onClick={handlePrevYears} className={`arrow-icon ${minDate && yearRange.start <= minDate.getFullYear() ? "disabled" : ""}`}><ArrowBackIcon /></div>
          )}
          {!isYearMonthSelectorOpen && (
            <div onClick={handlePrevMonth} className={`arrow-icon ${minDate && currentMonth <= startOfMonth(minDate) ? "disabled" : ""}`}><ArrowBackIcon /></div>
          )}

          <div className="current-month-year" onClick={handleHeaderClick}>
            {format(currentMonth, "MMMM yyyy")}
          </div>

          <>
            {isYearMonthSelectorOpen && (
              <div onClick={handleNextYears} className={`arrow-icon ${maxDate && yearRange.end >= maxDate.getFullYear() ? "disabled" : ""}`}><ArrowForwardIcon /></div>
            )}
            {!isYearMonthSelectorOpen && (
              <div onClick={handleNextMonth} className={`arrow-icon ${maxDate && currentMonth >= endOfMonth(maxDate) ? "disabled" : ""}`}><ArrowForwardIcon /></div>
            )}
          </>
        </>
      </div>
      {isYearMonthSelectorOpen && (
        <div className="selector-container-years">
          <div className="selector-years">
            {renderYears()}
          </div>
        </div>
      )}
      {isMonthSelectorOpen && (
        <div className="selector-container-months">
          <div className="selector-months">
            {renderMonths()}
          </div>
        </div>
      )}
      {!isYearMonthSelectorOpen && !isMonthSelectorOpen && (
        <>
          <div className="days-of-week">{renderDaysOfWeek()}</div>
          <div className="days">{renderDays()}</div>
        </>
      )}
    </div>
  );
};

export default DateRangePicker;
