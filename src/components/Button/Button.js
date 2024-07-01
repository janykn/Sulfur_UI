import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Button = ({
  onClick,
  children,
  bg,
  color,
  border,
  radius,
  pad,
  shadow,
  hoverBg,
  hoverColor,
  spring,
  hover,
}) => {
  const buttonStyles = {
    display: 'inline-flex',
    flexWrap: 'no-wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.9rem',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
    cursor: 'pointer',
    background: bg,
    color: color,
    border: border,
    borderRadius: radius,
    padding: pad,
    boxShadow: shadow,
    '@media (max-width: 600px)': {
      padding: '4px 8px',
      fontSize: '14px',
    },
  };

  const childStyles = {
    display: 'inline-flex',
    paddingRight: '6px',
    userSelect: 'none',
  };

  const ButtonComponent = motion.div;

  let hoverScale = spring ? 1.1 : 1;
  let tapScale = spring ? 0.9 : 1;

  let hoverProps = {
    scale: hoverScale,
    background: hover ? hoverBg : bg,
    color: hover ? hoverColor : color,
  };
  let tapProps = { scale: tapScale };

  return (
    <ButtonComponent
      whileHover={hoverProps}
      whileTap={tapProps}
      transition={{ bounceDamping: 10, bounceStiffness: 600 }}
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
  bg: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  radius: PropTypes.string,
  pad: PropTypes.string,
  shadow: PropTypes.string,
  hoverBg: PropTypes.string,
  hoverColor: PropTypes.string,
  spring: PropTypes.bool,
  hover: PropTypes.bool,
};

Button.defaultProps = {
  bg: 'white', 
  color: 'black',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  radius: '10px',
  pad: '15px 45px',
  shadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  hoverBg: '#f0f0f0',
  hoverColor: '#000',
  spring: true,
  hover: true,
};

const GradientButton = ({
  onClick,
  children,
  motionGrad,
  gradSpring,
  gradHover,
  gradColor,
  hoverColor = 'white',
}) => {
  const buttonStyles = {
    display: 'inline-flex',
    flexWrap: 'no-wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.9rem',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
    margin: '10px',
    padding: '15px 45px',
    textAlign: 'center',
    transition: '0.5s',
    backgroundSize: '200% auto',
    boxShadow: '0 0 2px #eee',
    borderRadius: '10px',
    color: gradColor,
    backgroundImage: `linear-gradient(to right, ${motionGrad[0]} 0%, ${motionGrad[1]} 51%, ${motionGrad[2]} 100%)`,
  };

  let hoverProps = {};
  let tapProps = {};

  if (gradHover) {
    hoverProps.backgroundPosition = 'right center';
    hoverProps.color = hoverColor;
    hoverProps.textDecoration = 'none';
  }

  if (gradSpring) {
    hoverProps.scale = 1.1;
    tapProps.scale = 0.9;
  }

  return (
    <motion.div
      style={buttonStyles}
      whileHover={hoverProps}
      whileTap={tapProps}
      transition={{ bounceDamping: 10, bounceStiffness: 600 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

GradientButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  motionGrad: PropTypes.arrayOf(PropTypes.string).isRequired,
  gradSpring: PropTypes.bool,
  gradHover: PropTypes.bool,
  hoverColor: PropTypes.string,
  gradColor: PropTypes.string,
};

GradientButton.defaultProps = {
  gradSpring: false,
  gradHover: true,
  hoverColor: 'white',
  gradColor: 'white',
};

export { Button, GradientButton };
