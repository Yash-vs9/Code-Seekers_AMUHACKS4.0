const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./router/routes'); // adjust path if needed

const app = express();
app.use(express.json());
const PORT=process.env.PORT
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));