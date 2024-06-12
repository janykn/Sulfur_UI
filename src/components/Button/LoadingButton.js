// LoadingButton.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useAnimation } from 'framer-motion';
import './LoadingButton.css';

const LoadingButton = ({ onClick, isLoading, buttonText }) => {
  const loadingControls = useAnimation();

  const handleLoadingButtonClick = async () => {
    onClick();
  };

  return (
    <div className="buttonContainer">
      <button
        className="button"
        onClick={handleLoadingButtonClick}
        disabled={isLoading || buttonText !== "Send Login Request"}
      >
        <motion.div
          className="loadingFill"
          initial={{ width: '0%' }}
          animate={loadingControls}
        />
        {buttonText}
      </button>
    </div>
  );
};

LoadingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default LoadingButton;
