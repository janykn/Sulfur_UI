// Button.js
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, styles }) => {
  const buttonStyles = {
    display: 'inline-flex', // Updated display property
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: styles.backgroundColor || 'white',
    color: styles.color || 'black',
    border: styles.border || 'none',
    borderRadius: styles.borderRadius || '4px',
    padding: styles.padding || '0px 16px',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 1)', // Added boxShadow for shadow effect
  };

  const childStyles = {
    paddingRight: '6px',
  };

  return (
    <motion.div 
    className="cta-button"
    whileHover={{ scale: 1.03 }}
    onHoverStart={e => {}}
    onHoverEnd={e => {}}
    style={buttonStyles} onClick={onClick}
  >
      {React.Children.map(children, (child) => (
        <div style={childStyles}>
          {child}
        </div>
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
  }),
};

Button.defaultProps = {
  styles: {},
};

export default Button;
