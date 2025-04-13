async function fetchAndInitializeBotpress() {
    const response = await fetch("https://files.bpcontent.cloud/2025/04/06/17/20250406172846-SNOKC2E7.json");
    const data = await response.json();
    const id = data.clientId;
  
    return id; 
  }
  


  async function initializeBot(email, password) {
    const cId = await fetchAndInitializeBotpress(); 
  
    window.botpress.init({
      "botId": "0b639e72-ebb2-471f-9430-18aa97f879b4",
      "configuration": {
        "botName": "Chat Bot",
        "website": {},
        "email": {},
        "phone": {},
        "termsOfService": {},
        "privacyPolicy": {},
        "color": "#3B82F6",
        "variant": "solid",
        "themeMode": "dark",
        "fontFamily": "inter",
        "radius": 1
      },
      "clientId": cId,  // Use the fetched cId
    
    });
  }
  
  // Call the initialization function with your email and password
  initializeBot('user@example.com', 'password123');
  