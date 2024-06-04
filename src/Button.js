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
  };

  const childStyles = {
    paddingRight: '6px',
  };

  return (
    <motion.div
      className="cta-button"
      whileHover={{ scale: 1.03 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
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
  },
};

export default Button;
