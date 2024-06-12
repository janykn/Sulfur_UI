import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const RollandLoadplayground = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isFirstFunction, setIsFirstFunction] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Send Login Request");

  const rollControls = useAnimation();
  const loadingControls = useAnimation();

  const handleRollingButtonClick = async () => {
    await rollControls.start({ rotateX: 360, transition: { duration: 1 } });
    rollControls.set({ rotateX: 0 });
    setIsFirstFunction((prev) => !prev);
  };

  const handleLoadingButtonClick = async () => {
    setIsLoading(true);
    setButtonText("Sending...");

    await loadingControls.start({
      width: '100%',
      transition: { duration: 3 },
    });

    loadingControls.set({ width: '0%' });
    setButtonText("Sent!");
    setIsLoading(false);

    setTimeout(() => {
      setButtonText("Send Login Request");
    }, 2000);
  };

  return (
    <div className="container">
      <div className="inputbox">
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
      </div>
      <div className="inputbox">
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Id"
        />
      </div>
      <div className="inputbox">
        <textarea
          className="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
      </div>
      <motion.div
        className="buttonContainer"
        animate={rollControls}
        initial={{ rotateX: 0 }}
      >
        <button className="button" onClick={handleRollingButtonClick}>
          {isFirstFunction ? "Sign Up" : "Get OTP"}
        </button>
      </motion.div>
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
    </div>
  );
};

export default RollandLoadplayground;
