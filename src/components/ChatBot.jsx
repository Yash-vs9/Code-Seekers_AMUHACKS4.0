import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ChatBot.module.css';

const ChatBot = () => {
  const { param } = useParams();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js"; 
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, [param]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/script2.js"; // Replace with your script URL
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, [param]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.page}>
        <p className={styles.message}>
          The Bot is running with the help of BotPress. It's working on the free version, so it has limited tokens. We apologize for any inconvenience.
        </p>
      </div>
    </div>
  );
};

export default ChatBot;