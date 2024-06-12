// RollingButton.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import './RollingButton.css';

const RollingButton = ({ onClick, isFirstFunction, buttonText }) => {
  const rollControls = useAnimation();

  const handleRollingButtonClick = async () => {
    await rollControls.start({ rotateX: 360, transition: { duration: 0.5 } });
    rollControls.set({ rotateX: 0 });
    onClick();
  };

  return (
    <motion.div
      className="buttonContainer"
      animate={rollControls}
      initial={{ rotateX: 0 }}
    >
      <button className="button" onClick={handleRollingButtonClick}>
        {isFirstFunction ? "Sign Up" : "Get OTP"}
      </button>
    </motion.div>
  );
};

RollingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isFirstFunction: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default RollingButton;
