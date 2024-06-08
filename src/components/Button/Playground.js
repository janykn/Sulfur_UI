import React from 'react';
import Button from './Button';

const Playground = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const customStyles = {
    backgroundColor: 'black',
    color: 'white',
    border: '2px solid black',
    borderRadius: '8px',
    padding: '10px 20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    hoverbgColor: 'black',
    hoverColor: 'white',
  };

  return (
    <div>
      <h2>Button Playground</h2>
      <Button onClick={handleClick} styles={customStyles}>
        Submit
      </Button>
    </div>
  );
};

export default Playground;
