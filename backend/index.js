const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./router/routes'); // adjust path if needed

const app = express();

// Enable CORS for all origins (or specify your frontend URL if you want to restrict it)
app.use(cors()); 

app.use(express.json());
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});