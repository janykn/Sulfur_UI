import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Dropdown = ({ header, children, styles }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownStyles = {
    dropdown: {
        position: 'relative',
        display: 'inline-block',
    },
    dropdownHeader: {
        backgroundColor: styles.headerBackgroundColor,
        color: styles.headerColor,
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontFamily : styles.headerFontFamily,
        borderRadius: '5px',
        boxShadow: styles.headerBoxShadow,
    },
    dropdownMenu: {
        display: isOpen ? 'block' : 'none',
        position: 'absolute',
        backgroundColor: styles.menuBackgroundColor,
        minWidth: '160px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        userSelect: 'none',
        zIndex: styles.menuzIndex
    },
    dropdownMenuItem: {
        padding: '12px 16px',
        cursor: 'pointer',
        color: styles.menuItemColor,
        backgroundColor: styles.menuBackgroundColor,
    },
    dropdownMenuItemHover: {
        backgroundColor: styles.menuItemHoverBackgroundColor,
    },
};

  return (
    <div style={dropdownStyles.dropdown}>
      <motion.button
        style={dropdownStyles.dropdownHeader}
        onClick={toggleDropdown}
        whileTap={{ scale: 0.95 }}
      >
        {header}
      </motion.button>
      <motion.div
        style={dropdownStyles.dropdownMenu}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            style: { ...dropdownStyles.dropdownMenuItem, ...child.props.style },
            onMouseEnter: (e) => {
              e.target.style.backgroundColor = styles.menuItemHoverBackgroundColor;
            },
            onMouseLeave: (e) => {
              e.target.style.backgroundColor = styles.menuBackgroundColor;
            },
          })
        )}
      </motion.div>
    </div>
  );
};

Dropdown.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  styles: PropTypes.shape({
    headerBackgroundColor: PropTypes.string,
    headerColor: PropTypes.string,
    menuBackgroundColor: PropTypes.string,
    menuItemColor: PropTypes.string,
    menuItemHoverBackgroundColor: PropTypes.string,
    menuzIndex: PropTypes.number,
    headerBoxShadow: PropTypes.string,
    headerFontFamily: PropTypes.string,
  }),
};

Dropdown.defaultProps = {
  styles: {
    headerBackgroundColor: 'white',
    headerColor: 'black',
    menuBackgroundColor: 'white',
    menuItemColor: 'black',
    menuItemHoverBackgroundColor: '#ddd',
    menuzIndex: 1,
    headerBoxShadow:'0px 4px 6px rgba(0, 0, 0, 1)',
    headerFontFamily: 'Inter'
  },
};

export default Dropdown;