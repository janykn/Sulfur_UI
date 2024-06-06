import React, { useState } from 'react';
import DateRangePicker from './components/RangeDatePicker/DateRangePicker';
import { Button } from 'sulfur-ui';

const Playground = () => {
    const playgroundContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
    };

    const minDate = new Date(2023, 11, 11); // December 1, 2023
    const maxDate = new Date(2029, 1, 2); // February 2, 2029
    const initialStartDate = new Date(2025, 6, 14); // July 14, 2023

    const [selectedDates, setSelectedDates] = useState({
        startDate: null,
        endDate: null,
    });

    const [darkMode, setDarkMode] = useState(false);

    const handleDateChange = ({ startDate, endDate }) => {
        setSelectedDates({ startDate, endDate });
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div style={playgroundContainerStyle}>
            <h1>Date Range Picker</h1>
            <DateRangePicker
                minDate={minDate}
                maxDate={maxDate}
                startDate={initialStartDate}
                onDateChange={handleDateChange}
                theme={darkMode ? "dark-theme" : "light-theme"} // Toggle theme based on darkMode state
            />
            <div>
                <p>
                    Selected Start Date:{" "}
                    {selectedDates.startDate
                        ? selectedDates.startDate.toDateString()
                        : "None"}
                </p>
                <p>
                    Selected End Date:{" "}
                    {selectedDates.endDate
                        ? selectedDates.endDate.toDateString()
                        : "None"}
                </p>
            </div>
            <Button onClick={toggleDarkMode}>
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </Button>
        </div>
    );
};

export default Playground;
