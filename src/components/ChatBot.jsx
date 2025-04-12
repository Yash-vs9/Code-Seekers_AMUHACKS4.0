import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './ChatBot.css'
const ChatBot = () => {
    const {param}=useParams()
    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js"; // Replace with your script URL
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script); // Cleanup when component unmounts
        };
      }, [param]);
      useEffect(() => {
        const script = document.createElement("script");
        script.src = "/script2.js"; // Replace with your script URL
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script); // Cleanup when component unmounts
        };
      }, [param]);
  return (
    <div className='win'>
        <div className='page'>The Bot is running with the help of BotPress. Its working on free version so it has limited tokens. We apologize for inconvenience.</div>
      
    </div>
  )
}

export default ChatBot
