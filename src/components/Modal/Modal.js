import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import CancelIcon from '@mui/icons-material/Cancel';

const Modal = ({ isOpen, onClose, layoutProps, visualProps, children, closeComponent, addOverlay, mobileLayoutProps }) => {
  const defaultLayoutProps = {
    width: '50%',
    height: '40%',
  };

  const defaultMobileLayoutProps = {
    width: '60%',
    height: 'auto',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
  };

  const defaultVisualProps = {
    bgColor: '#ffffff',
    border: '1px solid black',
    borderRadius: '20px',
    fontColor: '#000000',
    popupDirection: 'center',
  };

  const closeButtonStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
  };

  const {
    bgColor = defaultVisualProps.bgColor,
    border = defaultVisualProps.border,
    borderRadius = defaultVisualProps.borderRadius,
    fontColor = defaultVisualProps.fontColor,
    popupDirection = defaultVisualProps.popupDirection,
  } = visualProps || {};

  const getInitialPosition = () => {
    switch (popupDirection) {
      case 'left-fit':
        return { x: '-100%' };
      case 'right-fit':
        return { x: '100%' };
      default:
        return { x: '-50%', y: '-50%' };
    }
  };

  const getAnimatePosition = () => {
    switch (popupDirection) {
      case 'left-fit':
      case 'right-fit':
        return { x: 0 };
      case 'center':
        return { scale: 1 };
      default:
        return { x: '-50%', y: '-50%' };
    }
  };

  const getExitPosition = () => {
    switch (popupDirection) {
      case 'left-fit':
        return { x: '-100%' };
      case 'right-fit':
        return { x: '100%' };
      case 'center':
        return { scale: 0 };
      default:
        return { x: '-50%', y: '-50%' };
    }
  };

  const defaultPositionProps = () => {
    switch (popupDirection) {
      case 'left-fit':
        return { top: '0%', left: '0%' };
      case 'right-fit':
        return { top: '0%', right: '0%' };
      case 'center':
        return { top: '50%', left: '50%' };
      default:
        return {};
    }
  };

  const {
    width = defaultLayoutProps.width,
    height = defaultLayoutProps.height,
    top = defaultPositionProps().top,
    left = defaultPositionProps().left,
    right = defaultPositionProps().right,
    bottom = defaultPositionProps().bottom,
  } = layoutProps || {};

  const getModalStyles = () => {
    const isMobile = window.innerWidth <= 600;
    const propsToUse = isMobile ? { ...defaultMobileLayoutProps, ...mobileLayoutProps } : layoutProps;

    return {
      position: 'fixed',
      zIndex: 10001,
      padding: 15,
      width: isMobile ? propsToUse.width : width,
      height: isMobile ? propsToUse.height : height,
      backgroundColor: bgColor,
      border,
      borderRadius,
      color: fontColor,
      top: isMobile ? propsToUse.top : top,
      left: isMobile ? propsToUse.left : left,
      right: isMobile ? propsToUse.right : right,
      bottom: isMobile ? propsToUse.bottom : bottom,
      transform: isMobile ? 'translate(0, 0)' : `translate(-${left === '50%' ? '50%' : '0'}, -${top === '50%' ? '50%' : '0'})`,
    };
  };

  const overlayStyles = {
    position: 'fixed',
    zIndex: 10000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <>
      {isOpen && addOverlay && <div style={overlayStyles} onClick={handleClose}></div>}
      {isOpen && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={getInitialPosition()}
          animate={getAnimatePosition()}
          exit={getExitPosition()}
          style={getModalStyles()}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {closeComponent ? (
            <div onClick={handleClose} style={closeButtonStyles}>
              {closeComponent}
            </div>
          ) : (
            <CancelIcon onClick={handleClose} style={closeButtonStyles} />
          )}
          {children}
        </motion.div>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  layoutProps: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
  }),
  visualProps: PropTypes.shape({
    bgColor: PropTypes.string,
    border: PropTypes.string,
    borderRadius: PropTypes.string,
    fontColor: PropTypes.string,
    popupDirection: PropTypes.oneOf(['left-fit', 'right-fit', 'center']),
  }),
  mobileLayoutProps: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  closeComponent: PropTypes.node,
  addOverlay: PropTypes.bool,
};

Modal.defaultProps = {
  addOverlay: true,
};

export default Modal;
