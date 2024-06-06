import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, styles }) => {
  const buttonStyles = {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    border: styles.border,
    borderRadius: styles.borderRadius,
    padding: styles.padding,
    cursor: 'pointer',
    boxShadow: styles.boxShadow,
    userSelect: 'none',
    hoverbgColor: styles.hoverbgColor,
    hoverColor: styles.hoverColor,
    '@media (max-width: 600px)': {
      padding: '4px 8px',
      fontSize: '14px',
    },
  };

  const childStyles = {
    paddingRight: '6px',
    userSelect: 'none',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1, backgroundColor: buttonStyles.hoverbgColor, color: buttonStyles.hoverColor }}
      whileTap={{ scale: 0.9 }}
      transition={{ bounceDamping: 10, bounceStiffness: 600 }}
      style={buttonStyles}
      onClick={onClick}
    >
      {React.Children.map(children, (child) => (
        <div style={childStyles}>{child}</div>
      ))}
    </motion.div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  styles: PropTypes.shape({
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    border: PropTypes.string,
    borderRadius: PropTypes.string,
    padding: PropTypes.string,
    boxShadow: PropTypes.string,
    hoverbgColor: PropTypes.string,
    hoverColor: PropTypes.string,
  }),
};

Button.defaultProps = {
  styles: {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 16px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 1)',
    hoverbgColor: '#f0f0f0',
    hoverColor: '#000',
  },
};

export default Button;
