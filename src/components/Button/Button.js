import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, style, spring }) => {
  const defaultStyles = {
    bg: 'white', // Default background color
    color: 'black',
    border: 'none',
    radius: '4px',
    pad: '6px 16px',
    shadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    hoverBg: '#f0f0f0',
    hoverColor: '#000',
  };

  // Merge provided styles with default styles
  const mergedStyles = { ...defaultStyles, ...style };

  const buttonStyles = {
    display: 'inline-flex',
    flexWrap: 'no-wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: mergedStyles.bg,
    color: mergedStyles.color,
    border: mergedStyles.border,
    borderRadius: mergedStyles.radius,
    padding: mergedStyles.pad,
    cursor: 'pointer',
    boxShadow: mergedStyles.shadow,
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
    '@media (max-width: 600px)': {
      padding: '4px 8px',
      fontSize: '14px',
    },
  };

  const childStyles = {
    paddingRight: '6px',
    userSelect: 'none',
  };

  const ButtonComponent = spring ? motion.div : 'div';

  return (
    <ButtonComponent
      whileHover={spring ? { scale: 1.1, background: mergedStyles.hoverBg, color: mergedStyles.hoverColor } : null}
      whileTap={spring ? { scale: 0.9 } : null}
      transition={spring ? { bounceDamping: 10, bounceStiffness: 600 } : {}}
      style={buttonStyles}
      onClick={onClick}
    >
      {React.Children.map(children, (child) => (
        <div style={childStyles}>{child}</div>
      ))}
    </ButtonComponent>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({
    bg: PropTypes.string,
    color: PropTypes.string,
    border: PropTypes.string,
    radius: PropTypes.string,
    pad: PropTypes.string,
    shadow: PropTypes.string,
    hoverBg: PropTypes.string,
    hoverColor: PropTypes.string,
  }),
  spring: PropTypes.bool,
};

Button.defaultProps = {
  style: {
    bg: 'white', // Default background color
    color: 'black',
    border: 'none',
    radius: '4px',
    pad: '6px 16px',
    shadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    hoverBg: '#f0f0f0',
    hoverColor: '#000',
  },
  spring: true, // Default to enabling spring animations
};

export default Button;
