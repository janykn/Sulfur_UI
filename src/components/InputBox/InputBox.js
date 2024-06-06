import React from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';

const InputBox = ({ placeholder, value, onChange, styles }) => {
  const controls = useAnimation();

  const handleFocus = () => {
    controls.start({ y: -18 });
  };

  const handleBlur = () => {
    if (value === '') {
      controls.start({ y: 0 });
    }
  };

  const inputBoxMainStyles = {
    display: 'inline-block',
    position: 'relative',
    marginBottom: '20px',
    backgroundColor: styles.backgroundColor,
    '@media (max-width: 600px)': {
      marginBottom: '10px',
    },
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: styles.inputColor,
    border: styles.inputBorder,
    borderRadius: '5px',
    backgroundColor: styles.backgroundColor,
    fontFamily: styles.InputfontFamily,
    '@media (max-width: 600px)': {
      padding: '8px',
      fontSize: '14px',
    },
  };

  const placeholderStyles = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    fontSize: '14px',
    color: styles.placeholderColor,
    borderRadius: '25px',
    backgroundColor: styles.backgroundColor,
    padding: '0 5px',
    pointerEvents: 'none',
    '@media (max-width: 600px)': {
      top: '8px',
      left: '8px',
      fontSize: '12px',
    },
  };

  return (
    <div style={inputBoxMainStyles}>
      <motion.input
        style={inputStyles}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <motion.label style={placeholderStyles} animate={controls}>
        {placeholder}
      </motion.label>
    </div>
  );
};

InputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    backgroundColor: PropTypes.string,
    inputColor: PropTypes.string,
    inputBorder: PropTypes.string,
    placeholderColor: PropTypes.string,
    InputfontFamily: PropTypes.string,
  }),
};

InputBox.defaultProps = {
  styles: {
    backgroundColor: 'white',
    inputColor: 'grey',
    inputBorder: '1px solid black',
    placeholderColor: 'black',
    InputfontFamily: 'Inter',
  },
};

export default InputBox;
