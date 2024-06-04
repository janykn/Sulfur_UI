import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import CancelIcon from '@mui/icons-material/Cancel';

const Modal = ({ isOpen, onClose, layoutProps, visualProps, children, closeComponent, addOverlay }) => {
    const defaultLayoutProps = {
        width: '400px',
        height: '200px',
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

    // Merge default props with provided props
    const mergedLayoutProps = { ...defaultLayoutProps, ...layoutProps };
    const mergedVisualProps = { ...defaultVisualProps, ...visualProps };

    const { width, height, top, left, right, bottom } = mergedLayoutProps;
    const { bgColor, border, borderRadius, fontColor, popupDirection } = mergedVisualProps;

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

    const modalStyles = {
        position: 'fixed',
        zIndex: 10001,
        padding: 15,
        width,
        height,
        backgroundColor: bgColor,
        border,
        borderRadius,
        color: fontColor,
        top,
        left,
        right,
        bottom,
        transform: `translate(-${left === '50%' ? '50%' : '0'}, -${top === '50%' ? '50%' : '0'})`,
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
                    initial={getInitialPosition()}
                    animate={getAnimatePosition()}
                    exit={getExitPosition()}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={modalStyles}
                >
                    {closeComponent ? (
                        closeComponent
                    ) : (
                        <CancelIcon onClick={handleClose} style={closeButtonStyles}/>
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
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
        top: PropTypes.string.isRequired,
        left: PropTypes.string.isRequired,
        right: PropTypes.string.isRequired,
        bottom: PropTypes.string.isRequired,
    }),
    visualProps: PropTypes.shape({
        bgColor: PropTypes.string,
        border: PropTypes.string,
        borderRadius: PropTypes.string,
        fontColor: PropTypes.string,
        popupDirection: PropTypes.oneOf(['left-fit', 'right-fit', 'center']),
    }),
    children: PropTypes.node.isRequired,
    closeComponent: PropTypes.element,
    addOverlay: PropTypes.bool,
};

Modal.defaultProps = {
    addOverlay: false,
};

export default Modal;
