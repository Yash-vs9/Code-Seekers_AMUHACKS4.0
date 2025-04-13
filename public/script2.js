async function fetchAndInitializeBotpress() {
  try {
    const response = await fetch("https://files.bpcontent.cloud/2025/04/06/17/20250406172846-SNOKC2E7.json");
    const data = await response.json();
    const id = data.clientId;
    return id; 
  } catch (error) {
    console.error("Error fetching client ID:", error);
    return null;  
  }
}

async function loadBotPressScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js"; // BotPress script URL
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.body.appendChild(script);
  });
}

async function initializeBot() {
  try {

    await loadBotPressScript();


    const cId = await fetchAndInitializeBotpress();
    
    
    if (cId) {
      window.botpress.init({
        "botId": "0b639e72-ebb2-471f-9430-18aa97f879b4", 
        "configuration": {
          "botName": "Chat Bot",
          "color": "#3B82F6",
          "variant": "solid",
          "themeMode": "dark",
          "fontFamily": "inter",
          "radius": 1
        },
        "clientId": cId,  
      });
    } else {
      console.error("Invalid clientId, bot initialization failed.");
    }
  } catch (error) {
    console.error("Error initializing bot:", error);
  }
}


initializeBot();